import bar from './widgets/bar.json';
import line from './widgets/line.json';

const types = { bar, line };
/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */
export function getParsedConfig(type, parsedConfig) {
  return Object.assign({}, types[type], parsedConfig);
}
