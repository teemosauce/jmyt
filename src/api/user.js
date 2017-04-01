import http from './http'

export default {
	
	loginToTenant(name, pwd, code) {
		code = code || 'bigops';
		return http.post({
			'method.name': 'mash5.user.login',
			'user.telphone': name,
			'user.password': pwd,
			'user.code': code,
			'method.optimize': 'includeField',
			'method.optimize.includeField.fieldName': ['_id', 'sessionId']
		})
	},

	login(name, pwd) {
		return http.post({
			'method.name': 'mash5.user.loginBatch',
			'user.telphone': name,
			'user.password': pwd,
		})
	},

	getUser(){

	}
}