const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { Wallet } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

const { encodeTagDeploy } = require("../tx/abi_encode");

async function publish_tags(new_tags, db_tag) {
  const batch_name = get_bytes(16);

  for (tag of new_tags) {
    const publisher_wallet = tag.publisher_wallet;

    const unsigned_tx = await makeUnsignedTransactionObjectPromise(
      publisher_wallet.address,
      null,
      encodeTagDeploy(tag.tag_name, tag.tag_symbol),
      "0",
      false
    );

    const signed_tx = await publisher_wallet.sign(unsigned_tx);

    await acc(batch_name, signed_tx, false);

    consola.info("Deploying", tag_name);
  }

  await go(batch_name);
}

module.exports = { publish_tags };
