<template>
  <div>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  v-for="(item, index) in informs" :disabled="enterEditMode" :title="item.name" :describeText="item.sendTimeDisplay" :value="item">
        <mu-avatar v-show="!enterEditMode" size="30" iconSize="20" :icon="getPriorityIcon(item)" :backgroundColor="getPriorityIconColor(item)" slot="leftAvatar"/>
        <mu-icon v-show="!enterEditMode" value="chevron_right" slot="right"/>
        <mu-checkbox v-show="enterEditMode" name="group" :nativeValue="item._id" v-model="selectedInforms" class="radio_class" slot="left"/>
        <!--<mu-icon value="chevron_right" slot="right"/>-->
        <mu-divider slot="default"/>
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

  .radio_class {
    width: 10px;
    height: 10px;
  }
</style>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import { CHANGE_APP_TITLE, GET_ALL_INFORM, SET_SHOULD_HAVE_TOPRIGHT_MENU, SET_TOPRIGHT_MENU_SETTING, REMOVE_INFORMS, EXIT_EDIT_MODE } from '../../store/mutation_types'
  //  import dateUtil from '../../utils/DateUtil'
  import Moment from 'moment'
  import {NOTIFY_PRIORITY} from '../../store/common_defs'

  export default {
    name: 'mobile_user_inform_management',
    methods: {
      itemClicked (row) {
        var item = row.value
        if (item.isNew) {
          this.CHECK_SINGLE_INFORM(item)
        }
        this.$router.push({name: 'editInformDetail', params:{inform: item}})
      },
      getData () {
        this.GET_ALL_INFORM()
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
        this.REMOVE_INFORMS(this.selectedInforms)
        this.EXIT_EDIT_MODE()
      },
      onExitEditMode () {
        console.log('cancel clicked')
        this.selectedInforms = []
        this.EXIT_EDIT_MODE()
      },
      ...mapActions([CHANGE_APP_TITLE, GET_ALL_INFORM, SET_SHOULD_HAVE_TOPRIGHT_MENU, SET_TOPRIGHT_MENU_SETTING, REMOVE_INFORMS, EXIT_EDIT_MODE])
    },
    watch: {
      enterEditMode (val) {
        if (val) {

        }
      }
    },
    computed: {
      ...mapGetters(['allInform', 'topRightMenuSetting', 'enterEditMode']),
      informs () {
        var data = []
        for (var i = 0, len = this.allInform.length; i < len; i++) {
          var item = this.allInform[i]
          item.sendTimeDisplay = '发送时间' + Moment(item.sendTime * 1000).format('YY年M月D日 H:mm')
          item.msgPriorityDisplay = NOTIFY_PRIORITY[item.notifyPriority]
          item.sendDate = Moment(item.sendTime * 1000).toDate()
          data.push(item)
        }
        return data
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('管理工作通知')
        vm.SET_SHOULD_HAVE_TOPRIGHT_MENU(true)
        var menuSetting = []
        menuSetting.push({title: '创建新通知', action: 'CREATE_NEW_INFORM'})
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
        selectedInforms: []
      }
    },
    components: {
    }
  }
</script>
