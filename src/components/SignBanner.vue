<template>
  <div class="sign-time" :style="{backgroundImage:`url(${backGroundImg})`,backgroundSize:'15rem 6rem'}">
    <div class="sign-time-text">{{data.clockStartTime}}-{{data.clockEndTime}}</div>
    <div class="sign-time-remark">
      <div>请在归寝时间范围内打卡哟！</div>
      <div>超过归寝时间请联系宿舍管理员修改状态</div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['data'],
  name: 'sign-banner',
  mounted: function () {

  },
  data () {
    return {
      backGroundImg: require('../assets/primary.png'),
      isRequested:false,
    }
  },
  watch:{
    'data.isRequested':function(val){
      if(this.data.clockStatus===0){
        this.backGroundImg = require('../assets/primary.png')
      }else if (this.data.clockStatus===1) {
        this.backGroundImg = require('../assets/primary.png')
      } else if (this.data.clockStatus===2) {
        this.backGroundImg = require('../assets/success.png')
      } else if (this.data.clockStatus===3) {
        this.backGroundImg = require('../assets/warning.png')
      } else if(this.data.clockStatus===4){
        this.backGroundImg = require('../assets/danger.png')
      }
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
</style>
