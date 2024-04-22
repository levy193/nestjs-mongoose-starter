const moduleGenerator = require('./module/prompt');

module.exports = function (plop) {
  plop.setGenerator('module', moduleGenerator);
};
