<template>
  <div>
    <div class="leads usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="changeTabFun('first')">角色实例</div>
            <div class="sino-tabs-item is-active">功能授权</div>
            <div class="sino-tabs-item" @click="changeTabFun('third')">数据权限</div>
          </div>
        </div>
      </div>
      <sino-con class="have-top-border">
        <div class="select-confit-box">
          <label class="fl">角色名称：</label>
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :token="token"
                       :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                       :chooseName.sync="roleInstAddForm.roleName" :chooseId.sync="roleInstAddForm.roleId" :clear="true"
                       :url="roleSelUrl" class="fl" @change="changeFun"></sino-select>
          <span class="fl special-text" @click="jumpSpeAccredit">特殊配置</span>
        </div>
        <div class="tree-box">
          <sino-title type="levelTwo" title="菜单授权"></sino-title>
          <div class="tree-content-box">
            <sino-tree :data="menuTreeData" :show-checkbox="true"
                       node-key="id"
                       :default-expanded-keys="expandedkeys"
                       :props="defaultProps"
                       :extraShow="true"
                       :showTreeHover="false"
                       ref="funMenuTree"
                       @node-expand="nodeExpand"
                       @node-collapse="nodeCollapse"
                       @check-change="checkNodeChangeFun"
                       @extra="extraFun"
            ></sino-tree>
          </div>
          <div v-if="showConfigBox" class="config-content-box">
            <sino-title type="levelTwo" :title="currentTitle"></sino-title>
            <div class="config-button-box">
              <sino-checkbox-group @change="menuChange" v-model="configOneButtons">
                <sino-checkbox v-for="(item,index) in buttonList" :key="index" :label="item.buttonId">{{item.buttonName}}</sino-checkbox>
              </sino-checkbox-group>
            </div>
          </div>
        </div>
        <div class="funAccButton">
          <sino-button type="primary" class="function-sure-button" @click="funAccSure">确 定</sino-button>
          <sino-button @click="resetData">重置</sino-button>
          <span class="fr batch-mainte">批量维护</span>
        </div>
      </sino-con>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import vald from '../../../../validator/index.js';
  import Cookie from 'js-cookie';
  export default {
    data () {
      return {
        showConfigBox: false,
        roleSelUrl: this.apiPath.author.findRoleSelectBoxInfo,
        routerView: false,
        roleInstAddForm: {
          roleName: '',
          roleId: ''
        },
        token: Cookie.get('Token'),
        activeFunId: '',
        buttonList: [],
        configButtons: [],
        configOneButtons: [],
        menuTreeData: [],
        expandedkeys: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentTitle: '',
        tipFlag: true
      };
    },
    mounted: function () {
      this.getTreeList();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/funAccredit") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    methods: {
      ruoteJudge () { // 解决刷新页面后退的bug
        if (this.$route.path !== "/funAccredit") {
          this.routerView = true;
        }
      },
      changeFun () {
        if (this.roleInstAddForm.roleName) {
          let roleId = this.roleInstAddForm.roleId;
          let roleName = this.roleInstAddForm.roleName;
          this.resetData();
          this.roleInstAddForm.roleId = roleId;
          this.roleInstAddForm.roleName = roleName;
          api.post(this.apiPath.author.findRoleFunIdsByRoleId, {roleId: this.roleInstAddForm.roleId}).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data) {
                this.$refs.funMenuTree.setCheckedKeys(res.data);
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 额外方法
      extraFun (node) {
        this.configOneButtons = [];
        if (node.checked) {
          this.activeFunId = node.data.id;
          this.currentTitle = node.data.label + ' - 按钮授权';
          api.post(this.apiPath.author.findFunButtonListByFunId, {funId: node.data.id}).then(res => {
            this.buttonList = res.data;
            if (res.data && (res.data.length !== 0)) {
              this.showConfigBox = true;
            } else {
              this.showConfigBox = false;
            }
          }).catch(err => {
            console.log(err);
          });
          if (this.roleInstAddForm.roleName) {
            api.post(this.apiPath.author.findRoleFunBtnIsByRoleFunId, {
              roleId: this.roleInstAddForm.roleId,
              funId: node.data.id
            }).then(res => {
              let that = this;
              if (that.configButtons.length === 0) {
                that.configOneButtons = res.data;
              } else {
                let flag1 = true;
                for (var l = 0; l < that.configButtons.length; l++) {
                  if (that.configButtons[l].funId === that.activeFunId) {
                    that.configOneButtons = that.configButtons[l].buttonIds;
                    flag1 = false;
                    return;
                  }
                  if (flag1) {
                    that.configOneButtons = res.data;
                  }
                }
              }
              if (res.data && (res.data.length !== 0)) {
                if (that.configButtons.length === 0) {
                  that.configButtons.push({
                    roleId: that.roleInstAddForm.roleId,
                    funId: that.activeFunId,
                    buttonIds: that.configOneButtons
                  });
                } else {
                  let flag = true;
                  for (var i = 0; i < that.configButtons.length; i++) {
                    if (that.configButtons[i].funId === that.activeFunId) {
                      that.configButtons[i].buttonIds = that.configOneButtons;
                      flag = false;
                      return;
                    }
                  }
                  if (flag) {
                    that.configButtons.push({
                      roleId: that.roleInstAddForm.roleId,
                      funId: that.activeFunId,
                      buttonIds: that.configOneButtons
                    });
                  }
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }
      },
      // 跳转到功能权限特殊配置
      jumpSpeAccredit () {
        this.routerView = true;
        this.$router.push({path: '/funAccredit/speFunAccredit'});
      },
      // 保存按钮
      funAccSure () {
        var itemArr = this.$refs.funMenuTree.getCheckedNodes();
        let itemIds = [];
        itemArr.forEach(function (item) {
          if (item.parentId !== 0 && item.parentId !== -1) {
            itemIds.push(item.id);
            itemIds.push(item.parentId);
          } else {
            itemIds.push(item.id);
          }
        });
        let obj = {
          roleIds: [this.roleInstAddForm.roleId],
          funIds: [...new Set(itemIds)],
          roleFunBtnList: this.configButtons
        };
        api.post(this.apiPath.author.addBatchRoleFunInfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.resetData();
            this.$message({message: '保存成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 重置刷新页面
      resetData () {
        this.$data.showConfigBox = false;
        this.$data.roleSelUrl = this.apiPath.author.findRoleSelectBoxInfo;
        this.$data.roleInstAddForm.roleName =   '';
        this.$data.roleInstAddForm.roleId =   '';
        this.$data.token = Cookie.get('Token');
        this.$data.activeFunId = '';
        this.$data.buttonList = [];
        this.$data.configButtons = [];
        this.$data.configOneButtons = [];
        this.$data.menuTreeData = [];
        this.$data.expandedkeys = [];
        this.$data.defaultProps.children = 'children';
        this.$data.defaultProps.label = 'label';
        this.$data.currentTitle = '';
        this.$data.tipFlag = false;
        this.menuTreeData = JSON.parse(JSON.stringify(this.copyTreeData));
        this.$refs.funMenuTree.setCheckedKeys([]);
        let that = this;
        setTimeout(function () {
          that.tipFlag = true;
        });
      },
      // 按钮绑定自变化回调
      menuChange  () {
        if (this.configButtons.length === 0) {
          this.configButtons.push({
            roleId: this.roleInstAddForm.roleId,
            funId: this.activeFunId,
            buttonIds: this.configOneButtons
          });
        } else {
          let flag = true;
          for (var i = 0; i < this.configButtons.length; i++) {
            if (this.configButtons[i].funId === this.activeFunId) {
              this.configButtons[i].buttonIds = this.configOneButtons;
              flag = false;
              return;
            }
          }
          if (flag) {
            this.configButtons.push({
              roleId: this.roleInstAddForm.roleId,
              funId: this.activeFunId,
              buttonIds: this.configOneButtons
            });
          }
        }
      },
      // 功能菜单树查询
      getTreeList () {
        api.post(this.apiPath.author.findFunTreeNodeList, {corpId: Cookie.get('CorpId')}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.copyTreeData = JSON.parse(res.data);
            this.menuTreeData = JSON.parse(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // tab 选项卡点击回调事件
      changeTabFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/roleInstance'});
        } else if (order === 'third') {
          this.$router.push({path: '/dataJurisdiction'});
        }
      },
      // 选择项切换后调用方法
      checkNodeChangeFun (data, node) {
        if (!this.roleInstAddForm.roleName) {
          if (this.tipFlag) {
            this.tipFlag = false;
            let that = this;
            setTimeout(function () {
              that.$refs.funMenuTree.setCheckedKeys([]);
            });
            this.$alert('请先选择角色名称！', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
                this.tipFlag = true;
              }
            });
          }
        } else {
          if (!node) {
            let that = this;
            if (that.configButtons.length !== 0) {
              for (var i = 0; i < that.configButtons.length; i++) {
                if (that.configButtons[i].funId === that.activeFunId) {
                  that.activeFunId = '';
                  that.showConfigBox = false;
                };
                if (that.configButtons[i].funId === data.id) {
                  that.configButtons.splice(i, 1);
                }
              }
            }
          }
        }
      },
      nodeCollapse (data) {
        this.expandedkeys.splice(this.expandedkeys.indexOf(data.id), 1);
      },
      nodeExpand (data) {
        if (this.expandedkeys) {
          this.expandedkeys.push(data.id);
        } else {
          this.expandedkeys = [];
          this.expandedkeys.push(data.id);
        }
      }
    }
  };
</script>
