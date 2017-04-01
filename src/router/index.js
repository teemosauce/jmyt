import Vue from 'vue'
import Router from 'vue-router'

const Login = h => {
	return require(['../views/Login'], h)
}

const Home = h => {
	return require(['../views/Home'], h)
}


Vue.use(Router)

export default new Router({
	routes: [{
		path: '/login',
		name: 'Login',
		component: Login,
		hidden: true
	}, {
		path: '/',
		name: '设备管理',
		component: Home,
		hidden: false,
		iconFont: 'fa fa-bars',
		children: [{
			path: '/devices',
			component: h => {
				return require(['../views/devices/all'], h)
			},
			hidden: false,
			name: '所有设备',
			iconFont: 'fa fa-wrench'
		}, {
			path: '/dict',
			component: h => {
				return require(['../views/devices/dict'], h)
			},
			hidden: false,
			name: '设备字典',
			iconFont: 'fa fa-book'
		}]
	}]
})