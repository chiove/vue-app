<template>
  <div class="body-container background-primary">
    <div class="data-banner">
      <div class="data-information">
        <div class="data-left">
            <div class="sign-user-img-container">
              <img class="sign-user-img" :src="profilePhoto">
            </div>
          <div>
            <div class="data-name">
              <span class="data-name-text">{{studentName}}</span>
              <span class="data-information-text">{{classNames}}</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-school" src="../assets/school.png">
              <span>{{collegeName}}</span>
            </div>
            <div class="data-information-text align-middle">
              <img class="data-professional" src="../assets/professional.png">
              <span>{{majorName}}</span>
            </div>
            <div class="data-information-text">
              <span class="data-information-teacher">辅导员:{{instructorName}}</span>
              <span>学号:{{studentCode}}</span>
            </div>
          </div>
        </div>
        <div class="data-right">
          {{bedCode}}
        </div>
      </div>
    </div>
    <div class="data-form">
      <div class="data-form-item" @click="checkFun">
        <div>考勤状态</div>
        <div class="color-sucess">
          <span>{{clockStatusText}}</span>
          <img class="data-form-select" src="../assets/selectRight.png" alt="">
        </div>
      </div>
      <div class="data-form-line"></div>
      <div class="data-form-item">
        <div>今日门禁数据</div>
        <img class="data-form-select" src="../assets/selectRight.png" alt="">
      </div>
      <div class="data-form-line"></div>
      <div class="data-form-item" @click="todyHistoryDetailsFun">
        <div>今日打卡轨迹</div>
        <img class="data-form-select" src="../assets/selectRight.png" alt="">
      </div>
      <div class="data-form-line"></div>
      <div class="data-form-item-remark">备注</div>
      <div class="data-form-remark">
        <textarea ref="remarkDom" placeholder="请输入"  @input="valueChangeFun"></textarea>
        <div class="data-form-tips">{{textNumber}}/30</div>
      </div>
    </div>
    <div class="data-form-submit-container">
      <div class="data-form-submit" @click="submitRemarkFun">提交</div>
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
  import { Popup,Picker ,Toast } from 'vant'
  import Vue from 'vue'
  Vue.use(Popup)
  Vue.use(Picker)
  Vue.use(Toast)
  export default {
    components:{Popup,Picker},
    name: "personal-information",
    mounted(){
      this.studentId = this.$route.query.studentId
      this.userId = this.$route.query.userId
      this.clockStatus = this.$route.query.clockStatus
      if(this.clockStatus==1){
        this.clockStatusText = '未打卡'
      }else if(this.clockStatus==2){
        this.clockStatusText = '到勤'
      }else if(this.clockStatus==3){
        this.clockStatusText = '晚归'
      }else if(this.clockStatus==4){
        this.clockStatusText = '未归'
      }
      this.getStudentsInfo(this.studentId)/*获取学生信息*/
      this.getUserInfo()/*获取用户信息*/
    },
    activated(){
      this.studentId = this.$route.query.studentId
      this.userId = this.$route.query.userId
      this.clockStatus = this.$route.query.clockStatus
      if(this.clockStatus==1){
        this.clockStatusText = '未打卡'
      }else if(this.clockStatus==2){
        this.clockStatusText = '到勤'
      }else if(this.clockStatus==3){
        this.clockStatusText = '晚归'
      }else if(this.clockStatus==4){
        this.clockStatusText = '未归'
      }
      this.getStudentsInfo(this.studentId)/*获取学生信息*/
      this.$refs.remarkDom.value = ''
    },
    data(){
      return {
        show:false,
        userId:'',/*用户ID*/
        studentId:'',/*学生ID*/
        userName:'',/*用户名字*/
        clockStatusText:'未打卡',/*状态显示*/
        clockStatus:1,/*考勤状态*/
        columns:['到勤','晚归','未归'],
        profilePhoto:'',/*头像地址*/
        studentName:'',/*学生姓名*/
        classNames:'',/*班级*/
        collegeName:'',/*学院名称*/
        majorName:'',/*专业名称*/
        instructorName:'',/*辅导专员*/
        studentCode:'',/*学号*/
        dormitoryName:'',/*专业*/
        bedCode:'',/*床号*/
        date:{
          year:new Date().getFullYear(),
          month:new Date().getMonth()+1,
          day:new Date().getDate()
        },
        textNumber:0/*文本框字数*/
      }
    },
    methods:{
      /*获取学生信息*/
      getStudentsInfo(studentId){
        this.$http.get(process.env.API_HOST+`student/${studentId}`).then(function (res) {
          if(res){
            const data = res.data.data
            this.profilePhoto = data.profilePhoto
            this.collegeName = data.collegeName
            this.studentName = data.studentName
            this.classNames = data.className
            this.majorName = data.majorName
            this.instructorName = data.instructorName
            this.studentCode = data.studentCode
            this.dormitoryName = data.dormitoryName
            this.bedCode = data.bedCode
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      checkFun:function () {
        this.show = true
      },
      confirm:function (data) {
        console.log(data)
        this.clockStatusText = data
        if(data === '到勤'){
          this.clockStatus = 2
        }else if(data === '晚归'){
          this.clockStatus = 3
        }else if(data === '未归'){
          this.clockStatus = 4
        }
        this.show = false
      },
      /*今日所有打卡记录*/
      todyHistoryDetailsFun(){
        this.$router.push({
          name:'ClockInDetails',
          params:{
            data:this.date,
            studentId:this.studentId
          }
        })
      },
      /*查询用户信息*/
      getUserInfo(){
        this.$http.get(process.env.API_HOST+`select-data/user/${this.userId}`).then(function (res) {
          if(res){
            this.userName = res.data.data.name
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      /*提交备注*/
      submitRemarkFun(){
        const date = `${this.date.year}${this.date.month}${this.date.day}`
        if(this.$refs.remarkDom.value.length<=30){
          this.$http.put(process.env.API_HOST+'student-clock',{
            appType:1,
            id:this.studentId,
            operatorName:this.userName,
            operatorId:this.userId,
            remark:this.$refs.remarkDom.value,
            status:this.clockStatus,
            clockDate:date
          }).then(function (res) {
            if(res){
              if(res.data.code==='000000'){
                Toast.success('提交成功')
              }
            }
          }).catch(function (error) {
            console.log(error)
          })
        }else{
          Toast.fail('备注在30字内')
        }
      },
      cancel:function () {
        this.show = false
      },
      valueChangeFun(){
        this.textNumber = this.$refs.remarkDom.value.length
      }
    }
  }
</script>

<style scoped>
  .data-banner{
    height: 300px;
    background: url("../assets/dataBanner.png")  no-repeat;
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
  .sign-user-img-container{
    margin-right: 27px;
    height: 114px;
    width: 114px;
    border-radius: 114px;
  }
  .sign-user-img{
    height: 114px;
    width: 114px;
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
    /*height:910px;*/
    background:rgba(255,255,255,1);
    border-radius:30px 30px 0 0;
    padding: 0 32px;
    overflow-y: auto;
    flex: 1;
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
  .data-form-item-remark{
    height: 116px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(51,51,51,1);
    line-height:100px;
  }
  .data-form-line {
    height:2px;
    background:rgba(236,236,236,1);
    margin: auto;
  }
  .data-form-remark{
    height:228px;
    border-radius:8px;
    position: relative;
  }
  .data-form-remark textarea{
    height: 100%;
    width: 100%;
    background:rgba(238,238,238,.45);
    border: none;
  }
  .data-form-tips{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
    padding: 0 30px;
    position: absolute;
    bottom: 21px;
    right: 11px;
  }
  .data-form-submit-container{
    padding: 0 32px;
    background: #fff;
  }
  .data-form-submit{
    height:94px;
    background:rgba(61,168,245,1);
    border-radius:8px;
    text-align: center;
    margin-bottom: 30px;
    line-height: 94px;
    font-size:36px;
    font-family:PingFang-SC-Medium;
    color:rgba(255,255,255,1);
  }
</style>
