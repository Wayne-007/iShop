<template>
	<view class="news">
		<NewsItem :list="list" />
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
	import NewsItem from '../../components/newsItem/index.vue'

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
	}
</style>