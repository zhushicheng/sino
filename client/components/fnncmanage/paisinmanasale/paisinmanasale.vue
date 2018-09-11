<template>
  <!--拨付单管理-业务员-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">其他类</div>
          <div class="sino-tabs-item" @click="offRefFun">异地就医类</div>
        </div>
      </div>
    </div>
    <sino-con>
      <!--<sino-title type="levelOne" title="拨付单查询"></sino-title>-->
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="searchForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="拨付类型：" class="search-inner-item" prop="paidTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="conStateUrl"
                             :data="{code:'PAID_TYPE'}"
                             :chooseName.sync="searchForm.paidTypeName"
                             :chooseId.sync="searchForm.paidType" :clear="true"
                             @change="paidTypeChange1(searchForm.paidType)"
                ></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="待遇类型：" class="search-inner-item" prop="treatTypeName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :linkage="true"
                             :url="conStateUrl"
                             :data="paidTypeData1"
                             :chooseName.sync="searchForm.treatTypeName"
                             :chooseId.sync="searchForm.treatType" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="支付进度：" class="search-inner-item" prop="payScheduleName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="conStateUrl"
                             :data="{code:'PAY_SCHEDULE'}"
                             :chooseName.sync="searchForm.payScheduleName"
                             :chooseId.sync="searchForm.paySchedule" :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="社保个人编号：" class="search-inner-item" prop="sinsPerNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.sinsPerNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="收据编号：" class="search-inner-item" prop="refundReceiptNo">
                <sino-input class="fl" type="text"
                            v-model="searchForm.refundReceiptNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun(searchForm)">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun()"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="subEav()"><i class="iconfont sino-subaudit"></i>提交</sino-button>
          </div>
        </div>
        <sino-table :data="paiSinManaData" max-height="416" v-on:viewAll="viewAll" border stripe @select-all="selectTabelRowAll" v-on:select="selectCallBack">
          <sino-table-column type="selection"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="180"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
          <sino-table-column prop="sinsPerNo" label="社保个人编号" min-width="180"></sino-table-column>
          <sino-table-column prop="paidTypeName" label="拨付类型" min-width="80"></sino-table-column>
          <sino-table-column prop="treatTypeName" label="待遇类型" min-width="105"></sino-table-column>
          <sino-table-column prop="paidAmoTotal" label="金额" type="money" width="150" text-align="center"></sino-table-column>
          <sino-table-column prop="creDate" label="日期" min-width="120"></sino-table-column>
          <sino-table-column prop="payScheduleName" label="支付进度" min-width="95"></sino-table-column>
          <sino-table-column prop="userName" label="经办人" min-width="95"></sino-table-column>
          <sino-table-column prop="refundReceiptNo" label="收据编号" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看附件</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span>
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
    <!--新增弹层-->
    <sino-dialog :visible.sync="addFlag" size="samll" top="5%" dialogHide v-on:open="openLayer()" v-on:close="lookBillClose()" class="usermanage dialog-maxauto freebill-dialog add-data-height1 add-data-height">
      <sino-title slot="title" type="levelOne" class="sino-dialog-title" :title="addFlagTitle"></sino-title>
      <sino-form :model="addSearchFrom" ref="addSearchFrom" class="serch-form" :rules="addTopRules">
        <div class="search-box marTop">
          <sino-form-item label="拨付类型：" prop="paidTypeName">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="{code: 'PAID_TYPE', ids:[1,2,3]}"
                         :url="conStateUrl"
                         :chooseName.sync="addSearchFrom.paidTypeName"
                         :chooseId.sync="addSearchFrom.paidType"
                         :clear="true"
                         @change="paidTypeChange(addSearchFrom.paidType)"
                         @clearChange="clearPaidType(addSearchFrom.paidType)"
            ></sino-select>
          </sino-form-item>
          <sino-form-item label="待遇类型：" prop="treatTypeName" v-if="addSearchFrom.paidType !== 3">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :linkage="true"
                         :url="conStateUrl"
                         :data="paidTypeData"
                         :chooseName.sync="addSearchFrom.treatTypeName"
                         :chooseId.sync="addSearchFrom.treatType" :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="社保个人编号：" prop="sinsPerNo">
            <sino-input class="fl" type="text"
                        v-model="addSearchFrom.sinsPerNo"
                        :disabled="false"></sino-input>
          </sino-form-item>
          <sino-form-item label="地区：" prop="areaName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="areaUrl"
                         :data="{data: {busiAreaTypes:[1]}}"
                         :chooseName.sync="addSearchFrom.areaName"
                         :chooseId.sync="addSearchFrom.areaId"
                         :clear="true"></sino-select>
          </sino-form-item>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="addSearchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
      <template v-if="addPaisiFlag">
        <div class="usermanagement-modify1 mb15">
          <sino-title slot="title" type="levelTwo" title="请选择关联数据"></sino-title>
          <div class="rela-data" v-for="(item, index) in addCustInfoList" v-if="!birthFlag" :key="index" :class="{'rela-data-checked': item.injTreatId === activeId}">
            <ul class="rela-data-ul fl">
              <li class="fl">
                <h6>客户名称：</h6><span>{{item.custName}} </span>
              </li>
              <li class="fl">
                <h6>付费供应商名称：</h6><span>{{item.paySuppName}}</span>
              </li>
              <li class="fl">
                <h6>申请日期：</h6><span>{{item.applyDate}}</span>
              </li>
            </ul>
            <div class="rela-data-appli fl">
              <i class="iconfont sino-duihao2 fr" :class="{'duihao-color': item.injTreatId === activeId}" @click="chooseCompanyFun(item.injTreatId, index)"></i>
              <h5 @click="viewCompanyDetail(item)" class="fr">详情</h5>
            </div>
          </div>
          <!--生育-遵义-->
          <div class="order-new sale-tip" v-if="birthFlag">
            <i class="iconfont sino-tip"></i>
            <span>该雇员没有生育报销申请记录，请维护</span>
            <input value="报销申请" class="fr" @click="birthClick">
          </div>
        </div>
        <div class="usermanagement-modify1 usermanagement-modify-half title-over ">
          <sino-title slot="title" type="levelTwo" title="基本信息"></sino-title>
          <sino-form :model="addBasInfoForm" :rules="addBasInfoFormRules" ref="addBasInfoForm" class="demo-ruleForm from-padd">
            <sino-form-item label="社保账户名称："  prop="sinsAcctName" class="sino-form-item-width">
              <sino-input v-model="addBasInfoForm.sinsAcctName" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="单位社保账号：" prop="unitSinsNo">
              <sino-input v-model="addBasInfoForm.unitSinsNo" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="雇员姓名：" prop="empName">
              <sino-input v-model="addBasInfoForm.empName" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="社保个人编号：" prop="sinsPerNo" v-if="addSearchFrom.paidType === 1">
              <sino-input v-model="addBasInfoForm.sinsPerNo" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="与雇员关系：" prop="empRel" v-if="addSearchFrom.paidType === 1">
              <sino-radio-group v-model.number="addBasInfoForm.empRel">
                <sino-radio :label="item.id" v-for="(item, index) in buttonList" :key="index">{{item.title}}</sino-radio>
              </sino-radio-group>
            </sino-form-item>
            <sino-form-item label="配偶姓名：" prop="empMatName" v-if="addSearchFrom.paidType === 1 && addBasInfoForm.empRel === 3">
              <sino-input v-model="addBasInfoForm.empMatName" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" prop="certNo" v-if="!(addSearchFrom.paidType === 2 && (addSearchFrom.treatType === 3 || addSearchFrom.treatType === 4))">
              <sino-input v-model="addBasInfoForm.certNo" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="社保个人编号：" prop="sinsPerNo" v-if="addSearchFrom.paidType !== 1">
              <sino-input v-model="addBasInfoForm.sinsPerNo" :disabled="addFlagTitle === '修改拨付单'"></sino-input>
            </sino-form-item>
            <sino-form-item label="金额：" prop="paidAmoTotal" class="yen-father" v-if="(addSearchFrom.paidType === 1 || addSearchFrom.paidType === 3 || (addSearchFrom.paidType === 2 && addSearchFrom.treatType !== 1)) && addSearchFrom.areaId !== 2110751">
              <i class="yen">&yen;</i>
              <sino-input v-model.number="addBasInfoForm.paidAmoTotal" class="inco-padding"></sino-input>
            </sino-form-item>
            <!--遵义-->
            <sino-form-item label="应报销总金额：" prop="alreadyPaidAmo" v-if="addSearchFrom.paidType === 1 && addSearchFrom.areaName === '遵义市'">
              <i class="yen">&yen;</i>
              <sino-input v-model.number="addBasInfoForm.alreadyPaidAmo" class="inco-padding"></sino-input>
            </sino-form-item>
            <sino-form-item label="本次实际拨付：" prop="actualPaidAmo" v-if="addSearchFrom.paidType === 1 && addSearchFrom.areaName === '遵义市'">
              <i class="yen">&yen;</i>
              <sino-input v-model.number="addBasInfoForm.actualPaidAmo" class="inco-padding"></sino-input>
            </sino-form-item>
            <sino-form-item label="拨付单位：" prop="ssbName" class="sino-form-item-width" v-if="addSearchFrom.paidType === 1 && addSearchFrom.areaName === '遵义市'">
              <sino-input v-model.number="addBasInfoForm.ssbName"></sino-input>
            </sino-form-item>
            <sino-form-item label="拨付次数：" prop="paidNum" v-if="addSearchFrom.paidType === 1 && addSearchFrom.areaName === '遵义市'">
              <sino-input v-model.number="addBasInfoForm.paidNum"></sino-input>
            </sino-form-item>
            <sino-form-item label="费用所属期号：" prop="feeDateNo" class="yen-father" v-if="addSearchFrom.paidType === 2 && (addSearchFrom.treatType !== 1 && addSearchFrom.treatType !== 2)">
              <sino-date-picker
                v-model="addBasInfoForm.feeDateNo"
                type="month"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker><!--:picker-options="pickerOptions"-->
            </sino-form-item>
            <div class="datt-line fl"></div>
            <template v-if="addSearchFrom.paidType === 2 && addSearchFrom.treatType == 1">
              <sino-form-item label="一次性伤残补助金：" prop="dispDisabilitySubsidyAmo" class="yen-father">
                <i class="yen">&yen;</i>
                <sino-input v-model.number="addBasInfoForm.dispDisabilitySubsidyAmo" class="inco-padding"></sino-input>
              </sino-form-item>
              <sino-form-item label="一次性领取长期性待遇：" prop="dispLongTreatAmo" class="item-margin yen-father">
                <i class="yen">&yen;</i>
                <sino-input v-model.number="addBasInfoForm.dispLongTreatAmo" class="inco-padding"></sino-input>
              </sino-form-item>
              <sino-form-item label="一次性工亡补助金：" prop="dispDeathSubsidyAmo" class="yen-father">
                <i class="yen">&yen;</i>
                <sino-input v-model.number="addBasInfoForm.dispDeathSubsidyAmo" class="inco-padding"></sino-input>
              </sino-form-item>
              <sino-form-item label="一次性领取供养亲属抚恤金：" prop="dispPensionsAmo" class="item-margin yen-father">
                <i class="yen">&yen;</i>
                <sino-input v-model.number="addBasInfoForm.dispPensionsAmo" class="inco-padding"></sino-input>
              </sino-form-item>
              <sino-form-item label="丧葬补助金：" prop="funeralSubsidyAmo" class="yen-father">
                <i class="yen">&yen;</i>
                <sino-input v-model.number="addBasInfoForm.funeralSubsidyAmo" class="inco-padding"></sino-input>
              </sino-form-item>
              <sino-form-item label="合计：" prop="paidAmoTotal" class="yen-father">
                <i class="yen">&yen;</i>
                <sino-input v-model.number="addBasInfoForm.paidAmoTotal" class="inco-padding"></sino-input>
              </sino-form-item>
              <div class="datt-line fl"></div>
            </template>
            <sino-form-item prop="fileName" label="上传附件：" class="sino-form-item1">
              <sino-upload
                ref="paisUploadFile"
                :action="fileAction"
                :headers="uploadHeader"
                :show-file-list="false"
                :auto-upload="true"
                :on-change="getFileName"
                :on-success="fileSuccess"
                :on-error="fileError"
              >
                <div slot="trigger">
                  <input class="uploadFileBox" type="text" v-model="uploadFileName" readonly="true"/>
                  <div class="chooseFileButton">上传</div>
                </div>
              </sino-upload>
            </sino-form-item>
            <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
              <sino-input type="textarea" v-model="addBasInfoForm.remark"  :disabled="false" ></sino-input>
            </sino-form-item>
          </sino-form>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="addPaisiClick">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--报销申请-->
    <sino-dialog :visible.sync="reimApplyFlag" :top="'3%'" class="medimat" dialogHide @close="cleanContent">
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
          <sino-checkbox-group v-model="reimApplyForm.reimContent" class="mt5 sale-span" @change="reimContentChange">
            <sino-checkbox class="mr10" :label="list.id" v-for="(list, index) in productIdList" :key="list.id">{{list.title}}</sino-checkbox>
          </sino-checkbox-group>
        </sino-form-item>
        <sino-form-item label="手术日期：" prop="surgeryDate" v-if="reimApplyForm.reimType===1 && reimApplyForm.areaName === '遵义市'">
          <sino-date-picker
            v-model="reimApplyForm.surgeryDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="手术日期：" prop="surgeryDate" v-if="reimApplyForm.reimType===1 && reimApplyForm.areaName !== '遵义市'" :rules="[{required: true, type: 'date', message: '手术日期为必填项', trigger: 'change'}]">
          <sino-date-picker
            v-model="reimApplyForm.surgeryDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="申请日期：" prop="applyDate" v-if="reimApplyForm.areaName === '遵义市'">
          <sino-date-picker
            v-model="reimApplyForm.applyDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="申请日期：" prop="applyDate" v-if="reimApplyForm.areaName !== '遵义市'" :rules="[{required: true, type: 'date', message: '申请日期为必填项', trigger: 'change'}]">
          <sino-date-picker
            v-model="reimApplyForm.applyDate"
            type="date"
            :editable="false"
            :readonly="false">
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item prop="matSubmitPerName" label="材料递交人：" v-if="reimApplyForm.areaName === '遵义市'">
          <sino-input v-model="reimApplyForm.matSubmitPerName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="matSubmitPerName" label="材料递交人：" v-if="reimApplyForm.areaName !== '遵义市'" :rules="[{required: true, message: '材料递交人为必填项', trigger: 'change'}]">
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
                <sino-button class="fr" type="icon-text" v-show="expendArr.indexOf(item.dimenConfId) === -1" @click="expendArr.push(item.dimenConfId)">展开</sino-button>
                <sino-button class="fr" type="icon-text" v-show="expendArr.indexOf(item.dimenConfId) !== -1" @click="expendArr.splice(expendArr.indexOf(item.dimenConfId),1)">收起</sino-button>
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
                        :on-change="operGetFileName"
                        :on-success="operFileSuccess"
                        :on-error="operFileError"
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
        <sino-button type="text" @click="reimApplySubmit(0)">返回</sino-button>
      </span>
    </sino-dialog>
    <!--查看拨付单附件弹层-->
    <sino-dialog :visible.sync="annexFlag" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看拨付单附件" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list mt15">
        <ul class="usermanagement-ul">
          <li class="li-last upload-fil">
            <h6>上传附件</h6>
            <span>
              <span v-if="annexData.paidOrderEncFileName">
                {{annexData.paidOrderEncFileName}}
                <a href="javascript:void(0)" @click="batchAllPreview(annexData.previewPaidOrderEncFilePath)" class="file-del-btn">预览</a>
                <i class="file-del-btn"> | </i>
                <a href="javascript:void(0)" @click="batchAllDownloadUrl(annexData.paidOrderEncFilePath)" class="file-del-btn">下载</a>
              </span>
              <span class="spanTwo span-dis" v-if="annexData.paidOrderEncDetFileName" :class="{'spanTwo':annexData.paidOrderEncFileName && annexData.paidOrderEncDetFileName}">
                {{annexData.paidOrderEncDetFileName}}
                <a href="javascript:void(0)" @click="batchAllPreview(annexData.previewPaidOrderDetEncFilePath)" class="file-del-btn">预览</a>
                <i class="file-del-btn"> | </i>
                <a href="javascript:void(0)" @click="batchAllDownloadUrl(annexData.paidOrderDetEncFilePath)" class="file-del-btn">下载</a>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer see-item-sure">
          <sino-button type="primary"  @click="annexFlag = false">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看工伤待遇弹层-->
    <sino-dialog :visible.sync="lookTreatmentFlag" top="5%" size="samll" @close="matResFieFun('matConForm')"  class="usermanage add-data-height dialog-com-tree-look-box toview-box apply-dialog-layer">
      <sino-title slot="title" type="levelOne" title="查看工伤待遇" class="sino-dialog-title"></sino-title>
      <div class="crumbs toview-bor">
        <ul>
          <li class="li-finish"><span><i class="step-num iconfont sino-duigou"></i>提交申请</span></li>
          <li class="li-finish"><span><i class="step-num iconfont sino-duigou"></i>送社保</span></li>
          <li class="li-active"><span><i class="step-num iconfont">3</i>审核通过</span></li>
          <li class="li-notthr"><span><i class="step-num iconfont">4</i>领取拨付单</span></li>
        </ul>
      </div>
      <div class="elastic-layer paisin-layer">
        <!--雇员信息-->
        <div class="emp-info-page mt15  title-tite">
          <div class="local-info">
            <div class="emp-link-card em-l">
              <div class="emp-link-card-title title-bd-n">
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
                      <h6>雇员姓名</h6><input v-model="companyDetailInfo.empName">
                    </li>
                    <li class="customer-li">
                      <h6>证件号码</h6><input v-model="companyDetailInfo.certNo">
                    </li>
                    <li class="customer-sp">
                      <h6>社保执行地</h6><input v-model="companyDetailInfo.areaName">
                    </li>
                    <li class="customer-sp">
                      <h6>付费供应商</h6><input v-model="companyDetailInfo.paySuppName">
                    </li>
                    <li class="customer-sp">
                      <h6>客户名称</h6><input v-model="companyDetailInfo.custName">
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
              <div class="emp-link-card-title title-bd-n">
                <div class="title-right fl">
                  <span class="color-world fl"><i class="title-line"></i>工伤待遇申请信息</span>
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
                    <li class="customer-li">
                      <h6>工伤结果</h6><input v-model="companyDetailInfo.injIdenResult">
                    </li>
                    <li class="customer-li">
                      <h6>认定日期</h6><input v-model="companyDetailInfo.idenDate">
                    </li>
                    <li class="customer-li">
                      <h6>劳动能力鉴定结果</h6><input v-model="companyDetailInfo.salsName">
                    </li>
                    <li class="customer-li">
                      <h6>鉴定日期</h6><input v-model="companyDetailInfo.apprDate">
                    </li>
                    <li class="customer-li">
                      <h6>材料递交人</h6><input v-model="companyDetailInfo.applyPer">
                    </li>
                    <li class="customer-li">
                      <h6>递交人电话</h6><input v-model="companyDetailInfo.applyPerTel">
                    </li>
                    <li class="customer-sp">
                      <h6>待遇类型</h6><span>{{Array.isArray(companyDetailInfo.injTreatTypeNameList)? companyDetailInfo.injTreatTypeNameList.join(','): ''}}</span>
                    </li>
                    <li class="customer-sp">
                      <h6>待遇申请日期</h6><input v-model="companyDetailInfo.applyDate">
                    </li>
                    <li class="li-last heightAuto customer-sp" >
                      <h6 class="elseH6"><em class="fontHeightAuto">上传文件</em></h6>
                      <div v-for="(item, index) in companyDetailInfo.injTreatMatList" class="customer-sp-div" :key="index">
                        <i class="iconfont sino-qubiezhen"></i>{{item.matName}}<a href="javascript:;" @click="batchAllDownload(item.matEncId)" class="file-del-btn">预览</a><em>|</em><a href="javascript:;" @click="batchAllDownload(item.matEncId)" class="file-del-btn">下载</a>
                      </div>
                      <!--<span v-for="item in companyDetailInfo.injTreatMatList">-->
                      <!--<i class="iStyle fl">{{item.matName}}-->
                      <!--<i class="fr iStyle istrue" v-if="item.matName"><a href="javascript:;" @click="batchAllPreview(item.matEncId)" class="file-del-btn">浏览</a> |-->
                      <!--<a href="javascript:;" @click="batchAllDownload(item.matEncId)" class="file-del-btn">预览</a> | <a href="javascript:;" @click="batchAllDownload(item.matEncId)" class="file-del-btn">下载</a></i>-->
                      <!--</i>-->
                      <!--</span>-->
                    </li>
                    <li class="customer-sp">
                      <h6>备注</h6><input v-model="companyDetailInfo.remark">
                    </li>
                  </ul>
                </div>
              </sino-collapse-transition>
            </div>
          </div>
        </div>
        <!--工伤待遇返款信息-->
        <div class="emp-info-page mt15  title-tite occupational" v-if="false">
          <div class="local-info">
            <div class="emp-link-card em-l emp-inductrial">
              <div class="emp-link-card-title title-bd-n">
                <div class="title-right fl">
                  <span class="color-world fl"><i class="title-line"></i>工伤待遇返款信息</span>
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
                  <ul v-for="(item, index) in companyDetailInfo" :key="index">
                    <li>
                      <h6>待遇类型</h6><input v-model="companyDetailInfo.injTreatTypeName">
                    </li>
                    <li>
                      <h6>待遇金额</h6><input v-model="companyDetailInfo.injTreatAmo" class="sp-ri">
                    </li>
                    <li>
                      <h6>费用所属期</h6><input v-model="companyDetailInfo.webSite">
                    </li>
                    <li>
                      <h6>支付状态</h6><input v-model="companyDetailInfo.addr" class="sp-ri">
                    </li>
                  </ul>
                </div>
              </sino-collapse-transition>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer">
        <sino-button type="primary" @click="checkAndFun">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--查看医疗生育-->
    <sino-dialog :visible.sync="seeFlag" top="5%" dialogHide class="medimat-see">
      <sino-title slot="title" type="levelOne" title="查看详情" class="sino-dialog-title"></sino-title>
      <div class="usermanage dialog-com-tree-look-box toview-box">
        <div class="crumbs">
          <ul>
            <li :class="{'li-finish': activeNode > 1, 'li-active': activeNode === 1, 'li-notthr': activeNode  < 1}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 1}">{{activeNode > 1? '':1}}</i>提交申请</span></li>
            <li :class="{'li-finish': activeNode > 2, 'li-active': activeNode === 2, 'li-notthr': activeNode  < 2}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 2}">{{activeNode > 2? '':2}}</i>送社保</span></li>
            <li :class="{'li-finish': activeNode > 3, 'li-active': activeNode === 3, 'li-notthr': activeNode  < 3}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 3}">{{activeNode > 3? '':3}}</i>审批通过</span></li>
            <li :class="{'li-finish': activeNode > 4, 'li-active': activeNode === 4, 'li-notthr': activeNode  < 4}"><span><i class="step-num iconfont" :class="{'sino-duigou': activeNode > 4}">{{activeNode > 4? '':4}}</i>领取拨付单</span></li>
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
      <span slot="footer" class="dialog-footer">
        <!--<sino-button type="primary" @click="seeFlag = false">确 定</sino-button>-->
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
  import Cookie from 'js-cookie';
  import Vue from 'vue';

  export default {
    components: {},
    data () {
      return {
        conStateUrl: this.apiPath.hrsc.getDictSelectBox,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        fileAction: this.apiPath.hrsc.uploadFilePublic,
        areaUrl: this.apiPath.hrsc.findAreaListByBusiAreaType,
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        token: Cookie.get('Token'),
        uploadHeader: {token: Cookie.get('Token')},
        uploadFileStyle: null, // 控制li高
        checkedArr: [],
        addFlagTitle: '',
        bigArr: [],
        activeId: '',
        browseFlag: false, // 预览的弹层
        browImgPath: '',  // 预览图片的地址
        // 查看拨付单附件弹层
        annexFlag: false,
        // 附件名字
        annexData: {
          prodCnName: ''
        },
        paidTypeData: {
          code: ''
        },
        paidTypeData1: {
          code: ''
        },
        // 新增弹层
        addFlag: false,
        // 新增弹层--->查询数据
        addSearchFrom: {
          treatTypeName: '',
          treatType: '',
          paidTypeName: '',
          paidType: '',
          sinsPerNo: '',
          areaId: '',
          areaName: ''
        },
        // 新增弹层--->基本信息
        addBasInfoForm: {
          paidOrderId: '',
          feeDateNo: new Date(),
          sinsAcctName: '',
          sinsAcctId: '',
          unitSinsNo: '',
          empName: '',
          certNo: '',
          sinsPerNo: '',
          dispDisabilitySubsidyAmo: '',
          dispLongTreatAmo: '',
          dispDeathSubsidyAmo: '',
          dispPensionsAmo: '',
          funeralSubsidyAmo: '',
          remark: '',
          paidOrderEncFileNo: '',
          paidAmoTotal: null,
          paidOrderEncName: '',
          empRel: '',
          empMatName: '',
          ssbName: '',
          custSuppType: '',
          custSuppName: '',
          assoBusiId: '',
          busiRespId: '',
          busiRespName: '',
          custOrSuppId: ''
        },
        addPaisiFlag: false,
        seeFlag: false,
        activeNode: 3,
        // 新增弹层--->基本信息校验
        addBasInfoFormRules: {
          sinsAcctName: [
            {required: true, message: '社保账户名称为必填项', trigger: 'change'}
          ],
          feeDateNo: [
            {required: true, message: '费用所属期号为必填项', trigger: 'change', type: 'date'}
          ],
          unitSinsNo: [
            {required: true, message: '单位社保账号为必填项', trigger: 'change'}
          ],
          empName: [
            {required: true, message: '雇员姓名为必填项', trigger: 'change'}
          ],
          certNo: [
            {required: true, message: '证件号码为必填项', trigger: 'change'}
          ],
          sinsPerNo: [
            {required: true, message: '社保个人编号为必填项', trigger: 'change'}
          ],
          paidAmoTotal: [
            {required: true, type: 'number', message: '补助总金额为数字且必填项，最多两位小数', trigger: 'change'},
            {validator: this.validator.checkMaxTwoNum, trigger: 'change'}
          ],
          empRel: [
            {required: true, type: 'number', message: '雇员关系为必填项', trigger: 'change'}
          ],
          empMatName: [
            {required: true, message: '配偶姓名为必填项', trigger: 'change'}
          ]
        },
        // 查询的数据
        searchForm: {
          empName: '',
          certNo: '',
          paidTypeName: '',
          paidType: '',
          treatTypeName: '',
          treatType: '',
          payScheduleName: '待提交',
          paySchedule: 1,
          sinsPerNo: '',
          refundReceiptNo: ''
        },
        buttonList: [],
        // 表格数据
        paiSinManaData: null,
        isA: true,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        total: 0, // 分页总条数
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        companyDetailInfo: {},
        lookTreatmentFlag: false,
        openemplo: true,
        inductrial: true,
        backl: true,
        emplInfor: {},
        occupInjur: {},
        addTopRules: {
          paidTypeName: [
            {required: true, message: '拨付类型为必填项', trigger: 'change'}
          ],
          treatTypeName: [
            {required: true, message: '待遇类型为必填项', trigger: 'change'}
          ],
          areaName: [
            {required: true, message: '地区为必填项', trigger: 'change'}
          ],
          sinsPerNo: [
            {required: true, message: '社保个人编号为数字类型且必填', trigger: 'change'}
          ]
        },
        addCustInfoList: [],
        uploadFileName: '',
        birthFlag: false,
        expendArr: [],
        reimApplyFlag: false,
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
          respBusiRepId: '',
          alreadyPaidAmo: '',
          actualPaidAmo: '',
          paidNum: '',
          ssbName: ''
        },
        alloSeeList: {
          mediMateReim: {},
          matList: [],
          backInfoList: []
        },
        matFlag: false,
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
        reimTypeList: [],
        upFormArr: [],
        productIdList: [],
        areaData: {certNo: '', productId: ''}
      };
    },
    created () {
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'EMP_REL_TYPE', ids: [1, 3]}).then(res => {
        this.buttonList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
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
      upTableSelect (selection, row) {},
      offRefFun () {
        this.$router.push({path: '/alloMediSecBack'});
      },
      openLayer () {
        console.log(this.addBasInfoForm);
      },
      paidTypeChange (val) {
        if (val) {
          this.addPaisiFlag = true;
        }
        if (val === 1) {
          this.paidTypeData.code = 'REIM_CONTENT';
        } else if (val === 2) {
          this.paidTypeData.code = 'TREAT_TYPE';
        }
      },
      paidTypeChange1 (val) {
        if (val) {
          this.addPaisiFlag = true;
        }
        if (val === 1) {
          this.paidTypeData1.code = 'REIM_CONTENT';
        } else if (val === 2) {
          this.paidTypeData1.code = 'TREAT_TYPE';
        }
      },
      clearPaidType (val) {
        if (val === '') {
          this.addPaisiFlag = false;
        }
      },
      // 最上面的查询
      searchFun () {
        this.pageNum = 1;
        this.viewSearch(this.pageNum, this.pageSize);
      },
      viewSearch (pageNum, pageSize) {
        let _data = {
          data: this.searchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.getPaidCombination, _data).then(res => {
          this.paiSinManaData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      chooseCompanyFun (id, index) {
        if (id === this.activeId) {
          this.activeId = '';
          this.addBasInfoForm = {
            paidOrderId: '',
            feeDateNo: new Date(),
            sinsAcctName: '',
            sinsAcctId: '',
            unitSinsNo: '',
            empName: '',
            certNo: '',
            sinsPerNo: '',
            dispDisabilitySubsidyAmo: '',
            dispLongTreatAmo: '',
            dispDeathSubsidyAmo: '',
            dispPensionsAmo: '',
            funeralSubsidyAmo: '',
            remark: '',
            paidOrderEncFileNo: '',
            paidAmoTotal: null,
            paidOrderEncName: '',
            empRel: '',
            empMatName: '',
            ssbName: '',
            custSuppType: '',
            custSuppName: '',
            assoBusiId: '',
            busiRespId: '',
            busiRespName: '',
            custOrSuppId: ''
          };
          return;
        }
        this.activeId = id;
        this.addBasInfoForm.ssbName = this.addCustInfoList[index].ssbName;
        this.addBasInfoForm.custSuppId = this.addCustInfoList[index].custId;
        this.addBasInfoForm.custSuppName = this.addCustInfoList[index].custName;
        this.addBasInfoForm.assoBusiId = this.addCustInfoList[index].injTreatId;
        this.addBasInfoForm.busiRespId = this.addCustInfoList[index].busiRespId;
        this.addBasInfoForm.busiRespName = this.addCustInfoList[index].busiRespName;
        this.addBasInfoForm.sinsAcctName = this.addCustInfoList[index].sinsAcctName;
        this.addBasInfoForm.unitSinsNo = this.addCustInfoList[index].unitSinsNo;
        this.addBasInfoForm.empName = this.addCustInfoList[index].empName;
        this.addBasInfoForm.sinsPerNo = this.addCustInfoList[index].perComCode;
        this.addBasInfoForm.certNo = this.addCustInfoList[index].certNo;
        this.addBasInfoForm.paidAmoTotal = this.addCustInfoList[index].injTreatAmo;
        this.addBasInfoForm.paidAmo = this.addCustInfoList[index].injTreatAmo;
        this.addBasInfoForm.custSuppType = this.addCustInfoList[index].custOrSupp;
//        this.addBasInfoForm.custSuppType = this.addCustInfoList[index].injTreatId;
        this.addBasInfoForm.assoBusiId = this.addCustInfoList[index].injTreatId;
        this.addBasInfoForm.custOrSuppId = this.addCustInfoList[index].custOrSuppId;
      },
      viewAll () {
        let _data = {
          data: {},
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        api.post(this.apiPath.hrsc.getPaidCombination, _data).then(res => {
          this.paiSinManaData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
        });
      },
      // 最上面的重置
      resetFun (fom) {
        for (var i in fom) {
          fom[i] = '';
        }
      },
      // 新增
      addFun () {
        // addBasInfoForm
        this.resetFun(this.addBasInfoForm);
        this.addBasInfoForm.feeDateNo = new Date();
        this.addFlag = true;
        this.addFlagTitle = '新增拨付单';
      },
      viewCompanyDetail (item) {
//        this.companyDetailInfo = item;
        if (this.addSearchFrom.paidType === 2) {
          this.lookTreatmentFlag = true;
          if (this.addSearchFrom.treatType === 2) {
            api.postsign(this.apiPath.sins.findInjReimInfoById, {mediMateReimId: item.injTreatId}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.companyDetailInfo = res.data;
              }
            }).catch(() => {
              console.log('失败!');
            });
          } else {
            api.postsign(this.apiPath.sins.findInjTreatById, {injTreatId: item.injTreatId}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.companyDetailInfo = res.data;
              }
            }).catch(() => {
              console.log('失败!');
            });
          }
        } else {
          this.seeFlag = true;
          api.postsign(this.apiPath.sins.findMediMateReimById, item.injTreatId).then(res => {
            if (res.code === 'CPYY-00001') {
              this.alloSeeList = res.data;
            }
          }).catch(() => {
            console.log('失败!');
          });
        }
      },
      // 提交
      subEav () {
        if (this.checkedArr.length === 0) {
          this.$alert('最少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
        } else {
          let arr = this.checkedArr.map(function (item) {
            return {paidOrderDetId: item.paidOrderDetId};
          });
          api.post(this.apiPath.hrsc.submitPaidOrder, arr).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
            }
          }).catch(() => {
            console.log('失败!');
          });
        }
      },
      selectTabelRowAll (selection, row) {
        let all = [];
        for (let item of selection) {
          if (item.paidOrderId) {
            all.push(item);
          }
        }
        this.selectCallBack(all, row);
      },
      // 手动选中checkBox回调
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
      },
      // 查看附件
      seeFun (scope) {
        api.post(this.apiPath.hrsc.getPreviewLayerThickness, {paidOrderId: scope.paidOrderId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let _this = this;
            this.annexData = res.data;
            setTimeout(function () {
              _this.annexFlag = true;
            }, 100);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun (data) {
        this.addFlag = true;
        this.addFlagTitle = '修改拨付单';
        api.post(this.apiPath.hrsc.findPaidOrderDetById, {paidOrderId: data.paidOrderId, paidOrderDetId: data.paidOrderDetId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.addSearchFrom = JSON.parse(JSON.stringify(res.data));
            this.addBasInfoForm = JSON.parse(JSON.stringify(res.data));
            if (this.addBasInfoForm.feeDateNo) {
              this.addBasInfoForm.feeDateNo = new Date(this.addBasInfoForm.feeDateNo.slice(0, 4) + '-' + this.addBasInfoForm.feeDateNo.slice(4));
            }
            let resData = res.data;
            this.uploadFileName = resData.paidOrderEncName;
            let that = this;
            setTimeout(function () {
              that.addSearchFrom.treatTypeName = resData.treatTypeName;
              that.addSearchFrom.treatType = resData.treatType;
              that.addSearchFun();
              that.activeId = resData.assoBusiId;
            }, 200);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewSearch(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewSearch(this.pageNum, this.pageSize);
      },
      // 新增弹层----> 查询
      addSearchFun () {
        this.$refs.addSearchFrom.validate((valid) => { // 新增
          if (valid) { // 2110751
            let obj = JSON.parse(JSON.stringify(this.addSearchFrom));
            obj.perComCode = this.addSearchFrom.sinsPerNo;
            api.post(this.apiPath.sins.findInjIdenApprTreatByEmpAction, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                if (res.data.flag === true) {
                  this.birthFlag = true;
                } else {
                  this.birthFlag = false;
                  this.addCustInfoList = res.data.injTreatInfos;
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 报销申请
      birthClick () {
        this.reimApplyFlag = true;
      },
      reimTypeChange () {
        this.upFormArr = [];
        this.expendArr = [];
        if (this.reimApplyForm.reimType === 2) {
          this.reimContentChange();
        }
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
      getFileName (file) {
        this.uploadFileName = file.name;
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.addBasInfoForm.paidOrderEncFileNo = res.data;
          this.addBasInfoForm.paidOrderEncName = this.uploadFileName;
        } else {
          this.addBasInfoForm.paidOrderEncFileNo = '';
          this.addBasInfoForm.paidOrderEncName = '';
        }
      },
      fileError (res) {
        this.addBasInfoForm.paidOrderEncFileNo = '';
        this.addBasInfoForm.paidOrderEncName = '';
      },
      lookBillClose () {
        for (var i in this.addBasInfoForm) {
          this.addBasInfoForm[i] = '';
        }
        this.$refs.addSearchFrom.resetFields();
        this.$refs.addBasInfoForm.resetFields();
        this.activeId = '';
        this.uploadFileName = '';
        this.addCustInfoList = [];
      },
      addPaisiClick () {
        let t = this;
        if (t.addFlagTitle === '新增拨付单') {
          t.$refs.addBasInfoForm.validate((valid) => {
            if (valid) {
              t.$refs.addSearchFrom.validate((valid) => {
                if (valid) {
                  let obj = JSON.parse(JSON.stringify(t.addBasInfoForm));
                  obj.paidType = t.addSearchFrom.paidType;
                  obj.treatType = t.addSearchFrom.treatType;
                  obj.areaId = t.addSearchFrom.areaId;
                  obj.feeDateNo = Vue.filter('date')(obj.feeDateNo, 'yyyyMM');
//                  obj.paidAmoTotal = obj.injTreatAmo;
//                  obj.paidAmo = obj.injTreatAmo;
//                  obj.sinsPerNo = obj.perComCode;
//                  obj.custSuppId = obj.custId;
//                  obj.custSuppName = obj.custName;
//                  obj.custSuppType = obj.injTreatId;
//                  obj.assoBusiId = obj.injTreatId;
                  api.post(t.apiPath.hrsc.savePaidOrder, obj).then(res => {
                    if (res.code === 'CPYY-00001') {
                      t.addFlag = false;
                      t.searchFun();
                    }
                  }).catch(err => {
                    console.log(err);
                  });
                }
              });
            }
          });
        } else {
          t.$refs.addBasInfoForm.validate((valid) => {
            if (valid) {
              t.$refs.addSearchFrom.validate((valid) => {
                if (valid) {
                  let obj = JSON.parse(JSON.stringify(t.addBasInfoForm));
                  obj.paidType = t.addSearchFrom.paidType;
                  obj.treatType = t.addSearchFrom.treatType;
                  obj.feeDateNo = Vue.filter('date')(obj.feeDateNo, 'yyyyMM');
                  api.post(t.apiPath.hrsc.updatePaidOrder, obj).then(res => {
                    if (res.code === 'CPYY-00001') {
                      t.addFlag = false;
                      t.searchFun();
                    }
                  }).catch(err => {
                    console.log(err);
                  });
                }
              });
            }
          });
        }
      },
      /*  预览 */
      batchAllPreview (url) {
        this.browseFlag = true;
        this.browImgPath = url;
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
      batchAllDownloadUrl (url) {
        api.download(url);
      },
      checkAndFun () {
        this.lookTreatmentFlag = false;
      },
      matResFieFun () {},
      cleanContent () {
        this.reimApplyForm.remark = '';
        this.reimApplyForm.reimContent.splice(0);
        this.upFormArr = [];
        this.expendArr = [];
        this.activeFIndex = '';
        this.activeSIndex = '';
        this.$refs['reimApplyForm'].resetFields();
      },
      // 证件号码change事件
      certNoChange (data) {
        let reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (reg.test(data)) {
          this.areaData.certNo = data;
          api.post(this.apiPath.sins.findMeteMediInfo, {certNo: data}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.reimApplyForm.empName = res.data.empName;
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
      currentUploadFun (first, second) {
        this.activeFIndex = first;
        this.activeSIndex = second;
      },
      operGetFileName (file) {
        this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matName = file.name;
      },
      operFileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matEncId = res.data;
          this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].isChecked = true;
          this.$refs['uploadTable' + this.activeFIndex][0].toggleRowSelection(this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex], true);
        } else {
          this.upFormArr[this.activeFIndex].matConfs[this.activeSIndex].matName = '';
        }
      },
      operFileError () {
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
      reduceUploadFun (scope, first, second) {
        this.upFormArr[first].matConfs[second].matEncId = '';
        this.upFormArr[first].matConfs[second].matName = '';
        this.upFormArr[first].matConfs[second].isChecked = false;
        this.$refs['uploadTable' + first][0].toggleRowSelection(this.upFormArr[first].matConfs[second], false);
      },
      reimApplySubmit (num) {
        if (num === 0) {
          this.cleanContent();
          this.reimApplyFlag = false;
        } else {
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
                flag: num,
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
              api.post(this.apiPath.sins['addMediMateReim'], obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.reimApplyFlag = false;
                  this.addSearchFun();
                }
              });
            }
          });
        }
      }
    }
  };
</script>
