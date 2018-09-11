<template>
  <!--<div>公积金账户开户办理</div>-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="公积金账户查询"></sino-title>
      <sino-form :model="accuauditForm" ref="accuauditForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="li-wid mt0">
              <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findCustInfoSelectBoxAll"
                             :chooseName.sync="accuauditForm.custName"
                             :chooseId.sync="accuauditForm.custId"
                             :clear="true"
                             :token="token"
                             class="multiple-choice"
                ></sino-select>
              </sino-form-item>
            </li>
            <li class="li-wid">
              <sino-form-item label="公积金账户名称：" class="search-inner-item" prop="accuAcctName">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.accuAcctName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="单位公积金账号：" class="search-inner-item" prop="unitRegiNo">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.unitRegiNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="账户状态：" class="search-inner-item" prop="acctStateName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'SUPPORT_ACCT_STATE'}"
                             :chooseName.sync="accuauditForm.acctStateName"
                             :chooseId.sync="accuauditForm.acctState"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="开户类型：" class="search-inner-item" prop="accuOpenAcctTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'SINS_OPEN_ACCT_TYPE'}"
                             :chooseName.sync="accuauditForm.accuOpenAcctTypeName"
                             :chooseId.sync="accuauditForm.accuOpenAcctType"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="执行城市：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="accuauditForm.areaName"
                             :chooseId.sync="accuauditForm.areaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="业务员：" class="search-inner-item" prop="creName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findAccuCreaName"
                             :chooseName.sync="accuauditForm.creName"
                             :chooseId.sync="accuauditForm.creId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetForm('accuauditForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total sino-table-no-top">
        <sino-table :data="sinsDeclData" border max-height="416" stripe v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="accuAcctId" label="账户编号" min-width="120"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="120"></sino-table-column>
          <sino-table-column prop="unitRegiNo" label="单位公积金账号" min-width="120"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="120"></sino-table-column>
          <sino-table-column prop="payFeeWayName" label="缴费方式" min-width="100"></sino-table-column>
          <sino-table-column prop="accuProp" label="公积金比例(%)" min-width="150"></sino-table-column>
          <sino-table-column prop="accuOpenAcctTypeName" label="开户类型" min-width="120"></sino-table-column>
          <sino-table-column prop="acctStateName" label="账户状态" min-width="120"></sino-table-column>
          <sino-table-column prop="creName" label="业务员" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <span class="table-span" @click="transFun(scope.row)" v-if="scope.row.acctState === 2">办理</span><i class="table-i" v-if="scope.row.acctState === 2">|</i>
                <span class="table-span" @click="backFun(scope.row)" v-if="scope.row.acctState === 2">退回</span><i class="table-i" v-if="scope.row.acctState === 2">|</i>
                <span class="table-span" @click="seeFun(scope.row)">查看</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--办理-->
    <sino-dialog :visible.sync="transFormFlag" size="large"  class="dialog-height" @close ="cleanContent('transForm')">
      <sino-title slot="title" type="levelOne" title="公积金账户信息确认" class="sino-dialog-title"></sino-title>
      <sino-form :model="transForm" :rules="transRules" ref="transForm" class="demo-transForm">
        <sino-form-item label="公积金账户名称：" class="sino-from-wid" prop="accuAcctName">
          <sino-input v-model="transForm.accuAcctName"></sino-input>
        </sino-form-item>
        <sino-form-item label="单位公积金账号："  prop="unitRegiNo">
          <sino-input v-model="transForm.unitRegiNo"></sino-input>
        </sino-form-item>
        <sino-form-item label="公积金比例（%）："  prop="contTel" class="accu-proportion label-width-42">
          <sino-form-item prop="corpProp" label="企业" class="two-half-form-item two-half-width">
            <sino-input v-model.number="transForm.corpProp"></sino-input>
          </sino-form-item>
          <sino-form-item prop="perProp" label="个人" class="two-half-form-item two-half-width">
            <sino-input v-model.number="transForm.perProp"></sino-input>
          </sino-form-item>
        </sino-form-item>
        <sino-form-item label="统一社会信用代码：">
          <sino-input v-model="transForm.certCode" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="执行地区：">
          <sino-input v-model="transForm.areaName" :disabled="true"></sino-input>
        </sino-form-item>
        <sino-form-item label="业务员：">
          <sino-input v-model="transForm.creName" :disabled="true"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitTransForm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--退回-->
    <sino-dialog :visible.sync="backFormFlag" size="large"  class="dialog-height" @close ="cleanContent('backForm')">
      <sino-title slot="title" type="levelOne" title="退回原因" class="sino-dialog-title"></sino-title>
      <sino-form :model="backForm" ref="backForm" class="demo-transForm" >
        <sino-form-item label="退回原因：" class="sino-from-wid" prop="retReason" :rules="[{ required: true, message: '退回原因为必填项', trigger: 'change' }]">
          <sino-input v-model="backForm.retReason" type="textarea" class="text-area-min120"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitBackForm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->，
    <sino-dialog :visible.sync="seeItemFlag" size="small" class="see-dirc" top="5%">
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
            <h6>公积金管理中心</h6><span v-text="seeForm.accuCenterName"></span>
          </li>
          <li>
            <h6>付费银行账号</h6><span v-text="seeForm.payFeeBankAcct"></span>
          </li>
          <li>
            <h6>付费账户名称</h6><span v-text="seeForm.payFeeAcctName"></span>
          </li>
          <li>
            <h6>截单日</h6><span v-text="seeForm.chargeEndDay"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeForm.creTime"></span>
          </li>
          <li>
            <h6>退回人</h6><span v-text="seeForm.retPeople"></span>
          </li>
          <li>
            <h6>退回时间</h6><span v-text="seeForm.retTime"></span>
          </li>
          <li class="li-last">
            <h6>退回原因</h6><span v-text="seeForm.retReason"></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeForm.remark"></span>
          </li>
          <li class="li-last see-auto-li clearfix">
            <h6>上传材料</h6>
            <span v-if="seeForm.accuAcctMats">
              <i class="iconfont sino-qubiezhen download-see-item" v-for="(item, index) in seeForm.accuAcctMats" :key="index">
                {{item.accuAcctMatTypeName}}<em class="em-item-download" @click="downLoadFile(item.encId)">下载</em>
              </i>
            </span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary"  @click="seeItemFlag = false">确 定</sino-button>
        </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  export default {
    data () {
      return {
        token: Cookie.get("Token"),
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        findUserRoleByOrgAndRoleType: this.apiPath.author.findUserRoleByOrgAndRoleType,
        findCustInfoSelectBoxAll: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        findHandleSinsAcctInfoPage: this.apiPath.sins.findHandleSinsAcctInfoPage,
        findAccuCreaName: this.apiPath.accu.findAccuCreaName,
        accuauditForm: {
          custName: '',
          custId: '',
          accuAcctName: '',
          unitRegiNo: '',
          acctStateName: '开户中',
          acctState: 2,
          accuOpenAcctTypeName: '',
          accuOpenAcctType: '',
          areaName: '',
          areaId: '',
          creName: '',
          creId: ''
        },
        sinsDeclData: null, // 养老
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
        seeItem: {},
        transFormFlag: false,
        transForm: {
          accuAcctName: '',
          unitRegiNo: '',
          corpProp: '',
          perProp: ''
        },
        transRules: {
          accuAcctName: [
            { required: true, message: '公积金账户名称为必填项', trigger: 'change' }
          ],
          unitRegiNo: [
            { required: true, message: '单位公积金账号为必填项', trigger: 'change' }
          ],
          corpProp: [
            { required: true, type: 'number', message: '企业公积金缴纳比例为必填项', trigger: 'change' }
          ],
          perProp: [
            { required: true, type: 'number', message: '个人公积金缴纳比例为必填项', trigger: 'change' }
          ]
        },
        backFormFlag: false,
        backForm: {
          accuAcctId: '',
          retReason: ''
        },
        backRules: [],
        seeItemFlag: false,
        seeForm: {}
      };
    },
    created () {
      api.post(this.dictSelUrl, {code: 'REPORT_TYPE'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.declareTypeArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.accuauditForm
        };
        api.post(this.apiPath.accu.findAccuAcctByState, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 下载
      downLoadFile (id) {
        api.postsign(this.apiPath.sins.downloadSinsAcctMat, id).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun () {
        this.$refs.accuauditForm.resetFields();
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.accuauditForm.acctStateName = '';
        this.accuauditForm.acctState = '';
      },
      transFun: function (data) {
        api.post(this.apiPath.accu.findAccuAcctSupport, {accuAcctId: data.accuAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.transForm = res.data;
            this.transFormFlag = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      backFun: function (data) {
        this.backForm.accuAcctId = data.accuAcctId;
        this.backFormFlag = true;
      },
      seeFun: function (data) {
        api.post(this.apiPath.accu.findAccuAcctSupport, {accuAcctId: data.accuAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItemFlag = true;
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      cleanContent: function (formName) {
        this.$refs[formName].resetFields();
      },
      submitTransForm: function () {
        this.$refs.transForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.accu.updateAcctStateHandle, this.transForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.transFormFlag = false;
                this.$message({message: '办理成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      submitBackForm: function () {
        this.$refs.backForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.accu.updateAcctStateDet, this.backForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.backFormFlag = false;
                this.$message({message: '退回成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
