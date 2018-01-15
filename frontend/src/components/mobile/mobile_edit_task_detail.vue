<template>
  <div>
    <mu-text-field label="任务名称" v-model="task.name" disabled>
    </mu-text-field>
    <br/>
    <mu-text-field label="任务详情" v-model="taskDescr" disabled>
    </mu-text-field>
    <br/>
    <mu-text-field label="任务执行时间" v-model="task.executetime" disabled>
    </mu-text-field>
    <br/>
    <mu-text-field label="任务实际完成时间" v-show="task.realendtime !== 0" v-model="task.realendtimeDisplay"
                   disabled>
    </mu-text-field>
    <br/>
    <mu-select-field v-model="task.finish_status" label="任务状态" :disabled="task.userid !== user._id" @change="handleTaskStatusChange">
      <mu-menu-item :value="TASK_STATUS_INPROCESS"   :title="TASK_STATUS.get(TASK_STATUS_INPROCESS)"/>
      <mu-menu-item :value="TASK_STATUS_UNFINISHED"   :title="TASK_STATUS.get(TASK_STATUS_UNFINISHED)"/>
      <mu-menu-item :value="TASK_STATUS_FINISHED"   v-show="task.finish_status === TASK_STATUS_FINISHED" :title="TASK_STATUS.get(TASK_STATUS_FINISHED)"/>
    </mu-select-field>
    <br/>
    <mu-text-field label="未完成原因" v-show="task.finish_status === TASK_STATUS_UNFINISHED" :disabled="user._id !== task.userid" v-model="task.comment" :hintText="commentHint" multiLine :rows="2" :rowsMax="4">
    </mu-text-field>
    <br/>
    <mu-select-field v-model="task.approve_status" v-show="showApprove" label="工作审批" hintText="待审批" :disabled="this.task.userid === this.user._id">
      <mu-menu-item value=0   title="个人原因"/>
      <mu-menu-item value=1   title="工作安排"/>
    </mu-select-field>
    <br/>
    <div>
      <mu-raised-button style="display: inline-block" @click="cancelEdit" label="取消" class="raised-button" />
      <mu-raised-button style="display: inline-block" @click="commitEdit" :label="task.finish_status === TASK_STATUS_INPROCESS ? '完成':'提交'" class="raised-button" backgroundColor="green"/>
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
  import {mapActions, mapGetters} from 'vuex'
  import {CHANGE_APP_TITLE, COMMIT_TASK_EXEC_INFO} from '../../store/mutation_types'
  import {TASK_STATUS_INPROCESS, TASK_STATUS_UNFINISHED, TASK_STATUS_FINISHED, TASK_STATUS} from '../../store/common_defs'
  import dateUtil from '../../utils/DateUtil'
  import util from '../../store/utils'
  export default {
    components: {},
    name: 'duty_edit_panel',
    methods: {
      tableRowClassName (row, index) {
        return ''
      },
      handleTaskStatusChange (value) {
      },
      commitEdit () {
        this.isCommitting = true
        this.getLocation()
      },
      cancelEdit () {
        this.$router.go(-1)
      },
      // Baidu location functionalities
      getLocation () {
        console.log('***************try to get location**************')
        navigator.geolocation.getCurrentPosition(this.translateLoc, this.onGetLocationError, {timeout: 10000})
      },
      commitInfo (lat, lng) {
        this.task.startofday = dateUtil.getStartOfTheday(this.selectedDay)
        var taskFinishInfo = {}
        taskFinishInfo.taskid = this.task.taskid
        taskFinishInfo.userid = this.task.userid
        taskFinishInfo.startofday = this.task.startofday
        taskFinishInfo.comment = this.task.comment
        taskFinishInfo.approve_status = this.task.approve_status
        taskFinishInfo.approve_user = this.task.approve_user
        taskFinishInfo.locationLat = lat
        taskFinishInfo.locationLng = lng
        taskFinishInfo.finish_status = this.task.finish_status

        taskFinishInfo.starttime = this.task.starttime
        taskFinishInfo.endtime = this.task.endtime
        taskFinishInfo.timeType = this.task.timeType
        console.log(taskFinishInfo)
        this.COMMIT_TASK_EXEC_INFO(taskFinishInfo)
        this.isCommitting = false
        this.$router.go(-1)
      },
      translateLoc (position) {
        console.log('***************got position**************')
        var currentLat = position.coords.latitude
        var currentLon = position.coords.longitude
        var gpsPoint = new BMap.Point(currentLon, currentLat)
        BMap.Convertor.translate(gpsPoint, 0, this.setBaiduPoint)
      },
      setBaiduPoint (point) {
        console.log('***************this is baidu point**************')
        console.log(point)
        this.commitInfo(point.lat, point.lng)
      },
      onGetLocationError (error) {
        console.log('get location error:')
        console.log(error)
        this.commitInfo(0, 0)
      },
      ...mapActions([COMMIT_TASK_EXEC_INFO, CHANGE_APP_TITLE])
    },
    computed: {
      ...mapGetters(['allRole', 'user']),
      taskDescr () {
        return util.getDutyDescr(this.task.taskid)
      },
      commentHint () {
        if (this.user._id !== this.task.userid) {
          return ''
        } else if (this.task.realendtime === 0) {
          return '按时完成，请直接点击\'完成\'按钮即可'
        } else {
          return '填写未完成原因'
        }
      },
      TASK_STATUS_INPROCESS () {
        return TASK_STATUS_INPROCESS
      },
      TASK_STATUS_UNFINISHED () {
        return TASK_STATUS_UNFINISHED
      },
      TASK_STATUS_FINISHED () {
        return TASK_STATUS_FINISHED
      },
      TASK_STATUS () {
        return TASK_STATUS
      }
    },
    created: function () {
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('员工任务详情')
      })
    },
    data () {
      return {
        formLabelWidth: '120px',
        labelPosition: 'right',
        selectedRoleName: [],
        task: this.$route.params.task,
        selectedDay: this.$route.params.date,
        showApprove: this.$route.params.showApprove,
        isCommitting: false
      }
    }
  }
</script>
<style>
  .raised-button {
    margin: 12px;
  }
</style>
