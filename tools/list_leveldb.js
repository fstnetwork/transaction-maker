const consola = require("consola");

const argv = require("../src/utils/argv").argv();

const level = require("level");

level(argv.db, (err, db) => {
  if (err) {
    consola.error(err);
    return process.exit(1);
  }

  consola.info("DB opened\n");

  db.createReadStream()
    .on("data", (data) => {
      consola.log("K:", data.key, "\nV:", data.value, "\n");
    })
    .on("error", (err) => {
      consola.error(err);
    })
    .on("close", () => {
      consola.info("DB closed");
    });
});
