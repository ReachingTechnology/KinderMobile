import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
// import store from '../store/store'

import MobileUserDayTask from '../components/mobile/mobile_user_day_task.vue'
import MobileEditTaskDetail from '../components/mobile/mobile_edit_task_detail.vue'
import MobileAllUserTasksStat from '../components/mobile/mobile_all_user_tasks_stat.vue'
import MobileOneUserAllTaskStat from '../components/mobile/mobile_one_user_all_task_stat.vue'
import MobileOneUserOneTaskStat from '../components/mobile/mobile_one_user_one_task_stat.vue'
import MobileUserCenter from '../components/mobile/mobile_user_center.vue'
import MobileUserMessageCenter from '../components/mobile/mobile_user_message_center.vue'
import MobileUserDutyNotificationList from '../components/mobile/mobile_user_duty_notification_list.vue'
import MobileUserInformList from '../components/mobile/mobile_user_inform_list.vue'
import MobileUserLogin from '../components/mobile/mobile_user_login.vue'

Vue.use(Router)
Vue.use(Vuex)

const router = new Router({
  routes: [
    {
      path: '/userLogin',
      name: 'userLogin',
      component: MobileUserLogin,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userDayTask',
      name: 'userDayTask',
      component: MobileUserDayTask,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/editTaskDetail/:task/:date/:showApprove',
      name: 'editTaskDetailPage',
      component: MobileEditTaskDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/allUserTasksStat',
      name: 'allUserTasksStat',
      component: MobileAllUserTasksStat,
      meta: {
        allowBack: true,
        keepAlive: true
      }
    },
    {
      path: '/oneUserAllTaskStat/:userid/:startofday/:endofday',
      name: 'oneUserAllTaskStat',
      component: MobileOneUserAllTaskStat,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/oneUserOneTaskStat/:userid/:taskid/:startofday/:endofday',
      name: 'oneUserOneTaskStat',
      component: MobileOneUserOneTaskStat,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: MobileUserCenter,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userMessageCenter',
      name: 'userMessageCenter',
      component: MobileUserMessageCenter,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userDutyNotificationList',
      name: 'userDutyNotificationList',
      component: MobileUserDutyNotificationList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/userInformList',
      name: 'userInformList',
      component: MobileUserInformList,
      meta: {
        keepAlive: true
      }
    }
  ],
  mode: 'history'
})
/**
 * 登录钩子函数
 * to 即将要进入的目标 路由对象
 * from 当前导航正要离开的路由
 * next 一定要调用该方法来 resolve 这个钩子
 * next() 进行管道中的下一个钩子 如果全部钩子执行完了，则状态就是 confirmed （确认的）
 */
router.beforeEach((to, from, next) => {
  console.log('router.beforeeach:' + to.fullPath)
  console.log(to.params)
  // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  //   if (store.state.sessionToken) { // 通过vuex state获取当前的token是否存在
  //     next()
  //   } else {
  //     next({
  //       path: '/login',  // 跳转到登录页面
  //       query: { redirect: to.fullPath } // 将跳转的路由path作为参数，用于登录成功后回到登录前页面
  //     })
  //   }
  // } else {
  //   next()
  // }
  next()
})

export default router

