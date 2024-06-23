"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectMongo = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _debug = _interopRequireDefault(require("debug"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const log = (0, _debug.default)('app');
_mongoose.default.Promise = Promise;
_mongoose.default.connection.on('connected', () => {
  log('MongoDB Connection Established');
});
_mongoose.default.connection.on('reconnected', () => {
  log('MongoDB Connection Reestablished');
});
_mongoose.default.connection.on('disconnected', () => {
  log('MongoDB Connection Disconnected');
});
_mongoose.default.connection.on('close', () => {
  log('MongoDB Connection Closed');
});
_mongoose.default.connection.on('error', error => {
  log('MongoDB ERROR: ' + error);
  process.exit(1);
});
if (process.env.APP_ENVIROMENT !== 'test') _mongoose.default.set('debug', process.env.MONGO_DEBUG);
const connectMongo = async () => {
  // `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`
  let connectionuri = process.env.MONGO_USERNAME || process.env.MONGO_PASSWORD ? `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}` : `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
  await _mongoose.default.connect(connectionuri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
};
exports.connectMongo = connectMongo;