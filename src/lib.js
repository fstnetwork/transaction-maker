const { setOptions, argv } = require("./utils/argv");

async function create_tags(options, tags_data) {
  setOptions(options);

  const { modePubAndTag } = require("./utils/mode/pub_tag");
  await modePubAndTag(argv(), true, tags_data);
  return true;
}

async function attach_tags(options, attaches_data) {
  setOptions(options);

  const { modeAttachTag } = require("./utils/mode/attach_tag");
  await modeAttachTag(argv(), true, attaches_data);
  return true;
}

module.exports = {
  create_tags,
  attach_tags,
};
