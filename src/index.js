#!/usr/bin/env node

const consola = require("consola");
const { setLogger } = require("./utils/logger");

const argv = require("./utils/argv").argv();
consola.info("ARGS:", argv);
argv.logger = consola;
const logger = setLogger(argv);

const { modePubAndTag } = require("./utils/mode/pub_tag");
const { modeAttachTag } = require("./utils/mode/attach_tag");

const { setDB } = require("./utils/db");

function loadDB(argv) {
  if (argv.mode === "pub_tag") {
    const [_db_pub, _db_tag] = setDB(argv);
    modePubAndTag(argv, false, null, _db_pub, _db_tag, logger);
  }

  if (argv.mode === "attach_tag") {
    const [_db_pub, _db_tag] = setDB(argv);
    modeAttachTag(argv, false, null, _db_pub, _db_tag, logger);
  }
}

function start(argv) {
  loadDB(argv);
}

start(argv);
