const consola = require("consola");

const { utils } = require("ethers");

const Bottleneck = require("bottleneck");

const limiterMap = {};

"0123456789abcdef".split("").forEach((c1) => {
  "0123456789abcdef".split("").forEach((c2) => {
    limiterMap[`${c1}${c2}`] = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1,
    });
  });
});

const {
  submitSignedTransactionAsyncPromise,
} = require("../tx/submit_signed_tx");

const batchMap = {};

async function acc(batch_name, signed_tx, eager) {
  try {
    if (batchMap[batch_name] === undefined) {
      batchMap[batch_name] = {};
    }

    const txobj = utils.parseTransaction(signed_tx);
    const from = txobj.from.toLowerCase();
    const from_prefix = from.replace("0x", "").slice(0, 2);

    const accf = async () => {
      {
        try {
          if (batchMap[batch_name][from] === undefined) {
            batchMap[batch_name][from] = [];
          }

          if (eager === true) {
            batchMap[batch_name][from].push({
              signed_tx,
              txobj,
            });

            batchMap[batch_name][from].sort(
              (a, b) => Number(a.txobj.nonce) - Number(b.txobj.nonce)
            );

            return await go_eager_queue(batchMap[batch_name][from], batch_name);
          } else {
            batchMap[batch_name][from].push({
              signed_tx,
              txobj,
            });

            batchMap[batch_name][from].sort(
              (a, b) => Number(a.txobj.nonce) - Number(b.txobj.nonce)
            );

            return { txobj, in_batch: true };
          }
        } catch (err) {
          throw err;
        }
      }
    };

    return await limiterMap[from_prefix].schedule(() => accf());
  } catch (err) {
    consola.error("acc", batch_name, signed_tx, err);
    throw err;
  }
}

async function go_eager_queue(queueObj, batch_name) {
  try {
    const queue = queueObj.splice(0, queueObj.length);

    while (true) {
      try {
        const qp = queue.pop();

        if (qp === null || qp === undefined) {
          break;
        }

        await submitSignedTransactionAsyncPromise(qp.signed_tx, null);

        consola.info(
          "go_eager",
          batch_name,
          qp.txobj.from.toLowerCase(),
          qp.txobj.nonce
        );
      } catch (_) {}
    }

    consola.info("go_eager", batch_name, "done");

    return true;
  } catch (err) {
    consola.error("go_eager_queue", queueObj);
    throw err;
  }
}

async function go(batch_name) {
  if (batchMap[batch_name] === undefined || batchMap[batch_name] === null) {
    return;
  }

  try {
    const senders_queues = Object.keys(batchMap[batch_name]).map((addr) => {
      return {
        from: addr,
        queue: batchMap[batch_name][addr],
      };
    });

    await Promise.all(
      senders_queues.map((queueObj) => {
        const from = queueObj.from.toLowerCase();
        const from_prefix = from.replace("0x", "").slice(0, 2);
        const queue = queueObj.queue.splice(0, queueObj.queue.length);

        return limiterMap[from_prefix].schedule(async () => {
          while (true) {
            try {
              const qp = queue.pop();

              if (qp === null || qp === undefined) {
                break;
              }

              await submitSignedTransactionAsyncPromise(qp.signed_tx, null);

              consola.info(
                "go",
                batch_name,
                qp.txobj.from.toLowerCase(),
                qp.txobj.nonce
              );
            } catch (_) {}
          }
        });
      })
    );

    consola.success("go", batch_name, "done");

    return true;
  } catch (err) {
    consola.error("go", batch_name, err);
  }
}

module.exports = {
  acc,
  go,
};
