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
      <mu-raised-button style="display:inline-block" size="normal" label="编辑信息" @click.native="handleEdit" primary/>
      <mu-raised-button style="display:inline-block; margin-left: 50px" size="normal" label="退出登录" @click.native="handleLogout"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { USER_LOGIN } from '../../store/mutation_types'
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
      }
    },
    methods: {
      ...mapActions([USER_LOGIN])
    }
  }
</script>
<style scoped>

</style>
