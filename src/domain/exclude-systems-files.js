const EXCLUDED_FILES = [
  // Windows
  'Thumbs.db',
  'ehthumbs.db',
  'Desktop.ini',
  // OSX
  '.DS_Store',
  '.AppleDouble',
  '.LSOverride',
  // Externals
  '.Spotlight-V100',
  '.Trashes',
];

const excludeSystemsFiles = arr =>
  EXCLUDED_FILES.indexOf(arr[1]) > 0 ? false : arr;

module.exports = excludeSystemsFiles;
