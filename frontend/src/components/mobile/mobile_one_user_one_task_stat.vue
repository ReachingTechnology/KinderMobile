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
    TASK_STATUS
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
        this.$router.push({name: 'editTaskDetailPage', params: {task: task, date: dateUtil.getTheDay(task.startofday)}})
      }
    },
    computed: {
      ...mapGetters(['taskExecDaterangeData', 'user', 'datePickerOptionsDay']),
      time_range () {
        return Moment(this.selectedData.startofday * 1000).format('M月D日') + '到' + Moment(this.selectedData.endofday * 1000).format('M月D日')
      },
      tasks () {
        var data = []
        console.log(this.selectedData)
        console.log(this.taskExecDaterangeData)
        for (var i = 0, len = this.taskExecDaterangeData.length; i < len; i++) {
          var item = this.taskExecDaterangeData[i]
          item.executetime = Moment(item.starttime * 1000).format('h:mm') + ' 到 ' + Moment(item.endtime * 1000).format('h:mm')
          item.realendtimeDisplay = item.realendtime === 0 ? '' : Moment(item.realendtime * 1000).format('M月D日 hh:mm')
          item.finish_status_display = TASK_STATUS.get(item.finish_status)
          item.startofdayDisplay = Moment(item.startofday * 1000).format('M月D日')
          item.taskname = this.selectedData.taskname
          item.taskid = this.selectedData.taskid
          item.userid = this.selectedData.userid
          console.log('%%%%%%%%%%%%%%%')
          console.log(item)
          data.push(item)
        }
        return data
      },
      queryUser () {
        return Util.getUserName(this.selectedData.userid)
      }
    },
    mounted: function () {
      console.log('%%%%%%%%%%%%%%^^^^^^^^^^^^^^^')
      console.log(this.selectedData)
      this.GET_ONE_TASK_EXEC_DATA_BY_DATERANGE(this.selectedData)
    },
    beforeRouteLeave: function (to, from, next) {
      this.$destroy()
      next()
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('用户任务[' + vm.selectedData.taskname + ']完成情况统计') })
    },
    props: [],
    data: function () {
      return {
        selectedDay: new Date(),
        selectedUser: '000001',
        showEdit: false,
        selectedTask: {},
        selectedData: this.$route.params.selectedData
      }
    },
    components: {
    }
  }
</script>
