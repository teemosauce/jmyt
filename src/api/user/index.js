import fetch, { HTTP_TYPE } from '../fetch'
import { M5URL } from '../../config/env'

function extendPayload(source, payload, slot) {

    slot = slot && (slot + '.') || ''

    payload && typeof payload === 'object' && Object.keys(payload).forEach(key => {
        var value = payload[key]

        key = slot + key

        if (value != undefined && value != null) {
            source[key] = value
        }

    })

    return source
}

var enroll = (account, password, payload) => {
    account = account.trim()
    password = password.trim()

    var params = {
        'method.name': 'mash5.user.enroll',
        'method.optimize': 'includeField',
        'method.optimize.includeField.fieldName': ['_id', 'name', 'email', 'telphone']
    }

    params['user.' + (/@/.test(account) && 'email' || 'telphone')] = account


    params = extendPayload(params, payload, 'insert')

    return fetch(HTTP_TYPE.POST, M5URL, params)
}

var login = (account, password, tenantCode) => {

    var hasCode = typeof tenantCode == 'string'

    var params = {
        ['user.' + (/@/.test(account) && 'email' || 'telphone')]: account,
        'user.password': password,
        'method.name': 'mash5.user.' + (hasCode && 'login' || 'loginBatch')
    }

    if (hasCode) {
        params['user.code'] = tenantCode
    }

    return fetch(HTTP_TYPE.POST, M5URL, params)
}

var logout = () => fetch(HTTP_TYPE.POST, M5URL, {
    'method.name': 'mash5.user.logout'
})

var getUser = (id) => fetch(HTTP_TYPE.POST, M5URL, {
    'method.name': 'mash5.user.queryUserInfo',
    'query._id': id,
    //'method.optimize': 'includeField',
    //'method.optimize.includeField.fieldName': ['_id', 'name', 'email', 'telphone', 'userCollection', 'playRole', 'appProgram', 'subscribeBO', 'cardInfo', 'createTime']
})

export {
    enroll,
    login,
    logout,
    getUser,
}