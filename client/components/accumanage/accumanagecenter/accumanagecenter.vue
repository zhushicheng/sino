<template>
  <!--公积金管理中心-->
  <div>
    <div class="leads usermanage">
      <sino-con>
        <sino-title type="levelOne" title="公积金管理中心查询"></sino-title>
        <sino-form :model="accuSearchForm" ref="ruleForm" class="serch-form leads-serch-form">
          <div class="search-box spe-search-box">
            <ul class="search-inner-box accu-spe-form-ul">
              <li class="search-inner-one search-long-li">
                <span class="search-inner-name">公积金管理中心名称：</span>
                <sino-select class="fl spe-select"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :data='provData'
                             :isPage="true"
                             :isGroup="false"
                             :url="apiPath.accu.findCenterSelectBox"
                             :chooseName.sync="accuSearchForm.name"
                             :chooseId.sync="accuSearchForm.id" :clear="true"
                ></sino-select>
              </li>
              <li class="search-long-li else-long-li">
                  <span class="search-inner-name affiliating-area">所属地区：</span>
                <sino-select :tipText="'省'"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :data='provData'
                             :isPage="true"
                             :isGroup="false"
                             :url="findAreaList"
                             :chooseName.sync="accuSearchForm.provName"
                             :chooseId.sync="accuSearchForm.provId" :clear="true"
                             @change="changeProv"
                ></sino-select>
                <sino-select :tipText="'市'"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url='findAreaList'
                             :data="cityData"
                             :chooseName.sync="accuSearchForm.cityName"
                             :linkage="true" :chooseId.sync="accuSearchForm.cityId"
                             :clear="true"
                             @change="changeCity"
                ></sino-select>
                <sino-select :tipText="'区县'"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :linkage="true"
                             :isGroup="false"
                             :url="findAreaList"
                             :data='distData'
                             :chooseName.sync="accuSearchForm.distName"
                             :chooseId.sync="accuSearchForm.distId"
                             :clear="true"
                ></sino-select>
              </li>
            </ul>
          </div>
          <div class="search-button spe-search-button-box">
            <div class="search-button-box search-one-button-box">
              <sino-button type="primary" @click="searchButFun">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
        </sino-form>
      </sino-con>
      <!--搜索结果-->
      <div class="sino-table-total sino-table-radio mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="downFun"><i class="iconfont sino-download-copy"></i>通讯录模板下载</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" v-on:viewAll="viewAll" stripe border max-height="416">
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="name" label="公积金管理中心名称" min-width="180"></sino-table-column>
          <sino-table-column label="所属地区" min-width="180">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <span>{{scope.row.provName}} {{scope.row.cityName}}</span>
              </div>
            </template>
          </sino-table-column>
          <sino-table-column prop="detAddr" label="详细地址" min-width="180"></sino-table-column>
          <sino-table-column label="网址" min-width="180">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <a class="a-website" :href="scope.row.website.toUpperCase().indexOf('HTTP') === -1? 'http://' + scope.row.website : scope.row.website" target="_blank">{{scope.row.website}}</a>
              </div>
            </template>
          </sino-table-column>
          <sino-table-column label="操作" align="center" width="220" fixed="right">
            <template scope="scope">
              <div v-if="scope.row.oper === true">
                <span class="table-span" @click="uploadFun(scope.row)">上传通讯录</span><i class="table-i">|</i>
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i" v-if="!scope.row.used">|</i>
                <span class="table-span" @click="delFun(scope.row)" v-if="!scope.row.used">删除</span>
              </div>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="total"></sino-page>
      </div>
      <!--新增-->
      <sino-dialog :visible.sync="leadsAdd"  size="large" v-on:close="resetForm('addAndModifyForm')" dialogHide :top="'10%'" class="accuman-add-layer">
        <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
        <div class="leadsAdd-form leadsAdd-form-w20-label">
          <sino-form :model="addAndModifyForm" :rules="rules" ref="addAndModifyForm" class="leadsAdd-Form">
            <sino-form-item label="公积金管理中心名称：" class="sino-form-item-width short-item-label" prop="name">
              <sino-input v-model="addAndModifyForm.name" class="leads-company-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="网址：" class="sino-form-item-width short-item-label" prop="website">
              <sino-input v-model="addAndModifyForm.website" class="leads-company-input"></sino-input>
            </sino-form-item>
            <sino-form-item label="所属地区：" class="is-required sino-from-address short-item-label">
              <sino-form-item prop="provName">
                <sino-select :tipText="'省'"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :data='provData1'
                             :isPage="true"
                             :isGroup="false"
                             :url="findAreaList"
                             :chooseName.sync="addAndModifyForm.provName"
                             :chooseId.sync="addAndModifyForm.provId" :clear="true"
                             @change="changeProv1"
                ></sino-select>
              </sino-form-item>
              <sino-form-item prop="cityName">
                <sino-select :tipText="'市'"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url='findAreaList'
                             :data="cityData1"
                             :chooseName.sync="addAndModifyForm.cityName"
                             :linkage="true" :chooseId.sync="addAndModifyForm.cityId"
                             :clear="true"
                             @change="changeCity1"
                ></sino-select>
              </sino-form-item>
              <sino-form-item prop="distName" class="sino-select-last">
                <sino-select :tipText="'区县'"
                             :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :linkage="true"
                             :isGroup="false"
                             :url="findAreaList"
                             :data='distData1'
                             :chooseName.sync="addAndModifyForm.distName"
                             :chooseId.sync="addAndModifyForm.distId"
                             :clear="true"
                ></sino-select>
              </sino-form-item>
            </sino-form-item>
            <sino-form-item label="详细地址：" class="sino-form-item-width short-item-label" prop="detAddr">
              <sino-input v-model="addAndModifyForm.detAddr" class="leads-company-input"></sino-input>
            </sino-form-item>
            <sino-form-item prop="remark" label="备注：" class="sino-form-item-width short-item-label">
              <sino-input type="textarea" v-model="addAndModifyForm.remark"></sino-input>
            </sino-form-item>
            <sino-form-item :label="index === 0? '配置材料清单：':'   '"
                            class="sino-form-item-width long-no-bottom short-item-label"
                            :class="{'is-required': index === 0}"
                            v-for="(item, index) in addAndModifyForm.accuCenterMats"
                            :key="index"
                            prop="accuCenterMats">
              <sino-form-item class="first-material-config" :prop="'accuCenterMats['+ index + '].itemName'" :rules="[{ required: true, message: '配置材料清单类型为必填项', trigger: 'change'}]">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :data='{code:"SINS_OPEN_ACCT_TYPE"}'
                             :isPage="true"
                             :isGroup="false"
                             :url="selUrl"
                             :chooseName.sync="addAndModifyForm.accuCenterMats[index].itemName"
                             :chooseId.sync="addAndModifyForm.accuCenterMats[index].item" :clear="true"
                ></sino-select>
              </sino-form-item>
              <sino-form-item class="after-block" :prop="'accuCenterMats['+ index + '].matDesc'" :rules="[{ required: true, message: '配置材料清单内容为必填项', trigger: 'change'}]">
                <sino-input v-model="addAndModifyForm.accuCenterMats[index].matDesc"></sino-input>
                <span @click="ctrlArray (index) "><i class="iconfont" :class="{'sino-add' : index === 0, 'sino-reduce': index !== 0}"></i> {{index === 0? '新增':'删除'}} </span>
              </sino-form-item>
            </sino-form-item>
          </sino-form>
          <div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm('addAndModifyForm')">{{leadsbtn}}</sino-button>
        </span>
      </sino-dialog>
    </div>
    <sino-dialog :visible.sync="uploadResultFlag" class="dialog-auto">
      <sino-title slot="title" type="levelOne" title="上传结果"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>文件名称</h6>
            <span v-text="uploadResult.fileName"></span>
          </li>
          <li>
            <h6>总数量</h6>
            <span><div class="file-upload-see"><i v-text="uploadResult.totalSize"></i><i class="file-del-btn"  v-show="uploadResult.totalSize>0" v-on:click="importUpLoadFile(uploadResult.backTotalPath, true)">下载</i></div></span>
          </li>
          <li>
            <h6>成功数量</h6>
            <span><div class="file-upload-see"><i v-text="uploadResult.succSize"></i><i class="file-del-btn" v-show="uploadResult.succSize>0" v-on:click="importUpLoadFile(uploadResult.backSuccessPath, false)">下载</i></div></span>
          </li>
          <li>
            <h6>失败数量</h6>
            <span><div class="file-upload-see"><i v-text="uploadResult.failSize"></i><i class="file-del-btn" v-show="uploadResult.failSize>0" v-on:click="importUpLoadFile(uploadResult.backFailPath, false)">下载</i></div></span>
          </li>
          <li>
            <h6>上传操作人</h6>
            <span v-text="uploadResult.oprRoleName"></span>
          </li>
          <li>
            <h6>上传时间</h6>
            <span v-text="uploadResult.oprTime"></span>
          </li>
        </ul>
      </div>
      <span slot="footer">
        <sino-button type="primary" @click="confirm">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--上传通讯录-->
    <sino-dialog :visible.sync="importVisible" size="small" class="batch-import" v-on:close="resetForm('uploadForm')">
      <sino-title slot="title" type="levelOne" title="上传通讯录" class="sino-dialog-title"></sino-title>
      <sino-form :model="uploadForm" ref="uploadForm" class="demo-ruleForm">
        <sino-form-item prop="fileName" label="上传文件：" class="sino-form-item1">
          <sino-upload
            ref="fileNameFile"
            :action="fileAction"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="getFileName"
            :on-success="fileSuccess"
            :on-error="fileError"
            :headers="uploadHeader"
            :data="uploadData"
          >
            <div slot="trigger">
              <input class="uploadFileBox" type="text" readonly="true" v-model="uploadForm.fileName" />
              <div class="chooseFileButton">上传</div>
            </div>
          </sino-upload>
        </sino-form-item>
        <!--<div class="file-batch-del" v-show="uploadForm.fileName"><i-->
          <!--class="iconfont sino-clip ml40"></i><span>{{uploadForm.fileName}}</span> <span class="file-del-btn" v-on:click="delFile('fileNameFile', 'fileName')">删除</span>-->
        <!--</div>-->
        <sino-button type="primary" @click="submitImp">确 定</sino-button>
      </sino-form>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" top="5%" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看公积金管理中心信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>公积金管理中心名称</h6><span v-text="seeForm.name"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>网址</h6><span v-if="seeForm.website"><a class="a-website" :href="seeForm.website.toUpperCase().indexOf('HTTP') === -1? 'http://' + seeForm.website : seeForm.website">{{seeForm.website}}</a></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeForm.creTime"></span>
          </li>
          <li class="li-last">
            <h6>所属地区</h6><span>{{seeForm.provName}} {{seeForm.cityName}} {{seeForm.distName}}</span>
          </li>
          <li class="li-last">
            <h6>详细地址</h6><span v-text="seeForm.detAddr"></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeForm.remark"></span>
          </li>
          <li class="li-last see-auto-li clearfix">
            <h6>配置材料清单</h6>
            <span class="auto-height-span auto-height-span-config">
              <p v-for="(item, index) in seeForm.accuCenterMats" :key="index">{{item.itemName}}：{{item.matDesc}}</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="layer-table-box" v-if="layertableData && layertableData.length > 0">
        <sino-table :data="layertableData" stripe border max-height="416">
          <sino-table-column type="index" label="序号" align="center"></sino-table-column>
          <sino-table-column prop="dep" label="部门" min-width="180"></sino-table-column>
          <sino-table-column prop="name" label="联系人" min-width="95"></sino-table-column>
          <sino-table-column prop="tel" label="联系电话" min-width="120"></sino-table-column>
          <sino-table-column prop="email" label="邮箱" min-width="180"></sino-table-column>
        </sino-table>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary"  @click="seeItem = false">确 定</sino-button>
        </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
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
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        layertableData: [], // 弹层table 数据
        arrayGroup: [{selectBind: 'select', inputBind: 'input'}], // 弹层新增模拟数组
        // 查询
        provData: {data: {level: 3}}, // 请求省下拉参数
        cityData: {data: {parentId: ''}}, // 请求市下拉参数
        distData: {data: {parentId: ''}}, // 请求区下拉参数
        // 弹层
        provData1: {data: {level: 3}}, // 请求省下拉参数
        cityData1: {data: {parentId: ''}}, // 请求市下拉参数
        distData1: {data: {parentId: ''}}, // 请求区下拉参数
        ProviderName: '', // 待删除
        importVisible: false,
        uploadResultFlag: false,
        uploadHeader: {Token: ""},
        uploadData: {centerId: ''},
        findAreaList: this.apiPath.hrsc.findAreaList,
        selUrl: this.apiPath.hrsc.getDictSelectBox,
        checked: true,
        accuSearchForm: {
          name: '',
          id: '',
          provName: '',
          provId: '',
          cityName: '',
          cityId: '',
          distName: '',
          distId: ''
        },
        isA: true,
        tableData: null,
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
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        uploadForm: {fileName: ''},
        uploadResult: {},
        addAndModifyForm: {
          name: '',
          website: '',
          provName: '',
          provId: '',
          cityName: '',
          cityId: '',
          distName: '',
          distId: '',
          detAddr: '',
          remark: '',
          accuCenterMats: [{item: '', itemName: '', matDesc: ''}]
        },
        // 校验
        rules: {
          name: [
            { required: true, message: '公积金管理中心名称为必填项', trigger: 'change' }
          ],
          provName: [
            { required: true, message: '所属省为必填项', trigger: 'change' }
          ],
          cityName: [
            { required: true, message: '所属市为必填项', trigger: 'change' }
          ],
          detAddr: [
            { required: true, message: '详细地址为必填项', trigger: 'change' }
          ],
          website: [
            { validator: this.validator.checkWebsite, trigger: 'change' }
          ]
        },
        seeForm: {},
        leadsAdd: false, // 添加弹层
        seeItem: false, // 控制查看弹层的显示
        activeFileNo: ''
