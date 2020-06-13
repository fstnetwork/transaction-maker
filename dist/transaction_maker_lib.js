(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("consola"), require("minimist"), require("path"), require("level"), require("fs"), require("csv-parser"), require("strip-bom-stream"), require("ethers"), require("bottleneck"), require("bignumber.js"), require("node-cache"));
	else if(typeof define === 'function' && define.amd)
		define(["consola", "minimist", "path", "level", "fs", "csv-parser", "strip-bom-stream", "ethers", "bottleneck", "bignumber.js", "node-cache"], factory);
	else if(typeof exports === 'object')
		exports["TransactionMaker"] = factory(require("consola"), require("minimist"), require("path"), require("level"), require("fs"), require("csv-parser"), require("strip-bom-stream"), require("ethers"), require("bottleneck"), require("bignumber.js"), require("node-cache"));
	else
		root["TransactionMaker"] = factory(root["consola"], root["minimist"], root["path"], root["level"], root["fs"], root["csv-parser"], root["strip-bom-stream"], root["ethers"], root["bottleneck"], root["bignumber.js"], root["node-cache"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__9__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__18__, __WEBPACK_EXTERNAL_MODULE__22__, __WEBPACK_EXTERNAL_MODULE__25__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const { setLogger } = __webpack_require__(1);

const { setOptions, argv } = __webpack_require__(3);

const { setDB } = __webpack_require__(5);

async function create_tags(options, tags_data) {
  setOptions(options);
  const logger = setLogger(argv());

  const [_db_pub, _db_tag] = setDB(argv());

  const { modePubAndTag } = __webpack_require__(8);
  const result = await modePubAndTag(
    argv(),
    true,
    tags_data,
    _db_pub,
    _db_tag,
    logger
  );

  return result.filter((o) => o.status === "successful").map((o) => o.txhash);
}

async function attach_tags(options, attaches_data) {
  setOptions(options);
  const logger = setLogger(argv());

  const [_db_pub, _db_tag] = setDB(argv());

  const { modeAttachTag } = __webpack_require__(31);
  const result = await modeAttachTag(
    argv(),
    true,
    attaches_data,
    _db_pub,
    _db_tag,
    logger
  );

  return result.filter((o) => o.status === "successful").map((o) => o.txhash);
}

module.exports = {
  create_tags,
  attach_tags,
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const consola = __webpack_require__(2);

let logger = null;

function setLogger(argv) {
  if (logger !== null) {
    return logger;
  }

  if (argv.logger === undefined || argv.logger === null) {
    logger = console;

    logger.success = logger.log;
  }

  if (argv.logger === "default") {
    logger = consola;
  }

  if (
    argv.logger !== undefined &&
    argv.logger !== null &&
    argv.logger !== "default"
  ) {
    logger = argv.logger;
  }

  return logger;
}

function getLogger() {
  return logger;
}

module.exports = { setLogger, getLogger };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let options = null;

function argv() {
  if (options === null) {
    return __webpack_require__(4)(process.argv.slice(2));
  } else {
    return options;
  }
}

function setOptions(_options) {
  options = _options;
}

module.exports = {
  argv,
  setOptions,
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(6);
const level = __webpack_require__(7);

let db_pub = null;
let db_tag = null;

function setDB(argv) {
  if (db_pub === null && db_tag === null) {
    db_pub = level(path.resolve(argv.root_dir, "level_db_pub"));
    db_tag = level(path.resolve(argv.root_dir, "level_db_tag"));
  }

  return [db_pub, db_tag];
}

module.exports = {
  setDB,
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(9);
const path = __webpack_require__(6);

const csv = __webpack_require__(10);
const stripBom = __webpack_require__(11);

const { Wallet } = __webpack_require__(12);

const { get_bytes } = __webpack_require__(13);

const {
  scan_publishers_and_fill_resource,
} = __webpack_require__(15);

const { publish_tags } = __webpack_require__(26);

async function check(argv, _tags, db_tag, db_pub, master_wallet, logger) {
  let version_id = argv.version_id + "";
  if (version_id === "rand") {
    version_id = get_bytes(4);
  }

  const [tag_in_db_map, pub_in_db_map] = await Promise.all([
    new Promise((res, rej) => {
      const tag_in_db_map = {};

      db_tag
        .createReadStream()
        .on("data", (data) => {
          tag_in_db_map[data.key] = data.value;
        })
        .on("error", (err) => {
          rej(err);
        })
        .on("close", () => {
          res(tag_in_db_map);
        });
    }),
    new Promise((res, rej) => {
      const pub_in_db_map = {};

      db_pub
        .createReadStream()
        .on("data", (data) => {
          pub_in_db_map[data.key] = data.value;
        })
        .on("error", (err) => {
          rej(err);
        })
        .on("close", () => {
          res(pub_in_db_map);
        });
    }),
  ]);

  const new_pubs = [];
  const new_pubs_map = {};
  const new_tags = [];

  for (const tag of _tags) {
    if (
      pub_in_db_map[tag.publisher_id] === undefined &&
      new_pubs_map[tag.publisher_id] === undefined
    ) {
      const new_wallet = Wallet.createRandom();

      await db_pub.put(tag.publisher_id, new_wallet.privateKey);

      new_pubs.push({
        publisher_id: tag.publisher_id,
        publisher_wallet: new_wallet,
        publisher_address: new_wallet.address.toLowerCase(),
      });

      new_pubs_map[tag.publisher_id] = new_wallet;
    }

    if (
      tag_in_db_map[`${tag.tag_uniq_name}:${version_id}`] === undefined ||
      tag_in_db_map[`${tag.tag_uniq_name}:${version_id}`] === "deploying"
    ) {
      await db_tag.put(`${tag.tag_uniq_name}:${version_id}`, "deploying");

      const publisher_wallet = new Wallet(await db_pub.get(tag.publisher_id));

      new_tags.push({
        publisher_id: tag.publisher_id,
        publisher_wallet: publisher_wallet,
        publisher_address: publisher_wallet.address.toLowerCase(),
        tag_uniq_name: `${tag.tag_uniq_name}:${version_id}`,
        tag_symbol: `${tag.tag_uniq_name.slice(0, 8)}:${version_id.slice(
          0,
          8
        )}`,
      });
    }
  }

  new_pubs
    .map((p) => {
      return {
        id: p.publisher_id,
        address: p.publisher_address,
      };
    })
    .forEach((p) => {
      logger.info("New publisher:", p.id, p.address);
    });

  new_tags
    .map((t) => {
      return {
        publisher_id: t.publisher_id,
        publisher_address: t.publisher_address,
        tag_uniq_name: t.tag_uniq_name,
      };
    })
    .forEach((t) => {
      logger.info(
        "New tag:",
        t.tag_uniq_name,
        t.publisher_id,
        t.publisher_address
      );
    });

  const after_import_pub_in_db_map = await new Promise((res, rej) => {
    const pub_in_db_map = {};

    db_pub
      .createReadStream()
      .on("data", (data) => {
        pub_in_db_map[data.key] = data.value;
      })
      .on("error", (err) => {
        rej(err);
      })
      .on("close", () => {
        res(pub_in_db_map);
      });
  });

  await scan_publishers_and_fill_resource(
    after_import_pub_in_db_map,
    master_wallet,
    logger
  );

  return await publish_tags(new_tags, db_tag, logger);
}

async function modePubAndTag(argv, is_lib, tags_data, db_pub, db_tag, logger) {
  let master_pk = null;

  try {
    const file_master_pk_json = fs.readFileSync(
      path.resolve(argv.root_dir, "master_pk")
    );
    master_pk = JSON.parse(file_master_pk_json).master_pk;
  } catch (err) {
    logger.warn(err);
  }

  if (master_pk === null) {
    if (process.env.MASTER_PK_HEX_STR === undefined) {
      logger.error("no MASTER_PK_HEX_STR env is assigned");
      process.exit(1);
    } else {
      master_pk = process.env.MASTER_PK_HEX_STR;
    }
  }

  const master_wallet = new Wallet(master_pk);

  logger.success("Master wallet address:", master_wallet.address.toLowerCase());

  if (is_lib === true) {
    return await check(argv, tags_data, db_tag, db_pub, master_wallet, logger);
  } else {
    const tags = [];

    return await new Promise((res) => {
      fs.createReadStream(argv.tags)
        .pipe(stripBom())
        .pipe(csv())
        .on("data", (data) => tags.push(data))
        .on("end", async () => {
          logger.success("Tags are loaded");
          res(check(argv, tags, db_tag, db_pub, master_wallet, logger));
        });
    });
  }
}

module.exports = { modePubAndTag };


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const c = __webpack_require__(14);

function get_bytes(n) {
  return c.randomBytes(n).toString("hex");
}

module.exports = {
  get_bytes,
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const { get_bytes } = __webpack_require__(13);

const { getProvider } = __webpack_require__(16);

const { Wallet } = __webpack_require__(12);

const { acc, go } = __webpack_require__(17);

const { makeUnsignedTransactionObjectPromise } = __webpack_require__(21);

async function scan_publishers_and_fill_resource(
  publishers_map,
  master_wallet,
  logger
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
            logger.info(
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
            logger.success("ETH OK:", publisher_wallet.address.toLowerCase());
          }

          return 0;
        };

        return af();
      })
  );

  await go(batch_name);
}

module.exports = { scan_publishers_and_fill_resource };


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

const { getLogger } = __webpack_require__(1);
const logger = getLogger();

const ethers = __webpack_require__(12);

const argv = __webpack_require__(3).argv();

const json_rpc_url = argv.jsonrpc_http;

logger.success("JSON RPC:", json_rpc_url);

let networkId = null;

const provider = new ethers.providers.FallbackProvider([
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
  new ethers.providers.JsonRpcProvider(json_rpc_url),
]);

async function getProvider() {
  // logger.info(provider.providers.length, "getProvider()");
  return provider;
}

async function getNetworkIdPromise() {
  if (networkId === null) {
    const result = await (await getProvider()).getNetwork();
    networkId = result.chainId;
  }

  return networkId;
}

module.exports = {
  getProvider,
  getNetworkIdPromise,
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

const { getLogger } = __webpack_require__(1);
const logger = getLogger();

const { utils } = __webpack_require__(12);

const Bottleneck = __webpack_require__(18);

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
} = __webpack_require__(19);

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

          batchMap[batch_name][from].push({
            signed_tx,
            txobj,
          });

          batchMap[batch_name][from].sort(
            (a, b) => Number(a.txobj.nonce) - Number(b.txobj.nonce)
          );

          if (eager === true) {
            return await go_eager_queue(batchMap[batch_name][from], batch_name);
          } else {
            if (batchMap[batch_name][from].length >= 40) {
              return await go_eager_queue(
                batchMap[batch_name][from],
                batch_name
              );
            }

            return { txobj, in_batch: true };
          }
        } catch (err) {
          throw err;
        }
      }
    };

    return await limiterMap[from_prefix].schedule(() => accf());
  } catch (err) {
    logger.error("acc", batch_name, signed_tx, err);
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

        logger.info(
          "Go eager:",
          batch_name,
          qp.txobj.from.toLowerCase(),
          qp.txobj.nonce
        );
      } catch (_) {}
    }

    logger.info("Go eager:", batch_name, "done");

    return true;
  } catch (err) {
    logger.error("Go eager:", queueObj);
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

              logger.info(
                "Go:",
                batch_name,
                qp.txobj.from.toLowerCase(),
                qp.txobj.nonce
              );
            } catch (_) {}
          }
        });
      })
    );

    logger.success("Go:", batch_name, "done");

    return true;
  } catch (err) {
    logger.error("Go:", batch_name, err);
  }
}

