const BN = require("bignumber.js");

const { getProvider, getNetworkIdPromise } = require("./rpc");

const { getNoncePromise } = require("./nonce_center");

const gasPrice = "1000000000";

async function estimateGasPromise(
  from_address,
  to_address,
  data_hex_string,
  value_wei_dec_string,
  skip_estimation,
  assigned_gas
) {
  let [networkId, nonce] = await Promise.all([
    getNetworkIdPromise(),
    getNoncePromise(from_address),
  ]);

  const tmp_tx_obj = {
    from: from_address,
    to: to_address,
    data: data_hex_string,
    value: value_wei_dec_string,
    gasPrice: gasPrice,
    nonce: nonce,
    chainId: networkId,
  };

  try {
    const result = skip_estimation
      ? new BN(assigned_gas)
      : await (await getProvider()).estimateGas(tmp_tx_obj);

    return {
      nonce: `0x${new BN(nonce).toString(16)}`,
      chainId: `0x${new BN(networkId).toString(16)}`,
      gasPrice: `0x${new BN(gasPrice).toString(16)}`,
      gasLimit: `0x${new BN(result.toString(10))
        .plus("10000")
        .times("1.2")
        .integerValue()
        .toString(16)}`,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = { estimateGasPromise };
