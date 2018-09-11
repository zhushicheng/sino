<template>
  <div>
    <div v-if="!routerView" class="invinfo">
      <sino-con>
        <sino-title type="levelOne" title="供应商离职原因查询"></sino-title>
        <sino-form :model="searchForm" ref="searchForm" class="serch-form">
          <div class="search-box">
            <ul class="search-inner-box">
              <li class="search-inner-one">
                <span class="search-inner-name">供应商名称：</span>
                <sino-input class="fl" type="text" v-model="searchForm.chName"
                            :disabled="false"></sino-input>
              </li>
              <li class="search-inner-one" >
                <span class="search-inner-name">地区：</span>
                <!--<sino-form-item label="银行类型：" prop="loginName" class="is-required">-->
                <sino-select class="fl"  :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchForm.areaName" :chooseId.sync="searchForm.areaId"  :data="{data:{level :4}}" :clear="true" :url="areaUrl"></sino-select>
                <!--</sino-form-item>-->
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
      <div class="sino-table-total sino-table-total mt15">
        <div class="sino-table-icon bs-none">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addmaterial()"><i class="iconfont sino-add"></i>新增离职原因
            </sino-button>
            <sino-button  type="icon-text" @click="setting()" size="small"><i class="iconfont sino-setting fs19"></i>配置供应商离职原因
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="chName" label="供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="areaName" label="城市"></sino-table-column>
          <sino-table-column prop="dimReasonName" label="离职原因"></sino-table-column>
          <sino-table-column prop="dimReasonMatCount" label="材料条数"></sino-table-column>
          <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modify(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="del(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
      <!--修改-->
      <sino-dialog :visible.sync="modifyAndAdd" v-on:close="resetForm('modifyAndAddForm')" size="samll" class="see-dirc usermanage">
        <sino-title slot="title" type="levelOne" :title="formState === 'add' ?'配置供应商离职原因' : '修改供应商离职原因'" class="sino-dialog-title"></sino-title>
        <div class="usermanagement-modify1">
          <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm" :rules="modifyAndAddFormRules" class="demo-sendAddrAddForm">
            <sino-form-item label="供应商名称：" prop="chName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :token="token"
                           :isGroup="false"
                           :chooseName.sync="modifyAndAddForm.chName"
                           :chooseId.sync="modifyAndAddForm.suppId"
                           :clear="true" :url="selectBox"></sino-select>
            </sino-form-item>
            <sino-form-item label="地区："  prop="areaName">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="areaUrl"
                           :data="{data:{level :4}}"
                           :chooseName.sync="modifyAndAddForm.areaName"
                           :chooseId.sync="modifyAndAddForm.areaId" :clear="false"></sino-select>
            </sino-form-item>
            <sino-form-item label="供应商离职原因："class="sino-form-item-width"   prop="dimReasonName">
              <sino-select :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="modifyAndAddForm.dimReasonName"
                           :chooseId.sync="modifyAndAddForm.dimReasonId"
                           :clear="true" :url="selectSuppDimReasonBox"
                           @change="changeDimReasonName"></sino-select>
            </sino-form-item>
            <sino-form-item label="材料：" class="sino-form-item-width"   prop="dimReasonMatsName">
              <sino-select :filterable="false"
                           :multiselect="true"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :chooseName.sync="modifyAndAddForm.dimReasonMatsName"
                           :chooseId.sync="modifyAndAddForm.dimReasonMats"
                           :linkage="true"
                           :data="dimReasonMatDto"
                           :clear="true" :url="selectDimReasonMatBox"></sino-select>
            </sino-form-item>
            <sino-form-item  class="" v-if="formState === 'add' " >
              <sino-checkbox v-model="checked" ref="checked" style="margin-left: 100px;color: #333" >保存后继续新增离职原因</sino-checkbox>

            </sino-form-item>
            <sino-form-item class="usermanage-button">
              <sino-button type="primary" @click="submitFun('modifyAndAddForm')">确 定</sino-button>
            </sino-form-item>
          </sino-form>
        </div>
      </sino-dialog>
    </div>
    <router-view v-if="routerView"></router-view>
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
  export default {
    data () {
      return {
        bankTypeUrl: this.apiPath.hrsc.getDictSelectBox,
        selectBox: this.apiPath.hrsc.selectBox,  // g
        selectSuppDimReasonBox: this.apiPath.hrsc.selectSuppDimReasonBox, // 离职原因下拉选择
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        fileAction: this.apiPath.hrsc.uploadFilePublic, // 文件上传
        areaUrl: this.apiPath.hrsc.findAreaList,
        selectDimReasonMatBox: this.apiPath.hrsc.selectDimReasonMatBox,
        token: Cookie.get('Token'),
        routerView: false,
        checked: true,
        searchForm: { // 搜索条件
          chName: '',
          areaId: '',
          areaName: ''
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
        modifyAndAdd: false, // 修改，添加控制弹层显示
        modifyAndAddForm: {
          suppId: '',
          chName: '',
          areaId: '',
          areaName: '',
          dimReasonId: '',
          dimReasonName: '',
          dimReasonMatsName: [],  // 材料多选下拉框
          dimReasonMats: []
        },
        formState: '',
        modifyAndAddFormRules: {
          dimReasonMatsName: [
            {required: false, type: 'array',  message: '请选择材料名称', trigger: 'change'}
          ],
          areaName: [
            {required: true, message: '请选择地区', trigger: 'change'}
          ],
          dimReasonName: [
            {required: true, message: '请选择离职原因', trigger: 'change'}
          ],
          chName: [
            {required: true, message: '请输入供应商名称', trigger: 'change'}
          ]
        },
        dimReasonMatDto: {"id": ''}
      };
    },
    watch: {
      $route: {
        handler: function (val, oldVal) {
          if (val.path === "/suppDimReason") {
            this.routerView = false;
          }
        },
        deep: true
      }
    },
    created () {
      this.ruoteJudge();
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
      ruoteJudge () {
        if (this.$route.path !== "/suppDimReason") {
          this.routerView = true;
        }
      }, // 解决刷新页面后退的bug
      changeDimReasonName () {
        this.dimReasonMatDto.id = this.modifyAndAddForm.dimReasonId;
      },
      searchFun () {
        console.log(this.searchForm);
        this.page.pageNum = 1;
        this.getList();
      },
      resetForm (formName) {
        this.dimReasonMatDto.id = "";
        this.$refs[formName].resetFields();
      },
      submitFun (formName) {
        if (this.formState === 'add') {
          console.log(this.$refs.checked.isChecked);
          this.$refs.modifyAndAddForm.validate((valid) => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.modifyAndAddForm));
              obj.dimReasonMats.forEach((item, index, ary) => {
                obj.dimReasonMats[index] = {dimReasonMatId: item};
              });
              api.post(this.apiPath.hrsc.saveSuppDimReason, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.modifyAndAdd = false;
                  this.$message({message: '新增成功！', type: 'success'});
                  if (this.$refs.checked.isChecked) {
                    this.resetForm(formName);
                    this.setting();
                  }
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log('error submit');
            }
          });
          // 配置供应商离职原因
        } else {
          //         配置供应商离职原因
          this.$refs['modifyAndAddForm'].validate((valid) => {
            if (valid) {
              let obj = JSON.parse(JSON.stringify(this.modifyAndAddForm));
              obj.dimReasonMats.forEach((item, index, ary) => {
                obj.dimReasonMats[index] = {dimReasonMatId: item};
              });
              api.post(this.apiPath.hrsc.updateSuppDimReason, obj).then(res => {
                console.log(res);
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
        }
      },
      getList () {
        let obj = {};
        obj.data = this.searchForm;
        getPageInfo(obj, this.page);
        api.post(this.apiPath.hrsc.findAllSuppDimReason, obj).then(res => {
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
      addmaterial () {
        this.routerView = true;
        this.$router.push({path: '/suppDimReason/adddimreason'});
      },
      setting () {
        this.modifyAndAdd = true;
        this.formState = 'add';
      },
      modify (data) { /* 点击修改后 */
        this.modifyAndAdd = true;
        this.formState = 'modify';
        api.post(this.apiPath.hrsc.findSuppDimReason, data).then(res => { /* 发送请求携带 */
          let obj = {};
          obj.dimReasonMatsName = [];
          obj.dimReasonMats = [];
          if (res.data.dimReasonMats && res.data.dimReasonMats != null) {
            res.data.dimReasonMats.forEach((item, index, ary) => {
              obj.dimReasonMatsName.push(res.data.dimReasonMats[index].dimReasonMatName);
            });
            res.data.dimReasonMats.forEach((item, index, ary) => {
              obj.dimReasonMats.push(res.data.dimReasonMats[index].dimReasonMatId);
            });
          }
          res.data.dimReasonMatsName = JSON.parse(JSON.stringify(obj.dimReasonMatsName));
          res.data.dimReasonMats = JSON.parse(JSON.stringify(obj.dimReasonMats));
          this.modifyAndAddForm = res.data;
          let _this = this;
          setTimeout(function () {
            _this.modifyAndAddForm.dimReasonMatsName = JSON.parse(JSON.stringify(obj.dimReasonMatsName));
            _this.modifyAndAddForm.dimReasonMats = JSON.parse(JSON.stringify(obj.dimReasonMats));
            obj = null;
          });
        }).catch(err => {
          console.log(err);
        });
      },
      del (data) {
        let obj = {};
        this.$alert('确定删除这些信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action === "cancel") {
              return;
            }
            api.post(this.apiPath.hrsc.deleteSuppDimRason, data).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.$message({message: '删除成功！', type: 'success'});
                return;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      }
    }
  };
</script>
