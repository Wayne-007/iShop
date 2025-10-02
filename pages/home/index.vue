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
			<view v-for="item in NAV_LIST" class="nav-item" :key="item.text" @click.stop="handleNav(item)">
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
			<!-- 商品列表 -->
			<GoodsList :goodsList="goodsList" />
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
		navList as NAV_LIST
	} from './const.js'
	import GoodsList from '../../components/goodsList/index.vue'

	const {
		proxy
	} = getCurrentInstance()

	// 点击导航栏
	const handleNav = payload => {
		uni.navigateTo({
			url: payload.path
		})
	}


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
		}
	}
</style>