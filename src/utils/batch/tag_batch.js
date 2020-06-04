const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { utils } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

const { encodeTagDeploy } = require("../tx/abi_encode");

async function publish_tags(new_tags, db_tag) {
  if (new_tags.length === 0) {
    return;
  }

  const batch_name = get_bytes(16);

  const provider = await getProvider();

  for (const tag of new_tags) {
    const publisher_wallet = tag.publisher_wallet;

    const unsigned_tx = await makeUnsignedTransactionObjectPromise(
      publisher_wallet.address,
      null,
      encodeTagDeploy(tag.tag_name, tag.tag_symbol),
      "0",
      true,
      "862764"
    );

    const signed_tx = await publisher_wallet.sign(unsigned_tx);

    await acc(batch_name, signed_tx, false);

    consola.info("Deploying:", tag.tag_name);

    const txhash = utils.parseTransaction(signed_tx).hash.toLowerCase();

    provider.waitForTransaction(txhash, 2).then(async (receipt) => {
      const tag_object = {
        address: receipt.contractAddress.toLowerCase(),
        publisher_address: publisher_wallet.address,
        publisher_id: tag.publisher_id,
      };

      await db_tag.put(tag.tag_name, JSON.stringify(tag_object));

      consola.success("Deployed:", tag.tag_name);
    });
  }

  await go(batch_name);
}

module.exports = { publish_tags };
