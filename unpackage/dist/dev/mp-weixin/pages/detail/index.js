"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  UniGoodsNav();
}
const UniGoodsNav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const options = common_vendor.ref([{
      icon: "chat",
      text: "客服"
    }, {
      icon: "shop",
      text: "店铺",
      info: 2,
      infoBackgroundColor: "#007aff",
      infoColor: "#f5f5f5"
    }, {
      icon: "cart",
      text: "购物车",
      info: 2
    }]);
    const onClick = (e) => {
      common_vendor.index.__f__("log", "at pages/detail/index.vue:74", "onClick===>", e);
    };
    const buttonClick = (e) => {
      common_vendor.index.__f__("log", "at pages/detail/index.vue:77", "buttonClick===>", e);
    };
    const detail = common_vendor.ref({});
    const getDetail = (id) => {
      utils_request.request({
        url: "/api/public/v1/goods/detail",
        method: "get",
        data: {
          goods_id: id
        }
      }).then((res) => {
        detail.value = res || {};
      }).catch((err) => {
        detail.value = {};
      });
    };
    common_vendor.onBackPress(() => {
      return false;
    });
    common_vendor.onLoad((params) => {
      common_vendor.index.__f__("log", "at pages/detail/index.vue:102", "onLoad===>", params);
      const id = params.goods_id;
      getDetail(id);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(detail.value.pics, (item, k0, i0) => {
          return {
            a: item.pics_big_url,
            b: item.pics_id
          };
        }),
        b: common_vendor.t(detail.value.goods_price),
        c: common_vendor.t(detail.value.goods_number),
        d: common_vendor.t(detail.value.goods_name),
        e: common_vendor.f(detail.value.attrs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.attr_name),
            b: common_vendor.t(item.attr_value),
            c: item.attr_id
          };
        }),
        f: detail.value.goods_introduce,
        g: common_vendor.o(onClick),
        h: common_vendor.o(buttonClick),
        i: common_vendor.p({
          fill: true,
          options: options.value,
          buttonGroup: _ctx.buttonGroup
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/index.js.map
