"use strict";
const formatNumber = (num) => {
  const fixedNum = Number(num).toFixed(2);
  return Number(fixedNum).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    // 强制保留2位小数
    maximumFractionDigits: 2
  });
};
exports.formatNumber = formatNumber;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
