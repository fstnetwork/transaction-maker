const path = require("path");
const level = require("level");

const { setOptions, argv } = require("./utils/argv");

let db_pub = null;
let db_tag = null;

function setDB(argv) {
  if (db_pub === null && db_tag === null) {
    db_pub = level(path.resolve(argv.root_dir, "level_db_pub"));
    db_tag = level(path.resolve(argv.root_dir, "level_db_tag"));
  }

  return [db_pub, db_tag];
}

async function create_tags(options, tags_data) {
  setOptions(options);

  const [_db_pub, _db_tag] = setDB(argv());

  const { modePubAndTag } = require("./utils/mode/pub_tag");
  const result = await modePubAndTag(argv(), true, tags_data, _db_pub, _db_tag);

  return result.filter((o) => o.status === "successful").map((o) => o.txhash);
}

async function attach_tags(options, attaches_data) {
  setOptions(options);

  const [_db_pub, _db_tag] = setDB(argv());

  const { modeAttachTag } = require("./utils/mode/attach_tag");
  const result = await modeAttachTag(
    argv(),
    true,
    attaches_data,
    _db_pub,
    _db_tag
  );

  return result.filter((o) => o.status === "successful").map((o) => o.txhash);
}

module.exports = {
  create_tags,
  attach_tags,
};
