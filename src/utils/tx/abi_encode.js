const BN = require("bignumber.js");

const erc20_transfer_func_signature = "0xa9059cbb";
const erc20_get_balance_func_signature = "0x70a08231";
const erc20_transfertoto_func_signature = "0x9e7306df";

const { getDeployTransactionData } = require("../contract/tag");

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
