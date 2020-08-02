<template>
    <div class="tree-table-component">
        <Table
            :columns="columns"
            :data="data"
            :loading="loading"
            border
            row-key="id"
            v-if="true"
            :load-data="loadingData"
        ></Table>
        <Tree :data="data" style="width: 100%" v-if="false" row-key="id"></Tree>
    </div>
</template>
<script>
import TreeRow from "./TreeRow.vue";
export default {
    components: {
        TreeRow,
    },
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
                {
                    title: "校验结果",
                    render: (h, params) => {
                        return h("Icon", {
                            props:{
                                type: 'md-checkmark'
                            },
                            style: {
                                color: 'red'
                            }
                        });
                    },
                },
            ],
            data: [],
            loading: true,
            count: 0,
        };
    },
    methods: {
        loadComponents() {
            let id = 0;
            for (let i = 0; i < 5; i++) {
                let component = {
                    title: "title" + i,
                    name: "component-name" + i,
                    group: "component-group" + i,
                    package: "component-package" + i,
                    version: "component-version" + i,
                    ownedSoftwareName: "component-ownedSoftwareName" + i,
                    ownedSoftwareVersion: "component-ownedSoftwareVersion" + i,
                    ownedSoftwareUrl: "component-ownedSoftwareUrl" + i,
                    children: [],
                    _loading: false,
                    id: id + "",
                };
                id++;
                this.data.push(component);
            }
        },
        loadDependencies(pid, level) {
            if (level === 0) {
                return;
            }
            let dependencies = [];
            for (let i = 0; i < 5; i++) {
                let dependency = {
                    title: "title" + pid + i,
                    name: "dependency-name" + pid + i,
                    group: "dependency-group" + pid + i,
                    package: "dependency-package" + pid + i,
                    version: "dependency-version" + pid + i,
                    ownedSoftwareName: "dependency-ownedSoftwareName" + pid + i,
                    ownedSoftwareVersion:
                        "dependency-ownedSoftwareVersion" + pid + i,
                    ownedSoftwareUrl: "dependency-ownedSoftwareUrl" + pid + i,
                    id: pid + i,
                    children: [],
                    _showChildren: true,
                };
                dependency.children = this.loadDependencies(
                    dependency.id,
                    level - 1
                );
                dependencies.push(dependency);
                this.count++;
            }
            return dependencies;
        },

        loadDependenciesAsync(component, pid, level) {
            setTimeout(() => {
                this.loadDependencies(component, pid, level);
            }, 4000);
        },

        renderFn(h, { root, node, data }) {
            return h("span", data.name);
        },
        loadingData(item, callback) {
            setTimeout(() => {
                let dependencies = this.loadDependencies(item.id, 3);
                callback(dependencies);
                console.log(this.count);
                this.count = 0;
            }, 2000);
        },
    },
    mounted() {
        setTimeout(() => {
            this.loadComponents();
            this.loading = false;
            console.log(this.count);
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
