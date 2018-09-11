<template>
  <!--申请财务支付-->
  <div>
    <div class="usermanage">
      <!--查询-->
      <sino-con>
        <sino-title type="levelOne" title="申请财务支付查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="单位社保账号：" class="search-inner-item" prop="unitSinsNo">
                  <sino-input class="fl" type="text"
                              v-model="searchForm.unitSinsNo"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="社保账户名称：" class="search-inner-item" prop="sinsAcctName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="sinsUrl"
                                 :token="token"
                                 :chooseName.sync="searchForm.sinsAcctName"
                                 :chooseId.sync="searchForm.sinsAcctId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="areaName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="areaUrl"
                                 :data="{data:{areaTypes: [4, 5]}}"
                                 :chooseName.sync="searchForm.areaName"
                                 :chooseId.sync="searchForm.areaId"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <!--<li>-->
                <!--<sino-form-item label="审核状态：" class="search-inner-item" prop="eavStateName">-->
                  <!--<div class="search-inner-radio fl">-->
                    <!--<sino-select :filterable="false"-->
                                 <!--:multiselect="false"-->
                                 <!--:isshowTotol="false"-->
                                 <!--:disabled="false"-->
                                 <!--:totalNum="false"-->
                                 <!--:isPage="false"-->
                                 <!--:isGroup="false"-->
                                 <!--:token="token"-->
                                 <!--:url="dicSelUrl"-->
                                 <!--:data="{code:'EAV_STATE'}"-->
                                 <!--:chooseName.sync="searchForm.eavStateName"-->
                                 <!--:chooseId.sync="searchForm.eavState"-->
                                 <!--:clear="true"></sino-select>-->
                  <!--</div>-->
                <!--</sino-form-item>-->
              <!--</li>-->
              <li>
                <sino-form-item label="支付进度：" class="search-inner-item" prop="reimPayStateName">
                  <div class="search-inner-radio fl">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="dicSelUrl"
                                 :data="{code:'PAY_SCHEDULE'}"
                                 :chooseName.sync="searchForm.reimPayStateName"
                                 :chooseId.sync="searchForm.reimPayState"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="申报年月：" class="search-inner-item" prop="executeMon">
                  <sino-date-picker
                    v-model="searchForm.executeMon"
                    type="month"
                    :editable="false"
                    :readonly="false">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="    " class="search-inner-item" prop="fiveOneInsure">
                  <sino-checkbox v-model="searchForm.fiveOneInsure">险种合一</sino-checkbox>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('searchForm')">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>

      <!--表格-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <!--表格上面的操作-->
          <div class="sino-table-icon">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="applyFun"><i class="iconfont sino-qian"></i>申请财务支付
              </sino-button>
              <!--<sino-button type="icon-text" @click="exportCost"><i class="iconfont sino-export"></i>导出费用报销单-->
              <!--</sino-button>-->
            </div>
          </div>
          <!--表格数据-->
          <sino-table :data="applicationData" stripe class="invsubData" border max-height="416" v-on:viewAll="viewAll" @select="selectTabelRow" @select-all="selectAll">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="120"></sino-table-column>
            <sino-table-column prop="sinsAcctName" label="社保账户名称" min-width="120"></sino-table-column>
            <sino-table-column prop="areaName" label="执行地区" min-width="180"></sino-table-column>
            <sino-table-column prop="executeMon" label="申报年月" min-width="120"></sino-table-column>
            <sino-table-column prop="proPayName" label="参保险种" min-width="95"></sino-table-column>
            <sino-table-column prop="payFeeAmo" type="money" label="缴费金额" width="150" align="center"></sino-table-column>
            <sino-table-column prop="payAmo" type="money" label="支付金额" align="center" width="150"></sino-table-column>
            <sino-table-column prop="reimOrderNo" label="费用报销单编号" min-width="160"></sino-table-column>
            <!--<sino-table-column prop="eavStateName" label="审核状态" min-width="120"></sino-table-column>-->
            <sino-table-column prop="reimPayStateName" label="支付进度" min-width="120"></sino-table-column>
            <sino-table-column prop="creName" label="申请人"></sino-table-column>
            <sino-table-column prop="creTime" label="申请时间" min-width="160"></sino-table-column>
            <sino-table-column label="操作" align="center" class="user-btns" min-width="180" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <!--<span class="table-span" @click="modifyFun(scope.row)">修改</span>-->
                  <span class="table-span" v-if="scope.row.reimPayState >= 5" @click="checkReimbursement(scope.row)">查看报销单</span><i v-if="scope.row.reimPayState >= 5" class="table-i">|</i>
                  <span class="table-span" v-if="scope.row.reimPayState >= 5" @click="seeDetail(scope.row)" >查看详情</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </div>
      </div>

      <!--申请财务支付弹层-->
      <sino-dialog :visible.sync="finaPaymentAddFlag" size="samll"  v-on:close="resetForm('finaPaymentAddForm')"  class="usermanage applyFina viewBox toview-box">
        <sino-title slot="title" type="levelOne" :title="!isCheckDetail?'申请支付':'查看详情'" class="sino-dialog-title"></sino-title>
        <div class="crumbs toview-bor" v-if="isCheckDetail && activeNode!=6">
          <!--通过                           审核                          未执行-->
          <ul>
            <li :class="{'li-finish': activeNode > 5, 'li-active': activeNode === 5, 'li-notthr': activeNode  < 5}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 5}">{{activeNode > 5? '':1}}</i>审批中</span></li>
            <li :class="{'li-finish': activeNode > 7, 'li-active': activeNode === 7, 'li-notthr': activeNode  < 7}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 7}">{{activeNode > 7? '':2}}</i>审批通过</span></li>
            <li :class="{'li-active': activeNode > 7, 'li-notthr': activeNode  <= 7}"><span ><i class="step-num iconfont" :class="">3</i>已支付/已退回/已退</span></li>
          </ul>
        </div>
        <div class="crumbs toview-bor" v-if="isCheckDetail && activeNode==6">
          <!--通过                           审核                          未执行-->
          <ul>
            <li :class="{'li-finish': activeNode > 5, 'li-active': activeNode === 5, 'li-notthr': activeNode  < 5}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 5}">{{activeNode > 5? '':1}}</i>申请支付</span></li>
            <li :class="{'li-active': activeNode === 6, 'li-notthr': activeNode  < 6}"><span ><i class="step-num iconfont" :class="">2</i>审批不通过</span></li>
          </ul>
        </div>
        <div class="usermanagement-modify1" style="margin-top: 20px">
          <sino-form :model="finaPaymentAddForm"   ref="finaPaymentAddForm" class="demo-ruleForm">
            <input type="hidden" v-model="finaPaymentAddForm.sinsAcctId"/>
            <input type="hidden" v-model="finaPaymentAddForm.proPayIdList"/>
            <!--查看详情-->
            <div class="usermanagement-list userManagement" v-if="finaPaymentAddFlag && finaupdate">
              <ul class="usermanagement-ul">
                <li class="usermanagement-li">
                  <h6>单位社保账号</h6><input disabled v-model="finaPaymentAddForm.unitSinsNo">
                </li>
                <li class="usermanagement-li">
                  <h6>社保账户名称</h6><input disabled v-model="finaPaymentAddForm.sinsAcctName">
                </li>
                <li class="usermanagement-li">
                  <h6>执行地区</h6><input disabled v-model="finaPaymentAddForm.areaName">
                </li>
                <li class="usermanagement-li">
                  <h6>申报年月</h6><input disabled v-model="finaPaymentAddForm.executeMon">
                </li>
                <li class="upload">
                  <h6 class="upload-H">上传文件</h6>
                  <div class="upload-Input" v-if="seeForm.fileName">
                      <i class="iconfont sino-qubiezhen"></i>
                      <em class="em-font">{{seeForm.fileName}}</em>
                      <em class="maincolor" @click="batchAllPreview(seeForm.fileId )">预览</em><em class="maincolor"> | </em><em class="maincolor" @click="batchAllDownload(seeForm.fileId)">下载</em>
                  </div>
                  <!--<input class="upload-Input" disabled v-model="batchApplyResult.fileName">-->
                </li>
              </ul>
            </div>
            <div v-if="finaPaymentAddFlag && finaPaymentupdate" >
              <sino-form-item label="单位社保账号："  prop="unitSinsNo">
                <sino-input class="fl" type="text"
                            v-model="finaPaymentAddForm.unitSinsNo"
                            :disabled="true"></sino-input>
              </sino-form-item>
              <sino-form-item label="社保账户名称："  prop="sinsAcctName">
                <sino-input class="fl" type="text"
                            v-model="finaPaymentAddForm.sinsAcctName"
                            :disabled="true"></sino-input>
              </sino-form-item>
              <sino-form-item label="执行地区："  prop="sinsAcctName">
                <sino-input class="fl" type="text"
                            v-model="finaPaymentAddForm.areaName"
                            :disabled="true"></sino-input>
              </sino-form-item>
              <sino-form-item label="申报年月：" prop="executeMon">
                <sino-date-picker
                  v-model="finaPaymentAddForm.executeMon"
                  type="month"
                  placeholder=""
                  :editable="false"
                  :readonly="false"
                  :clearable="true"
                  :disabled="true">
                </sino-date-picker>
              </sino-form-item>
              <sino-form-item prop="fileName" label="上传文件：" v-if="finaPaymentAddFlag && finaPaymentupdate" class="usermanage-pay">
                <sino-upload
                  ref="fileNameFile"
                  :action="fileAction"
                  :show-file-list="false"
                  :auto-upload="true"
                  :on-change="getFileName"
                  :on-success="fileSuccess"
                  :on-error="fileError"
                  :headers="uploadHeader"
                >
                  <div slot="trigger">
                    <input class="uploadFileBox" readonly="true" v-model="batchApplyResult.fileName"/>
                    <div class="chooseFileButton">上传</div>
                  </div>
                </sino-upload>
              </sino-form-item>
            </div>
            <div class="fnncPayAssistsForm">
            <sino-auto-table :data="finaPaymentAddForm.fnncPayAssists" stripe class="invsubData"  border max-height="236">
              <sino-table-column prop="propayName" label="参保险种" min-width="200"></sino-table-column>
              <sino-table-column prop="payFeeAmo"  type="money" label="缴费金额" width="200"></sino-table-column>
              <sino-table-column prop="payAmo" type="money" label="支付金额" :editType='true' width="200">
                <template scope="scope">
                  <sino-input v-if="!isCheckDetail" v-show="scope.row.edit"
                              v-model="scope.row.payAmo" @blur="scope.row.edit = false;" class="before"></sino-input>
                  <span v-if="!isCheckDetail" v-show="!scope.row.edit" @click="scope.row.edit = true;">{{ scope.row.payAmo }}</span>
                  <span v-if="isCheckDetail">{{ scope.row.payAmo }}</span>
                </template>
              </sino-table-column>
            </sino-auto-table>
          </div>
        </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" v-if="!isCheckDetail" @click="submitForm">生成报销单</sino-button>
          <sino-button type="primary" v-if="isCheckDetail" @click="finaPaymentAddFlag=false">关闭</sino-button>
        </span>
      </sino-dialog>
    </div>
    <!--查看报销单-->
    <sino-dialog :visible.sync="reimbFalg" size="large" class="mail-dialog see-dirc suppinfo-dialog-box accuapplypay big-supp-dialog" :top="'5%'">
      <sino-title slot="title" type="levelOne" :title="!isReimbursementDe? '费用报销单':'查看报销单'" class="sino-dialog-title"></sino-title>
      <div class="remib" style="width: 99%;">
        <!--头部-->
        <div class="remib-top">
          <!--标题-->
          <div class="remib-title">
            <h5>费用报销单</h5>
            <h3>报销日期
              <!--<input type="text" v-model.number="billDate.year"/>-->
              <span>{{expenInfoData.reimYear}}</span>
              年
              <span>{{expenInfoData.reimMon}}</span>
              <!--<input type="text" v-model.number=""/>-->
              月
              <span>{{expenInfoData.reimDay}}</span>
              <!--<input type="text" v-model.number="billDate.day"/>-->
              日
            </h3>
          </div>
          <!--编号-->
          <div class="reminb-Numbering" v-if="isReimbursementDe">
          报销单编号：<span>{{expenInfoData.reimOrderNo}}</span>
          </div>
        </div>
        <!--表格-->
        <div class="reminb-table">
          <!--表格上左-->
          <ul class="table-left fl">
            <li class="fl width-med lef-co">
              <h6>费 用 项 目</h6>
            </li>
            <li class="fl lef-co">
              <h6>类 别</h6>
            </li>
            <li class="fl lef-co">
              <h6>金 额</h6>
            </li>
            <div v-for="item in expenInfoData.fnncPayAssists">
              <li class="fl width-med" ><input v-if="!isReimbursementDe" v-model="item.feeItem" type="text" placeholder="可输入" />
                <span v-if="isReimbursementDe" v-text="item.feeItem"></span></li>
              <li class="fl" v-text="item.feeTypeName"></li>
              <li class="fl" v-text="item.payAmo"></li>
            </div>
            <div v-for=" n in interatorLen" :key="n">
              <li class="fl width-med" ></li>
              <li class="fl"></li>
              <li class="fl"></li>
            </div>
            <li class="fl width-med lef-co">
              <h6>报 销 金 额 合 计</h6>
            </li>
            <li class="fl"></li>
            <li class="fl">{{expenInfoData.payAmoTotal}}</li>
          </ul>
          <!--表格上右-->
          <ul class="table-right fl">
            <li class="fl right-tl right-t1">
              <h6>单 位 负 责 人</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null" @click="openSignFun">
              <!--{{expenInfoData.chargePerId}}-->
              <img :src="expenInfoData.chargePerId" style="width:100%;height:100%;" v-if="expenInfoData.chargePerId"/>
            </li>
            <li class="fl right-tl">
              <h6>审 查 意 见</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              {{expenInfoData.reviewPerId}}
              <!--<input type="text" placeholder="可输入" v-model="expenInfoData.reviewPerId"/>-->
            </li>
            <li class="fl right-tl right-t1">
              <h6>财 务 审 核</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              {{expenInfoData.fnncAppId}}
              <!--<input type="text" placeholder="可输入" v-model="expenInfoData.fnncAppId"/>-->
            </li>
            <li class="fl right-tl">
              <h6>部 门 审 查</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              {{expenInfoData.depAppId}}
              <!--<input type="text" placeholder="可输入" v-model="expenInfoData.depAppId"/>-->
            </li>
            <li class="fl right-meo bor-null">
              <span>￥</span><span>{{toMoney(expenInfoData.reimAmoTotal)}}</span>
            </li>
          </ul>
          <!--表格底部-->
          <ul class="table-bottom fl">
            <li class="fl bottom-f1 bor-null">
              <span class="fl meo-mar-le">核实金额（大写）
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 7)?toBigNum(expenInfoData.reimAmoTotal, 7):'零'}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 6)?toBigNum(expenInfoData.reimAmoTotal, 6):'零'}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 5)?toBigNum(expenInfoData.reimAmoTotal, 5):'零'}}</span>万
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 4)?toBigNum(expenInfoData.reimAmoTotal, 4):'零'}}</span>仟
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 3)?toBigNum(expenInfoData.reimAmoTotal, 3):'零'}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 2)?toBigNum(expenInfoData.reimAmoTotal, 2):'零'}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 1)?toBigNum(expenInfoData.reimAmoTotal, 1):'零'}}</span>元
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, -1)?toBigNum(expenInfoData.reimAmoTotal, -1):'零'}}</span>角
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, -2)?toBigNum(expenInfoData.reimAmoTotal, -2):'零'}}</span>分
              </span>
              <span class="fr mr10">￥ {{toMoney(expenInfoData.reimAmoTotal)}} 小写</span>
            </li>
            <li class="fl bottom-f2 bott-co">
              <h6>借款数</h6>
            </li>
            <li class="fl bottom-f3">
              {{expenInfoData.loanAmo}}
              <!--<input type="text" class="bill-input" placeholder="可输入" v-model="expenInfoData.loanAmo"/>-->
            </li>
            <li class="fl bottom-f3 bott-co">
              <h6>应退金额</h6>
            </li>
            <li class="fl bottom-f3">
              {{expenInfoData.refundAmo}}
              <!--<input type="text" class="bill-input" placeholder="可输入" v-model="expenInfoData.refundAmo"/>-->
            </li>
            <li class="fl bottom-f3 bott-co">
              <h6>应补金额</h6>
            </li>
            <li class="fl bottom-f3 bor-null">
              {{expenInfoData.patchAmo}}
              <!--<input type="text" class="bill-input" placeholder="可输入" v-model="expenInfoData.patchAmo"/>-->
            </li>
            <li class="fl bottom-f1 bor-null bottom-t1">
              <div class="fl">出纳：{{expenInfoData.cashierPerId}}</div>
              <div class="fl">经办人：{{expenInfoData.operatorId}}</div>
              <div class="fl">报销人：{{expenInfoData.reimPerId}}</div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" v-if="!isReimbursementDe"  @click="sureApplyPay">申请支付</sino-button>
        <sino-button type="primary" v-if="isReimbursementDe"  @click="sureApplyPay">申请支付</sino-button>
      </span>
    </sino-dialog>
    <!--签名-->
    <sino-dialog :visible.sync="signFlag" dialogHide class="dialog-sign" @open="singOpen" @close="signClose">
      <sino-title slot="title" type="levelOne" title="请签名" class="sino-dialog-title"></sino-title>
      <div id="sign-box">
        <span class="fr" @click="clearSign">清空</span>
        <canvas id="canvas" width="503" height="150"></canvas>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button @click="signSave" class="sign-button">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--预览-->
    <sino-dialog :visible.sync="browseFlag" size="small"  class="usermanage add-data-height dialog-com-tree-look-box toview-box apply-dialog-layer">
      <sino-title slot="title" type="levelOne" title="浏览" class="sino-dialog-title"></sino-title>
      <div class="img-margin">
        <img :src="browImgPath" class="size">
      </div>
    </sino-dialog>

  </div>
