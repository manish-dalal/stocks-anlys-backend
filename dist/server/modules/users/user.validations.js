"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newuser = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const newuser = exports.newuser = _joi.default.object().keys({
  firstname: _joi.default.string().required(),
  lastname: _joi.default.string().required(),
  email: _joi.default.string().email().required(),
  mobile: _joi.default.string().regex(/^[6-9]{1}[0-9]{9}$/).required(),
  password: _joi.default.string().min(6).required()
});