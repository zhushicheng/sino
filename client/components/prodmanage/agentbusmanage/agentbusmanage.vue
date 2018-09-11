<template>
  <!--<div>销售线索</div>-->
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="代收代付项查询"></sino-title>
      <sino-form :model="agentSearchForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">代收代付项名称：</span>
              <sino-input class="fl" type="text" v-model="agentSearchForm.proPayName"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">代收代付类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="agentSearchForm.proPayTypeName"
                           :chooseId.sync="agentSearchForm.proPayType"
                           :clear="true"
                           :url="selUrl"
                           :data="{code:'PRO_PAY_TYPE',ids:[1,2]}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">启用状态：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="agentSearchForm.proPayStateName" :chooseId.sync="agentSearchForm.proPayState"  :clear="true" :url="selUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="startFun"><i class="iconfont sino-duihao"></i>启用</sino-button>
            <sino-button type="icon-text" @click="stopFun"><i class="iconfont sino-invalid"></i>停用</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll" v-on:select="selectCallBack">
          <sino-table-column type="selection" width="60"></sino-table-column>
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="proPayName" label="代收代付项名称" min-width="120"></sino-table-column>
          <sino-table-column prop="proPayTypeName" label="代收代付类型" min-width="105"></sino-table-column>
          <sino-table-column prop="invSubName" label="发票科目" min-width="180"></sino-table-column>
          <sino-table-column prop="proPayStateName" label="启用状态"></sino-table-column>
          <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" width="70" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.proPayState!==2">修改</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--新增/修改-->
    <sino-dialog :visible.sync="agentLayerAdd" size="large" :top="'10%'" class="dialog-height" @close ="resetForm">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="agentAddForm" :rules="agentAddRules" ref="agentAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="代收代付项名称：" class="is-required"  prop="proPayName">
          <sino-input type="text" v-model="agentAddForm.proPayName " :disabled="false"></sino-input>
        </sino-form-item>
        <sino-form-item label="代收代付类型："  class="is-required" prop="proPayTypeName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="agentAddForm.proPayTypeName"
                       :chooseId.sync="agentAddForm.proPayType"
                       :clear="true"
                       :url="selUrl"
                       :data="{code:'PRO_PAY_TYPE'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="启用状态：" class="is-required"  prop="proPayStateName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="agentAddForm.proPayStateName"
                       :chooseId.sync="agentAddForm.proPayState"
                       :clear="true"
                       :url="selUrl"
                       :data="{code:'PROD_STATE'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="发票科目：" class="is-required"  prop="invSubName">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="agentAddForm.invSubName"
                       :chooseId.sync="agentAddForm.invSubId"
                       :url="invSubSelect"
                       :data="{data:{invSubType:2}}"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="agentAddForm.remark" :disabled="false" ></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('agentAddForm')">{{leadsbtn}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      return {
        invSubSelect: this.apiPath.hrsc.invSubSelectBox,
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        agentSearchForm: {
          proPayName: '',
          proPayTypeName: '',
          proPayType: '',
          proPayStateName: '',
          proPayState: ''
        },
        trackStatus: [],
        isA: true,
        tableData: null,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        agentLayerAdd: false,
        agentAddForm: {
          proPayName: '',
          proPayTypeName: '',
          proPayType: '',
          proPayStateName: '未启用',
          proPayState: 1,
          invSubName: '',
          invSubId: '',
          remark: ''
        },
        // 校验
        agentAddRules: {
          proPayName: [
            {required: true, message: '代收代付项名称为必填项', trigger: 'change'}
          ],
          proPayTypeName: [
            {required: true, message: '代收代付类型为必填项', trigger: 'change'}
          ],
          proPayStateName: [
            {required: true, message: '启用状态为必填项', trigger: 'change'}
          ],
          invSubName: [
            {required: true, message: '发票科目为必填项', trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
        checkedArr = selectTion;
      },
      resetForm: function () { // 修改对话框打开回调
        this.$refs.agentAddForm.resetFields();
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: {
            proPayName: '',
            proPayTypeName: '',
            proPayType: '',
            proPayStateName: '',
            proPayState: ''
          }
        };
        api.post(this.apiPath.hrsc.findallprodpropay, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.agentSearchForm
        };
        api.post(this.apiPath.hrsc.findallprodpropay, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.searchFun();
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchFun();
      },
      // 新增
      addFun: function () {
        this.agentLayerAdd = true;
        this.alertTitle = '新增代收代付项';
        this.leadsbtn = '确 定';
      },
      // 启用
      startFun: function () {
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.$confirm('确定启用?', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.proPayId);
            });
            var obj = {
              proPayIds: _arr,
              proPayState: 2
            };
            api.post(this.apiPath.hrsc.deleteprodpropay, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '启用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            console.log('失败!');
          });
        }
      },
      // 停用
      stopFun: function () {
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          this.$confirm('确定停用?', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.proPayId);
            });
            var obj = {
              proPayIds: _arr,
              proPayState: 3
            };
            api.post(this.apiPath.hrsc.deleteprodpropay, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '停用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            console.log('失败!');
          });
        }
      },
      // 查看
      seeFun: function () {
        this.seeItem = true;
      },
      // 修改
      modifyFun: function (data) {
        this.agentLayerAdd = true;
        this.alertTitle = '修改代收代付项';
        this.leadsbtn = '修 改';
        api.post(this.apiPath.hrsc.findbyidprodpropay, {proPayId: data.proPayId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.agentAddForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增确定
      submitForm (formName) {
        this.$refs.agentAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增代收代付项') {
              api.post(this.apiPath.hrsc.addprodpropay, this.agentAddForm).then(res => {
                this.agentLayerAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(this.apiPath.hrsc.updateprodpropay, this.agentAddForm).then(res => {
                this.agentLayerAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
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
      }
    }
  };
</script>
