"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _asyncWrapper = require("../../utils/asyncWrapper");
var _common = require("./common.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const commonRoutes = exports.commonRoutes = _express.default.Router();
commonRoutes.post('/post', (0, _asyncWrapper.asyncWrapper)(_common.common.post));
commonRoutes.get('/get', (0, _asyncWrapper.asyncWrapper)(_common.common.get));
commonRoutes.get('/cloudinary', (0, _asyncWrapper.asyncWrapper)(_common.common.cloudinary));
commonRoutes.post('/twilio', (0, _asyncWrapper.asyncWrapper)(_common.common.twilio));