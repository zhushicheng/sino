<template>
  <!--受托方导入-->
  <div>
    <div class="suppcont usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="受托方任务单导入"></sino-title>
        <sino-form :model="entImportForm" ref="entImportForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one li-wid">
                <sino-form-item label="签约供应商名称：" class="search-inner-item" prop="empName">
                  <sino-select class="fl"
                               :filterable="true"
                               :multiselect="false"
                               :isshowTotol="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="selectBox"
                               :token="token"
                               :chooseName.sync="entImportForm.signSuppName"
                               :chooseId.sync="entImportForm.signSuppId"
                               :clear="true" >
                  </sino-select>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box search-one-button-box">
              <sino-button type="primary" @click="searchFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>

      <div class="sup-content2 mt15">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-import"></i>导入</sino-button>
              <sino-button type="icon-text" @click="downloadFun"><i class="iconfont sino-download-copy"></i>下载模板</sino-button>
            </div>
          </div>
          <sino-table :data="tableData" stripe  v-on:viewAll="viewAll" max-height="416" border v-loading="entImportLoading" element-loading-text="拼命加载中">
            <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
            <sino-table-column prop="publishBatchId" label="发布批次"></sino-table-column>
            <sino-table-column prop="isIncludedTaskDetDict" label="完善产品"></sino-table-column>
            <sino-table-column prop="signSuppName" label="签约供应商名称" min-width="180"></sino-table-column>
            <sino-table-column label="总雇员" alignn="center">
              <template scope="scope">
                <span class="table-span" @click="detaiHand(scope.row,1)">{{scope.row.sumAmo}}</span>
              </template>
            </sino-table-column>
            <sino-table-column prop="addAmo" label="增加雇员" ></sino-table-column>
            <sino-table-column prop="reduceAmo" label="减少雇员"></sino-table-column>
            <sino-table-column prop="chanAmo" label="变更雇员"></sino-table-column>
            <sino-table-column prop="dispAmo" label="一次性收费雇员" min-width="120"></sino-table-column>
            <sino-table-column prop="isConfirmDict" label="是否已确认" min-width="95"></sino-table-column>
            <sino-table-column label="操作" align="center" width="320" fixed="right">
              <template scope="scope">
                <span class="table-span" :class="{isGray:acceptFlag}" @click="confiFun(scope.row)" v-if="scope.row.isIncludedTaskDet === 1 && scope.row.isConfirm !== 1 && scope.row.isShowButton === 1">接收</span><i v-if="scope.row.isIncludedTaskDet === 1 && scope.row.isConfirm !== 1 && scope.row.isShowButton === 1" class="table-i">|</i>
                <span class="table-span" v-if="scope.row.isConfirm !== 1  && scope.row.isIncludedTaskDet == 1 && scope.row.isShowButton === 1" @click="detaiHand(scope.row,2)">按明细处理</span><i class="table-i" v-if="scope.row.isConfirm !== 1 && scope.row.isIncludedTaskDet == 1 && scope.row.isShowButton === 1">|</i>
                <span class="table-span" @click="oldFileDownload(scope.row)">原文件</span><i class="table-i" v-if="scope.row.isIncludedAddEmpSimple === 1 && scope.row.isConfirm !== 1">|</i>
                <span class="table-span" @click="manageRisk(scope.row.publishBatchId, null,'')" v-if="scope.row.isIncludedAddEmpSimple === 1 && scope.row.isConfirm !== 1">维护产品</span><i class="table-i" v-if="scope.row.isShowDelete === 1">|</i>
                <span class="table-span" v-if="scope.row.isShowDelete === 1" @click="delFun(scope.row)">删除</span>
              </template>
            </sino-table-column>
          </sino-table>
          <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
        </div>
      </div>
      <!-- 原文件下载 -->
      <sino-dialog :visible.sync="fileDownloadFlag"  class="usermanage" size="large">
        <sino-title slot="title" type="levelOne" title="下载原文件" class="sino-dialog-title "></sino-title>
        <div class="sup-form">
          <sino-auto-table :data="filetableData" stripe v-on:viewAll="fileViewAll" max-height="416" border @select="selectTabelRow" @select-all="selectAll">
            <sino-table-column type="selection" width="60" align="center"></sino-table-column>
            <sino-table-column label="文件名" prop="fileName"></sino-table-column>
            <sino-table-column prop="creTime" label="上传时间"></sino-table-column>
          </sino-auto-table>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="fileDown">下 载</sino-button>
      </span>
      </sino-dialog>
      <!--导入-->
      <sino-dialog :visible.sync="importFormFlag" size="small" class="leads-follow dialog-item" @close="resetFun('importForm')">
        <sino-title slot="title" type="levelOne" title="导入" class="sino-dialog-title"></sino-title>
        <sino-form :model="importForm" ref="importForm" :rules="importFormRules" class="follow-select">
          <div class="follow-content">
            <sino-form-item label="模板类型：" prop="temTypeName" class="sup-Name">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code:'TASK_ENTRU_TEMP'}"
                           :chooseName.sync="importForm.temTypeName"
                           :chooseId.sync="importForm.tempType"
                           @change="importChange"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="选择模板：" prop="tempDetailTypeName" class="sup-Name">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :linkage="true"
                           :data="tempDetailTypeData"
                           :chooseName.sync="importForm.tempDetailTypeName"
                           :chooseId.sync="importForm.tempDetailType"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="签约供应商名称：" prop="signSuppName" class="sup-Name" v-if="importForm.tempType === 5">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="selectBox"
                           :token="token"
                           :chooseName.sync="importForm.signSuppName"
                           :chooseId.sync="importForm.signSuppId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="付费供应商名称：" prop="paySuppName" class="sup-Name" v-if="importForm.tempType === 5">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="selectBox"
                           :token="token"
                           :chooseName.sync="importForm.paySuppName"
                           :chooseId.sync="importForm.paySuppId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="导入文件：" prop="fileName" class="sup-Name" >
              <sino-upload
                ref="excelFile"
                :action="fileAction"
                :show-file-list="true"
                :auto-upload="true"
                :on-change="getFileName"
                :on-success="fileSuccess"
                :on-remove="fileRemove"
                :on-error="fileError"
              >
                <div slot="trigger">
                  <input type="hidden" readonly="true" v-model="importForm.fileId"/>
                  <input class="uploadFileBox" type="text" readonly="true" v-model="importForm.fileName"/>
                  <div class="chooseFileButton">上传</div>
                </div>
              </sino-upload>
            </sino-form-item>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" :disabled="grayDisFlag" @click="importSubmitFun">确 定</sino-button>
      </span>
      </sino-dialog>
      <sino-dialog :visible.sync="importVisible" size="small" class="remi-dialog">
        <sino-title slot="title" type="levelOne" title="导入结果" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-list">
          <ul class="usermanagement-ul">
            <li>
              <input type="hidden" v-model="importDetailForm.publishBatchId"/>
              <h6>导入文件名称</h6><span v-text="importDetailForm.fileName"></span>
            </li>
            <li>
              <h6>导入数据数量</h6><span>{{importDetailForm.totalCount}}<a v-if="importDetailForm.totalCount !== 0" href="javascript:void(0)" @click="remiAllDownload(importDetailForm.totalCountFileId)">下载</a></span>
            </li>
            <li>
              <h6>成功数量</h6><span>{{importDetailForm.successCount}}
              <!--<a v-if="importDetailForm.successCount !== 0" href="javascript:void(0)" @click="remiSuccDownload(importDetailForm.successCountFileId)">下载</a>-->
            </span>
            </li>
            <li>
              <h6>失败数量</h6><span>{{importDetailForm.failureCount}}<a v-if="importDetailForm.failureCount !== 0" href="javascript:void(0)" @click="remiFailDownload(importDetailForm.failureCountFileId)">下载</a></span>
            </li>
            <li class="li-last">
              <h6>导入人</h6><span v-text="importDetailForm.importUserName"></span>
            </li>
            <li class="li-last">
              <h6>导入时间</h6><span v-text="importDetailForm.importTime"></span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span v-if="importDetailForm.impTempType === 1">您有信息未完善</span><span v-if="importDetailForm.impTempType !== 1">您的信息已完善</span>
        </div>
        <sino-button type="primary" @click="impResFun(importDetailForm.publishBatchId)">确 定</sino-button>
          <!--<sino-button class="order-nextbtn" @click="mainProdoct" v-if="importDetailForm.impTempType !== 1">重新维护产品</sino-button>-->
      </span>
      </sino-dialog>
      <!-- 维护产品 -->
      <sino-dialog :visible.sync="supAdd"  class="mainte-product" size="large" :top="'5%'" @close="cleanContent('supAddForm')" >
        <sino-title slot="title" type="levelOne" title="维护产品信息" class="sino-dialog-title "></sino-title>
        <div class="sup-form">
          <div class="suppcont-tip fl">
            <i class="iconfont sino-tip"></i><span class="font-weight-num">本{{supAddNumForm.maintainProdFlag?'':'批'}}次共导入 <span v-text="supAddNumForm.succNum"></span> 条数据，涉及雇员 <span v-text="supAddNumForm.totalEmpNum"></span> 人，涉及客户 <span v-text="supAddNumForm.custNum"></span> 户</span>
          </div>
          <ul class="fl mainte-product-leftMenu">
            <li v-for="(list, index) in custList" :key="index" @click="custFun(list)">
              <i class="iconfont icon sino-badge-icon" :class="{'main-color': list.flag === 2, '': list.flag === 1}"></i>
              <h5 :title="list.custName" :class="{'maincolor': supAddForm.taskTemp.custId === list.custId, 'defaultcolor':supAddForm.taskTemp.custId !== list.custId }">{{list.custName}}</h5>
            </li>
          </ul>
          <div class="fl mainte-product-content">
            <sino-form :model="supAddForm" :rules="rules" ref="supAddForm">
              <ul class="sins-stan-ul clearfix" >
                <li class="sino-wind">
                  <sino-form-item label="客户名称：" class="search-inner-item">
                    <input type="hidden" v-model="custbatchId">
                    <input type="hidden" v-model="supAddForm.taskTemp.custId">
                    <sino-input class="fl" v-model="supAddForm.taskTemp.custName" :disabled="true"></sino-input>
                    <div class="sins-check">
                      <sino-checkbox v-model="supAddForm.taskTemp.isDoup" @change="checkChange(supAddForm.taskTemp.isDoup)">同步至其他未设置客户 </sino-checkbox>
                    </div>
                  </sino-form-item>
                </li>
                <li v-if="sinsPayFeeWayFlag">
                  <sino-form-item label="社保缴费方式：" class="search-inner-item" prop="taskTemp.sinsPayFeeWay" :rules="[{type: 'number', required: true, message: '社保缴费方式为必填项', trigger: 'change'}]">
                    <span class="usermanage-radio" style="width: auto">
                      <sino-radio v-for="(item, index) in sinsPayFeeWayList"
                                  :label="item.id" :key="index"
                                  v-model.number="supAddForm.taskTemp.sinsPayFeeWay"
                      >{{item.title}}</sino-radio>
                    </span>
                  </sino-form-item>
                </li>
                <li v-if="sinsPayFeeWayFlag" style="height: 25px;margin-bottom: 20px"></li>
                <li v-if="accuPayFeeWayFlag">
                  <sino-form-item label="公积金缴费方式："  class="search-inner-item"  prop="taskTemp.accuPayFeeWay" :rules="[{type: 'number', required: true, message: '公积金缴费方式为必填项', trigger: 'change'}]">
                <span class="usermanage-radio">
                  <sino-radio v-for="(item, index) in accuPayFeeWayList"
                              :label="item.id" :key="index"
                              v-model.number="supAddForm.taskTemp.accuPayFeeWay"
                  >{{item.title}}</sino-radio>
                </span>
                  </sino-form-item>
                </li>
                <li v-if="accuPayFeeWayFlag" style="height: 25px;margin-bottom: 20px"></li>
                <template v-for="(list, _index) in supAddForm.proList">
                  <li class="width45">
                    <sino-form-item label="服务内容：" class="search-inner-item" prop="prodPriceName">
                      <sino-select class="fl"
                                   :filterable="true"
                                   :multiselect="false"
                                   :isshowTotol="false"
                                   :totalNum="false"
                                   :isPage="true"
                                   :isGroup="false"
                                   :url="findPriceSelectBoxEnable"
                                   :disabled="supAddForm.proList[_index].prodData.disFlag"
                                   :data="supAddForm.proList[_index].prodData"
                                   :chooseName.sync="supAddForm.proList[_index].prodPriceName"
                                   :chooseId.sync="supAddForm.proList[_index].prodPriceId"
                                   :autoChoose="true"
                                   :clear="true">
                      </sino-select>
                    </sino-form-item>
                  </li>
                  <li>
                    <sino-form-item label="价格：" class="search-inner-item" ref="price" :prop="'proList['+_index+'].money'" :rules="[{type: 'number', required: true, message: '产品方案价格为必填项', trigger: 'change'}]">
                      <sino-input class="fl " v-model.number="supAddForm.proList[_index].money"></sino-input>
                      <div class="adddimreason-btn fl ml10"  @click="listAdd(_index)">
                        <template v-if="sinsPayFeeWayFlag === true">
                          <template v-if="accuPayFeeWayFlag === true">
                            <i class="iconfont" :class="{'sino-add' : _index === 0, 'sino-reduce': _index > 1, '': _index === 1}"></i>
                            <span class="ml5" v-if="_index === 0">新增</span>
                            <span class="ml5" v-if="_index === 1"></span>
                            <span class="ml5" v-if="_index > 1">删除</span>
                          </template>
                          <template v-else>
                            <i class="iconfont" :class="{'sino-add' : _index === 0, 'sino-reduce': _index !== 0}"></i><span class="ml5">{{_index === 0? '新增':'删除'}}</span>
                          </template>
                        </template>
                        <template v-else>
                          <i class="iconfont" :class="{'sino-add' : _index === 0, 'sino-reduce': _index !== 0}"></i><span class="ml5">{{_index === 0? '新增':'删除'}}</span>
                        </template>
                      </div>
                    </sino-form-item>
                  </li>
                </template>
              </ul>
              <sino-button style="margin: 10px auto" @click="saveForm">保 存</sino-button>
            </sino-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" :disabled="saveBtnFlag" @click="submitForm('supAddForm')">确 定</sino-button>
      </span>
      </sino-dialog>
      <!--下载模板-->
      <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow dialog-item mb15" v-on:close="cleanContent('downloadForm')">
        <sino-title slot="title" type="levelOne" title="下载模板" class="sino-dialog-title"></sino-title>
        <sino-form :model="downloadForm" ref="downloadForm" :rules="downloadFormRules" class="follow-select">
          <div class="follow-content">
            <sino-form-item label="选择模板：" prop="taskTemplateIdName" >
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'TASK_TEMP', ids: [1,3,4]}"
                           :chooseName.sync="downloadForm.taskTemplateIdName"
                           :chooseId.sync="downloadForm.taskTemplateId"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="工资模板：" prop="wageIdsName" v-if="downloadForm.taskTemplateId ===2">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'TASK_TEMP'}"
                           :chooseName.sync="downloadForm.wageIdsName"
                           :chooseId.sync="downloadForm.wageIds"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="选择服务内容：" prop="prodSchemeIdsName" v-if="downloadForm.taskTemplateId ===3 || downloadForm.taskTemplateId ===5 || downloadForm.taskTemplateId ===7">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findPriceSelectBoxEnable"
                           :chooseName.sync="downloadForm.prodSchemeIdsName"
                           :chooseId.sync="downloadForm.prodSchemeIds"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
            <sino-form-item label="选择社保公积金：" prop="proPayIdsName" v-if="downloadForm.taskTemplateId ===3 || downloadForm.taskTemplateId === 5|| downloadForm.taskTemplateId === 7">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'TASK_PRO_PAY_TEMP'}"
                           :chooseName.sync="downloadForm.proPayIdsName"
                           :chooseId.sync="downloadForm.proPayIds"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
          </div>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downSubmitFun">确 定</sino-button>
      </span>
      </sino-dialog>
      <!-- 确认 -->
      <sino-dialog :visible.sync="confirmFlag">
        <sino-title slot="title" type="levelOne" title="维护收费截止日" class="sino-dialog-title"></sino-title>
        <input type="hidden" v-model="batchId">
        <sino-auto-table :data="confirmtableData" stripe class="mail-table" v-on:viewAll="viewAll" max-height="416" border>
          <sino-auto-table-column type="index" label="序号"  width="60" align="center"></sino-auto-table-column>
          <sino-auto-table-column prop="chName" label="付费供应商名称" min-width="180"></sino-auto-table-column>
          <sino-auto-table-column label="收费截止日" :editType='true'>
            <template scope="scope">
              <sino-input v-show="scope.row.edit" @blur="scope.row.edit = false;blurInput(scope,$event)"
                          v-model="scope.row.chargeEndDate"></sino-input>
              <span v-show="!scope.row.edit" @click="scope.row.edit = true;" class="defaultVa">{{ scope.row.chargeEndDate }}</span>
            </template>
          </sino-auto-table-column>
        </sino-auto-table>
        <span slot="footer" class="dialog-footer">
          <div class="order-new" v-if="confirmValidFlag">
            <i class="iconfont sino-tip"></i><span v-text="confirmData.message"></span>
          </div>
          <sino-button type="primary" @click="confirmDayFun">确 定</sino-button>
        </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  let checkExcelFileType = function (file, _this) {
    let _s = file.raw.name.split('.')[1];
    let _arr = ['xlsx', 'xls'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    }  else {
      _this.$alert('请上传excel文件！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };
  function parents (ele, tagName) {
    if (ele.parentNode.nodeType === 1 && ele.parentNode.tagName === tagName) {
      return ele.parentNode;
    } else {
      if (ele.parentNode) {
        return parents(ele.parentNode, tagName);
      }
    }
  }
  let _publishBatchId;
  let checkedArr = [];
  export default {
    data () {
      return {
        routerView: false,
        entImportLoading: false,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox, // g
        prodUrl: this.apiPath.hrsc.findprodpricescheselectbox,
        findPriceSelectBoxEnable: this.apiPath.hrsc.findPriceSelectBoxEnable,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        token: Cookie.get('Token'),
        confirmFlag: false,
        confirmValidFlag: false,
        confirmtableData: null,
        batchId: '',  // 确认批次号
        entImportForm: {
          taskDataSource: '',
          signSuppId: '',
          signSuppName: ''
        },
        supTypeList: '', // 供应商类型下拉下拉列表
        tableData: null,
        filetableData: null,
        isTheSameFlag: '',
        isTheSameFlagAfter: '',
        isTheSameFlagSession: [],
        isTheSameFlagSessionSel: [],
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        supAdd: false, // 弹层
        formState: "", // 弹层状态
        leadsbtn: '', // 弹层按钮
        rules: { // 验证
          chName: [
            { required: true, message: '请选择供应商名称', trigger: 'change' }
          ],
          contName: [
            { required: true, message: '请输入联系人名称', trigger: 'blur' }
          ],
          isDefaultCont: [
            { required: true, type: 'number', message: '请选是否默认联系人', trigger: 'blur' }
          ],
          mobile: [
            {validator: this.validator.checkPhone, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ]
        },
        supAddForm: {
          taskTemp: {
            custId: '',
            custName: '',
            isDoup: false,
            sinsPayFeeWay: '',
            accuPayFeeWay: '',
            publishBatchId: ''
          },
          proList: [
            {
              prodPriceName: '',
              prodPriceId: '',
              money: '',
              prodData: {
                data: {
                  title: null
                }
              } // 产品方案默认取值
            }
          ]
        },
        custbatchId: '', // 维护产品批次号
        saveBtnFlag: true,
        downloadFlag: false,
        downloadForm: {
          taskTemplateId: '',
          taskTemplateIdName: '',
          prodSchemeIds: [],
          prodSchemeIdsName: [],
          proPayIds: [],
          proPayIdsName: [],
          wageIds: [],
          wageIdsName: []
        },
        downloadFormRules: {
          taskTemplateIdName: [
            {required: true, message: '请选择模板', trigger: 'change'}
          ],
          wageIdsName: [
            {type: 'array', required: true, message: '请选择工资模板', trigger: 'change'}
          ],
          prodSchemeIdsName: [
            {type: 'array', required: true, message: '请选择产品方案', trigger: 'change'}
          ],
          proPayIdsName: [
            {type: 'array', required: true, message: '请选择代收代付', trigger: 'change'}
          ]
        }, // 下载模板表单校验
        importFormFlag: false, // 导入表单开关
        importVisible: false, // 导入表单开关
        tempDetailTypeData: {
          code: 'TASK_ENTRU_CHAN_TEMP',
          ids: [1]
        },
        importForm: {
          tempType: '',
          temTypeName: '',
          tempDetailType: '',
          tempDetailTypeName: '',
          fileId: '',
          fileName: '',
          signSuppId: '',
          signSuppName: '',
          paySuppId: '',
          paySuppName: ''
        },
        importDetailForm: {
          fileName: '',
          totalCount: '',
          successCount: '',
          failureCount: '',
          importUserName: '',
          importTime: '',
          publishBatchId: ''
        },
        importFormRules: {
          temTypeName: [
            {required: true, message: '请选择模板类型', trigger: 'change'}
          ],
          tempDetailTypeName: [
            {required: true, message: '请选择模板', trigger: 'change'}
          ],
          fileName: [
            {required: true, message: '请上传文件', trigger: 'change'}
          ],
          signSuppName: [
            {required: true, message: '请选择签约供应商名称', trigger: 'change'}
          ],
          paySuppName: [
            {required: true, message: '请选择付费供应商名称', trigger: 'change'}
          ]
        }, // 导入表单校验
        custList: [],
        fileDownloadFlag: false,
        sinsPayFeeWayList: [],
        accuPayFeeWayList: [],
        supAddList: [],
        confirmtableCopy: [],
        accuPayFeeWayFlag: true, // 公积金缴费方式判断
        sinsPayFeeWayFlag: true, // 社保缴费方式判断
        confirmData: {
          message: ''
        },
        grayDisFlag: false, // 导入按钮点击置灰
        supAddNumForm: {
          succNum: '',
          totalEmpNum: '',
          custNum: ''
        },
        confirmFlagValue: '',
        isDoup: '',
        acceptFlag: false,
        exportImpBatchId: ''
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'PAY_FEE_WAY '}).then(res => {
        this.sinsPayFeeWayList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.dictSelUrl, {code: 'PAY_FEE_WAY'}).then(res => {
        this.accuPayFeeWayList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/empAss/entrustedtasklistimp") {
            this.routerView = false;
          }
          if (val.query.type && val.query.type === 'entrustedtasklistimp') {
            this.searchFun();
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
    },
    methods: {
      checkChange (item) {
        if (item === true) {
          this.isDoup = 1;
        } else {
          this.isDoup = 0;
        }
      },
      // 导入结果弹层--->确定
      impResFun (_batchNo) {
        this.searchFun();
        this.importVisible = false;
        if (this.importDetailForm.impTempType === 1) {
          this.custbatchId = _batchNo;
          this.manageRisk(_batchNo, this.importDetailForm.impBatchId, true);
        }
      },
      ruoteJudge () {
        if (this.$route.path !== "/empAss/entrustedtasklistimp") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      importChange () {
        let curVal = this.importForm.tempType;
        if (curVal === '') {
          return false;
        }
        api.post(this.apiPath.hrsc.checkSuppInfoIsExist, {tempType: curVal}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (curVal === 1) {
              this.tempDetailTypeData.code = 'TASK_ENTRU_CHAN_TEMP';
              this.tempDetailTypeData.ids = [];
              this.tempDetailTypeData.ids = [1];
            } else if (curVal === 2) {
              this.tempDetailTypeData.code = 'TASK_ENTRU_CHAN_TEMP';
              this.tempDetailTypeData.ids = [];
              this.tempDetailTypeData.ids = [3, 4];
            } else if (curVal === 3) {
              this.tempDetailTypeData.code = 'TASK_ENTRU_CHAN_TEMP';
              this.tempDetailTypeData.ids = [];
              this.tempDetailTypeData.ids = [5];
            } else if (curVal === 4) {
              this.tempDetailTypeData.code = 'TASK_ENTRU_CHAN_TEMP';
              this.tempDetailTypeData.ids = [];
              this.tempDetailTypeData.ids = [6];
            } else {
              this.tempDetailTypeData.code = 'TASK_TEMP';
              this.tempDetailTypeData.ids = [];
              this.tempDetailTypeData.ids = [1, 3, 4];
              // delete this.tempDetailTypeData.ids;
            }
          } else {
            this.importForm.tempType = '';
            this.importForm.temTypeName = '';
            return false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectTabelRow (selection, row) {
        this.isTheSameFlagAfter = '';
        checkedArr = selection;
      },
      selectAll (ele) {
        checkedArr = [];
        this.isTheSameFlagAfter = '';
        ele.forEach(function (list) {
          if (list.flag !== 1) {
            checkedArr.push(list);
          }
        });
      },
      // 原文件下载弹层
      oldFileDownload (_data) {
        _publishBatchId = _data.publishBatchId;
        this.fileViewAll(_data.publishBatchId);
      },
      fileDown () {
        let _this = this;
        let _data = [];
        if (this.isTheSameFlagAfter === this.isTheSameFlag) {
          // if () {}
          _data = this.isTheSameFlagSession;
        } else {
          if (!checkedArr || checkedArr.length < 1) {
            _this.$alert('请选择至少一条数据进行操作', '温馨提示', {
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
          checkedArr.forEach(function (item, index) {
            _data.push(item.fileId);
          });
        }
        api.post(_this.apiPath.hrsc.batchDownloadImportFile, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
            _this.fileDownloadFlag = false;
            this.isTheSameFlagAfter = _publishBatchId;
            this.isTheSameFlagSession = _data;
            // this.isTheSameFlagSessionSel = checkedArr;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.entImportLoading = true;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      viewAll (pageNum, pageSize) {
        this.entImportForm.taskDataSource = 2;
        this.entImportForm.isClerkImport = 1;
        let obj = {
          data: this.entImportForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.listTaskPublishBatch, obj).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.entImportLoading = false;
        }).catch(err => {
          console.log(err);
        });
      },
      fileViewAll (publishBatchId) {
        let obj = {
          publishBatchId: publishBatchId || _publishBatchId
        };
        api.post(this.apiPath.hrsc.listTaskImportBatch, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.fileDownloadFlag = true;
            this.filetableData = res.data;
            checkedArr = [];
            this.isTheSameFlag = publishBatchId;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      importFun: function () {
        this.importFormFlag = true;
      },
      downloadFun: function () {
        this.downloadFlag = true;
      },
      // 下载模板确定
      downSubmitFun () {
        let _this = this;
        _this.$refs.downloadForm.validate((valid) => {
          if (valid) {
            let obj = {
              taskTemplateId: this.downloadForm.taskTemplateId,
              proPayIds: this.downloadForm.proPayIds,
              prodSchemeIds: this.downloadForm.prodSchemeIds
            };
            api.post(this.apiPath.hrsc.downloadTaskTemplate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                api.download(res.data);
                this.downloadFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 导入模板确定
      importSubmitFun () {
        let _this = this;
        if (_this.grayDisFlag === true) { return; }
        _this.$refs.importForm.validate((valid) => {
          if (valid) {
            _this.grayDisFlag = true;
            _this.importForm.isClerk = 1;
            api.post(this.apiPath.hrsc.clerkTaskImportResult, this.importForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.importFormFlag = false;
                this.importVisible = true;
                this.grayDisFlag = false;
                this.importDetailForm = res.data;
              } else {
                this.grayDisFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      remiFailDownload (_data) {
        api.postsign(this.apiPath.hrsc.downloadFilePublic, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      remiAllDownload (_data) {
        api.postsign(this.apiPath.hrsc.downloadFilePublic, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      remiSuccDownload (_data) {
        api.postsign(this.apiPath.hrsc.downloadFilePublic, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      // 维护产品
      manageRisk (data, impBatchId, bool) {
        let _this = this;
        this.exportImpBatchId = impBatchId;
        api.post(_this.apiPath.hrsc.findCustName, {publishBatchId: data, impBatchId: impBatchId}).then(res => {
          setTimeout(function () {
            _this.$refs['price'][0].showMessage = false;
            _this.$refs['price'][0].validateState = 'success';
            if (_this.$refs['price'][1]) {
              _this.$refs['price'][1].showMessage = false;
              _this.$refs['price'][1].validateState = 'success';
            }
          }, 100);
          if (res.data.length === 0) {
            _this.$alert('您目前还没有需要维护的产品', '温馨提示', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {}
            });
            return false;
          } else {
            _this.supAdd = true;
            _this.custList = res.data;
            _this.custbatchId = data;
            api.post(_this.apiPath.hrsc.getTaskImportResult, {publishBatchId: data, impBatchId: impBatchId, maintainProdFlag: bool}).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.supAddNumForm = res.data;
              }
            }).catch(err => {
              console.log(err);
            });
            let flag = true;
            // 循环cust用户
            for (let i = 0; i < _this.custList.length; i++) {
              // flag === 1为没有维护客户产品
              if (_this.custList[i].flag === 1) {
                flag = false;
                _this.saveBtnFlag = true;  // flag = 1 ; 确定按钮不可点击
                // 调取右边客户列表信息
                api.post(_this.apiPath.hrsc.findTaskTempByCustId, {custId: _this.custList[i].custId}).then(res => {
                  if (res.code === 'CPYY-00001') {
                    if (res.data.taskTemp === null || res.data.taskTempDetServes.length === 0) {
                      _this.supAddForm.taskTemp.sinsPayFeeWay = '';
                      _this.supAddForm.taskTemp.accuPayFeeWay = '';
                      _this.supAddForm.proList = [
                        {
                          prodPriceName: '',
                          prodPriceId: '',
                          money: '',
                          prodData: {title: '', disFlag: false}
                        }
                      ];
                      _this.supAddForm.taskTemp.custId = _this.custList[i].custId;
                      _this.supAddForm.taskTemp.custName = _this.custList[i].custName;
                      // 判断社保缴费方式是否显示；显示则产品方案带出默认值
                      if (_this.custList[i].sinsDeclRadix === null) {
                        _this.sinsPayFeeWayFlag = false;
                        _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                      } else {
                        _this.sinsPayFeeWayFlag = true;
                        _this.supAddForm.proList[0] = {
                          prodPriceName: _this.custList[i].sinsProdPriceName,
                          prodPriceId: _this.custList[i].sinsProdPriceId,
                          money: '',
                          prodData: {title: '', disFlag: true}
                        };
                      }
                      // 判断公积金缴费方式是否显示；显示则产品方案带出默认值
                      if (_this.custList[i].accuDeclRadix === null) {
                        _this.accuPayFeeWayFlag = false;
                        if (_this.custList[i].sinsDeclRadix === null) {
                          _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                        } else {
                          _this.supAddForm.proList[1].prodData = {title: '', disFlag: false};
                        }
                      } else {
                        _this.accuPayFeeWayFlag = true;
                        if (_this.custList[i].sinsDeclRadix === null) {
                          _this.supAddForm.proList[0] = {
                            prodPriceName: _this.custList[i].accuProdPriceName,
                            prodPriceId: _this.custList[i].accuProdPriceId,
                            money: '',
                            prodData: {title: '', disFlag: true}
                          };
                        } else {
                          _this.supAddForm.proList.push({
                            prodPriceName: _this.custList[i].accuProdPriceName,
                            prodPriceId: _this.custList[i].accuProdPriceId,
                            money: '',
                            prodData: {title: '', disFlag: true}
                          });
                        }
                      }
                    } else {
                      _this.supAddForm.taskTemp = res.data.taskTemp;
                      res.data.taskTempDetServes.forEach(function (item) {
                        item.prodData = {
                          title: '',
                          disFlag: false
                        };
                      });
                      _this.supAddForm.proList = res.data.taskTempDetServes;
                    }
                  }
                }).catch(err => {
                  console.log(err);
                });
                return false;
              } else {
                _this.saveBtnFlag = false;
              }
            }
            if (flag) {
              api.post(_this.apiPath.hrsc.findTaskTempByCustId, {custId: _this.custList[0].custId}).then(res => {
                if (res.code === 'CPYY-00001') {
                  if (res.data.taskTemp === null || res.data.taskTempDetServes.length === 0) {
                    _this.supAddForm.taskTemp.sinsPayFeeWay = '';
                    _this.supAddForm.taskTemp.accuPayFeeWay = '';
                    _this.supAddForm.proList = [
                      {
                        prodPriceName: '',
                        prodPriceId: '',
                        money: '',
                        prodData: {title: '', disFlag: false}
                      }
                    ];
                    _this.supAddForm.taskTemp.custId = _this.custList[0].custId;
                    _this.supAddForm.taskTemp.custName = _this.custList[0].custName;
                    // 判断社保缴费方式是否显示；显示则产品方案带出默认值
                    for (let i = 0; i < 1; i++) {
                      if (_this.custList[i].sinsDeclRadix === null) {
                        _this.sinsPayFeeWayFlag = false;
                        _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                      } else {
                        _this.sinsPayFeeWayFlag = true;
                        _this.supAddForm.proList[0] = {
                          prodPriceName: _this.custList[i].sinsProdPriceName,
                          prodPriceId: _this.custList[i].sinsProdPriceId,
                          money: '',
                          prodData: {title: '', disFlag: true}
                        };
                      }
                      // 判断公积金缴费方式是否显示；显示则产品方案带出默认值
                      if (_this.custList[i].accuDeclRadix === null) {
                        _this.accuPayFeeWayFlag = false;
                        if (_this.custList[i].sinsDeclRadix === null) {
                          _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                        } else {
                          _this.supAddForm.proList[1].prodData = {title: '', disFlag: false};
                        }
                      } else {
                        _this.accuPayFeeWayFlag = true;
                        if (_this.custList[i].sinsDeclRadix === null) {
                          _this.supAddForm.proList[0] = {
                            prodPriceName: _this.custList[i].accuProdPriceName,
                            prodPriceId: _this.custList[i].accuProdPriceId,
                            money: '',
                            prodData: {title: '', disFlag: true}
                          };
                        } else {
                          _this.supAddForm.proList.unshift({
                            prodPriceName: _this.custList[i].accuProdPriceName,
                            prodPriceId: _this.custList[i].accuProdPriceId,
                            money: '',
                            prodData: {title: '', disFlag: true}
                          });
                        }
                      }
                    }
                  } else {
                    _this.supAddForm.taskTemp = res.data.taskTemp;
                    res.data.taskTempDetServes.forEach(function (item, index) {
                      item.prodData = {
                        title: '',
                        disFlag: false
                      };
                    });
                    _this.supAddForm.proList = JSON.parse(JSON.stringify(res.data.taskTempDetServes));
                    for (let j = 0; j < 1; j++) {
                      _this.supAddForm.proList.forEach(function (item, index) {
                        item.prodData.disFlag = false;
                      });
                        // _this.sinsPayFeeWayFlag = false;
                        // _this.accuPayFeeWayFlag = false;
                        // if (_this.custList[j].sinsProdPriceName === '社保代理服务') {
                      if (_this.custList[j].sinsDeclRadix) {
                        // _this.supAddForm.proList[0].prodData.disFlag = true;
                        _this.sinsPayFeeWayFlag = true;
                        let defualut = _this.supAddForm.proList.find(item => {
                          return _this.custList[j].sinsProdPriceId == item.prodPriceId;
                        });
                        _this.supAddForm.proList = _this.supAddForm.proList.filter(item => {
                          return _this.custList[j].sinsProdPriceId != item.prodPriceId;
                        });
                        _this.supAddForm.proList.unshift({
                          prodPriceName: _this.custList[j].sinsProdPriceName,
                          prodPriceId: _this.custList[j].sinsProdPriceId,
                          money: defualut ? defualut.money : '',
                          prodData: {title: '', disFlag: true}
                        });
                      } else {
                        _this.sinsPayFeeWayFlag = false;
                      };
                      // if (_this.custList[j].accuProdPriceName === '公积金代理服务') {
                      if (_this.custList[j].accuDeclRadix) {
                        let defualut = _this.supAddForm.proList.find(item => {
                          return _this.custList[j].accuProdPriceId == item.prodPriceId;
                        });
                        _this.supAddForm.proList = _this.supAddForm.proList.filter(item => {
                          return _this.custList[j].accuProdPriceId != item.prodPriceId;
                        });
                        // if (_this.custList[j].sinsProdPriceName === '社保代理服务') {
                        _this.supAddForm.proList.unshift({
                          prodPriceName: _this.custList[j].accuProdPriceName,
                          prodPriceId: _this.custList[j].accuProdPriceId,
                          money: defualut ? defualut.money : '',
                          prodData: {title: '', disFlag: true}
                        });
                        // } else {
                        //   _this.supAddForm.proList[0].prodData.disFlag = true;
                        // }
                        _this.accuPayFeeWayFlag = true;
                      } else {
                        _this.accuPayFeeWayFlag = false;
                      }
                      // });
                    }
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 左侧选择客户
      custFun (list) {
        console.log(list);
        let _this = this;
        // 查询当前客户列表信息
        api.post(_this.apiPath.hrsc.findTaskTempByCustId, {custId: list.custId}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.taskTemp === null || res.data.taskTempDetServes.length === 0) {
              _this.supAddForm.taskTemp.sinsPayFeeWay = '';
              _this.supAddForm.taskTemp.accuPayFeeWay = '';
              _this.supAddForm.proList = [
                {
                  prodPriceName: '',
                  prodPriceId: '',
                  money: '',
                  prodData: {title: '', disFlag: false}
                }
              ];
              _this.supAddForm.taskTemp.custId = list.custId;
              _this.supAddForm.taskTemp.custName = list.custName;
              // 判断社保缴费方式是否显示；显示则产品方案带出默认值
              if (list.sinsDeclRadix === null) {
                _this.sinsPayFeeWayFlag = false;
                _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
              } else {
                _this.sinsPayFeeWayFlag = true;
                _this.supAddForm.proList[0] = {
                  prodPriceName: list.sinsProdPriceName,
                  prodPriceId: list.sinsProdPriceId,
                  money: '',
                  prodData: {title: '', disFlag: true}
                };
              }
              // 判断公积金缴费方式是否显示；显示则产品方案带出默认值
              if (list.accuDeclRadix === null) {
                _this.accuPayFeeWayFlag = false;
                if (list.sinsDeclRadix === null) {
                  _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                } else {
                  _this.supAddForm.proList[1].prodData = {title: '', disFlag: false};
                }
              } else {
                _this.accuPayFeeWayFlag = true;
                if (list.sinsDeclRadix === null) {
                  _this.supAddForm.proList[0] = {
                    prodPriceName: list.accuProdPriceName,
                    prodPriceId: list.accuProdPriceId,
                    money: '',
                    prodData: {title: '', disFlag: true}
                  };
                } else {
                  _this.supAddForm.proList[1] = {
                    prodPriceName: list.accuProdPriceName,
                    prodPriceId: list.accuProdPriceId,
                    money: '',
                    prodData: {title: '', disFlag: true}
                  };
                }
              }
            } else {
              _this.supAddForm.taskTemp = res.data.taskTemp;
              _this.supAddForm.taskTemp.custId = list.custId;
              _this.supAddForm.taskTemp.custName = list.custName;
              res.data.taskTempDetServes.forEach(function (item, index) {
                item.prodData = {
                  title: '',
                  disFlag: false
                };
              });
              _this.supAddForm.proList = JSON.parse(JSON.stringify(res.data.taskTempDetServes));
              _this.supAddForm.proList.forEach(function (item) {
                // _this.accuPayFeeWayFlag = false;
                // _this.sinsPayFeeWayFlag = false;
                item.prodData.disFlag = false;
              });
              if (list.sinsDeclRadix) {
                // _this.supAddForm.proList[0].prodData.disFlag = true;
                _this.sinsPayFeeWayFlag = true;
                let defualut = _this.supAddForm.proList.find(item => {
                  return list.sinsProdPriceId == item.prodPriceId;
                });
                _this.supAddForm.proList = _this.supAddForm.proList.filter(item => {
                  return list.sinsProdPriceId != item.prodPriceId;
                });
                _this.supAddForm.proList.unshift({
                  prodPriceName: list.sinsProdPriceName,
                  prodPriceId: list.sinsProdPriceId,
                  money: defualut ? defualut.money : '',
                  prodData: {title: '', disFlag: true}
                });
              } else {
                _this.sinsPayFeeWayFlag = false;
              }
              if (list.accuDeclRadix) {
                // if (list.sinsProdPriceName === '社保代理服务') {
                let defualut = _this.supAddForm.proList.find(item => {
                  return list.accuProdPriceId == item.prodPriceId;
                });
                _this.supAddForm.proList = _this.supAddForm.proList.filter(item => {
                  return list.accuProdPriceId != item.prodPriceId;
                });
                _this.supAddForm.proList.unshift({
                  prodPriceName: list.accuProdPriceName,
                  prodPriceId: list.accuProdPriceId,
                  money: defualut ? defualut.money : '',
                  prodData: {title: '', disFlag: true}
                });
                // } else {
                //   _this.supAddForm.proList[0].prodData.disFlag = true;
                // }
                _this.accuPayFeeWayFlag = true;
              } else {
                _this.accuPayFeeWayFlag = false;
              }
              // });
            }
            setTimeout(function () {
              _this.$refs['price'][0].showMessage = false;
              _this.$refs['price'][0].validateState = 'success';
              if (_this.$refs['price'][1]) {
                _this.$refs['price'][1].showMessage = false;
                _this.$refs['price'][1].validateState = 'success';
              }
            }, 100);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 维护产品保存
      saveForm () {
        let _this = this;
        this.$refs.supAddForm.validate((valid) => {
          if (valid) {
            let _data;
            let _supAddForm = JSON.parse(JSON.stringify(_this.supAddForm));
            _supAddForm.taskTemp.publishBatchId = this.custbatchId;
            if (_supAddForm.taskTemp.isDoup === null || _supAddForm.taskTemp.isDoup === false) {
              _data = {
                taskTemp: _supAddForm.taskTemp,
                taskTempDetServes: _this.supAddForm.proList
              };
              _data.taskTemp.isDoup = 0;
              _data.taskTemp.impBatchId = this.exportImpBatchId;
            } else {
              let _custList = [];
              this.custList.forEach(function (list) {
                _custList.push(list.custId);
              });
              _data = {
                taskTemp: _supAddForm.taskTemp,
                taskTempDetServes: _this.supAddForm.proList,
                list: _custList
              };
              _data.taskTemp.isDoup = 1;
              _data.taskTemp.impBatchId = this.exportImpBatchId;
            }
            api.post(_this.apiPath.hrsc.addTaskTemp, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.$message({
                  message: '维护成功！',
                  type: 'success',
                  onClose: function () {
                    // 获取左侧客户列表信息
                    api.post(_this.apiPath.hrsc.findCustName, {publishBatchId: _this.custbatchId, impBatchId: _this.exportImpBatchId}).then(res => {
                      if (res.data && res.data.length === 0) {
                        this.$alert('您目前还没有需要维护的产品', '温馨提示', {
                          confirmButtonText: '确 定',
                          type: 'warning', // icon图标类型
                          dragFlag: true,
                          customClass: '', // 添加class
                          lockScroll: true,
                          callback: action => {}
                        });
                        return false;
                      } else {
                        // 循环cust列表
                        _this.custList = res.data;
                        for (let i = 0; i < _this.custList.length; i++) {
                          // 如果flag = 1;说明未维护客户产品
                          if (_this.custList[i].flag === 1) {
                            _this.saveBtnFlag = true; // 判断确定按钮是否可以点击
                            api.post(_this.apiPath.hrsc.findTaskTempByCustId, {custId: _this.custList[i].custId}).then(res => {
                              if (res.code === 'CPYY-00001') {
                                if (res.data.taskTemp === null || res.data.taskTempDetServes.length === 0) {
                                  _this.supAddForm.taskTemp.sinsPayFeeWay = '';
                                  _this.supAddForm.taskTemp.accuPayFeeWay = '';
                                  _this.supAddForm.proList = [
                                    {
                                      prodPriceName: '',
                                      prodPriceId: '',
                                      money: '',
                                      prodData: {title: '', disFlag: false}
                                    }
                                  ];
                                  _this.supAddForm.taskTemp.custId = _this.custList[i].custId;
                                  _this.supAddForm.taskTemp.custName = _this.custList[i].custName;
//                                  // 判断社保缴费方式是否显示；显示则产品方案带出默认值
//                                  if (_this.custList[i].sinsDeclRadix === null) {
//                                    _this.sinsPayFeeWayFlag = false;
//                                    _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
//                                  } else {
//                                    _this.sinsPayFeeWayFlag = true;
//                                    _this.supAddForm.proList[0] = {
//                                      prodPriceName: _this.custList[i].sinsProdPriceName,
//                                      prodPriceId: _this.custList[i].sinsProdPriceId,
//                                      money: '',
//                                      prodData: {title: '', disFlag: true}
//                                    };
//                                  }
//                                  // 判断公积金缴费方式是否显示；显示则产品方案带出默认值
//                                  if (_this.custList[i].accuDeclRadix === null) {
//                                    _this.accuPayFeeWayFlag = false;
//                                    if (_this.custList[i].sinsDeclRadix === null) {
//                                      _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
//                                    } else {
//                                      _this.supAddForm.proList[1].prodData = {title: '', disFlag: false};
//                                    }
//                                  } else {
//                                    _this.accuPayFeeWayFlag = true;
//                                    if (_this.custList[i].sinsDeclRadix === null) {
//                                      _this.supAddForm.proList[0] = {
//                                        prodPriceName: _this.custList[i].accuProdPriceName,
//                                        prodPriceId: _this.custList[i].accuProdPriceId,
//                                        money: '',
//                                        prodData: {title: '', disFlag: true}
//                                      };
//                                    } else {
//                                      _this.supAddForm.proList.push({
//                                        prodPriceName: _this.custList[i].accuProdPriceName,
//                                        prodPriceId: _this.custList[i].accuProdPriceId,
//                                        money: '',
//                                        prodData: {title: '', disFlag: true}
//                                      });
//                                    }
//                                  }// 判断社保缴费方式是否显示；显示则产品方案带出默认值
                                  if (_this.custList[i].sinsDeclRadix === null) {
                                    _this.sinsPayFeeWayFlag = false;
                                    _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                                  } else {
                                    _this.sinsPayFeeWayFlag = true;
                                    _this.supAddForm.proList[0] = {
                                      prodPriceName: _this.custList[i].sinsProdPriceName,
                                      prodPriceId: _this.custList[i].sinsProdPriceId,
                                      money: '',
                                      prodData: {title: '', disFlag: true}
                                    };
                                  }
                                  // 判断公积金缴费方式是否显示；显示则产品方案带出默认值
                                  if (_this.custList[i].accuDeclRadix === null) {
                                    _this.accuPayFeeWayFlag = false;
                                    if (_this.custList[i].sinsDeclRadix === null) {
                                      _this.supAddForm.proList[0].prodData = {title: '', disFlag: false};
                                    } else {
                                      if (_this.supAddForm.proList[1]) {
                                        _this.supAddForm.proList[1].prodData = {title: '', disFlag: false};
                                      }
                                    }
                                  } else {
                                    _this.accuPayFeeWayFlag = true;
                                    if (_this.custList[i].sinsDeclRadix === null) {
                                      _this.supAddForm.proList[0] = {
                                        prodPriceName: _this.custList[i].accuProdPriceName,
                                        prodPriceId: _this.custList[i].accuProdPriceId,
                                        money: '',
                                        prodData: {title: '', disFlag: true}
                                      };
                                    } else {
                                      _this.supAddForm.proList.push({
                                        prodPriceName: _this.custList[i].accuProdPriceName,
                                        prodPriceId: _this.custList[i].accuProdPriceId,
                                        money: '',
                                        prodData: {title: '', disFlag: true}
                                      });
                                    }
                                  }
                                } else {
                                  _this.supAddForm.taskTemp = res.data.taskTemp;
                                  if (res.data.taskTemp.isDoup === 1) {
                                    res.data.taskTemp.isDoup = true;
                                    return false;
                                  } else {
                                    res.data.taskTemp.isDoup = false;
                                  }
                                  res.data.taskTempDetServes.forEach(function (item) {
                                    item.prodData = {
                                      title: '',
                                      disFlag: false
                                    };
                                    if (item.prodPriceName === '社保代理服务') {
                                      item.prodData.disFlag = true;
                                      _this.sinsPayFeeWayFlag = true;
                                    } else {
                                      _this.sinsPayFeeWayFlag = false;
                                    }
                                    if (item.prodPriceName === '公积金代理服务') {
                                      item.prodData.disFlag = true;
                                      _this.accuPayFeeWayFlag = true;
                                    } else {
                                      _this.accuPayFeeWayFlag = false;
                                    }
                                  });
                                  _this.supAddForm.proList = res.data.taskTempDetServes;
                                }
                                setTimeout(function () {
                                  _this.$refs['price'][0].showMessage = false;
                                  _this.$refs['price'][0].validateState = 'success';
                                  if (_this.$refs['price'][1]) {
                                    _this.$refs['price'][1].showMessage = false;
                                    _this.$refs['price'][1].validateState = 'success';
                                  }
                                }, 100);
                              }
                            }).catch(err => {
                              console.log(err);
                            });
                            return false;
                          } else {
                            _this.saveBtnFlag = false;
                          }
                        }
                      }
                    });
                  }
                });
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
      // 维护产品确定
      submitForm () {
        this.supAdd = false;
        this.searchFun();
      },
      // 重新维护产品
      mainProdoct () {
        this.importVisible = false;
        this.supAdd = true;
      },
      // 稍后维护
      laterFun () {
        this.importVisible = false;
        this.$alert('本批次数据中产品信息未完善，无法查看明细，请完善产品信息后进行查看。', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          lockScroll: true,
          callback: action => {
          }
        });
      },
      // 删除
      delFun: function (data) {
        let _this = this;
        _this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          let dto = {
            publishBatchId: data.publishBatchId,
            isEffect: 0
          };
          api.post(_this.apiPath.hrsc.updateTaskPublishBatchState, dto).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(() => {
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      // 确认按钮点击
      confirmFun (batchId, confirmFlagValue) {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.findPaySuppByPubId, batchId).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data && res.data.length > 0) {
              _this.confirmFlag = true;
              res.data.forEach(function (list) {
                list.edit = false;
              });
              _this.confirmtableData = res.data;
              _this.confirmtableCopy = JSON.parse(JSON.stringify(_this.confirmtableData));
              _this.acceptFlag = false;
            } else {
              api.post(_this.apiPath.hrsc.findCustByPubBatchId, {publishBatchId: batchId, confirmFlag: confirmFlagValue}).then(res => {
                _this.acceptFlag = false;
                if (res.code === 'CPYY-00001') {
                  if (res.data === 1) {
                    _this.searchFun();
                    _this.$message({message: '操作成功！', type: 'success'});
                    return;
                  } else {
                    _this.routerView = true;
                    _this.$router.push({path: '/empAss/entrustedtasklistimp/sinsaccuacctstan', query: {publishBatchId: batchId, type: 'entrustedtasklistimp', confirmFlag: confirmFlagValue}});
                  }
                }
              }).catch(err => {
                _this.acceptFlag = false;
              });
            }
          } else {
            _this.acceptFlag = false;
          }
        }).catch(err => {
          _this.acceptFlag = false;
        });
      },
      confiFun (data) {
        if (this.acceptFlag) return;
        let _this = this;
        _this.batchId = data.publishBatchId;
        _this.confirmFlagValue = 0;
        this.acceptFlag = true;
        api.post(_this.apiPath.hrsc.checkTaskDeclRadixIsExsit, {publishBatchId: _this.batchId}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data === null) {
              _this.confirmFun(_this.batchId, _this.confirmFlagValue);
            } else {
              _this.$confirm(res.data.message, '提示', {
                confirmButtonText: '确 定',
                showConfirmButton: res.data.showConfirmButton,
                cancelButtonText: ' ',
                customClass: res.data.showConfirmButton ? '' : 'hiddenButtonStyle',
                type: 'warning'
              }).then(() => {
                _this.confirmFun(_this.batchId, _this.confirmFlagValue);
              }).catch(() => {
                this.acceptFlag = false;
                console.log('确定取消!');
              });
            }
          } else {
            this.acceptFlag = false;
          }
        }).catch(err => {
          this.acceptFlag = false;
          console.log(err);
        });
      },
      // 按明细处理
      detaiHand (data, flag) {
        this.routerView = true;
        this.$router.push({path: '/empAss/entrustedtasklistimp/entrustedtasklistsum', query: {'taskIds': JSON.stringify(data.taskIds), 'hideButton': flag === 1 ? 1 : ''}});
      },
      // 增加产品方案
      listAdd (index) {
        let _this = this;
        if (index === 0) {
          _this.supAddForm.proList.push({
            prodPriceName: '',
            prodPriceId: '',
            money: '',
            prodData: {title: '', disFlag: false}
          });
        } else {
          _this.supAddForm.proList.splice(index, 1);
        }
      },
      fileRemove (file) {
        this.importForm.fileName = '';
      },
      getFileName (file, filelist) {
        if (checkExcelFileType(file, this)) {
          if (filelist.length > 1) {
            filelist = filelist.splice(0, 1);
          }
          this.importForm.fileName = file.name;
          this.$refs.excelFile.submit();
        } else {
          this.$refs.excelFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.importForm.fileId = res.data;
          this.grayDisFlag = false;
        } else {
          this.modifyAndAddForm.fileName = '';
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
            return;
          }
        });
      },
      // 可编辑表格样式
      blurInput (sc, event) {
        let _this = this;
        for (let i = 0; i < _this.confirmtableData.length; i++) {
          if (sc.row.suppId === _this.confirmtableData[i].suppId) {
            if (sc.row.chargeEndDate !== _this.confirmtableCopy[i].chargeEndDate) {
              parents(event.target, 'TD').className += ' is-finish';
            } else {
              let classAry = parents(event.target, 'TD');
              let ary = classAry.className.replace(/(^ +| +$)/g, '').split(/ +/g);
              for (let i = 0, len = ary.length; i < len; i++) {
                let curName = ary[i];
                if (curName === 'is-finish') {
                  let reg = new RegExp('(^| +)' + curName + '( +|$)', 'g');
                  classAry.className = classAry.className.replace(reg, ' ');
                }
              }
            }
          }
        }
      },
      // 收费截止日确定
      confirmDayFun () {
        let _this = this;
        let _data = [];
        var reg = /^([12]{0,1}[1-9]|30|31|20|10)$/;
        _this.confirmtableData.forEach(function (list) {
          if (list.chargeEndDate === null || list.chargeEndDate === '') {
            _this.confirmValidFlag = true;
            _this.confirmData.message = '收费截止日为必填项。';
            return false;
          } else if (isNaN(list.chargeEndDate)) {
            _this.confirmData.message = '请输入数字值';
            return false;
          } else if (!reg.test(list.chargeEndDate)) {
            _this.confirmData.message = '请输入1-31之间的整数';
            return false;
          } else {
            _data.push({chargeEndDate: list.chargeEndDate, suppId: list.suppId});
            _this.confirmValidFlag = false;
            api.post(_this.apiPath.hrsc.suppUpdateChargeEndDate, _data).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.confirmFlag = false;
                _this.routerView = true;
                _this.confirmFlagValue = 0;
                _this.$router.push({path: '/empAss/entrustedtasklistimp/sinsaccuacctstan', query: {publishBatchId: _this.batchId, confirmFlag: _this.confirmFlagValue}});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
        this.downloadForm.wageIdsName = [];
        this.downloadForm.wageIds = [];
        this.downloadForm.prodSchemeIdsName = [];
        this.downloadForm.prodSchemeIds = [];
        this.downloadForm.proPayIdsName = [];
        this.downloadForm.proPayIds = [];
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.$refs.excelFile.clearFiles();
      }
    }
  };
</script>
<style scoped>
  .el-table td > .cell .isGray{color: gray}
</style>
