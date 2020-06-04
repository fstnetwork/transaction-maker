const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { Wallet } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

async function scan_publishers(publishers_map, master_wallet) {
  const batch_name = get_bytes(16);

  const provider = await getProvider();

  for (const k in publishers_map) {
    const publisher_pk = publishers_map[k];
    const publisher_wallet = new Wallet(publisher_pk, provider);
    const publisher_eth_balance = await publisher_wallet.getBalance();

    if (publisher_eth_balance.lt("15000000000000000000")) {
      consola.warn("Less than 15 ETH", publisher_wallet.address);

      const unsigned_tx = await makeUnsignedTransactionObjectPromise(
        master_wallet.address,
        publisher_wallet.address,
        "0x",
        "15000000000000000000",
        true,
        "21000"
      );

      const signed_tx = await master_wallet.sign(unsigned_tx);

      await acc(batch_name, signed_tx, false);
    } else {
      consola.success("OK", publisher_wallet.address);
    }
  }

  go(batch_name);
}

module.exports = { scan_publishers };
