#!/usr/bin/env node

const path = require("path");
const level = require("level");

const consola = require("consola");

const argv = require("./utils/argv").argv();

const { modePubAndTag } = require("./utils/mode/pub_tag");
const { modeAttachTag } = require("./utils/mode/attach_tag");

let db_pub = null;
let db_tag = null;

function setDB(argv) {
  if (db_pub === null && db_tag === null) {
    db_pub = level(path.resolve(argv.root_dir, "level_db_pub"));
    db_tag = level(path.resolve(argv.root_dir, "level_db_tag"));
  }

  return [db_pub, db_tag];
}

function loadDB() {
  if (argv.mode === "pub_tag") {
    const [_db_pub, _db_tag] = setDB(argv);
    modePubAndTag(argv, false, null, _db_pub, _db_tag);
  }

  if (argv.mode === "attach_tag") {
    const [_db_pub, _db_tag] = setDB(argv);
    modeAttachTag(argv, false, null, _db_pub, _db_tag);
  }
}

function start() {
  consola.info("ARGS:", argv);

  loadDB();
}

start();
