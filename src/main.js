import Vue from 'vue'
import App from './App.vue'
import './css/page.css'

import echarts from "echarts"

import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

new Vue({
  render: h => h(App),
}).$mount('#app')
