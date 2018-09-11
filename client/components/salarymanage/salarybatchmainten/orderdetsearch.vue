<template>
  <!--订单明细-->
  <div class="usermanage order-det">
    <div class="local-info single-empass single-empass-width marbom">
      <sino-form :model="orderDetForm" ref="orderDetForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.empName"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">雇员唯一号：</span>
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.uniqNo"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.certNo"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">工资项：</span>
              <sino-select class="fl" :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :disabled="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="detwageSelectBox"
                           :chooseName.sync="orderDetForm.proPayItemName"
                           :chooseId.sync="orderDetForm.proPayId" :clear="true"
                           @contentChange="contentChange"
              ></sino-select>
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
    </div>
    <div class="sino-queryList clear">
      <div class="sino-table-total single-empass-width1">
        <sino-table :data="orderServerData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="prodName" label="工资项目" min-width="180"></sino-table-column>
          <sino-table-column prop="itemTypeName" label="工资项目类型" min-width="100"></sino-table-column>
          <sino-table-column prop="wageAmo" label="工资项金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="begYm" label="开始年月" min-width="80"></sino-table-column>
          <sino-table-column prop="endYm" label="结束年月" min-width="80"></sino-table-column>
          <sino-table-column prop="wageDayName" label="工资日" min-width="100"></sino-table-column>
          <!--<sino-table-column prop="prodName" label="订单明细类别"></sino-table-column>-->
          <!--<sino-table-column prop="prodName" label="订单明细状态"></sino-table-column>-->
          <sino-table-column prop="wageExecuSuppName" label="工资供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="wageExecuAreaName" label="工资执行地区" min-width="100"></sino-table-column>
          <sino-table-column prop="taxExecuSuppName" label="报税供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="taxExecuAreaName" label="报税执行地区" min-width="100"></sino-table-column>
          <sino-table-column prop="chaBeginYm" label="收费启动月" min-width="80"></sino-table-column>
          <sino-table-column prop="payBegYm" label="付费启动月" min-width="80"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    components: {},
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        detwageSelectBox: this.apiPath.hrsc.detwageSelectBox,
        prodUrl: this.apiPath.hrsc.prodNameDrop,
        prodData: {
          orderId: this.$route.params.orderId
        },
        orderDetForm: {
          custName: '',
          costCentName: '',
          prodServeTempName: '',
          uniqNo: '',
          empName: '',
          certNo: '',
          prodType: '',
          prodTypeName: ''
        },
        orderServerData: null,
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
      contentChange (item) {
        this.flag = item.flag;
      },
      searchView (pageNum, pageSize, obj) {
        let _data = {
          data: obj,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findOrderWageDet, _data).then(res => {
          this.orderServerData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      viewAll () {
        this.searchView(this.pageNum, this.pageSize, {});
      },
      searchFun () {
        this.searchView(1, this.pageSize, this.orderDetForm);
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.searchView(pageNum, this.pageSize, this.orderDetForm);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.searchView(this.pageNum, pageSize, this.orderDetForm);
      }
    }
  };
</script>
