<template>
  <div>
    <h2>日任务列表</h2>
    <mu-divider shallowInset/>
    <mu-list>
      <!--<mu-sub-header>日常职责</mu-sub-header>-->
      <mu-list-item  title="日常职责" :describeText="'共' + dayTask.DUTY_TIME_TYPE_ROUTINE.length + '项'" toggleNested :open="dayTaskCollapse['DUTY_TIME_TYPE_ROUTINE']" @toggleNested="routineListCollapseChanged">
        <!--<mu-avatar icon="build" slot="leftAvatar"/>-->
        <mu-list-item  v-for="item in dayTask.DUTY_TIME_TYPE_ROUTINE" @click="itemClicked(item)"slot="nested" :title="item.name" :describeText="item.executetime" :value="item">
            <mu-avatar :icon="item.icon" :backgroundColor="item.iconBgColor" slot="leftAvatar"/>
            <mu-icon value="info" slot="right"/>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <mu-divider shallowInset/>
    <mu-list>
      <mu-list-item  title="定期职责" :describeText="'共' + dayTask.DUTY_TIME_TYPE_PERIODICAL.length + '项'" toggleNested :open="dayTaskCollapse['DUTY_TIME_TYPE_PERIODICAL']" @toggleNested="periodicalListCollapseChanged">
        <!--<mu-avatar icon="build" slot="leftAvatar"/>-->
        <mu-list-item  v-for="item in dayTask.DUTY_TIME_TYPE_PERIODICAL" @click="itemClicked(item)"slot="nested" :title="item.name" :describeText="item.executetime" :value="item">
          <mu-avatar :icon="item.icon" :backgroundColor="item.iconBgColor" slot="leftAvatar"/>
          <mu-icon value="info" slot="right"/>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <mu-divider shallowInset/>
    <mu-list>
      <mu-list-item  title="特定日期职责" :describeText="'共' + dayTask.DUTY_TIME_TYPE_SPECIFIC.length + '项'" toggleNested :open="dayTaskCollapse['DUTY_TIME_TYPE_SPECIFIC']" @toggleNested="specificListCollapseChanged">
        <!--<mu-avatar icon="build" slot="leftAvatar"/>-->
        <mu-list-item  v-for="item in dayTask.DUTY_TIME_TYPE_SPECIFIC" @click="itemClicked(item)"slot="nested" :title="item.name" :describeText="item.executetime" :value="item">
          <mu-avatar :icon="item.icon" :backgroundColor="item.iconBgColor" slot="leftAvatar"/>
          <mu-icon value="info" slot="right"/>
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <!--<div v-show="showEdit" style="height: 100%; z-index: 1000; position: fixed">-->
      <!--<mobile-edit-task-detail :edited_task="selectedTask" :visibility="showEdit"></mobile-edit-task-detail>-->
    <!--</div>-->
  </div>
</template>
<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }

  /*.el-button:last-child {*/
  /*float: left;*/
  /*}*/
