<template>
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="申请支付查询"></sino-title>
      <sino-form :model="applyForm" ref="applyForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box invoice-ul">
            <li class="">
              <span class="search-inner-name">单位公积金账号：</span>
              <sino-input class="fl" type="text" v-model="applyForm.unitRegiNo"
                          :disabled="false"></sino-input>
            </li>
            <li class="">
              <span class="search-inner-name">公积金账户名称：</span>
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findAccuAcctSelect"
                           :chooseName.sync="applyForm.accuAcctName"
                           :chooseId.sync="applyForm.accuAcctId"
                           :data="{title: ''}"
                           class="fl"
                           :clear="true"></sino-select>
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
                           :url="findAreaList"
                           :chooseName.sync="applyForm.areaIdName"
                           :chooseId.sync="applyForm.areaId"
                           :data="{data: {areaTypes:[4,5]}}"
                           :clear="true"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">支付进度：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="applyForm.reimPayStateName"
                           :chooseId.sync="applyForm.reimPayState"
                           :clear="true"
                           :data="{code:'PAY_SCHEDULE'}"
                           :url="getDictSelectBox"
              ></sino-select>
            </li>
            <li>
              <sino-form-item label="申报年月：" class="search-inner-item" prop="executeMonString">
                <sino-date-picker
                  v-model="applyForm.executeMonString"
                  type="month"
                  placeholder=""
                  :editable="false"
                  :readonly="false"
                  :clearable="true">
                </sino-date-picker>
              </sino-form-item>
            </li>
            <li >
              <span class="search-inner-name">报销单编号：</span>
              <sino-input class="fl" type="text" v-model="applyForm.reimOrderNo"></sino-input>
            </li>

          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchButFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('applyForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button class="fl" type="icon-text" @click="applyfnncpay"><i class="iconfont sino-qian"></i>申请财务支付
            </sino-button>
          </div>
        </div>
        <sino-table :data="entTableData" max-height="416" stripe v-on:viewAll="searchButFun" border v-on:radioSelect="selectCallBack">
          <sino-table-column type="radioSelection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="unitRegiNo" label="单位公积金账号" min-width="95"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="80"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="180"></sino-table-column>
          <sino-table-column prop="executeMon" label="申报年月" min-width="180"></sino-table-column>
          <sino-table-column prop="accuProp" label="比例（%）" min-width="180"></sino-table-column>
          <sino-table-column prop="payFeeAmo" label="缴费金额" width="150" type="money" text-align="center"></sino-table-column>
          <sino-table-column prop="payAmo" label="支付金额" width="150" type="money" text-align="center"></sino-table-column>
          <sino-table-column prop="reimOrderNo" label="费用报销单编号" width="150" text-align="center"></sino-table-column>
          <sino-table-column prop="reimPayStateName" label="支付进度" min-width="100"></sino-table-column>
          <sino-table-column prop="creName" label="申请人" min-width="100"></sino-table-column>
          <sino-table-column prop="creTime" label="申请时间" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="190" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" v-if="scope.row.reimPayState >= 5" @click="applyFun(scope.row)">查看报销单</span><i v-if="scope.row.reimPayState >= 5" class="table-i">|</i>
                <span class="table-span" v-if="scope.row.reimPayState >= 5" @click="seeFun(scope.row)">查看详情</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!--申请财务支付结果-->
    <sino-dialog :visible.sync=batchLeadSeeFlag size="small" class="salaryPaymentApply-tip clearPadding20">
      <sino-title slot="title" type="levelOne" title="申请支付" class="sino-dialog-title"></sino-title>
      <div class="order-new">
        <i class="iconfont sino-tip"></i>
        <span>应缴纳金额与支付金额存在差异，差异金额：￥<span>{{batchApplyResult.differNum}}</span> </span>
      </div>
      <sino-form   :model="batchApplyResult" :rules="batchApplyResultRules" ref="batchApplyResult"  class="delayStyle usermanage-pay">
        <sino-form-item label="应缴费金额："  class="search-inner-item" prop="payFeeAmo">
          <sino-input disabled type="text" class="fl before" v-model="batchApplyResult.payFeeAmo"></sino-input>
        </sino-form-item>
        <sino-form-item label="支付金额："  class="search-inner-item " prop="payAmo">
          <sino-input   class="before" v-model="batchApplyResult.payAmo" @change="getDiffFn"></sino-input>
        </sino-form-item>
        <sino-form-item prop="fileName" label="上传文件：">
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
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="createExpense">生成报销单</sino-button>
      </span>
    </sino-dialog>
    <!--生成报销单-->
    <sino-dialog :visible.sync="reimbFalg" size="large" class="mail-dialog see-dirc suppinfo-dialog-box big-supp-dialog accuapplypay" :top="'5%'">
      <sino-title slot="title" type="levelOne" :title="titleName" class="sino-dialog-title"></sino-title>
      <div class="remib" style="width: 99%">
        <!--头部-->
        <div class="remib-top">
          <!--标题-->
          <div class="remib-title">
            <h5>费用报销单</h5>
            <h3>报销日期<span>{{expenInfoData.reimYear}}</span>年<span>{{expenInfoData.reimMon}}</span>月<span>{{expenInfoData.reimDay}}</span>日</h3>
          </div>
          <!--编号!-->
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
              <li class="fl width-med" ><input type="text" placeholder="可输入" v-model="expenInfoData.feeItem"/></li>
              <li class="fl">{{expenInfoData.feeTypeName}}</li>
              <li class="fl">{{expenInfoData.payAmo}}</li>
            <li class="fl width-med" ><input type="text" /></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med" ><input type="text" /></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med" ><input type="text" /></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med" ><input type="text" /></li>
            <li class="fl"></li>
            <li class="fl"></li>
            <li class="fl width-med lef-co">
              <h6>报 销 金 额 合 计</h6>
            </li>
            <li class="fl"></li>
            <li class="fl">{{expenInfoData.reimAmoTotal}}</li>
          </ul>
          <!--表格上右-->
          <ul class="table-right fl">
            <li class="fl right-tl right-t1">
              <h6>单 位 负 责 人</h6>
              <h6>（签 章）</h6>
            </li>
            <li class="fl rigght-tr right-t1 bor-null" @click="openSignFun">
              <img :src="expenInfoData.chargePerId" style="width:100%;height:100%;" v-if="expenInfoData.chargePerId"/>
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
        <!--<sino-button type="primary"  @click="sureApplyPay">{{buttonName}}</sino-button>-->
                <sino-button type="primary"  @click="sureApplyPay()">申请支付</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看弹层 -->
    <sino-dialog :visible.sync="seeItemFlag" size="small" class="mail-dialog see-dirc suppinfo-dialog-box" :top="'5%'">
      <sino-title slot="title" type="levelOne" title="查看详情" class="sino-dialog-title"></sino-title>
      <sino-form :model="seeForm"  class="serch-form" ref="seeForm">
        <sino-con class="first-con details-con" :class="{'fixed-con':scrollDist > 37}" id="first-con-id">
          <div class="crumbs  crumbstyle details-style" v-if="activeNode !=6">
            <ul>
              <li :class="{'li-finish': activeNode > 5, 'li-active': activeNode === 5, 'li-notthr': activeNode  < 5}">
              <span >
                <i class="step-num iconfont" :class="{'sino-duigou': activeNode > 5}">{{activeNode > 5? '':1}}
                </i>审批中
              </span></li>
              <li :class="{'li-finish': activeNode > 7, 'li-active': activeNode === 7, 'li-notthr': activeNode  < 7}">
              <span >
                <i class="step-num iconfont" :class="{'sino-duigou': activeNode > 7}">{{activeNode > 7? '':2}}</i>审批通过
              </span></li>
              <li v-if="activeNode === 8 || 7" :class="{'li-active': activeNode > 7, 'li-notthr': activeNode  <= 7}">
              <span >
                <i class="step-num iconfont" :class="">3</i>已支付
              </span>
              </li>
              <li v-if="activeNode === 9" :class="{'li-active': activeNode > 7, 'li-notthr': activeNode  <= 7}">
              <span >
                <i class="step-num iconfont" :class="">3</i>已退汇
              </span>
              </li>
              <li v-if="activeNode === 11" :class="{'li-active': activeNode > 7, 'li-notthr': activeNode  <= 7}">
              <span >
                <i class="step-num iconfont" :class="">3</i>已退回
              </span>
              </li>
            </ul>
          </div>
          <div class="crumbs crumbstyle details-style" v-if="activeNode ==6">
            <!--通过                           审核                          未执行-->
            <ul>
              <li :class="{'li-finish': activeNode > 5, 'li-active': activeNode === 5, 'li-notthr': activeNode  < 5}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 5}">{{activeNode > 5? '':1}}</i>申请支付</span></li>
              <li :class="{'li-active': activeNode === 6, 'li-notthr': activeNode  < 6}"><span ><i class="step-num iconfont" :class="">2</i>审批不通过</span></li>
            </ul>
          </div>
        </sino-con>
            <sino-form-item label="单位公积金账号：" prop="unitRegiNo">
              <sino-input v-model="seeForm.unitRegiNo" type="text" disabled></sino-input>
            </sino-form-item>
            <sino-form-item label="公积金账户名：" prop="accuAcctName" >
              <sino-input  v-model="seeForm.accuAcctName" disabled></sino-input>
            </sino-form-item>
            <sino-form-item  label="执行地区：" prop="areaName">
              <sino-input  v-model="seeForm.areaName" disabled></sino-input>
            </sino-form-item>
            <sino-form-item  label="申报年月：" prop="executeMon">
              <sino-date-picker
                v-model="seeForm.executeMon"
                type="month"
                :editable="false"
                :readonly="false"
                :disabled="true"
                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
          <sino-form-item  label="缴费金额：" prop="defrayAmo">
            <sino-input  disabled v-model="seeForm.defrayAmo" class="fl before"></sino-input>
          </sino-form-item>
          <sino-form-item  label="支付金额：" prop="payAmo">
            <sino-input disabled  v-model="seeForm.payAmo" class="fl before" ></sino-input>
          </sino-form-item>
        <sino-form-item class="sinoFormItem" label="上传文件：" prop="fileName">
         <div class="cus-sp">
           <div v-if="seeForm.fileName">
             <i class="iconfont sino-qubiezhen"></i>
             <em class="em-font">{{seeForm.fileName}}</em>
             <em class="maincolor" @click="batchAllPreview(seeForm.fileUniqno )">预览</em><em class="maincolor"> | </em><em class="maincolor" @click="batchAllDownload(seeForm.fileUniqno)">下载</em>
           </div>
         </div>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary"  @click="seeItemFlag=false">确 定</sino-button>
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
        bigNumArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,  // 字典下拉框
        findAreaList: this.apiPath.hrsc.findAreaList,   //  地区下拉框
        findAccuAcctSelect: this.apiPath.accu.findAccuAcctSelect,   //  地区下拉框
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        uploadHeader: {Token: ""},
        browseFlag: false, // 预览的弹层
        browImgPath: '',  // 预览图片的地址
        applyForm: {
          unitRegiNo: '',
          accuAcctName: '',
          accuAcctId: '',
          areaIdName: '',
          areaId: '',
          reimPayStateName: '待支付申请',
          reimPayState: 4,
          reimOrderNo: '',
          executeMonString: '',
          executeMon: ''
        },
        checkedArr: [],
        batchLeadSeeFlag: false,
        reimbFalg: false,
        titleName: '',
        buttonName: '',
        seeItemFlag: false,
        batchApplyResult: {
          accuAcctId: '',
          executeMon: '', // 执行月份
          payFeeAmo: '', // 缴费金额
          differNum: '',
          chargeAmo: '',
          payAmo: '', // 支付金额
          fileUniqno: '', // 文件唯一号
          fileName: '' // 文件名称
        },
        expenInfoData: {
          reimPerId: '',
          patchAmo: '',
          cashierPerId: '',
          fnncAppId: '',
          loanAmo: '',
          refundAmo: '',
          depAppId: '',
          reviewPerId: '',
          chargePerId: '',
          accuAcctId: '', // 公积金账户id
          executeMon: '',
          payAmo: '',
          reimAmoTotal: '',
          reimAmoTotals: '',
          reimTime: '',
          reimYear: '',
          reimMon: '',
          reimDay: '',
          operatorId: '',
          feeTypeName: '',
          feeItem: '',
          feeType: ''
        },
        entTableData: [],
        activeNode: null,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        scrollDist: 3,
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
          fileUniqno: '' // 文件唯一ID
        },
        batchApplyResultRules: {
          payAmo: [
            {type: 'number', required: true, message: '请输入支付金额', trigger: 'change'}
          ]
        },
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
      this.searchButFun();
      this.validator.addEnterEvent(this.searchButFun);
      this.applyForm.executeMonString = Date();
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
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
      // 下载
      batchAllDownload (id) {
        api.postsign(this.apiPath.accu.fileDownload, id).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /*  预览 */
      batchAllPreview (id) {
        api.postsign(this.apiPath.accu.filePreview, id).then(res => {
          if (res.code === 'CPYY-00001') {
            this.browseFlag = true;
            this.browImgPath = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum (pageSize) {
        // 改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      // 重置
      resetFun (from) {
        for (var key in this.applyForm) {
          this.applyForm[key] = '';
        }
      },
      // 申请财务支付
      applyfnncpay () {
        if (checkedArr.length === 0) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          let arr = {
            accuAcctId: checkedArr[0].accuAcctId,
            executeMon: checkedArr[0].executeMon,
            monthlyTotalId: checkedArr[0].monthlyTotalId,
            payFeeAmo: checkedArr[0].payFeeAmo,
            reimPayState: checkedArr[0].reimPayState
          };
          api.post(this.apiPath.accu.findApplyAmo, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              let data = Math.abs(res.data.payFeeAmo - res.data.payAmo);
              this.batchApplyResult = res.data;
              this.batchApplyResult.differNum = data;
              this.batchLeadSeeFlag = true;
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      /* 计算差异的金额 */
      getDiffFn () {
        let data = Math.abs(Number(this.batchApplyResult.payFeeAmo) - Number(this.batchApplyResult.payAmo));
        this.batchApplyResult.differNum = data;
        if (typeof (this.batchApplyResult.differNum) !== 'number') {
          this.batchApplyResult.differNum = 0;
        }
        this.batchApplyResult.payAmo = Number(this.batchApplyResult.payAmo);
      },
      // 一级查询
      searchButFun () {
        this.page.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      viewAll (pageNum, pageSize) {
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.applyForm
        };
        if (this.applyForm.executeMonString) {
          this.applyForm.executeMonString = Vue.filter('date')(this.applyForm.executeMonString, 'yyyy-MM');
        }
        if (this.applyForm.executeMonString) {
          this.applyForm.executeMon = Vue.filter('date')(this.applyForm.executeMonString, 'yyyy-MM');
          this.applyForm.executeMon = Number(this.applyForm.executeMon.replace(/-/g, ''));
        } else {
          this.applyForm.executeMon = '';
        }
        api.post(this.apiPath.accu.findApplyFnncPayAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.entTableData = res.data.list;
            this.page.total = res.data.total;
            checkedArr = [];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看明细
      seeFun (item) {
        api.post(this.apiPath.accu.findDetailInfo, item).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeForm = res.data;
            let m = (this.seeForm.executeMon + '').split('');
            m.splice(4, 0, '-');
            this.seeForm.executeMon = m.join('');
            this.activeNode = this.seeForm.reimPayState;
            this.seeItemFlag = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectCallBack (selectTion, row) {
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr = selectTion;
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
          this.batchApplyResult.fileUniqno = res.data;
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
      /* 生成报销单 */
      createExpense () {
        this.$refs.batchApplyResult.validate((valid) => {
          if (valid) {
            this.batchLeadSeeFlag = false;
            api.post(this.apiPath.accu.doReimOrder, this.batchApplyResult).then(res => {
              if (res.code === 'CPYY-00001') {
                this.reimbFalg = true;
                this.expenInfoData = res.data;
                this.titleName = '费用报销单';
                this.buttonName = '申请支付';
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
      sureApplyPay () {
        checkeditem;
        this.expenInfoData.chargePerId = LZString.compress(this.expenInfoData.chargePerId);
        let params = JSON.parse(JSON.stringify(this.expenInfoData));
        params.fileUniqno = this.batchApplyResult.fileUniqno;
        params.fileName = this.batchApplyResult.fileName;
        params.feeType = this.expenInfoData.feeType;
        params.feeItem = this.expenInfoData.feeItem;
        params.feeTypeName = this.expenInfoData.feeTypeName;
        params.executeMon = checkeditem.executeMon;
        params.monthlyTotalId = checkeditem.monthlyTotalId;
        params.accuAcctId = checkeditem.accuAcctId;
        params.payAmo = checkeditem.payAmo;
        params.operatorId = this.expenInfoData.operatorId;
        params.reimAmoTotal = this.expenInfoData.reimAmoTotal;
        params.reimTime = this.expenInfoData.reimTime;
        api.post(this.apiPath.accu.doApplyFnncPay, params).then(res => {
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
      applyFun (item) {
        checkeditem = item;
        let obj = {
          accuPayInfoId: item.accuPayInfoId,
          accuAcctId: item.accuAcctId,
          executeMon: item.executeMon
        };
        api.post(this.apiPath.accu.findReimOrder, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.reimbFalg = true;
            this.titleName = '查看报销单';
            this.buttonName = '打 印';
            this.expenInfoData = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
<style scoped>
  .usermanage .usermanage-pay .sino-form-item {
   width: 100%;
  }
  .crumbs ul{
    padding-bottom: 15px;
    padding-top: 0px;
  }
  .crumbs{margin-bottom:20px;}
  .sinoFormItem {
    width: 100%;
    margin-left: -20%;
  }
  .sinoFormItem .cus-sp {
    background: #eeeeee;
    border-radius: 5px;
    width: 235px;
    height: 25px;
    line-height: 25px;
  }
</style>
