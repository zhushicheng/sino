<template>
  <!--服务手续-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('orderPayCharge')" v-if="false">订单收付费情况</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDetails')">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item is-active">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')" v-if="false">其他信息</div>
        </div>
      </div>
    </div>
    <div class="local-info single-empass marbom single-empass-width">
      <sino-form :model="serviceForm" ref="serviceForm" class="serch-form order-details">
        <ul class="local-info-ul">
          <!--<li>
            <sino-form-item prop="custName" label="客户名称：">
              <sino-input class="fl" type="text"
                          v-model="serviceForm.custName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="costCentName" label="成本中心名称：">
              <sino-input class="fl" type="text"
                          v-model="serviceForm.costCentName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="prodServeTempName" label="产品服务模板名称：">
              <sino-input class="fl" type="text"
                          v-model="serviceForm.prodServeTempName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="uniqNo" label="雇员唯一号：">
              <sino-input class="fl" type="text"
                          v-model="serviceForm.uniqNo"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>-->
          <li>
            <sino-form-item prop="empName" label="雇员姓名：">
              <sino-input class="fl" type="text"
                          v-model="serviceForm.empName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="certNo" label="证件号码：">
              <sino-input class="fl" type="text"
                          v-model="serviceForm.certNo"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
        </ul>
      </sino-form>
    </div>
    <!--<sino-con class="single-empass fl">
      <sino-table :data="orderServerData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="handleRemark" label="办理描述" min-width="95"></sino-table-column>
        <sino-table-column prop="formalStateName" label="办理状态" min-width="80"></sino-table-column>
        <sino-table-column prop="handleResultName" label="办理结果" min-width="80"></sino-table-column>
        <sino-table-column prop="handleDate" label="办理时间" min-width="120"></sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum"
                 v-bind:page-size="pageSize"
                 v-on:pagehandler="pageHandler"
                 :pageArray="pageArray"
                 v-on:choosePageFun="choooseNum"
                 v-bind:object="object"
                 :total="total"></sino-page>
      <div class="conf-btn fl">
        <sino-button type="primary" @click="backFun">返 回</sino-button>
      </div>
    </sino-con>-->
    <div class="sino-queryList clear">
      <div class="sino-table-total single-empass-width1">
        <sino-table :data="orderServerData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table mt15">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="handleRemark" label="办理描述"></sino-table-column>
          <sino-table-column prop="formalStateName" label="办理状态"></sino-table-column>
          <sino-table-column prop="handleResultName" label="办理结果"></sino-table-column>
          <sino-table-column prop="handleDate" label="办理日期"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
        <div class="conf-btn">
          <sino-button type="primary" @click="backFun">返 回</sino-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  let sessionStorage = window.sessionStorage;
  export default {
    data () {
      return {
        serviceForm: {
          custName: '',
          costCentName: '',
          prodServeTempName: '',
          uniqNo: '',
          empName: '',
          certNo: ''
        },
        orderServerData: null,
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
    mounted () {
      this.pageNum = 1;
      this.viewAll(this.pageNum, this.pageSize);
      this.$route.params.orderId = this.$route.params.orderId || sessionStorage.orderId;
      console.log(this.$route.params.orderId);
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.params.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.serviceForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      prodScheFun (type) {
        if (type === 'orderDetails') {
          this.$router.push({path: '/orderQuery/orderDetails', name: "订单详情", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderDet') {
          this.$router.push({path: '/orderQuery/orderDet', name: "订单明细", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderPayCharge') {
          this.$router.push({path: '/orderQuery/orderPayCharge', name: "订单收付费情况", params: {orderId: this.$route.params.orderId}});
        } else {
          this.$router.push({path: '/orderQuery/otherInfo', name: "其他信息", params: {orderId: this.$route.params.orderId}});
        }
      },
      viewAll (pageNum, pageSize) {
        this.$route.params.orderId = this.$route.params.orderId || sessionStorage.orderId;
        let _data = {
          data: {
            orderId: this.$route.params.orderId
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.autoService, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.orderServerData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(() => {
          console.log('失败!');
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      backFun () {
        this.$router.push({path: '/orderQuery'});
      }
    }
  };
</script>
