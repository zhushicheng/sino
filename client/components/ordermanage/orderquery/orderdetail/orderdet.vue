<template>
  <!--订单明细-->
  <div class="usermanage order-det">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('orderPayCharge')"  v-if="false">订单收付费情况</div>
          <div class="sino-tabs-item" @click="prodScheFun('orderDetails')">订单详情</div>
          <div class="sino-tabs-item is-active">订单明细</div>
          <div class="sino-tabs-item" @click="prodScheFun('serverProce')">服务手续</div>
          <div class="sino-tabs-item" @click="prodScheFun('otherInfo')" v-if="false">其他信息</div>

        </div>
      </div>
    </div>
    <div class="local-info single-empass single-empass-width marbom">
      <sino-form :model="orderDetForm" ref="orderDetForm" class="serch-form order-details">
        <ul class="local-info-ul">
          <li>
            <sino-form-item prop="empName" label="雇员姓名：">
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.empName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="certNo" label="证件号码：">
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.certNo"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <!--<li>
            <sino-form-item prop="custName" label="客户名称：">
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.custName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="costCentName" label="成本中心名称：">
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.costCentName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="prodServeTempName" label="产品服务模板名称：">
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.prodServeTempName"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="uniqNo" label="雇员唯一号：">
              <sino-input class="fl" type="text"
                          v-model="orderDetForm.uniqNo"
                          :disabled="true"></sino-input>
            </sino-form-item>
          </li>
          -->
          <li>
            <sino-form-item label="服务内容：" prop="prodTypeName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :disabled="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="prodUrl"
                           :data="prodData"
                           :chooseName.sync="orderDetForm.prodTypeName"
                           :chooseId.sync="orderDetForm.prodType"
                           @contentChange="contentChange"
                           @clearChange="clearChange"
                           :clear="true"
              ></sino-select>
            </sino-form-item>
          </li>
          <!--<li>
            <sino-form-item label="订单明细类别：" prop="orderDetCateName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :disabled="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'ORDER_DET_CATE'}"
                           :chooseName.sync="orderDetForm.orderDetCateName"
                           :chooseId.sync="orderDetForm.orderDetCate"
                           @contentChange="orderDetCateChange"
                           @clearChange="orderDetCateClear"
                           :clear="true"
              ></sino-select>
            </sino-form-item>
          </li>-->
        </ul>
      </sino-form>
    </div>
    <div class="sino-queryList clear">
      <div class="sino-table-total single-empass-width1">
        <sino-title type="levelTwo" title="服务费"></sino-title>
        <sino-auto-table :data="orderServerData" :row-style="showTr" max-height="235" stripe v-on:viewAll="viewAll" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center" fixed="left"></sino-table-column>
          <sino-table-column v-for="(column, index) in columns" :key="column.dataIndex" :label="column.text" min-width="180" fixed="left">
            <template scope="scope">
              <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="index"></span>
              <span class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                <i v-if="!scope.row._expanded" class="iconfont sino-wenjianjia1" aria-hidden="true"></i>
                <i v-if="scope.row._expanded" class="iconfont sino-wenjianjia" aria-hidden="true"></i>
              </span>
              {{scope.row[column.dataIndex]}}
            </template>
          </sino-table-column>
          <sino-table-column prop="orderDetCateName" label="订单明细类别" min-width="105"></sino-table-column>
          <sino-table-column prop="orderDetStateName" label="订单明细流转状态" min-width="140"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="140"></sino-table-column>
          <sino-table-column prop="publishBegDate" label="签约方起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="publishEndDate" label="签约方止做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="chargeBegYm" label="收费账单年月" min-width="120"></sino-table-column>
          <sino-table-column prop="chargeAmo" label="收费金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="payBegYm" label="付费账单年月" min-width="120"></sino-table-column>
          <sino-table-column prop="payAmo" label="付费金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="publishRepName" label="发布人" min-width="100"></sino-table-column>
          <sino-table-column prop="publishTime" label="签约方发布时间" min-width="160"></sino-table-column>
          <sino-table-column prop="publishDesc" label="签约方说明" min-width="120"></sino-table-column>
          <sino-table-column prop="suppConfirmBegDate" label="受托方起做日期" min-width="150"></sino-table-column>
          <sino-table-column prop="suppConfirmEndDate" label="受托方止做日期" min-width="150"></sino-table-column>
          <sino-table-column prop="suppConfirmPerName" label="受托方确认人" min-width="120"></sino-table-column>
          <sino-table-column prop="suppConfirmTime" label="受托方确认时间" min-width="160"></sino-table-column>
          <sino-table-column prop="suppUpdateDesc" label="受托方修改说明" min-width="120"></sino-table-column>
          <!--<sino-table-column prop="suppUpdateAddiDesc" label="供应商修改补充说明" min-width="160"></sino-table-column>-->
          <sino-table-column prop="receSuppName" label="受托供应商" min-width="120"></sino-table-column>
          <sino-table-column prop="signConfirmPerName" label="签约方确认人" min-width="120"></sino-table-column>
          <sino-table-column prop="signConfirmTime" label="签约方确认时间" min-width="160"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
        <sino-title type="levelTwo" title="社保公积金"></sino-title>
        <sino-auto-table :data="propayData" max-height="235" stripe v-on:viewAll="viewAll1" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center" fixed="left"></sino-table-column>
          <sino-table-column prop="proPayName" label="服务内容" min-width="180" fixed="left"></sino-table-column>
          <sino-table-column prop="orderDetCateName" label="订单明细类别" min-width="105"></sino-table-column>
          <sino-table-column prop="orderDetStateName" label="订单明细流转状态" min-width="140"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区" min-width="180"></sino-table-column>
          <sino-table-column prop="publishBegDate" label="签约方起做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="publishEndDate" label="签约方止做日期" min-width="120"></sino-table-column>
          <sino-table-column prop="chargeBegYm" label="收费账单年月" min-width="120"></sino-table-column>
          <sino-table-column prop="chargeAmo" label="收费金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="payBegYm" label="付费账单年月" min-width="120"></sino-table-column>
          <sino-table-column prop="payAmo" label="付费金额" width="150" type="money" align="center"></sino-table-column>
          <sino-table-column prop="declWage" label="申报基数"></sino-table-column>
          <sino-table-column prop="publishPerRadix" label="签约方个人基数" min-width="120"></sino-table-column>
          <sino-table-column prop="publishCorpRadix" label="签约方企业基数" min-width="120"></sino-table-column>
          <sino-table-column prop="publishPerPayMoney" label="签约方个人缴纳" type="money" width="120" align="center"></sino-table-column>
          <sino-table-column prop="publishEntPayMoney" label="签约方企业缴纳" type="money" width="120" align="center"></sino-table-column>
          <sino-table-column prop="perPayProp" label="个人比例（%）" min-width="120"></sino-table-column>
          <sino-table-column prop="entPayProp" label="企业比例（%）" min-width="120"></sino-table-column>
          <sino-table-column prop="perAddiMoney" label="个人附加"></sino-table-column>
          <sino-table-column prop="entAddiMoney" label="企业附加"></sino-table-column>
          <sino-table-column prop="publishRepName" label="发布人"></sino-table-column>
          <sino-table-column prop="publishTime" label="签约方发布时间" min-width="160"></sino-table-column>
          <sino-table-column prop="publishDesc" label="签约方说明" min-width="120"></sino-table-column>
          <sino-table-column prop="suppConfirmPerRadix" label="受托方个人基数" min-width="120"></sino-table-column>
          <sino-table-column prop="suppConfirmEntRadix" label="受托方企业基数" min-width="120"></sino-table-column>
          <sino-table-column prop="suppPerPayMoney" label="受托方个人缴纳额" min-width="140"></sino-table-column>
          <sino-table-column prop="suppEntPayMoney" label="受托方企业缴纳额" min-width="140"></sino-table-column>
          <sino-table-column prop="suppUpdateAddiDesc" label="受托方变更说明" min-width="140"></sino-table-column>
          <sino-table-column prop="suppConfirmPerName" label="受托方确认人" min-width="140"></sino-table-column>
          <sino-table-column prop="suppConfirmTime" label="受托方确认时间" min-width="140"></sino-table-column>
          <sino-table-column prop="payFeeWayName" label="缴费方式"></sino-table-column>
          <sino-table-column prop="payWayName" label="支付方式"></sino-table-column>
          <sino-table-column prop="receSuppName" label="受托供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="acctName" label="缴费账户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="signConfirmPerName" label="签约方确认人" min-width="120"></sino-table-column>
          <sino-table-column prop="signConfirmTime" label="签约方确认时间" min-width="160"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="propay.pageNum"
                   v-bind:page-size="propay.pageSize"
                   v-on:pagehandler="pageHandler1"
                   :pageArray="propay.pageArray"
                   v-on:choosePageFun="choooseNum1"
                   v-bind:object="object"
                   :total="propay.total"></sino-page>
        <sino-title type="levelTwo" title="工资" class="seeorderhis"></sino-title>
        <sino-auto-table :data="wageTableData" max-height="235" stripe v-on:viewAll="viewAll2" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center" ></sino-table-column>
          <sino-table-column prop="proPayItemName" label="工资项目" ></sino-table-column>
          <sino-table-column prop="itemTypeName" label="工资项目类型" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="wageAmo" label="工资项金额" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="wageYm" label="工资年月" ></sino-table-column>
          <sino-table-column prop="custWageDay" label="工资日" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="orderDetCateName" label="工资明细类别" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="orderDetStateName" label="工资明细流转状态" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="wageExecuAreaName" label="工资执行地区" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="wageExecuSuppName" label="工资受托供应商" min-width="180" align="center"></sino-table-column>
          <sino-table-column prop="taxExecuAreaName" label="报税执行地区" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="taxExecuSuppName" label="报税受托供应商" min-width="150" align="center"></sino-table-column>
          <sino-table-column prop="chaBeginYm" label="收费账单年月" min-width="120"></sino-table-column>
          <sino-table-column prop="payBegYm" label="付费账单年月" min-width="120"></sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="wage.pageNum"
                   v-bind:page-size="wage.pageSize"
                   v-on:pagehandler="pageHandler2"
                   :pageArray="wage.pageArray"
                   v-on:choosePageFun="choooseNum2"
                   v-bind:object="object"
                   :total="wage.total"></sino-page>
        <div class="conf-btn">
          <sino-button type="primary" @click="backFun">返 回</sino-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Utils from '../../../development/component/sinoEdittable/utils/index.js';
  import api from '../../../../api/index';
  export default {
    components: {
    },
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        prodUrl: this.apiPath.hrsc.prodNameDrop,
        prodData: {
          orderId: this.$route.params.orderId
        },
        orderDetForm: {
          custName: '',
          costCentName: '',
          prodServeTempName: '',
          uniqNo: '',
          empName: '',
          certNo: '',
          prodType: '',
          prodTypeName: '',
          orderDetCate: '',
          orderDetCateName: ''
        },
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
        },
        treeStructure: true,
        defaultExpandAll: false,
        columns: [ // 分组
          {
            text: '服务内容',
            dataIndex: 'prodName'
          }
        ]
      };
    },
    mounted () {
      let sessionStorage = window.sessionStorage;
      this.$route.params.orderId = this.$route.params.orderId || sessionStorage.orderId;
      api.postsign(this.apiPath.hrsc.orderDetail, this.$route.params.orderId).then(res => {
        if (res.code === 'CPYY-00001') {
          this.orderDetForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
      this.pageNum = 1;
      this.viewAll(this.pageNum, this.pageSize, '', '');
      this.propay.pageNum = 1;
      this.viewAll1(this.propay.pageNum, this.propay.pageSize, '', '');
      this.wage.pageNum = 1;
      this.viewAll2(this.wage.pageNum, this.wage.pageSize, '', '');
    },
    methods: {
      clearChange () {
        let _this = this;
        _this.propay.pageNum = 1;
        _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
        _this.pageNum = 1;
        _this.viewAll(_this.pageNum, _this.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
        _this.wage.pageNum = 1;
        _this.viewAll2(_this.wage.pageNum, _this.wage.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
      },
      contentChange (item) {
        this.flag = item.flag;
        let _this = this;
        if (_this.flag === 3) {
          _this.wage.pageNum = 1;
          _this.viewAll2(_this.wage.pageNum, _this.wage.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
          _this.pageNum = 1;
          _this.viewAll(_this.pageNum, _this.pageSize, '', _this.orderDetForm.orderDetCate);
          _this.propay.pageNum = 1;
          _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, '', _this.orderDetForm.orderDetCate);
        } else if (_this.flag === 4) {
          _this.pageNum = 1;
          _this.viewAll(_this.pageNum, _this.pageSize, this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
          _this.wage.pageNum = 1;
          _this.viewAll2(_this.wage.pageNum, _this.wage.pageSize, '', _this.orderDetForm.orderDetCate);
          _this.propay.pageNum = 1;
          _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, '', _this.orderDetForm.orderDetCate);
        } else {
          _this.propay.pageNum = 1;
          _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
          _this.pageNum = 1;
          _this.viewAll(_this.pageNum, _this.pageSize, '', _this.orderDetForm.orderDetCate);
          _this.wage.pageNum = 1;
          _this.viewAll2(_this.wage.pageNum, _this.wage.pageSize, '', _this.orderDetForm.orderDetCate);
        }
      },
      // 订单明细修改查询
      orderDetCateChange () {
        let _this = this;
        _this.propay.pageNum = 1;
        _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
        _this.pageNum = 1;
        _this.viewAll(_this.pageNum, _this.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
        _this.wage.pageNum = 1;
        _this.viewAll2(_this.wage.pageNum, _this.wage.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
      },
      orderDetCateClear () {
        let _this = this;
        _this.propay.pageNum = 1;
        _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
        _this.pageNum = 1;
        _this.viewAll(_this.pageNum, _this.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
        _this.wage.pageNum = 1;
        _this.viewAll2(_this.wage.pageNum, _this.wage.pageSize, _this.orderDetForm.prodType, _this.orderDetForm.orderDetCate);
      },
      // Tab选项卡切换
      prodScheFun (type) {
        if (type === 'orderDetails') {
          this.$router.push({path: '/orderQuery/orderDetails', name: "订单详情", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'serverProce') {
          this.$router.push({path: '/orderQuery/serverProce', name: "服务手续", params: {orderId: this.$route.params.orderId}});
        } else if (type === 'orderPayCharge') {
          this.$router.push({path: '/orderQuery/orderPayCharge', name: "订单收付费情况", params: {orderId: this.$route.params.orderId}});
        } else {
          this.$router.push({path: '/orderQuery/otherInfo', name: "其他信息", params: {orderId: this.$route.params.orderId}});
        }
      },
      // 服务费
      viewAll (pageNum, pageSize, id, orderDet) {
        let _data = {
          data: {
            orderId: this.$route.params.orderId,
            prodId: id,
            orderDetCate: orderDet
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.entrustedpage, _data).then(res => {
          this.orderServerData = res.data.list;
          this.total = res.data.total;
          let me = this;
          if (me.treeStructure) {
            let _oldData = Utils.MSDataTransfer.treeToArray(JSON.parse(JSON.stringify(res.data.list)), null, null, me.defaultExpandAll);
//            me.dataOrg = _oldData;
            me.orderServerData = Utils.MSDataTransfer.treeToArray(res.data.list, null, null, me.defaultExpandAll);
          };
        }).catch(() => {
          console.log('失败!');
        });
      },
      /* 社保公积金 */
      viewAll1 (pageNum, pageSize, id, orderDet) {
        let _data = {
          data: {
            orderId: this.$route.params.orderId,
            prodId: id,
            orderDetCate: orderDet
          },
          pageNum: pageNum || this.propay.pageNum,
          pageSize: pageSize || this.propay.pageSize
        };
        api.post(this.apiPath.hrsc.proPayPage, _data).then(res => {
          this.propayData = res.data.list;
          this.propay.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      /* 工资 */
      viewAll2 (pageNum, pageSize, id, orderDet) {
        let _data = {
          data: {
            orderId: this.$route.params.orderId,
            prodId: id,
            orderDetCate: orderDet
          },
          pageNum: pageNum || this.propay.pageNum,
          pageSize: pageSize || this.propay.pageSize
        };
        api.post(this.apiPath.hrsc.wagePage, _data).then(res => {
          this.wageTableData = res.data.list;
          this.wage.total = res.data.total;
          res.data.list.forEach(function (item) {
            if (item.custWageDay === 0) {
              item.custWageDay = '实际到款日';
            }
          });
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 服务费分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize, this.orderDetForm.prodType, this.orderDetForm.orderDetCate);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize, this.orderDetForm.prodType, this.orderDetForm.orderDetCate);
      },
      // 分页
      pageHandler1: function (pageNum) {
        this.propay.pageNum = pageNum;
        this.viewAll1(pageNum, this.propay.pageSize, this.orderDetForm.prodType, this.orderDetForm.orderDetCate);
      },
      choooseNum1: function (pageSize) {
        this.propay.pageSize = pageSize;
        this.propay.pageNum = 1;
        this.viewAll1(this.propay.pageNum, pageSize, this.orderDetForm.prodType, this.orderDetForm.orderDetCate);
      },
      pageHandler2: function (pageNum) {
        this.wage.pageNum = pageNum;
        this.viewAll2(pageNum, this.wage.pageSize, this.orderDetForm.prodType, this.orderDetForm.orderDetCate);
      },
      choooseNum2: function (pageSize) {
        this.wage.pageSize = pageSize;
        this.wage.pageNum = 1;
        this.viewAll2(this.wage.pageNum, pageSize, this.orderDetForm.prodType, this.orderDetForm.orderDetCate);
      },
      backFun () {
        this.$router.push({path: '/orderQuery'});
      },
      // 显示行
      showTr: function (row, index) {
        let show = (row.row._parent ? row.row._parent._expanded : true);
        row._show = show;
        return show ? '' : 'display:none';
      },
      // 展开下级
      toggle: function (trIndex) {
        let me = this;
        let record = me.orderServerData[trIndex];
        record._expanded = !record._expanded;
      },
      // 显示层级关系的空格和图标
      spaceIconShow (index) {
        let me = this;
        if (me.treeStructure && index === 0) {
          return true;
        }
        return false;
      },
      // 点击展开和关闭的时候， 图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>
