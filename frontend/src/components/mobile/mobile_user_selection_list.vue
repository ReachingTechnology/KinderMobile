<template>
  <div>
    <mu-list @itemClick="itemClicked">
      <mu-list-item  v-for="item in userData" :title="item.name" :describeText="item.roleDisplay" :value="item">
        <mu-avatar size="20" iconSize="15" :icon="getSelectedIcon(item)" color="green" backgroundColor="white" slot="rightAvatar"/>
        <mu-divider slot="default"/>
      </mu-list-item>
    </mu-list>
    <div class="edit_button_container">
      <div class="edit_button edit_button_left" @click="onCancel">
        取消
      </div><div class="edit_button edit_button_right" @click="onOk">
      确定
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
  import { CHANGE_APP_TITLE, GET_INFORM_BY_USER, CHECK_SINGLE_INFORM } from '../../store/mutation_types'
  //  import dateUtil from '../../utils/DateUtil'
  import Moment from 'moment'
  import {NOTIFY_PRIORITY} from '../../store/common_defs'
  import Util from '../../store/utils'
  import ArrayUtil from '../../utils/ArrayUtil'

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
        if(this.singleSelection){
          if (this.isSelected(row.value)) {
            //do nothing
          } else {
            this.selectedData = []
            this.selectedData.push(row.value._id)
          }
        }else {
          if (this.isSelected(row.value)) {
            ArrayUtil.remove(row.value._id, this.selectedData)
          } else {
            this.selectedData.push(row.value._id)
          }
        }
      },
      isSelected (item) {
        if (ArrayUtil.in_array(item._id, this.selectedData)) {
          return true
        }
        return false
      },
      getSelectedIcon (item) {
        if (this.isSelected(item)) {
          return 'radio_button_checked'
        }
        return 'radio_button_unchecked'
      },
      onCancel () {
        this.confirmSelection = false
        this.$router.go(-1)
      },
      onOk () {
        this.confirmSelection = true
        this.$router.go(-1)
      },
      ...mapActions([CHANGE_APP_TITLE, GET_INFORM_BY_USER, CHECK_SINGLE_INFORM])
    },
    computed: {
      ...mapGetters(['allUser', 'user']),
      userData () {
        console.log('this', this)
        var data = []
        for (var i = 0, len = this.allUser.length; i < len; i++) {
          var item = this.allUser[i]
          var roleNames = Util.getRoleNames(item.role)
          item.roleDisplay = roleNames.join(' ')
          if(item._id === this.user._id){
            data.unshift(item)
          }else{
            data.push(item)
          }
        }
        return data
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE(vm.$route.params.title)
      })
    },
    beforeRouteLeave: function (to, from, next) {
      if (this.confirmSelection) {
        var result = {}
        result.tag = this.tag
        result.selectedData = this.selectedData
        to.params.selectedResult = result
      }
      to.params.inform = this.inform
      next()
    },
    props: [],
    data: function() {
      return {
        selectedData: this.$route.params.selectedData,
        title: this.$route.params.title,
        singleSelection: this.$route.params.singleSelection,
        tag: this.$route.params.tag,
        confirmSelection: false,
        inform: this.$route.params.inform
      }
    },
    components: {
    }
  }
</script>
