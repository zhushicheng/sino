<template>
  <!--雇员单个派出-->
  <div>
    <div class="usermanage send-min-width" v-if="!routerView">
      <div class="prod-tab sino-tabs sino-tabs-card tab-group">
        <div class="sino-tabs-header">
          <div class="sino-tabs-nav">
            <div class="sino-tabs-item" @click="prodScheFun">批量派出</div>
            <div class="sino-tabs-item is-active">单个派出</div>
          </div>
        </div>
      </div>
      <sino-con class="single-empass">
        <div class="clear"></div>
        <sino-title type="levelTwo" title="雇员基本信息"></sino-title>
        <div class="local-info">
          <sino-form :model="epmBasicForm" ref="epmBasicForm" :rules="epmBasicRules" class="serch-form">
            <ul class="local-info-ul">
              <li>
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text"
                              v-model="epmBasicForm.empName"
                              :disabled="false" v-on:blur="watchFun"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="国籍：" class="search-inner-item" prop="nationalityName">
                  <sino-select :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'GM_COUNTRY'}"
                               :chooseName.sync="epmBasicForm.nationalityName"
                               :chooseId.sync="epmBasicForm.nationality"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="性别：" class="search-inner-item" prop="sex">
                  <sino-radio v-for="(item, index) in sexList" :key="index"
                              v-model.number="epmBasicForm.sex"
                              :label="item.id">{{item.title}}</sino-radio>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="手机号码：" class="search-inner-item" prop="tel">
                  <sino-input class="fl" type="text"
                              v-model="epmBasicForm.tel"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="证件类型：" class="search-inner-item" prop="certTypeName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="dictSelUrl"
                               :data="{code: 'CERT_TYPE'}"
                               :autoChoose="true"
                               v-on:change="watchFun"
                               :chooseName.sync="epmBasicForm.certTypeName"
                               :chooseId.sync="epmBasicForm.certType" :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text"
                              v-model="epmBasicForm.certNo"
                              :disabled="false"  v-on:blur="watchFun"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="邮箱地址：" class="search-inner-item" prop="email">
                  <sino-input class="fl" type="text"
                              v-model="epmBasicForm.email"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
            </ul>
            <sino-title type="levelTwo" title="订单详情"></sino-title>
            <div class="local-info">
              <ul class="local-info-ul">
                <li class="remak">
                  <sino-form-item class="sino-form-item-width" prop="custName" label="客户名称：">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :token="token"
                                 @change="custChange"
                                 :chooseName.sync="epmBasicForm.custName"
                                 :chooseId.sync="epmBasicForm.custId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="remak">
                  <sino-form-item class="sino-form-item-width" prop="conName" label="商务合同名称：">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="coninfoSelectBox"
                                 :data="conData"
                                 :autoChoose="true"
                                 :linkage="true"
                                 :token="token"
                                 :chooseName.sync="epmBasicForm.conName"
                                 :chooseId.sync="epmBasicForm.conId" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="remak single-position">
                  <sino-form-item class="sino-form-item-width" prop="prodServTempName" label="产品服务模板：">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="tempUrl"
                                 :linkage="true"
                                 :data="serveTempData"
                                 :token="token"
                                 :autoChoose="true"
                                 :chooseName.sync="epmBasicForm.prodServTempName"
                                 :chooseId.sync="epmBasicForm.prodServTempId"
                                 :clear="true"
                                 @contentChange="templateFun"
                    ></sino-select>
                  </sino-form-item>
                  <sino-button type="text" class="single-position-button" @click="serviceAgreeAdd"><i class="iconfont sino-add"></i>新增</sino-button>
                </li>
                <li>
                  <sino-form-item label="订单开始日期：" class="search-inner-item" prop="orderBegDate">
                    <sino-date-picker
                      v-model="epmBasicForm.orderBegDate"
                      type="date"
                      :editable="false"
                      :readonly="false" v-on:blur="watchFun"
                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="派出地区：" class="search-inner-item" prop="accrAreaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="areaUrl"
                                 :linkage="true"
                                 :data="areaData" @change="watchFun"
                                 :autoChoose="false"
                                 :chooseName.sync="epmBasicForm.accrAreaName"
                                 :chooseId.sync="epmBasicForm.accrArea"
                                 :clear="true"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="户口性质：" class="search-inner-item" prop="householdType">
                    <sino-radio v-for="(item, index) in householdProyList" :key="index"
                                v-model="epmBasicForm.householdType" @click="watchFun"
                                :label="item.id">{{item.title}}</sino-radio>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="员工内部编号：" class="search-inner-item" prop="custEmpInnerNo">
                    <sino-input class="fl" type="text"
                                v-model="epmBasicForm.custEmpInnerNo"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="成本中心：" class="search-inner-item" prop="costCentName">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="costUrl"
                                 :linkage="true"
                                 :data="costData"
                                 :token="token"
                                 :chooseName.sync="epmBasicForm.costCentName"
                                 :chooseId.sync="epmBasicForm.costCentId" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li v-if="sinsDeclWageFlag">
                  <sino-form-item label="社保申报基数：" class="search-inner-item" prop="sinsDeclWage">
                    <sino-input class="fl" type="text"
                                v-model.number="epmBasicForm.sinsDeclWage" @blur="watchFun"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li v-if="accuDeclWageFlag">
                  <sino-form-item label="公积金申报基数：" class="search-inner-item" prop="accuDeclWage">
                    <sino-input class="fl" type="text"
                                v-model.number="epmBasicForm.accuDeclWage" @blur="watchFun"
                                :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li class="remak mb15">
                  <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
                    <sino-input type="textarea" v-model="epmBasicForm.remark" :disabled="false" ></sino-input>
                  </sino-form-item>
                </li>
              </ul>
            </div>
            <input type="hidden" v-model="epmBasicForm.orderId">
          </sino-form>
        </div>
        <!--<sino-button type="primary" @click="submitSearchFun">查 询</sino-button>-->
        <template v-if="serverShowFlag">
          <div class="sino-table-total single-form-box">
            <div class="sino-table-icon single-icon-nopadding">
              <div class="sino-table-icon-left">
                <sino-button type="icon-text" @click="modifyBillDay"><i class="iconfont sino-modify"></i>修改收费启动月</sino-button>
                <sino-button type="icon-text" @click="modifyStartDay"><i class="iconfont sino-modify"></i>修改起做日期</sino-button>
              </div>
            </div>
            <sino-title type="levelTwo" title="服务费明细" class="mt0"></sino-title>
            <div class="toll-bill-ul-box">
              <ul class="toll-bill-table-ul clearfix">
                <li>
                  <h6>总计 :</h6>
                  <span>{{total || 0}}</span>条
                </li>
                <li>
                  <h6>已选 :</h6>
                  <span>{{checkedArr.length}}</span>条
                </li>
              </ul>
            </div>
            <sino-auto-table :data="serverData" border max-height="416" stripe @selection-change="serverCallBack" v-on:viewAll="viewAll">
              <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="prodName" label="产品名称" min-width="180"></sino-table-column>
              <sino-table-column prop="execuAreaName" label="执行地区"></sino-table-column>
              <sino-table-column prop="publishBegDate" label="起做日期" min-width="100"></sino-table-column>
              <sino-table-column prop="chargeAmo" label="收费金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="chargeBegYm" label="收费启动月" min-width="100"></sino-table-column>
              <sino-table-column prop="payAmo" label="付费金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="payBegYm" label="受托供应商名称" min-width="180"></sino-table-column>
            </sino-auto-table>
            <sino-page v-bind:page="pageNum"
                       v-bind:page-size="pageSize"
                       v-on:pagehandler="pageHandler"
                       :pageArray="pageArray"
                       v-on:choosePageFun="choooseNum"
                       v-bind:object="object"
                       :total="total"></sino-page>
            <sino-title type="levelTwo" title="社保公积金明细"></sino-title>
            <div class="toll-bill-ul-box">
              <ul class="toll-bill-table-ul clearfix">
                <li>
                  <h6>总计 :</h6>
                  <span>{{propay.total || 0}}</span>条
                </li>
                <li>
                  <h6>已选 :</h6>
                  <span>{{accuCheckedArr.length}}</span>条
                </li>
              </ul>
            </div>
            <sino-auto-table :data="accuData" border max-height="416" stripe @selection-change="accuCallBack" v-on:viewAll="viewAll1">
              <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
              <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
              <sino-table-column prop="proPayName" label="产品名称" min-width="180"></sino-table-column>
              <sino-table-column prop="execuAreaName" label="执行地区"></sino-table-column>
              <sino-table-column prop="publishBegDate" label="起做日期" min-width="100"></sino-table-column>
              <sino-table-column prop="chargeBegYm" label="收费启动月" min-width="95"></sino-table-column>
              <sino-table-column prop="chargeAmo" label="收费金额" width="150" type="money" align="center"></sino-table-column>
              <sino-table-column prop="declWage" label="申报基数"></sino-table-column>
              <sino-table-column prop="publishPerRadix" label="签约方个人基数" min-width="130"></sino-table-column>
              <sino-table-column prop="publishCorpRadix" label="签约方企业基数" min-width="130"></sino-table-column>
              <sino-table-column prop="publishPerPayMoney" label="签约方个人缴纳" type="money" width="150"></sino-table-column>
              <sino-table-column prop="publishEntPayMoney" label="签约方企业缴纳" type="money" width="150"></sino-table-column>
              <sino-table-column prop="perPayProp" label="个人比例（%）" min-width="120"></sino-table-column>
              <sino-table-column prop="entPayProp" label="企业比例（%）" min-width="120"></sino-table-column>
              <sino-table-column prop="perAddiMoney" label="个人附加"></sino-table-column>
              <sino-table-column prop="entAddiMoney" label="企业附加"></sino-table-column>
              <sino-table-column prop="payFeeWayName" label="缴费方式"></sino-table-column>
              <sino-table-column prop="payWayName" label="支付方式"></sino-table-column>
              <sino-table-column prop="acctName" label="缴费账户名称" min-width="180"></sino-table-column>
              <sino-table-column prop="receSuppName" label="受托供应商名称" min-width="180"></sino-table-column>
              <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
              <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
            </sino-auto-table>
            <sino-page v-bind:page="propay.pageNum"
                       v-bind:page-size="propay.pageSize"
                       v-on:pagehandler="pageHandler1"
                       :pageArray="propay.pageArray"
                       v-on:choosePageFun="choooseNum1"
                       v-bind:object="object"
                       :total="propay.total"></sino-page>
          </div>
        </template>
        <div class="clear"></div>
        <div class="conf-btn" v-if="btnFlag">
          <sino-button type="primary" @click="singleSubmit">确 认</sino-button>
        </div>
      </sino-con>
    </div>
      <!--修改收费启动月弹层-->
    <sino-dialog :visible.sync="modifyBillDayAdd" size="small" class="batch-import" v-on:close="resetForm('modifyBillDayAddForm')">
      <sino-title slot="title" type="levelOne" title="修改收费启动月" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyBillDayAddForm" ref="modifyBillDayAddForm" class="modify-bill-day" :rules="modifyBillDayAddRules">
        <sino-form-item prop="chargeBegYmName" label="收费启动月：" class="search-inner-item">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :isPage="false"
                       :isGroup="false"
                       method='GET'
                       :url="localHref + '/mounth.json'"
                       :chooseName.sync="modifyBillDayAddForm.chargeBegYmName"
                       :chooseId.sync="modifyBillDayAddForm.chargeBegYm" :clear="true">
          </sino-select>
          <!--<sino-input type="text" v-model="modifyBillDayAddForm.chargeBegYm"></sino-input>-->
        </sino-form-item>
        <sino-button type="primary" @click="billDaySure">确 定</sino-button>
      </sino-form>
    </sino-dialog>
    <!--修改起做日期-->
    <sino-dialog :visible.sync="modifyStartDayAdd" size="small" class="batch-import" v-on:close="resetForm('modifyStartDayAddForm')">
      <sino-title slot="title" type="levelOne" title="修改起做日期" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyStartDayAddForm" ref="modifyStartDayAddForm" class="modify-bill-day" :rules="modifyStartDayAddRules">
        <sino-form-item prop="begDate" label="起做日期：" class="search-inner-item">
          <sino-date-picker
            v-model="modifyStartDayAddForm.begDate"
            type="date"
            :editable="false"
            :readonly="false"
            :clearable="true">
          </sino-date-picker>
        </sino-form-item>
        <sino-button type="primary" @click="startDaySure">确 定</sino-button>
      </sino-form>
    </sino-dialog>
    <!--允许双派-->
    <sino-dialog :visible.sync="allowOutFlag" size="small"  v-on:close="allowReset('allowOutForm')">
      <sino-title slot="title" type="levelOne" title="提示信息" class="sino-dialog-title"></sino-title>
      <h6 class="allow-out-h6" v-if="allowOutBtn">{{epmBasicForm.empName}}，已由“{{allowOutForm.custName}}”派出</h6>
      <h6 class="allow-out-h6" v-if="!allowOutBtn">{{epmBasicForm.empName}}，已经在“{{allowOutForm.custName}}”派出，请勿重复派出！</h6>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>客户名称</h6><input readonly v-model="allowOutForm.custName">
          </li>
          <li class="li-last">
            <h6>订单日期</h6><input readonly v-model="allowOutForm.orderDate">
          </li>
        </ul>
      </div>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li>
            <h6>社保日期</h6><input readonly v-model="allowOutForm.sinsDate">
          </li>
          <li>
            <h6>社保执行地</h6><input readonly v-model="allowOutForm.sinsAreaName">
          </li>
          <li>
            <h6>公积金日期</h6><input readonly v-model="allowOutForm.accuDate">
          </li>
          <li>
            <h6>公积金执行地</h6><input readonly v-model="allowOutForm.accuAreaName">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer" v-if="allowOutBtn">
          <sino-button @click="btnClick">暂不派出</sino-button>
          <sino-button type="primary" class="ml10" @click="continueFun">继续派出</sino-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="!allowOutBtn">
          <sino-button type="primary" @click="btnClick">确 定</sino-button>
      </span>
    </sino-dialog>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import Utils from '../../development/component/sinoEdittable/utils/index.js';
  import api from '../../../api/index';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  export default {
    components: {},
    data () {
      return {
        findCustSelectInfo: this.apiPath.hrsc.findCustSelectInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        custUrl: this.apiPath.hrsc.custInfoSelectBoxSource,
        tempUrl: this.apiPath.hrsc.findServeTempSelectBoxBy,
        areaUrl: this.apiPath.hrsc.addAreaDrop,
        costUrl: this.apiPath.hrsc.findCostCentSelectBoxBy,
        coninfoSelectBox: this.apiPath.hrsc.findByCustIdSelectBox,
        localHref: window.location.href.split('#')[0],
        token: Cookie.get('Token'),
        sexList: [],
        householdProyList: [],
        modifyBillDayAdd: false,
        modifyStartDayAdd: false,
        conData: {
          id: ''
        },
        serveTempData: {
          custId: ''
        },
        costData: {
          custId: ''
        },
        areaData: {
          prodServeTempId: ''
        },
        epmBasicForm: {
          orderId: '',
          empName: '',
          nationality: 1,
          nationalityName: '中国',
          sex: '',
          tel: '',
          certType: '',
          certTypeName: '',
          certNo: '',
          email: '',
          custId: '',
          custName: '',
          conId: '',
          conName: '',
          prodServTempId: '',
          prodServTempName: '',
          orderBegDate: '',
          accrArea: '',
          accrAreaName: '',
          householdType: '',
          custEmpInnerNo: '',
          costCentId: '',
          costCentName: '',
          sinsDeclWage: '',
          accuDeclWage: '',
          remark: ''
        },
        modifyBillDayAddForm: {
          chargeBegYm: '',
          chargeBegYmName: ''
        },
        modifyBillDayAddRules: {
          chargeBegYmName: [
            {required: true, message: '收费启动月为必填项', trigger: 'change'}
//            {validator: this.validator.checkMouthNumZero, trigger: 'change'}
          ]
        },
        modifyStartDayAddForm: {
          begDate: ''
        },
        modifyStartDayAddRules: {
          begDate: [
            {type: 'date', required: true, message: '请选择起作日期', trigger: 'change'}
          ]
        },
        epmBasicRules: {
          empName: [
            {required: true, message: '请填写雇员姓名', trigger: 'change'}
          ],
          nationalityName: [
            {required: true, message: '请选择国籍', trigger: 'change'}
          ],
          sex: [
            {type: 'number', required: true, message: '请选择性别', trigger: 'change'}
          ],
          certTypeName: [
            {required: true, message: '请选择证件类型', trigger: 'change'}
          ],
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'change'}
          ],
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          conName: [
            {required: true, message: '请选择商务合同名称', trigger: 'change'}
          ],
          prodServTempName: [
            {required: true, message: '请选择产品服务模板', trigger: 'change'}
          ],
          orderBegDate: [
            {type: 'date', required: true, message: '请选择订单开始日期', trigger: 'change'}
          ],
          accrAreaName: [
            {required: true, message: '请选择派出地区', trigger: 'change'}
          ],
          householdType: [
            {type: 'number', required: true, message: '请选择户口性质', trigger: 'change'}
          ],
          sinsDeclWage: [
            {required: true, type: 'number', message: '请输入社保申报基数', trigger: 'change'},
            {validator: this.validator.checkMax15TwoNum, trigger: 'change'}
          ],
          accuDeclWage: [
            {required: true, type: 'number', message: '请输入公积金申报基数', trigger: 'change'},
            {validator: this.validator.checkMax15TwoNum, trigger: 'change'}
          ]
        },
        btnFlag: false,
        serverData: null,
        accuData: null,
        routerView: false,
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
        propay: {
          total: null,
          pageNum: 1,
          pageSize: 5,
          pageArray: [5, 10, 20, 30, 50]
        },
        treeStructure: true,
        defaultExpandAll: false,
        columns: [ // 分组
          {
            text: '产品名称',
            dataIndex: 'prodName'
          }
        ],
        singleSubmitFlag: true,
        serverShowFlag: false,
        sinsDeclWageFlag: false,
        accuDeclWageFlag: false,
        allowOutFlag: false,
        allowOutForm: {
          custName: '',
          orderDate: '',
          sinsDate: '',
          sinsAreaName: '',
          accuDate: '',
          accuAreaName: '',
          message: ''
        },
        allowOutBtn: false,
        dialogflag: false,
        checkedArr: [],
        accuCheckedArr: [],
        dialogApplyFlag: '1'
      };
    },
    created: function () {
      api.post(this.dictSelUrl, {code: 'SEX'}).then(res => {
        this.sexList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'HOUSEHOLD_TYPE'}).then(res => {
        this.householdProyList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      this.ruoteJudge();
    },
    watch: {
      $route: {
        handler: function (val) {
          if (val.path === '/empAss/singleEmpAss') {
            this.routerView = false;
          }
        },
        deep: true
      },
      'epmBasicForm': {
        handler: function (val, oldVal) {
          if (this.dialogflag === false) {
            this.watchFun();
          }
          if (val.certType === 1 && val.certNo.length === 18) {
            let _ele = val.certNo.substring(val.certNo.length - 2, val.certNo.length - 1);
            if (_ele % 2 === 0) {
              val.sex = 2;
            } else {
              val.sex = 1;
            }
          }
        },
        deep: true
      },
      'dialogflag': {
        handler: function (val) {
          if (val === true) {
            let _this = this;
            // setTimeout(function () {
            _this.submitSearchFun();
            // }, 2000);
          }
        },
        deep: true
      }
//      'epmBasicForm.prodServTempId': {
//        handler: function (val, oldVal) {
//          if (val !== oldVal) {
//            this.templateFun();
//          }
//        },
//        deep: true
//      }
    },
    methods: {
      watchFun () {
        let val = this.epmBasicForm;
        if (this.dialogflag === false) {
          if (this.sinsDeclWageFlag && this.accuDeclWageFlag) {
            if (val.empName === '' || val.nationality === '' || val.sex === '' || val.certType === '' || val.certNo === '' || val.custId === '' || val.conId === '' || val.prodServTempId === '' || val.orderBegDate === '' || val.accrArea === '' || val.householdType === '' || val.sinsDeclWage === '' || val.accuDeclWage === '') {
              console.log('Not completed');
              this.dialogflag = false;
              this.serverData = [];
              this.accuData = [];
              this.propay.total = 0;
              this.total = 0;
            } else {
              this.dialogflag = true;
            }
          } else {
            if ((val.empName === '' || val.nationality === '' || val.sex === '' || val.certType === '' || val.certNo === '' || val.custId === '' || val.conId === '' || val.prodServTempId === '' || val.orderBegDate === '' || val.accrArea === '' || val.householdType === '' || val.sinsDeclWage === '') && (val.empName === '' || val.nationality === '' || val.sex === '' || val.certType === '' || val.certNo === '' || val.custId === '' || val.conId === '' || val.prodServTempId === '' || val.orderBegDate === '' || val.accrArea === '' || val.householdType === '' || val.accuDeclWage === '') && (val.empName === '' || val.nationality === '' || val.sex === '' || val.certType === '' || val.certNo === '' || val.custId === '' || val.conId === '' || val.prodServTempId === '' || val.orderBegDate === '' || val.accrArea === '' || val.householdType === '')) {
              console.log('Not completed');
              this.dialogflag = false;
              this.serverData = [];
              this.accuData = [];
              this.propay.total = 0;
              this.total = 0;
            } else {
              this.dialogflag = true;
            }
          }
        }
      },
      ruoteJudge () {
        if (this.$route.path !== "/empAss/singleEmpAss") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      custChange () {
        this.conData.id = this.epmBasicForm.custId;
        this.serveTempData.custId = this.epmBasicForm.custId;
        this.costData.custId = this.epmBasicForm.custId;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        this.$router.push({path: '/empAss/batchEmpAss'});
      },
      // 添加服务协议
      serviceAgreeAdd () {
        if (this.epmBasicForm.custId === '' || this.epmBasicForm.custName === '') {
          this.$alert('请选择客户名称', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        this.routerView = true;
        this.$router.push({path: '/empAss/singleEmpAss/addCustServTemplate', query: {custId: this.epmBasicForm.custId, custName: this.epmBasicForm.custName, type: 'singleEmpAss'}});
      },
      // 选择产品服务模板判断公积金社保申报基数是否显示
      templateFun (list) {
        this.areaData.prodServeTempId = this.epmBasicForm.prodServTempId;
        if (list.accuCount === 0) {
          this.accuDeclWageFlag = false;
          this.epmBasicForm.accuDeclWage = '';
        } else {
          this.accuDeclWageFlag = true;
        }
        if (list.sinsCount === 0) {
          this.sinsDeclWageFlag = false;
          this.epmBasicForm.sinsDeclWage = '';
        } else {
          this.sinsDeclWageFlag = true;
        }
      },
      // 信息填写完全查询下面列表
      submitSearchFun () {
        let _this = this;
        _this.$refs.epmBasicForm.validate((valid) => {
          if (valid) {
            // console.log('1111111111111111111111111111111111');
            if (_this.dialogflag === false) return;
            // if (_this.dialogApplyFlag === '2') {
            //   _this.dialogflag = false;
            //   _this.dialogApplyFlag = '1';
            //   return;
            // };
            _this.epmBasicForm.orderBegDate = Vue.filter('date')(_this.epmBasicForm.orderBegDate, 'yyyy-MM-dd');
            api.post(_this.apiPath.hrsc.addOrder, _this.epmBasicForm).then(res => {
              // 允许双派
              if (res.code === 'CPYY-10043') {
                _this.allowOutFlag = true;
                _this.allowOutForm = res.data;
                _this.allowOutBtn = true;
                _this.dialogflag = true;
                _this.epmBasicForm.orderBegDate = new Date(_this.epmBasicForm.orderBegDate);
                return false;
              } else if (res.code === 'CPYY-10042') { // 不允许双派
                _this.allowOutFlag = true;
                _this.allowOutForm = res.data;
                _this.allowOutBtn = false;
                _this.dialogflag = true;
                _this.epmBasicForm.orderBegDate = new Date(_this.epmBasicForm.orderBegDate);
                return false;
              } else if (res.code === 'CPYY-00001') {
                _this.btnFlag = true;
                _this.epmBasicForm.orderId = res.data;
                _this.dialogApplyFlag = '2';
                _this.pageNum = 1;
                _this.viewAll(_this.pageNum, _this.pageSize, res.data);
                _this.propay.pageNum = 1;
                _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, res.data);
                _this.epmBasicForm.orderBegDate = new Date(_this.epmBasicForm.orderBegDate);
                _this.dialogflag = true;
                _this.serverShowFlag = true;
//                _this.$message({message: '操作成功！', type: 'success'});
                setTimeout(function () {
                  _this.dialogflag = false;
                }, 100);
                return false;
              } else {
                _this.epmBasicForm.orderBegDate = new Date(_this.epmBasicForm.orderBegDate);
                _this.dialogflag = true;
                setTimeout(function () {
                  _this.dialogflag = false;
                }, 100);
                this.serverData = [];
                this.accuData = [];
                this.propay.total = 0;
                this.total = 0;
                return false;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.serverData = [];
            this.accuData = [];
            this.propay.total = 0;
            this.total = 0;
            _this.dialogflag = false;
          }
        });
      },
      // 继续派出
      continueFun () {
        let _this = this;
        _this.epmBasicForm.orderBegDate = Vue.filter('date')(_this.epmBasicForm.orderBegDate, 'yyyy-MM-dd');
        _this.epmBasicForm.flag = true;
        api.post(_this.apiPath.hrsc.addOrder, _this.epmBasicForm).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.serverShowFlag = true;
            _this.btnFlag = true;
            _this.dialogflag = false;
            _this.allowOutFlag = false;
            _this.epmBasicForm.orderId = res.data;
            _this.pageNum = 1;
            _this.viewAll(_this.pageNum, _this.pageSize, res.data);
            _this.propay.pageNum = 1;
            _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, res.data);
            _this.epmBasicForm.orderBegDate = new Date(_this.epmBasicForm.orderBegDate);
            _this.$message({message: '操作成功！', type: 'success'});
          } else {
            _this.epmBasicForm.orderBegDate = new Date(_this.epmBasicForm.orderBegDate);
            _this.dialogflag = false;
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改收费启动月
      modifyBillDay () {
        this.modifyBillDayAdd = true;
      },
      billDaySure () {
        let _this = this;
        _this.$refs.modifyBillDayAddForm.validate((valid) => {
          if (valid) {
            let _arr = [];
            if (_this.checkedArr.length > 0) {
              _this.checkedArr.forEach(function (list) {
                _arr.push(list.orderDetId);
              });
            }
            let _accuArr = [];
            if (_this.accuCheckedArr.length > 0) {
              _this.accuCheckedArr.forEach(function (list) {
                _accuArr.push({orderDetId: list.orderDetId, type: list.type});
              });
            }
            let _data = {
              orderId: _this.epmBasicForm.orderId,
              chargeBegYm: _this.modifyBillDayAddForm.chargeBegYm,
              serveIds: _arr,
              proPays: _accuArr
            };
            api.post(_this.apiPath.hrsc.modifyChargeBeginYm, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.modifyBillDayAdd = false;
                _this.pageNum = 1;
                _this.viewAll(this.pageNum, this.pageSize, _this.epmBasicForm.orderId);
                _this.propay.pageNum = 1;
                _this.viewAll1(this.propay.pageNum, _this.propay.pageSize, _this.epmBasicForm.orderId);
                _this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 修改起做日期
      modifyStartDay () {
        this.modifyStartDayAdd = true;
      },
      startDaySure () {
        let _this = this;
        _this.$refs.modifyStartDayAddForm.validate((valid) => {
          if (valid) {
            _this.modifyStartDayAddForm.begDate = Vue.filter('date')(_this.modifyStartDayAddForm.begDate, 'yyyy-MM-dd');
            let _arr = [];
            if (_this.checkedArr.length > 0) {
              _this.checkedArr.forEach(function (list) {
                _arr.push(list.orderDetId);
              });
            }
            let _accuArr = [];
            if (_this.accuCheckedArr.length > 0) {
              _this.accuCheckedArr.forEach(function (list) {
                _accuArr.push({orderDetId: list.orderDetId, type: list.type});
              });
            }
            let _data = {
              orderId: _this.epmBasicForm.orderId,
              begDate: _this.modifyStartDayAddForm.begDate,
              serveIds: _arr,
              proPays: _accuArr
            };
            api.post(_this.apiPath.hrsc.modifyBegDate, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.modifyStartDayAdd = false;
                _this.pageNum = 1;
                _this.viewAll(_this.pageNum, _this.pageSize, _this.epmBasicForm.orderId);
                _this.propay.pageNum = 1;
                _this.viewAll1(_this.propay.pageNum, _this.propay.pageSize, _this.epmBasicForm.orderId);
                _this.$message({message: '修改成功！', type: 'success'});
              } else {
                _this.modifyStartDayAddForm.begDate = new Date(_this.modifyStartDayAddForm.begDate);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 查询订单明细
      viewAll (pageNum, pageSize, id) {
        let _data = {
          data: {
            orderId: id
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.entrustedpage, _data).then(res => {
          this.serverData = res.data.list;
          this.total = res.data.total;
          let me = this;
          if (me.treeStructure) {
            let _oldData = Utils.MSDataTransfer.treeToArray(JSON.parse(JSON.stringify(res.data.list)), null, null, me.defaultExpandAll);
            me.serverData = Utils.MSDataTransfer.treeToArray(res.data.list, null, null, me.defaultExpandAll);
          };
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 查询社保公积金
      viewAll1 (pageNum, pageSize, id) {
        let _data = {
          data: {
            orderId: id
          },
          pageNum: pageNum || this.propay.pageNum,
          pageSize: pageSize || this.propay.pageSize
        };
        api.post(this.apiPath.hrsc.proPayPage, _data).then(res => {
          this.accuData = res.data.list;
          this.propay.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 服务费交互订单项
      serverCallBack (selectTion, row) {
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      // 住房公积金交互订单项
      accuCallBack (selectTion) {
        this.accuCheckedArr = selectTion;
        if ((this.accuCheckedArr.length > 0)) {
          for (var i = 0; i < this.accuCheckedArr.length; i++) {
            if (this.accuCheckedArr[i].flag === 1) {
              this.accuCheckedArr.splice(i);
              return;
            }
          }
        }
      },
      // 派出确定
      singleSubmit () {
        let _this = this;
//        this.epmBasicForm.orderBegDate = new Date(this.epmBasicForm.orderBegDate);
        this.$refs.epmBasicForm.validate((valid) => {
          if (valid) {
            api.postsign(_this.apiPath.hrsc.confirmAssSingle, _this.epmBasicForm.orderId).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.$message({message: '派出成功！',
                  type: 'success',
                  onClose: function () {
                    setTimeout(function () {
                      _this.serverShowFlag = false;
                      _this.btnFlag = false;
                      _this.dialogflag = false;
                      _this.serverData = null;
                      _this.accuData = null;
                      _this.dialogApplyFlag = '1';
                      _this.$refs.epmBasicForm.resetFields();
                      _this.epmBasicForm.nationality = 1;
                      _this.epmBasicForm.nationalityName = '中国';
                      _this.epmBasicForm.certType = 1;
                      _this.epmBasicForm.certTypeName = '身份证';
                      setTimeout(function () {
                        _this.dialogflag = false;
                      }, 0);
                    }, 3000);
                  }
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 服务费
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(pageNum, this.pageSize, this.epmBasicForm.orderId);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize, this.epmBasicForm.orderId);
      },
      pageHandler1: function (pageNum) {
        this.propay.pageNum = pageNum;
        this.viewAll1(pageNum, this.propay.pageSize, this.epmBasicForm.orderId);
      },
      choooseNum1: function (pageSize) {
        this.propay.pageSize = pageSize;
        this.propay.pageNum = 1;
        this.viewAll1(this.propay.pageNum, pageSize, this.epmBasicForm.orderId);
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
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow (index, record) {
        let me = this;
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      btnClick () {
        this.allowOutFlag = false;
        this.dialogflag = false;
      },
      allowReset () {
        this.allowOutFlag = false;
        this.dialogflag = false;
      }
    }
  };
</script>
