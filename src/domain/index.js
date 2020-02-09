const excludeNonExistingPath = require('./exclude-non-existing-path');
const excludeSystemsFiles = require('./exclude-systems-files');
const removeEmptyLinesFromContent = require('./removeEmptyLinesFromContent');
const templatesToObject = require('./templates-to-object');
const getTemplatesFilesInDirectory = require('./get-templates-files-in-dir');
const mapTemplatesFilesToTypes = require('./map-templates-files-to-types');
const lookup = require('./lookup');

module.exports = {
  excludeNonExistingPath,
  excludeSystemsFiles,
  getTemplatesFilesInDirectory,
  lookup,
  mapTemplatesFilesToTypes,
  removeEmptyLinesFromContent,
  templatesToObject,
};
