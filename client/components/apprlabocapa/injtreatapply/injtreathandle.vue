<template>
  <div>
    <!--工伤待遇申请-->
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="待遇办理查询"></sino-title>
      <sino-form :model="inductrialForm" ref="inductrialForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text" v-model="inductrialForm.empName" :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text" v-model="inductrialForm.certNo" :disabled="false" ></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="办理进度：" class="search-inner-item" prop="handleStateName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="true"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="getDictSelectBox"
                             :data="{code: 'INJ_TREAT_HANDLE_SCHEDULE'}"
                             :chooseName.sync="inductrialForm.handleScheduleListName"
                             :chooseId.sync="inductrialForm.handleScheduleList"
                             :clear="true" >
                </sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保执行地：" class="search-inner-item" prop="sinsExecuAreaName">
                <sino-select class="fl"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaSelectBox"
                             :chooseName.sync="inductrialForm.sinsExecuAreaName"
                             :chooseId.sync="inductrialForm.sinsExecuArea"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true" >
                </sino-select>
              </sino-form-item>
            </li>
            <sino-collapse-transition>
              <div class="sino-translate" v-show="!searchFlag">
                <li class="li-wid">
                  <sino-form-item label="付费供应商：" class="search-inner-item" prop="payChName" >
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="selectBox"
                                 :token="token"
                                 :data="{code: 'SUPP_TYPE'}"
                                 :chooseName.sync="inductrialForm.payChName"
                                 :chooseId.sync="inductrialForm.paySuppId"
                                 :clear="true" >
                    </sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="客户名称：" class="search-inner-item" prop="custName" @click="resetFun">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findCustInfoSelectBoxAll"
                                 :data="custInfoData"
                                 :chooseName.sync="inductrialForm.custName"
                                 :chooseId.sync="inductrialForm.custId"
                                 :clear="true"
                    >
                    </sino-select>
                  </sino-form-item>
                </li>
                <li class="li-wid">
                  <sino-form-item label="待遇类型：" class="search-inner-item" prop="injTreatTypeNameList" >
                    <sino-select
                      :filterable="true"
                      :multiselect="false"
                      :isshowTotol="false"
                      :disabled="false"
                      :totalNum="false"
                      :isPage="true"
                      :isGroup="false"
                      :url="getDictSelectBox"
                      :data="{code:'TREAT_TYPE'}"
                      :chooseName.sync="inductrialForm.injTreatType"
                      :chooseId.sync="inductrialForm.injTreatTypeCode" :clear="true"></sino-select>
                  </sino-form-item>
                </li>
                <li class="treatment">
                  <span class="two-dater-span">待遇申请日期：</span>
                  <div class="two-dater">
                    <sino-form-item class="search-inner-item" prop="applyDateBeg">
                      <sino-date-picker class="fl"
                                        v-model="inductrialForm.applyDateBeg"
                                        type="date"
                                        :editable="false"
                                        :readonly="false"
                                        :clearable="true">
                      </sino-date-picker>
                    </sino-form-item>
                    <span class="fl">至</span>
                    <sino-form-item class="search-inner-item" prop="applyDateEnd">
                      <sino-date-picker class="fl"
                                        v-model="inductrialForm.applyDateEnd"
                                        type="date"
                                        :editable="false"
                                        :readonly="false"
                                        :clearable="true">
                      </sino-date-picker>
                    </sino-form-item>
                  </div>
                </li>
                <li>
                  <sino-form-item label="业务部门：" class="search-inner-item" prop="depName" @click="resetFun">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :url="findOrgSelectBoxInfo"
                                 :chooseName.sync="inductrialForm.depName"
                                 :chooseId.sync="inductrialForm.depId"
                                 :clear="true"
                                 @change="busiDepChange"
                    >
                    </sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="业务员：" class="search-inner-item" prop="busiRespName" >
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :token="token"
                                 :linkage="true"
                                 :url="findUserByOrgIdAndRoleType"
                                 :data="creIdNameData"
                                 :chooseName.sync="inductrialForm.busiRespName"
                                 :chooseId.sync="inductrialForm.busiRespId"
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
            <sino-button class="ressetButton" @click="resetFun(this.inductrialForm)" v-if="!searchFlag">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
        <div class="search-more">
          <div @click="searchFlag = !searchFlag">
            <i class="iconfont" :class="{'sino-shuangjiantou-copy':searchFlag,'sino-angle-double-up':!searchFlag}"></i>
            <span v-if="searchFlag">高级查询</span>
            <span v-if="!searchFlag">基本查询</span>
          </div>
        </div>
      </sino-form>
    </sino-con>
    <div class="sino-table-total sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left"  >
          <sino-button type="icon-text" @click="send" class="sion-btn"><i class="iconfont sino-qianbi"></i><span class="ideno-hover">送社保</span>
          </sino-button>
          <sino-button type="icon-text" @click="pass" size="small" class="sion-btn"><i class="iconfont sino-duihao fs19 "></i><span class="ideno-hover ">审核通过</span>
          </sino-button>
        </div>
      </div>

      <!--信息列表-->
      <sino-table :data="tableData" stripe border @select="selectCallBackEmp" @select-all="selectTabelRowAll" max-height="416" class="Inductria-list">
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号" width="60" align="center" prop="injTreatId"></sino-table-column>
        <sino-table-column prop="empName" label="雇员姓名"></sino-table-column>
        <sino-table-column prop="certNo" label="证件号码" min-width = '180' ></sino-table-column>
        <sino-table-column prop="handleScheduleName" label="办理进度" min-width = '100'></sino-table-column>
        <sino-table-column prop="sinsExecuAreaName" label="社保执行地"min-width = '100'></sino-table-column>
        <sino-table-column prop="injTreatTypeName" label="待遇类型" min-width="200"></sino-table-column>
        <sino-table-column prop="applyDate" label="申请日期"  min-width="200"></sino-table-column>
        <sino-table-column prop="backNum" label="返款次数" min-width="200"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称"  min-width="200"></sino-table-column>
        <sino-table-column prop="payChName" label="付费供应商" min-width="250"></sino-table-column>
        <sino-table-column prop="depName" label="负责业务部门" min-width="200" ></sino-table-column>
        <sino-table-column prop="busiRespName" label="业务员" ></sino-table-column>
        <sino-table-column prop="creName" label="经办人" ></sino-table-column>
        <sino-table-column label="操作" align="center" fixed="right" bottom="79 !important" min-width="200">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="toview(scope.row)">查看</span><i v-if="scope.row.handleSchedule === 3" class="table-i">|</i>
              <span class="table-span" v-if="scope.row.handleSchedule === 3" @click="noPass(scope.row)">审核不通过</span><i class="table-i"></i>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="page.total"></sino-page>

    </div>
    <!--no pass （审核不通过以及送社保）-->
    <sino-dialog :visible.sync="noPassDialog" size="small" class="leads-follow dialog-item" @close="cleanContent('noPassForm')">
      <sino-title slot="title" type="levelOne" :title="stackTitle" class="sino-dialog-title"></sino-title>
      <sino-form  class="demo-ruleForm" :model="noPassForm" ref="noPassForm" :rules="noPassRule">
        <sino-form-item :label="stackLable"  class="search-inner-item" prop="eavDate">
          <sino-date-picker type="date"
                            v-model="noPassForm.eavDate"
                            :editable="false"
                            :readonly="false"
                            :clearable="true">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="不通过原因：" v-if="stackTitle==='审核不通过'" class="search-inner-item " prop="eavFailReason">
          <sino-input type="textarea" v-model="noPassForm.eavFailReason"></sino-input>
        </sino-form-item>
        <sino-form-item label="办理人：" v-if="stackTitle==='送社保'" class="search-inner-item " prop="sendSsbhandlePer">
          <sino-input v-model="noPassForm.sendSsbhandlePer"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sendFun" >提 交</sino-button>
      </span>
    </sino-dialog>
    <!--查看工伤待遇弹层-->
    <sino-dialog :visible.sync="checktheFlag" top="5%" size="samll" @close="matResFieFun('emplInfor')"  class="apply-dialog-layer usermanage dialog-com-tree-look-box toview-box">
      <sino-title slot="title" type="levelOne" :title="searchtitle" class="sino-dialog-title"></sino-title>
      <div class="crumbs toview-bor">
        <!--通过                           审核                          未执行-->
        <ul>
          <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1, 'li-notthr': activeNode  < 1}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 1}">{{activeNode > 1? '':1}}</i>提交申请</span></li>
          <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2, 'li-notthr': activeNode  < 2}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 2}">{{activeNode > 2? '':2}}</i>送社保</span></li>
          <li :class="{'li-finish': activeNode > 4, 'li-active': activeNode === 4, 'li-notthr': activeNode  < 4}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 4}">{{activeNode > 4? '':3}}</i>审核通过</span></li>
          <li :class="{'li-finish': activeNode > 6, 'li-active': activeNode === 6, 'li-notthr': activeNode  < 6}"><span ><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 6}">{{activeNode > 6? '':4}}</i>领取拨付单</span></li>
        </ul>
      </div>
      <div class="usermanagement-modify1 clearfix  layerthic industrial-box">
        <div class="elastic-layer">
          <!--雇员信息-->
          <div class="emp-info-page mt15  title-tite">
            <div class="local-info">
              <div class="emp-link-card em-l">
                <div class="emp-link-card-title title-border-none title-bd-n">
                  <div class="title-right fl">
                    <span class="color-world fl"><i class="title-line"></i>雇员信息</span>
                  </div>
                  <div class="fr bor-left zan" @click="openemplo = !openemplo">
                    <span class="color-line">|</span>
                    <i class="iconfont " :class="{'sino-shuangjiantou-copy':!openemplo,'sino-angle-double-up':openemplo}" ></i>
                    <sino-button class="fr" type="icon-text" v-if="!openemplo">展开</sino-button>
                    <sino-button class="fr" type="icon-text" v-if="openemplo">收起</sino-button>
                  </div>
                </div>
                <sino-collapse-transition>
                  <div class="userm" v-show="openemplo">
                    <ul class="userm-ul">
                      <li class="customer-li">
                        <h6>雇员姓名</h6><span v-text="emplInfor.empName"></span>
                      </li>
                      <li class="customer-li">
                        <h6>证件号码</h6><span v-text="emplInfor.certNo"></span>
                      </li>
                      <li class="customer-sp">
                        <h6>社保执行地</h6><span v-text="emplInfor.sinsExecuAreaName"></span>
                      </li>
                      <li class="customer-sp">
                        <h6>付费供应商</h6><span v-text="emplInfor.payChName"></span>
                      </li>
                      <li class="customer-sp">
                        <h6>客户名称</h6><span v-text="emplInfor.custName"></span>
                      </li>
                    </ul>
                  </div>
                </sino-collapse-transition>
              </div>
            </div>
          </div>
          <!--工伤待遇申请信息-->
          <div class="emp-info-page mt15  title-tite occupational">
            <div class="local-info wide">
              <div class="emp-link-card em-l emp-inductrial">
                <div class="emp-link-card-title title-border-none title-bd-n">
                  <div class="title-right fl">
                    <span class="color-world fl"><i class="title-line"></i>{{searchtitleFlag?'工伤待遇':'工伤医疗费用'}}申请信息</span>
                  </div>
                  <div class="fr bor-left zan" @click="inductrial = !inductrial">
                    <span class="color-line">|</span>
                    <i class="iconfont " :class="{'sino-shuangjiantou-copy':!inductrial,'sino-angle-double-up':inductrial}" ></i>
                    <sino-button class="fr" type="icon-text" v-if="!inductrial">展开</sino-button>
                    <sino-button class="fr" type="icon-text" v-if="inductrial">收起</sino-button>
                  </div>
                </div>
                <sino-collapse-transition>
                  <div class="userm" v-show="inductrial">
                    <ul class="userm-ul">
                      <li class="customer-li" v-if="searchtitleFlag">
                        <h6>工伤结果</h6><span v-text="emplInfor.injIdenResultName"></span>
                      </li>
                      <li class="customer-li" v-if="searchtitleFlag">
                        <h6>认定日期</h6><span v-text="emplInfor.idenDate"></span>
                      </li>
                      <li class="customer-li" v-if="searchtitleFlag">
                        <h6>劳动能力鉴定结果</h6><span v-text="emplInfor.apprResultName"></span>
                      </li>
                      <li class="customer-li" v-if="searchtitleFlag">
                        <h6>鉴定日期</h6><span v-text="emplInfor.apprDate"></span>
                      </li>
                      <li class="customer-li">
                        <h6>材料递交人</h6><span v-text="emplInfor.applyPer"></span>
                      </li>
                      <li class="customer-li">
                        <h6>递交人电话</h6><span v-text="emplInfor.applyPerTel"></span>
                      </li>
                      <li class="customer-sp">
                        <h6>待遇类型</h6><span v-text="emplInfor.injTreatType"></span>
                      </li>
                      <li class="customer-sp">
                        <h6>待遇申请日期</h6><span v-text="emplInfor.applyDate"></span>
                      </li>
                      <li class="customer-sp customer-filed heightAuto">
                        <h6 class="elseH6"><em class="fontHeightAuto">上传文件</em></h6>
                        <span class="auto-height-span uploadFile" v-for="(item, index) in  emplInfor.injTreatMatList">
                          <i :key="index" class="iStyle fl">{{item.matName}}</i>
                          <i class="fr iStyle istrue" v-if="item.matName">
                            <a href="javascript:;" >浏览</a>|<a href="javascript:;"  @click="batchAllDownload(item.matEncId)">下载</a>
                          </i>
                        </span>
                        <!--<h6>上传文件</h6>
                        <span v-text="emplInfor.matName" class="cus-sp"></span>
                        <span v-text="emplInfor.shang"></span>-->
                      </li>
                      <li class="customer-sp">
                        <h6>备注</h6><span v-text="emplInfor.remark"></span>
                      </li>
                    </ul>
                  </div>
                </sino-collapse-transition>
              </div>
            </div>
          </div>
          <!--工伤待遇返款信息  -->
          <div class="emp-info-page mt15  title-tite occupational">
            <div class="local-info">
              <div class="emp-link-card em-l emp-inductrial">
                <div class="emp-link-card-title title-border-none title-bd-n">
                  <div class="title-right fl">
                    <span class="color-world fl"><i class="title-line"></i>{{searchtitleFlag?'工伤待遇':'工伤医疗费用'}}返款信息</span>
                  </div>
                  <div class="fr bor-left zan" @click="backl = !backl">
                    <span class="color-line">|</span>
                    <i class="iconfont " :class="{'sino-shuangjiantou-copy':!backl,'sino-angle-double-up':backl}" ></i>
                    <sino-button class="fr" type="icon-text" v-if="!backl">展开</sino-button>
                    <sino-button class="fr" type="icon-text" v-if="backl">收起</sino-button>
                  </div>
                </div>
                <sino-collapse-transition>
                  <div class="backl-box" v-show="backl">
                    <ul v-for="(item, index) in emplInfor.injTreatBackInfoList" :key="index" :class="{'backl-uls': index }">
                      <li class="clearli">
                        <h6>待遇类型</h6><span v-text="item.injTreatTypeName"></span>
                      </li>
                      <li class="clearli">
                        <h6>待遇金额</h6><span v-text="item.injTreatAmo" class="sp-ri"></span>
                      </li>
                      <li class="clearli">
                        <h6>费用所属期</h6><span>{{sub(item.costAccpNo)}}</span>
                      </li>
                      <li class="clearli">
                        <h6>支付状态</h6><span v-text="item.payStateName" class="sp-ri"></span>
                      </li>
                    </ul>
                  </div>
                </sino-collapse-transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer industrial-footer">
        <sino-button type="primary" @click="checkAndFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  let checked = [];
  export default {
    data: function () {
      let that = this;
      return {
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        selectBox: this.apiPath.hrsc.selectBox, // g
        areaSelectBox: this.apiPath.hrsc.areaSelectBox,
        findCustInfoSelectBoxAll: this.apiPath.hrsc.findCustInfoSelectBoxAll,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        scroll: '',
        blean: true,
        activeRow: '',
        stackLable: '',
        noPassDialog: false,
        typeMan: Cookie.get('roleType'), // yw 5 ceshi 12
        stackTitle: '',
        noPassForm: {
          injTreatId: '', // 工伤待遇主键ID
          handleSchedule: '', // 办理进度
          eavFailReason: '', // 不通过原因
          sendSsbhandlePer: Cookie.get('CPYY-INFO-NAME'), // 办理人
          eavDate: '' // 审核日期
        },
        matForm: {
          empName: '', // 雇员姓名
          certType: '', // 证件号码
          sinsExecuAreaName: '',
          sinsExecuArea: '',
          payChName: '',
          paySuppId: '',
          custName: '',
          custId: '',
          injDenResultName: '',
          injDenResult: '',
          injDenDate: '',
          injApprResultName: '',
          injApprResult: '',
          injApprDate: '',
          injApprId: '',
          injDenId: '',
          injTreatTypeNameList: [],
          injTreatTypeList: [],
          applyDate: '',
          applyPer: Cookie.get('CPYY-INFO-NAME'),
          applyPerId: '',
          applyPerTel: '',
          uniqNo: '', // 唯一号
          busiRespName: '',
          busiRespId: '',
          depId: '',
          depName: '',
          orderId: '',
          injTreatMatList: '' // 材料的结合
        },
        creIdNameData: {
          orgId: undefined,
          roleTypes: [5]
        },
        custInfoData: {
          data: {
            id: '',
            title: null
          }
        },
        creStartDate: '', // 待遇申请
        industrialRules: {},
        openemplo: false, // 雇员信息
        inductrial: false, // 工伤待遇申请信息显示
        inductrialForm: {
          empName: '', // 雇员姓名
          certNo: '', // 证件号码
          injTreatType: '',
          injTreatTypeCode: '',
          handleScheduleListName: [], // 办理进度
          handleScheduleList: [],
          sinsExecuAreaName: '', // 社保执行地
          sinsExecuArea: '',
          payChName: '', // 付费供应商
          paySuppId: '',
          custName: '', // 客户名称
          custId: '',
          injTreatTypeNameList: [],
          injTreatTypeList: [],
          applyDateBeg: '', // 待遇申请日期
          applyDateEnd: '',
          depId: '', // 业务部门
          busiRespName: '',
          busiRespId: '',
          depName: ''
        }, // 工伤待遇查询
        searchFlag: true, // 工伤待遇查询 收起和弹开
        identificFlag: false, // 工伤待遇申请和修改的弹窗显示
        conTitle: false, // 工伤待遇申请title
        checktheFlag: false, // 查看弹层 显示
        searchtitleFlag: true,
        backl: false, // 工伤待遇返款信息 ====》 收起 下拉
        // 上传文件
        materData: [],
        findCustSelectInfo: {}, // 查询折叠起的url
        entOrderForm: {}, // 待遇申请日期
        seeDto: {}, // 雇员信息  内容
        resFun: {}, // 工伤待遇查询 ===
        activeNode: 3, // 大箭头
        searchtitle: '查看工伤待遇',
        token: Cookie.get("Token"),
        cusForm: {
          conName: '',
          papersName: '',
          transactionName: '',
          socialsecu: '',
          payName: '',
          clienteleName: '',
          signObjName: '',
          creEndDate: '',
          ignObjName: '',
          gnObjName: ''
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
        tableData: [],
        // 信息列表
        selectTabelRow () {},
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 107 // 分页总条数
        },
        // 雇员信息
        emplInfor: {
          apprDate: '', // 鉴定日期
          idenDate: '', // 认定日期
          apprResultName: '', // 劳动能力鉴定结果
          empName: '',
          certNo: ' ',
          sinsExecuAreaName: '',
          payChName: '',
          custName: '',
          injIdenResultName: '',
          injDenDate: '',
          injApprResultName: '',
          injApprDate: '',
          applyPer: '',
          applyPerTel: '',
          injTreatType: '',
          applyDate: '',
          matName: '',
          remark: '',
          injTreatBackInfoList: null,
          injTreatMatList: null
        },
        // 工伤待遇信息

        // 工伤待遇返款信息
        refunds: {
          salName: '',
          cuName: '',
          saleeName: '',
          sueName: ''
        },
        noPassRule: {
          eavDate: [
            {required: true, message: '请选择日期', trigger: 'change', type: 'date'}
          ],
          sendSsbhandlePer: [
            {required: true, message: '请输入办理人', trigger: 'change'}
          ],
          eavFailReason: [
            {required: true, message: '请输入不通过原因', trigger: 'change'}
          ]
        },
        diffrentFlag: ''
      };
    },
    created () {
      if (this.typeMan === '26') {
        this.inductrialForm.handleScheduleListName = ['待送社保', '待社保审核'];
        this.inductrialForm.handleScheduleList = [2, 3];
      } else if (this.typeMan === '5') {
        this.inductrialForm.handleScheduleListName = ['待提交', '审核不通过'];
        this.inductrialForm.handleScheduleList = [1, 5];
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
      //  改变当前页
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.getTableList(page, this.page.pageSize);
      },
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.getTableList(1, pageSize);
      },
      matConForm () {},
      // 修改(申请) 保存
      newMatConFun (item) {
        if (this.conTitle === '工伤待遇修改') {
          api.post(this.apiPath.sins.updateInjTreatInfoSave, this.matForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.identificFlag = false;
              this.$message({message: '保存成功！', type: 'success'});
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (!this.conTitle) {
          this.matForm.injTreatMatList = this.materData;
          api.post(this.apiPath.sins.saveInjTreatInfoSave, this.matForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.identificFlag = false;
              this.$message({message: '保存成功！', type: 'success'});
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      eavFun () { // 工伤鉴定申请 弹窗此显示
        this.conTitle = false;
        this.blean = false;
        this.identificFlag = true;
      },
      sub (aa) {
        aa = aa.toString();
        return aa.substring(0, 4) + '-' + aa.substring(4, 6);
      },
      // 审核不通过
      noPass: function (data) {
        this.stackTitle = '审核不通过';
        this.stackLable = '审核日期：';
        this.noPassDialog = true;
        this.diffrentFlag = data.reimFeeType;
        this.noPassForm.injTreatId = data.injTreatId;
        this.noPassForm.handleSchedule = data.handleSchedule;
      },
      sendFun () {
        let subType;
        if (this.diffrentFlag) {
          subType = this.diffrentFlag;
        } else {
          subType = checked[0].reimFeeType;
        }
        if (subType ==  1) {
          let obj = {
            injTreatId: this.noPassForm.injTreatId,
            handleSchedule: this.noPassForm.handleSchedule,
            eavDate: this.noPassForm.eavDate,
            eavFailReason: this.noPassForm.eavFailReason
          };
          /* 点击送社保的提交 */
          let arr = [];
          if (checked.length !== 0) {
            var that = this;
            checked.forEach(function (item, index) {
              var InjTreat = {
                injTreatId: item.injTreatId,
                handleSchedule: item.handleSchedule,
                declDate: that.noPassForm.eavDate,
                eavDate: that.noPassForm.eavDate,
                sendSsbhandlePer: that.noPassForm.sendSsbhandlePer
              };
              arr.push(InjTreat);
            });
          }
          let obj2 = {
            injTreatList: arr
          };
          if (this.stackTitle === '送社保') {
            api.post(this.apiPath.sins.updateBatchScheduleSendSins, obj2).then(res => {
              if (res.code === 'CPYY-00001') {
                checked.length = 0;
                this.searchFun();
                this.noPassDialog = false;
                this.$message({message: '送社保成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (this.stackTitle === '审核通过') {
            api.post(this.apiPath.sins.updateScheduleEavYes, obj2).then(res => {
              if (res.code === 'CPYY-00001') {
                checked.length = 0;
                this.searchFun();
                this.noPassDialog = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (this.stackTitle === '审核不通过') {
            api.post(this.apiPath.sins.updateScheduleEavNo, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.noPassDialog = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else if (subType == 2) {
          this.noPassForm.eavDate = Vue.filter('date')(this.noPassForm.eavDate, 'yyyy-MM-dd');
          let obj = {
            mediMateReimId: this.noPassForm.injTreatId,
            handleSchedule: this.noPassForm.handleSchedule,
            eavDate: this.noPassForm.eavDate,
            eavReturnReason: this.noPassForm.eavFailReason
          };
          /* 点击送社保的提交 */
          let arr = [];
          if (checked.length !== 0) {
            var _this = this;
            checked.forEach(function (item, index) {
              var InjTreat = {
                mediMateReimId: item.injTreatId,
                handleSchedule: item.handleSchedule,
                sendSsbDate: _this.noPassForm.eavDate,
                eavDate: _this.noPassForm.eavDate,
                sendSsbOperator: _this.noPassForm.sendSsbhandlePer
              };
              arr.push(InjTreat);
            });
          }
          let obj2 = {
            injReimList: arr
          };
          if (this.stackTitle === '送社保') {
            api.post(this.apiPath.sins.updateBatchScheduleToSendSsb, obj2).then(res => {
              if (res.code === 'CPYY-00001') {
                checked.length = 0;
                this.searchFun();
                this.noPassDialog = false;
                this.$message({message: '送社保成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (this.stackTitle === '审核通过') {
            api.post(this.apiPath.sins.updateBatchScheduleToSuccess, obj2).then(res => {
              if (res.code === 'CPYY-00001') {
                checked.length = 0;
                this.searchFun();
                this.noPassDialog = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else if (this.stackTitle === '审核不通过') {
            api.post(this.apiPath.sins.updateBatchScheduleToEavFail, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.noPassDialog = false;
                this.$message({message: '操作成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        };
      },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          all.push(item);
        }
        this.selectCallBackEmp(all, row);
      },
      selectCallBackEmp (selectTion, row) {
        checked = selectTion;
      },
      // 送社保
      error () {
        this.$alert('请选择至少一项进行操作', '提示信息', {
          confirmButtonText: '确 定',
          type: 'info', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            return;
          }
        });
      },
      send () {
        let result = this.validaterule(2);
        if (!result) { return; };
        if (checked.length !== 0) {
          this.diffrentFlag = '';
          this.stackTitle = '送社保';
          this.stackLable = '送社保日期：';
          this.noPassDialog = true;
        }
      },
      resetFun (item) {
        for (var key in this.inductrialForm) {
          this.inductrialForm[key] = '';
        }
        this.inductrialForm.injTreatTypeNameList = [];
        this.inductrialForm.injTreatTypeList = [];
        this.inductrialForm.handleScheduleListName = [];
        this.inductrialForm.handleScheduleList = [];
      },
      // 提交
      subFun () {
        if (!checked || checked.length < 1) {
          this.$alert('请选择至少一条数据进行操作', '温馨提示', {
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
        let injTreatList = [];
        checked.forEach(function (item, index) {
          let obj = {
            injTreatId: item.injTreatId,
            handleSchedule: item.handleSchedule
          };
          injTreatList.push(obj);
        });
        let obj2 = {
          injTreatList: injTreatList
        };
        api.post(this.apiPath.sins.updateBatchInjTreatInfoSubmit, obj2).then(res => {
          if (res.code === 'CPYY-00001') {
            checked.splice(0, checked.length);
            this.$message({message: '提交成功！', type: 'success'});
          }
        });
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
      },
      toview (item) { // 查看
        if (item.reimFeeType == 1) { // 工伤
          api.post(this.apiPath.sins.findInjTreatById, {injTreatId: item.injTreatId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchtitleFlag = true;
              this.checktheFlag = true;
              this.activeNode = res.data.handleSchedule;
              this.emplInfor = res.data;
              if (res.data.handleSchedule < 6) {
                this.inductrial = true;
              } else {
                this.backl = true;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (item.reimFeeType == 2) {
          api.post(this.apiPath.sins.findInjReimInfoById, {mediMateReimId: item.injTreatId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchtitleFlag = false;
              this.checktheFlag = true;
              this.activeNode = res.data.handleSchedule;
              this.emplInfor = res.data;
              this.emplInfor.sinsExecuAreaName = res.data.areaName;
              this.emplInfor.applyPer = res.data.matSubmitPerName;
              this.emplInfor.applyPerTel = res.data.matSubmitPerTel;
              this.emplInfor.injTreatMatList = res.data.injReimMatList;
              if (res.data.handleSchedule < 6) {
                this.inductrial = true;
              } else {
                this.backl = true;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 审核大箭头
      stepFun () {},
      // 查看工伤待遇弹层  ====》 确定
      selectCallBack () {},
      deleFileFun () {},
      getFileName (file) {
        this.materData[this.activeRow].matName = file.name;
      },
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.materData[this.activeRow].matEncId = res.data;
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
          this.materData[this.activeRow].matName = '';
        }
        return;
      },
      fileError () {
        this.materData.matName = '';
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
      currentUploadFun (data, index) {
        this.activeRow = index;
      },
      busiDepChange () {
        this.creIdNameData.orgId = this.inductrialForm.depId;
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getTableList(this.page.pageNum, this.page.pageSize);
      },
      getTableList (pageNum, pageSize, all) {
        pageNum ?  '' : pageNum = this.page.pageNum;
        let obj = {
          data: this.inductrialForm,
          pageNum: pageNum,
          pageSize: this.page.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.sins.findAllInjTreatInfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.page.total = res.data.total;
            checked = [];
            this.inductrialForm.injTreatId = this.tableData.injTreatId;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getSinsArea () {
        /* 通过证件号码获得数据 */
        if (this.matForm.certNo) {
          let obj = {
            certNo: this.matForm.certNo
          };
          api.post(this.apiPath.sins.findEmpAndOrderInfoByNo, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.apprDate) {
                res.data.apprDate = new Date(res.data.apprDate);
              }
              if (res.data.idenDate) {
                res.data.idenDate = new Date(res.data.idenDate);
              }
              if (res.data.applyDate) {
                res.data.applyDate = new Date(res.data.applyDate);
              }
              this.matForm.empName = res.data.empName;
              this.matForm.uniqNo = res.data.uniqNo;
              this.matForm.sinsExecuAreaName = res.data.sinsExecuAreaName;
              this.matForm.sinsExecuArea = res.data.sinsExecuArea;
              this.matForm.payChName = res.data.payChName;
              this.matForm.paySuppId = res.data.paySuppId;
              this.matForm.custName = res.data.custName;
              this.matForm.custId = res.data.custId;
              this.matForm.injIdenResultName = res.data.injIdenResultName;
              this.matForm.injIdenResult = res.data.injIdenResult;
              this.matForm.idenDate = res.data.idenDate;
              this.matForm.apprResultName = res.data.apprResultName;
              this.matForm.apprResult = res.data.apprResult;
              this.matForm.apprDate = res.data.apprDate;
              this.matForm.busiRespName = res.data.busiRespName;
              this.matForm.busiRespId = res.data.busiRespId;
              this.matForm.depId = res.data.depId;
              this.matForm.depName = res.data.depName;
              this.matForm.orderId = res.data.orderId;
              this.matForm.injApprId = res.data.apprId;
              this.matForm.injDenId = res.data.injIdenId;
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
          }).catch(err => {
            console.log(err);
          });
        }
      },
      matResFieFun (from) {
        for (var key in this.emplInfor) {
          this.emplInfor[key] = '';
        }
      },
      clearFun (name) {
        this.refs[name].resetFields();
      },
      validaterule (state) {
        checked = checked.filter(item => {
          if (item.reimFeeType) {
            return item;
          }
        });
        if (!checked || checked.length < 1) {
          this.$alert('请选择至少一条数据进行操作', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return false;
        };
        let bool = checked.every(item => {
          return checked[0].reimFeeType == item.reimFeeType;
        });
        if (!bool) {
          this.$alert('请选择相同待遇类型', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return false;
        };
        let typeValidate = checked.every(item => {
          return item.handleSchedule == state;
        });
        if (!typeValidate) {
          this.$alert(state == 2 ? '请选择待送社保项' : '请选择待社保审核项', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return false;
        };
        return true;
      },
      pass: function () {
        let result = this.validaterule(3);
        if (!result) { return; };
        this.diffrentFlag = '';
        let subType = checked[0].reimFeeType;
        if (subType == 1) {
          let arr = [];
          // if (checked.length !== 0) {
          var that = this;
          checked.forEach(function (item, index) {
            var InjTreat = {
              injTreatId: item.injTreatId,
              handleSchedule: item.handleSchedule,
              declDate: that.noPassForm.eavDate,
              eavDate: that.noPassForm.eavDate,
              sendSsbhandlePer: that.noPassForm.sendSsbhandlePer
            };
            arr.push(InjTreat);
          });
          // }
          let obj2 = {
            injTreatList: arr
          };
          api.post(this.apiPath.sins.updateScheduleEavYes, obj2).then(res => {
            if (res.code === 'CPYY-00001') {
              this.stackTitle = '审核通过';
              this.stackLable = '审核日期：';
              this.noPassDialog = true;
            }
          }).catch(err => {
            console.log(err);
          });
        } else if (subType == 2) {
          if (checked[0].handleSchedule == 3) {
            this.stackTitle = '审核通过';
            this.stackLable = '审核日期：';
            this.noPassDialog = true;
          } else {
            this.$alert('只有待社保审核状态才能审核', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
              }
            });
          }
        }
      },
      // 根据社保执行地带材料
      tableListData () {
        /* 如果有地区的情况下发送请求获取材料数据 */
        if (this.matForm.sinsExecuArea) {
          let obj = {
            confUse: 5,
            dimen: 1,
            dimenValue: this.matForm.sinsExecuArea
          };
          api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.matConfs) {
                this.materData = res.data.matConfs;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 查看确认按钮
      checkAndFun () {
        this.checktheFlag = false;
      }

    }
  };
</script>
