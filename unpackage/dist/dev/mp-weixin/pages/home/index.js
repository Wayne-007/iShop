"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_home_const = require("./const.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const goodsList = common_vendor.ref([]);
    common_vendor.reactive({
      page: 1,
      pageSize: 20
    });
    const getGoodsList = () => {
      goodsList.value = [];
      proxy.$request({
        url: "/api/public/v1/goods/search"
      }).then((res) => {
        const _data = (res == null ? void 0 : res.goods) || [];
        goodsList.value = goodsList.value.concat(_data);
        common_vendor.index.__f__("log", "at pages/home/index.vue:81", "getGoodsList===>", goodsList.value);
      }).catch((err) => {
        goodsList.value = [];
      });
    };
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
      getGoodsList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
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
        }),
        c: common_vendor.f(goodsList.value, (item, k0, i0) => {
          return {
            a: item.goods_big_logo,
            b: common_vendor.t(_ctx.$formatNumber(item.goods_price)),
            c: common_vendor.t(_ctx.$formatNumber(item.goods_id)),
            d: common_vendor.t(item.goods_name),
            e: item.goods_id
          };
        }),
        d: goodsList.value.length
      }, goodsList.value.length ? {} : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
