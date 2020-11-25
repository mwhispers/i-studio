<template>
    <div class="speed-caculate-page">
        <div class="head">
            <span class="welcome">欢迎来到英雄联盟</span>
        </div>
        <div class="content">
            <Form :label-width="100">
                <FormItem label="Start Speed">
                    <Input v-model="startSpeed"/>
                </FormItem>
                <FormItem label="Input Speed">
                    <Input v-model="inputSpeed"/>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="caculate">Caculate</Button>
                </FormItem>
                <FormItem>
                    <Card class="result">
                        <div class="tip">Result</div>
                        <div>
                            <span class="key">eSpeed: </span>
                            <span class="value">{{eSpeed}}</span>
                        </div>
                        <div>
                            <span class="key">Count: </span>
                            <span class="value">{{count}}</span>
                        </div>
                        <div>
                            <span class="key">Time: </span>
                            <span class="value">{{totalTime}}</span>
                        </div>
                    </Card>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputSpeed: "",
            count: "",
            startSpeed: 0.75,
            totalTime: ""
        }
    },
    methods: {
        caculate() {
            // 初始攻速
            let speed = this.startSpeed;
            // 加上 羊刀 提供的攻速
            speed = speed + this.startSpeed * 0.15;
            // 下面开始计算 羊刀 叠攻速的时间
            let interval = 0.06;
            let count = 0;
            let time = 0;
            while(speed < this.inputSpeed) {
                count++;
                let t = 1 / speed;
                time = time + t;
                speed = speed + this.startSpeed * interval; 
                if(count == 5) {
                    speed = speed + this.startSpeed * 0.4;
                }
            }
            this.count = count;
            this.totalTime = time;
        }
    },
    computed: {
        eSpeed() {
            let espeed = this.startSpeed * ( 1 + 0.15);
            return espeed
        }
    }
};
</script>
<style lang="less" scoped>
.speed-caculate-page {
    .content {
        width: 70%;
        margin: 0 auto;
        .result {
            .tip {
                color: #000;
                font-weight: bold;
                font-size: 15px;
            }
            .key {
                width: 100px;
                text-align: left;
                display: inline-block;
            }
        }
    }

    .head {
        height: 60px;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 20px;
        .welcome {
            line-height: 60px;
            font-size: 16px;
            color: green;
            font-weight: bold;
            margin-left: 20px;
        }
    }
}
</style>
