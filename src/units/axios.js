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
  /*更新系统配置*/
  putSystemConfig:function (data) {
    this.axiosPut('/system-config',data)
  },
  /*学生打卡页面和打卡统计页面*/
    /*获取学生信息*/
  getStudent:function(studentId){
    this.axiosGet(`/student/${studentId}`)
  },
    /*学生操作接口-学生打卡 POST /student-clock*/
  studentClock:function(deviceId,posLatitude,posLongitude,studentId){
    this.axiosPost('student-clock',{
      deviceId:deviceId,
      posLatitude:posLatitude,
      posLongitude:posLongitude,
      studentId:studentId
    })
  },
    /*学生操作接口-根据学生ID查询当前考勤状态 GET /student-clock-status*/
  studentClockStatus:function(studentId){
    this.axiosGet('/student-clock-status',{
      studentId:studentId
    })
  },
  /*学生操作接口-根据年月查询打卡记录 GET /student-clock*/
  studentClockHistoryYM:function(year,month,studentId){
    this.axiosGet('student-clock',{
      year:year,
      month:month,
      studentId:studentId
    })
  },
  /*根据学生ID和日期查询全部历史*/
  studentClockHistory:function(date,studentId){
    this.axiosGet('/student-clock-history',{
      date:date, /*日期（格式yyyy-MM-dd）*/
      studentId:studentId,
    })
  },
    /*统计学生到勤，未归，晚归*/
  getStudentsClocktimes:function(studentId){
    this.axiosGet(`/student-clock/${studentId}/stat/`)
  },
    /*获取系统配置*/
  getSystemConfig:function () {
    this.axiosGet('/system-config')
  },
 /* 辅导员打卡页面*/
    /*1、辅导员操作接口-根据辅导员ID统计总打卡次数 GET /instructor-clock/stat-all-count*/
  getTeacherClockTimes:function (instructorId) {
    this.axiosGet('/instructor-clock/stat-all-count',{
      instructorId:instructorId
    })
  },
    /*2、下拉数据查询接口-根据用户ID查询基本信息 GET /select-data/user/{userId}*/
  getTeacherBaseInformation:function (userId) {
    this.axiosGet(`/select-data/user/${userId}`)
  },
    /*3. 辅导员操作接口-根据年月辅导员考勤统计 GET /instructor-clock/stat-by-year-month*/
  getTeacherTotal:function (instructorId,month,year) {
    this.axiosGet('/instructor-clock/stat-by-year-month',{
      instructorId:instructorId,
      month:month,
      year:year
    })
  },
    /*4、辅导员操作接口-辅导员打卡 POST /instructor-clock*/
  postTeacherClock:function (instructorId,qrCode) {
    this.axiosPost('/instructor-clock',{
      instructorId:instructorId,
      qrCode:qrCode
    })
  },
    /*5、辅导员操作接口-根据辅导员ID查询当前考勤状态 GET /instructor-clock-status*/
  getTeacherCheck:function (instructorId) {
    this.axiosGet('/instructor-clock-status',{
      instructorId:instructorId
    })
  },
  /*辅导员查寝签到*/
    /*1、辅导员操作接口-辅导员查寝签到-分页获取辅导员打卡统计 GET /analysis/instructor-stat*/
  getTeacherClockTotal:function(data){
    /*{descOrAsc,nameOrCode,orderBy,orgId,pageNo,pageSize}可选*/
    this.axiosGet('/analysis/instructor-stat',data)
  },
  /*学生关怀页面*/
    /*1、辅导员操作接口-分页查询辅导员关怀或待关怀列表 GET /care-instructor*/
  getTeacherCareList:function (careStatus,instructorId,pageNo,pageSize) {
    this.axiosGet('/care-instructor',{
      careStatus:careStatus,
      instructorId:instructorId,
      pageNo:pageNo,
      pageSize:pageSize
    })
  },
    /*2、辅导员操作接口-提交关怀结果 PUT /care*/
  putTeacherCare:function (careId,remark) {
    this.axiosPut('/care',{
      careId:careId,
      remark:remark
    })
  },
  /*查寝页面*/
    /*1、查寝操作接口-根据用户查询宿舍楼 GET /dormitory-building/query-by-user  下拉*/
  getCheckBuild:function (userId) {
    this.axiosGet('/dormitory-building/query-by-user',{
      userId:userId
    })
  },
    /*2、查寝操作接口-根据用户查询宿舍楼下的宿舍 GET /dormitory/query-by-user    下拉*/
  getCheckRoom:function (buildingId,floorNumber,userId) {
    this.axiosGet('/dormitory/query-by-user',{
      buildingId:buildingId,
      floorNumber:floorNumber,
      userId:userId
    })
  },
    /*3、查寝操作接口-根据姓名和学号查询学生列表  GET /dormitory-check/query-by-name-code 搜素框*/
  getSearchStudentList:function (data) {
    /*{code,name}可选*/
    this.axiosGet('/dormitory-check/query-by-name-code',data)
  },
    /*4、查寝操作接口-根据条件查询宿舍列表 GET /dormitory-list-query*/
  getRoomList:function (data) {
    /*{buildingId,userId}必填*/
    /*{descOrAsc,dormitoryId,floorNumber}可选*/
    this.axiosGet('/dormitory-list-query',data)
  },
    /*5、查寝操作接口-结束查寝 POST /dormitory-check*/
  postEndCheck:function (dormitoryId,operatorId) {
    this.axiosPost('/dormitory-check',{
      dormitoryId:dormitoryId,
      operatorId:operatorId
    })
  },
  /*日统计页面*/
    /*1、查寝操作接口-查寝日统计  GET /dormitory-check/day-stat*/
  getDailyTotal:function (year,month,day,userId) {
    this.axiosGet('/dormitory-check/day-stat',{
      year:year,
      month:month,
      day:day,
      userId:userId
    })
  },
    /*2、查寝操作接口-日统计学生列表 GET /dormitory-check/day-stat/student*/
  getDailyStudentList:function (year,month,day,userId,clockStatus) {
    this.axiosGet('/dormitory-check/day-stat/student',{
      year:year,
      month:month,
      day:day,
      userId:userId,
      clockStatus:clockStatus
    })
  },
  /*周统计页面*/
    /*1、查寝操作接口-查寝周统计 GET /dormitory-check/week-stat*/
  getWeekTotal:function (userId,weekNumber) {
    this.axiosGet('/dormitory-check/week-stat',{
      userId:userId,
      weekNumber:weekNumber
    })
  },
    /*2、查寝操作接口-周统计学生列表 GET /dormitory-check/week-stat/student*/
  getWeekStudentList:function (userId,clockStatus,weekNumber) {
    this.axiosGet('/dormitory-check/week-stat/student',{
      userId:userId,
      clockStatus:clockStatus,
      weekNumber:weekNumber
    })
  }
}
