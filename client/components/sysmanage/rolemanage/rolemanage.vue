<template>
  <div class="roleMange procreg usermanage">
    <sino-con>
      <sino-title type="levelOne" title="查询条件"></sino-title>
      <sino-form :model="roleForm" ref="roleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">角色名称：</span>
              <sino-input class="fl" type="text" v-model="roleForm.fullName"
                          :disabled="false"></sino-input>
            </li>
            <li  class="search-inner-one">
              <span class="search-inner-name">角色类型：</span>
              <sino-select :tipText="''" class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="roleForm.roleTypeName"
                           :chooseId.sync="roleForm.roleType"
                           :clear="true"
                           :url="getDictSelectBox"
                           :data='{"code":"ROLE_TYPE"}'></sino-select>
            </li>
            <li>
              <span class="search-inner-name">公司名称：</span>
              <sino-input class="fl" type="text" v-model="roleForm.corpName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">状态：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="roleForm.isEffectName" :chooseId.sync="roleForm.isEffect" :clear="true" :data="{code: 'IS_EFFECT'}" :url="getDictSelectBox"></sino-select>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box search-one-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
          </div>
        </div>
        <div class="clearfix"></div>
      </sino-form>
    </sino-con>
    <!--搜索结果-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addRole"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column type="index" label="序号" align="center" width="60"></sino-table-column>
          <sino-table-column prop="fullName" label="角色名称"></sino-table-column>
          <sino-table-column prop="roleTypeName" label="角色类型"></sino-table-column>
          <!--<sino-table-column prop="roleCode" label="角色编码"></sino-table-column>-->
          <sino-table-column prop="isEffectName" label="状态"></sino-table-column>
          <sino-table-column prop="corpName" label="公司名称"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeRole(scope.row)">查看</span><i class="table-i">|</i>
                <span class="table-span" v-if="scope.row.isEffect == 1" @click="modifyRole(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" v-if="scope.row.isEffect == 1" @click="delRole(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                   :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                   :total="page.total"></sino-page>
      </div>
    </div>
    <!-- 查看 -->
    <sino-dialog :visible.sync="seeItem" size="small">
      <sino-title slot="title" type="levelOne" title="角色信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>角色名称</h6><input readonly v-model="RoleSeeDto.fullName">
          </li>
          <li>
            <h6>创建人</h6><input readonly v-model="RoleSeeDto.creUserName">
          </li>
          <li>
            <h6>公司名称</h6><input readonly v-model="RoleSeeDto.corpName">
          </li>
          <li>
            <h6>创建时间</h6><input readonly v-model="RoleSeeDto.creTime">
          </li>
          <li>
            <h6>角色类型</h6><input readonly v-model="RoleSeeDto.roleTypeName">
          </li>
          <li>
            <h6>操作人</h6><input readonly v-model="RoleSeeDto.operUserName">
          </li>
          <!--<li>-->
            <!--<h6>角色编码</h6><input readonly v-model="RoleSeeDto.roleCode">-->
          <!--</li>-->
          <li>
            <h6>操作时间</h6><input readonly v-model="RoleSeeDto.operTime">
          </li>
          <!--<li>-->
            <!--<h6>显示排序</h6><input readonly v-model="RoleSeeDto.showSort">-->
          <!--</li>-->
          <li>
            <h6>状态</h6><input readonly v-model="RoleSeeDto.isEffectName">
          </li>
          <li class="li-last">
            <h6>描述</h6><input readonly v-model="RoleSeeDto.roleDesc">
          </li>

        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
      </span>
    </sino-dialog>

    <!--弹层 --修改-->
    <sino-dialog :visible.sync="modifyAndAdd" class="sino-dialog-modify" size="small" v-on:close="resetForm('modifyAndAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle"  class="sino-dialog-title "></sino-title>
      <sino-form :model="modifyAndAddForm" :rules="modifyAndAddFormRules" ref="modifyAndAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="角色名称：" prop="fullName">
          <sino-input v-model="modifyAndAddForm.fullName"></sino-input>
        </sino-form-item>
        <sino-form-item prop="corpName" label="所属公司：">
          <sino-select :tipText="''" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="modifyAndAddForm.corpName" :chooseId.sync="modifyAndAddForm.corpId" :clear="true" :token="token" :url="corpSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="角色类型：" prop="roleTypeName">
          <sino-select :tipText="''" class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="modifyAndAddForm.roleTypeName" :chooseId.sync="modifyAndAddForm.roleType" :clear="true"  :url="getDictSelectBox" :data='{"code":"ROLE_TYPE"}'></sino-select>
        </sino-form-item>
        <!--<sino-form-item label="角色编码：" prop="roleCode" :justText="true">-->
          <!--<sino-input v-model="modifyAndAddForm.roleCode" ></sino-input>-->
        <!--</sino-form-item>-->
        <sino-form-item prop="roleDesc" label="描述：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="modifyAndAddForm.roleDesc" :disabled="false"></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun">确 定</sino-button>
      </span>
    </sino-dialog>

  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import store from '../../../store';

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
    components: {},
    data () {
      return {
        // 下拉框
        corpSelUrl: this.apiPath.author.findCorpSelectBoxInfo,
        findUserSelectBoxInfo: this.apiPath.author.findUserSelectBoxInfo,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        roleForm: {
          fullName: '',
          roleType: '',
          roleTypeName: '',
          isEffect: '',
          isEffectName: ''
        },
        roleFormRules: {
          roleState: [{}],
          roleType: [{}],
          roleName: [{}]
        },
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
        RoleSeeDto: {}, // 查看弹层的数据
        modifyAndAdd: false, // 修改，添加控制弹层显示
        alertTitle: '',
        modifyAndAddForm: {
          fullName: '', // 角色名称
          roleCode: '', // 角色编码
          roleType: '', // 角色类型
          roleTypeName: '', // 类型名称
          roleDesc: '', // 描述
          corpId: '' // 公司id
        }, // 修改新增 弹框 表单数据
        modifyAndAddFormRules: {
          fullName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          corpName: [
            {required: true, message: '请选择所属公司', trigger: 'blur'}
          ],
          roleTypeName: [
            {required: true, message: '请选择角色类型', trigger: 'blur'}
          ]
        },
        token: '',
        cropList: [], // 所属公司列表，
        roleList: []
      };
    },
    created () {
//      this.getList()
//      this.getRoleSelectList();
      this.token = store.state.user.token;
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      searchFun () {
        console.log(this.roleForm);
        this.page.pageNum = 1;
        this.getList();
      },
      submitFun () {
        if (this.alertTitle === '新增角色') {
          this.$refs.modifyAndAddForm.validate((valid) => {
            //  修改词根
//            this.modifyAndAddForm.isEffect = 1;
            if (valid) {
              api.post(this.apiPath.author.createBaseRoleInfo, this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.modifyAndAdd = false;
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log('error submit');
            }
          });
          // 新增角色
        } else {
          //         修改角色
          this.$refs['modifyAndAddForm'].validate((valid) => {
            //  修改词根
            if (valid) {
              api.post(this.apiPath.author.updateRoleInfoById, this.modifyAndAddForm).then(res => {
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
      getList (all) {
        let obj = {};
        obj.data = this.roleForm;
        if (all) {
          obj.data = {};
        }
        getPageInfo(obj, this.page);
        api.post(this.apiPath.author.findBaseRoleInfoPage, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.page.pageNum = 1;
        this.getList();
      },
      addRole: function () {
        this.modifyAndAdd = true;
        this.alertTitle = '新增角色';
        this.modifyAndAddForm = {
          fullName: '', // 角色名称
          roleCode: '', // 角色编码
          roleType: '', // 角色类型
          roleTypeName: '', // 类型名称
          roleDesc: '', // 描述
          corpId: '' // 公司id
        };

//        if (this.cropList.length === 0) {
//          this.getCorpSelectList();
//        }
      },
      modifyRole: function (data) {
        this.modifyAndAdd = true;
        this.alertTitle = '修改角色';// 信息两字放不开，应该修改dialog，title宽度
        this.modifyAndAddForm = JSON.parse(JSON.stringify(data));
      },
      seeRole: function (data) {
        console.log(Vue.filter('date'));
        api.post(this.apiPath.author.findBaseRoleInfoById, data).then(res => {
          this.RoleSeeDto = res.data;
          this.seeItem = true;
        }).catch(err => {
          console.log(err);
        });
      },
      delRole: function (data) {
        let obj = {};
        obj.roleId = data.roleId;
        obj.isEffect = 0;
        this.$alert('确定删除该条信息吗？', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            if (action === 'cancel') { return; }
            api.post(this.apiPath.author.updateRoleIsEffectById, obj).then(res => {
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
      viewAll: function () {
        this.getList('all');
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        console.log(this.$refs);
      }
//      formatter (row, column, cellValue) {
//        return row.isEffect ? '是' : '否';
//      }
    }
  };
</script>
