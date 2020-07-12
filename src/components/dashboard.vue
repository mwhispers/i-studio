<template>
    <div class="dashboard">
        <div class="card">
            <common-time-line-card :option="mainSwChartOption5" @updateDate="updateDate"></common-time-line-card>
        </div>
    </div>
</template>
<script>
import CommonTimeLineCard from "./CommonTimeLineCard.vue";
export default {
    components:{
        CommonTimeLineCard
    },
    data(){
        return {
            mainSwChartOption5:{
                title: {
                    text: 'XXXXXXXXXXXXXXXXXX'
                }
            }
        }
    },
    methods:{
        updateDate(date){
            console.log(date.dateBegin.toString());
            console.log(date.dateEnd.toString());
        }
    }
}
</script>
<style lang="less" scoped>
.dashboard{
    padding: 20px;
    .card{
        border: 1px solid #cccccc;
        box-shadow: -1px 1px 7px 0 #cccccc;
        min-height: 200px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
}
</style>