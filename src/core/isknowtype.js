module.exports = (arg, oallowed) =>
  (arg &&
    typeof arg === 'string' &&
    arg.trim().length > 0 &&
    oallowed &&
    Object.keys(oallowed).indexOf(arg) !== -1 &&
    arg) ||
  false;
