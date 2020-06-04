const consola = require("consola");

const ethers = require("ethers");

const argv = require("minimist")(process.argv.slice(2));

const json_rpc_url = argv.jsonrpc_http;

let networkId = null;

const provider = new ethers.providers.FallbackProvider([
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
]);

async function getProvider() {
  // consola.info(provider.providers.length, "getProvider()");
  return provider;
}

async function getNetworkIdPromise() {
  if (networkId === null) {
    const result = await (await getProvider()).getNetwork();
    networkId = result.chainId;
  }

  return networkId;
}

module.exports = {
  getProvider,
  getNetworkIdPromise,
};
