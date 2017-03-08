import compact from 'lodash/compact';
/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */
export function getQueryByFilters(tableName, arr = []) {
  const filtersQuery = compact(arr.map((element) => {
    const filter = element.filters;
    // Check that there is a filter present
    if (!filter || !filter.columnType || !filter.columnName) {
      return null;
    }

    // Check that it's a number/date column
    if (filter.columnType === 'number' || filter.columnName === 'date') {
      const min = (filter.properties.min) ? `${filter.columnName} >= ${filter.properties.min}` : '';
      const max = (filter.properties.max) ? `${filter.columnName} <= ${filter.properties.max}` : '';

      return `${min}${(min && max) ? ' AND ' : ''}${max}`;
    }

    const values = `'${filter.properties.values.join("','")}'`;

    // Check that it's a string column
    return `${filter.columnName} IN (${values})`;
  })).join(' AND ');

  const where = (filtersQuery.length) ? `WHERE ${filtersQuery}` : '';
  return `SELECT * FROM ${tableName} ${where}`;
}
