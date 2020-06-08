#!/usr/bin/env node

const consola = require("consola");

const argv = require("./utils/argv").argv();

const { modePubAndTag } = require("./utils/mode/pub_tag");
const { modeAttachTag } = require("./utils/mode/attach_tag");

function loadDB() {
  if (argv.mode === "pub_tag") {
    modePubAndTag(argv, false, null);
  }

  if (argv.mode === "attach_tag") {
    modeAttachTag(argv, false, null);
  }
}

function start() {
  consola.info("ARGS:", argv);

  loadDB();
}

start();
