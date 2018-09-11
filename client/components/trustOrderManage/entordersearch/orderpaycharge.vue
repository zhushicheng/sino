<template>
  <!--订单收付费情况-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">订单收付费情况</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDetails')">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item" @click="prodScheFun('serverProce')">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')">其他信息</div>
        </div>
      </div>
    </div>
    <sino-con class="single-empass">
      <sino-form :model="orderPayForm" ref="orderPayForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
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
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.empName"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="orderPayForm.certNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="产品名称：" class="search-inner-item" prop="prodTypeName">
                <div class="search-inner-radio fl">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="prodUrl"
                               :chooseName.sync="orderPayForm.prodTypeName"
                               :chooseId.sync="orderPayForm.prodType"
                               :clear="true"></sino-select>
                </div>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="年份：" class="search-inner-item" prop="aaName">
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
                               :chooseName.sync="orderPayForm.aaName"
                               :chooseId.sync="orderPayForm.aa"
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
          <sino-table-column prop="orderBegDate" label="6月" min-width="105"></sino-table-column>
        </sino-table>
        <sino-table :data="propayData" max-height="416" stripe v-on:viewAll="viewAll1" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="uniqNo" label="一月" min-width="95"></sino-table-column>
          <sino-table-column prop="empName" label="二月" min-width="80"></sino-table-column>
          <sino-table-column prop="custName" label="三月" min-width="80"></sino-table-column>
          <sino-table-column prop="signSuppName" label="四月" min-width="120"></sino-table-column>
          <sino-table-column prop="paySuppName" label="五月" min-width="120"></sino-table-column>
          <sino-table-column prop="orderBegDate" label="6月" min-width="105"></sino-table-column>
        </sino-table>
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
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        prodUrl: this.apiPath.hrsc.findprodinfoselectbox,
        orderPayForm: {
          custName: '',
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
//      console.log('orderpayCharge=======', this.$route.query.orderId);
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.query.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.orderPayForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      prodScheFun (type) {
        if (type === 'orderDetails') {
          this.$router.push({path: '/entOrderSearch/orderDetails', query: {orderId: this.$route.query.orderId}});
        } else if (type === 'orderDet') {
          this.$router.push({path: '/entOrderSearch/orderDet', query: {orderId: this.$route.query.orderId}});
        } else if (type === 'serverProce') {
          this.$router.push({path: '/entOrderSearch/serverProce', query: {orderId: this.$route.query.orderId}});
        } else {
          this.$router.push({path: '/entOrderSearch/otherInfo', query: {orderId: this.$route.query.orderId}});
        }
      },
      searchFun () {},
      viewAll () {},
      viewAll1 () {},
      resetFun () {},
      backFun () {
        this.$router.push({path: '/entOrderSearch'});
      }
    }
  };
</script>
