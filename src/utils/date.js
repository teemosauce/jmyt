/*var str = 'npm run start --code=bigops --演戏=吸烟 --name=larry';
str = str.trim()

var params = {};
str.match(/--\w+=\w+/g).forEach(item => {
	var kv = item.replace(/--/g, '').split('=');
	params[kv[0]] = kv[1]
})

console.log(params)*/



export const format = function(time, fmt) {
	fmt = fmt || 'yyyy-MM-dd hh:mm';
	time = typeof(time) === 'string' && parseInt(time) || time;
	let date = new Date();
	if (typeof time === 'number') {
		date.setTime(time)
	}

	const o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		'S': date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


export const generateUUID = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}