"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_home_const = require("./const.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const swipers = common_vendor.ref([]);
    const getSwipers = () => {
      proxy.$request({
        url: "/api/public/v1/home/swiperdata"
      }).then((res) => {
        swipers.value = res || [];
      }).catch((err) => {
        swipers.value = [];
      });
    };
    common_vendor.onLoad(() => {
      getSwipers();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swipers.value, (item, index, i0) => {
          return {
            a: item.image_src,
            b: item.goods_id,
            c: item.image_src
          };
        }),
        b: common_vendor.f(common_vendor.unref(pages_home_const.navList), (item, k0, i0) => {
          return {
            a: item.className,
            b: common_vendor.t(item.text),
            c: item.text
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
