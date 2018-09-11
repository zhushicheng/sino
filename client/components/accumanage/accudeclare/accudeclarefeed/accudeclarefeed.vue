<template>
  <!--产品信息管理-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="tabChange('first')">全部</div>
          <div class="sino-tabs-item" @click="tabChange('second')">申报</div>
          <div class="sino-tabs-item is-active">申报反馈</div>
          <div class="sino-tabs-item" @click="tabChange('four')">回单</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">执行地区：</span>
              <sino-select
                class="fl"
                :filterable="true"
                :multiselect="false"
                :isshowTotol="false"
                :disabled="false"
                :totalNum="true"
                :isPage="true"
                :isGroup="false"
                :chooseName.sync="searchForm.areaName"
                :chooseId.sync="searchForm.areaId"
                :clear="true"
                :url="findAreaListByBusiAreaType"
                :data="{data: {busiAreaTypes:[1]}}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">单位账号：</span>
              <sino-input type="text" class="fl" v-model="searchForm.unitRegiNo"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">账户名称：</span>
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="findAccuAcctSelect"
                         :chooseName.sync="searchForm.accuAcctName"
                         :chooseId.sync="searchForm.accuAcctId"
                         :clear="true" >
            </sino-select>
            </li>
            <li>
              <span class="search-inner-name">缴费方式：</span>
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           class="fl"
                           :url="getDictSelectBox"
                           :data="{code: 'PAY_FEE_WAY'}"
                           :chooseName.sync="searchForm.payFeeWayName"
                           :chooseId.sync="searchForm.payFeeWay"
                           :clear="true"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchTotalFun">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <sino-table :data="tableDataTotal" border max-height="416" stripe v-on:select="selectCallBack" v-on:viewAll="viewAll">
        <!--<sino-table-column type="selection" width="40"></sino-table-column>-->
        <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
        <sino-table-column prop="unitRegiNo" label="单位账号" min-width="180"></sino-table-column>
        <sino-table-column prop="accuAcctName" label="账户名称"></sino-table-column>
        <sino-table-column prop="areaName" label="执行地区" min-width="105"></sino-table-column>
        <sino-table-column prop="payFeeWayName" label="缴费方式"></sino-table-column>
        <sino-table-column prop="applyPerNum" label="申报人数" min-width="180"></sino-table-column>
        <sino-table-column prop="quesPerNum" label="问题人员" min-width="95"></sino-table-column>
        <sino-table-column prop="quesFeedbackPerNum" label="已反馈问题人员" min-width="180"></sino-table-column>
        <sino-table-column prop="applySuccPerNum" label="申报成功" min-width="95"></sino-table-column>
        <sino-table-column label="操作" align="center" class="user-btns" width="194" fixed="right">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="feedbackFun(scope.row)">申报反馈</span><i class="table-i">|</i>
              <span class="table-span" @click="feedsuccFun(scope.row)">申报成功</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
    </div>
    <!--申请反馈-->
    <sino-dialog :visible.sync="batchLeadFlag" :top="'30%'" class="batch-error batch-error-no-padding" v-on:close="resetFun('batchLeadForm')">
      <sino-title slot="title" type="levelOne" title="申请反馈" class="sino-dialog-title"></sino-title>
      <div class="order-new">
        <i class="iconfont sino-tip"></i><span>问题人员标准模板</span><span class="down-load-btn" @click="clickDownFn">点击下载</span>
      </div>
      <sino-form :model="batchLeadForm" :rules="batchLeadRules" ref="batchLeadForm">
        <sino-form-item prop="fileName" label="上传文件：" class="sino-form-item-width is-required">
          <sino-upload
            class="upload-demo"
            ref="batchUpload"
            :action="uploadUrl"
            :show-file-list="false"
            :auto-upload="true"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :headers="headerToken"
            :on-error="fileError"
          >
            <div slot="trigger">
              <input class="uploadFileBox" type="text" v-model="batchLeadForm.fileName" readonly="true"/>
              <span class="chooseFileButton">上传</span>
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitUpload">确 定</sino-button>
        </span>
    </sino-dialog>

    <sino-dialog :visible.sync="batchLeadSeeFlag" size="small" class="remi-dialog">
      <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <input type="hidden" v-model="batchLeadSeeList.fileId"/>
            <h6>文件名称</h6><span v-text="batchLeadSeeList.fileName"></span>
          </li>
          <li>
            <h6>总数量</h6><span>{{batchLeadSeeList.totalNum}}<a v-if="batchLeadSeeList.totalNum !== 0" href="javascript:void(0)" @click="batchAllDownload(batchLeadSeeList.batchNo)">下载</a></span>
          </li>
          <li>
            <h6>成功数量</h6><span>{{batchLeadSeeList.succNum}}<a v-if="batchLeadSeeList.succNum !== 0" href="javascript:void(0)" @click="batchSuccDownload(batchLeadSeeList.batchNo)">下载</a></span>
          </li>
          <li>
            <h6>失败数量</h6><span>{{batchLeadSeeList.failNum}}<a v-if="batchLeadSeeList.failNum !== 0" href="javascript:void(0)" @click="batchFailDownload(batchLeadSeeList.batchNo)">下载</a></span>
          </li>
          <li>
            <h6>导入操作人</h6><span v-text="batchLeadSeeList.operName"></span>
          </li>
          <li>
            <h6>导入时间</h6><span v-text="batchLeadSeeList.operTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="batchInport">确 定</sino-button>
      </span>
    </sino-dialog>

  </div>
