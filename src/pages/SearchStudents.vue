<template>
  <div class="body-container">
    <div class="search-bar-container">
      <div class="search-input-container">
        <img class="search-icon" src="../assets/search.png">
        <input class="search-input" type="text" placeholder="搜索学号/姓名" ref="nameNumber">
        <img class="search-clean" src=../assets/clean.png  @click="cleanFun">
      </div>
      <div class="search-submit" @click="searchFun">搜索</div>
    </div>
    <div class="search-result-container">
      <div class="search-result-list" v-if="resultView" @click="getParams">
        <div class="result-item" v-for="(item,index) in searchData" :data-index="item.id">
          <div class="result-name">{{item.name}}</div>
          <div class="result-number">学号：{{item.number}}</div>
        </div>
      </div>
    </div>
    <teacher-check-tab></teacher-check-tab>
  </div>
</template>

<script>
import teacherCheckTab from '../components/TeacherCheckTab'
export default {
  components: {teacherCheckTab},
  name: 'search-students',
  created: function () {

  },
  data () {
    return {
      searchParam: '',
      resultView: false,
      searchData: [
        {
          id: '1',
          name: '梁朝伟',
          number: '21213213'
        },
        {
          id: '1',
          name: '刘德华',
          number: '21213213'
        }
      ]
    }
  },
  methods: {
    cleanFun: function () {
      this.$refs.nameNumber.value = ''
      this.resultView = false
    },
    searchFun: function () {
      this.searchParam = this.$refs.nameNumber.value
      this.resultView = true
      console.log('查询参数:', this.searchParam)
    },
    getParams: function (e) {
      if (e.target.dataset.index === undefined) {
        return false
      } else {
        console.log('详情参数', e.target.dataset.index)
      }
    }
  }
}
</script>

<style scoped>
  .search-bar-container{
    width:100%;
    height:132px;
    background:rgba(255,255,255,1);
    border-bottom: 1px solid #f7f7f7;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  .search-input-container{
    width:600px;
    height:80px;
    margin-top: 32px;
    margin-left: 30px;
    background:rgba(247,247,247,1);
    border-radius:8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-icon{
    width: 25px;
    height: 25px;
    margin-left: 16px;
  }
  .search-input{
    width: 510px;
    height: 80px;
    border: none;
    padding-left: 14px;
    margin-right: 14px;
    background:rgba(247,247,247,1);
  }
  .search-clean{
    height: 32px;
    width: 32px;
    margin-right: 14px;
  }
  .search-submit{
    margin-top: 32px;
    margin-right: 39px;
    font-size:32px;
    font-family:PingFang-SC-Medium;
    color:rgba(61,168,245,1);
    height:80px;
    line-height: 80px;
  }
  .search-result-container{
    height: 880px;
    overflow-y: auto;
  }
  .search-result-list{
    background-color: #fff;
    padding-bottom: 81px;
  }
  .result-item{
    width: 690px;
    margin: 0 auto;
    padding: 44px 0;
    border-bottom: 1px solid #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .result-name{
    font-size:32px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
  }
  .result-number{
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
  }
</style>
