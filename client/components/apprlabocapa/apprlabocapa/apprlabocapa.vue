<template>
    <!--劳动能力鉴定申请-->
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
                  <p>待提交</p>
                  <p><span class="tip_num" v-text="empassform.unCommitCount"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="success-img  audifail"></i>
                </div>
                <div>
                  <p>审核不通过</p>
                  <p><span class="tip_num" v-text="empassform.eavFailCount"></span><span></span></p>
                </div>
              </li>
              <li>
                <div>
                  <i class="error-img  tobenoti"></i>
                </div>
                <div>
                  <p>待通知<br/>雇员鉴定</p>
                  <p><span class="tip_num" v-text="empassform.noticeEmpApprCount"></span><span style="cursor: pointer" @click="batchFailDownload(empassform.batchNo)" v-if="empassform.failNum > 0">下载</span></p>
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
                <sino-form-item label="社保执行地：" class="search-inner-item" prop="areaName">
                  <sino-select :filterable="true" :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="areaSelectBox"
                               :chooseName.sync="accuauditForm.areaName"
                               :chooseId.sync="accuauditForm.areaId"
                               :clear="true"></sino-select>
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
                                   :token="token"
                                   :chooseName.sync="accuauditForm.paySuppName"
                                   :chooseId.sync="accuauditForm.paySuppId"
                                   :clear="true"
                                   class="multiple-choice"
                      ></sino-select>
                    </sino-form-item>
                  </li>
                  <li class="li-wid">
                    <sino-form-item label="客户名称：" class="search-inner-item" prop="custName">
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
            <sino-button type="icon-text" @click="eavFun()" class="sion-btn"><i class="iconfont sino-xinjianzhangdan"></i><span class="ideno-hover">申请</span>
            </sino-button>
            <sino-button type="icon-text" @click="subFun()" size="small" class="sion-btn"><i class="iconfont sino-fabu fs19 "></i><span class="ideno-hover ">提交</span>
            </sino-button>
            <sino-button type="icon-text" @click="infoFun()" class="sion-btn"><i class="iconfont sino-remind fs19 "></i><span class="ideno-hover ">通知雇员鉴定</span>
            </sino-button>
          </div>
        </div>
        <!--信息列表-->
        <sino-table :data="tableData" stripe border @select="selectTabelRow" max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="150"></sino-table-column>
          <sino-table-column prop="applyTel" label="手机号" min-width="120"></sino-table-column>
          <sino-table-column prop="apprHandleStateName" label="办理进度" min-width="130"></sino-table-column>
          <sino-table-column prop="areaName" label="社保执行地" min-width="120"></sino-table-column>
          <sino-table-column prop="apprDate" label="鉴定日期" min-width="120"></sino-table-column>
          <sino-table-column prop="apprResultName" label="鉴定结果"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="150"></sino-table-column>
          <sino-table-column prop="paySuppName" label="付费供应商" min-width="150"></sino-table-column>
          <sino-table-column prop="depName" label="负责业务部门" min-width="120"></sino-table-column>
          <sino-table-column prop="busiRespName" label="业务员" min-width="120"></sino-table-column>
          <sino-table-column prop="declApprCenterPer" label="经办人"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" bottom="79 !important" min-width="170">
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
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>

      <!--申请和鉴定修改弹层-->
      <sino-dialog :visible.sync="identificFlag" top="5%" size="samll" @close="matResFieFun('appliForm')"  class="usermanage dialog-com-tree-look-box">
        <sino-title slot="title" type="levelOne" :title="conTitle === false ? '鉴定申请' : '鉴定修改'" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-modify1 clearfix layerthic">
          <sino-form :model="appliForm" :rules="appliFormRules" ref="appliForm" class="clearfix">
            <div class="search-box layer-box layer-top">
              <ul class="search-inner-box">
                <li class="search-inner-one">
                  <sino-form-item label="雇员姓名：" class="search-inner-item exca-bo" prop="empName"  :rules="[{required: true, message: '请输入雇员姓名', trigger: 'change'}]" v-if="!conTitle">
                    <sino-input class="fl" type="text" v-model="appliForm.empName" :disabled="conTitle"></sino-input>
                  </sino-form-item>
                  <sino-form-item label="雇员姓名：" class="search-inner-item exca-bo" prop="empName" v-if="conTitle">
                    <sino-input class="fl" type="text" v-model="appliForm.empName" :disabled="conTitle"></sino-input>
                  </sino-form-item>
                </li>
                <li class="search-inner-one">
                  <sino-form-item label="证件号码：" class="search-inner-item exca-bo" prop="certNo" v-if="conTitle">
                  <sino-input class="fl" type="text" v-model="appliForm.certNo" :disabled="conTitle" @blur="areaFun(appliForm.certNo)"></sino-input>
                </sino-form-item>
                  <sino-form-item label="证件号码：" class="search-inner-item exca-bo" prop="certNo" :rules="[{required: true, message: '请输入证件号码', trigger: 'change'}]" v-if="!conTitle">
                    <sino-input class="fl" type="text" v-model="appliForm.certNo" :disabled="conTitle" @blur="areaFun(appliForm.certNo)"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="社保执行地：" class="search-inner-item exca-bo" prop="areaName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="conTitle"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="areaSelectBox"
                                 :chooseName.sync="appliForm.areaName"
                                 :chooseId.sync="appliForm.areaId"
                                 @change="maretFun(appliForm.areaId)"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="材料收取日期：" class="search-inner-item exca-bo" prop="receMatDate">
                    <sino-date-picker class="fl"
                                      v-model="appliForm.receMatDate"
                                      type="date"
                                      :editable="false"
                                      :readonly="false"
                                      :clearable="true">
                    </sino-date-picker>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="付费供应商：" class="search-inner-item" prop="paySuppName">
                    <sino-select :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="findCertNoAndAreaId"
                                 :data="paidProData"
                                 :chooseName.sync="appliForm.paySuppName"
                                 :chooseId.sync="appliForm.paySuppId"
                                 :clear="true"
                                 :linkage="true"
                                 :token="token"
                                 class="multiple-choice"
                                 @finish="cerFinish"
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
                                 :url="findCustSelectBoxByCertNoAndAreaId2"
                                 :data="paidProData"
                                 :chooseName.sync="appliForm.custName"
                                 :chooseId.sync="appliForm.custId"
                                 :clear="true"
                                 :token="token"
                                 :linkage="true"
                                 class="multiple-choice"
                                 @finish="custFinish"
                    ></sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="递交材料人姓名：" class="search-inner-item exca-bo" prop="applyName" @click="resetFun">
                    <sino-input class="fl" type="text" v-model="appliForm.applyName" :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="递交材料人电话：" class="search-inner-item exca-bo" prop="applyTel" @click="resetFun">
                    <sino-input class="fl" type="text" v-model="appliForm.applyTel" :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
              </ul>
            </div>
            <sino-title type="levelTwo" title="上传文件" :style="{'overflow':'hidden'}"></sino-title>
            <div class="upload updata-box">
              <sino-auto-table :data="materData" width="100%" stripe border v-on:selection-change="selectCallBack">
                <sino-table-column type="selection" width="50"></sino-table-column>
                <sino-table-column prop="confMatName" label="所需材料" align="center"></sino-table-column>
                <sino-table-column prop="fullName" label="已上传文件" align="center">
                  <template scope="scope" v-if="scope.row.oper == true">
                    <input class="mater-style" :readonly="true" v-model="scope.row.matName"/><span v-if="scope.row.matName" class="i-color" @click="deleFileFun(scope.$index, scope.row)"><i class="iconfont sino-reduce"></i></span>
                  </template>
                </sino-table-column>
                <sino-table-column label="操作" align="center" width="80">
                  <template scope="scope">
                    <template v-if="scope.row.oper == true">
                      <sino-upload
                        :action="uploadFilePublic"
                        :show-file-list="false"
                        :auto-upload="true"
                        :on-change="getFileName"
                        :on-success="fileSuccess"
                        :on-error="fileError"><div slot="trigger">
                        <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                      </div></sino-upload>
                    </template>
                  </template>
                </sino-table-column>
              </sino-auto-table>
            </div>
            <div class="inp-text">
              <input type="text" placeholder="请输入您的备注....">
            </div>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="ldeAppFun">确 定</sino-button>
        </span>
      </sino-dialog>

      <!--放弃鉴定书-->
      <sino-dialog :visible.sync="giveupappr" top="5%" size="small" @close="matResFieFun('abaideForm')"  class="usermanage dialog-com-tree-look-box giveupacause-box">
        <sino-title slot="title" type="levelOne" :title= "giveupa" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-modify1 clearfix  layerthic">
          <sino-form :model="abaideForm" :rules="abaideFormRules" ref="abaideForm" class="clearfix">
            <div class="search-box layer-box layer-top ">
              <ul class="search-inner-box">
                <li class="search-inner-one">
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text" v-model="abaideForm.empName" :disabled="true"></sino-input>
                  </sino-form-item>
                </li>
                <li class="search-inner-one">
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text" v-model="abaideForm.certNo" :disabled="true"></sino-input>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="放弃原因：" class="search-inner-item" prop="giveUpDesc">
                    <sino-input class="giveupa" type="textarea" v-model="abaideForm.giveUpDesc" :disabled="false"></sino-input>
                  </sino-form-item>
                </li>
              </ul>
            </div>
          </sino-form>
          <span slot="footer" class="dialog-footer see-item-sure ">
          <sino-button type="primary"  @click="abaideSuFun" class="toissueident-btn">确 定</sino-button>
           </span>
        </div>
      </sino-dialog>

      <!--发放鉴定书-->
      <sino-dialog :visible.sync="toissueident" top="5%" size="samll" @close="matResFieFun('issAppForm')"  class="usermanage dialog-com-tree-look-box toissueident-box">
        <sino-title slot="title" type="levelOne" title="发放鉴定书" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-modify1 clearfix  layerthic">
          <sino-form :model="issAppForm" :rules="issAppRules" ref="issAppForm" class="clearfix">
            <div class="search-box layer-box layer-top">
              <ul class="search-inner-box giveupacause-box">
                <li class="search-inner-one">
                  <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                    <sino-input class="fl" type="text" v-model="issAppForm.empName" :disabled="true"></sino-input>
                  </sino-form-item>
                </li>
                <li class="search-inner-one">
                  <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                    <sino-input class="fl" type="text" v-model="issAppForm.certNo" :disabled="true"></sino-input>
                  </sino-form-item>
                </li>
                <li class="toissu">
                  <sino-form-item label="领取人：" class="search-inner-item exca-bo" prop="issuePerName" @click="resetFun">
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="false"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :data="{code:'ISSUE_PER'}"
                                 :chooseName.sync="issAppForm.issuePerName"
                                 :chooseId.sync="issAppForm.issuePer"
                                 :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="领取人签名：" class="search-inner-item" prop="issueSignId">
                    <sino-input class="giveupa" type="textarea" v-model="issAppForm.issueSignId"></sino-input>
                  </sino-form-item>
                </li>
              </ul>
            </div>
          </sino-form>
          <span slot="footer" class="dialog-footer see-item-sure ">
          <sino-button type="primary"  @click="issAppSuFun" class="toissueident-btn">确 定</sino-button>
           </span>
        </div>
      </sino-dialog>
    </div>
      <router-view v-if="routerView"></router-view>
    </div>