</template>
<script>
  import api from '../../../../api/index';
  import Cookies from 'js-cookie';
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
  export default {
    components: {},
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        findAccuAcctSelect: this.apiPath.accu.findAccuAcctSelect,
        headerToken: {"Token": Cookies.get('Token')},
        batchLeadFlag: false,
        searchFlag: true,
        searchForm: {
          areaId: '',
          areaName: '',
          unitRegiNo: '',
          payFeeWay: '',
          payFeeWayName: '',
          accuAcctName: '',
          accuAcctId: ''
        },
        trackStatus: [],
        checkedArr: [],
        activeNameTab: 'one',
        batchLeadForm: {
          accuAcctId: '',
          fileId: '',
          fileName: '',
          areaId: ''
        },
        tableDataTotal: null,
        tableDataDetail: null,
        total: null,
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        batchLeadSeeFlag: false,
        batchLeadSeeList: {
          fileName: '',
          totalNum: '',
          succNum: '',
          failNum: '',
          operName: '',
          succPath: '',
          failPath: '',
          fileId: '',
          executeMon: '',
          areaId: '',
          accuAcctId: '',
          operTime: ''
        },
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        batchLeadRules: {
          fileName: [
            {required: true, message: '请添加上传文件', trigger: 'change'}
          ]
        }
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchTotalFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // tab 选项卡点击回调事件
      tabChange (order) {
        if (order === 'first') {
          this.$router.push({path: '/accuDeclareAll'});
        } else if (order === 'second') {
          this.$router.push({path: '/accuDeclarePage'});
        } else {
          this.$router.push({path: '/accuDeclareReceipt'});
        }
      },
      handleClick (name) {
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        this.checkedArr = selectTion;
      },
      resetForm: function () { // 修改对话框打开回调
      },
      searchDetailFun () {},
      searchTotalFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.searchForm
        };
        api.post(this.apiPath.accu.findApplyPerNum, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableDataTotal = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 主重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      getFileName (file, filelist) {
        if (checkImgFileType(file, this)) {
          if (filelist.length > 1) {
            filelist = filelist.splice(0, 1);
          }
          this.batchLeadForm.fileName = file.name;
        } else {
          this.$refs.batchUpload.clearFiles();
        }
      },
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.batchLeadForm.fileId = res.data;
        } else {
          this.allomeForm.paidFileName = '';
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
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      declareFun (num) {},
      feedbackFun (item) {
        this.batchLeadFlag = true;
        this.batchLeadForm.accuAcctId = item.accuAcctId;
        this.batchLeadForm.areaId = item.areaId;
      },
      feedsuccFun (item) {
        let obj = {
          accuAcctId: item.accuAcctId
        };
        api.post(this.apiPath.accu.declSuccess, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '申报成功！', type: 'success'});
            this.searchTotalFun();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchAllDownload (batchNo) {
        api.postsign(this.apiPath.accu.downloadRecDeclFile, this.batchLeadSeeList.fileId).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchSuccDownload (batchNo) {
        api.download(this.batchLeadSeeList.succPath);
      },
      batchFailDownload (batchNo) {
        api.download(this.batchLeadSeeList.failPath);
      },
      batchInport () {
        this.batchLeadSeeFlag = false;
        this.searchTotalFun();
      },
      clickDownFn (item) {
        api.postsign(this.apiPath.hrsc.downloadByType, 27).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      submitUpload () {
        this.$refs.batchLeadForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.accu.impQuestionPer, this.batchLeadForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.batchLeadSeeFlag = true;
                this.batchLeadFlag = false;
                this.batchLeadSeeList = res.data;
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>
