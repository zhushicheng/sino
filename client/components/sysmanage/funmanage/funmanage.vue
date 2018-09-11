<template>
  <div class="funMange usermanage leads">
    <div class="fun-content">
      <sino-title type="levelOne" title="功能管理"></sino-title>
      <div class="fun-tree-linkBox">
        <sino-tree :data="treeData" show-checkbox
                   node-key="id"
                   :default-expanded-keys="expandedkeys"
                   :props="defaultProps"
                   v-on:ascNode="ascNode"
                   ref="tree"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse"
                   check-strictly
                   class="fun-tree-content"
                   @check-change = "checkedChange"
        ></sino-tree>
        <!--@current-change = "checkChangeFun"-->
        <sino-link-container :outBoxStyle="outBoxStyle" :innerBoxStyle="innerBoxStyle" :triangleStyle="triangleStyle" class="fun-link-content">
          <div class="fun-link-content-box">
            <sino-title type="levelTwo" title="功能按钮"></sino-title>
            <div class="fun-link-content-box-table">
              <div class="fun-link-content-box-table-icon">
                <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
                </sino-button>
                <sino-button type="icon-text" @click="modify"><i class="iconfont sino-modify"></i>修改
                </sino-button>
                <sino-button type="icon-text" @click="remove"><i class="iconfont sino-shanchu1"></i>删除
                </sino-button>
              </div>
              <sino-table :data="tableData" style="width: 100%" height="auto" stripe border v-on:select="selectCallBack">
                <sino-table-column type="selection"></sino-table-column>
                <sino-table-column prop="buttonName" label="按钮名称"></sino-table-column>
                <!--<sino-table-column prop="linkAction" label="关联ACTION"></sino-table-column>-->
                <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
              </sino-table>
            </div>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                       :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                       :total="total"></sino-page>
          </div>
        </sino-link-container>
        <!--左侧树添加修改dialog-->
        <sino-dialog :visible.sync="dialogTreeVisible" size="large" :top="'10%'" class="dialog-height" @close ="cleanContent('funTreeForm')" :title="dialogTreeTitle">
          <sino-title slot="title" type="levelOne" :title="dialogTreeTitle" class="sino-dialog-title"></sino-title>
          <sino-form :model="funTreeForm" :rules="funTreeFormRules" ref="funTreeForm" class="demo-sendAddrAddForm">
            <sino-form-item label="功能名称：" prop="funName">
              <sino-input v-model="funTreeForm.funName"></sino-input>
            </sino-form-item>
            <sino-form-item label="功能类型：" prop="funTypeName">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"  :chooseName.sync="funTreeForm.funTypeName" :chooseId.sync="funTreeForm.funType" :clear="true" :url="dictSelUrl" :data="{code:'FUN_TYPE'}"></sino-select>
            </sino-form-item>
            <sino-form-item label="公司名称：" class="h25" prop="corpName">
              <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                           :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="funTreeForm.corpName" :chooseId.sync="funTreeForm.corpId" :token="token" :clear="true" :url="corpSelUrl"></sino-select>
            </sino-form-item>
            <sino-form-item label="选择图标：" prop="icon">
              <sino-icon-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false"  :chooseName.sync="funTreeForm.icon" :chooseId.sync="funTreeForm.iconId" :clear="true" :outSideList="outSideList"></sino-icon-select>
            </sino-form-item>
            <sino-form-item label="URL：" prop="url" class="sino-form-item-width">
              <sino-input v-model="funTreeForm.url"></sino-input>
            </sino-form-item>
            <sino-form-item prop="funDesc" label="描述：" class="sino-form-item-width">
              <sino-input type="textarea" v-model="funTreeForm.funDesc"></sino-input>
            </sino-form-item>
            <sino-form-item prop="remark" label="备注：" class="sino-form-item-width">
              <sino-input type="textarea" v-model="funTreeForm.remark" class="long-sino-input"></sino-input>
            </sino-form-item>
          </sino-form>
          <span slot="footer" class="dialog-footer">
            <sino-button type="primary" @click="leftTrueButtonF">{{ dialogTreeButName }}</sino-button>
          </span>
        </sino-dialog>
        <!--右侧修改dialog-->
        <sino-dialog :title="dialogTableTitle" :visible.sync ="dialogTableVisible" :show-close="true" :lock-scroll="false" class="dialog-com-tree-look-box dialog-com-tree-add-box no-minheight" :close="DiaCloseFormReset">
          <sino-form :model="funTableForm" :rules="tableRules" ref="funTableForm">
            <sino-form-item label="按钮名称：" prop="buttonName" class="short-sino-item">
              <sino-input v-model="funTableForm.buttonName"></sino-input>
            </sino-form-item>
            <div class="short-div" style="padding-top:0">
              <span>所属菜单：</span>
              <sino-input v-model="funTableForm.belongMenu" :disabled="true"></sino-input>
            </div>
            <div  class="long-div spec-long-input">
              <span>备注：</span>
              <sino-input type="textarea" v-model="funTableForm.remark" class="long-sino-input"></sino-input>
            </div>
          </sino-form>
          <span slot="footer" class="dialog-footer long-sino-item">
            <sino-button  @click="submitTableLayerInfo" class="tree-button-cancel"> {{dialogTableButName}}</sino-button>
          </span>
        </sino-dialog>
        <!-- 左侧树查看 -->
        <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
          <sino-title slot="title" type="levelOne" title="查看功能类型" class="sino-dialog-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li>
                <h6>功能名称</h6><span v-text="leftSeeForm.funName"></span>
              </li>
              <li>
                <h6>功能类型</h6><span v-text="leftSeeForm.funTypeName"></span>
              </li>
              <li>
                <h6>URL</h6><span v-text="leftSeeForm.url"></span>
              </li>
              <li>
                <h6>图标名称</h6><span v-text="leftSeeForm.icon"></span>
              </li>
              <li class="li-last">
                <h6>描述</h6><span v-text="leftSeeForm.funDesc"></span>
              </li>
              <li class="li-last">
                <h6>备注</h6><span v-text="leftSeeForm.remark"></span>
              </li>
            </ul>
          </div>
          <span slot="footer" class="dialog-footer">
            <sino-button type="primary"  @click="seeItem = false">确 定</sino-button>
          </span>
        </sino-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  let checkedTableArr = [];
  let CHECKKEYS;
  let CHECKEDFLAG = false;
  function offset (curEle) {
    var disTop = curEle.offsetTop;
    var par = curEle.offsetParent;
    while (par) {
      disTop += par.offsetTop;
      par = par.offsetParent;
    }
    return disTop;
  }
  export default {
    data: function () {
      return {
        corpSelUrl: this.apiPath.author.findCorpSelectBoxInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        leftTreeEditUrl: this.apiPath.author.createBaseFunInfo,
        outSideList: [],
        token: Cookie.get("Token"),
        uploadHeader: {Token: ""},
        funTreeForm: {
          funName: '',
          funType: '',
          funTypeName: '',
          url: '',
          icon: '',
          funDesc: '',
          remark: '',
          corpName: '',
          corpId: ''
        },
        leftSeeForm: {},
        funTreeFormRules: {
          funName: [
            { required: true, message: '功能名称为必填项', trigger: 'change' }
          ],
          funTypeName: [
            { required: true, message: '功能类型为必填项', trigger: 'change' }
          ],
          url: [
            { required: true, message: 'url地址为必填项', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: 'icon为必填项', trigger: 'change' }
          ],
          corpName: [
            { required: true, message: '公司名称为必填项', trigger: 'change' }
          ]
        },
        funTableForm: {
          buttonName: '',
          belongMenu: '',
          funId: '',
          remark: ''
        },
        tableRules: {
          buttonName: [
            {required: true, message: '按钮名称为必填项', trigger: 'blur'}
          ]
        },
        outBoxStyle: {
          width: '50%',
          float: 'left',
          height: '600px'
        },
        innerBoxStyle: {
          height: '100%',
          boxSizing: 'border-box',
          marginLeft: '10px'
        },
        triangleStyle: {
          display: 'none',
          top: 0
        },
        seeItem: false,
        dialogTreeVisible: false,
        dialogTreeTitle: '新增信息',
        dialogTreeButName: '',
        dialogTableVisible: false,
        dialogTableButName: '',
        dialogTableTitle: '新增按钮信息',
        checkedkeys: [],
        expandedkeys: [],
        creatObj: {
          label: '',
          url: '',
          type: '',
          typeId: '',
          icon: '',
          desc: '',
          id: ''
        },
        radio: '',
        treeData: [],
        tableData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        }
      };
    },
    mounted: function () {
      this.getTreeList();
      api.getMenuIcon().then(res => {
        this.outSideList = res.data.list;
      });
    },
    watch: {
      dialogTreeVisible (val) {
        if (!val) {
          this.creatObj = {
            label: '',
            url: '',
            type: '',
            typeId: '',
            icon: '',
            desc: ''
          };
        }
      }
    },
    updated: function () {
      if (CHECKEDFLAG) {
        this.$refs.tree.setCheckedKeys(CHECKKEYS);
        this.$nextTick(function () {
          if (this.$refs.tree.getCheckedKeys()) {
            this.triangleStyle.display = 'block';
            this.triangleStyle.top = (offset(document.getElementsByClassName('is-checked')[0]) - offset(document.getElementsByClassName('sino-link-container')[0])) + 'px';
          } else {
            this.triangleStyle.display = 'none';
          }
        });
        CHECKEDFLAG = false;
      }
    },
    methods: {
      // 复选框实现单选
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedTableArr = selectTion;
      },
      // 获取右侧table数据
      getRightTableList (id) {
        api.post(this.apiPath.author.findFunButtonListByFunId, {funId: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getTreeList () {
        api.post(this.apiPath.author.findFunTreeNodeList, {corpId: Cookie.get('CorpId')}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.treeData = JSON.parse(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 上传文件方法
      getFileName (file, fileList) {
        this.funTreeForm.icon = file.name;
        return fileList;
      },
      fileError (res) {
        this.dialogTreeVisible = false;
        if (this.dialogTreeTitle === '新增信息') {
          this.$alert('新增失败！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      // 左侧树添加修改确认弹层
      leftTrueButtonF () {
        let _this = this;
        _this.$refs.funTreeForm.validate((valid) => {
          if (valid) {
            if (_this.dialogTreeTitle === '新增信息') {
              let obj = _this.funTreeForm;
              obj.parentId =  this.$refs.tree.getCheckedKeys()[0];
              api.post(_this.apiPath.author.createBaseFunInfo, obj).then(res => {
                _this.getTreeList();
                _this.dialogTreeVisible = false;
                if (res.code === 'CPYY-00001') {
                  this.getTreeList();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              let obj = _this.funTreeForm;
              api.post(_this.apiPath.author.updateFunInfoById, obj).then(res => {
                _this.dialogTreeVisible = false;
                if (res.code === 'CPYY-00001') {
                  this.getTreeList();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // table 新增&&修改确认按钮方法
      submitTableLayerInfo (form, type) {
        this.$refs.funTableForm.validate((valid) => {
          if (valid) {
            if (this.dialogTableTitle === '新增按钮信息') {
              api.post(this.apiPath.author.createFunButtonInfo, this.funTableForm).then(res => {
                this.dialogTableVisible = false;
                if (res.code === 'CPYY-00001') {
                  this.getRightTableList(this.$refs.tree.getCheckedKeys()[0]);
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              let obj = this.funTableForm;
              obj.buttonId = checkedTableArr[0].buttonId;
              obj.funId = checkedTableArr[0].funId;
              api.post(this.apiPath.author.updateFunButtonById, obj).then(res => {
                this.dialogTableVisible = false;
                if (res.code === 'CPYY-00001') {
                  this.getRightTableList(checkedTableArr[0].funId);
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      DiaCloseFormReset () {
        this.$refs.funTableForm.resetFields();
      },
      addFun () {
        let checkedNode = this.$refs.tree.getCheckedNodes();
        if (checkedNode.length === 0) {
          this.$alert('请从左侧选择一个菜单选项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.dialogTableTitle = '新增按钮信息';
          this.dialogTableVisible = true;
          this.dialogTableButName = '确 认';
          this.funTableForm =  {
            buttonName: '',
            belongMenu: '',
            funId: '',
            remark: ''
          };
          let _this = this;
          setTimeout(function () {
            _this.funTableForm.belongMenu = checkedNode[0].label;
            _this.funTableForm.funId =  checkedNode[0].id;
          }, 50);
        }
      },
      modify () {
        if (checkedTableArr.length == 1) {
          this.dialogTableTitle = '修改按钮信息';
          this.dialogTableButName = '修 改';
          this.dialogTableVisible = true;
          this.funTableForm =  {
            buttonName: '',
            belongMenu: '',
            funId: '',
            remark: ''
          };
          let _this = this;
          setTimeout(function () {
            _this.funTableForm.buttonName = checkedTableArr[0].buttonName;
            _this.funTableForm.belongMenu = _this.$refs.tree.getCheckedNodes()[0].label;
            _this.funTableForm.remark = checkedTableArr[0].remark;
          }, 50);
        } else {
          this.$alert('请选择要修改的功能按钮', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      remove () {
        if (checkedTableArr.length == 1) {
          this.$confirm('确定删除该条按钮功能吗？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            api.post(this.apiPath.author.updateFunButtonIsEffectById, {buttonId: checkedTableArr[0].buttonId, isEffect: 0}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getRightTableList(checkedTableArr[0].funId);
                this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          });
        } else {
          this.$alert('请选择要删除的功能按钮', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      cleanContent: function () {
        this.$refs.funTreeForm.resetFields();
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.getRightTableList(this.$refs.tree.getCheckedKeys()[0]);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.getRightTableList(this.$refs.tree.getCheckedKeys()[0]);
      },
      getValue1 (name, id) {
        this.creatObj.type = name;
        this.creatObj.typeId = id;
      },
      ascNode (val, self, type) {
        console.log(val + '-----------val');
        console.log(self + '-----------self');
        console.log(type + '-----------type');
        CHECKKEYS = this.$refs.tree.getCheckedKeys();
        CHECKEDFLAG = true;
        if (type === 'look') {
          this.seeItem = true;
          api.post(this.apiPath.author.findBaseFunInfoById, {funId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.leftSeeForm = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'up') {
          api.post(this.apiPath.author.updateUpFunOrderById, {funId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTreeList();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'down') {
          api.post(this.apiPath.author.updateDownFunOrderById, {funId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTreeList();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'add') {
          this.dialogTreeTitle = '新增信息';
          this.dialogTreeButName = "确 认";
          this.dialogTreeVisible = true;
          this.leftTreeEditUrl = this.apiPath.author.createBaseFunInfo;
        } else if (type === 'edit') {
          this.dialogTreeTitle = '编辑信息';
          this.dialogTreeButName = "修 改";
          this.dialogTreeVisible = true;
          this.leftTreeEditUrl = this.apiPath.author.updateFunInfoById;
          api.post(this.apiPath.author.findBaseFunInfoById, {funId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.leftSeeForm = res.data;
              this.funTreeForm = res.data;
              if (res.data.icon) {
                for (var i = 0; i < this.outSideList.length; i++) {
                  if (this.outSideList[i].title === res.data.icon) {
                    this.funTreeForm.iconId = this.outSideList[i].id;
                  }
                };
              }
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'delete') {
          api.post(this.apiPath.author.updateFunIsEffectById, {funId: self.id, isEffect: 0}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTreeList();
              this.tableData = [];
              this.total = null;
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 右侧列表查询按钮
      addNodeCancel () {
        this.dialogTreeVisible = false;
      },
      changeNodes (type, model) {
        console.log(type + model);
      },
      handleNodeClick (data, node, self) {

      },
      nodeExpand (data) {
        if (this.expandedkeys) {
          this.expandedkeys.push(data.id);
        } else {
          this.expandedkeys = [];
          this.expandedkeys.push(data.id);
        }
      },
      nodeCollapse (data) {
        this.expandedkeys.splice(this.expandedkeys.indexOf(data.id), 1);
      },
//      checkChangeFun (data, node) {
//        if (node.checked) {
//        } else {
//          this.$refs.tree.setCheckedKeys([]);
//        }
//      },
      checkedChange (data, checked) {
        if (checked) {
          let that = this;
          setTimeout(function () {
            that.$refs.tree.setCheckedKeys([data.id]);
            setTimeout(function () {
              that.triangleStyle.display = 'block';
              that.triangleStyle.top = (offset(document.getElementsByClassName('is-checked')[0]) - offset(document.getElementsByClassName('sino-link-container')[0])) + 'px';
              that.getRightTableList(data.id);
            });
          }, 100);
        } else {
          this.triangleStyle.display = 'none';
          checkedTableArr = [];
          this.tableData = [];
          this.total = null;
        }
      }
    }
  };
</script>
