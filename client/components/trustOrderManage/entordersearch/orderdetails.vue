<template>
  <!--订单详情-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('orderPayCharge')">订单收付费情况</div>
          <div class="sino-tabs-item is-active">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item" @click="prodScheFun('serverProce')">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')">其他信息</div>
        </div>
      </div>
    </div>
    <sino-con class="single-empass single-empass-width fl">
      <sino-title type="levelTwo" title="基本信息"></sino-title>
      <div class="local-info">
        <sino-form :model="orderDetailsForm" ref="orderDetailsForm" class="serch-form order-details">
          <ul class="local-info-ul">
            <li>
              <sino-form-item prop="signSuppName" label="签约供应商名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.signSuppName"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="paySuppName" label="付费供应商名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.paySuppName"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="custName" label="客户名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.custName"
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
              <sino-form-item prop="empName" label="雇员姓名：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.empName"
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
              <sino-form-item prop="certTypeName" label="证件类型：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.certTypeName"
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
              <sino-form-item prop="householdType" label="户口性质：">
                <sino-radio v-for="(item, index) in householdTypeList" disabled :key="index"
                            v-model.number="orderDetailsForm.householdType"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>
            <li class="clear">
              <sino-form-item prop="sex" label="性别：">
                <sino-radio v-for="(item, index) in sexList" disabled :key="index"
                            v-model.number="orderDetailsForm.sex"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="remark" label="手机号码：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.empTel"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="remark" label="邮箱地址：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.pkgName"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="custEmpInnerNo" label="供应商员工编号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.custEmpInnerNo"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="assOperTime" label="派出操作时间：">
                <sino-date-picker
                  v-model="orderDetailsForm.assOperTime"
                  type="datetime"
                  :editable="false"
                  :readonly="true"
                  :disabled="true"
                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="orderCateName" label="订单类别：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.orderCateName"
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
            <li>
              <sino-form-item prop="orderStateName" label="订单操作状态：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.orderStateName"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="orderBegDate" label="订单开始日期：">
                <sino-date-picker
                  v-model="orderDetailsForm.orderBegDate"
                  type="date"
                  :editable="false"
                  :readonly="true"
                  :disabled="true"
                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li class="clear">
              <sino-form-item prop="remark" label="社会保障号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.pkgName"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="sinsPayFeeWayName" label="社保缴纳方式：">
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
              <sino-form-item prop="sinsPkgName" label="社保标准组合名称：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.sinsPkgName"
                             :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="remark" label="公积金职工账号：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.pkgName"
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
              <sino-form-item prop="accuPkgName" label="公积金标准组合名称：">
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
              <sino-form-item prop="respBusiDepName" label="负责部门：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.respBusiDepName"
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
          </ul>
          <sino-title type="levelTwo" title="撤离信息" style="margin-bottom: 15px;"></sino-title>
          <ul class="local-info-ul">
            <li>
              <sino-form-item prop="orderEndDate" label="订单结束日期：">
                <sino-date-picker
                  v-model="orderDetailsForm.orderEndDate"
                  type="date"
                  :editable="false"
                  :readonly="true"
                  :disabled="true"
                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="leaveOperTime" label="撤离操作时间：">
                <sino-date-picker
                  v-model="orderDetailsForm.leaveOperTime"
                  type="datetime"
                  :editable="false"
                  :readonly="true"
                  :disabled="true"
                  :clearable="true">
                </sino-date-picker>
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
              <sino-form-item prop="liquidatedAmo" label="违约金额：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.liquidatedAmo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="remark" label="离职费金额：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.pkgName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item prop="remark" label="离职月数：">
                <sino-input class="fl" type="text"
                            v-model="orderDetailsForm.pkgName"
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

      <!--<div class="local-info">
        <sino-form :model="orderDetailsForm" ref="orderDetailsForm" class="serch-form order-details">

        </sino-form>
      </div>-->
      <div class="conf-btn">
        <sino-button type="primary" @click="backFun">返 回</sino-button>
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        orderDetailsForm: {
          signSuppName: '',
          paySuppName: '',
          custName: '',
          certTypeName: '',
          uniqNo: '',
          empName: '',
          nationlityName: '',
          certNo: '',
          householdType: '',
          sex: '',
          custEmpInnerNo: '',
          assOperTime: '',
          orderCateName: '',
          accrAreaName: '',
          orderStateName: '',
          orderBegDate: '',
          sinsPayFeeWayName: '',
          sinsDeclWage: '',
          sinsPkgName: '',
          accuPayFeeWayName: '',
          accuDeclWage: '',
          accuPkgName: '',
          accuProp: '',
          accuPropAddi: '',
          sinsEndDate: '',
          leaveOperTime: '',
          liquidatedAmo: '',
          empTel: '',
          nationality: '',
          nationalityName: '',
          respBusiDepName: '',
          respBusiRepName: ''
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
        console.log(this.householdTypeList);
      }).catch(err => {
        console.log(err);
      });
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.query.orderId).then(res => {
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
          this.$router.push({path: '/entOrderSearch/orderDet', query: {orderId: this.$route.query.orderId}});
        } else if (type === 'serverProce') {
          this.$router.push({path: '/entOrderSearch/serverProce', query: {orderId: this.$route.query.orderId}});
        } else if (type === 'orderPayCharge') {
          this.$router.push({path: '/entOrderSearch/orderPayCharge', query: {orderId: this.$route.query.orderId}});
        } else {
          this.$router.push({path: '/entOrderSearch/otherInfo', query: {orderId: this.$route.query.orderId}});
        }
      },
      backFun () {
        this.$router.push({path: '/entOrderSearch'});
      }
    }
  };
</script>
