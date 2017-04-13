import Vue from 'vue'
import VueX from 'vuex'

import * as actions from './actions'
// import * as getters from './getters'
import mutations from './mutations'

import session from '../cache/session'

Vue.use(VueX)

export default new VueX.Store({
	state: {
		login: false,
		userInfo: null,
	},
	actions,
	mutations
})