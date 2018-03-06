<template>
  <div align="center">
    <br/>
    <mu-avatar slot="center" icon="person" :size="100"></mu-avatar>
    <br/>
    <mu-text-field :disabled="true" label="编号" v-model="currentUser._id" labelFloat/>
    <br/>
    <mu-text-field :disabled="true" label="姓名" v-model="currentUser.name" labelFloat/>
    <br/>
    <mu-text-field :disabled="true" label="岗位" v-model="currentUser.roleName" labelFloat/>
    <br/>
    <div>
      <mu-raised-button style="display:inline-block" size="normal" label="修改密码" @click.native="handleChgPass" primary/>
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
  import { USER_LOGOUT, GET_CURRENT_USER, CHANGE_APP_TITLE, SET_ROOT_VIEW } from '../../store/mutation_types'
  import ObjUtil from '../../utils/ObjUtil'
  import Util from '../../store/utils'

  export default {
    name: 'app',
    components: {
    },
    computed: {
      ...mapGetters(['user', 'backend_uri']),
      currentUser () {
        var data = {}
        data = ObjUtil.clone(this.user)
        data.roleName = Util.getRoleNames(this.user.role)
        data.avatarUrl = this.user.avatarUrl
        return data
      }
    },
    data: () => {
      return {
        askLogout: false
      }
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => {
        vm.CHANGE_APP_TITLE('个人中心')
        vm.SET_ROOT_VIEW(true)
      })
    },
    beforeRouteLeave: function (to, from, next) {
      this.SET_ROOT_VIEW(false)
      next()
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
        this.$router.push({ name: 'userLogin' })
      },
      handleChgPass () {
        this.$router.push({name: 'changePass'})
      },
      handleAvatarSuccess (res, file) {
        this.currentUser.avatarUrl = URL.createObjectURL(file.raw)
        this.GET_CURRENT_USER()
      },
//      beforeAvatarUpload (file) {
//        const isJPG = file.type === 'image/jpeg'
//        const isLt2M = file.size / 1024 / 1024 < 2
//
//        if (!isJPG) {
//          this.$message.error('Avatar picture must be JPG format!')
//        }
//        if (!isLt2M) {
//          this.$message.error('Avatar picture size can not exceed 2MB!')
//        }
//        return isJPG && isLt2M
//      },
      ...mapActions([GET_CURRENT_USER, CHANGE_APP_TITLE, USER_LOGOUT, SET_ROOT_VIEW])
    }
  }
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
