<template>
  <div class="body-container">
    <data-banner></data-banner>
    <history-select></history-select>
    <div class="history-details-container">
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
      <history-list></history-list>
    </div>
    <submit-btn></submit-btn>
  </div>
</template>

<script>
import submitBtn from "../components/submitBtn"
import dataBanner from "../components/dataBanner"
import historySelect from "../components/historySelect"
import historyList from "../components/StudentHistoryList"
export default {
  components: {submitBtn,dataBanner,historySelect,historyList},
  name: "teacher-submit",
  data:function () {
    return {
      pageName:""
    }
  }
}
</script>

<style scoped>
  .history-details-container{
    height: 528px;
    overflow-y: auto;
  }
</style>
