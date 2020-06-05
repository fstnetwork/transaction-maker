#!/usr/bin/env node

const consola = require("consola");

const argv = require("minimist")(process.argv.slice(2));

const { modePubAndTag } = require("./utils/mode/pub_tag");
const { modeAttachTag } = require("./utils/mode/attach_tag");

function loadDB() {
  if (argv.mode === "pub_tag") {
    modePubAndTag();
  }

  if (argv.mode === "attach_tag") {
    modeAttachTag();
  }
}

function start() {
  consola.info("ARGS:", argv);

  loadDB();
}

start();
