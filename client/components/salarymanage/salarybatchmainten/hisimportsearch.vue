<template>
  <div class="usermanage">
    <sino-con style="margin-bottom: 15px;">
      <sino-title type="levelOne" title="导入批量查询"></sino-title>
      <sino-form :model="batchForm" :rules="batchRules" ref="batchForm" class="his-serch-form serch-form ">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one li-wid">
              <sino-form-item label="客户/供应商名称：" class="search-inner-item search-width" prop="custSuppName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="custUrl"
                             :token="selectToken"
                             :chooseName.sync="batchForm.custSuppName"
                             :chooseId.sync="batchForm.custSuppId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="li-splice clear">
              <span class="two-dater-span">导入日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="importBegin">
                  <sino-date-picker class="fl"
                                    v-model="batchForm.importBegin"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="importEnd">
                  <sino-date-picker class="fl"
                                    v-model="batchForm.importEnd"
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
      <sino-table :data="entTableData" height="400" stripe v-on:viewAll="viewAll" border class="mail-table" v-on:select="selectCallBack">
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column label="客户/供应商名称" prop="custName" min-width="180" label-class-name="aaa"></sino-table-column>
        <sino-table-column label="总雇员数" prop="sumCount" min-width="80"></sino-table-column>
        <sino-table-column label="成功雇员数" prop="succCount" min-width="100"></sino-table-column>
        <sino-table-column label="失败雇员数" min-width="100">
          <template scope="scope">
            <span>{{scope.row.failedCount}}</span><span class="table-span" style="margin-left:20px;color:#399ff2;" v-if="scope.row.failedCount && scope.row.failedCount > 0" @click="failFileDFun(scope.row.orderWageImportInfoId)">下载</span>
          </template>
        </sino-table-column>
        <sino-table-column label="导入操作人" prop="importManName" min-width="180"></sino-table-column>
        <sino-table-column label="导入时间" prop="importDate" min-width="180"></sino-table-column>
        <sino-table-column label="操作" align="center" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="souceFileDFun(scope.row.orderWageImportInfoId)">原文件</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
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
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input type="text" v-model="batchDetailForm.empName"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input type="text" v-model="batchDetailForm.certNo"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchDtetailFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <sino-tabs v-model="activeName" type="card" @tab-click="handleClick" class="sino-tab-decl sino-tab-decl-empass">
        <sino-tab-pane label="成功数据" name="success" class="mt15">
          <sino-table :data="detailTableData" max-height="416" stripe border v-on:viewAll="detailViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center" fixed></sino-table-column>
            <sino-table-column prop="c2" label="雇员名称" min-width="120" fixed></sino-table-column>
            <sino-table-column prop="c3" label="证件号码" min-width="180" fixed></sino-table-column>
            <sino-table-column prop="c4" label="工资年月" min-width="120" fixed></sino-table-column>
            <sino-table-column label-class-name="labelStyle" :prop="item.c1" :label="item.c2" v-for="(item, index) in tableTitle" :key="index" :type="item.c3?'money': ''" :width="item.c3?'120': '150'"></sino-table-column>
            <!--<sino-table-column prop="c4" label="工资年月" min-width="120" :fixed="'right'"></sino-table-column>-->
          </sino-table>
        </sino-tab-pane>
        <sino-tab-pane label="失败数据" name="error" class="mt15">
          <sino-table :data="detailTableData"  max-height="416" stripe border v-on:viewAll="detailViewAll">
            <sino-table-column type="index" label="序号" width="60" align="center" fixed></sino-table-column>
            <sino-table-column prop="c1" label="失败原因" min-width="120" fixed></sino-table-column>
            <sino-table-column prop="c2" label="雇员名称" min-width="120" fixed></sino-table-column>
            <sino-table-column prop="c3" label="证件号码" min-width="180" fixed></sino-table-column>
            <sino-table-column prop="c4" label="工资年月" min-width="120" fixed></sino-table-column>
            <sino-table-column label-class-name="labelStyle" :prop="item.c1" :label="item.c2" v-for="(item, index) in tableTitle" :key="index" :type="item.c3?'money': ''" :width="item.c3?'120': '150'"></sino-table-column>
          </sino-table>
        </sino-tab-pane>
        <sino-page v-bind:page="batchdetail.pageNum" v-bind:page-size="batchdetail.pageSize" v-on:pagehandler="pageHandler1" :pageArray="batchdetail.pageArray" v-on:choosePageFun="choooseNum1" v-bind:object="object" :total="batchdetail.total"></sino-page>
      </sino-tabs>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        custUrl: this.apiPath.hrsc.findCustAndSuppByConinfo,
        custNewUrl: this.apiPath.hrsc.custSelectBox,
        conUrl: this.apiPath.hrsc.findByCustIdSelectBox,
        serviceUrl: this.apiPath.hrsc.findServeTempSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        selectToken: Cookies.get('Token'),
        batchForm: {
          custSuppName: '',
          custSuppId: '',
          importBegin: '',
          importEnd: ''
        },
        custData: {areaId: ''},
        condata: {id: ''},
        templateData: {id: ''},
        batchRules: {},
        entTableData: null,
        total: null,
        pageNum: 1,
        pageSize: 10,
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
          empName: '',
          certNo: ''
        },
        batchdetail: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [5, 10, 20, 30, 50]
        },
        detailTableData: null,
        activeName: 'success',
        checkedArr: [],
        succOrFailed: 0,
        tableTitle: ''
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
//        this.activeName = tab.name;
//        if (this.activeName === 'error') {
//          this.losePage.pageNum = 1;
//          this.errorViewAll(this.losePage.pageNum, this.losePage.pageSize);
//        } else {
//          this.batchdetail.pageNum = 1;
//          this.successViewAll(this.batchdetail.pageNum, this.batchdetail.pageSize);
//        }
        if (this.checkedArr.length !== 0) {
          this.searchDtetailFun();
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedArr = selectTion;
        console.log(this.checkedArr);
        if (this.checkedArr.length === 0) {
          this.detailTableData = null;
          this.total = 0;
        }
      },
      custChange () {
        this.condata.id = this.batchDetailForm.custId;
        this.templateData.custId = this.batchDetailForm.custId;
      },
      aa () {
        this.custData.areaId = this.checkedArr[0].batchNo;
      },
      viewAll (pageNum, pageSize) {
        let obj = JSON.parse(JSON.stringify(this.batchForm));
        obj.importBegin = Vue.filter('date')(obj.importBegin, 'yyyy-MM-dd');
        obj.importEnd = Vue.filter('date')(obj.importEnd, 'yyyy-MM-dd');
        let _data = {
          data: obj,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findHistoryImportList, _data).then(res => {
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
      detailViewAll (pageNum, pageSize) {
        let obj = {
          data: {
            orderWageImportInfoId: this.checkedArr[0].orderWageImportInfoId,
            succOrFailed: this.activeName === 'success' ? 0 : 1,
            fileName: this.checkedArr[0].tableName,
            certNo: this.batchDetailForm.certNo,
            empName: this.batchDetailForm.empName
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findImportDet, obj).then(res => {
          let arr = [];
          JSON.parse(JSON.stringify(res.data.list)).forEach(function (items) {
            let obj = {};
            items.forEach(function (item) {
              obj[item.c1] = item.c2;
            });
            arr.push(JSON.parse(JSON.stringify(obj)));
          });
          this.detailTableData = arr;
          this.batchdetail.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      failFileDFun (id) {
        api.post(this.apiPath.hrsc.downloadFailedCount, {orderWageImportInfoId: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(() => {
          console.log('失败!');
        });
      },
      souceFileDFun (id) {
        api.post(this.apiPath.hrsc.downloadOrgFile, {orderWageImportInfoId: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchDtetailFun () {
        if (this.checkedArr.length !== 1) {
          this.$alert('请选择一条批量导入数据', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
          return;
        }
        api.post(this.apiPath.hrsc.findHeaderList, {fileName: this.checkedArr[0].tableName}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableTitle = res.data;
            this.batchdetail.pageNum = 1;
            this.detailViewAll(this.batchdetail.pageNum, this.batchdetail.pageSize);
          }
        }).catch(() => {
          console.log('失败!');
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
        this.detailViewAll(pageNum, this.batchdetail.pageSize);
      },
      choooseNum1: function (pageSize) {
        this.batchdetail.pageSize = pageSize;
        this.batchdetail.pageNum = 1;
        this.detailViewAll(this.batchdetail.pageNum, pageSize);
      }
    }
  };
</script>
