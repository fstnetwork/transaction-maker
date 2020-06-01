#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const argv = require("minimist")(process.argv.slice(2));

const consola = require("consola");
const csv = require("csv-parser");
const stripBom = require("strip-bom-stream");

const ethers = require("ethers");
const Wallet = ethers.Wallet;

const level = require("level");
level(path.resolve(__dirname, "..", "level_db_pub"), (err, db_pub) => {
  if (err) throw err;

  level(path.resolve(__dirname, "..", "level_db_tag"), (err, db_tag) => {
    if (err) throw err;

    if (process.env.MASTER_PK_HEX_STR === undefined) {
      consola.error("no MASTER_PK env is assigned");
      process.exit(1);
    }

    const master_wallet = new Wallet(process.env.MASTER_PK_HEX_STR);

    consola.success("Master wallet address", master_wallet.address);

    const tags = [];
    fs.createReadStream(argv.tags)
      .pipe(stripBom())
      .pipe(csv())
      .on("data", (data) => tags.push(data))
      .on("end", () => {
        consola.success("Tags are loaded");
        checkTags(tags, db_tag, db_pub);
      });
  });
});

async function checkTags(tags_from_csv, db_tag, db_pub) {
  const [tag_in_db_map, pub_in_db_map] = await Promise.all([
    new Promise((res, rej) => {
      const tag_in_db_map = {};

      db_tag
        .createReadStream()
        .on("data", (data) => {
          tag_in_db_map[data.key] = data.value;
        })
        .on("error", (err) => {
          rej(err);
        })
        .on("close", () => {
          res(tag_in_db_map);
        });
    }),
    new Promise((res, rej) => {
      const pub_in_db_map = {};

      db_pub
        .createReadStream()
        .on("data", (data) => {
          pub_in_db_map[data.key] = data.value;
        })
        .on("error", (err) => {
          rej(err);
        })
        .on("close", () => {
          res(pub_in_db_map);
        });
    }),
  ]);

  consola.info(tags_from_csv, tag_in_db_map, pub_in_db_map);

  const new_pubs = [];

  for (const tag of tags_from_csv) {
    if (pub_in_db_map[tag.publisher_id] === undefined) {
      const new_wallet = Wallet.createRandom();

      await db_pub.put(tag.publisher_id, new_wallet.privateKey);

      consola.info(tag.publisher_id);

      new_pubs.push({
        publisher_id: tag.publisher_id,
        pk: new_wallet.privateKey,
      });
    }
  }
}
