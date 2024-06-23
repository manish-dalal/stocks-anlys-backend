"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.common = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _getCloudinarySignature = require("../../utils/getCloudinarySignature");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fs = require('fs');
const storeData = (path, data) => {
  try {
    fs.appendFileSync(path, '\n' + JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
const common = exports.common = {};
common.post = async (req, res) => {
  try {
    const {
      url,
      body
    } = req.body;
    const {
      data = {}
    } = await _axios.default.post(url, body);
    return res.json({
      data
    });
  } catch (error) {
    return res.json({
      error: error.response.data
    });
  }
};
common.get = async (req, res) => {
  try {
    const {
      data = {}
    } = await _axios.default.get(req.query.url);
    return res.json({
      data
    });
  } catch (error) {
    // if (error.response) {
    //   // Request made and server responded
    //   reject(response);
    // } else if (error.request) {
    //   // The request was made but no response was received
    //   reject(response);
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   reject(response);
    // }
    return res.json({
      error: error.response.data
    });
  }
};
common.cloudinary = async (req, res) => {
  try {
    const sigData = (0, _getCloudinarySignature.getCloudinarySignature)();
    return res.json(sigData);
  } catch (error) {
    return res.json({
      error: error.response.data
    });
  }
};
common.twilio = async (req, res) => {
  try {
    console.log('req.body', req.body);
    if (req.body) storeData(`./server-logs/info.json`, JSON.stringify(req.body));
    if (req.query.url) storeData(`./server-logs/info.json`, JSON.stringify(req.query.url));
    return res.json({
      body: req.body
    });
  } catch (error) {
    return res.json({
      error: error.response.data
    });
  }
};