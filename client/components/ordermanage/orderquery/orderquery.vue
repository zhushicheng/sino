<template>
  <!--自主订单查询-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="订单查询"></sino-title>
        <sino-form :model="entOrderForm" ref="entOrderForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="entOrderForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="entOrderForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="负责人：" class="search-inner-item" prop="respBusiRepName">
                  <sino-select :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="respUrl"
                               :token="token"
                               :chooseName.sync="entOrderForm.respBusiRepName"
                               :chooseId.sync="entOrderForm.respBusiRepId"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <sino-collapse-transition>
                <div class="sino-translate" v-if="searchFlag">
                  <li>
                    <sino-form-item label="签约供应商简称：" class="search-inner-item" prop="signSuppName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :token="token"
                                   :url="selectBox"
                                   :chooseName.sync="entOrderForm.signSuppName"
                                   :chooseId.sync="entOrderForm.signSuppId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="付费供应商简称：" class="search-inner-item" prop="paySuppName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="selectBox"
                                   :token="token"
                                   :chooseName.sync="entOrderForm.paySuppName"
                                   :chooseId.sync="entOrderForm.paySuppId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="custUrl"
                                   :token="token"
                                   :chooseName.sync="entOrderForm.custName"
                                   :chooseId.sync="entOrderForm.custId"
                                   @change="custChange"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid">
                    <sino-form-item label="服务模板名称：" class="search-inner-item" prop="prodServeTempName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="tempUrl"
                                   :linkage="true"
                                   :data="tempData"
                                   :token="token"
                                   :chooseName.sync="entOrderForm.prodServeTempName"
                                   :chooseId.sync="entOrderForm.prodServeTempId"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="订单操作状态：" class="search-inner-item" prop="orderStateName">
                      <div class="search-inner-radio fl">
                        <sino-select :filterable="false"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :disabled="false"
                                     :totalNum="false"
                                     :isPage="false"
                                     :isGroup="false"
                                     :url="dictSelUrl"
                                     :data="{code: 'ORDER_STATE'}"
                                     :chooseName.sync="entOrderForm.orderStateName"
                                     :chooseId.sync="entOrderForm.orderState"
                                     :clear="true"></sino-select>
                      </div>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="派出地区：" class="search-inner-item" prop="accrAreaName">
                      <div class="search-inner-radio fl">
                        <sino-select :filterable="true"
                                     :multiselect="false"
                                     :isshowTotol="false"
                                     :disabled="false"
                                     :totalNum="false"
                                     :isPage="true"
                                     :isGroup="false"
                                     :url="areaUrl"
                                     :token="token"
                                     :chooseName.sync="entOrderForm.accrAreaName"
                                     :chooseId.sync="entOrderForm.accrAreaId"
                                     :clear="true"></sino-select>
                      </div>
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
                  <li class="clear">
                    <span class="two-dater-span">派出操作日期：</span>
                    <div class="two-dater">
                      <sino-form-item class="search-inner-item" prop="assStartDate">
                        <sino-date-picker class="fl"
                                          v-model="entOrderForm.assStartDate"
                                          type="date"
                                          :editable="false"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                      <span class="fl">至</span>
                      <sino-form-item class="search-inner-item" prop="assEndDate">
                        <sino-date-picker class="fl"
                                          v-model="entOrderForm.assEndDate"
                                          type="date"
                                          :editable="false"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                    </div>
                  </li>
                  <li class="clear">
                    <span class="two-dater-span">撤离操作日期：</span>
                    <div class="two-dater">
                      <sino-form-item class="search-inner-item" prop="leaveStartDate">
                        <sino-date-picker class="fl"
                                          v-model="entOrderForm.leaveStartDate"
                                          type="date"
                                          :editable="false"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                      <span class="fl">至</span>
                      <sino-form-item class="search-inner-item" prop="leaveEndDate">
                        <sino-date-picker class="fl"
                                          v-model="entOrderForm.leaveEndDate"
                                          type="date"
                                          :editable="false"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                    </div>
                  </li>
                </div>
              </sino-collapse-transition>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('entOrderForm')" v-if="searchFlag">重 置</sino-button>
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
      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="expFun"><i class="iconfont sino-export"></i>导出</sino-button>
            </div>
          </div>
          <sino-table :data="entTableData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table mt15">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="95"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
            <sino-table-column prop="orderStateName" label="订单操作状态" min-width="105"></sino-table-column>
            <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="120"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="120"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="paySuppName" label="付费供应商" min-width="100"></sino-table-column>
            <sino-table-column prop="prodServeTempName" label="产品服务模板名称" min-width="160"></sino-table-column>
            <sino-table-column prop="leaveOperTime" label="撤离操作时间" min-width="160"></sino-table-column>
            <sino-table-column prop="assOperTime" label="派出操作时间" min-width="160"></sino-table-column>
            <sino-table-column prop="respBusiRepName" label="负责人" min-width="95"></sino-table-column>
            <sino-table-column label="操作" align="center" width="80" fixed="right">
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
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        tempUrl: this.apiPath.hrsc.findServeTempSelectBoxByToken,
        areaUrl: this.apiPath.hrsc.accrAreaDrop,
        respUrl: this.apiPath.author.findUserRoleSelectBoxInfo,
        token: Cookies.get('Token'),
        tempData: {custId: ''},
        routerView: false,
        searchFlag: false,
        entOrderForm: {
          empName: '',
          certNo: '',
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          paySuppName: '',
          custId: '',
          custName: '',
          prodServeTempId: '',
          prodServeTempName: '',
          orderState: '',
          orderStateName: '',
          accrAreaId: '',
          accrAreaName: '',
          orderBegDate: '',
          orderEndDate: '',
          respBusiRepId: '',
          respBusiRepName: '',
          assStartDate: '',
          assEndDate: '',
          leaveStartDate: '',
          leaveEndDate: ''
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
          if (val.path === "/orderQuery") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      let _array = JSON.parse(Cookies.get('loginUser'));
      _array.forEach(function (list) {
        if (list.userRoleId === JSON.parse(Cookies.get('userRoleId'))) {
          this.entOrderForm.respBusiRepId = list.userRoleId;
          this.entOrderForm.respBusiRepName = list.userName + '-' + list.roleName;
        }
      }, this);
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 表格上面的导出
      expFun () {
        this.entOrderForm.orderBegDate = Vue.filter('date')(this.entOrderForm.orderBegDate, 'yyyy-MM-dd');
        this.entOrderForm.orderEndDate = Vue.filter('date')(this.entOrderForm.orderEndDate, 'yyyy-MM-dd');
        this.entOrderForm.creStartDate = Vue.filter('date')(this.entOrderForm.creStartDate, 'yyyy-MM-dd');
        this.entOrderForm.creEndDate = Vue.filter('date')(this.entOrderForm.creEndDate, 'yyyy-MM-dd');
        let _data = {
          data: this.entOrderForm
        };
        api.post(this.apiPath.hrsc.getOrderInfoExce, _data).then(res => {
          api.download(res.data);
        }).catch(err => {
          console.log(err);
        });
      },
      ruoteJudge () {
        if (this.$route.path !== "/orderQuery") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      custChange () {
        this.tempData.custId = this.entOrderForm.custId;
      },
      viewAll (pageNum, pageSize) {
        this.entOrderForm.orderBegDate = Vue.filter('date')(this.entOrderForm.orderBegDate, 'yyyy-MM-dd');
        this.entOrderForm.orderEndDate = Vue.filter('date')(this.entOrderForm.orderEndDate, 'yyyy-MM-dd');
        this.entOrderForm.creStartDate = Vue.filter('date')(this.entOrderForm.creStartDate, 'yyyy-MM-dd');
        this.entOrderForm.creEndDate = Vue.filter('date')(this.entOrderForm.creEndDate, 'yyyy-MM-dd');
        let _data = {
          data: this.entOrderForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.pageOrder, _data).then(res => {
          this.entTableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      seeFun (_data) {
        let sessionStorage = window.sessionStorage;
        this.routerView = true;
        // this.$router.push({path: '/orderQuery/orderPayCharge', name: "订单收付费情况", params: {orderId: _data.orderId}});
        this.$router.push({path: '/orderQuery/orderdetails', name: "订单详情", params: {orderId: _data.orderId}});
        sessionStorage.orderId = _data.orderId;
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

