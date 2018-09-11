<template>
  <div class=" invinfo">
    <sino-con>
      <sino-title type="levelOne" title="供应商离职原因查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box dimreason-search">
            <li class="search-inner-one">
              <span class="search-inner-name">离职原因：</span>
              <sino-input class="fl" type="text" v-model="searchForm.dimReasonName"
                          :disabled="false"></sino-input>
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
    <div class="sino-table-total sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="add()"><i class="iconfont sino-add"></i>新增离职原因
          </sino-button>
        </div>
      </div>
      <ul class="dimreason-list">
        <li v-for="item in tableData">
          <sino-form :model="empInfoForm" ref="empInfoForm" class="serch-form">
            <sino-title  type="levelTwo"  title="离职原因">
            <div class="fl dimreason-title">
              {{item.dimReasonName}}
            </div>
            <div class="dimreason-list-div  fr" >
              <div class="fr"  @click="item.show = !item.show;">
                <i class="iconfont " :class="{'sino-shuangjiantou-copy':!item.show,'sino-angle-double-up': item.show}" ></i>
                <span v-if="!item.show">展开</span>
                <span v-if="item.show">收起</span>
              </div>
            </div>
              <div class="dimreason-list-div fr">|</div>
              <div class="dimreason-list-div  fr">
                <div @click="modify(item)" >
                  <i class="iconfont  sino-modify"></i>
                  <span>修改</span>
                </div>
              </div>
              <div class="dimreason-list-div  fr">
                <div @click="del(item)">
                  <i class="iconfont  sino-shanchu1"></i>
                  <span>删除</span>
                </div>
              </div>

            </sino-title>
            <sino-collapse-transition >
              <div class="dimreason-content clearfix" v-show="item.show">
                <div class="dimreason-content-box">
                  <div class="fl dimreason-content-title">材料</div>
                  <ul class="fl dimreason-content-list">
                    <li v-for="dimReasonMat in item.dimReasonMatList">{{dimReasonMat.dimMatName}}</li>
                  </ul>
                </div>
              </div>
            </sino-collapse-transition>
          </sino-form>
        </li>
      </ul>
  </div>
    <!--新增离职原因-->
    <sino-dialog :visible.sync="modifyAndAdd" v-on:close="resetForm('modifyAndAddForm')" size="samll" class="see-dirc usermanage adddimreason-dialog">
      <sino-title slot="title" type="levelOne" :title="formState === 'add' ?'新增离职原因' : '修改离职原因'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm"  class="demo-ruleForm">

          <sino-form-item label="离职原因：" class="adddimreason-from-item"
                          :rules="[{ required: true, message: '请输入离职原因', trigger: 'blur' }]"
                          prop="dimReasonName">
            <sino-input v-model="modifyAndAddForm.dimReasonName">
            </sino-input>
          </sino-form-item>
          <sino-form-item label="材料："  v-for="(item, index) in modifyAndAddForm.dimReasonMatList"  :key="index"
                          class="adddimreason-from-item clearfix"
                          :class="{}"
                          :rules="{required: false, message: '材料不能为空', trigger: 'blur'}"
                          :prop="'dimReasonMatList.' + index + '.dimMatName'">
            <!--<div :class="{'mt15': index!==0  }" class="clearfix">-->
            <sino-input v-model = "item.dimMatName">
            </sino-input>
            <div class="ml15" @click="reason(index)"><span class="adddimreason ml10" :class="{'adddimreason-btn': (modifyAndAddForm.dimReasonMatList[index].dimMatName && index === 0) || (index !== 0)}">{{index===0?'重置':'删除'}}</span></div>
            <!--</div>-->
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer">
        <sino-button @click="addFileFun('modifyAndAddForm')">新增材料</sino-button>
        <sino-button class="ml10" type="primary" @click="submitFun('modifyAndAddForm')">{{formState === 'add'?'确 定':'修 改'}}</sino-button>
      </span>
    </sino-dialog>
</div>
</template>
<script>
  import api from '../../../../api';
  import Vue from 'vue';
  let callTip = function (_this, type, msg) {
    _this.modifyAndAdd = false;
    _this.$alert(msg, '提示信息', {
      confirmButtonText: '确 定',
      type: type, // icon图标类型
      dragFlag: true,
      customClass: '', // 添加class
      lockScroll: true,
      callback: action => {
      }
    });
  };
  export default {
    data () {
      return {
        bankTypeUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        searchForm: { // 搜索条件
          dimReasonName: ''
        },
        tableData: [], // 表格数据
        modifyAndAdd: false, // 修改，添加控制弹层显示
        modifyAndAddForm: {
          dimReasonName: '',
          dimReasonMatList: [
            {dimMatName: ''}
          ],
          deleteReasonMats: []
        },
        formState: '',
        empInfoForm: {}
      };
    },
    created () {
      this.searchFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      reason (index) {
        if (index === 0) { // 增加材料
          this.modifyAndAddForm.dimReasonMatList[index].dimMatName = '';
        } else { // 删除材料
          let ary = this.modifyAndAddForm.dimReasonMatList.splice(index, 1);
          if (ary[0].dimReasonMatId) {
            this.modifyAndAddForm.deleteReasonMats.push(ary[0]);
          }
        }
      },
      addFileFun () {
        this.modifyAndAddForm.dimReasonMatList.push({dimMatName: ''});
      },
      searchFun () {
        this.getList();
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      submitFun () {
        if (this.formState === 'add') {
          this.$refs.modifyAndAddForm.validate((valid) => {
            if (valid) {
              api.post(this.apiPath.hrsc.saveDimReason, this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.$message({message: '新增成功！', type: 'success'});
                  this.modifyAndAdd = false;
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log('error submit');
            }
          });
          // 配置供应商离职原因
        } else {
          //         配置供应商离职原因
          this.$refs['modifyAndAddForm'].validate((valid) => {
            if (valid) {
              api.post(this.apiPath.hrsc.updateDimReason, this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.$message({message: '修改成功！', type: 'success'});
                  this.modifyAndAdd = false;
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log('error submit');
            }
          });
        }
      },
      getList () {
        let obj = {};
        obj.data = this.searchForm;
        api.post(this.apiPath.hrsc.findDimReasonAll, obj).then(res => {
          res.data.list.forEach((item, index, list) => {
            item.show = false;
          });
          this.tableData = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      add () {
        this.modifyAndAdd = true;
        this.formState = 'add';
        this.modifyAndAddForm.dimReasonMatList.splice(1);
      },
      modify (data) {
        let _this = this;
        this.modifyAndAdd = true;
        this.formState = 'modify';
        let obj = {};
        obj.dimReasonId = data.dimReasonId;
        api.post(this.apiPath.hrsc.findDimReasonById, obj).then(res => {
          res.data.deleteReasonMats = [];
          if (res.data.dimReasonMatList.length === 0) {
            res.data.dimReasonMatList.push({dimMatName: ''});
          }
          this.modifyAndAddForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      del (data) {
        let obj = {};
        let msg;
        api.post(this.apiPath.hrsc.findByDimReasonId, data).then(res => {
          if (res.data > 0) {
            msg = "该离职原因有“" + res.data + " ”处引用,确定删除这条信息吗？";
          } else {
            msg = "确定删除这条信息吗？";
          }
          this.$alert(msg, '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              if (action === 'cancel') return;
              api.post(this.apiPath.hrsc.deletDimReason, data).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.$message({message: '删除成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