module.exports = {
  acc,
  go,
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__18__;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

const { getProvider } = __webpack_require__(16);

const { getTransactionDetailsByHashPromise } = __webpack_require__(20);

const Bottleneck = __webpack_require__(18);

const limiter = new Bottleneck({
  maxConcurrent: 40,
  minTime: 1,
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


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

const { getProvider } = __webpack_require__(16);

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


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

const BN = __webpack_require__(22);

const { estimateGasPromise } = __webpack_require__(23);

async function makeUnsignedTransactionObjectPromise(
  from_address,
  to_address,
  data_hex_string,
  value_wei_dec_string,
  skip_estimation,
  assigned_gas
) {
  try {
    const estimated_result = await estimateGasPromise(
      from_address,
      to_address,
      data_hex_string,
      value_wei_dec_string,
      skip_estimation,
      assigned_gas
    );

    const transaction_obj = {
      ...estimated_result,
      to: to_address === null ? undefined : to_address,
      data: data_hex_string || "0x",
      value: `0x${new BN(value_wei_dec_string).toString(16)}`,
    };

    return transaction_obj;
  } catch (err) {
    throw err;
  }
}

module.exports = { makeUnsignedTransactionObjectPromise };


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__22__;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

const BN = __webpack_require__(22);

const { getProvider, getNetworkIdPromise } = __webpack_require__(16);

const { getNoncePromise } = __webpack_require__(24);

const gasPrice = "1000000000";

async function estimateGasPromise(
  from_address,
  to_address,
  data_hex_string,
  value_wei_dec_string,
  skip_estimation,
  assigned_gas
) {
  let [networkId, nonce] = await Promise.all([
    getNetworkIdPromise(),
    getNoncePromise(from_address),
  ]);

  const tmp_tx_obj = {
    from: from_address,
    to: to_address === null ? undefined : to_address,
    data: data_hex_string,
    value: value_wei_dec_string,
    gasPrice: gasPrice,
    nonce: nonce,
    chainId: networkId,
  };

  try {
    const result = skip_estimation
      ? new BN(assigned_gas)
      : await (await getProvider()).estimateGas(tmp_tx_obj);

    return {
      nonce: `0x${new BN(nonce).toString(16)}`,
      chainId: `0x${new BN(networkId).toString(16)}`,
      gasPrice: `0x${new BN(gasPrice).toString(16)}`,
      gasLimit: `0x${new BN(result.toString(10))
        .plus("10000")
        .times("1.2")
        .integerValue()
        .toString(16)}`,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = { estimateGasPromise };


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const { getLogger } = __webpack_require__(1);
const logger = getLogger();

const Bottleneck = __webpack_require__(18);

const limiterMap = {};

"0123456789abcdef".split("").forEach((c1) => {
  "0123456789abcdef".split("").forEach((c2) => {
    limiterMap[`${c1}${c2}`] = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1,
    });
  });
});

const { getProvider } = __webpack_require__(16);

const NodeCache = __webpack_require__(25);
const nonces = new NodeCache({ stdTTL: 3600, checkperiod: 400 });

async function internal_get_nonce_from_cache(address) {
  const nonce = nonces.get(address);

  if (nonce === undefined) {
    const tmpNonce = await (await getProvider()).getTransactionCount(
      address,
      "pending"
    );
    nonces.set(address, tmpNonce + 1);
    nonces.ttl(address, 3600);
    logger.info("Get nonce:", address, tmpNonce);
    return tmpNonce;
  } else {
    nonces.set(address, nonce + 1);
    nonces.ttl(address, 3600);
    logger.info("Get nonce:", address, nonce);
    return nonce;
  }
}

async function getNoncePromise(address) {
  return await limiterMap[address.replace("0x", "").slice(0, 2)].schedule(() =>
    internal_get_nonce_from_cache(address.toLowerCase())
  );
}

module.exports = {
  getNoncePromise,
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__25__;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const { get_bytes } = __webpack_require__(13);

const { getProvider } = __webpack_require__(16);

const { utils } = __webpack_require__(12);

const { acc, go } = __webpack_require__(17);

const { makeUnsignedTransactionObjectPromise } = __webpack_require__(21);

const { encodeTagDeploy } = __webpack_require__(27);

async function publish_tags(new_tags, db_tag, logger) {
  if (new_tags.length === 0) {
    logger.success("No new tag");
    return [];
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

        logger.info("Pending:", tag.tag_uniq_name);

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

            logger.success("Deployed:", tag.tag_uniq_name);

            res({ txhash, status: "successful" });
          } else {
            logger.success("Failed:", tag.tag_uniq_name);

            res({ txhash, status: "failed" });
          }
        });
      });
    })
  );
}

