"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  NewsItem();
}
const NewsItem = () => "../../components/newsItem/index.js";
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
        a: common_vendor.p({
          list: list.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/index.js.map
