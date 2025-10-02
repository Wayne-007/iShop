"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Item();
}
const Item = () => "./item.js";
const _sfc_main = {
  __name: "index",
  props: {
    goodsList: {
      require: true,
      type: Array
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          goodsList: __props.goodsList
        }),
        b: __props.isEnd
      }, __props.isEnd ? {} : {});
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/goodsList/index.js.map
