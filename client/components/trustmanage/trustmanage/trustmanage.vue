<template>
  <!--受托单管理-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" :class="{'is-active': isReceiveState == 1}" @click="isReceiveState = 1">待接收</div>
            <div class="sino-tabs-item" :class="{'is-active': isReceiveState == 2}" @click="isReceiveState = 2">待反馈</div>
            <div class="sino-tabs-item" :class="{'is-active': isReceiveState == 3}" @click="isReceiveState = 3">已反馈</div>
          </div>
        </div>
      </div>
      <sino-con class="sino-con-more">
        <sino-form :model="jobsingleForm" ref="jobsingleForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="jobsingleForm.empName"
                              :disabled="false" placeholder=""></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="jobsingleForm.certNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="签约供应商：" class="search-inner-item" prop="custIdName">
                  <sino-select :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="findCustSelectInfo"
                               :token="token"
                               :chooseName.sync="jobsingleForm.custIdName"
                               :chooseId.sync="jobsingleForm.custId"
                               @change=""
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <sino-collapse-transition>
                <div class="sino-translate" v-if="searchFlag">
                  <li class="li-wid">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custIdName">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCustSelectInfo"
                                   :token="token"
                                   :chooseName.sync="jobsingleForm.custIdName"
                                   :chooseId.sync="jobsingleForm.custId"
                                   @change="custChange"
                                   :clear="true"></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <span class="two-dater-span">委托时间：</span>
                    <div class="two-dater">
                      <sino-form-item class="search-inner-item" prop="orderBegDate">
                        <sino-date-picker class="fl"
                                          v-model="jobsingleForm.orderBegDate"
                                          type="date"
                                          :editable="false"
                                          :readonly="false"
                                          :clearable="true">
                        </sino-date-picker>
                      </sino-form-item>
                      <span class="fl">至</span>
                      <sino-form-item class="search-inner-item" prop="orderEndDate">
                        <sino-date-picker class="fl"
                                          v-model="jobsingleForm.orderEndDate"
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
              <sino-button class="ressetButton" @click="resetFun('jobsingleForm')" v-if="searchFlag">重 置</sino-button>
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
      <!--搜索结果-->
      <div class="sino-table-total mt15 trustmanage" :class="{'pt': isReceiveState == 3}">
        <div class="sino-title-icon">
          <!--<div class="sino-table-icon-left">-->
          <sino-button type="icon-text" v-if="isReceiveState == 1"><i class="iconfont sino-daoru"></i>批量接收</sino-button>
          <sino-button type="icon-text" v-if="isReceiveState == 2" @click="connectEmp"><i class="iconfont sino-export"></i>导出申报表</sino-button>
          <!--</div>-->
        </div>
        <sino-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <sino-tab-pane name="first">
            <span slot="label">增员（<span class="tab-spe-red">10</span>）人</span>
            <sino-table :data="tableDataA" stripe border
                        class="toll-bill-table invoice-table-nomargin">
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="manName" label="签约供应商" min-width="200"></sino-table-column>
              <sino-table-column prop="sumCount" label="雇员姓名"></sino-table-column>
              <sino-table-column prop="laterCount" label="证件号码" min-width="200"></sino-table-column>
              <sino-table-column prop="assertCount" label="订单开始日期" min-width="120"></sino-table-column>
              <sino-table-column prop="paymentRateCount" label="订单结束日期" min-width="120"></sino-table-column>
              <sino-table-column prop="alreadyCount" label="委托人"></sino-table-column>
              <sino-table-column prop="paymentRate" label="委托时间" min-width="120"></sino-table-column>
              <sino-table-column label="操作" align="center" width="150" fixed="right">
                <template scope="scope">
                    <span v-if="isReceiveState == 1">
                      <span class="table-span" @click="">接受</span><i class="table-i">|</i>
                      <span class="table-span" @click="trustmanageDetail(scope.row)">查看明细</span>
                    </span>
                  <span v-if="isReceiveState == 2">
                      <span class="table-span" @click="connectEmp">联系员工</span><i class="table-i">|</i>
                      <span class="table-span" @click="feedback">办理反馈</span>
                    </span>
                  <span v-if="isReceiveState == 3">
                      <span class="table-span" @click="trustmanageDetail(scope.row)">查看明细</span>
                    </span>
                </template>
              </sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageA.pageNum" v-bind:page-size="pageA.pageSize" v-on:pagehandler="pageHandler($event,1)"
                       :pageArray="pageA.pageArray" v-on:choosePageFun="choooseNum($event,1)" v-bind:object="object"
                       :total="pageA.total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane name="second" >
            <span slot="label">减员（<span class="tab-spe-red">10</span>）人</span>
            <sino-table :data="tableDataB" stripe max-height="416" border
                        class="toll-bill-table invoice-table-nomargin">
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="manName" label="签约供应商" min-width="200"></sino-table-column>
              <sino-table-column prop="sumCount" label="雇员姓名"></sino-table-column>
              <sino-table-column prop="laterCount" label="证件号码" min-width="200"></sino-table-column>
              <sino-table-column prop="assertCount" label="订单开始日期" min-width="120"></sino-table-column>
              <sino-table-column prop="paymentRateCount" label="订单结束日期" min-width="120"></sino-table-column>
              <sino-table-column prop="paymentRateCount" label="离职原因" min-width="120"></sino-table-column>
              <sino-table-column prop="alreadyCount" label="委托人"></sino-table-column>
              <sino-table-column prop="paymentRate" label="委托时间" min-width="120"></sino-table-column>
              <sino-table-column label="操作" align="center" width="150" fixed="right">
                <template scope="scope">
                    <span v-if="isReceiveState == 1">
                      <span class="table-span" @click="">接受</span><i class="table-i">|</i>
                      <span class="table-span" @click="trustmanageDetail(scope.row)">查看明细</span>
                    </span>
                  <span v-if="isReceiveState == 2">
                      <span class="table-span" @click="connectEmp">联系员工</span><i class="table-i">|</i>
                      <span class="table-span" @click="feedback">办理反馈</span>
                    </span>
                  <span v-if="isReceiveState == 3">
                      <span class="table-span" @click="trustmanageDetail(scope.row)">查看明细</span>
                    </span>
                </template>
              </sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageB.pageNum" v-bind:page-size="pageB.pageSize" v-on:pagehandler="pageHandler($event,2)"
                       :pageArray="pageB.pageArray" v-on:choosePageFun="choooseNum($event,2)" v-bind:object="object"
                       :total="pageB.total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane name="three">
            <span slot="label">调整（<span class="tab-spe-red">10</span>）人</span>
            <sino-table :data="tableDataC" stripe max-height="416" border
                        class="toll-bill-table invoice-table-nomargin">
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="manName" label="签约供应商" min-width="200"></sino-table-column>
              <sino-table-column prop="sumCount" label="雇员姓名"></sino-table-column>
              <sino-table-column prop="laterCount" label="证件号码" min-width="200"></sino-table-column>
              <sino-table-column prop="assertCount" label="订单开始日期" min-width="120"></sino-table-column>
              <sino-table-column prop="paymentRateCount" label="订单结束日期" min-width="120"></sino-table-column>
              <sino-table-column prop="alreadyCount" label="委托人"></sino-table-column>
              <sino-table-column prop="paymentRate" label="委托时间" min-width="120"></sino-table-column>
              <sino-table-column label="操作" align="center" width="150" fixed="right">
                <template scope="scope">
                    <span v-if="isReceiveState == 1">
                      <span class="table-span" @click="">接受</span><i class="table-i">|</i>
                      <span class="table-span" @click="trustmanageDetail(scope.row)">查看明细</span>
                    </span>
                  <span v-if="isReceiveState == 2">
                      <span class="table-span" @click="connectEmp">联系员工</span><i class="table-i">|</i>
                      <span class="table-span" @click="feedback">办理反馈</span>
                    </span>
                  <span v-if="isReceiveState == 3">
                      <span class="table-span" @click="trustmanageDetail(scope.row)">查看明细</span>
                    </span>
                </template>
              </sino-table-column>
            </sino-table>
            <sino-page v-bind:page="pageC.pageNum" v-bind:page-size="pageC.pageSize" v-on:pagehandler="pageHandler($event,3)"
                       :pageArray="pageC.pageArray" v-on:choosePageFun="choooseNum($event,3)" v-bind:object="object"
                       :total="pageC.total"></sino-page>
          </sino-tab-pane>
        </sino-tabs>
      </div>
      <!-- 联系员工弹窗-->
      <sino-dialog :visible.sync="connectFlag" size="small" class="connectFlag">
        <sino-title slot="title" type="levelOne" title="联系员工情况" class="sino-dialog-title"></sino-title>
        <div class="dialogBodyConnect">
          <sino-form :model="connectForm" :rules="connectFormRules" ref="connectForm"  class="serch-form">
            <div class="search-box" style="">
              <ul class="search-inner-box">
                <li class="search-inner-one">
                  <sino-form-item label="户口性质：" class="search-inner-item" prop="check">
                    <sino-radio-group v-model="connectForm.check">
                      <sino-radio :label="1">城镇</sino-radio>
                      <sino-radio :label="2">农村</sino-radio>
                    </sino-radio-group>
                  </sino-form-item>
                </li>
              </ul>
            </div>
            <div class="clear"></div>
            <ul class="dialogueBox">
              <li class="rightBox">
                <p class="flyMiddle"><span class="flyConetent">该雇员电话无人接，暂时没有联系上</span><span class="flyTime">18:49:31</span></p>
                <!--<p class="flyLeft"><span></span></p>-->
                <p class="flyRight"><span>受</span></p>
              </li>
              <li class="leftBox">
                <p class="flyMiddle"><span class="flyConetent"> 该雇员电话已换新号，新号码为：17610881106</span><span class="flyTime">18:49:31</span></p>
                <p class="flyLeft"><span>签</span></p>
                <!--<p class="flyRight"><span></span></p>-->
              </li>
            </ul>
            <sino-form-item prop="remark" label="" class="sino-form-item-width">
              <sino-input type="textarea" v-model="connectForm.remark" placeholder="请输入..."></sino-input>
            </sino-form-item>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="">确 定</sino-button>
        </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import Utils from '../../development/component/sinoEdittable/utils/index.js';
  import api from '../../../api/index';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  export default {
    components: {},
    data () {
      return {
        dicSelUrl: this.apiPath.hrsc.getDictSelectBox,
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo,
        findServeTempSelectBox: this.apiPath.hrsc.findServeTempSelectBox,
        coninfoSelectBox: this.apiPath.hrsc.coninfoSelectBox,
        findCostCentSelectBox: this.apiPath.hrsc.findCostCentSelectBox,
        costUrl: this.apiPath.hrsc.costCentSelectBox,
        token: Cookie.get('Token'),
        tempData: {custId: ''},
        conData: {id: ''},
        routerView: false,
        searchFlag: false,
        jobsingleForm: { // 搜索条件
          empName: '',
          certNo: '',
          custId: '',
          custIdName: '',
          prodServeTempName: '',
          prodServeTempId: '',
          conId: '',
          conName: '',
          costCentId: '',
          costCentName: ''
        },
        isReceiveState: 1,
        activeName2: 'first',
        show: true,
        tableDataA: null,
        tableDataB: null,
        tableDataC: null,
        pageA: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageB: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageC: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        connectFlag: false,
        connectForm: {
          check: 1,
          remark: ''
        },
        connectFormRules: {
          check: [
            {type: 'number', required: true, message: '请选择户口性质', trigger: 'change'}
          ]
        }
      };
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/trustManage") {
            this.routerView = false;
            this.searchFun();
          }
        },
        deep: true
      }
    },

    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/trustManage") {
          this.routerView = true;
        }
      },
      connectEmp () {
        this.connectFlag = true;
      },
