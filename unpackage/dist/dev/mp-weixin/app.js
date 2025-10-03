"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const utils_request = require("./utils/request.js");
const utils_common = require("./utils/common.js");
require("./uni.promisify.adaptor.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/cart/index.js";
  "./pages/news/index.js";
  "./pages/member/index.js";
  "./pages/goods/index.js";
  "./pages/contact/index.js";
  "./pages/pics/index.js";
  "./pages/videos/index.js";
  "./pages/detail/index.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
const uniIcons = () => "./uni_modules/uni-icons/components/uni-icons/uni-icons.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$request = utils_request.request;
  app.config.globalProperties.$formatNumber = utils_common.formatNumber;
  app.component("uni-icons", uniIcons);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
