<template>
  <!--供应商联系人-->
  <div class="suppcont usermanage">
    <sino-con>
      <sino-title type="levelOne" title="签约方任务单查询"></sino-title>
      <sino-form :model="suppcontForm" ref="suppcontForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box contractor-inquire">
            <li class="search-inner-one">
              <span class="search-inner-name">发布状态：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="{code: 'TASK_PUBLISH_STATE'}"
                           :url="getDictSelectBox"
                           :chooseName.sync="suppcontForm.taskPublishStateDict"
                           :chooseId.sync="suppcontForm.taskPublishState"
                           :clear="true" >
              </sino-select>
            </li>
            <li class="search-inner-one contractor-inquire-li">
              <span class="search-inner-name">发布日期：</span>
              <sino-date-picker
                v-model="suppcontForm.begDate"
                type="date"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
              至
              <sino-date-picker
                v-model="suppcontForm.endDate"
                type="date"
                :editable="false"
                :readonly="false"
                :clearable="true">
              </sino-date-picker>
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
            <sino-button type="icon-text" @click="impFun"><i class="iconfont sino-import"></i>导入</sino-button>
            <sino-button type="icon-text" @click="dowFun"><i class="iconfont sino-download-copy"></i>下载模板</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe  v-on:viewAll="viewAll" max-height="416" border v-loading="suppcontLoading" element-loading-text="拼命加载中">
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="publishBatchId" label="发布批次"></sino-table-column>
          <sino-table-column prop="isIncludedTaskDetDict" label="完善产品"></sino-table-column>
          <sino-table-column prop="sumAmo" label="总雇员"  ></sino-table-column>
          <sino-table-column prop="addAmo" label="新增雇员" ></sino-table-column>
          <sino-table-column prop="reduceAmo" label="减少雇员"></sino-table-column>
          <sino-table-column prop="chanAmo" label="变更雇员"></sino-table-column>
          <sino-table-column prop="yearAmo" label="年调雇员"></sino-table-column>
          <sino-table-column prop="dispAmo" label="一次性收费雇员" min-width="120"></sino-table-column>
          <sino-table-column prop="taskPublishStateDict" label="发布状态"></sino-table-column>
          <sino-table-column prop="publishTime" label="发布日期" min-width="100"></sino-table-column>
          <sino-table-column label="操作" align="center" width="220" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" v-if="scope.row.isIncludedTaskDet === 1 && scope.row.taskPublishState === 0" @click="confi(scope.row.publishBatchId)">发布</span><i class="table-i" v-if="scope.row.isIncludedTaskDet === 1 && scope.row.taskPublishState === 0">|</i>
                <!--<span class="table-span" @click="detaiHand(scope.row)">按明细处理</span><i class="table-i">|</i>-->
                <span class="table-span" @click="oldFileDownload(scope.row.publishBatchId)">原文件</span><i class="table-i" v-if="scope.row.isIncludedAddEmpSimple === 1 && scope.row.taskPublishState === 0">|</i>
                <span class="table-span" v-if="scope.row.isIncludedAddEmpSimple === 1 && scope.row.taskPublishState === 0" @click="manageRisk(scope.row.publishBatchId, null,'')">维护产品</span><i class="table-i" v-if="scope.row.taskPublishState === 0">|</i>
                <span class="table-span" v-if="scope.row.taskPublishState === 0" @click="delFun(scope.row.publishBatchId)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page class="pro-ser-tem" v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!-- 维护产品 -->
    <sino-dialog :visible.sync="supAdd"  class="mainte-product" size="large" @close = "cleanContent('supAddForm')" >
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
                  <input type="hidden" v-model="publishBatchId">
                  <input type="hidden" v-model="supAddForm.taskTemp.custId">
                  <sino-input class="fl" v-model="supAddForm.taskTemp.custName" :disabled="true"></sino-input>
                  <div class="sins-check">
                    <sino-checkbox @change="checkChange(supAddForm.taskTemp.isDoup)" v-model="supAddForm.taskTemp.isDoup">同步至其他未设置客户 </sino-checkbox>
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
                  <sino-form-item label="服务内容：" class="search-inner-item" :prop="'proList['+_index+'].prodPriceName'">
                    <sino-select class="fl"
                                 :filterable="true"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="prodUrl"
                                 :disabled="supAddForm.proList[_index].prodData.disFlag"
                                 :data="supAddForm.proList[_index].prodData"
                                 :chooseName.sync="supAddForm.proList[_index].prodPriceName"
                                 :chooseId.sync="supAddForm.proList[_index].prodPriceId"
                                 :autoChoose="true"
                                 :clear="true" >
                    </sino-select>
                  </sino-form-item>
                </li>
                <li>
                  <sino-form-item label="价格：" class="search-inner-item" ref="price" :prop="'proList['+_index+'].money'" :rules="[{type: 'number', required: true, message: '产品方案价格为必填项', trigger: 'change'}]">
                    <sino-input class="fl " v-model.number="supAddForm.proList[_index].money"></sino-input>
                    <div class="adddimreason-btn fl ml10"  @click="listAdd(_index)">
                      <!-- <i class="iconfont" :class="{'sino-add' : _index === 0, 'sino-reduce': _index !== 0}"></i><span class="ml5">{{_index === 0? '新增':'删除'}}</span>-->
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
        <sino-button type="primary" :disabled="saveBtnFlag" @click="prosubmitForm('supAddForm')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!-- 原文件下载 -->
    <sino-dialog :visible.sync="fileDownloadFlag"  class="usermanage" size="large" >
      <sino-title slot="title" type="levelOne" title="下载原文件" class="sino-dialog-title"></sino-title>
      <div class="sup-form">
        <sino-auto-table :data="tableDataA" stripe @select="selectCallBack" @select-all="selectAll" v-on:viewAll="viewAll" max-height="416" border>
          <sino-table-column type="selection" width="60" align="center"></sino-table-column>
          <sino-table-column prop="fileName" label="文件名"></sino-table-column>
          <sino-table-column prop="creTime" label="上传时间"></sino-table-column>
        </sino-auto-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downloadFun">下 载</sino-button>
      </span>
    </sino-dialog>
    <!--导入-->
    <sino-dialog :visible.sync="importFormFlag" size="small" class="leads-follow accuman-footer-margin dialog-item" v-on:close="resetDialog('importForm')">
      <sino-title slot="title" type="levelOne" title="文件导入" class="sino-dialog-title"></sino-title>
      <sino-form :model="importForm" ref="importForm" :rules="importFormRules" class="follow-select">
        <sino-form-item label="导入模板：" prop="temIdName" class="sup-Name">
          <sino-select class="fl"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="getDictSelectBox"
                       :data="{code:'TASK_TEMP',ids:[1,3,4]}"
                       :token="token"
                       :chooseName.sync="importForm.temIdName"
                       :chooseId.sync="importForm.temId"
                       :clear="true" >
          </sino-select>
        </sino-form-item>
        <sino-form-item label="付费供应商名称：" prop="paySuppIdName" class="sup-Name">
          <sino-select class="fl"
                       :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="selectbox"
                       :autoChoose="true"
                       :token="token"
                       :chooseName.sync="importForm.paySuppIdName"
                       :chooseId.sync="importForm.paySuppId"
                       :clear="true" >
          </sino-select>
        </sino-form-item>
        <sino-form-item label="导入文件：" prop="fileIdName" class="sup-Name" >
          <sino-upload
            ref="excelFile"
            :action="fileAction"
            :show-file-list="true"
            :auto-upload="true"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :on-remove="fileRemove"
            :headers="uploadHeader"
          >
            <div slot="trigger">
              <input class="uploadFileBox" type="text" readonly="true" v-model="importForm.fileIdName"/> <!--v-model="modifyAndAddForm.busLicName" -->
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" :disabled="grayDisFlag" @click="uploadFun">确 定</sino-button>
      </span>
    </sino-dialog>
    <sino-dialog :visible.sync="importVisible" size="small" class="remi-dialog">
      <sino-title slot="title" type="levelOne" title="导入结果" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <input type="hidden" v-model="importDetailForm.publishBatchId">
            <h6>导入文件名称</h6><span v-text="importDetailForm.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6><span>{{importDetailForm.totalCount}}<a v-if="importDetailForm.totalCount !== 0" href="javascript:void(0)" @click="importNumDown(importDetailForm.totalCountFileId)">下载</a></span>
          </li>
          <li>
            <h6>成功数量</h6><span>{{importDetailForm.successCount}}
            <!--<a v-if="importDetailForm.successCount !== 0" href="javascript:void(0)" @click="importSuccDown(importDetailForm.successCountFileId)">下载</a>-->
          </span>
          </li>
          <li>
            <h6>失败数量</h6><span>{{importDetailForm.failureCount}}<a v-if="importDetailForm.failureCount !== 0" href="javascript:void(0)" @click="importErrDown(importDetailForm.failureCountFileId)">下载</a></span>
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
    <!--下载模板-->
    <sino-dialog :visible.sync="downloadFlag" size="small" class="leads-follow dialog-item accuman-footer-margin dialog-item" v-on:close="cleanContent('downloadForm')">
      <sino-title slot="title" type="levelOne" title="下载模板" class="sino-dialog-title"></sino-title>
      <sino-form :model="downloadForm" ref="downloadForm" :rules="downloadFormRules" class="follow-select">
        <sino-form-item label="选择模板：" prop="taskTemplateIdName">
          <sino-select class="fl"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="getDictSelectBox"
                       :data="{code:'TASK_TEMP', ids: [1,3,4]}"
                       :chooseName.sync="downloadForm.taskTemplateIdName"
                       :chooseId.sync="downloadForm.taskTemplateId"
                       :clear="true" >
          </sino-select>
        </sino-form-item>
        <sino-form-item label="工资模版：" prop="wageIdsName" v-if="downloadForm.taskTemplateId ===2">
          <sino-select class="fl"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="getDictSelectBox"
                       :data="{code:'TASK_TEMP'}"
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
        <sino-form-item label="选择社保公积金：" prop="proPayIdsName" v-if="downloadForm.taskTemplateId ===3 || downloadForm.taskTemplateId ===5|| downloadForm.taskTemplateId ===7">
          <sino-select class="fl"
                       :filterable="false"
                       :multiselect="true"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :url="getDictSelectBox"
                       :data="{code:'TASK_PRO_PAY_TEMP'}"
                       :chooseName.sync="downloadForm.proPayIdsName"
                       :chooseId.sync="downloadForm.proPayIds"
                       :clear="true" >
          </sino-select>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="downloadTemFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  let callTip = function (_this, type, msg) {
    _this.getList();
    _this.supAdd = false;
    _this.$alert(msg, '提示信息', {
      confirmButtonText: '确 定',
      type: type, // icon图标类型
      dragFlag: true,
      customClass: '', // 添加class
      lockScroll: true,
      callback: action => {

      }
    });
  };
  let checkImgFileType = function (file, _this) {
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
  let checkedArr = '';
  export default {
    data () {
      return {
        prodUrl: this.apiPath.hrsc.findprodpricescheselectbox,
        listTaskPublishBatch: this.apiPath.hrsc.listTaskPublishBatch,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        suppUrl: this.apiPath.hrsc.findPaySuppSelectBox,
        selectbox: this.apiPath.hrsc.selectBox,  // g
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        findPriceSelectBoxEnable: this.apiPath.hrsc.findPriceSelectBoxEnable,
        uploadHeader: {Token: Cookie.get('Token')},
        token: Cookie.get('Token'),
        suppData: {token: Cookie.get('Token')},
        batchId: '',
        suppcontForm: {
          taskPublishState: '',
          taskDataSource: 1,
          taskPublishStateDict: '',
          begDate: '',
          endDate: ''
        },
        saveBtnFlag: true, // 维护产品信息弹层确定按钮是否可点
        importVisible: false,
        suppcontLoading: false,
        householdTypeList: [],
        supTypeList: '', // 供应商类型下拉下拉列表
        tableData: null,
        tableDataA: null,
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
            accuPayFeeWay: ''
          },
          proList: [
            {
              prodPriceName: '',
              prodPriceId: '',
              money: '',
              prodData: {title: '', disFlag: false} // 产品方案默认取值
            }
          ]
        },
        downloadFlag: false,
        downloadForm: {
          taskTemplateId: '',
          taskTemplateIdName: '',
          wageIdsName: [],
          wageIds: [],
          prodSchemeIdsName: [],
          prodSchemeIds: [],
          proPayIdsName: [],
          proPayIds: []
        }, // 下载模板的表单
        downloadFormRules: {
          taskTemplateIdName: [
            {required: true, message: '请选择模板', trigger: 'change'}
          ],
          wageIdsName: [
            {type: 'array', required: true, message: '请选择工资模版', trigger: 'change'}
          ],
          prodSchemeIdsName: [
            {type: 'array', required: true, message: '请选择产品方案', trigger: 'change'}
          ],
          proPayIdsName: [
            {type: 'array', required: true, message: '请选择代收代付项', trigger: 'change'}
          ]
        }, // 下载模板表单校验
        importFormFlag: false, // 导入表单开关
        importForm: {
          temIdName: '',
          temId: '',
          paySuppIdName: '',
          paySuppId: '',
          fileIdName: '',
          fileId: '',
          fileName: ''
        }, // 导入的表单
        importDetailForm: {
          fileId: '',
          fileName: '',
          totalCount: '',
          successCount: '',
          failureCount: '',
          importUserName: '',
          importTime: '',
          isIncludedDet: '',
          publishBatchId: ''
        },
        importFormRules: {
          temIdName: [
            {required: true, message: '请选择导入模板', trigger: 'change'}
          ],
          paySuppIdName: [
            {required: true, message: '请选择付费供应商名称', trigger: 'change'}
          ],
          fileIdName: [
            {required: true, message: '请上传导入文件', trigger: 'change'}
          ]
        }, // 导入表单校验
        fileDownloadFlag: false, // 下载原文件弹层开关
        custList: [],
        sinsPayFeeWayList: [],
        accuPayFeeWayList: [],
        publishBatchId: '',
        proList: [],
        accuPayFeeWayFlag: false,
        sinsPayFeeWayFlag: false,
        grayDisFlag: false, // 导入按钮点击置灰
        supAddNumForm: {
          succNum: '',
          totalEmpNum: '',
          custNum: ''
        },
        isDoup: '',
        exportImpBatchId: ''
      };
    },
    created () {
      this.uploadHeader.Token = Cookie.get('Token');
      this.searchFun();
    },
    mounted () {
      this.suppcontForm.taskPublishState = 0;
      this.suppcontForm.taskPublishStateDict = '未发布';
      api.post(this.getDictSelectBox, {code: 'PAY_FEE_WAY'}).then(res => {
        this.sinsPayFeeWayList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      api.post(this.getDictSelectBox, {code: 'PAY_FEE_WAY'}).then(res => {
        this.accuPayFeeWayList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      checkChange (item) {
        if (item === true) {
          this.isDoup = 1;
        } else {
          this.isDoup = 0;
        }
      },
      // 导入结果--->确定
      impResFun () {
        this.searchFun();
        this.importVisible = false;
        if (this.importDetailForm.impTempType === 1) {
          this.publishBatchId = this.importDetailForm.publishBatchId;
          this.manageRisk(this.importDetailForm.publishBatchId, this.importDetailForm.impBatchId, true);
        }
      },
      viewAll (pageNum, pageSize) {
        this.suppcontForm.isClerkImport = 0;
        let _data = {
          data: this.suppcontForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.listTaskPublishBatch, _data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
          this.suppcontLoading = false;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.suppcontLoading = true;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 源文件选择
      selectCallBack (selectTion, row) {
        checkedArr = selectTion;
      },
      selectAll (ele) {
        checkedArr = [];
        ele.forEach(function (list) {
          if (list.flag !== 1) {
            checkedArr.push(list);
          }
        });
      },
      // 导入文件下载
      importErrDown (_data) {
        api.postsign(this.apiPath.hrsc.downloadFilePublic, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importNumDown (_data) {
        api.postsign(this.apiPath.hrsc.downloadFilePublic, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importSuccDown (_data) {
        api.postsign(this.apiPath.hrsc.downloadFilePublic, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
//      原文件下载弹层
      oldFileDownload (data) {
        let _data = {
          publishBatchId: data
        };
        api.post(this.apiPath.hrsc.listTaskImportBatch, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataA = res.data;
            this.fileDownloadFlag = true;
          }
        }).catch(err => {
          console.log(err);
        });
      },
//      下载确定按钮
      downloadFun () {
        if (!checkedArr || checkedArr.length < 1) {
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
        let arr = [];
        checkedArr.forEach(function (item, index) {
          arr.push(item.fileId);
        });
        api.post(this.apiPath.hrsc.batchDownloadImportFile, arr).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
            this.fileDownloadFlag = false;
          }
        });
      },
      // 下载模板确定
      downloadTemFun () {
        let _this = this;
        _this.$refs.downloadForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.downloadTaskTemplate, this.downloadForm).then(res => {
              if (res.code === 'CPYY-00001') {
                api.download(res.data);
                this.downloadFlag = false;
                return;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      // 导入文件确定
      uploadFun () {
        let _this = this;
        if (_this.grayDisFlag === true) { return; }
        _this.$refs.importForm.validate((valid) => {
          if (valid) {
            _this.grayDisFlag = true;
            let _data = {
              paySuppId: this.importForm.paySuppId,
              fileId: this.importForm.fileId,
              tempId: this.importForm.temId,
              isClerk: 0
            };
            api.post(this.apiPath.hrsc.signSuppTaskImportResult, _data).then(res => {
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
      // 维护产品
      mainProdoct () {
        this.importVisible = false;
        this.supAdd = true;
      },
      // 维护产品
      manageRisk (data, impBatchId, bool) {
        let _this = this;
        this.exportImpBatchId = impBatchId;
        api.post(_this.apiPath.hrsc.findCustName, {publishBatchId: data, impBatchId: impBatchId}).then(res => {
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
            _this.publishBatchId = data;
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
                    for (let i = 0; i < _this.custList.length; i++) {
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
                    for (let j = 0; j < _this.custList.length; j++) {
                      _this.supAddForm.proList.forEach(function (item, index) {
                        item.prodData.disFlag = false;
                        _this.sinsPayFeeWayFlag = false;
                        _this.accuPayFeeWayFlag = false;
                        if (_this.custList[j].sinsProdPriceName === '社保代理服务') {
                          _this.supAddForm.proList[0].prodData.disFlag = true;
                          _this.sinsPayFeeWayFlag = true;
                        }
                        if (_this.custList[j].accuProdPriceName === '公积金代理服务') {
                          if (_this.custList[j].sinsProdPriceName === '社保代理服务') {
                            _this.supAddForm.proList[1].prodData.disFlag = true;
                          } else {
                            _this.supAddForm.proList[0].prodData.disFlag = true;
                          }
                          _this.accuPayFeeWayFlag = true;
                        }
                      });
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
                _this.accuPayFeeWayFlag = false;
                _this.sinsPayFeeWayFlag = false;
                item.prodData.disFlag = false;
                if (list.sinsProdPriceName === '社保代理服务') {
                  _this.supAddForm.proList[0].prodData.disFlag = true;
                  _this.sinsPayFeeWayFlag = true;
                }
                if (list.accuProdPriceName === '公积金代理服务') {
                  if (list.sinsProdPriceName === '社保代理服务') {
                    _this.supAddForm.proList[1].prodData.disFlag = true;
                  } else {
                    _this.supAddForm.proList[0].prodData.disFlag = true;
                  }
                  _this.accuPayFeeWayFlag = true;
                }
              });
            };
          }
        }).catch(err => {
          console.log(err);
        });
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
          console.log(_this.supAddForm.proList);
        } else {
          _this.supAddForm.proList.splice(index, 1);
        }
      },
      // 维护产品保存
      saveForm () {
        let _this = this;
        this.$refs.supAddForm.validate((valid) => {
          if (valid) {
            let _data;
            let _supAddForm = JSON.parse(JSON.stringify(_this.supAddForm));
            _supAddForm.taskTemp.publishBatchId = this.publishBatchId;
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
//                this.manageRisk();
                this.$message({
                  message: '维护成功！',
                  type: 'success',
                  onClose: function () {
                    // 获取左侧客户列表信息
                    api.post(_this.apiPath.hrsc.findCustName, {publishBatchId: _this.publishBatchId, impBatchId: _this.exportImpBatchId}).then(res => {
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
      prosubmitForm () {
        this.supAdd = false;
        this.searchFun();
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
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      impFun: function () {
        // 查询默认付费供应商
        api.post(this.apiPath.hrsc.findPaySuppSelectBox, {}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.data.list && res.data.list.length === 1) {
              this.importForm.paySuppId = res.data.list[0].id;
              this.importForm.paySuppIdName = res.data.list[0].title;
            }
          }
        }).catch(err => {
          console.log(err);
        });
        this.importFormFlag = true;
      },
      dowFun: function () {
        this.downloadFlag = true;
      },
      // 删除
      delFun (data) {
        this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          let dto = {
            publishBatchId: data,
            isEffect: 0
          };
          let _this = this;
          api.post(this.apiPath.hrsc.updateTaskPublishBatchState, dto).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(() => {
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      // 确 认
      submitForm (formName) {
        if (this.formState === 'add') {
          this.$refs[formName].validate((valid) => { // 新增
            if (valid) {
              if (this.supAddForm.mobile === '' && this.supAddForm.email === ''  && this.supAddForm.tel === '') {
                return;
              }
              api.post(this.apiPath.hrsc.findSave, this.supAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        } else {
          this.$refs[formName].validate((valid) => { //  修改
            if (valid) {
              if (this.supAddForm.mobile === '' && this.supAddForm.email === ''  && this.supAddForm.tel === '') {
                return;
              }
              api.post(this.apiPath.hrsc.findUpdate, this.supAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          });
        }
      },
      // 发布
      confi (data) {
        let _data = {
          publishBatchId: data,
          taskPublishState: '1'
        };
        let _this = this;
        api.post(_this.apiPath.hrsc.updateTaskPublishBatchState, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.searchFun();
            this.$message({message: '发布成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      fileRemove (file) {
        this.importForm.fileIdName = '';
      },
      getFileName (file, filelist) {
        if (checkImgFileType(file, this)) {
          if (filelist.length > 1) {
            filelist = filelist.splice(0, 1);
          }
          this.importForm.fileIdName = file.name;
          this.$refs.excelFile.submit();
        } else {
          this.$refs.excelFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.importForm.fileId = res.data;
        } else {
          this.importForm.fileIdName = '';
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
      cleanContent (formName) {
        this.$refs[formName].resetFields();
        this.downloadForm.proPayIds = [];
        this.downloadForm.proPayIdsName = [];
        this.downloadForm.prodSchemeIds = [];
        this.downloadForm.prodSchemeIdsName = [];
        this.downloadForm.wageIdsName = [];
        this.downloadForm.wageIds = [];
      },
      resetDialog (formName) {
        this.$refs[formName].resetFields();
        this.$refs.excelFile.clearFiles();
      }
    }
  };
</script>
