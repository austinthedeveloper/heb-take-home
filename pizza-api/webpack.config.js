module.exports = function (options) {
  return {
    ...options,
    entry: __dirname + '/index.ts',
    output: {
      libraryTarget: 'commonjs2',
      filename: 'pizza-api/index.js'
    }
  };
};
