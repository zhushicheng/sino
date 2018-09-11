<template>
  <!--<div>社保申报审核详情</div>-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun">合计</div>
          <div class="sino-tabs-item is-active">详情</div>
        </div>
      </div>
    </div>
    <sino-con class="sino-con-more">
      <sino-form :model="sinsDetailForm" ref="sinsDetailForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one li-wid">
              <sino-form-item label="社保账号名称：" class="search-inner-item" prop="custSinsNameList">
                <sino-select :filterable="true" class="multiple-choice"
                  :multiselect="true"
                  :isshowTotol="false"
                  :disabled="false"
                  :totalNum="false"
                  :isPage="true"
                  :isGroup="false"
                  :url="apiPath.sins.findSinsAcctByIds"
                  :chooseName.sync="sinsDetailForm.custSinsNameList"
                  :chooseId.sync="sinsDetailForm.custSinsIdList"
                  :data="sinsIdObj"
                  :linkage="true"
                  :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="申报类型：" class="search-inner-item" prop="sinsStateList">
                <sino-checkbox-group v-model="sinsDetailForm.sinsStateList" class="mt5 checkbox-label-mr2">
                  <sino-checkbox :label="list.id" v-for="(list, index) in sinsTypeList" :key="index">{{list.title}}</sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="申报状态：" class="search-inner-item" prop="stateList">
                <sino-checkbox-group v-model="sinsDetailForm.stateList" class="mt5 checkbox-label-mr1">
                  <sino-checkbox :label="list.id" v-for="(list, index) in sinsStateList" :key="index" v-if="list.id !== 1">{{list.title}}</sino-checkbox>
                </sino-checkbox-group>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li class="li-wid">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custInfoSelectBox"
                                 :token="token"
                                 :chooseName.sync="sinsDetailForm.custName"
                                 :chooseId.sync="sinsDetailForm.custId" :clear="true"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="签约供应商：" class="search-inner-item" prop="signSuppName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="selectBox"
                                 :token="token"
                                 :chooseName.sync="sinsDetailForm.signSuppName"
                                 :chooseId.sync="sinsDetailForm.signSuppId"
                                 :data="{code: 'SUPP_TYPE'}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text"
                                v-model="sinsDetailForm.empName"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text"
                                v-model="sinsDetailForm.certNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保个人编号：" class="search-inner-item" prop="perComCode">
                    <sino-input class="fl" type="text"
                                v-model="sinsDetailForm.perComCode"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务年月：" class="search-inner-item" prop="natMon">
                    <sino-date-picker v-model="sinsDetailForm.natMon" type="month" :editable="false" :readonly="false">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                    <sino-date-picker v-model="sinsDetailForm.applyMon" type="month" :editable="false" :readonly="false">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="问题人员类型：" class="search-inner-item" prop="questionPerTypeName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :chooseName.sync="sinsDetailForm.questionPerTypeName"
                                 :chooseId.sync="sinsDetailForm.questionPerType"
                                 :data="{code: 'QUESTION_PER_TYPE'}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="问题人员状态：" class="search-inner-item" prop="questionPerStateName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :chooseName.sync="sinsDetailForm.questionPerStateName"
                                 :chooseId.sync="sinsDetailForm.questionPerState"
                                 :data="{code: 'QUESTION_PER_STATE'}"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="salesRoleNameList">
                    <sino-select :filterable="true"
                                 :multiselect="true"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findUserByOrgIdsAndRoleType"
                                 :data="{orgId: 1, roleTypes:[5]}"
                                 :chooseName.sync="sinsDetailForm.salesRoleNameList"
                                 :chooseId.sync="sinsDetailForm.salesRoleIdList"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-button-box-1">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
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
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon sino-table-icon-show">
          <div class="sino-table-icon-left more-table-button">
            <sino-button type="icon-text" @click="declarePubFun('applyPassDet')"><i class="iconfont sino-textFile"></i>申报</sino-button>
            <sino-button type="icon-text" @click="declarePubFun('applySuccessDet')"><i class="iconfont sino-queren"></i>申报成功</sino-button>
            <sino-button type="icon-text" @click="LabelingProFun"><i class="iconfont sino-biaoji"></i>标记问题人员</sino-button>
            <sino-button type="icon-text" @click="declarePubFun('publishQuestionPerAction')"><i class="iconfont sino-fabu"></i>发布问题人员</sino-button>
            <sino-dropdown trigger="click" @visible-change="dropdownDel" class="table-top-dropdown1 el-dropdown-no-stroke" @command="handleCommand" style="top:-16px;left:-10px;">
              <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false" :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
                <i class="iconfont sino-invalid"></i>取消操作<i class="iconfont sino-unie628"></i>
              </span>
              <sino-dropdown-menu>
                <sino-dropdown-item command="1" class="dropdown-item-no-border">取消申报</sino-dropdown-item>
                <sino-dropdown-item command="2" class="dropdown-item-no-border">取消问题人员</sino-dropdown-item>
                <sino-dropdown-item command="3" class="dropdown-item-no-border">审核退回</sino-dropdown-item>
                <sino-dropdown-item command="4" class="dropdown-item-no-border">取消申报成功</sino-dropdown-item>
              </sino-dropdown-menu>
            </sino-dropdown>
            <sino-checkbox v-model="checked" :style="checkboxStyle">险种合一</sino-checkbox>
          </div>
        </div>
        <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl">
          <sino-tab-pane :label="item.proPayName" :name="'step'+ index" v-for="(item, index) in insurance" :key="index">
            <div class="sino-queryspan">
              <span>合计：<em>{{total === null ? 0:total}}</em> 条
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                已勾选：<em>{{checkedArr.length}}</em> 条
              </span>
            </div>
            <sino-table :data="sinsDeclData" border height="356" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
              <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60"></sino-table-column>
              <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="120"></sino-table-column>
              <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="220"></sino-table-column>
              <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
              <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
              <sino-table-column prop="perComCode" label="社保个人编号" min-width="180"></sino-table-column>
              <sino-table-column prop="dealMon" label="业务年月" min-width="140"></sino-table-column>
              <sino-table-column prop="applyMon" label="申报年月" min-width="100"></sino-table-column>
              <sino-table-column prop="sinsStateName" label="申报类型" min-width="100"></sino-table-column>
              <sino-table-column prop="stateName" label="申报状态" min-width="100"></sino-table-column>
              <sino-table-column prop="declWage" label="申报基数" type="money" width="120"></sino-table-column>
              <sino-table-column prop="perRadix" label="个人基数" type="money" width="120"></sino-table-column>
              <sino-table-column prop="perPayProp" label="个人比例(%)" min-width="120"></sino-table-column>
              <sino-table-column prop="perAddiMoney" label="个人附加" min-width="100"></sino-table-column>
              <sino-table-column prop="perPay" label="个人缴纳" type="money" width="120"></sino-table-column>
              <sino-table-column prop="unitRadix" label="企业基数" type="money" width="120"></sino-table-column>
              <sino-table-column prop="entPayProp" label="企业比例(%)" min-width="120"></sino-table-column>
              <sino-table-column prop="entAddiMoney" label="企业附加" min-width="100"></sino-table-column>
              <sino-table-column prop="unitPay" label="企业缴纳" type="money" width="120"></sino-table-column>
              <sino-table-column prop="isQuestionPer" label="是否问题人员" min-width="120"></sino-table-column>
              <sino-table-column prop="questionPerType" label="问题人员类型" min-width="120"></sino-table-column>
              <sino-table-column prop="queDesc" label="问题人员描述" min-width="120"></sino-table-column>
              <sino-table-column prop="questionPerStateName" label="问题人员状态" min-width="120"></sino-table-column>
              <sino-table-column prop="creRoleName" label="业务员" min-width="100"></sino-table-column>
              <sino-table-column prop="busiCustName" label="客户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="signSuppName" label="签约供应商" min-width="200"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
          </sino-tab-pane>
        </sino-tabs>
      </div>
    </div>

    <sino-dialog :visible.sync="conFlag" size="small" class="leads-follow dialog-item"  @close ="cleanContent('delayForm')">
      <sino-title slot="title" type="levelOne" title="标记问题人员" class="sino-dialog-title"></sino-title>
      <sino-form   :model="delayForm" ref="delayForm" :rules="delayRules" class="delayStyle">
        <sino-form-item label="问题人员类型："  class="search-inner-item" prop="questionPerTypeName">
          <sino-select :filterable="true"
                       :multiselect="true"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="dictSelUrl"
                       :chooseName.sync="delayForm.questionPerTypeName"
                       :chooseId.sync="delayForm.questionPerTypes"
                       :data="{code: 'QUESTION_PER_TYPE'}"
                       :clear="true"></sino-select>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="declarePubFun('markQuesstionPerAction')">确 定</sino-button>
      </span>
    </sino-dialog>

  </div>
