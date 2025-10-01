"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_home_const = require("./const.js");
if (!Math) {
  GoodsList();
}
const GoodsList = () => "../../components/goodsList/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const handleNav = (payload) => {
      common_vendor.index.navigateTo({
        url: payload.path
      });
    };
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
            c: item.text,
            d: common_vendor.o(($event) => handleNav(item), item.text)
          };
        }),
        c: common_vendor.p({
          goodsList: goodsList.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/index.js.map
