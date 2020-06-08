let options = null;

function argv() {
  if (options === null) {
    return require("minimist")(process.argv.slice(2));
  } else {
    return options;
  }
}

function setOptions(_options) {
  options = _options;
}

module.exports = {
  argv,
  setOptions,
};
