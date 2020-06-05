const a = require("./a.json");
const b = require("./b.json");

const map = {};

a.result.forEach((tx) => {
  if (map[tx.from] === undefined) {
    map[tx.from] = [];
  }

  map[tx.from].push({ queue: "a", nonce: parseInt(tx.nonce, 16) });
});

b.result.forEach((tx) => {
  if (map[tx.from] === undefined) {
    map[tx.from] = [];
  }

  map[tx.from].push({ queue: "b", nonce: parseInt(tx.nonce, 16) });
});

Object.keys(map).forEach((k) => {
  let from = map[k];

  map[k] = from
    .sort((a, b) => {
      return a.nonce - b.nonce;
    })
    .map((o) => {
      return `${o.queue}-${o.nonce}`;
    });
});

console.dir(map);
