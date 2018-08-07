<template>
  <div class="body-container">
    <img src="../assets/unitException.png">
    <div class="unit-exception">系统检测到您未使用常用设备登录。</div>
    <div class="unit-exception">若要正常登录打卡，请更换原设备。</div>
  </div>
</template>

<script>
  export default {
    name: "unit-exception"
  }
</script>

<style scoped>
  .body-container img{
    width: 403px;
    height: 310px;
    display: block;
    margin: 247px auto 48px auto;
  }
  .unit-exception{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    text-align: center;
  }
</style>
