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
	}
}