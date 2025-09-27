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
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
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
	}
</style>