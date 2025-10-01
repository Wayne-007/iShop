"use strict";
const common_vendor = require("../../common/vendor.js");
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
    const pageInfo = common_vendor.reactive({
      pagenum: 1,
      pagesize: 20
    });
    const searchVal = common_vendor.ref(void 0);
    const goodsList = common_vendor.ref([]);
    const total = common_vendor.ref(0);
    const getGoodList = (callback) => {
      const _data = {
        ...pageInfo
      };
      if (searchVal.value) {
        _data.query = searchVal.value;
      }
      proxy.$request({
        url: "/api/public/v1/goods/search",
        data: _data
      }).then((res) => {
        common_vendor.index.__f__("log", "at pages/goods/index.vue:59", res);
        total.value = res.total || 0;
        const _goods = res.goods || [];
        if (pageInfo.pagenum === 1) {
          goodsList.value = _goods;
        } else if (pageInfo.pagenum > 1) {
          goodsList.value = goodsList.value.concat(_goods);
        }
      }).catch((err) => {
        goodsList.value = [];
        total.value = 0;
      }).finally(() => {
        callback && callback();
      });
    };
    common_vendor.onMounted(() => {
      getGoodList();
    });
    let timeout = void 0;
    common_vendor.onPullDownRefresh(() => {
      common_vendor.index.__f__("log", "at pages/goods/index.vue:83", "onPullDownRefresh===>");
      pageInfo.pagenum = 1;
      goodsList.value = [];
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        getGoodList(() => {
          common_vendor.index.stopPullDownRefresh();
        });
      }, 800);
    });
    const isEnd = common_vendor.ref(false);
    common_vendor.onReachBottom(() => {
      if (total.value < pageInfo.pagenum * pageInfo.pagesize) {
        isEnd.value = true;
        return;
      }
      isEnd.value = false;
      pageInfo.pagenum += 1;
      getGoodList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          goodsList: goodsList.value,
          isEnd: isEnd.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/goods/index.js.map
