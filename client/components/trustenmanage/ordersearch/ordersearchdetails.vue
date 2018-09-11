<template>
 <!-- <div>明细</div>-->
  <div class="usermanage">
    <sino-con class="single-empass fl marbom">
      <sino-title type="levelOne" title="任务单详情"></sino-title>
      <div class="local-info">
        <sino-form :model="orderDetailsForm" ref="orderDetailsForm" class="serch-form order-details">
          <ul class="local-info-ul">
            <li class="remak">
              <sino-form-item prop="signSuppName" label="签约供应商：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.signSuppName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="remak">
              <sino-form-item prop="paySuppName" label="付费供应商：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.paySuppName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="remak">
              <sino-form-item prop="custName" label="客户名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.custName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="suppEmpNo" label="供应商员工编号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.suppEmpNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="custNo" label="客户编号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.custNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="entrustTypeDict" label="委托类型：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.entrustTypeDict"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="clear">
              <sino-form-item prop="empName" label="雇员姓名：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.empName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="uniqNo" label="雇员唯一号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.uniqNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="nationalityName" label="国籍：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.nationalityName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="certTypeDict" label="证件类型：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.certTypeDict"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="certNo" label="证件号码：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.certNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="householdTypeDict" label="户口性质：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.householdTypeDict"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="email" label="邮箱地址：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.email"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="phone" label="联系电话：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.phone"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="confirmTime" label="受托确认时间：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.confirmTime"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="dimReason" label="离职原因：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.dimReason"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </sino-form>
      </div>
    </sino-con>
    <div class="sino-queryList clear">
      <div class="sino-table-total">
        <sino-title type="levelTwo" title="服务费" class="seeorderhis"></sino-title>
        <sino-auto-table :data="orderServerData" max-height="235" stripe v-on:viewAll="viewAll" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center" fixed="left"></sino-table-column>
          <sino-table-column prop="prodPriceScheName" label="服务内容" min-width="150" fixed="left"></sino-table-column>
          <sino-table-column prop="money" label="金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="taskChgTypeDict" label="变更类型" min-width="140"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区"></sino-table-column>
          <sino-table-column prop="begDate" label="签约方起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="endDate" label="签约方止做日期" min-width="120"></sino-table-column>
          <!--<sino-table-column prop="orderBegDate" label="订单开始日期" min-width="150"></sino-table-column>-->
          <!--<sino-table-column prop="orderEndDate" label="订单结束日期" min-width="120"></sino-table-column>-->
          <sino-table-column prop="entrustDep" label="委托方业务部" min-width="105"></sino-table-column>
          <sino-table-column prop="entrustCont" label="委托方联系人" min-width="120"></sino-table-column>
          <sino-table-column prop="entrustRemark" label="委托方备注" min-width="180"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
        <sino-title type="levelTwo" title="社保公积金" class="seeorderhis"></sino-title>
        <sino-auto-table :data="propayData" max-height="235" stripe v-on:viewAll="viewAll1" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center" fixed="left"></sino-table-column>
          <sino-table-column prop="prodName" label="服务内容" fixed="left" min-width="150"></sino-table-column>
          <sino-table-column prop="money" label="金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="taskChgTypeDict" label="变更类型"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区"></sino-table-column>
          <sino-table-column prop="begDate" label="起做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="endDate" label="止做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="declRadix" label="申报基数" min-width="120"></sino-table-column>
          <sino-table-column prop="perRadix" label="个人基数" min-width="120"></sino-table-column>
          <sino-table-column prop="entRadix" label="企业基数" min-width="120"></sino-table-column>
          <sino-table-column prop="perProp" label="个人比例（%）" min-width="120"></sino-table-column>
          <sino-table-column prop="entProp" label="企业比例（%）" min-width="120"></sino-table-column>
          <sino-table-column prop="accuProp" label="公积金/补充公积金比例（%）" min-width="170"></sino-table-column>
          <sino-table-column prop="perAddiMoney" label="个人附加"></sino-table-column>
          <sino-table-column prop="entAddiMoney" label="企业附加"></sino-table-column>
          <sino-table-column prop="perPay" label="个人缴纳额" min-width="140"></sino-table-column>
          <sino-table-column prop="entPay" label="企业缴纳额" min-width="140"></sino-table-column>
          <sino-table-column prop="sumPay" label="总缴纳额" min-width="140"></sino-table-column>
          <sino-table-column prop="payFeeWayDict" label="缴费方式"></sino-table-column>
          <sino-table-column prop="payWayDict" label="支付方式"></sino-table-column>
          <!--<sino-table-column prop="orderBegDate" label="订单开始日期" min-width="150"></sino-table-column>-->
          <!--<sino-table-column prop="orderEndDate" label="订单结束日期" min-width="120"></sino-table-column>-->
          <sino-table-column prop="entrustDep" label="委托方业务部" min-width="105"></sino-table-column>
          <sino-table-column prop="entrustCont" label="委托方联系人" min-width="120"></sino-table-column>
          <sino-table-column prop="entrustRemark" label="委托方备注" min-width="180"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="propay.pageNum"
                   v-bind:page-size="propay.pageSize"
                   v-on:pagehandler="pageHandler1"
                   :pageArray="propay.pageArray"
                   v-on:choosePageFun="choooseNum1"
                   v-bind:object="object"
                   :total="propay.total"></sino-page>
        <!--<sino-title type="levelTwo" title="工资" class="seeorderhis"></sino-title>
        <sino-auto-table :data="wageTableData" max-height="235" stripe v-on:viewAll="viewAll2" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center" fixed="left"></sino-table-column>
          <sino-table-column prop="" label="工资项目" fixed="left"></sino-table-column>
          <sino-table-column prop="taskChgTypeDict" label="变更类型" min-width="105"></sino-table-column>
          <sino-table-column prop="begDate" label="起做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="endDate" label="止做日期" min-width="100"></sino-table-column>
          <sino-table-column prop="money" label="金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="" label="工资日"></sino-table-column>
          <sino-table-column prop="" label="收费启动月" min-width="100"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="wage.pageNum"
                   v-bind:page-size="wage.pageSize"
                   v-on:pagehandler="pageHandler2"
                   :pageArray="wage.pageArray"
                   v-on:choosePageFun="choooseNum2"
                   v-bind:object="object"
                   :total="wage.total"></sino-page>-->
        <div class="conf-btn">
          <sino-button type="primary" @click="backFun">返 回</sino-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    data () {
      return {
        orderDetailsForm: {},
        orderServerData: null,
        total: null,
        pageNum: 1,
        pageSize: 5,
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
        propayData: null,
        propay: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        },
        wageTableData: null,
        wage: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        }
      };
    },
    mounted () {
      api.postsign(this.apiPath.hrsc.getTaskInfoByTaskId, this.$route.query.taskId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.orderDetailsForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
      this.pageNum = 1;
      this.viewAll(this.pageNum, this.pageSize);
      this.propay.pageNum = 1;
      this.viewAll1(this.propay.pageNum, this.propay.pageSize);
      this.wage.pageNum = 1;
      this.viewAll2(this.wage.pageNum, this.wage.pageSize);
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let _data = {
          data: {
            taskId: this.$route.query.taskId
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.listTaskDetServe, _data).then(res => {
          this.orderServerData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      viewAll1 (pageNum, pageSize) {
        let _data = {
          data: {
            taskId: this.$route.query.taskId
          },
          pageNum: pageNum || this.propay.pageNum,
          pageSize: pageSize || this.propay.pageSize
        };
        api.post(this.apiPath.hrsc.listTaskDetProdPay, _data).then(res => {
          this.propayData = res.data.list;
          this.propay.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      viewAll2 (pageNum, pageSize) {
        let _data = {
          data: {
            taskId: this.$route.query.taskId
          },
          pageNum: pageNum || this.wage.pageNum,
          pageSize: pageSize || this.wage.pageSize
        };
        api.post(this.apiPath.hrsc.listTaskDetWage, _data).then(res => {
          this.wageTableData = res.data.list;
          this.wage.total = res.data.total;
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
        this.propay.pageNum = pageNum;
        this.viewAll1(pageNum, this.propay.pageSize);
      },
      choooseNum1: function (pageSize) {
        this.propay.pageSize = pageSize;
        this.propay.pageNum = 1;
        this.viewAll1(this.propay.pageNum, pageSize);
      },
      pageHandler2: function (pageNum) {
        this.wage.pageNum = pageNum;
        this.viewAll2(pageNum, this.wage.pageSize);
      },
      choooseNum2: function (pageSize) {
        this.wage.pageSize = pageSize;
        this.wage.pageNum = 1;
        this.viewAll2(this.wage.pageNum, pageSize);
      },
      backFun () {
        this.$router.push({path: '/orderSearch'});
      }
    }
  };
</script>
