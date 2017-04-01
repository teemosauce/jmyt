import http from './http'

const api = {
	query(args, page, pageNumber) {
		return http.post({
			'method.name': 'mash5.tenant.queryCustomerTableData',
			...args,
			'page.curPage': page,
			'page.perPageSize': pageNumber
		})
	},

	queryAll(args) {

	},

	queryById() {

	}
}

export default api