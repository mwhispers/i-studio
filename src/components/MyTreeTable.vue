<template>
    <div class="my-tree-table">
        <div class="head">
            <span v-for="(col, i) in columns" :key="i" :style="getItemStyle(col)">{{ col.title }}</span>
        </div>
        <div class="body">
            <div class="row" v-for="(d, index) in tableData" :key="index" v-show="d.show">
                <span v-for="(col, i) in columns" :key="i" class="item" :style="getItemStyle(col)">
                    <span
                        v-if="col.tree && !d.expanded && d.loaded !== 1"
                        style="border:1px solid #000;margin-right: 5px;cursor: pointer"
                        :style="getIndent(d)"
                        @click="expand(d, index)"
                    >
                        <Icon type="md-add"></Icon>
                    </span>
                    <span
                        v-if="col.tree && d.expanded && d.loaded !== 1"
                        style="border:1px solid #000;margin-right: 5px;cursor: pointer"
                        :style="getIndent(d)"
                        @click="hide(d, index)"
                    >
                        <Icon type="md-remove"></Icon>
                    </span>
                    <span
                        v-if="col.tree && d.loaded === 1"
                        style="border:1px solid #000;margin-right: 5px;cursor: pointer"
                        :style="getIndent(d)"
                        @click="hide(d, index)"
                    >
                        <Icon type="ios-loading"></Icon>
                    </span>
                    <span v-if="col.result">
                        <Icon type="md-checkmark" style="color:green" v-if="d.status === 1"></Icon>
                        <span style="color:red;fontSize:0.8em" v-else>{{d.errorMessage || '解析失败'}}</span>
                    </span>
                    <span v-else-if="col.url">
                        <a :href="d[col.key]" :title="d[col.key]" target="_blank">{{ d[col.key] }}</a>
                    </span>
                    <span v-else :title="d[col.key]">{{ d[col.key] }}</span>
                </span>
            </div>
        </div>
        <Spin size="large" fix v-if="loading"></Spin>
    </div>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default: () => {
                return [
                    {
                        title: "name",
                        key: "indexPackageName",
                        tree: true,
                        width: 250
                    },
                    {
                        title: "group",
                        key: "indexGroup",
                    },
                    {
                        title: "package",
                        key: "indexPackageName",
                    },
                    {
                        title: "version",
                        key: "indexVersion",
                        width: 50
                    },{
                        title: "所属软件",
                        key: "ownedSoftwareName",
                    },
                    {
                        title: "所属软件版本",
                        key: "ownedSoftwareVersion"
                    },
                    {
                        title:"所属软件地址",
                        key: "ownedSoftwareUrl",
                        url: true
                    },
                    {
                        title:"校验结果",
                        result: true,
                        width: 20,
                        align: 'center'
                    }
                ];
            },
        },
        data: {
            type: Array,
            default: () => {
                return [
                    {
                        name: "name-1",
                        group: "group-1",
                        package: "package-1",
                        version: "version-1",
                    },
                    {
                        name: "name-2",
                        group: "group-2",
                        package: "package-2",
                        version: "version-2",
                        children: [
                            {
                                name: "name-2-1",
                                group: "group-2-1",
                                package: "package-2-1",
                                version: "version-2-1",
                            },
                            {
                                name: "name-2-2",
                                group: "group-2-2",
                                package: "package-2-2",
                                version: "version-2-2",
                                children: [
                                    {
                                        name: "name-2-2-1",
                                        group: "group-2-2-1",
                                        package: "package-2-2-1",
                                        version: "version-2-2-1",
                                    },
                                ],
                            },
                        ],
                    },
                ];
            },
        },
    },
    data() {
        return {
            tableData: [],
            count: 0,
            loading: true
        };
    },
    methods: {
        normalizeData(data, ret, level) {
            if (ret == null) {
                ret = [];
            }
            if (data == null) {
                return ret;
            }

            if (level == null) {
                level = 0;
            }

            data.forEach((d) => {
                d.level = level;
                d.expanded = true;
                d.show = true;
                d.status = 1;
                ret.push(d);
                if (d.children != null && d.children.length !== 0) {
                    d.transparent = false;
                    this.normalizeData(d.children, ret, level + 1);
                } else if (d.loaded === 0) {
                    d.transparent = false;
                    d.expanded = false;
                } else{
                    d.transparent = true;
                }
            });
            return ret;
        },
        getIndent(d) {
            let style = {
                marginLeft: d.level * 16 + "px"
            }
            if(d.transparent){
                style.color = "transparent";
                style.borderColor = "transparent";
            }

            if (d.loaded === 1) {
                style.color = 'orange';
                style.borderColor = "transparent";
            }
            return style
        },
        expand(data, index){
            if (data.loaded === 0) {
                data.loaded = 1;
                this.tableData = this.tableData.slice();
                setTimeout(()=>{
                    data.children = this.loadDependencies(data.id, 4);
                    data.loaded = 2;
                    let insertData = this.normalizeData([data]);
                    this.tableData.splice(index, 1, ...insertData);
                },2000)
                return;
            }
            let parentLevel = data.level;
            data.expanded = true;
            this.show(data, index);
            this.tableData = this.tableData.slice();
            console.log('expand')
        },
        hide(data, index){
            let parentLevel = data.level;
            data.expanded = false;
            for(let i = index + 1; i < this.tableData.length; i++){
                let d = this.tableData[i];
                if((d.level === parentLevel) || (d.level < parentLevel)) {
                    break;
                }
                d.show = false;
            }
            this.tableData = this.tableData.slice();
            console.log('hide')
        },
        show(data, index){
            let stateStack = [];
            let currentState = {
                level: data.level,
                expanded: data.expanded
            };
            let parentLevel = data.level; 
            for(let i = index + 1; i < this.tableData.length; i++){
                let d = this.tableData[i];
                if (d.level === parentLevel) {
                    break
                }
                d.show = true;
                if (d.expanded === false) {
                    i = this.skipHide(d, i);
                }
            }
        },
        skipHide(data, index){
            let parentLevel = data.level;
            index++;
            for(;index < this.tableData.length; index++){
                let d = this.tableData[index];
                if (d.level === parentLevel || d.level < parentLevel) {
                    index--;
                    break;
                }
            }
            return index;
        },
        loadDependencies(pid, level) {
            if (level === 0) {
                return;
            }
            let dependencies = [];
            for (let i = 0; i < 2; i++) {
                let dependency = {
                    title: "title" + pid + '_' + i,
                    name: "dependency-name" + pid + '_' + i,
                    indexGroup: "dependency-group" + pid + i,
                    indexPackageName: "dependency-package" + pid + '_' + i,
                    indexVersion: "dependency-version" + pid + i,
                    ownedSoftwareName: "dependency-ownedSoftwareName" + pid + i,
                    ownedSoftwareVersion:
                        "dependency-ownedSoftwareVersion" + pid + i,
                    ownedSoftwareUrl: "dependency-ownedSoftwareUrl" + pid + i,
                    id: pid + '_' + i,
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
        loadComponents() {
            let id = 0;
            for (let i = 0; i < 5; i++) {
                let component = {
                    title: "title" + i,
                    name: "component-name" + i,
                    indexGroup: "component-group" + i,
                    indexPackageName: "component-package" + i,
                    indexVersion: "component-version" + i,
                    ownedSoftwareName: "component-ownedSoftwareName" + i,
                    ownedSoftwareVersion: "component-ownedSoftwareVersion" + i,
                    ownedSoftwareUrl: "component-ownedSoftwareUrl" + i,
                    children: [],
                    id: id + "",
                    loaded: 0
                };
                // component.children = this.loadDependencies(component.id, 3)
                id++;
                this.tableData.push(component);
            }
        },
        getItemStyle(col) {
            let style = {

            }
            if (col.width) {
                style.width = col.width + 'px';
            }
            if (col.align) {
                style.textAlign = col.align;
            }
            return style
        }
    },
    mounted() {
        this.loadComponents();
        this.tableData = this.normalizeData(this.tableData);
        setTimeout(()=>{
            this.loading = false
        }, 1000)
        console.log(this.count);
    },
};
</script>
<style lang="less" scoped>
.my-tree-table {
    width: 100%;
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    position: relative;
    .head {
        display: flex;
        span {
            flex-grow: 1;
            width: 200px;
            border: 1px solid #cccccc;
            border-left: 0;
            border-top: 0;
            padding: 5px;
            padding-left: 5px;
            padding-right: 5px;
            color: #000;
            font-weight: bold;
        }
    }

    .row {
        display: flex;
        .item {
            width: 200px;
            border: 1px solid #cccccc;
            border-left: 0;
            border-top: 0;
            padding: 5px;
            padding-left: 5px;
            padding-right: 5px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            flex-grow: 1;
        }
    }
}
</style>
