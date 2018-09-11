<template>
  <!--受托单管理办理反馈-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="查看办理反馈"></sino-title>
      <sino-form :model="searchForm" :rules="addlocalInfoRules" ref="searchForm"  class="serch-form">
        <div class="search-box" style="width: 100%;border-right:none;">
          <ul class="search-inner-box">
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
        <div class="clear"></div>
      </sino-form>
    </sino-con>
      <!--搜索结果-->
    <div class="sino-table-total mt15">
      <sino-title type="levelTwo" title="服务费" class="mt10 mb10"></sino-title>
      <sino-auto-table :data="tableDataA" border max-height="416" stripe @selection-change="serverCallBack" v-on:viewAll="searchFun">
        <!--<sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>-->
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="prodName" label="订单明细操作状态" min-width="150"></sino-table-column>
        <sino-table-column prop="execuAreaName" label="服务内容" min-width="150"></sino-table-column>
        <sino-table-column prop="publishBegDate" label="执行地区" min-width="120"></sino-table-column>
        <sino-table-column prop="chargeAmo" label="付费金额" width="150" type="money" align="center"></sino-table-column>
        <sino-table-column prop="chargeBegYm" label="签约方起做日期" min-width="130"></sino-table-column>
        <sino-table-column prop="payAmo" label="签约方止做日期" width="130"></sino-table-column>
        <sino-table-column prop="payBegYm" label="签约方说明" min-width="180"></sino-table-column>
      </sino-auto-table>
      <sino-page v-bind:page="pageA.pageNum"
                 v-bind:page-size="pageA.pageSize"
                 v-on:pagehandler="pageHandler"
                 :pageArray="pageA.pageArray"
                 v-on:choosePageFun="choooseNum"
                 v-bind:object="object"
                 :total="pageA.total"></sino-page>
      <!--<div class="sino-table-icon single-icon-nopadding fr">-->
        <!--<div class="sino-table-icon-left">-->
          <!--<sino-button type="icon-text" @click="modifyBillDay"><i class="iconfont sino-modify"></i>修改收费启动月</sino-button>-->
          <!--<sino-button type="icon-text" @click="modifyStartDay"><i class="iconfont sino-modify"></i>修改起做日期</sino-button>-->
        <!--</div>-->
      <!--</div>-->
      <div style="" class="modifyPersonAndMonth">
        <sino-title type="levelTwo" title="社保公积金" class="mt10 mb10"></sino-title>
        <div class="modifyItem">
            <sino-button type="icon-text" @click="modifyPersonBase"><i class="iconfont sino-modify"></i>修改个人/企业基数</sino-button>
            <sino-button type="icon-text" @click="modifyStartDay"><i class="iconfont sino-modify"></i>修改起/止做日期</sino-button>
        </div>
      </div>
      <sino-auto-table :data="tableDataB" border max-height="416" stripe @selection-change="accuCallBack" v-on:viewAll="searchFun">
        <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="prodName" label="订单明细操作状态" min-width="150"></sino-table-column>
        <sino-table-column prop="execuAreaName" label="服务内容" min-width="150"></sino-table-column>
        <sino-table-column prop="publishBegDate" label="执行地区" min-width="120"></sino-table-column>
        <sino-table-column prop="chargeAmo" label="付费金额" width="150" type="money" align="center"></sino-table-column>
        <sino-table-column prop="chargeBegYm" label="签约方起做日期" min-width="130"></sino-table-column>
        <sino-table-column prop="payAmo" label="签约方止做日期" width="130"></sino-table-column>
        <!--<sino-table-column prop="payBegYm" label="签约方说明" min-width="180"></sino-table-column>-->
        <sino-table-column prop="declWage" label="申报基数"></sino-table-column>
        <sino-table-column prop="publishPerRadix" label="签约方个人基数" min-width="130"></sino-table-column>
        <sino-table-column prop="publishCorpRadix" label="签约方企业基数" min-width="130"></sino-table-column>
        <sino-table-column prop="publishPerPayMoney" label="签约方个人缴纳" type="money" width="150"></sino-table-column>
        <sino-table-column prop="publishEntPayMoney" label="签约方企业缴纳" type="money" width="150"></sino-table-column>
        <sino-table-column prop="perPayProp" label="个人比例（%）" min-width="120"></sino-table-column>
        <sino-table-column prop="entPayProp" label="企业比例（%）" min-width="120"></sino-table-column>
        <sino-table-column prop="perAddiMoney" label="个人附加"></sino-table-column>
        <sino-table-column prop="entAddiMoney" label="企业附加"></sino-table-column>
        <sino-table-column prop="payBegYm" label="签约方说明" min-width="180"></sino-table-column>
        <sino-table-column prop="chargeBegYm" label="受托方起做日期" min-width="130"></sino-table-column>
        <sino-table-column prop="payAmo" label="受托方止做日期" width="130"></sino-table-column>
        <sino-table-column prop="publishPerRadix" label="受托方个人基数" min-width="130"></sino-table-column>
        <sino-table-column prop="publishCorpRadix" label="受托方企业基数" min-width="130"></sino-table-column>
        <sino-table-column prop="publishPerPayMoney" label="受托方个人缴纳额" type="money" width="150"></sino-table-column>
        <sino-table-column prop="publishEntPayMoney" label="受托方企业缴纳额" type="money" width="150"></sino-table-column>
        <sino-table-column prop="payBegYm" label="受托方修改说明" min-width="180"></sino-table-column>
        <sino-table-column prop="payFeeWayName" label="缴费方式"></sino-table-column>
        <sino-table-column prop="payWayName" label="支付方式"></sino-table-column>
        <sino-table-column prop="acctName" label="缴费账户名称" min-width="180"></sino-table-column>
        <!--<sino-table-column prop="receSuppName" label="受托供应商名称" min-width="180"></sino-table-column>-->
        <!--<sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>-->
        <!--<sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>-->
      </sino-auto-table>
      <sino-page v-bind:page="pageB.pageNum"
                 v-bind:page-size="pageB.pageSize"
                 v-on:pagehandler="pageHandler1"
                 :pageArray="pageB.pageArray"
                 v-on:choosePageFun="choooseNum1"
                 v-bind:object="object"
                 :total="pageB.total"></sino-page>
    </div>
    <!--修改个人/企业基数-->
    <sino-dialog :visible.sync="modifyPersonBaseFlag" top="10%" size="small" class="modifyStartDayFlag" v-on:close="resetForm('modifyPersonBaseForm')">
      <sino-title slot="title" type="levelOne" title="修改基数：" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyPersonBaseForm" ref="modifyPersonBaseForm" class="" :rules="modifyPersonBaseRules">
        <ul class="search-inner-box">
          <li class="search-inner-one distinguish">签约方</li>
          <li class="search-inner-one distinguish">受托方</li>
          <li class="search-inner-one distinguish">
            <sino-form-item label="企业基数：" class="search-inner-item" prop="empName">
              <sino-input class="fl" type="text"
                          v-model="modifyPersonBaseForm.empName"
                          :disabled="true" placeholder=""></sino-input>
            </sino-form-item>
          </li>
          <li class="search-inner-one distinguish">
            <sino-form-item label="企业基数：" class="search-inner-item" prop="empName">
              <sino-input class="fl" type="text"
                          v-model="modifyPersonBaseForm.empName"
                          :disabled="true" placeholder=""></sino-input>
            </sino-form-item>
          </li>
          <li class="search-inner-one distinguish">
            <sino-form-item label="个人基数：" class="search-inner-item" prop="empName">
              <sino-input class="fl" type="text"
                          v-model="modifyPersonBaseForm.empName"
                          :disabled="true" placeholder=""></sino-input>
            </sino-form-item>
          </li>
          <li class="search-inner-one distinguish">
            <sino-form-item label="个人基数：" class="search-inner-item" prop="empName">
              <sino-input class="fl" type="text"
                          v-model="modifyPersonBaseForm.empName"
                          :disabled="true" placeholder=""></sino-input>
            </sino-form-item>
          </li>
          <li class="search-inner-one">
            <sino-form-item label="起做日期：" class="search-inner-item" prop="orderBegDate">
              <sino-date-picker class="fl"
                                v-model="modifyPersonBaseForm.orderBegDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
          </li>
          <li class="search-inner-one">
            <sino-form-item label="止做日期：" class="search-inner-item" prop="orderBegDate">
              <sino-date-picker class="fl"
                                v-model="modifyPersonBaseForm.orderBegDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
          </li>
          <li class="li-wid">
            <sino-form-item label="修改说明：" class="search-inner-item" prop="remark">
              <sino-input type="textarea" v-model="modifyPersonBaseForm.remark" placeholder=""></sino-input>
            </sino-form-item>
          </li>
        </ul>
      </sino-form>
      <span slot="footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span>“企业基数”和“个人基数”至少有一项必填。</span>
        </div>
          <sino-button type="primary" @click="modifyStartDaSure">保 存</sino-button>
        </span>
    </sino-dialog>
    <!--修改收费启动月弹层-->
    <sino-dialog :visible.sync="modifyStartDayFlag" top="10%" size="small" class="modifyStartDayFlag" v-on:close="resetForm('modifyStartDayAddForm')">
      <sino-title slot="title" type="levelOne" title="修改起/止做日期：" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyStartDayAddForm" ref="modifyStartDayAddForm" class="" :rules="modifyStartDayAddRules">
        <ul class="search-inner-box">
          <li class="search-inner-one">
            <sino-form-item label="起做日期：" class="search-inner-item" prop="orderBegDate">
              <sino-date-picker class="fl"
                                v-model="modifyStartDayAddForm.orderBegDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
          </li>
          <li class="search-inner-one">
            <sino-form-item label="止做日期：" class="search-inner-item" prop="orderBegDate">
              <sino-date-picker class="fl"
                                v-model="modifyStartDayAddForm.orderBegDate"
                                type="date"
                                :editable="false"
                                :readonly="false"
                                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
          </li>
          <li class="li-wid">
            <sino-form-item label="修改说明：" class="search-inner-item" prop="remark">
              <sino-input type="textarea" v-model="modifyStartDayAddForm.remark" placeholder=""></sino-input>
            </sino-form-item>
          </li>
        </ul>
      </sino-form>
      <span slot="footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span>"起做日期"和"止做日期”至少有一项必填。</span>
        </div>
          <sino-button type="primary" @click="modifyStartDaSure">保 存</sino-button>
        </span>
    </sino-dialog>
  </div>
</template>
<script>
  // import Utils from '../../development/component/sinoEdittable/utils/index.js';
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
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageB: { // 分页数据
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        pageC: { // 分页数据
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50],
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
        modifyStartDayFlag: false,
        modifyStartDayAddForm: {
          orderBegDate: '',
          remark: ''
        },
        modifyStartDayAddRules: {
          remark: [
            {required: true, message: '修改说明为必填项', trigger: 'blur'}
          ]
        },
        modifyPersonBaseFlag: false,
        modifyPersonBaseForm: {
          orderBegDate: '',
          remark: ''
        },
        modifyPersonBaseRules: {
          remark: [
            {required: true, message: '修改说明为必填项', trigger: 'blur'}
          ]
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
      modifyStartDay () {
        this.modifyStartDayFlag = true;
      },
      modifyPersonBase () {
        this.modifyPersonBaseFlag = true;
      },
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
        this.viewAll(this.pageA.pageNum, this.pageA.pageSize);
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
