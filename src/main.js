import Vue from 'vue'
import App from './App.vue'
import './css/page.css'

import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/cobalt.css'

import echarts from "echarts"

import ViewUI from 'view-design';
import TreeRow from './components/TreeRow.vue';

import VueVirtualScroller from 'vue-virtual-scroller'


// import style
import 'view-design/dist/styles/iview.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(ViewUI);
Vue.use(VueVirtualScroller)


Vue.component('TreeRow', TreeRow);

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts;

new Vue({
  render: h => h(App),
}).$mount('#app')
