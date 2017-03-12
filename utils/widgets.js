/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */
export function getParsedConfig(config, parsedConfig) {
  return Object.assign({}, config, parsedConfig);
}
