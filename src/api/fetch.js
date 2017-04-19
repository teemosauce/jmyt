export const HTTP_TYPE = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT'
}



export default async (type = 'GET', url = '', data = {}, method = 'fetch') => {
	type = type.toUpperCase()
	
	let session = sessionStorage.getItem('SID');
	if (session && typeof session == 'string') {
		data['user.sessionId'] = session;
	}

	let dataStr = Object.keys(data).map(key => {
		return key + '=' + data[key]
	}).join('&')

	if (dataStr && typeof dataStr === 'string') {
		if (type == 'GET') {
			url += '?' + dataStr
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			// credentials: 'include',
			method: type,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (dataStr && typeof dataStr === 'string') {
			if (type == 'POST') {
				requestConfig.body = dataStr
			}
		}
		
		let response = await fetch(url, requestConfig)
		let responseJson = {};
		if (response.ok) {
			try {
				responseJson = await response.json()
			} catch (e) {
				responseJson = {
					success: false,
					message: e.toString()
				}
			}
		} else {
			responseJson = {
				success: false,
				message: response.status + ' ' + response.statusText
			}
		}
	
		return responseJson;
	} else {
		return new Promise(function (resolve, reject) {

			let xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else {
				xhr = new ActiveXObject;
			}

			xhr.open(type, url, true);
			xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
			xhr.send(dataStr);

			xhr.onreadystatechange = () => {
				let responseJson;
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						responseJson = xhr.response
						if (typeof responseJson !== 'object') {
							try {
								responseJson = JSON.parse(responseJson);
							} catch (e) {
								responseJson = {
									success: false,
									message: e.toString()
								}
							}
						}
					} else {
						responseJson = {
							success: false,
							message: xhr.status + ' ' + xhr.statusText
						};
					}

					resolve(responseJson);
				}
			}
		})
	}
}