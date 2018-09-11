<template>
  <!--<div>社保申报审核</div>-->
  <div class="usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">合计</div>
          <div class="sino-tabs-item" @click="prodScheFun">详情</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="accuauditForm" ref="accuauditForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="单位公积金账号：" class="search-inner-item" prop="unitNo">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.unitNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="公积金账户名称：" class="search-inner-item" prop="accuAcctName">
                <sino-input class="fl" type="text"
                            v-model="accuauditForm.accuAcctName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="执行地区：" class="search-inner-item" prop="execuAreaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="accuauditForm.execuAreaName"
                             :chooseId.sync="accuauditForm.execuAreaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
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
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="eavFun"><i class="iconfont sino-queren"></i>审核通过</sino-button>
            <sino-button type="icon-text" @click="conFun"><i class="iconfont sino-zhangdan-copy"></i>差异对比</sino-button>
            <sino-button type="icon-text" @click="downFun"><i class="iconfont sino-download-copy"></i>下载申报表</sino-button>
          </div>
        </div>
        <div class="sino-queryspan">
          <span>合计：<em>{{total? total : 0}}</em> 条
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            已勾选：<em>{{checkedArr.length}}</em> 条
          </span>
        </div>
        <sino-table :data="sinsDeclData" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40" prop="pkgId"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="unitNo" label="单位公积金账号" min-width="120"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="公积金账户名称" min-width="120"></sino-table-column>
          <sino-table-column prop="accuProp" label="比例"></sino-table-column>
          <sino-table-column prop="execuAreaName" label="执行地区"></sino-table-column>
          <sino-table-column prop="chargeEndDay" label="截单日"></sino-table-column>
          <sino-table-column prop="addPerNum" label="增加人数"></sino-table-column>
          <sino-table-column prop="reducePerNum" label="减少人数"></sino-table-column>
          <sino-table-column prop="readdPerNum" label="补缴人数"></sino-table-column>
          <sino-table-column prop="chanBaseNum" label="调基人数"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--差异对比-->
    <sino-dialog :visible.sync="conFlag" size="small" class="batch-import float" v-on:close="resetForm('conForm')">
      <sino-title slot="title" type="levelOne" title="差异比对" class="sino-dialog-title"></sino-title>
      <sino-form :model="conForm" ref="conForm" class="demo-ruleForm">
        <sino-form-item label="执行地区：" class="search-inner-item" prop="execuAreaName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :url="findAreaListByBusiAreaType"
                       :chooseName.sync="conForm.execuAreaName"
                       :chooseId.sync="conForm.execuAreaId"
                       :data="{data: {busiAreaTypes:[1]}}"
                       :clear="true"></sino-select>
        </sino-form-item>
        <sino-form-item prop="fileName" label="上传文件：" class="search-inner-item">
          <sino-upload
            ref="fileNameFile"
            :action="fileAction"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :headers="uploadHeader"
          >
            <div slot="trigger">
              <input class="uploadFileBox" v-model="conForm.fileName" readonly="true"/>
              <span class="chooseFileButton">上传</span>
            </div>
          </sino-upload>
        </sino-form-item>
        <sino-button class="clear mgauto" type="primary" @click="upBankData">确 定</sino-button>
      </sino-form>
    </sino-dialog>
    <sino-dialog :visible.sync="importVisible" class="dialog-auto">
      <sino-title slot="title" type="levelOne" title="差异比对"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>导入文件名称</h6>
            <span v-text="conDetailForm.fileName"></span>
          </li>
          <li>
            <h6>导入总数</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.totalSize" ></i><i v-show="conDetailForm.totalSize>0" class="file-del-btn" v-on:click="importNumDown">下载</i></div></span>
          </li>
          <li>
            <h6>比对总数</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.succSize" ></i><i v-show="conDetailForm.succSize>0" class="file-del-btn" v-on:click="importSuccDown(conDetailForm.backSuccessPath)">下载</i></div></span>
          </li>
          <li>
            <h6>差异数据</h6>
            <span><div class="file-upload-see"><i v-text="conDetailForm.failSize" ></i><i  v-show="conDetailForm.failSize>0" class="file-del-btn" v-on:click="importSuccDown(conDetailForm.backFailPath)">下载</i></div></span>
          </li>
          <li>
            <h6>导入人</h6>
            <span v-text="conDetailForm.oprRoleName"></span>
          </li>
          <li>
            <h6>导入时间</h6>
            <span v-text="conDetailForm.oprTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer">
              <sino-button type="primary" @click="confirm">确 定</sino-button>
          </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
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
    data () {
      return {
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,   //  地区下拉框
        checkedArr: [],
        accuauditForm: {
          unitNo: '',
          accuAcctName: '',
          execuAreaName: '',
          execuAreaId: ''
        },
        activeOnyNum: '',
        sinsDeclData: null,
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
        activeName: 'first',
        uploadData: '',
        uploadHeader: {Token: ""},
        conFlag: false,
        importVisible: false,
        conForm: {
          execuAreaName: '',
          execuAreaId: '',
          fileName: '',
          fileNo: ''
        },
        fileName: '',
        conDetailForm: {
          succSize: '',
          failSize: '',
          totalSize: '',
          backSuccessPath: '',
          backFailPath: '',
          oprRoleId: '',
          oprRoleName: '',
          oprTime: ''
        }
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      prodScheFun (order) {
        if (this.checkedArr.length > 1) {
          this.$alert('只能选择一条社保信息。', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {}
          });
        } else {
          if (this.checkedArr.length === 1) {
            this.$router.push({path: '/accuAuditDetail', query: {"accuAcctId": this.checkedArr[0].accuAcctId, "unitNo": this.checkedArr[0].unitNo, "accuAcctName": this.checkedArr[0].accuAcctName}});
          } else {
            this.$router.push({path: '/accuAuditDetail', query: {"accuAcctId": ''}});
          }
        }
      },
      selectCallBack (selectTion, row) {
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.accuauditForm
        };
        api.post(this.apiPath.accu.findMonthlyDetAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 审核通过
      eavFun () {
        if (!this.checkedArr || this.checkedArr.length < 1) {
          this.$alert('请选择至少一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        let accuAcctIdList = this.checkedArr.map(function (list) {
          return list.accuAcctId;
        });
        api.post(this.apiPath.accu.updateStateTotal, {accuAcctIdList: accuAcctIdList}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '审核通过！', type: 'success'});
            this.searchFun();
          }
        });
      },
      // 下载申报表
      downFun () {},
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 差异对比
      conFun () {
        this.conFlag = true;
      },
      delFile (form, name) {
        this.$refs[form].clearFiles();
        this.conForm[name] = '';
        this.conForm[name + 'Name'] = '';
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.$set(this.conForm, 'fileName', file.name);
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      upBankData () {
        if (this.conForm.fileName === '') {
          this.$alert('请选择文件！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning',
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true
          });
        } else {
          this.$refs.fileNameFile.submit();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.conForm.fileNo = res.data;
          this.activeOnyNum = res.data;
          if (this.conForm.fileNo) {
            let obj = {
              fileUniqueNo: this.conForm.fileNo,
              executeAreaId: this.conForm.execuAreaId
            };
            api.post(this.apiPath.accu.accuDifferenceComparison, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                this.conDetailForm = res.data;
                this.conDetailForm.fileName = this.conForm.fileName;
                this.importVisible = true;
                this.conFlag = false;
              }
            });
          }
        } else {
          this.conForm.fileName = '';
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
      confirm () {
        this.importVisible = false;
        this.conFlag = false;
      },
      importNumDown () {
        api.postsign(this.apiPath.sins.uploadContExcelAction, this.activeOnyNum).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        });
      },
      importSuccDown (item) {
        api.download(item);
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
