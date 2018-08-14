<template>
  <div class="sign-time" :style="{'background':`url(${backGroundImg}) 440px 100%`}">
    <div class="sign-time-text">{{dateValue}}</div>
    <div class="history-memory-btn" @click="historyList">
        历史记录
    </div>
  </div>
</template>

<script>
import units from "../units/tools"
const fullDate = units.getCurrentTime("year")
export default {
  props:["data"],
  name: "teacher-clock-in-banner",
  created:function () {
    if(this.data.state==="sucess"){
      this.backGroundImg =require("../assets/sucess.png")
    }else if(this.data.state==="default"){
      this.backGroundImg = require("../assets/primary.png")
    }
  },
  data(){
    return {
      backGroundImg:require("../assets/primary.png"),
      dateValue:`${fullDate.year}年${fullDate.month}月`
    }
  },
  methods: {
    historyList:function () {
      this.$router.push({path:"/teacherHistoryMemory"})
    }
  }
}
</script>

<style scoped>
  .sign-time{
    height: 440px;
    text-align: center;
    color: rgba(255,255,255,.8);
    overflow:hidden;
  }
  .sign-time-text{
    font-family:PingFang-SC-Medium;
    font-size: 60px;
    margin-top: 120px;
  }
  .history-memory-btn{
    width:215px;
    height:62px;
    background:rgba(255,255,255,.2);
    border-radius:8px;
    margin: 42px auto 0 auto;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,.6);
    text-align: center;
    line-height: 62px;
  }
</style>
