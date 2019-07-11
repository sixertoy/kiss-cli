const excludeNonExistingPath = require('./excludeNonExistingPath');
const excludeSystemsFiles = require('./excludeSystemsFiles');
const outputAvailableTypes = require('./outputAvailableTemplates');
const outputTemplateContent = require('./outputTemplateContent');
const removeEmptyLinesFromContent = require('./removeEmptyLinesFromContent');
const templatesToObject = require('./templatesToObject');

module.exports = {
  excludeNonExistingPath,
  excludeSystemsFiles,
  outputAvailableTypes,
  outputTemplateContent,
  removeEmptyLinesFromContent,
  templatesToObject,
};
