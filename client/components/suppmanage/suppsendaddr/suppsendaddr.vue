<template>
  <!--供应商邮寄地址-->
  <div class=" usermanage ">
    <sino-con>
      <sino-title type="levelOne" title="供应商邮寄地址查询"></sino-title>
      <sino-form :model="suppaddrForm" ref="suppaddrForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">供应商类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="{code: 'SUPP_TYPE'}"
                           :url="getDictSelectBox"
                           :chooseName.sync="suppaddrForm.suppTypeName"
                           :chooseId.sync="suppaddrForm.suppType"
                           :clear="true" >
              </sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">供应商名称：</span>
              <sino-input class="fl" type="text" v-model="suppaddrForm.chName"
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
    <div class="sino-table-total mt15">
      <div class="sino-table-icon">
        <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增</sino-button>
      </div>
        <sino-table :data="tableData" max-height="416"  :row-class-name="tableRowClassName"  v-on:viewAll="viewAll"  stripe border>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="chName" label="供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="contName" label="收件人" min-width="95"></sino-table-column>
          <sino-table-column prop="contTel" label="联系电话" min-width="120"></sino-table-column>
          <sino-table-column prop="postAddr" label="邮寄地址" min-width="180"></sino-table-column>
          <sino-table-column prop="isDefaultAddrName" label="是否默认"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="clickFun(scope.row,'modify')">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="clickFun(scope.row,'del')">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageParam.pageNum"
                   v-bind:page-size="pageParam.pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageParam.pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="supaddrAdd" size="large" :top="'20%'" class="dialog-height" @close ="cleanContent('addraddForm')">
      <sino-title slot="title" type="levelOne" :title="formState === 'modify'? '修改供应商邮寄地址': '新增供应商邮寄地址' " class="sino-dialog-title"></sino-title>
      <sino-form :model="addraddForm" :rules="sendAddrRules" ref="addraddForm" class="demo-addraddForm">
        <sino-form-item label="供应商名称：" class="sino-form-item-width" prop="chName">
          <sino-select class="fl"
                       :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :data="{code: 'SUPP_TYPE'}"
                       :disabled="formState == 'modify'"
                       :url="selectBox"
                       :token="token"
                       :chooseName.sync="addraddForm.chName"
                       :chooseId.sync="addraddForm.suppId"
                       :clear="formState === 'add'" >
          </sino-select>
        </sino-form-item>
        <sino-form-item label="联系人：" prop="contName">
          <sino-input v-model="addraddForm.contName"></sino-input>
        </sino-form-item>
        <sino-form-item label="联系人电话：" prop="contTel">
          <sino-input v-model="addraddForm.contTel"></sino-input>
        </sino-form-item>
        <sino-form-item label="邮编：" prop="postCode">
          <sino-input v-model="addraddForm.postCode"></sino-input>
        </sino-form-item>
        <sino-form-item label="邮寄地址：" class="sino-from-address">
          <sino-form-item prop="provName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :data='provData'
                         :isPage="true"
                         :isGroup="false"
                         :url="findAreaList"
                         :chooseName.sync="addraddForm.provName"
                         :chooseId.sync="addraddForm.provId" :clear="true"
                         @change="changeProv"
            ></sino-select>
          </sino-form-item>
          <sino-form-item prop="cityName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url='findAreaList'
                         :data="cityData"
                         :chooseName.sync="addraddForm.cityName"
                         :linkage="true" :chooseId.sync="addraddForm.cityId"
                         :clear="true"
                         @change="changeCity"
            ></sino-select>
          </sino-form-item>
          <sino-form-item prop="distName" class="sino-select-last" >
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :linkage="true"
                         :isGroup="false"
                         :url="findAreaList"
                         :data='distData'
                         :chooseName.sync="addraddForm.distName"
                         :chooseId.sync="addraddForm.distId"
                         :clear="true"
                         @finish="cityFinish"
            ></sino-select>
          </sino-form-item>
        </sino-form-item>
        <sino-form-item prop="addrDet" label="详细地址：" class="sino-form-item-width">
          <sino-input v-model="addraddForm.addrDet"></sino-input>
        </sino-form-item>
        <sino-form-item prop="isDefaultAddr" label="是否默认：">
          <sino-radio v-for="(item,index) in yesNoArr" :key="index"
                      v-model.number="addraddForm.isDefaultAddr"
                      :label="item.id">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item prop="remark" label="备注：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="addraddForm.remark"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  let callTip = function (_this, type, msg) {
    _this.getList();
    _this.supaddrAdd = false;
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
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        token: Cookie.get('Token'),
        suppaddrForm: {
          chName: '',
          suppTypeName: '',
          suppType: '',
          suppNo: ''
        },
        yesNoArr: [],
        supaddrList: '', // 供应商类型
        addrnameList: '', // 供应商名称
        supaddrAdd: false, // 新增弹层
        leadsbtn: '',  // 按钮
        addraddForm: {
          suppId: '',
          chName: '',
          provId: '',
          postCode: '',
          contName: '',
          contTel: '',
          provName: '',
          cityId: '',
          cityName: '',
          distId: '',
          distName: '',
          addrDet: '',
          remark: '',
          isDefaultAddr: 1
        },
        rules: {},
        formState: '', // 表单是否修改
        tableData: null, // 表格
        total: null,
        object: {
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageParam: {
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        sendAddrRules: {
          chName: [
            {required: true, message: '请选择供应商名称', trigger: 'change'}
          ],
          contName: [
            {required: true, message: '请输入联系人姓名', trigger: 'blur'}
          ],
          contTel: [
            {required: true, message: '请输入联系人电话', trigger: 'blur'}
          ],
          postCode: [
            {required: true, message: '请输入邮编', trigger: 'blur'},
            {validator: this.validator.checkPostCode, trigger: 'blur'}
          ],
          provName: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          cityName: [
            {required: true, message: '请选择市', trigger: 'change'}
          ],
          distName: [
            {required: true, message: '请选择区', trigger: 'change'}
          ],
          addrDet: [
            {required: true, message: '请输入详细地址', trigger: 'blur'}
          ]
        },
        provData: {data: {level: 3}}, // 请求省下拉参数
        cityData: {data: {parentId: ''}}, // 请求市下拉参数
        distData: {data: {parentId: ''}}, // 请求区下拉参数
        linkSelectData: {
          cityId: '',
          cityName: '',
          distId: '',
          distName: ''
        }
      };
    },
    created () {
      // 是否
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
      viewAll () {
        this.getList(1, this.pageSize, 'all');
      },
      cityFinish () {
        this.addraddForm.distId = this.linkSelectData.distId;
        this.addraddForm.distName = this.linkSelectData.distName;
        this.linkSelectData = {
          cityId: '',
          cityName: '',
          distId: '',
          distName: ''};
      },
      changeProv () {
        this.cityData.data.parentId = this.addraddForm.provId;
      },
      changeCity () {
        this.distData.data.parentId = this.addraddForm.cityId;
      },
      pageHandler: function (pageNum) {
        this.pageParam.pageNum = pageNum;
        this.getList(pageNum, this.pageParam.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageParam.pageSize = pageSize;
        this.getList(this.pageParam.pageNum, pageSize);
      },
      tableRowClassName (row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      // 查询
      searchFun () {
        this.getList();
      },
      //  分页
      getList (pageNum, pageSize, all) {
        pageNum ? '' : pageNum = this.pageNum;

        let obj = {
          data: this.suppaddrForm,
          pageNum: pageNum,
          pageSize: this.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.hrsc.findAddrAndInfo, obj).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      clickFun (data, type) {
        let _this = this;
        if (type === 'add') { // 新增
          this.supaddrAdd = true;
          this.formState = 'add';
        }
        if (type === 'modify') { // 修改
          this.formState = 'modify';
          this.supaddrAdd = true;
          let _this = this;
          var timer2 = setTimeout(function () {
            let copyData = JSON.parse(JSON.stringify(data));
            _this.linkSelectData.cityName = copyData.cityName;
            _this.linkSelectData.cityId = copyData.cityId;
            _this.linkSelectData.distId = copyData.distId;
            _this.linkSelectData.distName = copyData.distName;
            copyData.distId = '';
            copyData.distName = '';
            copyData.cityId = '';
            copyData.cityName = '';
            _this.addraddForm = copyData;
            var timer1 = setTimeout(function () {
              _this.addraddForm.cityName = _this.linkSelectData.cityName;
              _this.addraddForm.cityId = _this.linkSelectData.cityId;
              timer1 = null;
              timer2 = null;
            });
          }, 50);
        }
        if (type === 'del') { // 删除
          this.$confirm('您确定要删除吗？', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            api.post(this.apiPath.hrsc.suppaddrDelete, data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(() => {
            });
          }).catch(() => {
            console.log('删除失败!');
          });
        }
      },
      // 新增
      addFun () {
        this.$refs.addraddForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.suppaddrSave, this.addraddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.supaddrAdd = false;
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      //  修改
      updateFun () {
        this.$refs.addraddForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.hrsc.suppaddrUpdate, this.addraddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.supaddrAdd = false;
                this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      submitForm () {
        if (this.formState === 'add') {
          this.addFun();
        } else {
          this.updateFun();
        }
      },
      cleanContent (formName) {
        this.cityData.data.parentId = '';
        this.distData.data.parentId = '';
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
