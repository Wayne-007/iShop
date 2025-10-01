<template>
	<view class="goods">
		<!-- <view class="search-box">
			<uni-easyinput clearable suffixIcon="search" confirmType="search" trim="both" v-model="searchVal"
				placeholder="请输入商品名称" @iconClick="getGoodList" @clear="handleClear" @confirm="getGoodList" />
		</view> -->
		<!-- <view class="goods-list-box"> -->
		<GoodsList :goodsList="goodsList" :isEnd="isEnd" />
		<!-- </view> -->
	</view>
</template>

<script setup>
	import GoodsList from '../../components/goodsList/index.vue'
	import UniEasyinput from '../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue'
	import {
		ref,
		getCurrentInstance,
		onMounted,
		reactive
	} from 'vue'
	import {
		onReachBottom,
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	const {
		proxy
	} = getCurrentInstance()

	// 页码相关
	const pageInfo = reactive({
		pagenum: 1,
		pagesize: 20
	})

	// 搜索的内容
	const searchVal = ref(undefined)
	const handleClear = () => {
		searchVal.value = undefined
		pageInfo.pagenum = 1
		getGoodList()
	}

	const goodsList = ref([])
	const total = ref(0)
	const getGoodList = (callback) => {

		const _data = {
			...pageInfo
		}
		if (searchVal.value) {
			_data.query = searchVal.value
		}
		proxy.$request({
			url: '/api/public/v1/goods/search',
			data: _data
		}).then(res => {
			console.log(res)
			total.value = res.total || 0
			const _goods = res.goods || []
			if (pageInfo.pagenum === 1) {
				goodsList.value = _goods
			} else if (pageInfo.pagenum > 1) {
				goodsList.value = goodsList.value.concat(_goods)
			}
		}).catch(err => {
			goodsList.value = []
			total.value = 0
		}).finally(() => {
			callback && callback()
		})
	}

	onMounted(() => {
		getGoodList()
	})

	// 监听用户下拉刷新
	let timeout = undefined
	onPullDownRefresh(() => {
		// 下拉刷新好像在h5无效
		console.log('onPullDownRefresh===>')

		pageInfo.pagenum = 1
		goodsList.value = []
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			getGoodList(() => {
				uni.stopPullDownRefresh()
			})
		}, 800)
	})

	// 监听页面滚动到底加载下一页
	const isEnd = ref(false)
	onReachBottom(() => {
		if (total.value < pageInfo.pagenum * pageInfo.pagesize) {
			isEnd.value = true
			return
		}
		isEnd.value = false
		pageInfo.pagenum += 1
		getGoodList()
	})
</script>

<style lang="less">
	.goods {
		width: 750rpx;
		// height: calc(100vh - 2rpx - 44px);
		// display: flex;
		// flex-direction: column;
		background-color: #cecece;
		scrollbar-width: none;
		/* Firefox */
		-ms-overflow-style: none;
		/* IE and Edge */

		/* WebKit浏览器 */
		&::-webkit-scrollbar {
			display: none;
		}

		// .search-box {
		// 	width: 750rpx;
		// 	height: 96rpx;
		// 	padding: 16rpx;
		// 	box-sizing: border-box;
		// 	border-bottom: 2rpx solid #cecece;
		// }

		// .goods-list-box {
		// 	flex: 1;
		// 	overflow-x: hidden;
		// 	overflow-y: auto;
		// 	scrollbar-width: none;
		// 	/* Firefox */
		// 	-ms-overflow-style: none;
		// 	/* IE and Edge */

		// 	/* WebKit浏览器 */
		// 	&::-webkit-scrollbar {
		// 		display: none;
		// 	}
		// }
	}
</style>