"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.s3Storage = exports.limits = exports.imageFileFilter = exports.diskStorage = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _crypto = _interopRequireDefault(require("crypto"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
var _multerS = _interopRequireDefault(require("multer-s3"));
var _appError = require("./appError");
var _httpStatus = require("./httpStatus");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_awsSdk.default.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY
});
const s3 = new _awsSdk.default.S3();
const diskStorage = exports.diskStorage = _multer.default.diskStorage({
  // Note : You can set your own upload path Ref : https://www.npmjs.com/package/multer#diskstorage
  // destination: function (req, file, cb) {},
  filename: function (req, file, cb) {
    _crypto.default.randomBytes(16, function (err, raw) {
      if (err) cb(err);
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.').pop().trim());
    });
  }
});
const limits = exports.limits = {
  fileSize: parseInt(process.env.FILE_UPLOAD_SIZE_IN_BYTES) || 1000000
};
const imageFileFilter = function (req, file, cb) {
  if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(new _appError.AppError('Only jpg,jpeg,png formats are allowed', _httpStatus.httpStatus.UNPROCESSABLE_ENTITY));
  }
  cb(null, true);
};
exports.imageFileFilter = imageFileFilter;
const s3Storage = exports.s3Storage = (0, _multerS.default)({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET,
  metadata: function (req, file, cb) {
    cb(null, {
      fieldName: file.fieldname
    });
  },
  key: function (req, file, cb) {
    return _crypto.default.randomBytes(16, function (err, raw) {
      if (err) cb(err);
      cb(null, process.env.AWS_S3_FILE_UPLOAD_KEY + raw.toString('hex') + Date.now() + '.' + file.originalname.split('.').pop().trim());
    });
  }
});