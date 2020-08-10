<template>
    <div class="wrap">
        <div class="box" ref="box">
            <span ref="marquee" class="marquee">{{text}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "MyMarquee",
    props: ['lists'],
    data() {
        return {
            text: ''
        }
    },
    methods: {
        move() {
            let width = this.$refs.marquee.getBoundingClientRect().width;
            let wrapWidth = this.$refs.box.getBoundingClientRect().width;
            let distance = 0;
            console.log(width);
            console.log(wrapWidth);
            let a, b;
            // if(width > wrapWidth) {
            //     a = 
            // } else {

            // }
            setInterval(()=>{
                distance = distance - 1.5;
                if(-distance >= width) {
                    distance = wrapWidth;
                }
                this.$refs.box.style.transform = `translateX(${distance}px)`; 
            }, 20)
        }
    },
    mounted() {
        this.text = this.lists.join(' ');
    },
    updated() {
        this.move();
    }
}
</script>
<style lang="less" scoped>
.wrap {
    overflow: hidden;
    width: 40%;
    .marquee {
        white-space: nowrap;
    }
}
</style>
<style>

</style>