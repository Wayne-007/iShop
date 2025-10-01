"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const latitude = common_vendor.ref(24.905556);
    const longitude = common_vendor.ref(114.781667);
    const covers = common_vendor.ref([{
      id: 1314,
      latitude: 24.905556,
      longitude: 114.781667,
      iconPath: common_assets.location,
      width: 32,
      height: 32
    }]);
    const handleCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "4006189030"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleCall),
        b: latitude.value,
        c: longitude.value,
        d: covers.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/contact/index.js.map
