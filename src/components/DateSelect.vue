<template>
  <div>
    <div class="date-select-item" :style="{'padding':padding,'margin':margin}">
      <span @click="dateSelect">{{dateValue}}</span>
      <img  class="select-down" src="../assets/selectDown.png">
    </div>
    <div class="date-select" v-if="displayState">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        @cancel="cancel"
        @confirm="confirm"
        :max-date="maxDate"
        :min-date="minDate"
        :formatter="formatter"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { DatetimePicker } from 'vant'
import units from "../units/tools"
Vue.use(DatetimePicker)
const fullDate = units.getCurrentTime("year")
export default {
  components:{DatetimePicker},
  name: "date-select",
  mounted:function () {
    const selectDate = {
      year:fullDate.year,
      month:fullDate.month
    }
    this.$emit('selectDate',selectDate)
  },
  props:["padding","margin"],
  data() {
    return {
      currentDate: new Date(),
      maxDate:new Date(fullDate.year,fullDate.month),
      minDate: new Date('2018','00','01'),
      displayState:false,
      dateValue:`${fullDate.year}年${fullDate.month}月`
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
      this.displayState=false;
      this.dateValue = `${value.getFullYear()}年${value.getMonth()+1}月`;
      const selectDate = {
        year:value.getFullYear(),
        month:value.getMonth()+1
      }
      this.$emit('selectDate',selectDate);
    },
    dateSelect:function () {
      this.displayState=true
    }
  }
}
</script>

<style scoped>
  .date-select-item{
    margin-top: 13px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(63,180,255,1);
  }
  .select-down{
    height: 10px;
    width: 16px;
    margin-left: 6px;
    position: relative;
    top: -4px;
  }
  .date-select{
    width: 100%;
    max-width: 1125px;
    position: fixed;
    bottom: 0;
  }
</style>
