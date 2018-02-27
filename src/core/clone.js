const programUtils = require('./../program-utils');

module.exports = (target) => {
  const src = null;
  let output = null;
  let i = null;
  const key = null;
  const len = arguments.length;
  if (!(len >= 2)) {
    programUtils.exit('Cannot convert undefined or null to object');
  }

  function __assign__(source, tgt) {
    for (key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        tgt[key] = source[key];
      }
    }
  }

  output = target;
  for (i = 1; i < len; i++) {
    src = arguments[i];
    if (src) {
      __assign__(src, output);
    }
  }
  return output;
};
