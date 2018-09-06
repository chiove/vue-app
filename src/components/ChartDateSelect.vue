<template>
  <div>
    <div class="date-select-item">
      <span @click="dateSelect" class="date-select-text">{{dateValue}}</span>
      <img  class="select-down" src="../assets/selectDown.png">
    </div>
    <div class="date-select" v-if="displayState">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
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
import units from '../units/tools'
Vue.use(DatetimePicker)
const fullDate = units.getCurrentTime('date')
export default {
  components: {DatetimePicker},
  name: 'chart-date-select',
  mounted: function () {
    const selectDate = {
      year: fullDate.year,
      month: fullDate.month,
      day:fullDate.day
    }
    this.$emit('selectDateChart', selectDate)
  },
  data () {
    return {
      currentDate: new Date(),
      maxDate: new Date(),
      displayState: false,
      dateValue: `${fullDate.year}年${fullDate.month}月${fullDate.day}日`
    }
  },
  methods: {
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    cancel: function () {
      this.displayState = false
    },
    confirm: function (value) {
      this.displayState = false
      this.dateValue = `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`
      const selectDate = {
        year: value.getFullYear(),
        month: value.getMonth() + 1,
        day: value.getDate()
      }
      this.$emit('selectDateChart', selectDate)
    },
    dateSelect: function () {
      this.displayState = true
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
  .date-select-text{
    font-size: 36px;
  }
  .select-down{
    height: 10px;
    width: 16px;
    margin-left: 6px;
    position: relative;
    top: -5px;
  }
  .date-select{
    font-size: 24px;
    width: 100%;
    max-width: 1125px;
    position: absolute;
    bottom: 0;
    z-index: 99;
  }
</style>
