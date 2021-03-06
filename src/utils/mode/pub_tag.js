const fs = require("fs");
const path = require("path");

const csv = require("csv-parser");
const stripBom = require("strip-bom-stream");

const { Wallet } = require("ethers");

const { get_bytes } = require("../rand");

const {
  scan_publishers_and_fill_resource,
} = require("../batch/publisher_batch");

const { publish_tags } = require("../batch/tag_batch");

async function check(argv, _tags, db_tag, db_pub, master_wallet, logger) {
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

  const new_pubs = [];
  const new_pubs_map = {};
  const new_tags = [];

  for (const tag of _tags) {
    if (
      pub_in_db_map[tag.publisher_id] === undefined &&
      new_pubs_map[tag.publisher_id] === undefined
    ) {
      const new_wallet = Wallet.createRandom();

      await db_pub.put(tag.publisher_id, new_wallet.privateKey);

      new_pubs.push({
        publisher_id: tag.publisher_id,
        publisher_wallet: new_wallet,
        publisher_address: new_wallet.address.toLowerCase(),
      });

      new_pubs_map[tag.publisher_id] = new_wallet;
    }

    if (
      tag_in_db_map[`${tag.tag_uniq_name}:${version_id}`] === undefined ||
      tag_in_db_map[`${tag.tag_uniq_name}:${version_id}`] === "deploying"
    ) {
      await db_tag.put(`${tag.tag_uniq_name}:${version_id}`, "deploying");

      const publisher_wallet = new Wallet(await db_pub.get(tag.publisher_id));

      new_tags.push({
        publisher_id: tag.publisher_id,
        publisher_wallet: publisher_wallet,
        publisher_address: publisher_wallet.address.toLowerCase(),
        tag_uniq_name: `${tag.tag_uniq_name}:${version_id}`,
        tag_symbol: `${tag.tag_uniq_name.slice(0, 8)}:${version_id.slice(
          0,
          8
        )}`,
      });
    }
  }

  new_pubs
    .map((p) => {
      return {
        id: p.publisher_id,
        address: p.publisher_address,
      };
    })
    .forEach((p) => {
      logger.info("New publisher:", p.id, p.address);
    });

  new_tags
    .map((t) => {
      return {
        publisher_id: t.publisher_id,
        publisher_address: t.publisher_address,
        tag_uniq_name: t.tag_uniq_name,
      };
    })
    .forEach((t) => {
      logger.info(
        "New tag:",
        t.tag_uniq_name,
        t.publisher_id,
        t.publisher_address
      );
    });

  const after_import_pub_in_db_map = await new Promise((res, rej) => {
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
  });

  await scan_publishers_and_fill_resource(
    after_import_pub_in_db_map,
    master_wallet,
    logger
  );

  return await publish_tags(new_tags, db_tag, logger);
}

async function modePubAndTag(argv, is_lib, tags_data, db_pub, db_tag, logger) {
  let master_pk = null;

  try {
    const file_master_pk_json = fs.readFileSync(
      path.resolve(argv.root_dir, "master_pk")
    );
    master_pk = JSON.parse(file_master_pk_json).master_pk;
  } catch (err) {
    logger.warn(err);
  }

  if (master_pk === null) {
    if (process.env.MASTER_PK_HEX_STR === undefined) {
      logger.error("no MASTER_PK_HEX_STR env is assigned");
      process.exit(1);
    } else {
      master_pk = process.env.MASTER_PK_HEX_STR;
    }
  }

  const master_wallet = new Wallet(master_pk);

  logger.success("Master wallet address:", master_wallet.address.toLowerCase());

  if (is_lib === true) {
    return await check(argv, tags_data, db_tag, db_pub, master_wallet, logger);
  } else {
    const tags = [];

    return await new Promise((res) => {
      fs.createReadStream(argv.tags)
        .pipe(stripBom())
        .pipe(csv())
        .on("data", (data) => tags.push(data))
        .on("end", async () => {
          logger.success("Tags are loaded");
          res(check(argv, tags, db_tag, db_pub, master_wallet, logger));
        });
    });
  }
}

module.exports = { modePubAndTag };
