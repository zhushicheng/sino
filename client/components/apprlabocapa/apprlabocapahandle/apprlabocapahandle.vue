<template>
  <!--劳动能力鉴定办理-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con class="empass-sino-icon apprl-main">
        <div class="empass-middle-box clear apprl-clear">
          <div class="empass-middle-left fl rightbodr">
            <ul class="left-bottom left-botton2">
              <li>
                <div>
                  <i class="total-img tosubm"></i>
                </div>
                <div>
                  <p>待送鉴定中心</p>
                  <p><span class="tip_num" v-text="empassform.declApprCenterCount"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="success-img  audifail"></i>
                </div>
                <div>
                  <p>待鉴定中心审核</p>
                  <p><span class="tip_num" v-text="empassform.apprCenterEavCount"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="error-img  tobenoti"></i>
                </div>
                <div>
                  <p>待确认<br/>鉴定日期</p>
                  <p><span class="tip_num" v-text="empassform.apprDateCount"></span><span style="cursor: pointer" @click="batchFailDownload(empassform.batchNo)" v-if="empassform.failNum > 0">下载</span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="total-img stayout"></i>
                </div>
                <div>
                  <p>待发放鉴定书</p>
                  <p><span class="tip_num" v-text="empassform.giveOutCount"></span><span></span></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </sino-con>

      <!--劳动能力鉴定查询-->
      <sino-con class="sino-con-more idenofthequer">
        <sino-title type="levelOne" title="劳动能力鉴定查询"></sino-title>
        <sino-form :model="accuauditForm" ref="accuauditForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text" v-model="accuauditForm.empName" :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text" v-model="accuauditForm.certNo" :disabled="false"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="办理进度：" class="search-inner-item" prop="apprHandleStateName">
                  <sino-select :filterable="false" :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code:'APPR_HANDLE_STATE'}"
                               :chooseName.sync="accuauditForm.apprHandleStateName"
                               :chooseId.sync="accuauditForm.apprHandleState"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label=" " class="search-inner-item" prop="socialsecu">
                </sino-form-item>
              </li>
              <sino-collapse-transition>
                <div class="sino-translate" v-show="searchFlag">
                  <li class="li-wid">
                    <sino-form-item label="付费供应商：" class="search-inner-item" prop="paySuppName" @click="resetFun">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="selectBox"
                                   :chooseName.sync="accuauditForm.paySuppName"
                                   :chooseId.sync="accuauditForm.paySuppId"
                                   :clear="true"
                                   class="multiple-choice"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custName" @click="resetFun">
                      <sino-select :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :disabled="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findCustSelectBoxByCertNoAndAreaId"
                                   :chooseName.sync="accuauditForm.custName"
                                   :chooseId.sync="accuauditForm.custId"
                                   :clear="true"
                                   :token="token"
                                   class="multiple-choice"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="业务部门：" class="search-inner-item" prop="depName">
                      <sino-select class="fl"
                                   :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :token="token"
                                   :url="findOrgSelectBoxInfo"
                                   :chooseName.sync="accuauditForm.depName"
                                   :chooseId.sync="accuauditForm.depId"
                                   :clear="true"
                                   @change="busiDepChange">
                      </sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="业务员：" class="search-inner-item" prop="busiRespName">
                      <sino-select class="fl"
                                   :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :linkage="true"
                                   :url="findUserByOrgIdAndRoleType"
                                   :data="creIdNameData"
                                   :chooseName.sync="accuauditForm.busiRespName"
                                   :chooseId.sync="accuauditForm.busiRespId"
                                   :clear="true" >
                      </sino-select>
                    </sino-form-item>
                  </li>
                </div>
              </sino-collapse-transition>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
              <sino-button class="ressetButton" @click="resetFun('accuauditForm')" v-if="searchFlag">重 置</sino-button>
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

      <!--鉴定人员列表-->
      <div class="sino-table-total sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left"  >
            <sino-button type="icon-text" @click="eavFun()" class="sion-btn"><i class="iconfont sino-xinjianzhangdan"></i><span class="ideno-hover">送鉴定中心</span>
            </sino-button>
            <sino-button type="icon-text" @click="subFun()" size="small" class="sion-btn"><i class="iconfont sino-fabu fs19 "></i><span class="ideno-hover">审核通过</span>
            </sino-button>
          </div>
        </div>
        <!--信息列表-->
        <sino-table :data="tableData" stripe border @select="selectTabelRow" max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="applyTel" label="手机号" min-width="120"></sino-table-column>
          <sino-table-column prop="apprHandleStateName" label="办理进度"></sino-table-column>
          <sino-table-column prop="areaName" label="社保执行地" min-width="150"></sino-table-column>
          <sino-table-column prop="apprDate" label="鉴定日期" min-width="120"></sino-table-column>
          <sino-table-column prop="apprResultName" label="鉴定结果"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="150"></sino-table-column>
          <sino-table-column prop="paySuppName" label="付费供应商" min-width="150"></sino-table-column>
          <sino-table-column prop="depName" label="负责业务部门" min-width="120"></sino-table-column>
          <sino-table-column prop="busiRespName" label="业务员" min-width="120"></sino-table-column>
          <sino-table-column prop="declApprCenterPer" label="经办人"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" bottom="79 !important" min-width="340">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span v-for="(item, index) in operating" v-if="scope.row.apprHandleState === item.status" :key="index">
                  <span v-if="item.op1">
                    <span class="table-span" @click="partFun(scope.row)">{{item.op1}}</span><i class="table-i" v-if="item.op2 || item.op3 || item.op4">|</i>
                  </span>
                  <span v-if="item.op2">
                    <span class="table-span" @click="modifyFun(scope.row)">{{item.op2}}</span><i class="table-i" v-if="item.op3 || item.op4">|</i>
                  </span>
                  <span v-if="item.op3">
                    <span class="table-span" @click="abaideFun(scope.row)">{{item.op3}}</span><i class="table-i" v-if="item.op4">|</i>
                  </span>
                  <span v-if="item.op4">
                    <span class="table-span" @click="issAppFun(scope.row)">{{item.op4}}</span>
                  </span>
                </span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum"
                   v-bind:page-size="page.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray"
                   v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>

      <!--送鉴定中心-->
      <sino-dialog :visible.sync="idenCenFlag" :top="'20%'" class="dialog-wage " v-on:close="resetFun('idenCenForm')">
        <sino-title slot="title" type="levelOne" title="送鉴定中心" class="sino-dialog-title"></sino-title>
        <sino-form :model="idenCenForm" :rules="idenCenRules" ref="idenCenForm" class="demo-sendAddrAddForm">
          <sino-form-item label="送鉴定中心日期：" prop="declApprCenterDate" class="wage-wid">
            <sino-date-picker class="fl"
                              v-model="idenCenForm.declApprCenterDate"
                              type="date"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item prop="declApprCenterPer" label="办理人：" class="wage-wid">
            <sino-input class="fl" type="text" v-model="idenCenForm.declApprCenterPer" :disabled="false"></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="idenCenFun">确 定</sino-button>
      </span>
      </sino-dialog>

      <!--审核通过-->
      <sino-dialog :visible.sync="appPassFlag" :top="'20%'" class="dialog-wage" v-on:close="resetFun('appPassForm')">
        <sino-title slot="title" type="levelOne" title="审核通过" class="sino-dialog-title"></sino-title>
        <sino-form :model="appPassForm" :rules="appPassRules" ref="appPassForm" class="demo-sendAddrAddForm">
          <sino-form-item label="审核日期：" prop="apprCenterEavDate" class="wage-wid">
            <sino-date-picker class="fl"
                              v-model="appPassForm.apprCenterEavDate"
                              type="date"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="appPassFun">确 定</sino-button>
      </span>
      </sino-dialog>

      <!--审核不通过-->
      <sino-dialog :visible.sync="appNoPassFlag" :top="'20%'" size="large" class="dialog-height" v-on:close="resetFun('appNoPassForm')">
        <sino-title slot="title" type="levelOne" title="审核不通过" class="sino-dialog-title"></sino-title>
        <sino-form :model="appNoPassForm" :rules="appNoPassRules" ref="appNoPassForm" class="demo-sendAddrAddForm">
          <sino-form-item label="审核日期：" prop="apprCenterEavDate" class="wage-wid">
            <sino-date-picker class="fl"
                              v-model="appNoPassForm.apprCenterEavDate"
                              type="date"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="apprCenterEavFailReason" label="原因：">
            <sino-input type="textarea" v-model="appNoPassForm.apprCenterEavFailReason" :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="appNoPassFun">确 定</sino-button>
      </span>
      </sino-dialog>

      <!--维护鉴定日期-->
      <sino-dialog :visible.sync="maiIdeDateFlag" :top="'20%'" class="dialog-wage" v-on:close="resetFun('maiIdeDateForm')">
        <sino-title slot="title" type="levelOne" title="维护鉴定日期" class="sino-dialog-title"></sino-title>
        <sino-form :model="maiIdeDateForm" :rules="maiIdeDateRules" ref="maiIdeDateForm" class="demo-sendAddrAddForm">
          <sino-form-item label="鉴定日期：" prop="apprDate" class="wage-wid">
            <sino-date-picker class="fl"
                              v-model="maiIdeDateForm.apprDate"
                              type="date"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="maiIdeDateFun">确 定</sino-button>
      </span>
      </sino-dialog>

      <!--领取鉴定结果-->
      <sino-dialog :visible.sync="entIdeResuFlag" :top="'20%'" class="dialog-wage" v-on:close="resetFun('entIdeResuForm')">
        <sino-title slot="title" type="levelOne" title="领取鉴定结果" class="sino-dialog-title"></sino-title>
        <sino-form :model="entIdeResuForm" :rules="entIdeResuRules" ref="entIdeResuForm" class="demo-sendAddrAddForm">
          <sino-form-item label="鉴定结果：" class="wage-wid" prop="apprResult">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :url="getDictSelectBox"
                         :data="{code:'APPR_RESULT'}"
                         :chooseName.sync="entIdeResuForm.apprResultName"
                         :chooseId.sync="entIdeResuForm.apprResult"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item prop="apprResultFileName" label="上传文件：" class="sino-form-item1">
            <sino-upload
              ref="fileNameFile"
              :action="uploadFilePublic"
              :show-file-list="false"
              :auto-upload="true"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError"
              :headers="uploadHeader"
            >
              <div slot="trigger">
                <input class="uploadFileBox" v-model="entIdeResuForm.apprResultFileName" readonly="true"/>
                <span class="chooseFileButton">上传</span>
              </div>
            </sino-upload>
          </sino-form-item>
          <sino-form-item class="sino-form-item1" prop="receApprResultRemark" label="备注：">
            <sino-input type="textarea" v-model="entIdeResuForm.receApprResultRemark" :disabled="false" ></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="entIdeResuFun">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  let checkedArr = [];
  let checkedBrr = [];
  export default {
    data () {
      let _that = this;
      return {
        empassform: { // 劳动能力鉴定title列表--->四个小模块
          declApprCenterCount: null, // ---待送鉴定中心人数
          apprCenterEavCount: null,   // ----待鉴定中心审核人数
          apprDateCount: null,   // ----待确定鉴定日期人数
          giveOutCount: null    // ---待发放鉴定书人数
        },
        creIdNameData: {
          orgId: undefined,
          roleTypes: [5]
        },
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        uploadHeader: {"Token": Cookie.get('Token')},
        // 录入鉴定结果
        entIdeResuFlag: false,
        entIdeResuForm: {
          apprResult: null, // 鉴定结果id
          apprResultName: '', // 鉴定结果
          apprResultFileId: null, // 鉴定结果id
          apprResultFileName: '', // 鉴定结果文件名称
          receApprResultRemark: '', // 领取鉴定结果备注
          apprId: null // 劳动能力鉴定id
        },
        entIdeResuRules: {
          apprResult: [
            {required: true, message: '请选择鉴定结果', trigger: 'change', type: 'number'}
          ]
        },
        // 维护鉴定日期
        maiIdeDateFlag: false,
        maiIdeDateForm: {
          apprDate: '', // 日期
          apprId: '' // 劳动能力鉴定id
        },
        maiIdeDateRules: {
          apprDate: [
            {required: true, message: '请输入日期', trigger: 'change', type: 'date'}
          ]
        },
        // 审核不通过
        appNoPassFlag: false,
        appNoPassForm: {
          apprCenterEavDate: '', // 审核日期
          apprCenterEavFailReason: '', // 原因
          apprId: '' // id
        },
        appNoPassRules: {
          apprCenterEavDate: [
            {required: true, message: '请输入日期', trigger: 'change', type: 'date'}
          ],
          apprCenterEavFailReason: [
            {required: true, message: '请输入原因', trigger: 'change'}
          ]
        },
        // 审核通过
        appPassFlag: false,
        appPassForm: {
          apprCenterEavDate: '' // 审核日期
        },
        appPassRules: {
          apprCenterEavDate: [
            {required: true, message: '请输入日期', trigger: 'change', type: 'date'}
          ]
        },
        // 送鉴定中心
        idenCenFlag: false,
        idenCenForm: {
          declApprCenterPer: '', // 送鉴定中心办理人
          declApprCenterDate: '', // 送鉴定中心日期
          apprIds: []
        },
        idenCenRules: {
          declApprCenterPer: [
            {required: true, message: '请输入办理人', trigger: 'change'}
          ],
          declApprCenterDate: [
            {required: true, message: '请输入日期', trigger: 'change', type: 'date'}
          ]
        },
        // 发放鉴定书弹层
        issAppForm: {
          issuePer: '',
          issueSignId: '',
          apprId: null,
          empName: '',
          certNo: '',
          issuePerId: null
        },
        // 放弃鉴定弹层
        abaideForm: {
          empName: '',
          certNo: '',
          giveUpDesc: '',
          apprId: null
        },
        issAppRules: {
          issueSignId: [
            {required: true, message: '请输入领取人签名', trigger: 'change'}
          ],
          issuePer: [
            {required: true, message: '请选择领取人', trigger: 'change'}
          ]
        },
        abaideFormRules: {
          giveUpDesc: [
            {required: true, message: '请输入放弃原因', trigger: 'change'}
          ]
        },
        token: Cookie.get('Token'),
        paidProData: {
          areaId: null,
          certNo: null
        }, // 付费供应商下拉框传参的数据
        index: null,  // 上传时选中的index;
        matConForm: '',
        materData: [], //  申请弹层表格
        areaSelectBox: this.apiPath.hrsc.areaSelectBox, // 执行地区下拉框
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 上传文件
        findCertNoAndAreaId: this.apiPath.hrsc.findCertNoAndAreaId, // 付费供应商下拉框
        selectBox: this.apiPath.hrsc.selectBox, // g 付费供应商下拉框
        findCustSelectBoxByCertNoAndAreaId: this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId, // 客户下拉框下拉框
        // 修改
        identificFlag: false, // 申请和修改弹层 显示
        // 查询条件
        accuauditForm: {
          empName: '',
          certNo: '',
          apprHandleStateName: '',
          apprHandleState: '',
          areaName: '',
          areaId: '',
          paySuppName: '',
          paySuppId: '',
          custName: '',
          custId: '',
          busiRespName: '',
          busiRespId: '',
          depName: '',
          depId: ''
        },
        findCustSelectInfo: '',
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
        },
        object: { // 表格列表
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        searchFlag: false,
        tableData: null,
        conTitle: false, // 鉴定申请
        giveupa: '放弃鉴定',
        birthDate: '',
        appliForm: {
          empName: '', // 雇员姓名
          certNo: '522129198112014107', // 证件号码
          areaId: null, // 社保执行地区ID
          areaName: '', // 社保执行地区
          receMatDate: '', // 材料收取日期
          paySuppId: null, // 付费供应商id
          paySuppName: '', // 付费供应商名称
          custId: null, // 客户id
          custName: '', // 客户名称
          applyName: '', // 递交材料人姓名
          applyTel: '' // 递交材料人电话
        },
        // 鉴定修改校验
        appliFormRules: {
          empName: [
            {required: true, message: '请输入雇员姓名', trigger: 'change'}
          ],
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'}
          ],
          areaName: [
            {required: true, message: '请选择社保执行地', trigger: 'change'}
          ],
          receMatDate: [
            {required: true, message: '请选择材料收取日期', trigger: 'change'}
          ],
          paySuppName: [
            {required: true, message: '请选择付费供应商名称', trigger: 'change'}
          ],
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          applyName: [
            {required: true, message: '请输入递交材料人姓名', trigger: 'change'}
          ],
          applyTel: [
            {required: true, message: '请输入递交材料人电话', trigger: 'change'}
          ]
        },
        giveupaRules: {
          conName: [
            {required: true, message: '放弃原因', trigger: 'change'}
          ]
        },
        toissueidRules: {
          receiverName: [{required: true, message: '领取人', trigger: 'change'}],
          signatureName: [{required: true, message: '领取人签名', trigger: 'change'}]
        },
        giveupappr: false,  // 放弃鉴定书  弹层显示
        toissueident: false,  // 发放鉴定书 弹层显示
        seeItem: false,
        seeForm: '',
        routerView: false,
        // 操作项
        operating: [
          {status: 1, op1: '', op2: '', op3: '', op4: ''},
          {status: 2, op1: '详情', op2: '审核不通过', op3: '', op4: ''},
          {status: 3, op1: '详情', op2: '审核不通过', op3: '', op4: ''},
          {status: 4, op1: '详情', op2: '', op3: '', op4: ''},
          {status: 5, op1: '详情', op2: '', op3: '', op4: ''},
          {status: 6, op1: '详情', op2: '', op3: '维护鉴定日期', op4: ''},
          {status: 7, op1: '详情', op2: '', op3: '', op4: ''},
          {status: 8, op1: '详情', op2: '', op3: '', op4: '领取鉴定结果'},
          {status: 9, op1: '详情', op2: '', op3: '', op4: ''},
          {status: 10, op1: '详情', op2: '', op3: '', op4: ''}
        ],
        userName: Cookie.get('CPYY-INFO-NAME')
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/apprLaboCapaHandle") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
      this.numbStates();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      /**
       * 查询劳动能力鉴定各个状态的数量
       */
      numbStates () {
        api.postsign(this.apiPath.sins.findSinsInjApprCount, 1).then(res => {
          if (res.code === 'CPYY-00001') {
            for (let item in this.empassform) {
              this.empassform[item] = res.data[item];
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      ruoteJudge () {
        if (this.$route.path !== "/apprLaboCapaHandle") {
          this.routerView = true;
        }
      },
      busiDepChange () {
        this.creIdNameData.orgId = this.accuauditForm.depId;
      },
      // 获取表格选中数据的id集合
      getapprIds () {
        let apprIds = [];
        for (let item of checkedBrr) {
          apprIds.push(item.apprId);
        };
        return apprIds;
      },
      // 录入鉴定结果---->确定
      entIdeResuFun () {
        this.$refs.entIdeResuForm.validate((valid) => {
          if (valid) {
            api.postsign(this.apiPath.sins.updateApprResult, this.entIdeResuForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.entIdeResuFlag = false;
                this.$message({message: '领取成功！', type: 'success'});
                this.searchFun();
                this.numbStates();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 维护鉴定日期--->确定
      maiIdeDateFun () {
        this.$refs.maiIdeDateForm.validate((valid) => {
          if (valid) {
            this.maiIdeDateForm.apprDate = Vue.filter('date')(this.maiIdeDateForm.apprDate, 'yyyy-MM-dd');
            api.postsign(this.apiPath.sins.updateApprDate, this.maiIdeDateForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.maiIdeDateFlag = false;
                this.$message({message: '维护成功！', type: 'success'});
                this.searchFun();
                this.numbStates();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 审核不通过--->确定
      appNoPassFun () {
        this.$refs.appNoPassForm.validate((valid) => {
          if (valid) {
            this.appNoPassForm.apprCenterEavDate = Vue.filter('date')(this.appNoPassForm.apprCenterEavDate, 'yyyy-MM-dd');
            api.postsign(this.apiPath.sins.updateApprCenterEavFail, this.appNoPassForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.appNoPassFlag = false;
                this.searchFun();
                this.numbStates();
                this.$message({message: '审核不通过！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 审核通过--->确定
      appPassFun () {
        this.$refs.appPassForm.validate((valid) => {
          if (valid) {
            this.appPassForm.apprIds = this.getapprIds();
            this.appPassForm.apprCenterEavDate = Vue.filter('date')(this.appPassForm.apprCenterEavDate, 'yyyy-MM-dd');
            api.postsign(this.apiPath.sins.updateApprCenterEavSuccess, this.appPassForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.appPassFlag = false;
                this.$message({message: '审核通过！', type: 'success'});
                this.searchFun();
                this.numbStates();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 送鉴定中心---> 确定
      idenCenFun () {
        this.$refs.idenCenForm.validate((valid) => {
          if (valid) {
            this.idenCenForm.declApprCenterDate = Vue.filter('date')(this.idenCenForm.declApprCenterDate, 'yyyy-MM-dd');
            this.idenCenForm.apprIds = this.getapprIds();
            api.postsign(this.apiPath.sins.updateDeclApprCenter, this.idenCenForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.idenCenFlag = false;
                this.$message({message: '已发送！', type: 'success'});
                this.searchFun();
                this.numbStates();
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 审核不通过
      modifyFun (scope) {
        this.appNoPassForm.apprId = scope.apprId;
        this.appNoPassFlag = true;
      },
      // 发放鉴定书弹层----> 确定
      issAppSuFun () {
        this.toissueident = false;
        api.post(this.apiPath.sins.updateIssueApprByApprId, this.issAppForm).then(res => {
          if (res.code === 'CPYY-00001') {}
        }).catch(err => {
          console.log(err);
        });
      },
      // 领取鉴定结果
      issAppFun (scope) {
        this.entIdeResuFlag = true;
        this.entIdeResuForm = {
          apprResult: null, // 鉴定结果id
          apprResultName: '', // 鉴定结果
          apprResultFileId: null, // 鉴定结果id
          apprResultFileName: '', // 鉴定结果文件名称
          receApprResultRemark: '', // 领取鉴定结果备注
          apprId: null // 劳动能力鉴定id
        };
        this.entIdeResuForm.apprId = scope.apprId;
      },
      // 放弃鉴定弹层-----> 确定
      abaideSuFun () {
        this.seeItem = false;
        api.post(this.apiPath.sins.updateGiveUpApprByApprId, this.abaideForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '已放弃鉴定！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectCallBack (selectTion, row) {
        checkedArr = selectTion;
      },
      //  鉴定申请弹层--->确定
      ldeAppFun () {
        api.post(this.apiPath.sins.saveInjAppr, {injAppr: this.appliForm, injApprMats: checkedArr}).then(res => {
          if (res.code === 'CPYY-00001') {}
        }).catch(err => {
          console.log(err);
        });
      },
      // 删除已经上传的文件
      deleFileFun (index) {
        this.materData[index].matName = '';
      },
      // 上传成功
      getFileName (file) {
        this.entIdeResuForm.apprResultFileName = file.name;
      },
      fileSuccess (res) {
        this.entIdeResuForm.apprResultFileId = res.data;
      },
      fileError () {},
      //
      currentUploadFun (row, index) {
        this.index = index;
      },
      //   地区带出材料和供应商
      maretFun (id) {
        this.paidProData.areaId = this.appliForm.areaId;
        this.paidProData.certNo = this.appliForm.certNo;
        api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, {confUse: 6, dimen: 1, dimenValue: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.materData = res.data.matConfs;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //  证件号码带出地区
      areaFun (certNo) {
        api.post(this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo, {certNo: certNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.length === 1) {
              this.appliForm.areaId = res.data[0].accrAreaId;
              this.appliForm.areaName =  res.data[0].accrAreaName;
              this.appliForm.empName = res.data[0].empName;
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      matResFieFun (from) {
        this.$refs[from].resetFields();
      },
      // 查询
      searchFun () {
        this.page.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.accuauditForm
        };
        api.post(this.apiPath.sins.findSinsInjApprAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      eavFun () {
        if (checkedBrr.length === 0) {
          this.$alert('请选择至少一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        };
        let itemFalg = true;
        for (let item of checkedBrr) {
          if (item.apprHandleState !== 2) {
            itemFalg = false;
          }
        }
        if (itemFalg) {
          this.idenCenForm.declApprCenterPer = this.userName;
          this.idenCenFlag = true; // 申请弹层 显示
        } else {
          this.$alert('待送鉴定中心状态才可以操作！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
        }
      },
      // 审核通过
      subFun () {
        this.idenCenForm.declApprCenterPer = this.userName;
        if (checkedBrr.length === 0) {
          this.$alert('请选择至少一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          return;
        };
        let itemFalg = true;
        for (let item of checkedBrr) {
          if (item.apprHandleState !== 3) {
            itemFalg = false;
          }
        }
        if (itemFalg) {
          this.appPassFlag = true;
        } else {
          this.$alert('待送鉴定中心审核状态才可以操作！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
        }
      },
      // 通知雇员鉴定
      infoFun () {
        api.post(this.apiPath.sins.updateNoticeEmpApprByApprIdList, {apprIds: this.getapprIds()}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '已通知雇员！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //  详情
      partFun (scope) {
        this.routerView = true;
        this.$router.push({path: '/apprLaboCapa/viewApprApplyInfo', query: {apprId: scope.apprId}});
      },
      // 维护鉴定日期
      abaideFun (scope) {
        this.maiIdeDateFlag = true;
        this.maiIdeDateForm.apprId = scope.apprId;
      },
      selectTabelRow (selection, row) {
        checkedBrr = selection;
      },
      //  改变当前页
      pageHandler (pageNum) {
        this.page.pageNum = pageNum;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 改变分页显示条数;
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 鉴定修改 确定
      newMatConFun () {}
    }
  };
</script>
