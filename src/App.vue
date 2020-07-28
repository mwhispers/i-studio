<template>
  <div id="app">
    <dashboard v-if="false"></dashboard>
    <tree-table></tree-table>
  </div>
</template>

<script>
import dashboard from './components/dashboard.vue';
import TreeTable from './components/TreeTable.vue';

export default {
  name: 'App',
  components: {
    dashboard,
    TreeTable
  }
}
</script>
