"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      proxy
    } = common_vendor.getCurrentInstance();
    const floorData = common_vendor.ref([]);
    const currentItem = common_vendor.ref({});
    const getFloorData = () => {
      proxy.$request({
        url: "/api/public/v1/home/floordata"
      }).then((data) => {
        common_vendor.index.__f__("log", "at pages/pics/index.vue:47", data);
        floorData.value = data || [];
        if (data.length) {
          handleCurrentItem(data[0] || {});
        }
      }).catch((err) => {
        floorData.value = [];
      });
    };
    const handleCurrentItem = (payload) => {
      currentItem.value = payload;
      goTop();
    };
    const scrollTop = common_vendor.ref(0);
    const old = common_vendor.reactive({
      scrollTop: 0
    });
    const handleScroll = (e) => {
      old.scrollTop = e.detail.scrollTop;
    };
    const goTop = () => {
      scrollTop.value = old.scrollTop;
      common_vendor.nextTick$1(() => {
        scrollTop.value = 0;
      });
    };
    common_vendor.onMounted(() => {
      getFloorData();
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.f(floorData.value, (item, k0, i0) => {
          var _a2, _b2, _c2;
          return {
            a: common_vendor.t(item.floor_title.name),
            b: ((_b2 = (_a2 = currentItem.value) == null ? void 0 : _a2.floor_title) == null ? void 0 : _b2.name) === ((_c2 = item == null ? void 0 : item.floor_title) == null ? void 0 : _c2.name) ? 1 : "",
            c: common_vendor.o(($event) => handleCurrentItem(item))
          };
        }),
        b: (_b = (_a = currentItem.value) == null ? void 0 : _a.floor_title) == null ? void 0 : _b.image_src,
        c: common_vendor.f((_c = currentItem.value) == null ? void 0 : _c.product_list, (item, k0, i0) => {
          return {
            a: item.image_src,
            b: common_vendor.t(`${item.name}：${item.navigator_url}`),
            c: item.navigator_url
          };
        }),
        d: scrollTop.value,
        e: common_vendor.o(handleScroll)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-12718175"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/pics/index.js.map
