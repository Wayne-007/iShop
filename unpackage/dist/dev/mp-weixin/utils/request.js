"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "https://api-hmugo-web.itheima.net";
const request = ({
  url,
  method = "get",
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${url}`,
      data,
      method,
      success: (res) => {
        var _a, _b;
        if (((_b = (_a = res == null ? void 0 : res.data) == null ? void 0 : _a.meta) == null ? void 0 : _b.status) !== 200) {
          throw res;
        }
        resolve(res.data.message);
      },
      fail: (err) => {
        common_vendor.index.__f__("error", "at utils/request.js:20", err);
        reject(err);
      }
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
