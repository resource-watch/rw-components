'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getQueryByFilters;

var _compact = require('lodash/compact');

var _compact2 = _interopRequireDefault(_compact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */
function getQueryByFilters(tableName) {
  var arrFilters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var arrColumns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var filtersQuery = (0, _compact2.default)(arrFilters.map(function (element) {
    var filter = element.filters;
    // Check that there is a filter present
    if (!filter || !filter.columnType || !filter.columnName) {
      return null;
    }

    // Check that it's a number/date column
    if (filter.columnType === 'number' || filter.columnName === 'date') {
      var min = filter.properties.min ? filter.columnName + ' >= ' + filter.properties.min : '';
      var max = filter.properties.max ? filter.columnName + ' <= ' + filter.properties.max : '';

      return '' + min + (min && max ? ' AND ' : '') + max;
    }

    var values = '\'' + filter.properties.values.join("','") + '\'';

    // Check that it's a string column
    return filter.columnName + ' IN (' + values + ')';
  })).join(' AND ');

  var columns = arrColumns.length ? arrColumns.map(function (column) {
    return column.value + ' as ' + column.key;
  }).join(', ') : '*';
  var where = filtersQuery.length ? 'WHERE ' + filtersQuery : '';

  return 'SELECT ' + columns + ' FROM ' + tableName + ' ' + where;
}