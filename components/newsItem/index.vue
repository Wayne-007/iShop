<template>
	<template v-for="item in list">
		<view v-if="item.goods_big_logo" class="news-item" :key="item.goods_id" @click.stop="handleItemClick(item)">
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
</template>

<script setup>
	import {
		getDateByTime
	} from '../../utils/common.js'
	import {
		defineProps,
		defineEmits
	} from 'vue'

	const emits = defineEmits(['itemClick'])
	const props = defineProps({
		list: Array
	})

	const handleItemClick = payload => {
		emits('itemClick', payload)
	}
</script>

<style lang="less">
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
</style>