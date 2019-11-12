function getArguments() {
  const argsv = process.argv.slice(2);
  return argsv;
}

module.exports = getArguments;
