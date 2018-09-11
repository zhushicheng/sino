<template>
  <div class="usermanage">
    <sino-con style="margin-bottom: 15px;">
      <sino-title type="levelOne" title="导入批量查询"></sino-title>
      <sino-form :model="batchForm" :rules="batchRules" ref="batchForm" class="his-serch-form serch-form ">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one li-wid">
              <sino-form-item label="客户名称：" class="search-inner-item search-width" prop="custName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="custUrl"
                             :token="selectToken"
                             :chooseName.sync="batchForm.custName"
                             :chooseId.sync="batchForm.custId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-splice clear">
              <span class="two-dater-span">导入日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="begDate">
                  <sino-date-picker class="fl"
                                    v-model="batchForm.begDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="endDate">
                  <sino-date-picker class="fl"
                                    v-model="batchForm.endDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </div>
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
      <sino-auto-table :data="entTableData" max-height="235" stripe v-on:viewAll="viewAll" border class="mail-table radio-style-table" v-on:select="selectCallBack">
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="batchNo" label="批次号"></sino-table-column>
        <sino-table-column prop="fileName" label="文件名称" min-width="180"></sino-table-column>
        <sino-table-column label="客户名称" prop="custName" min-width="180"></sino-table-column>
        <sino-table-column prop="totalNum" label="总数量"></sino-table-column>
        <sino-table-column prop="succNum" label="成功数量"></sino-table-column>
        <sino-table-column prop="failNum" label="失败数量"></sino-table-column>
        <sino-table-column prop="creName" label="导入操作人" min-width="95"></sino-table-column>
        <sino-table-column prop="creTime" label="导入时间" min-width="160"></sino-table-column>
        <sino-table-column label="操作" align="center" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="souceFun(scope.row)">原文件</span>
            </template>
          </template>
        </sino-table-column>
      </sino-auto-table>
      <sino-page v-bind:page="pageNum"
                 v-bind:page-size="pageSize"
                 v-on:pagehandler="pageHandler"
                 :pageArray="pageArray"
                 v-on:choosePageFun="choooseNum"
                 v-bind:object="object"
                 :total="total"></sino-page>
    </sino-con>
    <sino-con>
      <sino-title type="levelOne" title="导入明细查询"></sino-title>
      <sino-form :model="batchDetailForm" ref="batchDetailForm" class="serch-form his-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one li-wid">
              <sino-form-item label="客户名称：" class="search-inner-item search-width" prop="custName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="custNewUrl"
                             :token="selectToken"
                             :data="custData"
                             :linkage="true"
                             @change="custChange"
                             :chooseName.sync="batchDetailForm.custName"
                             :chooseId.sync="batchDetailForm.custId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="商务合同名称：" class="search-inner-item search-width" prop="conName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="conUrl"
                             :token="selectToken"
                             :linkage="true"
                             :data="condata"
                             :chooseName.sync="batchDetailForm.conName"
                             :chooseId.sync="batchDetailForm.conId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="产品服务模板名称：" class="search-inner-item search-width" prop="serveTempName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :linkage="true"
                             :url="serviceUrl"
                             :token="selectToken"
                             :data="templateData"
                             :chooseName.sync="batchDetailForm.serveTempName"
                             :chooseId.sync="batchDetailForm.serveTempId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="雇员姓名：" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="batchDetailForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="身份证号：" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="batchDetailForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="派出地区：" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :data="{data: {areaTypes: [4,5]}}"
                             :token="selectToken"
                             :chooseName.sync="batchDetailForm.areaName"
                             :chooseId.sync="batchDetailForm.areaId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchDtetailFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('batchDetailForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl sino-tab-decl-empass">
        <sino-tab-pane label="成功数据" name="success" class="mt15">
          <sino-table :data="successTableData" max-height="416" stripe border v-on:viewAll="successViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="120"></sino-table-column>
            <sino-table-column prop="conName" label="商务合同名称" min-width="120"></sino-table-column>
            <sino-table-column prop="serveTempName" label="产品服务模板名称" min-width="120"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certNo" label="身份证号" min-width="200"></sino-table-column>
            <sino-table-column prop="phone" label="手机号码" min-width="170"></sino-table-column>
            <sino-table-column prop="email" label="邮箱地址" min-width="180"></sino-table-column>
            <sino-table-column prop="areaName" label="派出地区"></sino-table-column>
            <sino-table-column prop="begDate" label="订单开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="householdTypeName" label="户口性质"></sino-table-column>
            <sino-table-column prop="sinsDeclRadix" label="社保申报基数" min-width="120"></sino-table-column>
            <sino-table-column prop="accuDeclRadix" label="公积金申报基数" min-width="120"></sino-table-column>
            <sino-table-column prop="empInnerNo" label="员工内部编号" min-width="120"></sino-table-column>
            <sino-table-column prop="costCenterName" label="成本中心"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="batchdetail.pageNum" v-bind:page-size="batchdetail.pageSize" v-on:pagehandler="pageHandler1" :pageArray="batchdetail.pageArray" v-on:choosePageFun="choooseNum1" v-bind:object="object" :total="batchdetail.total"></sino-page>
        </sino-tab-pane>
        <sino-tab-pane label="失败数据" name="error" class="mt15">
          <sino-table :data="errorTableData"  max-height="416" stripe border v-on:viewAll="errorViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="failReason" label="失败原因" min-width="120"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="120"></sino-table-column>
            <sino-table-column prop="conName" label="商务合同名称" min-width="120"></sino-table-column>
            <sino-table-column prop="serveTempName" label="产品服务模板名称" min-width="160"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="phone" label="手机号码" min-width="170"></sino-table-column>
            <sino-table-column prop="email" label="邮箱地址" min-width="180"></sino-table-column>
            <sino-table-column prop="certNo" label="身份证号" min-width="200"></sino-table-column>
            <sino-table-column prop="areaName" label="派出地区"></sino-table-column>
            <sino-table-column prop="begDate" label="订单开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="householdTypeName" label="户口性质"></sino-table-column>
            <sino-table-column prop="sinsDeclRadix" label="社保申报基数" min-width="120"></sino-table-column>
            <sino-table-column prop="accuDeclRadix" label="公积金申报基数" min-width="120"></sino-table-column>
            <sino-table-column prop="empInnerNo" label="员工内部编号" min-width="120"></sino-table-column>
            <sino-table-column prop="costCenterName" label="成本中心"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="losePage.pageNum" v-bind:page-size="losePage.pageSize" v-on:pagehandler="pageHandlerLose" :pageArray="losePage.pageArray" v-on:choosePageFun="choooseNumLose" v-bind:object="object" :total="losePage.total"></sino-page>
        </sino-tab-pane>
      </sino-tabs>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        custNewUrl: this.apiPath.hrsc.custSelectBox,
        conUrl: this.apiPath.hrsc.findByCustIdSelectBox,
        serviceUrl: this.apiPath.hrsc.findServeTempSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        selectToken: Cookies.get('Token'),
        batchForm: {
          custName: '',
          custId: '',
          begDate: '',
          endDate: ''
        },
        custData: {areaId: ''},
        condata: {id: ''},
        templateData: {custId: ''},
        batchRules: {},
        entTableData: null,
        total: null,
        pageNum: 1,
        pageSize: 5,
        pageArray: [5, 10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        batchDetailForm: {
          areaId: '',
          areaName: '',
          certNo: '',
          empName: '',
          serveTempId: '',
          serveTempName: '',
          conName: '',
          conId: '',
          custId: '',
          custName: '',
          impResult: '',
          batchNo: ''
        },
        successTableData: null,
        batchdetail: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [5, 10, 20, 30, 50]
        },
        errorTableData: null,
        losePage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [5, 10, 20, 30, 50]
        },
        activeName: 'success',
        checkedArr: []
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
      handleClick (tab, event) {
        this.activeName = tab.name;
        if (this.activeName === 'error') {
          this.losePage.pageNum = 1;
          this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
        } else {
          this.batchdetail.pageNum = 1;
          this.successViewAll(this.batchdetail.pageNum, this.batchdetail.pageSize);
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedArr = selectTion;
        this.custFun();
        this.searchDtetailFun();
      },
      custChange () {
        this.condata.id = this.batchDetailForm.custId;
        this.templateData.custId = this.batchDetailForm.custId;
      },
      custFun () {
        if (this.checkedArr && this.checkedArr.length === 1) {
          this.custData.areaId = this.checkedArr[0].batchNo;
        } else {
          this.custData.areaId = '';
        }
      },
      viewAll (pageNum, pageSize) {
        this.batchForm.begDate = Vue.filter('date')(this.batchForm.begDate, 'yyyy-MM-dd');
        this.batchForm.endDate = Vue.filter('date')(this.batchForm.endDate, 'yyyy-MM-dd');
        let _data = {
          data: this.batchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllFile, _data).then(res => {
          this.entTableData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      successViewAll (pageNum, pageSize) {
        if (this.checkedArr && this.checkedArr.length === 1) {
          this.batchDetailForm.batchNo = this.checkedArr[0].batchNo;
        } else {
          this.batchDetailForm.batchNo = '';
        }
        let _obj = {
          data: {},
          pageNum: pageNum,
          pageSize: pageSize
        };
        _obj.data = this.batchDetailForm;
        _obj.data.impResult = 3;
        api.post(this.apiPath.hrsc.findAllOrderBatch, _obj).then(res => {
          this.successTableData = res.data.list;
          this.batchdetail.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      errorViewAll (pageNum, pageSize) {
        if (this.checkedArr && this.checkedArr.length === 1) {
          this.batchDetailForm.batchNo = this.checkedArr[0].batchNo;
        } else {
          this.batchDetailForm.batchNo = '';
        }
        let _data = {
          pageNum: pageNum,
          pageSize: pageSize
        };
        _data.data = this.batchDetailForm;
        _data.data.impResult = 2;
        api.post(this.apiPath.hrsc.findAllOrderBatch, _data).then(res => {
          this.errorTableData = res.data.list;
          this.losePage.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchDtetailFun () {
        if (this.activeName === 'success') {
          this.batchdetail.pageNum = 1;
          this.successViewAll(this.batchdetail.pageNum, this.batchdetail.pageSize);
        } else {
          this.batchdetail.pageNum = 1;
          this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
        }
      },
      // 源文件
      souceFun (_data) {
        api.postsign(this.apiPath.hrsc.originalDownload, _data.fileId).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      pageHandler1: function (pageNum) {
        this.batchdetail.pageNum = pageNum;
        this.successViewAll(pageNum, this.batchdetail.pageSize);
      },
      choooseNum1: function (pageSize) {
        this.batchdetail.pageSize = pageSize;
        this.batchdetail.pageNum = 1;
        this.successViewAll(this.batchdetail.pageNum, pageSize);
      },
      pageHandlerLose: function (pageNum) {
        this.losePage.pageNum = pageNum;
        this.errorViewAll(pageNum, this.losePage.pageSize);
      },
      choooseNumLose: function (pageSize) {
        this.losePage.pageSize = pageSize;
        this.losePage.pageNum = 1;
        this.errorViewAll(this.losePage.pageNum, pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
