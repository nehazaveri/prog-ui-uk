var express = require('express'),
  app = express(),
  fs = require('fs'),
  replacementConfigs = [
    { token: '%%%_ACCOUNT_API_URL_%%%', value: process.env.npm_config_ACCOUNT_API_URL || process.env.npm_config_account_api_url }
  ];

initialise();

function initialise() {
  replaceEnvSpecificValues();

  configureAndStartServer();
}

function replaceEnvSpecificValues() {
  console.log(replacementConfigs);

  var data = fs.readFileSync('build/index.tpl.html', 'utf-8');

    data = replacementConfigs.reduce(function(data, config) {
      return data.replace(config.token, config.value);
    }, data);

    fs.writeFileSync('build/index.html', data, 'utf-8');
}

function configureAndStartServer() {
  _doRouteBindings();
  _startServer();

  function _doRouteBindings() {
    app.use("/", express.static('build'));

    app.get('/*', function(req, res) {
      res.sendFile('index.html',  { root: 'build' });
    });

    app.get('*', function(req, res) {
      res.redirect('/');
    });
  }

  function _startServer() {
    var server = app.listen(3000, () => {
      console.log('Programmatic UK is running on ' + server.address().port);
    });
  }
}
