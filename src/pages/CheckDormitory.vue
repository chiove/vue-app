<template>
  <div class="body-container">
    <div class="search-bar">
      <div class="search-input" @click="inputContent">
        <div class="search-placeholder">
          <img src="../assets/search.png">
          <span class="search-placeholder-text">搜索学号/姓名</span>
        </div>
      </div>
      <div class="search-select">
        <div class="search-select-item-first" @click="dormitoryFun">
          <span :class="{'color-primary':dormitoryActive}">{{dormitoryTitle}}</span>
          <img :src="dormitoryActive?selectIconActive:selectIcon">
        </div>
        <div class="search-select-item" @click="checkFun">
          <span :class="{'color-primary':checkActive}">{{checkTitle}}</span>
          <img :src="checkActive?selectIconActive:selectIcon">
        </div>
        <div class="search-select-item" @click="sortFun">
          <span :class="{'color-primary':sortActive}">{{sortTitle}}</span>
          <img :src="sortActive?selectIconActive:selectIcon">
        </div>
        <div class="number-select-icon" @click="dormitoryFun">
          <span :class="{'color-primary':dormitoryActive}">{{dormitoryChildTitle}}</span>
          <img :src="dormitoryActive?numberIconActive:numberIcon">
        </div>
      </div>
    </div>
    <div class="search-container">
      <div class="search-select-container" v-if="checkActive" @click="getSearchValue($event,'check')">
        <div class="list-item">全部查寝状态</div>
        <div class="list-item" v-for="(item,index) in checkData" :data-index="item.id">{{item.text}}</div>
      </div>
      <div class="search-select-container" v-if="sortActive" @click="getSearchValue($event,'sort')">
        <div class="list-item">考寝状态</div>
        <div class="list-item" v-for="(item,index) in sortData" :data-index="item.id">{{item.text}}</div>
      </div>
      <div class="search-select-container" v-if="dormitoryActive">
        <dormitory-select></dormitory-select>
      </div>
      <div class="search-result-list">
        <check-room-list></check-room-list>
        <check-room-list></check-room-list>
        <check-room-list></check-room-list>
        <check-room-list></check-room-list>
        <check-room-list></check-room-list>
        <check-room-list></check-room-list>
      </div>
    </div>
    <teacher-check-tab :pageName="pageName"></teacher-check-tab>
  </div>
</template>

<script>
import teacherCheckTab from '../components/TeacherCheckTab'
import dormitorySelect from '../components/DormitorySelect'
import checkRoomList from '../components/CheckRoomList'
import axios from 'axios'
export default {
  components: {teacherCheckTab, dormitorySelect, checkRoomList},
  name: 'check-dormitory',
  data () {
    return {
      inputState: true,
      pageName: 'CheckDormitory',
      selectIcon: require('../assets/selectDown.png'),
      numberIcon: require('../assets/numberSelect.png'),
      selectIconActive: require('../assets/selectDownActive.png'),
      numberIconActive: require('../assets/numberSelectActive.png'),
      dormitoryTitle: '宿舍选择',
      checkTitle: '查寝状态',
      sortTitle: '考寝状态',
      dormitoryChildTitle: '寝室选择',
      dormitoryActive: false,
      sortActive: false,
      checkActive: false,
      params: {},
      userId:100725,
      checkData: [
        {
          id: '1',
          text: '已查寝'
        },
        {
          id: '2',
          text: '未查寝'
        }
      ],
      sortData: [
        {
          id: '1',
          text: '未归人数从高到低'
        },
        {
          id: '2',
          text: '未归人数从低到高'
        },
        {
          id: '3',
          text: '晚归人数从高到低'
        },
        {
          id: '4',
          text: '晚归人数从低到高'
        }
      ]
    }
  },
  methods: {
    inputContent: function () {
      this.$router.push({
        name: 'SearchStudents',
        params:{
          userId:this.userId
        }
      })
    },
    /*查询楼栋*/
    dormitoryFun: function () {
      this.sortActive = false
      this.checkActive = false
      this.dormitoryActive ? this.dormitoryActive = false : this.dormitoryActive = true
      console.log(this.$http.getSystemConfig())
    },
    checkFun: function () {
      this.sortActive = false
      this.dormitoryActive = false
      this.checkActive ? this.checkActive = false : this.checkActive = true
    },
    sortFun: function () {
      this.checkActive = false
      this.dormitoryActive = false
      this.sortActive ? this.sortActive = false : this.sortActive = true
    },
    getSearchValue: function (e, type) {
      if (e.target.dataset.index === undefined) {
        return
      } else {
        if (type === 'check') {
          this.checkTitle = e.target.innerText
        }
        if (type === 'sort') {
          this.sortTitle = e.target.innerText
        }
        this.params[type] = e.target.dataset.index
      }
      this.sortActive = false
      this.checkActive = false
      this.dormitoryActive = false
    }
  }
}
</script>

<style scoped>
  .search-bar{
    height: 211px;
    max-width: 1125px;
    width: 100%;
    background:rgba(255,255,255,1);
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid #f7f7f7;
  }
  .search-input{
    position: relative;
    padding: 0 30px;
    height:80px;
    background:rgba(247,247,247,.07);
    border-radius:8px;
    margin: 32px 0 0 0;
    overflow: hidden;
  }
  .search-form{
    width:690px;
    height:80px;
    border: none;
    background:rgba(247,247,247,1);
    padding-left: 20px;
  }

  .search-placeholder{
    height:80px;
    position: absolute;
    width: calc(100% - 60px);
    top: 0;
    left: 30px;
    line-height: 80px;
    text-align: center;
    background:rgba(247,247,247,1);
  }
  .search-placeholder img{
    height: 25px;
    width: 25px;
    margin-right: 10px;
  }
  .search-placeholder-text{
    font-size:30px;
    font-family:PingFang-SC-Medium;
    color:rgba(153,153,153,1);
  }
  .search-select{
    height: 99px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
  .search-select-item,.number-select-icon{
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    margin-left: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-select-item-first{
    font-size:28px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-select-item span,.number-select-icon span,.search-select-item-first span{
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .search-select-item img,.search-select-item-first img{
    width: 14px;
    height: 9px;
  }
  .number-select-icon img{
    width: 19px;
    height: 22px;
  }
  .search-container{
    height: 901px;
    overflow-y: auto;
    position: relative;
  }
  .search-select-container{
    position: absolute;
    top: 0;
    width: 100%;
    max-width: 1125px;
  }
  .search-result-list{
    padding: 0 30px;
  }
  .list-item{
    padding: 40px 0 40px 40px;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color:rgba(85,85,85,1);
    background-color: #fff;
  }
  .item-active{
    padding: 40px 0 40px 40px;
    font-size:34px;
    font-family:PingFang-SC-Medium;
    color: rgba(62, 168, 245, 1);
    background-color: #fff;
  }
</style>
