import Vue from 'vue'
import Router from 'vue-router'

const login = h => require(['../page/login.vue'], h)
const home = h => require(['../page/home.vue'], h)
const notFound = h => require(['../page/notFound.vue'], h)

const allDevices = h => require(['../page/devices/all.vue'], h)
const dist = h => require(['../page/devices/dict.vue'], h)

Vue.use(Router)

export default new Router({
	routes: [{
		path: '',
		redirect: {
			path: '/home'
		},
		hidden: true,
	}, {
		path: '/',
		redirect: {
			path: '/home'
		},
		hidden: true,
	}, {
		path: '/404',
		name: '404',
		component: notFound,
		hidden: true
	}, {
		path: '/login',
		name: 'login',
		component: login,
		hidden: true,
		meta: {
			shouldLogin: false
		}
	}, {
		path: '/home',
		name: '设备管理',
		component: home,
		hidden: false,
		iconFont: 'fa fa-bars',
		meta: {
			shouldLogin: true
		},
		children: [{
			path: '/devices',
			component: allDevices,
			hidden: false,
			name: '所有设备',
			iconFont: 'fa fa-wrench',
			meta: {
				shouldLogin: true,
			}
		}, {
			path: '/dict',
			component: dist,
			hidden: false,
			name: '设备字典',
			iconFont: 'fa fa-book',
			meta: {
				shouldLogin: true
			}
		}]
	}]
})