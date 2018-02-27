const colors = require('./core/colors');

/**
*
* Write out available templates and their paths
*
*/
module.exports = types => Object
  .keys(types).sort()
  .reduce((acc, key) => `${acc}
  ${key}${colors.green(` ${types[key]}`)}`, 'Types:');
