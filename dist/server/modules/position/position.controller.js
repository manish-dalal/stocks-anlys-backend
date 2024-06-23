"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positions = void 0;
var _moment = _interopRequireDefault(require("moment"));
var _axios = _interopRequireDefault(require("axios"));
var _position = require("./position.model");
var _httpStatus = require("../../utils/httpStatus");
var _scrapping = require("../../utils/scrapping");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const positions = exports.positions = {};
positions.index = async (req, res) => {
  const {
    date = '2024-06-21'
  } = req.query;
  let positions = await _position.positionModel.find({
    date
  });
  return res.json({
    positions
  });
};
positions.create = async (req, res) => {
  let data = await _position.positionModel.create(req.body);
  return res.status(_httpStatus.httpStatus.CREATED).json({
    data
  });
};
positions.scraping = async (req, res) => {
  const python = await (0, _scrapping.runPythonScript)();
  console.log('python', python);
  const data = await (0, _scrapping.filterData)();
  const today = (0, _moment.default)().format('YYYY-MM-DD');
  if (process.env.IS_SAME_ORIGIN === 'true') {
    let data1 = await _position.positionModel.create({
      text: JSON.stringify(data),
      date: today
    });
    return res.status(_httpStatus.httpStatus.CREATED).json({
      status: 'ok',
      data1
    });
  } else {
    const response = await _axios.default.post(process.env.DOC_POST_API, {
      text: JSON.stringify(data),
      date: today
    });
    return res.json({
      status: 'ok',
      data: response.data.data
    });
  }
};