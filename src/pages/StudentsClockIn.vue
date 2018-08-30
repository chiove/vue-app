<template>
  <div class="body-container">
    <div class="sign-time" :style="{backgroundImage:`url(${backGroundImg})`,backgroundSize:'15rem 6rem'}">
      <div class="sign-time-text">{{clockStartTime}}-{{clockEndTime}}</div>
      <div class="sign-time-remark">
        <div>请在归寝时间范围内打卡哟！</div>
        <div>超过归寝时间请联系宿舍管理员修改状态</div>
      </div>
    </div>
    <div class="sign-content">
      <div class="sign-in" :style="{boxShadow:state.boxShadow,backgroundColor:state.backgroundColor}" @click="studentClockFun">
        <div class="sign-in-text">{{state.text}}</div>
        <div class="sign-in-time">{{sign.timeNow}}</div>
      </div>
      <div class="sign-location">
        <img class="sign-img" :src="positionImg"/>
        <span class="sign-location-text">{{positionText}}：{{city}}{{district}}{{street}}{{streetnum}}</span>
        <span class="sign-location-btn" @click="rePositionFun">重新定位</span>
      </div>
    </div>
    <div class="sign-user-container">
      <div class="sign-user">
        <div class="sign-user-name">
          <img class="sign-user-img" :src="profilePhoto">
          <div class="sign-user-content">
            <div class="sign-user-names">
              {{studentName}}
            </div>
            <div class="sign-user-times">
              累计打卡：{{totalClock}}次
            </div>
          </div>
        </div>
        <div class="sign-status" :style="{backgroundColor:backgroundColorText}">
          {{checkDataText}}
        </div>
      </div>
    </div>
     <sign-tab></sign-tab>
  </div>
</template>

