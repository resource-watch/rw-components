'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getParsedConfig;

var _bar = require('./widgets/bar');

var _bar2 = _interopRequireDefault(_bar);

var _line = require('./widgets/line');

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var types = { bar: _bar2.default, line: _line2.default };
/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */
function getParsedConfig(type, parsedConfig) {
  return Object.assign({}, types[type], parsedConfig);
}