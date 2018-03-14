<template>
  <div>
    <mu-text-field label="通知名称" v-model="current_inform.name">
    </mu-text-field>
    <br/>
    <mu-text-field label="通知内容" v-model="current_inform.descr">
    </mu-text-field>
    <mu-list>
      <mu-list-item  title="通知发送人" @click="selectInformer">
        <mu-icon value="chevron_right" slot="right"/>
      </mu-list-item>
      <mu-divider shallowInset/>
      <mu-list-item  title="被通知人" @click="selectInformee">
        <mu-icon value="chevron_right" slot="right"/>
      </mu-list-item>
      <mu-divider shallowInset/>
    </mu-list>
    <mu-date-picker label="通知发送日期" hintText="选择发送日期" v-model="sendDate" @change="dateChanged"/>
    <br/>
    <mu-time-picker label="通知发送时间" hintText="选择发送时间" v-model="thisTime" format="24hr" @change="timeChanged"/>
    <br/>
    <mu-select-field v-model="current_inform.notifyPriority" label="通知等级" @change="handleTaskStatusChange">
      <mu-menu-item value="high"   :title="NOTIFY_PRIORITY['high']"/>
      <mu-menu-item value="middle"   :title="NOTIFY_PRIORITY['middle']"/>
      <mu-menu-item value="low"   :title="NOTIFY_PRIORITY['low']"/>
    </mu-select-field>
    <br/>
    <mu-select-field v-model="current_inform.notifyType" label="通知方式" @change="handleTaskStatusChange">
      <mu-menu-item value="message_queue"   :title="NOTIFY_TYPE['message_queue']"/>
      <mu-menu-item value="system_alarm"   :title="NOTIFY_TYPE['system_alarm']"/>
      <mu-menu-item value="short_message"   :title="NOTIFY_TYPE['short_message']"/>
    </mu-select-field>
    <br/>
    <div>
      <mu-raised-button style="display: inline-block" @click="cancelEdit" label="取消" class="raised-button" />
      <mu-raised-button style="display: inline-block" @click="commitEdit" label="提交" class="raised-button" backgroundColor="green"/>
    </div>
    <div v-show="isCommitting">
      <div class="v-modal" tabindex="0" style="z-index: 2019; width: 100%; height: 100%"></div>
      <div style="position: absolute; top: 50%; left: 50%; margin-top: -30px; margin-left: -30px">
        <mu-circular-progress style="z-index: 2020" :size="60" :strokeWidth="5"/>
      </div>
    </div>
  </div>
</template>
<script>
  import {NOTIFY_TYPE, NOTIFY_PRIORITY} from '../../store/common_defs'
  import Util from '../../store/utils'
  import DateUtil from '../../utils/DateUtil'
  import { mapGetters, mapActions } from 'vuex'
  import Moment from 'moment'
  import { CHANGE_APP_TITLE, UPSERT_INFORM } from '../../store/mutation_types'
  export default {
    components: {},
    name: 'info_panel_inform',
    methods: {
      ...mapActions([CHANGE_APP_TITLE, UPSERT_INFORM]),
      commitEdit () {
        if (this.current_inform.sender === undefined || this.current_inform.sender === '') {
          this.current_inform.sender = this.user._id
        }
        console.log(this.current_inform.sender)
        console.log(this.current_inform.informUserList)
        this.UPSERT_INFORM(this.current_inform)
        this.$router.go(-1)
      },
      cancelEdit () {
        this.$router.go(-1)
      },
      dateChanged (value) {
        this.setDate(value)
      },
      timeChanged (value) {
        this.setTime(value)
      },
      calDateTime () {
        console.log('calculate time')
        console.log(this.current_inform.sendTime)
        this.sendDate = Moment(this.current_inform.sendTime * 1000).format('YYYY-MM-DD')
        this.thisTime = Moment(this.current_inform.sendTime * 1000).format('H:mm:ss')
      },
      setDate (date) {
        let newDatetime = date + ' ' + this.thisTime
        this.current_inform.sendTime = DateUtil.getDatetimeSeconds(newDatetime)
      },
      setTime (time) {
        let newDatetime = this.sendDate + ' ' + time
        this.current_inform.sendTime = DateUtil.getDatetimeSeconds(newDatetime)
      },
      selectInformer () {
        var selectedData = []
        if (this.current_inform.sender !== undefined && this.current_inform.sender !== '') {
          selectedData.push(this.current_inform.sender)
        } else {
          selectedData.push(this.user._id)
        }
        this.$router.push({name:'selectUser', params:{inform: this.current_inform, selectedData: selectedData, title: '选择通知发送人', singleSelection: true, tag: 'informer'}})
      },
      selectInformee () {
        var selectedData = []
        if (this.current_inform.informUserList !== undefined) {
          selectedData = this.current_inform.informUserList
        }
        this.$router.push({name:'selectUser', params:{inform: this.current_inform, selectedData: selectedData, title: '选择被通知人', singleSelection: false, tag: 'informee'}})
      }
    },
    computed: {
      ...mapGetters(['user']),
      senderName () {
        return Util.getUserName(this.current_inform.sender)
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('工作通知详情')
        vm.current_inform = to.params.inform
        if (to.params.selectedResult !== undefined && to.params.selectedResult.tag !== undefined) {
          vm.userSelectResult[to.params.selectedResult.tag] = to.params.selectedResult.selectedData
        }
        if(vm.userSelectResult['informer'] !== undefined) {
          vm.current_inform.sender = vm.userSelectResult['informer'][0]
        }
        if(vm.userSelectResult['informee'] !== undefined) {
          vm.current_inform.informUserList = vm.userSelectResult['informee']
        }
        vm.calDateTime()
      })
    },
    created: function () {
    },
    data: function () {
      return {
        NOTIFY_TYPE: NOTIFY_TYPE,
        NOTIFY_PRIORITY: NOTIFY_PRIORITY,
        current_inform: {},
        userSelectResult: {},
        sendDate: Moment().format('YYYY-MM-DD'),
        thisTime: Moment().format('H:mm:ss')
      }
    }
  }
</script>
<style>
  .mu-item.show-right {
    padding-left: 0
  }
</style>
