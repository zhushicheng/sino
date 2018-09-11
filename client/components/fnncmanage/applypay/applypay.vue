<template>
  <!--申请支付-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">其他返款申请</div>
          <div class="sino-tabs-item" @click="offRefFun">异地返款申请</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="seachForm" ref="seachForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one costcenter-width">
              <sino-form-item label="客户/供应商名称：" class="sino-form-item-width" prop="custSuppName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findCustAndSuppByConinfo"
                             :token="token"
                             :chooseName.sync="seachForm.custSuppName"
                             :chooseId.sync="seachForm.custSuppType" :clear="true"
                ></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text" v-model="seachForm.empName"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-name">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text" v-model="seachForm.certNo"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="拨付类型：" class="search-inner-item" prop="paidTypeName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="seachForm.paidTypeName"
                             :chooseId.sync="seachForm.paidType"
                             :clear="true"
                             :data="{code: 'PAID_TYPE'}"
                             :url="getDictSelectBox"
                ></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="支付进度：" class="search-inner-item" prop="payScheduleName">
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :chooseName.sync="seachForm.payScheduleName"
                             :chooseId.sync="seachForm.paySchedule"
                             :clear="true"
                             :data="{code: 'PAY_SCHEDULE', ids:[3, 4, 5, 6, 7, 8]}"
                             :url="getDictSelectBox"
                ></sino-select>
              </sino-form-item>
            </li>
            <li>
              <span class="two-dater-span">申请日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="applyDateBeg">
                  <sino-date-picker class="fl"
                                    v-model="seachForm.applyDateBeg"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">至</span>
                <sino-form-item class="search-inner-item" prop="applyDateEnd">
                  <sino-date-picker class="fl"
                                    v-model="seachForm.applyDateEnd"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </div>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetForm('seachForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="applypay()"><i class="iconfont sino-qian"></i>申请支付</sino-button>
          </div>
        </div>
        <sino-table :data="applyPayData" max-height="416" v-on:viewAll="viewAll" border stripe v-on:select="selectCallBack">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="custSuppName" label="客户/供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="180"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="paidTypeName" label="拨付类型" min-width="80"></sino-table-column>
          <sino-table-column prop="paidAmoTotal" label="拨付单金额" type="money" width="130"></sino-table-column>
          <sino-table-column prop="payScheduleName" label="支付进度" min-width="105"></sino-table-column>
          <sino-table-column prop="applyDate" label="申请日期" min-width="120"></sino-table-column>
          <sino-table-column prop="reimOrderNo" label="费用报销单号" min-width="95"></sino-table-column>
          <sino-table-column prop="busiRespName" label="申请人" min-width="95"></sino-table-column>
          <sino-table-column prop="creMan" label="经办员" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" width="100" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="cheReiFun(scope.row)">查看</span>
                <!--<i class="table-i">|</i>-->
                <!--<span class="table-span" @click="seeDetaFun(scope.row)">修改</span>-->
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum"
                   v-bind:page-size="page.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!-- 申请支付弹层 -->
    <sino-dialog :visible.sync="applyFalg" size="small" v-on:close="resetForm('appPayForm')" class="mail-dialog see-dirc suppinfo-dialog-box apply-hei" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="申请支付" class="sino-dialog-title"></sino-title>
      <sino-form :model="appPayForm" :rules="appPayRules" ref="appPayForm" class="demo-sendAddrAddForm paydir mt15">
        <sino-form-item  label="支付方向：" prop="payDir" class="sino-form-item-width">
          <sino-radio-group v-model="appPayForm.payDir" @change="payDirFun">
            <sino-radio v-for="(item, index) in appPayForm.payDirList" :key="index" :label="item.id">{{item.title}}</sino-radio>
          </sino-radio-group>
        </sino-form-item>
      </sino-form>
      <div>
        <sino-form v-show="isEnt" :model="applyPayForm" :rules="applyPayRules" ref="applyPayForm" class="demo-sendAddrAddForm mail-form-width">
          <!--选择地区显示-->
          <div class="entItem">
            <sino-title slot="title" type="levelTwo" title="企业信息" class="title-dis"></sino-title>
            <sino-form-item label="拨付类型："  prop="assoBusiTypeName" class="apply-mar">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="true"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="applyPayForm.assoBusiTypeName"
                           :chooseId.sync="applyPayForm.assoBusiType"
                           :clear="true"></sino-select>
            </sino-form-item>
            <sino-form-item label="拨付总金额："  prop="total" class="apply-mar">
              <sino-input type="text" v-model="applyPayForm.total" :disabled="true"></sino-input>
            </sino-form-item>
            <sino-form-item label="企业：" class="sino-form-item-width" prop="custSuppType">
              <sino-radio-group v-model.number="applyPayForm.custSuppType" @change="custSuppFun(applyPayForm.custSuppType)">
                <sino-radio v-for="(item, index) in isAddiPkgList" :key="index"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-radio-group>
            </sino-form-item>
            <sino-form-item label="客户名称：" class="sino-form-item-width" prop="custSuppName" v-if="applyPayForm.custSuppType === 2">
              <sino-input type="text" v-model="applyPayForm.custSuppName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="供应商名称：" class="sino-form-item-width" prop="custSuppName" v-if="applyPayForm.custSuppType === 1">
              <sino-input type="text" v-model="applyPayForm.custSuppName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="开户单位名称：" class="sino-form-item-width" prop="entAcctUnitName">
              <sino-input type="text" v-model="applyPayForm.entAcctUnitName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="银行类型：" prop="entBankTypeName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :clear="true"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :data="{code: 'BANK_TYPE'}"
                           :chooseName.sync="applyPayForm.entBankTypeName"
                           :chooseId.sync="applyPayForm.entBankType"
                           :url="getDictSelectBox"></sino-select>
            </sino-form-item>
            <sino-form-item label="银行卡号：" prop="entBankNo">
              <sino-input type="text" v-model="applyPayForm.entBankNo" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="开户行名称：" class="sino-form-item-width" prop="entAcctBankName">
              <sino-input type="text" v-model="applyPayForm.entAcctBankName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="金额：" prop="payEntAmo" v-if="isMeo">
              <sino-input type="text" v-model="applyPayForm.payEntAmo" :disabled="false"></sino-input>
            </sino-form-item>
          </div>
        </sino-form>
        <sino-form v-show="isEmp" :model="enterFrom" :rules="enterFromRules" ref="enterFrom" class="demo-sendAddrAddForm mail-form-width">
          <!--选择雇员显示-->
          <div class="empItem">
            <sino-title slot="title" type="levelTwo" title="雇员信息" class="title-dis"></sino-title>
            <div class="order-new prompt-style-mar">
              <i class="iconfont sino-tip"></i><span>共选中<i>{{ numData }}</i>个雇员，当前展示的是第<i>{{enterFrom.empNum}}</i>个雇员信息。</span>
            </div>
            <sino-form-item label="雇员姓名：" prop="empName">
              <sino-input type="text" v-model="enterFrom.empName" :disabled="true"></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" prop="certNo">
              <sino-input type="text" v-model="enterFrom.certNo" :disabled="true"></sino-input>
            </sino-form-item>
            <sino-form-item label="拨付类型：" prop="assoBusiTypeName" class="short-margin-bottom first-select-item">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="true"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="enterFrom.assoBusiTypeName"
                           :chooseId.sync="enterFrom.assoBusiType"
                           :clear="true"></sino-select>
            </sino-form-item>
            <sino-form-item label="拨付总金额：" prop="paidAmoTotal">
              <sino-input type="text" v-model="enterFrom.paidAmoTotal" :disabled="true"></sino-input>
            </sino-form-item>
            <sino-form-item label="收款人：" prop="payeeTypeName" class="short-margin-bottom first-select-item">
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code: 'EMP_REL_TYPE'}"
                           :chooseName.sync="enterFrom.payeeTypeName"
                           :chooseId.sync="enterFrom.payeeType"
                           :clear="true" @contentChange="contentChange"></sino-select>
            </sino-form-item>
            <sino-form-item label="收款人姓名：" prop="payeeName">
              <sino-input type="text" v-model="enterFrom.payeeName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="收款人证件号码：" prop="payeeCertNo" class="first-select-item">
              <sino-input type="text" v-model="enterFrom.payeeCertNo" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label=" " prop="" v-if="!isMeo"></sino-form-item>
            <sino-form-item label="银行类型：" prop="bankTypeName"  class="first-select-item">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :chooseName.sync="enterFrom.bankTypeName"
                           :chooseId.sync="enterFrom.bankType"
                           :data="{code: 'BANK_TYPE'}"
                           :clear="true"></sino-select>
            </sino-form-item>
            <sino-form-item label="银行卡号：" prop="bankNo">
              <sino-input type="text" v-model="enterFrom.bankNo" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="金额：" prop="payPerAmo" v-if="isMeo">
              <sino-input type="text" v-model="enterFrom.payPerAmo" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="开户行名称：" class="sino-form-item-width" prop="acctBankName">
              <sino-input type="text" v-model="enterFrom.acctBankName" :disabled="false"></sino-input>
            </sino-form-item>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <span class="filp-page-sty" v-if="isPre"  @click="isPreFun">上一页</span>
        <sino-button type="primary"  @click="generRriFun(appPayForm.payDir)" :disabled="genReiFlag">生成报销单</sino-button>
        <span class="filp-page-sty" v-if="isNext" @click="isNextFun">下一页</span>
      </span>
    </sino-dialog>
    <!--查看报销单-->
    <sino-dialog :visible.sync="reimbFalg" size="large" class="mail-dialog see-dirc suppinfo-dialog-box" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="查看报销单" class="sino-dialog-title"></sino-title>
      <div class="remib">
        <!--头部-->
        <div class="remib-top">
          <!--标题-->
          <div class="remib-title">
            <h5>费用报销单</h5>
            <h3>报销日期
              <span>{{billDate.year}}</span>
              <!--<input type="text" v-model="billDate.year"/>-->
              年
              <span>{{billDate.month}}</span>
              <!--<input type="text" v-model="billDate.month"/>-->
              月
              <span>{{billDate.day}}</span>
              <!--<input type="text" v-model="billDate.day"/>-->
              日
            </h3>
          </div>
          <!--编号-->
          <!--<div class="reminb-Numbering">-->
          <!--报销单编号：<span>20180101123</span>-->
          <!--</div>-->
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
            <div v-for="(item, index) in expenInfoData.reimOrderItems" :key="index">
              <li class="fl width-med" ><input type="text" placeholder="可输入" v-model="item.reimOrderItem" v-if="!item.empty"/></li>
              <li class="fl">{{item.reimOrderTypeName}}</li>
              <li class="fl">{{item.reimOrderItemAmo}}</li>
            </div>
            <li class="fl width-med lef-co">
              <h6>报 销 金 额 合 计</h6>
            </li>
            <li class="fl"></li>
            <li class="fl"></li>
          </ul>
          <!--表格上右-->
          <ul class="table-right fl">
            <li class="fl right-tl right-t1">
              <h6>单 位 负 责 人</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              <div class="sign-container sino-menu" @click="openSignFun('chargePerId')">
                <img :src="expenInfoData.chargePerId" v-if="expenInfoData.chargePerId"/>
              </div>
            </li>

            <li class="fl right-tl">
              <h6>审 查 意 见</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <!--<input type="text" v-model="expenInfoData.reviewPerId"/>-->
              <div class="sign-container sino-menu sign-half" @click="openSignFun('reviewPerId')">
                <img :src="expenInfoData.reviewPerId" v-if="expenInfoData.reviewPerId"/>
              </div>
            </li>
            <li class="fl right-tl right-t1">
              <h6>财 务 审 核</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              <!--<input type="text" v-model="expenInfoData.fnncAppId"/>-->
              <div class="sign-container sino-menu" @click="openSignFun('fnncAppId')">
                <img :src="expenInfoData.fnncAppId" v-if="expenInfoData.fnncAppId"/>
              </div>
            </li>
            <li class="fl right-tl">
              <h6>部 门 审 查</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <!--<input type="text" v-model="expenInfoData.depAppId"/>-->
              <div class="sign-container sino-menu sign-half" @click="openSignFun('depAppId')">
                <img :src="expenInfoData.depAppId" v-if="expenInfoData.depAppId"/>
              </div>
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
              <span class="fr">￥ {{toMoney(expenInfoData.reimAmoTotal)}} 小写</span>
            </li>
            <li class="fl bottom-f2 bott-co">
              <h6>借款数</h6>
            </li>
            <li class="fl bottom-f3">
              <span class="bill-input">{{expenInfoData.loanAmo}}</span>
              <!--<input type="text" class="bill-input" v-model="expenInfoData.loanAmo"/>-->
            </li>
            <li class="fl bottom-f3 bott-co">
              <h6>应退金额</h6>
            </li>
            <li class="fl bottom-f3">
              <span class="bill-input">{{expenInfoData.refundAmo}}</span>
              <!--<input type="text" class="bill-input" v-model="expenInfoData.refundAmo"/>-->
            </li>
            <li class="fl bottom-f3 bott-co">
              <h6>应补金额</h6>
            </li>
            <li class="fl bottom-f3 bor-null">
              <span class="bill-input">{{expenInfoData.patchAmo}}</span>
              <!--<input type="text" class="bill-input" v-model="expenInfoData.patchAmo"/>-->
            </li>
            <li class="fl bottom-f1 bor-null bottom-t1 bott-mar-che">
              <div class="fl">
                <span class="fl">出纳：</span>
                <!--<input type="text" class="bill-input" v-model="expenInfoData.cashierPerId"/>-->
                <div class="sign-container sino-menu" @click="openSignFun('cashierPerId')">
                  <img :src="expenInfoData.cashierPerId" v-if="expenInfoData.cashierPerId"/>
                </div>
              </div>
              <div class="fl">
                <span class="fl">经办人：</span>
                <span class="bill-input">{{expenInfoData.operatorId}}</span>
                <!--<input type="text" class="bill-input" v-model="expenInfoData.operatorId"/>-->
              </div>
              <div class="fl">
                <span class="fl">报销人：</span>
                <span class="bill-input">{{expenInfoData.reimPerId}}</span>
                <!--<input type="text" class="bill-input" v-model="expenInfoData.reimPerId"/>-->
              </div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" v-if="appPayForm.payDir===3 && entAndCusIndex===0"  @click="nextReimbList">下一页</sino-button>
        <sino-button type="primary" v-if="appPayForm.payDir!==3 || entAndCusIndex===1"  @click="sureApplyPay(appPayForm.payDir)">申请支付</sino-button>
      </span>
    </sino-dialog>
    <!--查看申请支付详情弹层-->
    <sino-dialog :visible.sync="checkPaDeFalg" size="small" class="mail-dialog see-dirc suppinfo-dialog-box checkPa" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="查看申请支付详情" class="sino-dialog-title"></sino-title>
      <sino-con class="first-con details-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
        <div class="crumbs details-style">
          <ul class="sixflex details-width">
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span @click="stepFun(1)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>开收据</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-act ive': activeNode === 2}"><span @click="stepFun(2)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>认领到款</span></li>
            <li :class="{'li-active': activeNode === 3}"><span @click="stepFun(3)"><i class="step-num iconfont">3</i>申请支付</span></li>
            <li :class="{'li-active': activeNode === 4}"><span @click="stepFun(4)"><i class="step-num iconfont">4</i>支付审批中</span></li>
            <li :class="{'li-active': activeNode === 5}"><span @click="stepFun(5)"><i class="step-num iconfont">5</i>审批不通过</span></li>
          </ul>
        </div>
      </sino-con>
      <sino-form :model="checkPaDeForm"  class="serch-form" ref="checkPaDeForm">
        <sino-con class="boer-del">
          <div class="service-module-box marTop">
            <sino-title type="levelTwo" title="基本信息" class="service-module-title"></sino-title>
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li class="li-last">
                  <h6>客户/供应商名称</h6><span v-text="basPayFrom.custSuppName"></span>
                </li>
                <li>
                  <h6>雇员姓名</h6><span v-text="basPayFrom.empName"></span>
                </li>
                <li>
                  <h6>证件号码</h6><span v-text="basPayFrom.certNo"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="service-module-box marTop">
            <sino-title type="levelTwo" title="支付信息" class="service-module-title details-title"></sino-title>
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li>
                  <h6>拨付类型</h6><span v-text="basPayFrom.reimOrderTypeName"></span>
                </li>
                <li>
                  <h6>拨付总金额</h6><span v-text="basPayFrom.paidAmoTotal"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="service-module-box marTop" v-if="empFlag">
            <sino-title type="levelTwo" title="雇员信息" class="service-module-title details-title"></sino-title>
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li>
                  <h6>收款人</h6><span v-text="sheEmpFrom.payeeTypeName"></span>
                </li>
                <li>
                  <h6>收款人姓名</h6><span v-text="sheEmpFrom.payeeName"></span>
                </li>
                <li>
                  <h6>收款人证件号码</h6><span v-text="sheEmpFrom.payeeCertNo"></span>
                </li>
                <li>
                  <h6>银行类型</h6><span v-text="sheEmpFrom.bankTypeName"></span>
                </li>
                <li>
                  <h6>银行卡号</h6><span v-text="sheEmpFrom.bankNo"></span>
                </li>
                <li>
                  <h6>开户行名称</h6><span v-text="sheEmpFrom.acctBankName"></span>
                </li>
                <li>
                  <h6>金额</h6><span v-text="sheEmpFrom.payPerAmo"></span>
                </li>
                <li>
                  <h6>支付进度</h6><span v-text="sheEmpFrom.payScheduleName"></span>
                </li>
                <li class="li-last">
                  <h6>支付日期</h6><span v-text="sheEmpFrom.payDate"></span>
                </li>
                <li class="li-last">
                  <h6>退回原因</h6><span v-text="sheEmpFrom.payDate"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="service-module-box marTop" v-if="emetFlag">
            <sino-title type="levelTwo" title="企业信息" class="service-module-title details-title"></sino-title>
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li class="li-last">
                  <h6>客户名称</h6><span v-text="sheEmetFrom.custSuppName"></span>
                </li>
                <li>
                  <h6>开户单位名称</h6><span v-text="sheEmetFrom.entAcctUnitName"></span>
                </li>
                <li>
                  <h6>银行类型</h6><span v-text="sheEmetFrom.entBankTypeName"></span>
                </li>
                <li>
                  <h6>银行卡号</h6><span v-text="sheEmetFrom.entBankNo"></span>
                </li>
                <li>
                  <h6>开户行名称</h6><span v-text="sheEmetFrom.entAcctBankName"></span>
                </li>
                <li>
                  <h6>金额</h6><span v-text="sheEmetFrom.payEntAmo"></span>
                </li>
                <li>
                  <h6>支付进度</h6><span v-text="sheEmetFrom.payScheduleName"></span>
                </li>
                <li class="li-last">
                  <h6>支付日期</h6><span v-text="sheEmetFrom.payDate"></span>
                </li>
              </ul>
            </div>
          </div>
        </sino-con>
      </sino-form>
