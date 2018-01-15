<template>
    <div>
      <mu-list>
        <mu-list-item  :title="queryUser">
          <!--<mu-avatar icon="date_range" slot="leftAvatar"/>-->
          <mu-icon value="person" slot="left" :size="32" />
        </mu-list-item>
        <mu-list-item  :title="time_range">
          <!--<mu-avatar icon="date_range" slot="leftAvatar"/>-->
          <mu-icon value="date_range" slot="left" :size="32" />
        </mu-list-item>
      </mu-list>
      <mu-divider shallowInset/>
      <mu-list @itemClick="itemClicked">
        <mu-list-item  v-for="item in tasks" :title="item.startofdayDisplay" :describeText="item.realendtimeDisplay" :value="item" :afterText="item.finish_status_display">
          <mu-avatar icon="work" slot="leftAvatar"/>
          <mu-icon value="chevron_right" slot="right"/>
        </mu-list-item>
      </mu-list>
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
  import {mapActions, mapGetters} from 'vuex'
  import {CHANGE_APP_TITLE, GET_ONE_TASK_EXEC_DATA_BY_DATERANGE} from '../../store/mutation_types'
  import Moment from 'moment'
  import {
    TASK_STATUS_UNFINISHED,
    TASK_STATUS_DELAYED,
    TASK_STATUS,
    DUTY_TIME_TYPE_SPECIFIC
  } from '../../store/common_defs'
  import Util from '../../store/utils'
  import dateUtil from '../../utils/DateUtil'
  import objUtil from '../../utils/ObjUtil'
  export default {
    name: 'table_user_day_task',
    methods: {
      tableRowClassName (row, index) {
        let item = row
        if (item.finish_status === TASK_STATUS_UNFINISHED || item.finish_status === TASK_STATUS_DELAYED) {
          return 'info-row'
        }
        return ''
      },
      ...mapActions([CHANGE_APP_TITLE, GET_ONE_TASK_EXEC_DATA_BY_DATERANGE]),
      itemClicked (item) {
        var task = objUtil.clone(item.value)
        task.name = item.value.taskname
        this.$router.push({name: 'editTaskDetailPage', params: {task: task, date: dateUtil.getTheDay(task.startofday), showApprove: true}})
      },
      getData () {
        var params = {}
        params.userid = this.userid
        params.taskid = this.taskid
        if (typeof this.startofday === 'string') {
          params.startofday = parseInt(this.startofday)
        } else {
          params.startofday = this.startofday
        }
        if (typeof this.endofday === 'string') {
          params.endofday = parseInt(this.endofday)
        } else {
          params.endofday = this.endofday
        }
        this.GET_ONE_TASK_EXEC_DATA_BY_DATERANGE(params)
      }
    },
    computed: {
      ...mapGetters(['taskExecDaterangeData', 'user', 'datePickerOptionsDay']),
      time_range () {
        return Moment(this.startofday * 1000).format('M月D日') + '到' + Moment(this.endofday * 1000).format('M月D日')
      },
      tasks () {
        var data = []
        for (var i = 0, len = this.taskExecDaterangeData.length; i < len; i++) {
          var item = this.taskExecDaterangeData[i]
          if (item.timeType === DUTY_TIME_TYPE_SPECIFIC) {
            item.executetime = Moment(item.starttime * 1000).format('YY年M月D日') + ' 到 ' + Moment(item.endtime * 1000).format('YY年M月D日')
          } else {
            item.executetime = Moment(item.starttime * 1000).format('H:mm') + ' 到 ' + Moment(item.endtime * 1000).format('H:mm')
          }
          item.realendtimeDisplay = item.realendtime === 0 ? '' : Moment(item.realendtime * 1000).format('M月D日 H:mm')
          item.finish_status_display = TASK_STATUS.get(item.finish_status)
          if (item.approve_status === '0') {
            item.finish_status_display = "个人原因未完成"
          } else if (item.approve_status === '1') {
            item.finish_status_display = "工作安排未完成"
          }
          item.startofdayDisplay = item.timeType === DUTY_TIME_TYPE_SPECIFIC ? item.executetime : Moment(item.startofday * 1000).format('M月D日')
          item.taskname = this.taskName
          item.taskid = this.taskid
          item.userid = this.userid
          data.push(item)
        }
        return data
      },
      queryUser () {
        return Util.getUserName(this.userid)
      },
      taskName () {
        return Util.getDutyName(this.taskid)
      }
    },
//    beforeRouteLeave: function (to, from, next) {
//      this.$destroy()
//      next()
//    },
    beforeRouteEnter: function (to, from, next) {
      console.log(to)
      next(vm => {
        vm.CHANGE_APP_TITLE('用户任务[' + vm.taskName + ']完成情况统计')
        vm.getData()
      })
    },
    props: [],
    data: function () {
      return {
        selectedDay: new Date(),
        selectedUser: '000001',
        showEdit: false,
        selectedTask: {},
        taskid: this.$route.params.taskid,
        userid: this.$route.params.userid,
        startofday: this.$route.params.startofday,
        endofday: this.$route.params.endofday
//        queryUser: Util.getUserName(this.$route.params.userid),
//        time_range: Moment(this.$route.params.startofday * 1000).format('M月D日') + '到' + Moment(this.$route.params.endofday * 1000).format('M月D日')
      }
    },
    components: {
    }
  }
</script>
