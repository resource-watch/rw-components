'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Dataset service
 * @example:
    import DatasetService from '..path';
    const ds = new DatasetService('42de3f98-ba1c-4572-a227-2e18d45239a5', {
      apiURL: 'https://api.resourcewatch.org/v1'
    });
    ds.getFilters().then((data) => {
      console.log(data)
    });
 */
var DatasetService = function () {
  function DatasetService(datasetId, options) {
    _classCallCheck(this, DatasetService);

    if (!options) {
      throw new Error('options params is required.');
    }
    if (!options.apiURL || options.apiURL === '') {
      throw new Error('options.apiURL param is required.');
    }
    this.datasetId = datasetId;
    this.opts = options;
  }

  /**
   * Get dataset info
   * @returns {Promise}
   */


  _createClass(DatasetService, [{
    key: 'fetchData',
    value: function fetchData() {
      var _this = this;

      return new _bluebird2.default(function (resolve) {
        fetch(_this.opts.apiURL + '/dataset/' + _this.datasetId).then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          return resolve(jsonData.data);
        });
      });
    }

    /**
     * Get filtered data
     * @returns {Promise}
     */

  }, {
    key: 'fetchFilteredData',
    value: function fetchFilteredData(query) {
      var _this2 = this;

      return new _bluebird2.default(function (resolve) {
        fetch(_this2.opts.apiURL + '/query/' + _this2.datasetId + '?sql=' + query).then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          return resolve(jsonData.data);
        });
      });
    }

    /**
     *  Get max and min or values depending on field type
     *  @returns {Promise}
     */

  }, {
    key: 'getFilter',
    value: function getFilter(fieldData) {
      var _this3 = this;

      return new _bluebird2.default(function (resolve) {
        if (fieldData.columnType === 'number' || fieldData.columnType === 'date') {
          _this3.getMinAndMax(fieldData.columnName, fieldData.tableName).then(function (data) {
            fieldData.properties = data;
            resolve(fieldData);
          });
        } else {
          _this3.getValues(fieldData.columnName, fieldData.tableName).then(function (data) {
            fieldData.properties = data;
            resolve(fieldData);
          });
        }
      });
    }
  }, {
    key: 'getFilters',
    value: function getFilters() {
      var _this4 = this;

      return new _bluebird2.default(function (resolve) {
        _this4.getFields().then(function (fieldsData) {
          var filteredFields = fieldsData.fields.filter(function (field) {
            return field.columnType === 'number' || field.columnType === 'date' || field.columnType === 'string';
          });
          var promises = _lodash2.default.map(filteredFields, function (field) {
            if (field.columnType === 'number' || field.columnType === 'date') {
              return _this4.getMinAndMax(field.columnName, fieldsData.tableName);
            }
            return _this4.getValues(field.columnName, fieldsData.tableName);
          });
          _bluebird2.default.all(promises).then(function (results) {
            var filters = _lodash2.default.map(filteredFields, function (field, index) {
              var filterResult = {
                columnName: field.columnName,
                columnType: field.columnType
              };
              if (field.columnType === 'number' || field.columnType === 'date') {
                filterResult.properties = results[index];
              } else {
                filterResult.properties = {
                  values: results[index]
                };
              }
              return filterResult;
            });
            resolve(filters);
          });
        });
      });
    }
  }, {
    key: 'getFields',
    value: function getFields() {
      var _this5 = this;

      return new _bluebird2.default(function (resolve) {
        fetch(_this5.opts.apiURL + '/fields/' + _this5.datasetId).then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          var parsedData = {
            tableName: jsonData.tableName,
            fields: _lodash2.default.map(jsonData.fields, function (value, key) {
              return {
                columnName: key,
                columnType: value.type
              };
            })
          };
          resolve(parsedData);
        });
      });
    }
  }, {
    key: 'getMinAndMax',
    value: function getMinAndMax(columnName, tableName) {
      var _this6 = this;

      if (!this.tableName && !tableName) {
        throw Error('tableName was not specified.');
      }
      var table = tableName || this.tableName;
      var query = 'SELECT Min(' + columnName + ') AS min, Max(' + columnName + ') AS max FROM ' + table;
      return new _bluebird2.default(function (resolve) {
        // TODO: remove cache param
        fetch('https://api.resourcewatch.org/v1/query/' + _this6.datasetId + '?sql=' + query + '&cache=' + Date.now()).then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          if (jsonData.data) {
            resolve(jsonData.data[0]);
          } else {
            resolve({});
          }
        });
      });
    }
  }, {
    key: 'getValues',
    value: function getValues(columnName, tableName) {
      var _this7 = this;

      var uniqs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this.tableName && !tableName) {
        throw Error('tableName was not specified.');
      }
      var table = tableName || this.tableName;
      var uniqQueryPart = uniqs ? 'GROUP BY ' + columnName : '';
      var query = 'SELECT ' + columnName + ' FROM ' + table + ' ' + uniqQueryPart + ' ORDER BY ' + columnName;
      return new _bluebird2.default(function (resolve) {
        // TODO: remove cache param
        fetch('https://api.resourcewatch.org/v1/query/' + _this7.datasetId + '?sql=' + query + '&cache=' + Date.now()).then(function (response) {
          return response.json();
        }).then(function (jsonData) {
          var parsedData = _lodash2.default.map(jsonData.data, function (data) {
            return data[columnName];
          });
          resolve(parsedData);
        });
      });
    }
  }]);

  return DatasetService;
}();

exports.default = DatasetService;