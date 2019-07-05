const excludeSystemsFiles = require('./exclude-systems-files');
const excludeNonExistingPath = require('./exclude-non-existing-path');
const outputAvailableTypes = require('./output-available-types');
const outputTemplateContent = require('./output-template-content');
const removeEmptyLinesFromContent = require('./remove-empty-lines-from-content');

module.exports = {
  excludeNonExistingPath,
  excludeSystemsFiles,
  outputAvailableTypes,
  outputTemplateContent,
  removeEmptyLinesFromContent,
};
