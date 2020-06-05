# Transaction Maker

## Mode pub_tag

```sh
npm i

MASTER_PK_HEX_STR=0x... node src/index.js --mode pub_tag --root_dir ./ --tags ./csv_template/tag.csv --version_id 20200605 --jsonrpc_http [Ethereum JSONRPC URL]

node src/index.js --mode attach_tag --root_dir ./ --attaches ./csv_template/attach.csv --version_id 20200606 --jsonrpc_http [Ethereum JSONRPC URL]
```
