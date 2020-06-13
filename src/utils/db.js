const path = require("path");
const level = require("level");

let db_pub = null;
let db_tag = null;

function setDB(argv) {
  if (db_pub === null && db_tag === null) {
    db_pub = level(path.resolve(argv.root_dir, "level_db_pub"));
    db_tag = level(path.resolve(argv.root_dir, "level_db_tag"));
  }

  return [db_pub, db_tag];
}

module.exports = {
  setDB,
};
