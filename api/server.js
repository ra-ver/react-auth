var url = require('url'),
  http = require('http'),
  https = require('https'),
  axios = require('axios'),
  fs = require('fs'),
  qs = require('querystring'),
  express = require('express'),
  app = express();

var TRUNCATE_THRESHOLD = 300,
  REVEALED_CHARS = 200,
  REPLACEMENT = '***';

// Load config defaults from JSON file.
// Environment variables override defaults.
function loadConfig() {
  var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'));
  log('Configuration');
  for (var i in config) {
    config[i] = process.env[i.toUpperCase()] || config[i];
    if (i === 'oauth_client_id' || i === 'oauth_client_secret') {
      log(i + ':', config[i], true);
    } else {
      log(i + ':', config[i]);
    }
  }
  return config;
}

var config = loadConfig();

function authenticate(code, cb) {

  let url = "https://" + config.oauth_host + config.oauth_path;
  axios({
      method: config.oauth_method,
      url,
      auth: {
        username: config.oauth_client_id,
        password: config.oauth_client_secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: 'code=' + code + '&grant_type=' + config.oauth_grant_type + '&client_id=' + config.oauth_client_id + '&redirect_uri=' + config.oauth_redirect_uri
    })
    .then(function (response) {
      if (response.data.error) {
        console.log(response.data);
        return;
      }
      cb(null, JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      cb(error);
    });
}

/**
 * Handles logging to the console.
 * Logged values can be sanitized before they are logged
 *
 * @param {string} label - label for the log message
 * @param {Object||string} value - the actual log message, can be a string or a plain object
 * @param {boolean} sanitized - should the value be sanitized before logging?
 */
function log(label, value, sanitized) {
  value = value || '';
  if (sanitized) {
    if (typeof (value) === 'string' && value.length > TRUNCATE_THRESHOLD) {
      console.log(label, value.substring(REVEALED_CHARS, 0) + REPLACEMENT);
    } else {
      console.log(label, REPLACEMENT);
    }
  } else {
    console.log(label, value);
  }
}

// Convenience for allowing CORS on routes - GET only
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/authenticate/:code', function (req, res) {
  log('authenticating code:', req.params.code, false);
  authenticate(req.params.code, function (err, token) {
    var result
    if (err || !token) {
      result = {
        "error": err || "bad_code"
      };
      log(result.error);
    } else {
      result = {
        "token": token
      };
      log("token", result.token, false);
    }
    res.json(result);
  });
});

module.exports.config = config;
module.exports.app = app;