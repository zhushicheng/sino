<template>
  <!--回盘导入-->
  <div>
    <div class="usermanage" v-if="!routerView">
      <sino-con>
        <sino-title type="levelOne" title="回盘导入查询"></sino-title>
        <sino-form :model="serchFrom"  ref="serchFrom"  class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <sino-form-item label="单位公积金账号：" class="search-inner-item" prop="reimOrderNo">
                  <sino-input class="fl" type="text" :disabled="false" v-model="serchFrom.unitRegiNo"></sino-input>
                </sino-form-item>
              </li>
              <li class="search-inner-one">
                <sino-form-item label="公积金账户名称：" class="search-inner-item" prop="accuAcctName">
                  <div class="search-inner-radiofl" >
                    <sino-select :filterable="false"
                                 :multiselect="false"
                                 :isshowTotol="false"
                                 :disabled="false"
                                 :totalNum="false"
                                 :isPage="true"
                                 :isGroup="false"
                                 :url="getDictSelectBox"
                                 :chooseName.sync="serchFrom.accuAcctName"
                                 :chooseId.sync="serchFrom.accuAcctId"
                                 :data="{title:''}"
                                 :clear="true"></sino-select>
                  </div>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="执行地区：" class="search-inner-item" prop="areaName">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="true"
                               :isGroup="false"
                               :url="findAreaListByBusiAreaType"
                               :chooseName.sync="serchFrom.areaName"
                               :chooseId.sync="serchFrom.areaId"
                               :data="{title:'', data: {busiAreaTypes: [1]}}"
                               :clear="true"></sino-select>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="申报年月：" class="search-inner-item" prop="applyMon">
                  <sino-date-picker class="fl"
                                    type="month"
                                    :editable="false"
                                    :readonly="false"
                                    v-model="serchFrom.applyMon"
                                    :clearable="true">

                  </sino-date-picker>
                </sino-form-item>
              </li>
            </ul>
          </div>
          <div class="search-button">
            <div class="search-button-box">
              <sino-button type="primary" @click="serchFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--search result-->
      <div class="sino-queryList">
        <div class="sino-table-total">
          <div class="sino-table-icon">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="counterBack"><i class="iconfont sino-import"></i>回盘导入</sino-button>
            </div>
          </div>
          <sino-table :data="payTableData" max-height="416" v-on:viewAll="viewAll" border stripe v-on:select="selectCallBack">
            <sino-table-column type="selection"></sino-table-column>
            <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
            <sino-table-column prop="unitRegiNo" label="单位公积金账号" min-width="180"></sino-table-column>
            <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="180"></sino-table-column>
            <sino-table-column prop="areaName" label="执行地区" min-width="105"></sino-table-column>
            <sino-table-column prop="applyMonString" label="申报年月" min-width="105"></sino-table-column>
            <sino-table-column prop="accuProp" label="比例（%）" min-width="120"></sino-table-column>
            <sino-table-column prop="creTime" label="导入时间" min-width="95"></sino-table-column>
            <sino-table-column prop="dealResultName" label="差异数据" min-width="95"></sino-table-column>
            <sino-table-column label="操作" align="center" width="100" fixed="right">
              <template scope="scope">
                <template v-if="scope.row.oper == true">
                  <span class="table-span" @click="defreFun(scope.row)">差异处理</span>
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
      <sino-dialog :visible.sync="importFlag" size="small" :top="'15%'" class="dialog-height overflow-dialog custbuscon-dialog returnPlant" v-on:close="resetForm('importForm')">
        <sino-title slot="title" type="levelOne" title="回盘导入" class="sino-dialog-title"></sino-title>
        <sino-form :model="importForm" :rules="importFormRule" ref="importForm" class="demo-sendAddrAddForm">
          <sino-form-item label="执行地区：" class="h25" prop="areaName">
            <sino-select :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="findAreaListByBusiAreaType"
                         :data="{title:'', data: {busiAreaTypes: [1]}}"
                         :chooseName.sync="importForm.areaName"
                         :chooseId.sync="importForm.areaId"
                         :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="申报年月：" prop="applyMon">
            <sino-date-picker
              v-model="importForm.applyMon"
              type="month"
              :editable="false"
              :readonly="false"
              :clearable="true">
            </sino-date-picker>
          </sino-form-item>
          <sino-form-item prop="fileLength" label="上传文件：" style="width:56%;" class="sino-form-item1 returnImport">
            <sino-upload
              ref="conFile"
              :action="uploadFilePublic"
              :show-file-list="true"
              :auto-upload="true"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-remove="handleRemove"
              :on-error="fileError"
              :headers="headerToken"
            >
              <div slot="trigger">
                <input type="hidden" v-model="importForm.fileLength">
                <input class="uploadFileBox" type="text" readonly="true"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
        </sino-form>
        <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('importForm')">确 定</sino-button>
      </span>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  let checkedArr = '';
  export default {
    name: "payadmin",
    data () {
      return {
        getDictSelectBox: this.apiPath.accu.findAccuAcctSelect, // 公积金账户名称下拉框
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType, // 根据业务类型获取地区下拉框
        uploadFilePublic: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        headerToken: {"Token": Cookies.get('Token')},
        // 查询的条件
        serchFrom: {
          unitRegiNo: '',      // 单位公积金账号
          accuAcctId: '',    // 公积金账户ID
          accuAcctName: '',    // 公积金账户名称
          areaId: '',    // 执行地区
          areaName: '',    // 执行地区名称
          applyMon: this.dataSwitch()   // 执行年月
        },
        payTableData: null,
        routerView: false,
        total: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        fileName: '',
        importFlag: false,
        filePublicId: '', // 文件Id
        fileInfosPublic: [], // 文件list
        importForm: {
          areaId: '',
          areaName: '',
          applyMon: '',
          fileLength: 0,
          fileInfos: []
        },
        importFormRule: {
          areaName: [
            {required: true, trigger: 'change', message: '请选择执行地区'}
          ],
          applyMon: [
            {type: 'date', required: true, trigger: 'change', message: '请选择申报年月'}
          ],
          fileLength: [
            {type: 'number', min: 1, required: true, trigger: 'change', message: '请上传文件'}
          ]
        }
      };
    },
    watch: {
      $route: {
        handler: function (val) {
          if (val.path === "/accuCounteroffer") {
            this.routerView = false;
          }
        },
        deep: true
      },
      fileInfosPublic: {
        handler (value, oldValue) {
          this.importForm.fileLength = value.length;
        },
        deep: true
      }
    },
    mounted () {
      this.validator.addEnterEvent(this.serchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      dataSwitch () {
        let y = new Date().getFullYear();
        let m = new Date().getMonth() + 1;
        if (m < 10) { m = '0' + m; };
        return '' + y + '-' + m;
      },
      // 最上面的查询
      serchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      getFileName (file, fileList) {
        this.filePublicId = file.name;
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.fileInfosPublic.push({fileId: res.data, fileName: this.filePublicId});
          // this.importForm.fileInfos[0].fileId  = res.data;
          // this.importForm.fileId  = res.data;
        }
      },
      handleRemove (file, fileList) {
        this.fileInfosPublic = this.fileInfosPublic.filter(item => {
          if (item.fileName != file.name) {
            return item;
          }
        });
        // this.importForm.fileId = '';
        // this.importForm.fileInfos[0].fileId = '';
        // this.importForm.fileInfos[0].fileName = '';
      },
      fileError () {
        // this.importForm.fileId = '';
        // this.importForm.fileInfos[0].fileId = '';
        // this.importForm.fileInfos[0].fileName = '';
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
      viewAll (pageNum, pageSize) {
        let params = JSON.parse(JSON.stringify(this.serchFrom));
        params.applyMon = Vue.filter('date')(params.applyMon, 'yyyyMM');
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: params
        };
        api.post(this.apiPath.accu.findCounterofferImpTotal, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.payTableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        checkedArr = selectTion;
        for (let item of checkedArr) {
          if (this.confirmForm.reimOrderIdS.indexOf(item.reimOrderId) === -1) {
            this.confirmForm.reimOrderIdS.push(item.reimOrderId);
          }
        }
      },
      confirm () {
        if (checkedArr.length <= 0) {
          this.$alert('至少选择一条数据！', '温馨提示', {
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
        this.confirmFalg = true;
      },
      upload (scope) {
        this.uploadFileFrom.reimOrderId = scope.reimOrderId;
        this.uploadForm = true;
      },
      defreFun (item) {
        this.routerView = true;
        this.$router.push({path: '/accuCounteroffer/accuDiffProcess', query: {accuAcctId: item.accuAcctId, executeMon: item.applyMon, accuAcctName: item.accuAcctName, unitRegiNo: item.unitRegiNo}});
      },
      counterBack () {
        this.importFlag = true;
      },
      submitForm (formName) { // 回盘导入--导入文件校验
        this.$refs[formName].validate((valid) => { // 回盘导入--导入文件校验
          if (valid) {
            // this.$refs.batchUpload.submit();
            this.importForm.fileInfos = this.fileInfosPublic;
            let params = JSON.parse(JSON.stringify(this.importForm));
            let _this = this;
            params.applyMon = Vue.filter('date')(params.applyMon, 'yyyyMM');
            api.post(this.apiPath.accu.counterofferImpCheck, params).then(res => {
              if (res.code === 'CPYY-00001') {
                this.importFlag = false;
                if (res.data.message) {
                  this.$alert(res.data.message, '温馨提示', {
                    confirmButtonText: '确 定',
                    type: 'warning', // icon图标类型
                    dragFlag: true,
                    customClass: '', // 添加class
                    lockScroll: true,
                    callback: action => {
                      if (action === 'confirm') {
                        _this.compareDataAction(res.data.counterofferImp);
                      }
                    }
                  });
                } else {
                  this.compareDataAction(res.data.counterofferImp);
                }
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      compareDataAction (param) { // 差异对比
        let _this = this;
        api.post(this.apiPath.accu.compareDataAction, param).then(res => {
          console.log(param);
          if (res.code === 'CPYY-00001') {
            if (res.data.accuAcctId != 0) {
              this.$alert('数据存在差异，请进行差异处理', '温馨提示', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  if (action === 'confirm') {
                    _this.routerView = true;
                    _this.$router.push({path: '/accuCounteroffer/accuDiffProcess', query: {accuAcctId: res.data.accuAcctId, executeMon: res.data.applyMon, accuAcctName: res.data.accuAcctName, unitRegiNo: res.data.unitRegiNo}});
                  } else {
                    _this.serchFun();
                  }
                }
              });
            } else {
              this.$message({message: '对比的数据无差异！', type: 'success'});
              this.serchFun();
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this.importForm.fileInfos[0].fileName = '';
        this.importForm.fileInfos[0].fileId = '';
      }
    }
  };
</script>
