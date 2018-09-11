<template>
  <!--供应商联系人-->
  <div class="suppcont">
    <sino-con>
      <sino-title type="levelOne" title="供应商联系人查询"></sino-title>
      <sino-form :model="suppcontForm" ref="suppcontForm" class="serch-form">
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
                           :chooseName.sync="suppcontForm.suppTypeName"
                           :chooseId.sync="suppcontForm.suppType"
                           :clear="true" >
              </sino-select>
            </li>
            <li class="search-inner-one" >
              <span class="search-inner-name">供应商名称：</span>
              <sino-input class="fl" type="text" v-model="suppcontForm.chName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">联系人姓名：</span>
              <sino-input class="fl" type="text" v-model="suppcontForm.contName"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">分管业务：</span>
              <sino-input class="fl" type="text" v-model="suppcontForm.respBusi"
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
    <div class="sup-content2 mt15">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" stripe max-height="416"  v-on:viewAll="viewAll" border>
          <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
          <sino-table-column prop="chName" label="供应商名称" min-width="180"></sino-table-column>
          <sino-table-column prop="suppTypeName" label="供应商类型" min-width="95"></sino-table-column>
          <sino-table-column prop="contName" label="联系人名称" min-width="95"></sino-table-column>
          <sino-table-column prop="mobile" label="联系人手机号" min-width="120"></sino-table-column>
          <sino-table-column prop="tel" label="固定电话" min-width="120"></sino-table-column>
          <sino-table-column prop="email" label="邮箱" min-width="180"></sino-table-column>
          <sino-table-column prop="respBusi" label="分管业务"></sino-table-column>
          <sino-table-column prop="isDefaultContName" label="是否默认联系人"  min-width="120"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160" ></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="clickFun(scope.row,'modify')">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="del(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!-- 新增 -->
    <sino-dialog :visible.sync="supAdd"  class="usermanage" size="large" v-on:close = "cleanContent('supAddForm')" >
      <sino-title slot="title" type="levelOne" :title="formState === 'modify'? '修改供应商联系人': '新增供应商联系人'" class="sino-dialog-title "></sino-title>
      <div class="sup-form">
        <sino-form :model="supAddForm" :rules="rules" ref="supAddForm">
          <sino-form-item label="供应商名称：" prop="chName" class="sup-Name sino-form-item-width">
            <sino-select class="fl"
                         :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :url="selectBox"
                         :token="token"
                         :chooseName.sync="supAddForm.chName"
                         :chooseId.sync="supAddForm.suppId"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="联系人姓名：" prop="contName">
            <sino-input v-model="supAddForm.contName"></sino-input>
          </sino-form-item>
          <sino-form-item label="手机号码：" prop="mobile">
            <sino-input v-model="supAddForm.mobile"></sino-input>
          </sino-form-item>
          <sino-form-item label="固定电话：" prop="tel">
            <sino-input v-model="supAddForm.tel"></sino-input>
          </sino-form-item>
          <sino-form-item label="邮箱地址：" prop="email">
            <sino-input v-model="supAddForm.email"></sino-input>
          </sino-form-item>
          <sino-form-item label="分管业务：" prop="respBusi">
            <sino-input v-model="supAddForm.respBusi"></sino-input>
          </sino-form-item>
          <sino-form-item label="是否默认联系人：" prop="isDefaultCont">
            <span class="usermanage-radio">
              <sino-radio class="radio" v-model.number="supAddForm.isDefaultCont" :label="1">是</sino-radio>
              <sino-radio class="radio" v-model.number="supAddForm.isDefaultCont" :label="0">否</sino-radio>
            </span>
          </sino-form-item>
          <sino-form-item label="联系地址：" prop="addr" class="sup-Name  sino-form-item-width">
            <sino-input v-model="supAddForm.addr" class="supp-input"></sino-input>
          </sino-form-item>
          <sino-form-item label="备注：" class="sup-remark sino-form-item-width"  prop="remark">
            <sino-input type="textarea" v-model="supAddForm.remark" :disabled="false" tipMessage="提示信息提示信息"></sino-input>
          </sino-form-item>
          <div class="suppcont-tip fl">
            <i class="iconfont sino-tip"></i><span>手机号码、固定电话和邮箱地址至少任选其一填写。</span>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm('supAddForm')">{{leadsbtn}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookie from 'js-cookie';
  let callTip = function (_this, type, msg) {
    _this.getList();
    _this.supAdd = false;
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
        selectBox: this.apiPath.hrsc.selectBox,  // g
        token: Cookie.get('Token'),
        suppcontForm: {
          chName: '',
          suppTypeName: '',
          suppType: '',
          contName: '',
          respBusi: ''
        },
        supTypeList: '', // 供应商类型下拉下拉列表
        tableData: null,
        isA: true,
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
        supAdd: false, // 弹层
        formState: "", // 弹层状态
        leadsbtn: '', // 弹层按钮
        rules: { // 验证
          chName: [
            { required: true, message: '请选择供应商名称', trigger: 'change' }
          ],
          contName: [
            { required: true, message: '请输入联系人名称', trigger: 'blur' }
          ],
          isDefaultCont: [
            { required: true, type: 'number', message: '请选是否默认联系人', trigger: 'blur' }
          ],
          mobile: [
            {validator: this.validator.checkPhone, trigger: 'blur'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ]
        },
        supAddForm: {
          chName: '',
          suppId: '',
          contName: '',
          mobile: '',
          tel: '',
          email: '',
          respBusi: '',
          isDefaultCont: 0,
          addr: '',
          remark: ''
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
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.getList(this.pageNum, this.pageSize);
      },
      getList (pageNum, pageSize, all) {
        pageNum ? '' : pageNum = this.pageNum;
        let obj = {
          data: this.suppcontForm,
          pageNum: pageNum,
          pageSize: this.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.hrsc.findCont, obj).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll () {
        this.getList(1, this.pageSize, 'all');
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.getList();
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.getList();
      },
      clickFun: function (data, type) {
        if (type === 'add') {
          this.formState = 'add';
          this.supAdd = true;
          this.leadsbtn = '确 定';
        }
        if (type === 'modify') {
          this.supAdd = true;
          this.formState = 'modify';
          this.leadsbtn = '修 改';
          let _this = this;
          setTimeout(function () {
            _this.supAddForm = JSON.parse(JSON.stringify(data));
          }, 50);
        }
      },
      del: function (data) {
        var dto = {};
        dto.suppContId = data.suppContId;
        this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.findDelete, dto).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
              return;
            }
          }).catch(() => {
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      // 提示
      tipFun () {
        if (this.supAddForm.mobile === '' && this.supAddForm.email === ''  && this.supAddForm.tel === '') {
          this.$alert('手机号码、固定电话和邮箱地址至少任选其一填写。', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
      },
      // 新增
      addFun () {
        // this.tipFun();
        api.post(this.apiPath.hrsc.findEqualName, this.supAddForm).then(res => {
          if (res.data > 0) {
            this.$confirm('该供应商下联系人姓名重复，是否需要再次添加?', '提示', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
              api.post(this.apiPath.hrsc.findSave, this.supAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.supAdd = false;
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }).catch(() => {
              console.log('添加失败!');
            });
          } else {
            api.post(this.apiPath.hrsc.findSave, this.supAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.supAdd = false;
                this.searchFun();
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      updateFun () {
        // this.tipFun();
        api.post(this.apiPath.hrsc.findEqualName, this.supAddForm).then(res => {
          if (res.data > 0) {
            this.$confirm('该供应商下联系人姓名重复，是否需要再次添加?', '提示', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
              api.post(this.apiPath.hrsc.findUpdate, this.supAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.supAdd = false;
                  this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }).catch(() => {
              console.log('添加失败!');
            });
          } else {
            api.post(this.apiPath.hrsc.findUpdate, this.supAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.supAdd = false;
                this.searchFun();
                this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增修改确定
      submitForm (formName) {
        if (this.supAddForm.mobile || this.supAddForm.tel || this.supAddForm.email) {
          if (this.formState === 'add') {
            this.$refs[formName].validate((valid) => { // 新增
              if (valid) {
                this.addFun();
              }
            });
          } else {
            this.$refs[formName].validate((valid) => { //  修改
              if (valid) {
                this.updateFun();
              }
            });
          }
        } else {
          this.$alert('手机号码、固定电话和邮箱地址至少任选其一填写', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
        };
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
