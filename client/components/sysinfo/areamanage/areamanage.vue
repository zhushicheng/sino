<template>
  <div class="roleMange">
    <div class="role-content">
      <sino-title type="levelOne" title="地区管理" ></sino-title>
      <sino-tree :data="treeList" :show-checkbox="true"
                 node-key="id"
                 :default-expanded-keys="expandedkeys"
                 :props="defaultProps"
                 v-on:ascNode="ascNode"
                 ref="tree"
                 :check-strictly="true"
                 lazy
                 check-strictly
                 @node-expand="nodeExpand"
                 @node-collapse="nodeCollapse"
                 @current-change="checkChangeFun"
                 :load="loadingNode"
      ></sino-tree>
    </div>
    <!--弹层 --修改-新增-字典-->
    <sino-dialog :visible.sync="modifyAndAdd" class="sino-dialog-modify etyma-dialog" size="small" @close="modifyClose">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="role-title-second">
        <sino-form :model="modifyAndAddForm" :rules="modifyAndAddFormRule" class="role-form-modify" ref="modifyAndAddForm">
          <div class="rule-form-content">
            <ul class="rule-content-list width-lable-box">
              <li>
                <sino-form-item label="地区名称：" prop="areaName" class="role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.areaName" ></sino-input>
                </sino-form-item>
              </li>
              <!--<li>-->
                <!--<sino-form-item label="地区编码：" prop="code" class="role-form-modify-item mr-15">-->
                  <!--<sino-input v-model="modifyAndAddForm.code" ></sino-input>-->
                <!--</sino-form-item>-->
              <!--</li>-->
              <li>
                <sino-form-item label="地区性质：" prop="areaTypeName" class="role-form-modify-item is-required ">
                <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="modifyAndAddForm.areaTypeName" :chooseId.sync="modifyAndAddForm.areaType" :clear="true" :url="getDictSelectBox" :data="{code: 'AREA_TYPE'}"></sino-select>
                </sino-form-item>
              </li>
              <!--<li>-->
                <!--<sino-form-item label="同级显示顺序：" prop="showSort" class="is-required  role-form-modify-item mr-15">-->
                  <!--<sino-input v-model.number="modifyAndAddForm.showSort" ></sino-input>-->
                <!--</sino-form-item>-->
              <!--</li>-->
              <li>
                <sino-form-item label="   " class="role-form-modify-item mr-15">
                  <sino-checkbox v-model="modifyAndAddForm.busiAreaType">业务可执行地区</sino-checkbox>
                </sino-form-item>
              </li>
              <li style="width: 100%">
                <sino-form-item label="描述：" prop="remark" class="role-form-modify-item">
                  <sino-input type="textarea" class="" style="width: 532px;"
                              v-model.number="modifyAndAddForm.remark"
                              :disabled="false" ></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun">{{submitBtnName}}</sino-button>
      </span>
    </sino-dialog>
    <!--弹层 --查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="areaManage-see-dialog">
      <sino-title slot="title" type="levelOne" title="查看地区信息" class="sino-dialog-title"></sino-title>
      <div class="roleMange-list" style="width:99%">
        <ul>
          <li>地区名称</li>
          <li v-text="treeDetail.areaName"></li>
        </ul>
        <ul>
          <li>地区编码</li>
          <li v-text="treeDetail.code"></li>
        </ul>
        <ul>
          <li>地区性质</li>
          <li v-text="treeDetail.areaType"></li>
        </ul>
        <ul>
          <li>同级显示顺序</li>
          <li v-text="treeDetail.showSort"></li>
        </ul>
        <ul class="roleMange-list-last">
          <li>备注</li>
          <li v-text="treeDetail.remark"></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import vald from '../../../validator/index.js';
  let CHECKKEYS;
  let addParentNode;
  let currentId;
  let CHECKEDFLAG = false;
  export default {
    data () {
      var checkNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error('同级显示顺序不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('同级显示顺序需为数字类型'));
        }
      };
      return {
        submitBtnName: '',
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        role: '办公室主任',
        checkedkeys: [5],
        alertTitle: '', // 弹框title
        treeList: [],
        trackStatus: [],
        expandedkeys: [],
        modifyAndAdd: false, // 新增修改弹层显示
        modifyAndAddForm: {
          areaName: '',
          code: '',
          areaTypeName: '',
          areaType: '',
          showSort: '',
          busiAreaType: false,
          remark: ''
        },
        modifyAndAddFormRule: {
          areaName: [
            { required: true, message: '请输入地区名称', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入地区编码', trigger: 'blur' }
          ],
          areaTypeName: [
            { required: true, message: '请选择地区性质', trigger: 'change' }
          ],
          showSort: [
            { required: true, type: 'number', message: '同级显示顺序为必填项，且为数字类型', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'}
          ]
        },
        seeItem: false, // 查看弹层
        treeDetail: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        checkedNodeId: ''
      };
    },
    created () {
      api.post(this.getDictSelectBox, {code: 'YES_NO'}).then(res => {
        this.trackStatus = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    updated: function () {
      if (CHECKEDFLAG) {
        this.$refs.tree.setCheckedKeys(CHECKKEYS);
        CHECKEDFLAG = false;
      }
    },
    methods: {
      getTreeList (key) {
        console.log(key);
        api.postsign(this.apiPath.hrsc.loadAreaList, key).then(res => {
          this.treeList = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      ascNode (val, self, type) {
        CHECKKEYS = this.$refs.tree.getCheckedKeys(true);
        CHECKEDFLAG = true;
        if (type === 'add') {
          this.modifyAndAdd = true;
          this.alertTitle = '新增地区信息';
          this.submitBtnName = '确 定';
          addParentNode = self;
        } else if (type === 'edit') {
          this.alertTitle = '修改地区信息';
          this.submitBtnName = '修 改';
          this.modifyAndAdd = true;
          addParentNode = self;
          api.post(this.apiPath.hrsc.findAreaById, {areaId: self.id}).then(res => {
            var resData = res.data;
            this.modifyAndAddForm = {
              areaName: resData.areaName,
              code: resData.code,
              areaTypeName: resData.areaTypeName,
              areaType: resData.areaType,
              showSort: resData.showSort,
              busiAreaType: Boolean(resData.busiAreaType),
              remark: resData.remark
            };
            currentId = res.data.areaId;
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'delete') {
          api.post(this.apiPath.hrsc.deleteAreaById, {areaId: self.id}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTreeList(0);
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
          });
        } else if (type === 'look') {
          api.post(this.apiPath.hrsc.findAreaById, {areaId: self.id}).then(res => {
            this.treeDetail = res.data;
            this.seeItem = true;
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'up') {
          api.post(this.apiPath.hrsc.raiseArea, {areaId: self.id, parentId: self.parentId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTreeList(0);
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (type === 'down') {
          api.post(this.apiPath.hrsc.downArea, {areaId: self.id, parentId: self.parentId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.getTreeList(0);
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          for (let j = 0; j < val.length; j++) {
            Vue.set(this.treeList, j, val[j]);
          }
        }
      },
      checkChangeFun (data, node) {
        if (node.checked) {
          this.checkedNodeId = data.id;
          this.$refs.tree.setCheckedKeys([data.id]);
        } else {
          this.$refs.tree.setCheckedKeys([]);
          this.checkedNodeId = '';
        }
      },
      modifyClose () {
        this.$refs.modifyAndAddForm.resetFields();
      },
      submitFun () {
        var flag = true;
        this.$refs.modifyAndAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增地区信息') {
              let obj = {
                areaName: this.modifyAndAddForm.areaName,
                code: this.modifyAndAddForm.code,
                areaType: this.modifyAndAddForm.areaType,
                showSort: this.modifyAndAddForm.showSort,
                busiAreaType: Number(this.modifyAndAddForm.busiAreaType),
                remark: this.modifyAndAddForm.remark,
                parentId: addParentNode.id,
                level: addParentNode.level + 1
              };
              api.post(this.apiPath.hrsc.saveArea, obj).then(res => {
                this.modifyAndAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.getTreeList(0);
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              let obj = {
                areaName: this.modifyAndAddForm.areaName,
                code: this.modifyAndAddForm.code,
                areaType: this.modifyAndAddForm.areaType,
                showSort: this.modifyAndAddForm.showSort,
                busiAreaType: Number(this.modifyAndAddForm.busiAreaType),
                remark: this.modifyAndAddForm.remark,
                areaId: currentId,
                parentId: addParentNode.parentId
              };
              api.post(this.apiPath.hrsc.updateArea, obj).then(res => {
                this.modifyAndAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.getTreeList(0);
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
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
      loadingNode (node, resolve) {
        if (node.level === 0) {
          api.postsign(this.apiPath.hrsc.loadAreaList, 0).then(res => {
            return resolve(res.data);
          });
        }
        var hasChild;
        if (node.data.isFolder === 1) {
          hasChild = true;
        } else {
          hasChild = false;
        }
        if (hasChild) {
          api.postsign(this.apiPath.hrsc.loadAreaList, node.data.id).then(res => {
            let that = this;
            if (this.checkedNodeId) {
              setTimeout(function () {
                that.$refs.tree.setCheckedKeys([that.checkedNodeId]);
              });
            }
            return resolve(res.data);
          });
        }
      }
    }
  };
</script>
