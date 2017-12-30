<template>
  <div align="center">
    <br/>
    <img src="logo.png" width="100px" height="100px"/>
    <br/>
    <mu-text-field label="员工编号" hintText="请输入员工编号或手机号" v-model="user_login_data.userid" labelFloat/>
    <br/>
    <mu-text-field label="密码" hintText="请输入密码" type="password" v-model="user_login_data.pass" labelFloat/>
    <br/>
    <div>
      <mu-raised-button style="display: inline-block" @click="cancellogin" label="取消" class="raised-button" />
      <mu-raised-button style="display: inline-block" @click="commitlogin" label="登录" class="raised-button" backgroundColor="green"/>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { USER_LOGIN, CHANGE_APP_TITLE } from '../../store/mutation_types'
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
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('幼儿园安保系统') })
    },
    methods: {
      ...mapActions([USER_LOGIN, CHANGE_APP_TITLE]),
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
