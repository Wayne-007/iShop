<template>
	<view>
		<view class="hot-goods-list">
			<view v-for="item in goodsList" class="hot-goods-item" :key="item.goods_id">
				<image :src="item.goods_big_logo" mode="scaleToFill"></image>
				<view class="price-box">
					¥{{$formatNumber(item.goods_price)}}
					<text class="price-old">¥{{$formatNumber(item.goods_id)}}</text>
				</view>
				<view class="goods-title">
					{{item.goods_name}}
				</view>
			</view>
		</view>

		<view v-if="isEnd" class="list-end">
			~ 我是有底线的哦 ～
		</view>

	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		goodsList: {
			require: true,
			type: Array
		},
		isEnd: {
			type: Boolean,
			default: false
		}
	})
</script>

<style lang="less">
	.hot-goods-list {
		width: 750rpx;
		padding: 12rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;

		.hot-goods-item {
			width: calc(375rpx - 18rpx);
			background-color: #fff;
			margin-bottom: 12rpx;
			border-radius: 8rpx;
			padding-bottom: 12rpx;
			box-sizing: border-box;

			image {
				width: 100%;
				height: 320rpx;
				display: block;
			}

			.price-box {
				height: 48rpx;
				padding: 8rpx;
				box-sizing: border-box;
				font-size: 36rpx;
				font-weight: 600;
				color: #B50E03;
				margin-bottom: 12rpx;

				.price-old {
					font-size: 24rpx;
					font-weight: 300;
					color: #ccc;
					font-style: oblique;
					text-decoration: line-through;
				}
			}

			.goods-title {
				font-size: 28rpx;
				line-height: 32rpx;
				height: 64rpx;
				overflow: hidden;
				word-break: break-all;
				padding: 0 12rpx;
				box-sizing: border-box;
				text-overflow: ellipsis;
				/* 溢出时显示省略号 */
				display: -webkit-box;
				/* 将对象作为弹性伸缩盒子模型显示 */
				-webkit-box-orient: vertical;
				/* 设置伸缩盒子的子元素排列方式为垂直方向 */
				-webkit-line-clamp: 2;
				/* 限制显示的行数为 2 行 */
			}
		}

	}

	.list-end {
		width: 730rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ccc;
	}
</style>