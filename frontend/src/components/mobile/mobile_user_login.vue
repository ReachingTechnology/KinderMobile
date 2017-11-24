<template>
  <div align="center">
    <mu-text-field label="员工编号" hintText="请输入员工编号或手机号" v-model="user_login_data.userid" labelFloat/>
    <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="user_login_data.pass" labelFloat/>
    <mt-button size="normal" @click.native="cancellogin">取消</mt-button>
    <mt-button size="normal" @click.native="commitlogin">登录</mt-button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { USER_LOGIN } from '../../store/mutation_types'
  export default {
    name: 'app',
    components: {
    },
    computed: {
    },
    data: () => {
      return {
        user_login_data: {'userid': '', 'pass': ''}
      }
    },
    methods: {
      ...mapActions([USER_LOGIN]),
      commitlogin: function () {
        this.USER_LOGIN(this.user_login_data)
        this.user_login_data = {'userid': '', 'pass': ''}
      },
      cancellogin: function () {
        this.user_login_data = {'userid': '', 'pass': ''}
      }
    }
  }
</script>
<style scoped>

</style>
