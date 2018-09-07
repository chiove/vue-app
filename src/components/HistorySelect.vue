<template>
    <div class="history-container">
      <div class="history-children">
        <div class="history-item history-left">历史打卡轨迹</div>
        <div class="history-item history-right">
          <span @click="dateSelect">{{dateValue}}</span>
          <img  class="select-down" src="../assets/selectDown.png">
        </div>
      </div>
      <div class="history-date" v-if="displayState">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          @cancel="cancel"
          @confirm="confirm"
          :max-date="maxDate"
          :formatter="formatter"
        />
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { DatetimePicker } from 'vant'
import units from "../units/tools"
// import 'vant/lib/vant-css/picker.css';
Vue.use(DatetimePicker)
const maxDate = units.getCurrentTime("year")
export default {
      components:{DatetimePicker},
      name: "history-select",
      mounted:function(){
        /*派发系统时间*/
        this.$emit("selectDate",{
          year:this.year,
          month:this.month
        })
      },
      data() {
        return {
          datetimePicker:DatetimePicker,
          currentDate: new Date(maxDate.year,maxDate.month-1),
          maxDate:new Date(maxDate.year,maxDate.month),
          displayState:false,
          dateValue:`${maxDate.year}年${maxDate.month}月`,
          year:new Date().getFullYear(),
          month:new Date().getMonth()+1
        };
      },
      methods: {
        formatter(type, value) {
          if (type === 'year') {
            return `${value}年`;
          } else if (type === 'month') {
            return `${value}月`
          }
          return value;
        },
        cancel:function () {
          this.displayState=false
        },
        confirm:function (value) {
          this.displayState=false
          this.dateValue = `${value.getFullYear()}年${value.getMonth()+1}月`
          this.year = value.getFullYear()
          this.month = value.getMonth()+1
          this.$emit("selectDate",{
            year:value.getFullYear(),
            month:value.getMonth()+1
          })
        },
        dateSelect:function () {
          this.displayState=true
        }
      }
    }
</script>

<style scoped>
  .history-container{
    height: 79px;
    background-color: #3DA8F5;
  }
  .history-children{
    height: 79px;
    background-color: #F1F9FF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-between;
  }
  .history-item{
    margin-top: 13px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(63,180,255,1);
  }
  .history-left{
    margin-left: 33px;
  }
  .history-right{
    margin-right: 45px;
  }
  .select-down{
    height: 10px;
    width: 16px;
    margin-left: 6px;
    position: relative;
    top: -4px;
  }
  .history-date{
    width: 100%;
    max-width: 1125px;
    position: fixed;
    bottom: 0;
  }
</style>
