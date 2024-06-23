"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userModel = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  Schema
} = _mongoose.default;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  secret: {
    type: String
  }
}, {
  timestamps: true
});
userSchema.pre('save', async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  let hashedpassword = await _bcrypt.default.hash(user.password, 10);
  user.password = hashedpassword;
  next();
});
userSchema.methods.matchPasswords = async function (candidatePassword) {
  let isMatch = await _bcrypt.default.compare(candidatePassword, this.password);
  return isMatch;
};
const userModel = exports.userModel = _mongoose.default.model('User', userSchema);