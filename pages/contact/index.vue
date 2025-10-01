<template>
	<view class="contact">
		<image src="https://www.itcast.cn/2018czydz/images/gywmban.jpg" mode="widthFix" class="top-img" />
		<view class="info-box">

			<view class="phone">
				联系电话：<text @click="handleCall">400-618-9030（点击拨打）</text>
			</view>
			<view class="address">
				地址：浙江省浙江市浙江经济开发区4号大街187号鼎盛年华
			</view>
			<map :id="1314" :latitude="latitude" :longitude="longitude" :markers="covers">
			</map>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import location from '../../static/icon/location-mark.png'

	const latitude = ref(24.905556)
	const longitude = ref(114.781667)
	const covers = ref([{
		id: 1314,
		latitude: 24.905556,
		longitude: 114.781667,
		iconPath: location,
		width: 32,
		height: 32
	}])


	// 点击拨打电话
	const handleCall = () => {
		uni.makePhoneCall({
			phoneNumber: '4006189030'
		})
	}
</script>

<style lang="less">
	.contact {
		width: 750rpx;

		.top-img {
			display: block;
			width: 750rpx;
			height: 294rpx;
		}

		.info-box {
			width: 750rpx;
			padding: 0 12rpx;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;

			.phone,
			.address {
				height: 56rpx;
				font-size: 28rpx;
				line-height: 56rpx;
				border-bottom: 2rpx solid #ececec;
			}

			map {
				width: 100%;
				height: 640rpx;
			}
		}
	}
</style>