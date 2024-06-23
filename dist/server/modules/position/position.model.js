"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  Schema
} = _mongoose.default;
const positionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});
const positionModel = exports.positionModel = _mongoose.default.model('positions', positionSchema);