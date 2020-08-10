<template>
  <div id="app">
    <dashboard v-if="false"></dashboard>
    <tree-table></tree-table>
    <my-marquee :lists="lists"></my-marquee>
  </div>
</template>

<script>
import dashboard from './components/dashboard.vue';
import TreeTable from './components/SoftwareAnalysis.vue';
import MyMarquee from './components/MyMarquee.vue';

export default {
  name: 'App',
  components: {
    dashboard,
    TreeTable,
    MyMarquee
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
