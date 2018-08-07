<template>
  <div class="body-container">
    <div class="room-details-header">
      <div class="room-details-title">
        <span class="room-details-room">104寝室</span>
        <span>（楼栋名）</span>
      </div>
      <div class="room-details-line"></div>
      <div class="room-details-state">
        <div>
          <div class="room-details-state-number">4</div>
          <div class="room-details-state-text">寝室人数</div>
        </div>
        <div>
          <div class="room-details-state-number">4</div>
          <div class="room-details-state-text">未归人数</div>
        </div>
        <div>
          <div class="room-details-state-number">4</div>
          <div class="room-details-state-text">晚归人数</div>
        </div>
      </div>
      <div class="room-details-flag">未查寝</div>
    </div>
    <div class="room-details-body">
      <div class="room-details-container">
        <div class="room-details-item" v-for="(item,index) in listData" @touchstart="checkState($event,index)" @touchend="checkClear">
          <div class="room-details-check" v-if="item.show"  @click="checkRoom($event,index)">
            <div class="room-details-check-btn background-sucess" data-index="background-sucess">到勤</div>
            <div class="room-details-check-btn background-warning" data-index="background-warning">晚归</div>
            <div class="room-details-check-btn background-danger" data-index="background-danger">未归</div>
          </div>
          <div class="room-details-item-img">
            <img src="../assets/head.png" alt="">
          </div>
          <div class="room-details-item-information">
            <div class="room-details-item-name">梁朝伟</div>
            <div  :class="['room-details-item-state',item.itemState]">{{item.itemStateText}}</div>
          </div>
          <div class="room-details-study-number">
            学号：20181205154
          </div>
          <div class="room-details-item-line"></div>
          <div class="room-details-item-position">1床</div>
        </div>
      </div>
    </div>
    <div class="room-details-footer">
      <div class="room-details-btn" @click="checkBegin">开始查寝</div>
    </div>
    <van-popup
      v-model="beginCheck"
      :overlay-style="{'background':'rgba(0,0,0,0)'}"
    >
      <div class="time-not-arrive">查寝时间未到</div>
    </van-popup>
    <van-popup
      v-model="endCheck"
    >
      <div class="end-check-room">
        <div class="end-check-room-title">
          结束查寝
        </div>
        <div class="end-check-room-body">
          是否确认查寝操作？
        </div>
        <div class="end-check-room-footer">
          <div class="end-check-room-btn end-check-room-cancel" @click="checkCancel">取消</div>
          <div class="end-check-room-btn end-check-room-affirm background-primary" @click="checkAffirm">确认</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';
import Vue from 'vue';
Vue.use(Popup);
let timer;
export default {
  components:{Popup},
  name: "room-details",
  data(){
   return {
     beginCheck: false,
     endCheck:false,
     listData:[
       {
          show:false,
          state:"",
          itemState:"background-default",
          itemStateText:"查勤"
       },
       {
         show:false,
         state:"",
         itemState:"background-default",
         itemStateText:"查勤"
       },
     ]
   }
  },
  methods:{
    checkState:function (e,i) {
      const _this = this
      timer = setTimeout(function () {
          _this.listData[i].show = true
      }, 1000)
    },
    checkClear:function () {
      clearTimeout(timer)
    },
    checkRoom:function (e,i) {
      if(e.target.dataset.index!==undefined){
        this.listData[i].itemState = e.target.dataset.index
        this.listData[i].itemStateText= e.target.innerHTML
        this.listData[i].show = false
      }else {
        return false
      }
    },
    checkBegin:function () {
      /*开始查寝*/
     /* const _this = this
      this.beginCheck = true
      setTimeout(function () {
        _this.beginCheck = false
      },1000)*/
      /*结束查寝*/
      this.endCheck = true
    },
    checkCancel:function () {
      this.endCheck = false
    },
    checkAffirm:function () {
      this.endCheck = false
    }
  }
}
</script>

