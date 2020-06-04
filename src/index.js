#!/usr/bin/env node

const consola = require("consola");

const argv = require("minimist")(process.argv.slice(2));

const { modePubAndTag } = require("./utils/mode/pub_tag");

function loadDB() {
  if (argv.mode === "pub_tag") {
    modePubAndTag();
  }
}

function start() {
  consola.info("ARGS:", argv);

  loadDB();
}

start();
