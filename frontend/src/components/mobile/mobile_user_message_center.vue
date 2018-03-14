<template>
  <div>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  title="我的职责提醒" :describeText="'共' + newDutyNotificationCount + '项新提醒'" value="dutyNotification">
        <mu-icon value="chevron_right" slot="right"/>
        <mu-badge v-show="newDutyNotificationCount > 0" :content="newDutyNotificationCount" slot="after" secondary circle/>
      </mu-list-item>
      <mu-divider shallowInset/>
      <mu-list-item  title="我的工作通知" :describeText="'共' + newInformCount + '项新提醒'" value="inform">
        <mu-icon value="chevron_right" slot="right"/>
        <mu-badge v-show="newInformCount > 0" :content="newInformCount" slot="after" secondary circle/>
      </mu-list-item>
      <mu-divider shallowInset/>
      <mu-list-item  title="发送工作通知" :describeText="'已有' + allInform.length + '条通知'">
        <mu-icon value="chevron_right" slot="right"/>
      </mu-list-item>
      <mu-divider shallowInset/>
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
  import { CHANGE_APP_TITLE, GET_ALL_INFORM, GET_NEW_DUTY_NOTIFICATION_COUNT, GET_NEW_INFORM_COUNT, SET_ROOT_VIEW } from '../../store/mutation_types'
//  import dateUtil from '../../utils/DateUtil'
  import Moment from 'moment'
  import {NOTIFY_PRIORITY} from '../../store/common_defs'

  export default {
    name: 'mobile_user_message_list',
    methods: {
      tableRowClassName (row, index) {
        let item = row
        if (item.unfinish_count > 0) {
          return 'info-row'
        }
        return ''
      },
      itemClicked (item) {
        if (item.value === 'dutyNotification') {
          this.$router.push({name: 'userDutyNotificationList'})
        } else if (item.value === 'inform') {
          this.$router.push({name: 'userInformList'})
        } else {
          this.$router.push({name: 'manageInformList'})
        }
      },
      getData () {
        this.GET_NEW_INFORM_COUNT()
        this.GET_NEW_DUTY_NOTIFICATION_COUNT()
        this.GET_ALL_INFORM()
      },
      ...mapActions([CHANGE_APP_TITLE, GET_ALL_INFORM, GET_NEW_DUTY_NOTIFICATION_COUNT, GET_NEW_INFORM_COUNT, SET_ROOT_VIEW])
    },
    computed: {
      ...mapGetters(['newInformCount', 'newDutyNotificationCount', 'allInform'])
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('我的消息通知')
        vm.SET_ROOT_VIEW(true)
        vm.getData()
      })
    },
    beforeRouteLeave: function (to, from, next) {
      this.SET_ROOT_VIEW(false)
      next()
    },
    props: [],
    data: () => {
      return {
      }
    },
    components: {
    }
  }
</script>
