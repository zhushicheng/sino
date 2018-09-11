<template>
  <!--公积金公摊表-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="公积金数据实时查询"></sino-title>
      <sino-form :model="accuDataForm" ref="accuDataForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box invoice-ul">
            <li class="search-inner-name">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input class="fl" type="text" v-model="accuDataForm.empName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text" v-model="accuDataForm.certNo"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <sino-form-item label="业务年月：" class="search-inner-item" prop="paymentMonth">
                <sino-date-picker
                  v-model="accuDataForm.paymentMonthOld"
                  type="month"
                  placeholder=""
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                <sino-date-picker
                  v-model="accuDataForm.applyMonOld"
                  type="month"
                  :editable="false"
                  :readonly="false">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li  v-if="searchFlag">
              <span class="search-inner-name">个人账号：</span>
              <sino-input class="fl" type="text" v-model="accuDataForm.perNo"></sino-input>
            </li>
            <li  v-if="searchFlag">
              <span class="search-inner-name">执行地区：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findAreaListByBusiAreaType"
                           :chooseName.sync="accuDataForm.execuAreaName"
                           :chooseId.sync="accuDataForm.execuAreaId"
                           :data="{data: {busiAreaTypes:[1]}}"
                           :clear="true" >
              </sino-select>
            </li>
            <li  v-if="searchFlag">
              <span class="search-inner-name">申报状态：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code: 'APPLY_STATE'}"
                           :chooseName.sync="accuDataForm.appStateName"
                           :chooseId.sync="accuDataForm.appState"
                           :clear="true" >
              </sino-select>
            </li>

            <li  v-if="searchFlag" class="invoice-li">
              <span class="search-inner-name invoice-li-width">客户名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :token="token"
                           :url="custUrl"
                           :chooseName.sync="accuDataForm.custName"
                           :chooseId.sync="accuDataForm.custId"
                           :clear="true"
              >
              </sino-select>
            </li>
            <li  v-if="searchFlag" class="invoice-li">
              <span class="search-inner-name invoice-li-width">签约供应商：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="selectBox"
                           :token="token"
                           :data="{code: 'SUPP_TYPE'}"
                           :chooseName.sync="accuDataForm.ordSendSuppName"
                           :chooseId.sync="accuDataForm.ordSendSuppId"
                           :clear="true" >
              </sino-select>
            </li>
            <li  v-if="searchFlag">
              <span class="search-inner-name">单位账号：</span>
             <sino-input class="fl" type="text" v-model="accuDataForm.unitRegiNo"></sino-input>
            </li>
            <li  v-if="searchFlag">
              <span class="search-inner-name">账户名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findAccuAcctSelect"
                           :chooseName.sync="accuDataForm.accuAcctName"
                           :chooseId.sync="accuDataForm.accuAcctId"
                           :clear="true" >
              </sino-select>
            </li>

          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('accuDataForm')" v-if="searchFlag">重 置</sino-button>
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
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total ">
        <sino-table :data="tableData" max-height="416" border v-on:viewAll="viewAll" class="mt15" stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="80"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="250"></sino-table-column>
          <sino-table-column prop="perNo" label="个人账号"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="160"></sino-table-column>
          <sino-table-column prop="paymentMonth" label="业务年月" min-width="160"></sino-table-column>
          <sino-table-column prop="applyMon" label="申报年月" min-width="160"></sino-table-column>
          <sino-table-column prop="payTypeName" label="申报类型" min-width="160"></sino-table-column>
          <sino-table-column prop="accuProp" label="比例（%）" min-width="160"></sino-table-column>
          <sino-table-column prop="appStateName" label="申报状态" min-width="160"></sino-table-column>
          <sino-table-column prop="perBase" label="申报基数" type="money" width="160"></sino-table-column>
          <sino-table-column prop="entPayAmo" label="企业缴纳" type="money" width="160"></sino-table-column>
          <sino-table-column prop="perPayAmo" label="个人缴纳" type="money" width="160"></sino-table-column>
          <sino-table-column prop="unitRegiNo" label="单位账号" min-width="160"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="账户名称" min-width="160"></sino-table-column>
          <sino-table-column prop="dataSourceName" label="问题人员来源" min-width="160"></sino-table-column>
          <sino-table-column prop="questionPerTypeName" label="问题人员类型" min-width="160"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="160"></sino-table-column>
          <sino-table-column prop="ordSendSuppName" label="签约供应商" min-width="160"></sino-table-column>
          <sino-table-column prop="busiName" label="业务员" min-width="160"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--生成分摊表-->
    <sino-dialog :visible.sync="makeFlag" class="batch-error" v-on:close="resetFun('makeForm')">
      <sino-title slot="title" type="levelOne" title="生成分摊表" class="sino-dialog-title"></sino-title>
      <sino-form :model="makeForm" :rules="makeRules" ref="makeForm">
        <sino-form-item prop="regStateName" label="执行地区：" class="sino-form-item-width">
          <sino-select class="fl"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="makeForm.regStateName"
                       :chooseId.sync="makeForm.regState"
                       :clear="true"
                       :data="{code: 'USER_STATE', ids: [2, 4, 5]}"
                       :url="dictSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item prop="feekbackDate" label="申报年月：" class="sino-form-item-width">
          <sino-date-picker v-model="makeForm.feekbackDate" type="date" :editable="false" :readonly="false" format="yyyy-MM-dd" :clearable="false">
          </sino-date-picker>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="makeSubmit">生成分摊表</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  export default {
    components: {},
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,  // 字典下拉框
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        custAllUrl: this.apiPath.hrsc.findCustAndSuppSelectBox,
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        findAccuAcctSelect: this.apiPath.accu.findAccuAcctSelect,
        selectBox: this.apiPath.hrsc.selectBox, // g 供应商名称下拉框
        searchFlag: false,
        accuDataForm: {
          empName: '', // 雇员姓名
          certNo: '', // 证件号码
          paymentMonth: '', // 201803业务年月
          paymentMonthOld: '', // 201803业务年月
          applyMon: '', // 申报年月
          applyMonOld: '',
          execuAreaName: '',
          execuAreaId: '', // 执行地区
          appState: '',
          appStateName: '',
          custId: '',
          custName: '',
          ordSendSuppId: '',
          ordSendSuppName: '',
          unitRegiNo: '',
          perNo: '',
          accuAcctName: '',
          accuAcctId: ''
        },
        accuShareForm: { // 搜索条件
          loginName: '',
          fullName: '',
          certNo: '',
          regState: '',
          regStateName: '',
          corpId: '',
          corpName: ''
        },
        token: Cookie.get("Token"),
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
        makeFlag: false,
        makeForm: {
          regStateName: '',
          feekbackDate: ''
        },
        makeRules: {
          regStateName: [
            {required: true, message: '请选择执行地区', trigger: 'change'}
          ],
          feekbackDate: [
            {type: 'date', required: true, message: '请选择申报年月', trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      this.accuDataForm.applyMonOld = new Date();
      this.accuDataForm.applyMon = Vue.filter('date')(this.accuDataForm.applyMonOld, 'yyyy-MM');
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        this.accuDataForm.applyMon = Vue.filter('date')(this.accuDataForm.applyMonOld, 'yyyy-MM');
        this.accuDataForm.paymentMonth = Vue.filter('date')(this.accuDataForm.paymentMonthOld, 'yyyy-MM');
        this.accuDataForm.applyMon = this.accuDataForm.applyMon.replace(/-/g, '');
        this.accuDataForm.paymentMonth = this.accuDataForm.paymentMonth.replace(/-/g, '');
        let data = {
          data: this.accuDataForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.accu.findActualData, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun (formName) {
        for (var key in this.accuDataForm) {
          this.accuDataForm[key] = '';
        }
      },
      // 生成分摊表
      makeFun () {
        this.makeFlag = true;
      },
      makeSubmit () {
        this.$refs.makeForm.validate((valid) => {
          if (valid) {
            this.makeFlag = false;
            let _this = this;
            this.$confirm('贵安新区（申报年月：201802）存在未完成支付的账户，请支付后再生成分摊表。', '提示信息', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {}).catch(() => {
              console.log('失效失败!');
            });
          }
        });
      },
      // 下载
      downloadFun () {},
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      resetForm: function (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
