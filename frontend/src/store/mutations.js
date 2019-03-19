/**
 * Created by HOZ on 28/08/2017.
 */
import {
  TASK_STATUS_PREPARE,
  TASK_STATUS_INPROCESS,
  TASK_STATUS_UNFINISHED,
  TASK_STATUS_DELAYED,
  TASK_STATUS_FINISHED,
  DUTY_TIME_TYPE_SPECIFIC,
  DUTY_TIME_TYPE_ROUTINE,
  DUTY_TIME_TYPE_PERIODICAL,
} from './common_defs'
import Moment from 'moment'
import dateUtil from '../utils/DateUtil'

const mutations = {
  SET_USER (state, data) {
    state.user = data
    if (state.user._id === '') {
      state.authenticated = false
    } else {
      state.authenticated = true
    }
    if (state.user.avatar === undefined){
      state.user.avatar = {localUri: '', remoteUri: '', createTime: 0}
    }
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
      item.approved_count = data[i].approved_count
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
      if (data[i].timeType === DUTY_TIME_TYPE_SPECIFIC) {
        item.starttime = data[i].starttime
        item.endtime = data[i].endtime
      } else {
        item.starttime = data[i].starttime + startofToday
        item.endtime = data[i].endtime + startofToday
      }
      var startDate = Moment(item.starttime * 1000).format('H:mm')
      var endDate = Moment(item.endtime * 1000).format('H:mm')
      item.executetime = startDate + ' 至 ' + endDate
      item.timeType = data[i].timeType
      console.log('insert: ' + item)
      state.userDayTask.push(item)
    }
  },

  /*
   * 用户今天的任务的执行情况
   */
  SET_USER_DUTY_EXEC_DATA (state, data) {
    var currentTime = dateUtil.getNow()
    state.userDayTask = data
    var keys = Object.keys(state.userDayTask)
    let startofyesterday = dateUtil.getStartOfToday() - 3600 * 24
    for (var m = 0, len0 = keys.length; m < len0; m++) {
      var timeType = keys[m]
      var dayTask = state.userDayTask[timeType]
      for (var i = 0, len = dayTask.length; i < len; i++) {
        var item = dayTask[i]
        if(timeType !== 'DUTY_TIME_TYPE_SPECIFIC') {
          item.starttime += startofyesterday
          item.endtime += startofyesterday
        }
        if (item.pictures === undefined) {
          item.pictures = []
        }
        //     var taskStartTime = item.starttime - startofyesterday + item.startofday
        //     var taskEndTime = item.endtime - startofyesterday + item.startofday
        //     if (item.realendtime === 0) {
        //       if (taskStartTime > currentTime) {
        //         item.finish_status = TASK_STATUS_PREPARE
        //       } else if (taskEndTime > currentTime) {
        //         item.finish_status = TASK_STATUS_INPROCESS
        //       } else {
        //         item.finish_status = TASK_STATUS_UNFINISHED
        //       }
        //     } else {
        //       if (item.realendtime - item.startofday >= 3600 * 24) {
        //         item.finish_status = TASK_STATUS_UNFINISHED
        //       } else if (item.realendtime > taskEndTime + 600) {
        //         item.finish_status = TASK_STATUS_DELAYED
        //       } else {
        //         item.finish_status = TASK_STATUS_FINISHED
        //       }
        //     }
          //   break
          // }
        // }
      }
    }

    if (state.userDayTask[DUTY_TIME_TYPE_ROUTINE] === undefined) {
      state.userDayTask[DUTY_TIME_TYPE_ROUTINE] = []
    }
    if (state.userDayTask[DUTY_TIME_TYPE_PERIODICAL] === undefined) {
      state.userDayTask[DUTY_TIME_TYPE_PERIODICAL] = []
    }
    if (state.userDayTask[DUTY_TIME_TYPE_SPECIFIC] === undefined) {
      state.userDayTask[DUTY_TIME_TYPE_SPECIFIC] = []
    }
    console.log(state.userDayTask)
  },

  /*
   * 一个用户的所有任务在一个时间段的执行情况
   */
  SET_USER_TASK_EXEC_DATA_BY_DATERANGE (state, data) {
    state.userDaterangeTask = data
  },

  /*
   * 一个用户的一个任务在一个时间段的执行情况
   */
  SET_ONE_TASK_EXEC_DATA_BY_DATERANGE (state, data) {
    console.log(data)
    state.taskExecDaterangeData = data
    var currentTime = dateUtil.getNow()
    for (var i = 0, len = state.taskExecDaterangeData.length; i < len; i++) {
      var item = state.taskExecDaterangeData[i]
      item.realendtime = data[i].realendtime
      item.comment = data[i].comment
      item.startofday = data[i].startofday
      // item.starttime += item.startofday
      // item.endtime += item.startofday
      item.finish_status = data[i].finish_status
      if (item.pictures === undefined) {
        item.pictures = []
      }
      // var taskStartTime = item.starttime + item.startofday
      // var taskEndTime = item.endtime + item.startofday
      // if (item.realendtime === 0) {
      //   if (taskStartTime > currentTime) {
      //     item.finish_status = TASK_STATUS_PREPARE
      //   } else if (taskEndTime > currentTime) {
      //     item.finish_status = TASK_STATUS_INPROCESS
      //   } else {
      //     item.finish_status = TASK_STATUS_UNFINISHED
      //   }
      // } else {
      //   if (item.realendtime > taskEndTime + 600) {
      //     item.finish_status = TASK_STATUS_DELAYED
      //   } else {
      //     item.finish_status = TASK_STATUS_FINISHED
      //   }
      // }
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
      if (item.timeType !== DUTY_TIME_TYPE_SPECIFIC) {
        item.starttime += startofyesterday
        item.endtime += startofyesterday
      }
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
  },
  SET_ALL_INFORM (state, data) {
    state.allInform = data
  },
  SET_USER_INFORM_DATA (state, data) {
    state.userInform = data
  },
  SET_USER_DUTY_NOTIFICATION_DATA (state, data) {
    state.userDutyNotification = data
  },
  SET_NEW_DUTY_NOTIFICATION_COUNT (state, data) {
    state.newDutyNotificationCount = data.count
    state.totalNewNotification = state.newDutyNotificationCount + state.newInformCount
  },
  SET_NEW_INFORM_COUNT (state, data) {
    state.newInformCount = data.count
    state.totalNewNotification = state.newDutyNotificationCount + state.newInformCount
  },
  SET_ROOT_VIEW (state, data) {
    state.isRootView = data
  },
  SET_SHOULD_HAVE_TOPRIGHT_MENU (state, data) {
    state.shouldHaveTopRightMenu = data
  },
  SET_TOPRIGHT_MENU_SETTING ( state, data) {
    state.topRightMenuSetting = data
  },
  SET_TASK_QUERY_DATE (state, data) {
    state.taskQueryDate = data
  }
}
export default mutations
