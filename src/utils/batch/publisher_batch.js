const consola = require("consola");

const { get_bytes } = require("../rand");

const { getProvider } = require("../tx/rpc");

const { Wallet } = require("ethers");

const { acc, go } = require("../batch/tx");

const { makeUnsignedTransactionObjectPromise } = require("../tx/tx_obj_maker");

async function scan_publishers_and_fill_resource(
  publishers_map,
  master_wallet
) {
  const batch_name = get_bytes(8);

  const provider = await getProvider();

  await Promise.all(
    Object.keys(publishers_map)
      .map((k) => publishers_map[k])
      .map((publisher_pk) => {
        const af = async () => {
          const publisher_wallet = new Wallet(publisher_pk, provider);
          const publisher_eth_balance = await publisher_wallet.getBalance();

          if (publisher_eth_balance.lt("5000000000000000000")) {
            consola.info(
              "Less than 5 ETH:",
              publisher_wallet.address.toLowerCase()
            );

            const unsigned_tx = await makeUnsignedTransactionObjectPromise(
              master_wallet.address.toLowerCase(),
              publisher_wallet.address.toLowerCase(),
              "0x",
              "15000000000000000000",
              true,
              "21000"
            );

            const signed_tx = await master_wallet.sign(unsigned_tx);

            await acc(batch_name, signed_tx, false);
          } else {
            consola.success("ETH OK:", publisher_wallet.address.toLowerCase());
          }

          return 0;
        };

        return af();
      })
  );

  await go(batch_name);
}

module.exports = { scan_publishers_and_fill_resource };
