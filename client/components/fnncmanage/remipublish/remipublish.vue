<template>
  <div class="usermanage">
    <!--汇款单发布-->
    <sino-con>
      <sino-title type="levelOne" title="汇款单信息查询"></sino-title>
      <sino-form :model="remiForm" ref="remiForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="汇款公司名称：" class="search-inner-item" prop="remiCorpName">
                <sino-input type="text" class="fl" v-model="remiForm.remiCorpName" :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="汇款单编号：" class="search-inner-item" prop="remiNo">
                <sino-input type="text" class="fl" v-model="remiForm.remiNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="汇款来源类别：" class="search-inner-item" prop="remiTypeStr">
                <sino-select class="fl" :tipText="''" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="remiForm.remiTypeStr" :chooseId.sync="remiForm.remiType" :data="{code: 'REMI_TYPE'}" :clear="true" :url="dictSelUrl"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="汇款单状态：" class="search-inner-item" prop="stateStr">
                <sino-select class="fl"
                             :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :chooseName.sync="remiForm.stateStr"
                             :chooseId.sync="remiForm.state"
                             :data="{code: 'REMI_STATE'}"
                             :clear="true"
                             :url="dictSelUrl"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <span class="two-dater-span">银行受理日期：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="startDate">
                  <sino-date-picker class="fl"
                                    v-model="remiForm.startDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">-</span>
                <sino-form-item class="search-inner-item" prop="endDate">
                  <sino-date-picker class="fl"
                                    v-model="remiForm.endDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </div>
            </li>
            <li>
              <sino-form-item label="汇款金额：" class="search-inner-item" prop="remiMoney">
                <sino-input type="text" class="fl" v-model="remiForm.remiMoney" :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('remiForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
            <sino-button type="icon-text" @click="sendFun"><i class="iconfont sino-shangchuan"></i>发布
            </sino-button>
            <sino-button type="icon-text" @click="resendFun"><i class="iconfont sino-invalid"></i>取消发布
            </sino-button>
            <sino-button type="icon-text" @click="leadFun"><i class="iconfont sino-import"></i>批量导入</sino-button>
            <sino-button type="icon-text" @click="autoclaimFun"><i class="iconfont sino-qian"></i>自动认领</sino-button>
            <sino-button type="icon-text" @click="downloadFun"><i class="iconfont sino-download-copy"></i>下载模板</sino-button>
          </div>
        </div>
        <sino-table :data="remiData" stripe border max-height="416" v-on:viewAll="viewAll" v-on:select="selectCallBack" @selection-change="filterChange">
          <sino-table-column type="selection" width="45"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="remiCorpName" label="汇款方公司名称" min-width="180"></sino-table-column>
          <sino-table-column prop="remiTypeStr" label="汇款来源类别" min-width="110"></sino-table-column>
          <sino-table-column label="汇款金额" width="150" type="money" align="center" prop="remiMoney"></sino-table-column>
          <sino-table-column prop="stateStr" label="汇款单状态" min-width="100"></sino-table-column>
          <sino-table-column prop="remiNo" label="汇款单编号" min-width="100"></sino-table-column>
          <sino-table-column prop="markNo" label="标记号"></sino-table-column>
          <sino-table-column prop="bankAcceDate" label="银行受理日期" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="145" class="user-btns" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i" v-if="scope.row.state !== 2">|</i>
                <span class="table-span" v-if="scope.row.state !== 2" @click="delFun(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page
          v-bind:page="pageNum"
          v-bind:page-size="pageSize"
          v-on:pagehandler="pageHandler"
          :pageArray="pageArray"
          v-on:choosePageFun="choooseNum"
          v-bind:object="object"
          :total="total"></sino-page>
      </div>
    </div>
    <!-- 新增-->
    <sino-dialog :visible.sync="remiAddFlag" size="large" :top="'3%'" class="dialog-height" @close ="cleanContent('remiPublishForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="remiPublishForm" :rules="remiPublishRules" ref="remiPublishForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="remiCorpName" label="汇款方公司名称：" class="sino-form-item-width">
          <sino-input type="text" v-model="remiPublishForm.remiCorpName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="remiBankName" label="汇款方银行名称：" class="sino-form-item-width">
          <sino-input type="text" v-model="remiPublishForm.remiBankName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="remiBankAcct" label="汇款方银行账号：" class="sino-form-item-width">
          <sino-input type="text" v-model="remiPublishForm.remiBankAcct"></sino-input>
        </sino-form-item>

        <sino-form-item prop="remiNo" label="汇款单编号：" v-if="this.alertTitle == '修改汇款单信息'">
          <sino-input type="text" v-model="remiPublishForm.remiNo" disabled></sino-input>
        </sino-form-item>
        <sino-form-item prop="stateStr" label="汇款单状态：" v-if="this.alertTitle == '修改汇款单信息'">
          <sino-input type="text" v-model="remiPublishForm.stateStr" disabled></sino-input>
        </sino-form-item>

        <sino-form-item prop="receCorpName" label="收款方公司名称：" class="sino-form-item-width">
          <sino-input type="text" v-model="remiPublishForm.receCorpName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="receBankName" label="收款方银行名称：" class="sino-form-item-width">
          <sino-input type="text" v-model="remiPublishForm.receBankName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="receBankAcct" label="收款方银行账号：" class="sino-form-item-width">
          <sino-input type="text" v-model="remiPublishForm.receBankAcct"></sino-input>
        </sino-form-item>
        <sino-form-item label="汇款金额：" prop="remiMoney">
          <sino-input v-model.number="remiPublishForm.remiMoney" @blur="blurFun(remiPublishForm.remiMoney)"></sino-input>
        </sino-form-item>
        <sino-form-item prop="remiMoneyCap" label="汇款金额（大写）：">
          <sino-input type="text" disabled v-model="remiPublishForm.remiMoneyCap" placeholder="自动转换为大写"></sino-input>
        </sino-form-item>
        <sino-form-item label="汇款来源类别：" prop="remiTypeStr">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="remiPublishForm.remiTypeStr" :chooseId.sync="remiPublishForm.remiType" :data="{code: 'REMI_TYPE'}" :clear="true" :url="dictSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="标记号：" prop="markNo">
          <sino-input v-model.number="remiPublishForm.markNo"></sino-input>
        </sino-form-item>
        <sino-form-item label="银行受理日期：" prop="bankAcceDate" class="clear">
          <sino-date-picker class="fl"
                            v-model="remiPublishForm.bankAcceDate"
                            type="date"
                            :editable="false"
                            :readonly="false"
                            :clearable="true">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item prop="tranPotp" label="交易附言：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="remiPublishForm.tranPotp"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看 -->
    <sino-dialog :visible.sync="remiSeeFlag" size="small">
      <sino-title slot="title" type="levelOne" title="查看汇款单" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>汇款方公司名称</h6><span v-text="remiSeeList.remiCorpName"></span>
          </li>
          <li>
            <h6>汇款方银行名称</h6><span v-text="remiSeeList.remiBankName"></span>
          </li>
          <li>
            <h6>汇款方银行账号</h6><span v-text="remiSeeList.remiBankAcct"></span>
          </li>
          <li>
            <h6>收款方公司名称</h6><span v-text="remiSeeList.receCorpName"></span>
          </li>
          <li>
            <h6>收款方银行名称</h6><span v-text="remiSeeList.receBankName"></span>
          </li>
          <li>
            <h6>收款方银行账号</h6><span v-text="remiSeeList.receBankAcct"></span>
          </li>
          <li>
            <h6>汇款金额</h6><span v-text="remiSeeList.remiMoney"></span>
          </li>
          <li>
            <h6>汇款金额大写</h6><span v-text="remiSeeList.remiMoneyCap"></span>
          </li>
          <li>
            <h6>汇款来源类别</h6><span v-text="remiSeeList.remiTypeStr"></span>
          </li>
          <li>
            <h6>标记号</h6><span v-text="remiSeeList.markNo"></span>
          </li>
          <li>
            <h6>银行受理日期</h6><span v-text="remiSeeList.bankAcceDate"></span>
          </li>
          <li>
            <h6>汇款单编号</h6><span v-text="remiSeeList.remiNo"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="remiSeeList.creName"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="remiSeeList.creTime"></span>
          </li>
          <li class="li-last">
            <h6>交易附言</h6><span v-text="remiSeeList.tranPotp"></span>
          </li>
        </ul>
      </div>
    </sino-dialog>
    <!--批量导入-->
    <sino-dialog :visible.sync="remiLeadFlag" :top="'30%'" class="remilead-wid" @close ="cleanContent('remiLeadForm')">
      <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
      <sino-form :model="remiLeadForm" :rules="remiLeadRules" ref="remiLeadForm">
        <sino-form-item prop="addr" label="数据文件：" class="sino-form-item-width is-required">
          <sino-upload
            class="upload-demo"
            ref="remiUpload"
            :action="fileAction"
            :show-file-list="true"
            :auto-upload="true"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :headers="headerToken"
            :on-error="fileError"
          >
            <div slot="trigger">
              <input class="uploadFileBox" type="text" v-model="fileName" readonly="true"/>
              <span class="chooseFileButton">上传</span>
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitUpload">确 定</sino-button>
      </span>
    </sino-dialog>
    <sino-dialog :visible.sync="remiLeadSeeFlag" size="small" class="remi-dialog">
      <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <input type="hidden" v-model="remiLeadSeeList.batchNo"/>
            <h6>导入文件名称</h6><span v-text="remiLeadSeeList.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span>
              {{remiLeadSeeList.total}}
              <a v-if="remiLeadSeeList.total !== 0" href="javascript:void(0)" @click="remiAllDownload(remiLeadSeeList.batchNo)">
                下载
              </a>
            </span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span>
              {{remiLeadSeeList.succ}}
              <a v-if="remiLeadSeeList.succ !== 0" href="javascript:void(0)" @click="remiSuccDownload(remiLeadSeeList.batchNo)">下载</a>
            </span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span>
              {{remiLeadSeeList.fail}}
              <a v-if="remiLeadSeeList.fail !== 0" href="javascript:void(0)" @click="remiFailDownload(remiLeadSeeList.batchNo)">下载</a>
            </span>
          </li>
          <li>
            <h6>导入人</h6><span v-text="remiLeadSeeList.creName"></span>
          </li>
          <li>
            <h6>导入时间</h6><span v-text="remiLeadSeeList.creTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="remiLeadSeeFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--自动认领-->
    <sino-dialog :visible.sync="remiAutoClaimFlag" class="remilead-wid-two" size="small">
      <sino-title slot="title" type="levelOne" title="汇款单自动匹配结果" class="sino-dialog-title"></sino-title>
      <div>
        <div class="kuang fl">
          <div class="upper"></div>
          <div class="middle">
            <span>未发布汇款单</span>
            <div>
              <span class="zishu" v-text="remiAutoClaimForm.unpublishRemiCount"></span> 张
            </div>
          </div>
          <div class="below"></div>
          <div class="mark"></div>
        </div>
        <div class="kuang fl">
          <div class="upper"></div>
          <div class="middle">
            <span>自动匹配成功</span>
            <div>
              <input type="hidden" v-model="remiAutoClaimForm.billChargeRemiS"/>
              <span class="zishu" v-text="remiAutoClaimForm.mathingCount"></span> 张
            </div>
          </div>
          <div class="below">
            <sino-button type="text" v-if="remiAutoClaimForm.mathingCount" @click="belowFun(remiAutoClaimForm.billChargeRemiS)" :class="{'maincolor': spanDis, '': !spanDis}" :disabled="spanDis">确认认领</sino-button>
          </div>
          <div class="mark"></div>
        </div>
        <div class="kuang fl">
          <div class="upper"></div>
          <div class="middle">
            <span>未匹配待发布</span>
            <div>
              <input type="hidden" v-model="remiAutoClaimForm.remiS"/>
              <span class="zishu publish" v-text="remiAutoClaimForm.unmatchingCount" @click="remiPublishSearch(remiAutoClaimForm.remiS)"></span> 张
            </div>
          </div>
          <div class="below">
            <sino-button v-if="remiAutoClaimForm.unmatchingCount" type="text" @click="publishFun(remiAutoClaimForm.remiS)" :class="{'maincolor': spanRemiSDis, '': !spanRemiSDis}" :disabled="spanRemiSDis">发布</sino-button>
          </div>
          <div class="mark"></div>
        </div>
      </div>
    </sino-dialog>
    <!--匹配失败-->
    <sino-dialog :visible.sync="remiAutoErrorFlag" size="small">
      <sino-title slot="title" type="levelOne" title="汇款单自动匹配结果" class="sino-dialog-title"></sino-title>
      <input type="hidden" v-model="remiAutoRemiId">
      <sino-auto-table :data="remiAutoErrorData" max-height="237" stripe border>
        <sino-auto-table-column type="index" label="序号" align="center"></sino-auto-table-column>
        <sino-auto-table-column prop="remiNo" label="汇款单编号" min-width="95"></sino-auto-table-column>
        <sino-auto-table-column prop="remiCorpName" label="汇款方公司名称"></sino-auto-table-column>
        <sino-auto-table-column prop="remiBankName" label="汇款方银行名称"></sino-auto-table-column>
        <sino-auto-table-column prop="remiMoney" label="汇款金额"></sino-auto-table-column>
      </sino-auto-table>
      <sino-page
        v-bind:page="remiAuto.pageNum"
        v-bind:page-size="remiAuto.pageSize"
        v-on:pagehandler="remipageHandler"
        :pageArray="remiAuto.pageArray"
        v-on:choosePageFun="remichoooseNum"
        v-bind:object="object"
        :total="remiAuto.total"></sino-page>
      <span slot="footer" class="dialog-footer">
        <!--<sino-button type="primary" @click="remiAutoClaimFlag=false">发布</sino-button>-->
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import filter from '../../../filters/index';
  import Vue from 'vue';
  import Cookies from 'js-cookie';

  let _bankAcceDate, checkedArr;

  export default {
    components: {
    },
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        uploadUrl: this.apiPath.hrsc.remiImportXls,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        headerToken: {"Token": Cookies.get('Token')},
        remiForm: {
          remiCorpName: '',
          remiNo: '',
          remiType: '',
          remiTypeStr: '',
          state: '',
          stateStr: '',
          startDate: '',
          endDate: '',
          remiMoney: ''
        },
        alertTitle: '',
        isA: true,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [5, 10, 20, 30, 50],
        remiAuto: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [5, 10, 20, 30, 50],
          total: null
        },
        remiData: null,
        remiAddFlag: false,
        remiPublishForm: {
          remiCorpName: '',
          remiBankName: '',
          remiBankAcct: '',
          receCorpName: Cookies.get('CorpName'),
          receBankName: '',
          receBankAcct: '',
          remiMoney: '',
          remiMoneyCap: '',
          bankAcceDate: '',
          tranPotp: '',
          markNo: '',
          remiType: '',
          remiTypeStr: '',
          remiNo: '',
          stateStr: ''
        },
        remiPublishRules: {
          remiCorpName: [
            {required: true, message: '请输入汇款方公司名称', trigger: 'change'}
          ],
          remiBankName: [
            {required: true, message: '请输入汇款方银行名称', trigger: 'change'}
          ],
          receCorpName: [
            {required: true, message: '请输入收款方公司名称', trigger: 'change'}
          ],
          receBankName: [
            {required: true, message: '请输入收款方银行名称', trigger: 'change'}
          ],
          remiMoney: [
            {type: 'number', required: true, message: '请输入汇款金额', trigger: 'change'},
            {validator: this.validator.checkPointNum, trigger: 'change'}
          ],
          remiMoneyCap: [
            {required: true, message: '请输入汇款金额（大写）', trigger: 'change'}
          ],
          remiTypeStr: [
            {required: true, message: '请输入汇款来源类别', trigger: 'change'}
          ],
          bankAcceDate: [
            {type: "date", required: true, message: '请输入银行受理日期', trigger: 'change'}
          ]
        },
        remiSeeFlag: false,
        remiSeeList: {
          remiCorpName: '',
          remiBankName: '',
          remiBankAcct: '',
          receCorpName: '',
          receBankName: '',
          receBankAcct: '',
          remiMoney: '',
          remiMoneyCap: '',
          remiTypeStr: '',
          markNo: '',
          bankAcceDate: '',
          remiNo: '',
          creName: '',
          creTime: '',
          tranPotp: ''
        },
        remiLeadForm: {},
        remiLeadRules: {},
        fileName: '',
        remiLeadFlag: false,
        remiLeadSeeFlag: false,
        remiLeadSeeList: {
          creName: '',
          total: '',
          succ: '',
          fail: '',
          batchNo: '',
          fileName: '',
          creTime: ''
        },
        fileNo: '',
        remiAutoClaimFlag: false,
        remiAutoErrorFlag: false,
        remiAutoErrorData: [{}, {}, {}, {}, {}],
        btnText: '',
        remiAutoClaimForm: {
          unpublishRemiCount: '',
          mathingCount: '',
          unmatchingCount: '',
          billChargeRemiS: [],
          remiS: []
        },
        spanDis: false,
        spanRemiSDis: false,
        remiAutoRemiId: []
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      blurFun (value) {
        this.remiPublishForm.remiMoneyCap = filter.digitUppercase(value);
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
      },
      filterChange (selectTion, val) {
        checkedArr = selectTion;
      },
      viewAll (pageNum, pageSize) {
        this.remiForm.startDate = Vue.filter('date')(this.remiForm.startDate, 'yyyy-MM-dd');
        this.remiForm.endDate = Vue.filter('date')(this.remiForm.endDate, 'yyyy-MM-dd');
        let data = {
          data: this.remiForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.page, data).then(res => {
          this.remiData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          this.remiForm.startDate = '';
          this.remiForm.endDate = '';
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      addFun () {
        this.alertTitle = '新增汇款单信息';
        this.remiAddFlag = true;
        this.btnText = '确 定';
      },
      modifyFun (value) {
        this.alertTitle = '修改汇款单信息';
        this.remiAddFlag = true;
        this.btnText = '修 改';
        api.post(this.apiPath.hrsc.remiGetById, {remiId: value.remiId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiPublishForm = res.data;
            this.remiPublishForm.bankAcceDate = new Date(this.remiPublishForm.bankAcceDate);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 发布
      sendFun () {
        let _this = this;
        if (!checkedArr || checkedArr.length < 1) {
          _this.$alert('请选择一条汇款单', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _data = [];
        for (let i = 0; i < checkedArr.length; i++) {
          _data.push(checkedArr[i].remiId);
        }
        api.post(_this.apiPath.hrsc.remiPublish, {remiIds: _data}).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            _this.searchFun();
            _this.$message({message: '发布成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消发布
      resendFun () {
        let _this = this;
        if (!checkedArr || checkedArr.length < 1) {
          _this.$alert('请选择一条汇款单', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let _data = [];
        let _state = [];
        for (let i = 0; i < checkedArr.length; i++) {
          _data.push(checkedArr[i].remiId);
          _state.push(checkedArr[i].state);
        }
        api.post(_this.apiPath.hrsc.remiNoPublish, {remiIds: _data, state: _state}).then(res => {
          if (res.code === 'CPYY-00001') {
            checkedArr = [];
            _this.searchFun();
            _this.$message({message: '取消发布成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 批量导入
      leadFun () {
        this.remiLeadFlag = true;
      },
      // 自动认领
      autoclaimFun () {
        this.$confirm('是否匹配汇款单?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.autoMatching, this.remiForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.remiAutoClaimFlag = true;
              this.remiAutoClaimForm = res.data;
              if (this.remiAutoClaimForm.mathingCount === 0) {
                this.spanDis = true;
              } else {
                this.spanDis = false;
              }
              if (this.remiAutoClaimForm.unmatchingCount === 0) {
                this.spanRemiSDis = true;
              } else {
                this.spanRemiSDis = false;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('匹配失败!');
        });
      },
      // 确认认领
      belowFun (_billChargeRemiS) {
        if (this.spanDis === true) {
          return false;
        }
        api.post(this.apiPath.hrsc.autoClaim, _billChargeRemiS).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiAutoClaimForm.mathingCount = 0;
            this.spanDis = true;
            this.$message({message: '确认认领成功！', type: 'success'});
            this.searchFun();
          } else {
            this.spanDis = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 发布
      publishFun (_remiS) {
        if (this.spanRemiSDis === true) {
          return false;
        }
        api.post(this.apiPath.hrsc.batchPublish, _remiS).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiAutoClaimForm.unmatchingCount = 0;
            this.spanRemiSDis = true;
            this.$message({message: '发布成功！', type: 'success'});
            this.searchFun();
          } else {
            this.spanRemiSDis = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 汇款单发布自动认领查看未匹配待发布
      remiPublishSearch (obj) {
        this.remiAutoErrorFlag = true;
        this.remiAutoRemiId = obj;
        this.remiAuto.pageNum = 1;
        this.remiPublishView(this.remiAuto.pageNum, this.remiAuto.pageSize, obj);
      },
      remiPublishView (pageNum, pageSize, _data) {
        let _array = [];
        _data.forEach(function (list) {
          _array.push(list.remiId);
        });
        let _obj = {
          data: {
            remiIds: _array
          },
          pageSize: pageSize,
          pageNum: pageNum
        };
        api.post(this.apiPath.hrsc.pageBatchPublish, _obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiAutoErrorData = res.data.list;
            this.remiAuto.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 删除列表数据
      delFun (value) {
        let _this = this;
        _this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.remiDelete, {remiId: value.remiId}).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.remiAddFlag = false;
              _this.searchFun();
              _this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      seeFun (value) {
        let _this = this;
        _this.remiSeeFlag = true;
        api.post(this.apiPath.hrsc.remiGetById, {remiId: value.remiId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.remiSeeList = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(1, pageSize);
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      remichoooseNum: function (pageSize) {
        this.remiAuto.pageSize = pageSize;
        this.remiAuto.pageNum = 1;
        this.remiPublishView(this.remiAuto.pageNum, this.remiAuto.pageSize, this.remiAutoRemiId);
      },
      remipageHandler: function (page) {
        this.remiAuto.pageNum = page;
        this.remiPublishView(this.remiAuto.pageNum, this.remiAuto.pageSize, this.remiAutoRemiId);
      },
      cleanContent: function (formName) {
        this.$refs[formName].resetFields();
        this.$refs.remiUpload.uploadFiles = [];
        this.fileName = '';
      },
      submitForm () {
        // 新增确定
        const _this = this;
        _this.$refs.remiPublishForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增汇款单信息') {
              _this.remiPublishForm.bankAcceDate = Vue.filter('date')(_this.remiPublishForm.bankAcceDate, 'yyyy-MM-dd');
              api.post(this.apiPath.hrsc.remiSave, _this.remiPublishForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.remiAddFlag = false;
                  _this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              _this.remiPublishForm.bankAcceDate = Vue.filter('date')(_this.remiPublishForm.bankAcceDate, 'yyyy-MM-dd');
              api.post(this.apiPath.hrsc.remiUpdate, _this.remiPublishForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.remiAddFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      // 批量导入
      submitUpload () {
        // this.$refs.remiUpload.submit();
        api.postsign(this.uploadUrl, this.fileNo).then(res => {
          if (res.code === 'CPYY-00001') {
//            api.download(res.data);
            this.remiLeadFlag = false;
            this.remiLeadSeeFlag = true;
            this.remiLeadSeeList = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 下载模板
      downloadFun () {
        api.postsign(this.apiPath.hrsc.downloadByType, 32).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName (file, filelist) {
        if (filelist.length > 1) {
          filelist = filelist.splice(0, 1);
        }
        this.fileName = file.name;
      },
      fileSuccess (res) {
        let _this = this;
        if (res.code === 'CPYY-00001') {
          _this.fileNo = res.data;
          // this.$message({message: '上传成功！', type: 'success', onClose: function () {
          //   // _this.remiLeadFlag = false;
          //   _this.$refs.remiUpload.clearFiles();
          //   _this.fileName = '';
          //   // _this.remiLeadSeeFlag = true;
          //   _this.remiLeadSeeList = res.data;
          // }});
        } else {
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
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
            return;
          }
        });
      },
      downFun (res) {
        if (res.code === 'CPYY-00001') {
          api.download(res.data);
        }
      },
      remiFailDownload (batchNo) {
        api.post(this.apiPath.hrsc.exportExcelFail, {batchNo: batchNo}).then(res => {
          this.downFun(res);
        }).catch(err => {
          console.log(err);
        });
      },
      remiSuccDownload (batchNo) {
        api.post(this.apiPath.hrsc.exportExcelSucc, {batchNo: batchNo}).then(res => {
          this.downFun(res);
        }).catch(err => {
          console.log(err);
        });
      },
      remiAllDownload (batchNo) {
        api.post(this.apiPath.hrsc.exportExcelAll, {batchNo: batchNo}).then(res => {
          this.downFun(res);
        }).catch(err => {
          console.log(err);
        });
      },
      resetFun: function (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
