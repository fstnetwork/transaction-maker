const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { utils } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

const { encodeTagDeploy } = require("../tx/abi_encode");

async function publish_tags(new_tags, db_tag) {
  if (new_tags.length === 0) {
    consola.success("No new tag");
    return;
  }

  const batch_name = get_bytes(8);

  const provider = await getProvider();

  const txs = await Promise.all(
    new_tags.map((tag) => {
      const af = async () => {
        const publisher_wallet = tag.publisher_wallet;

        const unsigned_tx = await makeUnsignedTransactionObjectPromise(
          publisher_wallet.address.toLowerCase(),
          null,
          encodeTagDeploy(tag.tag_uniq_name, tag.tag_symbol),
          "0",
          true,
          "862764"
        );

        const signed_tx = await publisher_wallet.sign(unsigned_tx);

        await acc(batch_name, signed_tx, false);

        consola.info("Pending:", tag.tag_uniq_name);

        const txhash = utils.parseTransaction(signed_tx).hash.toLowerCase();

        return { txhash, tag, publisher_wallet };
      };

      return af();
    })
  );

  await go(batch_name);

  return await Promise.all(
    txs.map(({ txhash, tag, publisher_wallet }) => {
      return new Promise((res) => {
        provider.waitForTransaction(txhash, 1).then(async (receipt) => {
          if (receipt.status === 1) {
            const tag_object = {
              address: receipt.contractAddress.toLowerCase(),
              publisher_address: publisher_wallet.address.toLowerCase(),
              publisher_pk: publisher_wallet.privateKey,
              publisher_id: tag.publisher_id,
              tag_uniq_name: tag.tag_uniq_name,
            };

            await db_tag.put(tag.tag_uniq_name, JSON.stringify(tag_object));

            consola.success("Deployed:", tag.tag_uniq_name);

            res({ txhash, status: "successful" });
          } else {
            consola.success("Failed:", tag.tag_uniq_name);

            res({ txhash, status: "failed" });
          }
        });
      });
    })
  );
}

module.exports = { publish_tags };
