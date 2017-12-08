<template>
  <div align="center">
    <br/>
    <mu-avatar slot="center" icon="person" :size="100"></mu-avatar>
    <br/>
    <mu-text-field disabled="true" label="编号" v-model="currentUser._id" labelFloat/>
    <br/>
    <mu-text-field disabled="true" label="姓名" v-model="currentUser.name" labelFloat/>
    <br/>
    <mu-text-field disabled="true" label="岗位" v-model="currentUser.roleName" labelFloat/>
    <br/>
    <div>
      <!--<mu-raised-button style="display:inline-block" size="normal" label="修改密码" @click.native="handleChgPass" primary/>-->
      <mu-raised-button style="display:inline-block" size="normal" label="退出登录" @click.native="handleLogout"/>
    </div>
    <mu-dialog :open="askLogout" title="退出" @close="closeLogoutDialog">
      确认退出系统？
      <mu-flat-button slot="actions" @click="closeLogoutDialog" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="logout" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { USER_LOGOUT, CHANGE_APP_TITLE } from '../../store/mutation_types'
  import ObjUtil from '../../utils/ObjUtil'
  import Util from '../../store/utils'

  export default {
    name: 'app',
    components: {
    },
    computed: {
      ...mapGetters(['user']),
      currentUser () {
        var data = {}
        data = ObjUtil.clone(this.user)
        data.roleName = Util.getRoleNames(this.user.role)
        return data
      }
    },
    data: () => {
      return {
        askLogout: false
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('个人中心') })
    },
    methods: {
      handleLogout () {
        this.askLogout = true
      },
      closeLogoutDialog () {
        this.askLogout = false
      },
      logout () {
        this.askLogout = false
        this.USER_LOGOUT()
      },
      handleChgPass () {

      },
      ...mapActions([CHANGE_APP_TITLE, USER_LOGOUT])
    }
  }
</script>
<style scoped>

</style>
