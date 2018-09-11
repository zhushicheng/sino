<template>
  <!--其他信息-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('orderPayCharge')">订单收付费情况</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDetails')">订单详情</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDet')">订单明细</div>
          <div class="sino-tabs-item" @click="prodScheFun('serverProce')">服务手续</div>
          <div class="sino-tabs-item is-active">其他信息</div>
        </div>
      </div>
    </div>
    <div class="local-info single-empass single-empass-width marbom">
      <sino-form :model="otherForm" ref="otherForm" class="serch-form order-details">
        <ul class="local-info-ul">
          <!--<li>
            <sino-form-item prop="custName" label="客户名称：">
              <sino-input class="fl" type="text"
                          v-model="otherForm.custName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="costCentName" label="成本中心名称：">
              <sino-input class="fl" type="text"
                          v-model="otherForm.costCentName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="prodServeTempName" label="产品服务模板名称：">
              <sino-input class="fl" type="text"
                          v-model="otherForm.prodServeTempName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="uniqNo" label="雇员唯一号：">
              <sino-input class="fl" type="text"
                          v-model="otherForm.uniqNo"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>-->
          <li>
            <sino-form-item prop="empName" label="雇员姓名：">
              <sino-input class="fl" type="text"
                          v-model="otherForm.empName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="certNo" label="证件号码：">
              <sino-input class="fl" type="text"
                          v-model="otherForm.certNo"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
        </ul>
      </sino-form>
    </div>
    <div class="sino-queryList clear">
      <div class="sino-table-total single-empass-width1">
        <sino-table :data="orderServerData" max-height="416" stripe v-on:viewAll="viewAll" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="handleRemark" label="办理项目" min-width="95"></sino-table-column>
          <sino-table-column prop="formalStateName" label="办理进度"></sino-table-column>
          <!--<sino-table-column prop="handleResultName" label="当前步骤"></sino-table-column>-->
          <sino-table-column prop="handleDate" label="申请时间" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="80">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">详情</span>
              </template>
            </template>
          </sino-table-column>
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
  export default {
    data () {
      return {
        otherForm: {
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
      let sessionStorage = window.sessionStorage;
      this.$route.params.orderId = this.$route.params.orderId || sessionStorage.orderId;
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.params.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.otherForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
      this.pageNum = 1;
      this.viewAll(this.pageNum, this.pageSize);
    },
    methods: {
      prodScheFun (type) {
        if (type === 'orderDetails') {
          this.$router.push({path: '/autoOrderSearch/orderDetails', name: "订单详情", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderDet') {
          this.$router.push({path: '/autoOrderSearch/orderDet', name: "订单明细", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderPayCharge') {
          this.$router.push({path: '/autoOrderSearch/orderPayCharge', name: "订单收付费情况", params: {orderId: this.$route.params.orderId}});
        } else {
          this.$router.push({path: '/autoOrderSearch/serverProce', name: "服务手续", params: {orderId: this.$route.params.orderId}});
        }
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          data: {
            orderId: this.$route.params.orderId
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
      seeFun (data) {},
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
        this.$router.push({path: '/autoOrderSearch'});
      }
    }
  };
</script>
