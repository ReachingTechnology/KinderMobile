<template>
  <div align="left">
    <mt-field label="通知名称" readonly v-model="current_inform.name"></mt-field>
    <mt-field label="通知内容" type="textarea" readonly v-model="current_inform.descr"></mt-field>
    <mt-field label="通知人" readonly v-model="senderName"></mt-field>
    <mt-field label="通知等级" readonly v-model="NOTIFY_PRIORITY[current_inform.notifyPriority]"></mt-field>
    <mt-field label="通知发送时间" readonly v-model="current_inform.msgArriveTimeDisplay"></mt-field>
  </div>
</template>
<script>
  import {NOTIFY_TYPE, NOTIFY_PRIORITY} from '../../store/common_defs'
  import Util from '../../store/utils'
  export default {
    components: {},
    name: 'info_panel_inform',
    methods: {
    },
    computed: {
      senderName () {
        return Util.getUserName(this.current_inform.sender)
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('工作通知详情')
      })
    },
    created: function () {
    },
    data: function () {
      return {
        NOTIFY_TYPE: NOTIFY_TYPE,
        NOTIFY_PRIORITY: NOTIFY_PRIORITY,
        current_inform: this.$route.params.inform
      }
    }
  }
</script>
