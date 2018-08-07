<template>
    <div class="body-container">
      <div class="date-select-container">
        <date-select v-on:selectDate="listenEvent" :padding="padding"></date-select>
      </div>
      <div class="memory-title">
        <span>打卡记录</span>
      </div>
      <div class="memory-content">
        <div class="memory-item">
          <span class="memory-icon"></span>
          <span>2018年7月20日</span>
          <span class="memory-item-time">23:23:23</span>
        </div>
        <div class="memory-item">
          <span class="memory-icon"></span>
          <span>2018年7月20日</span>
          <span class="memory-item-time">23:23:23</span>
        </div>
        <div class="memory-item">
          <span class="memory-icon"></span>
          <span>2018年7月20日</span>
          <span class="memory-item-time">23:23:23</span>
        </div>
        <div class="memory-item">
          <span class="memory-icon"></span>
          <span>2018年7月20日</span>
          <span class="memory-item-time">23:23:23</span>
        </div>
      </div>
    </div>
</template>

<script>
import dateSelect from '../components/DateSelect'
import dataList from '../json/memoryList.json'
export default {
    components:{dateSelect},
    name: "history-memory",
    created:function () {

    },
    data:function () {
      return {
        padding:"0.68rem 0.533333rem"
      }
    },
    methods: {
      listenEvent:function (data) {
        console.log(data)
      }
    }
}
</script>

<style scoped>
  .memory-title{
    padding: 0 40px;
    font-weight: bold;
    font-size:30px;
    font-family:PingFang-SC-Bold;
    color:rgba(85,85,85,1);
  }
  .memory-item{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    padding: 29px 65px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .memory-item-time{
    margin-left: 10px;
  }
  .memory-icon{
    display: inline-block;
    width:16px;
    height:16px;
    background:rgba(172,172,172,1);
    box-shadow:0px 0px 9px rgba(172,172,172,0.65);
    margin-right: 4px;
    border-radius: 16px;
  }
</style>
