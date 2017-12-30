<template>
  <div style="width: 50%; margin: auto">
    <el-form :model="formData" :label-width="formLabelWidth" :label-position="labelPosition" ref="ruleForm"
             :rules="rules">
      <el-form-item label="旧密码" prop="old_pass">
        <el-input v-model="formData.old_pass" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pass">
        <el-input v-model="formData.pass" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码">
        <el-input v-model="formData.checkPass" type="password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--<el-button @click="cancelEdit">取消</el-button>-->
      <el-button type="primary" @click="commitEdit">提交</el-button>
    </span>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  import {USER_CHANGE_PASS, CHANGE_APP_TITLE} from '../store/mutation_types'

  export default {
    components: {},
    name: 'change_password_panel',
    methods: {
      commitEdit () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.formData.user_id = this.user._id
            this.USER_CHANGE_PASS(this.formData)
          }
        })
      },
      ...mapActions([USER_CHANGE_PASS, CHANGE_APP_TITLE])
    },
    computed: {
      ...mapGetters(['user', 'changePassFail'])
    },
    beforeRouteEnter: function (to, from, next) {
      next(vm => { vm.CHANGE_APP_TITLE('更改密码') })
    },
    watch: {
      changePassFail: function (val, oldVal) {
        if (val && !oldVal) {
          alert('更新密码失败，请确认旧密码是否正确！')
          this.$refs['ruleForm'].resetFields()
        }
        if (!val && oldVal) {
          this.$refs['ruleForm'].resetFields()
          this.$router.go(-1)
        }
      }
    },
    props: ['dialogVisible'],
    created: function () {
    },
    data: function () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.data.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      };
      return {
        formLabelWidth: '120px',
        labelPosition: 'right',
        formData: {user_id: '', old_pass: '', pass: '', checkPass: ''},
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    }
  }
</script>