module.exports = { publish_tags };


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

const BN = __webpack_require__(22);

const erc20_transfer_func_signature = "0xa9059cbb";
const erc20_get_balance_func_signature = "0x70a08231";
const erc20_transfertoto_func_signature = "0x9e7306df";

const { getDeployTransactionData } = __webpack_require__(28);

function encodeTransferToken(receiver_address, token_value_wei_dec_string) {
  if (
    typeof receiver_address !== "string" ||
    !receiver_address.startsWith("0x") ||
    receiver_address.length !== 42
  ) {
    throw new Error(
      'receiver_address should be a string which starts with "0x" and contains 42 chars in total'
    );
  }

  if (
    typeof token_value_wei_dec_string !== "string" ||
    token_value_wei_dec_string.startsWith("0x")
  ) {
    throw new Error(
      "token_value_wei_dec_string should be a decimal string in wei"
    );
  }

  const tmp_value_wei_hex_string = new BN(token_value_wei_dec_string).toString(
    16
  );
  const zeros_num = 64 - tmp_value_wei_hex_string.length;

  if (zeros_num < 0) {
    throw new Error("token_value_wei_dec_string should be less than 2^256-1");
  }

  let value_wei_hex_string = "";

  for (let i = 0; i < zeros_num; i++) {
    value_wei_hex_string += "0";
  }

  value_wei_hex_string += tmp_value_wei_hex_string;

  // signature + receiver_address + value_uint256
  return `${erc20_transfer_func_signature}000000000000000000000000${receiver_address.replace(
    "0x",
    ""
  )}${value_wei_hex_string}`;
}

