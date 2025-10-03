"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  props: {
    list: Array
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.list, (item, k0, i0) => {
          return common_vendor.e({
            a: item.goods_big_logo
          }, item.goods_big_logo ? {
            b: item.goods_big_logo,
            c: common_vendor.t(item.goods_name),
            d: common_vendor.t(_ctx.getDateByTime(item.upd_time)),
            e: common_vendor.t(item.goods_price),
            f: item.goods_id
          } : {});
        })
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/newsItem/index.js.map
