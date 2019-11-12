const checkIsAllowedType = (value, types) => {
  const keys = Object.keys(types);
  return keys.includes(value);
};

module.exports = checkIsAllowedType;
