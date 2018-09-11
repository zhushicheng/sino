<template>
  <div class="login">
    <div class="common-box" v-if="!chooseFlag" :class="{'common-login-lock':!isCode,'':isCode}">
      <div class="common-box-l fl">
        <img src="../../assets/img/common-login-l.png"/>
      </div>
      <div class="common-box-r fl">
        <div class="common-box-con">
          <div class="common-box-h3">
            <img src="../../assets/img/common-login-logo.png" alt="" class="fl">
            <h3 class="fl ml15">人力资源管理平台</h3>
          </div>
          <sino-form autoComplete="on"  :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" :justText="true" class="common-box-form">
            <sino-form-item prop="username" :justText="true">
              <span class="common-box-span">用户名</span>
              <input type="text" @keyup.enter="handleLogin" v-model="loginForm.username" name="username" class="common-box-input">
            </sino-form-item>
            <sino-form-item prop="password" :justText="true">
              <span class="common-box-span">密码</span>
              <input type="password" @keyup.enter="handleLogin"  v-model="loginForm.password" name="password" class="common-box-input"/>
            </sino-form-item>
            <sino-form-item prop="validNum" :justText="true" v-if="isCode === false">
              <span class="common-box-span">验证码</span>
              <div class="common-box-code">
                <input type="text" v-model="loginForm.validNum" name="validNum" @keyup.enter="handleLogin"/>
                <div class="login-code" @click="getImgCode">
                  <img :src="imgUrl"/>
                </div>
              </div>
            </sino-form-item>
            <sino-form-item class="common-box-checkbox">
              <div class="checkbox-custom checkbox-default">
                <input type="checkbox" id="RememberMe">
                <label for="RememberMe"><span>记住密码</span></label>
              </div>
            </sino-form-item>
            <sino-form-item class="common-box-last">
              <sino-button class="common-box-btn fl" :loading="loading" @click.native.prevent="handleLogin">登 录</sino-button>
              <router-link class="common-box-a fr" :to="'/forgetPwd'">忘记密码？</router-link>
              <!--<a class="common-box-a fr" style="margin-right: 10px" @click="vedioFun">员工认证</a>-->
            </sino-form-item>
          </sino-form>
        </div>
      </div>
    </div>
    <!--选择角色-->
    <div class="choose-box" v-if="chooseFlag">
      <div class="choose-header">
        <h5><i></i><span>请选择角色</span><i></i></h5>
        <i class="iconfont sino-cuowu1" @click="loginBack"></i>
      </div>
      <div class="choose-con">
        <sino-scrollbar class="sino-login-scrollbar" noresize>
          <div class="choose-scroll">
            <ul class="choose-ul">
              <li class="li-all">
                <sino-radio v-model.number="loginConfigInfo.userRoleId" :label="0">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">全部角色</span>
                  </div>
                </sino-radio>
              </li>
              <li v-for="list in chooseRoleList">
                <sino-radio v-model.number="loginConfigInfo.userRoleId" :label="list.userRoleId">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span" v-text="list.roleName"></span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span v-text="list.corpName"></span>
                      <i class="iconfont sino-org"></i><span v-text="list.orgName"></span>
                    </div>
                  </div>
                </sino-radio>
              </li>
              <!--<li>
                <sino-radio v-model="loginConfigInfo.userRoleId" label="2">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">系统管理员</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>-->
            </ul>
          </div>
        </sino-scrollbar>
        <div class="choose-div">
          <sino-checkbox v-model="loginConfigInfo.isDefault">记住当前选择，下次登录不再提示。</sino-checkbox>
          <div class="choose-radio" v-if="(loginConfigInfo.isDefault === true && loginConfigInfo.userRoleId === 0) || (loginConfigInfo.isDefault === 1 && loginConfigInfo.userRoleId === 0)">
            <sino-radio v-model="loginConfigInfo.defaultType" :label="1">菜单有无冲突都直接登录</sino-radio>
            <sino-radio v-model="loginConfigInfo.defaultType" :label="2">菜单有冲突时，重新选择角色</sino-radio>
          </div>
        </div>
        <sino-button class="choose-btn" :loading="loadingEnter" @click="chooseRoleSubmit(loginConfigInfo.userRoleId)">进入系统</sino-button>
      </div>
    </div>
    <sino-dialog dialogHide :visible.sync="vedioFlag" top="5%" size="lagre"  @close=""  class="usermanage dialog-com-tree-look-box vedioRecord">
      <!--<sino-title slot="title" type="levelOne" :title="" class="sino-dialog-title"></sino-title>-->
      <div class="usermanagement-modify1 clearfix">
        <record-page v-on:closeVedio="acceptVedioData" :isEnter.sync="vedioFlag"></record-page>
      </div>
    </sino-dialog>
    <sino-dialog :visible.sync="vedioMsgFlag" top="15%" size="small"  @close=""  class="usermanage dialog-com-tree-look-box vedioRecord1">
      <!--<sino-title slot="title" type="levelOne" title="视频认证" class="sino-dialog-title"></sino-title>-->
      <div class="usermanagement-modify1 clearfix">
        <p>员工认证</p>
        <p>
          <span>员工姓名：</span>{{vedioData.userInfo}}
        </p>
        <p>
          <span>认证号码：</span>{{vedioData.userId}}
        </p>
      </div>
      <span slot="footer" class="dialog-footer industrial-footer">
      <sino-button type="primary" @click="vedioMsgFlag=false;$router.push(commPath)">确  定</sino-button>
      <!--<sino-button  @click="newMatConFun">保 存</sino-button>-->
      </span>
    </sino-dialog>

  </div>
