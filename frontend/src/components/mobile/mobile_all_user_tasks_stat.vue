<template>
  <div>
    <!--<mu-select-field v-model="queryUser" label="员工" hintText="选择待查询员工">-->
      <!--<mu-menu-item v-for="user in allUser" :value="user._id" :title="user.name"/>-->
    <!--</mu-select-field>-->
    <mu-date-picker label="查询开始日期" hintText="选择开始日期" v-model="startQueryDate"/>
    <br/>
    <mu-date-picker label="查询结束日期" hintText="选择结束日期" v-model="endQueryDate"/>
    <br/>
    <mu-raised-button style="margin-top: 10px" label="查询" @click="getData"></mu-raised-button>
    <br/>
    <br/>
    <mu-divider shallowInset/>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  v-for="item in all_statistic_data" :title="item.username" :describeText="item.role" :value="item" :afterText="'未完成项数: ' + item.unfinish_count + '/' + item.approved_count">
        <mu-avatar icon="person" slot="leftAvatar"/>
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
</style>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { CHANGE_APP_TITLE, GET_ALL_USER_TASK_EXEC_DATA, GET_ALL_USER_TASK_EXEC_DATA_BY_DATERANGE, GET_USER_TASK_EXEC_DATA_BY_DATERANGE, SET_ROOT_VIEW, SET_TASK_QUERY_DATE } from '../../store/mutation_types'
  import dateUtil from '../../utils/DateUtil'
  import Moment from 'moment'

  export default {
    name: 'table_manage_unfinished_data',
    methods: {
      tableRowClassName (row, index) {
        let item = row
        if (item.unfinish_count > 0) {
          return 'info-row'
        }
        return ''
      },
      handleStartDateChange (value) {
        console.log(value)
        console.log(Moment().format('YYYY-MM-DD'))
      },
      itemClicked (item) {
        this.$router.push({name: 'oneUserAllTaskStat', params: {userid: item.value.userid, startofday: dateUtil.getDatetimeSeconds(this.startQueryDate), endofday: dateUtil.getDatetimeSeconds(this.endQueryDate)}})
      },
      getData () {
        var param = {}
        param.starttime = dateUtil.getDatetimeSeconds(this.startQueryDate)
        param.endtime = dateUtil.getDatetimeSeconds(this.endQueryDate)
        this.SET_TASK_QUERY_DATE([this.startQueryDate, this.endQueryDate])
        this.GET_ALL_USER_TASK_EXEC_DATA_BY_DATERANGE(param)
      },
      showEditOver () {
        this.showEdit = false
      },
      ...mapActions([CHANGE_APP_TITLE, GET_ALL_USER_TASK_EXEC_DATA, GET_ALL_USER_TASK_EXEC_DATA_BY_DATERANGE, GET_USER_TASK_EXEC_DATA_BY_DATERANGE, SET_ROOT_VIEW, SET_TASK_QUERY_DATE])
    },
    computed: {
      ...mapGetters(['all_statistic_data', 'allUser', 'user', 'taskQueryDate'])
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('安保统计报表')
        vm.SET_ROOT_VIEW(true)
        vm.getData() })
    },
    beforeRouteLeave: function (to, from, next) {
      this.SET_ROOT_VIEW(false)
      next()
    },
    created: function () {
      console.log('&&&&&&&&&&&&&&&&&&&&&&!!!')
      if (this.taskQueryDate.length === 0) {
        this.startQueryDate = Moment(dateUtil.getStartofThisMonth() * 1000).format('YYYY-MM-DD')
        this.endQueryDate = Moment().format('YYYY-MM-DD')
      } else {
        this.startQueryDate = this.taskQueryDate[0]
        this.endQueryDate = this.taskQueryDate[1]
      }
    },
    props: ['datePickerOption'],
    data: () => {
      return {
        showEdit: false,
        selectedDay: new Date(),
        startQueryDate: '',
        endQueryDate: '',
        queryUser: this.user,
        datetime_type: 'month'
      }
    },
    components: {
    }
  }
</script>
