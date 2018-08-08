<template>
  <div class="body-container background-primary">
    <div class="data-banner">
      <div class="data-information">
        <div class="data-left">
          <img class="sign-user-img" src="../assets/head.png">
          <div>
            <div class="data-name">
              <span class="data-name-text">刘震云</span>
              <span class="data-information-text">2018级5班</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-school" src="../assets/school.png">
              <span>重庆工业职业技术学院</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-professional" src="../assets/professional.png">
              <span>视觉与传达专业</span>
            </div>
            <div class="data-information-text">
              <span class="data-information-teacher">辅导员:王老师</span>
              <span>学号:2018130512</span>
            </div>
          </div>
        </div>
        <div class="data-right">
          608室4床
        </div>
      </div>
    </div>
    <div class="data-form">
      <div class="data-form-item" @click="checkFun">
        <div>考勤状态</div>
        <div class="color-sucess">
          <span>到勤</span>
          <img class="data-form-select" src="../assets/selectRight.png" alt="">
        </div>
      </div>
      <div class="data-form-line"></div>
      <div class="data-form-item">
        <div>今日门禁数据</div>
        <img class="data-form-select" src="../assets/selectRight.png" alt="">
      </div>
      <div class="data-form-line"></div>
      <div class="data-form-item">
        <div>今日打卡轨迹</div>
        <img class="data-form-select" src="../assets/selectRight.png" alt="">
      </div>
      <div class="data-form-line"></div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        class="data-form-picker"
        show-toolbar
        :columns="columns"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Popup,Picker  } from 'vant'
  import Vue from 'vue'
  Vue.use(Popup)
  Vue.use(Picker)
  export default {
    components:{Popup,Picker},
    name: "daily-personal-information",
    data(){
      return {
        show:false,
        columns:['到勤','晚归','未归']
      }
    },
    methods:{
      checkFun:function () {
        this.show = true
      },
      confirm:function () {
        this.show = false
      },
      cancel:function () {
        this.show = false
      }
    }
  }
</script>

<style scoped>
  .data-banner{
    height: 300px;
    background: url("../assets/dataBanner.png") 100% 100% no-repeat;
    overflow: hidden;
  }
  .data-information{
    margin-top: 68px;
    display: flex;
    justify-content: space-between;
  }
  .data-left{
    display: flex;
    justify-content: flex-start;
    margin-left: 41px;
  }
  .data-name-text{
    font-size:34px;
    font-family:PingFang-SC-Bold;
    color:rgba(254,254,254,1);
    margin-right: 17px;
    font-weight: bold;
  }
  .data-information-text{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(254,254,254,.8);
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .align-middle{
    display: flex;
    align-items: center;
  }
  .data-professional{
    width: 24px;
    height: 22px;
    margin-right: 7px;
  }
  .data-school{
    width: 20px;
    height: 20px;
    margin-right: 7px;
  }
  .data-information-teacher{
    margin-right: 30px;
  }
  .sign-user-img{
    height: 114px;
    width: 114px;
    margin-right: 27px;
  }
  .data-right{
    width:154px;
    height:44px;
    background:rgba(255,192,1,1);
    border-top-left-radius: 44px;
    border-bottom-left-radius: 44px;
    line-height: 44px;
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    text-align: center;
  }
  .data-form{
    height:910px;
    background:rgba(255,255,255,1);
    border-radius:30px 30px 0 0;
    padding: 0 32px;
    overflow: auto;
  }
  .data-form-item{
    height: 126px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(51,51,51,1);
    line-height:136px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .data-form-select{
    height: 25px;
    width: 15px;
  }
  .data-form-line {
    height:2px;
    background:rgba(236,236,236,1);
    margin: auto;
  }
</style>
