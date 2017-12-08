/**
 * Created by HOZ on 28/08/2017.
 */
import dateUtil from '../utils/DateUtil'
const state = {
  sessionToken: '',
  // 当前用户
  user: {
    _id: ''
  },
  appTitle: '幼儿园安保系统',
  active_menu: '',
  allUser: [],
  allUserGroup: [],
  allUserLocation: [],
  allRole: [],
  allPermissionRole: [],
  allPermission: {},
  allTask: [],
  allDuty: [],
  allDutyCategory: [],
  dutyForRoles: {},
  allInform: [],
  userInform: [],
  // 后端服务器地址
  // backend_uri: 'https://192.168.31.69:7070',
  backend_uri: 'https://47.94.192.237:7070',
  // backend_uri: 'https://127.0.0.1:7070',
  all_statistic_data: [], // 所有用户的所有任务在一个时间段内执行的情况
  userDayTask: [], // 用户的所有任务在某一天执行的情况
  userDaterangeTask: [], // 用户的所有任务在一个时间段里执行的情况
  taskExecDaterangeData: [], // 用户的一个任务在一个时间段里执行的情况
  userDayTaskQueryDate: 0,
  datePickerOptionsDay: {
    shortcuts: [{
      text: '今天',
      onClick (picker) {
        picker.$emit('pick', dateUtil.getStartOfToday() * 1000)
      }
    }, {
      text: '昨天',
      onClick (picker) {
        const date = new Date()
        date.setTime((dateUtil.getStartOfToday() - 3600 * 24) * 1000)
        picker.$emit('pick', date)
      }
    }, {
      text: '前天',
      onClick (picker) {
        const date = new Date()
        date.setTime((dateUtil.getStartOfToday() - 3600 * 24 * 2) * 1000)
        picker.$emit('pick', date)
      }
    }],
    disabledDate (date) {
      if (date.getTime() > new Date().getTime()) {
        return true
      }
      return false
    }
  },
  datePickerOptionsMonth: {
    shortcuts: [
      {
        text: '这个月',
        onClick (picker) {
          const start = dateUtil.getStartofThisMonth()
          const end = dateUtil.getStartOfToday() - 1
          picker.$emit('pick', [start, end])
        }
      },
      {
        text: '上个月',
        onClick (picker) {
          let today = new Date()
          const start = dateUtil.getStartofThisMonth() - 3600 * 24 * dateUtil.getDayCountOfLastMonth(today.getYear(), today.getMonth())
          const end = dateUtil.getStartofThisMonth() - 1
          picker.$emit('pick', [start, end])
        }
      }
    ]
    // disabledDate (date) {
    //   if (date.getTime() > new Date().getTime()) {
    //     return false
    //   }
    //   console.log('return false')
    //   return false
    // }
  },
  changePassFail: false
}
export default state
