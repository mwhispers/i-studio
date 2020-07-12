<template>
  <div class="common-time-line-card">
    <Row>
      <i-col span="15" class="left">
        <div ref="lineChart" class="line-chart-div"></div>
      </i-col>
      <i-col span="9" class="right">
        <div class="recent">
          <RadioGroup v-model="recent" type="button" size="small" @on-change="recentPick">
            <Radio :label="recentWeekString"></Radio>
            <Radio :label="recentMonthString"></Radio>
          </RadioGroup>
        </div>
        <div class="date-choose" style="margin-top:15px">
            <span style="margin-right:5px">开始</span>
            <DatePicker type="date" @on-change="datePickBegin" :value="dateBegin"></DatePicker>
            <span style="margin-left:15px;margin-right:5px">结束</span>
            <DatePicker type="date" @on-change="datePickEnd" :value="dateEnd"></DatePicker>
        </div>
        <div class="yesterday">
            <div>昨日：</div>
            <div>
                <div>
                    <span style="margin-right:5px">55</span>
                    <span>个漏洞</span>
                </div>
                <div>
                    <span style="margin-right:5px">55</span>
                    <span>个patch</span>
                </div>
            </div>
        </div>
        <div class="today">
            <div>今日：</div>
            <div>
                <div>
                    <span style="margin-right:5px">55</span>
                    <span>个漏洞</span>
                </div>
                <div>
                    <span style="margin-right:5px">55</span>
                    <span>个patch</span>
                </div>
            </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      echartsInstance: null,
      commonOption: {
        title: {
          left: "center"
        },
        legend: {},
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "value",
          axisLabel: {
              formatter: (value) => {
                  let v = +value + 1;
                  return "2020/06/0" + v;
              }
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "line",
            data: [1, 4, 6, 7, 5, 8, 9, 10, 19, 10]
          }
        ]
      },

      today: this.getDate(),

      recent: '最近7天',

      recentWeekString: '最近7天',
      recentWeekDate: this.getDate(6),

      recentMonthString: '最近1月',
      recentMonthDate: this.getDate(29),

      dateBegin: this.getDate(6),
      dateEnd: this.getDate()
    };
  },
  methods: {
    setChartOption() {
      if (this.echartsInstance == null) {
        let dom = this.$refs.lineChart;
        this.echartsInstance = this.$echarts.init(dom);
      }
      let ret = [];
      for(let i = 0, l = this.commonOption.series[0].data.length; i < l; i++){
          let tmp = [];
          tmp.push(i);
          tmp.push(this.commonOption.series[0].data[i]);
          ret.push(tmp);
      }
      this.commonOption.series[0].data = ret;
      let option = $.extend(true, {}, this.commonOption, this.option);
      console.log(option);
      this.echartsInstance.setOption(option, true);
    },
    datePickBegin(date) {
        // 选择日期
        let pickDate = new Date(date);

        let tmp = this.dateBegin;

        this.dateBegin = pickDate;

        if(this.today < pickDate){
            this.$Message.error('请选择正确的日期');
            this.dateBegin = tmp;
            return;
        }

        if(this.dateBegin > this.dateEnd){
            this.$Message.error('请选择正确的日期');
            this.dateBegin = tmp;
            return;
        }

        this.updateDate();
    },
    datePickEnd(date) {
        // 选择日期
        let pickDate = new Date(date);

        let tmp = this.dateEnd;

        this.dateEnd = pickDate;

        if(this.today < pickDate){
            this.$Message.error('请选择正确的日期');
            this.dateEnd = tmp;
            return;
        }

        if(this.dateBegin > this.dateEnd){
            this.$Message.error('请选择正确的日期');
            this.dateEnd = tmp;
            return;
        }

        this.updateDate();
    },
    recentPick() {
        switch(this.recent){
            case this.recentWeekString:
                this.dateBegin = this.recentWeekDate;
                this.dateEnd = this.today;
                this.updateDate()
                break;
            case this.recentMonthString:
                this.dateBegin = this.recentMonthDate;
                this.dateEnd = this.today;
                this.updateDate();
                break;
            default:
                break;
        }
    },
    getDate(day) {
        if(!day){
            day = 0;
        }
        let date = Date.now() - day * 1000 * 60 * 60 * 24;
        date = new Date(date);
        date = this.format(date);
        date = new Date(date);
        return date;
    },
    format(date) {
        let ret = [];
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        if(m < 10){
            m = "0" + m;
        }
        let d = date.getDate();
        if(d < 10){
            d = "0" + d;
        }
        ret.push(y);
        ret.push(m);
        ret.push(d);
        return ret.join('-');
    },
    updateDate(){
        let obj = {
            dateBegin: this.dateBegin,
            dateEnd: this.dateEnd
        }
        this.$emit("updateDate",obj);
    }
  },
  watch: {
    option() {
      this.setChartOption();
    }
  },
  created() {
    this.$nextTick(() => {
      this.setChartOption();
    });
  }
};
</script>
<style lang="less" scoped>
.common-time-line-card {
    padding-top: 10px;
  .left {
    .line-chart-div {
      width: 1200px;
      height: 300px;
    }
  }

  .right {
    padding-left: 100px;
    .yesterday{
        margin-top: 70px;
        display: flex;
    }

    .today{
        .yesterday;
        margin-top: 20px;
    }
  }
}
</style>