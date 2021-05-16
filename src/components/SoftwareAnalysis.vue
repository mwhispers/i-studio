<template>
    <div>
        <Table :columns="columns" :data="data"></Table>
    </div>
</template>
<script>
import TreeTable from './TreeTable.vue'
export default {
    components: {
        TreeTable
    },
    data(){
        return {
            columns: [
                {
                    type:'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(TreeTable)
                    }
                },
                {
                    title: 'name',
                    key: 'name'
                }
            ],
            data:[
                {
                    name:'liwuyi'
                }
            ]
        }
    }
}
</script>
