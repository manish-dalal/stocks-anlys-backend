"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = void 0;
var _user = require("./user.model");
var _httpStatus = require("../../utils/httpStatus");
var _mysqlconnect = require("../../config/mysqlconnect");
const users = exports.users = {};
users.index = async (req, res) => {
  let users = await _user.userModel.find({}, {
    password: 0,
    __v: 0
  });
  return res.json({
    data: {
      users
    }
  });
};
users.create = async (req, res) => {
  let data = await _user.userModel.create(req.body);
  let {
    password,
    __v,
    ...user
  } = data.toObject();
  return res.status(_httpStatus.httpStatus.CREATED).json({
    data: {
      user
    }
  });
};
users.update = async (req, res) => {
  let user = await _user.userModel.findById(req.params.id);
  if (!user) return res.status(_httpStatus.httpStatus.BAD_REQUEST).json({
    message: 'User not found'
  });
  Object.assign(user, req.body);
  await user.save();
  return res.json({
    message: 'Record updated'
  });
};
users.testMysql = async (req, res) => {
  let data = await _mysqlconnect.pool.query('Select * from users');
  return res.json({
    data
  });
};