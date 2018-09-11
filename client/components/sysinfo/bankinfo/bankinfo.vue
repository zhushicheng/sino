<template>
  <div class="usermanage">
    <!--银行管理-->
    <sino-con>
      <sino-title type="levelOne" title="银行管理"></sino-title>
      <sino-form :model="bankForm" ref="ruleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">银行类型：</span>
              <sino-select class="fl" :tipText="''"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="bankForm.bankTypeName"
                           :chooseId.sync="bankForm.bankType"
                           :data="{code: 'BANK_TYPE'}" :clear="true"
                           :url="bankTypeUrl"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">银行名称：</span>
              <sino-input type="text" class="fl" v-model="bankForm.bankName" :disabled="false"></sino-input>
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
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button class="fl" type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
            <sino-button class="fl" type="icon-text" @click="downloadFun"><i class="iconfont sino-download-copy"></i>下载模板
            </sino-button>
            <sino-button type="icon-text" @click="importFun"><i class="iconfont sino-export"></i>导入</sino-button>
          </div>
        </div>
        <sino-table :data="bankInfoData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="bankTypeName" label="银行类型"></sino-table-column>
          <sino-table-column prop="bankNo" label="联行号" min-width="120"></sino-table-column>
          <sino-table-column prop="bankName" label="银行名称" min-width="180"></sino-table-column>
          <sino-table-column prop="bankAddr" label="银行地址" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" fixed="right" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="delFun(scope.row)">删除</span>
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
    <!-- 新增-->
    <sino-dialog :visible.sync="bankInfoFlag" size="large" :top="'10%'" class="dialog-height" @close ="cleanContent('bankInfoForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="bankInfoForm" :rules="bankInfoRules" ref="bankInfoForm" class="demo-sendAddrAddForm">
        <sino-form-item label="银行类型：" prop="bankTypeName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="bankInfoForm.bankTypeName" :chooseId.sync="bankInfoForm.bankType" :data="{code: 'BANK_TYPE'}" :clear="true" :url="bankTypeUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="联行号：" prop="bankNo">
          <sino-input v-model="bankInfoForm.bankNo"></sino-input>
        </sino-form-item>
        <sino-form-item label="银行名称：" prop="bankName" class="clear">
          <sino-input v-model="bankInfoForm.bankName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="bankAddr" label="银行地址：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="bankInfoForm.bankAddr"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
    <!--批量导入-->
    <sino-dialog :visible.sync="remiLeadFlag" :top="'30%'" class="remilead-wid" @close ="cleanContent('bankinfoUpload')">
      <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
      <sino-form :model="bankinfoUpload" :rules="remiLeadRules" ref="bankinfoUpload">
        <sino-form-item prop="fileName" label="数据文件：" class="sino-form-item-width">
          <sino-upload
            class="upload-demo fl bankinfo-upload"
            ref="batchUpload"
            :action="uploadUrl"
            :headers="headerToken"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="getFileName"
            :on-remove="fileRemove"
            :on-success="fileSuccess"
            :on-error="fileError"
          >
            <div slot="trigger">
              <input class="uploadFileBox" type="text" readonly="true"/>
              <input type="hidden" v-model="bankinfoUpload.fileName" readonly="true"/>
              <input type="hidden" v-model="bankinfoUpload.fileNo" readonly="true"/>
              <span class="chooseFileButton">上传</span>
            </div>
          </sino-upload>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitUpload">确 定</sino-button>
      </span>
    </sino-dialog>
    <sino-dialog :visible.sync="remiLeadSeeFlag" size="small" class="remi-dialog">
      <sino-title slot="title" type="levelOne" title="批量导入" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <input type="hidden" v-model="remiLeadSeeList.impNo"/>
            <h6>导入文件名称</h6><span v-text="remiLeadSeeList.fileName"></span>
          </li>
          <li>
            <h6>导入数据数量</h6>
            <span>
              {{remiLeadSeeList.totalCount}}
              <a v-if="remiLeadSeeList.totalCount !== 0" href="javascript:void(0)" @click="remiAllDownload(remiLeadSeeList.impNo)">
                下载
              </a>
            </span>
          </li>
          <li>
            <h6>成功数量</h6><span>{{remiLeadSeeList.saveCount}}<a v-if="remiLeadSeeList.saveCount !== 0" href="javascript:void(0)" @click="remiSuccDownload(remiLeadSeeList.impNo)">下载</a></span>
          </li>
          <li>
            <h6>失败数量</h6><span>{{remiLeadSeeList.notSaveCount}}<a v-if="remiLeadSeeList.notSaveCount !== 0" href="javascript:void(0)" @click="remiFailDownload(remiLeadSeeList.impNo)">下载</a></span>
          </li>
          <li>
            <h6>导入人</h6><span v-text="remiLeadSeeList.creName"></span>
          </li>
          <li>
            <h6>导入时间</h6><span v-text="remiLeadSeeList.creTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="remiLeadSeeFun">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        bankTypeUrl: this.apiPath.hrsc.getDictSelectBox,
        uploadUrl: this.apiPath.hrsc.uploadFilePublic,
        bankForm: {
          bankType: '',
          bankTypeName: '',
          bankName: ''
        },
        headerToken: {"Token": Cookies.get('Token')},
        alertTitle: '',
        isA: true,
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
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        bankInfoData: null,
        bankInfoFlag: false,
        bankInfoForm: {
          bankType: '',
          bankTypeName: '',
          bankNo: '',
          bankName: '',
          bankAddr: ''
        },
        bankInfoRules: {
          bankTypeName: [
            {required: true, message: '请选择银行类型', trigger: 'change'}
          ],
          bankNo: [
            {required: true, message: '请输入联行号', trigger: 'change'},
            {validator: this.validator.checkNum, trigger: 'change'}
          ],
          bankName: [
            {required: true, message: '请输入银行名称', trigger: 'change'}
          ],
          bankAddr: [
            {required: true, message: '请输入银行地址', trigger: 'change'}
          ]
        },
        btnText: '',
        fileName: '',
        bankinfoUpload: {
          fileName: '',
          fileNo: ''
        },
        remiLeadRules: {
          fileName: [
            {required: true, message: '请选择数据文件', trigger: 'change'}
          ]
        },
        remiLeadFlag: false,
        remiLeadSeeFlag: false,
        remiLeadSeeList: {
          impNo: '',
          fileName: '',
          totalCount: '',
          saveCount: '',
          notSaveCount: '',
          creName: '',
          creTime: ''
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
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.bankForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findBankInfoListByName, data).then(res => {
          this.bankInfoData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      addFun () {
        this.alertTitle = '新增银行信息';
        this.bankInfoFlag = true;
        this.btnText = '确 定';
      },
      modifyFun (value) {
        this.alertTitle = '修改银行信息';
        this.bankInfoFlag = true;
        this.btnText = '修改';
        api.postsign(this.apiPath.hrsc.findBankInfoById, value.bankId).then(res => {
          this.bankInfoForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      submitForm () {
        const _this = this;
        _this.$refs.bankInfoForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增银行信息') {
              api.post(this.apiPath.hrsc.saveBankInfo, _this.bankInfoForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.bankInfoFlag = false;
                  _this.searchFun();
                  _this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(this.apiPath.hrsc.updateBankInfo, _this.bankInfoForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.bankInfoFlag = false;
                  _this.searchFun();
                  _this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          } else {
            console.log('error submit!!');
          }
        });
      },
      downloadFun () {
        let _this = this;
        api.postsign(_this.apiPath.hrsc.downloadByType, 20).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 导入
      importFun () {
        this.remiLeadFlag = true;
      },
      delFun (value) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.postsign(this.apiPath.hrsc.deleteBankInfoById, value.bankId).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      submitUpload () {
        this.$refs.bankinfoUpload.validate((valid) => {
          if (valid) {
            this.$refs.batchUpload.submit();
          }
        });
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName (file, filelist) {
        if (filelist.length > 1) {
          filelist = filelist.splice(0, 1);
        }
        this.bankinfoUpload.fileName = file.name;
      },
      fileSuccess (file, filelist) {
        if (file.code === 'CPYY-00001') {
//          this.bankinfoUpload.fileNo = file.data;
          api.postsign(this.apiPath.hrsc.inputBankInfoExcel, file.data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.remiLeadFlag = false;
              this.remiLeadSeeFlag = true;
              this.remiLeadSeeList = res.data;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.$alert(file.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
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
      fileRemove (file, filelist) {
        filelist = filelist.splice(filelist.indexOf(file), 1);
        if (filelist.length === 0) {
          this.$refs.batchUpload.uploadFiles = [];
          this.bankinfoUpload.fileName = '';
        }
      },
      remiLeadSeeFun () {
        this.remiLeadSeeFlag = false;
        this.searchFun();
      },
      remiFailDownload (impNo) {
        api.post(this.apiPath.hrsc.downBankExcel, {bankImpNo: impNo, impResult: 2}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      remiSuccDownload (impNo) {
        api.post(this.apiPath.hrsc.downBankExcel, {bankImpNo: impNo, impResult: 1}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      remiAllDownload (impNo) {
        api.post(this.apiPath.hrsc.downBankExcel, {bankImpNo: impNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      cleanContent: function (formName) {
        this.$refs[formName].resetFields();
        this.$refs.batchUpload.uploadFiles = [];
        this.bankinfoUpload.fileName = '';
      }
    }
  };
</script>
