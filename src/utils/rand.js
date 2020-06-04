const c = require("crypto");

function get_bytes(n) {
  return c.randomBytes(n).toString("hex");
}

module.exports = {
  get_bytes,
};
