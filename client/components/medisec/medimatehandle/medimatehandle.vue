<template>
  <!--医保生育收单-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="医保生育办理"></sino-title>
      <sino-form :model="mediQueryForm" ref="mediQueryForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li>
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="mediQueryForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="mediQueryForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="办理进度：" class="search-inner-item" prop="handleScheduleName">
                <sino-select :filterable="false"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'SEND_SINS_STATE'}"
                             :chooseName.sync="mediQueryForm.handleScheduleName"
                             :chooseId.sync="mediQueryForm.handleSchedule"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保执行地：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :data="{data: {busiAreaTypes: [1]}}"
                             :chooseName.sync="mediQueryForm.areaName"
                             :chooseId.sync="mediQueryForm.areaId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li class="li-wid search-inner-name">
                  <sino-form-item label="付费供应商：" class="search-inner-item" prop="paySuppName">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :token="token"
                                 :chooseName.sync="mediQueryForm.paySuppName"
                                 :chooseId.sync="mediQueryForm.paySuppId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid search-inner-name">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :chooseName.sync="mediQueryForm.custName"
                                 :chooseId.sync="mediQueryForm.custId"
                                 :clear="true"
                                 :token="token"
                                 class="multiple-choice"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务部门：" class="search-inner-item" prop="respBusiDepName">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findOrgSelectBoxInfo"
                                 :chooseName.sync="mediQueryForm.respBusiDepName"
                                 :chooseId.sync="mediQueryForm.respBusiDepId"
                                 @change="busiDepChange"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="respBusiRepName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :linkage="true"
                                 :token="token"
                                 :url="findUserByOrgIdAndRoleType"
                                 :data="creIdNameData"
                                 :chooseName.sync="mediQueryForm.respBusiRepName"
                                 :chooseId.sync="mediQueryForm.respBusiRepId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}"><!-- search-button-box-1-->
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('mediQueryForm')" v-if="searchFlag">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
        <div class="search-more">
          <div @click="searchFlag = !searchFlag">
            <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
            <span v-if="!searchFlag">高级查询</span>
            <span v-if="searchFlag">基本查询</span>
          </div>
        </div>
      </sino-form>
    </sino-con>
    <!-- 列表 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="sendFun"><i class="iconfont sino-xinjianzhangdan"></i>送社保</sino-button>
            <sino-button type="icon-text" @click="eavFun"><i class="iconfont sino-queren"></i>审核通过</sino-button>
          </div>
        </div>
        <sino-table :data="mediTableData" max-height="416" border v-on:viewAll="viewAll" stripe v-on:selection-change="selectCallBack">
          <sino-table-column type="selection" min-width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="reimTypeName" label="报销类型"></sino-table-column>
          <sino-table-column prop="handleScheduleName" label="办理进度" min-width="120"></sino-table-column>
          <sino-table-column prop="areaName" label="社保执行地" min-width="150"></sino-table-column>
          <sino-table-column prop="reimAmo" label="应报销总金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="allocateAmo" label="已拨付金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="applyDate" label="申请日期" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="100" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" v-if="scope.row.handleSchedule === 3" @click="eavFailFun(scope.row)">审核不通过</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--审核不通过-->
    <sino-dialog :visible.sync="eavFailFlag" v-on:close="resetFun('eavFailForm')" size="samll"  class="see-dirc medimatehandle">
      <sino-title slot="title" type="levelOne" :title="'审核不通过'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify13 mt15">
        <sino-form :model="eavFailForm"  ref="eavFailForm" :rules="eavFailRules" class="demo-ruleForm usermanagement-modify-half">
          <sino-form-item prop="eavDate" label="审核日期：">
            <sino-date-picker v-model="eavFailForm.eavDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item prop="eavReturnReason" label="审核不通过原因：" class="sino-from-wid sino-form-item-width">
            <sino-input type="textarea" v-model="eavFailForm.eavReturnReason"></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="eavFailSubmit">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--审核通过-->
    <sino-dialog :visible.sync="eavPassFlag" class="batch-error" v-on:close="resetFun('eavPassForm')">
      <sino-title slot="title" type="levelOne" title="审核通过" class="sino-dialog-title"></sino-title>
      <sino-form :model="eavPassForm" :rules="eavPassRules" ref="eavPassForm">
        <sino-form-item prop="eavDate" label="审核日期：" class="sino-form-item-width">
          <sino-date-picker v-model="eavPassForm.eavDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false">
          </sino-date-picker>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="eavPassSubmit">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--送社保-->
    <sino-dialog :visible.sync="sendFlag" class="batch-error" v-on:close="resetFun('sendForm')">
      <sino-title slot="title" type="levelOne" title="送社保" class="sino-dialog-title"></sino-title>
      <sino-form :model="sendForm" :rules="sendRules" ref="sendForm">
        <sino-form-item prop="sendSsbDate" label="送社保日期：" class="sino-form-item-width">
          <sino-date-picker v-model="sendForm.sendSsbDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item prop="sendSsbOperator" label="办理人：" class="sino-form-item-width">
          <sino-input type="text" v-model="sendForm.sendSsbOperator"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sendSubmit">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaListByBusiAreaType,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        token: Cookie.get("Token"),
        searchFlag: false,
        creIdNameData: {
          orgId: undefined,
          roleTypes: [5]
        },
        mediQueryForm: {
          empName: '',
          certNo: '',
          handleScheduleName: ['待送社保', '待审核'],
          handleSchedule: [2, 3],
          areaName: '',
          areaId: '',
          paySuppName: '',
          paySuppId: '',
          custName: '',
          custId: '',
          respBusiRepId: '',
          respBusiRepName: '',
          respBusiDepId: '',
          respBusiDepName: ''
        },
        mediTableData: null,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        eavFailFlag: false,
        eavFailForm: {
          eavDate: '',
          eavReturnReason: ''
        },
        eavFailRules: {
          eavDate: [
            {type: 'date', required: true, message: '请选择审核日期', trigger: 'change'}
          ],
          eavReturnReason: [
            {required: true, message: '请输入审核不通过原因', trigger: 'change'}
          ]
        },
        submitErrFlag: false,
        eavPassFlag: false,
        eavPassForm: {
          eavDate: ''
        },
        eavPassRules: {
          eavDate: [
            {type: 'date', required: true, message: '请选择审核日期', trigger: 'change'}
          ]
        },
        sendFlag: false,
        sendForm: {
          sendSsbDate: new Date(),
          sendSsbOperator: Cookie.get('CPYY-INFO-NAME')
        },
        sendRules: {
          sendSsbDate: [
            {type: 'date', required: true, message: '请选择送社保日期', trigger: 'change'}
          ],
          sendSsbOperator: [
            {required: true, message: '请输入办理人', trigger: 'change'}
          ]
        },
        activeLine: ''
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      busiDepChange () {
        this.creIdNameData.orgId = this.mediQueryForm.respBusiDepId;
      },
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.mediQueryForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.sins.findAllMediMateReim, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mediTableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 审核不通过
      eavFailFun (data) {
        this.activeLine = data;
        this.eavFailFlag = true;
      },
      // 审核不通过确认
      eavFailSubmit () {
        this.$refs.eavFailForm.validate((valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.eavFailForm));
            obj.eavDate = Vue.filter('date')(obj.eavDate, 'yyyy-MM-dd');
            obj.mediMateReimId = this.activeLine.mediMateReimId;
            api.post(this.apiPath.sins.updateEavReturnById, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.viewAll(this.pageNum, this.pageSize);
                this.eavFailFlag = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 送社保
      sendFun () {
        if (Array.isArray(this.checkedArr) && this.checkedArr.length > 0) {
          let flag = true;
          for (let item of this.checkedArr) {
            if (item.handleSchedule !== 2) {
              flag = false;
              this.$alert('请选择办理进度为送社保的数据进行操作！', '温馨提示', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                }
              });
              return false;
            }
          }
          if (flag) {
            this.sendFlag = true;
          }
        } else {
          this.$alert('请选择要操作的数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      sendSubmit () {
        this.$refs.sendForm.validate((valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.sendForm));
            obj.sendSsbDate = Vue.filter('date')(obj.sendSsbDate, 'yyyy-MM-dd');
            obj.list = this.checkedArr.map(function (item) {
              return item.mediMateReimId;
            });
            api.post(this.apiPath.sins.sendSins, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.viewAll(this.pageNum, this.pageSize);
                this.sendFlag = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 审核通过
      eavFun () {
        if (Array.isArray(this.checkedArr) && this.checkedArr.length > 0) {
          let flag = true;
          for (let item of this.checkedArr) {
            if (item.handleSchedule !== 3) {
              flag = false;
              this.$alert('请选择办理进度为待审核的数据进行操作！', '温馨提示', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                }
              });
              return false;
            }
          }
          if (flag) {
            this.eavPassFlag = true;
          }
        } else {
          this.$alert('请选择要操作的数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      eavPassSubmit () {
        this.$refs.eavPassForm.validate((valid) => {
          if (valid) {
            let obj = JSON.parse(JSON.stringify(this.eavPassForm));
            obj.eavDate = Vue.filter('date')(obj.eavDate, 'yyyy-MM-dd');
            obj.list = this.checkedArr.map(function (item) {
              return item.mediMateReimId;
            });
            api.post(this.apiPath.sins.updateEavPassByListId, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.viewAll(this.pageNum, this.pageSize);
                this.eavPassFlag = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
