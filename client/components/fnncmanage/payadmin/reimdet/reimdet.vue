<template>
  <!--报销单明细-->
  <div class="usermanage">
      <sino-con>
        <sino-title type="levelOne" title="报销单明细查询"></sino-title>
        <sino-form :model="seachForm" ref="seachForm" class="serch-form leads-serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one costcenter-width">
                <span class="search-inner-name">客户/供应商名称：</span>
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="billSuppCust"
                             :chooseName.sync="seachForm.custSuppName"
                             :chooseId.sync="seachForm.custSuppId" :clear="true"
                ></sino-select>
              </li>
              <li>
                <span class="search-inner-name">雇员姓名：</span>
                <sino-input class="fl" type="text" v-model="seachForm.empName"></sino-input>
              </li>
              <li class="search-inner-name">
                <span class="search-inner-name">证件号码：</span>
                <sino-input class="fl" type="text" v-model="seachForm.certNo"></sino-input>
              </li>
              <li>
                <span class="search-inner-name">类别：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :chooseName.sync="seachForm.reimOrderName"
                             :chooseId.sync="seachForm.reimOrderType"
                             :clear="true"
                             :data="{code:'REIM_ORDER_TYPE'}"
                             :url="getDictSelectBox"
                ></sino-select>
              </li>
              <li>
                <span class="search-inner-name">支付进度：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :chooseName.sync="seachForm.reimPayStateName"
                             :chooseId.sync="seachForm.reimPayState"
                             :clear="true"
                             :data="{code:'PAY_SCHEDULE', ids: [7, 8, 9]}"
                             :url="getDictSelectBox"
                ></sino-select>
              </li>
              <li>
                <span class="search-inner-name">银行所属：</span>
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :chooseName.sync="seachForm.bankOfferName"
                             :chooseId.sync="seachForm.bankOfferType"
                             :clear="true"
                             :data="{code:'BABK_OFFER_TYPE'}"
                             :url="getDictSelectBox"
                ></sino-select>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun(seachForm)">重 置</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--search result-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <!--<div class="sino-table-icon-left">-->
              <!--<sino-button type="icon-text" @click="subEav()"><i class="iconfont sino-eav"></i>反馈业务员确认</sino-button>-->
            <!--</div>-->
          </div>
          <sino-table :data="payTableData" max-height="416" v-on:viewAll="viewAll" border stripe v-on:select="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="custSuppName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="empName" label="雇员名称" min-width="180"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="reimOrderNo" label="报销单编号" min-width="150"></sino-table-column>
            <sino-table-column prop="reimOrderTypeName" label="类别" min-width="105"></sino-table-column>
            <sino-table-column prop="reimOrderItemAmo" label="金额" width="120" type="money"></sino-table-column>
            <sino-table-column prop="payDirName" label="支付方向" min-width="95"></sino-table-column>
            <sino-table-column prop="bankNameP" label="银行类型" min-width="95"></sino-table-column>
            <sino-table-column prop="bankNo" label="银行卡号" min-width="180"></sino-table-column>
            <sino-table-column prop="acctBankName" label="开户行名称" min-width="150"></sino-table-column>
            <sino-table-column prop="applyDate" label="申请日期" min-width="120"></sino-table-column>
            <sino-table-column prop="reimPayStateName" label="支付进度" min-width="95"></sino-table-column>
            <sino-table-column prop="isLoadOfferName" label="是否已下载报盘" min-width="120"></sino-table-column>
            <sino-table-column prop="payDate" label="支付日期" min-width="120"></sino-table-column>
            <sino-table-column prop="busiRespName" label="申请人" min-width="95"></sino-table-column>
            <sino-table-column label="操作" align="center" width="250" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span"  @click="upload(scope.row)">上传凭证</span><i class="table-i">|</i>
                  <span class="table-span" @click="toVoid(scope.row)">查看凭证</span>
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
      <sino-dialog :visible.sync="confirmForm" size="small" class="leads-follow ">
        <sino-title slot="title" type="levelOne" title="确定支付" class="sino-dialog-title"></sino-title>
        <sino-form class="demo-ruleForm">
          <sino-form-item prop="fileName" label="支付日期：">
            <sino-date-picker class="fl"
                              type="date"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item prop="fileName" label="上传文件：" >
            <sino-upload
              ref="fileNameFile"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError"
            >
              <div slot="trigger">
                <input class="uploadFileBox" readonly="true" v-model="fileName"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-button class="clear mgauto" type="primary">确 定</sino-button>
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
      <sino-dialog :visible.sync="uploadForm" size="small" class="leads-follow " >
        <sino-title slot="title" type="levelOne" title="上传凭证" class="sino-dialog-title"></sino-title>
        <sino-form class="demo-ruleForm">
          <sino-form-item prop="fileName" label="上传文件：" >
            <sino-upload
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError"
            >
              <div slot="trigger">
                <input class="uploadFileBox" readonly="true" v-model="fileName"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-button class="clear mgauto" type="primary">确 定</sino-button>
        </sino-form>
      </sino-dialog>
      <!--查看凭证-->
      <sino-dialog :visible.sync="seeForm" size="small" class="leads-follow " >
        <sino-title slot="title" type="levelOne" title="查看凭证" class="sino-dialog-title"></sino-title>
        <sino-table :data="payTableData" max-height="200" v-on:viewAll="viewAll" border stripe>
          <sino-table-column type="index" label="序号" width="50" align="center"></sino-table-column>
          <sino-table-column prop="con" label="文件名称" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="110">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span"  @click="toVoid(scope.row)">预览</span><i class="table-i">|</i>
                <span class="table-span" @click="upload(scope.row)">下载</span>
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
        <sino-button class="clear mgauto" type="primary">确 定</sino-button>
      </sino-dialog>
      <!--下载报盘-->
      <transition name="fade">
        <div v-if="toVoidForm" class="div-dialog">
          <h2>正在生成报盘文件</h2>
          <ul class="div-dialog-table">
            <li>xxxxx.xlsx</li>
            <li>wwwwww.xlsx</li>
          </ul>
          <sino-progress :percentage="50" :stroke-width="13" :text-inside="true" status="exception" class="sino-progress"></sino-progress>
        </div>
      </transition>
    </div>
