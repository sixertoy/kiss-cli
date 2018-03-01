/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
// Simple NodeJS/Express Server
// Installation
/**
 * touch .env
 * echo "PORT=9080" > .env
 * yarn add dotenv express cors helmet body-parser compression --dev
 */
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

require('dotenv').load({
  path: path.join(__dirname, '.env')
});

const config = {
  port: process.env.PORT || 9080,
  debug: process.env.DEBUG || false,
  public: path.join(__dirname, 'public')
};

const server = express();
server.disable('x-powered-by');
server.use(cors());
server.use(helmet());
server.use(compression());
server.use(bodyParser.json({ limit: '50mb' }));

// Express server is used to serve static ressouces
server.use('/', express.static(config.public));

server.listen(config.port, () => {
  if (!config.debug) return;
  const msg = `Server is running under http://localhost:${port}`;
  process.stdout.wite.log(`\x1b[32m${msg}\x1b[39m`);
});
