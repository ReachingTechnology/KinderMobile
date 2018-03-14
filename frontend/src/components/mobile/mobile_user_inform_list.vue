<template>
  <div>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  v-for="item in messages" :title="item.name" :disabled="enterEditMode" :describeText="item.msgArriveTimeDisplay" :value="item">
        <mu-avatar v-show="!enterEditMode" size="30" iconSize="20" :icon="getPriorityIcon(item)" :backgroundColor="getPriorityIconColor(item)" slot="leftAvatar"/>
        <mu-avatar v-show="!enterEditMode" size="20" iconSize="15" v-show="!item.isNew" icon="done" backgroundColor="green" slot="rightAvatar"/>
        <mu-checkbox v-show="enterEditMode" name="group" :nativeValue="item._id" v-model="selectedInforms" class="radio_class" slot="left"/>
        <!--<mu-icon value="chevron_right" slot="right"/>-->
        <mu-divider slot="default"/>
        <mu-badge v-show="!enterEditMode" content="new" secondary v-show="item.isNew" slot="rightAvatar"/>
      </mu-list-item>
    </mu-list>
    <div v-show="enterEditMode" class="edit_button_container">
      <div class="edit_button edit_button_left" @click="onRemoveSelectedInforms">
        删除
      </div><div class="edit_button edit_button_right" @click="onExitEditMode">
      取消
    </div>
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
</style>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { CHANGE_APP_TITLE, GET_INFORM_BY_USER, CHECK_SINGLE_INFORM, REMOVE_USER_INFORMS, SET_SHOULD_HAVE_TOPRIGHT_MENU, SET_TOPRIGHT_MENU_SETTING, EXIT_EDIT_MODE } from '../../store/mutation_types'
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
      itemClicked (row) {
        var item = row.value
        if (item.isNew) {
          this.CHECK_SINGLE_INFORM(item)
        }
        this.$router.push({name: 'userInformDetail', params:{inform: item}})
      },
      getData () {
        this.GET_INFORM_BY_USER({'pageNum': 0})
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
      onRemoveSelectedInforms () {
        console.log('delete clicked')
        this.REMOVE_USER_INFORMS(this.selectedInforms)
        this.EXIT_EDIT_MODE()
      },
      onExitEditMode () {
        console.log('cancel clicked')
        this.selectedInforms = []
        this.EXIT_EDIT_MODE()
      },
      ...mapActions([CHANGE_APP_TITLE, GET_INFORM_BY_USER, CHECK_SINGLE_INFORM, REMOVE_USER_INFORMS, SET_SHOULD_HAVE_TOPRIGHT_MENU, SET_TOPRIGHT_MENU_SETTING, EXIT_EDIT_MODE])
    },
    watch: {
      userInform (val) {
        if (val === undefined || val.length === 0) {
          this.SET_SHOULD_HAVE_TOPRIGHT_MENU(false)
        } else {
          this.SET_SHOULD_HAVE_TOPRIGHT_MENU(true)
        }
      }
    },
    computed: {
      ...mapGetters(['userInform', 'enterEditMode']),
      messages () {
        var data = []
        for (var i = 0, len = this.userInform.length; i < len; i++) {
          var item = this.userInform[i]
          item.msgArriveTimeDisplay = Moment(item.sendTime * 1000).format('YY年M月D日 H:mm')
          item.msgPriorityDisplay = NOTIFY_PRIORITY[item.notifyPriority]
          data.push(item)
        }
        return data
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('工作通知')
        vm.SET_SHOULD_HAVE_TOPRIGHT_MENU(true)
        var menuSetting = []
        menuSetting.push({title: '删除通知', action: 'ENTER_EDIT_MODE'})
        vm.SET_TOPRIGHT_MENU_SETTING(menuSetting)
        vm.getData()
      })
    },
    beforeRouteLeave: function (to, from, next) {
      this.EXIT_EDIT_MODE()
      this.SET_SHOULD_HAVE_TOPRIGHT_MENU(false)
      next()
    },
    props: [],
    data: () => {
      return {
        selectedData: {},
        selectedInforms:[]
      }
    },
    components: {
    }
  }
</script>
