<template>
  <div class="usermanage psuch clearfix">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="体检费报销查询"></sino-title>
      <sino-form :model="physicalForm" ref="physicalForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box invoice-ul">
            <li class="search-inner-name">
              <span class="search-inner-name">雇员姓名：</span>
              <sino-input class="fl" type="text" v-model="physicalForm.empName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">证件号码：</span>
              <sino-input class="fl" type="text" v-model="physicalForm.certNo"
                          :disabled="false" ></sino-input>
            </li>
            <li>
              <span class="search-inner-name">办理进度：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code: 'PHYSICAL_EXAM_FEE_REIM_HANDLE_SCHEDULE'}"
                           :chooseName.sync="physicalForm.handleScheduleName"
                           :chooseId.sync="physicalForm.handleSchedule"
                           :clear="true" >
              </sino-select>
            </li>
            <li>
              <span class="search-inner-name">经办员：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :token="token"
                           :isPage="true"
                           :isGroup="false"
                           :url="findUserByOrgIdsAndRoleType"
                           :data="ywData"
                           :chooseName.sync="physicalForm.creName"
                           :chooseId.sync="physicalForm.creId"
                           :clear="true" >
              </sino-select>
            </li>
            <li  v-if="searchFlag" class="invoice-li">
              <span class="search-inner-name invoice-li-width">付费供应商：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="selectBox"
                           :token="token"
                           :chooseName.sync="physicalForm.paySuppName"
                           :chooseId.sync="physicalForm.paySuppId"
                           :clear="true" >
              </sino-select>
            </li>
            <li  v-if="searchFlag" class="invoice-li">
              <span class="search-inner-name invoice-li-width">客户名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :token="token"
                           :url="custUrl"
                           :chooseName.sync="physicalForm.custName"
                           :chooseId.sync="physicalForm.custId"
                           :clear="true"
              >
              </sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun(this.physicalForm)" v-if="searchFlag">重 置</sino-button>
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
    <!--Search result -->
    <div class=" sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button class="fl" type="icon-text" @click="record"><i class="iconfont sino-qian"></i>报销申请
          </sino-button>
        </div>
      </div>
      <sino-table :data="tableData" max-height="416" v-on:select="selectCallBack2" v-on:viewAll="viewAll" border stripe>
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
        <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
        <sino-table-column prop="handleScheduleName" label="办理进度" min-width="120"></sino-table-column>
        <sino-table-column prop="applyDate" label="申请日期" min-width="120"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
        <sino-table-column prop="paySuppName" label="付费供应商简称" min-width="180"></sino-table-column>
        <sino-table-column prop="creName" label="经办人" min-width="180"></sino-table-column>
        <sino-table-column type="hidden" prop="injIdenId" width="0"></sino-table-column>
        <sino-table-column label="操作" align="center" min-width="200" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="particular(scope.row)">查看</span><i class="table-i" v-if="scope.row.handleSchedule===1 ||　scope.row.handleSchedule===6" >|</i>
              <span class="table-span"  @click="modifyFun(scope.row)" v-if="scope.row.handleSchedule===1 ||　scope.row.handleSchedule===6">修改</span><i class="table-i" v-if="scope.row.handleSchedule===1 ||　scope.row.handleSchedule===6" >|</i>
              <span class="table-span"  @click="dalayFun(scope.row)" v-if="scope.row.handleSchedule===1 ||　scope.row.handleSchedule===6">申请支付</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page :page="page.pageNum"
                 v-bind:page-size="page.pageSize"
                 :pageArray="page.pageArray"
                 v-bind:object="object"
                 v-on:pagehandler="pageHandlerB"
                 v-on:choosePageFun="choooseNumB"
                 :total="page.total"></sino-page>
    </div>
    <!--put on records dialog-->
    <sino-dialog :visible.sync="recordAndapply" top="10%" size="samll"  dialogHide class="accuman-add-layer clearPadding" v-on:close="resetFn('recordAndapplyForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <div class="suppcont-tip fl positionF" >
        <i class="iconfont sino-tip"></i><span>可报销金额 <b class="fontStyle2">￥{{recordAndapplyForm.amoMargin ? recordAndapplyForm.amoMargin : 0}}</b>
        <span v-if="recordAndapplyForm.orderEndDate">订单结束日期为<b class="fontStyle2" >{{recordAndapplyForm.orderEndDate ? recordAndapplyForm.orderEndDate : 0}}</b></span>
      </span>
      </div>
      <div class="leadsAdd-form marginTop45 sino-con-more">
        <sino-form :model="recordAndapplyForm" ref="recordAndapplyForm" :rules="recordAndapplyRules" class="leadsAdd-Form">
          <sino-form-item label="雇员姓名：" prop="empName">
            <sino-input v-model="recordAndapplyForm.empName" type="text"></sino-input>
          </sino-form-item>
          <sino-form-item label="证件号码：" prop="certNo" >
            <sino-input  v-model="recordAndapplyForm.certNo" @blur="essential"></sino-input>
          </sino-form-item>
          <div v-for="(item, index) in recordAndapplyForm.physicalExamFeeReimDetList">
          <sino-form-item label="报销年度：" :prop="'physicalExamFeeReimDetList[' +index +'].reimNewYear'" :rules="[{type: 'date', required: true, message: '请输入报销年度', trigger: 'change'}]">
            <sino-date-picker
              type="year"
              v-model="item.reimNewYear"
              :editable="false"
              :readonly="false"
              :clearable="true"
              :picker-options="pickerOptionsBeg">
            </sino-date-picker>
            <span class="count-span-oper" @click="ctrlArray (index) "><i class="iconfont" :class="{'sino-add' : index === 0, 'sino-reduce': index !== 0}"></i> {{index === 0? '新增':'删除'}} </span>
      </sino-form-item>
          <sino-form-item  label="报销金额：" :prop="'physicalExamFeeReimDetList[' +index +'].reimAmo'" :rules="[{type: 'number', required: true, message: '请输入报销金额', trigger: 'change'}]">
              <sino-input v-model.number="item.reimAmo" type="text" @change="sumRustFun"></sino-input>
          </sino-form-item>
          </div>
          <sino-form-item label="报销总金额："   prop="reimSumAmo">
            <sino-input v-model="recordAndapplyForm.reimSumAmo" disabled type="text"></sino-input>
          </sino-form-item>
          <sino-form-item label="申请人："    prop="applyPerName">
            <sino-input v-model="recordAndapplyForm.applyPerName" type="text"></sino-input>
          </sino-form-item>
          <sino-form-item label="申请日期：" prop="applyDate">
            <sino-date-picker
              type="date"
              v-model="recordAndapplyForm.applyDate"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="申请人电话："  prop="applyPerTel">
            <sino-input v-model="recordAndapplyForm.applyPerTel" ></sino-input>
          </sino-form-item>
          <!-- 其它信息 -->
          <sino-title type="levelTwo" title="收款人信息" :style="{'overflow':'hidden'}" class="marginBottom10"></sino-title>
          <sino-form-item label="收款人：" prop="applyPerRelName" class="h25">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :url="getDictSelectBox"
                         :chooseName.sync="recordAndapplyForm.applyPerRelName"
                         :chooseId.sync="recordAndapplyForm.applyPerRel"
                         :data="{code: 'APPLY_PER_REL'}"
                         @contentChange="applyPerChange"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item v-if="noPer" label="收款人姓名：" prop="payeeName">
            <sino-input type="text" v-model="recordAndapplyForm.payeeName"></sino-input>
          </sino-form-item>
          <sino-form-item v-if="noPer" label="收款人证件号码：" prop="payeeCertNo">
            <sino-input type="text" v-model="recordAndapplyForm.payeeCertNo"></sino-input>
          </sino-form-item>
          <sino-form-item label="银行类型："  prop="bankTypeName">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="getDictSelectBox"
                         :chooseName.sync="recordAndapplyForm.bankTypeName"
                         :chooseId.sync="recordAndapplyForm.bankType"
                         :data="{code:'BANK_TYPE'}"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="银行账号："  class="sino-form-item-width" prop="bankNo">
            <sino-input  type="text"  v-model="recordAndapplyForm.bankNo" ></sino-input>
          </sino-form-item>
          <sino-form-item label="开户行："  class="sino-form-item-width" prop="bankName">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="bankInfoDropdown"
                         :chooseName.sync="recordAndapplyForm.bankName"
                         :chooseId.sync="recordAndapplyForm.bankId"
                         :data="bankData"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <div class="upload updata-box">
            <sino-auto-table :data="recordAndapplyForm.physicalExamFeeReimMatList"  width="100%" stripe border>
              <sino-table-column type="selection"  width="50"></sino-table-column>
              <sino-table-column prop="confMatName" label="所需材料" align="left"></sino-table-column>
              <sino-table-column prop="matEncId" label="已上传文件" align="center">
                <template scope="scope" v-if="scope.row.oper == true">
                  <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                  <span class="i-color" v-if="scope.row.matName" @click="deleFileFun(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                </template>
              </sino-table-column>
              <sino-table-column label="操作" align="center" width="80">
                <template scope="scope" v-if="scope.row.oper == true">
                  <sino-upload
                    ref="layUpload"
                    :action="uploadFilePublic"
                    :show-file-list="false"
                    :auto-upload="true"
                    :on-change="getFileName1"
                    :on-success="fileSuccess1"
                    :on-error="fileError1"
                  >
                    <div slot="trigger">
                      <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                    </div>
                  </sino-upload>
                </template>
              </sino-table-column>
            </sino-auto-table>
            <sino-input class="clearBoderTop" type="textarea"  v-model="recordAndapplyForm.remark"></sino-input>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm('recordAndapplyForm')">{{btnText}}</sino-button>
          <sino-button   @click="sendFile">申请支付</sino-button>
      </span>
    </sino-dialog>

    <!--申请支付-->
    <sino-dialog :visible.sync="reimbFalg" size="large" class="mail-dialog see-dirc suppinfo-dialog-box big-supp-dialog" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="费用报销单" class="sino-dialog-title"></sino-title>
      <div class="remib">
        <!--头部-->
        <div class="remib-top">
          <!--标题-->
          <div class="remib-title">
            <h5>费用报销单</h5>
            <h3>报销日期<span v-text="expenInfoData.year"></span>年
              <span v-text="expenInfoData.month"></span>月
              <span v-text="expenInfoData.date"></span>日</h3>
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
            <template v-for="(item,index) in expenInfoData.reimOrderItems">
              <li class="fl width-med" ><input type="text" placeholder="可输入" v-model="item.reimOrderItem" v-if="!item.empty"/></li>
              <li class="fl">{{item.reimOrderTypeName}}</li>
              <li class="fl">{{item.reimOrderItemAmo}}</li>
            </template>
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
              <span v-text="expenInfoData.chargePerId"></span>
            </li>
            <li class="fl right-tl">
              <h6>审 查 意 见</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <span v-text="expenInfoData.reviewPerId"></span>
            </li>
            <li class="fl right-tl right-t1">
              <h6>财 务 审 核</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null">
              <span v-text="expenInfoData.fnncAppId"></span>
            </li>
            <li class="fl right-tl">
              <h6>部 门 审 查</h6>
            </li>
            <li class="fl rigght-tr bor-null">
              <span v-text="expenInfoData.depAppId"></span>
            </li>
            <li class="fl right-meo bor-null">
              <span>￥</span><span>{{toMoney(expenInfoData.reimSumAmo)}}</span>
            </li>
          </ul>
          <!--表格底部-->
          <ul class="table-bottom fl">
            <li class="fl bottom-f1 bor-null">
              <span class="fl meo-mar-le">核实金额（大写）
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 7)?toBigNum(expenInfoData.reimSumAmo, 7):'零'}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 6)?toBigNum(expenInfoData.reimSumAmo, 6):'零'}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 5)?toBigNum(expenInfoData.reimSumAmo, 5):'零'}}</span>万
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 4)?toBigNum(expenInfoData.reimSumAmo, 4):'零'}}</span>仟
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 3)?toBigNum(expenInfoData.reimSumAmo, 3):'零'}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 2)?toBigNum(expenInfoData.reimSumAmo, 2):'零'}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, 1)?toBigNum(expenInfoData.reimSumAmo, 1):'零'}}</span>元
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, -1)?toBigNum(expenInfoData.reimSumAmo, -1):'零'}}</span>角
                <span class="w40">{{toBigNum(expenInfoData.reimSumAmo, -2)?toBigNum(expenInfoData.reimSumAmo, -2):'零'}}</span>分
              </span>
              <span class="fr mr10">￥ {{toMoney(expenInfoData.reimSumAmo)}} 小写</span>
            </li>
            <li class="fl bottom-f2 bott-co">
              <h6>借款数</h6>
            </li>
            <li class="fl bottom-f3" v-text="expenInfoData.loanAmo"></li>
            <li class="fl bottom-f3 bott-co">
              <h6>应退金额</h6>
            </li>
            <li class="fl bottom-f3" v-text="expenInfoData.refundAmo"></li>
            <li class="fl bottom-f3 bott-co">
              <h6>应补金额</h6>
            </li>
            <li class="fl bottom-f3 bor-null" v-text="expenInfoData.patchAmo"></li>
            <li class="fl bottom-f1 bor-null bottom-t1">
              <div class="fl">出纳：<span v-text="expenInfoData.cashierPerId"></span></div>
              <div class="fl">经办人：<span v-text="expenInfoData.operatorId"></span></div>
              <div class="fl">报销人：<span v-text="expenInfoData.reimPerId"></span></div>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="sureApplyPay">确认支付</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看弹层 -->
    <sino-dialog :visible.sync="detailsFalg" size="small" class="mail-dialog see-dirc suppinfo-dialog-box" :top="'5%'" v-on:close="cleanContent('detailsForm')"v>
      <sino-title slot="title" type="levelOne" title="查看申请支付详情" class="sino-dialog-title"></sino-title>
      <sino-form :model="detailsForm"  class="serch-form" ref="detailsForm">
        <sino-con class="first-con details-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
          <div class="crumbs details-style">
            <ul class="details-width-auto">
              <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1}"><span @click="stepFun(1)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 1}">{{activeNode > 1? '':1}}</i>提交申请</span></li>
              <li :class="{'li-finish': activeNode > 2, 'li-act ive': activeNode === 2}"><span @click="stepFun(2)"><i class="step-num iconfont" :class="{'sino-tick': activeNode > 2}">{{activeNode > 2? '':2}}</i>送鉴定中心</span></li>
              <li :class="{'li-active': activeNode === 3}"><span @click="stepFun(3)"><i class="step-num iconfont">3</i>审核未通过</span></li>
            </ul>
          </div>
        </sino-con>
        <sino-con>
          <div class="service-module-box marTop">
            <sino-title type="levelTwo" title="申请信息" class="service-module-title details-title"></sino-title>
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li>
                  <h6>雇员姓名</h6><span v-text="detailsForm.empName"></span>
                </li>
                <li>
                  <h6>证件号码</h6><span v-text="detailsForm.certNo"></span>
                </li>
                <div v-for="(item,index) in detailsForm.physicalExamFeeReimDetList">
                <li>
                  <h6>报销年度</h6><span v-text="item.reimYear"></span>
                </li>
                <li>
                  <h6>报销金额</h6><span v-text="item.reimAmo"></span>
                </li>
                </div>
                <li>
                  <h6>报销总金额</h6><span v-text="detailsForm.reimSumAmo"></span>
                </li>
                <li>
                  <h6>申请人</h6><span v-text="detailsForm.applyPerName"></span>
                </li>
                <li>
                  <h6>申请日期</h6><span v-text="detailsForm.applyDate"></span>
                </li>
                <li>
                  <h6>申请人电话</h6><span v-text="detailsForm.applyDate"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="service-module-box marTop">
            <sino-title type="levelTwo" title="收款人信息" class="service-module-title details-title"></sino-title>
            <div class="usermanagement-list">
              <ul class="usermanagement-ul">
                <li>
                  <h6>收款人</h6><span v-text="detailsForm.applyPerRelName"></span>
                </li>
                <li>
                  <h6>收款人姓名</h6><span v-text="detailsForm.payeeName"></span>
                </li>
                <li>
                  <h6>收款人证件号码</h6><span v-text="detailsForm.payeeCertNo"></span>
                </li>
                <li>
                  <h6>银行名称</h6><span v-text="detailsForm.bankTypeName"></span>
                </li>
                <li class="li-last">
                  <h6>银行账号</h6><span v-text="detailsForm.bankNo"></span>
                </li>
                <li class="li-last">
                  <h6>开户行</h6><span v-text="detailsForm.bankName"></span>
                </li>
                <li class="li-last heightAuto" >
                  <h6 class="elseH6"><em class="fontHeightAuto">上传文件</em></h6>
                  <span class="auto-height-span">
                  <i v-for="(item,index) in detailsForm.physicalExamFeeReimMatList" class="iStyle fl">{{item.matName}}
                  <i class="fr iStyle istrue" v-if="item.matName"><a href="javascript:;" @click="batchAllPreview(item.matEncId)" class="file-del-btn">预览</a> |
                    <a href="javascript:;" @click="batchAllDownload(item.matEncId)" class="file-del-btn">下载</a></i>
                  </i>
              </span>
                </li>
                <li class="li-last">
                  <h6>备注</h6><span v-text="detailsForm.remark"></span>
                </li>
              </ul>
            </div>
          </div>
        </sino-con>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="detailsFalg=false">确 定</sino-button>
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
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  let checkedArr = [];
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.type.split("/")[1];
    let _arr = ['jpg', 'png', 'bmp', 'jpeg', 'pdf', 'JPG', 'PNG', 'BMP', 'JPEG', 'PDF'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  export default {
    data () {
      var upLimit = (rule, value, callback) => {
        if (value > this.recordAndapplyForm.amoMargin) {
          callback(new Error('报销总金额不能大于可报销金额！'));
        } else {
          callback();
          return;
        }
      };
      return {
        findUserByOrgIdsAndRoleType: this.apiPath.author.findUserByOrgIdsAndRoleType,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findBankCardInfoByRel: this.apiPath.hrsc.findBankCardInfoByRel,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        findUserSelectBoxInfo: this.apiPath.author.findUserSelectBoxInfo,
        selectBox: this.apiPath.hrsc.selectBox, // g
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        findSalesmanSelectBox: this.apiPath.hrsc.findSalesmanSelectBox,
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        findCertNoAndAreaId: this.apiPath.hrsc.findCertNoAndAreaId,
        findAreaIdSelectBoxByEmpNameCertNo: this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo,
        findCustSelectBoxByCertNoAndAreaId: this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        ywData: {
          orgIds: [],
          roleTypes: [5, 25]
        },
        token: Cookies.get('Token'),
        typeMan: Cookies.get('roleType'), // yw 5 ceshi 12
        creIdNameData: {
          orgId: undefined,
          roleTypes: [5]
        },
        detailsFalg: false,
        expenInfoData: {
          year: '',
          month: '',
          date: '',
          bankNo: '',
          bankId: '',
          bankName: '',
          bankType: '',
          applyPerRel: '',
          applyPerRelName: '',
          payeeName: '',
          payeeCertNo: '',
          payeeCertType: '',
          reimSumAmo: "",            // 报销单总金额
          loanAmo: "",                      //  借款数
          refundAmo: "",                //   应退金额
          patchAmo: "",                  // 应补金额
          reimPerId: "",                 //  报销人
          operatorId: '',  //  经办人
          cashierPerId: "",                //  出纳
          chargePerId: "",                  // 单位负责人
          reviewPerId: "",               // 审查意见人
          fnncAppId: "",                    // 财务审核人
          physicalExamFeeReimId: '',
          certType: '',
          certNo: '',
          empName: '',
          reimOrderItems: [{                  //  费用报销项目
            reimOrderItem: "",             // 项目
            reimOrderType: "",               //     类别
            reimOrderTypeName: "",         //    类别翻译
            reimOrderItemAmo: ""        //  金额
          }],   // 费用报销项目
          depAppId: ""                  // 部门审核人
        },
        reimbFalg: false,
        scrollDist: 0, // 距离顶部距离
        activeNode: '',
        bankData: {
          data: {
            bankType: null,
            cityName: '',
            bankName: ''
          }
        },
        modifyState: false,
        areaData: {data: {areaTypes: [4, 5]}, title: ''},
        custData: {
          certNo: '',
          areaId: ''
        },
        detailsForm: {
          physicalExamFeeReimMatList: null,
          physicalExamFeeReimDetList: null,
          remark: ''
        },
        injList: [],
        injIdenResList: [],
        physicalForm: {
          empName: '', // 姓名
          certNo: '', // 证件号
          custId: '', // 客户ID
          custName: '', // 客户名字
          paySuppId: '', // 付费供应商
          paySuppName: '',
          handleSchedule: '', // 办理进度
          handleScheduleName: '',
          creName: '',
          creId: ''
        },
        searchFlag: false,
        conFlag: false,
        giveUpBook: false,
        noPassDialog: false,
        backspace: false,
        backspaceForm: {
          injIdenId: '',
          injIdenResult: '',
          idenDate: '',
          injIdenResultFileName: '',
          injIdenResultFileId: '', // weiyihao
          remark: ''
        },
        btnText: '',
        noPer: false,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        browseFlag: false, // 预览的弹层
        browImgPath: '',  // 预览图片的地址
        provideBook: false,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        stackTitle: '',
        stackLable: '',
        orderId: '',
        recordAndapplyForm: {
          conId: '',
          empBankCardId: '',
          custId: '',
          custName: '',
          orderId: '',
          paySuppId: '',
          paySuppName: '',
          uniqNo: '',
          execuAreaId: '',
          physicalExamFeeReim: '',
          physicalExamFeeReimDetList: [
            {
              reimYear: '',
              reimNewYear: new Date(),
              reimAmo: '',
              physicalExamFeeReimDetId: ''
            }
          ], // 明细
          orderEndDate: '', // 订单结束日期
          applyPerName: '',
          reimSumAmo: '', // 报销金
          amoMargin: '', // 可报销金额
          empName: '', // 雇员姓名
          certNo: '', // 证件号码
          applyDate: new Date(), // 工伤发生日期
          applyName: '', // 递交材料人姓名
          applyPerTel: '', // 递交材料人电话
          injDesc: '', // 工伤经过
          physicalExamFeeReimMatList: null,
          isHavePhysicalExamService: null,
          physicalExamFeeReimId: '',
          applyPerRel: '',
          applyPerRelName: '',
          remark: '',
          bankTypeName: '',
          bankId: '',
          bankNo: '',
          bankName: '', // 开户行
          acctBankId: '' // 开户行
        },
        routerView: false,
        provideBookForm: {
          empName: '',
          certNo: '',
          issuePer: '',
          issueSignId: '',
          injIdenId: '',
          handleSchedule: '',
          issuePerName: ''
        },
        tableData: null, // 表格数据
        recordAndapply: false,
        alertTitle: '',
        matName: '',
        activeRow: '',
        noPassForm: {
          injIdenId: '', // 工伤认定ID
          declSinsDate: '', // 请选择时间
          declPer: Cookies.get('CPYY-INFO-NAME'), // 办理人
          eavFailDesc: ''
        },
        delayForm: {
          applyDelayedDate: '', // 提交日期
          num: '30', // 天数
          injIdenId: '' // 工伤ID
        },
        giveUpBookForm: {
          giveUpDesc: '', // 放弃原因
          injIdenId: ''
        },
        recRemark: '',
        backspaceRules: {
          idenDate: [{type: 'date', required: true, message: '请输入认定日期', trigger: 'change'}],
          injIdenResult: [{type: 'number', required: true, message: '请输入工伤认定结果', trigger: 'change'}]
        },
        noPassRules: {
          declSinsDate: [{type: 'date', required: true, message: '请选择日期', trigger: 'change'}],
          eavFailDesc: [{required: true, message: '请输入不通过原因', trigger: 'change'}],
          declPer: [{required: true, message: '请输入办理人', trigger: 'change'}]
        },
        giveUpBookRules: {
          giveUpDesc: [{required: true, message: '请输入放弃原因', trigger: 'change'}]
        },
        provideBookRules: {
          issuePerName: [{required: true, message: '请输入领取人', trigger: 'change'}],
          issueSignId: [{required: true, message: '请输入领取人签名', trigger: 'change'}]
        },
        delayRules: {
          applyDelayedDate: [{type: 'date', required: true, message: '请选择提交日期', trigger: 'change'}]
        },
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() > Date.now();
          }
        },
        bigNumArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        recordAndapplyRules: {
          empName: [{required: true, message: '请输入雇员姓名', trigger: 'change'}],
          certNo: [{required: true, message: '请输入证件号码', trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'change'}],
          payeeCertNo: [{required: true, message: '请输入证件号码', trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'change'}],
          applyPerName: [{required: true, message: '请输入申请人', trigger: 'change'}],
          applyDate: [{type: 'date', required: true, message: '请输入申请日期', trigger: 'change'}],
          applyPerRelName: [{required: true, message: '请输入收款人', trigger: 'change'}],
          payeeName: [{required: true, message: '请输入收款人姓名', trigger: 'change'}],
          bankTypeName: [{required: true, message: '请输入银行类型', trigger: 'change'}],
          bankNo: [{required: true, message: '请输入银行账号', trigger: 'change'}],
          bankName: [{required: true, message: '请输入开户行', trigger: 'change'}],
          reimSumAmo: [
            {type: 'number', required: true, message: '请输入总金额', trigger: 'change'},
            {validator: upLimit, trigger: 'change'}
          ]
        },
        flag: true,
        ssssss: ''
      };
    },
    created () {},
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      sumRustFun () {
        this.recordAndapplyForm.reimSumAmo = 0;
        this.recordAndapplyForm.physicalExamFeeReimDetList.forEach(function (item) {
          this.recordAndapplyForm.reimSumAmo += item.reimAmo;
        }, this);
        if (this.recordAndapplyForm.amoMargin < this.recordAndapplyForm.reimSumAmo) {
          console.log(this.$refs.sumAmo);
          this.$refs.sumAmo.validateState = 'error';
          this.$refs.sumAmo.validateMessage = '报销总金额不能大于可报销金额';
        }
      },
      currentUploadFun (data, index) {
        this.activeRow = index;
      },
      getFileName1 (file) {
        if (checkImgFileType(file, this)) {
          this.recordAndapplyForm.physicalExamFeeReimMatList[this.activeRow].matName = file.name;
        } else {
          this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          this.$refs.layUpload.clearFiles();
        }
      },
      fileSuccess1 (res, file) {
        if (checkImgFileType(file, this)) {
          if (res.code === 'CPYY-00001') {
            this.recordAndapplyForm.physicalExamFeeReimMatList[this.activeRow].matEncId = res.data;
            this.$alert('上传成功！', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'info', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
          } else {
            this.recordAndapplyForm.physicalExamFeeReimMatList[this.activeRow].matEncId = '';
          }
        }
        return;
      },
      fileError1 () {
        this.recordAndapplyForm.physicalExamFeeReimMatList[this.activeRow].matName = '';
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'info', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },

      // 生成报销单
      createExpense () {
        this.batchLeadSeeFlag = false;
        api.post(this.apiPath.salary.findReimOrder, this.batchApplyResult.wageBaseIds).then(res => {
          if (res.code === 'CPYY-00001') {
            let resData = res.data;
            let lengthNum = resData.reimOrderItems.length;
            if (lengthNum < 5) {
              for (var i  = 0; i < 5 - lengthNum; i++) {
                resData.reimOrderItems.push({empty: true});
              }
            }
            this.expenInfoData = resData;
          }
        }).catch(err => {
          console.log(err);
        });
        this.reimbFalg = true;
      },
      applyPerChange (item) {
        if (item.title) {
          if (this.alertTitle !== '修改报销申请') {
            if (item.title === '本人') {
              this.noPer = false;
              let obj = {
                uniqNo: this.recordAndapplyForm.uniqNo,
                applyPerRel: this.recordAndapplyForm.applyPerRel
              };
              api.post(this.apiPath.hrsc.findBankCardInfoByRel, obj).then(res => {
                this.recordAndapplyForm.bankType = res.data.bankType;
                this.recordAndapplyForm.bankTypeName = res.data.bankTypeName;
                this.recordAndapplyForm.bankId = res.data.acctBank;
                this.recordAndapplyForm.bankName = res.data.bankName;
                this.recordAndapplyForm.bankNo = res.data.bankNo;
              }).catch(err => {
                console.log(err);
              });
            } else {
              this.noPer = true;
              this.recordAndapplyForm.bankType = null;
              this.recordAndapplyForm.bankTypeName = '';
              this.recordAndapplyForm.bankId = null;
              this.recordAndapplyForm.bankName = '';
              this.recordAndapplyForm.bankNo = '';
            }
          } else { /* 是修改的时候 */
            if (item.title !== '本人') {
              this.recordAndapplyForm.bankType = '';
              this.recordAndapplyForm.bankTypeName = '';
              this.recordAndapplyForm.bankId = '';
              this.recordAndapplyForm.bankName = '';
              this.recordAndapplyForm.bankNo = '';
              this.recordAndapplyForm.payeeName = '';
              this.recordAndapplyForm.payeeCertNo = '';
              this.noPer = true;
            } else {
              this.noPer = false;
              let obj = {
                uniqNo: this.recordAndapplyForm.uniqNo,
                applyPerRel: this.recordAndapplyForm.applyPerRel
              };
              api.post(this.apiPath.hrsc.findBankCardInfoByRel, obj).then(res => {
                this.recordAndapplyForm.bankType = res.data.bankType;
                this.recordAndapplyForm.bankTypeName = res.data.bankTypeName;
                this.recordAndapplyForm.bankId = res.data.acctBank;
                this.recordAndapplyForm.bankName = res.data.bankName;
                this.recordAndapplyForm.bankNo = res.data.bankNo;
              }).catch(err => {
                console.log(err);
              });
            }
          }
        }
      },
      record () {
        this.modifyState = false;
        this.recordAndapply = true;
        this.alertTitle = '报销申请';
        this.btnText = '保 存';
        this.recordAndapplyForm.applyDate = new Date();
        this.recordAndapplyForm.physicalExamFeeReimDetList = [
          {
            reimYear: '',
            reimNewYear: new Date(),
            reimAmo: '',
            physicalExamFeeReimDetId: ''
          }
        ];
      },
      submitForm () {
        this.$refs.recordAndapplyForm.validate((valid) => {
          if (valid) {
            this.recordAndapplyForm.physicalExamFeeReimDetList.forEach(function (item) {
              let data = Vue.filter('date')(item.reimNewYear, 'yyyy');
              item.reimYear = Number(data);
            });
            if (this.modifyState) {
              api.post(this.apiPath.hrsc.updateReimByIdSave, this.recordAndapplyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.recordAndapply = false;
                  this.$message({message: '保存成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
              return;
            };
            api.post(this.apiPath.hrsc.saveReimInfoToSave, this.recordAndapplyForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.recordAndapply = false;
                this.$message({message: '保存成功！', type: 'success'});
                this.searchFun();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      cleanContent (formName) {
        for (var key in this.detailsForm) {
          this.detailsForm[key] = '';
        }
      },
      resetFn (formName) {
        this.$refs[formName].resetFields();
        for (var key in this.recordAndapplyForm) {
          this.recordAndapplyForm[key] = '';
        };
        this.recordAndapplyForm.physicalExamFeeReimMatList = null;
        this.recordAndapplyForm.amoMargin = null;
        this.recordAndapplyForm.orderEndDate = null;
      },
      /*  预览 */
      batchAllPreview (id) {
        api.postsign(this.apiPath.sins.getPreview, id).then(res => {
          if (res.code === 'CPYY-00001') {
            this.browseFlag = true;
            this.browImgPath = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchAllDownload (id) {
        api.postsign(this.apiPath.sins.uploadContExcelAction, id).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifyFun (item) {
        api.post(this.apiPath.hrsc.findReimInfoById, {physicalExamFeeReimId: item.physicalExamFeeReimId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.modifyState = true;
            this.recordAndapply = true;
            this.alertTitle = '修改报销申请';
            this.btnText = '保 存';
            this.recordAndapplyForm = res.data;
            if (res.data.physicalExamFeeReimDetList) {
              res.data.physicalExamFeeReimDetList.forEach(function (item, index) {
                item.reimYear =  new Date(JSON.stringify(item.reimYear));
                this.$set(item, 'reimNewYear', item.reimYear);
              }, this);
            }
            this.recordAndapplyForm.applyDate = new Date(res.data.applyDate);
            console.log(this.recordAndapplyForm);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增
      ctrlArray (index) {
        if (index === 0) {
          this.recordAndapplyForm.physicalExamFeeReimDetList.push({reimYear: "", reimNewYear: new Date(), reimAmo: "", physicalExamFeeReimDetId: ""});
        } else {
          this.recordAndapplyForm.physicalExamFeeReimDetList.splice(index, 1);
          this.sumRustFun();
        }
      },
      /* 通过证件号码带出来基本信息 */
      essential () {
        if (this.recordAndapplyForm.certNo) {
          let obj = {
            certNo: this.recordAndapplyForm.certNo,
            empName: this.recordAndapplyForm.empName
          };
          api.post(this.apiPath.hrsc.findReimInfoByNoAndName, obj).then(res => {
            this.recordAndapplyForm.empName = res.data.empName;
            this.recordAndapplyForm.custName = res.data.custName;
            this.recordAndapplyForm.applyPerName = res.data.applyPerName;
            this.recordAndapplyForm.conId = res.data.conId;
            this.recordAndapplyForm.custId = res.data.custId;
            this.recordAndapplyForm.orderId = res.data.orderId;
            this.recordAndapplyForm.paySuppId = res.data.paySuppId;
            this.recordAndapplyForm.paySuppName = res.data.paySuppName;
            this.recordAndapplyForm.execuAreaId = res.data.execuAreaId;
            this.recordAndapplyForm.applyPerTel = res.data.applyPerTel;
            this.recordAndapplyForm.uniqNo = res.data.uniqNo;
            this.recordAndapplyForm.amoMargin = res.data.amoMargin;
            this.recordAndapplyForm.empBankCardId = res.data.empBankCardId;
            this.recordAndapplyForm.isHavePhysicalExamService = res.data.isHavePhysicalExamService;
            this.recordAndapplyForm.physicalExamFeeReimId = res.data.physicalExamFeeReimId;
            // if (!res.data.isHavePhysicalExamService) {
            //   this.$refs.recordAndapplyForm.$children[1].validateState = 'error';
            //   this.$refs.recordAndapplyForm.$children[1].validateMessage = '该雇员下没有体检服务';
            // }
            /* 通过执行地区带出来材料 */
            let obj2 = {
              confUse: 5,
              dimen: 1,
              dimenValue: this.recordAndapplyForm.execuAreaId
            };
            api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, obj2).then(res => {
              if (res.code === 'CPYY-00001') {
                this.recordAndapplyForm.physicalExamFeeReimMatList = res.data.matConfs;
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          });
        }
      },
      selectCallBack2 (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
      },
      pageHandlerB: function (page) {
        this.page.pageNum = page;
        this.getTableList(page, this.page.pageSize);
      },
      choooseNumB: function (pageSize) {
        this.page.pageSize = pageSize;
        this.getTableList(1, pageSize);
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getTableList(this.page.pageNum, this.page.pageSize);
      },
      resetFun (formName) {
        for (var key in this.physicalForm) {
          this.physicalForm[key] = '';
        }
      },
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
      viewAll () {
        this.searchFun();
      },
      /* 申请支付按钮 */
      dalayFun (item) {
        let obj = {
          physicalExamFeeReimId: item.physicalExamFeeReimId
        };
        api.post(this.apiPath.hrsc.findReimInfoById, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.reimbFalg = true;
            let resData = res.data;
            let lengthNum = resData.reimOrderItems.length;
            if (lengthNum < 5) {
              for (var i  = 0; i < 5 - lengthNum; i++) {
                resData.reimOrderItems.push({empty: true});
              }
            }
            this.expenInfoData = resData;
            this.expenInfoData.operatorId = Cookies.get('CPYY-INFO-NAME');
            this.expenInfoData.year = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            let date = new Date().getDate();
            if (date >= 1 && date <= 9) {
              date = "0" + date;
            }
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            this.expenInfoData.month = month;
            this.expenInfoData.date = date;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 确认支付 */
      sureApplyPay () {
        // for (var i = 0; i < this.expenInfoData.reimOrderItems.length; i++) {
        //   if (!this.expenInfoData.reimOrderItems[i].empty) {
        //     this.expenInfoData.reimOrderItems.push(this.expenInfoData.reimOrderItems[i]);
        //   }
        // }
        api.post(this.apiPath.hrsc.applyPay, this.expenInfoData).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$alert('您已成功申请支付，<br/>报销单编号：' + res.data.reimOrderNo, '提示信息', {
              confirmButtonText: '确 定',
              type: 'info', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
                this.reimbFalg = false;
                this.searchFun();
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      sendFile () {
        this.$refs.recordAndapplyForm.validate((valid) => {
          if (valid) {
            this.recordAndapplyForm.physicalExamFeeReimDetList.forEach(function (item) {
              if (item.reimYear) {
                let date = Vue.filter('date')(item.reimYear, 'yyyy');
                item.reimYear = Number(date);
              }
              return;
            });
            if (this.modifyState) {
              api.post(this.apiPath.hrsc.updateReimByIdPay, this.recordAndapplyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.recordAndapply = false;
                  this.dalayFun(this.recordAndapplyForm);
                }
              }).catch(err => {
                console.log(err);
              });
              return;
            }
            api.post(this.apiPath.hrsc.saveReimInfoToSaveAndPay, this.recordAndapplyForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.recordAndapply = false;
                this.dalayFun(res.data);
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      particular (item) {
        api.post(this.apiPath.hrsc.findReimInfoById, {physicalExamFeeReimId: item.physicalExamFeeReimId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.activeNode = res.data.handleSchedule;
            this.detailsFalg = true;
            this.detailsForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getTableList (pageNum, pageSize, all) {
        pageNum ?  '' : pageNum = this.page.pageNum;
        let obj = {
          data: this.physicalForm,
          pageNum: pageNum,
          pageSize: this.page.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.hrsc.findAllReimInfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
