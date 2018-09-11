<template>
  <!--服务手续-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('orderPayCharge')">订单收付费情况</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDetails')">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item is-active">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')">其他信息</div>
        </div>
      </div>
    </div>
    <sino-con class="single-empass fl">
      <sino-title type="levelTwo" title="手续办理详情"></sino-title>
      <sino-table :data="orderServerData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="handleRemark" label="办理描述" min-width="95"></sino-table-column>
        <sino-table-column prop="formalStateName" label="办理状态" min-width="80"></sino-table-column>
        <sino-table-column prop="handleResultName" label="办理结果" min-width="80"></sino-table-column>
        <sino-table-column prop="handleDate" label="办理日期" min-width="120"></sino-table-column>
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
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    data () {
      return {
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
    },
    methods: {
      prodScheFun (type) {
        if (type === 'orderDetails') {
          this.$router.push({path: '/entOrderSearch/orderDetails', query: {orderId: this.$route.query.orderId}});
        } else if (type === 'orderDet') {
          this.$router.push({path: '/entOrderSearch/orderDet', query: {orderId: this.$route.query.orderId}});
        } else if (type === 'orderPayCharge') {
          this.$router.push({path: '/entOrderSearch/orderPayCharge', query: {orderId: this.$route.query.orderId}});
        } else {
          this.$router.push({path: '/entOrderSearch/otherInfo', query: {orderId: this.$route.query.orderId}});
        }
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          data: {
            orderId: this.$route.query.orderId
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findHandleByOrderId, _data).then(res => {
          this.orderServerData = res.data.list;
          this.total = res.data.total;
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
        this.$router.push({path: '/entOrderSearch'});
      }
    }
  };
</script>
