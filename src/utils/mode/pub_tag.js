const fs = require("fs");
const path = require("path");

const argv = require("minimist")(process.argv.slice(2));

const consola = require("consola");
const csv = require("csv-parser");
const stripBom = require("strip-bom-stream");

const ethers = require("ethers");
const Wallet = ethers.Wallet;

const level = require("level");

async function check(tags_from_csv, db_tag, db_pub) {
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

  const new_pubs = [];

  for (const tag of tags_from_csv) {
    if (pub_in_db_map[tag.publisher_id] === undefined) {
      const new_wallet = Wallet.createRandom();

      await db_pub.put(tag.publisher_id, new_wallet.privateKey);

      new_pubs.push({
        publisher_id: tag.publisher_id,
        pk: new_wallet.privateKey,
      });
    }
  }

  consola.info("New publishers", new_pubs);
}

function modePubAndTag() {
  level(
    path.resolve(__dirname, "..", "..", "..", "level_db_pub"),
    (err, db_pub) => {
      if (err) throw err;

      level(
        path.resolve(__dirname, "..", "..", "..", "level_db_tag"),
        (err, db_tag) => {
          if (err) throw err;

          let master_pk = null;

          try {
            const file_master_pk_json = fs.readFileSync(
              path.resolve(__dirname, "..", "..", "..", "master_pk")
            );
            master_pk = JSON.parse(file_master_pk_json).master_pk;
          } catch (err) {
            consola.error(err);
          }

          if (master_pk === null) {
            if (process.env.MASTER_PK_HEX_STR === undefined) {
              consola.error("no MASTER_PK_HEX_STR env is assigned");
              process.exit(1);
            } else {
              master_pk = process.env.MASTER_PK_HEX_STR;
            }
          }

          const master_wallet = new Wallet(master_pk);

          consola.success("Master wallet address", master_wallet.address);

          const tags = [];
          fs.createReadStream(argv.tags)
            .pipe(stripBom())
            .pipe(csv())
            .on("data", (data) => tags.push(data))
            .on("end", () => {
              consola.success("Tags are loaded");
              check(tags, db_tag, db_pub);
            });
        }
      );
    }
  );
}

module.exports = { modePubAndTag };
