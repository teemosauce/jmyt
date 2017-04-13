import fetch, { TYPE } from '../fetch'

var queryFeedById = (id) => fetch(HTTP_TYPE.POST, '', {
    'method.name': 'mash5.task.getFeedById',
    'query._id': id,
    'method.optimize': 'includeField',
    'method.optimize.includeField.fieldName': ['_id', 'bo', 'createTime', 'modifyTime'],
})

function queryFeeds(type, query, payload) {
    var params = {
        'method.name': 'mash5.task.queryFeeds',
        'query.bo.nameSpace': query.nameSpace,
        'method.optimize': 'includeField',
        'method.optimize.includeField.fieldName': ['_id', 'bo', 'createTime', 'modifyTime'],
        'page.perPageSize': query.rowNum,
    }

    switch (type) {
        case 'TIME':
            params['page.nextTime'] = query.time;
            break;
        case 'PAGE':
            params['page.curPage'] = query.page;
            break;
        default:
            break;
    }

    // condition


    //filter

    return fetch(HTTP_TYPE.POST, '', params)
}


var queryFeedsByTime = (nameSpace, time = 9999999999999, rowNum = 10, payload) => queryFeeds('TIME', {
    nameSpace: nameSpace,
    rowNum: rowNum,
    time: time,
}, payload)


var queryFeedsByPage = (nameSpace, page = 1, rowNum = 10, payload) => queryFeeds('PAGE', {
    nameSpace: nameSpace,
    rowNum: rowNum,
    page: page,
}, payload)

var queryFeedsByTable = (tableName, page = 1, rowNum = 10, payload) => fetch(HTTP_TYPE.POST, '', {
    'method.name': 'mash5.tenant.queryCustomerTableData',
    'page.curPage': page,
    'page.perPageSize': rowNum,
    'query.tableName': tableName
})

export {
    queryFeedById,
    queryFeedsByPage,
    queryFeedsByTime,
    queryFeedsByTable
}


