"use strict";
const formatNumber = (num) => {
  const fixedNum = Number(num).toFixed(2);
  return Number(fixedNum).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    // 强制保留2位小数
    maximumFractionDigits: 2
  });
};
const getDateByTime = (num) => {
  const _num = num * 1e3;
  const _date = new Date(_num);
  const _year = _date.getFullYear();
  const _month = _date.getMonth() + 1;
  const _day = _date.getDate();
  return `${_year}-${_month < 10 ? "0" + _month : _month}-${_day}`;
};
exports.formatNumber = formatNumber;
exports.getDateByTime = getDateByTime;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/common.js.map
