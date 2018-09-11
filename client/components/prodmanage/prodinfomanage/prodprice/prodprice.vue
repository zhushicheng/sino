<template>
  <!--<div>销售线索</div>-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('first')">产品基本信息</div>
          <div class="sino-tabs-item" @click="prodScheFun('second')">产品方案</div>
          <div class="sino-tabs-item is-active">产品定价方案</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="prodPriceForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">产品名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceForm.prodName" :chooseId.sync="prodPriceForm.prodId"  :clear="true" :url="prodNameSelUrl" @change="changeFun"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">产品方案名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceForm.prodScheName" :chooseId.sync="prodPriceForm.prodScheId" :linkage="true" :clear="true" :url="prodScheSelUrl" :data="linkData"></sino-select>
            </li>
            <li class="search-inner-name text-left">
              <span class="search-inner-name">产品定价方案名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceForm.priceName" :chooseId.sync="prodPriceForm.priceId"  :clear="true" :url="prodPriceSelUrl"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">供应商：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceForm.creSuppName" :chooseId.sync="prodPriceForm.creSuppId"  :clear="true" :url="prodProSelUrl" :token="token"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchBtnFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="startFun"><i class="iconfont sino-duihao"></i>启用</sino-button>
            <sino-button type="icon-text" @click="stopFun"><i class="iconfont sino-invalid"></i>停用</sino-button>
            <sino-dropdown trigger="click" @visible-change="dropdownDel" class="table-top-dropdown" @command="handleCommand" v-show="false">
              <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false" :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
                <i class="iconfont sino-setting"></i>产品定价方案相关配置<i class="iconfont sino-unie628"></i>
              </span>
              <sino-dropdown-menu class="table-dropdown-content">
                <sino-dropdown-item command="editInvoice">修改发票科目</sino-dropdown-item>
              </sino-dropdown-menu>
            </sino-dropdown>
          </div>
        </div>
        <sino-table :data="tableData" border max-height="416" stripe v-on:select="selectCallBack" @select-all="selectAllBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="prodName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="prodScheName" label="产品方案名称" min-width="180"></sino-table-column>
          <sino-table-column prop="priceName" label="产品定价方案名称" min-width="180"></sino-table-column>
          <sino-table-column prop="creSuppName" label="供应商" min-width="180"></sino-table-column>
          <sino-table-column prop="sugSalePrice" label="建议售价(元)" min-width="105"></sino-table-column>
          <sino-table-column prop="priceStateName" label="状态"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" width="120" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.priceState!==2">|</i>
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.priceState!==2">修改</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--新增/修改-->
    <sino-dialog :visible.sync="prodPriceAdd" size="large" :top="'10%'" class="dialog-height overflow-dialog" v-on:close="resetForm('prodPriceAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="prodPriceAddForm" :rules="prodPriceAddRules" ref="prodPriceAddForm" class="demo-sendAddrAddForm long-form-item">
        <sino-title type="levelTwo" title="基本信息" class="mb20"></sino-title>
        <sino-form-item label="产品名称：" class="h25" prop="prodName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="alertTitle === '修改产品定价方案'" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceAddForm.prodName" :chooseId.sync="prodPriceAddForm.prodId" :clear="alertTitle !== '修改产品定价方案'" :url="prodNameSelUrl" @change="changeFun1">
          </sino-select>
        </sino-form-item>
        <sino-form-item label="产品方案名称：" class="h25" prop="prodScheName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="alertTitle === '修改产品定价方案'" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceAddForm.prodScheName" :chooseId.sync="prodPriceAddForm.prodScheId" :clear="alertTitle !== '修改产品定价方案'" :url="prodScheSelUrl" :linkage="true" :data="linkData1">
          </sino-select>
        </sino-form-item>
        <sino-form-item label="产品定价方案名称：" class="h25" prop="priceName">
          <sino-input type="text" v-model="prodPriceAddForm.priceName" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="产品定价方案编号：" class="h25" prop="priceCode" v-if="alertTitle==='修改产品定价方案'">
          <sino-input type="text" v-model="prodPriceAddForm.priceCode" :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="产品定价方案西文名称：" class="h25" prop="priceEnName">
          <sino-input type="text" v-model="prodPriceAddForm.priceEnName" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="供应商：" class="h25" prop="creSuppName">
          <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodPriceAddForm.creSuppName" :chooseId.sync="prodPriceAddForm.creSuppId " :clear="true" :url="prodProSelUrl" :token="token"></sino-select>
        </sino-form-item>
        <sino-form-item class="h25" v-if="alertTitle !=='修改产品定价方案'"></sino-form-item>
        <div class="clearfix"></div>
        <sino-title type="levelTwo" title="费用/金额"  class="mb20"></sino-title>
        <sino-form-item label="价格类型：" prop="priceType" class="radio-item h25" :justText="false">
          <sino-radio v-for="(item, index) in trackStatus" :key="index" v-model.number="prodPriceAddForm.priceType" :label="item.id" class="leads-sinoradio width-bug">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item class="h25"></sino-form-item>
        <sino-form-item label="建议售价（元）：" class="h25" prop="sugSalePrice">
          <sino-input type="text" v-model.number="prodPriceAddForm.sugSalePrice" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="最低销售价（元）：" class="h25" prop="lowerSalePrice">
          <sino-input type="text" v-model.number="prodPriceAddForm.lowerSalePrice" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="成本价（元）：" class="h25" prop="costPrice">
          <sino-input type="text" v-model.number="prodPriceAddForm.costPrice" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="外购成本价（元）：" class="h25" prop="outsCostPrice">
          <sino-input type="text" v-model.number="prodPriceAddForm.outsCostPrice" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="发票科目：" class="h25" prop="oneLevelInvSubName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodPriceAddForm.oneLevelInvSubName" :chooseId.sync="prodPriceAddForm.oneLevelInvSub" :url="invSubSelect" :clear="true" :data="{data:{invSubType:1}}"></sino-select>
        </sino-form-item>
        <sino-form-item label="产品定价方案状态：" class="h25" prop="priceStateName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodPriceAddForm.priceStateName" :chooseId.sync="prodPriceAddForm.priceState"
                       :clear="true" :url="dictSelUrl" :data="{code:'PROD_STATE'}"></sino-select>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="priceDesc" label="产品定价方案说明：">
          <sino-input type="text" v-model="prodPriceAddForm.priceDesc" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="text" v-model="prodPriceAddForm.remark" :disabled="false" ></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('prodPriceAddForm')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看产品方案" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li class="li-last">
            <h6>产品名称</h6><span v-text="seeForm.prodName"></span>
          </li>
          <li>
            <h6>产品方案名称</h6><span v-text="seeForm.prodScheName"></span>
          </li>
          <li>
            <h6>产品定价方案名称</h6><span v-text="seeForm.priceName"></span>
          </li>
          <li>
            <h6>产品定价方案西文名称</h6><span v-text="seeForm.priceEnName"></span>
          </li>
          <li>
            <h6>产品定价方案编号</h6><span v-text="seeForm.priceCode"></span>
          </li>
          <li>
            <h6>供应商</h6><span v-text="seeForm.creSuppName"></span>
          </li>
          <li>
            <h6>价格类型</h6><span v-text="seeForm.priceTypeName"></span>
          </li>
          <li>
            <h6>成本价（元）</h6><span v-text="seeForm.costPrice"></span>
          </li>
          <li>
            <h6>建议售价（元）</h6><span v-text="seeForm.sugSalePrice"></span>
          </li>
          <li>
            <h6>最低销售价（元）</h6><span v-text="seeForm.lowerSalePrice"></span>
          </li>
          <li>
            <h6>外购成本价</h6><span v-text="seeForm.outsCostPrice"></span>
          </li>
          <li>
            <h6>发票科目</h6><span v-text="seeForm.oneLevelInvSubName"></span>
          </li>
          <li>
            <h6>产品定价方案状态</h6><span v-text="seeForm.priceStateName"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeForm.creTime"></span>
          </li>
          <li class="li-last">
            <h6>产品定价方案说明</h6><span v-text="seeForm.priceDesc"></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeForm.remark"></span>
          </li>
        </ul>
      </div>
    </sino-dialog>
    <!--查看更多操作记录-->
    <sino-dialog :visible.sync="moreProdOperFlag" class="moreProd-dialog">
      <sino-title slot="title" type="levelOne" title="查看产品修改记录" class="sino-dialog-title"></sino-title>
      <sino-table :data="tableData" stripe border max-height="416" class="procreg-table">
        <sino-table-column prop="loginName" label="序号"></sino-table-column>
        <sino-table-column prop="loginName" label="产品编号"></sino-table-column>
        <sino-table-column prop="fullName" label="产品名称"></sino-table-column>
        <sino-table-column prop="innerNum" label="变更项"></sino-table-column>
        <sino-table-column prop="isEffect" label="变更前值"></sino-table-column>
        <sino-table-column prop="isEffect" label="变更后值"></sino-table-column>
        <sino-table-column prop="userType" label="备注" min-width="180"></sino-table-column>
        <sino-table-column prop="userType" label="操作人"></sino-table-column>、
        <sino-table-column prop="userType" label="操作时间"></sino-table-column>
      </sino-table>
      <span slot="footer" class="dialog-footer">
        <sino-button class="moreProd-button" type="primary" @click="moreProdOperFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--修改发票科目-->
    <sino-dialog :visible.sync="editInv" class="leads-follow editInvoice" @close="editInvClose">
      <sino-title slot="title" type="levelOne" title="修改发票科目" class="sino-dialog-title"></sino-title>
      <div class="follow-select">
        <sino-form :model="editInvForm" class="follow-form" :rules="editInvRules" ref="editInvForm">
          <div class="follow-content">
            <sino-form-item label="发票科目：" prop="trackName">
              <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="editInvForm.trackName" :chooseId.sync="editInvForm.trackId"  :clear="true"></sino-select>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer editInv-button-box">
        <sino-button class="alert-btn fl">新数据生效</sino-button>
        <sino-button class="alert-btn fr" type="primary">全部生效</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  import vald from '../../../../validator/index.js';
  import Cookie from 'js-cookie';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      var LowerLimit = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.prodPriceAddForm.lowerSalePrice || this.prodPriceAddForm.costPrice || this.prodPriceAddForm.outsCostPrice) {
          if (value < this.prodPriceAddForm.lowerSalePrice || value < this.prodPriceAddForm.costPrice || value < this.prodPriceAddForm.outsCostPrice) {
            callback(new Error('建议售价需大于等于最低销售价'));
          } else {
            callback();
          }
        }
      };
      var LowerLimit2 = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.prodPriceAddForm.sugSalePrice || this.prodPriceAddForm.costPrice || this.prodPriceAddForm.outsCostPrice) {
          if (value > this.prodPriceAddForm.sugSalePrice || value < this.prodPriceAddForm.costPrice || value < this.prodPriceAddForm.outsCostPrice) {
            callback(new Error('最低销售价需小于建议售价并大于成本价'));
          } else {
            callback();
          }
        }
      };
      var LowerLimit3 = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.prodPriceAddForm.sugSalePrice || this.prodPriceAddForm.lowerSalePrice || this.prodPriceAddForm.outsCostPrice) {
          if (value > this.prodPriceAddForm.sugSalePrice || value > this.prodPriceAddForm.lowerSalePrice || value < this.prodPriceAddForm.outsCostPrice) {
            callback(new Error('成本价需小于最低销售价且大于外购成本价'));
          } else {
            callback();
          }
        }
      };
      var LowerLimit4 = (rule, value, callback) => {
        if (!value) {
          callback();
          return;
        }
        if (this.prodPriceAddForm.sugSalePrice || this.prodPriceAddForm.lowerSalePrice || this.prodPriceAddForm.costPrice) {
          if (value > this.prodPriceAddForm.sugSalePrice || value > this.prodPriceAddForm.lowerSalePrice || value > this.prodPriceAddForm.costPrice) {
            callback(new Error('外购成本价需小于成本价'));
          } else {
            callback();
          }
        }
      };
      return {
        activeName: 'third',
        dropdown: false,
        invSubSelect: this.apiPath.hrsc.invSubSelectBox,
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        prodScheSelUrl: this.apiPath.hrsc.findprodscheselectbox,
        prodPriceSelUrl: this.apiPath.hrsc.findprodpricescheselectbox,
        prodProSelUrl: this.apiPath.hrsc.selectBox,  // g
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookie.get("Token"),
        linkData: {prodId: null},
        linkData1: {prodId: null},
        prodPriceForm: {
          prodName: '',
          prodId: '',
          prodScheName: '',
          prodScheId: '',
          priceName: '',
          priceId: '',
          creSuppName: '',
          creSuppId: ''
        },
        trackStatus: [],
        isA: true,
        tableData: null,
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
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        prodPriceAdd: false,
        prodPriceAddForm: {
          prodName: '',
          prodId: '',
          prodScheName: '',
          priceCode: '',
          prodScheId: '',
          priceName: '',
          priceEnName: '',
          creSuppName: '',
          creSuppId: '',
          priceType: '',
          costPrice: '',
          sugSalePrice: '',
          lowerSalePrice: '',
          outsCostPrice: '',
          oneLevelInvSubName: '',
          oneLevelInvSub: '',
          priceStateName: '',
          priceState: '',
          priceDesc: '',
          remark: ''
        },
        // 校验
        prodPriceAddRules: {
          prodName: [
            {required: true, message: '产品名称为必填项', trigger: 'change'}
          ],
          prodScheName: [
            {required: true, message: '产品方案名称为必填项', trigger: 'change'}
          ],
          priceName: [
            {required: true, message: '产品定价方案名称为必填项', trigger: 'change'}
          ],
          creSuppName: [
            {required: true, message: '供应商为必填项', trigger: 'change'}
          ],
          priceType: [
            {required: true, type: 'number', message: '价格类型为必选项', trigger: 'change'}
          ],
          sugSalePrice: [
            { required: true, type: 'number', message: '建议售价数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'},
            {validator: LowerLimit, trigger: 'change'}
          ],
          lowerSalePrice: [
            { required: true, type: 'number', message: '最低销售价为数字类型，且为必填项', trigger: 'change' },
            {validator: vald.checkNum, trigger: 'change'},
            {validator: LowerLimit2, trigger: 'change'}

          ],
          oneLevelInvSubName: [
            {required: true, message: '发票科目为必填项', trigger: 'change'}
          ],
          priceStateName: [
            {required: true, message: '产品定价方案状态为必填项', trigger: 'change'}
          ],
          priceDesc: [
            {required: true, message: '产品定价方案说明为必填项', trigger: 'change'}
          ]
        },
        seeForm: {},
        leadsAdd: false, // 添加弹层
        seeItem: false, // 控制查看弹层的显示
        moreProdOperFlag: false,
        editInvForm: {},
        editInvRules: {},
        editInv: false
      };
    },
    created () {
      if (this.$route.query.type === 1) {
        this.prodPriceForm.prodId = this.$route.query.prodId;
        this.prodPriceForm.prodName = this.$route.query.prodName;
        this.prodPriceForm.prodScheName = this.$route.query.prodScheName;
        this.prodPriceForm.prodScheId = this.$route.query.prodScheId;
        this.searchFun();
      } else if (this.$route.query.type === 2) {
        this.prodPriceAddForm.prodName = this.$route.query.prodName;
        this.prodPriceAddForm.prodId = this.$route.query.prodId;
        this.addFun();
      }
      api.post(this.dictSelUrl, {code: 'PROD_PRICE_TYPE'}).then(res => {
        this.trackStatus = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      if (!this.$route.query.type) {
        this.linkData.prodId = '';
      } else if (this.$route.query.type === 1) {
        this.linkData.prodId = this.$route.query.prodId;
        let that = this;
        setTimeout(function () {
          that.prodPriceForm.prodScheName = that.$route.query.prodScheName;
          that.prodPriceForm.prodScheId = that.$route.query.prodScheId;
        }, 50);
      }
      this.validator.addEnterEvent(this.searchBtnFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      changeFun () {
        this.linkData.prodId = this.prodPriceForm.prodId;
      },
      changeFun1 () {
        this.linkData1.prodId = this.prodPriceAddForm.prodId;
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/prodInfo'});
        } else if (order === 'second') {
          this.$router.push({path: '/proSche'});
        };
      },
      selectCallBack (selectTion) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
        checkedArr = selectTion;
      },
      selectAllBack (selectTion, row) {
        checkedArr = selectTion;
      },
      resetForm: function (data) {
        this.$refs[data].resetFields();
      },
      editInvClose: function () {
        this.$refs.leadsAddForm.resetFields();
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: {
            prodName: '',
            prodId: '',
            prodScheName: '',
            prodScheId: '',
            priceName: '',
            priceId: '',
            creSuppName: '',
            creSuppId: ''
          }
        };
        api.post(this.apiPath.hrsc.findpageprodpricesche, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      searchBtnFun () {
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchFun();
      },
      // 查询
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.prodPriceForm
        };
        api.post(this.apiPath.hrsc.findpageprodpricesche, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.searchFun();
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchFun();
      },
      // 新增
      addFun: function () {
        this.prodPriceAdd = true;
        this.alertTitle = '新增产品定价方案';
        this.leadsbtn = '确 定';
        let that = this;
        setTimeout(function () {
          if (!that.$route.query.type) {
            that.linkData1.prodId = '';
          } else if (that.$route.query.type === 2) {
            that.linkData1.prodId = that.$route.query.prodId;
          }
        }, 50);
      },
      // 启用
      startFun: function () {
        let _this = this;
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          _this.$confirm('确定启用？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.priceId);
            });
            var obj = {
              priceIds: _arr,
              priceState: 2
            };
            api.post(_this.apiPath.hrsc.updateprodpriceschestate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                checkedArr = [];
                _this.searchFun();
                _this.$message({message: '启用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
          });
        }
      },
      // 停用
      stopFun: function () {
        let _this = this;
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          _this.$confirm('确定停用？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.priceId);
            });
            var obj = {
              priceIds: _arr,
              priceState: 3
            };
            api.post(_this.apiPath.hrsc.updateprodpriceschestate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                checkedArr = [];
                _this.searchFun();
                _this.$message({message: '停用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            console.log('删除失败!');
          });
        }
      },
      // 查看
      seeFun: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.findbyidprodpricesche, {priceId: data.priceId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun: function (data) {
        this.prodPriceAdd = true;
        this.alertTitle = '修改产品定价方案';
        this.leadsbtn = '修 改';
        api.post(this.apiPath.hrsc.findbyidprodpricesche, {priceId: data.priceId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let prodScheName = res.data.prodScheName;
            let prodScheId = res.data.prodScheId;
            this.prodPriceAddForm = res.data;
            let that = this;
            setTimeout(function () {
              that.prodPriceAddForm.prodScheName = prodScheName;
              that.prodPriceAddForm.prodScheId = prodScheId;
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看管理方案
      manProdFun: function () {},
      // 查看更多产品操作记录
      moreProdOperFun: function () {
        this.moreProdOperFlag = true;
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      handleCommand (command) {
        if (command === 'editInvoice') {
          this.editInv = true;
        }
      },
      // 新增确定
      submitForm (formName) {
        this.$refs.prodPriceAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增产品定价方案') {
              api.post(this.apiPath.hrsc.addprodpricesche, this.prodPriceAddForm).then(res => {
                this.prodPriceAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(this.apiPath.hrsc.updateprodpricesche, this.prodPriceAddForm).then(res => {
                this.prodPriceAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>
