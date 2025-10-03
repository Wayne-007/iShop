<template>
	<view class="news">
		<template v-for="item in list">
			<view v-if="item.goods_big_logo" class="news-item" :key="item.goods_id">
				<view class="left-box">
					<image :src="item.goods_big_logo" mode="scaleToFill" class="left-img" lazy-load></image>
				</view>

				<view class="right-box">
					<view class="title">{{item.goods_name}}</view>
					<view class="right-footer">
						<text>更新时间：{{getDateByTime(item.upd_time)}}</text>
						<text>浏览：{{item.goods_price}}</text>
					</view>
				</view>

			</view>
		</template>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import {
		request
	} from '../../utils/request';
	import {
		getDateByTime
	} from '../../utils/common.js'

	const pageInfo = reactive({
		pagenum: 1,
		pagesize: 1000
	})
	const list = ref([])
	const getList = () => {
		request({
			url: '/api/public/v1/goods/search',
			method: 'get',
			data: {
				...pageInfo
			}
		}).then(res => {
			list.value = res.goods || []
		}).catch((err => {
			list.value = []
		}))
	}

	onMounted(() => {
		getList()
	})
</script>

<style lang="less">
	.news {
		width: 750rpx;
		height: 100%;
		background-color: #ececec;

		.news-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 200rpx;
			padding: 12rpx;
			box-sizing: border-box;
			background-color: #fff;
			margin-bottom: 12rpx;

			.left-box {
				width: 200rpx;
				height: 100%;
				margin-right: 12rpx;

				.left-img {
					width: 100%;
					height: 100%;
					display: block;
					margin: 0;
					padding: 0;
				}
			}

			.right-box {
				flex: 1;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					font-size: 28rpx;
					color: #333;
					font-weight: 600;
					/* 必须设置为弹性盒子 */
					display: -webkit-box;

					/* 限制显示的行数 */
					-webkit-line-clamp: 2;

					/* 设置盒子的子元素排列方式为垂直 */
					-webkit-box-orient: vertical;

					/* 溢出内容隐藏 */
					overflow: hidden;

					/* 可选：添加省略号表示有内容被隐藏 */
					text-overflow: ellipsis;
				}

				.right-footer {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #999;
				}
			}
		}
	}
</style>