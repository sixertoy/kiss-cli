const pipe = (...fns) => value =>
  fns.reduce((acc, next) => next(acc), value);

const compose = (...fns) =>
  fns.reduceRight((prev, next) => value => next(prev(value)), arg => arg);

module.exports = {
  pipe,
  compose,
};
