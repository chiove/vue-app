<template>
  <div class="body-container">
    <div class="sign-time" :style="{'background':`url(${backGroundImg})`,backgroundSize:'15rem 6rem'}">
      <div class="sign-time-text">{{dateValue}}</div>
      <div class="history-memory-btn" @click="historyList">
        历史记录
      </div>
    </div>
    <div class="sign-content">
      <div class="sign-in" :style="{boxShadow:state.boxShadow,backgroundColor:state.backgroundColor}" @click="teacherClockFun">
        <div class="sign-in-text">{{state.text}}</div>
        <div class="sign-in-time">{{sign.timeNow}}</div>
      </div>
    </div>
    <div class="sign-user-container">
      <div class="sign-user">
        <div class="sign-user-name">
          <img class="sign-user-img" :src="profilePhoto">
          <div class="sign-user-content">
            <div class="sign-user-names">
              {{name}}
            </div>
            <div class="sign-user-times">
              累计打卡：{{totalClockCount}}次
            </div>
          </div>
        </div>
        <div class="sign-status" :style="{backgroundColor:backgroundColorText}">
          {{checkDataText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import units from '../units/tools'
  import jsAndroid from '../units/jsAndroid'
  const fullDate = units.getCurrentTime("year")
  export default {
    name: "teacher-clock-in",
    mounted:function(){
      if(this.$route.query.userid){
        this.instructorId = this.$route.query.userid
      }
      this.getTeacherCheckStatus()/*根据辅导员ID查询当前考勤状态*/
      this.getSystemConfig()/*获取系统配置*/
      this.getTeacherClockTimes()/*根据辅导员ID统计总打卡次数*/
      this.getTeacherInfo()/*根据用户ID查询基本信息*/
      this.changeTeacherStatus()
      this.changeTeacherStyle()
      const _this = this;
      /*本地时间*/
      setInterval(function () {
        _this.sign.timeNow = units.getCurrentTime("hour");
      },1000)
    },
    watch:{
      clockTeacherStatus:function (val) {
        this.changeTeacherStyle(val)
      }
    },
    data(){
      return {
        backGroundImg:require("../assets/primary.png"),
        dateValue:`${fullDate.year}年${fullDate.month}月`,
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
        instructorId:100725,
        clockTeacherStatus:'',/*考勤状态*/
        clockStateCode:'',
        totalClockCount:0,
        name:'',
        profilePhoto:'',
        isRequested:false
      }
    },
    methods:{
      /*辅导员打卡调原生应用相机*/
      teacherClockFun:function () {
        const _this = this
        if(this.clockTeacherStatus === 1){
          jsAndroid.barcode.scan().then(function (data) {
              _this.$http.post('/api/instructor-clock',{
                qrCode:data,
                instructorId:_this.instructorId
                }).then(function (res) {
                  if(res.data.code==='000000'){
                    _this.clockTeacherStatus = 2
                  }
              }).catch(function (error) {
                console.log(error)
              })
          })
        }else{
          return false
        }
      },
      /*根据辅导员ID统计总打卡次数*/
      getTeacherClockTimes(){
        this.$http.get('/api/instructor-clock/stat-all-count',{
          params:{
            instructorId:this.instructorId
          }
        }).then(function (res) {
          if(res){
            this.totalClockCount = res.data.data.totalClockCount
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*根据辅导员ID查询基本信息*/
      getTeacherInfo(){
        this.$http.get(`/api/select-data/user/${this.instructorId}`).then(function (res) {
          if(res){
            this.name = res.data.data.name
            this.profilePhoto = res.data.data.profilePhoto
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*获取系统配置*/
      getSystemConfig:function () {
        this.$http.get('/api/system-config').then(function (res) {
          if(res){
            const data = res.data.data
            this.checkClockStartTime =  data.checkClockStartTime.substring(0,5)
            this.checkClockEndTime =  data.checkClockEndTime.substring(0,5)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },/*根据辅导员ID查询当前考勤状态*/
      getTeacherCheckStatus(){
        this.$http.get('/api/instructor-clock-status',{
          params:{
            instructorId:this.instructorId
          }
        }).then(function (res) {
          if(res){
            this.clockTeacherStatus = res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*状态样式*/
      changeTeacherStyle(val){
        if (val===0) {
          this.state.boxShadow = '0px 4px 16px 0px rgba(225,225,225,0.57)'
          this.state.backgroundColor = '#CBCBCB'
          this.state.text = '打卡时间未到'
          this.backGroundImg = require("../assets/primary.png")
          this.checkDataText = '未打卡'
          this.backgroundColorText = '#CBCBCB'
        }else if (val===1) {
          this.state.boxShadow = '4px 0 16px rgba(61,168,245,0.57)'
          this.state.backgroundColor = '#3DA8F5'
          this.state.text = '查寝签到'
          this.backGroundImg = require("../assets/primary.png")
          this.checkDataText = '未打卡'
          this.backgroundColorText = '#CBCBCB'
        }else if (val===2) {
          this.state.boxShadow = '0px 4px 16px 0px rgba(64,197,130,0.57)'
          this.state.backgroundColor = 'rgba(67,209,136,1)'
          this.state.text = '打卡成功'
          this.backGroundImg =require("../assets/success.png")
          this.checkDataText = '已打卡'
          this.backgroundColorText = 'rgba(67,209,136,1)'
        }else if(val===4){
          this.state.boxShadow = '0px 4px 16px 0px rgba(225,225,225,0.57)'
          this.state.backgroundColor = '#CBCBCB'
          this.state.text = '已过查寝时间'
          this.backGroundImg = require("../assets/primary.png")
          this.checkDataText = '未打卡'
          this.backgroundColorText = '#CBCBCB'
        }
      },
      /*初始化状态*/
      changeTeacherStatus(){
        if(this.clockTeacherStatus===1){
          const nowClockStartTime = units.getCurrentTime('hour').substring(0,5)
          if(nowClockStartTime<this.checkClockStartTime){
            this.clockTeacherStatus = 0
          }else if(this.checkClockStartTime<=nowClockStartTime&&nowClockStartTime<=this.checkClockEndTime){
            this.clockTeacherStatus = 1
          }else if(nowClockStartTime>this.checkClockEndTime){
            this.clockTeacherStatus = 4
          }
        }
      },
      /*进入历史记录页面*/
      historyList:function () {
        this.$router.push({
          name:"TeacherHistoryMemory",
          params: {
            instructorId: this.instructorId,
            year:fullDate.year,
            month:fullDate.month
          }
        })
      },
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
    background:rgba(203,203,203,1);
    border-radius:8px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
    box-shadow:18px 0 29px rgba(170,170,170,0.24);
    line-height: 44px;
    margin-right: 30px;
  }
</style>
