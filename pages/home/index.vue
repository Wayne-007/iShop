<template>
	<view class="home">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,index) in swipers" :key="item.image_src">
				<img :src="item.image_src" :alt="item.goods_id" mode="widthFix" lazy-load class="swiper-img" />
			</swiper-item>
		</swiper>
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
		background: saddlebrown;
		/* #ifdef WEB */
		height: calc(100vh - 44px - 50px);
		/* #endif */

		swiper {
			width: 750rpx;
			height: 380rpx;

			.swiper-img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>