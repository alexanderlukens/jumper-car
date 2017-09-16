const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser')
const router = require('./src/router.js')
const app = express();

const compiler = webpack(webpackConfig);
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use('', router);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(app.get('port'), function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