<style scoped>
.room-details-header{
  width:690px;
  height:282px;
  background:rgba(61,168,245,1);
  border-radius:8px;
  box-shadow:9px 0 13px rgba(61,168,245,0.31);
  margin: 10px auto 28px auto;
}
  .room-details-title{
    height: 120px;
    text-align: center;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    line-height: 120px;
  }
  .room-details-room{
    font-family:PingFang-SC-Bold;
  }
  .room-details-line{
    width:655px;
    height:2px;
    background:rgba(236,236,236,.58);
    margin: auto;
  }
  .room-details-state{
    display: flex;
    justify-content: space-between;
    color:rgba(255,255,255,1);
    padding: 0 80px;
  }
  .room-details-state-number{
    font-size:56px;
    text-align: center;
    font-family:PingFang-SC-Bold;
  }
  .room-details-state-text{
    font-size: 26px;
    font-family:PingFang-SC-Medium;
  }
  .room-details-flag{
    /*background:rgba(149,149,149,1);*/
    width:170px;
    height:54px;
    background:rgba(211,37,37,1);
    border-radius:8px;
    box-shadow:10px 0px 18px rgba(211,37,37,0.27);
    text-align: center;
    font-size:40px;
    line-height: 54px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    position: absolute;
    top: 35px;
    left: 20px;
    /*z-index: 10;*/
  }
  .room-details-body{
    height: 712px;
    overflow-y: auto;
  }
  .room-details-container{
    width: 690px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
  }
  .room-details-item{
    width:326px;
    height:384px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    box-shadow:9px 0 13px rgba(181,181,181,0.31);
    margin-bottom: 35px;
    -webkit-touch-callout:none; /*系统默认菜单被禁用*/
    -webkit-user-select:none; /*webkit浏览器*/
    -khtml-user-select:none; /*早期浏览器*/
    -moz-user-select:none;/*火狐*/
    -ms-user-select:none; /*IE10*/
    user-select:none;
    position: relative;
  }
  .room-details-check{
    width:326px;
    height:384px;
    position: absolute;
    background-color: rgba(0,0,0,.5);
    border-radius:8px;
  }
  .room-details-check-btn{
    width:194px;
    height:70px;
    border-radius:8px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 70px;
    margin: 0 auto 39px auto;
  }
  .room-details-check>.background-sucess {
    margin-top: 52px;
  }
  .room-details-item-img{
    text-align: center;
    margin-top: 64px;
  }
  .room-details-item-img img{
    height: 93px;
    width: 93px;
  }
  .room-details-item-information{
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }
  .room-details-item-name{
    font-size:40px;
    font-family:PingFang-SC-Bold;
    color:rgba(85,85,85,1);
  }
  .room-details-item-state{
    width:50px;
    height:24px;
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    line-height: 24px;
    border-radius: 24px;
    margin-top: 24px;
  }
  .room-details-study-number{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    text-align: center;
    margin-bottom: 18px;
  }
.room-details-item-line{
  height:2px;
  background:rgba(236,236,236,1);
}
.room-details-item-position{
  height: 92px;
  text-align: center;
  font-size:36px;
  font-family:PingFang-SC-Medium;
  color:rgba(153,153,153,1);
  line-height: 92px;
}
  .room-details-footer{
    height:116px;
    background:rgba(247,247,247,1);
    box-shadow:7px 0 16px rgba(61,168,245,0.14);
    overflow: hidden;
  }
  .room-details-btn{
    width:661px;
    height:84px;
    background:rgba(61,168,245,1);
    border-radius:8px;
    margin: 20px auto 0 auto;
    font-size:36px;
    font-family:PingFang-SC-Bold;
    color:rgba(254,255,255,1);
    line-height: 84px;
    text-align: center;
  }
  .time-not-arrive{
    width:294px;
    height:80px;
    background:rgba(0,0,0,.7);
    border-radius:12px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 80px;
  }
  .end-check-room{
    width:600px;
    height:415px;
    background:rgba(247,247,247,1);
    border-radius:16px;
    box-shadow:2px 4px 4px rgba(90,90,90,0.04);
  }
  .end-check-room-title{
    height: 114px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(224,224,224,1);
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    line-height: 114px;
    font-size:36px;
    text-align: center;
  }
  .end-check-room-body{
    height: 198px;
    line-height: 198px;
    text-align: center;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
  }
  .end-check-room-footer{
    height: 80px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
  }
  .end-check-room-btn{
    width:246px;
    height:80px;
    border-radius:8px;
    font-size:32px;
    font-family:PingFang-SC-Medium;
    text-align: center;
    line-height: 80px;
  }
  .end-check-room-cancel{
    background-color: #fff;
    color:rgba(85,85,85,1);
    text-align: center;
  }
  .end-check-room-affirm{
    color: #fff;
  }
</style>
