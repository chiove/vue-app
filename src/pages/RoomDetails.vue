<template>
  <div class="body-container" @click="studentId=''">
    <div class="room-details-header-container">
      <div class="room-details-header">
        <div class="room-details-title">
          <span class="room-details-room">{{roomDetails.dormitoryName}}寝室</span>
          <span>（{{roomDetails.buildingName}}栋）</span>
        </div>
        <div class="room-details-line"></div>
        <div class="room-details-state">
          <div>
            <div class="room-details-state-number">{{roomDetails.totalStudent}}</div>
            <div class="room-details-state-text">寝室人数</div>
          </div>
          <div>
            <div class="room-details-state-number">{{roomDetails.layOutStudent}}</div>
            <div class="room-details-state-text">未归人数</div>
          </div>
          <div>
            <div class="room-details-state-number">{{roomDetails.layOutLayStudent}}</div>
            <div class="room-details-state-text">晚归人数</div>
          </div>
        </div>
        <div class="room-details-flag not-check-style" v-if="roomDetails.hasChecked===false">未查寝</div>
        <div class="room-details-flag al-check-style" v-else="roomDetails.hasChecked===true">已查寝</div>
      </div>
    </div>
    <div class="room-details-body">
      <div class="room-details-container">
        <div class="room-details-item" v-for="(item,index) in roomDetailsList" @touchstart="checkState($event,index,item)" v-bind:key="index" @touchend="checkClear" @click="viewDetails($event,item.studentId,item.clockStatus)">
          <div class="room-details-check" v-if="item.studentId===studentId"  @click.stop="checkRoom($event,index,item)">
            <div class="room-details-check-btn background-success" data-index="2">到勤</div>
            <div class="room-details-check-btn background-warning" data-index="3">晚归</div>
            <div class="room-details-check-btn background-danger" data-index="4">未归</div>
          </div>
          <div class="room-details-item-img">
            <div class="room-details-item-img-container">
              <img :src="item.profilePhoto" alt="">
            </div>
          </div>
          <div class="room-details-item-information">
            <div class="room-details-item-name">{{item.studentName}}</div>
            <div  class="room-details-item-state background-default" v-if="item.clockStatus===1">未打卡</div>
            <div  class="room-details-item-state background-success" v-else-if="item.clockStatus===2">到勤</div>
            <div  class="room-details-item-state background-warning" v-else-if="item.clockStatus===3">晚归</div>
            <div  class="room-details-item-state background-danger" v-else="item.clockStatus===4">未归</div>
          </div>
          <div class="room-details-study-number">
            学号：{{item.studentCode}}
          </div>
          <div class="check-room-line scale-1px"></div>
          <div class="room-details-item-position">{{item.bedCode}}床</div>
        </div>
      </div>
    </div>
    <div class="room-details-footer">
      <div class="room-details-btn" v-if="beginOrEnd" @click="checkBegin">开始查寝</div>
      <div class="room-details-btn" v-else="beginOrEnd" @click="checkEnd">结束查寝</div>
    </div>
    <van-popup
      v-model="beginCheck"
      :overlay-style="{'background':'rgba(0,0,0,0)'}"
    >
      <div class="time-not-arrive">查寝时间未到或已过</div>
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
import { Popup,Toast } from 'vant'
import units from '../units/tools'
import Vue from 'vue'
Vue.use(Popup)
Vue.use(Toast)
let timer
export default {
  components: {Popup},
  name: 'room-details',
  mounted:function(){
    if(this.$route.params.roomDetails){
      this.roomDetails = this.$route.params.roomDetails
    }else{
      this.roomDetails = JSON.parse(localStorage.getItem('rooDetails'))
    }
    if(this.$route.params.userId){
      this.userId = this.$route.params.userId
    }else{
      this.userId = localStorage.getItem('checkRoomListUserId')
    }
    this.getUserInfo()/*查询用户名*/
    this.getRoomDetailsList()/*查询学生列表*/
    this.getSystemConfig()
  },
  activated:function(){
    if(this.$route.params.roomDetails){
      this.roomDetails = this.$route.params.roomDetails
    }else{
      this.roomDetails = JSON.parse(localStorage.getItem('rooDetails'))
    }
    if(this.$route.params.userId){
      this.userId = this.$route.params.userId
    }else{
      this.userId = localStorage.getItem('checkRoomListUserId')
    }
    this.getUserInfo()/*查询用户名*/
    this.getRoomDetailsList()/*查询学生列表*/
    this.getSystemConfig()
  },
  data () {
    return {
      beginCheck: false,
      endCheck: false,
      roomDetails:{},/*宿舍详情*/
      userId:'',
      /*当天日期*/
      date:{
        year:new Date().getFullYear(),
        month:new Date().getMonth()+1,
        day:new Date().getDate()
      },
      studentId:'',/*学生ID 考勤参数*/
      clockStatus:'',/*打卡状态 考勤参数*/
      operatorName:'',/*操作人名字 考勤参数*/
      roomDetailsList:[],
      beginOrEnd:true,
      checkClockEndTime: "",
      checkClockStartTime: "",
      detailsState:false,
    }
  },
  methods: {
    /*获取系统配置*/
    getSystemConfig:function () {
      this.$http.get(process.env.API_HOST+'system-config').then(function (res) {
        if(res){
          const data = res.data.data
          this.checkClockEndTime =  data.checkClockEndTime.substring(0,5)
          this.checkClockStartTime =  data.checkClockStartTime.substring(0,5)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    checkState: function (e, i,data) {
      const _this = this
      if(!this.beginOrEnd){
        timer = setTimeout(function () {
          _this.studentId = data.studentId
          console.log(data)
        }, 1000)
      }
    },
    checkClear: function () {
      clearTimeout(timer)
    },
    viewDetails:function(e,studentId,clockStatus){
      if(this.detailsState){
        this.$router.push({name:'CheckPersonalInformation',query: {
            studentId:studentId,
            userId:this.userId,
            clockStatus:clockStatus
          }
        })
      }
    },
    checkRoom: function (e, i,data) {
      if (e.target.dataset.index !== undefined) {
        this.roomDetailsList[i].clockStatus = Number(e.target.dataset.index)
        this.clockStatus = Number(e.target.dataset.index)
        this.roomDetailsList[i].studentId = Number(e.target.dataset.index)
        this.changCheckClockStatus()/*更改考勤状态*/
      } else {
        return false
      }
    },
    /*查询用户信息*/
    getUserInfo(){
      this.$http.get(process.env.API_HOST+`select-data/user/${this.userId}`).then(function (res) {
        if(res){
          this.operatorName = res.data.data.name
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*更改考勤状态*/
    changCheckClockStatus(){
      let month = '',
        day=''
      Number(this.date.month)<10? month = `0${this.date.month}`:month=this.date.month
      Number(this.date.day)<10? day = `0${this.date.day}`:day=this.date.day
      const date = `${this.date.year}${month}${day}`
      this.$http.put(process.env.API_HOST+'student-clock',{
        appType:1,
        id:this.studentId,
        operatorName:this.operatorName,
        operatorId:this.userId,
        status:this.clockStatus,
        clockDate:date
      }).then(function (res) {
        if(res){
          if(res.data.code==='000000'){
            Toast.success('更改成功')
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*查询学生列表*/
    getRoomDetailsList(){
      this.$http.get(process.env.API_HOST+`dormitory/${this.roomDetails.dormitoryId}/detail/app`,{
       params:{
         userId:this.userId
       }
      }).then(function (res) {
        if(res){
          this.roomDetailsList = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    checkBegin:function(){
      const nowClockStartTime = units.getCurrentTime('hour').substring(0,5)
      if(nowClockStartTime>this.checkClockStartTime){
        this.beginOrEnd = false
        this.detailsState = true
        Toast.success('开始查寝')
      }else{
        this.beginCheck = true
      }
    },
    checkEnd: function () {
      /* 结束查寝 */
      this.endCheck = true
    },
    checkCancel: function () {
      this.endCheck = false
    },
    checkAffirm: function () {
      this.endCheck = false
      this.$http.post(process.env.API_HOST+'dormitory-check',{
        "dormitoryId":this.roomDetails.dormitoryId,
        "operatorId": this.userId,
        "operatorName": this.operatorName
      }).then(function (res) {
        if(res){
          if(res.data.code==='000000'){
            Toast.success('成功')
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  .room-details-header-container{
    padding: 0 30px;
    overflow: hidden;
  }
.room-details-header{
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
  .scale-1px:after{
    background: rgba(236,236,236,1)
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
    width:170px;
    height:54px;
    border-radius:8px;
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
  .al-check-style{
    background:rgba(149,149,149,1);
    box-shadow:10px 0px 18px rgba(149,149,149,1);
  }
  .not-check-style{
    background:rgba(211,37,37,1);
    box-shadow:10px 0px 18px rgba(211,37,37,0.27);
  }
  .room-details-body{
    padding: 0 30px;
    /*height: 770px;*/
    overflow-y: auto;
    flex: 1;
  }
  .room-details-container{
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;
  }
  .room-details-item{
    width:326px;
    height:384px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    box-shadow:0 9px 13px 0 rgba(181,181,181,0.31);
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
    display: flex;
    justify-content: center;
    flex-flow:wrap column;
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
    margin:20px auto;
  }
  .room-details-check>.background-sucess {
    margin-top: 52px;
  }
  .room-details-item-img{
    text-align: center;
    margin-top: 64px;
  }
  .room-details-item-img-container{
    height: 93px;
    width: 93px;
    border-radius: 93px;
    margin: auto;
  }
  .room-details-item-img img{
    height: 93px;
    width: 93px;
    border-radius: 93px;
  }
  .room-details-item-information{
    display: flex;
    justify-content: center;
    margin-bottom: 14px;
  }
  .room-details-item-name{
    font-size:40px;
    font-family:PingFang-SC-Bold;
    color:rgba(85,85,85,1);
  }
  .room-details-item-state{
    padding: 0 4px;
    height:28px;
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    line-height: 28px;
    border-radius: 8px;
    margin-top: 24px;
    text-align: center;
  }
  .room-details-study-number{
    font-size:24px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    text-align: center;
    margin-bottom: 26px;
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
