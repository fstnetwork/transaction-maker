#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));

const { modePubAndTag } = require("./utils/mode/pub_tag");

function loadDB() {
  if (argv.mode === "pub_tag") {
    modePubAndTag();
  }
}

function start() {
  loadDB();
}

start();
