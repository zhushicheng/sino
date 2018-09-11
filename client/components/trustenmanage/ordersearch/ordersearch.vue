<template>
  <!--委托单查询-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="委托单查询"></sino-title>
        <sino-form :model="orderForm" ref="orderForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
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
                                 :token="token"
                                 :chooseName.sync="orderForm.custName"
                                 :chooseId.sync="orderForm.custId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
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
                                 :chooseName.sync="orderForm.paySuppName"
                                 :chooseId.sync="orderForm.paySuppId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="任务单状态：" class="search-inner-item" prop="paySuppName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="dictSelUrl"
                                 :data="{code:'TASK_STATE'}"
                                 :chooseName.sync="orderForm.taskStateName"
                                 :chooseId.sync="orderForm.taskState"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="orderForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <span class="two-dater-span">发布日期：</span>
                <div class="two-dater">
                  <sino-form-item class="search-inner-item" prop="publishBegDate">
                    <sino-date-picker class="fl"
                                      v-model="orderForm.publishBegDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                  <span class="fl">至</span>
                  <sino-form-item class="search-inner-item" prop="publishEndDate">
                    <sino-date-picker class="fl"
                                      v-model="orderForm.publishEndDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </div>
              </li>
              <li>
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="orderForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
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
          <sino-table :data="orderTableData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="publishBatchId" label="批次号"></sino-table-column>
            <sino-table-column prop="paySuppShortName" label="付费供应商简称" min-width="180"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="entrustTypeDict" label="委托类型"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
            <sino-table-column prop="certTypeDict" label="证件类型"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
            <sino-table-column prop="execuAreaName" label="派出地区" min-width="180"></sino-table-column>
            <sino-table-column prop="taskStateDict" label="任务单状态" min-width="95"></sino-table-column>
            <sino-table-column prop="orderBegDate" label="订单开始日期" min-width="105"></sino-table-column>
            <sino-table-column prop="orderEndDate" label="订单结束日期" min-width="105"></sino-table-column>
            <sino-table-column prop="sinsDeclRadix" label="社保申报基数" min-width="105"></sino-table-column>
            <sino-table-column prop="sinsBegDate" label="社保起做日期" min-width="105"></sino-table-column>
            <sino-table-column prop="sinsEndDate" label="社保止做日期" min-width="105"></sino-table-column>
            <sino-table-column prop="accuDeclRadix" label="公积金申报基数" min-width="120"></sino-table-column>
            <sino-table-column prop="accuProp" label="公积金比例" min-width="95"></sino-table-column>
            <sino-table-column prop="accuBegDate" label="公积金起做日期" min-width="120"></sino-table-column>
            <sino-table-column prop="accuEndDate" label="公积金止做日期" min-width="120"></sino-table-column>
            <sino-table-column prop="dimReason" label="离职原因"></sino-table-column>
            <sino-table-column prop="leaveState" label="供应商撤离状态" min-width="180"></sino-table-column>
            <sino-table-column prop="signSuppShortName" label="签约供应商简称" min-width="180"></sino-table-column>
            <sino-table-column prop="publishTime" label="任务单发布时间" min-width="120"></sino-table-column>
            <sino-table-column prop="publishName" label="任务单发布人" min-width="120"></sino-table-column>
            <sino-table-column prop="entrustDep" label="签约方业务部" min-width="120"></sino-table-column>
            <sino-table-column prop="confirmPerName" label="任务单确认人" min-width="120"></sino-table-column>
            <sino-table-column prop="confirmTime" label="任务单确认时间" min-width="120"></sino-table-column>
            <sino-table-column label="操作" align="center" width="90" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="seeFun(scope.row.taskId)">查看明细</span>
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
        routerView: false,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        suppUrl: this.apiPath.hrsc.selectByEnName,
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
//        roleUrl: this.apiPath.author.findUserRoleSelectBoxInfo,
        token: Cookies.get('Token'),
        orderForm: {
          custId: '',
          custName: '',
          paySuppName: '',
          paySuppId: '',
          taskStateName: '',
          taskState: '',
          empName: '',
          publishBegDate: '',
          publishEndDate: '',
          certNo: ''
        },
        orderTableData: null,
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
          if (val.path === "/orderSearch") {
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
      ruoteJudge () {
        if (this.$route.path !== "/orderSearch") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      viewAll (pageNum, pageSize) {
        if (this.orderForm.publishBegDate) {
          this.orderForm.publishBegDate = Vue.filter('date')(this.orderForm.publishBegDate, 'yyyy-MM-dd');
        };
        if (this.orderForm.publishEndDate) {
          this.orderForm.publishEndDate = Vue.filter('date')(this.orderForm.publishEndDate, 'yyyy-MM-dd');
        };
        let _data = {
          data: this.orderForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        // listTaskInfosByCondition
        api.post(this.apiPath.hrsc.listTaskInfosByCondition, _data).then(res => {
          if (res.data.list === null) {
            this.orderTableData = [];
          } else {
            this.orderTableData = res.data.list;
            this.total = res.data.total;
          }
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
//        console.log(_data);
        this.$router.push({path: '/orderSearch/orderSearchDetails', name: '任务单详情', query: {taskId: _data}});
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
        this.$refs.orderForm.resetFields();
        this.orderForm.taskState = '';
        this.orderForm.taskStateName = '';
      }
    }
  };
</script>
