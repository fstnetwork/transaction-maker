const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { utils } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

const { encodeTagDeploy } = require("../tx/abi_encode");

async function fire_attaches(new_attaches) {
  if (new_attaches.length === 0) {
    consola.success("No new tag");
    return;
  }

  const batch_name = get_bytes(16);

  const provider = await getProvider();

  await Promise.all(
    new_attaches.map((tag) => {
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

        provider.waitForTransaction(txhash, 2).then(async (receipt) => {
          const tag_object = {
            address: receipt.contractAddress.toLowerCase(),
            publisher_address: publisher_wallet.address.toLowerCase(),
            publisher_id: tag.publisher_id,
          };

          await db_tag.put(tag.tag_uniq_name, JSON.stringify(tag_object));

          consola.success("Deployed:", tag.tag_uniq_name);
        });
      };

      return af();
    })
  );

  await go(batch_name);
}

module.exports = { fire_attaches };