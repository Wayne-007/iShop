<template>
	<view class="detail">
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay :interval="3000" previous-margin="12rpx" next-margin="12rpx" acceleration
			class="swiper-box">
			<swiper-item v-for="item in detail.pics" :key="item.pics_id" class="swiper-item-box">
				<image :src="item.pics_big_url" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>

		<!-- 价格相关 -->
		<view class="price-box">
			<text class="price-text">
				{{detail.goods_price}}
			</text>
			<text class="price-num">
				库存：{{detail.goods_number}}
			</text>
		</view>

		<!-- 商品标题 -->
		<view class="title">
			{{detail.goods_name}}
		</view>

		<!-- 属性 -->
		<view class="attrs">
			<view class="attrs-item" v-for="item in detail.attrs" :key="item.attr_id">
				<text class="name">{{item.attr_name}}：</text>
				<text class="value">{{item.attr_value}}</text>
			</view>
		</view>

		<!-- 详细信息 -->
		<view v-html="detail.goods_introduce"></view>

		<!-- 底部导航 -->
		<view class="goods-carts">
			<UniGoodsNav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad,
		onBackPress
	} from '@dcloudio/uni-app'
	import {
		request
	} from '../../utils/request'
	import UniGoodsNav from '../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'

	// 底部导航
	const options = ref([{
		icon: 'chat',
		text: '客服'
	}, {
		icon: 'shop',
		text: '店铺',
		info: 2,
		infoBackgroundColor: '#007aff',
		infoColor: "#f5f5f5"
	}, {
		icon: 'cart',
		text: '购物车',
		info: 2
	}])
	const onClick = e => {
		console.log('onClick===>', e)
	}
	const buttonClick = e => {
		console.log('buttonClick===>', e)
	}

	// 获取商品详情
	const detail = ref({})
	const getDetail = (id) => {
		request({
			url: '/api/public/v1/goods/detail',
			method: 'get',
			data: {
				goods_id: id
			}
		}).then(res => {
			detail.value = res || {}
		}).catch(err => {
			detail.value = {}
		})
	}

	onBackPress(() => {
		return false
	})

	let urlParams = undefined
	onLoad((params) => {
		console.log('onLoad===>', params)
		urlParams = params

		const id = params.goods_id
		getDetail(id)
	})
</script>

<style lang="less">
	.detail {
		width: 750rpx;
		background-color: #efefef;

		.swiper-box {
			width: 750rpx;
			height: 750rpx;
			border-bottom: 2rpx solid #efefef;
			background-color: #fff;

			.swiper-item-box {
				width: 100%;
				height: 100%;

				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}

		.price-box {
			height: 112rpx;
			background-color: #B50E03;
			padding: 12rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: baseline;

			.price-text {
				position: relative;
				font-size: 64rpx;
				font-weight: 600;
				color: gold;
				margin-left: 128rpx;

				&::before {
					content: '会员价¥';
					position: absolute;
					left: -128rpx;
					bottom: 10rpx;
					font-size: 32rpx;
					font-weight: 400;
				}
			}

			.price-num {
				color: #fff;
			}

		}

		.title {
			padding: 12rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			line-height: 1.25;
			color: #333;
			font-weight: 600;
			background-color: #fff;
			margin-bottom: 12rpx;
		}

		.attrs {
			padding: 12rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			background-color: #fff;
			margin-bottom: 12rpx;

			.attrs-item {
				display: flex;

				text {
					display: block;
					width: 100%;
					border-bottom: 2rpx solid #efefef;
				}

				text.name {
					font-weight: 600;
					color: #999;
				}

				text.value {
					color: #666;
					text-align: right;
				}
			}
		}

		.goods-carts {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			position: fixed;
			left: 0;
			right: 0;
			/* #ifdef H5 */
			left: var(--window-left);
			right: var(--window-right);
			/* #endif */
			bottom: 0;
		}
	}
</style>