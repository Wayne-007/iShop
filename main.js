import App from './App'
import {
	request
} from './utils/request.js'
import {
	formatNumber
} from './utils/common.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import './uni.promisify.adaptor'
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$request = request
	app.config.globalProperties.$formatNumber = formatNumber
	return {
		app
	}
}
// #endif