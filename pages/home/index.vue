<template>
	<view class="home">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in swipers" :key="item.image_src">
				<img :src="item.image_src" :alt="item.goods_id" mode="widthFix" lazy-load class="swiper-img" />
			</swiper-item>
		</swiper>

		<!-- 导航区域 -->
		<view class="nav">
			<view v-for="item in navList" class="nav-item" :key="item.text">
				<view class="icon-box">
					<view :class="{
						iconfont:true,
						[item.className]:true
						}">
					</view>
				</view>
				<text class="text">{{item.text}}</text>
			</view>
		</view>

		<!-- 推荐商品 -->
		<view class="hot-goods">
			<view class="title">
				推荐商品
			</view>
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

			<view v-if="goodsList.length" class="list-end">
				~ 我是有底线的哦 ～
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		reactive
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		navList
	} from './const.js'

	const {
		proxy
	} = getCurrentInstance()

	// 获取推荐商品
	const goodsList = ref([])
	const pageInfo = reactive({
		page: 1,
		pageSize: 20
	})
	const getGoodsList = () => {
		goodsList.value = []
		proxy.$request({
			url: '/api/public/v1/goods/search',
		}).then(res => {
			const _data = res?.goods || []
			goodsList.value = goodsList.value.concat(_data)

			console.log('getGoodsList===>', goodsList.value)
		}).catch(err => {
			goodsList.value = []
		})
	}


	const swipers = ref([])
	const getSwipers = () => {
		proxy.$request({
			url: '/api/public/v1/home/swiperdata'
		}).then(res => {
			swipers.value = res || []
		}).catch(err => {
			swipers.value = []
		})
	}

	onLoad(() => {
		getSwipers()
		getGoodsList()
	})
</script>

<style lang="less">
	.home {
		width: 750rpx;
		height: 100vh;
		/* #ifdef WEB */
		height: calc(100vh - 44px - 50px);
		/* #endif */

		swiper,
		swiper-item {
			width: 750rpx;
			height: 380rpx;

			.swiper-img {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			display: flex;
			justify-content: space-between;
			padding: 8px 0;

			.nav-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.icon-box {
					width: 120rpx;
					height: 120rpx;
					background-color: #B50E03;
					border-radius: 50%;
					text-align: center;
					line-height: 120rpx;
					margin-bottom: 6px;

					.iconfont {
						font-size: 60rpx;
						color: #fff;
					}
				}

				.text {
					font-size: 32rpx;
				}
			}
		}

		.hot-goods {
			background-color: #ececec;
			padding: 20rpx 0;
			/* #ifdef WEB */
			padding-bottom: 100rpx;
			/* #endif */
			box-sizing: border-box;

			.title {
				height: 100rpx;
				line-height: 100rpx;
				font-size: 36rpx;
				text-align: center;
				color: #B50E03;
				font-weight: 600;
				letter-spacing: 40rpx;
				background-color: #fff;
			}

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
		}
	}
</style>