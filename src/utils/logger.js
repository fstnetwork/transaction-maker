const consola = require("consola");

let logger = null;

function setLogger(argv) {
  if (logger !== null) {
    return logger;
  }

  if (argv.logger === undefined || argv.logger === null) {
    logger = console;

    logger.success = logger.log;
  }

  if (argv.logger === "default") {
    logger = consola;
  }

  if (
    argv.logger !== undefined &&
    argv.logger !== null &&
    argv.logger !== "default"
  ) {
    logger = argv.logger;
  }

  return logger;
}

function getLogger() {
  return logger;
}

module.exports = { setLogger, getLogger };
