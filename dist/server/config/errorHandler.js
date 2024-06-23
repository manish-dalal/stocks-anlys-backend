"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;
var _httpStatus = require("../utils/httpStatus");
var _debug = _interopRequireDefault(require("debug"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const log = (0, _debug.default)('app');

// Global error handler
// Note : calling next(err) will call this error handler if no other handler id defined.You can handle custom error over here

const errorHandler = (err, req, res, next) => {
  log(err.toString());
  if (err.name === 'AppError') return res.status(err.status).json({
    error: err.message,
    stack: process.env.APP_ENVIROMENT === 'dev' ? err.stack : undefined
  });
  if (err.name === 'UnauthorizedError') return res.status(_httpStatus.httpStatus.UNAUTHORIZED).json({
    error: err.message
  });
  return res.status(_httpStatus.httpStatus.INTERNAL_SERVER_ERROR).json({
    error: process.env.APP_ENVIROMENT === 'dev' ? err.message : 'Oops !! Something went wrong'
  });
};
exports.errorHandler = errorHandler;