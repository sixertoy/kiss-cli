module.exports = (args, files) => (args
  && Array.isArray(args)
  && (args.length > 0)
  && (typeof args[0] === 'string')
  && args[0].trim().length > 0
  && files
  && Object.keys(files).indexOf(args[0]) !== -1
  && args[0]) || false;
