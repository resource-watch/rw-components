const path = require('path');
const rootPath = process.cwd();

module.exports = function(storybookBaseConfig, configType) {
  // storybookBaseConfig.resolve = Object.assign({}, storybookBaseConfig.resolve, {
  //   root: [
  //     path.join(rootPath, 'src')
  //   ],
  //   extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  // });

  storybookBaseConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json'
  });

  storybookBaseConfig.module.loaders.push({
    test: /\.css$/,
    loaders: ['style', 'css'],
    include: path.resolve(__dirname, '../')
  });

  storybookBaseConfig.module.loaders.push({
    test: /\.(scss|sass)$/,
    loaders: ['style', 'css', 'sass', 'postcss'],
    include: path.resolve(__dirname, '../')
  });

  storybookBaseConfig.module.loaders.push({
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'url-loader?limit=5000',
    include: path.resolve(__dirname, '../')
  });

  return storybookBaseConfig;
};
