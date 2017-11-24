/**
 * Created by HOZ on 28/08/2017.
 */
import {
  TASK_STATUS_PREPARE,
  TASK_STATUS_INPROCESS,
  TASK_STATUS_UNFINISHED,
  TASK_STATUS_DELAYED,
  TASK_STATUS_FINISHED
} from './common_defs'
import Moment from 'moment'
import dateUtil from '../utils/DateUtil'

const mutations = {
  SET_USER (state, data) {
    state.user = data
  },
  SET_ALL_STATISTIC_DATA (state, data) {
    console.log('begin set all unfinished data')
    state.all_statistic_data = []
    for (var i = 0, len = data.length; i < len; i++) {
      var item = {}
      item.userid = data[i].userid
      item.username = data[i].username
      item.role = data[i].role
      item.unfinish_count = data[i].unfinish_count
      console.log('insert: ' + item)
      state.all_statistic_data.push(item)
    }
  },
  SET_USER_DUTY_DATA (state, data) {
    console.log('begin set user query data')
    state.userDayTask = []
    for (var i = 0, len = data.length; i < len; i++) {
      let startofToday = dateUtil.getStartOfToday()
      var item = {}
      item.no = i + 1
      item._id = data[i]._id
      item.descr = data[i].descr
      item.name = data[i].name
      item.starttime = data[i].starttime + startofToday
      item.endtime = data[i].endtime + startofToday
      var startDate = Moment(item.starttime * 1000).format('h:mm')
      var endDate = Moment(item.endtime * 1000).format('h:mm')
      item.executetime = startDate + ' 至 ' + endDate
      console.log('insert: ' + item)
      state.userDayTask.push(item)
    }
  },
  UPDATE_USER_DUTY_EXEC_DATA (state, data) {
    var startOfToday = dateUtil.getStartOfToday()
    var currentTime = new Date().getTime() / 1000
    for (var i = 0, len = state.userDayTask.length; i < len; i++) {
      var item = state.userDayTask[i]
      for (var j = 0, len2 = data.length; j < len2; j++) {
        if (item._id === data[j].duty_id) {
          item.realendtime = data[j].realendtime
          item.comment = data[j].comment
          item.startofday = data[j].startofday
          var taskTodayStarttime = item.starttime + startOfToday
          var taskTodayEndtime = item.endtime + startOfToday
          if (item.realendtime === 0) {
            if (taskTodayStarttime > currentTime) {
              item.finish_status = TASK_STATUS_PREPARE
            } else if (taskTodayEndtime > currentTime) {
              item.finish_status = TASK_STATUS_INPROCESS
            } else {
              item.finish_status = TASK_STATUS_UNFINISHED
            }
          } else {
            if (item.realendtime > taskTodayEndtime + 600) {
              item.finish_status = TASK_STATUS_DELAYED
            } else {
              item.finish_status = TASK_STATUS_FINISHED
            }
          }
          break
        }
      }
    }
  },
  SET_USER_DUTY_EXEC_DATA (state, data) {
    var currentTime = dateUtil.getNow()
    state.userDayTask = data
    var keys = Object.keys(state.userDayTask)
    console.log('5555555555555555555555')
    console.log(keys.length)
    let startofyesterday = dateUtil.getStartOfToday() - 3600 * 24
    for (var m = 0, len0 = keys.length; m < len0; m++) {
      var timeType = keys[m]
      var dayTask = state.userDayTask[timeType]
      for (var i = 0, len = dayTask.length; i < len; i++) {
        var item = dayTask[i]
        item.starttime += startofyesterday
        item.endtime += startofyesterday
        // for (var j = 0, len2 = dayTask.length; j < len2; j++) {
        //   if (item.taskid === dayTask[j].taskid) {
        //     item.realendtime = dayTask[j].realendtime
        //     item.comment = dayTask[j].comment
        //     item.startofday = dayTask[j].startofday
            var taskStartTime = item.starttime - startofyesterday + item.startofday
            var taskEndTime = item.endtime - startofyesterday + item.startofday
            if (item.realendtime === 0) {
              if (taskStartTime > currentTime) {
                item.finish_status = TASK_STATUS_PREPARE
              } else if (taskEndTime > currentTime) {
                item.finish_status = TASK_STATUS_INPROCESS
              } else {
                item.finish_status = TASK_STATUS_UNFINISHED
              }
            } else {
              if (item.realendtime - item.startofday >= 3600 * 24) {
                item.finish_status = TASK_STATUS_UNFINISHED
              } else if (item.realendtime > taskEndTime + 600) {
                item.finish_status = TASK_STATUS_DELAYED
              } else {
                item.finish_status = TASK_STATUS_FINISHED
              }
            }
          //   break
          // }
        // }
      }
    }
    console.log(state.userDayTask)
  },
  SET_USER_TASK_EXEC_DATA_BY_DATERANGE (state, data) {
    state.userDaterangeTask = data
  },
  SET_ONE_TASK_EXEC_DATA_BY_DATERANGE (state, data) {
    console.log(data)
    state.taskExecDaterangeData = data
    var currentTime = dateUtil.getNow()
    for (var i = 0, len = state.taskExecDaterangeData.length; i < len; i++) {
      var item = state.taskExecDaterangeData[i]
      item.realendtime = data[i].realendtime
      item.comment = data[i].comment
      item.startofday = data[i].startofday
      var taskStartTime = item.starttime + item.startofday
      var taskEndTime = item.endtime + item.startofday
      if (item.realendtime === 0) {
        if (taskStartTime > currentTime) {
          item.finish_status = TASK_STATUS_PREPARE
        } else if (taskEndTime > currentTime) {
          item.finish_status = TASK_STATUS_INPROCESS
        } else {
          item.finish_status = TASK_STATUS_UNFINISHED
        }
      } else {
        if (item.realendtime > taskEndTime + 600) {
          item.finish_status = TASK_STATUS_DELAYED
        } else {
          item.finish_status = TASK_STATUS_FINISHED
        }
      }
    }
  },
  SET_ALL_USER_ACCOUNT (state, data) {
    console.log('set all user account:' + data.length)
    state.allUser = data
  },
  SET_ALL_USER_GROUP (state, data) {
    console.log('set all user group:' + data.length)
    state.allUserGroup = data
  },
  SET_ALL_ROLE (state, data) {
    console.log('set all roles')
    state.allRole = data
  },
  SET_ALL_PERMISSION_ROLE (state, data) {
    console.log('set all permission roles')
    state.allPermissionRole = data
  },
  SET_ALL_PERMISSION (state, data) {
    console.log('set all permission')
    state.allPermission = {}
    for (var i = 0, len = data.length; i < len; i++) {
      state.allPermission[data[i].categoryid] = {}
      state.allPermission[data[i].categoryid].permissions = data[i].permissions
      state.allPermission[data[i].categoryid].categoryName = data[i].categoryName
    }
    console.log(state.allPermission)
  },
  SET_ALL_TASK (state, data) {
    console.log('set all tasks')
    state.allTask = data
  },
  SET_ALL_DUTY (state, data) {
    state.allDuty = data
    for (var index = 0, lenDuty = state.allDuty.length; index < lenDuty; index++) {
      let item = state.allDuty[index]
      let startofyesterday = dateUtil.getStartOfToday() - 3600 * 24
      item.starttime += startofyesterday
      item.endtime += startofyesterday
    }
    state.dutyForRoles = {}
    for (var i = 0, len = state.allRole.length; i < len; i++) {
      var role = state.allRole[i]
      var roleDuties = []
      for (var j = 0, len2 = state.allDuty.length; j < len2; j++) {
        if (state.allDuty[j].roles.indexOf(role._id) >= 0) {
          roleDuties.push(state.allDuty[j])
        }
      }
      state.dutyForRoles[role._id] = roleDuties
    }
  },
  SET_ALL_DUTY_CATEGORY (state, data) {
    state.allDutyCategory = data
  },
  SET_ALL_USER_LOCATION (state, data) {
    state.allUserLocation = data
  }
}
export default mutations
