const path = require('path');

module.exports = {
  // returns the absolute path of a dir/file
  absolutePath: file => path.join(path.resolve(__dirname), file)
};
