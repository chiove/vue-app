<template>
  <div class="sign-user-container">
    <div class="sign-user">
      <div class="sign-user-name">
        <img class="sign-user-img" :src="data.profilePhoto">
        <div class="sign-user-content">
          <div class="sign-user-names">
            {{data.name}}
          </div>
          <div class="sign-user-times">
            累计打卡：{{data.totalClockCount}}次
          </div>
        </div>
      </div>
      <div class="sign-status" :style="{backgroundColor:backgroundColorText}">
        {{checkDataText}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'teacher-information',
    props:['data'],
    watch:{
      'data.isRequested':function(val){
        if(this.data.clockStatus===1){
          this.checkDataText = '未打卡'
          this.backgroundColorText = '#CBCBCB'
        }else if (this.data.clockStatus===2) {
          this.checkDataText = '已打卡'
          this.backgroundColorText = 'rgba(67,209,136,1)'
        }else{
          this.checkDataText = '未打卡'
          this.backgroundColorText = '#CBCBCB'
        }
      }
    },
    data(){
      return {
        checkDataText:'',
        backgroundColorText:''
      }
    }
  }
</script>

<style scoped>
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