</template>
<script>
    import api from '../../../api/index';
    import Cookie from 'js-cookie';
    import Vue from 'vue';

    let checkedArr = [];
    let checkedBrr = [];
    let apprIds = [];
    export default {
      data () {
        let _that = this;
        return {
          creIdNameData: {
            orgId: undefined,
            roleTypes: [5]
          },
          token: Cookie.get('Token'),
          findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
          findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
          roleType: Cookie.get('roleType'),   //  登录人身份
          changeFalg: null, // 控制事件是否执行
          routerView: false,
          // 发放鉴定书弹层
          issAppForm: {
            issuePer: null,
            issueSignId: '',
            apprId: null,
            empName: '',
            certNo: '',
            issuePerName: ''
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
              {required: true, message: '请选择领取人', trigger: 'change', type: 'number'}
            ]
          },
          abaideFormRules: {
            giveUpDesc: [
              {required: true, message: '请输入放弃原因', trigger: 'change'}
            ]
          },
          paidProData: {
            areaId: null,
            certNo: null
          }, // 付费供应商下拉框传参的数据
          index: null,  // 上传时选中的index;
          matConForm: '',
          materData: [], //  申请弹层表格
          areaSelectBox: this.apiPath.hrsc.areaSelectBox, // 执行地区下拉框
          uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 上传文件
          selectBox: this.apiPath.hrsc.selectBox, // g 付费供应商下拉框
          findCertNoAndAreaId: this.apiPath.hrsc.findCertNoAndAreaId, // 付费供应商下拉框
          findCustSelectBoxByCertNoAndAreaId: this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId, // 客户下拉框下拉框
          findCustSelectBoxByCertNoAndAreaId2: this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId, // 客户下拉框下拉框
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
            busiRespId: null,
            busiRespName: '',
            depId: null,
            depName: ''
          },
          findCustSelectInfo: '',
          getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
          empassform: { // 劳动能力鉴定title列表--->四个小模块
            unCommitCount: null, // ---待提交人数
            eavFailCount: null,   // ----审核不通过人数
            noticeEmpApprCount: null,   // ----待通知雇员鉴定人数
            giveOutCount: null    // ---待发放鉴定书人数
          },
          cusForm: { // 劳动能力鉴定查询
            conName: '',
            custChName: '',
            conState: '',
            conStateName: '',
            conBusiState: [],
            conBusiStateName: [],
            chName: '',
            busiRespName: '',
            busiRespId: '',
            socialsecu: ''
          },
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
            certNo: '', // 证件号码
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
            areaName: [
              {required: true, message: '请选择社保执行地', trigger: 'change'}
            ],
            receMatDate: [
              {required: true, message: '请选择材料收取日期', trigger: 'change', type: 'date'}
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
              {required: true, message: '请输入递交材料人电话', trigger: 'change'},
              {validator: this.validator.checkTelAndphone, trigger: 'change'}
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
          twoMatNeed: [], // 保存材料
          currentdate: '', // 当前日期
          // 操作项
          operating: [
            {status: 1, op1: '详情', op2: '修改', op3: '放弃鉴定', op4: ''},
            {status: 2, op1: '详情', op2: '', op3: '', op4: ''},
            {status: 3, op1: '详情', op2: '', op3: '', op4: ''},
            {status: 4, op1: '详情', op2: '修改', op3: '放弃鉴定', op4: ''},
            {status: 5, op1: '详情', op2: '', op3: '', op4: ''},
            {status: 6, op1: '详情', op2: '', op3: '放弃鉴定', op4: ''},
            {status: 7, op1: '详情', op2: '', op3: '放弃鉴定', op4: ''},
            {status: 8, op1: '详情', op2: '', op3: '放弃鉴定', op4: ''},
            {status: 9, op1: '详情', op2: '', op3: '', op4: '发放鉴定书'},
            {status: 10, op1: '详情', op2: '', op3: '', op4: ''}
          ],
          apprId: null   // 修改时删除材料文件用
        };
      },
      watch: {
        $route: {
          handler: function (val, oldVal) {
            if (val.path === "/apprLaboCapa") {
              this.routerView = false;
            }
          },
          deep: true
        }
      },
      created () {
        this.numbStates();
        this.ruoteJudge();
        this.getNowFormatDate();
        this.roleType = Number(this.roleType);
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
          api.postsign(this.apiPath.sins.findSinsInjApprCount, 0).then(res => {
            if (res.code === 'CPYY-00001') {
              for (let item in this.empassform) {
                this.empassform[item] = res.data[item];
              }
            }
          }).catch(err => {
            console.log(err);
          });
        },
        getNowFormatDate () {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          this.currentdate = year + seperator1 + month + seperator1 + strDate;
        },
        ruoteJudge () {
          if (this.$route.path !== "/apprLaboCapa") {
            this.routerView = true;
          }
        },
        cerFinish (item) {
          if (item.length === 1) {
            this.appliForm.paySuppName = item[0].title;
            this.appliForm.paySuppId = item[0].id;
          }
        },
        custFinish (item) {
          // if (item.length === 1) {
          //   this.appliForm.custName = item[0].title;
          //   this.appliForm.custId = item[0].id;
          // }
        },
        busiDepChange () {
          this.creIdNameData.orgId = this.accuauditForm.depId;
        },
        // 修改
        modifyFun (scope) {
//          if (this.appliFormRules.empName || this.appliFormRules.certNo) {}
          this.identificFlag = true;
          this.conTitle = true;
          this.changeFalg = false;
          this.apprId = scope.apprId;
          //   详情的接口
          api.postsign(this.apiPath.sins.findSinsInjApprByApprId, scope.apprId).then(res => {
            if (res.code === 'CPYY-00001') {
              this.appliForm = res.data.injAppr;
              this.appliForm.receMatDate = new Date(this.appliForm.receMatDate);
              let obj = {};
              let _this = this;
              setTimeout(function () {
                _this.materData = [];
                if (res.data.injApprMats.length !== 0) {
                  for (let item of res.data.injApprMats) {
                    for (let item1 of _this.twoMatNeed) {
                      if (item.matConfId === item1.matConfId) {
                        obj.confMatName = item1.confMatName;
                        obj.matName = item.matName;
                        obj.matEncId = item.matEncId;
                        _this.materData.push(obj);
                      };
                      obj = {};
                    }
                  };
                  return;
                };
                _this.materData = _this.twoMatNeed;
              }, 200);
            }
          }).catch(err => {
            console.log(err);
          });
        },
        // 发放鉴定书弹层----> 确定
        issAppSuFun () {
          this.$refs.issAppForm.validate((valid) => {
            if (valid) {
              api.post(this.apiPath.sins.updateIssueApprByApprId, this.issAppForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.$message({message: '已发放鉴定书！', type: 'success'});
                  this.toissueident = false;
                  this.searchFun();
                  this.numbStates();
                }
              }).catch(err => {
                console.log(err);
              });
            };
          });
        },
        // 发放鉴定书
        issAppFun (scope) {
          this.toissueident = true;
          this.issAppForm.empName = scope.empName;
          this.issAppForm.certNo = scope.certNo;
          this.issAppForm.apprId = scope.apprId;
        },
        // 放弃鉴定弹层-----> 确定
        abaideSuFun () {
          this.$refs.abaideForm.validate((valid) => {
            if (valid) {
              api.post(this.apiPath.sins.updateGiveUpApprByApprId, this.abaideForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.giveupappr = false;
                  this.$message({message: '已放弃鉴定！', type: 'success'});
                  this.searchFun();
                  this.numbStates();
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        },
        selectCallBack (selectTion, row) {
          checkedArr = selectTion;
        },
        //  鉴定申请弹层--->确定
        ldeAppFun () {
          this.$refs.appliForm.validate((valid) => {
            if (valid) {
              this.appliForm.receMatDate = new Date(this.appliForm.receMatDate);
              this.appliForm.receMatDate = Vue.filter('date')(this.appliForm.receMatDate, 'yyyy-MM-dd');
              // 申请
              if (!this.conTitle) {
                api.post(this.apiPath.sins.saveInjAppr, {injAppr: this.appliForm, injApprMats: checkedArr}).then(res => {
                  if (res.code === 'CPYY-00001') {
                    this.$message({message: '申请成功！', type: 'success'});
                    this.identificFlag = false;
                    this.searchFun();
                    this.numbStates();
                  }
                }).catch(err => {
                  console.log(err);
                });
                return;
              }
              // 修改
              this.appliForm.apprId = this.apprId;
              api.post(this.apiPath.sins.updateSinsInjApprByApprId, {injAppr: this.appliForm, injApprMats: checkedArr}).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.$message({message: '修改成功！', type: 'success'});
                  this.identificFlag = false;
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        },
        // 删除已经上传的文件
        deleFileFun (index, scope) {
          api.post(this.apiPath.sins.deleteInjApprMat, {matEncId: scope.matEncId, injApprId: this.apprId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.materData[index].matName = '';
            }
          }).catch(err => {
            console.log(err);
          });
        },
        // 上传成功
        getFileName (file) {
          this.materData[this.index].matName = file.name;
          if (file.response) {
            this.materData[this.index].matEncId = file.response.data;
          }
        },
        fileSuccess (res) {},
        fileError () {},
        currentUploadFun (row, index) {
          this.index = index;
        },
        //   地区带出材料和供应商
        maretFun (id) {
          if (this.changeFalg) {
            this.paidProData.areaId = this.appliForm.areaId;
            this.paidProData.certNo = this.appliForm.certNo;
            api.post(this.areaSelectBox, {title: ''}).then(res => {
              if (res.code === 'CPYY-00001') {}
            }).catch(err => {
              console.log(err);
            });
          }
          if (id) {
            api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, {confUse: 6, dimen: 1, dimenValue: id}).then(res => {
              if (res.code === 'CPYY-00001') {
                if (this.changeFalg) {
                  this.materData = res.data.matConfs;
                } else {
                  this.twoMatNeed = res.data.matConfs;
                }
              }
            }).catch(err => {
              console.log(err);
            });
            api.post(this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId, {certNo: this.appliForm.certNo, areaId: id}).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data.list.length === 1) {
                  this.appliForm.custName = res.data.list[0].title;
                  this.appliForm.custId = res.data.list[0].id;
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        },
        //  证件号码带出地区
        areaFun (certNo) {
          api.post(this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo, {certNo: certNo}).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.list.length === 1) {
                this.appliForm.areaId = res.data.list[0].id;
                this.appliForm.areaName =  res.data.list[0].title;
                this.appliForm.empName = res.data.list[0].empName;
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
          this.appliForm.receMatDate = this.currentdate;
          this.appliForm.receMatDate = new Date(this.appliForm.receMatDate);
          this.identificFlag = true; // 申请弹层 显示
          this.conTitle = false;     // 申请弹层 title
          this.changeFalg = true;
          this.materData = [];
        },
        // 提交
        subFun () {
          if (checkedBrr.length !== 0) {
            let itemFalg = true;
            for (let item of checkedBrr) {
              if (item.apprHandleState !== 1 && item.apprHandleState !== 4) {
                itemFalg = false;
              }
            }
            if (itemFalg) {
              api.post(this.apiPath.sins.updateApprHandleStateIsCommit, {apprIds: apprIds}).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.$message({message: '提交成功！', type: 'success'});
                  this.searchFun();
                  this.numbStates();
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              this.$alert('待提交或审核不通过状态才可以提交！', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {}
              });
            }
            return;
          }
          this.$alert('请选择至少一条操作项！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
        },
        // 通知雇员鉴定
        infoFun () {
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
            if (item.apprHandleState !== 7) {
              itemFalg = false;
            }
          }
          if (itemFalg) {
            api.post(this.apiPath.sins.updateNoticeEmpApprByApprIdList, {apprIds: apprIds}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({message: '已通知雇员！', type: 'success'});
                this.searchFun();
                this.numbStates();
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            this.$alert('待通知雇员鉴定状态才可以操作！', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {}
            });
          }
        },
        //  详情
        partFun (scope) {
          this.routerView = true;
          this.$router.push({path: '/apprLaboCapa/viewApprApplyInfo', query: {apprId: scope.apprId}});
        },
        // 放弃鉴定
        abaideFun (scope) {
          this.giveupappr = true;
          for (let key in this.abaideForm) {
            this.abaideForm[key] = scope[key];
          }
        },
        selectTabelRow (selection, row) {
          checkedBrr = selection;
          for (let item of checkedBrr) {
            if (apprIds.indexOf(item.apprId) === -1) {
              apprIds.push(item.apprId);
            }
          }
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