</template>

<script>
  import api from '../../api';
  import store from '../../store';
  import Cookies from 'js-cookie';
  import apiPath from '../../api/path';
  import recordPage from './vedio/record';

  export default {
    name: 'Login',
    components: {recordPage},
    data () {
//      const validateUser = (rule, value, callback) => {debugger
//        if (value.length < 1) {
//          callback(new Error('请输入用户名'));
//        } else {
//          callback();
//        }
//      };
//      const validatePass = (rule, value, callback) => {debugger
//        if (value.length < 6) {
//          callback(new Error('密码不能小于6位'));
//        } else {
//          callback();
//        }
//      };
//      const validateEmail = (rule, value, callback) => {debugger
//        if (value.length < 6) {
//          callback(new Error('邮箱验证码不能小于6位'));
//        } else if (value.length > 12) {
//          callback(new Error('邮箱验证码不能大于12位'));
//        } else {
//          callback();
//        }
//      };
      return {
        vedioFlag: false,
        vedioMsgFlag: false,
        loginForm: {
          username: '',
          password: '',
          validNum: ''
        },
        loginRules: {
          username: [
            {required: true, trigger: 'blur', message: '请输入用户名'}
          ],
          password: [
            {required: true, trigger: 'blur', message: '请输入密码'}
          ],
          validNum: [
            {required: true, trigger: 'blur', message: '请输入验证码'}
          ]
        },
        loading: false,
        loadingEnter: false,
        isCode: true,
        chooseFlag: false,
        loginConfigInfo: {
          roleId: '',
          userRoleId: 0,
          defaultType: '',
          isDefault: false
        },
        chooseRoleList: [],
        imgUrl: '',
        vedioData: {
          groupId: '',
          userInfo: ''
        },
        commPath: ''
      };
    },
    watch: {
      'loginConfigInfo.isDefault': function (newValue) {
        if (newValue === true || newValue === 1) {
          this.loginConfigInfo.defaultType = 1;
        } else {
          this.loginConfigInfo.defaultType = '';
        }
      }
    },
    methods: {
      // s视频
      vedioFun () {
        this.vedioFlag = true;
      },
      acceptVedioData (data) {
        // console.log(data);
        this.vedioMsgFlag = true;
        this.vedioFlag = false;
        this.vedioData = data;
      },
      // 登录
      handleLogin () {
        const _this = this;
        _this.loading = true;
        setTimeout(function () {
          toLogin(_this);
        }, 500);
      },
      // 获取图片验证码
      getImgCode () {
        let _data = {
          loginName: this.loginForm.username
        };
        api.post(apiPath.author.findLoginValidNumByLoginName, _data).then(res => {
          this.imgUrl = 'data:image/jpg;base64,' + res.data;
        });
      },
      // 选择角色提交
      chooseRoleSubmit (userRoleId) {
        this.loadingEnter = true;
        this.loginConfigInfo.roleId = userRoleId;
        let _loginConfigInfo = JSON.parse(JSON.stringify(this.loginConfigInfo));
        if (_loginConfigInfo.isDefault === true) {
          _loginConfigInfo.isDefault = 1;
        } else {
          _loginConfigInfo.isDefault = 0;
        }
        let _data = {
          userRoleId: userRoleId,
          loginConfigInfo: _loginConfigInfo
        };
        api.post(this.apiPath.author.addOrUpdateLoginConfigByUser, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            if (this.loginConfigInfo.userRoleId !== 0) {
              Cookies.set('userRoleId', res.data.loginUser.userRole.userRoleId);
              Cookies.set('RoleId', res.data.loginUser.userRole.roleId);
              store.commit('saveInfo', {
                userRoleId: res.data.loginUser.userRole.userRoleId,
                roleId: res.data.loginUser.userRole.roleId
              });
              if (res.data.loginUser.role && res.data.loginUser.role.roleType) {
                store.commit('saveInfo', {
                  roleType: res.data.loginUser.role.roleType
                });
              }
              Cookies.set('roleType', res.data.loginUser.role.roleType);
//              for (let i = 0; i < res.data.loginUser.roleList.length; i++) {
//                if (userRoleId === res.data.loginUser.roleList[i].roleId) {
//                  Cookies.set('roleType', res.data.loginUser.roleList[i].roleType);
//                }
//              }
            } else {
              Cookies.remove('roleId');
              Cookies.set('userRoleId', 0);
              store.commit('saveInfo', {
                userRoleId: 0
              });
            }
            if (res.data.loginUser.loginConfigInfo !== null) {
              Cookies.set('loginConfig', res.data.loginUser.loginConfigInfo);
            }
            this.loadingEnter = false;
            if (res.data.loginUser.role && res.data.loginUser.role.roleType === 100) {
              this.commPath = {path: '/admin'};
            } else {
              this.commPath = {path: '/main'};
            }
            this.vedioFun();
          } else {
            this.$alert(res.message, '温馨提示', {
              confirmButtonText: '确 定',
              type: 'error', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
                return;
              }
            });
            this.loadingEnter = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 选择角色返回登录页面
      loginBack () {
        this.chooseFlag = false;
      }
    }
  };
  // 登录mothods
  function toLogin (_this) {
    _this.$refs.loginForm.validate(valid => {
      if (valid) {
        let _data = {
          loginName: _this.loginForm.username,
          loginPwd: _this.loginForm.password,
          validNum: _this.loginForm.validNum || ''
        };
        // 调取第几次失败登录信息
        api.post(apiPath.author.findLoginFailNumByLoginName, _data).then(res => {
          if (res.data >= '3') {
            _this.isCode = false;
            api.post(apiPath.author.findLoginValidNumByLoginName, _data).then(res => {
              _this.imgUrl = 'data:image/jpg;base64,' + res.data;
            });
          }
        });
        // login
        api.post(apiPath.author.login, _data).then(res => {
          if (res.code === "CPYY-00001") {
            store.commit('saveToken', {token: res.data.token});
            store.commit('saveInfo', {
              corpId: res.data.loginUser.user.corpId,
              corpName: res.data.loginUser.user.corpName,
              loginUser: res.data.loginUser.userRoleList,
              suppInfo: res.data.loginUser.suppInfo,
              name: res.data.loginUser.user.fullName,
              userId: res.data.loginUser.user.userId
            });
            if (res.data.loginUser.role && res.data.loginUser.role.roleType) {
              store.commit('saveInfo', {
                roleType: res.data.loginUser.role.roleType
              });
            }
            Cookies.set('Token', res.data.token);
            Cookies.set('CorpId', res.data.loginUser.user.corpId);
            Cookies.set('CorpName', res.data.loginUser.user.corpName);
            Cookies.set('CPYY-INFO-NAME', res.data.loginUser.user.fullName);
            Cookies.set('CPYY-LOGIN-NAME', res.data.loginUser.user.loginName);
            Cookies.set('loginUser', res.data.loginUser.userRoleList);
            Cookies.set('suppInfo', res.data.loginUser.suppInfo);
            Cookies.set('loginConfig', res.data.loginUser.loginConfigInfo);
            Cookies.set('UserId', res.data.loginUser.user.userId);
//            if (res.data.loginUser.roleList.length === 1) {
//              Cookies.set('roleType', res.data.loginUser.roleList[0].roleType);
//            }
            if (res.data.loginUser.userRole !== '' && res.data.loginUser.userRole !== null) {
              Cookies.set('roleType', res.data.loginUser.role.roleType);
              Cookies.set('userRoleId', res.data.loginUser.userRole.userRoleId);
              Cookies.set('RoleId', res.data.loginUser.userRole.roleId);
              store.commit('saveInfo', {
                userRoleId: res.data.loginUser.userRole.userRoleId,
                roleId: res.data.loginUser.userRole.roleId
              });
              if (res.data.loginUser.role && res.data.loginUser.role.roleType) {
                store.commit('saveInfo', {
                  roleType: res.data.loginUser.role.roleType
                });
              }
            }
            if (res.data.loginUser.isDupFun === true) {
              _this.loading = false;
              _this.chooseFlag = true;
              _this.chooseRoleList = res.data.loginUser.userRoleList;
//              if (res.data.loginUser.loginConfigInfo !== null) {
//                _this.loginConfigInfo = res.data.loginUser.loginConfigInfo;
//              }
            } else {
              _this.loading = false;
              if (res.data.loginUser.role && res.data.loginUser.role.roleType === 100) {
                _this.commPath = {path: '/admin'};
              } else {
                _this.commPath = {path: '/main'};
              }
              _this.vedioFun();
              return;
            }
          } else {
            _this.loading = false;
            api.post(apiPath.author.findLoginFailNumByLoginName, _data).then(res => {
              if (res.data === '3') {
                _this.isCode = false;
                api.post(apiPath.author.findLoginValidNumByLoginName, _data).then(res => {
                  _this.imgUrl = 'data:image/jpg;base64,' + res.data;
                });
              }
              if (res.data === '5') {
                _this.$refs.loginForm.$children[0].validateState = 'error';
                _this.$refs.loginForm.$children[0].validateMessage = '您的账户已锁定，请您5分钟后再试';
                return;
              }
            });
            if (res.message === '密码不正确') {
              _this.$refs.loginForm.$children[1].validateState = 'error';
              _this.$refs.loginForm.$children[1].validateMessage = res.message;
              return;
            }
            if (res.message === '验证码为空' || res.message === '验证码无效') {
              _this.$refs.loginForm.$children[4].validateState = 'error';
              _this.$refs.loginForm.$children[4].validateMessage = res.message;
              return;
            }
            for (let i = 0; i < _this.$refs.loginForm.$children.length; i++) {
              if (_this.$refs.loginForm.$children[0].prop === 'username') {
                _this.$refs.loginForm.$children[0].validateState = 'error';
                _this.$refs.loginForm.$children[0].validateMessage = res.message;
                return;
              }
            }
          }
        }).catch(err => {
          _this.loading = false;
          return false;
        });
      } else {
        _this.loading = false;
        return false;
      }
    });
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/theme";
  @import "../../assets/style/base.css";
  @import "../../assets/style/login.css";

  html, body, #app {
    width: 100%;
    height: 100%;
  }

  .login {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/common-login-bg.jpg") no-repeat;
    background-size: cover;
  }
  .logo-img{display: block;margin: 92px auto 57px auto;width: 73px;}
  .Login_R .sino-form-item-content{width:100%}
  .vedioRecord1 .sino-dialog{width:400px;}
  .vedioRecord1 .sino-dialog-body{ padding-top: 0;}
  .vedioRecord .sino-dialog-body{
    overflow: hidden;
    max-height: none;
    padding-top: 0;
  }
  .vedioRecord1 .clearfix p{
    &:first-child{
      text-align: center;font-size:20px;line-height: 35px;font-weight: bold;color:#999;
    }
    &:not(:first-child){
      font-size: 16px;margin-top: 10px;
    }
    &:not(:first-child) span{ width: 100px;text-align: left;line-height: 20px;color:#999;margin-left: 10px;}
  }
</style>
