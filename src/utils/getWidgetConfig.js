import bar from './widgets/bar';
import line from './widgets/line';
import scatter from './widgets/scatter';

const types = { bar, line, scatter };
/**
 * It returns a string query using filters Data
 * @param  {Array} filters
 * @return {String}
 */
export default function getParsedConfig(type, parsedConfig) {
  return Object.assign({}, types[type], parsedConfig);
}
