import * as types from './mutation-types'
import session from '../cache/session'

export default {

	[types.LOGIN_SUCCESS](state, info) {
		state.isLogin = true;
		let validity = 30;
		let now = new Date();

		now.setTime(now.getTime() + 8 * 60 * 60 * 1000 + 1000 * 60);
		document.cookie = `USERID=${info.userId};expires=${now.toGMTString()}`
		document.cookie = `SID=${info.sessionId};expires=${now.toGMTString()}`

		sessionStorage.setItem('UID', info.userId)
		sessionStorage.setItem('SID', info.sessionId)
	},

	[types.LOGIN_FAILED](state, errMsg) {
		state.hasLogin = false;
		state.loginFailed++;
		state.loginErrMsg = errMsg;
		session.del();
	},

	[types.LOGOUT](state) {
		state.hasLogin = false;
		session.del()
	},

	/**
	 * 记录全局用户信息
	 * @param {*} state 
	 * @param {*} info 
	 */
	[types.RECORD_USERINFO](state, info) {
		state.userInfo = info;
	},

	/**
	 * 取消全局用户信息
	 */
	[types.CLEAR_USERINFO](state){
		state.userInfo = null;
		state.isLogin = false;
	}

}