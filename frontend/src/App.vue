<template>
  <div id="app" style="height: 100%" class="layout">
    <div class="header">
      <div class="logo">
        {{appTitle}}
      </div>
    </div>
    <div class="content">
      <div class="body">
        <!--<mobile-user-day-task v-show="user.id != '' && selectedTab == 'today_task'"></mobile-user-day-task>-->
        <router-view></router-view>
      </div>
    </div>
    <div class="footer">
      <mu-paper class="bottomFixed">
        <mu-bottom-nav :value="selectedTab" @change="handleTabChange">
          <mu-bottom-nav-item value="today_task" title="今日任务" icon="assignment"/>
          <mu-bottom-nav-item value="task_info" title="任务统计" icon="assessment"/>
          <mu-bottom-nav-item value="user_center" title="用户中心" icon="account_box"/>
        </mu-bottom-nav>
      </mu-paper>
      <!--<mu-tabs :value="activeTab" shift @change="handleTabChange">-->
      <!--<mu-tab value="today_task" icon="" title="今日任务"/>-->
      <!--<mu-tab value="task_info" icon="" title="任务统计"/>-->
      <!--<mu-tab value="user_center" icon="" title="用户中心"/>-->
      <!--</mu-tabs>-->
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { GET_ALL_USER_ACCOUNT, GET_ALL_ROLE, GET_ALL_DUTY, GET_ALL_PERMISSION, GET_ALL_PERMISSION_ROLE, GET_ALL_USER_TASK_EXEC_DATA, USER_LOGOUT } from './store/mutation_types'
  import MobileUserLogin from './components/mobile/mobile_user_login.vue'
  import MobileUserDayTask from './components/mobile/mobile_user_day_task.vue'
  export default {
    name: 'app',
    components: {
      MobileUserLogin, MobileUserDayTask
    },
    computed: {
      ...mapGetters(['datePickerOptionsDay', 'datePickerOptionsMonth', 'user', 'appTitle'])
    },
    created: function () {
      this.user._id = '000001'
      this.user.role = ['ROLE_0001', 'ROLE_0004']
      this.user.name = 'zhanghao'
      this.GET_ALL_PERMISSION_ROLE()
      this.GET_ALL_PERMISSION()
      this.GET_ALL_USER_ACCOUNT()
      this.GET_ALL_ROLE()
      this.GET_ALL_DUTY()
    },
    data: () => {
      return {
        selectedTab: 'today_task'
      }
    },
    methods: {
      ...mapActions([GET_ALL_USER_ACCOUNT, GET_ALL_ROLE, GET_ALL_DUTY, GET_ALL_PERMISSION, GET_ALL_PERMISSION_ROLE, GET_ALL_USER_TASK_EXEC_DATA, USER_LOGOUT]),
      handleTabChange: function (id) {
        this.selectedTab = id
        if (id === 'today_task') {
          this.$router.push({ name: 'userDayTask' })
        } else if (id === 'task_info') {
          this.$router.push({ name: 'allUserTasksStat' })
        } else if (id === 'user_center') {
          this.$router.push({name: 'userCenter'})
        }
      }
    }
  }
</script>
<style scoped>
  .layout{
    /*background-color: rgb(236, 236, 236);*/
    height: 100%;
  }

  .header{
    background-color: #7e57c2;
  }

  .logo{
    font-size: 24px;
    color: white;
    display: inline-block;
    padding: 10px 20px;
  }

  .nav{
    display: inline-block;
    width: calc(100% - 150px);
    margin: 0 auto;
  }

  .tab{
    margin: 0 auto;
    width: 400px;
    background-color: rgba(0, 0, 0, 0);
  }

  .content{
    width: 90%;
    margin: 0 auto;
    height: auto;
  }

  .breadcrumb{
    margin: 10px 0;
  }

  .body{
    background-color: white;
    border-radius: 5px;
    height: auto;
  }

  .footer{
    padding: 20px 0;
    text-align: center;
    margin-bottom: 0px;
  }

  .bottomFixed{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index:1000;
  }
  /*.bottom_bar_title {*/
  /*color: white;*/
  /*}*/
</style>
