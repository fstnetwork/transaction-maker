const { ContractFactory } = require("ethers");

const abi = require("../../contract/tag_abi");
const bytecode = require("../../contract/tag_bytecode");

const Tag = new ContractFactory(abi, bytecode);

function getDeployTransactionData(name, symbol) {
  const { data } = Tag.getDeployTransaction(name, symbol, "1000000000000000");

  return data;
}

module.exports = {
  getDeployTransactionData,
};
