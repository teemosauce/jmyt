import * as types from './mutation-types'
import session from '../cache/session'

export default {

	[types.LOGIN_SUCCESS](state, {
		uid,
		uname,
		sid
	}) {
		state.hasLogin = true;
		session.add(sid);
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

	[types.RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		let validity = 30;
		let now = new Date();

		now.setTime(now + validity * 24 * 60 * 60 * 1000);

		document.cookie = `USERID=${info.userId};expires=${now.toGMTString()}`;
		document.cookie = `SID=${info.sessionId};expires=${now.toGMTString()}`;
	}

}