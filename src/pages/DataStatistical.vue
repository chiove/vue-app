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
    <sign-tab :pageName="pageName"></sign-tab>
  </div>
</template>

<script>
import signTab from "../components/signTab"
import dataBanner from "../components/dataBanner"
import historySelect from "../components/historySelect"
import historyList from "../components/StudentHistoryList"
export default {
  components: {signTab,dataBanner,historySelect,historyList},
  name: "statistical-data",
  created:function () {

  },
  data() {
    return {
      pageName:"StatisticalData"
    }
  }
}
</script>

<style scoped>
  .history-details-container{
    height: 546px;
    overflow-y: auto;
  }
</style>
