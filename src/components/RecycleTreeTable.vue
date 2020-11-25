<template>
    <div class="recycle-tree-table">
        <div class="head">
            <span v-for="(col, i) in columns" :key="i">{{col.title}}</span>
        </div>
        <RecycleScroller class="body" :items="data" v-slot="{item}" :item-size="100">
            <div class="row">
                <span v-for="(col, i) in columns" :key="i">
                    <span>{{item[col.key]}}</span>
                </span>
            </div>
        </RecycleScroller>
    </div>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default: () => {
                return []
            }
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    methods: {
        getHeadStyle() {

        }
    }
}
</script>
<style lang="less">
.recycle-tree-table {
    .body {
        height: calc(100vh);
    }
}
</style>