</template>

<script>
  import api from '../../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  let checkedArr = '';
  export default {
    name: "payadmin",
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        custInfoSelectBox: this.apiPath.hrsc.findCustSelectInfo1,
        billSuppCust: this.apiPath.hrsc.billSuppCust,   // 客户/供应商下拉框
        seachForm: {
          custSuppId: null,      //  客户供应商名称id
          custSuppName: '',                    //  客户供应商名称
          empName: '',                        // 雇员名称
          certNo: '',                          // 证件号码
          reimOrderType: null,                 // 类型
          reimOrderName: '',                 // 类型
          reimPayStateName: '',                  // 支付状态
          reimPayState: null,                  // 支付状态
          bankOfferName: '',              // 银行所属
          bankOfferType: null,              // 银行所属
          reimOrderId: this.$route.query.reimOrderId    // 账单id
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
        payTableData: null,
        yesNoList: [], // 是否已有照片单选框
        confirmForm: false,
        uploadForm: false,
        seeForm: false,
        toVoidForm: false,
        subEavForm: false
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
    mounted () {
      this.searchFun();
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 最上面的查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      reimDetFun () {
        this.routerView = true;
        this.$router.push({path: '/payAdmin/reimDet'});
      },
      getFileName (file) {
        this.fileName = file.name;
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.importForm.fileId = res.data;
        } else {
          this.modifyAndAddForm.bankAcctPermitName = '';
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
      viewAll (pageNum, pageSize) {
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.seachForm
        };
        api.post(this.apiPath.hrsc.getRemiOrderDetCombination, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.payTableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
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
        checkedArr = selectTion;
        if (checkedArr.length && checkedArr.length > 0) {
          this.allData = checkedArr.length;
        }
      },
      confirm () {
        this.confirmForm = true;
      },
      subEav () {
        this.subEavForm = true;
      },
      upload () {
        this.uploadForm = true;
      },
      seeFun () {
        this.seeForm = true;
      },
      toVoid () {
        this.toVoidForm = true;
        setTimeout(() => {
          this.toVoidForm = false;
        }, 1000);
      }
    }
  };
</script>
