<template>
  <div>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  title="职责提醒" :describeText="'共' + newDutyNotificationCount + '项新提醒'" value="dutyNotification">
        <mu-icon value="chevron_right" slot="right"/>
      </mu-list-item>
      <mu-list-item  title="工作通知" :describeText="'共' + newInformCount + '项新提醒'" value="inform">
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
  import { CHANGE_APP_TITLE, GET_NEW_DUTY_NOTIFICATION_COUNT, GET_NEW_INFORM_COUNT, SET_ROOT_VIEW } from '../../store/mutation_types'
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
        } else {
          this.$router.push({name: 'userInformList'})
        }
      },
      getData () {
        this.GET_NEW_INFORM_COUNT()
        this.GET_NEW_DUTY_NOTIFICATION_COUNT()
      },
      ...mapActions([CHANGE_APP_TITLE, GET_NEW_DUTY_NOTIFICATION_COUNT, GET_NEW_INFORM_COUNT, SET_ROOT_VIEW])
    },
    computed: {
      ...mapGetters(['newInformCount', 'newDutyNotificationCount'])
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
