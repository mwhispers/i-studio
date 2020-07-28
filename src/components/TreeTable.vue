<template>
  <div class="tree-table-component">
    <Table :columns="columns" :data="data" :loading="loading" border row-key="id"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: "name",
          key: "name",
          tree: true,
        },
        {
          title: "group",
          key: "group",
        },
        {
          title: "package",
          key: "package",
        },
        {
          title: "version",
          key: "version",
        },
        {
          title: "所属软件",
          key: "ownedSoftwareName",
        },
        {
          title: "所属软件版本",
          key: "ownedSoftwareVersion",
        },
        {
          title: "所属软件url",
          key: "ownedSoftwareUrl",
        },
      ],
      data: [],
      loading: true,
    };
  },
  methods: {
    loadComponents() {
      let id = 0;
      for (let i = 0; i < 5; i++) {
        let component = {
          name: "component-name" + i,
          group: "component-group" + i,
          package: "component-package" + i,
          version: "component-version" + i,
          ownedSoftwareName: "component-ownedSoftwareName" + i,
          ownedSoftwareVersion: "component-ownedSoftwareVersion" + i,
          ownedSoftwareUrl: "component-ownedSoftwareUrl" + i,
          children: [],
          id: id + "",
          _showChildren: true
        };
        this.loadDependencies(component, component.id, 2);
        id++;
        this.data.push(component);
      }
    },
    loadDependencies(component, pid, level) {
      for (let i = 0; i < 5; i++) {
        let dependency = {
          name: "dependency-name" + pid + i,
          group: "dependency-group" + pid + i,
          package: "dependency-package" + pid + i,
          version: "dependency-version" + pid + i,
          ownedSoftwareName: "dependency-ownedSoftwareName" + pid + i,
          ownedSoftwareVersion: "dependency-ownedSoftwareVersion" + pid + i,
          ownedSoftwareUrl: "dependency-ownedSoftwareUrl" + pid + i,
          id: pid + i,
          children: [],
          _showChildren: true
        };
        if (level > 0) {
          this.loadDependencies(dependency, dependency.id, level - 1);
        }
        component.children.push(dependency);
      }
    },

    loadDependenciesAsync(component, pid, level) {
      setTimeout(() => {
        this.loadDependencies(component, pid, level);
      }, 4000);
    },

    normalizeDependencies(dependency, component, pid) {},
  },
  mounted() {
    setTimeout(() => {
      this.loadComponents();
      this.loading = false;
    }, 4000);
  },
};
</script>
<style lang="less" scoped>
.tree-table-component {
  width: 1500px;
  margin: 20px auto;
}
</style>