const templatesToObject = require('./templates-to-object');

const mapTemplatesFilesToTypes = (acc, arr) => {
  const obj = templatesToObject(arr);
  return { ...acc, ...obj};
};

module.exports = mapTemplatesFilesToTypes;
