<template>
  <!--服务模板详情-->
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="服务模板详情"></sino-title>
      <div class="service-module-box">
        <sino-title type="levelTwo" title="模板名称" class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li class="li-last">
              <h6>模板名称</h6><span v-text="serviceCharge.tempName"></span>
            </li>
            <li>
              <h6>客户名称</h6><span v-text="serviceCharge.custName"></span>
            </li>
            <li>
              <h6>服务费计费方式</h6><span v-text="serviceCharge.serveChargingTypeName"></span>
            </li>
            <li>
              <h6>创建人</h6><span v-text="serviceCharge.creName"></span>
            </li>
            <li>
              <h6>创建时间</h6><span v-text="serviceCharge.creTime"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="service-module-box" v-if="serveTempDetSins && (JSON.stringify(serveTempDetSins) !== '{}')">
        <sino-title type="levelTwo" :title="$route.query.serveChargingType === 1?serveTempDetSins.serveTempDetServe.priceName:'社保服务'" class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费收费金额</h6><span v-text="serveTempDetSins.serveTempDetServe.chargeMoney"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费付费金额</h6><span v-text="serveTempDetSins.serveTempDetServe.payMoney"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费发票科目</h6><span v-text="serveTempDetSins.serveTempDetServe.invSubName"></span>
            </li>
            <li>
              <h6>执行地区</h6><span v-text="serveTempDetSins.areaName"></span>
            </li>
            <li>
              <h6>受托供应商</h6><span v-text="serveTempDetSins.receSuppName"></span>
            </li>
            <li>
              <h6>起做止做原则</h6><span v-text="serveTempDetSins.begEndPrinName"></span>
            </li>
            <li>
              <h6>缴费方式</h6><span v-text="serveTempDetSins.payFeeWayName"></span>
            </li>
            <li>
              <h6>社保企业账户</h6>
              <span>
                <sino-tooltip class="item" :enterable="false" popper-class="sins-tooltip" effect="dark" :content="serveTempDetSins.acctNames.join(',')" placement="bottom-start" trigger="click" :visible-arrow="false">
                  <i class="tooltip-text" v-text="serveTempDetSins.acctNames.join(',')"></i>
                </sino-tooltip>
              </span>
            </li>
            <li :class="{'li-last':serveTempDetSins.serveTempDetSinsPkgs.length === 0 && $route.query.serveChargingType === 1}">
              <h6>{{$route.query.serveChargingType === 1?'社保发票科目':'发票科目'}}</h6><span v-text="serveTempDetSins.invsubName"></span>
            </li>
            <li v-for="(item, index) in serveTempDetSins.serveTempDetSinsPkgs" :key="item" :class="{'li-last':serveTempDetSins.serveTempDetSinsPkgs.length === 2 && $route.query.serveChargingType === 1 && index === 1}">
              <h6>{{item.householdType[0] === 1? '城镇-社保缴费标准':'农村-社保缴费标准'}}</h6><span v-text="item.pkgName"></span>
            </li>
            <!--<li v-if="$route.query.serveChargingType === 2">-->
              <!--<h6>农村-地方标准组合</h6><span v-text="serveTempDetSins.serveTempDetSinsPkgs[1].householdType === 2?serveTempDetSins.serveTempDetSinsPkgs[1].pkgName:serveTempDetSins.serveTempDetSinsPkgs[0].pkgName"></span>-->
            <!--</li>-->
            <!--<li class="li-last" v-if="$route.query.serveChargingType === 1">-->
              <!--<h6>农村-地方标准组合</h6><span v-text="serveTempDetSins.serveTempDetSinsPkgs[1].householdType === 2?serveTempDetSins.serveTempDetSinsPkgs[1].pkgName:serveTempDetSins.serveTempDetSinsPkgs[0].pkgName"></span>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
      <div class="service-module-box" v-if="serveTempDetAccu && (JSON.stringify(serveTempDetAccu) !== '{}')">
        <sino-title type="levelTwo" :title="$route.query.serveChargingType === 1?serveTempDetAccu.serveTempDetServe.priceName:'公积金服务'"  class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费收费金额</h6><span v-text="serveTempDetAccu.serveTempDetServe.chargeMoney"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费付费金额</h6><span v-text="serveTempDetAccu.serveTempDetServe.payMoney"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费发票科目</h6><span v-text="serveTempDetAccu.serveTempDetServe.invSubName"></span>
            </li>
            <li>
              <h6>执行地区</h6><span v-text="serveTempDetAccu.areaName"></span>
            </li>
            <li>
              <h6>受托供应商</h6><span v-text="serveTempDetAccu.receSuppName"></span>
            </li>
            <li>
              <h6>起做止做原则</h6><span v-text="serveTempDetAccu.begEndPrinName"></span>
            </li>
            <li>
              <h6>缴费方式</h6><span v-text="serveTempDetAccu.payFeeWayName"></span>
            </li>
            <li>
              <h6>公积企业金账户</h6><span v-text="serveTempDetAccu.acctName"></span>
            </li>
            <li>
              <h6>公积金缴费标准</h6><span v-text="serveTempDetAccu.pkgName"></span>
            </li>
            <li>
              <h6>公积金比例</h6><span v-text="serveTempDetAccu.accuPerName"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 2">
              <h6>发票科目</h6><span v-text="serveTempDetAccu.invsubName"></span>
            </li>
            <li class="li-last" v-if="$route.query.serveChargingType === 1">
              <h6>公积金发票科目</h6><span v-text="serveTempDetAccu.invsubName"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="service-module-box" v-if="serveTempDetWage && (JSON.stringify(serveTempDetWage) !== '{}')">
        <sino-title type="levelTwo" :title="$route.query.serveChargingType === 1?serveTempDetWage.serveTempDetGongZi.serveTempDetServe.priceName:'工资服务'" class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费收费金额</h6><span v-text="serveTempDetWage.serveTempDetGongZi.serveTempDetServe.chargeMoney"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费付费金额</h6><span v-text="serveTempDetWage.serveTempDetGongZi.serveTempDetServe.payMoney"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>服务费发票科目</h6><span v-text="serveTempDetWage.serveTempDetGongZi.serveTempDetServe.invSubName"></span>
            </li>
            <li>
              <h6>执行地区</h6><span v-text="serveTempDetWage.serveTempDetGongZi.wageAreaName"></span>
            </li>
            <li>
              <h6>受托供应商</h6><span v-text="serveTempDetWage.serveTempDetGongZi.wageReceSuppName"></span>
            </li>
            <li>
              <h6>起做止做原则</h6><span v-text="serveTempDetWage.serveTempDetGongZi.begEndPrinName"></span>
            </li>
            <li>
              <h6>{{$route.query.serveChargingType === 1?'工资项发票科目':'发票科目'}}</h6><span v-text="serveTempDetWage.serveTempDetGongZi.wageInvsubName"></span>
            </li>
            <li v-if="$route.query.serveChargingType === 1">
              <h6>是否异地报税</h6><span v-text="serveTempDetWage.serveTempDetGongZi.isAlloTaxName"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="service-module-box" v-if="($route.query.serveChargingType === 1) && serveTempDetWage && (serveTempDetWage.isAlloTax === 1)">
        <sino-title type="levelTwo" title="代报个税服务" class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <h6>执行地区</h6><span v-text="serveTempDetWage.serveTempDetDeclare.taxAreaName"></span>
            </li>
            <li>
              <h6>受托供应商</h6><span v-text="serveTempDetWage.serveTempDetDeclare.taxReceSuppName"></span>
            </li>
            <li class="li-last">
              <h6>服务费付费金额</h6><span v-text="serveTempDetWage.serveTempDetDeclare.serveTempDetServe.payMoney"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="service-module-box" v-for="(item, index) in serveTempDetServes" :key="index">
        <sino-title type="levelTwo" :title="item.priceName" class="service-module-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <h6>执行地区</h6><span v-text="item.areaName"></span>
            </li>
            <li>
              <h6>受托供应商</h6><span v-text="item.receSuppName"></span>
            </li>
            <li>
              <h6>起做止做原则</h6><span v-text="item.begEndPrinName"></span>
            </li>
            <li v-if="item.prodPriceSchmId === 47">
              <h6>收费金额</h6><span v-text="item.chargeMoney"></span>
            </li>
            <li v-if="item.prodPriceSchmId === 47">
              <h6>付费金额</h6><span v-text="item.payMoney"></span>
            </li>
            <li>
              <h6>发票科目</h6><span v-text="item.invSubName"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="service-module-footer">
        <sino-button type="primary" @click="goBack">返 回</sino-button>
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        serviceCharge: '',
        serveTempDetSins: '',
        serveTempDetAccu: '',
        serveTempDetWage: {
          serveTempDetDeclare: {
            serveTempDetServe: {}
          },
          serveTempDetGongZi: {
            serveTempDetServe: {}
          }
        },
        serveTempDetServes: ''
      };
    },
    created () {
      let that = this;
      api.post(this.apiPath.hrsc.findServeTempById, this.$route.query).then(res => {
        if (res.code === 'CPYY-00001') {
          this.serviceCharge = res.data.serviceCharge;
          this.serveTempDetSins = res.data.serveTempDetSins;
          this.serveTempDetAccu = res.data.serveTempDetAccu;
          this.serveTempDetWage = res.data.serveTempDetWage;
          this.serveTempDetServes = res.data.serveTempDetServes;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      goBack () {
        this.$router.back({query: 'back'});
      }
    }
  };
</script>
