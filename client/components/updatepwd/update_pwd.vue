<template>
  <div class="index-remind">
    <sino-title type="levelOne" title="修改密码"></sino-title>
    <sino-form autoComplete="on" :model="updatePwdForm"
               :rules="updatePwdRules" ref="updatePwdForm"
               label-position="left"
               label-width="0px"
               :justText="true" class="update-pwd-form">
      <sino-form-item prop="oldPwd">
        <span class="fl">原密码：</span>
        <sino-input class="fl" placeholder="请输入原密码" type="password" auto-complete="off" v-model="updatePwdForm.oldPwd"></sino-input>
      </sino-form-item>
      <sino-form-item prop="newPwd">
        <span class="fl">新密码：</span>
        <sino-input class="fl" placeholder="请输入新密码" type="password" auto-complete="off" v-model="updatePwdForm.newPwd"></sino-input>
      </sino-form-item>
      <sino-form-item prop="arginNewPwd">
        <span class="fl">确认新密码：</span>
        <sino-input class="fl" placeholder="请再次输入新密码" type="password" v-model="updatePwdForm.arginNewPwd"></sino-input>
      </sino-form-item>
      <sino-form-item>
        <span class="fl"></span>
        <sino-button type="primary" :loading="loading" @click.native.prevent="handleUpdatePwd">确 定</sino-button>
      </sino-form-item>
    </sino-form>
  </div>
</template>
<script>
  import api from '../../api';
  import store from '../../store';
  import Cookies from 'js-cookie';

  export default {
    data () {
      const validateOldPas = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      const validateNewPwd = (rule, value, callback) => {
        if (value.length < 1) {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };
      let validateArginNewPwd = (rule, value, callback) => {
        let _this = this;
        if (value === undefined || value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== _this.updatePwdForm.newPwd) {
          callback(new Error('请与新密码输入一致'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        updatePwdForm: {
          oldPwd: '',
          newPwd: '',
          arginNewPwd: ''
        },
        updatePwdRules: {
          oldPwd: [
            {required: true, trigger: 'blur', validator: validateOldPas}
          ],
          newPwd: [
            {required: true, trigger: 'blur', validator: validateNewPwd},
            { min: 1, message: '请输入1-16位的字母和数字的组合', trigger: 'blur' }
          ],
          arginNewPwd: [
            {required: true, trigger: 'blur', validator: validateArginNewPwd}
          ]
        }
      };
    },
    methods: {
      updateFun (res) {
        let _this = this;
        if (res.code === 'CPYY-00001') {
          _this.$alert('修改密码成功！<br>点击确定返回登录界面', '提示信息', {
            confirmButtonText: '确 定',
            type: 'success',
            dragFlag: true,
            customClass: '',
            lockScroll: true,
            callback: action => {
              store.commit('saveToken', {token: ''});
              store.commit('saveInfo', {
                roles: [],
                avatar: '',
                name: ''
              });
              Cookies.set('CPYY-TOKEN', '');
              _this.loading = false;
              _this.$router.push({path: '/login'});
            }
          });
        } else if (res.code === 'CPYY-00142') {
          _this.loading = false;
          _this.$refs.updatePwdForm.$children[1].validateState = 'error';
          _this.$refs.updatePwdForm.$children[1].validateMessage = res.message;
        } else {
          _this.loading = false;
          for (let i = 0; i < _this.$refs.updatePwdForm.$children.length; i++) {
            if (_this.$refs.updatePwdForm.$children[i].prop === 'oldPwd') {
              _this.$refs.updatePwdForm.$children[i].validateState = 'error';
              _this.$refs.updatePwdForm.$children[i].validateMessage = res.message;
            }
          }
        }
      },
      handleUpdatePwd () {
        const _this = this;
        _this.loading = true;
        setTimeout(function () {
          _this.$refs.updatePwdForm.validate(valid => {
            if (valid) {
              _this.updatePwdForm.loginName = Cookies.get('CPYY-LOGIN-NAME');
              api.post(_this.apiPath.author.updateUserPwdByLoginName, _this.updatePwdForm).then(res => {
                this.updateFun(res);
              }).catch(err => {
                console.log(err);
              });
            } else {
              _this.loading = false;
            }
          });
        }, 500);
      }
    }
  };
</script>