</style>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { GET_TASK_EXEC_DATA_BY_DATE, COMMIT_TASK_EXEC_INFO, CHANGE_APP_TITLE, SET_ROOT_VIEW, SET_COLLAPSE_STATE } from '../../store/mutation_types'
  import { TASK_STATUS, TASK_STATUS_UNFINISHED, TASK_STATUS_DELAYED, TASK_STATUS_FINISHED, TASK_STATUS_PREPARE, TASK_STATUS_INPROCESS, TASK_STATUS_URGENT } from '../../store/common_defs'
  import dateUtil from '../../utils/DateUtil'
  import Moment from 'moment'
  import MobileEditTaskDetail from './mobile_edit_task_detail.vue'
  import { DUTY_TIME_TYPE_ALL, DUTY_TIME_TYPE_ROUTINE, DUTY_TIME_TYPE_PERIODICAL, DUTY_TIME_TYPE_SPECIFIC } from '../../store/common_defs'
  export default {
    name: 'mobile_user_day_task',
    methods: {
      tableRowClassName (row, index) {
        let item = row
        if (item.finish_status === TASK_STATUS.get(TASK_STATUS_UNFINISHED) || item.finish_status === TASK_STATUS.get(TASK_STATUS_DELAYED)) {
          return 'info-row'
        }
        return ''
      },
      itemClicked (item) {
        var task = item
        if (task.pictures === undefined) {
          task.pictures = []
        }
        this.$router.push({name: 'editTaskDetailPage', params: {task: task, date: dateUtil.getTheDay(task.startofday), showApprove: false}})
      },
      ...mapActions([GET_TASK_EXEC_DATA_BY_DATE, COMMIT_TASK_EXEC_INFO, CHANGE_APP_TITLE, SET_ROOT_VIEW, SET_COLLAPSE_STATE]),
      handleEdit (item) {
        this.selectedTask = item
        this.showEdit = true
      },
      handleDaySelected () {
        this.getTaskExecData()
      },
      getTaskExecData () {
        var date = dateUtil.getStartOfTheday(this.selectedDay)
        var param = {}
        param['userid'] = this.selectedUser
        param['startofday'] = date
        param['timeType'] = DUTY_TIME_TYPE_ALL
        this.GET_TASK_EXEC_DATA_BY_DATE(param)
      },
      setIcon (item) {
        if (item.finish_status === TASK_STATUS_FINISHED) {
          item.icon = 'check_circle'
          item.iconBgColor = 'green'
        } else if (item.finish_status === TASK_STATUS_INPROCESS) {
          item.icon = 'build'
          item.iconBgColor = 'blue'
        } else if (item.finish_status === TASK_STATUS_UNFINISHED) {
          item.icon = 'error'
          item.iconBgColor = 'red'
        } else if (item.finish_status === TASK_STATUS_DELAYED) {
          item.icon = 'assignment_late'
          item.iconBgColor = 'yellow'
        } else if (item.finish_status === TASK_STATUS_URGENT) {
          item.icon = 'priority_high'
          item.iconBgColor = 'red'
        } else if (item.finish_status === TASK_STATUS_PREPARE) {
          item.icon = 'assignment'
          item.iconBgColor = 'blue'
        }
        console.log('set icon', item)
      },
      routineListCollapseChanged (open) {
        var param = {}
        param.type = 'DUTY_TIME_TYPE_ROUTINE'
        param.value = open
        console.log('**************&&&&&&&&&&&&&&&&&&')
        console.log(param)
        this.SET_COLLAPSE_STATE(param)
      },
      periodicalListCollapseChanged (open) {
        var param = {}
        param.type = 'DUTY_TIME_TYPE_PERIODICAL'
        param.value = open
        this.SET_COLLAPSE_STATE(param)
      },
      specificListCollapseChanged (open) {
        var param = {}
        param.type = 'DUTY_TIME_TYPE_SPECIFIC'
        param.value = open
        this.SET_COLLAPSE_STATE(param)
      }
    },
    computed: {
      ...mapGetters(['userDayTask', 'user', 'datePickerOptionsDay', 'dayTaskCollapse']),
      dayTask () {
        var data = this.userDayTask
        var keys = Object.keys(data)
        for (var m = 0, len0 = keys.length; m < len0; m++) {
          var timeType = keys[m]
          for (var i = 0, len = data[timeType].length; i < len; i++) {
            var item = data[timeType][i]
            item.executetime = Moment(item.starttime * 1000).format('H:mm') + ' 到 ' + Moment(item.endtime * 1000).format('H:mm')
            item.realendtimeDisplay = item.realendtime === 0 ? '' : Moment(item.realendtime * 1000).format('M月D日 H:mm')
            item.finish_status_display = TASK_STATUS.get(item.finish_status)
            this.setIcon(item)
          }
        }
        return data
      },
      selectedUser () {
        return this.user._id
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('今日任务')
        vm.SET_ROOT_VIEW(true)
        vm.getTaskExecData()
      })
    },
    beforeRouteLeave: function (to, from, next) {
      this.SET_ROOT_VIEW(false)
      next()
    },
    watch: {
      selectedUser: function (val, oldval) {
        this.getTaskExecData()
      }
    },
    mounted: function () {
      this.getTaskExecData()
    },
    data: () => {
      return {
        selectedDay: new Date(),
        selectedTask: {}
      }
    },
    components: {
      MobileEditTaskDetail
    }
  }
</script>
