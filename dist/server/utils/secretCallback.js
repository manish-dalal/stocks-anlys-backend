"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secretCallback = void 0;
var _user = require("../modules/users/user.model");
var _httpStatus = require("../utils/httpStatus");
var _appError = require("../utils/appError");
const secretCallback = function (req, payload, done) {
  let sub = payload.sub;
  _user.userModel.findById(sub, function (err, user) {
    if (err || !user) {
      return done(new _appError.AppError('Invalid user', _httpStatus.httpStatus.UNAUTHORIZED));
    }
    return done(null, user.secret);
  });
};
exports.secretCallback = secretCallback;