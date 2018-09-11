<template>
  <!--受托单管理详情页面-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="查看明细"></sino-title>
      <sino-form :model="searchForm" :rules="addlocalInfoRules" ref="searchForm"  class="serch-form">
        <div class="search-box" style="width: 100%;border-right:none;">
          <ul class="search-inner-box">
            <!--<li class="search-inner-one">-->
            <!--<span class="search-inner-name">雇员唯一号：</span>-->
            <!--<sino-input class="fl" type="text" v-model="
            .uniqNo" :disabled="false" maxlength="5"></sino-input>-->
            <!--</li>-->
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-width " prop="certNo">
                <sino-input class="fl" type="text" v-model="searchForm.certNo" :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-width " prop="certNo">
                <sino-input class="fl" type="text" v-model="searchForm.certNo" :disabled="true"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <!--<div class="search-button">-->
          <!--<div class="search-button-box search-one-button-box">-->
            <!--<sino-button type="primary" @click="searchFun">查 询</sino-button>-->
          <!--</div>-->
        <!--</div>-->
        <div class="clear"></div>
      </sino-form>
    </sino-con>
      <!--搜索结果-->
      <div class="sino-table-total mt15 trustmanage" style="padding-top: 15px">
        <!--<div class="sino-title-icon">-->
          <!--&lt;!&ndash;<div class="sino-table-icon-left">&ndash;&gt;-->
          <!--<sino-button type="icon-text"><i class="iconfont sino-daoru"></i>批量接收</sino-button>-->
          <!--<sino-button type="icon-text"><i class="iconfont sino-export"></i>导出申报表</sino-button>-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</div>-->
        <sino-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <sino-tab-pane name="first">
            <span slot="label">社保（<span class="tab-spe-red">6条</span>）</span>
              <sino-table :data="tableDataA" stripe border v-on:viewAll="searchFun"
                          class="toll-bill-table invoice-table-nomargin">
                <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
                <sino-table-column prop="manName" label="服务内容" min-width="120"></sino-table-column>
                <sino-table-column prop="sumCount" label="执行地区" min-width="120"></sino-table-column>
                <sino-table-column prop="laterCount" type="money" label="金额" width="120"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="签约方起做日期" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="签约方止做日期" min-width="120"></sino-table-column>
                <sino-table-column prop="alreadyCount" label="申报基数"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方个人基数" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方企业基数" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方个人缴纳" type="money" width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方企业缴纳" type="money" width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="个人比例（%）" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="企业比例（%）" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="个人附加"></sino-table-column>
                <sino-table-column prop="paymentRate" label="企业附加"></sino-table-column>
                <sino-table-column prop="paymentRate" label="缴费方式"></sino-table-column>
                <sino-table-column prop="paymentRate" label="支付方式"></sino-table-column>
                <sino-table-column prop="paymentRate" label="缴费账户名称" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方说明" min-width="120"></sino-table-column>

              </sino-table>
              <sino-page v-bind:page="pageA.pageNum" v-bind:page-size="pageA.pageSize" v-on:pagehandler="pageHandler($event,1)"
                         :pageArray="pageA.pageArray" v-on:choosePageFun="choooseNum($event,1)" v-bind:object="object"
                         :total="pageA.total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane name="second" >
            <span slot="label">公积金（<span class="tab-spe-red">1条</span>）</span>
              <sino-table :data="tableDataB" stripe max-height="416" border
                          class="toll-bill-table invoice-table-nomargin">
                <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
                <sino-table-column prop="manName" label="服务内容" min-width="120"></sino-table-column>
                <sino-table-column prop="sumCount" label="执行地区" min-width="120"></sino-table-column>
                <sino-table-column prop="laterCount" type="money" label="金额" width="120"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="签约方起做日期" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="签约方止做日期" min-width="120"></sino-table-column>
                <sino-table-column prop="alreadyCount" label="申报基数"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方个人基数" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方企业基数" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方个人缴纳" type="money" width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方企业缴纳" type="money" width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="个人比例（%）" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="企业比例（%）" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="个人附加"></sino-table-column>
                <sino-table-column prop="paymentRate" label="企业附加"></sino-table-column>
                <sino-table-column prop="paymentRate" label="缴费方式"></sino-table-column>
                <sino-table-column prop="paymentRate" label="支付方式"></sino-table-column>
                <sino-table-column prop="paymentRate" label="缴费账户名称" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方说明" min-width="120"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="pageB.pageNum" v-bind:page-size="pageB.pageSize" v-on:pagehandler="pageHandler($event,2)"
                         :pageArray="pageB.pageArray" v-on:choosePageFun="choooseNum($event,2)" v-bind:object="object"
                         :total="pageB.total"></sino-page>
          </sino-tab-pane>
          <sino-tab-pane name="three">
            <span slot="label">服务费（<span class="tab-spe-red">2条</span>）</span>
              <sino-table :data="tableDataC" stripe max-height="416" border
                          class="toll-bill-table invoice-table-nomargin">
                <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
                <sino-table-column prop="manName" label="服务内容" min-width="120"></sino-table-column>
                <sino-table-column prop="sumCount" label="执行地区" min-width="120"></sino-table-column>
                <sino-table-column prop="laterCount" type="money" label="付费金额" width="120"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="签约方起做日期" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRateCount" label="签约方止做日期" min-width="120"></sino-table-column>
                <sino-table-column prop="paymentRate" label="签约方说明" min-width="120"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="pageC.pageNum" v-bind:page-size="pageC.pageSize" v-on:pagehandler="pageHandler($event,3)"
                         :pageArray="pageC.pageArray" v-on:choosePageFun="choooseNum($event,3)" v-bind:object="object"
                         :total="pageC.total"></sino-page>
          </sino-tab-pane>
        </sino-tabs>
      </div>
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
        searchForm: { // 搜索条件
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
        }
      };
    },
    created () {
      this.ruoteJudge();
    },
    mounted () {
      api.post(this.dicSelUrl, {code: 'REPORT_TYPE'}).then(res => {
        this.sinsStateList = res.data.list;
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          // if (val.path === "/trustManage/trustmanageDetail") {
          //   this.routerView = false;
          //   // this.searchFun();
          // }
        },
        deep: true
      }
    },

    methods: {
      ruoteJudge () {
        // if (this.$route.path !== "/trustManage/trustmanageDetail") {
        //   this.routerView = true;
        // }
      },
      custChange () {
        this.tempData.custId = this.jobsingleForm.custId;
        this.conData.id = this.jobsingleForm.custId;
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
  .sino-tabs-header{overflow: hidden}
</style>
