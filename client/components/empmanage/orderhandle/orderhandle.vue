<template>
  <!--手续办理-->
  <div>
    <div v-if="!routerView" class="usermanage">
      <sino-con>
        <sino-title type="levelOne" title="手续办理查询"></sino-title>
        <sino-form :model="orderSearchForm" ref="orderSearchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="签约供应商名称：" class="search-inner-item" prop="signSuppName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="suppUrl"
                               :data="{}"
                               :token="token"
                               :chooseName.sync="orderSearchForm.signSuppName"
                               :chooseId.sync="orderSearchForm.signSuppId"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :data="{}"
                                 :token="token"
                                 :chooseName.sync="orderSearchForm.custName"
                                 :chooseId.sync="orderSearchForm.custId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <!--<li>-->
                <!--<sino-form-item label="雇员唯一号：" class="search-inner-item" prop="uniqNo">-->
                  <!--<sino-input class="fl" type="text"-->
                              <!--v-model="orderSearchForm.uniqNo"-->
                              <!--:disabled="false"></sino-input>-->
                <!--</sino-form-item>-->
              <!--</li>-->
              <li>
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="orderSearchForm.empName"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <!--<li>-->
                <!--<sino-form-item label="证件类型：" class="search-inner-item" prop="certTypeName">-->
                  <!--<sino-select :filterable="false"-->
                               <!--:multiselect="false"-->
                               <!--:isshowTotol="false"-->
                               <!--:disabled="false"-->
                               <!--:totalNum="false"-->
                               <!--:isPage="false"-->
                               <!--:isGroup="false"-->
                               <!--:url="dictSelUrl"-->
                               <!--:data="{code:'CERT_TYPE'}"-->
                               <!--:chooseName.sync="orderSearchForm.certTypeName"-->
                               <!--:chooseId.sync="orderSearchForm.certType"-->
                               <!--:clear="true"></sino-select>-->
                <!--</sino-form-item>-->
              <!--</li>-->
              <li>
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input type="text" v-model="orderSearchForm.certNo"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="手续状态：" class="search-inner-item" prop="formalStateName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code:'FORMAL_STATE'}"
                               :chooseName.sync="orderSearchForm.formalStateName"
                               :chooseId.sync="orderSearchForm.formalState"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('orderSearchForm')">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <!-- <div class="sino-table-icon">
             <div class="sino-table-icon-left">
               <sino-button type="icon-text" @click="exportFun"><i class="iconfont sino-export"></i>导出手续办理情况</sino-button>
             </div>
           </div>-->
          <sino-table :data="orderData" max-height="416" stripe v-on:viewAll="viewAll" border style="margin-top: 10px;"><!--v-on:select="selectCallBack"-->
            <!--<sino-table-column type="selection"></sino-table-column>-->
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="uniqNo" label="雇员唯一号" min-width="105"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="135"></sino-table-column>
            <sino-table-column prop="certTypeName" label="证件类型" min-width="80"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="phone" label="联系电话" min-width="120"></sino-table-column>
            <sino-table-column prop="formalStateName" label="办理状态" min-width="95"></sino-table-column>
            <sino-table-column prop="handleResultName" label="办理结果" min-width="95"></sino-table-column>
            <sino-table-column prop="handleRemark" label="办理描述" min-width="95"></sino-table-column>
            <sino-table-column prop="handleDate" label="办理日期" min-width="195"></sino-table-column>
            <sino-table-column prop="signSuppName" label="签约供应商简称" min-width="130"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="orderStateName" label="订单操作状态" min-width="120"></sino-table-column>
            <sino-table-column label="操作" align="center" width="210" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="formalFun(scope.row)">手续办理</span><i class="table-i">|</i>
                  <span class="table-span" @click="seeFun(scope.row)">查看历史</span>
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
        </div>
      </div>
      <!--手续办理-->
      <sino-dialog :visible.sync="orderAddFlag" :top="'5%'" class="order-dialog" v-on:close="closeDialog()">
        <sino-title slot="title" type="levelOne" title="手续办理" class="sino-dialog-title"></sino-title>
        <sino-form :model="orderAddForm" ref="orderAddForm" class="demo-sendAddrAddForm">
          <sino-title class="fl" type="levelTwo" title="雇员信息"></sino-title>
          <sino-form-item label="客户名称：" prop="custName">
            <sino-input v-model="orderAddForm.custName" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="签约供应商名称：" prop="signSuppName">
            <sino-input v-model="orderAddForm.signSuppName" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="雇员姓名：" prop="empName">
            <sino-input v-model="orderAddForm.empName" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="雇员唯一号：" prop="uniqNo">
            <sino-input v-model="orderAddForm.uniqNo" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="联系电话：" prop="phone">
            <sino-input v-model="orderAddForm.phone" disabled></sino-input>
          </sino-form-item>
        </sino-form>
        <sino-form :model="orderResultForm" :rules="orderResultRules" ref="orderResultForm" class="demo-sendAddrAddForm">
          <sino-title class="fl" type="levelTwo" title="办理情况"></sino-title>
          <sino-form-item label="办理结果：" prop="handleResultName">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :url="dictSelUrl"
                         :data="{code: 'HANDLE_RESULT'}"
                         :chooseName.sync="orderResultForm.handleResultName"
                         :chooseId.sync="orderResultForm.handleResult"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="操作日期：" prop="handleDate">
            <sino-date-picker
              v-model="orderResultForm.handleDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item v-if="orderResultForm.handleResult !== 1" class="sino-form-item-width" prop="handleRemark" label="办理描述：">
            <sino-input type="textarea" v-model="orderResultForm.handleRemark" :disabled="false" ></sino-input>
          </sino-form-item>
          <sino-form-item v-if="orderResultForm.handleResult === 1" class="sino-form-item-width" prop="handleRemark1" label="办理描述：">
            <sino-input type="textarea" v-model="orderResultForm.handleRemark1" :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span>共 <em>{{orderResultForm.noHandleOrder}}</em> 条待处理雇员信息，未处理 <em>{{orderResultForm.noHandleEmp}}</em> 条</span>
        </div>
        <sino-button type="primary" @click="submitForm">确 定</sino-button>
        <sino-button class="order-nextbtn" :disabled="orderResultForm.noHandleEmp === 0 ? true : false" @click="nextFun" v-if="false">下一步</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  let _remark;
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        suppUrl: this.apiPath.hrsc.selectBox, // g
        custUrl: this.apiPath.hrsc.findCustSelectInfo,
        token: Cookie.get('Token'),
        routerView: false,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        orderData: null,
        orderSearchForm: {
          signSuppId: '',
          signSuppName: '',
          custId: '',
          custName: '',
          empName: '',
          certNo: '',
          formalState: '',
          formalStateName: ''
        },
        orderAddFlag: false,
        orderAddForm: {
          custName: '',
          signSuppName: '',
          empName: '',
          uniqNo: '',
          phone: ''
        },
        orderResultForm: {
          handleDate: new Date(),
          handleRemark: '',
          handleResult: '',
          handleResultName: '',
          noHandleOrder: '',
          noHandleEmp: ''
        },
        orderResultRules: {
          handleResultName: [
            {required: true, message: '请选择办理结果', trigger: 'change'}
          ],
          handleRemark1: [
            {required: true, message: '请输入办理描述', trigger: 'change'}
          ]
        }
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/orderhandle") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
      this.searchFun();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
      // this.orderSearchForm.certType = 1;
      // this.orderSearchForm.certTypeName = '身份证';
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      ruoteJudge () {
        if (this.$route.path !== "/orderhandle") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.orderSearchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllOrderHandle, _data).then(res => {
          this.orderData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 导出
      exportFun () {},
      // 手续办理
      formalFun (_data) {
        this.orderAddFlag = true;
        api.post(this.apiPath.hrsc.findOrderById, {orderId: _data.orderId}).then(res => {
          this.orderAddForm = res.data;
        }).catch(err => {
          console.log(err);
        });
        api.post(this.apiPath.hrsc.findNoHandleCount, {}).then(res => {
          this.orderResultForm.noHandleOrder = res.data.noHandleOrder;
          this.orderResultForm.noHandleEmp = res.data.noHandleEmp;
        }).catch(err => {
          console.log(err);
        });
        this.orderAddForm.operTime = new Date();
      },
      seeFun (_data) {
        this.routerView = true;
        this.$router.push({path: '/orderhandle/seeOrderHis', name: "手续办理历史", params: {orderId: _data.orderId}});
      },
      submitForm () {
        if (this.orderResultForm.handleRemark1) {
          _remark = this.orderResultForm.handleRemark1;
        }
        let _data = {
          orderId: this.orderAddForm.orderId,
          uniqNo: this.orderAddForm.uniqNo,
          handleResult: this.orderResultForm.handleResult,
          handleResultName: this.orderResultForm.handleResultName,
          handleRemark: _remark || this.orderResultForm.handleRemark,
          handleDate: Vue.filter('date')(this.orderResultForm.handleDate, 'yyyy-MM-dd')
        };
        const _this = this;
        _this.$refs.orderResultForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.saveEmpHandle, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.orderAddFlag = false;
                this.searchFun();
                this.$message({message: '办理成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      nextFun () {
//        this.submitForm();
//        this.formalFun();
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      closeDialog () {
        this.$refs.orderResultForm.resetFields();
        this.$refs.orderAddForm.resetFields();
      }
    }
  };
</script>
