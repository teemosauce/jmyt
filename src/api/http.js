import VueResource from 'vue-resource'
import Vue from 'vue'
import session from '../cache/session'

Vue.use(VueResource)

Vue.http.options.root = 'http://jmyt.mash5.cn/mashWebServices/service/mash5/rest'
Vue.http.options.emulateJSON = true

const types = ['get', 'post', 'delete', 'put']
const http = {};

types.forEach(type => {
	http[type] = (url, body, options) => {
		if (typeof url === 'object') {
			options = body;
			body = url;
			url = '';
		}
		const id = session.getId();
		if(body && id){
			body['user.sessionId'] = id;
		}
		return Vue.http[type](url, body, options).then(res => {
			if (res.status === 200) {
				return res.body
			}
			return null;
		}, err => {
			return err
		})
	}
})

export default http