const BN = require("bignumber.js");

const { estimateGasPromise } = require("./estimate_gas");

async function makeUnsignedTransactionObjectPromise(
  from_address,
  to_address,
  data_hex_string,
  value_wei_dec_string,
  skip_estimation,
  assigned_gas
) {
  try {
    const estimated_result = await estimateGasPromise(
      from_address,
      to_address,
      data_hex_string,
      value_wei_dec_string,
      skip_estimation,
      assigned_gas
    );

    const transaction_obj = {
      ...estimated_result,
      to: to_address === null ? undefined : to_address,
      data: data_hex_string || "0x",
      value: `0x${new BN(value_wei_dec_string).toString(16)}`,
    };

    return transaction_obj;
  } catch (err) {
    throw err;
  }
}

module.exports = { makeUnsignedTransactionObjectPromise };
