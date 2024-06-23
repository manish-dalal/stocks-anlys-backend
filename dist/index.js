"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _debug = _interopRequireDefault(require("debug"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
require('dotenv').load();
const log = (0, _debug.default)('app');
let applicationEnvVars = ['APP_ENVIROMENT', 'PORT', 'USE_MONGODB', 'USE_MYSQL'];
let mysqlEnvVars = ['MYSQL_HOSTNAME', 'MYSQL_PORT', 'MYSQL_USERNAME', 'MYSQL_DATABASE', 'MYSQL_PASSWORD'];
let mongoEnvVars = ['MONGO_HOSTNAME', 'MONGO_PORT', 'MONGO_DATABASE'];
if (process.env.USE_MONGODB === 'true') applicationEnvVars = [...applicationEnvVars, ...mongoEnvVars];
if (process.env.USE_MYSQL === 'true') applicationEnvVars = [...applicationEnvVars, ...mysqlEnvVars];
let unusedEnvVars = applicationEnvVars.filter(i => !process.env[i]);
if (unusedEnvVars.length) {
  log('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']');
  process.exit(1);
}
const {
  app
} = require('./server/app.js');
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port: ${app.get('port')}`);
});
var _default = exports.default = app;