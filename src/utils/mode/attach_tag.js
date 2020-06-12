const fs = require("fs");

const consola = require("consola");
const csv = require("csv-parser");
const stripBom = require("strip-bom-stream");

const { Wallet } = require("ethers");

const { get_bytes } = require("../rand");

const { fire_attaches } = require("../batch/attach_batch");

async function check(argv, _attaches, db_tag, db_pub) {
  let version_id = argv.version_id + "";
  if (version_id === "rand") {
    version_id = get_bytes(4);
  }

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

  const attach_missions = _attaches.map((attach) => {
    const tag_info = JSON.parse(
      tag_in_db_map[attach.tag_uniq_name + ":" + version_id]
    );

    tag_info.publisher_wallet = new Wallet(tag_info.publisher_pk);

    return {
      tag_info,
      from: attach.attach_from,
      to: attach.attach_to,
      amount_dec: (attach.attach_amount === "" ? 0 : attach.attach_amount) + "",
    };
  });

  //   consola.info(attach_missions);

  await fire_attaches(attach_missions);
}

async function modeAttachTag(argv, is_lib, attaches_data, db_pub, db_tag) {
  if (is_lib === true) {
    await check(argv, attaches_data, db_tag, db_pub);
  } else {
    const attaches = [];

    await new Promise((res) => {
      fs.createReadStream(argv.attaches)
        .pipe(stripBom())
        .pipe(csv())
        .on("data", (data) => attaches.push(data))
        .on("end", async () => {
          consola.success("Attaches are loaded");
          await check(argv, attaches, db_tag, db_pub);
          res(true);
        });
    });
  }
}

module.exports = { modeAttachTag };
