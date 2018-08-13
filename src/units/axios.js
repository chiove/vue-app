import axios from 'axios'
export default {
  axiosGet: function (url,params) {
    if(url){
      if(typeof params !== Object){
        params = {}
      }
      axios.get(url, {
        params:params
      })
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  axiosPost:function (url,data) {
    if(url) {
      if (typeof data !== Object) {
        data = {}
      }
      axios.post(url, data)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  axiosPut:function (url,data) {
    if(url) {
      if (typeof data !== Object) {
        data = {}
      }
      axios.post(url, data)
        .then(function (response) {
          return response
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  /*获取学生信息*/
  getStudent:function(id){
    this.axiosGet(`/student/${id}`)
  },
  /*根据学生ID和日期查询全部历史*/
  studentClockHistory:function(date,studentId){
    this.axiosGet('/student-clock-history',{
      date:date,
      studentId:studentId,
    })
  },
  /*统计学生到勤，未归，晚归*/
  getStudentsClocktimes:function(id){
    this.axiosGet(`/student-clock/${id}/stat/`)
  },
  /*获取系统配置*/
  getSystemConfig:function () {
    this.axiosGet('/system-config')
  },
  /*获取系统配置*/
  putSystemConfig:function (data) {
    this.axiosPut('/system-config',data)
  },
}