</template>

<script>
  import LZString from 'lz-string';
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  let checkedArr = [];
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.name.split('.')[1];
    let _arr = ['xlsx', 'xls'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    }  else {
      _this.$alert('请上传excel文件！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };
  let checkeditem = {};
  export default {
    data () {
      return {
        dicSelUrl: this.apiPath.hrsc.getDictSelectBox,   //  数据字典
        sinsUrl: this.apiPath.sins.findSinsAcctName,   //  社保
        areaUrl: this.apiPath.hrsc.findAreaList,   //  执行地区下拉框
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        token: Cookie.get('Token'),
        uploadHeader: {Token: ""},
        batchApplyResult: {
          accuAcctId: '',
          executeMon: '', // 执行月份
          payFeeAmo: '', // 缴费金额
          differNum: '',
          chargeAmo: '',
          payAmo: '', // 支付金额
          fileId: '', // 文件唯一号
          fileName: '' // 文件名称
        },
        seeForm: {
          unitRegiNo: '',
          accuAcctName: '',
          areaName: '',
          executeMon: '',
          defray: '',
          payAmo: '',
          reimPayState: '',
          reimPayStateName: '',
          fileName: '', // 文件唯一名
          fileId: '' // 文件唯一ID
        },
        browseFlag: false, // 预览的弹层
        browImgPath: '',  // 预览图片的地址
        searchForm: {  // 查询条件
          unitSinsNo: '',
          sinsAcctId: '',
          sinsAcctName: '',
          areaId: '',
          areaName: '',
          reimPayState: 4,
          reimPayStateName: '待申请支付',
          // eavState: '',
          // eavStateName: '',
          // payState: '',
          // payStateName: '',
          executeMon: '',
          fiveOneInsure: true // 五险不合一
        },
        applicationData: null, // 申请财务支付查询数据
        // 翻页
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        total: null,    // 控制翻页的显示与否
        // 申请财务支付弹层
        checkedArr: [],
        finaPaymentAddFlag: false, // 申请财务支付弹层显示与否
        finaPaymentupdate: false,
        finaupdate: false,
        finaPaymentAddForm: { // 申请财务支付弹层数据
          fnncPayAssists: [
            {
              propayName: '',
              payFeeAmo: '',
              payAmo: ''
            }
          ]
        },
        finaPaymentAddFormRules: {}, // 申请财务支付弹层参数是否必填
        bigNumArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        reimbFalg: false, // 费用单falg
        // 费用报销单数据
        expenInfoData: {},
        // 费用报销单数据
        isReimbursementDe: false,
        interatorLen: 5, // 循环次数
        activeNode: '',
        isCheckDetail: true,
        // 签名变量
        signFlag: false,
        bot: '', // 画布DOM
        coordinate: {
          x: '',
          y: '',
          x1: '',
          y1: ''
        },
        signContentFlag: 0,
        time: '',
        canvas: '',
        content: '',
        isMouseDown: false,
        base64Str: ''
      };
    },
    created () {
      this.uploadHeader.Token = Cookie.get('Token');
    },
    mounted () {
      this.searchFun();
      this.validator.addEnterEvent(this.searchFun);
      this.searchForm.executeMon = Date();
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      /*  预览 */
      batchAllPreview (id) {
        api.get(this.apiPath.file.preview, {"fileUniqueNo": id}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.browseFlag = true;
            this.browImgPath = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下载
      batchAllDownload (id) {
        api.get(this.apiPath.hrsc.invMatFileDownload, {"fileUniqueNo": id}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },

      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.batchApplyResult.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.activeOnyNum = res.data;
          this.batchApplyResult.fileId = res.data;
        } else {
          this.batchApplyResult.fileName = '';
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      fileError () {
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      openSignFun () {
        this.signFlag = true;
      },
      singOpen () {
        let that = this;
        setTimeout(function () {
          // 创建画布
          that.canvas = document.getElementById("canvas");
          that.canvas.width = '503';
          // 获取上下文
          that.context = that.canvas.getContext("2d");
          that.bot = document.getElementById("sign-box");
          that.bot.onmousedown = that.mouseDownAction;
          that.bot.onmousemove = that.mouseMoveAction;
          document.onmouseup = that.mouseUpAction;
        });
      },
      mouseDownAction (e) {
        this.isMouseDown = true;
        // 记录下鼠标点击的时候的位置
        this.coordinate.x = e.offsetX;
        this.coordinate.y = e.offsetY;
      },
      mouseMoveAction (e) {
        if (this.isMouseDown) {
          this.coordinate.x1 = e.offsetX;
          this.coordinate.y1 = e.offsetY;
          this.drowline(this.coordinate.x, this.coordinate.y, this.coordinate.x1, this.coordinate.y1);
          this.signContentFlag++;
        }
      },
      mouseUpAction () {
        this.isMouseDown = false;
        this.signContentFlag = 0;
      },
      drowline (num1, num2, num3, num4) {
        if (this.signContentFlag) {
          this.context.beginPath();
        }
        // 移动画笔的初始位置
        this.context.moveTo(num1, num2);
        this.context.lineWidth = 2;
        this.context.strokeStyle = "#000";
        // 移动画笔的结束位置
        this.context.lineTo(num3, num4);
        // 开始绘制
        this.context.stroke();
        if (this.signContentFlag != 0) {
          this.coordinate.x = this.coordinate.x1;
          this.coordinate.y = this.coordinate.y1;
        }
      },
      // 签名保存
      signSave () {
        this.base64Str = this.canvas.toDataURL("image/png", 0.5);
        this.expenInfoData.chargePerId = this.base64Str;
        this.signFlag = false;
      },
      signClose () {
        this.clearSign();
      },
      clearSign () {
        this.context.clearRect(0, 0, 503, 150);
        this.base64Str = '';
      },
      selectTabelRow (selection, row) {
        this.checkedArr = [];
        for (let item of selection) {
          if (item.sinsAcctId) {
            this.checkedArr.push(item);
          }
        }
      },
      selectAll (selection) {
        this.checkedArr = [];
        for (let item of selection) {
          if (item.sinsAcctId) {
            this.checkedArr.push(item);
          }
        }
      },
      viewAll (pageNum, pageSize) {
        let _check = '';
        if (this.searchForm.fiveOneInsure === true) {
          _check = 1;
        } else {
          _check = 0;
        }
        let obj = {
          data: JSON.parse(JSON.stringify(this.searchForm)),
          pageNum: pageNum,
          pageSize: pageSize
        };
        if (obj.data.executeMon) {
          obj.data.executeMon = Vue.filter('date')(obj.data.executeMon, 'yyyyMM');
        }
        obj.data.fiveOneInsure = _check;
        api.post(this.apiPath.sins.findSinsApplyFnncPayAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.applicationData = res.data.list;
            this.total = res.data.total;
            this.checkedArr = [];
          } else {
            this.searchForm.executeMon = new Date(this.searchForm.executeMon);
            if (obj.data.fiveOneInsure === 1) {
              this.searchForm.fiveOneInsure = true;
            } else {
              this.searchForm.fiveOneInsure = false;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 主查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },

      // 主重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },

      // 控制翻页
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 查看报销单
      checkReimbursement (row) {
        checkeditem = row;
        api.post(this.apiPath.sins.findReimOrder, {sinsPayInfoId: row.sinsPayInfoId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.reimbFalg = true;
            this.isReimbursementDe = true;
            if (res.data.chargePerId) {
              res.data.chargePerId = LZString.compress(res.data.chargePerId);
            }
            this.expenInfoData = JSON.parse(JSON.stringify(res.data));
            if (this.expenInfoData.fnncPayAssists) {
              this.interatorLen = 5 - this.expenInfoData.fnncPayAssists.length;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看详情
      seeDetail (row) {
        let params = {
          "sinsPayInfoId": row.sinsPayInfoId, // 社保支付信息明细id
          "sinsAcctId": row.sinsAcctId, // 社保账户id
          "executeMon": row.executeMon // 执行月份
        };
        api.post(this.apiPath.sins.findDetailInfo, params).then(res => {
          if (res.code === 'CPYY-00001') {
            this.finaPaymentAddFlag = true;
            this.finaPaymentupdate = false;
            this.finaupdate = true;
            this.isCheckDetail = true;
            this.finaPaymentAddForm = res.data;
            this.seeForm.fileId = res.data.fileId;
            this.seeForm.fileName = res.data.fileName;
            if (res.data.executeMon) {
              let date = (res.data.executeMon + '').split('');
              date.splice(4, 0, '-');
              this.finaPaymentAddForm.executeMon = date.join('');
            } else {
              this.finaPaymentAddForm.executeMon = '';
            };
            if (!this.finaPaymentAddForm.fnncPayAssists) {
              this.finaPaymentAddForm.fnncPayAssists = [];
            }
            this.activeNode = res.data.reimPayState;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      choooseNum (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },

      // 申请财务支付弹层关闭
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      // 申请财务支付弹层 --> 生成报销单
      submitForm () {
        let params = JSON.parse(JSON.stringify(this.finaPaymentAddForm));
        params.executeMon = Vue.filter('date')(params.executeMon, 'yyyyMM');
        params.fileId = this.batchApplyResult.fileId;
        params.fileName = this.batchApplyResult.fileName;
        // let param = {
        //   "sinsAcctId": this.finaPaymentAddForm.sinsAcctId, // 社保账户id
        //   "payAmoTotal": this.finaPaymentAddForm.payAmoTotal, // 缴费金额合计
        //   "executeMon": Vue.filter('date')(this.finaPaymentAddForm.executeMon, 'yyyyMM'), // 申报月份
        //   "fnncPayAssists": this.finaPaymentAddForm.fnncPayAssists //
        // };
        api.post(this.apiPath.sins.doReimOrder, params).then(res => {
          if (res.code === 'CPYY-00001') {
            this.reimbFalg = true;
            this.finaPaymentAddFlag = false;
            this.isReimbursementDe = false;
            this.expenInfoData = JSON.parse(JSON.stringify(res.data));
            if (this.expenInfoData.fnncPayAssists) {
              this.interatorLen = 5 - this.expenInfoData.fnncPayAssists.length;
            };
            // this.expenInfoData.fnncPayAssists.map(item => {
            //   return {
            //     feeItem: '',
            //     feeTypeName: item.feeTypeName,
            //     payAmo: item.payAmo
            //   };
            // });
            // this.expenInfoData.feeItem = '';
          }
        }).catch(err => {
          console.log(err);
        });
            // this.$message(
            //   {
            //     message: '操作成功<br><i>' + res.data + '</i>',
            //     type: 'success',
            //     customClass: 'el-message-width'
            //   }
            // );
      },
      // 表格--> 申请财务支付
      applyFun () {
        // if (!this.finaPaymentAddFlag) {
        //   this.finaPaymentAddFlag = true;
        //   return;
        // }
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条数据进行操作', '温馨提示', {
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
        let _obj = [];
        console.log(this.checkedArr, 'this.checkedArr');
        let sinsAcctIds = this.checkedArr.map(function (item) {
          return item.sinsAcctId;
        });
        for (var value of new Set(sinsAcctIds)) {
          let obj = {
            sinsAcctId: value,
            executeMon: '',
            proPayIdList: []
          };
          this.checkedArr.forEach(function (item) {
            if (item.sinsAcctId === obj.sinsAcctId) {
              obj.executeMon = item.executeMon;
              if (item.productId && item.productId.indexOf(',') == -1) {
                obj.proPayIdList.push(item.productId);
              }
            }
          });
          _obj.push(obj);
        };
        api.post(this.apiPath.sins.findSinsApplyFnncPay, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.finaPaymentAddFlag = true;
            this.finaupdate = false;
            this.finaPaymentupdate = true;
            this.isCheckDetail = false;
            res.data.fnncPayAssists.forEach(function (list) {
              list.edit = false;
            });
            this.finaPaymentAddForm = res.data;
            this.finaPaymentAddForm.sinsAcctId = _obj[0].sinsAcctId;
            this.finaPaymentAddForm.proPayIdList = _obj[0].proPayIdList;
            if (res.data.executeMon) {
              let date = (res.data.executeMon + '').split('');
              date.splice(4, 0, '-');
              this.finaPaymentAddForm.executeMon = date.join('');
            } else {
              this.finaPaymentAddForm.executeMon = '';
            };
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 申请支付确认按钮
      sureApplyPay () {
        checkeditem;
        this.expenInfoData.chargePerId = LZString.compress(this.expenInfoData.chargePerId);
        let params = JSON.parse(JSON.stringify(this.expenInfoData));
        params.fileId = this.batchApplyResult.fileId;
        params.fileName = this.batchApplyResult.fileName;
        params.executeMon = checkeditem.executeMon;
        params.sinsAcctId = checkeditem.sinsAcctId;
        params.monthlyTotalId = checkeditem.monthlyTotalId;
        params.feeItem = this.expenInfoData.feeItem;

        // params.executeMon = Vue.filter('date')(params.executeMon, 'yyyyMM');
        // let params = {
        //   sinsAcctId: this.expenInfoData.sinsAcctId, // 社保账户id
        //   executeMon: this.expenInfoData.executeMon,
        //   "payAmo": this.expenInfoData.reimTime, // 金额
        //   "reimTime": this.expenInfoData.reimTime, // 报销日期
        //   "feeItem": this.expenInfoData.feeItem, // 费用项目，手动输入
        //   "operatorId": this.expenInfoData.operatorId, // 经办人
        //   feeType: this.expenInfoData.feeType,
        //   "feeTypeName": this.expenInfoData.feeTypeName, // 类别
        //   "reimAmoTotal": this.expenInfoData.reimAmoTotal, // 核实金额
        //   "fnncPayAssists": this.expenInfoData.fnncPayAssists // 核实金额
        // };
        api.post(this.apiPath.sins.doSinsApplyFnncPay, params).then(res => {
          if (res.code === 'CPYY-00001') {
            this.reimbFalg = false;
            this.$confirm('您已成功申请支付<br>报销单编号：' + res.data, '提示', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
            }).catch(() => {
              console.log('删除失败!');
            });
            this.searchFun();
          } else {
            this.expenInfoData.chargePerId = LZString.decompress(this.expenInfoData.chargePerId);
          }
        }).catch(err => {
          this.expenInfoData.chargePerId = LZString.decompress(this.expenInfoData.chargePerId);
          console.log(err);
        });
      },
      // sureApplyPay () {
      //   this.expenInfoData.reimTime = this.expenInfoData.reimYear + '-' + this.expenInfoData.reimMon + '-' + this.expenInfoData.reimDay;
      //   let obj = this.expenInfoData;
      //   obj.monthlyTotalId = checkedArr[0].monthlyTotalId;
      //   api.post(this.apiPath.accu.doApplyFnncPay, obj).then(res => {
      //     if (res.code === 'CPYY-00001') {
      //       this.$alert('您已成功申请支付，<br/>报销单编号：' + res.data, '提示信息', {
      //         confirmButtonText: '确 定',
      //         type: 'info', // icon图标类型
      //         dragFlag: true,
      //         customClass: '', // 添加class
      //         lockScroll: true,
      //         callback: action => {
      //           this.reimbFalg = false;
      //           this.searchButFun();
      //         }
      //       });
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      /**
       * 格式化金额
       * @param s
       * @param n
       * @returns {string}
       */
      toMoney (s, n) {
        if (!s && s !== 0) {
          return;
        }
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse();
        var r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },
      /**
       * 金额大小写转换
       * @param num
       * @param index
       * @returns {string}
       */
      toBigNum (num, index) {
        if (num || num === 0) {
          num = num.toFixed(2).toString();
          var numArr = num.split(".");
          if (index === -1) {
            return this.bigNumArr[parseInt(numArr[1][0])];
          } else if (index === -2) {
            return this.bigNumArr[parseInt(numArr[1][1])];
          } else {
            if (index > numArr[0].length) {
              return '';
            } else {
              return this.bigNumArr[parseInt(numArr[0].split("").reverse().join("")[index - 1])];
            }
          }
        }
      }
    }
  };
</script>
<style scoped>
  .userManagement {
    margin-left: 25px;
    margin-right: 25px;
    width: 93%;
  }
  .usermanagement-ul {
    padding: 0px !important;
  }
  .usermanagement-li {
    width: 50% !important;
    height: 33px;
  }
  .viewBox .upload {
    width: 100%;
    height: 34px;
  }
  .viewBox .upload .upload-H {
    width: 18%;
  }
  .viewBox .upload .upload-Input {
    width: 79%;
    display: inline-block;
    height: 34px;
    line-height: 34px;
  }
  .usermanage-pay {
    width: 100% !important;
    margin-left: -69%;
  }
  .sinoItem {
    width: 100% !important;
    margin-left: -69%;
  }
  .sinoFormItem .cus-sp {
    border: 1px solid #e4e4e4;
    background: #eeeeee;
    border-radius: 5px;
    width: 290px;
    height: 25px;
    line-height: 25px;
  }
  .table-bottom .meo-mar-le {
    margin-left: 40px;
  }
  .table-bottom .meo-mar-le span{
    margin-left: 40px;
  }
  .w40{display:inline-block;width:32px;}
  .fl.width-med input{
    visibility: visible;
    width: 90%;
  }
  .fl.right-meo.bor-null{text-align: right;padding-right: 40px}
.fl.right-meo.bor-null span:first-child{
  float: left;
  margin-left: 30px;
}
  .bottom-f1.bor-null .fr{margin-right: 15px}
  .toview-box ul li{
    width: 33%;}
  .toview-box ul li span{
    width: 200px;
    margin-left: -99px;
  }
</style>
