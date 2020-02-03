const fs = require('fs');
const path = require('path');

function readTemplateContent(template) {
  const { file } = template;
  const templateContent = fs.readFileSync(file, 'utf8');
  return templateContent;
}

function getTemplateType(type, file) {
  if (type) return type;
  const extension = path.extname(file).slice(1);
  return extension;
}

function getOutputFile(file, template) {
  const cwd = process.cwd();
  const { ext } = template;
  const basename = path
    .basename(file)
    .split('.')
    .slice(0, 1);
  const outputFile = path.join(cwd, `${basename}${ext}`);
  return outputFile;
}

function write(file, content) {
  const writeOptions = { encoding: 'utf8' };
  fs.writeFileSync(file, content, writeOptions);
}

const writeFile = (templates, type = null) => file => {
  const templateType = getTemplateType(type, file);
  const templateObj = templates[templateType];
  const content = readTemplateContent(templateObj);
  const outputFile = getOutputFile(file, templateObj);
  write(outputFile, content);
};

module.exports = writeFile;
