const templatesToObject = require('./templates-to-object');

const mapTemplatesFilesToTypes = (acc, arr) => {
  const obj = templatesToObject(arr);
  return Object.assign({}, acc, obj);
};

module.exports = mapTemplatesFilesToTypes;
