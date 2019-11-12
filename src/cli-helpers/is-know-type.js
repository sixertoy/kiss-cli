const { getFileTypeByExtension } = require('./../cli-helpers');

const isKnowType = (arg, oallowed) => {
  const isString = arg && typeof arg === 'string';
  if (!isString) return false;

  const isNotEmpty = arg.trim().length > 0;
  if (!isNotEmpty) return false;

  const keys = Object.keys(oallowed);
  const ext = getFileTypeByExtension(arg);
  const isExtTemplate = oallowed && keys.indexOf(ext) !== -1;
  const isTypeTemplate = oallowed && keys.indexOf(arg) !== -1;
  if (!isTypeTemplate && !isExtTemplate) return false;
  return arg;
};

module.exports = isKnowType;
