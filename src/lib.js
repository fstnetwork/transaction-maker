const { setLogger } = require("./utils/logger");

const { setOptions, argv } = require("./utils/argv");

const { setDB } = require("./utils/db");

async function create_tags(options, tags_data) {
  setOptions(options);
  const logger = setLogger(argv());

  const [_db_pub, _db_tag] = setDB(argv());

  const { modePubAndTag } = require("./utils/mode/pub_tag");
  const result = await modePubAndTag(
    argv(),
    true,
    tags_data,
    _db_pub,
    _db_tag,
    logger
  );

  return result.filter((o) => o.status === "successful").map((o) => o.txhash);
}

async function attach_tags(options, attaches_data) {
  setOptions(options);
  const logger = setLogger(argv());

  const [_db_pub, _db_tag] = setDB(argv());

  const { modeAttachTag } = require("./utils/mode/attach_tag");
  const result = await modeAttachTag(
    argv(),
    true,
    attaches_data,
    _db_pub,
    _db_tag,
    logger
  );

  return result.filter((o) => o.status === "successful").map((o) => o.txhash);
}

module.exports = {
  create_tags,
  attach_tags,
};