function encodeGetBalance(holder_address) {
  const _24zeros = "000000000000000000000000";

  return `${erc20_get_balance_func_signature}${_24zeros}${holder_address
    .toLowerCase()
    .replace("0x", "")}`;
}

function encodeGetVoucherName() {
  return `0x06fdde03`;
}

function encodeGetVoucherSymbol() {
  return `0x95d89b41`;
}

function encodeTagDeploy(name, symbol) {
  const tmp = getDeployTransactionData(name, symbol);

  if (!tmp.startsWith("0x")) {
    return `0x${tmp}`;
  }

  return tmp;
}

function encodeTransferToToToken(
  mid_receiver_address,
  receiver_address,
  token_value_wei_dec_string
) {
  if (
    typeof mid_receiver_address !== "string" ||
    !mid_receiver_address.startsWith("0x") ||
    mid_receiver_address.length !== 42
  ) {
    throw new Error(
      'mid_receiver_address should be a string which starts with "0x" and contains 42 chars in total'
    );
  }

  if (
    typeof receiver_address !== "string" ||
    !receiver_address.startsWith("0x") ||
    receiver_address.length !== 42
  ) {
    throw new Error(
      'receiver_address should be a string which starts with "0x" and contains 42 chars in total'
    );
  }

  if (
    typeof token_value_wei_dec_string !== "string" ||
    token_value_wei_dec_string.startsWith("0x")
  ) {
    throw new Error(
      "token_value_wei_dec_string should be a decimal string in wei"
    );
  }

  const tmp_value_wei_hex_string = new BN(token_value_wei_dec_string).toString(
    16
  );
  const zeros_num = 64 - tmp_value_wei_hex_string.length;

  if (zeros_num < 0) {
    throw new Error("token_value_wei_dec_string should be less than 2^256-1");
  }

  let value_wei_hex_string = "";

  for (let i = 0; i < zeros_num; i++) {
    value_wei_hex_string += "0";
  }

  value_wei_hex_string += tmp_value_wei_hex_string;

  // signature + mid_receiver_address + receiver_address + value_uint256
  return `${erc20_transfertoto_func_signature}000000000000000000000000${mid_receiver_address.replace(
    "0x",
    ""
  )}000000000000000000000000${receiver_address.replace(
    "0x",
    ""
  )}${value_wei_hex_string}`;
}

