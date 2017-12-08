<template>
  <div>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  v-for="item in messages" :title="item.taskname" :describeText="item.msgArriveTimeDisplay" :value="item" :afterText="item.msgContent">
        <mu-avatar :icon="getPriorityIcon(item)" :backgroundColor="getPriorityIconColor(item)" slot="leftAvatar"/>
        <!--<mu-icon value="chevron_right" slot="right"/>-->
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
  import { CHANGE_APP_TITLE, GET_INFORM_BY_USER } from '../../store/mutation_types'
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
      },
      getData () {
        this.GET_INFORM_BY_USER()
      },
      showEditOver () {
        this.showEdit = false
      },
      getPriorityIcon (item) {
        if (item.notifyPriority === 'high') {
          return 'error'
        } else if (item.notifyPriority === 'middle') {
          return 'warning'
        } else {
          return 'email'
        }
      },
      getPriorityIconColor (item) {
        if (item.notifyPriority === 'high') {
          return 'red'
        } else if (item.notifyPriority === 'middle') {
          return 'yellow'
        } else {
          return 'green'
        }
      },
      ...mapActions([CHANGE_APP_TITLE, GET_INFORM_BY_USER])
    },
    computed: {
      ...mapGetters(['userInform']),
      messages () {
        var data = []
        for (var i = 0, len = this.userInform.length; i < len; i++) {
          var item = this.userInform[i]
          if (item.notifyTimeType === 'after') {
            item.msgContent = '应该于' + Moment(item.realendtime * 1000).format('H:mm') + '完成执行.'
          } else {
            item.msgContent = '将于' + Moment(item.realstarttime * 1000).format('H:mm') + '开始执行.'
          }
          item.msgArriveTimeDisplay = Moment(item.informSendTime * 1000).format('YY年M月D日 H:mm')
          item.msgPriorityDisplay = NOTIFY_PRIORITY[item.notifyPriority]
          data.push(item)
        }
        return data
      }
    },
    mounted: function () {
      this.getData()
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('我的消息通知') })
    },
    props: [],
    data: () => {
      return {
        selectedData: {}
      }
    },
    components: {
    }
  }
</script>
