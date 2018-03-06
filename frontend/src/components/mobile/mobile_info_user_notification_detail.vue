<template>
  <div align="left">
    <mt-field label="职责名称" readonly v-model="current_notification.taskname"></mt-field>
    <mt-field label="提醒内容" type="textarea" readonly v-model="current_notification.msgContent"></mt-field>
    <mt-field label="提醒等级" readonly v-model="NOTIFY_PRIORITY[current_notification.notifyPriority]"></mt-field>
    <mt-field label="提醒发送时间" readonly v-model="current_notification.msgArriveTimeDisplay"></mt-field>
  </div>
</template>
<script>
  import {NOTIFY_TYPE, NOTIFY_PRIORITY} from '../../store/common_defs'
  export default {
    components: {},
    name: 'info_panel_notification',
    methods: {
    },
    computed: {
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('职责提醒详情')
      })
    },
    created: function () {
    },
    data: function () {
      return {
        NOTIFY_TYPE: NOTIFY_TYPE,
        NOTIFY_PRIORITY: NOTIFY_PRIORITY,
        current_notification: this.$route.params.notification
      }
    }
  }
</script>