module.exports = {
  encodeTransferToken,
  encodeGetBalance,
  encodeGetVoucherName,
  encodeGetVoucherSymbol,
  encodeTagDeploy,
  encodeTransferToToToken,
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

const { ContractFactory } = __webpack_require__(12);

const abi = __webpack_require__(29);
const bytecode = __webpack_require__(30);

const Tag = new ContractFactory(abi, bytecode);

function getDeployTransactionData(name, symbol) {
  const { data } = Tag.getDeployTransaction(name, symbol, "1000000000000000");

  return data;
}

module.exports = {
  getDeployTransactionData,
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "__totalSupply",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "mid_recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferToTo",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = `0x60806040523480156200001157600080fd5b5060405162000dd138038062000dd1833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b506040526020908101518551909350620001b992506003918601906200038f565b508151620001cf9060049060208501906200038f565b506005805460ff19169055620001ef33826001600160e01b03620001f816565b50505062000434565b6001600160a01b0382166200026e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b6200028a816002546200031360201b6200083e1790919060201c565b6002556001600160a01b03821660009081526020818152604090912054620002bd9183906200083e62000313821b17901c565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6000828201838110156200038857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620003d257805160ff191683800117855562000402565b8280016001018555821562000402579182015b8281111562000402578251825591602001919060010190620003e5565b506200041092915062000414565b5090565b6200043191905b808211156200041057600081556001016200041b565b90565b61098d80620004446000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806370a082311161007157806370a082311461021057806395d89b41146102365780639e7306df1461023e578063a457c2d714610274578063a9059cbb146102a0578063dd62ed3e146102cc576100b4565b806306fdde03146100b9578063095ea7b31461013657806318160ddd1461017657806323b872dd14610190578063313ce567146101c657806339509351146101e4575b600080fd5b6100c16102fa565b6040805160208082528351818301528351919283929083019185019080838360005b838110156100fb5781810151838201526020016100e3565b50505050905090810190601f1680156101285780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101626004803603604081101561014c57600080fd5b506001600160a01b038135169060200135610390565b604080519115158252519081900360200190f35b61017e6103ad565b60408051918252519081900360200190f35b610162600480360360608110156101a657600080fd5b506001600160a01b038135811691602081013590911690604001356103b3565b6101ce610440565b6040805160ff9092168252519081900360200190f35b610162600480360360408110156101fa57600080fd5b506001600160a01b038135169060200135610449565b61017e6004803603602081101561022657600080fd5b50356001600160a01b031661049d565b6100c16104b8565b6101626004803603606081101561025457600080fd5b506001600160a01b03813581169160208101359091169060400135610519565b6101626004803603604081101561028a57600080fd5b506001600160a01b038135169060200135610538565b610162600480360360408110156102b657600080fd5b506001600160a01b0381351690602001356105a6565b61017e600480360360408110156102e257600080fd5b506001600160a01b03813581169160200135166105ba565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103865780601f1061035b57610100808354040283529160200191610386565b820191906000526020600020905b81548152906001019060200180831161036957829003601f168201915b5050505050905090565b60006103a461039d6105e5565b84846105e9565b50600192915050565b60025490565b60006103c08484846106d5565b610436846103cc6105e5565b610431856040518060600160405280602881526020016108e8602891396001600160a01b038a1660009081526001602052604081209061040a6105e5565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6107a716565b6105e9565b5060019392505050565b60055460ff1690565b60006103a46104566105e5565b8461043185600160006104676105e5565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff61083e16565b6001600160a01b031660009081526020819052604090205490565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156103865780601f1061035b57610100808354040283529160200191610386565b600061052d6105266105e5565b85846106d5565b6104368484846106d5565b60006103a46105456105e5565b8461043185604051806060016040528060258152602001610934602591396001600061056f6105e5565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff6107a716565b60006103a46105b36105e5565b84846106d5565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b3390565b6001600160a01b03831661062e5760405162461bcd60e51b81526004018080602001828103825260248152602001806109106024913960400191505060405180910390fd5b6001600160a01b0382166106735760405162461bcd60e51b81526004018080602001828103825260228152602001806108a06022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b610718816040518060600160405280602681526020016108c2602691396001600160a01b038616600090815260208190526040902054919063ffffffff6107a716565b6001600160a01b03808516600090815260208190526040808220939093559084168152205461074d908263ffffffff61083e16565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156108365760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156107fb5781810151838201526020016107e3565b50505050905090810190601f1680156108285780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610898576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b939250505056fe45524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa265627a7a72315820983790cc341bbeb1e20e32f025fd09c6b18e9ff6853fdb87b5e384c92941bce564736f6c63430005110032`;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(9);

const csv = __webpack_require__(10);
const stripBom = __webpack_require__(11);

const { Wallet } = __webpack_require__(12);

const { get_bytes } = __webpack_require__(13);

const { fire_attaches } = __webpack_require__(32);

async function check(argv, _attaches, db_tag, db_pub, logger) {
  let version_id = argv.version_id + "";
  if (version_id === "rand") {
    version_id = get_bytes(4);
  }

  const [tag_in_db_map, pub_in_db_map] = await Promise.all([
    new Promise((res, rej) => {
      const tag_in_db_map = {};

      db_tag
        .createReadStream()
        .on("data", (data) => {
          tag_in_db_map[data.key] = data.value;
        })
        .on("error", (err) => {
          rej(err);
        })
        .on("close", () => {
          res(tag_in_db_map);
        });
    }),
    new Promise((res, rej) => {
      const pub_in_db_map = {};

      db_pub
        .createReadStream()
        .on("data", (data) => {
          pub_in_db_map[data.key] = data.value;
        })
        .on("error", (err) => {
          rej(err);
        })
        .on("close", () => {
          res(pub_in_db_map);
        });
    }),
  ]);

  const attach_missions = _attaches.map((attach) => {
    try {
      const tag_info = JSON.parse(
        tag_in_db_map[attach.tag_uniq_name + ":" + version_id]
      );

      tag_info.publisher_wallet = new Wallet(tag_info.publisher_pk);

      return {
        tag_info,
        from: attach.attach_from,
        to: attach.attach_to,
        amount_dec:
          (attach.attach_amount === "" ? 0 : attach.attach_amount) + "",
      };
    } catch (err) {
      logger.error("tag info error or not found in leveldb\n", attach);

      return null;
    }
  });

  const _attach_missions = attach_missions.filter((m) => m !== null);

  return await fire_attaches(_attach_missions, logger);
}

async function modeAttachTag(
  argv,
  is_lib,
  attaches_data,
  db_pub,
  db_tag,
  logger
) {
  if (is_lib === true) {
    return await check(argv, attaches_data, db_tag, db_pub, logger);
  } else {
    const attaches = [];

    return await new Promise((res) => {
      fs.createReadStream(argv.attaches)
        .pipe(stripBom())
        .pipe(csv())
        .on("data", (data) => attaches.push(data))
        .on("end", async () => {
          logger.success("Attaches are loaded");
          res(check(argv, attaches, db_tag, db_pub, logger));
        });
    });
  }
}

module.exports = { modeAttachTag };


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

const { get_bytes } = __webpack_require__(13);

const { getProvider } = __webpack_require__(16);

const { utils } = __webpack_require__(12);

const { acc, go } = __webpack_require__(17);

const { makeUnsignedTransactionObjectPromise } = __webpack_require__(21);

const {
  encodeTransferToToToken,
  encodeTransferToken,
} = __webpack_require__(27);

async function fire_attaches(attaches_missions, logger) {
  if (attaches_missions.length === 0) {
    logger.success("No new attach");
    return [];
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

        logger.info(
          "Pending:",
          attach.tag_info.tag_uniq_name,
          attach.from,
          attach.to,
          attach.amount_dec
        );

        const txhash = utils.parseTransaction(signed_tx).hash.toLowerCase();

        return { txhash, attach };
      };

      return af();
    })
  );

  await go(batch_name);

  return await Promise.all(
    txs.map(({ txhash, attach }) => {
      return new Promise((res) => {
        provider.waitForTransaction(txhash, 1).then(async (receipt) => {
          if (receipt.status === 1) {
            logger.success(
              "Confirmed:",
              attach.tag_info.tag_uniq_name,
              attach.from,
              attach.to,
              attach.amount_dec
            );

            res({ txhash, status: "successful" });
          } else {
            logger.error(
              "Error:",
              attach.tag_info.tag_uniq_name,
              attach.from,
              attach.to,
              attach.amount_dec
            );
          }

          res({ txhash, status: "failed" });
        });
      });
    })
  );
}

module.exports = { fire_attaches };


/***/ })
/******/ ]);
});