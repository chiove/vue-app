<template>
  <div class="sign-content">
    <div class="sign-in">
      <div class="sign-in-text">签到打卡</div>
      <div class="sign-in-time">{{sign.timeNow}}</div>
    </div>
    <div class="sign-location" v-if="position">
      <img class="sign-img" src="../assets/true.png"/>
      <span class="sign-location-text">已进入签到范围：重庆工业职业技术...</span>
      <span class="sign-location-btn">重新定位</span>
    </div>
  </div>
</template>

<script>
import units from "../units/tools"
export default {
  props:["data","notPosition"],
  name: "sign-content",
  created:function () {
    const _this = this;
    console.log(this.notPosition,this.position)
    if(this.notPosition){
      this.position=false
    }
    setInterval(function () {
      _this.sign.timeNow = units.getCurrentTime("hour");
    },1000)
  },
  data:function () {
    return{
      sign:{
        timeNow:""
      },
      position:true
    }
  },
  methods:{
    getTime:function () {

    }
  }
}
</script>

<style scoped>
  .sign-content{
    height: 676px;
    background-color: #f7f7f7;
    position: relative;
  }
  .sign-in{
    width:264px;
    height:264px;
    box-shadow:4px 0 16px rgba(61,168,245,0.57);
    background-color: #3DA8F5;
    border-radius: 100%;
    text-align: center;
    overflow: hidden;
    position: absolute;
    top: 218px;
    left: 50%;
    margin-left: -132px;
  }
  .sign-in-text{
    margin-top: 102px;
    font-size: 38px;
    color: #fff;
    font-weight: bold;
    font-family:PingFang-SC-Bold;
  }
  .sign-location{
    color: #555555;
    font-size: 24px;
    position: absolute;
    bottom: 122px;
    left: 50%;
    margin-left: -248px;
    white-space: nowrap;
  }
  .sign-img{
    display: inline-block;
    height: 22px;
    width: 22px;
    position: relative;
    top: -4px;
  }
  .sign-location-text{
    display: inline-block;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .sign-location-btn{
    color: #3DA8F5;
    display: inline-block;
    vertical-align: top;
  }
  .sign-in-time{
    font-size: 28px;
    color: rgba(255,255,255,.8);
    margin-top: 14px;
  }
</style>
