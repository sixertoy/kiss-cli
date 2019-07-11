const { noop } = require('../core');

const removeEmptyLinesFromContent = str =>
  str
    .split('\n')
    .filter(noop)
    .join('\n');

module.exports = removeEmptyLinesFromContent;
