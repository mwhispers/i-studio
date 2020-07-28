<template>
    <div class="tree-row-component">
        <div v-for="(col, index) in columns" :key="index" :style="getStyle(col)">{{data[col.key]}}</div>
    </div>
</template>
<script>
export default {
    name: 'TreeRow',
    props: ['data'],
    data() {
        return {
            columns:[
                {
                    key:'name'
                },
                {
                    key: 'group',
                    width: 150
                },
                {
                    key: 'package',
                    width: 150
                },
                {
                    key: 'version',
                    width: 150
                }
            ]
        }
    },
    methods: {
        getStyle(col){
            let style = {
                borderBottom: '1px solid #ccc'
            }
            if(col.width > 0){
                style.width = col.width + 'px';
            } else {
                style.flexGrow = 1
            }

            return style;
        }
    }
}
</script>
<style lang="less" scoped>
.tree-row-component {
    display: inline-block;
    width: 100%;
    div{
        display: inline;
        float: right;
    }
}
</style>