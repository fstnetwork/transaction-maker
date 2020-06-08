# Transaction Maker

## Mode pub_tag

```sh
npm i

export MASTER_PK_HEX_STR=0xabcdef0123456789...

node src/index.js \
  --mode pub_tag \
  --root_dir ./ \
  --tags ./csv_template/tag.csv \
  --version_id [VER STRING] \
  --jsonrpc_http [Ethereum JSONRPC URL]
```

## Mode attach_tag

```sh
npm i

node src/index.js \
  --mode attach_tag \
  --root_dir ./ \
  --attaches ./csv_template/attach.csv \
  --version_id [VER STRING] \
  --jsonrpc_http [Ethereum JSONRPC URL]
```

## Lib

### Mode pub_tag / attach_tag

`publisher_id` can be any unique string

`tag_uniq_name` can be any unique string

(`version_id` in options will be the postfix of the tagname)

One publisher can have many tags (but the best practice is still one publisher has one tag)

`attach_from` can just be set to `"publisher"`

```javascript
const { create_tags, attach_tags } = require("transaction-maker");

// creat tags first
create_tags(
  {
    version_id: "abc",
    root_dir: process.cwd(),
    jsonrpc_http: "[ETH_JSON_RPC_URL]",
  },
  [
    { publisher_id: "def", tag_uniq_name: "abcdef" },
    { publisher_id: "def", tag_uniq_name: "ghijkl" },
  ]
).then(console.log);

// and then
attach_tags(
  {
    version_id: "abc",
    root_dir: process.cwd(),
    jsonrpc_http: "[ETH_JSON_RPC_URL]",
  },
  [
    {
      tag_uniq_name: "abcdef",
      attach_from: "publisher",
      attach_to: "0xefefefefefefefefefefefefefefefefefefefef",
      attach_amount: "1",
    },
    {
      tag_uniq_name: "abcdef",
      attach_from: "publisher",
      attach_to: "0xefefefefefefefefefefefefefefefefefefefef",
      attach_amount: "1",
    },
    {
      tag_uniq_name: "ghijkl",
      attach_from: "publisher",
      attach_to: "0xefefefefefefefefefefefefefefefefefefefef",
      attach_amount: "1",
    },
    {
      tag_uniq_name: "ghijkl",
      attach_from: "publisher",
      attach_to: "0xefefefefefefefefefefefefefefefefefefefef",
      attach_amount: "1",
    },
  ]
).then(console.log);
```
