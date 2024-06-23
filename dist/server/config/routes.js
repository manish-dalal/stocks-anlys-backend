"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _axios = _interopRequireDefault(require("axios"));
var _user = require("../modules/users/user.routes");
var _auth = require("../modules/auth/auth.routes");
var _position = require("../modules/position/position.routes");
var _httpStatus = require("../utils/httpStatus");
var _fileupload = require("../utils/fileupload");
var _common = require("../modules/common/common.routes");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Router = exports.Router = _express.default.Router();
Router.all('/health-check', (req, res) => {
  console.log('API /health-check');
  return res.json({
    message: 'OK'
  });
});
Router.all('/keepalive', async (req, res) => {
  var origin = req.connection.remoteAddress;
  console.log('API /keepalive', origin, req.ip);
  try {
    req.query.url && (await _axios.default.get(req.query.url));
    // console.log('keepalive res', res1.data)
  } catch (error) {
    console.log('keepalive error', JSON.stringify(error));
  }
  return res.json({
    message: 'OK'
  });
});
Router.use('/users', _user.userRoutes);
Router.use('/auth', _auth.authRoutes);
Router.use('/msc', _common.commonRoutes);
Router.use('/position', _position.positionRoutes);
Router.post('/fileupload', (0, _multer.default)({
  storage: _fileupload.diskStorage,
  limits: _fileupload.limits,
  fileFilter: _fileupload.imageFileFilter
}).single('avatar'), (req, res) => {
  if (!req.file) return res.status(_httpStatus.httpStatus.UNPROCESSABLE_ENTITY).json({
    error: 'Please select file'
  });
  return res.json({
    data: req.file
  });
});
Router.post('/s3fileupload', (0, _multer.default)({
  storage: _fileupload.s3Storage,
  limits: _fileupload.limits,
  fileFilter: _fileupload.imageFileFilter
}).single('avatar'), (req, res) => {
  if (!req.file) return res.status(_httpStatus.httpStatus.UNPROCESSABLE_ENTITY).json({
    error: 'Please select file'
  });
  return res.json({
    data: req.file
  });
});