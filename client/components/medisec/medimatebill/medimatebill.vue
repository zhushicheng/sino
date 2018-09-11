<template>
  <!--医保生育收单-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="收单查询"></sino-title>
      <sino-form :model="mediQueryForm" ref="mediQueryForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li>
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="mediQueryForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="mediQueryForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="办理进度：" class="search-inner-item" prop="handleScheduleName">
                <sino-select :filterable="false"
                             :multiselect="true"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :data="{code: 'SEND_SINS_STATE'}"
                             :chooseName.sync="mediQueryForm.handleScheduleName"
                             :chooseId.sync="mediQueryForm.handleSchedule"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保执行地：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :data="{data: {busiAreaTypes: [1]}}"
                             :chooseName.sync="mediQueryForm.areaName"
                             :chooseId.sync="mediQueryForm.areaId"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="searchFlag">
                <li class="li-wid search-inner-name">
                  <sino-form-item label="付费供应商：" class="search-inner-item" prop="paySuppName">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="suppUrl"
                                 :token="token"
                                 :chooseName.sync="mediQueryForm.paySuppName"
                                 :chooseId.sync="mediQueryForm.paySuppId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid search-inner-name">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="custUrl"
                                 :chooseName.sync="mediQueryForm.custName"
                                 :chooseId.sync="mediQueryForm.custId"
                                 :clear="true"
                                 :token="token"
                                 class="multiple-choice"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务部门：" class="search-inner-item" prop="respBusiDepName">
                    <sino-select :filterable="true" class="multiple-choice"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findOrgSelectBoxInfo"
                                 :chooseName.sync="mediQueryForm.respBusiDepName"
                                 :chooseId.sync="mediQueryForm.respBusiDepId"
                                 @change="busiDepChange"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="respBusiRepName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :linkage="true"
                                 :token="token"
                                 :url="findUserByOrgIdAndRoleType"
                                 :data="creIdNameData"
                                 :chooseName.sync="mediQueryForm.respBusiRepName"
                                 :chooseId.sync="mediQueryForm.respBusiRepId"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
              </div>
            </sino-collapse-transition>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-button-box-1">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('mediQueryForm')">重 置</sino-button>
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
    <!-- 列表 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="applyFun"><i class="iconfont sino-xinjianzhangdan"></i>报销申请</sino-button>
            <sino-button type="icon-text" @click="submitFun"><i class="iconfont sino-queren"></i>提交</sino-button>
          </div>
        </div>
        <sino-table :data="mediTableData" max-height="416" border v-on:viewAll="viewAll" stripe v-on:selection-change="selectCallBack">
          <sino-table-column type="selection" min-width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="150"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="reimTypeName" label="报销类型" min-width="100"></sino-table-column>
          <sino-table-column prop="handleScheduleName" label="办理进度" min-width="140"></sino-table-column>
          <sino-table-column prop="areaName" label="社保执行地" min-width="150"></sino-table-column>
          <sino-table-column prop="reimAmo" label="应报销总金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="allocateAmo" label="已拨付金额" type="money" width="150"></sino-table-column>
          <sino-table-column prop="applyDate" label="申请日期" min-width="120"></sino-table-column>
          <sino-table-column prop="eavReturnReason" label="审核不通过原因" min-width="120"></sino-table-column>
          <sino-table-column label="操作" align="center" width="100" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.handleSchedule === 1 || scope.row.handleSchedule === 5">|</i>
                <span class="table-span" v-if="scope.row.handleSchedule === 1 || scope.row.handleSchedule === 5" @click="modifyFun(scope.row)">修改</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--报销申请-->
    <sino-dialog :visible.sync="reimApplyFlag" :top="'3%'" class="medimat" dialogHide @close ="cleanContent('reimApplyForm')">
      <sino-title slot="title" type="levelOne" title="报销申请" class="sino-dialog-title"></sino-title>
      <sino-form :model="reimApplyForm" :rules="reimApplyRules" ref="reimApplyForm" class="demo-sendAddrAddForm clear mt15">
        <sino-form-item label="雇员姓名：" prop="empName">
          <sino-input v-model="reimApplyForm.empName"></sino-input>
        </sino-form-item>
        <sino-form-item label="证件号码：" prop="certNo">
          <sino-input v-model="reimApplyForm.certNo" @change="certNoChange(reimApplyForm.certNo)"></sino-input>
        </sino-form-item>
        <sino-form-item label="住院开始日期：" prop="hosBegDate">
          <sino-date-picker
            v-model="reimApplyForm.hosBegDate"
            :picker-options="pickerOptionsBeg"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="住院结束日期：" prop="hosEndDate">
          <sino-date-picker
            v-model="reimApplyForm.hosEndDate"
            :picker-options="pickerOptionsEnd"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="报销类型：" prop="reimType">
          <span class="usermanage-radio">
            <sino-radio-group v-model.number="reimApplyForm.reimType" @change="reimTypeChange">
              <sino-radio v-for="(item, index) in reimTypeList" :key="index" :label="item.id">{{item.title}}</sino-radio>
            </sino-radio-group>
          </span>
        </sino-form-item>
        <sino-form-item label="社保执行地：" prop="areaName">
          <sino-select :filterable="true"
                       v-model="reimApplyForm.areaName"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="apiPath.sins.findAreaNameBox"
                       :data="areaData"
                       :linkage="true"
                       :chooseName.sync="reimApplyForm.areaName"
                       :chooseId.sync="reimApplyForm.areaId"
                       :clear="true"
                       @change="reimContentChange"
          ></sino-select>
        </sino-form-item>
        <sino-form-item label="报销内容：" class="sino-form-item-width more-content-checkbox" prop="reimContent"  v-if="reimApplyForm.reimType===1">
          <sino-checkbox-group v-model="reimApplyForm.reimContent" class="mt5" @change="reimContentChange">
            <sino-checkbox class="mr10" :label="list.id" v-for="(list, index) in productIdList" :key="list.id">{{list.title}}</sino-checkbox>
          </sino-checkbox-group>
        </sino-form-item>
        <sino-form-item label="手术日期：" prop="surgeryDate" v-if="reimApplyForm.reimType===1 && reimApplyForm.areaId === 2110751">
          <sino-date-picker
            v-model="reimApplyForm.surgeryDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="手术日期：" prop="surgeryDate" v-if="reimApplyForm.reimType===1 && reimApplyForm.areaId !== 2110751" :rules="[{required: true, type: 'date', message: '手术日期为必填项', trigger: 'change'}]">
          <sino-date-picker
            v-model="reimApplyForm.surgeryDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="申请日期：" prop="applyDate" v-if="reimApplyForm.areaId === 2110751">
          <sino-date-picker
            v-model="reimApplyForm.applyDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="申请日期：" prop="applyDate" v-if="reimApplyForm.areaId !== 2110751" :rules="[{required: true, type: 'date', message: '申请日期为必填项', trigger: 'change'}]">
          <sino-date-picker
            v-model="reimApplyForm.applyDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item prop="matSubmitPerName" label="材料递交人：" v-if="reimApplyForm.areaId === 2110751">
          <sino-input v-model="reimApplyForm.matSubmitPerName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="matSubmitPerName" label="材料递交人：" v-if="reimApplyForm.areaId !== 2110751" :rules="[{required: true, message: '材料递交人为必填项', trigger: 'change'}]">
          <sino-input v-model="reimApplyForm.matSubmitPerName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="matSubmitPerTel" label="递交人电话：">
          <sino-input v-model="reimApplyForm.matSubmitPerTel"></sino-input>
        </sino-form-item>
      </sino-form>
      <div class="emp-info-page mt15 clear title-tite" v-for="(item, index) in upFormArr" :key="item">
          <div class="local-info">
            <div class="emp-link-card em-l">
              <div class="emp-link-card-title title-border-none title-bd-n">
                <div class="title-right fl">
                  <span class="color-world fl"><i class="title-line"></i>{{item.confUseName}}</span>
                </div>
                <div class="fr bor-left zan" @click="matFlag = !matFlag">
                  <span class="color-line">|</span>
                  <i class="iconfont mat-iconfont" :class="{'sino-shuangjiantou-copy':expendArr.indexOf(item.dimenConfId) === -1,'sino-angle-double-up':expendArr.indexOf(item.dimenConfId) !== -1}" ></i>
                  <sino-button class="fr" type="icon-text" v-if="expendArr.indexOf(item.dimenConfId) === -1" @click="expendArr.push(item.dimenConfId)">展开</sino-button>
                  <sino-button class="fr" type="icon-text" v-if="expendArr.indexOf(item.dimenConfId) !== -1" @cli\ck="expendArr.splice(expendArr.indexOf(item.dimenConfId),1)">收起</sino-button>
                </div>
              </div>
              <sino-collapse-transition>
                <div class="userm" v-show="expendArr.indexOf(item.dimenConfId) !== -1">
                  <sino-auto-table :data="item.matConfs" stripe max-height="235" border class="radio-style-table" :ref="'uploadTable' + index" @selection-change="upTableSelect">
                    <sino-table-column type="selection" width="50"></sino-table-column>
                    <sino-table-column prop="confMatName" label="所需材料" align="left"></sino-table-column>
                    <sino-table-column label="已上传文件" align="center">
                      <template scope="scope">
                        <template v-if="scope.row.oper == true">
                          <i class="iconfont sino-qubiezhen fl" v-if="scope.row.matName"></i>
                          <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                          <span class="i-color" v-if="scope.row.matName" @click="reduceUploadFun(scope.row, index, scope.$index)"><i class="iconfont sino-reduce"></i></span>
                        </template>
                      </template>
                    </sino-table-column>
                    <sino-table-column label="操作项" align="center">
                      <template scope="scope" v-if="scope.row.oper == true">
                        <sino-upload
                          :action="uploadFilePublic"
                          :show-file-list="false"
                          :auto-upload="true"
                          :on-change="getFileName"
                          :on-success="fileSuccess"
                          :on-error="fileError"
                        >
                          <div slot="trigger">
                            <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(index, scope.$index)">上传</div>
                          </div>
                        </sino-upload>
                      </template>
                    </sino-table-column>
                  </sino-auto-table>
                </div>
              </sino-collapse-transition>
            </div>
          </div>
        </div>
      <div class="adminent-bor clear">
        <div class="sino-form-item sino-form-item-width">
          <label class="sino-form-item-label">备注：</label>
          <div class="sino-form-item-content">
            <sino-input type="textarea" v-model="reimApplyForm.remark"></sino-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="reimApplySubmit(1)">提 交</sino-button>
        <sino-button type="text" @click="reimApplySubmit(0)">保存</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeFlag" top="5%" dialogHide class="medimat-see">
      <sino-title slot="title" type="levelOne" title="查看详情" class="sino-dialog-title"></sino-title>
      <div class="usermanage dialog-com-tree-look-box toview-box">
        <div class="crumbs">
          <ul>
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1, 'li-notthr': activeNode  < 1}">
              <span>
                <i class="step-num iconfont" :class="{'sino-duigou': activeNode > 1}">{{activeNode > 1? '':1}}
                </i>提交申请
              </span>
            </li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2, 'li-notthr': activeNode  < 2}">
              <span>
                <i class="step-num iconfont" :class="{'sino-duigou': activeNode > 2}">{{activeNode > 2? '':2}}
                </i>待送社保
              </span>
            </li>
            <li :class="{'li-finish': activeNode > 4, 'li-active': activeNode === 4, 'li-notthr': activeNode  < 4}">
              <span>
                <i class="step-num iconfont" :class="{'sino-duigou': activeNode > 4}">{{activeNode > 4? '':3}}
                </i>审批通过
              </span>
            </li>
            <li :class="{'li-finish': activeNode > 6, 'li-active': activeNode === 6, 'li-notthr': activeNode  < 6}">
              <span>
                <i class="step-num iconfont" :class="{'sino-duigou': activeNode > 6}">{{activeNode > 6? '':4}}
                </i>领取拨付单
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="userm mt0">
        <ul class="userm-ul">
          <li class="customer-li">
            <h6>雇员姓名</h6><input readonly v-model="alloSeeList.mediMateReim.empName">
          </li>
          <li class="customer-li">
            <h6>证件号码</h6><input readonly v-model="alloSeeList.mediMateReim.certNo">
          </li>
          <li class="customer-li">
            <h6>住院开始日期</h6><input readonly v-model="alloSeeList.mediMateReim.hosBegDate">
          </li>
          <li class="customer-li">
            <h6>报销结束年月</h6><input readonly v-model="alloSeeList.mediMateReim.hosEndDate">
          </li>
          <li class="customer-li">
            <h6>报销类型</h6><input readonly v-model="alloSeeList.mediMateReim.reimTypeName">
          </li>
          <li class="customer-li">
            <h6>社保执行地</h6><input readonly v-model="alloSeeList.mediMateReim.areaName">
          </li>
          <table class="customer-sp-table clear">
            <tr>
              <td class="td-one">
                <h6>报销内容</h6>
              </td>
              <td>
                <div class="cus-sp" v-if="alloSeeList.mediMateReim.reimContent" v-text="alloSeeList.mediMateReim.reimContent.split(',').slice(0,5).join('、')"></div>
                <div class="cus-sp" v-if="alloSeeList.mediMateReim.reimContent && alloSeeList.mediMateReim.reimContent.split(',').length > 6" v-text="alloSeeList.mediMateReim.reimContent.split(',').slice(5).join('、')">
                </div>
              </td>
            </tr>
          </table>
          <li class="customer-li">
            <h6>应报销总金额</h6>
            <div class="money-content-box"><em class="fl">￥</em>{{alloSeeList.mediMateReim.reimAmo}}</div>
          </li>
          <li class="customer-li">
            <h6>已到款金额</h6>
            <div class="money-content-box"><em class="fl">￥</em>{{alloSeeList.mediMateReim.reimAmo}}</div>
          </li>
          <li class="customer-li">
            <h6>手术日期</h6><input readonly v-model="alloSeeList.mediMateReim.surgeryDate">
          </li>
          <li class="customer-li">
            <h6>申请日期</h6><input readonly v-model="alloSeeList.mediMateReim.applyDate">
          </li>
          <li class="customer-li">
            <h6>材料递交人</h6><input readonly v-model="alloSeeList.mediMateReim.matSubmitPerName">
          </li>
          <li class="customer-li">
            <h6>递交人电话</h6><input readonly v-model="alloSeeList.mediMateReim.matSubmitPerTel">
          </li>
          <table class="customer-sp-table clear">
            <tr>
              <td class="td-one">
                <h6>上传文件</h6>
              </td>
              <td>
                <div class="cus-sp" v-for="(list, index) in alloSeeList.matList" :key="index">
                  <i class="iconfont sino-qubiezhen"></i>
                  <em class="em-font">{{list.matName}}</em>
                  <em class="maincolor">预览</em><em class="maincolor"> | </em><em class="maincolor" @click="downloadFun(list.matEncId)">下载</em>
                </div>
              </td>
            </tr>
          </table>
          <li class="customer-sp">
            <h6>备注</h6><input readonly v-model="alloSeeList.mediMateReim.remark">
          </li>
          <li class="customer-sp" v-if="alloSeeList.mediMateReimhandleSchedule === 5">
            <h6>审核不通过原因</h6><input readonly v-model="alloSeeList.mediMateReim.eavReturnReason">
          </li>
        </ul>
      </div>
      <sino-title type="levelTwo" :title="'返款人信息'" class="mt15" v-if="alloSeeList.backInfoList && alloSeeList.backInfoList.length > 0"></sino-title>
      <div class="userm clear mt15" v-for="item in alloSeeList.backInfoList">
        <ul class="userm-ul">
          <li class="customer-li">
            <h6>报销内容</h6><input readonly v-model="item.reimContent">
          </li>
          <li class="customer-li">
            <h6>待遇金额</h6><div><em class="fl">￥</em>{{item.remiAmo}}</div>
          </li>
          <li class="customer-li">
            <h6>费用所属期</h6><input readonly v-model="item.costAccpNo">
          </li>
          <li class="customer-li">
            <h6>支付进度</h6><input readonly v-model="item.paySchedule">
          </li>
        </ul>
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaListByBusiAreaType,
        custUrl: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        suppUrl: this.apiPath.hrsc.selectBox,  // tt
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        token: Cookie.get("Token"),
        areaData: {certNo: '', productId: ''},
        searchFlag: false,
        mediQueryForm: {
          empName: '',
          certNo: '',
          handleScheduleName: ['待提交'],
          handleSchedule: [1],
          areaName: '',
          areaId: '',
          paySuppName: '',
          paySuppId: '',
          custName: '',
          custId: '',
          respBusiRepName: '',
          respBusiDepId: '',
          respBusiRepId: '',
          respBusiDepName: ''
        },
        creIdNameData: {
          orgId: undefined,
          roleTypes: [5]
        },
        mediTableData: null,
        total: null,
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
        reimApplyFlag: false,
        isModify: false,
        reimApplyForm: {
          empName: '',
          certNo: '',
          hosBegDate: '',
          hosEndDate: '',
          reimType: '',
          areaName: '',
          areaId: '',
          reimContent: [],
          applyDate: new Date(),
          surgeryDate: '',
          matSubmitPerName: '',
          matSubmitPerTel: '',
          respBusiDepName: '',
          respBusiDepId: '',
          respBusiRepName: '',
          respBusiRepId: ''
        },
        alloSeeList: {
          mediMateReim: {},
          matList: [],
          backInfoList: []
        },
        reimApplyRules: {
          empName: [
            {required: true, message: '请输入雇员姓名', trigger: 'change'}
          ],
          certNo: [
            {required: true, message: '请输入证件号码', trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'change'}
          ],
          reimType: [
            {type: 'number', required: true, message: '报销类型为必填项', trigger: 'change'}
          ],
          areaName: [
            {required: true, message: '社保执行地为必填项', trigger: 'change'}
          ],
          reimContent: [
            {required: true, type: 'array', message: '报销内容为必选项', trigger: 'change'}
          ]
        },
        reimTypeList: [],
        productIdList: [],
        matFlag: false,
        seeFlag: false,
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() >= new Date(this.reimApplyForm.hosEndDate);
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() <= new Date(this.reimApplyForm.hosBegDate);
          }
        },
        upFormArr: [],
        expendArr: [],
        activeFIndex: '',
        activeSIndex: '',
        activeNode: null
      };
    },
    created () {
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'SINS_REIM_TYPE'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.reimTypeList = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'REIM_CONTENT'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.productIdList = res.data.list;
        }
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 证件号码change事件
      certNoChange (data) {
        let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (reg.test(data)) {
          this.areaData.certNo = data;
          api.post(this.apiPath.sins.findMeteMediInfo, {certNo: data}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.reimApplyForm.empName = res.data.empName;
              this.reimApplyForm.areaName = res.data.areaName;
              this.reimApplyForm.areaId = res.data.areaId;
              this.reimApplyForm.matSubmitPerName = res.data.empName;
              this.reimApplyForm.matSubmitPerTel = res.data.tel;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.areaData.certNo = '';
          this.reimApplyForm.empName = '';
        }
      },
      reimTypeChange () {
        this.upFormArr = [];
        this.expendArr = [];
//        this.areaData.productId = this.reimApplyForm.reimType;
        if (this.reimApplyForm.reimType === 2) {
          this.reimContentChange();
        }
      },
      busiDepChange () {
        this.creIdNameData.orgId = this.mediQueryForm.respBusiDepId;
      },
      // 调取上传材料信息
      reimContentChange () {
        if (this.reimApplyForm.reimType === 1) {
          if ((this.reimApplyForm.areaId === 0 || this.reimApplyForm.areaId) && this.reimApplyForm.reimContent.length > 0) {
            api.post(this.apiPath.hrsc.findMatConfByUses, {confUses: this.reimApplyForm.reimContent, dimen: 1, dimenValue: this.reimApplyForm.areaId}).then(res => {
              if (res.code === 'CPYY-00001') {
                var resData = res.data;
                let arrRes = resData.map(function (item) {
                  return item.dimenConfId;
                });
                let arrUp = this.upFormArr.map(function (item) {
                  return item.dimenConfId;
                });
                resData.forEach(function (item) {
                  if (arrUp.indexOf(item.dimenConfId) === -1) {
                    item.matConfs.forEach(function (item1) {
                      item1.matEncId = '';
                      item1.isChecked = false;
                    });
                    this.upFormArr.push(JSON.parse(JSON.stringify(item)));
                  }
                }, this);
                arrUp.forEach(function (id, index) {
                  if (arrRes.indexOf(id) === -1) {
                    this.upFormArr.splice(index, 1);
                  }
                }, this);
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.upFormArr.splice(0);
          }
        } else {
          if ((this.reimApplyForm.areaId === 0 || this.reimApplyForm.areaId) && this.reimApplyForm.reimType) {
            api.post(this.apiPath.hrsc.findMatConfByUses, {confUses: [this.reimApplyForm.reimType], dimen: 1, dimenValue: this.reimApplyForm.areaId}).then(res => {
              if (res.code === 'CPYY-00001') {
                var resData = res.data;
                let arrRes = resData.map(function (item) {
                  return item.dimenConfId;
                });
                let arrUp = this.upFormArr.map(function (item) {
                  return item.dimenConfId;
                });
                resData.forEach(function (item) {
                  if (arrUp.indexOf(item.dimenConfId) === -1) {
                    item.matConfs.forEach(function (item1) {
                      item1.matEncId = '';
                      item1.isChecked = false;
                    });
                    this.upFormArr.push(JSON.parse(JSON.stringify(item)));
                  }
                }, this);
                arrUp.forEach(function (id, index) {
                  if (arrRes.indexOf(id) === -1) {
                    this.upFormArr.splice(index, 1);
                  }
                }, this);
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }
      },
      reduceUploadFun (scope, first, second) {
        this.upFormArr[first].matConfs[second].matEncId = '';
        this.upFormArr[first].matConfs[second].matName = '';
        this.upFormArr[first].matConfs[second].isChecked = false;
        this.$refs['uploadTable' + first][0].toggleRowSelection(this.upFormArr[first].matConfs[second], false);
      },
      upTableSelect (selection, row) {
      },
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.mediQueryForm,
          pageNum: pageNum || 1,
          pageSize: pageSize || 10
        };
        api.post(this.apiPath.sins.findAllMediMateReim, data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.mediTableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      cleanContent (name) {
        this.$refs[name].resetFields();
        this.reimApplyForm.applyDate = new Date();
        this.reimApplyForm.remark = '';
        this.reimApplyForm.reimContent.splice(0);
        this.upFormArr = [];
        this.expendArr = [];
        this.activeFIndex = '';
        this.activeSIndex = '';
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 报销申请
      applyFun () {
        this.reimApplyFlag = true;
        this.isModify = false;
      },
      // 报销申请提交
      reimApplySubmit (id) {
        if (this.reimApplyForm.hosBegDate) {
          this.reimApplyForm.hosBegDate = new Date(this.reimApplyForm.hosBegDate);
        }
        if (this.reimApplyForm.hosEndDate) {
          this.reimApplyForm.hosEndDate = new Date(this.reimApplyForm.hosEndDate);
        }
        if (this.reimApplyForm.applyDate) {
          this.reimApplyForm.applyDate = new Date(this.reimApplyForm.applyDate);
        }
        if (this.reimApplyForm.surgeryDate) {
          this.reimApplyForm.surgeryDate = new Date(this.reimApplyForm.surgeryDate);
        }
        this.$refs.reimApplyForm.validate((valid) => {
          if (valid) {
            let obj = {
              mediMateReim: JSON.parse(JSON.stringify(this.reimApplyForm)),
              flag: id,
              matList: []
            };
            if (obj.mediMateReim.hosBegDate) {
              obj.mediMateReim.hosBegDate = Vue.filter('date')(obj.mediMateReim.hosBegDate, 'yyyy-MM-dd');
            }
            if (obj.mediMateReim.hosEndDate) {
              obj.mediMateReim.hosEndDate = Vue.filter('date')(obj.mediMateReim.hosEndDate, 'yyyy-MM-dd');
            }
            if (obj.mediMateReim.surgeryDate) {
              obj.mediMateReim.surgeryDate = Vue.filter('date')(obj.mediMateReim.surgeryDate, 'yyyy-MM-dd');
            }
            if (obj.mediMateReim.applyDate) {
              obj.mediMateReim.applyDate = Vue.filter('date')(obj.mediMateReim.applyDate, 'yyyy-MM-dd');
            }
            if (obj.mediMateReim.reimContent) {
              obj.mediMateReim.reimContent = obj.mediMateReim.reimContent.join(',');
            }
            this.upFormArr.forEach(function (item) {
              item.matConfs.forEach(function (item1) {
                if (item1.isChecked) {
                  obj.matList.push({reimContent: item.confUse, reimType: this.reimApplyForm.reimType, matConfId: item1.matConfId, matEncId: item1.matEncId, matName: item1.matName});
                }
              }, this);
            }, this);
            let url = this.isModify ? 'updateMediMateReimById' : 'addMediMateReim';
            api.post(this.apiPath.sins[url], obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.reimApplyFlag = false;
                this.searchFun();
              }
            });
          }
        });
      },
      // 提交
      submitFun () {
        if (Array.isArray(this.checkedArr) && this.checkedArr.length > 0) {
          let arr = this.checkedArr.map(function (item) {
            return item.mediMateReimId;
          });
          api.post(this.apiPath.sins.updateCommitByListId, {list: arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.viewAll(this.pageNum, this.pageSize);
            }
          });
        } else {
          this.$alert('请选择要操作的数据！', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'info', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        }
      },
      // 查看
      seeFun (data) {
        api.postsign(this.apiPath.sins.findMediMateReimById, data.mediMateReimId).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeFlag = true;
            this.alloSeeList = res.data;
            this.activeNode = res.data.mediMateReim.handleSchedule;
          }
        });
      },
      // 修改
      modifyFun (data) {
        api.postsign(this.apiPath.sins.findMediMateReimById, data.mediMateReimId).then(res => {
          if (res.code === 'CPYY-00001') {
            let resDataList = JSON.parse(JSON.stringify(res.data.matList));
            if (res.data.mediMateReim.hosBegDate) {
              res.data.mediMateReim.hosBegDate = new Date(res.data.mediMateReim.hosBegDate);
            } else {
              res.data.mediMateReim.hosBegDate = '';
            }
            if (res.data.mediMateReim.hosEndDate) {
              res.data.mediMateReim.hosEndDate = new Date(res.data.mediMateReim.hosEndDate);
            } else {
              res.data.mediMateReim.hosEndDate = '';
            }
            if (res.data.mediMateReim.applyDate) {
              res.data.mediMateReim.applyDate = new Date(res.data.mediMateReim.applyDate);
            } else {
              res.data.mediMateReim.applyDate = '';
            }
            this.reimApplyForm.applyDate = res.data.mediMateReim.applyDate;
            if (res.data.mediMateReim.surgeryDate) {
              res.data.mediMateReim.surgeryDate = new Date(res.data.mediMateReim.surgeryDate);
            } else {
              res.data.mediMateReim.surgeryDate = '';
            }
            if (res.data.mediMateReim.reimType === 1) {
              if (Array.isArray(res.data.mediMateReim.reimContentType) && res.data.mediMateReim.reimContentType.length > 0) {
                res.data.mediMateReim.reimContent = res.data.mediMateReim.reimContentType;
              } else {
                res.data.mediMateReim.reimContent = [];
              }
            } else {
              res.data.mediMateReim.reimContent = [];
            }
            this.reimApplyFlag = true;
            this.isModify = true;
            let that = this;
            setTimeout(function () {
              that.reimApplyForm = JSON.parse(JSON.stringify(res.data.mediMateReim));
              setTimeout(function () {
                that.reimApplyForm.empName = res.data.mediMateReim.empName;
                that.reimApplyForm.matSubmitPerName = res.data.mediMateReim.matSubmitPerName;
                that.reimApplyForm.matSubmitPerTel = res.data.mediMateReim.matSubmitPerTel;
//                if (that.reimApplyForm.reimType === 1 && res.data.matList && res.data.matList.length > 0) {
//                  that.reimApplyForm.reimContent = res.data.matList.map(function (item) {
//                    return item.reimContent;
//                  });
//                } else {
//                  that.reimApplyForm.reimContent = [];
//                }
                that.reimApplyForm.areaId = res.data.mediMateReim.areaId;
                that.reimApplyForm.areaName = res.data.mediMateReim.areaName;
                if (Array.isArray(resDataList) && resDataList.length > 0) {
                  setTimeout(function () {
                    resDataList.forEach(function (item, index) {
                      that.upFormArr.forEach(function (item1, index1) {
                        item1.matConfs.forEach(function (item2, index2) {
                          if (item.matConfId === item2.matConfId) {
                            that.upFormArr[index1].matConfs[index2].matEncId = item.matEncId;
                            that.upFormArr[index1].matConfs[index2].matName = item.matName;
                            that.upFormArr[index1].matConfs[index2].isChecked = true;
                            that.$refs['uploadTable' + index][0].toggleRowSelection(that.upFormArr[index1].matConfs[index2], true);
                          }
                        });
                      });
                    });
                  }, 100);
                }
              });
            }, 100);
          }
        });
      },
      getFileName (file) {
        this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matName = file.name;
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matEncId = res.data;
          this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].isChecked = true;
          this.$refs['uploadTable' + this.activeFIndex][0].toggleRowSelection(this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex], true);
        } else {
          this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matName = '';
        }
      },
      fileError () {
        this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matName = '';
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
      currentUploadFun (first, second) {
        this.activeFIndex = first;
        this.activeSIndex = second;
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      // 下载
      downloadFun (id) {
        api.get(this.apiPath.hrsc.invMatFileDownload, {fileUniqueNo: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      // 隐藏无数据行
      rowStyleFun ({row, rowIndex}) {
        if (this.tableData.length < 5) {
          if (rowIndex >= this.tableData.length) {
            return {display: 'none'};
          }
        }
      }
    }
  };
</script>