//        deleteArray: []
      };
    },
    created () {
      this.uploadHeader.Token = Cookie.get('Token');
      // 获取角色ID和机构ID
      api.post(this.apiPath.author.findCurrUserRole, {token: Cookie.get('Token')}).then(res => {
        if (res.code === 'CPYY-00001') {
          this.fllowData.orgId = res.data.orgId;
          this.ProviderName = res.data.userName;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    mounted () {
      this.validator.addEnterEvent(this.searchButFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      // 通信录模板下载
      downFun () {
        api.postsign(this.apiPath.hrsc.downloadByType, 40).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      ctrlArray (index) {
        if (index === 0) {
          this.addAndModifyForm.accuCenterMats.push({item: '', itemName: '', matDesc: ''});
        } else {
//          if (this.addAndModifyForm.accuCenterMats[index].confId === 0 || this.addAndModifyForm.accuCenterMats[index].confId) {
//            this.deleteArray.push(JSON.parse(JSON.stringify(this.addAndModifyForm.accuCenterMats[index])));
//          }
          this.addAndModifyForm.accuCenterMats.splice(index, 1);
        }
      },
      changeProv () {
        this.cityData.data.parentId = this.accuSearchForm.provId;
      },
      changeCity () {
        this.distData.data.parentId = this.accuSearchForm.cityId;
      },
      // 弹层省市区联动
      changeProv1 () {
        this.cityData1.data.parentId = this.addAndModifyForm.provId;
      },
      changeCity1 () {
        this.distData1.data.parentId = this.addAndModifyForm.cityId;
      },
      resetForm (formName) {
        this.addAndModifyForm.accuCenterMats.splice(1, this.addAndModifyForm.accuCenterMats.length);
        this.addAndModifyForm.accuCenterMats[0].item = '';
        this.addAndModifyForm.accuCenterMats[0].itemName = '';
        this.addAndModifyForm.accuCenterMats[0].matDesc = '';
        this.$refs[formName].resetFields();
//        this.deleteArray = [];
//        this.addAndModifyForm.accuCenterMats = [{item: '', itemName: '', matDesc: ''}];
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: {
            name: '',
            provName: '',
            provId: '',
            cityName: '',
            cityId: '',
            distName: '',
            distId: ''
          }
        };
        api.post(this.apiPath.accu.findAccuCenterAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchButFun () {
        this.pageNum = 1;
        this.searchFun();
      },
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.accuSearchForm
        };
        api.post(this.apiPath.accu.findAccuCenterAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 分页
      pageHandler: function (page) {
        this.pageNum = page;
        this.searchFun();
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchFun();
      },
      addFun: function () {
        this.leadsAdd = true;
        this.alertTitle = '新增公积金管理中心信息';
        this.leadsbtn = '确 定';
//        this.addAndModifyForm.accuCenterMats[0] = {item: '', itemName: '', matDesc: ''};
      },
      seeFun (data) {
        api.post(this.apiPath.accu.findAccuCenter, {centerId: data.centerId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeItem = true;
            this.seeForm = res.data;
            this.layertableData = res.data.accuCenterConts;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      modifyFun: function (data) {
        this.leadsAdd = true;
        this.alertTitle = '修改公积金管理中心信息'; // 信息两字放不开，应该修改dialog，title宽度
        this.leadsbtn = '修 改';
        api.post(this.apiPath.accu.findAccuCenter, {centerId: data.centerId}).then(res => {
          if (res.code === 'CPYY-00001') {
            let that = this;
            let cityObj = {
              cityName: res.data.cityName,
              cityId: res.data.cityId
            };
            let distObj = {
              distName: res.data.distName,
              distId: res.data.distId
            };
            that.addAndModifyForm = res.data;
            if ((that.addAndModifyForm.accuCenterMats === null) || (that.addAndModifyForm.accuCenterMats.length === 0)) {
              that.addAndModifyForm.accuCenterMats = [{item: '', itemName: '', matDesc: ''}];
            }
            setTimeout(function () {
              that.addAndModifyForm.cityName = cityObj.cityName;
              that.addAndModifyForm.cityId = cityObj.cityId;
            }, 50);
            setTimeout(function () {
              that.addAndModifyForm.distName = distObj.distName;
              that.addAndModifyForm.distId = distObj.distId;
            }, 200);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      delFun: function (data) {
        this.$confirm('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.accu.deleteAccuCenter, {centerId: data.centerId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchButFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      importUpLoadFile (url, type) {
        if (type) {
          api.postsign(this.apiPath.accu.downContExcels, this.activeFileNo).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          api.download(url);
        }
      },
      // 新增确定
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增公积金管理中心信息') {
              api.post(this.apiPath.accu.addAccuCenter, this.addAndModifyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
//              this.addAndModifyForm.delAccuCenterMats = this.deleteArray;
              api.post(this.apiPath.accu.updateAccuCenter, this.addAndModifyForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.leadsAdd = false;
                  this.searchFun();
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
      uploadFun (data) { // 点击上传通讯录
        this.importVisible = true;
        this.uploadData.centerId = data.centerId;
      },
      submitImp () {  // 点击上传确定
        this.$refs.fileNameFile.submit();
      },
      confirm () { // 点击上传结果弹层确定
        this.uploadResultFlag = false;
      },
      getFileName (file) {
        if (checkImgFileType(file, this)) {
          this.uploadForm.fileName = file.name;
        } else {
          this.$refs.fileNameFile.clearFiles();
        }
      },
      fileSuccess (res, file) {
        if (res.code === 'CPYY-00001') {
          this.activeFileNo = res.data;
          api.post(this.apiPath.accu.uploadContExcelAction, {fileNo: res.data, centerId: this.uploadData.centerId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.uploadResult = res.data;
              this.uploadResult.fileName = file.name;
              this.importVisible = false;
              this.uploadResultFlag = true;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.uploadForm.fileName = '';
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
        this.uploadForm.fileName = '';
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      }
    }
  };
</script>

