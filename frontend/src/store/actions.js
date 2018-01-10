/**
 * Created by HOZ on 28/08/2017.
 */
import axios from 'axios'
import { CHANGE_APP_TITLE, SET_ACTIVE_MENU, GET_ALL_USER_TASK_EXEC_DATA, GET_ALL_USER_TASK_EXEC_DATA_BY_DATERANGE, USER_LOGIN, USER_LOGOUT, USER_CHANGE_PASS,
  GET_DUTY_BY_USER, UPSERT_USER_ACCOUNT, GET_ALL_USER_ACCOUNT, REMOVE_USERS,
  GET_ALL_USER_GROUP, UPSERT_USER_GROUP, REMOVE_USER_GROUPS,
  GET_ALL_ROLE, UPSERT_ROLE, REMOVE_ROLES,
  GET_ALL_PERMISSION_ROLE, UPSERT_PERMISSION_ROLE, GET_ALL_PERMISSION, REMOVE_PERMISSION_ROLES,
  COMMIT_TASK_EXEC_INFO, GET_TASK_EXEC_DATA_BY_DATE, GET_USER_TASK_EXEC_DATA_BY_DATERANGE, GET_ONE_TASK_EXEC_DATA_BY_DATERANGE,
  GET_ALL_DUTY, UPSERT_DUTY, REMOVE_DUTIES, GET_ALL_DUTY_CATEGORY, UPSERT_DUTY_CATEGORY, REMOVE_DUTY_CATEGORIES,
  GET_ALL_USER_LOCATION, UPSERT_USER_LOCATION,
  GET_ALL_INFORM, GET_DUTY_NOTIFICATION_BY_USER, GET_INFORM_BY_USER, UPSERT_INFORM, REMOVE_INFORMS, GET_NEW_DUTY_NOTIFICATION_COUNT, GET_NEW_INFORM_COUNT,
  SET_ROOT_VIEW, SET_TASK_QUERY_DATE } from './mutation_types'
// import dateUtil from '../utils/DateUtil'
import state from './state'
import dateUtil from '../utils/DateUtil'
import {DUTY_TIME_TYPE_ALL} from './common_defs'

axios.defaults.baseURL = state.backend_uri
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// axios.defaults.headers.post['Content-Type'] = 'application/json'

function handleError (error) {
  if (error.response.status === 401) {
    state.user._id = ''
  }
}

