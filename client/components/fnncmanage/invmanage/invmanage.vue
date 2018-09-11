<template>
  <div class="usermanage">
    <div class="invinfo">
      <sino-con class="sino-con-more">
        <sino-title type="levelOne" title="发票查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box invoice-ul">
              <li class="invoice-li">
                <span class="search-inner-name invoice-li-width">客户/供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="billSuppCust"
                             :data="{title:''}"
                             :chooseName.sync="billSuppCustFrom.custOrSuppName"
                             :chooseId.sync="billSuppCustFrom.custOrSuppId"
                             :clear="true"
                             @contentChange="contentChange">
                </sino-select>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">业务员：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="findUserRoleGroupByUserName"
                             :data="{orgIds:[], roleTypes:[5,16]}"
                             :chooseName.sync="billSuppCustFrom.ywyName"
                             :chooseId.sync="billSuppCustFrom.ywyId"
                             :clear="true" >
                </sino-select>
              </li>
              <li>
                <span class="search-inner-name">账单编号：</span>
                <sino-input
                  v-model="billSuppCustFrom.creYm"
                  type="text"
                  class="fl"
                 >
                </sino-input>
              </li>
              <li>
                <span class="search-inner-name">票据类型：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :data="{code: 'BILL_TYPE', ids: [1, 3]}"
                             :url="getDictSelectBox"
                             :chooseName.sync="billSuppCustFrom.billTypeName"
                             :chooseId.sync="billSuppCustFrom.billType"
                             :clear="true" >
                </sino-select>
              </li>
              <li>
                <span class="search-inner-name">票号：</span>
                <sino-input type="text" class="fl" v-model="billSuppCustFrom.invNo"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">邮寄领取状态：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :data="{code: 'INV_CLIAM_STATE'}"
                             :url="getDictSelectBox"
                             :chooseName.sync="billSuppCustFrom.postClaimStsteName"
                             :chooseId.sync="billSuppCustFrom.postClaimStste"
                             :clear="true" >
                </sino-select>
              </li>
              <li  >
                <span class="search-inner-name">是否取消开票：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :data="{code: 'DRAWER_STATE'}"
                             :chooseName.sync="billSuppCustFrom.isCancelName"
                             :chooseId.sync="billSuppCustFrom.isCancel"
                             :clear="true" >
                </sino-select>
              </li>
              <li class="invoice-li">
                <span class="search-inner-name invoice-li-width">开票日期：</span>
                <sino-date-picker
                  v-model="billSuppCustFrom.moaInvoiceBegTime"
                  type="date"
                  :editable="false"
                  :readonly="false"
                  :clearable="false">
                </sino-date-picker>
                <span>至</span>
                <sino-date-picker
                  v-model="billSuppCustFrom.moaInvoiceEndTime"
                  type="date"
                  :editable="true"
                  :readonly="false"
                  :clearable="false">
                </sino-date-picker>
              </li>
              <li v-if="searchFlag">
                <span class="search-inner-name">领取人：</span>
                <sino-input class="fl" type="text" v-model="billSuppCustFrom.claimManName"
                            :disabled="false"></sino-input>

              </li>
              <li class="invoice-li" v-if="searchFlag">
                <span class="search-inner-name invoice-li-width">领取日期：</span>
                <sino-date-picker
                  v-model="billSuppCustFrom.claimBegTime"
                  type="date"
                  :editable="false"
                  :readonly="false"
                  :clearable="false">
                </sino-date-picker>
                <span>至</span>
                <sino-date-picker
                  v-model="billSuppCustFrom.claimEndTime"
                  type="date"
                  :editable="true"
                  :readonly="false"
                  :clearable="false">
                </sino-date-picker>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('billSuppCustFrom')">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
          <div class="search-more">
            <div @click="searchFlag = !searchFlag">
              <i class="iconfont" :class="{'sino-shuangjiantou-copy':!searchFlag,'sino-angle-double-up':searchFlag}"></i>
              <span v-if="!searchFlag">高级查询</span>
              <span v-if="searchFlag">基本查询</span>
            </div>
          </div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class=" sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button class="fl" type="icon-text" @click="clickCharge()"><i class="iconfont sino-qian"></i>领取
            </sino-button>
            <sino-button class="fl" type="icon-text" @click="mailFun()"><i class="iconfont sino-download-copy fs19"></i>邮寄
            </sino-button>
            <div class="fl cancel-operation">
              <sino-dropdown trigger="click" @visible-change="dropdownDel">
                <span class="el-dropdown-link sino-dropdown-link" @click="dropdown = false"
                      :class="{'is-active':dropdown === true,'is-delete':dropdown === false}">
    <i class="iconfont sino-invalid"></i>取消操作<i class="iconfont sino-unie628"></i>
  </span>
                <sino-dropdown-menu class="role_menu">
                  <sino-dropdown-item>
                    <div @click="cancelBillFun('取消开票')">取消开票</div>
                  </sino-dropdown-item>
                  <sino-dropdown-item>
                    <div @click="cancelBillFun('取消领取')">取消领取</div>
                  </sino-dropdown-item>
                  <sino-dropdown-item>
                    <div @click="cancelBillFun('取消邮寄')">取消邮寄</div>
                  </sino-dropdown-item>
                </sino-dropdown-menu>
              </sino-dropdown>
            </div>
          </div>
        </div>
        <div class="sino-queryspan">
          <span>合计：<em>{{page.total ? page.total : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{cheTabLen ? cheTabLen : 0}}</em> 条
          </span>
          <span class="fr">总金额：<em>&yen;{{totalInvAmo}}</em></span>
        </div>
        <sino-table class="clearMarginTop" :data="tableData"  v-on:viewAll="viewAll" v-on:select="selectCallBack" @select-all="selectIndexCallback" stripe border max-height="416">
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="custOrSuppName" label="客户/供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="invNo" label="票号" min-width="180"></sino-table-column>
          <sino-table-column prop="billTypeName" label="票据类型" min-width="105"></sino-table-column>
          <sino-table-column prop="invAmo" label="金额"></sino-table-column>
          <sino-table-column prop="invSub" label="发票科目" min-width="95"></sino-table-column>
          <sino-table-column prop="invTypeName" label="普票/专票" min-width="95"></sino-table-column>
          <sino-table-column prop="drawerStateName" label="开票状态" min-width="95"></sino-table-column>
          <sino-table-column prop="chargeStateName" label="收费状态" min-width="160"></sino-table-column>
          <sino-table-column prop="postReStateName" label="领取/邮寄状态" min-width="160"></sino-table-column>
          <sino-table-column prop="postReDate" label="领取/邮寄日期" min-width="160"></sino-table-column>
          <sino-table-column prop="billNo" label="账单编号" min-width="160"></sino-table-column>
          <sino-table-column prop="moaInvoiceDate" label="开票日期" min-width="160"></sino-table-column>
          <sino-table-column prop="ywyName" label="业务员" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" width="50" fixed="right">
            <template scope="scope">
                <span class="table-span" @click="seeFun(scope.row)">查看</span>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!--领取弹层-->
    <sino-dialog :visible.sync="remiAddFlag" size="small" :top="'3%'" class="dialog-height" @close="dialogClose('remiPublishForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="remiPublishForm"  ref="remiPublishForm"  :rules="remiPublishRules" class="demo-sendAddrAddForm">
        <sino-form-item  label="领取类型：" class="h25" prop="claimTypeName">
          <sino-select
            :filterable="true"
            :multiselect="false"
            :isshowTotol="false"
            :totalNum="false"
            :isPage="true"
            :isGroup="false"
            :url="selectBox"
            :data="{code: 'CLAIM_TYPE'}"
            :chooseName.sync="remiPublishForm.claimTypeName"
            :chooseId.sync="remiPublishForm.claimType"
            :clear="true"
          ></sino-select>
        </sino-form-item>
        <sino-form-item  label="领取人：" prop="claimMan">
          <sino-input type="text" v-model="remiPublishForm.claimMan"></sino-input>
        </sino-form-item>
        <sino-form-item  label="领取日期：" prop="claimDate">
          <sino-date-picker
            v-model="remiPublishForm.claimDate"
            type="date"
            :editable="false"
            :readonly="false"
            :clearable="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item  label="票号：" class="sino-form-item-width" prop="invNo">
          <sino-input type="text"  disabled v-model="remiPublishForm.invNo"></sino-input>
        </sino-form-item>
        <sino-form-item  label="票据总金额："  prop="invAmo" >
          <sino-input type="text"  disabled v-model="remiPublishForm.invAmo"></sino-input>
        </sino-form-item>
        <sino-form-item  label="本次领取票据数(张)：" prop="claimTracingCount">
          <sino-input type="text" disabled v-model="remiPublishForm.claimTracingCount"></sino-input>
        </sino-form-item>
        <sino-form-item  label="汇款单总金额：" prop="remiAmo">
          <sino-input type="text" disabled v-model="remiPublishForm.remiAmo"></sino-input>
        </sino-form-item>
        <sino-form-item  label="账单总金额：" prop="billAmo">
          <sino-input type="text" disabled v-model="remiPublishForm.billAmo"></sino-input>
        </sino-form-item>

        <sino-form-item prop="remark" label="备注：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="remiPublishForm.remark"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
    <!--邮寄弹层 -->
    <sino-dialog :visible.sync="mailAdd" size="layout"  @close="dialogClose('mailForm')" class="mail-dialog" top="5%">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="邮寄信息"></sino-title>
      <div class="usermanagement-modify1 clearfix clearTop">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span>共选{{mailForm.invCount}}张票据，自动区分邮寄{{mailForm.groupCount}}份，正在处理第 {{mailForm.indexNo}} 份。</span>
        </div>
        <sino-form :model="mailForm" ref="mailForm" class=" mail-form-width" :rules="mainRules">
          <sino-form-item label="快递公司：" prop="trackingCompanyName" class="h25" >
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :data="{code: 'TRACKING_COMPANY'}"
                         :url="selectBox"
                         :chooseName.sync="mailForm.trackingCompanyName"
                         :chooseId.sync="mailForm.trackingCompany"
                         @change="areaFun"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="快递单号：" prop="trackingNumber">
            <sino-input v-model="mailForm.trackingNumber"></sino-input>
          </sino-form-item>
          <sino-form-item label="所属地区：" prop="ownAreaName" class="h25" >
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'OWN_AREA'}"
                         :url="selectBox"
                         :chooseName.sync="mailForm.ownAreaName"
                         :chooseId.sync="mailForm.ownArea"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="快递金额：" prop="trackingMoney">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'TRACKING_FEE'}"
                         :url="selectBox"
                         :chooseName.sync="mailForm.trackingMoney"
                         :chooseId.sync="mailForm.tracking"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="邮寄人：" prop="trackingMan">
            <sino-input v-model="mailForm.trackingMan"></sino-input>
          </sino-form-item>
          <sino-form-item label="邮寄日期：" prop="claimDate">
            <sino-date-picker
              v-model="mailForm.claimDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-title type="levelTwo" title="全部工资项" class="fl service-module-title mb15"></sino-title>
          <sino-form-item  label="票号：" class="sino-form-item-width" prop="invNo">
            <sino-input type="text"  v-model="mailForm.invNo" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="票据总金额：" prop="invAmo">
            <sino-input v-model="mailForm.invAmo" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="本次邮寄票据数：" prop="claimTracingCount" class="h25" >
            <sino-input v-model="mailForm.claimTracingCount" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="汇款单总金额：" prop="remiAmo">
            <sino-input v-model="mailForm.remiAmo" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="账单总金额：" prop="billAmo">
            <sino-input v-model="mailForm.billAmo" disabled></sino-input>
          </sino-form-item>
          <div class=" usermanagement-modify1 clearfix elseBox">
            <ul class="search-inner-box invoice-ul">
              <li class="invoice-li-name-one">
                <span class="search-inner-name invoice-li-width">收件人：</span>
                <div class="fl lineHeight">{{mailForm.contName}}</div>
              </li>
              <li class="invoice-li-name-one">
                <span class="search-inner-name invoice-li-width">联系电话：</span>
                <div class="fl lineHeight">{{mailForm.contTel}}</div>
              </li>
              <li class="invoice-li">
                <span class="search-inner-name invoice-li-width">邮寄地址：</span>
                <div class="fl lineHeight">{{mailForm.addrDet}}</div>
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <a href="javascript:;" class="hrefRouter" @click="toggle(-1)" v-if="mailForm.indexNo !== 1">上一条</a>
        <sino-button type="primary" @click="mailSubmitFun('mailForm')">确 定</sino-button>
        <a href="javascript:;" class="hrefRouter" @click="toggle(1)" v-if="mailForm.indexNo !== mailForm.groupCount">下一条</a>
      </span>
    </sino-dialog>
    <!--取消信息弹层-->
    <sino-dialog :visible.sync="cancelBillAdd" size="samll"  @close="dialogClose('cancelBillForm')" class="usermanage">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" :title="alertTitleCancel"></sino-title>
      <div class="usermanagement-modify1 clearfix "  :class="{'clearTop': alertTitleCancel==='取消邮寄'}" >
        <div class="order-new" v-if="alertTitleCancel==='取消邮寄'">
          <i class="iconfont sino-tip"></i><span>共取消 {{cancelBillForm.num}} 张。</span>
        </div>
        <sino-form :model="cancelBillForm" :rules="cancelBillRules" ref="cancelBillForm" class="fl">
          <sino-form-item label="取消张数：" prop="num" v-if="alertTitleCancel!=='取消开票'" class="h25">
            <sino-input v-model="cancelBillForm.num" disabled></sino-input>
          </sino-form-item>

          <sino-form-item label="取消人：" prop="cancalClaimMan">
            <sino-input v-model="cancelBillForm.cancalClaimMan"></sino-input>
          </sino-form-item>
          <sino-form-item label="取消日期：" prop="cancalCliamDate">
            <sino-date-picker
              v-model="cancelBillForm.cancalCliamDate"
              type="date"
              :editable="false"
              :readonly="false"
              :clearable="false">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="cancalClaimReason" label="原因：">
            <sino-input type="textarea" v-model="cancelBillForm.cancalClaimReason"  :disabled="false" ></sino-input>
          </sino-form-item>
            <sino-checkbox class="sino-form-item-width marginLeft10" v-if="alertTitleCancel ==='取消领取'">关联取消同时领取的剩余票据</sino-checkbox>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="cancelBillSubmitFun(alertTitleCancel)">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看弹层信息-->
    <sino-dialog :visible.sync="seeFlag" size="layout"  @close="resetForm('seeForm')" dialogHide class="usermanage">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" title="查看发票"></sino-title>
      <div class="usermanagement-modify1">
        <sino-form :model="seeForm" ref="seeForm">
            <div class="service-module-box marTop " v-if="seeForm.invInfo">
              <sino-title type="levelTwo" title="票据信息" class="service-module-title"></sino-title>
              <div class="usermanagement-list">
                <ul class="usermanagement-ul">
                  <li class="li-last">
                    <h6>客户/供应商名称</h6><input type='text' v-model="seeForm.invInfo.custSuppName"/>
                  </li>
                  <li>
                    <h6>票据类型</h6><input type='text'v-model="seeForm.invInfo.billTypeName"/>
                  </li>
                  <li>
                    <h6>票号</h6><input type='text' v-model="seeForm.invInfo.invNo"/>
                  </li>
                  <li >
                    <h6>开票金额</h6><input type='text'v-model="seeForm.invInfo.invAmount"/>
                  </li>
                  <li >
                    <h6>专票/普票</h6><input type='text' v-model="seeForm.invInfo.invTypeName"/>
                  </li>
                  <li class="li-last">
                    <h6>开票状态</h6><input type='text' v-model="seeForm.invInfo.drawerStateName"/>
                  </li>
                  <li class="li-last">
                    <h6>发票项目</h6><input type='text' v-model="seeForm.invInfo.systemSummaryInvSub"/>
                  </li>
                </ul>
              </div>
            </div>
            <div class="service-module-box marTop" v-if="seeForm.trackingInfo">
              <sino-title type="levelTwo" title="邮寄信息" class="service-module-title1"></sino-title>
              <div class="usermanagement-list">
                <ul class="usermanagement-ul">
                  <li>
                    <h6>邮寄状态</h6><input type='text' v-model="seeForm.trackingInfo.trackingStateName"/>
                  </li>
                  <li>
                    <h6>邮寄人</h6><input type='text' v-model="seeForm.trackingInfo.trackingMan"/>
                  </li>
                  <li>
                    <h6>邮寄日期</h6><input type='text' v-model="seeForm.trackingInfo.trackingDate"/>
                  </li>

                  <li>
                    <h6>快递公司</h6><input type='text' v-model="seeForm.trackingInfo.trackingCompanyName"/>
                  </li>
                  <li>
                    <h6>快递单号</h6><input type='text' v-model="seeForm.trackingInfo.trackingNumber"/>
                  </li>
                  <li>
                    <h6>快递金额</h6><input type='text' v-model="seeForm.trackingInfo.trackingMoney"/>
                  </li>
                  <li>
                    <h6>联系人</h6><input type='text' v-model="seeForm.trackingInfo.recipients"/>
                  </li>
                  <li>
                    <h6>联系电话</h6><input type='text' v-model="seeForm.trackingInfo.telephoneNumber"/>
                  </li>
                  <li class="li-last heightAuto">
                    <h6>邮寄地址</h6>
                    <input type="text" v-model="seeForm.trackingInfo.deliveryAddress">
                  </li>
                </ul>
              </div>
            </div>
            <div class="service-module-box marTop" v-if="seeForm.invClaim">
              <sino-title type="levelTwo" title="领取信息" class="service-module-title1"></sino-title>
              <div class="usermanagement-list">
                <ul class="usermanagement-ul">
                  <li>
                    <h6>领取状态</h6><input type='text' v-model="seeForm.invClaim.cancalCliamStateName"/>
                  </li>
                  <li>
                    <h6>领取人员类型</h6><input type='text' v-model="seeForm.invClaim.claimTypeName"/>
                  </li>
                  <li>
                    <h6>领取人</h6><input type='text'  v-model="seeForm.invClaim.invClaimMan"/>
                  </li>
                  <li>
                    <h6>领取日期</h6><input type='text' v-model="seeForm.invClaim.invCliamDate"/>
                  </li>
                  <li class="sixsix">
                    <h6>备注</h6><input type='text'  v-model="seeForm.invClaim.remark"/>
                  </li>
                </ul>
              </div>
            </div>
            <div class="service-module-box marTop" v-if="seeForm.cancalInvInfoVO">
              <sino-title type="levelTwo" title="取消信息" class="service-module-title1"></sino-title>
              <div class="usermanagement-list">
                <ul class="usermanagement-ul">
                  <li>
                    <h6>取消人</h6><input type='text' v-model="seeForm.cancalInvInfoVO.cancalMan"/>
                  </li>
                  <li>
                    <h6>取消日期</h6><input type='text'v-model="seeForm.cancalInvInfoVO.cancalDate"/>
                  </li>
                  <li class="li-last">
                    <h6>原因</h6><input type='text'v-model="seeForm.cancalInvInfoVO.cancalReason"/>
                  </li>
                </ul>
              </div>
            </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeFn">确 定</sino-button>
      </span>
    </sino-dialog>

  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  let invNoS = []; // 查询出来的票号集合
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
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
  let dDate = new Date();
  let checkedArr = [];
  let billingDeterData1 = {
    invSub: 1,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票日期
    invType: null, // 发票类型
    invTypeName: ''
  };
  let billingDeterData2 = {
    invSub: 2,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票时间
    invType: null, // 发票类型
    invTypeName: ''
  };
  let billingDeterData3 = {
    invSub: 3,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票时间
    invType: null, // 发票类型
    invTypeName: ''
  };
  let billingDeterData4 = {
    invSub: 4,
    invSubName: '',
    amountMoney: '',
    invNo: "",        // 发票号
    InvAmount: null,   //  发票金额
    systemSummerInvSub: '', // 系统合计发票科目
    DrawerMan: '',  // 开票人
    drawerTime: '', // 开票时间
    invType: null, // 发票类型
    invTypeName: ''
  };
  let itemData;

  export default {
    components: {},
    data () {
      return {
        findUserRoleGroupByUserName: this.apiPath.author.findUserRoleGroupByUserName,
        alertTitle: '',
        alertTitleCancel: '',
        remiAddFlag: false,
        btnText: '',
        faTr: {
          collecSocSec: true,
          collecAccFund: true,
          collecWages: true,
          collecCharge: true
        },
        collecSocSec: 0,  // 代收社保
        collecAccFund: 0,  // 代收公积金
        collecWages: 0,  // 代收发工资
        collecCharge: 0,  // 服务费
        totalAmount: 0, // 总金额
        token: Cookie.get('Token'),
        cancelTi: true,
        receipt: {
          InvAmount: '',
          DrawerMan: '',
          drawerTime: '',
          billId: '',
          billNo: '',
          billType: null,
          invType: 1,
          custorsuppType: ''
        },
        receiptDataRules: {},
        receiptData: [], // 收据发送的数据
        receiptModu: {},
        options: [],   //  开票表格发票科目下拉框
        invoiceOptions: [], // 开票表格发票类型下拉框
        currentdate: '', // 当前日期
        userName: Cookie.get('CPYY-INFO-NAME'),
        hideShow: false, // 开票信息弹层内容的显示
        determineSentData: {
          billId: '',
          billNo: '',
          custorsuppType: '',
          billType: ''
        }, // 开票弹层确定发送的公共数据
        remiSeeList: [], // 发票信息
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        getDictInfoDetail: this.apiPath.hrsc.getDictInfoDetail,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        billSuppCust: this.apiPath.hrsc.billSuppCust, // 客户/供应商下拉框
        findInvSubInv: this.apiPath.hrsc.findInvSubInv, // 发票管理的一查询
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType, // 业务员
        saveInvInfo: this.apiPath.hrsc.saveInvInfo, // 开票
        selectBox: this.apiPath.hrsc.getDictSelectBox,
        uploadHeader: {Token: ""},
        searchFlag: false,
        billingAdd: false, // 开票
        receiveAdd: false, // 领取
        mailAdd: false, // 邮寄
        invoiceFlag: false, // 发票信息弹层
        backFormFlag: false, // 发布退回
        backForm: {publishRetReason: ""},
        /*  wxy */
        remiPublishForm: {
          claimType: '', // 领取类型
          claimTypeName: '',
          claimMan: '', // 领取人
          claimDate: '', // 领取日期
          invNo: '', // 票号
          invAmo: '', // 票据总金额
          claimTracingCount: '', // 本次领取票据数
          remiAmo: '', // 汇款单总金额
          billAmo: '', // 账单总金额
          remark: ''
        },
        billSuppCustFrom: {
          custOrSuppName: '', // 客户供应商名称
          custOrSuppId: '', //  供应商id/客户id
          custOrSuppType: '', // 客户供应商类别
          creYm: '', // 账单编号
          ids: null, // 业务员id集合
          ywyId: null, // 业务员id
          ywyName: '',
          billType: '', // 票据类型id
          billTypeName: '',
          invNo: '', // 发票
          postClaimStste: '', // 邮寄领取状态
          postClaimStsteName: '',
          isCancel: '', // 是否取消开票id
          isCancelName: '', // 是否取消开票id
          moaInvoiceBegTime: '', // 开票开始日期
          moaInvoiceEndTime: '', // 开票结束日期
          claimManName: '', // 领取ren
          claimBegTime: '', // 领取开始日期
          claimEndTime: '' // 领取结束日期
        },
        page: {
          total: null,
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        cheTabLen: 0,
        totalInvAmo: 0,
        tableData: null,
        /* wxy */
        cancelBillAdd: false, // 取消操作弹层
        importVisible: false, // 导入完成后弹层
        dropdown: false,
        seeFlag: false,
        searchForm: { // 搜索条件
          custChName: '', // 客户名称
          custChId: '', // 客户ID
          chargeStateName: '', // 收费状态
          chargeState: '', // 收费状态ID
          chargeBillNo: '', // 账单编号
          custSource: '',
          custSourceName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppName: '',
          paySuppId: '',
          data: ''
        },
        seeForm: {
          invInfo: { /* 发票对象 */
            invInfoId: '',
            invInfoIds: '',
            billType: '', // "发票", 票据类型
            billTypeName: '',
            invType: '', // "普票", 发票类型
            invTypeName: '',
            invNo: '',
            systemSummaryInvSub: '', // "代收公积金", 开票科目
            drawerTime: '',
            creId: '',
            creTime: '',
            drawerState: '',
            drawerStateName: '', // 开票状态
            cancelInvReason: '',
            cancelInvMan: '',
            cancelInvTime: '',
            cancelInvDate: '',
            cancelDrawerMan: '',
            cancelDrawerTime: '',
            userRoleId: '',
            custSuppType: '',
            custSuppName: '', // 客户供应商名称
            invClaimState: '',
            billId: '',
            invAmount: '', // 开票金额
            drawerMan: ''
          },
          trackingInfo: {
            trackingInfoId: '',
            trackingNumber: '', // 快递单号
            trackingCompany: '', // 快递公司
            trackingState: '', // 邮寄状态
            trackingStateName: '',
            ownArea: '',
            ownAreaName: '',
            trackingDate: '', // 邮寄日期
            trackingMan: '', // 寄件人
            operId: '',
            operTime: '',
            custNaem: '',
            recipients: '', // 收件人
            telephoneNumber: '', // 电话
            deliveryAddress: '' // 邮寄地址
          },
          invClaim: { /* 发票领取 */
            invClaimId: '',
            invInfoId: '',
            claimType: '',
            claimTypeName: '', // 领取类型
            invClaimMan: '', // 领取人
            invCliamDate: '', // 领取日期
            remark: '', //  备注
            operId: '',
            operTime: '',
            cancalClaimReason: '',
            cancalClaimMan: '', // 人
            cancalCliamDate: '', // 时间
            cancalCliamState: '', //
            cancalCliamStateName: '' // 领取状态
          },
          cancalInvInfoVO: {
            cancalMan: '',
            cancalDate: '',
            cancalReason: ''
          }
        },
        // 取消信息弹层数据
        cancelBillForm: {
          num: '', // 取消张数
          invNoList: '', // 票号的集合
          cancalClaimMan: Cookie.get('CPYY-INFO-NAME'), // 取消人
          cancalCliamDate: '', // 取消日期
          cancalClaimReason: '' // 原因
        },
        cancelBillRules: {
          cancalClaimMan: [
            {required: true, message: '请输入取消人', trigger: 'blur'}
          ],
          cancalCliamDate: [
            {required: true, message: '请选择取消日期', trigger: 'change', type: 'date'}
          ],
          cancalClaimReason: [
            {required: true, message: '请输入取消原因', trigger: 'blur'}
          ]
        },
        // 邮寄弹层数据
        mailForm: {
          claimTracingCount: '',
          groupCount: '',
          invCount: '',
          claimDate: '', // 邮寄日期
          trackingCompany: '', // 快递公司
          trackingCompanyName: '', // 快递公司
          trackingNumber: '', // 快递单号
          ownArea: '', // 所属地区
          ownAreaName: '', // 所属地区
          trackingMoney: '', // 邮寄费用
          trackingMoneyList: '',
          trackingMan: '', // 邮寄人
          contName: '', // 收件人
          contTel: '', // 联系电话
          addrDet: '', // 纤细地址
          invNo: '', // 发票号
          invAmo: '', // 发票金额
          invGroupCount: '', // 发票张数
          remiAmo: '', // 汇款单金额
          remark: '',
          claimType: '',
          claimMan: '',
          indexNo: '',
          billAmo: '', // 收费账单金额
          invTrackingDraft: '',
          tracking: ''
        },
        mainRules: {
          trackingCompanyName: [
            {required: true, message: '请选择快递公司', trigger: 'change'}
          ],
          trackingNumber: [
            {required: true, message: '请输入快递单号', trigger: 'change'}
          ],
          ownAreaName: [
            {required: true, message: '请选择所属地区', trigger: 'change'}
          ],
          trackingMoney: [
            {required: true, message: '请输入快递金额', trigger: 'change'},
            {validator: this.validator.checkReNum, trigger: 'change'}
          ],
          trackingMan: [
            {required: true, message: '请输入邮寄人', trigger: 'change'}
          ]
        },
        remiPublishRules: {
          claimTypeName: [
            {required: true, message: '请选择领取类型', trigger: 'change'}
          ],
          claimMan: [
            {required: true, message: '请输入领取人', trigger: 'blur'}
          ]
        },
        // 开票弹层数据
        billingList: [],
        billingForm: {
          id: 1
        },
        // 表格数据
        billingData: [],
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        total: 0, // 分页总条数
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        billHang: '',  // 一行的数据；
        releaseDackData: {}, // 发布退回专用数据
        choosedId: [],
        saleData: [],
        ids: null
      };
    },
    watch: {
      'mailForm.ownArea': function (item) {
        if (item) {
          let _this = this;
          if (_this.mailForm.trackingCompany === 1) {
            if (item === 2) {
              /* 顺风省外 */
              _this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 3) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
              // this.mailForm.trackingMoney = this.mailForm.trackingMoneyList[2].title;
            } else if (item === 1) {
              _this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 2) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
            } else if (item === 3) {
              /* 顺风市内 */
              _this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 1) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
            }
          } else if (this.mailForm.trackingCompany === 2) {
            if (item === 1) {
              /* EMS省内 */
              _this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 4) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
            } else if (item === 2) {
              /* EMS省外 */
              _this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 5) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
            }
          }
        }
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        const d = new Date(value);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
        return year + '-' + month + '-' + day + ' ';
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
      this.saleDataLikstFun();
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 业务员下拉框
      saleDataLikstFun () {
        api.post(this.findUserRoleGroupByUserName, {orgIds: [], roleTypes: [5, 16]}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.saleData = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      contentChange (item) {
        this.billSuppCustFrom.custOrSuppType = item.flag;
      },
      /* 点击收费调用的 */
      clickCharge () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请至少选择一条', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let invNoS = [];
        for (let i = 0; i < checkedArr.length; i++) {
          invNoS.push(checkedArr[i].invNo);
        }
        api.post(this.apiPath.hrsc.getCashingInv, invNoS).then(res => {
          if (res.code === 'CPYY-00001') {
            this.alertTitle = '发票领取';
            this.remiAddFlag = true;
            this.btnText = '确 定';
            this.remiPublishForm = res.data;
            this.remiPublishForm.claimTypeName = '';
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消开票
      cancelBillFun (data) {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请至少选择一条', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        for (let i = 0; i < checkedArr.length; i++) {
          invNoS.push(checkedArr[i].invNo);
        }
        this.alertTitleCancel = data;
        this.cancelBillAdd = true;
        this.cancelBillForm.invNoList = invNoS;
        this.cancelBillForm.num = checkedArr.length;
      },
      // 取消 ---> 确定
      cancelBillSubmitFun (data) {
        this.$refs.cancelBillForm.validate((valid) => {
          /* 取消开票 */
          if (data === '取消开票') {
            api.post(this.apiPath.hrsc.cancalInvoiceInv, this.cancelBillForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.cancelBillAdd = false;
                this.$message({message: '取消开票成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (data === '取消领取') {
            api.post(this.apiPath.hrsc.cancalCashingInv, this.cancelBillForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.cancelBillAdd = false;
                this.$message({message: '取消领取成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (data === '取消邮寄') {
            api.post(this.apiPath.hrsc.cancalCtrackingInv, this.cancelBillForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.cancelBillAdd = false;
                this.$message({message: '取消邮寄成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      dropdownDel () {
        this.dropdown = !this.dropdown;
      },
      // 邮寄弹层
      mailFun () {
        if (!checkedArr || checkedArr.length < 1) {
          this.$alert('请至少选择一条', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        /* 如果选择的那条是领取过的也显示报错 */
        let invNoS = [];
        for (let i = 0; i < checkedArr.length; i++) {
          invNoS.push(checkedArr[i].invNo);
        }
        api.post(this.apiPath.hrsc.getCtrackingInv, invNoS).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mailAdd = true;
          /*  this.$set(res.data, 'contName', 'zhnagsan');
            this.$set(res.data, 'contTel', '1111');
            this.$set(res.data, 'addrDet', '222222'); */
            this.mailForm = res.data;
            console.log(this.mailForm.invCount);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resetFun (formName) {
        for (var key in this.billSuppCustFrom) {
          this.billSuppCustFrom[key] = '';
        }
      },
      mailSubmitFun () {
        this.$refs.mailForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.ctrackingInv, this.mailForm).then(res => {
              if (res.code === 'CPYY-00001') {
                if (this.mailForm.indexNo === this.mailForm.groupCount) {
                  this.mailAdd = false;
                }
                this.$message({message: '保存成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      /* 邮寄上一条下一条 */
      toggle (data) {
        api.post(this.apiPath.hrsc.updateDraftInv, this.mailForm).then(res => {
          if (res.code === 'CPYY-00001') {
            // this.mailForm = res.data;
            if (data === 1) {
              this.mailForm.indexNo =  this.mailForm.indexNo + 1;
              this.mailForm.invTrackingDraft =  this.mailForm.invTrackingDraft + 1;
            }
            if (data === -1) {
              this.mailForm.indexNo =  this.mailForm.indexNo - 1;
              this.mailForm.invTrackingDraft =  this.mailForm.invTrackingDraft - 1;
            }
            api.post(this.apiPath.hrsc.getDraftInv, this.mailForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.dialogClose('mailForm');
                let that = this;
                setTimeout(function () {
                  if (res.data) {
                    that.mailForm = res.data;
                  }
                });
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 领取弹层
      receiveFun () {
        this.receiveAdd = true;
      },
      receiveSubmitFun () {
        this.$refs.receiveForm.validate((valid) => {
          if (valid) {
            this.receiveAdd = false;
          }
        });
      },
      submitForm (formName) {
        if (formName) {
          if (this.alertTitle === '发票领取') {
            api.post(this.apiPath.hrsc.cashingInv, this.remiPublishForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.remiAddFlag = false;
                this.searchFun();
                this.$message({message: '领取成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            api.post(this.apiPath.accu.updateAccuCenter, this.addAndModifyForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.leadsAdd = false;
                this.searchFun();
                this.$message({message: '修改成功！', type: 'success'});
              }
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      },
      /* wxy */
      /* 查看确认按钮 */
      seeFn () {
        this.seeFlag = false;
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
        this.cheTabLen = checkedArr.length;
        let _this = this;
        let data = 0;
        let aaa = 0;
        if (checkedArr.length === 0) {
          this.totalInvAmo = 0;
        };
        checkedArr.forEach(function (item) {
          if (item) {
            aaa = (item.invAmo * 100);
            data += aaa;
            _this.totalInvAmo = data / 100;
          }
        });
      },
      selectIndexCallback (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.custOrSuppName) {
            all.push(item);
          }
        }
        this.selectCallBack(all, row);
      },
      viewAll: function () {
        this.getList('all');
      },
      searchFun () {
        this.pageNum = 1;
        this.cheTabLen = 0;
        this.totalInvAmo = 0;
        this.getList();
      },
      getList (all) {
        let obj = {};
        this.billSuppCustFrom.moaInvoiceBegTime = Vue.filter('date')(this.billSuppCustFrom.moaInvoiceBegTime, 'yyyy-MM-dd');
        this.billSuppCustFrom.moaInvoiceEndTime = Vue.filter('date')(this.billSuppCustFrom.moaInvoiceEndTime, 'yyyy-MM-dd');
        obj.data = this.billSuppCustFrom;
        getPageInfo(obj, this.page);
        for (let item of this.saleData) {
          if (this.billSuppCustFrom.ywyId && item.id === this.billSuppCustFrom.ywyId) {
            this.billSuppCustFrom.ids = item.ids;
            break;
          }
        }
        api.post(this.findInvSubInv, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      resetForm (formName) {
        for (var key in this.seeForm) {
          this.seeForm[key] = '';
        }
      },
      dialogClose: function (formName) { // 修改对话框打开回调
        // debugger
        // this.$refs.remiPublishForm.$children[0].validateState = 'success';
        // this.$refs.remiPublishForm.$children[0].validateMessage = '';
        // this.$refs.remiPublishForm.$children[0].showMessage = false;
        // this.$refs.remiPublishForm.$children[0].resetField();
        // debugger
        // for (var key in this.remiPublishForm) {
        //   this.remiPublishForm[key] = '';
        // }
        this.$refs[formName].resetFields();
      },
      seeFun (data) {
        let obj = {
          invNo: data.invNo
        };
        api.post(this.apiPath.hrsc.getInvManager, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeFlag = true;
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 快递公司发生改变的时候顺风默认是省内，EMS是省外 */
      areaFun (item) {
        api.post(this.selectBox, {code: 'TRACKING_FEE'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mailForm.trackingMoneyList = res.data.list;
            if (item === '顺丰') {
              this.mailForm.ownAreaName = '省内';
              this.mailForm.ownArea = 1;
              /* 顺风省内的价位 */
              let _this = this;
              this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 2) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
            } else if (item === 'EMS') {
              this.mailForm.ownAreaName = '省外';
              this.mailForm.ownArea = 2;
              /* EMS省外的价位 */
              let _this = this;
              this.mailForm.trackingMoneyList.forEach(function (_item) {
                if (_item.id === 5) {
                  _this.mailForm.trackingMoney = _item.title;
                  _this.mailForm.tracking = _item.id;
                }
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      moneyFun (item) {
        let _this = this;
        if (this.mailForm.trackingCompanyName === '顺丰' && this.mailForm.trackingCompany === 1) {
          if (item === '省外') {
            /* 顺风省外 */
            this.mailForm.trackingMoneyList.forEach(function (_item) {
              if (_item.id === 3) {
                _this.mailForm.trackingMoney = JSON.parse(_item.title);
                _this.mailForm.tracking = _item.id;
              }
            });
            // this.mailForm.trackingMoney = this.mailForm.trackingMoneyList[2].title;
          } else if (item == '市内') {
            /* 顺风市内 */
            this.mailForm.trackingMoneyList.forEach(function (_item) {
              if (_item.id === 4) {
                _this.mailForm.trackingMoney = _item.title;
                _this.mailForm.tracking = _item.id;
              }
            });
            // this.mailForm.trackingMoney = this.mailForm.trackingMoneyList[0].title;
          }
        } else if (this.mailForm.trackingCompanyName === 'EMS' && this.mailForm.trackingCompany === 2) {
          if (item === '省内') {
            /* EMS省内 */
            // this.mailForm.trackingMoney = this.mailForm.trackingMoneyList[1].title;
          }
        }
      },
      billingAddClose: function (formName) { // 开票弹层关闭
        this.billingData = [];
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
