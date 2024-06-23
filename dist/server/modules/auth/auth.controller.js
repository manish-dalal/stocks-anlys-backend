"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var _user = require("../users/user.model");
var _httpStatus = require("../../utils/httpStatus");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const auth = exports.auth = {};
auth.login = async (req, res) => {
  let user = await _user.userModel.findOne({
    email: req.body.email
  });
  if (!user) return res.status(_httpStatus.httpStatus.UNAUTHORIZED).json({
    message: 'User does not exists'
  });
  let isMatch = await user.matchPasswords(req.body.password);
  if (!isMatch) return res.status(_httpStatus.httpStatus.UNAUTHORIZED).json({
    message: 'Invalid username/password'
  });
  let randomSecret = _crypto.default.randomBytes(32).toString('hex');
  await _user.userModel.updateOne({
    _id: user._id
  }, {
    $set: {
      secret: randomSecret
    }
  });
  let token = _jsonwebtoken.default.sign({
    sub: user._id
  }, randomSecret, {
    expiresIn: '1h'
  });
  const {
    password,
    __v,
    secret,
    ...exposedUser
  } = user.toObject();
  return res.json({
    data: {
      token,
      user: exposedUser
    }
  });
};
auth.profile = async (req, res) => {
  let user = await _user.userModel.findOne({
    _id: req.user.sub
  });
  const {
    password,
    __v,
    secret,
    ...exposedUser
  } = user.toObject();
  return res.json({
    data: {
      user: exposedUser
    }
  });
};