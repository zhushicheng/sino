<template>
  <div class="roleMange">
    <div>
      <div class="etyma-content fl">
        <div  class="etyma-content-box">
        <sino-title type="levelOne" title="词根管理"></sino-title>
        <div style="margin-top: 1px">
          <sino-form :model="etymaForm" ref="etymaForm" class="etyma-form fl">
            <div class="rule-form-content">
              <sino-form-item label="词根中文名称：" prop="chName" class="etyma-form-item fl mb15">
                <sino-input type="text" v-model="etymaForm.chName" ></sino-input>
              </sino-form-item>
              <sino-form-item label="词根英文名称："prop="enShortName" class="etyma-form-item fl mb15">
                <sino-input type="text" v-model="etymaForm.enShortName" ></sino-input>
              </sino-form-item>
            </div>
          </sino-form>
          <div class="sup-line2"></div>
        </div>
        <div class="etyma-form-button fr">
          <div class="role-search">
            <sino-button class="is-primary" style="margin-top: 17px" @click="searchFun" type="p">查 询</sino-button>
          </div>
        </div>
        <div class="clear"></div>
        <div class="sino-table-total sino-table-radio">
          <div class="sino-table-icon bs-none">
            <div class="sino-table-icon-left">
              <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增
              </sino-button>
              <sino-button type="icon-text" @click="clickFun('','modify')"><i class="iconfont sino-modify"></i>修改
              </sino-button>
              <sino-button type="icon-text" @click="clickFun('','del')"><i class="iconfont sino-shanchu1"></i>删除
              </sino-button>
            </div>
          </div>
          <sino-table :data="tableData" v-on:select="selectCallBack" max-height="416"  stripe v-on:viewAll="viewAll">
            <sino-table-column  type="selection"></sino-table-column>
            <sino-table-column  type="index" label="序号"  width="60" align="center"></sino-table-column>
            <sino-table-column prop="chName" label="词根名称"></sino-table-column>
            <sino-table-column prop="enFullName" label="全称"></sino-table-column>
            <sino-table-column prop="enShortName" label="简称"></sino-table-column>
            <sino-table-column prop="isKeyWordName" label="是否关键词" min-width="100"></sino-table-column>
          </sino-table>
          <sino-page
            :page="page.pageNum"
            :page-size="page.pageSize"
            @pagehandler="pageHandler"
            :pageArray="page.pageArray"
            @choosePageFun="choooseNum"
            :object="object"
            :total="page.total"></sino-page>
        </div>
        </div>
      </div>
      <div class="etyma-content fl" style="margin-left: 1.4%;min-height: 565px;">
        <div  class="etyma-content-box ">
          <sino-title type="levelOne" title="检索结果"></sino-title>
          <div v-show="page2.total !== 0">
            <div style="margin-top: 1px;margin-top: 1px;height: 131px;">
              <img src="../../../assets/img/etyma-rusult-bg.png" alt="" class="etyma-rusult-bg">
              <div style="display: inline-block;height: 107px;">
                <div class="result-info" >
                  <span class="fs16">检索结果为：</span><br>
                  <span  class="result-info-text">未使用词根表的字段  <i v-text="page2.total"></i>个</span>
                </div>
              </div>
            </div>
            <div style="padding-top: 28px;padding-bottom: 10px">
              <sino-table :data="tableData2"  max-height="416"  style="width: 100%"   stripe>
                <sino-table-column type="index" label="序号"  width="60" align="center"></sino-table-column>
                <sino-table-column prop="tableName" label="表名"></sino-table-column>
                <sino-table-column prop="tableComment" label="表注释"></sino-table-column>
                <sino-table-column prop="columnName" label="字段名"></sino-table-column>
                <sino-table-column prop="columnComment" label="字段注释"></sino-table-column>
              </sino-table>
              <sino-page
                :page="page2.pageNum"
                :page-size="page2.pageSize"
                @pagehandler="pageHandler2"
                :pageArray="page2.pageArray"
                @choosePageFun="choooseNum2"
                :object="object"
                :total="page2.total"></sino-page>
            </div>
          </div>
          <div  v-show="page2.total === 0"class="etyma-success-all">
            <div class="iconfont sino-message-box-status clear sino-message-duigou">
              <i class="iconfont icon-duigou"></i>
            </div>
            <p>全部通过，全部使用词根表数据。</p>
          </div>
        </div>
      </div>
    </div>
    <!--弹层 --修改-->
    <sino-dialog :visible.sync="modifyAndAdd"  class="sino-dialog-modify etyma-dialog" size="small" v-on:open="modifyOpen" v-on:close="resetForm('modifyAndAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertFlag==='add'?'新增词根管理':'修改词根'" class="sino-dialog-title "></sino-title>
      <div class="role-title-second">
        <sino-form :model="modifyAndAddForm" ref="modifyAndAddForm" :rules="rules" class="role-form-modify" style="width:90%;" >
          <div class="rule-form-content">
            <ul class="rule-content-list">
              <li>
                <sino-form-item label="词根名称：" prop="chName" class="is-required  role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.chName" ></sino-input>
                </sino-form-item>
              </li>
              <li>

                <sino-form-item label="词根全称：" prop="enFullName" class="is-required  role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.enFullName" ></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="词根简称：" prop="enShortName" class=" is-required role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.enShortName" ></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="是否关键字：" prop="isKeyWord" class="role-form-modify-item mr-15 radio-item" :justText="true">
                  <sino-radio v-model="modifyAndAddForm.isKeyWord" class="mt5" :label="1">是</sino-radio>
                  <sino-radio v-model="modifyAndAddForm.isKeyWord" class="mt5" :label="0">否</sino-radio>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <sino-button class="alert-btn" type="primary" @click="submitFun">确 定</sino-button>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  let getPageInfo = function (obj, page) {
    obj.pageNum = page.pageNum;
    obj.pageSize = page.pageSize;
  };
  let checkedArr = '';
  let tipFun = function (_this, type, msg) {
    if (checkedArr.length === 0) {
      _this.$alert('请勾选一个你要操作的词根项', '提示信息', {
        confirmButtonText: '确 定',
        type: 'warning', // icon图标类型
        dragFlag: true,
        customClass: '', // 添加class
        lockScroll: true
      });
      return false;
    } else {
      return true;
    }
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
        etymaForm: { // 搜索条件
          chName: '', // 词根中文简称
          enShortName: '' // 词根简称
        },
        tableData: null, // 表格数据
        tableData2: null, // 表格数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: 0 // 分页总条数
        },
        page2: { // 展示分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50],
          total: null // 分页总条数
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
        rules: {
          chName: [
            {required: true, message: '请输入词根名称', trigger: 'blur'}
          ],
          enFullName: [
            {required: true, message: '请输入词根全称', trigger: 'blur'}
          ],
          enShortName: [
            {required: true, message: '请输入词根简称', trigger: 'blur'}
          ]
        },
        seeItem: false, // 查看弹层控制显示
        RoleSeeList: [], // 查看弹层的数据
        modifyAndAdd: false, // 修改，添加控制
        alertFlag: '',
        modifyAndAddForm: {
          enFullName: '',
          chName: '',
          enShortName: '',
          isKeyWord: 0
        }, // 修改新增 弹框 表单数据;
        cropList: [], // 所属公司列表，
        roleList: []
      };
    },
    created () {
      this.getList2();
    },
    methods: {
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr = selectTion;
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
        console.log(this.$refs);
      },
      searchFun () {
        console.log(this.etymaForm);
        this.page.pageNum = 1;
        this.getList();
      },
      submitFun () {
        if (this.alertFlag === 'add') {
          this.$refs['modifyAndAddForm'].validate((valid) => {
            if (valid) { // 新增角色
              api.post(this.apiPath.hrsc.saveEtyma, this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        } else {
          this.$refs['modifyAndAddForm'].validate((valid) => {
          //  修改词根
            if (valid) {
              api.post(this.apiPath.hrsc.updateEtyma, this.modifyAndAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.$message({message: '修改成功！', type: 'success'});
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
        console.log(this.modifyAndAddForm);
      },
      getList (all) {
        let obj = {};// 请求后端参数
        getPageInfo(obj, this.page);// 赋值分页信息
        obj.data = this.etymaForm;
        if (all) {
          obj.data = {};
        }
        this.getList2();
        api.post(this.apiPath.hrsc.findEtymaListByName, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
          console.log(err);
        });
      },
      getList2 () {
        let obj = {};// 请求后端参数
        getPageInfo(obj, this.page2);// 赋值分页信息
        api.post(this.apiPath.hrsc.findColumnList, obj).then(res => {
          this.tableData2 = res.data.list;
          this.page2.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        //        改变当前页
        this.page.pageNum = page;
        this.getList();
      },
      pageHandler2: function (page) {
        //        改变当前页
        this.page2.pageNum = page;
        this.getList2();
      },
      choooseNum: function (pageSize) {
//        改变分页显示条数;
        this.page.pageSize = pageSize;
        this.getList();
      },
      choooseNum2: function (pageSize) {
//        改变分页显示条数;
        this.page2.pageSize = pageSize;
        this.getList2();
      },
      clickFun: function (data, type) {
        if (type === 'modify') {
          if (tipFun(this)) {
            this.modifyAndAdd = true;
            this.alertFlag = 'modify';// 信息两字放不开，应该修改dialog，title宽度
            this.modifyAndAddForm = JSON.parse(JSON.stringify(checkedArr[0]));
            console.log(this.modifyAndAddForm);
          }
        } else if (type === 'add') {
          this.modifyAndAdd = true;
          this.alertFlag = 'add';
          this.modifyAndAddForm = {
            enFullName: '',
            chName: '',
            enShortName: '',
            isKeyWord: 0
          };
        } else if (type === 'del') {
          if (tipFun(this)) {
            this.$alert('确定删除该条信息吗？', '提示信息', {
              confirmButtonText: '确 定',
              type: 'warning', // icon图标类型
              dragFlag: true,
              customClass: '', // 添加class
              lockScroll: true,
              callback: action => {
                if (action === 'cancel') { return; }
                api.post(this.apiPath.hrsc.deleteEtymaById, checkedArr[0]).then(res => {
                  if (res.code === 'CPYY-00001') {
                    this.getList();
                    this.$message({message: '删除成功！', type: 'success'});
                  }
                }).catch(err => {
                  console.log(err);
                });
              }
            });
          }
        }
      },
      modifyOpen: function () { // 修改对话框打开回调

      },
      viewAll: function () {
        this.getList('all');
      }
    }
  };
</script>
