<template>
  <!--受托订单查询-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="受托订单查询"></sino-title>
        <sino-form :model="entOrderForm" ref="entOrderForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="签约供应商简称：" class="search-inner-item" prop="signSuppName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :data="{}"
                                 :token="token"
                                 :chooseName.sync="entOrderForm.signSuppName"
                                 :chooseId.sync="entOrderForm.signSuppId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :data="{}"
                                 :token="token"
                                 :chooseName.sync="entOrderForm.custName"
                                 :chooseId.sync="entOrderForm.custId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="付费供应商简称：" class="search-inner-item" prop="paySuppName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :data="{}"
                                 :token="token"
                                 :chooseName.sync="entOrderForm.paySuppName"
                                 :chooseId.sync="entOrderForm.paySuppId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="雇员唯一号：" class="search-inner-item" prop="uniqNo">
                  <sino-input class="fl" type="text"
                              v-model="entOrderForm.uniqNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="entOrderForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="entOrderForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <span class="two-dater-span">订单开始日期：</span>
                <div class="two-dater">
                  <sino-form-item class="search-inner-item" prop="orderBegDate">
                    <sino-date-picker class="fl"
                                      v-model="entOrderForm.orderBegDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                  <span class="fl">至</span>
                  <sino-form-item class="search-inner-item" prop="orderEndDate">
                    <sino-date-picker class="fl"
                                      v-model="entOrderForm.orderEndDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </div>
              </li>
              <li>
                <sino-form-item label="创建人：" class="search-inner-item" prop="creName">
                  <sino-select :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="roleUrl"
                               :data="{}"
                               :token="token"
                               :chooseName.sync="entOrderForm.creName"
                               :chooseId.sync="entOrderForm.creId"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <span class="two-dater-span">创建日期：</span>
                <div class="two-dater">
                  <sino-form-item class="search-inner-item" prop="creStartDate">
                    <sino-date-picker class="fl"
                                      v-model="entOrderForm.creStartDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                  <span class="fl">至</span>
                  <sino-form-item class="search-inner-item" prop="creEndDate">
                    <sino-date-picker class="fl"
                                      v-model="entOrderForm.creEndDate"
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
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <sino-table :data="entTableData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="95"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="80"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="signSuppName" label="签约供应商简称" min-width="180"></sino-table-column>
            <sino-table-column prop="paySuppName" label="付费供应商简称" min-width="180"></sino-table-column>
            <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="120"></sino-table-column>
            <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
            <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
            <sino-table-column label="操作" align="center" width="90" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row)">查看详情</span>
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
        </div>
      </div>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        roleUrl: this.apiPath.author.findUserRoleSelectBoxInfo,
        token: Cookies.get('Token'),
        routerView: false,
        entOrderForm: {
          signSuppId: '',
          signSuppName: '',
          custId: '',
          custName: '',
          creId: '',
          creName: '',
          paySuppId: '',
          paySuppName: '',
          uniqNo: '',
          empName: '',
          certNo: '',
          orderBegDate: '',
          orderEndDate: '',
          creStartDate: '',
          creEndDate: ''
        },
        entTableData: null,
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
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/entOrderSearch") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    methods: {
      ruoteJudge () { // 解决刷新页面后退的bug
        if (this.$route.path !== "/entOrderSearch") {
          this.routerView = true;
        }
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.entOrderForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.pageEntrusted, _data).then(res => {
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
      seeFun (_data) {
        this.routerView = true;
        this.$router.push({path: '/entOrderSearch/orderPayCharge', query: {orderId: _data.orderId}});
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
      resetFun () {
        this.$refs.entOrderForm.resetFields();
      }
    }
  };
</script>
