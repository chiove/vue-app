<template>
  <div class="sign-content">
    <div class="sign-in" :style="{boxShadow:state.boxShadow,backgroundColor:state.backgroundColor}">
      <div class="sign-in-text">{{state.text}}</div>
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
  mounted:function () {
    const _this = this;
    /*是否显示定位*/
    if(this.notPosition){
      this.position=false
    }
    /*本地时间*/
    setInterval(function () {
      _this.sign.timeNow = units.getCurrentTime("hour");
    },1000)
    /*状态改变*/
    if (this.data.state === 'sucess') {
      this.state.boxShadow = '0px 4px 16px 0px rgba(64,197,130,0.57)'
      this.state.backgroundColor = 'rgba(67,209,136,1)'
      this.state.text = '打卡成功'
    } else if (this.data.state === 'warning') {
      this.state.boxShadow = '0px 4px 16px 0px rgba(252,154,22,0.57)'
      this.state.backgroundColor = 'rgba(244,160,45,1)'
      this.state.text = '晚归'
    } else if (this.data.state === 'danger') {
      this.state.boxShadow = '0px 4px 16px 0px rgba(255,65,65,0.57)'
      this.state.backgroundColor = 'rgba(253,85,63,1)'
      this.state.text = '未归'
    } else if(this.data.state === 'primary'){
      this.state.boxShadow = '4px 0 16px rgba(61,168,245,0.57)'
      this.state.backgroundColor = '#3DA8F5'
      this.state.text = '签到打卡'
    }else if(this.data.state === 'default'){
      this.state.boxShadow = '0px 4px 16px 0px rgba(225,225,225,0.57)'
      this.state.backgroundColor = 'rgba(203,203,203,1)'
      this.state.text = '打卡时间未到'
    }
  },
  data:function () {
    return{
      sign:{
        timeNow:""
      },
      state:{
        boxShadow:'',
        backgroundColor:'',
        text:''
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
