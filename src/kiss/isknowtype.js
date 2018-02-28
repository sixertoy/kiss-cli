module.exports = (args, oallowed) => (args
  && Array.isArray(args)
  && (args.length > 0)
  && (typeof args[0] === 'string')
  && args[0].trim().length > 0
  && oallowed
  && Object.keys(oallowed).indexOf(args[0]) !== -1
  && args[0]) || false; //
