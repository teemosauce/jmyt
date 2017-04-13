let baseUrl = 'http://www.mash5.cn/mashWebServices/service/mash5/rest'

export const HTTP_TYPE = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT'
}

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
	type = type.toUpperCase()
	url = baseUrl + url
	
	let dataStr = Object.keys(data).map(key => {
		return key + '=' + data[key]
	}).join('&')

	if (dataStr && typeof dataStr === 'string') {
		if (type == 'GET') {
			url += '?' + dataStr
		}
	}


	if (1 ==2 && window.fetch && method == 'fetch') {

		let requestConfig = {
			// credentials: 'include',
			method: type,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			mode: "cors",
			// cache: "force-cache"
		}

		if (dataStr && typeof dataStr === 'string') {
			if (type == 'POST') {
				requestConfig.body = dataStr
			}
		}

		try {
			var response = await fetch(url, requestConfig)
			var responseJson = await response.json()
		} catch (e) {
			throw new Error(e)
		}

		return response;
	} else {
		return new Promise(function(resolve, reject) {

			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
			requestObj.send(dataStr);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj);
						throw new Error(requestObj)
					}
				}
			}
		})
	}
}