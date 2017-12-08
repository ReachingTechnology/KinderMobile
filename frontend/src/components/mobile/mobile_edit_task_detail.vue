<template>
  <div>
    <mu-text-field label="任务名称" v-model="task.name" disabled>
    </mu-text-field>
    <br/>
    <mu-text-field label="任务执行时间" v-model="task.executetime" disabled>
    </mu-text-field>
    <br/>
    <mu-text-field label="任务实际完成时间" v-show="task.realendtime !== 0" v-model="task.realendtimeDisplay"
                   disabled>
    </mu-text-field>
    <br/>
    <mu-text-field label="未完成原因" v-model="task.comment" multiLine :rows="2" :rowsMax="4">
    </mu-text-field>
    <br/>
    <mu-text-field label="完成状态" v-model="task.finish_status_display" disabled>
    </mu-text-field>
    <br/>
    <mu-select-field v-model="task.approve_status" label="工作审批" hintText="待审批" :disabled="this.task.userid === this.user._id">
      <mu-menu-item value=0   title="个人原因"/>
      <mu-menu-item value=1   title="工作安排"/>
    </mu-select-field>
    <br/>
    <div>
      <mu-raised-button style="display: inline-block" @click="cancelEdit" label="取消" class="raised-button" />
      <mu-raised-button style="display: inline-block" @click="commitEdit" :label="task.realendtime !== 0 ? '提交':'完成'" class="raised-button" backgroundColor="green"/>
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
  import dateUtil from '../../utils/DateUtil'
  export default {
    components: {},
    name: 'duty_edit_panel',
    methods: {
      tableRowClassName (row, index) {
        return ''
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
        navigator.geolocation.getCurrentPosition(this.translateLoc, this.onGetLocationError, {timeout: 3000, enableHighAccuracy: true})
      },
      commitInfo (lat, lng) {
        var finishTime = dateUtil.getNow()
        this.task.startofday = dateUtil.getStartOfTheday(this.selectedDay)
        var taskFinishInfo = {}
        taskFinishInfo.taskid = this.task.taskid
        taskFinishInfo.userid = this.task.userid
        taskFinishInfo.startofday = this.task.startofday
        taskFinishInfo.realendtime = finishTime
        taskFinishInfo.comment = this.task.comment
        taskFinishInfo.approve_status = this.task.approve_status
        taskFinishInfo.approve_user = this.task.approve_user
        taskFinishInfo.locationLat = lat
        taskFinishInfo.locationLng = lng
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
      ...mapGetters(['allRole', 'user'])
    },
    created: function () {
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('员工任务详情') })
    },
    data () {
      return {
        formLabelWidth: '120px',
        labelPosition: 'right',
        selectedRoleName: [],
        task: this.$route.params.task,
        selectedDay: this.$route.params.date,
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
