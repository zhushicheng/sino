<template>
  <div>
    <div class="usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item is-active" >单个维护</div>
            <div class="sino-tabs-item" @click="prodScheFun">批量维护</div>
          </div>
        </div>
      </div>
      <sino-con class="sino-con-more">
        <sino-form :model="entOrderForm" ref="entOrderForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box invoice-ul">
              <li class="invoice-li">
                <span class="search-inner-name invoice-li-width">客户/供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findCustAndSuppByConinfo"
                             :token="token"
                             :chooseName.sync="entOrderForm.custOrSuppName"
                             :chooseId.sync="entOrderForm.custSuppId" :clear="true"
                             @contentChange="contentChange"
                ></sino-select>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">雇员姓名：</span>
                <sino-input class="fl" type="text" v-model="entOrderForm.empName"
                            :disabled="false"></sino-input>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">证件号码：</span>
                <sino-input class="fl" type="text" v-model="entOrderForm.certNo"
                            :disabled="false"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">工资年月：</span>
                <sino-date-picker
                  v-model="entOrderForm.wageDYm"
                  type="month"
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchButFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('entOrderForm')">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <sino-table :data="entTableData" max-height="416" stripe v-on:viewAll="searchButFun" border v-on:select="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="80"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="bankType" label="银行类型" min-width="180"></sino-table-column>
            <sino-table-column prop="bankName" label="开户行名称" min-width="280"></sino-table-column>
            <sino-table-column prop="bankCardNo" label="银行卡号" min-width="180"  text-align="center"></sino-table-column>
            <sino-table-column prop="wageYm" label="工资年月" min-width="150"  text-align="center"></sino-table-column>
            <sino-table-column :prop="item.c1" :label="item.c2" v-for="(item, index) in tableTitle" :key="index" :type="item.c3?'money': ''" :width="item.c3?'150px': ''"></sino-table-column>
            <sino-table-column label="操作" align="center" width="90" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)">修改</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                     :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                     :total="page.total"></sino-page>
        </div>
      </div>
      <sino-dialog :visible.sync="modifyFlag" size="small" class="mail-dialog see-dirc suppinfo-dialog-box" dialogHide :top="'5%'">
        <sino-title slot="title" type="levelOne" title="修改信息" class="sino-dialog-title"></sino-title>
        <sino-form :model="modifyForm"  class="serch-form textRight" ref="modifyForm">
          <div>
            <ul class="modifyClearUl">
              <li>
                <span class="label">雇员姓名：</span>
                <span>{{modifyForm.empName}}</span>
              </li>
              <li>
                <span class="label">工资年月：</span>
                <span>{{modifyForm.wageYm}}</span>
              </li>
            </ul>
          </div>
          <div v-for="(item, index) in modifyForm.testVOList" :key="index">
          <sino-form-item :label="item.c2 + '：'" :prop="'testVOList[' +index +'].wageBaseItemAmo'">
            <sino-input v-model="item.wageBaseItemAmo" type="text" class="before textRight"></sino-input>
          </sino-form-item>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="modifySaveFn">保 存</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        costCenterUrl: this.apiPath.hrsc.findCustSelectInfo,
        findCustAndSuppByConinfo: this.apiPath.hrsc.findCustAndSuppByConinfo,    //   客户/供应商下拉框
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        roleUrl: this.apiPath.author.findUserRoleSelectBoxInfo,
        token: Cookies.get('Token'),
        routerView: false,
        entTableData: null,
        wageBaseItemAmo: '',
        page: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0
        },
        modifyFlag: false,
        modifyForm: {
          empName: '',
          orderId: '',
          custSuppId: '',
          cusuOrSuppType: '',
          certNo: '',
          bankType: '',
          bankName: '',
          bankCardNo: '',
          wageYm: '',
          testVOList: null
        },
        tableTitle: '',
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        entOrderForm: {
          custOrSuppType: '',
          custOrSuppName: '',
          custSuppId: '',
          empName: '',
          certNo: '',
          wageDYm: ''
        }
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/salarySingleMainten") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      prodScheFun (order) {
        this.$router.push({path: '/salaryBatchMainten'});
        this.routerView = true;
      },
      contentChange (item) {
        this.entOrderForm.custOrSuppType = item.flag;
      },
      // 分页回调
      pageHandler (page) {
        this.page.pageNum = page;
        this.searchFun();
      },
      // 改变显示条数回调
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.searchFun();
      },
      // 重置
      resetFun () {
        for (var key in this.entOrderForm) {
          this.entOrderForm[key] = '';
        }
      },
      // 复选框选择回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      // 一级查询
      searchButFun () {
        this.page.pageNum = 1;
        this.searchFun();
      },
      // 查询
      searchFun () {
        var dataObj = JSON.parse(JSON.stringify(this.entOrderForm));
        if (!this.entOrderForm.custSuppId) {
          this.entOrderForm.custOrSuppType = '';
        }
        dataObj.wageDYm = Vue.filter('date')(dataObj.wageDYm, 'yyyy-MM');
        var obj = {
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          data: dataObj
        };
        api.post(this.apiPath.hrsc.singlePageShow, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableTitle = res.data.headerVOS;
            let arr = [];
            JSON.parse(JSON.stringify(res.data.wageVOPageInfo.list)).forEach(function (items) {
              items.testVOList.forEach(function (item) {
                items[item.c1] = item.wageBaseItemAmo;
              });
              arr.push(items);
            }, this);
            this.entTableData = arr;
            this.page.total = res.data.wageVOPageInfo.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      seeFun (item) {
        let obj = {
          orderId: item.orderId,
          custSuppId: item.custSuppId,
          custOrSuppType: item.custOrSuppType,
          certNo: item.certNo,
          empName: item.empName,
          wageYm: item.wageYm
        };
        api.post(this.apiPath.hrsc.singleUpdateShow, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.modifyFlag = true;
            this.modifyForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifySaveFn () {
        api.post(this.apiPath.hrsc.saveOrderWageDetSignle, this.modifyForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.modifyFlag = false;
            this.$message({message: '保存成功！', type: 'success'});
            this.searchButFun();
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
