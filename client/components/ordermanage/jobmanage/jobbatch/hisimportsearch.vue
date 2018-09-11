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
            <!--<li>
              <sino-form-item label="操作类型：" class="search-inner-item" prop="dataTypeName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="custUrl"
                             :token="selectToken"
                             :chooseName.sync="batchForm.dataTypeName"
                             :chooseId.sync="batchForm.dataType"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>-->
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
        <sino-table-column prop="dataTypeName" label="操作类型"></sino-table-column>
        <sino-table-column prop="totalNum" label="总数量"></sino-table-column>
        <sino-table-column prop="succNum" label="成功数量"></sino-table-column>
        <sino-table-column label="失败数量">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              {{scope.row.failNum}}
              <span v-if="scope.row.failNum > 0" class="table-span" @click="downloadFun(scope.row.batchNo)">下载</span>
            </template>
          </template>
        </sino-table-column>
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
        <sino-tab-pane label="成功-正常" name="success" class="mt15">
          <sino-table :data="successTableData" max-height="416" stripe border v-on:viewAll="successViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="120"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="150"></sino-table-column>
            <sino-table-column prop="leaveReasonName" label="离职原因" min-width="170"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="conName" label="商务合同" min-width="180"></sino-table-column>
            <sino-table-column prop="remark" label="备注" min-width="120"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="batchdetail.pageNum" v-bind:page-size="batchdetail.pageSize" v-on:pagehandler="pageHandler1" :pageArray="batchdetail.pageArray" v-on:choosePageFun="choooseNum1" v-bind:object="object" :total="batchdetail.total"></sino-page>
        </sino-tab-pane>
        <sino-tab-pane label="成功-延迟停" name="succ" class="mt15">
          <sino-table :data="succOutData" max-height="416" stripe border v-on:viewAll="successViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="120"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="150"></sino-table-column>
            <sino-table-column prop="leaveReasonName" label="离职原因" min-width="170"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="conName" label="商务合同" min-width="180"></sino-table-column>
            <sino-table-column prop="remark" label="备注" min-width="120"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="succPage.pageNum" v-bind:page-size="succPage.pageSize" v-on:pagehandler="pageHandlerSucc" :pageArray="succPage.pageArray" v-on:choosePageFun="choooseNumSucc" v-bind:object="object" :total="succPage.total"></sino-page>
        </sino-tab-pane>
        <sino-tab-pane label="失败详情" name="error" class="mt15">
          <sino-table :data="errorTableData"  max-height="416" stripe border v-on:viewAll="errorViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="failReason" label="失败原因" min-width="180"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="100"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="150"></sino-table-column>
            <sino-table-column prop="leaveReasonName" label="离职原因" min-width="170"></sino-table-column>
            <sino-table-column prop="conName" label="商务合同" min-width="180"></sino-table-column>
            <sino-table-column prop="remark" label="备注" min-width="120"></sino-table-column>
          </sino-table>
          <sino-page v-bind:page="losePage.pageNum" v-bind:page-size="losePage.pageSize" v-on:pagehandler="pageHandlerLose" :pageArray="losePage.pageArray" v-on:choosePageFun="choooseNumLose" v-bind:object="object" :total="losePage.total"></sino-page>
        </sino-tab-pane>
      </sino-tabs>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        custNewUrl: this.apiPath.hrsc.findCcustSelectBox,
        conUrl: this.apiPath.hrsc.findByCustIdSelectBox,
        serviceUrl: this.apiPath.hrsc.findServeTempSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        selectToken: Cookies.get('Token'),
        batchForm: {
          custName: '',
          custId: '',
          begDate: '',
          endDate: '',
          dataTypeName: '',
          dataType: 2
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
          pageArray: [10, 20, 30, 50]
        },
        succOutData: null,
        succPage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        errorTableData: null,
        losePage: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        activeName: 'success',
        checkedArr: []
      };
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
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedArr = selectTion;
        this.custFun();
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
        this.batchForm.dataType = 2;
        let _data = {
          data: this.batchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findOrderLeaveImpInfo, _data).then(res => {
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
      // 成功-正常
      successViewAll (pageNum, pageSize) {
        if (this.checkedArr && this.checkedArr.length === 1) {
          this.batchDetailForm.batchNo = this.checkedArr[0].batchNo;
        } else {
          this.batchDetailForm.batchNo = '';
        }
        let aa = JSON.parse(JSON.stringify(this.batchDetailForm));
        aa.impResult = 1;
        let _obj = {
          data: aa,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findOrderLeaveImpDelInfo, _obj).then(res => {
          this.successTableData = res.data.list;
          this.batchdetail.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 成功-延迟停
      succOutViewAll (pageNum, pageSize) {
        if (this.checkedArr && this.checkedArr.length === 1) {
          this.batchDetailForm.batchNo = this.checkedArr[0].batchNo;
        } else {
          this.batchDetailForm.batchNo = '';
        }
        let aa = JSON.parse(JSON.stringify(this.batchDetailForm));
        aa.impResult = 3;
        let _obj = {
          data: aa,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findOrderLeaveImpDelInfo, _obj).then(res => {
          this.succOutData = res.data.list;
          this.succPage.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 失败
      errorViewAll (pageNum, pageSize) {
        if (this.checkedArr && this.checkedArr.length === 1) {
          this.batchDetailForm.batchNo = this.checkedArr[0].batchNo;
        } else {
          this.batchDetailForm.batchNo = '';
        }
        let aa = JSON.parse(JSON.stringify(this.batchDetailForm));
        aa.impResult = 2;
        let _data = {
          data: aa,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findOrderLeaveImpDelInfo, _data).then(res => {
          this.errorTableData = res.data.list;
          this.losePage.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchDtetailFun () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择一条导入批量数据', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        this.batchdetail.pageNum = 1;
        this.successViewAll(this.batchdetail.pageNum, this.batchdetail.pageSize);
        this.succPage.pageNum = 1;
        this.succOutViewAll(this.succPage.pageNum, this.succPage.pageSize);
        this.losePage.pageNum = 1;
        this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
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
      // 失败数量下载
      downloadFun (batchNo) {
        api.post(this.apiPath.hrsc.downloadOrderLeaveDataByBatNo, {batchNo: batchNo, impType: 2}).then(res => {
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
      pageHandlerSucc: function (pageNum) {
        this.succPage.pageNum = pageNum;
        this.succOutViewAll(pageNum, this.succPage.pageSize);
      },
      choooseNumSucc: function (pageSize) {
        this.succPage.pageSize = pageSize;
        this.succPage.pageNum = 1;
        this.succOutViewAll(this.succPage.pageNum, pageSize);
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
