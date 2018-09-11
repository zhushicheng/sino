<template>
  <div>
    <div class="usermanage clearfix" v-if="!routerView">
      <div class="invinfo">
        <!--head picture-->
        <div class="empass-middle-left psuch-middle">
          <ul class="left-bottom clearfix clearMargin">
            <li v-if="this.typeMan == 5 || this.typeMan == 26">
              <div>
                <i class="total-img"></i>
              </div>
              <div>
                <p >待提交</p>
                <p><span class="tip_num" ></span><span class="fontStyle">{{ statusData.submitted }}</span></p>
              </div>
            </li>
            <li v-if="this.typeMan == 26">
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>待送社保</p>
                <p><span class="tip_num" ></span><span class="fontStyle">{{ statusData.toBeSentSocialSecurity }}</span></p>
              </div>
            </li>
            <li v-if="this.typeMan == 26">
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>待社保审核</p>
                <p><span class="tip_num" ></span><span class="fontStyle">{{ statusData.socialSecurityAudit }}</span></p>
              </div>
            </li>
            <li v-if="this.typeMan == 5 || this.typeMan == 26">
              <div>
                <i class="success-img"></i>
              </div>
              <div>
                <p >审核不通过</p>
                <p><span class="tip_num" ></span><span class="fontStyle">{{ statusData.notPassed }}</span></p>
              </div>
            </li>
            <li v-if="this.typeMan == 5">
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>待发放认定书</p>
                <p><span class="tip_num" ></span><span class="fontStyle">{{ statusData.paymentConfirm }}</span></p>
              </div>
            </li>
            <li v-if="this.typeMan == 26">
              <div>
                <i class="error-img"></i>
              </div>
              <div>
                <p>待领取认定书</p>
                <p><span class="tip_num" ></span><span class="fontStyle">{{ statusData.receiveConfirm }}</span></p>
              </div>
            </li>
          </ul>
        </div>
        <!--selectMessage-->
        <sino-con class="sino-con-more marginTop20">
          <sino-title type="levelOne" title="工伤认定查询"></sino-title>
          <sino-form :model="injuSearchForm" ref="injuSearchForm" class="serch-form">
            <div class="search-box">
              <ul class="search-inner-box invoice-ul">
                <li class="search-inner-name">
                  <span class="search-inner-name">雇员姓名：</span>
                  <sino-input class="fl" type="text" v-model="injuSearchForm.empName"
                              :disabled="false"></sino-input>
                </li>
                <li>
                  <span class="search-inner-name">证件号码：</span>
                  <sino-input class="fl" type="text" v-model="injuSearchForm.certNo"
                              :disabled="false"></sino-input>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">办理进度：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="true"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code: 'INJ_HANDLE_STATE'}"
                               :chooseName.sync="injuSearchForm.handleStateName"
                               :chooseId.sync="injuSearchForm.handleStateList"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">延时申请情况：</span>
                  <sino-select class="fl"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code: 'INJ_IDEN_DELAYED'}"
                               :chooseName.sync="injuSearchForm.injIdenDelayedName"
                               :chooseId.sync="injuSearchForm.injIdenDelayed"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">社保执行地：</span>
                  <sino-select class="fl"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="findAreaList"
                               :chooseName.sync="injuSearchForm.sinsAreaName"
                               :chooseId.sync="injuSearchForm.sinsAreaId"
                               :data="{data: {areaTypes:[4,5]}}"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">备案情况：</span>
                  <sino-select class="fl"
                               :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="getDictSelectBox"
                               :data="{code: 'INJ_REC'}"
                               :chooseName.sync="injuSearchForm.injRecName"
                               :chooseId.sync="injuSearchForm.injRec"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag" class="invoice-li">
                  <span class="search-inner-name invoice-li-width">付费供应商：</span>
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
                               :chooseName.sync="injuSearchForm.paySuppName"
                               :chooseId.sync="injuSearchForm.paySuppId"
                               :clear="true" >
                  </sino-select>
                </li>
                <li  v-if="searchFlag" class="invoice-li">
                  <span class="search-inner-name invoice-li-width">客户名称：</span>
                  <sino-select class="fl" v-show="typeMan === 26"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :token="token"
                               :url="custInfoSelectBox"
                               :chooseName.sync="injuSearchForm.custName"
                               :chooseId.sync="injuSearchForm.custId"
                               :clear="true"
                  >
                  </sino-select>
                  <sino-select class="fl" v-show="typeMan !== 26"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :token="token"
                               :url="apiPath.hrsc.findCustInfoSelectBoxAll"
                               :chooseName.sync="injuSearchForm.custName"
                               :chooseId.sync="injuSearchForm.custId"
                               :clear="true"
                  >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">业务部门：</span>
                  <sino-select class="fl"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :token="token"
                               :url="findOrgSelectBoxInfo"
                               :chooseName.sync="injuSearchForm.busiDepName"
                               :chooseId.sync="injuSearchForm.busiDepId"
                               :clear="true"
                               @change="busiDepChange"
                  >
                  </sino-select>
                </li>
                <li  v-if="searchFlag">
                  <span class="search-inner-name">业务员：</span>
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
                               :chooseName.sync="injuSearchForm.busiPerName"
                               :chooseId.sync="injuSearchForm.busiPerId"
                               :clear="true" >
                  </sino-select>
                </li>

              </ul>
            </div>
            <div class="search-button">
              <div class="search-button-box">
                <sino-button type="primary" @click="searchFun">查 询</sino-button>
                <sino-button class="ressetButton" @click="resetFun(this.injuSearchForm)" v-if="searchFlag">重 置</sino-button>
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
        <!--Search result -->
        <div class=" sino-table-total mt15">
          <div class="sino-table-icon bs-none">
            <div class="sino-table-icon-left">
              <sino-button class="fl" type="icon-text" @click="record" v-if="this.typeMan == 26 || this.typeMan == 5"><i class="iconfont sino-qian"></i>工伤备案
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="applyFun" v-if="this.typeMan == 26 || this.typeMan == 5"><i class="iconfont sino-daoru"></i>认定申请
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="commitFun" v-if="this.typeMan == 26 || this.typeMan == 5"><i class="iconfont sino-daoru"></i>提交申请
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="send" v-if="this.typeMan == 26"><i class="iconfont sino-daoru"></i>送社保
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="pass" v-if="this.typeMan == 26"><i class="iconfont sino-daoru"></i>审核通过
              </sino-button>
              <sino-button class="fl" type="icon-text" @click="exportFile" v-if="this.typeMan == 26 || this.typeMan == 5"><i class="iconfont sino-download-copy fs19"></i>导出
              </sino-button>
            </div>
          </div>
          <sino-table :data="tableData" max-height="416" v-on:select="selectCallBack2" @select-all="selectAllBack" v-on:viewAll="viewAll" border stripe>
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="empName" label="雇员姓名" min-width="180"></sino-table-column>
            <sino-table-column prop="certNo" label="证件号码" min-width="180"></sino-table-column>
            <sino-table-column prop="handleStateName" label="办理进度" min-width="120"></sino-table-column>
            <sino-table-column prop="injRecName" label="备案情况" min-width="105"></sino-table-column>
            <sino-table-column prop="injIdenDelayedName" label="延时申请情况" min-width="105"></sino-table-column>
            <sino-table-column prop="delayedEndDate" label="延时截止日期" min-width="120"></sino-table-column>
            <sino-table-column prop="injIdenResultName" label="工伤认定结果" min-width="120"></sino-table-column>
            <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="paySuppName" label="付费供应商" min-width="180"></sino-table-column>
            <sino-table-column prop="busiDepName" label="负责业务部门" min-width="180"></sino-table-column>
            <sino-table-column prop="busiPerName" label="业务员" min-width="180"></sino-table-column>
            <sino-table-column prop="creName" label="经办人" min-width="180"></sino-table-column>
            <sino-table-column type="hidden" prop="injIdenId" width="0"></sino-table-column>
            <sino-table-column label="操作" align="center" width="280" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="particular(scope.row)">查看</span><i class="table-i"  v-if="scope.row.handleState===1 || scope.row.handleState===4">|</i>
                  <span class="table-span"  @click="modifyFun(scope.row)" v-if="scope.row.handleState===1 || scope.row.handleState===4">修改</span><i class="table-i"  v-if="scope.row.handleState===1 || scope.row.handleState===2 || scope.row.handleState===4">|</i>
                  <span class="table-span"  @click="delay(scope.row)" v-if="scope.row.handleState===1 || scope.row.handleState===2 || scope.row.handleState===4">延时申请</span><i class="table-i" v-if="scope.row.handleState===7">|</i>
                  <span class="table-span"  @click="provide(scope.row)" v-if="scope.row.handleState===7">发放认定书</span><i class="table-i" v-if="(scope.row.handleState===2 || scope.row.handleState===3) && typeMan == 26 && scope.row.handleState!==8" >|</i>
                  <span class="table-span"  @click="noPass(scope.row)" v-if="(scope.row.handleState===2 || scope.row.handleState===3) && typeMan == 26 && scope.row.handleState!==8">审核不通过</span><i class="table-i"v-if="scope.row.handleState===6 && typeMan == 26">|</i>
                  <span class="table-span"  @click="backspaceF(scope.row)" v-if="scope.row.handleState===6 && typeMan == 26">回填结果</span><i class="table-i" v-if="scope.row.handleState===4 " >|</i>
                  <span class="table-span"  @click="giveUp(scope.row)" v-if="scope.row.handleState===4" >放弃认定</span>
                </template>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page :page="page.pageNum"
                     v-bind:page-size="page.pageSize"
                     :pageArray="page.pageArray"
                     v-bind:object="object"
                     v-on:pagehandler="pageHandlerB"
                     v-on:choosePageFun="choooseNumB"
                     :total="page.total"></sino-page>
        </div>
      </div>
      <!--put on records dialog（备案弹层）-->
      <sino-dialog style="min-height: 490px;" :visible.sync="recflage" top="5%" size="samll"  dialogHide class="accuman-add-layer clearPadding"  v-on:close="cleanContent('recForm')">
        <sino-title slot="title" type="levelOne" title="工伤备案" class="sino-dialog-title"></sino-title>
        <div class="leadsAdd-form marginTop20 sino-con-more">
          <sino-form  :model="recForm" ref="recForm" :rules="recRules" class="leadsAdd-Form">
            <sino-form-item label="雇员姓名：" prop="empName">
              <sino-input v-model="recForm.empName" type="text"></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" prop="certNo" >
              <sino-input  v-model="recForm.certNo" @blur="getSinsArea(recForm.certNo)"></sino-input>
            </sino-form-item>
            <sino-form-item  label="工伤发生日期：" prop="injDate">
              <sino-date-picker
                type="date"
                v-model="recForm.injDate"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="社保执行地区："  class="h25" prop="sinsAreaName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :autoChoose="true"
                           :linkage="true"
                           :url="findAreaIdSelectBoxByEmpNameCertNo"
                           :chooseName.sync="recForm.sinsAreaName"
                           :chooseId.sync="recForm.sinsAreaId"
                           :data="sinsData"
                           @change="aaChange(recForm.sinsAreaId)"
                           :clear="true"
                            >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="付费供应商："   class="h25 sino-form-item-width" prop="paySuppName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :linkage="true"
                           :autoChoose="true"
                           :url="findCertNoAndAreaId"
                           :data="paySuppData"
                           :chooseName.sync="recForm.paySuppName"
                           :chooseId.sync="recForm.paySuppId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="客户名称："  class="h25 sino-form-item-width" prop="custName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :token="token"
                           :url="findCustSelectBoxByCertNoAndAreaId"
                           :data="custData"
                           :linkage="true"
                           :autoChoose="true"
                           :chooseName.sync="recForm.custName"
                           :chooseId.sync="recForm.custId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <!-- 其它信息 -->
            <sino-title type="levelTwo" title="上传文件" :style="{'overflow':'hidden'}"></sino-title>
            <div class="upload updata-box">
              <sino-auto-table :data="recForm.injRecMatList"  width="100%" stripe border>
                <sino-table-column type="selection"  width="50"></sino-table-column>
                <sino-table-column prop="confMatName" label="所需材料" align="left"></sino-table-column>
                <sino-table-column prop="matEncId" label="已上传文件" align="center">
                  <template scope="scope" v-if="scope.row.oper == true">
                    <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                    <span class="i-color" v-if="scope.row.matName" @click="deleFileFun(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                  </template>
                </sino-table-column>
                <sino-table-column label="操作" align="center" width="80">
                  <template scope="scope" v-if="scope.row.oper == true">
                    <sino-upload
                      ref="layUpload"
                      :action="uploadFilePublic"
                      :show-file-list="false"
                      :auto-upload="true"
                      :on-change="getFileName2"
                      :on-success="fileSuccess2"
                      :on-error="fileError2"
                    >
                      <div slot="trigger">
                        <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                      </div>
                    </sino-upload>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-input class="clearBoderTop" type="textarea"  v-model="recForm.remark"></sino-input>
            </div>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm('recForm')">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--认定弹层-->
      <sino-dialog :visible.sync="injIdenflage" top="5%" size="samll"  dialogHide class="accuman-add-layer clearPadding cle-sty" v-on:close="cleanContent('denForm')">
        <sino-title slot="title" type="levelOne" title="工伤认定申请" class="sino-dialog-title"></sino-title>
        <div class="suppcont-tip fl positionF" v-if="denForm.injRec === 2 && denForm.sinsAreaId === 2110751">
          <i class="iconfont sino-tip"></i><span>您所在的 <b class="fontStyle2">遵义地区</b> 需要先进行“工伤备案”后才可以进行“工伤认定申请”</span>
        </div>
        <div class="leadsAdd-form marginTop20 sino-con-more" :class="{ 'mt55': denForm.sinsAreaId === 2110751 && denForm.injRec === 2}">
          <sino-form :model="denForm" ref="denForm" :rules="denFormRules" class="leadsAdd-Form">
            <sino-form-item label="雇员姓名：" prop="empName">
              <sino-input v-model="denForm.empName" type="text"></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" prop="certNo" >
              <sino-input  v-model="denForm.certNo" @blur="getSinsArea2(denForm.certNo)"></sino-input>
            </sino-form-item>
            <sino-form-item label="备案情况：" prop="injRec">
              <sino-radio-group  v-model.number="denForm.injRec">
                <sino-radio v-for="(item, index) in injList" :key="index"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-radio-group>
            </sino-form-item>
            <sino-form-item label="社保执行地区："  class="h25" prop="sinsAreaName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :linkage="true"
                           :autoChoose="true"
                           :url="findAreaIdSelectBoxByEmpNameCertNo"
                           :chooseName.sync="denForm.sinsAreaName"
                           :chooseId.sync="denForm.sinsAreaId"
                           :data="sinsData2"
                           @change="aaChange2(denForm.sinsAreaId)"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="付费供应商："   class="h25 sino-form-item-width" prop="paySuppName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findCertNoAndAreaId"
                           :data="paySuppData2"
                           :linkage="true"
                           :autoChoose="true"
                           :chooseName.sync="denForm.paySuppName"
                           :chooseId.sync="denForm.paySuppId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="客户名称："  class="h25 sino-form-item-width" prop="custName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :token="token"
                           :url="findCustSelectBoxByCertNoAndAreaId"
                           :data="custData2"
                           :linkage="true"
                           :autoChoose="true"
                           :chooseName.sync="denForm.custName"
                           :chooseId.sync="denForm.custId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="工伤类型：" class="h25 " prop="injTypeName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code: 'INJ_TYPE'}"
                           :chooseName.sync="denForm.injTypeName"
                           :chooseId.sync="denForm.injType"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="工伤发生日期：" prop="injDate">
              <sino-date-picker
                type="date"
                v-model="denForm.injDate"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="材料收取日期：" prop="idenMatTime">
              <sino-date-picker
                type="date"
                v-model="denForm.idenMatTime"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="递交材料人姓名："  prop="applyName">
              <sino-input v-model="denForm.applyName" ></sino-input>
            </sino-form-item>
            <sino-form-item label="递交材料人电话："  prop="applyTel">
              <sino-input v-model="denForm.applyTel" ></sino-input>
            </sino-form-item>
            <sino-form-item label="工伤经过："  class="sino-form-item-width" prop="injDesc">
              <sino-input  type="textarea"  v-model="denForm.injDesc" ></sino-input>
            </sino-form-item>
            <!-- 其它信息 -->
            <sino-title  type="levelTwo" title="上传文件" :style="{'overflow':'hidden'}"></sino-title>
            <div v-if="denForm.injIdenMatList != ''" class="upload updata-box">
              <sino-auto-table  :data="denForm.injIdenMatList"  width="100%" stripe border>
                <sino-table-column type="selection"  width="50"></sino-table-column>
                <sino-table-column prop="confMatName" label="所需材料" align="left"></sino-table-column>
                <sino-table-column prop="matEncId" label="已上传文件" align="center">
                  <template scope="scope" v-if="scope.row.oper == true">
                    <input class="mater-style" :readonly="true" v-model="scope.row.matName"/>
                    <span class="i-color" v-if="scope.row.matName" @click="deleFileFun(scope.$index)"><i class="iconfont sino-reduce"></i></span>
                  </template>
                </sino-table-column>
                <sino-table-column label="操作" align="center" width="80">
                  <template scope="scope" v-if="scope.row.oper == true">
                    <sino-upload
                      ref="layUpload2"
                      :action="uploadFilePublic"
                      :show-file-list="false"
                      :auto-upload="true"
                      :on-change="getFileName1"
                      :on-success="fileSuccess1"
                      :on-error="fileError1"
                    >
                      <div slot="trigger">
                        <div class="chooseFileButton uploa-but-style" @click="currentUploadFun(scope.row, scope.$index)">上传</div>
                      </div>
                    </sino-upload>
                  </template>
                </sino-table-column>
              </sino-auto-table>
              <sino-input class="clearBoderTop" type="textarea"  v-model="denForm.remark"></sino-input>
            </div>
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm('denForm')">保 存</sino-button>
          <sino-button @click="sendFile">提 交</sino-button>
      </span>
      </sino-dialog>
      <!--delay apply for-->
      <sino-dialog :visible.sync="conFlag" size="small" class="leads-follow dialog-item"  @close ="cleanContent('delayForm')">
        <sino-title slot="title" type="levelOne" title="延时申请" class="sino-dialog-title"></sino-title>
        <sino-form   :model="delayForm" ref="delayForm" :rules="delayRules" class="delayStyle">
          <sino-form-item label="提交日期："  class="search-inner-item" prop="applyDelayedDate">
            <sino-date-picker
              type="date"
              v-model="delayForm.applyDelayedDate"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item label="延时天数："  class="search-inner-item " prop="num">
            <sino-input  v-model="delayForm.num" disabled></sino-input>
          </sino-form-item>

        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="dalayFun">提 交</sino-button>
      </span>
      </sino-dialog>
      <!--provide （发放认定书）-->
      <sino-dialog :visible.sync="provideBook" top="5%" size="samll"  class="accuman-add-layer clearPadding"  @close ="cleanContent('provideBookForm')">
        <sino-title slot="title" type="levelOne" title="发放认定书" class="sino-dialog-title"></sino-title>
        <div class="leadsAdd-form marginTop20 sino-con-more" >
          <sino-form :model="provideBookForm" ref="provideBookForm" :rules="provideBookRules" class="leadsAdd-Form">
            <sino-form-item label="雇员姓名：" prop="empName">
              <sino-input  disabled v-model="provideBookForm.empName"></sino-input>
            </sino-form-item>
            <sino-form-item label="证件号码：" prop="certNo">
              <sino-input  disabled v-model="provideBookForm.certNo"></sino-input>
            </sino-form-item>
            <sino-form-item label="领取人：" prop="issuePerName">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :url="getDictSelectBox"
                           :data="{code: 'ISSUE_PER'}"
                           :isGroup="false"
                           :clear="true"
                           :chooseName.sync="provideBookForm.issuePerName"
                           :chooseId.sync="provideBookForm.issuePer"
              >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="领取人签名："  class="sino-form-item-width" prop="issueSignId">
              <div class="sign-container" @click="openSignFun">
                <img :src="provideBookForm.issueSignId" v-if="provideBookForm.issueSignId"/>
              </div>
            </sino-form-item>
            <!--<sino-form-item label="领取人签名："  class="sino-form-item-width" prop="issueSignId">-->
              <!--<sino-input  type="textarea" v-model="provideBookForm.issueSignId"></sino-input>-->
            <!--</sino-form-item>-->
          </sino-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="procideBookFun">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--give up book-->
      <sino-dialog :visible.sync="giveUpBook" size="small" class="leads-follow dialog-item"  @close ="cleanContent('giveUpBookForm')">
        <sino-title slot="title" type="levelOne" title="放弃认定" class="sino-dialog-title"></sino-title>
        <sino-form  class="demo-ruleForm" :model="giveUpBookForm" ref="giveUpBookForm" :rules="giveUpBookRules">
          <sino-form-item label="放弃原因："  class="search-inner-item" prop="giveUpDesc">
            <sino-input type="textarea" v-model="giveUpBookForm.giveUpDesc"></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="giveUpBookFun">提 交</sino-button>
      </span>
      </sino-dialog>
      <!--no pass （审核不通过以及送社保）-->
      <sino-dialog :visible.sync="noPassDialog" size="small" class="leads-follow dialog-item" @close="cleanContent('noPassForm')">
        <sino-title slot="title" type="levelOne" :title="stackTitle" class="sino-dialog-title"></sino-title>
        <sino-form style="overflow: hidden" class="demo-ruleForm delayStyle" :model="noPassForm" ref="noPassForm" :rules="noPassRules" >
            <sino-form-item style="margin-left: 86px; overflow: hidden;"  :label="stackLable" class="search-inner-item" prop="declSinsDate">
            <sino-date-picker type="date"
                              v-model="noPassForm.declSinsDate"
                              :editable="false"
                              :readonly="false"
                              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item style="margin-left: 86px; overflow: hidden;" label="不通过原因：" v-if="stackTitle==='审核不通过'" class="search-inner-item " prop="eavFailDesc">
            <sino-input type="textarea" v-model="noPassForm.eavFailDesc"></sino-input>
          </sino-form-item>
          <sino-form-item style="margin-left: 86px; overflow: hidden;" label="办理人：" v-if="stackTitle==='送社保'" class="search-inner-item " prop="declPer">
            <sino-input v-model="noPassForm.declPer"></sino-input>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="sendFun" >提 交</sino-button>
      </span>
      </sino-dialog>
      <!--backspace (反回结果)-->
      <sino-dialog :visible.sync="backspace" top="5%" size="samll" dialogHide  class="accuman-add-layer clearPadding" @close="cleanContent('backspaceForm')">
        <sino-title slot="title" type="levelOne" title="回填结果"class="sino-dialog-title"></sino-title>
        <div class="leadsAdd-Form marginTop20 sino-con-more">
          <sino-form  class="leadsAdd-form" :model="backspaceForm"  :rules="backspaceRules"  ref="backspaceForm">
            <sino-form-item label="工伤认定结果："  prop="injIdenResult">
              <sino-radio-group  v-model.number="backspaceForm.injIdenResult">
                <sino-radio v-for="(item, index) in injIdenResList" :key="index"
                            :label="item.id">{{item.title}}</sino-radio>
              </sino-radio-group>
            </sino-form-item>
            <sino-form-item label="认定日期：" prop="idenDate">
              <sino-date-picker
                type="date"
                v-model="backspaceForm.idenDate"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
            </sino-form-item>
            <sino-form-item label="上传文件："  prop="injIdenResultFileName">
              <sino-upload
                class="upload-demo"
                :action="uploadFilePublic"
                :show-file-list="false"
                :auto-upload="true"
                :on-change="getFileName"
                :on-success="fileSuccess"
                :on-error="fileError"
              >
                <div slot="trigger">
                  <input class="uploadFileBox" type="text" v-model="backspaceForm.injIdenResultFileName" readonly="true" />
                  <button class="chooseFileButton">上传</button>
                </div>
              </sino-upload>
            </sino-form-item>
            <sino-form-item label="备注："  class="sino-form-item-width" prop="remark">
              <sino-input type="textarea" v-model="backspaceForm.remark"></sino-input>
            </sino-form-item>
          </sino-form>
        </div>

        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="backspaceFun">提 交</sino-button>
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
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  import LZString from 'lz-string';
  let checkedArr = [];
  let checkImgFileType = function (file, _this) {
    let _s = file.raw.type.split("/")[1];
    let _arr = ['jpg', 'png', 'bmp', 'jpeg', 'pdf', 'JPG', 'PNG', 'BMP', 'JPEG', 'PDF'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  export default {
    data () {
      return {
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        custInfoSelectBox: this.apiPath.hrsc.custInfoSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        findSalesmanSelectBox: this.apiPath.hrsc.findSalesmanSelectBox,
        findOrgSelectBoxInfo: this.apiPath.author.findOrgSelectBoxInfo,
        findUserByOrgIdAndRoleType: this.apiPath.author.findUserByOrgIdAndRoleType,
        findCertNoAndAreaId: this.apiPath.hrsc.findCertNoAndAreaId,
        findAreaIdSelectBoxByEmpNameCertNo: this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo,
        findCustSelectBoxByCertNoAndAreaId: this.apiPath.hrsc.findCustSelectBoxByCertNoAndAreaId,
        token: Cookies.get('Token'),
        typeMan: Cookies.get('roleType'), // yw 5 ceshi 12
        creIdNameData: {
          orgId: undefined,
          roleTypes: [5]
        },
        sinsData: {},
        sinsData2: {},
        paySuppData: {
          areaId: '',
          certNo: ''
        },
        paySuppData2: {
          areaId: '',
          certNo: ''
        },
        areaData: {data: {areaTypes: [4, 5]}, title: ''},
        custData: {
          certNo: '',
          areaId: ''
        },
        custData2: {
          certNo: '',
          areaId: ''
        },
        injList: [],
        injIdenResList: [],
        injuSearchForm: {
          empName: '', // 姓名
          certNo: '', // 证件号
          sinsAreaName: '',
          sinsAreaId: '', // 社保
          injRec: '', // 备案情况
          injRecName: '',
          custId: '', // 客户ID
          custName: '', // 客户名字
          paySuppId: '', // 付费供应商
          paySuppName: '',
          handleStateList: [], // 办理进度
          handleStateName: [],
          injIdenDelayedName: '', // 延时申请情况
          injIdenDelayed: '',
          busiPerName: '', // 业务员
          busiPerId: '',
          busiDepName: '', // 业务部门
          busiDepId: ''
        },
        searchFlag: false,
        conFlag: false,
        giveUpBook: false,
        noPassDialog: false,
        backspace: false,
        backspaceForm: {
          injIdenId: '',
          injIdenResult: '',
          idenDate: '',
          injIdenResultFileName: '',
          injIdenResultFileId: '', // weiyihao
          remark: ''
        },
        btnText: '',
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        provideBook: false,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        stackTitle: '',
        stackLable: '',
        recForm: {
          empName: '', // 雇员姓名
          certNo: '', // 证件号码
          injDate: '', // 工伤发生日期
          sinsAreaId: '', // 社保执行地
          sinsAreaName: '',
          paySuppId: '', // 付费供应商
          paySuppName: '',
          custName: '', // 客户名称
          custId: '',
          injType: 1, // 工伤类型
          injTypeName: '因工受伤',
          idenMatTime: '', // 材料收取日期
          injRec: '', // 备案情况
          injRecName: '', // 备案情况
          applyName: '', // 递交材料人姓名
          applyTel: '', // 递交材料人电话
          injDesc: '', // 工伤经过
          injIdenMatList: null,
          injRecMatList: null,
          remark: '',
          handleState: '' // 点击按钮的状态
        },
        denForm: {
          empName: '', // 雇员姓名
          certNo: '', // 证件号码
          injDate: '', // 工伤发生日期
          sinsAreaId: '', // 社保执行地
          sinsAreaName: '',
          paySuppId: '', // 付费供应商
          paySuppName: '',
          custName: '', // 客户名称
          custId: '',
          injType: 1, // 工伤类型
          injTypeName: '因工受伤',
          idenMatTime: '', // 材料收取日期
          injRec: null, // 备案情况
          injRecName: '', // 备案情况
          applyName: '', // 递交材料人姓名
          applyTel: '', // 递交材料人电话
          injDesc: '', // 工伤经过
          injIdenMatList: null,
          injRecMatList: null,
          remark: '',
          injRecId: null,
          handleState: '' // 点击按钮的状态
        },
        routerView: false,
        provideBookForm: {
          empName: '',
          certNo: '',
          issuePer: '',
          issueSignId: '',
          injIdenId: '',
          issuePerName: ''
        },
        tableData: null, // 表格数据
        recflage: false,
        injIdenflage: false,
        alertTitle: '',
        matName: '',
        activeRow: '',
        noPassForm: {
          injIdenId: '', // 工伤认定ID
          declSinsDate: '', // 请选择时间
          declPer: Cookies.get('CPYY-INFO-NAME'), // 办理人
          eavFailDesc: ''
        },
        delayForm: {
          applyDelayedDate: '', // 提交日期
          num: '30', // 天数
          injIdenId: '' // 工伤ID
        },
        giveUpBookForm: {
          giveUpDesc: '', // 放弃原因
          injIdenId: ''
        },
        recRemark: '',
        backspaceRules: {
          idenDate: [{type: 'date', required: true, message: '请输入认定日期', trigger: 'change'}],
          injIdenResult: [{type: 'number', required: true, message: '请输入工伤认定结果', trigger: 'change'}]
        },
        noPassRules: {
          declSinsDate: [{type: 'date', required: true, message: '请选择日期', trigger: 'change'}],
          eavFailDesc: [{required: true, message: '请输入不通过原因', trigger: 'change'}],
          declPer: [{required: true, message: '请输入办理人', trigger: 'change'}]
        },
        giveUpBookRules: {
          giveUpDesc: [{required: true, message: '请输入放弃原因', trigger: 'change'}]
        },
        provideBookRules: {
          issuePerName: [{required: true, message: '请输入领取人', trigger: 'change'}],
          issueSignId: [{required: true, message: '请输入领取人签名', trigger: 'change'}]
        },
        delayRules: {
          applyDelayedDate: [{type: 'date', required: true, message: '请选择提交日期', trigger: 'change'}]
        },
        denFormRules: {
          empName: [{required: true, message: '请输入雇员姓名', trigger: 'change'}],
          certNo: [{required: true, message: '请输入证件号码', trigger: 'change'},
                    {validator: this.validator.checkcerNoCode, trigger: 'change'}],
          sinsAreaName: [{required: true, message: '请输入社保执行地', trigger: 'change'}],
          paySuppName: [{required: true, message: '请输入付费供应商', trigger: 'change'}],
          custName: [{required: true, message: '请输入客户名称', trigger: 'change'}],
          injTypeName: [{required: true, message: '请输入工伤类型', trigger: 'change'}],
          idenMatTime: [{type: 'date', required: true, message: '请输入材料收取日期', trigger: 'change'}],
          injDate: [{type: 'date', required: true, message: '请选择工伤发生日期', trigger: 'change'}],
          applyName: [{required: true, message: '请输入递交材料人姓名', trigger: 'change'}],
          applyTel: [{required: true, message: '请输入材料人电话', trigger: 'change'},
            {validator: this.validator.checkTelAndphone, trigger: 'change'}],
          injRec: [{type: 'number', required: true, message: '请输入备案情况', trigger: 'change'}]
        },
        recRules: {
          empName: [{required: true, message: '请输入雇员姓名', trigger: 'change'}],
          certNo: [{required: true, message: '请输入证件号码', trigger: 'change'},
            {validator: this.validator.checkcerNoCode, trigger: 'change'}],
          injDate: [{type: 'date', required: true, message: '请输入工伤发生日期', trigger: 'change'}],
          sinsAreaName: [{required: true, message: '请输入社保执行地', trigger: 'change'}],
          paySuppName: [{required: true, message: '请输入付费供应商', trigger: 'change'}],
          custName: [{required: true, message: '请输入客户名称', trigger: 'change'}]
        },
        flag: true,
        statusData: {
          submitted: 0, // 待提交
          toBeSentSocialSecurity: 0, // 待送社保
          socialSecurityAudit: 0, // 待社保审核
          notPassed: 0, // 审核不通过
          paymentConfirm: 0, // 待发放认定书
          receiveConfirm: 0 // 待领取认定书
        },
        ssssss: '',
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
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/injuryidentifybusi" || val.path === "/injuryidentifybusiA") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    mounted () {
      if (Number(this.typeMan) === 5) {
        this.injuSearchForm.handleStateList = [1, 4, 7];
        this.injuSearchForm.handleStateName = ['待提交', '审核不通过', '待发放认定书'];
      }
      if (Number(this.typeMan) === 26) {
        this.injuSearchForm.handleStateName = ['待提交', '待送社保', '待社保审核', '审核不通过', '待领取认定书', '办理完成'];
        this.injuSearchForm.handleStateList = [1, 2, 3, 4, 6, 8];
      }
      this.searchFun();
      this.statusDataFun();
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 领取人签字
      openSignFun () {
        this.signFlag = true;
      },
      // 保存
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
      signClose () {
        this.clearSign();
      },
      clearSign () {
        this.context.clearRect(0, 0, 503, 150);
        this.base64Str = '';
      },
      // 签名保存
      signSave () {
        this.base64Str = this.canvas.toDataURL("image/png", 0.5);
        this.provideBookForm.issueSignId = this.base64Str;
        this.signFlag = false;
      },
      // 最上面的状态数据
      statusDataFun () {
        let type = null;
        if (this.typeMan == 5) {
          type = 2;
        }
        if (this.typeMan == 26) {
          type = 1;
        }
        api.post(this.apiPath.sins.countInjIdenData, {type: type}).then(res => {
          if (res.code === 'CPYY-00001') {
            for (let key in this.statusData) {
              this.statusData[key] = res.data.data[key];
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      aaChange (item1) {
        let _this = this;
        let aaa = JSON.parse(JSON.stringify(this.recForm));
        this.paySuppData.areaId = '';
        this.custData.areaId = '';
        this.paySuppData.areaId = this.recForm.sinsAreaId;
        this.paySuppData.certNo = this.recForm.certNo;
        this.custData.certNo = this.recForm.certNo;
        this.custData.areaId = this.recForm.sinsAreaId;
        let obj = {
          confUse: 1,
          dimen: 1,
          dimenValue: item1
        };
        if (item1) {
          api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.matConfs) {
                res.data.matConfs.forEach(function (item) {
                  delete item.matConfId;
                  item.matEncId = '';
                  item.matName = '';
                  /* 文件上传的名字 */
                });
              }
              this.recForm.injRecMatList = res.data.matConfs;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.denForm.injIdenMatList = null;
          this.recForm.injRecMatList = null;
        }
      },
      aaChange2 (item1) {
        let _this = this;
        let aaa = JSON.parse(JSON.stringify(this.denForm));
        this.paySuppData2.areaId = '';
        this.custData2.areaId = '';
        this.paySuppData2.areaId = aaa.sinsAreaId;
        this.paySuppData2.certNo = aaa.certNo;
        this.custData2.certNo = aaa.certNo;
        this.custData2.areaId = aaa.sinsAreaId;
        let obj2 = {
          confUse: 2,
          dimen: 1,
          dimenValue: item1
        };
        if (item1) {
          api.post(this.apiPath.hrsc.findMatConfByDimenAndConfUse, obj2).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.matConfs) {
                res.data.matConfs.forEach(function (item) {
                  delete item.matConfId;
                  item.matEncId = '';
                  item.matName = ''; /* 文件上传的名字 */
                });
              }
              this.denForm.injIdenMatList = res.data.matConfs;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.denForm.injIdenMatList = null;
          this.recForm.injRecMatList = null;
        }
      },
      /* 获取备案情况的请求字典 */
      injFun () {
        api.post(this.getDictSelectBox, {code: 'INJ_REC'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.injList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
        api.post(this.getDictSelectBox, {code: 'INJ_IDEN_RESULT'}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.injIdenResList = res.data.list;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 关闭弹层的回调 */
      recordClose () {
        this.$refs.recForm.resetFields();
        this.$refs.noPassForm.resetFields();
        this.recForm.injIdenMatList = null;
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
        this.$refs[formName].injType = 1;
        this.$refs[formName].injTypeName =  '因工受伤';
        this.recForm.remark =  '';
        this.recForm.injRecMatList = null;
        this.denForm.injIdenMatList = null;
      },
      busiDepChange () {
        this.creIdNameData.orgId = this.injuSearchForm.busiDepId;
      },
      // 获取全部表格数据
      viewAll () {
        this.searchFun();
      },
      ruoteJudge () {
        if (this.$route.path !== "/injuryidentifybusi" && this.$route.path !== "/injuryidentifybusiA") {
          this.routerView = true;
        }
      },
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
      record () {
        this.recflage = true;
      },
      applyFun () {
        this.injIdenflage = true;
        this.injFun();
      },
      choooseNumB: function (pageSize) {
        this.page.pageSize = pageSize;
        this.getTableList(1, pageSize);
      },
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        // console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName1 (file) {
        if (checkImgFileType(file, this)) {
          this.denForm.injIdenMatList[this.activeRow].matName = file.name;
        } else {
          this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          this.$refs.layUpload2.clearFiles();
        }
      },
      getFileName2 (file) {
        if (checkImgFileType(file, this)) {
          this.recForm.injRecMatList[this.activeRow].matName = file.name;
        } else {
          this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
          this.$refs.layUpload.clearFiles();
        }
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.backspaceForm.injIdenResultFileName = file.name;
        } else {
          this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
        }
      },
      fileSuccess1 (res, file) {
        if (checkImgFileType(file, this)) {
          if (res.code === 'CPYY-00001') {
            this.denForm.injIdenMatList[this.activeRow].matEncId = res.data;
            this.backspaceForm.injIdenResultFileId = res.data;
            // this.$alert('上传成功！', '温馨提示', {
            //   confirmButtonText: '确 定',
            //   type: 'info', // icon图标类型
            //   dragFlag: true,
            //   customClass: '', // 添加class
            //   lockScroll: true,
            //   callback: action => {
            //   }
            // });
          } else {
            this.denForm.injIdenMatList[this.activeRow].matName = '';
          }
        }
        return;
      },
      fileSuccess2 (res, file) {
        if (checkImgFileType(file, this)) {
          if (res.code === 'CPYY-00001') {
            this.recForm.injRecMatList[this.activeRow].matEncId = res.data;
            this.backspaceForm.injIdenResultFileId = res.data;
            // this.$alert('上传成功！', '温馨提示', {
            //   confirmButtonText: '确 定',
            //   type: 'info', // icon图标类型
            //   dragFlag: true,
            //   customClass: '', // 添加class
            //   lockScroll: true,
            //   callback: action => {
            //   }
            // });
          } else {
            this.recForm.injRecMatList[this.activeRow].matName = '';
          }
        }
        return;
      },
      fileSuccess (res, file) {
        if (checkImgFileType(file, this)) {
          if (res.code === 'CPYY-00001') {
            this.backspaceForm.injIdenResultFileId = res.data;
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
            this.backspaceForm.injIdenResultFileName = '';
          }
        }
        return;
      },
      fileError1 () {
        this.denForm.injIdenMatList[this.activeRow].matName = '';
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
      fileError2 () {
        this.recForm.injRecMatList[this.activeRow].matName = '';
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
      fileError () {
        this.backspaceForm.injIdenResultFileName = '';
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
      particular: function (data) {
        this.routerView = true;
        this.$router.push({path: '/injuryidentifybusi/injuryidentifyParticular', query: { injIdenId: data.injIdenId }});
      },
      modifyFun: function (data) {
        this.routerView = true;
        this.$router.push({path: '/injuryidentifybusi/injuryidentifyModify',  query: { injIdenId: data.injIdenId }});
      },
      delay: function (id) {
        this.delayForm.injIdenId = id.injIdenId;
        if (id.injIdenDelayed === 2) {
          this.conFlag = true;
          return;
        }
        this.$alert('此人已提交延时申请', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      provide: function (id) {
        if (id.handleState === 7) {
          let obj = {
            injIdenId: id.injIdenId
          };
          api.post(this.apiPath.sins.findInjEmpHandleAction, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.provideBook = true;
              this.provideBookForm.empName = res.data.empName;
              this.provideBookForm.certNo = res.data.certNo;
              this.provideBookForm.injIdenId = id.injIdenId;
              this.page.total = res.data.total;
            }
          }).catch(err => {
            console.log(err);
          });
          return;
        }
        this.$alert('请选择待发放鉴定书状态的数据！', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning',
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      giveUp: function (data) {
        this.giveUpBook = true;
        this.giveUpBookForm.injIdenId = data.injIdenId;
      },
      noPass: function (data) {
        this.stackTitle = '审核不通过';
        this.stackLable = '审核日期：';
        this.noPassDialog = true;
        this.noPassForm.injIdenId = data.injIdenId;
      },
      send () {
        if (checkedArr.length !== 0) {
          this.stackTitle = '送社保';
          this.stackLable = '送社保日期：';
          this.noPassDialog = true;
        } else {
          this.error();
        }
      },
      pass: function () {
        if (checkedArr.length !== 0) {
          this.stackTitle = '审核通过';
          this.stackLable = '审核日期：';
          this.noPassDialog = true;
        } else {
          this.error();
        }
      },
      backspaceF: function (data) {
        this.backspace = true;
        this.backspaceForm.injIdenId = data.injIdenId;
        this.injFun();
      },
      // 工伤备案（确认）
      searchFun () {
        this.page.pageNum = 1;
        this.getTableList(this.page.pageNum, this.page.pageSize);
      },
      pageHandlerB: function (page) {
        this.page.pageNum = page;
        this.getTableList(page, this.page.pageSize);
      },
      getTableList (pageNum, pageSize, all) {
        pageNum ?  '' : pageNum = this.page.pageNum;
        let obj = {
          data: this.injuSearchForm,
          pageNum: pageNum,
          pageSize: this.page.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.sins.findInjIdenHandleList, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.page.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      /* 清空表单所有数据的方法 */
      resetFun (item) {
        this.injuSearchForm = {
          empName: '', // 姓名
          certNo: '', // 证件号
          sinsAreaName: '',
          sinsAreaId: '', // 社保
          injRec: '', // 备案情况
          injRecName: '',
          custId: '', // 客户ID
          custName: '', // 客户名字
          paySuppId: '', // 付费供应商
          paySuppName: '',
          handleStateList: [], // 办理进度
          handleStateName: [],
          injIdenDelayedName: '', // 延时申请情况
          injIdenDelayed: '',
          busiPerName: '', // 业务员
          busiPerId: '',
          busiDepName: '', // 业务部门
          busiDepId: ''
        };
      },
      currentUploadFun (data, index) {
        this.activeRow = index;
      },
      submitForm (formName) {
        if (formName === 'recForm') {
          this.$refs.recForm.validate((valid) => {
            if (valid) {
              api.post(this.apiPath.sins.saveInjRecAction, this.recForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.recflage = false;
                  this.searchFun();
                  this.statusDataFun();
                  this.$message({message: '备案成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        } else if (formName === 'denForm') {
          this.$refs.denForm.validate((valid1) => {
            if (valid1) {
              this.denForm.handleState = 1;
              api.post(this.apiPath.sins.saveInjIdenAction, this.denForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.injIdenflage = false;
                  this.searchFun();
                  this.statusDataFun();
                  this.$message({message: '认定成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
      },
      sendFile () {
        this.$refs.denForm.validate((valid) => {
          if (valid) {
            this.denForm.handleState = 2;
            api.post(this.apiPath.sins.saveInjIdenAction, this.denForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.injIdenflage = false;
                this.searchFun();
                this.statusDataFun();
                this.$message({message: '认定成功！', type: 'success'});
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
      getSinsArea (val) {
        /* 通过证件号码获得姓名和地区 */
        if (val) {
          let _obj = {
            empName: this.recForm.empName,
            certNo: val,
            certType: 1,
            proPayId: 2,
            orderState: 1
          };
          this.sinsData = _obj;
          api.post(this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo, _obj).then(res => {
            if (res.code === 'CPYY-00001') {
              let sss = JSON.parse(JSON.stringify(res.data.list));
              this.recForm.empName = sss[0].empName;
              this.flag = false;
              return false;
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
      getSinsArea2 (val) {
        /* 通过证件号码获得姓名和地区 */
        if (val) {
          let _obj = {
            empName: this.denForm.empName,
            certNo: val,
            certType: 1,
            proPayId: 2,
            orderState: 1
          };
          this.sinsData2 = _obj;
          api.post(this.apiPath.hrsc.findAreaIdSelectBoxByEmpNameCertNo, _obj).then(res => {
            if (res.code === 'CPYY-00001') {
              let sss = JSON.parse(JSON.stringify(res.data.list));
              this.denForm.empName = sss[0].empName;
              this.flag = false;
              return false;
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
          api.post(this.apiPath.sins.findUnUsedInjRecAndDateByCertNo, {certNo: val}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.denForm.injRec = res.data.injRec;
              this.denForm.injDate = res.data.injDate;
              this.denForm.injRecId = res.data.injRecId;
              if (this.denForm.injDate) {
                this.denForm.injDate = new Date(this.denForm.injDate);
              }
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      selectCallBack2 (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
      },
      selectAllBack (selectTion, row) {
        let arr = [];
        for (let item of selectTion) {
          if (item.certNo) {
            arr.push(item);
          }
        }
        this.selectCallBack2(arr, row);
      },
      // 删除已经上传的文件
      deleFileFun (index) {
        this.denForm.injIdenMatList[index].matName = '';
      },
      // 删除备案已经上传的文件
      deleFilecopyFun (index) {
        this.recForm.injRecMatList[index].matName = '';
      },
      // 导出
      exportFile () {
        let injIdenList = [];
        if (checkedArr.length !== 0) {
          checkedArr.forEach(function (item, index) {
            injIdenList.push(item.injIdenId);
          });
          let obj = {
            injIdenIdList: injIdenList
          };
          api.post(this.apiPath.sins.importInjIdenTableAction, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
              checkedArr.splice(0, checkedArr.length);
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.error();
        }
      },
      /* 点击提交 */
      commitFun: function (data) {
        if (checkedArr.length > 0) {
          let obj = {
            injIdenList: checkedArr
          };
          api.post(this.apiPath.sins.submitInjApplyAction, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              checkedArr.length = 0;
              this.searchFun();
              this.statusDataFun();
              this.$message({message: '提交成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.error();
        }
      },
      sendFun () {
        this.$refs.noPassForm.validate((valid) => {
          if (valid) {
            let obj = {
              declSinsDate: this.noPassForm.declSinsDate,
              eavDate: this.noPassForm.declSinsDate,
              declPer: this.noPassForm.declPer,
              injIdenId: this.noPassForm.injIdenId,
              eavFailDesc: this.noPassForm.eavFailDesc,
              injIdenList: checkedArr
            };
            /* 点击送社保的提交 */
            if (this.stackTitle === '送社保') {
              api.post(this.apiPath.sins.checkSsbInjAction, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  checkedArr.length = 0;
                  this.searchFun();
                  this.statusDataFun();
                  this.noPassDialog = false;
                  this.$message({message: '送社保成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (this.stackTitle === '审核通过') {
              /* 审核通过 */
              api.post(this.apiPath.sins.checkSsbPassAction, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  checkedArr.length = 0;
                  this.searchFun();
                  this.statusDataFun();
                  this.noPassDialog = false;
                  this.$message({message: '操作成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else if (this.stackTitle === '审核不通过') {
              api.post(this.apiPath.sins.checkSsbNotPassAction, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.statusDataFun();
                  this.noPassDialog = false;
                  this.$message({message: '操作成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /* 延时申请 */
      dalayFun () {
        this.$refs.delayForm.validate((valid) => {
          if (valid) {
            if (this.delayForm.injIdenId) {
              api.post(this.apiPath.sins.injIdenDelayedApplyAction, this.delayForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.conFlag = false;
                  this.searchFun();
                  this.statusDataFun();
                  this.$message({message: '延时成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /* 发放认定书 */
      procideBookFun () {
        this.$refs.provideBookForm.validate((valid) => {
          if (valid) {
            if (this.provideBookForm) {
              this.provideBookForm.issueSignId = LZString.compress(this.provideBookForm.issueSignId);
              api.post(this.apiPath.sins.sendIssueSignAction, this.provideBookForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.provideBook = false;
                  this.searchFun();
                  this.statusDataFun();
                  this.$message({message: '发放成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /* 回填结果 */
      backspaceFun () {
        this.$refs.backspaceForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.sins.backAddResultAction, this.backspaceForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.backspace = false;
                this.searchFun();
                this.statusDataFun();
                this.$message({message: '回填成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      giveUpBookFun () {
        this.$refs.giveUpBookForm.validate((valid) => {
          if (valid) {
            if (this.giveUpBookForm) {
              api.post(this.apiPath.sins.giveUpDescAction, this.giveUpBookForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.giveUpBook = false;
                  this.searchFun();
                  this.statusDataFun();
                  this.$message({message: '放弃成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>
