<template>
  <!--<div>&lt;!&ndash;异地返款支付&ndash;&gt;</div>-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="offRefFun">其他返款申请</div>
          <div class="sino-tabs-item is-active">异地返款申请</div>
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
                             :chooseName.sync="seachForm.custSuppId"
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
              <sino-form-item label="年度：" class="search-inner-item" prop="paidTypeName">
                <sino-date-picker
                  v-model="seachForm.natMon"
                  type="year"
                  :editable="false"
                  :readonly="false">
                </sino-date-picker>
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
          <sino-table-column prop="unitSinsNo" label="单位社保账号" min-width="180"></sino-table-column>
          <sino-table-column prop="sinsPerNo" label="社保个人编号" min-width="180"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="180"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="custSuppName" label="客户/供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="natMon" label="年度" min-width="105"></sino-table-column>
          <sino-table-column prop="paidAmo" label="账户余额" min-width="120"></sino-table-column>
          <sino-table-column prop="payScheduleName" label="支付进度" min-width="95"></sino-table-column>
          <sino-table-column prop="isCompApplyPayName" label="是否可申请支付" min-width="180"></sino-table-column>
          <sino-table-column prop="acctBankName" label="开户行名称" min-width="180"></sino-table-column>
          <sino-table-column prop="bankNo" label="银行卡号" min-width="180"></sino-table-column>
          <sino-table-column prop="applyDate" label="申请支付时间" min-width="180"></sino-table-column>
          <sino-table-column prop="payDate" label="支付日期" min-width="180"></sino-table-column>
          <sino-table-column label="操作" align="center" width="160" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="cheReiFun(scope.row)">查看</span>
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
    <!-- 申请支付弹层 applyFalg  jiu-->
    <!--<sino-dialog visible.sync="false" size="small" class="mail-dialog see-dirc suppinfo-dialog-box apply-hei" :top="'5%'">-->
      <!--<sino-title slot="title" type="levelOne" title="申请支付" class="sino-dialog-title"></sino-title>-->
      <!--<sino-form :model="appPayForm" :rules="appPayRules" ref="appPayForm" class="demo-sendAddrAddForm mt15">-->
        <!--<sino-form-item label="支付方向：" prop="isAddiPkg" class="sino-from-wid">-->
          <!--<sino-radio v-for="(item, index) in appPayForm.payDirList" :key="index"-->
                      <!--v-model='appPayForm.isAddiPkg'-->
                      <!--:label="item.id">{{item.title}}</sino-radio>-->
        <!--</sino-form-item>-->
      <!--</sino-form>-->
      <!--<div>-->
        <!--<sino-form v-if="isEnt" :model="applyPayForm" :rules="applyPayRules" ref="applyPayForm" class="demo-sendAddrAddForm mail-form-width">-->
          <!--&lt;!&ndash;选择企业显示&ndash;&gt;-->
          <!--<div class="entItem">-->
            <!--<sino-title slot="title" type="levelTwo" title="企业信息" class="title-dis"></sino-title>-->
            <!--<sino-form-item label="企业：" prop="custSuppType" class="apply-mar">-->
              <!--<sino-radio v-for="(item, index) in isAddiPkgList" :key="index"-->
                          <!--v-model.number="applyPayForm.custSuppType"-->
                          <!--:label="item.id">{{item.title}}</sino-radio>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="本次支付金额："  prop="total" class="apply-mar">-->
              <!--<sino-input type="text" v-model="applyPayForm.total" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="客户名称：" class="sino-form-item-width" prop="custSuppName" v-if="applyPayForm.custSuppType === 2">-->
              <!--<sino-input type="text" v-model="applyPayForm.custSuppName"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="供应商名称：" class="sino-form-item-width" prop="custSuppName" v-if="applyPayForm.custSuppType === 1">-->
              <!--<sino-input type="text" v-model="applyPayForm.custSuppName"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="银行类型：" prop="entBankType">-->
              <!--<sino-select :filterable="true"-->
                           <!--:multiselect="false"-->
                           <!--:isshowTotol="false"-->
                           <!--:disabled="false"-->
                           <!--:clear="true"-->
                           <!--:totalNum="false"-->
                           <!--:isPage="true"-->
                           <!--:isGroup="false"-->
                           <!--:chooseName.sync="applyPayForm.entBankTypeName"-->
                           <!--:chooseId.sync="applyPayForm.entBankType"-->
                           <!--:url="findAreaList"></sino-select>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="银行卡号：" prop="entBankNo">-->
              <!--<sino-input type="text" v-model="applyPayForm.entBankNo" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="开户行名称：" class="sino-form-item-width" prop="entAcctBankName">-->
              <!--<sino-input type="text" v-model="applyPayForm.entAcctBankName" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="类别：" prop="paidTypeName">-->
              <!--<sino-input type="text" v-model="applyPayForm.paidTypeName" :disabled="'false'"></sino-input>-->
            <!--</sino-form-item>-->
          <!--</div>-->
        <!--</sino-form>-->
        <!--<sino-form v-if="isEmp" :model="enterFrom" :rules="enterFromRules" ref="enterFrom" class="demo-sendAddrAddForm mail-form-width">-->
          <!--&lt;!&ndash;选择个人显示&ndash;&gt;-->
          <!--<div class="empItem">-->
            <!--<sino-title slot="title" type="levelTwo" title="雇员信息" class="title-dis"></sino-title>-->
            <!--<sino-form-item label="本次支付金额："  prop="localStanType" class="apply-mar">-->
              <!--<sino-input type="text" v-model="applyPayForm.pkgName" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="收款人：" prop="localStanType" class="apply-mar">-->
              <!--<sino-select :filterable="true"-->
                           <!--:multiselect="false"-->
                           <!--:isshowTotol="false"-->
                           <!--:disabled="false"-->
                           <!--:totalNum="false"-->
                           <!--:isPage="true"-->
                           <!--:isGroup="false"-->
                           <!--:url="findAreaList"-->
                           <!--:chooseName.sync="applyPayForm.areaName"-->
                           <!--:chooseId.sync="applyPayForm.areaId"-->
                           <!--:clear="true"></sino-select>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="收款人姓名：" prop="localStanType">-->
              <!--<sino-input type="text" v-model="applyPayForm.pkgName" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="收款人证件号码：" prop="localStanType">-->
              <!--<sino-input type="text" v-model="applyPayForm.pkgName" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="银行类型：" prop="localStanType">-->
              <!--<sino-select :filterable="true"-->
                           <!--:multiselect="false"-->
                           <!--:isshowTotol="false"-->
                           <!--:disabled="false"-->
                           <!--:totalNum="false"-->
                           <!--:isPage="true"-->
                           <!--:isGroup="false"-->
                           <!--:url="findAreaList"-->
                           <!--:chooseName.sync="applyPayForm.areaName"-->
                           <!--:chooseId.sync="applyPayForm.areaId"-->
                           <!--:data="{data: {areaTypes:[4,5]}}"-->
                           <!--:clear="true"></sino-select>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="银行卡号：" prop="localStanType">-->
              <!--<sino-input type="text" v-model="applyPayForm.pkgName" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="开户行名称：" class="sino-form-item-width" prop="custName">-->
              <!--<sino-input type="text" v-model="applyPayForm.pkgName" :disabled="false"></sino-input>-->
            <!--</sino-form-item>-->
            <!--<sino-form-item label="类别：" prop="localStanType">-->
              <!--<sino-input type="text" v-model="applyPayForm.pkgName" :disabled="'false'"></sino-input>-->
            <!--</sino-form-item>-->
          <!--</div>-->
        <!--</sino-form>-->
      <!--</div>-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<span class="filp-page-sty" v-if="isEmp">上一页</span>-->
        <!--<sino-button type="primary"  @click="generRriFun(appPayForm.payDir)" :disabled="genReiFlag">生成报销单</sino-button>-->
        <!--<span class="filp-page-sty" v-if="isEmp || isMeo">下一页</span>-->
      <!--</span>-->
    <!--</sino-dialog>-->
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
          <!--选择企业显示-->
          <div class="entItem">
            <sino-title slot="title" type="levelTwo" title="企业信息" class="title-dis"></sino-title>
            <sino-form-item label="企业：" prop="custSuppType" class="apply-mar">
              <sino-radio-group v-model.number="applyPayForm.custSuppType" @change="custSuppFun(applyPayForm.custSuppType)">
                <sino-radio v-for="(item, index) in isAddiPkgList" :key="index"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-radio-group>
            </sino-form-item>
            <sino-form-item label="本次支付金额："  prop="total" class="apply-mar">
              <sino-input type="text" v-model="applyPayForm.total" :disabled="true"></sino-input>
            </sino-form-item>
            <sino-form-item label="客户名称：" class="sino-form-item-width" prop="custSuppName" v-if="applyPayForm.custSuppType === 2">
              <sino-input type="text" v-model="applyPayForm.custSuppName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="供应商名称：" class="sino-form-item-width" prop="custSuppName" v-if="applyPayForm.custSuppType === 1">
              <sino-input type="text" v-model="applyPayForm.custSuppName" :disabled="false"></sino-input>
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
            <sino-form-item label="类别：" prop="paidTypeName">
              <sino-input type="text" v-model="applyPayForm.paidTypeName" :disabled="'false'"></sino-input>
            </sino-form-item>
          </div>
        </sino-form>
        <sino-form v-show="isEmp" :model="enterFrom" :rules="enterFromRules" ref="enterFrom" class="demo-sendAddrAddForm mail-form-width">
          <!--选择雇员显示-->
          <div class="empItem">
            <sino-title slot="title" type="levelTwo" title="雇员信息" class="title-dis "></sino-title>
            <sino-form-item label="本次支付金额：" prop="paidAmoTotal" class="apply-mar">
              <sino-input type="text" v-model="enterFrom.paidAmoTotal" :disabled="true"></sino-input>
            </sino-form-item>
            <sino-form-item label="收款人：" prop="payeeTypeName" class="short-margin-bottom first-select-item apply-mar">
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
            <sino-form-item label="收款人证件号码：" prop="payeeCertNo">
              <sino-input type="text" v-model="enterFrom.payeeCertNo" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="银行类型：" prop="bankTypeName">
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
            <sino-form-item label="开户行名称：" class="sino-form-item-width" prop="acctBankName">
              <sino-input type="text" v-model="enterFrom.acctBankName" :disabled="false"></sino-input>
            </sino-form-item>
            <sino-form-item label="类别：" prop="paidTypeName">
              <sino-input type="text" v-model="enterFrom.paidTypeName" :disabled="'false'"></sino-input>
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
    <!--查看申请支付详情弹层-->
    <sino-dialog :visible.sync="detailsFalg" size="small" class="mail-dialog see-dirc suppinfo-dialog-box" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="查看申请支付详情" class="sino-dialog-title"></sino-title>
      <sino-form :model="detailsForm"  class="serch-form" ref="detailsForm">
        <sino-con class="first-con details-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
          <div class="crumbs details-style">
            <ul class="sixflex details-width">
              <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span @click="stepFun(1)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>提交申请</span></li>
              <li :class="{'li-finish': activeNode > 2, 'li-act ive': activeNode === 2}"><span @click="stepFun(2)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>送鉴定中心</span></li>
              <li :class="{'li-active': activeNode === 3}"><span @click="stepFun(3)"><i class="step-num iconfont">3</i>审核未通过</span></li>
              <li :class="{'li-active': activeNode === 4}"><span @click="stepFun(4)"><i class="step-num iconfont">4</i>维护鉴定日期</span></li>
              <li :class="{'li-active': activeNode === 5}"><span @click="stepFun(5)"><i class="step-num iconfont">5</i>通知雇员鉴定</span></li>
            </ul>
          </div>
        </sino-con>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="基本信息" class="service-module-title details-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li class="li-last">
                <h6>客户/供应商名称</h6><span v-text="detailsForm.custSuppName"></span>
              </li>
              <li>
                <h6>雇员姓名</h6><span v-text="detailsForm.empName"></span>
              </li>
              <li>
                <h6>证件号码</h6><span v-text="detailsForm.certNo"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="支付信息" class="service-module-title details-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li>
                <h6>拨付类型</h6><span v-text="detailsForm.reimOrderTypeName"></span>
              </li>
              <li>
                <h6>拨付总金额</h6><span v-text="detailsForm.paidAmoTotal"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="雇员信息" class="service-module-title details-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li>
                <h6>收款人</h6><span v-text="detailsForm.payeeTypeName"></span>
              </li>
              <li>
                <h6>收款人姓名</h6><span v-text="detailsForm.payeeName"></span>
              </li>
              <li>
                <h6>收款人证件号码</h6><span v-text="detailsForm.payeeCertNo"></span>
              </li>
              <li>
                <h6>银行类型</h6><span v-text="detailsForm.bankTypeName"></span>
              </li>
              <li>
                <h6>银行卡号</h6><span v-text="detailsForm.bankNo"></span>
              </li>
              <li>
                <h6>开户行名称</h6><span v-text="detailsForm.acctBankName"></span>
              </li>
              <li>
                <h6>报销单编号</h6><span v-text="detailsForm.creName"></span>
              </li>
              <li>
                <h6>金额</h6><span v-text="detailsForm.creName"></span>
              </li>
              <li>
                <h6>支付进度</h6><span v-text="detailsForm.creName"></span>
              </li>
              <li>
                <h6>支付日期</h6><span v-text="detailsForm.creName"></span>
              </li>
              <li class="li-last">
                <h6>退回原因</h6><span v-text="detailsForm.creName"></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="service-module-box marTop">
          <sino-title type="levelTwo" title="企业信息" class="service-module-title details-title"></sino-title>
          <div class="usermanagement-list">
            <ul class="usermanagement-ul">
              <li class="li-last">
                <h6>客户名称</h6><span v-text="detailsForm.custSuppName"></span>
              </li>
              <li>
                <h6>开户单位名称</h6><span v-text="detailsForm.entAcctUnitName"></span>
              </li>
              <li>
                <h6>银行类型</h6><span v-text="detailsForm.applyTel"></span>
              </li>
              <li>
                <h6>银行卡号</h6><span v-text="detailsForm.bankNo"></span>
              </li>
              <li>
                <h6>开户行名称</h6><span v-text="detailsForm.receMatDate"></span>
              </li>
              <li>
                <h6>报销单编号</h6><span v-text="detailsForm.apprResultName"></span>
              </li>
              <li>
                <h6>金额</h6><span v-text="detailsForm.creName"></span>
              </li>
              <li>
                <h6>支付进度</h6><span v-text="detailsForm.creName"></span>
              </li>
              <li>
                <h6>支付日期</h6><span v-text="detailsForm.creName"></span>
              </li>
            </ul>
          </div>
        </div>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="detailsFalg=false">确 定</sino-button>
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
            <h3>报销日期<span>2018</span>年<span>01</span>月<span>18</span>日</h3>
          </div>
          <!--编号-->
          <div class="reminb-Numbering">
            报销单编号：<span>20180101123</span>
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
            <li class="fl width-med"></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med"></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med"></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med"></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med"></li>
            <li class="fl"></li>
            <li class="fl"></li>
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
              <span>李思思</span>
            </li>
            <li class="fl right-tl">
              <h6>审 查 意 见</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <span>李思思</span>
            </li>
            <li class="fl right-tl right-t1">
              <h6>财 务 审 核</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              <span>李思思</span>
            </li>
            <li class="fl right-tl">
              <h6>部 门 审 查</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <span>李思思</span>
            </li>
            <li class="fl right-meo bor-null">
              <span>￥</span><span>3,000.00</span>
            </li>
          </ul>
          <!--表格底部-->
          <ul class="table-bottom fl">
            <li class="fl bottom-f1 bor-null">
              <span class="fl meo-mar-le">核实金额（大写）佰 佰 佰 佰 佰 佰 佰 佰 佰 佰 佰 佰 佰 </span>
              <span class="fr mr10">￥   3,000.00 小写</span>
            </li>
            <li class="fl bottom-f2 bott-co">
              <h6>借款数</h6>
            </li>
            <li class="fl bottom-f3"></li>
            <li class="fl bottom-f3 bott-co">
              <h6>应退金额</h6>
            </li>
            <li class="fl bottom-f3"></li>
            <li class="fl bottom-f3 bott-co">
              <h6>应补金额</h6>
            </li>
            <li class="fl bottom-f3 bor-null"></li>
            <li class="fl bottom-f1 bor-null bottom-t1">
              <div class="fl">出纳：<span>张雅君</span></div>
              <div class="fl">出纳：<span>张雅君</span></div>
              <div class="fl">出纳：<span>张雅君</span></div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="reimbFalg=false">打 印</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  let checkedArr = [];
  export default {
    data () {
      return {
        findCustAndSuppByConinfo: this.apiPath.hrsc.findCustAndSuppByConinfo,    //   客户/供应商下拉框
        token: Cookie.get('Token'),
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,    //   客户/供应商下拉框
        billSuppCust: this.apiPath.hrsc.billSuppCust,    //   客户/供应商下拉框
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        // 查看报销单弹层
        reimbFalg: false,
        // 查看申请支付详情弹层
        detailsFalg: false,
        // 查看申请支付详情弹层----数据
        detailsForm: {},
        scrollDist: 0, // 距离顶部距离
        activeNode: 3,
        // 查询条件
        seachForm: {
          custSuppId: null,                      // 客户/供应商类型
          custSuppName: "",                        // 客户/供应商名称
          empName: "",                             //  雇员姓名
          certNo: "",                            // 证件号码
          natMon: null,                              // 年度
          payScheduleName: '',                   // 支付进度名字
          paySchedule: null                               // 支付进度
        },
        // 表格数据
        applyPayData: null,
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
        // 企业显示
        isEnt: true,
        // 雇员显示
        isEmp: false,
        // 金额显示
        isMeo: false,
        numData: null,
        // 拨付单明细id
        paidOrderDetIds: [],
        // 申请支付弹层
        applyFalg: false,
        isApply: false,
        applyPayForm: {
          total: null, // 本次支付金额
          custSuppType: 2,   // 企业--
          custSuppName: '', // 客户名称--
          entAcctBankName: '', // 开户行--
          entBankTypeName: '', // 银行类型--
          entBankType: null, // 银行类型--
          paidTypeName: null, // ;类别
          entBankNo: null // 银行卡号--
        },
        applyPayRules: {
          custSuppType: [
            {required: true, message: '请选择企业类型', trigger: 'change', type: 'number'}
          ],
          total: [
            {required: true, message: '请输入本次支付金额', trigger: 'change', type: 'number'}
          ],
          custSuppName: [
            {required: true, message: '请输入客户名称', trigger: 'change'}
          ],
          entBankTypeName: [
            {required: true, message: '请选择银行类型', trigger: 'change'}
          ],
          entBankNo: [
            {required: true, message: '请输入银行卡号', trigger: 'change'}
          ],
          entAcctBankName: [
            {required: true, message: '请输入开户行名称', trigger: 'change'}
          ]
        },
        appPayForm: {
          payDirList: null,
          payDir: 1
        },
        appPayRules: {
          payDir: [
            {required: true, message: '请选择支付方向', trigger: 'change', type: 'number'}
          ]
        },
        enterFrom: {
          assoBusiType: null,      //     拨付类型--
          assoBusiTypeName: '',      //     拨付类型--
          paidAmoTotal: "", //    拨付金额--
          payeeType: null,        //       收款人类型--
          payeeTypeName: "",        //       收款人类型--
          payeeName: "",        //      收款人姓名--
          payeeCertNo: "",  //   收款人证件号码--
          bankType: null,          //   银行类型--
          bankTypeName: '',          //      银行类型--
          bankNo: "",            //     银行账号--
          acctBankName: "", // 开户行名称--
          paidTypeName: null // ;类别
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
        // 生成报销单按钮
        genReiFlag: false,
        // 下一页
        isNext: false,
        // 上一页
        isPre: false,
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
        }
        if (newVal === 2) {
          this.isEnt = false;
          this.isEmp = true;
          this.isPre = false;
          this.isNext = true;
        }
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
      this.payDirListFun();
      this.enterpriseFun();
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
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
      // 最上面的查询
      searchFun () {
        this.page.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 最上面的重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      // 异地返款支付
      offRefFun () {
        this.$router.push({path: '/applyPay'});
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
          if (item1 != item.custSuppName || item2 != item.paidType) {
            itemFalg = false;
          }
        }
        if (itemFalg) {
          api.post(this.getDictSelectBox, {code: 'FNNC_PAY_DIR', ids: [1, 2]}).then(res => {
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
          let checkFlag = false;
          for (let item of checkedArr) {
            item.applyDate = null;
            if (item.paySchedule !== 4) {
              checkFlag = true;
            }
          }
          if (checkFlag) {
            this.$alert('拨付单为待申请支付状态才能申请支付', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              lockScroll: true
            });
            return;
          }
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
              this.applyPayForm.paidTypeName = this.enterFrom.paidTypeName = res.data[0].paidTypeName;
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
      // 支付方向列表
      payDirListFun () {
        api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'FNNC_PAY_DIR', ids: [1, 2]}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.appPayForm.payDirList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 申请支付---》企业
      custSuppFun () {
        this.applyPayForm.custSuppName = '';
      },
      payDirFun (id) {
        if (this.appPayForm.payDir === 2) {
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
      // 企业列表
      enterpriseFun () {
        api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'CUST_OR_SUPP'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.isAddiPkgList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看全部
      viewAll (pageNum, pageSize) {
        if (this.seachForm.natMon) {
          this.seachForm.natMon = Vue.filter('date')(this.seachForm.natMon, 'yyyy');
        }
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.seachForm
        };
        api.post(this.apiPath.hrsc.findPaidOrdersAndDetPageButton, obj).then(res => {
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
      // 查看报销单
      cheReiFun () {
        this.detailsFalg = true;
      },
      // 查看详情
      seeDetaFun () {
        this.detailsFalg = true;
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
