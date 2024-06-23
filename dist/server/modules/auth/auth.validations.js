"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const login = exports.login = _joi.default.object().keys({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().required()
});