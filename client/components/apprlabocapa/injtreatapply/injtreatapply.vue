<template>
  <div class="sinoConMore">
<!--工伤费用查询-->
  <sino-con class="sino-con-more ">
    <sino-title type="levelOne" title="工伤待遇查询"></sino-title>
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
              <li>
                <sino-form-item label="费用类型：" class="search-inner-item" prop="reimFeeTypeName" >
                  <sino-select
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code:'REIM_FEE_TYPE'}"
                               :chooseName.sync="inductrialForm.reimFeeTypeName"
                               :chooseId.sync="inductrialForm.reimFeeType" :clear="true"></sino-select>
                </sino-form-item>
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
            </div>
          </sino-collapse-transition>
        </ul>
      </div>
      <div class="search-button">
        <div class="search-button-box" :class="{'search-first-button-box': !searchFlag, '': searchFlag}">
          <sino-button type="primary" @click="searchFun">查 询</sino-button>
          <sino-button class="ressetButton" @click="resFn(inductrialForm)" v-if="!searchFlag">重 置</sino-button>
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
          <sino-button type="icon-text" @click="eavFun()" class="sion-btn"><i class="iconfont sino-xinjianzhangdan"></i><span class="ideno-hover">工伤待遇申请</span>
          </sino-button>
          <sino-button type="icon-text" @click="medicalFun()" class="sion-btn"><i class="iconfont sino-xinjianzhangdan"></i><span class="ideno-hover">工伤医疗费用申请</span>
          </sino-button>
          <sino-button type="icon-text" @click="subFun()" size="small" class="sion-btn"><i class="iconfont sino-fabu fs19 "></i><span class="ideno-hover ">提交</span>
          </sino-button>
        </div>
      </div>

  <!--信息列表-->
  <sino-table :data="tableData" stripe border @select="selectCallBackEmp"  @select-all="selectTabelRowAll" max-height="416" class="Inductria-list">
    <sino-table-column type="selection"></sino-table-column>
    <sino-table-column type="index" label="序号" width="60" align="center" prop="injTreatId"></sino-table-column>
    <sino-table-column prop="empName" label="雇员姓名" ></sino-table-column>
    <sino-table-column prop="certNo" label="证件号码" min-width = '180'></sino-table-column>
    <sino-table-column prop="handleScheduleName" label="办理进度"  min-width = '100'></sino-table-column>
    <sino-table-column prop="sinsExecuAreaName" label="社保执行地"  min-width = '100'></sino-table-column>
    <sino-table-column prop="reimFeeTypeName" label="费用类型" min-width="200" ></sino-table-column>
    <sino-table-column prop="injTreatTypeName" label="待遇类型" min-width="200" ></sino-table-column>
    <sino-table-column prop="applyDate" label="申请日期"  min-width="200"></sino-table-column>
    <sino-table-column prop="backNum" label="返款次数" ></sino-table-column>
    <sino-table-column prop="custName" label="客户名称"  min-width="200"></sino-table-column>
    <sino-table-column prop="payChName" label="付费供应商"  min-width="280"></sino-table-column>
    <sino-table-column prop="depName" label="负责业务部门" min-width="180"></sino-table-column>
    <sino-table-column prop="busiRespName" label="业务员" ></sino-table-column>
    <sino-table-column prop="creName" label="经办人" ></sino-table-column>
    <sino-table-column label="操作" align="center" fixed="right" bottom="79 !important" min-width="100">
      <template scope="scope">
        <template v-if="scope.row.oper == true">
          <span class="table-span" @click="toview(scope.row)">查看</span><i class="table-i" v-if="scope.row.handleSchedule === 1 || scope.row.handleSchedule===5">|</i>
          <span class="table-span" v-if="scope.row.handleSchedule === 1 || scope.row.handleSchedule===5" @click="amendFun(scope.row)">修改</span><i class="table-i"></i>
        </template>
      </template>
    </sino-table-column>
  </sino-table>
  <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
             :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
             :total="page.total"></sino-page>

    </div>
    <!--工伤待遇申请和修改弹层-->
    <sino-dialog :visible.sync="identificFlag" top="5%" size="samll" @close="clearFun('matForm')"  class="usermanage dialog-com-tree-look-box">
      <sino-title slot="title" type="levelOne" :title="conTitle === false ? '工伤待遇申请' : '工伤待遇修改'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1 clearfix  layerthic layerthic">
        <sino-form :model="matForm" :rules="matFormRule" ref="matForm" class="clearfix">
          <div class="search-box layer-box layer-top">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text" v-model="matForm.empName" :disabled="blean"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo"  >
                  <sino-input class="fl" type="text" v-model="matForm.certNo" :disabled="blean" @blur="getSinsArea(matForm.certNo)"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="社保执行地：" class="search-inner-item" prop="sinsExecuAreaName">
                  <sino-select   :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :disabled="change"
                                 :url="areaSelectBox"
                                 :chooseName.sync="matForm.sinsExecuAreaName"
                                 :chooseId.sync="matForm.sinsExecuArea"
                                 :data="{data: {areaTypes:[4,5]}}"
                                 @change="tableListData"
                                 :clear="true" ></sino-select>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="付费供应商：" class="search-inner-item" prop="payChName" >
                  <sino-select  :filterable="true"
                                :multiselect="false"
                                :isshowTotol="false"
                                :totalNum="false"
                                :isPage="true"
                                :isGroup="false"
                                :url="selectBox"
                                :token="token"
                                :data="{code: 'SUPP_TYPE'}"
                                :chooseName.sync="matForm.payChName"
                                :chooseId.sync="matForm.paySuppId"
                                :clear="true" ></sino-select>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="客户名称：" class="search-inner-item" prop="custName" >
                  <sino-select
                        :filterable="true"
                        :multiselect="false"
                        :isshowTotol="false"
                        :totalNum="false"
                        :isPage="true"
                        :isGroup="false"
                        :token="token"
                        :url="findCustInfoSelectBoxAll"
                        :data="custInfoData"
                        :chooseName.sync="matForm.custName"
                        :chooseId.sync="matForm.custId"
                        :clear="true"
                        class="multiple-choice"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="工伤认定结果：" class="search-inner-item" prop="injIdenResultName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="true"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code:'INJ_IDEN_RESULT'}"
                               :chooseName.sync="matForm.injIdenResultName"
                               :chooseId.sync="matForm.injIdenResult"
                               :clear="true"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="认定日期：" class="search-inner-item" prop="idenDate">
                  <sino-date-picker class="fl"
                                    v-model="matForm.idenDate"
                                    type="date"
                                    :disabled="true"
                                    :editable="false"
                                    :readonly="false"
                                    :disable="true"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="劳动能力鉴定结果：" class="search-inner-item" prop="apprResultName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="true"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code:'APPR_RESULT'}"
                               :chooseName.sync="matForm.apprResultName"
                               :chooseId.sync="matForm.apprResult"
                               :disable="true"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="鉴定日期：" class="search-inner-item" prop="apprDate">
                  <sino-date-picker class="fl"
                                    v-model="matForm.apprDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :disabled="true"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="待遇类型：" class="search-inner-item" prop="injTreatTypeNameList">
                  <sino-select :filterable="true"
                               :multiselect="true"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code:'INJ_TREAT_TYPE'}"
                               :chooseName.sync="matForm.injTreatTypeNameList"
                               :chooseId.sync="matForm.injTreatTypeList"
                               :clear="true"
                               :token="token"
                               class="multiple-choice"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="待遇申请日期：" class="search-inner-item" prop="applyDate">
                  <sino-date-picker class="fl"
                                    v-model="matForm.applyDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="材料递交人：" class="search-inner-item" prop="applyPer" @click="resetFun">
                  <sino-input type="text" v-model="matForm.applyPer"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="递交人电话：" class="search-inner-item" prop="applyPerTel" >
                  <sino-input type="text" v-model="matForm.applyPerTel"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <sino-title type="levelTwo" title="上传文件" :style="{'overflow':'hidden'}"></sino-title>
          <div class="upload updata-box" v-if="materData&&materData.length>0">
            <sino-auto-table :data="materData" width="100%" stripe border>
              <sino-table-column type="selection" width="50"></sino-table-column>
              <sino-table-column prop="confMatName" label="所需材料" align="center"></sino-table-column>
              <sino-table-column prop="matName" label="已上传文件" align="center">
                <template scope="scope" v-if="scope.row.oper == true">
                  <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                  <span v-if="scope.row.matName" class="i-color" @click="deleFileFun(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                </template>
              </sino-table-column>
              <sino-table-column label="操作" align="center" width="80">
                <template scope="scope" v-if="scope.row.oper == true">
                  <template v-if="scope.row.oper == true">
                    <sino-upload
                      :action="uploadFilePublic"
                      :show-file-list="false"
                      :auto-upload="true"
                      :on-change="getFileName"
                      :on-success="fileSuccess"
                      :on-error="fileError">
                      <div slot="trigger">
                        <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                      </div>
                    </sino-upload>
                  </template>
                </template>
              </sino-table-column>
            </sino-auto-table>
          </div>
          <div class="inp-text">
            <input type="text" v-model="matForm.remark" placeholder="请输入您的备注....">
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer industrial-footer">
        <sino-button type="primary" @click="submitFun">提  交</sino-button>
        <sino-button  @click="newMatConFun">保 存</sino-button>
      </span>
    </sino-dialog>

    <!--工伤医疗费用申请-->
    <sino-dialog :visible.sync="medicalFlag" top="5%" size="samll" @close="clearFun('medicalForm')"  class="usermanage dialog-com-tree-look-box">
      <sino-title slot="title" type="levelOne" :title="medicalTitle ? '工伤医疗费用申请' : '工伤医疗费用修改'" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1 clearfix  layerthic unshow">
        <sino-form :model="medicalForm" :rules="medicalFormRule" ref="medicalForm" class="clearfix">
          <div class="search-box layer-box layer-top">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                  <sino-input class="fl" type="text" :disabled="!medicalTitle" v-model="medicalForm.empName"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                  <sino-input class="fl" type="text" :disabled="!medicalTitle" v-model="medicalForm.certNo" @blur="getSinsAreaMedical(medicalForm.certNo)"></sino-input>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="付费供应商：" class="search-inner-item" prop="payChName" >
                  <sino-select  :filterable="false"
                                :multiselect="false"
                                :isshowTotol="false"
                                :totalNum="false"
                                :isPage="true"
                                :isGroup="false"
                                :url="apiPath.hrsc.findSuppInfoByCertNo"
                                :disabled="!medicalTitle"
                                :data="suppInfmData"
                                :linkage="true"
                                :chooseName.sync="medicalForm.payChName"
                                :chooseId.sync="medicalForm.paySuppId"
                                :clear="true" ></sino-select>
                </sino-form-item>
              </li>
              <li class="li-wid">
                <sino-form-item label="客户名称：" class="search-inner-item" prop="custName" >
                  <sino-select
                    :filterable="false"
                    :multiselect="false"
                    :isshowTotol="false"
                    :totalNum="false"
                    :isPage="true"
                    :isGroup="false"
                    :token="token"
                    :disabled="!medicalTitle"
                    :url="apiPath.hrsc.findCustInfoByCertNo"
                    :data="custInfomData"
                    :chooseName.sync="medicalForm.custName"
                    :chooseId.sync="medicalForm.custId"
                    :clear="true"
                    class="multiple-choice"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="住院开始日期：" class="search-inner-item" prop="hosBegDate">
                  <sino-date-picker class="fl"
                                    v-model="medicalForm.hosBegDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :disabled="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="住院结束日期：" class="search-inner-item" prop="hosEndDate">
                  <sino-date-picker class="fl"
                                    v-model="medicalForm.hosEndDate"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :disabled="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="社保执行地：" class="search-inner-item" prop="areaName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :disabled="!medicalTitle"
                               :url="areaSelectBox"
                               :data="{data: {areaTypes:[4,5]}}"
                               :chooseName.sync="medicalForm.areaName"
                               :chooseId.sync="medicalForm.areaId"
                               :clear="true"
                               @change="tableListDataMecal"
                  ></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="申请日期：" class="search-inner-item" prop="applyDate">
                  <sino-date-picker class="fl"
                                    v-model="medicalForm.applyDate"
                                    type="date"
                                    :disabled="false"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="材料递交人：" class="search-inner-item" prop="matSubmitPerName" @click="resetFun">
                  <sino-input type="text" v-model="medicalForm.matSubmitPerName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="递交材料人电话：" class="search-inner-item" prop="matSubmitPerTel" >
                  <sino-input type="text" v-model="medicalForm.matSubmitPerTel"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
          <sino-title type="levelTwo" title="上传文件"></sino-title>
          <div class="upload updata-box" v-if="medicalFormData&&medicalFormData.length>0">
          <!--<div class="upload updata-box">-->
          <sino-auto-table :data="medicalFormData" width="100%" stripe border>
              <sino-table-column type="selection" width="50"></sino-table-column>
              <sino-table-column prop="confMatName" label="所需材料" align="center"></sino-table-column>
              <sino-table-column prop="matName" label="已上传文件" align="center">
                <template scope="scope" v-if="scope.row.oper == true">
                  <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                  <span  v-if="scope.row.matName" class="i-color" @click="deleFileMeFun(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                </template>
              </sino-table-column>
              <sino-table-column label="操作" align="center" width="80">
                <template scope="scope" v-if="scope.row.oper == true">
                  <template v-if="scope.row.oper == true">
                    <sino-upload
                      :action="uploadFilePublic"
                      :show-file-list="false"
                      :auto-upload="true"
                      :on-change="getFileNameM"
                      :on-success="fileSuccessM"
                      :on-error="fileErroM">
                      <div slot="trigger">
                        <div class="chooseFileButton uploa-but-style" :disabled="!medicalTitle" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                      </div>
                    </sino-upload>
                  </template>
                </template>
              </sino-table-column>
            </sino-auto-table>
          </div>
          <div class="inp-text" v-if="medicalFormData != ''">
            <input type="text" v-model="medicalForm.remark" placeholder="请输入您的备注....">
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer industrial-footer">
        <sino-button type="primary" @click="medicalSubFun">提  交</sino-button>
        <sino-button  @click="medicalSaveFun">保 存</sino-button>
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
      <div class="usermanagement-modify1 clearfix  layerthic unshowscollY industrial-box">
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
                      <li class="customer-li">
                        <h6>社保执行地</h6><span v-text="emplInfor.sinsExecuAreaName"></span>
                      </li>
                      <li class="customer-li">
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
                  <div class="userm" v-show="inductrial"> <!-- {'inductrial': activeNode < 6} -->
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
                      <li class="customer-li">
                        <h6>待遇类型</h6><span v-text="emplInfor.injTreatTypeName"></span>
                      </li>
                      <li class="customer-li">
                        <h6>待遇申请日期</h6><span v-text="emplInfor.applyDate"></span>
                      </li>
                      <li class="customer-sp customer-filed heightAuto">
                        <h6 class="elseH6"><em class="fontHeightAuto">上传文件</em></h6>
                        <span class="auto-height-span uploadFile" v-for="(item, index) in  emplInfor.injTreatMatList">
                          <i class="iStyle fl" :key="index">{{item.matName}}</i>
                          <i class="fr iStyle istrue" v-if="item.matName">
                            <a href="javascript:;" @click="batchAllPreview(item.matEncId)">预览</a>|<a href="javascript:;"  @click="batchAllDownload(item.matEncId)">下载</a>
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
                    <ul v-for="(item, index) in emplInfor.injTreatBackInfoList" :class="{'backl-uls': index }" :key="index">
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
    <!--预览-->
    <sino-dialog :visible.sync="browseFlag" size="samll"  class="usermanage dialog-com-tree-look-box toissueident-box">
      <div class="img-margin">
        <img :src="browImgPath">
      </div>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
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
        linkageNo: '',
        linkageId: '',
        suppInfmData: {id: '', title: '', certNo: '', areaId: ''},
        custInfomData: {id: '', title: '', certNo: '', areaId: ''},
        blean: true,
        activeRow: '',
        change: false,
        browImgPath: '',  // 预览图片的地址
        typeMan: Cookie.get('roleType'), // yw 5 ceshi 12
        medicalFormData: [],
        browseFlag: false,
        matForm: {
          remark: '',
          empName: '', // 雇员姓名
          certType: '', // 证件号码
          certNo: '', // 身分正号码
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
          injTreatTypeCode: '',
          injTreatTypeList: [],
          injTreatType: '',
          applyDate: '',
          applyPer: '',
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
          reimFeeTypeName: '',
          reimFeeType: '',
          applyDateBeg: '', // 待遇申请日期
          applyDateEnd: '',
          depId: '', // 业务部门
          injTreatId: '',
          depName: ''
        }, // 工伤待遇查询
        searchFlag: true, // 工伤待遇查询 收起和弹开
        identificFlag: false, // 工伤待遇申请和修改的弹窗显示
        conTitle: false, // 工伤待遇申请title
        checktheFlag: false, // 查看弹层 显示
        checktheMeFlag: true, // 查看弹层 显示
        backl: false, // 工伤待遇返款信息 ====》 收起 下拉
          // 上传文件
        materData: [],
        resetFun: {},  // 查询的点击事件
        findCustSelectInfo: {}, // 查询折叠起的url
        entOrderForm: {}, // 待遇申请日期
        seeDto: {}, // 雇员信息
        activeNode: '', // 大箭头
        searchtitle: '查看工伤待遇',
        searchtitleFlag: true,
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
          injTreatTypeName: '',
          applyDate: '',
          matName: '',
          remark: '',
          injTreatBackInfoList: null,
          injTreatMatList: null
        },
        // 医疗费用申请
        medicalFlag: false,
        medicalForm: {
          mediMateReimId: '', // 医保生育报销ID
          uniqNo: '', // 唯一号 （通过证件号带出）页面不显示，但需要返回后台
          empName: '', // 雇员姓名
          certType: '', // 证件类型
          certNo: '', // 证件号码
          conId: '', // 商务合同Id
          areaId: '', // 医保生育报销ID
          areaName: '', // 医保生育报销ID
          paySuppId: '', // 医保生育报销ID
          payChName: '',
          custId: '',
          custName: '',
          respBusiRepId: '',
          respBusiRepName: '',
          respBusiDepId: '',
          respBusiDepName: '',
          injTreatTypeName: '',
          injTreatType: '',
          handleSchedule: '',
          hosBegDate: '',
          hosEndDate: '',
          applyDate: new Date(),
          matSubmitPerName: '',
          matSubmitPerTel: '',
          submitOperatorTime: '',
          sendSsbDate: '',
          eavDate: '',
          eavState: '',
          eavReturnReason: '',
          remark: '',
          isEffect: '',
          backNum: '',
          orderId: '',
          matCreTiem: '',
          matConfId: '',
          injReimMatList: '',
          matEncId: '', //
          matName: ''
        },
        medicalFormRule: {
          empName: [
            {required: true, message: '请输入雇员姓名', trigger: 'blur'}
          ],
          certNo: [{required: true, message: '请输入证件号码', trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'change'}],
          payChName: [
            {required: true, message: '请选择付费供应商', trigger: 'change'}
          ],
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          areaName: [
            {required: true, message: '请选择社保执行地', trigger: 'change'}
          ],
          applyDate: [
            {type: 'date', required: true, message: '请选择申请日期', trigger: 'change'}
          ],
          matSubmitPerName: [
            {required: true, message: '请输入材料递交人', trigger: 'blur'}
          ],
          matSubmitPerTel: [
            {required: true, message: '请输入递交材料人电话', trigger: 'blur'}
          ]
        },
        medicalTitle: true,
        // 工伤待遇信息

        // 工伤待遇返款信息
        refunds: {
          salName: '',
          cuName: '',
          saleeName: '',
          sueName: ''
        },
        matFormRule: {
          sinsExecuAreaName: [
            {required: true, message: '请选择社保执行地', trigger: 'change'}
          ],
          empName: [
            {required: true, message: '请输入雇员姓名', trigger: 'change'}
          ],
          certNo: [{required: true, message: '请输入证件号码', trigger: 'change'},
          {validator: this.validator.checkcerNoCode, trigger: 'change'}],
          payChName: [
            {required: true, message: '请选择付费供应商', trigger: 'change'}
          ],
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          injTreatTypeNameList: [
            {type: 'array', required: true, message: '请选择待遇类型', trigger: 'change'}
          ],
          applyDate: [
            {required: true, message: '请选择待遇申请日期', trigger: 'change', type: 'date'}
          ],
          applyPer: [
            {required: true, message: '请选择材料递交人', trigger: 'change'}
          ],
          applyPerTel: [
            {required: true, message: '请选择递交人电话', trigger: 'change'},
            {validator: this.validator.checkPhone, trigger: 'change'}
          ]
        }
      };
    },
    created () {
      console.log(this.typeMan);
      if (this.typeMan === '5') {
        this.inductrialForm.handleScheduleListName = ['待提交', '审核不通过'];
        this.inductrialForm.handleScheduleList = [1, 5];
      } else if (this.typeMan === '26') {
        this.inductrialForm.handleScheduleListName = ['待送社保', '待社保审核'];
        this.inductrialForm.handleScheduleList = [2, 3];
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
      // changeSuppInfo (item) {
      //   this.medicalForm.payChName = item.title;
      //   this.medicalForm.paySuppId = item.id;
      //   console.log(this.medicalForm.payChName);
      //   console.log(this.medicalForm.paySuppId);
      // },
      // changeCustInfo (item) {
      //   this.medicalForm.custName = item.title;
      //   this.medicalForm.custId = item.id;
      //   console.log(this.medicalForm.custName);
      //   console.log(this.medicalForm.custId);
      // },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.creId) {
            all.push(item);
          }
        }
        this.selectCallBackEmp(all, row);
      },
      //  改变当前页
      pageHandler (pageNum) {
        this.page.pageNum = pageNum;
        this.getTableList();
      },
      // 改变分页显示条数;
      choooseNum (pageSize) {
        this.page.pageSize = pageSize;
        this.getTableList();
      },
      matConForm () {},
      sub (aa) {
        aa = aa.toString();
        return aa.substring(0, 4) + '-' + aa.substring(4, 6);
      },
      // 工伤医疗费用申请
      medicalFun () {
        this.medicalFlag = true;
        this.medicalTitle = true;
      },
      medicalSaveFun () {
        this.$refs.medicalForm.validate((valid) => {
          if (valid) {
            if (this.medicalTitle) {
              // 申请
              this.medicalForm.injReimMatList = this.medicalFormData;
              api.post(this.apiPath.sins.saveInjReimInfoSave, this.medicalForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.medicalFlag = false;
                  this.$message({message: '保存成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            } else { // 修改
              // this.medicalForm.injReimMatList = this.medicalFormData;
              api.post(this.apiPath.sins.updateInjReimInfoByIdToSave, this.medicalForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.medicalFlag = false;
                  this.$message({message: '保存成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 修改(申请) 保存
      newMatConFun (item) {
        /* 工伤待遇修改 */
        this.$refs.matForm.validate((valid) => {
          if (valid) {
            if (this.conTitle) {
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
          }
        });
      },
      eavFun () { // 工伤鉴定申请 弹窗此显示
        this.conTitle = false;
        this.blean = false;
        this.identificFlag = true;
      },
      amendFun (item) { // 修改
        if (item.reimFeeType == 1) {
          // 工伤待遇
          this.change = true;
          api.post(this.apiPath.sins.findInjTreatById, {injTreatId: item.injTreatId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.identificFlag = true;
              if (res.data.apprDate) {
                res.data.apprDate = new Date(res.data.apprDate);
              }
              if (res.data.idenDate) {
                res.data.idenDate = new Date(res.data.idenDate);
              }
              if (res.data.applyDate) {
                res.data.applyDate = new Date(res.data.applyDate);
              }
              let that = this;
              /* this.matForm = res.data;
               this.materData = res.data.injTreatMatList; */
              setTimeout(function () {
                that.matForm = res.data;
                that.materData = res.data.injTreatMatList;
                console.log(that.materData);
              }, 200);
            }
          }).catch(err => {
            console.log(err);
          });
          this.conTitle = true;
        } else if (item.reimFeeType == 2) {
          // 工伤医疗
          this.medicalTitle = false;
          api.post(this.apiPath.sins.findInjReimInfoById, {mediMateReimId: item.injTreatId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.medicalFlag = true;
              if (res.data.hosBegDate) {
                res.data.hosBegDate = new Date(res.data.hosBegDate);
              }
              if (res.data.hosEndDate) {
                res.data.hosEndDate = new Date(res.data.hosEndDate);
              }
              if (res.data.applyDate) {
                res.data.applyDate = new Date(res.data.applyDate);
              }
              if (res.data.surgeryDate) {
                res.data.surgeryDate = null;
              }
              // let that = this;
              this.medicalForm = res.data;
              this.medicalFormData = res.data.injReimMatList;
              // setTimeout(function () {
              //   that.matForm = res.data;
              //   that.materData = res.data.injTreatMatList;
              //   console.log(that.materData);
              // }, 200);
            }
          }).catch(err => {
            console.log(err);
          });
        };
      },
      selectCallBackEmp (selectTion, row) {
        checked = selectTion;
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
          return;
        };
        let typeValidate = checked.every(item => {
          return item.handleSchedule == 1;
        });
        if (!typeValidate) {
          this.$alert('请选择待提交项', '温馨提示', {
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
        let subType = checked[0].reimFeeType;
        if (subType == 1) {
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
              this.searchFun();
            }
          });
        } else if (subType == 2) {
          let injTreatList = [];
          checked.forEach(function (item, index) {
            let obj = {
              mediMateReimId: item.injTreatId,
              handleSchedule: item.handleSchedule
            };
            injTreatList.push(obj);
          });
          let obj2 = {
            injReimList: injTreatList
          };
          api.post(this.apiPath.sins.updateBatchScheduleToSubmit, obj2).then(res => {
            if (res.code === 'CPYY-00001') {
              checked.splice(0, checked.length);
              this.$message({message: '提交成功！', type: 'success'});
              this.searchFun();
            }
          });
        }
      },
      toview (item) { // 查看
        if (item.reimFeeType == 1) { // 工伤
          api.post(this.apiPath.sins.findInjTreatById, {injTreatId: item.injTreatId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchtitle = '查看工伤待遇';
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
        } else if (item.reimFeeType == 2) { // 医疗
          api.post(this.apiPath.sins.findInjReimInfoById, {mediMateReimId: item.injTreatId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchtitle = '查看医疗费用';
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
      deleFileFun (index) {
        this.materData[index].matName = '';
      },
      deleFileMeFun (index) {
        this.medicalFormData[index].matName = '';
      },
      getFileName (file) {
        this.materData[this.activeRow].matName = file.name;
      },
      getFileNameM (file) {
        this.medicalFormData[this.activeRow].matName = file.name;
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
      fileSuccessM (res, file) {
        if (res.code === 'CPYY-00001') {
          this.medicalFormData[this.activeRow].matEncId = res.data;
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
          this.medicalFormData[this.activeRow].matName = '';
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
      fileErroM () {
        this.medicalFormData[this.activeRow].matName = '';
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
      resFn (item) {
        for (var key in this.inductrialForm) {
          this.inductrialForm[key] = '';
        }
        this.inductrialForm.injTreatTypeNameList = [];
        this.inductrialForm.injTreatTypeList = [];
        this.inductrialForm.handleScheduleListName = [];
        this.inductrialForm.handleScheduleList = [];
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
            this.inductrialForm.injTreatId = this.tableData.injTreatId;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      getSinsArea (val) {
        /* 通过证件号码获得数据 */
        if (val) {
          let obj = {
            certNo: val
          };
          api.post(this.apiPath.sins.findEmpAndOrderInfoByNo, obj).then(res => {
            this.matForm = {};
            this.medicalFormData = [];
            this.matForm.certNo = val;
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
              this.matForm.applyPer = res.data.empName;
              this.matForm.applyPerTel = res.data.tel;
              this.matForm.applyDate = new Date();
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
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      getSinsAreaMedical (val) {
        /* 通过证件号码获得数据 */
        if (val) {
          let obj = {
            certNo: val
          };
          this.medicalForm = {};
          this.medicalFormData = [];
          this.medicalForm.certNo = val;
          api.post(this.apiPath.sins.findInjReimInfoByCertNo, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.hosBegDate) {
                res.data.hosBegDate = new Date(res.data.hosBegDate);
              }
              if (res.data.hosEndDate) {
                res.data.hosEndDate = new Date(res.data.hosEndDate);
              }
              if (res.data.applyDate) {
                res.data.applyDate = new Date(res.data.applyDate);
              } else {
                res.data.applyDate = new Date();
              }
              this.medicalForm = res.data;
              this.medicalForm.matSubmitPerName = res.data.empName;
              this.medicalForm.certNo = res.data.certNo;
              this.medicalForm.areaId = res.data.areaId;
              this.medicalForm.areaName = res.data.areaName;
              // this.custInfomData.areaId = res.data.areaId;
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
        this.$refs[name].resetFields();
        for (var key in this[name]) {
          this[name][key] = '';
        }
        this.medicalFormData = [];
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
      submitFun () {
        /*  工伤待遇修改 */
        this.$refs.matForm.validate((valid) => {
          if (valid) {
            if (this.conTitle) {
              api.post(this.apiPath.sins.updateInjTreatInfoSubmit, this.matForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.identificFlag = false;
                  this.$message({message: '提交成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (!this.conTitle) { /*  */
              this.matForm.injTreatMatList = this.materData;
              api.post(this.apiPath.sins.saveInjTreatInfoSubmit, this.matForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.identificFlag = false;
                  this.$message({message: '提交成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      medicalSubFun () {
        /*  工伤待遇修改 */
        this.$refs.medicalForm.validate((valid) => {
          if (valid) {
            if (this.medicalTitle) { // 申请
              this.medicalForm.injReimMatList = this.medicalFormData;
              api.post(this.apiPath.sins.saveInjReimInfoSubmit, this.medicalForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.medicalFlag = false;
                  this.$message({message: '提交成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            } else { /* 修改 */
             // this.medicalForm.injReimMatList = this.medicalFormData;
              api.post(this.apiPath.sins.updateInjReimInfoByIdToSubmit, this.medicalForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.medicalFlag = false;
                  this.$message({message: '提交成功！', type: 'success'});
                  this.searchFun();
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 根据社保执行地带材料
      tableListData () {
        /* 如果有地区的情况下发送请求获取材料数据 */
        if (this.matForm.sinsExecuArea) {
          if (!this.change) {
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
        } else {
          this.materData = null;
        }
      },
      // 工伤医疗带出数据
      tableListDataMecal () {
        /* 如果有地区的情况下发送请求获取材料数据 */
        if (this.medicalForm.areaId && this.medicalForm.areaName) {
          if (this.medicalTitle) {
            let obj = {
              confUse: 15,
              dimen: 1,
              dimenValue: this.medicalForm.areaId
            };
            api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data.matConfs) {
                  this.medicalFormData = res.data.matConfs;
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        } else {
          this.medicalFormData = null;
        }
      },
      // 下载
      batchAllDownload (id) {
        api.get(this.apiPath.hrsc.invMatFileDownload, {fileUniqueNo: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看确认按钮
      checkAndFun () {
        this.checktheFlag = false;
      }

    }
  };
</script>
