"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _asyncWrapper = require("../../utils/asyncWrapper");
var _validate = require("../../utils/validate");
var _auth = require("./auth.controller");
var _auth2 = require("./auth.validations");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const authRoutes = exports.authRoutes = _express.default.Router();
authRoutes.post('/login', (0, _validate.validate)(_auth2.login), (0, _asyncWrapper.asyncWrapper)(_auth.auth.login));
authRoutes.get('/profile', (0, _asyncWrapper.asyncWrapper)(_auth.auth.profile));