</template>
<script>
  let checkedArr = [];
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.name.split('.')[1];
    let _arr = ['xlsx', 'xls'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    }  else {
      _this.$alert('请上传excel文件！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };
  export default {
    data () {
      return {
        token: Cookie.get("Token"),
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        custInfoSelectBox: this.apiPath.hrsc.findCustSelectInfo1,
        findSalesmanSelectBox: this.apiPath.sins.findSalesmanSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        conFlag: false,
        checkedArr: [],
        declarationType: [],    //  申报类型
        sinsIdObj: {paramIds: []},
        delayForm: {
          questionPerTypeName: [],
          questionPerTypes: []
        },
        sinsDetailForm: {
          custSinsNameList: [],
          custSinsIdList: [],
          sinsStateList: [],
          stateList: [],
          custName: '',
          custId: '',
          signSuppName: '',
          signSuppId: '',
          empName: '',
          certNo: '',
          perComCode: '',
          natMon: '',
          applyMon: '',
          questionPerTypeName: '',
          questionPerType: '',
          questionPerStateName: '',
          questionPerState: '',
          salesRoleNameList: [],
          salesRoleIdList: []
        },
        insurance: [],  //  字典查询的险种
        illData: null,
        illPage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        sinsDeclData: null, // 养老
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
        },
        searchFlag: false,
        activeName: 'step0',
        importVisible: false,
        conForm: {},
        conDetailForm: {},
        sinsStateList: [],
        sinsTypeList: [],
        dropdown: false,
        checkboxStyle: {
          position: 'absolute',
          top: '50px',
          left: 0
        },
        checked: false,
        delayRules: {
          questionPerTypeName: [
            {required: true, message: '请选择问题人员类型', trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      if (typeof this.$route.query.sinsAcctIds === 'string') {
        this.$route.query.sinsAcctIds = [this.$route.query.sinsAcctIds];
      }
      this.sinsIdObj.paramIds = this.$route.query.sinsAcctIds;
      api.post(this.dictSelUrl, {code: 'REPORT_TYPE'}).then(res => {
        this.sinsTypeList = res.data.list;
      });
      api.post(this.dictSelUrl, {code: 'APPLY_STATE'}).then(res => {
        this.sinsStateList = res.data.list;
      });
      let that = this;
      setTimeout(function () {
        that.checkboxStyle.left = (document.getElementsByClassName('sino-tabs-nav')[1].clientWidth + 25) + 'px';
      }, 500);
      if (this.$route.query.sinsAcctIds) {
        api.post(this.apiPath.sins.findSinsAcctByIds, {paramIds: this.$route.query.sinsAcctIds}).then(res => {
          if (res.code === 'CPYY-00001') {
            JSON.parse(JSON.stringify(res.data.list)).forEach(function (item) {
              this.sinsDetailForm.custSinsNameList.push(item.title);
              this.sinsDetailForm.custSinsIdList.push(item.id);
            }, this);
            this.insuranceType();
          }
        });
      } else {
        this.insuranceType();
      }
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      handleCommand (command) {
        if (command === '1') {
          this.declarePubFun('cancelApplyDet');
        } else if (command === '2') {
          this.declarePubFun('cannelQuestionPerAction');
        } else if (command === '3') {
          this.declarePubFun('handleReturnDet');
        } else if (command === '4') {
          this.declarePubFun('cancelApplySuccDet');
        }
      },
      cleanContent (formName) {
        for (var key in this.delayForm) {
          this.delayForm[key] = [];
        }
      },
      // 判断table是否有选择
      haveSelected () {
        if (!(this.checkedArr && this.checkedArr.length > 0)) {
          this.$alert('请选择至少一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return false;
        } else {
          return true;
        }
      },
      // 详情页 获取险种
      insuranceType () {
        api.post(this.apiPath.hrsc.findProPaySins, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.insurance = res.data;
            this.viewAll(this.pageNum, this.pageSize, 0);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      prodScheFun (order) {
        this.$router.push({path: '/sinsDeclareTotal'});
      },
      selectCallBack (selectTion, row) {
        checkedArr = selectTion;
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      handleClick (tab) {
        this.viewAll(1, this.pageSize, parseInt(tab.index));
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize, index) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: JSON.parse(JSON.stringify(this.sinsDetailForm))
        };
        if (obj.data.natMon) {
          obj.data.natMon = Vue.filter('date')(obj.data.natMon, 'yyyy-MM').replace('-', '');
        };
        if (obj.data.applyMon) {
          obj.data.applyMon = Vue.filter('date')(obj.data.applyMon, 'yyyy-MM').replace('-', '');
        };
        obj.data.productId = this.insurance[index].proPayId;
        api.post(this.apiPath.sins.findAllDet, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize, this.activeName[4]);
      },
      // 差异对比
      conFun () {
        this.conFlag = true;
      },
      getTableList (url, obj) {
        api.post(this.apiPath.sins[url], obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchFun();
            let tipString = '';
            if (url === 'applyPassDet') {
              tipString = '操作成功！';
            } else if (url === 'applySuccessDet') {
              tipString = '操作成功！';
            } else if (url === 'handleReturnDet') {
              tipString = '操作成功！';
            } else if (url === 'cancelApplyDet') {
              tipString = '操作成功！';
            } else if (url === 'markQuesstionPerAction') {
              this.conFlag = false;
              tipString = '标记问题人员成功！';
            } else {
              tipString = '操作成功！';
            }
            this.$message({message: tipString, type: 'success'});
          }
        });
      },
      LabelingProFun () {
        if (this.haveSelected()) {
          console.log(checkedArr);
          let obj = {
            fiveProduct: Number(this.checked),
            questionPerTypes: [],
            monthlyDetList: []
          };
          checkedArr.forEach(function (item) {
            obj.monthlyDetList.push({
              orderId: item.orderId,
              orderDetId: item.orderDetId,
              sinsState: item.sinsState
            });
          }, this);
          api.post(this.apiPath.sins.checkMarkQuestionPer, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data) {
                this.$confirm(res.data, '提示信息', {
                  confirmButtonText: '确 定',
                  cancelButtonText: ' ',
                  type: 'warning'
                }).then(() => {
                  this.conFlag = true;
                }).catch(() => {
                });
              } else {
                this.conFlag = true;
              }
            }
          });
        }
        return;
      },
      // 申报详情
      declarePubFun (url) {
        if (this.haveSelected()) {
          let obj = {
            fiveProduct: Number(this.checked),
            questionPerTypes: this.delayForm.questionPerTypes,
            monthlyDetList: []
          };
          this.checkedArr.forEach(function (item) {
            obj.monthlyDetList.push({
              orderId: item.orderId,
              orderDetId: item.orderDetId,
              sinsState: item.sinsState
            });
          }, this);
          this.getTableList(url, obj);
          // if (Number(this.checked)) {
          //   var num;
          //   if (url === 'applyPassDet') {
          //     num = 3;
          //   } else if (url === 'applySuccessDet') {
          //     num = 5;
          //   } else if (url === 'handleReturnDet') {
          //     num = 1;
          //   } else if (url === 'cancelApplyDet') {
          //     num = 2;
          //   } else {
          //     num = 4;
          //   }
          //   api.post(this.apiPath.sins.findIsExistApply, {state: num, monthlyDetList: obj.monthlyDetList}).then(res => {
          //     if (res.code === 'CPYY-00001') {
          //       if (res.data) {
          //         this.$confirm(res.data + '已进行过此操作，是否覆盖原操作？', '提示信息', {
          //           confirmButtonText: '确 定',
          //           cancelButtonText: ' ',
          //           type: 'warning'
          //         }).then(() => {
          //           this.getTableList(url, obj);
          //         });
          //       } else {
          //         this.getTableList(url, obj);
          //       }
          //     }
          //   });
          // } else {
          //   this.getTableList(url, obj);
          // }
        }
      },
      downFun () {},
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize, this.activeName[4]);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize, this.activeName[4]);
      },
      resetFun () {
        this.$refs.sinsDetailForm.resetFields();
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
