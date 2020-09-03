<template>
  <div id="app">
    <dashboard v-if="false"></dashboard>
    <tree-table v-if="false"></tree-table>
    <my-marquee :lists="lists" v-if="false"></my-marquee>
    <code-mirror></code-mirror>
  </div>
</template>

<script>
import dashboard from './components/dashboard.vue';
import TreeTable from './components/SoftwareAnalysis.vue';
import MyMarquee from './components/MyMarquee.vue';
import CodeMirror from './components/codemirror.vue';

export default {
  name: 'App',
  components: {
    dashboard,
    TreeTable,
    MyMarquee,
    CodeMirror
  },
  data() {
    return {
      lists: ["请您再接再厉！！！","请您再接再厉！！！","请您再接再厉！！！","请您再接再厉！！！","请您再接再厉！！！","请您再接再厉！！！","请您再接再厉！！！"]
    }
  }
}
</script>
<style lang="less" scoped>
#app{
  padding: 10px;
}
</style>
