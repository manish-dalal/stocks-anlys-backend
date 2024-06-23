"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _httpStatus = require("./httpStatus");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const validate = schemaname => {
  return function (req, res, next) {
    const isValid = _joi.default.validate(req.body, schemaname, {
      abortEarly: false
    });
    if (isValid.error === null) return next();
    return res.status(_httpStatus.httpStatus.BAD_REQUEST).json({
      message: 'ValidationError',
      data: isValid.error.details
    });
  };
};
exports.validate = validate;