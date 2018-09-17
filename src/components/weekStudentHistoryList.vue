
<template>
  <div class="history-list" @click="viewDetailsFun">
    <div class="history-icon" :class="classState"></div>
    <div class="history-text">{{data.clockDate}}</div>
    <div class="history-state" :class="colorState">{{textState}}</div>
    <img class="history-details-img" src="../assets/iconRight.png" >
  </div>
</template>

<script>
  export default {
    name: "weekStudentHistoryList",
    props:['data','studentId'],
    mounted:function () {
      if(this.data.clockStatus==2){
        this.classState = 'icon-success'
        this.colorState = 'color-success'
        this.textState = '到勤'
      }else if(this.data.clockStatus==3){
        this.classState = 'icon-warning'
        this.colorState = 'color-warning'
        this.textState = '晚归'
      }else if(this.data.clockStatus==4){
        this.classState = 'icon-danger'
        this.colorState = 'color-danger'
        this.textState = '未归'
      }else{
        this.classState = 'icon-default'
        this.colorState = 'color-default'
        this.textState = '未打卡'
      }
    },
    activated:function(){
      if(this.data.clockStatus==2){
        this.classState = 'icon-success'
        this.colorState = 'color-success'
        this.textState = '到勤'
      }else if(this.data.clockStatus==3){
        this.classState = 'icon-warning'
        this.colorState = 'color-warning'
        this.textState = '晚归'
      }else if(this.data.clockStatus==4){
        this.classState = 'icon-danger'
        this.colorState = 'color-danger'
        this.textState = '未归'
      }else{
        this.classState = 'icon-default'
        this.colorState = 'color-default'
        this.textState = '未打卡'
      }
    },
    data(){
      return {
        classState:'',
        textState:'',
        colorState:''
      }
    },
    methods:{
      viewDetailsFun(){
        this.$router.push({
          name:'ClockInDetails',
          params:{
            data:this.data,
            studentId:this.studentId
          }
        })
      }
    }
  }
</script>

<style scoped>
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
