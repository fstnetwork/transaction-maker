const fs = require("fs");
const path = require("path");

const argv = require("minimist")(process.argv.slice(2));

const consola = require("consola");
const csv = require("csv-parser");
const stripBom = require("strip-bom-stream");

const ethers = require("ethers");
const Wallet = ethers.Wallet;

const level = require("level");

const { get_bytes } = require("../rand");

const { fire_attaches } = require("../batch/attach_batch");

let version_id = argv.version_id + "";
if (version_id === "rand") {
  version_id = get_bytes(4);
}

async function check(attaches_from_csv, db_tag, db_pub) {
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

  const attach_missions = attaches_from_csv.map((attach) => {
    const tag_info = JSON.parse(
      tag_in_db_map[attach.tag_uniq_name + ":" + version_id]
    );

    return {
      tag_info,
      from:
        attach.attach_from === "publisher"
          ? tag_info.publisher_address
          : attach.attach_from,
      to: attach.attach_to,
      amount_dec: (attach.attach_amount === "" ? 0 : attach.attach_amount) + "",
    };
  });

  //   consola.info(attach_missions);

  await fire_attaches(attach_missions);
}

function modeAttachTag() {
  level(path.resolve(argv.root_dir, "level_db_pub"), (err, db_pub) => {
    if (err) throw err;

    level(path.resolve(argv.root_dir, "level_db_tag"), (err, db_tag) => {
      if (err) throw err;

      const attaches = [];
      fs.createReadStream(argv.attaches)
        .pipe(stripBom())
        .pipe(csv())
        .on("data", (data) => attaches.push(data))
        .on("end", () => {
          consola.success("Attaches are loaded");
          check(attaches, db_tag, db_pub);
        });
    });
  });
}

module.exports = { modeAttachTag };