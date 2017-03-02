/**
 * It returns a string query using filters Data
 * @param  {Object} filtersData
 * @return {String}
 */
export function getQueryByFilters(filtersData) {
  const tableName = filtersData.filters[0].tableName;
  const filtersQuery = filtersData.filters.map((filter) => {
    if (filter.columnType === 'number' || filter.columnName === 'date') {
      return `${filter.columnName} >= ${filter.properties.min} AND ${filter.columnName} <= ${filter.properties.max}`;
    }
    return `${filter.columnName} IN (${filter.properties.values.join(', ')})`;
  }).join(' AND ');
  return `SELECT * FROM ${tableName} WHERE ${filtersQuery}`;
};
