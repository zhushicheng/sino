<template>
  <!--社保账户管理-->
  <div class="leads usermanage">
    <sino-con>
      <sino-title type="levelOne" title="客户社保账户查询"></sino-title>
      <sino-form :model="sinsAcctForm" ref="ruleForm" class="serch-form leads-serch-form">
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
                           :token="token"
                           :url="custInfoSelectBox"
                           :chooseName.sync="sinsAcctForm.custName"
                           :chooseId.sync="sinsAcctForm.custId" :clear="true"
              ></sino-select>
            </li>
            <li class="search-inner-name">
              <span class="search-inner-name">社保账户名称：</span>
              <sino-input class="fl" type="text" v-model="sinsAcctForm.sinsAcctName"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">单位社保账号：</span>
              <sino-input class="fl" type="text" v-model="sinsAcctForm.unitSinsNo"></sino-input>
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
                           :chooseName.sync="sinsAcctForm.areaName"
                           :chooseId.sync="sinsAcctForm.areaId"
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
                           :data="{code: 'SINS_ACCT_STATE'}"
                           :token="token"
                           :chooseName.sync="sinsAcctForm.sinsAcctStateName"
                           :chooseId.sync="sinsAcctForm.sinsAcctState" :clear="true"
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
                <i class="iconfont sino-add"></i>新增社保账户<i class="iconfont sino-unie628"></i>
              </span>
            <sino-dropdown-menu style="width:155px;">
              <sino-dropdown-item command="2" class="dropdown-item-no-border">已有社保账户</sino-dropdown-item>
              <sino-dropdown-item command="3" class="dropdown-item-no-border">新申请社保账户</sino-dropdown-item>
            </sino-dropdown-menu>
          </sino-dropdown>
        </div>
      </div>
      <sino-table :data="tableData"  v-on:viewAll="viewAll" stripe border max-height="416">
        <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
        <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="140"></sino-table-column>
        <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="300"></sino-table-column>
        <sino-table-column prop="areaName" label="执行地区" min-width="110"></sino-table-column>
        <sino-table-column prop="ssbName" label="所属社保局" min-width="180"></sino-table-column>
        <sino-table-column prop="sinsAcctStateName" label="账户状态" min-width="100"></sino-table-column>
        <sino-table-column prop="corpInjProp" label="企业工伤比例（%）" min-width="150"></sino-table-column>
        <sino-table-column prop="retReason" label="退回原因" min-width="170"></sino-table-column>
        <sino-table-column label="操作" align="center" width="180" fixed="right">
          <template scope="scope">
            <div v-if="scope.row.oper === true">
              <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.sinsAcctState === 1  || scope.row.sinsAcctState === 4">|</i>
              <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.sinsAcctState === 1  || scope.row.sinsAcctState === 4">修改</span><i class="table-i" v-if="scope.row.sinsAcctState === 1  || scope.row.sinsAcctState === 4">|</i>
              <span class="table-span" @click="commitFun(scope.row)" v-if="scope.row.sinsAcctState === 1  || scope.row.sinsAcctState === 4">提交</span><i class="table-i" v-if="scope.row.sinsAcctState === 1  || scope.row.sinsAcctState === 4">|</i>
              <span class="table-span" @click="delFun(scope.row)" v-if="scope.row.sinsAcctState === 1 || scope.row.sinsAcctState === 4 ">删除</span>
            </div>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="total"></sino-page>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="leadsAdd"  size="large" v-on:close="modifyClose" :top="'2%'" dialogHide class="accuman-add-layer accuman-footer-margin">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="leadsAddForm" :rules="rules" ref="leadsAddForm" class="leadsAdd-Form">
          <sino-form-item label="客户名称：" prop="custName" class="first-select-item">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :token="token"
                         :url="custInfoSelectBox"
                         :chooseName.sync="leadsAddForm.custName"
                         :chooseId.sync="leadsAddForm.custId" :clear="true"
                         @change="searchCodeFun"
          ></sino-select>
          </sino-form-item>
          <sino-form-item label="统一社会信用代码：" prop="certCode">
            <sino-input v-model="leadsAddForm.certCode"></sino-input>
          </sino-form-item>
          <sino-form-item label="社保账户名称：" prop="sinsAcctName">
            <sino-input v-model="leadsAddForm.sinsAcctName"></sino-input>
          </sino-form-item>
          <sino-form-item label="单位社保账号：" prop="unitSinsNo" v-if="hideItem">
            <sino-input v-model="leadsAddForm.unitSinsNo"></sino-input>
          </sino-form-item>
          <sino-form-item label="执行地区：" prop="areaName" class="short-margin-bottom first-select-item">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                         :chooseName.sync="leadsAddForm.areaName" :chooseId.sync="leadsAddForm.areaId"
                         :clear="true" :url="findAreaList" :data="{data:{areaTypes: [4,5,6]}}" @change="areaChangeFun"></sino-select>
          </sino-form-item>
          <sino-form-item label="开户类型：" prop="sinsOpenAcctTypeName">
            <sino-input v-model="leadsAddForm.sinsOpenAcctTypeName" :disabled="true"></sino-input>
          </sino-form-item>
          <sino-form-item label="所属社保局：" prop="ssbName" class="short-margin-bottom first-select-item">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :linkage="true"
                         :chooseName.sync="leadsAddForm.ssbName" :chooseId.sync="leadsAddForm.ssbId" :data="ssbData"
                         :clear="true" :url="findSsbSelectBox" @change="ssbChangeFun"></sino-select>
          </sino-form-item>
          <sino-form-item label="缴费方式：" prop="payFeeWay">
            <sino-radio v-for="(item, index) in payFeeArr" :key="index"
                        v-model.number="leadsAddForm.payFeeWay"
                        :label="item.id" v-if="((item.id===2) && alertTitle === '新增社保账户') || (alertTitle !== '新增社保账户')">{{item.title}}</sino-radio>
          </sino-form-item>
          <sino-form-item label="支付方式：" prop="payWay">
            <sino-radio v-for="(item, index) in payWayArr" :key="index"
                        v-model.number="leadsAddForm.payWay"
                        :label="item.id">{{item.title}}</sino-radio>
          </sino-form-item>
          <sino-form-item label="付费方式：" prop="ssbChargeWay">
            <sino-radio v-for="(item, index) in ssbChargeWayArr" :key="index"
                        v-model.number="leadsAddForm.ssbChargeWay"
                        :label="item.id">{{item.title}}</sino-radio>
          </sino-form-item>
          <sino-form-item label="截单日：" prop="chargeEndDay">
            <sino-popover ref="popover1" :popper-class="'questionTip'"placement="bottom-start" trigger="hover" content="贵阳外服与客户约定的每月社保申报的截止日，如果委托日期超过该日期，则改成下月申报。"></sino-popover>
            <i class="iconfont sino-fangxingwenhao chargeTipbox" v-popover:popover1 style="left:-90px;"></i>
            <sino-input v-model.number="leadsAddForm.chargeEndDay"></sino-input>
          </sino-form-item>
          <sino-form-item label="约定付费日：" prop="payFeeDay" v-if="leadsAddForm.ssbChargeWay === 1">
            <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" trigger="hover" content="社保账户开户时，如果企业向社保局的付费方式选择“正常付费”，所约定的每月企业向社保局付款的日期。"></sino-popover>
            <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover2 style="left:-137px;"></i>
            <sino-input v-model.number="leadsAddForm.payFeeDay"></sino-input>
          </sino-form-item>
          <sino-form-item label="付费银行名称：" prop="payFeeBankName" class="short-margin-bottom first-select-item" v-if="leadsAddForm.ssbChargeWay === 2">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false"
                         :disabled="false" :totalNum="false" :isPage="true" :isGroup="false"
                         :chooseName.sync="leadsAddForm.payFeeBankName" :chooseId.sync="leadsAddForm.payFeeBankId"
                         :clear="true" :url="bankInfoDropdown" :data="{data:{}}"></sino-select>
          </sino-form-item>
          <sino-form-item label="付费账户名称：" prop="payFeeAcctName" v-if="leadsAddForm.ssbChargeWay === 2">
            <sino-input v-model="leadsAddForm.payFeeAcctName"></sino-input>
          </sino-form-item>
          <sino-form-item label="付费银行账号：" prop="payFeeBankAcct" v-if="leadsAddForm.ssbChargeWay === 2">
            <sino-input v-model="leadsAddForm.payFeeBankAcct"></sino-input>
          </sino-form-item>
          <sino-form-item label="参保险种：" prop="proPaysList" class="sino-form-item-width long-no-bottom">
            <sino-checkbox-group v-model="leadsAddForm.proPaysList" class="proPaysList-checkbox" @change="proPayChange">
              <sino-checkbox :label="item.proPayId" v-for="(item, index) in proPayTypeArr" :key="index">{{item.proPayName}}</sino-checkbox>
            </sino-checkbox-group>
          </sino-form-item>
          <sino-form-item label="企业工伤比例(%)：" prop="corpInjProp" v-if="leadsAddForm.proPaysList.indexOf(2) !== -1">
            <sino-input v-model.number="leadsAddForm.corpInjProp"></sino-input>
          </sino-form-item>
        </sino-form>
        <div class="sino-form-item sino-form-item-width long-no-bottom" v-for="(item, index) in leadsAddForm.matsList" :key="index">
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
                             :chooseName.sync="leadsAddForm.matsList[index].sinsAcctMatTypeName"
                             :chooseId.sync="leadsAddForm.matsList[index].sinsAcctMatType" :clear="true"
                ></sino-select>
              </div>
              <div class="after-block upload-block fl">
                <sino-upload ref="leftTreeUpload"
                           :action="uploadFilePublic"
                           :show-file-list="false"
                           :auto-upload="true"
                           :on-success="fileSuccess"
                           :on-error="fileError">
                  <div slot="trigger" @click="activeUploadIndex(index)">
                  <input class="uploadFileBox" type="text" v-model="leadsAddForm.matsList[index].encName" readonly="true"/>
                  <div class="chooseFileButton chooseFileButton1">上传</div>
                </div>
                </sino-upload>
                <span class="count-span-oper" @click="ctrlArray (index) "><i class="iconfont" :class="{'sino-add' : index === 0, 'sino-reduce': index !== 0}" style="margin-left:10px;"></i> {{index === 0? '新增':'删除'}} </span>
              </div>
            </div>
        </div>
        <div class="sino-form-item sino-form-item-width">
          <label class="sino-form-item-label">备注：</label>
          <div class="sino-form-item-content">
            <sino-input type="textarea" v-model="leadsAddForm.remark" :disabled="false"></sino-input>
          </div>
        </div>
        <div class="suppcont-tip fl" v-if="(leadsAddForm.ssbId === 0 || leadsAddForm.ssbId) && tipArr && tipArr.length > 0">
          <i class="iconfont sino-tip"></i><span style="color:#666">所需材料列表：<em v-for="(item, index) in tipArr" :key="index"><span v-if="index !==0" style="color:#ddd">|</span>{{item.matDesc}}</em></span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button @click="submitForm('leadsAddForm', true)">保 存</sino-button>
        <sino-button type="primary" @click="submitForm('leadsAddForm', false)" class="ml20">提交经办员</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc" top="7%">
      <sino-title slot="title" type="levelOne" title="查看社保账户信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>客户名称</h6><input v-model="seeForm.custName">
          </li>
          <li>
            <h6>统一社会信用代码</h6><input v-model="seeForm.certCode">
          </li>
          <li>
            <h6>社保账户名称</h6><input v-model="seeForm.sinsAcctName">
          </li>
          <li>
            <h6>单位社保账号</h6><input v-model="seeForm.unitSinsNo">
          </li>
          <li>
            <h6>执行地区</h6><input v-model="seeForm.areaName">
          </li>
          <li>
            <h6>开户类型</h6><input v-model="seeForm.sinsOpenAcctTypeName">
          </li>
          <li>
            <h6>所属社保局</h6><input v-model="seeForm.ssbName">
          </li>
          <li>
            <h6>缴费方式</h6><input v-model="seeForm.payFeeWayName">
          </li>
          <li>
            <h6>支付方式</h6><input v-model="seeForm.payWayName">
          </li>
          <li>
            <h6>付费方式</h6><input v-model="seeForm.ssbChargeWayName">
          </li>
          <li>
            <h6>截单日</h6><input v-model="seeForm.chargeEndDay">
          </li>
          <li v-if="seeForm.ssbChargeWay === 1">
            <h6>约定付费日</h6><input v-model="seeForm.payFeeDay">
          </li>
          <li v-if="seeForm.ssbChargeWay === 2">
            <h6>付费银行名称</h6><input v-model="seeForm.payFeeBankName">
          </li>
          <li v-if="seeForm.ssbChargeWay === 2">
            <h6>付费账户名称</h6><input v-model="seeForm.payFeeAcctName">
          </li>
          <li v-if="seeForm.ssbChargeWay === 2">
            <h6>付费银行账号</h6><input v-model="seeForm.payFeeBankAcct">
          </li>
          <li>
            <h6>创建人</h6><input v-model="seeForm.creRoleName">
          </li>
          <li>
            <h6>创建时间</h6><input v-model="seeForm.creTime">
          </li>
          <li v-if="seeForm.proPaysList.indexOf(2)!==-1" class="li-last">
            <h6>企业工伤比例(%)</h6><input v-model="seeForm.corpInjProp">
          </li>
          <li class="li-last">
            <h6>参保险种</h6><input v-model="seeForm.proPays">
          </li>
          <li class="li-last">
            <h6>上传附件</h6><span><i class="iconfont sino-qubiezhen download-see-item" v-for="(item, index) in seeForm.matsList" :key="index"><em>&nbsp;</em>{{item.encName}}<em class="em-item-download" @click="downLoadFile(item.encId)">下载</em></i></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><input v-model="seeForm.remark">
          </li>
          <li v-if="seeForm.sinsAcctState === 4">
            <h6>退回人</h6><input v-model="seeForm.retName">
          </li>
          <li v-if="seeForm.sinsAcctState === 4">
            <h6>退回时间</h6><input v-model="seeForm.retTime">
          </li>
          <li v-if="seeForm.sinsAcctState === 4" class="li-last">
            <h6>退回原因</h6><input v-model="seeForm.retReason">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="seeItem = false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';

  import Vue from 'vue';
  export default {
    data () {
      return {
        findSsbSelectBox: this.apiPath.sins.findSsbSelectBox,
        custInfoSelectBox: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        findAreaList: this.apiPath.hrsc.findAreaList,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic,
        token: Cookie.get('Token'),
        activeIndex: '',
        payFeeArr: [],
        payWayArr: [],
        yesNoArr: [],
        ssbChargeWayArr: [],
        proPayTypeArr: [],
        dropdown: false,
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        sinsAcctForm: {
          custName: '',
          custId: '',
          sinsAcctName: '',
          unitSinsNo: '',
          areaName: '',
          areaId: '',
          sinsAcctStateName: '',
          sinsAcctState: ''
        },
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
        ssbData: {areaId: ''},
        tipArr: [],
        alertTitle: '', // 弹层title
        leadsAddForm: {
          custName: '',
          custId: '',
          certCode: '',
          sinsAcctName: '',
          unitSinsNo: '',
          areaName: '',
          areaId: '',
          sinsOpenAcctType: '',
          sinsOpenAcctTypeName: '',
          ssbName: '',
          ssbId: '',
          payFeeWay: '',
          payWay: '',
          ssbChargeWay: '',
          chargeEndDay: '',
          payFeeDay: '',
          payFeeBankName: '',
          payFeeBankId: '',
          payFeeAcctName: '',
          payFeeBankAcct: '',
          corpInjProp: 0.1,
          proPaysList: [],
          matsList: [
            {encId: "", encName: "", sinsAcctMatType: "", sinsAcctMatTypeName: ''}
          ],
          allProPayIds: []
        },
        // 校验是否为必填项
        rules: {
          custName: [
            { required: true, message: '客户名称为必填项', trigger: 'change' }
          ],
          certCode: [
            { required: true, message: '统一社会信用代码为必填项', trigger: 'change' }
          ],
          sinsAcctName: [
            { required: true, message: '社保账户名称为必填项', trigger: 'change' }
          ],
          unitSinsNo: [
            { required: true, message: '单位社保账号为必填项', trigger: 'change' }
          ],
          areaName: [
            { required: true, message: '执行地区为必填项', trigger: 'change' }
          ],
          sinsOpenAcctTypeName: [
            { required: true,  message: '开户类型为必填项', trigger: 'change' }
          ],
          ssbName: [
            { required: true,  message: '所属社保局为必填项', trigger: 'change' }
          ],
          payFeeWay: [
            { required: true, type: 'number', message: '缴费方式为必填项', trigger: 'change' }
          ],
          payWay: [
            { required: true, type: 'number', message: '支付方式为必填项', trigger: 'change' }
          ],
          corpInjProp: [
            { required: true, type: 'number', message: '支付比例为必填项', trigger: 'change' },
            {validator: this.validator.checkFloatIntNum, trigger: 'change'}
          ],
          payFeeDay: [
            { required: true, type: 'number', message: '约定付费日为必填项', trigger: 'change' },
            {validator: this.validator.checkDateNum, trigger: 'change'}
          ],
          chargeEndDay: [
            { required: true, type: 'number', message: '截单日为必填项', trigger: 'change' },
            {validator: this.validator.checkDateNum, trigger: 'change'}
          ],
          ssbChargeWay: [
            { required: true, type: 'number', message: ' 付费方式为必填项', trigger: 'change' }
          ],
          payFeeBankName: [
            { required: true, message: ' 付费银行名称为必填项', trigger: 'change' }
          ],
          payFeeAcctName: [
            { required: true, message: ' 付费账户名称为必填项', trigger: 'change' }
          ],
          payFeeBankAcct: [
            { required: true, message: ' 付费银行账号为必填项', trigger: 'change' }
          ]
        },
        seeForm: {
          proPaysList: []
        },
        leadsAdd: false,
        seeItem: false,
        hideItem: '',
        payHideItem: '' // 查看社保账户信息时，根据付费方式判断显示的内容
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
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'YES_NO'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.yesNoArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      // 付费方式
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'SSB_CHARGE_WAY'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.ssbChargeWayArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      // 代收代付项
      api.post(this.apiPath.hrsc.findProPaySins, {}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.proPayTypeArr = res.data;
          this.allProPayIds = this.proPayTypeArr.map(function (item) {
            return item.proPayId;
          });
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
      areaChangeFun () {
        this.ssbData.areaId = this.leadsAddForm.areaId;
      },
      resetSearchFun () {
        for (var key in this.sinsAcctForm) {
          this.sinsAcctForm[key] = '';
        }
      },
      // 所属社保局
      ssbChangeFun () {
        if (this.leadsAddForm.ssbId === 0 || this.leadsAddForm.ssbId) {
          api.post(this.apiPath.sins.findBySsbId, {ssbId: this.leadsAddForm.ssbId, item: this.leadsAddForm.sinsOpenAcctType}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.tipArr = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      proPayChange () {
        if (this.leadsAddForm.proPaysList.indexOf(2) !== -1) {
          this.leadsAddForm.corpInjProp = 0.1;
        } else {
          this.leadsAddForm.corpInjProp = '';
        }
      },
      downLoadFile (id) {
        api.postsign(this.apiPath.sins.downloadSinsAcctMat, id).then(res => {
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
        this.$refs.leadsAddForm.resetFields();
        this.activeIndex = '';
        this.leadsAddForm.matsList =  [{encId: "", encName: "", sinsAcctMatType: "", sinsAcctMatTypeName: ''}];
        this.tipArr = [];
        this.leadsAddForm.payFeeBankName = '';
        this.leadsAddForm.payFeeBankId = '';
        this.leadsAddForm.payFeeAcctName = '';
        this.leadsAddForm.payFeeBankAcct = '';
        this.leadsAddForm.remark = '';
      },
      // 新增
      ctrlArray (index) {
        if (index === 0) {
          this.leadsAddForm.matsList.push({encId: "", encName: "", sinsAcctMatType: "", sinsAcctMatTypeName: ''});
        } else {
          this.leadsAddForm.matsList.splice(index, 1);
        }
      },
      // 上传
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.leadsAddForm.matsList[this.activeIndex].encName = file.name;
          this.leadsAddForm.matsList[this.activeIndex].encId = res.data;
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
        this.leadsAddForm.proPaysList = this.allProPayIds;
        if (command === '2') {
          this.hideItem = true;
          this.leadsAdd = true;
          this.alertTitle = '新增已有社保账户';
          this.leadsAddForm.sinsOpenAcctType = 2;
          this.leadsAddForm.sinsOpenAcctTypeName = '转入';
//          this.leadsbtn = '确 定';
          this.leadsAddForm.payFeeWay = '';
        } else if (command === '3') {
          this.hideItem = false;
          this.leadsAdd = true;
          this.alertTitle = '新增社保账户';
          this.leadsAddForm.sinsOpenAcctType = 1;
          this.leadsAddForm.sinsOpenAcctTypeName = '新申请';
//          this.leadsbtn = '确 定';
          this.leadsAddForm.payFeeWay = 2;
        }
      },
      // 获取全部表格数 据
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
        api.post(this.apiPath.sins.findSinsAcctInfoPage, obj).then(res => {
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
          data: this.sinsAcctForm
        };
        api.post(this.apiPath.sins.findSinsAcctInfoPage, obj).then(res => {
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
        api.post(this.apiPath.sins.findSinsAcctInfo, {sinsAcctId: data.sinsAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = true;
            this.seeForm = res.data;
          }
          // 查看社保账户信息时，根据付费方式判断显示的内容
          this.seeForm.ssbChargeWayName === '正常付费' ? this.payHideItem = true : this.payHideItem = false;
        }).catch(err => {
          console.log(err);
        });
      },
      commitFun: function (data) {
        api.post(this.apiPath.sins.updateSinsAcctState, {sinsAcctId: data.sinsAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.searchButFun();
            this.$message({message: '提交成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifyFun: function (data) {
        api.post(this.apiPath.sins.findSinsAcctInfo, {sinsAcctId: data.sinsAcctId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.leadsAdd = true;
            let ssbName = res.data.ssbName;
            let ssbId = res.data.ssbId;
            let certCode = res.data.certCode;
            let that = this;
            setTimeout(function () {
              that.alertTitle = '修改社保账户管理信息'; // 信息两字放不开，应该修改dialog，title宽度
//            this.leadsbtn = '修 改';
              that.leadsAddForm = res.data;
              setTimeout(function () {
                that.leadsAddForm.ssbName = ssbName;
                that.leadsAddForm.ssbId = ssbId;
                that.leadsAddForm.certCode = certCode;
              });
              if (res.data.matsList && res.data.matsList.length === 0) {
                that.leadsAddForm.matsList = [{encId: "", encName: "", sinsAcctMatType: "", sinsAcctMatTypeName: ''}];
              }
            });
//            this.leadsAddForm.payFeeDay = new Date(this.leadsAddForm.payFeeDay);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      delFun: function (data) {
        this.$confirm('确定要删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.sins.deteleSinsAcctInfo, {sinsAcctId: data.sinsAcctId}).then(res => {
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
                this.leadsAddForm.sinsAcctState = 1;
              } else {
                this.leadsAddForm.sinsAcctState = 2;
              }
              api.post(this.apiPath.sins.saveSinsAcctInfo, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
                  this.$message({message: '新增成功！', type: 'success'});
                  if (this.$route.query.hashFlag) {
                    this.$router.push({path: '/custServTemplate/addCustServTemplate', query: {hashFlag: this.$route.query.hashFlag, resData: JSON.stringify(res.data), saveData: JSON.stringify(this.leadsAddForm), type: 'sins'}});
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              if (type) {
                this.leadsAddForm.sinsAcctState = 1;
              } else {
                this.leadsAddForm.sinsAcctState = 2;
              }
              api.post(this.apiPath.sins.updateSinsAcctInfo, this.leadsAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchButFun();
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
      },
      // 选择客户名称后带出统一社会信用代码
      searchCodeFun () {
        if (this.alertTitle === '新增已有社保账户' || this.alertTitle === '新增社保账户') {
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
    }
  };
</script>

