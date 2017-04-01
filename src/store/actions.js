import User from '../api/user'

export const login = ({
	commit
}, payload) => {
	User.loginToTenant(payload.account, payload.pwd).then(r => {
		if (r.success && r.object && r.object.sessionId) {
			const user = r.object;
			commit('LOGIN_SUCCESS', {
				uid: user.userId,
				uname: user.name,
				sid: user.sessionId,
				tid: user._id,
				tname: user.tenantName,
				tcode: user.tenantCode
			})
		} else {
			commit('LOGIN_FAILED', r.message)
		}
	})
}