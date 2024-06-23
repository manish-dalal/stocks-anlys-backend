"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _position = require("./position.controller");
var _asyncWrapper = require("../../utils/asyncWrapper");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const positionRoutes = exports.positionRoutes = _express.default.Router();
positionRoutes.get('/v1/list', (0, _asyncWrapper.asyncWrapper)(_position.positions.index));
positionRoutes.post('/v1', (0, _asyncWrapper.asyncWrapper)(_position.positions.create));
positionRoutes.get('/v1/scraping', (0, _asyncWrapper.asyncWrapper)(_position.positions.scraping));