<template>
	<view class="pics">
		<!-- 左边类别 -->
		<scroll-view class="left-box" :scroll-y="true">
			<view v-for="item in floorData" :class="{
				'left-item':true,
				'left-item_active': currentItem?.floor_title?.name === item?.floor_title?.name
				}" @click="handleCurrentItem(item)">
				<text>{{item.floor_title.name}}</text>
			</view>
		</scroll-view>
		<!-- 右边内容 -->
		<scroll-view scroll-y :show-scrollbar="false" scroll-anchoring class="right-box" :scroll-top="scrollTop"
			@scroll="handleScroll">
			<image :src="currentItem?.floor_title?.image_src" mode="bottom left" class="top-img" lazy-load></image>
			<view class="right-item" v-for="(item,index) in currentItem?.product_list" :key="item.navigator_url"
				@click.stop="preViewImg(item,index)">
				<image :src="item.image_src" class="item-img" lazy-load></image>
				<view class="item-title">
					{{`${item.name}：${item.navigator_url}`}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		getCurrentInstance,
		nextTick,
		onMounted,
		reactive,
		ref
	} from 'vue'

	const {
		proxy
	} = getCurrentInstance()

	// 预览图片
	const preViewImg = (item, index) => {
		const _urls = []
		currentItem.value?.product_list.forEach(el => {
			_urls.push(el.image_src)
		})
		uni.previewImage({
			urls: _urls,
			current: index,
			indicator: 'number', //	限APP
			loop: true, //	限APP
		})
	}

	// 获取楼层
	const floorData = ref([])
	const currentItem = ref({})
	const getFloorData = () => {
		proxy?.$request({
			url: '/api/public/v1/home/floordata'
		}).then(data => {
			console.log(data)

			floorData.value = data || []
			if (data.length) {
				handleCurrentItem(data[0] || {})
			}
		}).catch(err => {
			floorData.value = []
		})
	}

	// 设置选中项目
	const handleCurrentItem = payload => {
		currentItem.value = payload
		goTop()
	}

	// 右边滚动相关
	const scrollTop = ref(0)
	const old = reactive({
		scrollTop: 0
	})

	const handleScroll = e => {
		old.scrollTop = e.detail.scrollTop
	}

	const goTop = () => {
		// 解决view层不同步的问题
		scrollTop.value = old.scrollTop
		nextTick(() => {
			scrollTop.value = 0
		})
	}

	onMounted(() => {
		getFloorData()
	})
</script>

<style lang="less" scoped>
	page {
		width: 750rpx;
		height: 100%;
	}

	.pics {
		width: 750rpx;
		height: 100%;
		display: flex;

		.left-box {
			width: 200rpx;
			height: 100%;
			border-right: 2rpx solid #ececec;

			.left-item {
				width: 100%;
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				font-size: 28rpx;
				border-bottom: 2rpx solid #ececec;
			}

			.left-item_active {
				color: #fff;
				background-color: #B50E03;
				font-weight: 600;
				overflow: hidden;
			}
		}

		.right-box {
			flex: 1;
			height: auto;
			position: relative;

			:deep(.uni-scroll-view-content) {
				height: auto;
			}

			.top-img {
				display: block;
				width: 100%;
				height: 120rpx;
				position: sticky;
				top: 0;
				left: 0;
				z-index: 9;
				background-color: #fff;
			}

			.right-item {
				padding: 12rpx 12rpx 0;
				box-sizing: border-box;
				background-color: #ececec;

				.item-img {
					width: 100%;
				}

				.item-title {
					font-size: 24rpx;
					height: 72rpx;
					line-height: 36rpx;
				}
			}
		}
	}
</style>