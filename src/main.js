import babelpolyfill from 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

import store from './store'
import { format } from './utils/date'
import { getUser } from './api/user'

Vue.use(ElementUI)

Vue.filter('shortDateFormat', function (time) {
  if (time) {
    return format(time, 'yyyy-MM-dd');
  } else {
    return '暂无'
  }
});

Vue.filter('fullDateFormat', function (time) {
  if (time) {
    return format(time);
  } else {
    return '暂无'
  }
});


Vue.filter('useYear', function (y) {
  if (!isNaN(y)) {
    return y + '年';
  } else {
    return '暂无'
  }
});

Vue.config.productionTip = false

router.beforeEach(async (to, from, next) => {
  if (Array.isArray(to.matched) && to.matched.length > 0) {
    if (to.matched.some(record => record.meta.shouldLogin)) {
      //需要登录但又未登录的页面统一跳至登录页
      if (!store.state.isLogin) {
        next({
          path: '/login'
        })
      } else {
        if (!store.state.userInfo) {
          let UID = sessionStorage.getItem('UID')
          var result = await getUser(UID)
          if (result.success) {
            store.state.userInfo = result.object;
            return next()
          } else {
            store.state.isLogin = false;
            store.state.userInfo = null;
            return next({
              path: '/login'
            })
          }
        }
      }
    } else {
      // 如果已经登录的话，还要往登陆页转的话，直接跳至首页
      if (store.state.isLogin && to.path == '/login') {
        return next({
          path: '/'
        })
      }
    }
  } else {
    return next({
      path: '/404'
    })
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
