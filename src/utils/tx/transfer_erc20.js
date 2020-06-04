const { encodeTransferToken } = require("./abi_encode");

const { makeUnsignedTransactionObjectPromise } = require("./tx_obj_maker");

async function makeTransferERC20UnsignedTransactionObjectPromise(
  token_address,
  sender_address,
  receiver_address,
  token_vaule_wei_dec_string,
  skip_estimation,
  assigned_gas
) {
  try {
    const data = encodeTransferToken(
      receiver_address,
      token_vaule_wei_dec_string
    );

    const unsigned_tx = await makeUnsignedTransactionObjectPromise(
      sender_address,
      token_address,
      data,
      "0",
      skip_estimation,
      assigned_gas
    );

    return unsigned_tx;
  } catch (err) {
    throw {
      message:
        "the token transfer will fail " +
        JSON.stringify({
          sender_address,
          receiver_address,
          token_vaule_wei_dec_string,
        }),
    };
  }
}

module.exports = {
  makeTransferERC20UnsignedTransactionObjectPromise,
};
