<template>
    <div class="history-list">
      <div class="history-icon" :class="classState"></div>
      <div class="history-text">{{data.year}}年{{data.month}}月{{data.day}}日 {{data.lastUpdateTime}}</div>
      <div class="history-state" :class="classState">{{textState}}</div>
      <img class="history-details-img" src="../assets/iconRight.png" >
    </div>
</template>

<script>
export default {
  name: "student-history-list",
  props:['data'],
  mounted:function () {
    if(data.clockStatus===2){
      this.classState = 'icon-sucess'
      this.textState = '到勤'
    }else if(data.clockStatus===3){
      this.classState = 'icon-warning'
      this.textState = '晚归'
    }else if(data.clockStatus===4){
      this.classState = 'icon-danger'
      this.textState = '未归'
    }
  },
  data(){
    return {
      classState:'',
      textState:''
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
}
.history-details-img{
  width: 15px;
  height: 25px;
}
</style>
