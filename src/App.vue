<template>
  <div id="app">
    <dashboard v-if="false"></dashboard>
    <tree-table></tree-table>
  </div>
</template>

<script>
import dashboard from './components/dashboard.vue';
import TreeTable from './components/MyTreeTable.vue';

export default {
  name: 'App',
  components: {
    dashboard,
    TreeTable
  }
}
</script>
<style lang="less" scoped>
#app{
  padding: 10px;
}
</style>
