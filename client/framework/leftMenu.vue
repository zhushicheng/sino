<template>
  <!--左侧菜单-->
  <div class="left-menu" id="leftMenu" :class="{'left-menu-colspan': isCollapse === true, 'left-menu': isCollapse === false}">
    <div class="common-colspan" :class="{'rightCol':isCollapse === true}">
      <i class="fl iconfont sino-gengduo common-icon" v-model="isCollapse" @click="colspanFun"></i>
    </div>
    <transition name="fade">
      <div id="Menu">
        <div class="left-menu-div" id="menuDiv" :class="{'left-menu-colspan-div': isCollapse === true, 'left-menu-div': isCollapse === false}">
          <div class="common-menu-header">
            <img src="../assets/img/common-logo.png" alt="LOGO" class="fl">
            <h3 class="fl" :class="{'common-header-h3': isCollapse === true}">人力资源管理系统</h3>
          </div>
          <sino-menu :router="false" class="menu el-menu-vertical-demo" @open="handleOpen" @close="handleClose" uniqueOpened mode="vertical" :collapse="isCollapse" ref="leftmenu">
            <template v-for="(menu, index) in menuData">
              <sino-menu-item v-if="menu.children.length == 0" :index="menu.label + menu.id" :route="{path:menu.url}" @click="menuRoleFun(menu.id, menu.url)">
                <i :class="'iconfont '+ menu.icon"></i>
                <span slot="title">{{menu.label}}</span>
                <i class="iconfont sino-shezhi spec-icon-shezhi"></i>
              </sino-menu-item>
              <sino-submenu :index="menu.label + menu.id" v-if="menu.children && menu.children.length > 0">
                <template slot="title">
                  <i :class="'iconfont '+menu.icon"></i><span slot="title">{{menu.label}}</span>
                </template>
                <sino-menu-item class="sino-sunmenu-title"><span>{{menu.label}}</span></sino-menu-item>
                <template v-for="(submenu, sub) in menu.children">
                  <sino-menu-item :index="submenu.label + menu.id" :route="{path:submenu.url}" @click="bodyScroll;menuRoleFun(submenu.id, submenu.url)" v-if="submenu.children.length == 0">
                    <i class="iconfont sino-iconfontyuan"></i>
                    <span slot="title">{{submenu.label}}</span>
                  </sino-menu-item>

                  <sino-submenu :index="submenu.label + menu.id" v-if="submenu.children && submenu.children.length > 0">
                    <template slot="title">
                      <i :class="'iconfont '+submenu.icon"></i><span slot="title"> {{submenu.label}}</span>
                    </template>
                    <template v-for="(threemenu, thre) in submenu.children">
                      <sino-menu-item :index="threemenu.label + menu.id" @click="bodyScroll;menuRoleFun(threemenu.id, threemenu.url)" :route="{path:threemenu.url}">
                        <i :class="'iconfont '+threemenu.icon"></i>
                        <span slot="title">{{threemenu.label}}</span>
                      </sino-menu-item>
                    </template>
                  </sino-submenu>
                </template>
              </sino-submenu>
            </template>
          </sino-menu>
        </div>
      </div>
    </transition>
    <!--调整公司层级弹层&& 调整机构层级 (顶部点击)-->
    <!--<sino-dialog :visible.sync ="dialogAdjustLelve" :show-close="true" :lock-scroll="true" class="shortcuts">-->
      <!--<sino-title slot="title" type="levelOne" title="快捷功能" class="sino-dialog-title"></sino-title>-->
      <!--<sino-tree :data="treeLevData" show-checkbox :showTreeHover="false"-->
                 <!--node-key="id"-->
                 <!--:isRadio="false"-->
                 <!--:props="defaultProps"-->
                 <!--ref="shortcutsTree"-->
                 <!--:default-checked-keys="defaultCheckKeys"-->
                 <!--class="adjust-company-dialog-button-cancel"-->
      <!--&gt;-->
      <!--</sino-tree>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<sino-button type="primary" @click="shortcutsSure">确 定</sino-button>-->
      <!--</span>-->
    <!--</sino-dialog>-->
    <!--菜单角色选择-->
    <sino-dialog :visible.sync ="dialogChooseFlag" :show-close="true" :lock-scroll="true" class="shortcuts">
      <sino-title slot="title" type="levelOne" title="选择角色" class="sino-dialog-title"></sino-title>
      <div class="fl sino-dialog-sino">
        <i class="iconfont sino-gantanhao"></i>
      </div>
      <div class="fl choose-div-menu">
        <h6>该功能菜单有以下角色可操作，<br>请选择：</h6>
        <sino-radio v-for="(item, index) in dialogChooseList" :key="index" v-model.number="dialogChooseInfo.userRoleId" :label="item.userRoleId">{{item.roleName}}-{{item.orgName}}</sino-radio>
        <sino-button type="primary" class="clear" @click="submitChooseFun(funId)">确 定</sino-button>
      </div>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../api';
  import Cookies from 'js-cookie';

  let newData = [];
  let _url;
  export default {
    components: {
    },
    data () {
      return {
        defaultCheckKeys: [],
        permission: {
          component: false,
          userManager: false,
          orderManager: false
        },
        isCollapse: false,
        menuData: null,
        treeLevData: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogAdjustLelve: false,
        dialogChooseFlag: false,
        dialogChooseList: [],
        funId: null,
        dialogChooseInfo: {
          userRoleId: ''
        }
      };
    },
    created () {
      // 默认查询菜单列表信息
      this.getInfo();
    },
    mounted: function () {
      let _height = window.innerHeight;
      document.getElementById('leftMenu').style.height = _height + 'px';
      document.getElementById('Menu').style.height = _height + 'px';
      // this.searchFun();
    },
    watch: {
      defaultCheckKeys (newValue) {
        if (this.$refs.shortcutsTree) {
          this.$refs.shortcutsTree.setCheckedKeys(newValue);
        }
      }
    },
    methods: {
      // 初始化
      getInfo () {
        let _data = {
          userId: JSON.parse(Cookies.get('UserId'))
        };
        if (Cookies.get('userRoleId') === undefined) {
          _data.userRoleId = '';
        } else {
          _data.userRoleId = JSON.parse(Cookies.get('userRoleId'));
        }
        let _this = this;
        api.post(this.apiPath.author.findRoleFunByUserIdAndUserRoleId, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            let _data = JSON.parse(res.data);
            _data.forEach(function (list) {
              list.idString = list.id + '';
            });
            _this.menuData = _data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 点击切换相应的菜单
      menuRoleFun (id, url) {
        if (this.$route.path === url) {
          return;
        }
        let _data = {
          userId: Cookies.get('UserId'),
          funId: id
        };
        this.funId = _data.funId;
        api.post(this.apiPath.author.findRoleByFunAndUser, _data).then(res => {
          if (res.data instanceof Array) {
            this.dialogChooseFlag = true;
            this.dialogChooseInfo.roleId = res.data[0].roleId;
            this.dialogChooseList = res.data;
            this.dialogChooseInfo.userRoleId = this.dialogChooseList[0].userRoleId;
            _url = url;
          } else {
            if (res.data !== '' && res.data !== null) {
              Cookies.set('userRoleId', res.data.userRole.userRoleId);
              Cookies.set('roleType', res.data.role.roleType);
            }
            this.$router.push({path: url});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 确定按钮
      submitChooseFun (id) {
        api.post(this.apiPath.author.changeUserRoleToTokenByRole, {userRoleId: this.dialogChooseInfo.userRoleId, funId: id}).then(res => {
          if (res.code === "CPYY-00001") {
            Cookies.set('Token', res.data.token);
            Cookies.set('userRoleId', res.data.loginUser.userRole.userRoleId);
            Cookies.set('roleType', res.data.loginUser.role.roleType);
            this.dialogChooseFlag = false;
            this.$router.push({path: _url});
            _url = '';
          }
        }).catch(err => {
          console.log(err);
        });
      },
      shortFun (id, url) {
        let _data = {
          userId: Cookies.get('UserId'),
          funId: id
        };
        api.post(this.apiPath.author.findRoleByFunAndUser, _data).then(res => {
          if (res.data instanceof Array) {
            this.dialogChooseFlag = true;
            this.dialogChooseInfo.roleId = res.data[0].roleId;
            this.dialogChooseList = res.data;
            return;
          } else {
            let _this = this;
            _this.dialogAdjustLelve = true;
            _this.defaultCheckKeys = [];
            api.post(_this.apiPath.author.findRoleFunByUserRoleId).then(res => {
              _this.treeLevData = JSON.parse(res.data);
              api.post(_this.apiPath.author.findQuickFunIdsByUserRoleId).then(res => {
                _this.defaultCheckKeys = res.data;
                _this.$refs.shortcutsTree.setCheckedNodes(_this.defaultCheckKeys);
              }).catch(err => {
                console.log(err);
              });
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      },
      colspanFun () {
        if (this.isCollapse === false) {
          this.isCollapse = true;
          this.$parent.$refs['appMain'].style.marginLeft = 50 + 'px';
          this.$refs.leftmenu.openedMenus.splice(0, 1);
//          document.getElementById('leftMenu').style.width = '48px';
//          document.getElementById('appMain').style.marginLeft = '50px';
//          document.getElementById('menuDiv').style.width = '137%';
        } else {
//          this.$parent.$children[1].$el.offsetLeft = 220;
//          document.getElementById('leftMenu').style.width = '220px';
//          document.getElementById('appMain').style.marginLeft = '220px';
//          document.getElementById('menuDiv').style.width = '108%';
          this.$parent.$refs['appMain'].style.marginLeft = 220 + 'px';
          this.isCollapse = false;
        }
      },
      // 收起
      leftCol () {
        this.$refs.leftmenu.openedMenus.splice(0, 1);
        this.isCollapse = true;
        document.getElementById('leftMenu').style.width = '48px';
        document.getElementById('appMain').style.marginLeft = '50px';
        document.getElementById('menuDiv').style.width = '137%';
      },
      // 展开
      rightCol () {
        this.isCollapse = false;
        document.getElementById('leftMenu').style.width = '220px';
        document.getElementById('appMain').style.marginLeft = '220px';
        document.getElementById('menuDiv').style.width = '108%';
      },
      // searchFun () {
      //   api.post(this.apiPath.author.findQuickFunByUserRoleId).then(res => {
      //     if (res.code === 'CPYY-00001') {
      //       newData = res.data;
      //       let _this = this;
      //       setTimeout(function () {
      //         if (_this.menuData === null) {
      //           return;
      //         }
      //         for (let i = 0; i < _this.menuData.length; i++) {
      //           if (_this.menuData[i].label === '快捷入口') {
      //             for (let j = 0; j < newData.length; j++) {
      //               newData[j].icon = 'sino-iconfontyuan';
      //               newData[j].label = newData[j].funName;
      //             }
      //             _this.menuData[i].children = newData;
      //           }
      //         }
      //       }, 10);
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      // shortcutsSure () {
      //   let _this = this;
      //   let dataRecieve = this.$refs.shortcutsTree.getCheckedNodes();
      //   let _data = {
      //     funIds: _this.$refs.shortcutsTree.getCheckedKeys()
      //   };
      //   api.post(_this.apiPath.author.addOrUpdateQuickFunByUserRoleId, _data).then(res => {
      //     if (res.code === 'CPYY-00001') {
      //       _this.dialogAdjustLelve = false;
      //       this.searchFun();
      //       this.$message({message: '恭喜您，新增成功！', type: 'success'});
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      bodyScroll () {
        document.body.scrollTop = 0;
      }
    }
  };
</script>
<style>
  .left-menu{position: fixed;top: 0;width: 220px;height: 100%;overflow: hidden;z-index: 222;box-sizing: border-box;}
  .left-menu-div{width: 108%;overflow-x:hidden;overflow-y: auto;height: 100%}
  #Menu{width:100%;overflow: hidden}
  .menu{position: inherit;float: inherit;width: 220px;height: 100%;box-sizing: border-box}
  .sino-menu-collapse.menu{width:48px;}
  .shortcuts .sino-dialog{width: 375px;padding: 0 15px;overflow:hidden;height: auto;min-height:auto;}
  .shortcuts .sino-dialog-body{padding-top: 0;}
  .shortcuts .sino-dialog-body{width: 100%;padding-left: 0;overflow-y: auto;height: auto;max-height: 400px;}
  .shortcuts .sino-dialog-footer{margin-top: 20px;}
  .shortcuts .sino-dialog-header{width: 100%;margin-left: 0;}
  .sino-menu{border:0;}
  .common-colspan{position: fixed;z-index: 999;top: 0;cursor: pointer;left: 219px;}
  .common-colspan.rightCol{left: 47px;}
  .sino-submenu{background: #fff;}
  .app-main{margin-left: 0;}
  .app-main.margin-main{margin-left: 50px;transition: all 0.1s;}
  .sino-submenu .sino-dingdan-copy{margin-left: -4px;}
  .sino-submenu .sino-dingdan-copy+span{margin-left: -3px;}
  .sino-dialog-sino{width:56px;height:56px;border:4px solid #ffedc1;border-radius: 50%;margin:40px 20px 0 15px;text-align: center}
  .sino-dialog-sino i{margin: 15px auto 0 auto;color:#ffc333;display: inline-block;font-size: 27px;}
  .choose-div-menu{width: 230px;margin-top: 44px;}
  .choose-div-menu h6{font-size: 16px;color: #333;line-height: 23px;}
  .choose-div-menu .sino-radio{clear: both;display: block;margin-top: 10px;}
  .choose-div-menu .sino-button{margin: 20px 0 20px 0;}
  .sino-submenu i.sino-kuaijie{margin-right:10px;}
</style>
