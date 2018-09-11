<template>
  <!--订单详情-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('orderPayCharge')" v-if="false">订单收付费情况</div>
          <div class="sino-tabs-item is-active">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item" @click="prodScheFun('serverProce')">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')" v-if="false">其他信息</div>
        </div>
      </div>
    </div>
    <sino-con class="single-empass fl marbom single-empass-width">
      <sino-title type="levelTwo" title="雇员信息"></sino-title>
      <div class="local-info">
        <sino-form :model="orderDetailsForm" ref="orderDetailsForm" class="serch-form order-details">
          <ul class="local-info-ul">
            <li>
              <sino-form-item prop="empName" label="雇员姓名：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.empName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="sex" label="性别：">
                <sino-radio v-for="(item, index) in sexList" :disabled="true"
                            v-model="orderDetailsForm.sex" :key="index"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="certNo" label="身份证号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.certNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="nationlityName" label="国籍：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.nationalityName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="householdType" label="户口性质：">
                <sino-radio v-for="(item, index) in householdTypeList" :disabled="true"
                            v-model="orderDetailsForm.householdType" :key="index"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="empTel" label="手机号码：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.empTel"
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
              <sino-form-item prop="suppEmpInnerNo" label="供应商员工编号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.suppEmpInnerNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="empEmail" label="邮箱：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.empEmail"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
          </ul>
          <sino-title type="levelTwo" title="订单信息" class="clear"></sino-title>
          <ul class="local-info-ul fl">
            <li class="content-big">
              <sino-form-item prop="signSuppName" label="签约供应商：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.signSuppName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="orderBegDate" label="订单开始日期：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.orderBegDate"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="content-big">
              <sino-form-item prop="paySuppName" label="付费供应商：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.paySuppName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="accrAreaName" label="派出地区：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.accrAreaName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="content-big">
              <sino-form-item prop="custName" label="客户名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.custName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="orderCateName" label="订单类别：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.orderCateName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="content-big">
              <sino-form-item prop="conName" label="商务合同名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.conName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li style="min-height:47px;">
              <sino-form-item prop="costCentName" label="成本中心：" v-if="orderDetailsForm.source !== 2">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.costCentName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="remak" v-if="orderDetailsForm.source !== 2">
              <sino-form-item prop="prodServeTempName" label="服务模板名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.prodServeTempName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="aa" label="社保个人编号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.aa"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="sinsPayFeeWayName" label="社保缴费方式：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.sinsPayFeeWayName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="sinsDeclWage" label="社保申报基数：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.sinsDeclWage"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="sinsPkgName" label="社保缴费标准：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.sinsPkgName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="accuPayFeeWayName" label="公积金缴费方式：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.accuPayFeeWayName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="accuDeclWage" label="公积金申报基数：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.accuDeclWage"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="accuPkgName" label="公积金缴费标准：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.accuPkgName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="accuProp" label="公积金比例：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.accuProp"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="accuPropAddi" label="补充公积金比例：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.accuPropAddi"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="bb" label="公积金职工账号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.bb"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="orderStateName" label="订单操作状态：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.orderStateName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="assOperTime" label="派出操作时间：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.assOperTime"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="orderEndDate" label="订单结束日期：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.orderEndDate"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="revokeReasonName" label="离职原因：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.revokeReasonName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="leaveOperTime" label="撤离操作时间：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.leaveOperTime"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="respBusiRepName" label="负责人：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.respBusiRepName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="respBusiDepName" label="负责部门：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.respBusiDepName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="remak">
              <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
                <sino-input type="textarea" v-model="orderDetailsForm.remark"  :disabled="true" ></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </sino-form>
      </div>
      <div class="conf-btn ml20">
        <sino-button type="primary" @click="backFun">返 回</sino-button>
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        orderDetailsForm: {
          empName: '',
          sex: '',
          certNo: '',
          nationlityName: '',
          householdType: '',
          empTel: '',
          uniqNo: '',
          suppEmpInnerNo: '',
          empEmail: '',
          signSuppName: '',
          paySuppName: '',
          orderBegDate: '',
          accrAreaName: '',
          custName: '',
          orderCateName: '',
          conName: '',
          costCentName: '',
          prodServeTempName: '',
          sinsPayFeeWayName: '',
          sinsDeclWage: '',
          sinsPkgName: '',
          accuPayFeeWayName: '',
          accuDeclWage: '',
          accuPkgName: '',
          accuProp: '',
          accuPropAddi: '',
          orderStateName: '',
          assOperTime: '',
          orderEndDate: '',
          revokeReasonName: '',
          leaveOperTime: '',
          respBusiRepName: '',
          respBusiDepName: '',
          remark: ''
        },
        sexList: [],
        householdTypeList: []
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'SEX'}).then(res => {
        this.sexList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'HOUSEHOLD_TYPE'}).then(res => {
        this.householdTypeList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      let sessionStorage = window.sessionStorage;
      this.$route.params.orderId = this.$route.params.orderId || sessionStorage.orderId;
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.params.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.orderDetailsForm.assOperTime = new Date(res.data.assOperTime);
          this.orderDetailsForm.orderBegDate = new Date(res.data.orderBegDate);
          this.orderDetailsForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      prodScheFun (type) {
        if (type === 'orderDet') {
          this.$router.push({path: '/orderQuery/orderDet', name: "订单明细", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'serverProce') {
          this.$router.push({path: '/orderQuery/serverProce', name: "服务手续", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderPayCharge') {
          this.$router.push({path: '/orderQuery/orderPayCharge', name: "订单收付费情况", params: {orderId: this.$route.params.orderId}});
        } else {
          this.$router.push({path: '/orderQuery/otherInfo', name: "其他信息", params: {orderId: this.$route.params.orderId}});
        }
      },
      backFun () {
        this.$router.push({path: '/orderQuery'});
      }
    }
  };
</script>
