"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_common = require("../../utils/common.js");
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
        a: common_vendor.f(__props.goodsList, (item, k0, i0) => {
          return {
            a: item.goods_big_logo || item.image_src,
            b: common_vendor.t(common_vendor.unref(utils_common.formatNumber)(item.goods_price)),
            c: common_vendor.t(common_vendor.unref(utils_common.formatNumber)(item.goods_id)),
            d: common_vendor.t(item.goods_name),
            e: item.goods_id || item.navigator_url
          };
        }),
        b: __props.isEnd
      }, __props.isEnd ? {} : {});
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/goodsList/index.js.map
