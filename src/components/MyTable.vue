<template>
    <div class="my-table">
        <Table :columns="columns" :data="data">

        </Table>
    </div>
</template>
<script>
import RecycleTreeTable from './RecycleTreeTable.vue'
export default {
    data() {
        return {
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        let data = [];
                        let count = 10000;
                        for(let i = 0; i < count; i++) {
                            let obj = {
                                id: i,
                                name: 'int_name_' + i
                            }
                            data.push(obj);
                        }
                        return h(RecycleTreeTable, {
                            props: {
                                columns: [
                                    {
                                        title: 'name',
                                        key: 'name'
                                    }
                                ],
                                data: data
                            }
                        })
                    } 
                },
                {
                    title: 'name',
                    key: 'name'
                }
            ],
            data: [
                {
                    name: 'name_0'
                },
                {
                    name: 'name_1'
                }
            ]
        }
    }
}
</script>