import Vue from 'vue'
import App from './App.vue'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
//节点标题获取焦点指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
      el.focus()
  }
});
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
