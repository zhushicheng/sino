<template>
  <div class="leads usermanage">
    <sino-con class="have-top-border">
      <sino-title type="levelOne" title="功能权限特殊配置"></sino-title>
      <div class="select-confit-box">
        <label class="fl">角色实例：</label>
        <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                     :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="funaccreditForm.userRoleName" :chooseId.sync="funaccreditForm.userRoleId" :clear="true" :url="roleInstanceUrl" class="fl" :token="token" @change="changeFun"></sino-select>
        <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                     :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="funaccreditForm1.sourceUserRoleName" :chooseId.sync="funaccreditForm1.sourceUserRoleId" :clear="true" :url="roleInstanceUrl" class="fl sec-roleInstance" :token="token" v-if="secRoleInstanceShow"></sino-select>
        <span class="fl special-text" @click="showSecInstFun" v-if="!secRoleInstanceShow">复制来源</span>
        <span class="fl special-text" @click="copyFun" v-if="secRoleInstanceShow">复制</span>
      </div>
      <div class="tree-box">
        <sino-title type="levelTwo" title="菜单授权"></sino-title>
        <div class="tree-content-box">
          <sino-tree :data="menuTreeData"  :show-checkbox="true"
                     node-key="id"
                     :default-expanded-keys="expandedkeys"
                     :props="defaultProps"
                     :extraShow="true"
                     :showTreeHover = "false"
                     ref="funMenuTree"
                     @node-expand="nodeExpand"
                     @node-collapse="nodeCollapse"
                     @check-change="checkNodeChangeFun"
                     @extra = "extraFun"
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
      </div>
    </sino-con>
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
        roleInstanceUrl: this.apiPath.author.findUserRoleSpeSelectBoxInfo,
        roleSelUrl: this.apiPath.author.findRoleSelectBoxInfo,
        funaccreditForm: {
          userRoleName: '',
          userRoleId: ''
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
        funaccreditForm1: {
          sourceUserRoleName: '',
          sourceUserRoleId: ''
        },
        secRoleInstanceShow: false,
        tipFlag: true
      };
    },
    mounted: function () {
      this.getTreeList();
      this.token = Cookie.get('Token');
    },
    methods: {
      changeFun () {
        if (this.funaccreditForm.userRoleName) {
          let userRoleId = this.funaccreditForm.userRoleId;
          let userRoleName = this.funaccreditForm.userRoleName;
          this.resetData();
          this.funaccreditForm.userRoleId = userRoleId;
          this.funaccreditForm.userRoleName = userRoleName;
          api.post(this.apiPath.author.findRoleFunIdsByRoleIdAndUserRoleId, {userRoleId: this.funaccreditForm.userRoleId}).then(res => {
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
      // 复制方法
      copyFun () {
        if (this.funaccreditForm1.sourceUserRoleName) {
          let obj = {
            userRoleId: this.funaccreditForm.userRoleId,
            sourceUserRoleId: this.funaccreditForm1.sourceUserRoleId
          };
          api.post(this.apiPath.author.addSpeFunCopyFromUserRole, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.resetData();
              this.$message({message: '复制成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.$alert('请选择要复制的角色实例！', '温馨提示', {
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
      },
      // 显示第二个下拉框
      showSecInstFun () {
        if (this.funaccreditForm.userRoleName) {
          this.secRoleInstanceShow = true;
        } else {
          this.$alert('请先选择角色实例！', '温馨提示', {
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
      },
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
          if (this.funaccreditForm.userRoleName) {
            api.post(this.apiPath.author.findRoleFunBtnIsByUserRoleFunId, {userRoleId: this.funaccreditForm.userRoleId, funId: node.data.id}).then(res => {
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
                  that.configButtons.push({userRoleId: that.funaccreditForm.userRoleId, funId: that.activeFunId, buttonIds: that.configOneButtons});
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
                    that.configButtons.push({userRoleId: that.funaccreditForm.userRoleId, funId: that.activeFunId, buttonIds: that.configOneButtons});
                  }
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }
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
          userRoleId: this.funaccreditForm.userRoleId,
          funIds: [...new Set(itemIds)],
          roleFunBtnList: this.configButtons
        };
        api.post(this.apiPath.author.addSpeFunByUserRoleId, obj).then(res => {
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
        this.$data.roleInstanceUrl = this.apiPath.author.findUserRoleSpeSelectBoxInfo;
        this.$data.roleSelUrl = this.apiPath.author.findRoleSelectBoxInfo;
        this.$data.funaccreditForm.userRoleName = '';
        this.$data.funaccreditForm.userRoleId = '';
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
        this.$data.funaccreditForm1.sourceUserRoleName = '';
        this.$data.funaccreditForm1.sourceUserRoleId = '';
        this.$data.secRoleInstanceShow = false;
        this.$data.tipFlag = false;
        this.menuTreeData = JSON.parse(JSON.stringify(this.copyTreeData));
        this.$refs.funMenuTree.setCheckedKeys([]);
        let that = this;
        setTimeout(function () {
          that.tipFlag = true;
        });
      },
      // 按钮绑定自变化回调
      menuChange () {
        if (this.configButtons.length === 0) {
          this.configButtons.push({
            userRoleId: this.funaccreditForm.userRoleId,
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
              userRoleId: this.funaccreditForm.userRoleId,
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
            this.menuTreeData = JSON.parse(res.data);
            this.copyTreeData = JSON.parse(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 选择项切换后调用方法
      checkNodeChangeFun (data, node) {
        if (!this.funaccreditForm.userRoleName) {
          if (this.tipFlag) {
            this.tipFlag = false;
            let that = this;
            setTimeout(function () {
              that.$refs.funMenuTree.setCheckedKeys([]);
            });
            this.$alert('请先选择角色实例！', '温馨提示', {
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
