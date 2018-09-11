<template>
  <div class="usermanage invinfo">
    <sino-con>
      <sino-title type="levelOne" title="客户发票信息查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one search-inner-width">
              <span class="search-inner-name ">客户名称：</span>
           <!--   <sino-input class="fl" type="text" v-model="searchForm.custName"
                          :disabled="false"></sino-input>-->
              <sino-select class="fl sino-select-group"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :disabled="formState === 'modify'"
                           :isGroup="false"
                           :token="token"
                           :chooseName.sync="searchForm.custName"
                           :chooseId.sync="searchForm.custId"
                           :clear="true" :url="costCenterUrl"></sino-select>
            </li>
           <!-- <li class="search-inner-one">
              <span class="search-inner-name">客户编号：</span>
              <sino-input type="text" class="fl" v-model="searchForm.custNo"
                          :disabled="false"></sino-input>
            </li>-->
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
    <div class="sino-table-total sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="add()"><i class="iconfont sino-add"></i>新增
          </sino-button>
          <sino-button type="icon-text" @click="download()"><i class="iconfont sino-export fs19"></i>导出增值税发票信息
          </sino-button>
        </div>
      </div>
      <sino-table :data="tableData" stripe @select="selectTabelRow" max-height="416" border @viewAll="viewAll">
        <sino-table-column type="selection"></sino-table-column>
        <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
        <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
        <sino-table-column prop="taxpayerTypeDict" label="纳税人类型" min-width="120"></sino-table-column>
        <sino-table-column prop="taxPayerNo" label="纳税人识别号" min-width="180"></sino-table-column>
        <sino-table-column prop="vatUnitName" label="单位名称" min-width="180"></sino-table-column>
        <sino-table-column prop="acctBankName" label="开户行" min-width="180"></sino-table-column>
        <sino-table-column prop="vatAcctNo" label="银行账号" min-width="180"></sino-table-column>
        <sino-table-column prop="isDefaultName" label="是否默认"></sino-table-column>
        <sino-table-column label="操作" align="center" fixed="right" width="100">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span @click="see(scope.row)" class="table-span">查看</span><i class="table-i">|</i>
              <span @click="modify(scope.row)" class="table-span">修改</span>
            </template>
          </template>
        </sino-table-column>
      </sino-table>
      <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                 :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                 :total="page.total"></sino-page>
    </div>
    <!-- 查看 -->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="客户增值税发票信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>客户名称</h6><span v-text="seeDirData.custName"></span>
          </li>
          <li>
            <h6>纳税人类型</h6><span v-text="seeDirData.taxpayerTypeDict"></span>
          </li>
          <li>
            <h6>纳税人识别号</h6><span v-text="seeDirData.taxPayerNo"></span>
          </li>
          <li>
            <h6>单位名称</h6><span>{{seeDirData.vatUnitName}}</span>
          </li>
          <li>
            <h6>单位地址</h6><span v-text="seeDirData.vatInvAddr"></span>
          </li>
          <li>
            <h6>单位电话</h6><span v-text="seeDirData.vatInvTel"></span>
          </li>
          <li>
            <h6>开户行</h6><span v-text="seeDirData.acctBankName"></span>
          </li>
          <li>
            <h6>银行账号</h6><span>{{seeDirData.vatAcctNo}}</span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeDirData.creTime"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeDirData.creUserName"></span>
          </li>
          <li>
            <h6>银行开户许可证副本</h6><span><div class="file-upload-see" v-show="seeDirData.bankAcctPermitName" ><i class="iconfont sino-clip"></i> <i class="invinfoi">{{seeDirData.bankAcctPermitName}}</i> <i class="file-del-btn" v-on:click="downloadFile('bankAcctPermit')">下载</i> </div></span>
          </li>
          <li >
            <h6>营业执照副本</h6><span><div class="file-upload-see" v-show="seeDirData.busLicName"  ><i class="iconfont sino-clip"></i> <i class="invinfoi">{{seeDirData.busLicName}}</i> <i class="file-del-btn" v-on:click="downloadFile('busLic')">下载</i> </div></span>
          </li>
          <li class="li-last">
          <h6>一般纳税人资质证明</h6><span ><div class="file-upload-see" v-show="seeDirData.taxPayerTrcName"  ><i class="iconfont sino-clip"></i> <i class="invinfoi">{{seeDirData.taxPayerTrcName}}</i> <i class="file-del-btn" v-on:click="downloadFile('taxPayerTrc')">下载</i> </div></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeDirData.remark"></span>
          </li>

        </ul>
      </div>
    </sino-dialog>
    <!--修改-->
    <sino-dialog :visible.sync="modifyAndAdd" v-on:close="resetForm('modifyAndAddForm')" size="samll" top="5%" class="see-dirc">
      <sino-title slot="title" type="levelOne" :title="formState === 'add' ?'新增发票信息' : '修改发票信息'" class="sino-dialog-title"></sino-title>
      <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm" :rules="modifyAndAddFormRules" class="demo-bankAcctForm mt15">
        <!------------------------------------->
        <sino-form-item label="客户名称：" class="sino-from-wid" prop="custName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="true"
                       :disabled="formState === 'modify'"
                       :isGroup="false"
                       :token="token"
                       :chooseName.sync="modifyAndAddForm.custName"
                       :chooseId.sync="modifyAndAddForm.custId"
                       :clear="true" :url="costCenterUrl"></sino-select>
        </sino-form-item>
        <!--------------------------------->
        <sino-form-item label="纳税人类型：" prop="taxpayerTypeDict">
          <sino-select :filterable="false"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="modifyAndAddForm.taxpayerTypeDict"
                       :chooseId.sync="modifyAndAddForm.taxPayerType"
                       :data="taxpayerTypeData"
                       :clear="true" :url="getDictSelectBox"></sino-select>
        </sino-form-item>
        <sino-form-item label="纳税人识别号：" prop="taxPayerNo">
          <sino-input v-model="modifyAndAddForm.taxPayerNo"></sino-input>
        </sino-form-item>
        <sino-form-item label="单位名称：" class="sino-form-item-width" prop="vatUnitName">
          <sino-input v-model="modifyAndAddForm.vatUnitName"></sino-input>
        </sino-form-item>
        <sino-form-item label="开户行：" prop="acctBankName" class="h25">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="modifyAndAddForm.acctBankName"
                       :chooseId.sync="modifyAndAddForm.vatBankName"
                       :data="{data: {}}"
                       :clear="true" :url="bankInfoDropdown"></sino-select>
        </sino-form-item>
        <sino-form-item label="银行账号：" prop="vatAcctNo">
          <sino-input v-model="modifyAndAddForm.vatAcctNo"></sino-input>
        </sino-form-item>
        <sino-form-item label="单位地址：" prop="vatInvAddr">
          <sino-input v-model="modifyAndAddForm.vatInvAddr"></sino-input>
        </sino-form-item>
        <sino-form-item label="单位电话：" prop="vatInvTel">
          <sino-input v-model="modifyAndAddForm.vatInvTel"></sino-input>
        </sino-form-item>
        <div class="fl file-upload" >
          <sino-form-item label="是否默认：" prop="isDefault" class="sino-form-item1">
            <sino-radio v-for="(item, index) in yesNoArr" :key="index"
                        v-model.number="modifyAndAddForm.isDefault"
                        :label="item.id">{{item.title}}</sino-radio>
          </sino-form-item>
          <div class="file-upload-see" v-show="modifyAndAddForm.bankAcctPermit"></div>
          <sino-form-item prop="busLic" label="营业执照副本：" class="sino-form-item1">
            <sino-upload
              ref="busLicFile"
              :action="fileAction"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileName1"
              :on-success="fileSuccess1"
              :on-error="fileError1"
            >
              <div slot="trigger">
                <input type="hidden" v-model="modifyAndAddForm.busLic">
                <input class="uploadFileBox" type="text" readonly="true"/> <!--v-model="modifyAndAddForm.busLicName" -->
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <div class="file-upload-see" v-show="modifyAndAddForm.busLic"><i class="iconfont sino-qubiezhen ml40 fl"></i><span class="fl span-over">{{modifyAndAddForm.busLicName}}</span> <span class="file-del-btn fl" v-on:click="delFile('busLicFile', 'busLic')">删除</span> </div>
        </div>
        <div class="fl file-upload" >
          <sino-form-item prop="bankAcctPermit" label="银行开户许可证副本：" class="sino-form-item1 clearfix">
            <sino-upload
              ref="bankAcctPermitFile"
              :action="fileAction"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileName"
              :on-success="fileSuccess"
              :on-error="fileError"
            >
              <div slot="trigger">
                <input type="hidden" v-model="modifyAndAddForm.bankAcctPermit">
                <input class="uploadFileBox" type="text" readonly="true"/>      <!--// v-model="modifyAndAddForm.bankAcctPermitName" -->
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <div class="file-upload-see" v-show="modifyAndAddForm.bankAcctPermit"><i class="iconfont sino-qubiezhen ml40 fl"></i> <span class="fl span-over">{{modifyAndAddForm.bankAcctPermitName}}</span> <span class="file-del-btn fl" v-on:click="delFile('bankAcctPermitFile','bankAcctPermit')">删除</span> </div>
          <sino-form-item prop="taxPayerTrc" label="一般纳税人资质证明：" class="sino-form-item1">
            <sino-upload
              ref="taxPayerTrcFile"
              :action="fileAction"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="getFileName2"
              :on-success="fileSuccess2"
              :on-error="fileError2"
            >
              <div slot="trigger">
                <input type="hidden" v-model="modifyAndAddForm.taxPayerTrc">
                <input class="uploadFileBox" type="text"  readonly="true"/>
                <div class="chooseFileButton">上传</div>
              </div>
            </sino-upload>
          </sino-form-item>
          <div class="file-upload-see" v-show="modifyAndAddForm.taxPayerTrc">
            <i class="iconfont sino-qubiezhen ml40 fl"></i>
            <span class="fl span-over">{{modifyAndAddForm.taxPayerTrcName}}</span>
            <span class="file-del-btn fl" v-on:click="delFile('taxPayerTrcFile', 'taxPayerTrc')">删除</span>
          </div>
        </div>
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="modifyAndAddForm.remark" :disabled="false"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun('modifyAndAddForm')">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let callTip = function (_this, type, msg) {
    _this.modifyAndAdd = false;
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
    let _s = file.raw.type.split("/")[1];
    let _arr = ['jpg', 'png', 'bmp', 'jpeg', 'pdf', 'JPG', 'PNG', 'BMP', 'JPEG', 'PDF'];
    if (_arr.indexOf(_s) !== -1) {
      return true;
    } else {
      _this.$alert('请上传图片格式或者pdf格式！', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning',
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    }
  };
  let checkedArr = [];
  export default {
    data () {
      return {
        costCenterUrl: this.apiPath.hrsc.findCustSelectInfo,
        bankInfoDropdown: this.apiPath.hrsc.bankInfoDropdown,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        token: Cookie.get('Token'),
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        searchForm: { // 搜索条件
          custName: '',
          custId: ''
        },
        taxpayerTypeData: {code: "TAXPAYER_TYPE"},
        tableData: null, // 表格数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        seeItem: false, // 查看弹层控制显示
        seeDirData: {}, // 查看弹层的数据
        modifyAndAdd: false, // 修改，添加控制弹层显示
        modifyAndAddForm: {
          custId: '',
          custName: '',
          taxPayerNo: '',
          taxPayerType: 2, // 纳税人识别类型 （默认小规模纳税人）
          taxpayerTypeDict: '小规模纳税人', // 纳税人识别名称 （）
          vatUnitName: '', // 单位名称
          vatBankName: '', // 开户行
          acctBankName: '', // 开户行
          vatAcctNo: '', // 银行账号
          vatInvAddr: '', // 单位地址
          vatInvTel: '', // 单位电话
          bankAcctPermit: '', // 银行账户开户副本
          bankAcctPermitName: '', // 银行账户开户副本文件名称
          busLic: '', // 营业执照副本
          busLicName: '', // 营业执照副本文件名
          taxPayerTrc: '', // 一般纳税人资质证明
          taxPayerTrcName: '', // 一般纳税人资质证明文件名
          remark: '', // 备注
          isDefault: 1
        },
        formState: '',
        modifyAndAddFormRules: {
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          taxpayerTypeDict: [
            {required: true, message: '请选择纳税人类型', trigger: 'change'}
          ],
          taxPayerNo: [
            {required: true, message: '请输入纳税人识别号', trigger: 'blur'}
          ],
          vatUnitName: [
            {required: true, message: '请输入单位名称', trigger: 'blur'}
          ],
          acctBankName: [
            {required: false, message: '请选择开户行', trigger: 'blur'}
          ],
          vatAcctNo: [
            {required: false, message: '请输入银行账号', trigger: 'blur'}
          ],
          vatInvAddr: [
            {required: false, message: '请输入单位地址', trigger: 'blur'}
          ],
          vatInvTel: [
            {required: false, message: '请输入单位电话', trigger: 'blur'}
          ]
        },
        cropList: [], // 所属公司列表，
        roleList: [],
        yesNoArr: []
      };
    },
    created () {
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'YES_NO'}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.yesNoArr = res.data.list;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      downloadFile (name) {
        var obj = {};
        obj.fileUniqueNo = this.seeDirData[name];
        api.get(this.apiPath.hrsc.invMatFileDownload, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            api.downloadImg(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      selectTabelRow (selection, row) {
        checkedArr = selection;
      },
      download () {
        let obj = {};
        if (checkedArr.length > 0) {
          obj.custOrSuppInvIds = [];
          checkedArr.forEach(function (item, index) {
            obj.custOrSuppInvIds.push(item.custOrSuppInvId);
          });
        } else {
          obj.custName = this.searchForm.custName;
          obj.custId = this.searchForm.custId;
        }
        api.post(this.apiPath.hrsc.getCustInvInfoExcel, obj).then(res => {
          window.open(res.data);
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.page.pageNum = 1;
        this.getList();
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        this[formName].bankAcctPermitName = '';
        this[formName].busLicName = '';
        this[formName].taxPayerTrcName = '';
        console.log(this[formName]);
      },
      // 新增发票信息
      addFun () {
        this.$refs.modifyAndAddForm.validate((valid) => {
          if (valid) {
            let sub = function () {
              api.post(this.apiPath.hrsc.saveCustOrSuppInvInfo, this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.modifyAndAdd = false;
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            };
            sub.call(this);
          } else {
            console.log('error submit');
          }
        });
      },
      // 修改发票信息
      updateFun () {
        this.$refs['modifyAndAddForm'].validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.updateCustSuppInvInfo, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList();
                this.modifyAndAdd = false;
                this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      submitFun () {
        if (this.formState === 'add') {
          this.addFun();
        } else {
          this.updateFun();
        }
      },
      viewAll () {
        this.getList('all');
      },
      getList (all) {
        let obj = {};
        obj.data = this.searchForm;
        if (all === 'all') {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.listCustInvInfo, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      add () {
        this.modifyAndAdd = true;
        this.formState = 'add';
      },
      modify (data) {
        let _this = this;
        this.modifyAndAdd = true;
        this.formState = 'modify';
        let obj = {};
        obj.custOrSuppInvId = data.custOrSuppInvId;
        api.post(this.apiPath.hrsc.getCustSuppInvInfo, obj).then(res => {
          res.data.busLicName = '';
          res.data.taxPayerTrcName = '';
          res.data.bankAcctPermitName = '';
          _this.modifyAndAddForm = res.data;
          api.post(this.apiPath.hrsc.listCustSuppInvMatNames, obj).then(res => {
            _this.modifyAndAddForm.busLicName = res.data.busLicName;
            _this.modifyAndAddForm.bankAcctPermitName = res.data.bankAcctPermitName;
            _this.modifyAndAddForm.taxPayerTrcName = res.data.taxPayerTrcName;
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      },
      see (data) {
        this.seeItem = true;
        let obj = {};
        obj.custOrSuppInvId = data.custOrSuppInvId;
        api.post(this.apiPath.hrsc.getCustSuppInvInfo, obj).then(res => {
          res.data.busLicName = '';
          res.data.taxPayerTrcName = '';
          res.data.bankAcctPermitName = '';
          this.seeDirData = res.data;
          api.post(this.apiPath.hrsc.listCustSuppInvMatNames, obj).then(res => {
            this.seeDirData.busLicName = res.data.busLicName;
            this.seeDirData.bankAcctPermitName = res.data.bankAcctPermitName;
            this.seeDirData.taxPayerTrcName = res.data.taxPayerTrcName;
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      },
      del (data) {
        this.$alert('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            api.post(this.apiPath.hrsc.updateRoleIsEffectById, data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.getList();
                this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      delFile (form, name) {
        this.$refs[form].clearFiles();
        this.modifyAndAddForm[name] = '';
        this.modifyAndAddForm[name  + 'Name'] = '';
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.modifyAndAddForm.bankAcctPermitName = file.name;
          this.$refs.bankAcctPermitFile.submit();
        } else {
          this.$refs.bankAcctPermitFile.clearFiles();
        }
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.modifyAndAddForm.bankAcctPermit = res.data;
        } else {
          this.modifyAndAddForm.bankAcctPermitName = '';
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
      getFileName1 (file) {
        if (checkImgFileType(file, this)) {
          this.modifyAndAddForm.busLicName = file.name;
          this.$refs.busLicFile.submit();
        } else {
          this.$refs.busLicFile.clearFiles();
        }
      },
      fileError1 (error) {
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
      fileSuccess1 (res) {
        if (res.code === 'CPYY-00001') {
          this.modifyAndAddForm.busLic = res.data;
        } else {
          this.modifyAndAddForm.busLicName = '';
        }
      },
      getFileName2 (file) {
        if (checkImgFileType(file, this)) {
          this.modifyAndAddForm.taxPayerTrcName = file.name;
          this.$refs.taxPayerTrcFile.submit();
        } else {
          this.$refs.taxPayerTrcFile.clearFiles();
        }
      },
      fileError2 (error) {
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
      fileSuccess2 (res) {
        if (res.code === 'CPYY-00001') {
          this.modifyAndAddForm.taxPayerTrc = res.data;
        } else {
          this.modifyAndAddForm.taxPayerTrcName = '';
        }
      }
    },
    watch: {
      "modifyAndAddForm.taxPayerType": function () {
        if (this.modifyAndAddForm.taxPayerType === 1) { // 一般纳税人
//          this.$refs.modifyAndAddForm.rules.vatUnitName = [
//            {required: true, message: '请输入单位名称', trigger: 'blur'}
//          ];
          this.$refs.modifyAndAddForm.rules.acctBankName = [
            {required: true, message: '请选择开户行', trigger: 'blur'}
          ];
          this.$refs.modifyAndAddForm.rules.vatAcctNo = [
            {required: true, message: '请输入银行账号', trigger: 'blur'}
          ];
          this.$refs.modifyAndAddForm.rules.vatInvAddr = [
            {required: true, message: '请输入单位地址', trigger: 'blur'}
          ];
          this.$refs.modifyAndAddForm.rules.vatInvTel = [
            {required: true, message: '请输入单位电话', trigger: 'blur'}
          ];
        } else if (this.modifyAndAddForm.taxPayerType === 2) {
//          this.$refs.modifyAndAddForm.rules.vatUnitName = [
//            {required: true, message: '请输入单位名称', trigger: 'blur'}
//          ];
          this.$refs.modifyAndAddForm.rules.acctBankName = [
            {required: false, message: '请选择开户行', trigger: 'blur'}
          ];
          this.$refs.modifyAndAddForm.rules.vatAcctNo = [
            {required: false, message: '请输入银行账号', trigger: 'blur'}
          ];
          this.$refs.modifyAndAddForm.rules.vatInvAddr = [
            {required: false, message: '请输入单位地址', trigger: 'blur'}
          ];
          this.$refs.modifyAndAddForm.rules.vatInvTel = [
            {required: false, message: '请输入单位电话', trigger: 'blur'}
          ];
//          this.$refs.modifyAndAddForm.validateField('vatUnitName');
          this.$refs.modifyAndAddForm.validateField('acctBankName');
          this.$refs.modifyAndAddForm.validateField('vatAcctNo');
          this.$refs.modifyAndAddForm.validateField('vatInvAddr');
          this.$refs.modifyAndAddForm.validateField('vatInvTel');
        }
      }
    }
  };
</script>
