const consola = require("consola");

const Bottleneck = require("bottleneck");

const nonce_limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1,
});

const { getProvider } = require("./rpc");

const NodeCache = require("node-cache");
const nonces = new NodeCache({ stdTTL: 1800, checkperiod: 400 });

async function internal_get_nonce_from_cache(address) {
  const nonce = nonces.get(address);

  if (nonce === undefined) {
    const tmpNonce = await (await getProvider()).getTransactionCount(
      address,
      "pending"
    );
    nonces.set(address, tmpNonce + 1);
    nonces.ttl(address, 1800);
    consola.info("nonce", address, tmpNonce);
    return tmpNonce;
  } else {
    nonces.set(address, nonce + 1);
    nonces.ttl(address, 1800);
    consola.info("nonce", address, nonce);
    return nonce;
  }
}

async function getNoncePromise(address) {
  return await nonce_limiter.schedule(() =>
    internal_get_nonce_from_cache(address.toLowerCase())
  );
}

module.exports = {
  getNoncePromise,
};
