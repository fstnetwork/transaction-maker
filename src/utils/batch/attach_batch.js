const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { utils } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

const {
  encodeTransferToToToken,
  encodeTransferToken,
} = require("../tx/abi_encode");

async function fire_attaches(attaches_missions) {
  if (attaches_missions.length === 0) {
    consola.success("No new attach");
    return;
  }

  const batch_name = get_bytes(8);

  const provider = await getProvider();

  const txs = await Promise.all(
    attaches_missions.map((attach) => {
      const af = async () => {
        const publisher_wallet = attach.tag_info.publisher_wallet;

        const unsigned_tx = await makeUnsignedTransactionObjectPromise(
          publisher_wallet.address.toLowerCase(),
          attach.tag_info.address,
          attach.from === "publisher"
            ? encodeTransferToken(attach.to, attach.amount_dec)
            : encodeTransferToToToken(
                attach.from,
                attach.to,
                attach.amount_dec
              ),
          "0",
          true,
          "100000"
        );

        const signed_tx = await publisher_wallet.sign(unsigned_tx);

        await acc(batch_name, signed_tx, false);

        consola.info(
          "Pending:",
          attach.tag_info.tag_uniq_name,
          attach.from,
          attach.to,
          attach.amount_dec
        );

        const txhash = utils.parseTransaction(signed_tx).hash.toLowerCase();

        provider.waitForTransaction(txhash, 1).then(async (receipt) => {
          if (receipt.status === 1) {
            consola.success(
              "Confirmed:",
              attach.tag_info.tag_uniq_name,
              attach.from,
              attach.to,
              attach.amount_dec
            );
          } else {
            consola.error(
              "Error:",
              attach.tag_info.tag_uniq_name,
              attach.from,
              attach.to,
              attach.amount_dec
            );
          }
        });

        return txhash;
      };

      return af();
    })
  );

  await go(batch_name);

  return txs;
}

module.exports = { fire_attaches };
