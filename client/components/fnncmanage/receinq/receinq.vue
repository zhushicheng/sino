<template>
  <div class="usermanage">
    <!--收据查询-->
    <sino-con>
      <sino-title type="levelOne" title="收据查询"></sino-title>
      <sino-form class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="收据编号：" class="search-inner-item" prop="conName">
                <sino-input class="fl" type="text"
                            :disabled="false" v-model="seachForm.refundReceiptNo"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="拨付类型：" class="search-inner-item" prop="conStateName">
                <div class="search-inner-radiofl" >
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :chooseName.sync="seachForm.paidTypeName"
                               :chooseId.sync="seachForm.paidType"
                               :data="{code:'PAID_TYPE'}"
                               :clear="true"></sino-select>
                </div>
              </sino-form-item>
            </li>
            <li class="li-splice clear">
              <span class="two-dater-span">开具日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="begDate">
                  <sino-date-picker class="fl"
                                    v-model="seachForm.issuedDateBeg"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="endDate">
                  <sino-date-picker class="fl"
                                    v-model="seachForm.issuedDateEnd"
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
    </sino-con>
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <sino-table :data="receInqData" max-height="416" class="mail-table mt15" v-on:viewAll="viewAll" border stripe>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="refundReceiptNo" label="收据编号" min-width="180"></sino-table-column>
          <sino-table-column prop="payCorpName" label="付款方名称" min-width="180"></sino-table-column>
          <sino-table-column prop="paidTypeName" label="拨付类型" min-width="80"></sino-table-column>
          <sino-table-column prop="refundReceiptAmo" label="金额" min-width="105"></sino-table-column>
          <sino-table-column prop="issuedDate" label="开具日期" min-width="105"></sino-table-column>
          <sino-table-column prop="cashier" label="出纳人" min-width="120"></sino-table-column>
          <sino-table-column prop="paidOrdersNum" label="拨付单张数" min-width="95"></sino-table-column>
          <sino-table-column prop="claimStateName" label="认领状态" min-width="95"></sino-table-column>
          <sino-table-column prop="claimDate" label="认领日期" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" width="100" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span"  @click="checkBillFun(scope.row)">查看拨付单</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum"
                   v-bind:page-size="page.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>

    <!--查看拨付单弹层-->
    <sino-dialog :visible.sync="lookBillFlag" size="samll" dialogHide v-on:close="lookBillClose('billFrom')" class="usermanage freebill-dialog">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="查看拨付单"></sino-title>
      <sino-form :model="billFrom" ref="billFrom" class="serch-form">
        <div class="search-box marTop">
          <ul class="search-inner-box">
            <li style="margin-top: 0">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input class="fl" type="text" v-model="billFrom.empName"
                          :disabled="false"></sino-input>
            </li>
            <li style="margin-top: 0">
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text" v-model="billFrom.certNo"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">待遇类型：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :chooseName.sync="billFrom.treatTypeName"
                           :chooseId.sync="billFrom.treatType"
                           :clear="true"
                           :data="{code: 'TREAT_TYPE'}">
              </sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="billFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <sino-table :data="billData" stripe height="349" v-on:viewAll="viewAllBill" border>
        <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名" align="center" width="130"></sino-table-column>
        <sino-table-column prop="certNo" label="证件号码" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="paidTypeName" label="拨付类型" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="treatTypeName" label="待遇类型" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="paidAmoTotal" label="金额" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="issuedDate" label="日期" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="issuedCondation" label="开收据情况" align="center" min-width="161"></sino-table-column>
        <sino-table-column prop="userName" label="经办人" align="center" min-width="161"></sino-table-column>
      </sino-table>
      <sino-page
        v-bind:page="billDataPage.pageNum"
        v-bind:page-size="billDataPage.pageSize"
        v-on:pagehandler="pageHandlerB"
        :pageArray="billDataPage.pageArray"
        v-on:choosePageFun="choooseNumB"
        v-bind:object="object"
        :total="billDataPage.total">
      </sino-page>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="lookBillFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Vue from 'vue';

  let checkedArr = [];
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
       // 查询
        seachForm: {
          refundReceiptNo: '', // 收据编号
          paidType: null,  // 收据类型
          paidTypeName: '', // 拨付类型name
          issuedDateBeg: '',  // 开具起始日期
          issuedDateEnd: ''   // ：开具终止日期
        },
        // 表格数据
        receInqData: null,
        // 查看拨付单弹层
        lookBillFlag: false,
        // 查看拨付单弹层 ----->表格数据
        billData: null,
        billDataPage: {      // 查看拨付单弹层表格翻页
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null
        },
        // 查看拨付单弹层 ---》查询数据
        billFrom: {
          empName: '', //  雇员姓名
          certNo: '', //  证件号码
          treatType: null, //  待遇类型
          treatTypeName: '', //  待遇类型name
          refundReceiptNo: '' // 收据编号
        },
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
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
      // 最上面的查询
      searchFun () {
        this.page.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 查看拨付单弹层=---->查询
      billFun () {
        this.billDataPage.pageNum = 1;
        this.viewAllBill(this.pageNum, this.pageSize);
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.seachForm
        };
        this.seachForm.issuedDateBeg = Vue.filter('date')(this.seachForm.issuedDateBeg, 'yyyy-MM-dd');
        this.seachForm.issuedDateEnd = Vue.filter('date')(this.seachForm.issuedDateEnd, 'yyyy-MM-dd');
        api.post(this.apiPath.hrsc.getFnncReceiptInfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.receInqData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看拨付单弹层 ----> 查询
      viewAllBill (pageNum, pageSize) {
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.billFrom
        };
        api.post(this.apiPath.hrsc.getPaidCombination, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.billData = res.data.list;
            this.billDataPage.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看拨付单
      checkBillFun (scope) {
        this.billFrom = {
          empName: '', //  雇员姓名
          certNo: '', //  证件号码
          treatType: null, //  待遇类型
          treatTypeName: '', //  待遇类型name
          refundReceiptNo: '' // 收据编号
        };
        this.billData = null;
        this.billDataPage.total = null;
        this.billFrom.refundReceiptNo = scope.refundReceiptNo;
        this.lookBillFlag = true;
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      choooseNum: function (pageSize) {
        //  改变分页显示条数;
        this.page.pageSize = pageSize;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      pageHandlerB: function (page) {
        //        改变当前页
        this.billDataPage.pageNum = page;
        this.viewAllBill(page, this.billDataPage.pageSize);
      },
      choooseNumB: function (pageSize) {
//        改变分页显示条数;
        this.billDataPage.pageSize = pageSize;
        this.viewAllBill(1, pageSize);
      },
      lookBillClose (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
