import babelpolyfill from 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

import store from './store'
import {format} from './utils/date'

Vue.use(ElementUI)

Vue.filter('shortDateFormat', function(time) {
  if(time){
    return format(time, 'yyyy-MM-dd');
  }else{
    return '暂无'
  }
});

Vue.filter('fullDateFormat', function(time) {
  if(time){
    return format(time);
  }else{
    return '暂无'
  }
});


Vue.filter('useYear', function(y) {
  if(!isNaN(y)){
    return y + '年';
  }else{
    return '暂无'
  }
});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const loginPath = '/login'

  if(store.state.login){
    
    if(to.path === loginPath){
       next({path:'/'})
    }else{
      next();
    }
  }else{
    if(to.path === loginPath){
      next();
    }else{
      next({path: loginPath})  
    }
  }
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
