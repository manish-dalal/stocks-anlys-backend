"use strict";

var _axios = _interopRequireDefault(require("axios"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_nodeCron.default.schedule('*/4 * * * *', async () => {
  // runs every 4 minute
  console.log('started at: ' + new Date().toLocaleString());
  if (process.env.KEEPLIVE_URL) {
    await _axios.default.get(process.env.KEEPLIVE_URL);
    console.log('Keeplive request @', process.env.KEEPLIVE_URL);
  }
});