const actions = {
  /*
   Login/logout
   */
  [ USER_LOGIN ]: function (store, param) {
    axios.post('/user/user_login', param)
      .then(function (response) {
        console.log('user login')
        console.log(response.data)
        store.commit('SET_USER', response.data)
      })
      .catch(handleError)
  },
  [ USER_LOGOUT ]: function (store, param) {
    var data = {}
    data._id = ''
    data.name = ''
    store.commit('SET_USER', data)
    store.state.isRootView = false
  },
  [ USER_CHANGE_PASS ]: function (store, param) {
    store.state.changePassFail = true
    axios.post('/user/change_pass', param)
      .then(function (response) {
        if (response.data.status !== 0) {
          store.state.changePassFail = true
        } else {
          store.state.changePassFail = false
        }
      })
      .catch(handleError)
  },
  /*
   App Title
   */
  [CHANGE_APP_TITLE]: function (store, param) {
    store.state.appTitle = param
  },
  /*
   Navigation Menu
   */
  [SET_ACTIVE_MENU]: function (store, param) {
    store.state.active_menu = param['active_menu']
  },
  /*
   User Account
   */
  [ UPSERT_USER_ACCOUNT ]: function (store, param) {
    'use strict'
    console.log('user birthday:' + param.birthday)

    axios.post('/management/upsert_user', param)
      .then(function (response) {
        axios.get('/management/query_all_user')
          .then(function (response) {
            store.commit('SET_ALL_USER_ACCOUNT', response.data)
          })
          .catch(handleError)
      })
      .catch(handleError)
  },
  [ GET_ALL_USER_ACCOUNT ]: function (store, param) {
    'use strict'
    axios.get('/management/query_all_user')
      .then(function (response) {
        console.log('get all user:')
        console.log(response.data)
        store.commit('SET_ALL_USER_ACCOUNT', response.data)
      })
      .catch(handleError)
  },
  [ REMOVE_USERS ]: function (store, param) {
    axios.post('/management/remove_user', param)
      .then(function (response) {
        console.log('remove users:' + param)
        console.log(response.data)
        axios.get('/management/query_all_user')
          .then(function (response) {
            store.commit('SET_ALL_USER_ACCOUNT', response.data)
          })
          .catch(handleError)
      })
  },
  /*
   User Group
   */
  [GET_ALL_USER_GROUP]: function (store, param) {
    'use strict'
    axios.get('/management/query_all_user_group')
      .then(function (response) {
        store.commit('SET_ALL_USER_GROUP', response.data)
      })
      .catch(handleError)
  },
  [ UPSERT_USER_GROUP ]: function (store, param) {
    'use strict'
    axios.post('/management/upsert_user_group', param)
      .then(function (response) {
        store.dispatch(GET_ALL_USER_GROUP)
      })
      .catch(handleError)
  },
  [ REMOVE_USER_GROUPS ]: function (store, param) {
    axios.post('/management/remove_user_group', param)
      .then(function (response) {
        store.dispatch(GET_ALL_USER_GROUP)
      })
      .catch(handleError)
  },
  /*
   Role
   */
  [ GET_ALL_ROLE ]: function (store, param) {
    'use strict'
    console.log('get all role!!!')
    axios.get('/management/query_all_role')
      .then(function (response) {
        console.log('get all roles')
        store.commit('SET_ALL_ROLE', response.data)
      })
      .catch(handleError)
  },
  [ UPSERT_ROLE ]: function (store, param) {
    'use strict'
    axios.post('/management/upsert_role', param)
      .then(function (response) {
        console.log(response.data)
        axios.get('/management/query_all_role')
          .then(function (response) {
            console.log('get all roles')
            store.commit('SET_ALL_ROLE', response.data)
          })
          .catch(handleError)
      })
      .catch(handleError)
  },
  [ REMOVE_ROLES ]: function (store, param) {
    axios.post('/management/remove_role', param)
      .then(function (response) {
        console.log('remove roles:' + param)
        console.log(response.data)
        axios.get('/management/query_all_role')
          .then(function (response) {
            store.commit('SET_ALL_ROLE', response.data)
          })
          .catch(handleError)
      })
  },
  /*
   Permission Role
   */
  [ GET_ALL_PERMISSION_ROLE ]: function (store, param) {
    'use strict'
    console.log('get all permission role!!!')
    axios.get('/management/query_all_permission_role')
      .then(function (response) {
        console.log('get all permission roles')
        store.commit('SET_ALL_PERMISSION_ROLE', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ UPSERT_PERMISSION_ROLE ]: function (store, param) {
    'use strict'
    axios.post('/management/upsert_permission_role', param)
      .then(function (response) {
        console.log(response.data)
        axios.get('/management/query_all_permission_role')
          .then(function (response) {
            console.log('get all permission roles')
            store.commit('SET_ALL_PERMISSION_ROLE', response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ REMOVE_PERMISSION_ROLES ]: function (store, param) {
    'use strict'
    axios.post('/management/remove_permission_role', param)
      .then(function (response) {
        console.log(response.data)
        axios.get('/management/query_all_permission_role')
          .then(function (response) {
            console.log('get all permission roles')
            store.commit('SET_ALL_PERMISSION_ROLE', response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  /*
   Permission
   */
  [ GET_ALL_PERMISSION ]: function (store, param) {
    'use strict'
    axios.get('/management/query_all_permission')
      .then(function (response) {
        console.log('et all permission')
        console.log(response.data)
        store.commit('SET_ALL_PERMISSION', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  /*
   Duty
   */
  [ GET_ALL_DUTY ]: function (store, param) {
    'use strict'
    axios.get('/management/query_all_duty_category ')
      .then(function (response) {
        store.commit('SET_ALL_DUTY_CATEGORY', response.data)
        axios.get('/management/query_all_duty')
          .then(function (response) {
            console.log('get all duty')
            console.log(response.data)
            store.commit('SET_ALL_DUTY', response.data)
          })
          .catch(handleError)
      })
      .catch(handleError)
  },
  [ GET_DUTY_BY_USER ]: function (store, param) {
    'use strict'
    axios.post('/duty/query_duty_by_user', {'userid': store.state.user['_id']})
      .then(function (response) {
        console.log('get data by user:')
        console.log(response.data)
        store.commit('SET_USER_DUTY_DATA', response.data)
      })
      .catch(handleError)
  },
  [ UPSERT_DUTY ]: function (store, param) {
    'use strict'
    axios.post('/management/upsert_duty', param)
      .then(function (response) {
        console.log(response.data)
        axios.get('/management/query_all_duty')
          .then(function (response) {
            console.log('get all duties')
            store.commit('SET_ALL_DUTY', response.data)
          })
          .catch(handleError)
        store.dispatch(GET_ALL_USER_ACCOUNT)
      })
      .catch(handleError)
  },
  [ REMOVE_DUTIES ]: function (store, param) {
    axios.post('/management/remove_duty', param)
      .then(function (response) {
        console.log('remove duties:' + param)
        console.log(response.data)
        axios.get('/management/query_all_duty')
          .then(function (response) {
            store.commit('SET_ALL_DUTY', response.data)
          })
          .catch(handleError)
      })
  },
  /*
   Duty Category
   */
  [ GET_ALL_DUTY_CATEGORY ]: function (store, param) {
    'use strict'
    axios.get('/management/query_all_duty_category ')
      .then(function (response) {
        store.commit('SET_ALL_DUTY_CATEGORY', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ UPSERT_DUTY_CATEGORY ]: function (store, param) {
    'use strict'
    axios.post('/management/upsert_duty_category', param)
      .then(function (response) {
        store.dispatch(GET_ALL_DUTY_CATEGORY)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ REMOVE_DUTY_CATEGORIES ]: function (store, param) {
    axios.post('/management/remove_duty_category', param)
      .then(function (response) {
        store.dispatch(GET_ALL_DUTY_CATEGORY)
      })
  },
  /*
   Task exec
   */
  [ COMMIT_TASK_EXEC_INFO ]: function (store, param) {
    'use strict'
    axios.post('/user/commit_task_exec_info', param)
      .then(function (response) {
        console.log(response.data)
        let newparam = {}
        newparam.userid = param.userid
        newparam.startofday = param.startofday
        newparam.timeType = DUTY_TIME_TYPE_ALL
        axios.post('/user/mobile_get_task_exec_info_by_date', newparam)
          .then(function (response) {
            store.commit('SET_USER_DUTY_EXEC_DATA', response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ GET_ALL_USER_TASK_EXEC_DATA ]: function (store, param) {
    axios.post('/manager/get_all_user_task_exec_stat_by_time', param)
    // axios.get('/manager/query_all_by_time?starttime=' + param['starttime'] + '&endtime=' + param['endtime'])
      .then(function (response) {
        console.log('get all statistic data')
        console.log(response.data)
        store.commit('SET_ALL_STATISTIC_DATA', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ GET_ALL_USER_TASK_EXEC_DATA_BY_DATERANGE ]: function (store, param) {
    axios.post('/manager/get_all_user_task_exec_stat_by_date_range', param)
      .then(function (response) {
        console.log('get all statistic data')
        console.log(response.data)
        store.commit('SET_ALL_STATISTIC_DATA', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ GET_TASK_EXEC_DATA_BY_DATE ]: function (store, param) {
    console.log('GET_TASK_EXEC_DATA_BY_DATE')
    console.log(param)
    axios.post('/user/mobile_get_task_exec_info_by_date', param)
      .then(function (response) {
        console.log(response.data)
        console.log('update user duty data')
        store.commit('SET_USER_DUTY_EXEC_DATA', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ GET_USER_TASK_EXEC_DATA_BY_DATERANGE ]: function (store, param) {
    console.log('GET_USER_TASK_EXEC_DATA_BY_DATERANGE')
    console.log(param)
    axios.post('/user/get_user_task_exec_info_by_daterange', param)
      .then(function (response) {
        store.commit('SET_USER_TASK_EXEC_DATA_BY_DATERANGE', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ GET_ONE_TASK_EXEC_DATA_BY_DATERANGE ]: function (store, param) {
    console.log('GET_ONE_TASK_EXEC_DATA_BY_DATERANGE')
    console.log(param)
    axios.post('/user/get_one_task_exec_info_by_daterange', param)
      .then(function (response) {
        store.commit('SET_ONE_TASK_EXEC_DATA_BY_DATERANGE', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  /*
   User Location
   */
  [ GET_ALL_USER_LOCATION ]: function (store, param) {
    axios.get('/management/query_all_user_location ')
      .then(function (response) {
        store.commit('SET_ALL_USER_LOCATION', response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  [ UPSERT_USER_LOCATION ]: function (store, param) {
    'use strict'
    console.log('upsert user location:')
    console.log(param)
    axios.post('/management/upsert_user_location', param)
      .then(function (response) {
        store.dispatch(GET_ALL_USER_LOCATION)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  /*
   Inform
   */
  [ GET_ALL_INFORM ]: function (store, param) {
    'use strict'
    axios.get('/inform/query_all_inform ')
      .then(function (response) {
        store.commit('SET_ALL_INFORM', response.data)
      })
      .catch(handleError)
  },
  [ GET_DUTY_NOTIFICATION_BY_USER ]: function (store, param) {
    'use strict'
    console.log('query duty notification by user:::::::')
    axios.post('/inform/get_duty_notification_by_user', {'userid': store.state.user['_id'], 'queryTime': dateUtil.getNow(), 'startofday': dateUtil.getStartOfToday()})
      .then(function (response) {
        console.log('get duty notifcation by user:')
        console.log(response.data)
        store.commit('SET_USER_DUTY_NOTIFICATION_DATA', response.data)
      })
      .catch(handleError)
  },
  [ GET_INFORM_BY_USER ]: function (store, param) {
    'use strict'
    console.log('query inform by user:::::::')
    axios.post('/inform/query_inform_by_user', {'userid': store.state.user['_id'], 'queryTime': dateUtil.getNow(), 'startofday': dateUtil.getStartOfToday()})
      .then(function (response) {
        console.log('get inform by user:')
        console.log(response.data)
        store.commit('SET_USER_INFORM_DATA', response.data)
      })
      .catch(handleError)
  },
  [ UPSERT_INFORM ]: function (store, param) {
    'use strict'
    axios.post('/inform/upsert_inform', param)
      .then(function (response) {
        store.dispatch(GET_ALL_INFORM)
      })
      .catch(handleError)
  },
  [ REMOVE_INFORMS ]: function (store, param) {
    axios.post('/inform/remove_inform', param)
      .then(function (response) {
        store.dispatch(GET_ALL_INFORM)
      })
  },
  [ GET_NEW_DUTY_NOTIFICATION_COUNT ]: function (store, param) {
    'use strict'
    axios.post('/inform/get_new_duty_notification_count', {'userid': store.state.user['_id'], 'queryTime': dateUtil.getNow(), 'startofday': dateUtil.getStartOfToday()})
      .then(function (response) {
        console.log('got new duty notification count' + response.data.count)
        store.commit('SET_NEW_DUTY_NOTIFICATION_COUNT', response.data)
      })
      .catch(handleError)
  },
  [ GET_NEW_INFORM_COUNT ]: function (store, param) {
    'use strict'
    axios.post('/inform/get_new_inform_count', {'userid': store.state.user['_id'], 'queryTime': dateUtil.getNow()})
      .then(function (response) {
        console.log('got new inform count' + response.data.count)
        store.commit('SET_NEW_INFORM_COUNT', response.data)
      })
      .catch(handleError)
  },
  /*
   Layout
   */
  [ SET_ROOT_VIEW ]: function (store, param) {
    store.commit('SET_ROOT_VIEW', param)
  },
  [ SET_TASK_QUERY_DATE ]: function (store, param) {
    store.commit('SET_TASK_QUERY_DATE', param)
  }
}

export default actions

