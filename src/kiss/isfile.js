const path = require('path');

module.exports = args => (args
  && Array.isArray(args)
  && (args.length > 1)
  && (typeof args[1] === 'string')
  && args[1].trim().length > 2
  && (args[1].indexOf('.') === 0)
  && (args[1].indexOf(path.sep) === 1)
  && args[1]) || false; // only if is a filepath
