"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoutes = void 0;
var _express = _interopRequireDefault(require("express"));
var _users = require("./users.controller");
var _asyncWrapper = require("../../utils/asyncWrapper");
var _validate = require("../../utils/validate");
var _user = require("./user.validations");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const userRoutes = exports.userRoutes = _express.default.Router();
userRoutes.get('/', (0, _asyncWrapper.asyncWrapper)(_users.users.index));
userRoutes.post('/', (0, _validate.validate)(_user.newuser), (0, _asyncWrapper.asyncWrapper)(_users.users.create));
userRoutes.put('/:id', (0, _asyncWrapper.asyncWrapper)(_users.users.update));

// This route uses mysql DB for demo purpose to just show how can one use mysql in this app
userRoutes.get('/testmysqlroute', (0, _asyncWrapper.asyncWrapper)(_users.users.testMysql));