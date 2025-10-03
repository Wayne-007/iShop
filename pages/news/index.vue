<template>
	<view class="news">
		<NewsItem :list="list" @itemClick="handleItemClick" />
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

	import NewsItem from '../../components/newsItem/index.vue'

	const handleItemClick = payload => {
		// 获取当前页面栈
		const pages = getCurrentPages();
		// 获取当前页面实例（栈顶元素）
		const currentPage = pages[pages.length - 1];

		uni.navigateTo({
			url: `/pages/detail/index?goods_id=${payload.goods_id}&from=${currentPage.route}`,

		})
	}

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