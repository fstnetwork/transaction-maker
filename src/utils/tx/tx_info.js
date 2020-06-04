const { getProvider } = require("./rpc");

async function getTransactionDetailsByHashPromise(tx_hash) {
  if (typeof tx_hash !== "string" || tx_hash.length !== 66) {
    throw new Error(
      'tx_hash should be a string which starts with "0x" and contains 66 chars in total'
    );
  }

  const [tx_obj, tx_rcpt] = await Promise.all([
    (await getProvider()).getTransaction(tx_hash),
    (await getProvider()).getTransactionReceipt(tx_hash),
  ]);

  return {
    transaction_object: tx_obj,
    transaction_receipt: tx_rcpt,
  };
}

module.exports = {
  getTransactionDetailsByHashPromise,
};
