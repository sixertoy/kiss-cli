function raw(msg) {
  process.stdout.write(msg);
  process.exit(0);
}

module.exports = raw;
