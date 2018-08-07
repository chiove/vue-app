<template>
    <div class="history-list">
      <div class="history-icon icon-danger"></div>
      <div class="history-text">2018年7月19日 20:23:12</div>
      <div class="history-state color-danger">未归</div>
      <img class="history-details-img" src="../assets/iconRight.png" >
    </div>
</template>

<script>
export default {
    name: "student-history-list"
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
  margin-left: 36px;
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
  margin-right: 10px;
}
</style>
