<template>
  <div align="center">
    <mu-text-field label="旧密码" v-model="old_pass" type="password" labelFloat :errorText="oldPassError"/>
    <br/>
    <mu-text-field label="新密码" v-model="pass" type="password" labelFloat/>
    <br/>
    <mu-text-field label="再次输入新密码" v-model="check_pass" type="password" labelFloat :errorText="checkPassError" @blur="checkPass"/>
    <br/>
    <div>
      <mu-raised-button style="display: inline-block" @click="cancelChange" label="取消" class="raised-button" />
      <mu-raised-button style="display: inline-block" @click="commitChange" label="更改" class="raised-button" backgroundColor="green"/>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import {USER_CHANGE_PASS, CHANGE_APP_TITLE} from '../../store/mutation_types'

  export default {
    components: {},
    name: 'change_password_panel',
    methods: {
      commitChange () {
        if (this.checkPass()) {
          var param = {}
          param.userid = this.user._id
          param.pass = this.pass
          param.oldpass = this.old_pass
          this.USER_CHANGE_PASS(param)
        }
      },
      resetFields () {
        this.pass = ''
        this.old_pass = ''
        this.check_pass = ''
      },
      cancelChange () {
        this.resetFields()
        this.$router.go(-1)
      },
      checkPass () {
        if (this.pass !== this.check_pass) {
          this.checkPassError = '输入密码不一致'
          return false
        } else {
          this.checkPassError = ''
          return true
        }
      },
      ...mapActions([USER_CHANGE_PASS, CHANGE_APP_TITLE])
    },
    computed: {
      ...mapGetters(['user', 'changePassStatus'])
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('更改密码') })
    },
    watch: {
      changePassStatus: function (val, oldVal) {
        if (val === 0) {
          alert('更新密码成功')
          this.resetFields()
          this.$router.go(-1)
        }
        if (val === -1) {
          this.resetFields()
          alert('更新密码失败，请确认旧密码是否正确！')
        }
      }
    },
    props: ['dialogVisible'],
    created: function () {
    },
    data: function () {
      return {
        old_pass: '',
        pass: '',
        check_pass: '',
        checkPassError: ''
      }
    }
  }
</script>
