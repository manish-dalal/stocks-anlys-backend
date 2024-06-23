"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _routes = require("./config/routes");
var _mongoconnect = require("./config/mongoconnect");
var _errorHandler = require("./config/errorHandler");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _expressJwt = _interopRequireDefault(require("express-jwt"));
var _helmet = _interopRequireDefault(require("helmet"));
var _httpStatus = require("./utils/httpStatus");
var _appError = require("./utils/appError");
var _secretCallback = require("./utils/secretCallback");
var _mysqlconnect = require("./config/mysqlconnect");
require("./config/cron");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const app = exports.app = (0, _express.default)();
app.set('port', process.env.PORT || 5000);
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use('/api', (0, _expressJwt.default)({
  secret: _secretCallback.secretCallback
}).unless({
  path: ['/api/health-check', '/api/users', '/api/auth/login', '/api/users/testmysqlroute', '/api/fileupload', '/api/s3fileupload', /\/api\/msc*/, '/api/keepalive', /\/api\/position*/],
  requestProperty: 'auth'
}));
app.use('/api', _routes.Router);

// Handle 404
app.use(function (req, res, next) {
  throw new _appError.AppError('Resource not found', _httpStatus.httpStatus.NOT_FOUND);
});
if (process.env.USE_MONGODB === 'true') (0, _mongoconnect.connectMongo)();
if (process.env.USE_MYSQL === 'true') (0, _mysqlconnect.connectMysql)();
app.use(_errorHandler.errorHandler);