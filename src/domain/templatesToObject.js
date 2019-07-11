const path = require('path');

const templatesToObject = arr => {
  // transform an array of file paths to object
  // INPUT -> ['/User/home/.kiss/mytype.js', ...]
  // OUTPUT -> [{ mytype: { file: '/User/home/.kiss/mytype.js', ext: 'js'} }, ...]
  let key = arr[1].split('.')[0];
  key = key.indexOf('_') < 0 ? key : key.split('_')[1];
  const file = path.join.apply(null, arr);
  const fname = path.basename(file);
  // substr -> gitignore
  const ext = `${fname.substr(fname.indexOf('.'))}`;
  return { [key]: { ext, file } };
};

module.exports = templatesToObject;
