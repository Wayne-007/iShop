"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_common = require("../../utils/common.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const pageInfo = common_vendor.reactive({
      pagenum: 1,
      pagesize: 1e3
    });
    const list = common_vendor.ref([]);
    const getList = () => {
      utils_request.request({
        url: "/api/public/v1/goods/search",
        method: "get",
        data: {
          ...pageInfo
        }
      }).then((res) => {
        list.value = res.goods || [];
      }).catch((err) => {
        list.value = [];
      });
    };
    common_vendor.onMounted(() => {
      getList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.goods_big_logo
          }, item.goods_big_logo ? {
            b: item.goods_big_logo,
            c: common_vendor.t(item.goods_name),
            d: common_vendor.t(common_vendor.unref(utils_common.getDateByTime)(item.upd_time)),
            e: common_vendor.t(item.goods_price),
            f: item.goods_id
          } : {});
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/index.js.map
