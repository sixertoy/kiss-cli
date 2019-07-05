const noop = require('../core/noop');

const removeEmptyLinesFromContent = str =>
  str
    .split('\n')
    .filter(noop)
    .join('\n');

module.exports = removeEmptyLinesFromContent;