<!--      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="checkPaDeFalg=false">确 定</sino-button>
      </span>-->
    </sino-dialog>
    <!--签名-->
    <sino-dialog :visible.sync="signFlag" dialogHide class="dialog-sign" @open="singOpen" @close="signClose">
      <sino-title slot="title" type="levelOne" title="请签名" class="sino-dialog-title"></sino-title>
      <div id="sign-box">
        <span class="fr" @click="clearSign">清空</span>
        <canvas id="canvas" width="503" height="150"></canvas>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button @click="signSave(valueName)" class="sign-button">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Vue from 'vue';
  import Cookie from 'js-cookie';
  import LZString from 'lz-string';

  let checkedArr = [];
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,    //
        findCustAndSuppByConinfo: this.apiPath.hrsc.findCustAndSuppSelectBox,    //   客户/供应商下拉框
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        token: Cookie.get('Token'),
        bigNumArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        // 查看申请支付详情弹层
        checkPaDeFalg: false,
        signFlag: false,
        checkPaDeForm: {},
        // 查看报销单弹层
        reimbFalg: false,
        // 查看申请支付详情弹层
        detailsFalg: false,
        // 查看申请支付详情弹层----数据
        detailsForm: {},
        // 拨付单明细id
        paidOrderDetIds: [],
        scrollDist: 0, // 距离顶部距离
        activeNode: 3,
        // 查询条件
        seachForm: {
          custSuppType: null,                      // 客户/供应商类型
          custSuppName: "",                        // 客户/供应商名称
          paidType: null,                          //   拨付类型 （字典） PAID_TYPE
          paidTypeName: '',                        //   拨付类型 （字典） PAID_TYPE
          // treatType: null,                      //   待遇类型
          paySchedule: null,                       //  支付进度  （字典）id
          payScheduleName: '',                     //  支付进度  （字典）
          applyDateBeg: "",                        // 申请日期开始
          applyDateEnd: "",                        // 申请日期结束
          empName: "",                             //  雇员姓名
          certNo: ""                               // 证件号码
        },
        // 表格数据
        applyPayData: null,
        numData: null,
        isA: true,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        // 报销单日期
        billDate: {
          year: new Date().getFullYear(), // 年
          month: new Date().getMonth() + 1, // 月
          day: new Date().getDate() // 日
        },
        // 费用报销单数据
        expenInfoData: {
          reimDate: "",               // 报销日期
          reimAmoTotal: "",            // 报销单总金额
          loanAmo: "",                      //  借款数
          refundAmo: "",                //   应退金额
          patchAmo: "",                  // 应补金额
          reimPerId: "",                 //  报销人
          operatorId: "",                //  经办人
          cashierPerId: "",                //  出纳
          chargePerId: "",                  // 单位负责人
          reviewPerId: "",               // 审查意见人
          fnncAppId: "",                    // 财务审核人
          depAppId: "",                  // 部门审核人
          reimOrderItems: [{                  //  费用报销项目
            reimOrderItem: "",             // 项目
            reimOrderType: "",               //     类别
            reimOrderTypeName: "",         //    类别翻译
            reimOrderItemAmo: ""        //  金额
          }],   // 费用报销项目
          reimOrderDets: []  // 费用报销单明细
        },
        // 企业显示
        isEnt: true,
        // 雇员显示
        isEmp: false,
        // 金额显示
        isMeo: false,
        // 上一页
        isPre: false,
        // 下一页
        isNext: false,
        // 申请支付弹层
        applyFalg: false,
        isApply: false,
        // 生成报销单按钮
        genReiFlag: false,
        // 申请支付弹层 ---》 企业数据
        applyPayForm: {
          assoBusiTypeName: '',   // 拨付类型
          assoBusiType: '',  // 拨付类型
          total: null, // 拨付总金额
          custSuppType: 2,   // 企业
          custSuppName: '', // 客户名称
          entAcctBankName: '', // 开户行
          entBankTypeName: '', // 银行名称
          entBankType: null, // 银行名称id
          entBankNo: null, // 银行账号
          entAcctUnitName: '', // 开户单位名称
          // payEntAmo: '', // 金额
          paidOrders: [],  // 勾选的数据集合
          payEntAmo: ''
        },
        // 申请支付弹层 ---》雇员数据
        enterFrom: {
          empName: "",         // 雇员姓名
          certNo: "",        //  证件号码
          assoBusiType: null,      //     拨付类型
          assoBusiTypeName: '',      //     拨付类型
          paidAmoTotal: "", //    拨付金额
          payeeType: null,        //       收款人类型
          payeeTypeName: "",        //       收款人类型
          payeeName: "",        //      收款人姓名
          payeeCertNo: "",  //   收款人证件号码
          bankType: null,          //   银行类型
          bankTypeName: '',          //      银行类型
          bankNo: "",            //     银行账号
          acctBankName: "",  // 开户行名称
          payPerAmo: '',   // 金额
          empNum: 1,     // 第几个雇员
          paidOrderDetId: '',  // 拨付单明细ID
          paidOrders: [],  // 勾选的数据集合
          batchNo: ''   // 批次号--
        },
        // 企业和雇员报表数据
        entAndCusList: [],
        entAndCusIndex: 0,
        resMsgList: [],
        applyPayRules: {
          custSuppType: [
            {required: true, message: '请选择企业类型', trigger: 'change', type: 'number'}
          ],
          custSuppName: [
            {required: true, message: '请输入客户名称', trigger: 'change'}
          ],
          entAcctUnitName: [
            {required: true, message: '请输入开户单位名称', trigger: 'change'}
          ],
          entBankTypeName: [
            {required: true, message: '请选择银行名称', trigger: 'change'}
          ],
          entBankNo: [
            {required: true, message: '请输入银行帐号', trigger: 'change'}
          ],
          entAcctBankName: [
            {required: true, message: '请输入开户行', trigger: 'change'}
          ]
        },
        enterFromRules: {
          // paidAmoTotal
          payeeTypeName: [
            {required: true, message: '请选择收款人', trigger: 'change'}
          ],
          payeeName: [
            {required: true, message: '请输入收款人名称', trigger: 'change'}
          ],
          payeeCertNo: [
            {required: true, message: '请输入收款人证件号码', trigger: 'change'}
          ],
          bankTypeName: [
            {required: true, message: '请选择银行名称', trigger: 'change'}
          ],
          bankNo: [
            {required: true, message: '请输入银行帐号', trigger: 'change'}
          ],
          acctBankName: [
            {required: true, message: '请输入开户行', trigger: 'change'}
          ]
        },
        // 申请支付弹层 ---》  返回的雇员的数据
        retuEmpData: [],
        appPayForm: {
          payDirList: null, // 支付方向单选
          payDir: 1
        },
        appPayRules: {},
        // 查看申请支付详情弹层 --- > 基本信息和支付信息
        basPayFrom: {
          paidAmoTotal: '',                // 拨付总金额
          empName: "",       // 雇员姓名
          certNo: "",  // 证件号码
          reimOrderTypeName: "", // 拨付类型
          custSuppName: ""    // 客户/供应商名称
        },
        // 查看申请支付详情弹层 --- > 雇员信息
        sheEmpFrom: {},
        // 查看申请支付详情弹层 --- > 企业信息
        sheEmetFrom: {},
        empFlag: true,
        emetFlag: true,
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
        base64Str: '',
        valueName: null,
        // 企业单选按钮
        isAddiPkgList: null
      };
    },
    watch: {
      'appPayForm.payDir': function (newVal) {
        if (newVal === 1) {
          // 企业显示
          this.isEnt = true;
          // 雇员显示
          this.isEmp = false;
        };
        if (newVal === 2) {
          this.isEnt = false;
          this.isEmp = true;
          this.isPre = false;
          this.isNext = true;
        };
        if (newVal === 3) {
          this.isEnt = true;
          this.isEmp = true;
          this.isMeo = true;
          this.isNext = true;
        };
      }
    },
    mounted () {
      this.searchFun(1);
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      openSignFun (item) {
        this.signFlag = true;
        this.valueName = item;
      },
      // 保存
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
      signClose () {
        this.clearSign();
      },
      clearSign () {
        this.context.clearRect(0, 0, 503, 150);
        this.base64Str = '';
      },
      // 签名保存
      signSave (value) {
        console.log(value, 'value');
        this.base64Str = this.canvas.toDataURL("image/png", 0.5);
        this.expenInfoData[value] = this.base64Str;
        this.signFlag = false;
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
      // 最上面的查询
      searchFun (flag) {
        this.page.pageNum = 1;
        if (flag === 1) {
          this.seachForm.flag = flag;
        } else {
          this.seachForm.flag = null;
        }
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 最上面的重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      payDirFun (id) {
        if (this.appPayForm.payDir === 2 || this.appPayForm.payDir === 3) {
          this.enterFrom.empName = this.retuEmpData[0].empName;
          this.enterFrom.payDir = this.retuEmpData[0].payDir;
          this.enterFrom.empNum = this.retuEmpData[0].empNum;
          this.enterFrom.certNo = this.retuEmpData[0].certNo;
          this.enterFrom.assoBusiType = this.retuEmpData[0].paidType;
          this.enterFrom.assoBusiTypeName = this.retuEmpData[0].paidTypeName;
          this.enterFrom.paidAmoTotal = this.retuEmpData[0].paidAmoTotal;
          this.enterFrom.paidOrderDetId = this.retuEmpData[0].paidOrderDetId;
          this.genReiFlag = true;
        }
        if (this.appPayForm.payDir === 2) {
          this.isMeo = false;
        }
        if (this.appPayForm.payDir === 1) {
          this.genReiFlag = false;
          this.isNext = false;
          this.isPre = false;
          this.isMeo = false;
        }
        if (checkedArr.length === 1) {
          this.isPre = false;
          this.isNext = false;
          this.genReiFlag = false;
        }
      },
      // 申请支付---》企业
      custSuppFun () {
        this.applyPayForm.custSuppName = '';
      },
      // 下一页报销单
      nextReimbList () {
        if (this.billDate.year && this.billDate.month && this.billDate.day) {
          this.expenInfoData.reimDate = this.billDate.year + '-' + this.billDate.month + '-' + this.billDate.day;
        }
        // this.applyPayForm.paidOrders = checkedArr;
        // this.applyPayForm.payDir = this.appPayForm.payDir;
        let from = {};
        for (let key in this.enterFrom) {
          from[key] = this.enterFrom[key];
        }
        for (let key in this.applyPayForm) {
          from[key] = this.applyPayForm[key];
        }
        from.payDir = this.appPayForm.payDir;
        from.paidOrders = this.enterFrom.paidOrders && this.enterFrom.paidOrders.length > 0 ? this.enterFrom.paidOrders : checkedArr;
        this.expenInfoData.reimOrderDets = [];
        this.expenInfoData.reimOrderDets.push(from);
        this.expenInfoData.batchNo = this.retuEmpData[0].batchNo;
        this.expenInfoData.chargePerId = LZString.compress(this.expenInfoData.chargePerId);
        api.post(this.apiPath.hrsc.confirmApplyPayEmpEnt, this.expenInfoData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.resMsgList.push(res.data);
            console.log(this.resMsgList);
            this.entAndCusIndex = 1;
            let resData = this.entAndCusList[1];
            let lengthNum = resData.reimOrderItems.length;
            if (lengthNum < 5) {
              for (var i  = 0; i < 5 - lengthNum; i++) {
                resData.reimOrderItems.push({empty: true});
              }
            }
            this.expenInfoData = resData;
            // this.billDate.year = null;
            // this.billDate.month = null;
            // this.billDate.day = null;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /**
       * 确认申请支付
       */
      sureApplyPay (id) {
        if (id === 1) {
          if (this.billDate.year && this.billDate.month && this.billDate.day) {
            this.expenInfoData.reimDate = this.billDate.year + '-' + this.billDate.month + '-' + this.billDate.day;
          }
          this.applyPayForm.paidOrders = this.enterFrom.paidOrders && this.enterFrom.paidOrders.length > 0 ? this.enterFrom.paidOrders : checkedArr;
          this.applyPayForm.payDir = this.appPayForm.payDir;
          this.expenInfoData.reimOrderDets = [];
          this.expenInfoData.reimOrderDets.push(this.applyPayForm);
          api.post(this.apiPath.hrsc.confirmApplyPayEnt, this.expenInfoData).then(res => {
            if (res.code === 'CPYY-00001') {
              let _that = this;
              this.reimbFalg = false;
              // this.$message({message: '已申请！', type: 'success'});
              this.$alert('您已成功申请支付！' + ' ' + ' ' + ' ' + ' ' + ' ' + ' ' + ' 报销单编号：' + res.data, '提示信息', {
                confirmButtonText: '确 定',
                type: 'success', // icon图标类型info\success\warning\error
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  _that.searchFun(1);
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }
        if (id === 2) {
          let _that = this;
          if (this.billDate.year && this.billDate.month && this.billDate.day) {
            this.expenInfoData.reimDate = this.billDate.year + '-' + this.billDate.month + '-' + this.billDate.day;
          }
          this.enterFrom.paidOrders = this.enterFrom.paidOrders && this.enterFrom.paidOrders.length > 0 ? this.enterFrom.paidOrders : checkedArr;
          this.enterFrom.payDir = this.appPayForm.payDir;
          this.expenInfoData.reimOrderDets = [];
          this.expenInfoData.reimOrderDets.push(this.enterFrom);
          this.expenInfoData.batchNo = this.retuEmpData[0].batchNo;
          api.post(this.apiPath.hrsc.confirmApplyPayEmp, this.expenInfoData).then(res => {
            if (res.code === 'CPYY-00001') {
              this.reimbFalg = false;
              this.$alert('您已成功申请支付报销单编号：' + res.data, '提示信息', {
                confirmButtonText: '确 定',
                type: 'success', // icon图标类型info\success\warning\error
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  _that.searchFun(1);
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }
        if (id === 3) {
          if (this.billDate.year && this.billDate.month && this.billDate.day) {
            this.expenInfoData.reimDate = this.billDate.year + '-' + this.billDate.month + '-' + this.billDate.day;
          }
          // this.applyPayForm.paidOrders = checkedArr;
          // this.applyPayForm.payDir = this.appPayForm.payDir;
          let from = {};
          for (let key in this.enterFrom) {
            from[key] = this.enterFrom[key];
          }
          for (let key in this.applyPayForm) {
            from[key] = this.applyPayForm[key];
          }
          from.payDir = this.appPayForm.payDir;
          from.paidOrders = checkedArr;
          this.expenInfoData.reimOrderDets = [];
          this.expenInfoData.reimOrderDets.push(from);
          // this.expenInfoData.reimOrderDets = [];
          // this.expenInfoData.reimOrderDets.push(this.applyPayForm);
          this.expenInfoData.batchNo = this.retuEmpData[0].batchNo;
          api.post(this.apiPath.hrsc.confirmApplyPayEmpEnt, this.expenInfoData).then(res => {
            if (res.code === 'CPYY-00001') {
              let _that = this;
              this.resMsgList.push(res.data);
              this.reimbFalg = false;
              this.$alert('您已成功申请支付报销单编号：' + this.resMsgList.join(';'), '提示信息', {
                confirmButtonText: '确 定',
                type: 'success', // icon图标类型info\success\warning\error
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  _that.searchFun(1);
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
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
      },
      /**
       * 收款人change事件
       */
      contentChange (item) {
        if (item.id === 1) {
          this.enterFrom.payeeName = this.enterFrom.empName;
          return;
        }
        this.enterFrom.payeeName = '';
      },
      // 异地返款支付
      offRefFun () {
        this.$router.push({path: '/alloRepaPay'});
      },
      /**
       * 申请支付弹层 ---》下一页按钮
       */
      isNextFun () {
        let num = checkedArr.length;
        if (this.enterFrom.empNum <= num) {
          this.enterFrom.payDir = this.appPayForm.payDir;
          if (this.appPayForm.payDir === 2) {
            this.enterFrom.paidOrders = this.enterFrom.paidOrders && this.enterFrom.paidOrders.length > 0 ? this.enterFrom.paidOrders : checkedArr;
            api.post(this.apiPath.hrsc.applyPayDownEmp, this.enterFrom).then(res => {
              if (res.code === 'CPYY-00001') {
                // for (let item in this.enterFrom) {
                //   if (item !== 'empNum' && item !== 'batchNo') {
                //     this.enterFrom[item] = null;
                //   }
                // };
                // alert(this.enterFrom.empNum);
                // this.payDirFun(this.enterFrom.empNum - 1);
                // this.enterFrom.empNum += 1;
                this.enterFrom = res.data;
                this.retuEmpData = [];
                this.retuEmpData.push(res.data); // 修改后期预防bug
                if (this.enterFrom.empNum === num) {
                  this.isPre = true;
                  this.isNext = false;
                  this.genReiFlag = false;
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
          // 这个有bug,待修改
          if (this.appPayForm.payDir === 3) {
            let from = {};
            for (let key in this.enterFrom) {
              from[key] = this.enterFrom[key];
            }
            for (let key in this.applyPayForm) {
              from[key] = this.applyPayForm[key];
            }
            // alert(this.enterFrom.empNum);
            api.post(this.apiPath.hrsc.applyPayDownEmpEnt, from).then(res => {
              if (res.code === 'CPYY-00001') {
                // for (let item in this.enterFrom) {
                //   if (item !== 'empNum' && item !== 'batchNo') {
                //     this.enterFrom[item] = null;
                //   }
                // };

                // this.payDirFun(this.enterFrom.empNum - 1);
                // this.enterFrom.empNum += 1;
                this.applyPayForm = res.data;
                this.enterFrom = res.data;
                this.retuEmpData.push(res.data); // 修改后期预防bug
                if (this.enterFrom.empNum === num) {
                  this.isPre = true;
                  this.isNext = false;
                  this.genReiFlag = false;
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }
      },
      /**
       * 申请支付弹层 ---》上一页按钮
       */
      isPreFun () {
        // alert(this.enterFrom.empNum);
        // this.enterFrom.empNum -= 1;
        let _this = this;
        if (this.enterFrom.empNum) {
          // if (this.enterFrom.empNum === 1) {
          //   this.isPre = false;
          //   this.isNext = true;
          //   this.genReiFlag = true;
          // }
          let data = {
            paidOrderDetId: _this.enterFrom.paidOrderDetId,
            batchNo: _this.enterFrom.batchNo,
            empNum: _this.enterFrom.empNum
          };
          // alert(_this.enterFrom.empNum);
          api.post(this.apiPath.hrsc.applyPayUpPage, data).then(res => {
            if (res.code === 'CPYY-00001') {
              if (this.appPayForm.payDir === 2) {
                this.enterFrom = res.data;
              } else if (this.appPayForm.payDir === 3) {
                this.applyPayForm = res.data;
                this.enterFrom = res.data;
              }
              if (this.enterFrom.empNum === 1) {
                this.isPre = false;
                this.isNext = true;
                this.genReiFlag = true;
              }
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
      },
      // 生成报销单
      generRriFun (id) {
        if (id === 1) {
          this.$refs.applyPayForm.validate((value) => {
            if (value) {
              this.applyPayForm.payDir = this.appPayForm.payDir;
              // this.applyPayForm.custSuppId = '1213132';
              this.applyPayForm.paidOrders = this.applyPayForm.paidOrders && this.applyPayForm.paidOrders.length > 0 ? this.applyPayForm.paidOrders : checkedArr;
              api.post(this.apiPath.hrsc.updatePaidOrderReimEnt, this.applyPayForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  let resData = res.data;
                  let lengthNum = resData.reimOrderItems.length;
                  if (lengthNum < 5) {
                    for (var i  = 0; i < 5 - lengthNum; i++) {
                      resData.reimOrderItems.push({empty: true});
                    }
                  }
                  this.expenInfoData = resData;
                  this.applyFalg = false;
                  this.reimbFalg = true;
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
        if (id === 2) {
          this.$refs.enterFrom.validate((value) => {
            if (value) {
              this.enterFrom.payDir = this.appPayForm.payDir;
              this.enterFrom.paidOrders = this.enterFrom.paidOrders && this.enterFrom.paidOrders.length > 0 ? this.enterFrom.paidOrders : checkedArr;
              api.post(this.apiPath.hrsc.updatePaidOrderReimEmp, this.enterFrom).then(res => {
                if (res.code === 'CPYY-00001') {
                  let resData = res.data;
                  let lengthNum = resData.reimOrderItems.length;
                  if (lengthNum < 5) {
                    for (var i  = 0; i < 5 - lengthNum; i++) {
                      resData.reimOrderItems.push({empty: true});
                    }
                  }
                  this.expenInfoData = resData;
                  this.applyFalg = false;
                  this.reimbFalg = true;
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
        if (id === 3) {
          this.$refs.enterFrom.validate((value) => {
            if (value) {
              this.$refs.applyPayForm.validate((reslut) => {
                if (reslut) {
                  let from = {};
                  for (let key in this.enterFrom) {
                    from[key] = this.enterFrom[key];
                  }
                  for (let key in this.applyPayForm) {
                    from[key] = this.applyPayForm[key];
                  }
                  from.payDir = this.appPayForm.payDir;
                  from.paidOrders = this.enterFrom.paidOrders && this.enterFrom.paidOrders.length > 0 ? this.enterFrom.paidOrders : checkedArr;
                  // alert(this.enterFrom.empNum);
                  api.post(this.apiPath.hrsc.updatePaidOrderReimEmpEnt, from).then(res => {
                    if (res.code === 'CPYY-00001') {
                      let resData = res.data[0];
                      let lengthNum = resData.reimOrderItems.length;
                      this.entAndCusList = res.data;
                      this.entAndCusIndex = 0;
                      if (lengthNum < 5) {
                        for (var i  = 0; i < 5 - lengthNum; i++) {
                          resData.reimOrderItems.push({empty: true});
                        }
                      }
                      this.expenInfoData = resData;
                      this.applyFalg = false;
                      this.reimbFalg = true;
                    }
                  }).catch(err => {
                    console.log(err);
                  });
                }
              });
            }
          });
        }
      },
      // 申请支付
      applypay () {
        if (checkedArr.length === 0) {
          this.$alert('请选择至少一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let itemFalg = true;
        let item1 = checkedArr[0].custSuppName;
        let item2 = checkedArr[0].paidType;
        for (let item of checkedArr) {
        // || item2 != item.paidType  暂时将“拨付类型一直”这个条件去掉
          if (item1 != item.custSuppName) {
            itemFalg = false;
          }
        }
        if (itemFalg) {
          api.post(this.getDictSelectBox, {code: 'FNNC_PAY_DIR'}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.appPayForm.payDirList = res.data.list;
            }
          }).catch(err => {
            console.log(err);
          });
          api.post(this.getDictSelectBox, {code: 'CUST_OR_SUPP'}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.isAddiPkgList = res.data.list;
            }
          }).catch(err => {
            console.log(err);
          });
          api.post(this.apiPath.hrsc.applyPayFnnc, checkedArr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.retuEmpData = res.data;
              this.applyPayForm.assoBusiTypeName =  res.data[0].paidTypeName;
              this.applyPayForm.assoBusiType = res.data[0].paidType;
              this.enterFrom.batchNo = res.data[0].batchNo;
              this.applyPayForm.total = res.data[0].total;
              this.applyPayForm.batchNo = res.data[0].batchNo;
              this.applyPayForm.empNum = res.data[0].empNum;
              this.applyPayForm.custSuppName = res.data[0].custSuppName;
              this.applyPayForm.paidOrderDetId = res.data[0].paidOrderDetId;
              this.applyFalg = true;
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
        this.$alert('选择的客户和拨付类型需要一致！', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          lockScroll: true
        });
      },
      // 查看全部
      viewAll (pageNum, pageSize) {
        this.seachForm.applyDateBeg = Vue.filter('date')(this.seachForm.applyDateBeg, 'yyyy-MM-dd');
        this.seachForm.applyDateEnd = Vue.filter('date')(this.seachForm.applyDateEnd, 'yyyy-MM-dd');
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.seachForm
        };
        api.post(this.apiPath.hrsc.findApplyPay, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.applyPayData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
        this.numData = checkedArr.length;
        for (let item of selectTion) {
          if (this.paidOrderDetIds.indexOf(item.paidOrderDetId) === -1) {
            this.paidOrderDetIds.push(item.paidOrderDetId);
          }
        }
      },
      // 查看
      cheReiFun (scope) {
        api.post(this.apiPath.hrsc.lookReimOrderDet, {paidOrderDetId: scope.paidOrderDetId}).then(res => {
          if (res.code === 'CPYY-00001') {
            for (let item in this.basPayFrom) {
              this.basPayFrom[item] = res.data[item];
            }
            if (res.data.empOrderDet) {
              this.sheEmpFrom = res.data.empOrderDet;
            } else {
              this.empFlag = false;
            }
            if (res.data.entOrderDet) {
              this.sheEmetFrom = res.data.entOrderDet;
            } else {
              this.emetFlag = false;
            }
            this.checkPaDeFalg = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看详情
      seeDetaFun (scope) {
        api.post(this.apiPath.hrsc.lookReimOrderDet, {reimDetId: scope.reimDetId, assoBusiType: scope.paidType}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.detailsForm = res.data;
            this.detailsFalg = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      choooseNum: function (pageSize) {
        //  改变分页显示条数;
        this.page.pageNum = 1;
        this.page.pageSize = pageSize;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      resetForm (formName) {
        if (formName === 'appPayForm' && !this.reimbFalg) {
          // appPayForm
          this.$refs[formName].resetFields();
          this.$refs.applyPayForm.resetFields();
          this.$refs.enterFrom.resetFields();
        }
        if (formName !== 'appPayForm') {
          this.$refs[formName].resetFields();
        }
      }
    }
  };
</script>
<style scoped>
  .sign-container {
    width: 204px;
    height: 60px;
  }
</style>
