<template>
  <!--订单收付费情况-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item " v-if="false">订单收付费情况</div>
          <div class="sino-tabs-item is-active" @click="prodScheFun('orderDetails')">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item" @click="prodScheFun('serverProce')">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')" v-if="false">其他信息</div>
        </div>
      </div>
    </div>
    <sino-con class="single-empass">
      <sino-form :model="orderPayForm" ref="orderPayForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <!--<li class="search-inner-one">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.custName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="雇员唯一号：" class="search-inner-item" prop="uniqNo">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.uniqNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="成本中心名称：" class="search-inner-item" prop="costCentName">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.costCentName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>-->
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.empName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <!--<li>
              <sino-form-item label="产品服务模板名称：" class="search-inner-item" prop="prodServeTempName">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.prodServeTempName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>-->
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.certNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="服务内容：" class="search-inner-item" prop="prodTypeName">
                <div class="search-inner-radio fl">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="prodUrl"
                               :chooseName.sync="orderPayForm.prodTypeName"
                               :chooseId.sync="orderPayForm.prodType"
                               :clear="true"></sino-select>
                </div>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="年份：" class="search-inner-item" prop="custName">
                <div class="search-inner-radio fl">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{}"
                               :chooseName.sync="orderPayForm.custName"
                               :chooseId.sync="orderPayForm.custId"
                               :clear="true"></sino-select>
                </div>
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
    <div class="sino-queryList">
      <div class="sino-table-total">
        <sino-table :data="orderServerData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="uniqNo" label="一月" min-width="95"></sino-table-column>
          <sino-table-column prop="empName" label="二月" min-width="80"></sino-table-column>
          <sino-table-column prop="custName" label="三月" min-width="80"></sino-table-column>
          <sino-table-column prop="signSuppName" label="四月" min-width="120"></sino-table-column>
          <sino-table-column prop="paySuppName" label="五月" min-width="120"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="六月" min-width="105"></sino-table-column>
        </sino-table>
        <sino-table :data="propayData" max-height="416" stripe v-on:viewAll="viewAll1" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="uniqNo" label="七月" min-width="95"></sino-table-column>
          <sino-table-column prop="empName" label="八月" min-width="80"></sino-table-column>
          <sino-table-column prop="custName" label="九月" min-width="80"></sino-table-column>
          <sino-table-column prop="signSuppName" label="十月" min-width="120"></sino-table-column>
          <sino-table-column prop="paySuppName" label="十一月" min-width="120"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="十二月" min-width="105"></sino-table-column>
        </sino-table>
        <div class="conf-btn">
          <sino-button type="primary" @click="backFun">返 回</sino-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        prodUrl: this.apiPath.hrsc.findprodinfoselectbox,
        orderPayForm: {
          custName: '',
          costCentName: '',
          prodServeTempName: '',
          uniqNo: '',
          empName: '',
          certNo: '',
          prodType: '',
          prodTypeName: ''
        },
        orderServerData: null,
        propayData: null
      };
    },
    mounted () {
      let sessionStorage = window.sessionStorage;
      this.$route.params.orderId = this.$route.params.orderId || sessionStorage.orderId;
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.params.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.orderPayForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
//      console.log('orderpayCharge=======', this.$route.params.orderId);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      prodScheFun (type) {
        if (type === 'orderDetails') {
          this.$router.push({path: '/orderQuery/orderDetails', name: "订单详情", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderDet') {
          this.$router.push({path: '/orderQuery/orderDet', name: "订单明细", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'serverProce') {
          this.$router.push({path: '/orderQuery/serverProce', name: "服务手续", params: {orderId: this.$route.params.orderId}});
        } else {
          this.$router.push({path: '/orderQuery/otherInfo', name: "其他信息", params: {orderId: this.$route.params.orderId}});
        }
      },
      searchFun () {},
      viewAll () {},
      viewAll1 () {},
      resetFun () {},
      backFun () {}
    }
  };
</script>
