<template>
  <div class="roleMange">
    <div class="role-content">
      <sino-title type="levelOne" title="数据字典查询"></sino-title>
      <div style="margin-top: 10px">
        <div class="etyma-content small-etyma-content fl">
          <div>
            <sino-title type="levelTwo" title="字典查询"></sino-title>
            <div style="margin-top: 1px">
              <sino-form :model="etymaForm" ref="etymaForm" class="etyma-form fl">
                <div class="rule-form-content">
                  <sino-form-item label="字典名称：" class="etyma-form-item fl mb15">
                    <sino-input type="text" v-model="etymaForm.dictName"></sino-input>
                  </sino-form-item>
                  <sino-form-item label="引用码：" class="etyma-form-item fl mb15">
                    <sino-input type="text" v-model="etymaForm.code"></sino-input>
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
            <div class="sino-table-total">
              <div class="sino-table-icon bs-none">
                <div class="sino-table-icon-left datadict">
                  <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增
                  </sino-button>
                  <sino-button type="icon-text" @click="clickFun('','modify')"><i class="iconfont sino-modify"></i>修改
                  </sino-button>
                  <sino-button type="icon-text" @click="clickFun('','see')"><i class="iconfont sino-xiangqing1"></i>查看
                  </sino-button>
                  <sino-button type="icon-text" @click="clickFun('','del')"><i class="iconfont sino-shanchu1"></i>删除
                  </sino-button>
                  <sino-button type="icon-text" @click="clickFun('','update')"><i class="iconfont sino-reset"></i>更新字典缓存
                  </sino-button>
                </div>
              </div>
              <sino-table :data="tableData" max-height="416" class="get-check-table"  v-on:select="selectCallBack" border stripe v-on:viewAll="viewAll">
                <sino-table-column  type="selection"></sino-table-column>
                <sino-table-column  prop="dictName" label="字典名称"></sino-table-column>
                <sino-table-column prop="code" label="引用码"></sino-table-column>
              </sino-table>
              <sino-page v-bind:page="page.pageNum" v-bind:page-size="page.pageSize" v-on:pagehandler="pageHandler"
                         :pageArray="page.pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object"
                         :total="total"></sino-page>
            </div>
          </div>
        </div>
        <div class="etyma-content2 fl etyma-right-box">
          <sino-link-container :outBoxStyle="outBoxStyle" :innerBoxStyle="innerBoxStyle" :triangleStyle="triangleStyle">
        <div  class="etyma-content-box" >
          <sino-title type="levelTwo" title="详情查询"></sino-title>
          <div style="margin-top: 1px">
            <sino-form :model="etymaForm2" ref="etymaForm2" class="etyma-form fl">
              <div class="rule-form-content">
                <sino-form-item label="字典值名称：" class="etyma-form-item fl mb15">
                  <sino-input type="text" v-model="etymaForm2.dictInfoName"></sino-input>
                </sino-form-item>
                <sino-form-item label="字典值：" class="etyma-form-item fl mb15">
                  <sino-input type="text" v-model="etymaForm2.dictInfoValue"></sino-input>
                </sino-form-item>
              </div>
            </sino-form>
            <div class="sup-line2"></div>
          </div>
          <div class="etyma-form-button fr">
            <div class="role-search">
              <sino-button class="is-primary" style="margin-top: 17px" @click="searchFun2" type="p">查 询</sino-button>
            </div>
          </div>
          <div class="clear"></div>
          <div class="sino-table-total" >
            <div class="sino-table-icon bs-none">
              <div class="sino-table-icon-left">
                <sino-button type="icon-text" @click="clickFun2('','add')"><i class="iconfont sino-add"></i>新增
                </sino-button>
                <sino-button type="icon-text" @click="clickFun2('','modify')"><i class="iconfont sino-modify"></i>修改
                </sino-button>
                <sino-button type="icon-text" @click="clickFun2('','see')"><i class="iconfont sino-xiangqing1"></i>查看
                </sino-button>
                <sino-button type="icon-text" @click="clickFun2('','del')"><i class="iconfont sino-shanchu1"></i>删除
                </sino-button>
              </div>
            </div>
            <sino-table :data="tableData2" v-on:select="selectCallBack2" stripe border max-height="416" v-on:viewAll="viewAll2">
              <sino-table-column  type="selection"></sino-table-column>
              <sino-table-column prop="dictInfoName" label="字典值名称" min-width="95"></sino-table-column>
              <sino-table-column prop="dictInfoValue" label="字典值"></sino-table-column>
              <sino-table-column prop="showSort" label="排序码"></sino-table-column>
              <sino-table-column prop="dictName" label="字典名称"></sino-table-column>
              <sino-table-column prop="code" label="引用码" min-width="100"></sino-table-column>
            </sino-table>
            <sino-page v-bind:page="page2.pageNum" v-bind:page-size="page2.pageSize" v-on:pagehandler="pageHandler2"
                       :pageArray="page2.pageArray" v-on:choosePageFun="choooseNum2" v-bind:object="object"
                       :total="total2"></sino-page>
          </div>
        </div>
          </sino-link-container>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!--弹层 --修改-新增-字典-->
    <sino-dialog :visible.sync="modifyAndAdd" class="sino-dialog-modify etyma-dialog" size="small" @close="modifyClose('modifyAndAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <div class="role-title-second">
        <sino-form :model="modifyAndAddForm" :rules="modifyAndAddFormRule" class="role-form-modify" ref="modifyAndAddForm">
          <div class="rule-form-content">
            <ul class="rule-content-list">
              <li>
                <sino-form-item label="字典名称：" prop="dictName" class="is-required role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.dictName"></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="引用码：" prop="code" class="is-required  role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm.code"></sino-input>
                </sino-form-item>
              </li>
              <li style="width: 100%">
                <sino-form-item label="描述：" class="role-form-modify-item" prop="dictDesc">
                  <sino-input type="textarea" class="" style="width: 532px;"
                              v-model="modifyAndAddForm.dictDesc"
                              :disabled="false" tipMessage="提
