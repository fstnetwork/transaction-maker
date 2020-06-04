const { getProvider } = require("./rpc");

const { getTransactionDetailsByHashPromise } = require("./tx_info");

const Bottleneck = require("bottleneck");

const limiter = new Bottleneck({
  maxConcurrent: 40,
  minTime: 20,
});

async function submitSignedTransactionSyncPromise(
  signed_tx_hex_string,
  metadata
) {
  try {
    const tx_resp = await (await getProvider()).sendTransaction(
      signed_tx_hex_string
    );
    const tx_rcpt = await tx_resp.wait(1);
    const tx_details = await getTransactionDetailsByHashPromise(
      tx_rcpt.transactionHash
    );

    return tx_details;
  } catch (err) {
    throw {
      message: "submit transaction failed: " + signed_tx_hex_string,
      metadata,
    };
  }
}

async function submitSignedTransactionAsyncPromise(
  signed_tx_hex_string,
  metadata
) {
  const s = async () => {
    return await (await getProvider()).sendTransaction(signed_tx_hex_string);
  };

  try {
    const tx_resp = await limiter.schedule(() => s());

    return tx_resp;
  } catch (err) {
    throw {
      message: "submit transaction failed: " + signed_tx_hex_string,
      metadata,
    };
  }
}

module.exports = {
  submitSignedTransactionSyncPromise,
  submitSignedTransactionAsyncPromise,
};