<script>
import signTab from '../components/signTab'
import units from '../units/tools'
import jsAndroid from '../units/jsAndroid'
import { Toast } from 'vant';
import Vue from 'vue'
Vue.use(Toast)
export default {
  components: {signTab,Toast},
  name: 'students-clock-in',
  mounted: function () {
    const _this = this
    /*获取id*/
     if(this.$route.query.userid){
       this.studentId = this.$route.query.userid
     }
    this.studentId = localStorage.setItem('studentClockUserId',this.$route.query.userid)
    this.rePositionFun()/*定位*/
    this.getSystemConfig()/*获取系统配置*/
    /*获取deviceId*/
    jsAndroid.device.getIdfv().then(function (data) {
      _this.deviceId = data
    })
    if (this.deviceId!==this.checkDevice) {
      this.$router.push({
        path:'/notClockIn'
      })
    }
    this.getStudentClockStatus(this.studentId)/*获取学生当前考勤状态*/
    this.getStudentDetailsListData(this.studentId)/*获取学生信息*/
    this.getStudentsClocktimes(this.studentId)/*获取总打卡次数*/
    this.changeStatus()
    this.changeStyle()
    setInterval(function () { /*本地时间*/
      _this.sign.timeNow = units.getCurrentTime("hour")
    },1000)
  },
  activated:function(){
    const _this = this
    this.getSystemConfig()/*获取系统配置*/
    /*获取deviceId*/
    jsAndroid.device.getIdfv().then(function (data) {
      _this.deviceId = data
    })
    if (this.deviceId!==this.checkDevice) {
      this.$router.push({
        path:'/notClockIn'
      })
    }
  },
  watch:{
    clockStatus:function (val) {
      this.changeStyle(val)
    }
  },
  data () {
    return {
        backGroundImg: require('../assets/primary.png'),
        sign:{
          timeNow:""
        },
        state:{
          boxShadow:'',
          backgroundColor:'',
          text:''
        },
        checkDataText:'',
        backgroundColorText:'',
        checkDevice:'',/*检查设备*/
        studentId:'',/*学生ID*/
        clockStartTime:'',/*开始打卡时间*/
        clockEndTime:'',/*结束打卡时间*/
        clockAddressSettingList:[],/*系统设定的打卡地址参数*/
        profilePhoto:'',/*头像*/
        studentName:'',/*学生姓名*/
        clockStatus:'',/*学生当前考勤状态 0时间未到禁止打卡，1未打卡，2到勤，3晚归，4未归*/
        totalClock:0,/*打卡次数*/
        clockStateCode:''/* 考勤状态*/,
        latitude: "",
        longitude: "",
        city: "",
        district: "",
        street: "",
        streetnum: "",
        positionText:'',/*提示是否成功*/
        positionImg:require('../assets/position-no.png'),
        ClockPositionState:false,/*是否在打卡范围内*/
    }
  },
  methods: {
    /*获取系统配置*/
    getSystemConfig:function () {
      this.$http.get('/api/system-config').then(function (res) {
        if(res){
          const data = res.data.data
          this.clockStartTime =  data.clockStartTime.substring(0,5)
          this.clockEndTime =  data.clockEndTime.substring(0,5)
          this.checkDevice = data.checkDevice
          this.clockAddressSettingList = data.clockAddressSettingList
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取学生信息*/
    getStudentDetailsListData:function (studentId) {
      this.$http.get(`/api/student/${studentId}`).then(function (res) {
        if(res){
          this.profilePhoto = res.data.data.profilePhoto
          this.studentName = res.data.data.studentName
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取打卡次数*/
    getStudentsClocktimes:function (studentId) {
      this.$http.get(`/api/student-clock/${studentId}/stat/`).then(function (res) {
        if(res){
          this.totalClock = res.data.data.totalClock
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /*获取学生当前考勤状态*/
    getStudentClockStatus:function (studentId) {
      this.$http.get('/api/student-clock-status',{
        params:{
          studentId:studentId
        }
      }).then(function (res) {
        if(res){
          this.clockStatus = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    changeStyle(val){
      /*状态改变*/
      if(val===0){
        this.backGroundImg = require('../assets/primary.png')
        this.state.boxShadow = '0px 4px 16px 0px rgba(225,225,225,0.57)'
        this.state.backgroundColor = '#CBCBCB'
        this.state.text = '打卡时间未到'
        this.checkDataText = '未打卡'
        this.backgroundColorText = '#CBCBCB'
      }else if (val===1) {
        this.backGroundImg = require('../assets/primary.png')
        this.state.boxShadow = '4px 0 16px rgba(61,168,245,0.57)'
        this.state.backgroundColor = '#3DA8F5'
        this.state.text = '签到打卡'
        this.checkDataText = '未打卡'
        this.backgroundColorText = '#CBCBCB'
      } else if (val===2) {
        this.backGroundImg = require('../assets/success.png')
        this.state.boxShadow = '0px 4px 16px 0px rgba(64,197,130,0.57)'
        this.state.backgroundColor = 'rgba(67,209,136,1)'
        this.state.text = '打卡成功'
        this.checkDataText = '到勤'
        this.backgroundColorText = 'rgba(67,209,136,1)'
      } else if (val===3) {
        this.backGroundImg = require('../assets/warning.png')
        this.state.boxShadow = '0px 4px 16px 0px rgba(252,154,22,0.57)'
        this.state.backgroundColor = 'rgba(244,160,45,1)'
        this.state.text = '晚归'
        this.checkDataText = '晚归'
        this.backgroundColorText = 'rgba(244,160,45,1)'
      } else if(val===4){
        this.backGroundImg = require('../assets/danger.png')
        this.state.boxShadow = '0px 4px 16px 0px rgba(255,65,65,0.57)'
        this.state.backgroundColor = 'rgba(253,85,63,1)'
        this.state.text = '未归'
        this.checkDataText = '未归'
        this.backgroundColorText = 'rgba(253,85,63,1)'
      }
    },
    changeStatus(){
      if(this.clockStatus===1){
        const nowClockStartTime = units.getCurrentTime('hour').substring(0,5)
        if(nowClockStartTime<this.clockStartTime){
          this.clockStatus = 0
        }else if(this.clockStartTime<=nowClockStartTime&&nowClockStartTime<=this.clockEndTime){
          this.clockStatus = 1
        }else if(nowClockStartTime>this.clockEndTime){
          this.clockStatus = 4
        }
      }
    },
    studentClockFun:function () {
      const _this = this
      if(this.clockStatus === 1 ){
        if(this.ClockPositionState){
          this.$http.post('/api/student-clock',{
            "deviceId": this.deviceId,
            "posLatitude": this.posLatitude,
            "posLongitude": this.posLongitude,
            "studentId": this.studentId
          }).then(function (res) {
            if(res){
              if(res.data.data.code === "000000"){
                this.state = 2
              }
            }
          }).catch(function (error) {
            console.log(error)
          })
        }else{
          Toast.fail('定位失败');
        }
      }else{
        return false
      }
    },
    /*定位*/
    rePositionFun(){
      const _this = this
      jsAndroid.position.locationService().then(function (data) {
          _this.latitude = data.latitude
          _this.longitude =data.longitude
          _this.city = data.city
          _this.district = data.district
          _this.street = data.street
          _this.streetnum = data.streetnum
      })
      this.clockAddressSettingList.forEach(function (item,index) {
        const positionObject = units.getPosition(Number(item.lon),Number(item.lat),Number(item.radius))
        const maxlongitude= positionObject.maxlongitude
        const minlongitude= positionObject.minlongitude
        const maxlatitude= positionObject.maxlatitude
        const minlatitude= positionObject.minlatitude
        if(minlatitude<=_this.posLatitude<=maxlatitude&&minlongitude<=_this.posLongitude<=maxlongitude){
            _this.positionText = '已进入签到范围'
            _this.positionImg = require('../assets/position-yes.png')
            _this.ClockPositionState = true
            Toast.success('定位成功');
        }else{
          _this.positionText = '未进入签到范围'
          _this.positionImg = require('../assets/position-no.png')
          _this.ClockPositionState = false
          Toast.fail('定位失败');
        }
      })
    }
  }
}
</script>

<style scoped>
  .sign-time{
    height: 435px;
    text-align: center;
    color: rgba(255,255,255,.8);
    overflow:hidden;
  }
  .sign-time-text{
    font-family:PingFang-SC-Medium;
    font-size: 60px;
    margin-top: 120px;
  }
  .sign-time-remark{
    font-size: 24px;
    margin-top: 10px;
    letter-spacing: 2px;
    color: rgba(255,255,255,.5);
  }
  .sign-content{
    /*height: 676px;*/
    background-color: #f7f7f7;
    position: relative;
    flex: 1;
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
  .sign-user-container{
    padding: 0 30px;
    position: absolute;
    top: 350px;
    z-index: 99;
    width: calc(100% - 60px);
  }
  .sign-user{
    height:178px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    box-shadow:6px 0 27px rgba(61,168,245,0.14);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sign-user-name{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 17px;
  }
  .sign-user-img{
    height: 118px;
    width: 118px;
  }
  .sign-user-content{
    margin-left: 22px;
  }
  .sign-user-names{
    font-size:32px;
    font-family:PingFang-SC-Medium;
    color:rgba(51,51,51,1);
  }
  .sign-user-times{
    font-size:26px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
  }
  .sign-status{
    padding: 0 12px;
    height:44px;
    border-radius:8px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    box-shadow:18px 0 29px rgba(170,170,170,0.24);
    line-height: 44px;
    margin-right: 30px;
  }
</style>
