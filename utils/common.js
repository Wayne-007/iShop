// 工具函数：格式化数字为千分位并保留2位小数
export const formatNumber = (num) => {
	// 先将数字转换为保留2位小数的数值（处理四舍五入）
	const fixedNum = Number(num).toFixed(2);
	// 再转换为千分位格式
	return Number(fixedNum).toLocaleString('zh-CN', {
		minimumFractionDigits: 2, // 强制保留2位小数
		maximumFractionDigits: 2
	});
}