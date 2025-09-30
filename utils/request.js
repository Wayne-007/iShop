const BASE_URL = 'https://api-hmugo-web.itheima.net'

export const request = ({
	url,
	method = 'get',
	data={}
}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${BASE_URL}${url}`,
			data,
			method,
			success: (res) => {
				if (res?.data?.meta?.status !== 200) {
					throw res
				}
				resolve(res.data.message)
			},
			fail: (err) => {
				console.error(err)
				reject(err)
			}
		})
	})
}