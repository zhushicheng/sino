<template>
  <!--支付管理-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="支付信息查询"></sino-title>
        <sino-form :model="serchFrom"  ref="serchFrom"  class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text" :disabled="false" v-model="serchFrom.empName"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text" :disabled="false" v-model="serchFrom.certNo"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="报销单编号：" class="search-inner-item" prop="reimOrderNo">
                  <sino-input class="fl" type="text" :disabled="false" v-model="serchFrom.reimOrderNo"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="类型：" class="search-inner-item" prop="payPaidName">
                  <div class="search-inner-radiofl" >
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :chooseName.sync="serchFrom.payPaidTypeName"
                                 :chooseId.sync="serchFrom.payPaidType"
                                 :data="{code:'REIM_ORDER_TYPE_SUM'}"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="支付进度：" class="search-inner-item" prop="reimPayStateName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :chooseName.sync="serchFrom.reimPayStateName"
                               :chooseId.sync="serchFrom.reimPayState"
                               :data="{code:'PAY_SCHEDULE', ids: [7, 8]}"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="是否已下载报盘：" class="search-inner-item" prop="isLoadOfferName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :chooseName.sync="serchFrom.isLoadOfferName"
                               :chooseId.sync="serchFrom.isLoadOffer"
                               :data="{code:'YES_NO'}"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li class="li-splice clear">
                <span class="two-dater-span">支付日期：</span>
                <div class="two-dater">
                  <sino-form-item class="search-inner-item" prop="payDateBeg">
                    <sino-date-picker class="fl"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      v-model="serchFrom.payDateBeg"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                  <span class="fl">至</span>
                  <sino-form-item class="search-inner-item" prop="payDateEnd">
                    <sino-date-picker class="fl"
                                      type="date"
                                      v-model="serchFrom.payDateEnd"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </div>
              </li>
              <li>
                <sino-form-item label="是否已上传凭证：" class="search-inner-item" prop="isUploadName">
                  <div class="search-inner-radiofl" >
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :chooseName.sync="serchFrom.isUploadName"
                                 :chooseId.sync="serchFrom.isUpload"
                                 :data="{code:'YES_NO'}"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="serchFun">查 询</sino-button>
              <sino-button class="ressetButton">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--search result-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="confirm()"><i class="iconfont sino-qian"></i>确认支付</sino-button>
              <sino-button type="icon-text" @click="subEav()"><i class="iconfont sino-guanli2"></i>支付反馈</sino-button>
            </div>
          </div>
          <sino-table :data="payTableData" max-height="416" v-on:viewAll="viewAll" border stripe v-on:selection-change="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="reimOrderNo" label="报销单编号" min-width="180"></sino-table-column>
            <sino-table-column prop="reimOrderItem" label="费用项目" min-width="180"></sino-table-column>
            <sino-table-column prop="payPaidTypeName" label="类别" min-width="150"></sino-table-column>
            <sino-table-column prop="reimAmoTotal" label="金额" type="money" width="150">
              <template scope="scope">
                <sino-popover trigger="hover" placement="top">
                  <p v-for="(item, index) in scope.row.reimOrderItems" :key="index">{{ item.reimOrderTypeName }} : <i>&nbsp;&yen;</i>{{ item.reimOrderItemAmo }}</p>
                  <div slot="reference">
                    <span>
                      <i class="fl moneyColor">&yen;</i>
                      <i class="fr moneyColor">{{ scope.row.reimAmoTotal | moneyFormat(2, ".", ",") }}</i>
                    </span>
                  </div>
                </sino-popover>
              </template>
            </sino-table-column>
            <sino-table-column prop="reimPayStateName" label="支付进度" min-width="105"></sino-table-column>
            <sino-table-column prop="payDate" label="支付日期" min-width="120"></sino-table-column>
            <sino-table-column prop="isLoadOfferName" label="是否已下载报盘" min-width="120"></sino-table-column>
            <sino-table-column prop="isUploadName" label="是否已上传凭证" min-width="120"></sino-table-column>
            <sino-table-column prop="reexchangeAndBackCount" label="退汇/退回数量" min-width="120"></sino-table-column>
            <sino-table-column prop="reexchangeAndBackAmo" label="退汇/退回金额" min-width="120"></sino-table-column>
            <sino-table-column label="操作" align="center" width="460" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="reimDetFun(scope.row)"> 报销单明细</span><i class="table-i">|</i>
                  <span class="table-span" @click="upload(scope.row)"> 上传凭证</span><i class="table-i">|</i>
                  <span class="table-span" @click="seeFun(scope.row)" > 查看凭证</span><i class="table-i">|</i>
                  <span class="table-span" @click="viewReim(scope.row)">查看报销单</span><i class="table-i">|</i>
                  <span class="table-span" @click="toVoid(scope.row)"> 下载报盘</span><i class="table-i">|</i>
                  <span class="table-span" @click="downDeta(scope.row)"> 下载明细</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum"
                     v-bind:page-size="pageSize"
                     v-on:pagehandler="pageHandler"
                     :pageArray="pageArray"
                     v-on:choosePageFun="choooseNum"
                     v-bind:object="object"
                     :total="total"></sino-page>
        </div>
      </div>
      <!--确定支付 dialog-->
      <sino-dialog :visible.sync="confirmFalg" size="small" class="leads-follow" @close="resetForm('confirmForm')">
        <sino-title slot="title" type="levelOne" title="确定支付" class="sino-dialog-title"></sino-title>
        <sino-form :model="confirmForm"  :rules="confirmFormRules" ref="confirmForm" class="demo-ruleForm">
          <sino-form-item prop="payDate" label="支付日期：">
            <sino-date-picker class="fl"
                              type="date"
                              v-model="confirmForm.payDate"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item prop="payAccvEncName" label="上传文件：" >
            <sino-upload
              ref="fileNameFile"
              :action="uploadFilePublic"
              :show-file-list="false"
              :auto-upload="true"
              :on-change="getFileName1"
              :on-success="fileSuccess1"
              :on-error="fileError1">
              <div slot="trigger">
                <input class="uploadFileBox" readonly="true" v-model="confirmForm.payAccvEncName"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-button class="clear mgauto" type="primary" @click="quePayFun">确 定</sino-button>
        </sino-form>
      </sino-dialog>
      <!--反馈业务员确定-->
      <sino-dialog :visible.sync="subEavForm" size="large" class="leads-follow" >
        <sino-title slot="title" type="levelOne" title="反馈业务员确认" class="sino-dialog-title"></sino-title>
        <sino-form class="demo-ruleForm">
          <sino-form-item prop="fileName" label="是否再次审批：">
            <sino-radio v-for="(item, index) in yesNoList" :key="index"
                        :label="item.id">{{item.title}}</sino-radio>
          </sino-form-item>
          <sino-form-item prop="fileName" label="反馈内容：" >
            <sino-input class="fl" type="textarea"
                        :disabled="false"></sino-input>
          </sino-form-item>
          <sino-button class="clear mgauto" type="primary">确 定</sino-button>
        </sino-form>
      </sino-dialog>
      <!--上传凭证 dialog-->
      <sino-dialog :visible.sync="uploadForm" size="small" class="leads-follow " @close="resetForm('uploadFileFrom')">
        <sino-title slot="title" type="levelOne" title="上传凭证" class="sino-dialog-title"></sino-title>
        <sino-form class="demo-ruleForm" :model="uploadFileFrom"  :rules="uploadFileFromRules" ref="uploadFileFrom">
          <sino-form-item prop="payAccvEncName" label="上传文件：" >
            <sino-upload
              ref="fileNameFile"
              :action="uploadFilePublic"
              :show-file-list="false"
              :auto-upload="true"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError">
              <div slot="trigger">
                <input class="uploadFileBox" readonly="true" v-model="uploadFileFrom.payAccvEncName"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-button class="clear mgauto" type="primary" @click="uploadFun">确 定</sino-button>
        </sino-form>
      </sino-dialog>
      <!--查看凭证-->
      <sino-dialog :visible.sync="seeForm" size="large" class="leads-follow dialog-item">
        <sino-title slot="title" type="levelOne" title="查看凭证" class="sino-dialog-title"></sino-title>
        <sino-auto-table :data="credData" height="300" border stripe>
          <sino-table-column type="index" label="序号" width="50" align="center"></sino-table-column>
          <sino-table-column prop="payAccvEncName" label="文件名称" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="110">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" v-if="scope.row.previewPath"  @click="preview(scope.row)">预览</span><i v-if="scope.row.previewPath" class="table-i">|</i>
                <span class="table-span" @click="uploadFileFun(scope.row)">下载</span>
              </template>
            </template>
          </sino-table-column>
        </sino-auto-table>
        <sino-page v-bind:page="cred.pageNum"
                   v-bind:page-size="cred.pageSize"
                   v-on:pagehandler="pageHandlerCred"
                   :pageArray="cred.pageArray"
                   v-on:choosePageFun="choooseNumCred"
                   v-bind:object="object"
                   :total="cred.total"></sino-page>
        <!--<sino-button class="clear mgauto" type="primary" >确 定</sino-button>-->
      </sino-dialog>
      <!--下载报盘-->
      <transition name="fade">
        <div v-if="toVoidForm" class="div-dialog">
          <h2>正在生成报盘文件</h2>
          <ul class="div-dialog-table">
            <li v-if="downOffFrom.samPathName"><i class="iconfont sino-qubiezhen sino-font-co"></i>&nbsp;&nbsp;<span>{{downOffFrom.samPathName}}</span></li>
            <li v-if="downOffFrom.diffPathName"><i class="iconfont sino-qubiezhen sino-font-co"></i>&nbsp;&nbsp;<span>{{downOffFrom.diffPathName}}</span></li>
            <li v-if="downOffFrom.qiYePathName"><i class="iconfont sino-qubiezhen sino-font-co"></i>&nbsp;&nbsp;<span>{{downOffFrom.qiYePathName}}</span></li>
          </ul>
          <sino-progress :percentage="50" :stroke-width="13" :text-inside="true" status="exception" class="sino-progress"></sino-progress>
        </div>
      </transition>
      <!--生成报销单-->
      <sino-dialog :visible.sync="reimbFalg" size="large" class="mail-dialog see-dirc suppinfo-dialog-box big-supp-dialog" :top="'5%'">
        <sino-title slot="title" type="levelOne" title="费用报销单" class="sino-dialog-title"></sino-title>
        <div class="remib">
          <!--头部-->
          <div class="remib-top">
            <!--标题-->
            <div class="remib-title">
              <h5>费用报销单</h5>
              <h3>报销日期<span>{{expenInfoData.reimTime?expenInfoData.reimTime.split('-')[0]:''}}</span>年<span>{{expenInfoData.reimTime?expenInfoData.reimTime.split('-')[1]:''}}</span>月<span>{{expenInfoData.reimTime?expenInfoData.reimTime.split('-')[2]:''}}</span>日</h3>
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
                <span>￥</span><span>{{toMoney(expenInfoData.reimAmoTotal)}}</span>
              </li>
            </ul>
            <!--表格底部-->
            <ul class="table-bottom fl">
              <li class="fl bottom-f1 bor-null">
              <span class="fl meo-mar-le">核实金额（大写）
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 7)}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 6)}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 5)}}</span>万
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 4)}}</span>仟
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 3)}}</span>佰
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 2)}}</span>拾
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, 1)}}</span>元
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, -1)}}</span>角
                <span class="w40">{{toBigNum(expenInfoData.reimAmoTotal, -2)}}</span>分
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
      </span>
      </sino-dialog>
      <!--预览大图-->
      <div class="busconeav-view-large bus-view-large-height" v-if="browseFlag">
        <sino-title slot="title" type="levelOne">
          <i class="iconfont fr sino-guanbi" @click="browseFlag=false"></i>
        </sino-title>
        <img :src="browImgPath" alt="" class="img-wi-hi">
      </div>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';

  let checkedArr = '';
  export default {
    name: "payadmin",
    data () {
      return {
        bigNumArr: ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'],
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        browseFlag: false, // 浏览的弹层
        reimbFalg: false, // 生成报销单
        expenInfoData: {},
        browImgPath: '',  // 预览图片的地址
        // 查询的条件
        serchFrom: {
          reimOrderNo: '',      // 报销单编号
          reimPayState: null,    // 支付进度
          reimPayStateName: '',    // 支付进度
          payPaidType: null,    // 支付类别
          payPaidTypeName: '',    // 支付类别
          isLoadOffer: null,    // 是否下载报盘
          isLoadOfferName: '',    // 是否下载报盘
          payDateBeg: '',     //   支付起始日期
          payDateEnd: '',    // 支付终止日期
          isUpload: null,    // 是否上传凭证
          isUploadName: null,     // 是否上传凭证
          sourceId: 0,
          empName: '',
          certNo: ''
        },
        routerView: false,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        fileName: '',
        credData: null,
        yesNoList: [], // 是否已有照片单选框
        // 确认支付
        confirmFalg: false,
        confirmForm: {
          payAccvEncName: '', // 附件名称
          payAccvEncId: '', // 附件唯一号
          payDate: '', // 支付日期
          reimOrderIdS: [] // 报销单id集合
        },
        confirmFormRules: {
          payDate: [
            {required: true, message: '请选择支付日期', trigger: 'change', type: 'date'}
          ]
        },
        uploadForm: false,
        seeForm: false,
        toVoidForm: false,
        subEavForm: false,
        payTableData: null,
        // 查看凭证表格
        cred: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null
        },
        // 上传文件数据
        uploadFileFrom: {
          payAccvEncId: '',        // 凭证附件唯一号
          payAccvEncName: '',      // 凭证附件名称
          reimOrderId: null,        // 报销单id
          reimOrderIdS: []          // 报销单id集合
        },
        uploadFileFromRules: {
          payAccvEncName: [
            {required: true, message: '请选择文件', trigger: 'change'}
          ]
        },
        // 查看凭证数据
        viewCred: null,
        // 下载报盘返回来的数据
        downOffFrom: {}
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/payAdmin") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      // this.yesNoFun();
      this.serchFrom.reimPayState = 7;
      this.serchFrom.reimPayStateName = '待支付';
      this.serchFun();
      this.ruoteJudge();
    },
    mounted () {
      this.validator.addEnterEvent(this.serchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 最上面的查询
      serchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      uploadFileFun (scope) {
        api.download(scope.downLoadPath);
      },
      // 查看报销单
      viewReim (scope) {
        api.post(this.apiPath.hrsc.lookReimOrder, {reimOrderId: scope.reimOrderId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let resData = res.data;
            let lengthNum = resData.reimOrderItems.length;
            if (lengthNum < 5) {
              for (var i  = 0; i < 5 - lengthNum; i++) {
                resData.reimOrderItems.push({empty: true});
              }
            }
            this.expenInfoData = resData;
            this.reimbFalg = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下载明细
      downDeta (scope) {
        api.postsign(this.apiPath.hrsc.paidOrderDetDownload, scope.reimOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
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
      // 预览
      preview (scope) {
        this.browImgPath = scope.previewPath;
        this.browseFlag = true;
      },
      sureApplyPay () {},
      // 确认支付----》确定
      quePayFun () {
        this.$refs.confirmForm.validate((valid) => {
          if (valid) {
            this.confirmForm.payDate = Vue.filter('date')(this.confirmForm.payDate, 'yyyy-MM-dd');
            api.post(this.apiPath.hrsc.doApply, this.confirmForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.confirmFalg = false;
                this.serchFun();
                this.$message({message: '已支付！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      ruoteJudge () {
        if (this.$route.path !== "/payAdmin") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      reimDetFun (scope) {
        this.routerView = true;
        this.$router.push({path: '/payAdmin/reimDet', query: {reimOrderId: scope.reimOrderId}});
      },
      getFileName (file) {
        this.uploadFileFrom.payAccvEncName = file.name;
      },
      fileSuccess (res) {
        this.uploadFileFrom.payAccvEncId = res.data;
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
      getFileName1 (file) {
        this.confirmForm.payAccvEncName = file.name;
      },
      fileSuccess1 (res) {
        this.confirmForm.payAccvEncId = res.data;
      },
      fileError1 () {
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
      viewAll (pageNum, pageSize) {
        this.serchFrom.payDateBeg = Vue.filter('date')(this.serchFrom.payDateBeg, 'yyyy-MM-dd');
        this.serchFrom.payDateEnd = Vue.filter('date')(this.serchFrom.payDateEnd, 'yyyy-MM-dd');
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.serchFrom
        };
        api.post(this.apiPath.hrsc.getPayInfoCombination, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.payTableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 查看凭证的表格
      pageHandlerCred () {},
      choooseNumCred () {},
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      yesNoFun () {
        api.post(this.getDictSelectBox, {code: 'YES_NO'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.yesNoList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        this.confirmForm.reimOrderIdS = [];
        checkedArr = selectTion;
        for (let item of checkedArr) {
          if (item.reimOrderId) {
            this.confirmForm.reimOrderIdS.push(item.reimOrderId);
          }
        }
      },
      confirm () {
        if (checkedArr.length <= 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
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
        this.confirmFalg = true;
      },
      subEav () {
        // this.subEavForm = true;
        this.routerView = true;
        this.$router.push({path: '/payAdmin/payFeed'});
      },
      upload (scope) {
        this.uploadFileFrom.reimOrderId = scope.reimOrderId;
        this.uploadForm = true;
      },
      // 上传凭证弹层---》确定
      uploadFun () {
        this.$refs.uploadFileFrom.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.doUploadApply, this.uploadFileFrom).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '上传成功！', type: 'success'});
                this.uploadForm = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 查看凭证
      seeFun (scope) {
        this.viewCred = scope.reimOrderId;
        this.seeForm = true;
        api.postsign(this.apiPath.hrsc.getPreviewApply, this.viewCred).then(res => {
          if (res.code === 'CPYY-00001') {
            this.credData = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下载报盘
      toVoid (scope) {
        api.postsign(this.apiPath.hrsc.checkReimOrderIsLoadOffer, scope.reimOrderId).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === 1) {
              this.$confirm('已下载过报盘，是否重复下载?', '提示', {
                confirmButtonText: '确 定',
                cancelButtonText: ' ',
                type: 'warning'
              }).then(() => {
                api.postsign(this.apiPath.hrsc.downLoadOffer, scope.reimOrderId).then(res => {
                  if (res.code === 'CPYY-00001') {
                    this.downOffFrom = res.data;
                    if (res.data.diffPath) {
                      api.download(res.data.diffPath);
                    }
                    if (res.data.qiYePath) {
                      api.download(res.data.qiYePath);
                    }
                    if (res.data.samPath) {
                      api.download(res.data.samPath);
                    }
                    this.toVoidForm = true;
                    setTimeout(() => {
                      this.toVoidForm = false;
                    }, 1000);
                  }
                }).catch(err => {
                  console.log(err);
                });
              });
            }
          }
          if (res.data === 0) {
            api.postsign(this.apiPath.hrsc.downLoadOffer, scope.reimOrderId).then(res => {
              if (res.code === 'CPYY-00001') {
                this.downOffFrom = res.data;
                if (res.data.diffPath) {
                  api.download(res.data.diffPath);
                }
                if (res.data.qiYePath) {
                  api.download(res.data.qiYePath);
                }
                if (res.data.samPath) {
                  api.download(res.data.samPath);
                }
                this.toVoidForm = true;
                setTimeout(() => {
                  this.toVoidForm = false;
                }, 1000);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 重置表单
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
