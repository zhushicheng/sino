<template>
  <!--头部-->
  <div class="header">
    <!--<i class="fl iconfont sino-gengduo common-icon"></i>-->
    <div class="fr header-right">
      <sino-dropdown trigger="click" @command="handleCommand" class="fr header-dropdown">
        <span class="el-dropdown-link header-dropdown-link" @click="dropdown = false" :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
          <div class="header-user">
            <img src="../assets/img/common-user.jpg">
          </div>
          <span class="span-user" v-text="userName"></span>
          <i class="iconfont sino-jiantouxia"></i>
        </span>
        <sino-dropdown-menu class="role_menu">
          <sino-dropdown-item command="chooseRole">切换角色</sino-dropdown-item>
          <sino-dropdown-item><router-link :to="'/updatePwd'">修改密码</router-link></sino-dropdown-item>
          <sino-dropdown-item command="logout">退出登录</sino-dropdown-item>
        </sino-dropdown-menu>
      </sino-dropdown>
      <sino-dropdown class="touchArea fr">
          <span class="el-dropdown-link">
            <i class="iconfont sino-chanpin1 mr30 mt12"></i>
          </span>
        <sino-dropdown-menu slot="dropdown" class="header-drapDown">
          <sino-dropdown-item><router-link :to="'/proAskQues'">帮助中心</router-link></sino-dropdown-item>
          <sino-dropdown-item>问题反馈</sino-dropdown-item>
        </sino-dropdown-menu>
      </sino-dropdown>
      <sino-dropdown class="touchArea fr">
          <span class="el-dropdown-link">
            <sino-badge is-dot class="mt12 mr30">
              <i class="iconfont sino-lingdang-xianxing"></i>
            </sino-badge>
          </span>
        <sino-dropdown-menu class="task_menu header-drapDown" slot="dropdown">
          <sino-dropdown-item type="task_title">进行中的任务<i>12</i>
          </sino-dropdown-item>
          <sino-dropdown-item type="task_list">
            <i class="fl task_circle"></i>
            <span class="fl task_name">任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</span>
          </sino-dropdown-item>
          <sino-dropdown-item>
            <i class="fl task_circle"></i>
            <span class="fl task_name">任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</span>
          </sino-dropdown-item>
          <sino-dropdown-item>
            <i class="fl task_circle"></i>
            <span class="fl task_name">任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</span>
          </sino-dropdown-item>
        </sino-dropdown-menu>
      </sino-dropdown>
    </div>
    <sino-dialog :visible.sync="chooseRoleFlag" class="nav-choose" size="large" :top="'10%'">
      <sino-title slot="title" type="levelOne" title="切换角色" class="sino-dialog-title"></sino-title>
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
            <li v-for="(list, index) in chooseRoleList" :key="index">
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
      <span slot="footer" class="dialog-footer">
        <sino-button class="choose-btn" :loading="loadingEnter" @click="chooseRoleSubmit(loginConfigInfo.userRoleId)">切换角色</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../api';
  import store from '../store';
  import Cookie from 'js-cookie';
  export default {
    components: {},
    data () {
      return {
        systemName: '人力资源服务商-业务运营管理平台',
        userName: Cookie.get('CPYY-INFO-NAME'),
        peopleCon: true,
        riliCon: false,
        otherCon: false,
        activeTip: '',
        chooseRoleFlag: false,
        chooseRoleList: [],
        loginConfigInfo: {
          roleId: '',
          userRoleId: 0,
          defaultType: 1,
          isDefault: false
        },
        loadingEnter: false,
        dropdown: false
      };
    },
    mounted () {
      if (Cookie.get('loginUser')) {
        this.chooseRoleList = JSON.parse(Cookie.get('loginUser'));
      }
      if (JSON.parse(Cookie.get('loginConfig'))) {
        this.loginConfigInfo = JSON.parse(Cookie.get('loginConfig'));
      }
      if (this.loginConfigInfo) {
        if (this.loginConfigInfo.isDefault === 1) {
          this.loginConfigInfo.isDefault = true;
        } else {
          this.loginConfigInfo.isDefault = false;
        }
      }
    },
    methods: {
      handleCommand (command) {
        let _this = this;
        this.loadingEnter = false;
        // 选择角色
        if (command === 'chooseRole') {
          _this.chooseRoleFlag = true;
          let loginConfig = JSON.parse(Cookie.get('loginConfig'));
//          _this.loginConfigInfo = loginConfig;
          let _roleId = Cookie.get('userRoleId');
          if (_this.loginConfigInfo === null) {
            return;
          }
          if (loginConfig !== null && (loginConfig.roleId === 0 || loginConfig.roleId)) {
            _this.loginConfigInfo.userRoleId = loginConfig.roleId;
            this.loginConfigInfo.isDefault = true;
          } else {
            if (_roleId && _roleId !== 0) {
              _this.loginConfigInfo.userRoleId = parseInt(_roleId);
            } else {
              _this.loginConfigInfo.userRoleId = 0;
            }
            this.loginConfigInfo.isDefault = false;
          }
        }
        // 登出
        if (command === 'logout') {
          const _data = {
            'token': Cookie.get('Token')
          };
          api.post(this.apiPath.author.logout, _data).then(res => {
            store.commit('clearUserInfo', true);
            Cookie.remove('Token');
            Cookie.remove('CorpId');
            Cookie.remove('CorpName');
            Cookie.remove('userRoleId');
            Cookie.remove('RoleId');
            Cookie.remove('UserId');
            Cookie.remove('CPYY-INFO-NAME');
            Cookie.remove('CPYY-LOGIN-NAME');
            Cookie.remove('loginUser');
            Cookie.remove('suppInfo');
            Cookie.remove('loginConfig');
            Cookie.remove('roleType');
            _this.$router.push({path: '/login'});
          }).catch(err => {
            console.log(err);
          });
        }
      },
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
              Cookie.set('userRoleId', res.data.loginUser.userRole.userRoleId);
              Cookie.set('RoleId', res.data.loginUser.userRole.roleId);
              store.commit('saveInfo', {
                userRoleId: res.data.loginUser.userRole.userRoleId,
                roleId: res.data.loginUser.userRole.roleId
              });
              Cookie.set('roleType', res.data.loginUser.role.roleType);
//              for (let i = 0; i < res.data.loginUser.roleList.length; i++) {
//                if (userRoleId === res.data.loginUser.roleList[i].roleId) {
//                  Cookie.set('roleType', res.data.loginUser.roleList[i].roleType);
//                }
//              }
            } else {
              Cookie.remove('RoleId');
              Cookie.remove('roleType');
              Cookie.set('userRoleId', 0);
              store.commit('saveInfo', {
                userRoleId: 0
              });
            }
            Cookie.set('Token', res.data.token);
            Cookie.set('loginConfig', res.data.loginUser.loginConfigInfo);
            this.$router.push({path: '/main'});
            let _this = this;
            setTimeout(function () {
              _this.$router.go(0);
              this.loadingEnter = false;
            }, 100);
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style scoped>
  .circle-box {width:120px;height:120px;position:absolute;display:inline-block;z-index: 999999;top:77px;left:calc(100% - 283px)}
  .selector {width:120px;height:120px;box-sizing:border-box;border:1px solid #5daed1;border-radius:50%;overflow:hidden;position:relative;cursor:pointer;}
  .selector li{list-style:none;position:absolute;width:120px;height:60px;right:50%;top:0;transform-origin: 100% 100%;transform: skew(54deg);background:rgba(51,102,153,0.9);}
  .selector li:hover{background:rgba(0,71,161,0.9);box-sizing:border-box;border:1px solid #21def0;}
  .selector li.hover-style{background:rgba(0,71,161,0.9);box-sizing:border-box;border:1px solid #21def0;}
  .login_guide img{width:74px;margin-top:5px;}
  .selector .select-li1{transform: rotate(45deg);}
  .selector .select-li2{transform: rotate(135deg)}
  .selector .select-li3{transform: rotate(225deg)}
  .selector .select-li4{transform: rotate(315deg)}
  .circle-box div{width:42px;color:#fff;text-align:center;border-radius:10px;}
  .circle-box .d1{position:absolute;left:50%;top:12px;margin-left:-21px;z-index:1;cursor:pointer;}
  .circle-box .d2{position:absolute;right:5px;top:45px;z-index:1;cursor:pointer;}
  .circle-box .d3{position:absolute;left:50%;top:84px;margin-left:-21px;z-index:1;cursor:pointer;}
  .circle-box .d4{position:absolute;left:5px;top:45px;z-index:1;cursor:pointer;}
  .circle-box .jump-disabled{color:#8fb7eb;font-weight: 400;}
  .circle-box .circle-center{position:absolute;width:14px;height:14px;background:rgba(37,210,233,0.8);border:5px solid rgba(33,222,240,0.7);border-radius:50%;top:50%;left:50%;margin-left:-12px;margin-top:-12px;}
  .circle-box .circle-close{position:absolute;cursor:pointer;width:18px;height:18px;background:#bdccde;border-radius:50%;line-height:16px;text-align:center;font-size:16px;color:#1353a5;top:0;right:0;}

  .process-guide-layer .sino-level-one{border-bottom: 0;}
  .process-guide-layer .sino-dialog{width:1010px;}
  .process-con{height: 550px;width: 100%;margin-bottom: 10px;}
  .process-guide-t{width: 472px;height: 150px;border:2px dashed #a79cca;margin: 0 auto;padding: 0 48px;}
  .process-guide-idown{width: 19px;height: 61px;display: block;margin: 14px auto;background: url("../assets/img/icon.png") no-repeat -634px -229px;}
  .process-guide-t li{float: left;text-align: center;margin: 30px 14px;position: relative;cursor: default;overflow: hidden;width: 90px;height: 92px;}
  .process-guide-t li span{width: 78px;position: absolute;left: 43%;top: 45%;font-size: 14px;color: #998cc2;-webkit-transform:translate(-50%,-50%);line-height: 16px;}
  .process-guide-t li i{width: 90px;height: 92px;background: url("../assets/img/icon.png") no-repeat;display: inline-block}
  .process-guide-t li .i-1{background-position: -298px 0;}
  .process-guide-t li .i-2{width:78px;height:92px;background-position: -530px -99px;}
  .process-guide-t li .i-3{background-position: -298px -204px;}
  .process-guide-t li .i-4{background-position: -298px -319px;}
  .process-guide-t li .s-2{margin-left:7px;}
  .process-guide-t li .s-3{margin-left:10px;}
  .process-guide-t li .s-4{margin-left:10px;}
  .process-guide-t li:hover .i-1{background-position: -407px 0;}
  .process-guide-t li:hover .i-3{background-position: -407px -204px;}
  .process-guide-t li:hover .i-4{background-position: -407px -319px;}
  .process-guide-t li:hover .s-1,.process-guide-t li:hover .s-3,.process-guide-t li:hover .s-4{color:#fff;}

  .process-guide-c{width: 100%;border:0;height: 82px;padding: 0 10px;}
  .process-guide-c li{margin: 0 5px;}
  .process-guide-c li i{display: inline-block;width: 89px;height: 80px;}
  .process-guide-c li.li-first{width: 92px;height: 85px;margin: 0;overflow: inherit;position: relative;}
  .process-guide-c li.li-first i{width: 100%;height: 100%;background: url("../assets/img/icon.png") no-repeat -637px -319px;display: inline-block;position: absolute;top: -3px;left: 0;}
  .process-guide-c li.li-last{float: right;}
  .process-guide-c li.li-last i{height:94px;background-position: -637px -427px;right: 0;}
  .process-guide-c li.li-jian{float: left;width: 61px;height: 19px;margin-top: 30px;}
  .process-guide-c li.li-jian i{display: inline-block;width: 100%;height: 100%;background: url("../assets/img/icon.png") no-repeat -634px -164px;}
  .process-guide-c li .i-1{background-position: -298px -541px;}
  .process-guide-c li .i-2{width: 89px;height: 80px;background-position: -298px -753px;}
  .process-guide-c li:hover .i-1{background-position: -407px -541px;}
  .process-guide-c li:hover .i-2{width: 89px;height: 80px;background-position: -407px -753px;}
  .process-guide-c li:hover span{color:#fff;}
  .process-d-guide{height:80px;}
  .process-t-guide{width:192px;height:60px;float:right;margin-right:139px;}
  .process-t-guide li{width:18px;height:60px;}
  .process-t-guide li.fl{background:url("../assets/img/icon.png") no-repeat -634px 0px;}
  .process-t-guide li.fr{background:url("../assets/img/icon.png") no-repeat -634px -75px;}
  .process-guide-b{float: right;margin-right: 68px;width: 337px;padding:0}
  .process-guide-b li.fl{float:left;margin-left:48px;}
  .process-guide-b li.fr{float:right;margin-right:35px;}
  .process-guide-b li .i-1{background-position:-298px -643px;}
  .process-guide-b li .i-2{width:78px;height:92px;background-position:-298px -428px;}
  .process-guide-b li:hover .i-1{background-position:-407px -643px;}
  .process-guide-b li:hover .i-2{width:78px;height:92px;background-position:-407px -428px;}
  .process-guide-b li span{margin-top:10px;}
  .process-guide-b li:hover span{margin-top:10px;color:#fff;}

</style>
<style lang="scss">
  @import '../assets/scss/theme.scss';
  @import '../assets/style/login.css';
  /*.header {
    width: 100%;
    min-width: 1024px;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 334;
    background: -webkit-linear-gradient(left, $navbarColor_start, $navbarColor_end); !* Safari 5.1 - 6.0 *!
    background: -o-linear-gradient(right, $navbarColor_start, $navbarColor_end); !* Opera 11.1 - 12.0 *!
    background: -moz-linear-gradient(right, $navbarColor_start, $navbarColor_end); !* Firefox 3.6 - 15 *!
    background: -webkit-linear-gradient(left, $navbarColor_start, $navbarColor_end);
    -webkit-box-shadow: 0 4px 4px 0 rgba(4, 0, 0, 0.1);
    -moz-box-shadow: 0 4px 4px 0 rgba(4, 0, 0, 0.1);
    box-shadow: 0 4px 4px 0 rgba(4, 0, 0, 0.1);
    .sino-spread-h-bar {
      font-size: 28px;
      font-weight: bold;
      line-height: 70px;
      color: #fff;
      margin-left: 19px;
      margin-right: 21px;
    }
    .title {
      font-size: 20px;
      font-weight: bold;
      line-height: 70px;
      color: #fff;
    }
    > ul {
      li {
        .touchArea {
          width: 44px;
          height: 48px;
          text-align: center;
        }
        .icon_box {
          width: 44px;
          height: 44px;
          position: relative;
          text-align: center;
          line-height: 44px;
          margin-top: -9px;
          border-radius: 50%;
        }
        .icon_active {
          background: #48cbfc;
        }
        .iconfont {
          font-size: 26px;
          color: #fff;
          line-height: 26px;
        }
        &.login_person {
          font-size: 16px;
          color: #fff;
          line-height: 70px;
          span {
            font-size: 16px;
            color: #fff;
            line-height: 70px;
          }
        }
        &.people {
          height: 26px;
          overflow: visible;
          margin-top: 22px;
          border-right: 1px solid #17aae1;
          .touchArea {
            margin-left: 14px;
            margin-right: 7px;
          }
          .people_content {
            position: absolute;
            right: -6px;
            top: 48px;
            width: 120px;
            height: auto;
            padding-top: 7px;
            padding-bottom: 7px;
            background: #fff;
            border-radius: 5px;
            -webkit-box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            -moz-box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            > ul {
              > li {
                height: 29px;
                line-height: 29px;
                font-size: 14px;
                color: #666;
                padding-left: 19px;
                text-align: left;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f7;
              }
              > li:last-child {
                border-bottom: none;
              }
            }
          }
        }
        &.rili {
          height: 26px;
          overflow: visible;
          margin-top: 22px;
          border-right: 1px solid #17aae1;
          .touchArea {
            margin-left: 5px;
            margin-right: 5px;
          }
          .rili_content {
            position: absolute;
            right: -4px;
            top: 48px;
            width: 270px;
            height: auto;
            background: #fff;
            border-radius: 5px;
            -webkit-box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            -moz-box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            .rili_content_title {
              width: 100%;
              height: 36px;
              line-height: 36px;
              color: #f1f5f7;
              font-size: 16px;
              text-align: center;
              background: #7bc2fb;
              border-radius: 5px 5px 0 0;
            }
            > ul {
              margin-top: 6px;
              > li {
                overflow: hidden;
                line-height: 29px;
                border-bottom: 1px solid #f1f5f7;
              }
              > li:last-child {
                border-bottom: none;
              }
            }
          }
        }
        &.other {
          height: 26px;
          overflow: visible;
          margin-top: 22px;
          .touchArea {
            margin-left: 8px;
            margin-right: 15px;
          }
          .other_content {
            position: absolute;
            right: -6px;
            top: 48px;
            width: 120px;
            height: auto;
            padding-top: 7px;
            padding-bottom: 7px;
            background: #fff;
            border-radius: 5px;
            -webkit-box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            -moz-box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            box-shadow: 0 0 2px 2px rgba(4, 0, 0, 0.1);
            > ul {
              > li {
                height: 29px;
                line-height: 29px;
                font-size: 14px;
                color: #666;
                padding-left: 19px;
                text-align: left;
                cursor: pointer;
                border-bottom: 1px solid #f1f5f7;
              }
              > li:last-child {
                border-bottom: none;
              }
            }
          }
        }
      }
    }
    .el-dropdown-link .iconfont{
      display:inline-block;
      width:44px;
      height:44px;
      position:relative;
      top:-10px;
      line-height:44px;
      border-radius:50%;
    }
    .el-dropdown-link .iconfont:hover{
      background:#48cbfc;
      transition:1s;
    }
  }
  .sino-header-logo{margin: 11px 20px 0 25px;width:43px;}
  .header-drapDown{
    position:fixed!important;
    top:61px!important;
  }
  .sino-dropdown-menu-item a{color: #666;}
  .nav-choose{}
  .nav-choose .sino-dialog-body{overflow:hidden;height: auto;}*/
</style>
