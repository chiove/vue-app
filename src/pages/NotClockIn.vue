<template>
 <div class="body-container">
   <img src="../assets/notClockIn.png">
   <div class="not-clock-in">今日无需打卡哟！</div>
 </div>
</template>

<script>
    export default {
        name: "not-clock-in"
    }
</script>

<style scoped>
.body-container img{
  width: 403px;
  height: 310px;
  display: block;
  margin: 247px auto 48px auto;
}
.not-clock-in{
  font-size:30px;
  font-family:PingFang-SC-Medium;
  color:rgba(85,85,85,1);
  text-align: center;
}
</style>
