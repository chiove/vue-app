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
          {{dormitoryName}}室{{bedCode}}床
        </div>
      </div>
    </div>
    <div class="data-form-title">
      第{{weekNumber}}周
    </div>
    <div class="data-form">
      <div v-for="(item,index) in historyListData" v-bind:key="index" :data="item">
        <div class="history-list" @click="viewDetailsFun($event,item)">
          <div class="history-icon" :class="item.classState"></div>
          <div class="history-text">{{item.clockDate}}</div>
          <div class="history-state" :class="item.colorState">{{item.textState}}</div>
          <img class="history-details-img" src="../assets/iconRight.png" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import historyList from "../components/weekStudentHistoryList"
  export default {
    components:{historyList},
    name: "week-personal-information",
    mounted:function(){
      this.weekNumber = localStorage.getItem('weekNumber')
      this.studentId = localStorage.getItem('weekStudentId')
      /*获取学生信息*/
      this.getStudentsInfo()
      /*根据学生ID和日期查询全部历史*/
      this.getHistoryList()
    },
    activated:function(){
      /*接受路由传参*/
      this.weekNumber = localStorage.getItem('weekNumber')
      this.studentId = localStorage.getItem('weekStudentId')
      /*获取学生信息*/
      this.getStudentsInfo()
      /*根据学生ID和日期查询全部历史*/
      this.getHistoryList()
    },
    data(){
      return {
        historyListData:[],
        studentId:'',/*学生ID*/
        weekNumber:1,/*当前周数*/
        profilePhoto:'',/*头像地址*/
        studentName:'',/*学生姓名*/
        classNames:'',/*班级*/
        collegeName:'',/*学院名称*/
        majorName:'',/*专业名称*/
        instructorName:'',/*辅导专员*/
        studentCode:'',/*学号*/
        dormitoryName:'',/*专业*/
        bedCode:'',/*床号*/
        clockStatus:'',
        classState:'',
        textState:'',
        colorState:''
      }
    },
    methods:{
      /*获取学生信息*/
      getStudentsInfo(){
        this.$http.get(process.env.API_HOST+`student/${this.studentId}`).then(function (res) {
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
      /*根据学生ID和日期查询全部历史*/
      getHistoryList(){
          this.$http.get(process.env.API_HOST+'student-clock/list-by-week',{
          params:{
            weekNumber:this.weekNumber,
            studentId:this.studentId
          }
        }).then(function (res) {
          if(res){
            const _this = this
            res.data.data.forEach(function (item,index) {
              if(item.clockStatus==2){
                item.classState = 'icon-success'
                item.colorState = 'color-success'
                item.textState = '到勤'
              }else if(item.clockStatus==3){
                item.classState = 'icon-warning'
                item.colorState = 'color-warning'
                item.textState = '晚归'
              }else if(item.clockStatus==4){
                item.classState = 'icon-danger'
                item.colorState = 'color-danger'
                item.textState = '未归'
              }else{
                item.classState = 'icon-default'
                item.colorState = 'color-default'
                item.textState = '未打卡'
              }
            })
            this.historyListData =res.data.data
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      viewDetailsFun(e,item){
        this.$router.push({
          name:'ClockInDetails',
          params:{
            data:item,
            studentId:this.studentId
          }
        })
      }
    }
  }
</script>

<style scoped>
  .data-banner{
    height: 340px;
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
  .sign-user-img-container{
    margin-right: 27px;
    height: 114px;
    width: 114px;
    border-radius: 114px;
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
  .data-form-title{
    height: 90px;
    background:rgba(207,235,255,1);
    border-radius:30px 30px 0px 0px;
    line-height: 90px;
    font-size:32px;
    font-family:PingFang-SC-Bold;
    color:rgba(61,168,245,1);
    text-align: center;
  }
  .data-form{
    /*height:890px;*/
    flex: 1;
    background:rgba(255,255,255,1);
    padding: 0 32px;
    overflow-y: auto;
  }
  .history-list{
    height: 106px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .history-icon{
    width:14px;
    height:14px;
    border-radius: 14px;
  }
  .history-text{
    color: rgba(85, 85, 85, 1);
    font-size: 28px;
    margin-left: 20px;
    margin-right: 136px;
  }
  .history-state{
    width: 100px;
    font-size:28px;
    font-family:PingFang-SC-Medium;
    margin-right: 80px;
    text-align: center;
    border-radius: 2px;
  }
  .history-details-img{
    width: 15px;
    height: 25px;
  }
</style>
