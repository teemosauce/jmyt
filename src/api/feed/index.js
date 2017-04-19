import fetch, { HTTP_TYPE } from '../fetch'

import { M5URL } from '../../config/env'

var queryFeedById = (id) => fetch(HTTP_TYPE.POST, M5URL, {
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

    return fetch(HTTP_TYPE.POST, M5URL, params)
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

var queryFeedsByTable = (tableName, page = 1, rowNum = 10, {
    eq = {},
    or = [],
    like = {}
}) => {

    let params = {
        'method.name': 'mash5.tenant.queryCustomerTableData',
        'page.curPage': page,
        'page.perPageSize': rowNum,
        'query.tableName': tableName
    }

    let all = [{
        type: 'query',
        items: eq
    }, {
        type: 'search',
        items: like
    }];

    all.forEach(item => {
        let type = item.type + '.'
        let items = item.items;

        let keys = Object.keys(items)

        keys.forEach(key => {
            params[type + key] = items[key]
        })
    })

    return fetch(HTTP_TYPE.POST, M5URL, params)
}

export {
    queryFeedById,
    queryFeedsByPage,
    queryFeedsByTime,
    queryFeedsByTable
}


