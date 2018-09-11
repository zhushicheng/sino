<template>
  <!--公积金账户管理-->
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="客户公积金账户查询"></sino-title>
      <sino-form :model="accuAcctForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one costcenter-width">
              <span class="search-inner-name">客户名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="custInfoSelectBox"
                           :token="token"
                           :chooseName.sync="accuAcctForm.custName"
                           :chooseId.sync="accuAcctForm.custId" :clear="true"
              ></sino-select>
            </li>
            <li class="search-inner-name">
              <span class="search-inner-name">公积金账户名称：</span>
              <sino-input class="fl" type="text" v-model="accuAcctForm.accuAcctName"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">单位公积金账号：</span>
              <sino-input class="fl" type="text" v-model="accuAcctForm.unitRegiNo"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">执行地区：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="accuAcctForm.areaName"
                           :chooseId.sync="accuAcctForm.areaId"
                           :clear="true"
                           :data="{data:{areaTypes: [4,5,6]}}"
                           :url="findAreaList"
              ></sino-select>
            </li>
            <li>
              <span class="search-inner-name">账户状态：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="apiPath.hrsc.getDictSelectBox"
                           :token="token"
                           :data="{code: 'SINS_ACCT_STATE'}"
                           :chooseName.sync="accuAcctForm.acctStateName"
                           :chooseId.sync="accuAcctForm.acctState" :clear="true"
              ></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchButFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetSearchFun">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-table-total sino-table-radio mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-dropdown trigger="click" @visible-change="dropdownDel" class="table-top-dropdown1 el-dropdown-no-stroke" @command="handleCommand">
  <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false" :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
                <i class="iconfont sino-add"></i>新增公积金账户<i class="iconfont sino-unie628"></i>
              </span>
            <sino-dropdown-menu style="width:155px;">
              <sino-dropdown-item command="2" class="dropdown-item-no-border">已有公积金账户</sino-dropdown-item>
              <sino-dropdown-item command="3" class="dropdown-item-no-border">新申请公积金账户</sino-dropdown-item>
            </sino-dropdown-menu>
          </sino-dropdown>
        </div>
      </div>
      <sino-table :data="tableData"  v-on:viewAll="viewAll" stripe border max-height="416">
        <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
        <sino-table-column prop="unitRegiNo" label="单位公积金账号" min-width="140"></sino-table-column>
        <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="300"></sino-table-column>
        <sino-table-column prop="areaName" label="执行地区" min-width="110"></sino-table-column>
        <sino-table-column prop="centerName" label="公积金管理中心" min-width="180"></sino-table-column>
        <sino-table-column prop="acctStateName" label="账户状态" min-width="100"></sino-table-column>
        <sino-table-column prop="retReason" label="退回原因" min-width="170"></sino-table-column>
        <sino-table-column label="操作" align="center" width="180" fixed="right">
          <template scope="scope">
            <div v-if="scope.row.oper === true">
              <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.acctState === 1 || scope.row.acctState === 4">|</i>
              <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.acctState === 1 || scope.row.acctState === 4">修改</span><i class="table-i" v-if="scope.row.acctState === 1 || scope.row.acctState === 4">|</i>
              <span class="table-span" @click="commitFun(scope.row)" v-if="scope.row.acctState === 1 || scope.row.acctState === 4">提交</span><i class="table-i" v-if="scope.row.acctState === 1 || scope.row.acctState === 4">|</i>
              <span class="table-span" @click="delFun(scope.row)" v-if="scope.row.acctState === 1 || scope.row.acctState === 4">删除</span>
            </div>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="total"></sino-page>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="leadsAdd"  size="large" v-on:close="modifyClose" :top="'5%'" dialogHide class="accuman-add-layer accuman-footer-margin">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="leadsAddForm" :rules="rules" ref="leadsAddForm" class="leadsAdd-Form">
          <sino-form-item label="客户名称：" prop="custName" class="first-select-item">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="alertTitle==='修改公积金账户信息'"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="custInfoSelectBox"
                         :token="token"
                         :chooseName.sync="leadsAddForm.custName"
                         :chooseId.sync="leadsAddForm.custId" :clear="true" @change="searchCodeFun"
            ></sino-select>
          </sino-form-item>
          <sino-form-item label="统一社会信用代码：" prop="certCode">
            <sino-input v-model="leadsAddForm.certCode"></sino-input>
          </sino-form-item>
          <sino-form-item label="公积金账户名称：" prop="accuAcctName">
            <sino-input v-model="leadsAddForm.accuAcctName"></sino-input>
          </sino-form-item>
          <sino-form-item label="单位公积金账号：" prop="unitRegiNo" v-if="leadsAddForm.accuOpenAcctType === 2">
            <sino-input v-model="leadsAddForm.unitRegiNo"></sino-input>
          </sino-form-item>
          <sino-form-item label="公积金比例(%)："  class="is-required accu-proportion">
            <sino-form-item prop="corpProp" label="企业" class="two-half-form-item two-half-width">
              <sino-input v-model.number="leadsAddForm.corpProp"></sino-input>
            </sino-form-item>
            <sino-form-item prop="perProp" label="个人" class="two-half-form-item two-half-width">
              <sino-input v-model.number="leadsAddForm.perProp"></sino-input>
            </sino-form-item>
          </sino-form-item>
          <sino-form-item label="开户类型：" prop="accuOpenAcctType">
            <sino-input v-model="leadsAddForm.accuOpenAcctTypeName" :disabled="true"></sino-input>
          </sino-form-item>
          <sino-form-item label="执行地区：" prop="areaName" class="short-margin-bottom first-select-item">
            <sino-select :tipText="''"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :chooseName.sync="leadsAddForm.areaName"
                         :chooseId.sync="leadsAddForm.areaId"
                         :clear="true"
                         :data="{data:{areaTypes: [4,5,6]}}"
                         :url="findAreaList"
                          @change="areaChangeFun"
            ></sino-select>
          </sino-form-item>
          <sino-form-item label="缴费方式：" prop="payFeeWay">
            <sino-radio v-for="(item, index) in payFeeArr" :key="item"
                        v-model.number="leadsAddForm.payFeeWay"
                        :label="item.id" v-if="((item.id===2) && alertTitle === '新增公积金账户') || (alertTitle !== '新增公积金账户')">{{item.title}}</sino-radio>
          </sino-form-item>
          <sino-form-item label="公积金管理中心：" prop="centerName" class="first-select-item">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :data="centerData"
                         :chooseName.sync="leadsAddForm.centerName" :chooseId.sync="leadsAddForm.centerId" :linkage="true"
                         :clear="true" :url="findCenterSelect" @change="centerChangeFun"></sino-select>
          </sino-form-item>
          <sino-form-item label="支付方式：" prop="payWay">
            <sino-radio v-for="(item, index) in payWayArr" :key="item"
                        v-model.number="leadsAddForm.payWay"
                        :label="item.id">{{item.title}}</sino-radio>
          </sino-form-item>
          <sino-form-item label="付费银行名称：" prop="payFeeBankName" class="first-select-item">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                         :chooseName.sync="leadsAddForm.payFeeBankName" :chooseId.sync="leadsAddForm.payFeeBankId"
                         :clear="true" :url="bankInfoDropdown" :data="{data:{}}"></sino-select>
          </sino-form-item>
          <sino-form-item label="付费账户名称：" prop="payFeeAcctName">
            <sino-input v-model="leadsAddForm.payFeeAcctName"></sino-input>
          </sino-form-item>
          <sino-form-item label="付费银行账号：" prop="payFeeBankAcct">
            <sino-input v-model="leadsAddForm.payFeeBankAcct"></sino-input>
          </sino-form-item>
          <!--<sino-form-item label="是否可突破上限：" prop="isBreakUpperLimt">-->
            <!--<sino-radio v-for="item in yesNoArr"-->
                        <!--v-model.number="leadsAddForm.isBreakUpperLimt"-->
                        <!--:label="item.id">{{item.title}}</sino-radio>-->
          <!--</sino-form-item>-->
          <sino-form-item label="截单日：" prop="chargeEndDay" >
            <sino-input v-model.number="leadsAddForm.chargeEndDay"></sino-input>
          </sino-form-item>
          <sino-form-item label="备注：" class="sino-form-item-width"  prop="remark">
            <sino-input type="textarea" v-model="leadsAddForm.remark" :disabled="false"></sino-input>
          </sino-form-item>
        </sino-form>
        <div class="sino-form-item sino-form-item-width long-no-bottom" v-for="(item, index) in leadsAddForm.accuAcctMats" :key="item">
          <label class="sino-form-item-label">{{index===0?'上传材料：':'  '}}</label>
          <div class="sino-form-item-content">
            <div  class="first-material-config fl">
              <sino-select
                :filterable="false"
                :multiselect="false"
                :isshowTotol="false"
                :disabled="false"
                :totalNum="false"
                :isPage="true"
                :isGroup="false"
                :url="selUrl"
                :data="{code:'ACCU_ACCT_MAT_TYPE'}"
                :chooseName.sync="leadsAddForm.accuAcctMats[index].accuAcctMatTypeName"
                :chooseId.sync="leadsAddForm.accuAcctMats[index].accuAcctMatType" :clear="true"
              ></sino-select>
            </div>
            <div class="after-block upload-block fl">
              <sino-upload ref="leftTreeUpload"
                           :action="uploadFilePublic"
                           :show-file-list="false"
                           :auto-upload="true"
                           :on-success="fileSuccess"
                           :on-error="fileError"
              >
                <div slot="trigger" @click="activeUploadIndex(index)">
                  <input class="uploadFileBox" type="text" v-model="leadsAddForm.accuAcctMats[index].encName" readonly="true"/>
                  <div class="chooseFileButton chooseFileButton1">上传</div>
                </div>
              </sino-upload>
              <span class="count-span-oper" @click="ctrlArray (index) "><i class="iconfont" :class="{'sino-add' : index === 0, 'sino-reduce': index !== 0}"></i> {{index === 0? '新增':'删除'}} </span>
            </div>
          </div>
        </div>
        <div class="suppcont-tip fl" v-if="upFileArr && upFileArr.length > 0">
          <i class="iconfont sino-tip"></i>所需材料列表：<span style="color:#666" v-for="(item, index) in upFileArr" :key="item"><span style="color:#ddd" v-if="index > 0">｜</span>{{item.matDesc}}</span>
        </div>
      </div>
      <span slot="footer">
        <sino-button @click="submitForm('leadsAddForm', true)">保 存</sino-button>
        <sino-button type="primary" @click="submitForm('leadsAddForm', false)" class="ml20">提交经办员</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" top="7%" class="see-dirc accuman-footer-margin">
      <sino-title slot="title" type="levelOne" title="查看公积金账户信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>客户名称</h6><span v-text="seeForm.custName"></span>
          </li>
          <li>
            <h6>统一社会信用代码</h6><span v-text="seeForm.certCode"></span>
          </li>
          <li>
            <h6>公积金账户名称</h6><span v-text="seeForm.accuAcctName"></span>
          </li>
          <li>
            <h6>单位公积金账号</h6><span v-text="seeForm.unitRegiNo"></span>
          </li>
          <li>
            <h6>公积金比例(%)</h6><span>企业：{{seeForm.corpProp}} 个人：{{seeForm.perProp}}</span>
          </li>
          <li>
            <h6>开户类型</h6><span v-text="seeForm.accuOpenAcctTypeName"></span>
          </li>
          <li>
            <h6>执行地区</h6><span v-text="seeForm.areaName"></span>
          </li>
          <li>
            <h6>支付方式</h6><span v-text="seeForm.payWayName"></span>
          </li>
          <li>
            <h6>缴费方式</h6><span v-text="seeForm.payFeeWayName"></span>
          </li>
          <li>
            <h6>付费银行名称</h6><span v-text="seeForm.payFeeBankName"></span>
          </li>
          <li>
            <h6>公积金管理中心</h6><span v-text="seeForm.centerName"></span>
          </li>
          <li>
            <h6>付费银行账号</h6><span v-text="seeForm.payFeeBankAcct"></span>
          </li>
          <li>
            <h6>付费账户名称</h6><span v-text="seeForm.payFeeAcctName"></span>
          </li>
          <!--<li>-->
            <!--<h6>是否可突破上限</h6><span v-text="seeForm.isBreakUpperLimtName"></span>-->
          <!--</li>-->
          <li>
            <h6>截单日</h6><span v-text="'每月'+seeForm.chargeEndDay+'日'"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeForm.creTime"></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeForm.remark"></span>
          </li>
          <li class="li-last">
            <h6>上传材料</h6><span><i class="iconfont sino-qubiezhen download-see-item" v-for="(item, index) in seeForm.accuAcctMats" :key="index"><em>&nbsp;</em><em>{{item.encName}}</em><em class="em-item-download" @click="downLoadFile(item.encId)">下载</em></i></span>
          </li>
          <li v-if="seeForm.acctState === 4">
            <h6>退回人</h6><input v-model="seeForm.retPeople">
          </li>
          <li v-if="seeForm.acctState === 4">
            <h6>退回时间</h6><input v-model="seeForm.retTime">
          </li>
          <li v-if="seeForm.acctState === 4" class="li-last">
            <h6>退回原因</h6><input v-model="seeForm.retReason">
          </li>
        </ul>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    components: {},
    data () {
      return {
        findCenterSelect: this.apiPath.accu.findCenterSelect,
        custInfoSelectBox: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        findAreaList: this.apiPath.hrsc.findAreaList,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic,
        token: Cookie.get('Token'),
        payFeeArr: [],
        payWayArr: [],
//        yesNoArr: [],
        centerData: {areaId: ''},
        activeIndex: '',
        dropdown: false,
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        accuAcctForm: {
          custName: '',
          custId: '',
          accuAcctName: '',
          unitRegiNo: '',
          areaName: '',
          areaId: '',
          acctState: '',
          acctStateName: ''

        },
        leadsRules: {},
        SalesList: [], // 销售线索状态
        isA: true,
        tableData: null,
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
        },
        alertTitle: '',
        leadsAddForm: {
          custName: '',
          custId: '',
          certCode: '',
          accuAcctName: '',
          unitRegiNo: '',
          perProp: '',
          corpProp: '',
          accuOpenAcctType: '',
          accuOpenAcctTypeName: '',
          areaName: '',
          areaId: '',
          payFeeWay: '',
          centerName: '',
          centerId: '',
          payWay: '',
          payFeeBankName: '',
          payFeeBankId: '',
          payFeeAcctName: '',
          payFeeBankAcct: '',
          chargeEndDay: '',
          remark: '',
          accuAcctMats: []

        },
        // 校验
        rules: {
          custName: [
            { required: true, message: '客户名称为必填项', trigger: 'change' }
          ],
          certCode: [
            { required: true, message: '统一社会信用代码为必填项', trigger: 'change' }
          ],
          accuAcctName: [
            { required: true, message: '公积金账户名称为必填项', trigger: 'change' }
          ],
          unitRegiNo: [
            { required: true, message: '单位公积金账号为必填项', trigger: 'change' }
          ],
          perProp: [
            { required: true, type: 'number', message: '个人比例为必填项', trigger: 'change' },
            { validator: this.validator.checkIntegerNum, trigger: 'change' }
          ],
          corpProp: [
            { required: true, type: 'number', message: '企业比例为必填项', trigger: 'change' },
            { validator: this.validator.checkIntegerNum, trigger: 'change' }
          ],
          areaName: [
            { required: true, message: '执行地区为必填项', trigger: 'change' }
          ],
          payFeeWay: [
            { required: true, type: 'number', message: '缴费方式为必填项', trigger: 'change' }
          ],
          centerName: [
            { required: true, message: '公积金管理中心为必填项', trigger: 'change' }
          ],
          payWay: [
            { required: true, type: 'number', message: '支付方式为必填项', trigger: 'change' }
          ],
          payFeeBankName: [
            { required: true, message: '付费银行名称为必填项', trigger: 'change' }
          ],
          payFeeAcctName: [
            { required: true, message: '付费账户名称为必填项', trigger: 'change' }
          ],
          payFeeBankAcct: [
            { required: true, message: '付费银行账号为必填项', trigger: 'change' }
          ],
          isBreakUpperLimt: [
            { required: true, type: 'number', message: '是否可突破上限为必填项', trigger: 'change' }
          ],
          chargeEndDay: [
            { required: true, type: 'number', message: '截单日为必填项', trigger: 'change' },
            {validator: this.validator.checkDateNum, trigger: 'change'}
          ]
        },
        seeForm: {},
        leadsAdd: false,
        seeItem: false,
        upFileArr: []
      };
    },
    created () {
      // 缴费方式
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'PAY_FEE_WAY'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.payFeeArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      // 支付方式
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'PAY_WAY'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.payWayArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      // 是否
//      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'YES_NO'}).then(res => {
//        if (res.code === 'CPYY-00001') {
//          this.yesNoArr = res.data.list;
//        }
//      }).catch(err => {
//        console.log(err);
//      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      areaChangeFun () {
        this.centerData.areaId = this.leadsAddForm.areaId;
      },
      resetSearchFun () {
        for (var key in this.accuAcctForm) {
          this.accuAcctForm[key] = '';
        }
      },
      centerChangeFun () {
        api.postsign(this.apiPath.accu.findMatByCenterId, {centerId: this.leadsAddForm.centerId, item: this.leadsAddForm.accuOpenAcctType}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.upFileArr = res.data;
            console.log(this.upFileArr);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      downLoadFile (id) {
        api.postsign(this.apiPath.accu.downloadEnc, id).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      activeUploadIndex (index) {
        this.activeIndex = index;
      },
      modifyClose () {
        this.activeIndex = '';
        this.leadsAddForm.accuAcctMats.splice(0);
        this.upFileArr = [];
        this.$refs.leadsAddForm.resetFields();
        this.leadsAddForm.unitRegiNo = '';
      },
      // 新增
      ctrlArray (index) {
        if (index === 0) {
          this.leadsAddForm.accuAcctMats.push({encId: "", encName: "", accuAcctMatType: "", accuAcctMatTypeName: ''});
        } else {
          this.leadsAddForm.accuAcctMats.splice(index, 1);
        }
      },
      // 上传
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.leadsAddForm.accuAcctMats[this.activeIndex].encName = file.name;
          this.leadsAddForm.accuAcctMats[this.activeIndex].encId = res.data;
        }
      },
      fileError (res) {
        this.$alert(res.message, '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      // 跟进销售线索方法
      handleCommand (command) {
        if (command === '2') {
          this.leadsAdd = true;
          let that = this;
          setTimeout(function () {
            that.alertTitle = '新增已有公积金账户';
            that.leadsAddForm.accuOpenAcctType = 2;
            that.leadsAddForm.accuOpenAcctTypeName = '转入';
//          this.leadsbtn = '确 定';
            that.leadsAddForm.payFeeWay = '';
            that.leadsAddForm.accuAcctMats = [{encId: "", encName: "", accuAcctMatType: "", accuAcctMatTypeName: ''}];
          }, 200);
        } else if (command === '3') {
          this.leadsAdd = true;
          let that = this;
          setTimeout(function () {
            that.alertTitle = '新增公积金账户';
            that.leadsAddForm.accuOpenAcctType = 1;
            that.leadsAddForm.accuOpenAcctTypeName = '新申请';
//          this.leadsbtn = '确 定';
            that.leadsAddForm.payFeeWay = 2;
            that.leadsAddForm.accuAcctMats = [{encId: "", encName: "", accuAcctMatType: "", accuAcctMatTypeName: ''}];
          }, 200);
        }
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: {
            outLine: '',
            corpName: '',
            clueState: '',
            clueStateName: '',
            trackResult: ''
          }
        };
        api.post(this.apiPath.accu.findAccuAcctAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
//            this.checkedArr = [];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchButFun () {
        this.pageNum = 1;
        this.searchFun();
      },
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.accuAcctForm
        };
        api.post(this.apiPath.accu.findAccuAcctAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
//            this.checkedArr = [];
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
      seeFun (data) {
        api.post(this.apiPath.accu.findAccuAcctSupport, {accuAcctId: data.accuAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = true;
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifyFun: function (data) {
        api.post(this.apiPath.accu.findAccuAcctSupport, {accuAcctId: data.accuAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let centerName = res.data.centerName;
            let centerId = res.data.centerId;
            let certCode = res.data.certCode;
            if (res.data.accuAcctMats.length === 0) {
              res.data.accuAcctMats.push({encId: "", encName: "", accuAcctMatType: "", accuAcctMatTypeName: ''});
            }
            this.leadsAdd = true;
            let that = this;
            setTimeout(function () {
              that.alertTitle = '修改公积金账户信息'; // 信息两字放不开，应该修改dialog，title宽度
//            that.leadsbtn = '修 改';
              that.leadsAddForm = JSON.parse(JSON.stringify(res.data));
              setTimeout(function () {
                that.leadsAddForm.centerName = centerName;
                that.leadsAddForm.centerId = centerId;
                that.leadsAddForm.certCode = certCode;
              }, 200);
            }, 200);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      commitFun: function (data) {
        api.post(this.apiPath.accu.updateAcctState, {accuAcctId: data.accuAcctId, acctState: data.acctState}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchButFun();
            this.$message({message: '提交成功！', type: 'success'});
          }
        });
      },
      delFun: function (data) {
        this.$confirm('确定要删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.accu.delAccuAcct, {accuAcctId: data.accuAcctId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchButFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      // 新增确定
      submitForm (formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.alertTitle.match('新增')) {
              if (type) {
                this.leadsAddForm.acctState = '';
              } else {
                this.leadsAddForm.acctState = 2;
              }
              api.post(this.apiPath.accu.addAccuAcct, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
                  this.$message({message: '新增成功！', type: 'success'});
                  if (this.$route.query.hashFlag) {
                    this.$router.push({path: '/custServTemplate/addCustServTemplate', query: {hashFlag: this.$route.query.hashFlag, resData: JSON.stringify(res.data), saveData: JSON.stringify(this.leadsAddForm), type: 'accu'}});
                  };
                  this.modifyClose();
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              if (type) {
                this.leadsAddForm.reacctState = '';
              } else {
                this.leadsAddForm.reacctState = 2;
              }
              api.post(this.apiPath.accu.updateAccuAcct, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
                  this.$message({message: '修改成功！', type: 'success'});
                  this.modifyClose();
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
      },
      searchCodeFun () {
        if (this.leadsAddForm.custId) {
          api.post(this.apiPath.hrsc.findCustCertCode, {custId: this.leadsAddForm.custId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.leadsAddForm.certCode = res.data.certCode;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
