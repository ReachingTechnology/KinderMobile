<template>
  <div>
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
          <mu-list-item  v-for="item in userDaterangeTask" :title="item.taskname" :describeText="item.role" :value="item" :afterText="'未完成项数: ' + item.unfinish_count">
            <mu-avatar icon="work" slot="leftAvatar"/>
            <mu-icon value="chevron_right" slot="right"/>
          </mu-list-item>
      </mu-list>
    </div>
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
  import {GET_USER_TASK_EXEC_DATA_BY_DATERANGE, CHANGE_APP_TITLE} from '../../store/mutation_types'
  import Moment from 'moment'
  import Util from '../../store/utils'

  export default {
    name: 'table_user_daterange_task_stat',
    methods: {
      tableRowClassName (row, index) {
        return ''
      },
      ...mapActions([GET_USER_TASK_EXEC_DATA_BY_DATERANGE, CHANGE_APP_TITLE]),
      itemClicked (item) {
        this.selectedTask = item.value
        this.selectedTask.startofday = this.selectedData.startofday
        this.selectedTask.endofday = this.selectedData.endofday
        this.$router.push({name: 'oneUserOneTaskStat', params: {selectedData: this.selectedTask}})
      }
    },
    computed: {
      ...mapGetters(['userDaterangeTask', 'user', 'datePickerOptionsDay', 'appTitle']),
      time_range () {
        return Moment(this.selectedData.startofday * 1000).format('M月D日') + '到' + Moment(this.selectedData.endofday * 1000).format('M月D日')
      },
      queryUser () {
        return Util.getUserName(this.selectedData.userid)
      }
    },
    created: function () {
      let params = {}
      params.userid = this.selectedData.userid
      params.startofday = this.selectedData.startofday
      params.endofday = this.selectedData.endofday
      this.GET_USER_TASK_EXEC_DATA_BY_DATERANGE(params)
    },
    beforeRouteLeave: function (to, from, next) {
      this.$destroy()
      next()
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('用户任务统计') })
    },
    props: [],
    data: function () {
      return {
        selectedData: this.$route.params.selectedData,
        selectedTask: {},
        showEdit: false
      }
    },
    components: {
    }
  }
</script>