示信息提示信息"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun('modifyAndAddForm')">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--弹层 --修改-新增-字典详情-->
    <sino-dialog :visible.sync="modifyAndAdd2" class="sino-dialog-modify etyma-dialog" size="small" @close="modifyClose('modifyAndAddForm2')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title "></sino-title>
      <div class="role-title-second">
        <sino-form :model="modifyAndAddForm2" :rules="modifyAndAddFormRule2" class="role-form-modify" ref="modifyAndAddForm2">
          <div class="rule-form-content">
            <ul class="rule-content-list">
              <li>
                <sino-form-item label="字典值名称：" prop="dictInfoName" class="role-form-modify-item mr-15">
                  <sino-input v-model="modifyAndAddForm2.dictInfoName " ></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="字典值：" prop="dictInfoValue" class="role-form-modify-item mr-15 is-required">
                  <sino-input v-model.number="modifyAndAddForm2.dictInfoValue" ></sino-input>
                </sino-form-item>
              </li>
              <li>
                <sino-form-item label="排序码：" prop="showSort" class="role-form-modify-item mr-15 is-required">
                  <sino-input v-model.number="modifyAndAddForm2.showSort" ></sino-input>
                </sino-form-item>
              </li>
              <li style="width: 100%">
                <sino-form-item label="描述：" style="margin-right: 6%;" prop="name" class="role-form-modify-item">
                  <sino-input type="textarea" class="" style="width: 532px;"
                              v-model="modifyAndAddForm2.remark"
                              :disabled="false"></sino-input>
                </sino-form-item>
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitFun2">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--弹层 --查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="etyma-dialog">
      <sino-title slot="title" type="levelOne" title="查看字典" class="sino-dialog-title"></sino-title>
      <div class="roleMange-list">
        <ul>
          <li>字典名称</li>
          <li v-text="dictionaryList.dictName"></li>
        </ul>
        <ul>
          <li>创建人</li>
          <li v-text="dictionaryList.creUserName"></li>
        </ul>
        <ul>
          <li>引用码</li>
          <li v-text="dictionaryList.code"></li>
        </ul>
        <ul>
          <li>创建时间</li>
          <li v-text="dictionaryList.creTime"></li>
        </ul>
        <ul class="roleMange-list-last">
          <li>描述</li>
          <li v-text="dictionaryList.dictDesc"></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--弹层 --查看详情-->
    <sino-dialog :visible.sync="seeItem2" size="small" class="etyma-dialog">
      <sino-title slot="title" type="levelOne" title="查看字典详情" class="sino-dialog-title"></sino-title>
      <div class="roleMange-list">
        <ul>
          <li>字典值名称</li>
          <li v-text="dictionaryList2.dictInfoName"></li>
        </ul>
        <ul>
          <li>字典名称</li>
          <li v-text="dictionaryList2.dictName"></li>
        </ul>
        <ul>
          <li>字典值</li>
          <li v-text="dictionaryList2.dictInfoValue"></li>
        </ul>
        <ul>
          <li>引用码</li>
          <li v-text="dictionaryList2.code"></li>
        </ul>
        <ul>
          <li>排序码</li>
          <li v-text="dictionaryList2.showSort"></li>
        </ul>
        <ul>
          <li>备注</li>
          <li v-text="dictionaryList2.remark"></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem2=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  import vald from '../../../validator/index.js';
  let checkedArr = [];
  let checkedArr2 = [];
  let tipFun = function (_this, array, tipMessage) {
    if (array.length === 0) {
      _this.$alert(tipMessage, '提示信息', {
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

  export default {
    components: {},
    data () {
      var checkNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error('不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
      };
      return {
        findCorpSelectBoxInfo: this.apiPath.author.findCorpSelectBoxInfo,
        etymaForm: { // 搜索条件
          dictName: '',
          code: ''
        },
        etymaForm2: { // 搜索条件
          dictInfoName: '',
          dictInfoValue: ''
        },
        tableData: null, // 表格数据
        tableData2: null, // 表格数据
        page: { // 分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        total: 0, // 分页总条数
        page2: { // 展示分页数据
          pageNum: 1,
          pageSize: 10,
          pageArray: [10, 20, 30, 50]
        },
        total2: 0, // 分页总条数
        object: { // 表格配置
          maxPage: 3,
          issmallPage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        seeItem: false, // $查看弹层控制显示
        seeItem2: false, // 查看字典详情弹层控制显示
        dictionaryList: [], // $查看字典弹层的数据
        dictionaryList2: [], // 查看字典详情弹层的数据
        modifyAndAdd: false, // $字典修改，添加控制
        modifyAndAdd2: false, // 详情修改，添加控制
        alertTitle: '',
        modifyAndAddForm: {
          dictName: '',
          code: '',
          dictDesc: ''
        },
        modifyAndAddFormRule: {
          dictName: [
            { required: true, message: '请输入字典名称', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入引用码', trigger: 'change' }
          ]
        },
        // 修改新增 弹框 字典
        modifyAndAddForm2: {
          dictInfoName: '',
          dictInfoValue: '',
//          corpName: '',
//          corpId: '',
          showSort: '',
          remark: ''
        },
        modifyAndAddFormRule2: {
          dictInfoName: [
            { required: true, message: '请输入字典值名称', trigger: 'change' }
          ],
          dictInfoValue: [
            { required: true, type: 'number', message: '字典值为数字类型，且为必填项', trigger: 'change' },
            {require: true, validator: vald.checkNum, trigger: 'change'}
          ],
          showSort: [
            { required: true, type: 'number', message: '排序码为数字类型，且为必填项', trigger: 'change' },
            {require: true, validator: vald.checkNum, trigger: 'change'}
          ]
        },
        // 修改新增 弹框 字典详情;
        roleList: [],
        // 指针小三角的样式
        outBoxStyle: {},
        innerBoxStyle: {'padding-top': '5px'},
        triangleStyle: {display: 'none'}
      };
    },
    created () {
      this.getList();
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        let _this = this;
        if (selectTion.length >= 1) {
          setTimeout(function () {
            let curEle = document.getElementsByClassName('get-check-table')[0].getElementsByClassName('is-checked')[0].parentNode;
            let parent = document.getElementsByClassName('etyma-content')[0];
            let top  = _this.offset(curEle) - _this.offset(parent);
            _this.triangleStyle.top = top + 7 + 'px';
            _this.triangleStyle.display = 'block';
            _this.searchFun2();
          });
        } else {
          this.triangleStyle.display = 'none';
        }
        checkedArr = selectTion;
        this.triangleStyle.top = '300';
      },
      selectCallBack2 (selectTion, row) { // 手动选中checkBox回调
        if (selectTion.length >= 2) {
          selectTion.splice(0, selectTion.length - 1);
        }
        checkedArr2 = selectTion;
      },
      searchFun () {
        this.page.pageNum = 1;
        this.page.pageSize = 10;
        this.getList();
      },
      searchFun2 () {
        this.page2.pageNum = 1;
        this.page2.pageSize = 10;
        this.getList2();
      },
      submitFun (formName) {
        this.$refs.modifyAndAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增字典分类') {
              // 新增角色
              api.post(this.apiPath.hrsc.saveDictInfo, this.modifyAndAddForm).then(res => {
                this.$refs.modifyAndAddForm.resetFields();
                this.modifyAndAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              // 修改字典
              var obj = this.modifyAndAddForm;
              obj.dictId = checkedArr[0].dictId;
              api.post(this.apiPath.hrsc.updateDictInfo, obj).then(res => {
                this.$refs.modifyAndAddForm.resetFields();
                this.modifyAndAdd = false;
                this.getList();
                if (res.code === 'CPYY-00001') {
                  this.getList();
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
      submitFun2 () {
        this.$refs.modifyAndAddForm2.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增字典详情') {
              // 新增字典详情
              let obj = this.modifyAndAddForm2;
              obj.dictId = checkedArr[0].dictId;
              api.post(this.apiPath.hrsc.saveDictInfoDetail, obj).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList2();
                  this.$refs.modifyAndAddForm2.resetFields();
                  this.modifyAndAdd2 = false;
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              // 修改字典详情
              var obj = this.modifyAndAddForm2;
              obj.dictInfoId = checkedArr2[0].dictInfoId;
              api.post(this.apiPath.hrsc.updateDictInfoDetail, obj).then(res => {
                this.$refs.modifyAndAddForm2.resetFields();
                this.modifyAndAdd2 = false;
                this.getList2();
                if (res.code === 'CPYY-00001') {
                  this.getList2();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      // 左侧table 查询 => 初始化加载
      getList () {
        const obj = {
          data: this.etymaForm,
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        };
        api.post(this.apiPath.hrsc.listDictInfos, obj).then(res => {
          checkedArr = [];
          this.triangleStyle.display = 'none';
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll () {
        this.page.pageNum = 1;
        this.page.pageSize = 10;
        let obj = {
          data: {
            dictName: '',
            code: ''
          },
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize
        };
        api.post(this.apiPath.hrsc.listDictInfos, obj).then(res => {
          checkedArr = [];
          this.triangleStyle.display = 'none';
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      getList2 () {
        let obj = {
          data: this.etymaForm2,
          pageNum: this.page2.pageNum,
          pageSize: this.page2.pageSize
        };
        if (checkedArr.length == 1) {
          obj.data.dictId = checkedArr[0].dictId;
        } else {
          obj.data.dictId = '';
        }
        api.post(this.apiPath.hrsc.listDictInfoDetail, obj).then(res => {
          checkedArr2 = [];
          this.tableData2 = res.data.list;
          this.total2 = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll2 () {
        this.page2.pageNum = 1;
        this.page2.pageSize = 10;
        let obj = {
          data: { // 搜索条件
            dictInfoName: '',
            dictInfoValue: '',
            dictId: ''
          },
          pageNum: this.page2.pageNum,
          pageSize: this.page2.pageSize
        };
        api.post(this.apiPath.hrsc.listDictInfoDetail, obj).then(res => {
          checkedArr2 = [];
          this.tableData2 = res.data.list;
          this.total2 = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.getList();
      },
      pageHandler2: function (page) {
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
        if (type === 'see') {
          if (tipFun(this, checkedArr, '请选择一个字典项')) {
            api.post(this.apiPath.hrsc.getDictInfo, {dictId: checkedArr[0].dictId}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.dictionaryList = res.data;
                this.seeItem = true;
              }
            }).catch(err => {
            });
          }
        } else if (type === 'modify') {
          if (tipFun(this, checkedArr, '请选择一个字典项')) {
            this.modifyAndAdd = true;
            this.alertTitle = '修改字典分类';
            api.post(this.apiPath.hrsc.getDictInfo, {dictId: checkedArr[0].dictId}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAddForm = res.data;
              }
            }).catch(err => {
            });
          }
        } else if (type === 'add') {
          this.modifyAndAdd = true;
          this.alertTitle = '新增字典分类';
        } else if (type === 'del') {
          if (tipFun(this, checkedArr, '请选择一个字典项')) {
            this.$confirm('确定删除该条信息吗？', '提示信息', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
              api.post(this.apiPath.hrsc.deleteDictInfo, {dictId: checkedArr[0].dictId}).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList();
                  this.page2.pageNum = 1;
                  this.page2.pageSize = 10;
                  this.tableData2 = [];
                  this.total2 = null;
                  this.$message({message: '删除成功！', type: 'success'});
                }
              }).catch(err => {
              });
            });
          }
        } else if (type == 'update') {
          api.post(this.apiPath.hrsc.initDictInfo, {}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '刷新成功！', type: 'success'});
            }
          }).catch(err => {
          });
        }
      },
      clickFun2: function (data, type) {
        if (type === 'see') {
          if (tipFun(this, checkedArr2, '请选择一个字典值')) {
            api.post(this.apiPath.hrsc.getDictInfoDetail, {dictInfoId: checkedArr2[0].dictInfoId}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.dictionaryList2 = res.data;
                this.seeItem2 = true;
              }
            }).catch(err => {
            });
          }
        } else if (type === 'modify') {
          if (tipFun(this, checkedArr2, '请选择一个字典值')) {
            this.modifyAndAdd2 = true;
            this.alertTitle = '修改字典详情';
            api.post(this.apiPath.hrsc.getDictInfoDetail, {dictInfoId: checkedArr2[0].dictInfoId}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAddForm2 = res.data;
              }
            }).catch(err => {
            });
          }
        } else if (type === 'add') {
          if (tipFun(this, checkedArr, '请在左侧选择一个字典项值')) {
            api.post(this.apiPath.hrsc.getMaxDictInfoValueByCode, {code: checkedArr[0].code}).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAddForm2.dictInfoValue = res.data.dictInfoValue;
                this.modifyAndAddForm2.showSort = res.data.showSort;
                this.modifyAndAdd2 = true;
                this.alertTitle = '新增字典详情';
              }
            }).catch(err => {
            });
          }
        } else if (type === 'del') {
          if (tipFun(this, checkedArr2, '请选择一个字典值项')) {
            this.$confirm('确定删除该条信息吗？', '提示信息', {
              confirmButtonText: '确 定',
              cancelButtonText: ' ',
              type: 'warning'
            }).then(() => {
              api.post(this.apiPath.hrsc.deleteDictInfoDetail, {dictInfoId: checkedArr2[0].dictInfoId}).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.getList2();
                  this.$message({message: '删除成功！', type: 'success'});
                }
              }).catch(err => {
              });
            });
          }
        }
      },
      modifyClose: function (formName) { // 修改对话框打开回调
        this.$refs[formName].resetFields();
      },
      offset: function (curEle) {
        var disTop = curEle.offsetTop;
        var par = curEle.offsetParent;
        while (par) {
          disTop += par.offsetTop;
          par = par.offsetParent;
        }
        return disTop;
      }
    }
  };
</script>