//       prodScheFun () {
//         this.$router.push({path: '/jobBatch'});
// //        this.jobBatchFlag = true;
//       },
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.jobsingleForm
        };
        api.post(this.apiPath.hrsc.autonomyJobManageSingle, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataA = res.data.list;
            this.pageA.total = res.data.total;
            this.tableDataB = res.data.list;
            this.pageB.total = res.data.total;
            this.tableDataC = res.data.list;
            this.pageC.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 修改收/付费账单年月
      updateYM () {
        this.routerView = true;
        this.$router.push({path: '/jobSingle/updateChargeYm'});
      },
      // 封装
      commonFun (orderId, formName, flagName) {
        api.postsign(this.apiPath.hrsc.orderDetail, orderId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderUpdateFlag = false;
            flagName = true;
            formName.empName = res.data.empName;
            formName.certNo = res.data.certNo;
            formName.oncostCentName = res.data.costCentName;
            let _custId = res.data.custId;
            let _t = this;
            setTimeout(function () {
              _t.costData.custId = _custId;
            }, 1000);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // tabs选项卡点击
      handleClick (tab, event) {
        this.activeName2 = tab.name;
      },
      trustmanageDetail () {
        this.routerView = true;
        // this.router.push();
        this.$router.push({path: '/trustManage/trustmanageDetail'});
      },
      feedback () {
        this.routerView = true;
        this.$router.push({path: '/trustManage/trustmanageFeedback'});
      },
      // 不可删除--重置可关闭弹层
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      resetDateForm (formName) {
        this.$refs[formName].resetFields();
        this.dateUpdate();
      },
      // 不可删除-重置不关闭弹层
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.dateUpdate();
      }
    }
  };
</script>
<style scoped>

</style>
