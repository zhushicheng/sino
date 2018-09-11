<template>
  <div class="login">
    <!--忘记密码-->
    <div class="login_box">
      <div class="login-box-step">
        <sino-steps :space="220" :active="active" finish-status="success">
          <sino-step :title="list.title" :description="list.description" v-for="(list,index) in lists" :key="index">
          </sino-step>
        </sino-steps>
      </div>
      <div class="login-box-stepcon">
        <!--step 1-->
        <sino-form autoComplete="on" :model="activeOneForm"
                   v-show="active == 0"
                   :rules="activeOneRules"
                   ref="activeOneForm"
                   label-position="left"
                   label-width="0px"
                   :justText="true" class="login-box-stepform">
          <sino-form-item prop="loginName" :justText="true">
            <span class="fl">用户名：</span>
            <input type="text" placeholder="请输入用户名" v-model="activeOneForm.loginName" name="loginName">
          </sino-form-item>
          <sino-form-item prop="validNum" :justText="true">
            <span class="fl">邮箱验证码：</span>
            <input type="text" placeholder="请输入邮箱验证码" v-model="activeOneForm.validNum" name="validNum"/>
            <span class="span-btn" v-on:click="validateCode" :class="disabled?'dissendSmsBtn':''" :disabled="disabled">{{message}}</span>
            <p v-if="validateCodeFlag"><i></i>验证码已发送，请到邮箱查看</p>
          </sino-form-item>
          <sino-form-item>
            <span class="fl"></span>
            <sino-button type="primary" :loading="loading" @click.native.prevent="activeOne">下一步</sino-button>
            <sino-button type="text"><router-link :to="'/login'">取消</router-link></sino-button>
          </sino-form-item>
        </sino-form>
        <!--step 2-->
        <sino-form autoComplete="on"
                   v-show="active == 1"
                   :model="activeSecondForm"
                   :rules="activeSecondRules"
                   ref="activeSecondForm"
                   label-position="left"
                   label-width="0px"
                   :justText="true" class="login-box-stepform">
          <sino-form-item prop="newPwd" :justText="true">
            <span class="fl">新密码：</span>
            <input type="password" placeholder="请输入新密码" v-model="activeSecondForm.newPwd" name="newPwd">
          </sino-form-item>
          <sino-form-item prop="renewPwd" :justText="true">
            <span class="fl">确认新密码：</span>
            <input type="password" placeholder="请再次输入新密码" v-model="activeSecondForm.renewPwd" name="renewPwd"/>
          </sino-form-item>
          <sino-form-item>
            <span class="fl"></span>
            <sino-button type="primary" :loading="loading" @click="activeSecond">下一步</sino-button>
            <sino-button type="text" @click="active = 0;">取消</sino-button>
          </sino-form-item>
        </sino-form>
        <!--step 3-->
        <div class="login-box-stepform login-box-suc" v-show="active == 2">
          <div class="login-box-icon">
            <i class="iconfont sino-duigou"></i>
          </div>
          <h6>恭喜您，密码找回成功</h6>
          <sino-button type="primary" :loading="loading" @click="login">立即登录</sino-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import api from '../../api';

  let sec = 60;
  export default {
    name: 'forgetPwd',
    components: {
    },
    data () {
      return {
        time: 0,
        disabled: false,
        message: '获取验证码',
        validateCodeFlag: false,
        activeOneForm: {
          loginName: '',
          validNum: ''
        },
        activeSecondForm: {
          newPwd: '',
          renewPwd: ''
        },
        activeOneRules: {
          loginName: [
            {required: true, trigger: 'blur', message: '请输入用户名'}
          ],
          validNum: [
            {required: true, trigger: 'blur', message: '请输入邮箱验证码'}
          ]
        },
        activeSecondRules: {
          newPwd: [
            {required: true, trigger: 'blur', message: '请输入新密码'}
          ],
          renewPwd: [
            {required: true, trigger: 'blur', message: '请再次输入新密码'}
          ]
        },
        loading: false,
        active: 0,
        lists: [
          {title: '验证身份', description: ''},
          {title: '重置密码', description: ''},
          {title: '找回成功', description: ''}
        ]
      };
    },
    methods: {
      // 登录
      login () {
        this.active = 0;
        this.activeSecondForm = {};
        this.activeOneForm = {};
        this.$router.push({path: '/login'});
      },
      stepOneFun (_data) {
        let _this = this;
        api.post(_this.apiPath.author.createValidNumToEmail, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.$refs.activeOneForm.$children[0].validateState = 'success';
            _this.$refs.activeOneForm.$children[0].validateMessage = '';
            _this.validateCodeFlag = true;
            _this.message = '重新获取';
            return;
          }
          if (res.code === 'CPYY-00130') {
            _this.$refs.activeOneForm.$children[0].validateState = 'success';
            _this.$refs.activeOneForm.$children[0].validateMessage = '';
            _this.$refs.activeOneForm.$children[1].validateMessage = '';
            _this.validateCodeFlag = true;
            if (_this.disabled === true) {
              return;
            }
            let _t = setInterval(function () {
              if (sec === 0) {
                sec = 60;// 如果倒计时结束就让  获取验证码显示出来
                _this.message = '重新获取';
                _this.disabled = false;
                clearInterval(_t);
                _t = null;
              } else {
                _this.message = sec + '秒后重发';
                _this.disabled = true;
                sec--;
              }
            }, 1000);
          } else {
            _this.$refs.activeOneForm.$children[0].validateState = 'error';
            _this.$refs.activeOneForm.$children[0].validateMessage = res.message;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // step 1 获取验证码
      validateCode () {
        let _this = this;
        if (_this.activeOneForm.loginName === '' || _this.activeOneForm.loginName === undefined) {
          _this.$refs.activeOneForm.$children[0].validateState = 'error';
          _this.$refs.activeOneForm.$children[0].validateMessage = '用户名不能为空';
          return;
        } else {
          const _data = {
            'loginName': this.activeOneForm.loginName
          };
          if (sec !== 60) {
            return;
          }
          this.stepOneFun(_data);
        }
      },
      // step 1 submit
      activeOne () {
        const _this = this;
        _this.loading = true;
        _this.$refs.activeOneForm.validate(valid => {
          if (valid) {
            api.post(_this.apiPath.author.validEmailNumByLoginName, _this.activeOneForm).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.active++;
                _this.loading = false;
              } else {
                _this.loading = false;
                _this.$refs.activeOneForm.$children[1].validateState = 'error';
                _this.$refs.activeOneForm.$children[1].validateMessage = res.message;
                _this.validateCodeFlag = false;
              }
            }).catch(err => {
            });
          } else {
            _this.validateCodeFlag = false;
            _this.loading = false;
          }
        });
      },
      // step 2 submit
      activeSecond () {
        const _this = this;
        _this.loading = true;
        _this.$refs.activeSecondForm.validate(validFlag => {
          if (validFlag) {
            if (_this.activeSecondForm.newPwd !== _this.activeSecondForm.renewPwd) {
              _this.loading = false;
              _this.$refs.activeSecondForm.$children[1].validateState = 'error';
              _this.$refs.activeSecondForm.$children[1].validateMessage = '请保持两次输入密码一致！';
              return;
            }
            _this.activeSecondForm.loginName = _this.activeOneForm.loginName;
            api.post(_this.apiPath.author.updateResetUserPwd, _this.activeSecondForm).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.active++;
                _this.loading = false;
              } else {
                _this.loading = false;
                _this.$refs.activeSecondForm.$children[1].validateState = 'error';
                _this.$refs.activeSecondForm.$children[1].validateMessage = res.message;
              }
            }).catch(err => {
            });
          } else {
            _this.loading = false;
          }
        });
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/style/base.css";
  @import "../../assets/style/login.css";

  html, body, #app {
    width: 100%;
    height: 100%;
  }

  .login {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login_bg.jpg") no-repeat;
    background-size: cover;
  }
</style>
