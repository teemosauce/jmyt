const KEY = 'SESSION';

const session = {
	getId() {
		return localStorage.getItem(KEY)
	},

	del() {
		localStorage.removeItem(KEY)
	},

	add(id) {
		localStorage.setItem(KEY, id)
	}
}

export default session