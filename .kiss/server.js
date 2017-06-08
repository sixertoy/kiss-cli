/* global process, require, __dirname, console */
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/**
 *
 * Simple NodeJS/Express Server
 *
 * ## Installation
 * ---------------------------
 * > touch .env
 * npm i -D dotenv express express-livereload compression body-parser
 *
 */
require('dotenv').load();

const cwd = process.cwd();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const config = {
  port: process.env.PORT || 9080,
  debug: process.env.DEBUG || false
};

const publicpath = path.join(cwd, 'data');
const server = express();
// gzip compression
server.use(compression());
// Parsing application/json
server.use(bodyParser.json({
  limit: '50mb'
}));
// Express server is used to serve static ressouces
server.use('/', express.static(publicpath));

server.listen(config.port, () => {
  if (!config.debug) {
    return true;
  }
  const msg = 'Application now running under http://localhost:%d\n';
  process.stdout.write(msg, config.port);
  return true;
});
