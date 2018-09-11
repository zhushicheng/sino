<template>
  <!--学习资料-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('first')">常见问题</div>
          <div class="sino-tabs-item is-active">学习资料</div>
          <div class="sino-tabs-item" @click="prodScheFun('third')">联系管理员</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="backLearnForm" ref="backLearnForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           v-model="backLearnForm.studyDataType"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="backLearnForm.studyDataTypeName"
                           :chooseId.sync="backLearnForm.studyDataType"
                           :clear="true"
                           :url="dictSelUrl"
                           :data="{code:'STUDY_DATA_TYPE'}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">资料名称：</span>
              <sino-input type="text" class="fl"
                          v-model="backLearnForm.studyName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">描述：</span>
              <sino-input type="text" class="fl"
                          v-model="backLearnForm.studyDesc"
                          :disabled="false"></sino-input>
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
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="studyDataTypeName" label="类型"></sino-table-column>
          <sino-table-column prop="studyName" label="资料名称"></sino-table-column>
          <sino-table-column prop="stateName" label="状态"></sino-table-column>
          <sino-table-column prop="uploadName" label="上传人"></sino-table-column>
          <sino-table-column prop="uploadTime" label="上传时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" fixed="right" width="145">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i v-if="scope.row.state !== 0" class="table-i">|</i>
                <span v-if="scope.row.state !== 0" class="table-span" @click="delFun(scope.row)">失效</span>
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
    <!--新增-->
    <sino-dialog :visible.sync="backLearnAddFlag" size="large" :top="'10%'" class="dialog-height" v-on:close="resetFun('backLearnAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="backLearnAddForm" :rules="backLearnAddRules" ref="backLearnAddForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="studyDataTypeName" label="类型：">
          <sino-select class="fl"
                       :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="backLearnAddForm.studyDataTypeName"
                       :chooseId.sync="backLearnAddForm.studyDataType"
                       :clear="true"
                       :url="dictSelUrl"
                       :data="{code:'STUDY_DATA_TYPE'}"></sino-select>
        </sino-form-item>
        <sino-form-item prop="studyName" label="资料名称：">
          <sino-input v-model="backLearnAddForm.studyName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="studyDesc" label="描述：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="backLearnAddForm.studyDesc"></sino-input>
        </sino-form-item>
        <sino-form-item label="文件上传：" prop="fileName">
          <sino-upload
            ref="videoUpload"
            :action="fileAction"
            :show-file-list="true"
            :headers="uploadHeader"
            :auto-upload="false"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :limit="1"
            :multiple="true"
            :on-error="fileError"
            :file-list="fileList"
          >
            <div slot="trigger">
              <input type="hidden" v-model="backLearnAddForm.fileId">
              <input class="uploadFileBox" type="text" v-model="backLearnAddForm.fileName" readonly="true" placeholder="请选择上传文件"/>
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
        <sino-form-item label="上传人：" prop="uploadName">
          <sino-input v-model="backLearnAddForm.uploadName"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnName}}</sino-button>
      </span>
    </sino-dialog>
    <!-- 查看 -->
    <sino-dialog :visible.sync="backLearnSeeFlag" class="dialog-height dialog-backcon">
      <sino-title slot="title" type="levelOne" title="查看学习资料" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>类型</h6><input readonly v-model="backLearnSeeList.studyDataTypeName">
          </li>
          <li>
            <h6>资料名称</h6><input readonly v-model="backLearnSeeList.studyName">
          </li>
          <li class="li-last">
            <h6>描述</h6><input readonly v-model="backLearnSeeList.studyDesc">
          </li>
          <li>
            <h6>上传人</h6><input readonly v-model="backLearnSeeList.uploadName">
          </li>
          <li>
            <h6>上传时间</h6><input readonly v-model="backLearnSeeList.uploadTime">
          </li>
          <li class="li-last">
            <h6>文件下载</h6>
            <span>{{backLearnSeeList.fileName}}</span>
            <span class="span-link" @click="downloadFun" v-if="backLearnSeeList.fileName != '' && backLearnSeeList.fileName != null">下载</span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="backLearnSeeFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';

  let checkVideoFileType = function (file, _this) {
    let _s = file.raw.type.split("/")[1];
    let _arr = ['avi', 'wmv', 'mpeg', 'mp4', 'mov', 'mkv', 'flv', 'f4v', 'm4v', 'rmvb', 'rm', '3gp', 'dat', 'ts', 'mts', 'vob'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    } else {
      _this.$alert('请上传正确的视频格式！', '提示信息', {
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
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        fileAction: this.apiPath.file.upload,
        uploadHeader: {"Token": Cookies.get('Token')},
        fileList: [],
        backLearnForm: {
          studyDataType: '',
          studyDataTypeName: '',
          studyName: '',
          studyDesc: ''
        },
        hrefAction: '',
        tableData: null,
        object: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        total: null,
        pageSize: 10,
        pageArray: [10, 20, 30, 40],
        backLearnAddFlag: false,
        backLearnSeeFlag: false,
        alertTitle: '',
        btnName: '',
        backLearnAddForm: {
          studyDataType: '',
          studyDataTypeName: '',
          studyDesc: '',
          studyName: '',
          fileId: '',
          fileName: '',
          uploadName: ''
        },
        backLearnAddRules: {
          studyName: [
            {required: true, message: '请输入资料名称', trigger: 'change'}
          ],
          studyDataTypeName: [
            {required: true, message: '请选择类型', trigger: 'change'}
          ],
          fileName: [
            {required: true, message: '请选择文件上传', trigger: 'change'}
          ]
        },
        backLearnSeeList: {
          questionDesc: '',
          solveDesc: '',
          publishName: '',
          creTime: '',
          isEffectName: ''
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
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/backAskQues'});
        } else if (order === 'third') {
          this.$router.push({path: '/backContAdmin'});
        }
      },
      viewAll (pageNum, pageSize) {
        let _data = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.backLearnForm
        };
        api.post(this.apiPath.hrsc.findallhelpstudydata, _data).then(res => {
          this.tableData = res.data.list;
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
        this.backLearnAddFlag = true;
        this.alertTitle = '新增学习资料';
        this.btnName = "确 定";
      },
      fileError: function (error) {
        this.backLearnAddForm.fileName = '';
      },
      fileSuccess: function (res) {
        this.backLearnAddForm.fileId = JSON.parse(res.data).videoUniqueId;
        let _this = this;
        if (_this.alertTitle === '新增学习资料') {
          _this.backLearnAddForm.videoPath = JSON.parse(res.data).videoPath;
          _this.backLearnAddForm.videoUniqueId = JSON.parse(res.data).videoUniqueId;
          _this.backLearnAddForm.framePath = JSON.parse(res.data).framePath;
          api.post(_this.apiPath.hrsc.addhelpstudydata, _this.backLearnAddForm).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.backLearnAddFlag = false;
              _this.searchFun();
              this.$message({message: '新增成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          api.post(_this.apiPath.hrsc.updatehelpstudydata, _this.backLearnAddForm).then(res => {
            if (res.code === 'CPYY-00001') {
              _this.backLearnAddFlag = false;
              _this.searchFun();
              this.$message({message: '修改成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      getFileName: function (file, filelist) {
        if (this.backLearnAddForm.studyDataType === 2) {
          if (checkVideoFileType(file, this)) {
            if (filelist.length > 1) {
              filelist = filelist.splice(0, 1);
            }
            this.backLearnAddForm.fileName = file.name;
          } else {
//          this.$refs.videoUpload.clearFiles();
            if (filelist.length > 1) {
              filelist = filelist.splice(1, 1);
            }
            if (filelist.length === 1) {
              filelist = filelist.splice(0, 1);
            }
          }
        } else {
          if (filelist.length > 1) {
            filelist = filelist.splice(0, 1);
          }
          this.backLearnAddForm.fileName = file.name;
        }
      },
      downloadFun () {
        let _this = this;
        api.post(_this.apiPath.hrsc.downloadFile, {fileUniqueNo: _this.backLearnSeeList.videoUniqueId}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      seeFun: function (scope) {
        let _this = this;
        console.log(this);
        _this.backLearnSeeFlag = true;
        api.post(_this.apiPath.hrsc.findbyidhelpstudydata, scope).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.backLearnSeeList = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifyFun (scope) {
        this.backLearnAddFlag = true;
        this.alertTitle = '修改学习资料';
        this.btnName = "修 改";
        api.post(this.apiPath.hrsc.findbyidhelpstudydata, scope).then(res => {
          this.backLearnAddForm = res.data;
          this.fileList = [{name: res.data.fileName, url: res.data.videoPath}];
        }).catch(err => {
          console.log(err);
        });
      },
      submitForm () {
        let _this = this;
        _this.$refs.backLearnAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增学习资料') {
              _this.$refs.videoUpload.submit();
            } else {
//              if(_this.$refs.videoUpload.$children.length > )
              _this.$refs.videoUpload.submit();
              api.post(_this.apiPath.hrsc.updatehelpstudydata, _this.backLearnAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.backLearnAddFlag = false;
                  _this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
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
      delFun (scope) {
        let _this = this;
        this.$confirm('确定将该条信息置为失效吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(_this.apiPath.hrsc.deletehelpstudydata, scope).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '失效成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('失效失败!');
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        this.fileList = [];
      }
    }
  };
</script>
