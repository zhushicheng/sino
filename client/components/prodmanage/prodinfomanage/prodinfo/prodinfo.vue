<template>
  <!--产品信息管理-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item is-active">产品基本信息</div>
          <div class="sino-tabs-item" @click="prodScheFun('second')">产品方案</div>
          <div class="sino-tabs-item" @click="prodScheFun('third')">产品定价方案</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-form :model="prodInfoForm" ref="ruleForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">产品名称：</span>
              <sino-select class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="prodInfoForm.prodCnName" :chooseId.sync="prodInfoForm.prodId"  :clear="true" :url="prodNameSelUrl"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">产品类型：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodInfoForm.prodTypeName" :chooseId.sync="prodInfoForm.prodType"  :clear="true" :url="dictSelUrl" :data="{code:'PROD_TYPE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">产品状态：</span>
              <sino-select class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodInfoForm.prodStateName" :chooseId.sync="prodInfoForm.prodState"  :clear="true" :url="dictSelUrl" :data="{code:'PROD_STATE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">组合产品：</span>
              <div class="fl">
                <sino-radio v-for="(item, index) in trackStatus" :key="index" v-model="prodInfoForm.isPkgProd" :label="item.id" class="leads-sinoradio">{{item.title}}</sino-radio>
              </div>
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
    <div class="sino-queryList">
      <div class="sino-table-total">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增</sino-button>
            <sino-button type="icon-text" @click="startFun"><i class="iconfont sino-duihao"></i>启用</sino-button>
            <sino-button type="icon-text" @click="stopFun"><i class="iconfont sino-invalid"></i>停用</sino-button>
          </div>
        </div>
        <sino-table :data="tableData" border max-height="416" stripe v-on:select="selectCallBack" @select-all="selectAllBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="prodCnName" label="产品名称" min-width="180"></sino-table-column>
          <sino-table-column prop="isPkgProdName" label="产品组合"></sino-table-column>
          <sino-table-column prop="prodTypeName" label="产品类型" min-width="105"></sino-table-column>
          <sino-table-column prop="prodStateName" label="产品状态"></sino-table-column>
          <sino-table-column prop="remark" label="备注" min-width="180"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" min-width="200" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.prodState !== 2">|</i>
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.prodState !== 2">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="manProdFun(scope.row)">管理产品方案</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--新增/修改-->
    <sino-dialog :visible.sync="prodInfoAdd" size="large" :top="'10%'" class="dialog-height" @close ="resetForm('prodInfoAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="prodInfoAddForm" :rules="prodInfoAddRules" ref="prodInfoAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="产品名称：" class="sino-form-item-width"  prop="prodCnName">
          <sino-input type="text" v-model="prodInfoAddForm.prodCnName" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item label="产品西文名称：" class="sino-form-item-width"  prop="prodEnName">
          <sino-input v-model="prodInfoAddForm.prodEnName" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item prop="prodCode" label="产品编号：" v-if="alertTitle !== '新增产品基本信息'">
          <sino-input type="text" v-model="prodInfoAddForm.prodCode"  :disabled="true" ></sino-input>
        </sino-form-item>
        <sino-form-item label="组合产品：" prop="isPkgProd" class="radio-item h25" :justText="false">
          <sino-radio v-for="(item, index) in trackStatus" :key="index" v-model.number="prodInfoAddForm.isPkgProd" :label="item.id" class="leads-sinoradio">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item label="产品类型：" class="h25" prop="prodTypeName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodInfoAddForm.prodTypeName" :chooseId.sync="prodInfoAddForm.prodType" :clear="true" :url="dictSelUrl" :data="{code:'PROD_TYPE'}"></sino-select>
        </sino-form-item>
        <sino-form-item label="产品状态：" class="h25" prop="prodStateName">
          <sino-select :filterable="false" :multiselect="false" :isshowTotol="false"
                       :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="prodInfoAddForm.prodStateName" :chooseId.sync="prodInfoAddForm.prodState" :clear="true" :url="dictSelUrl" :data="{code:'PROD_STATE'}"></sino-select>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="prodDesc" label="产品说明：">
          <sino-input type="textarea" v-model="prodInfoAddForm.prodDesc" :disabled="false" ></sino-input>
        </sino-form-item>
        <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
          <sino-input type="textarea" v-model="prodInfoAddForm.remark" :disabled="false" ></sino-input>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
         <sino-button type="primary" @click="submitForm('prodInfoAddForm')">{{leadsbtn}}</sino-button>
      </span>
    </sino-dialog>
    <!--查看-->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看产品基本信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>产品名称</h6><span v-text="seeForm.prodCnName"></span>
          </li>
          <li>
            <h6>产品西文名称</h6><span v-text="seeForm.prodEnName"></span>
          </li>
          <li>
            <h6>产品编号</h6><span v-text="seeForm.prodCode"></span>
          </li>
          <li>
            <h6>产品组合</h6><span v-text="seeForm.isPkgProdName"></span>
          </li>
          <li>
            <h6>产品类型</h6><span v-text="seeForm.prodTypeName"></span>
          </li>
          <li>
            <h6>产品状态</h6><span v-text="seeForm.prodStateName"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>创建时间</h6><span v-text="seeForm.creTime"></span>
          </li>
          <li class="li-last">
            <h6>产品说明</h6><span v-text="seeForm.prodDesc "></span>
          </li>
          <li class="li-last">
            <h6>备注</h6><span v-text="seeForm.remark"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer see-item-sure">
          <!--<sino-button type="primary"  @click="seeItem = false">确 定</sino-button>-->
          <span class="prodOper" @click="moreProdOperFun" v-if="false">查看产品操作记录</span>
      </span>
    </sino-dialog>
    <!--查看更多操作记录-->
    <sino-dialog :visible.sync="moreProdOperFlag" class="moreProd-dialog">
      <sino-title slot="title" type="levelOne" title="查看产品修改记录" class="sino-dialog-title"></sino-title>
      <sino-table :data="tableData" stripe border max-height="416" class="procreg-table">
        <sino-table-column prop="loginName" label="序号" width="60"></sino-table-column>
        <sino-table-column prop="loginName" label="产品编号"></sino-table-column>
        <sino-table-column prop="fullName" label="产品名称"></sino-table-column>
        <sino-table-column prop="innerNum" label="变更项"></sino-table-column>
        <sino-table-column prop="isEffect" label="变更前值"></sino-table-column>
        <sino-table-column prop="isEffect" label="变更后值"></sino-table-column>
        <sino-table-column prop="userType" label="备注" min-width="180"></sino-table-column>
        <sino-table-column prop="userType" label="操作人"></sino-table-column>、
        <sino-table-column prop="userType" label="操作时间" min-width="170"></sino-table-column>
      </sino-table>
      <span slot="footer" class="dialog-footer see-item-sure">
        <sino-button type="primary" @click="moreProdOperFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  let checkedArr = '';
  export default {
    components: {},
    data () {
      return {
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        prodInfoForm: {
          prodCnName: '',
          prodId: '',
          prodTypeName: '',
          prodType: '',
          prodStateName: '',
          prodState: '',
          isPkgProd: ''
        },
        trackStatus: [],
        isA: true,
        tableData: null,
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
        alertTitle: '', // 弹层title
        leadsbtn: '', // 弹层button
        prodInfoAdd: false,
        prodInfoAddForm: {
          prodCnName: '',
          prodEnName: '',
          prodCode: '',
          isPkgProd: '',
          prodTypeName: '',
          prodType: '',
          prodStateName: '未启用',
          prodState: 1,
          prodDesc: '',
          remark: ''
        },
        // 校验
        prodInfoAddRules: {
          prodCnName: [
            {required: true, message: '产品名称为必填项', trigger: 'change'}
          ],
          prodCode: [
            {required: true, message: '产品编码为必填项', trigger: 'change'}
          ],
          isPkgProd: [
            {required: true, type: 'number', message: '组合产品为必输项', trigger: 'change'}
          ],
          prodTypeName: [
            {required: true, message: '产品类型为必填项', trigger: 'change'}
          ],
          prodStateName: [
            {required: true, message: '产品状态为必填项', trigger: 'change'}
          ]
        },
        seeForm: {},
        leadsAdd: false, // 添加弹层
        seeItem: false, // 控制查看弹层的显示
        moreProdOperFlag: false
      };
    },
    created () {
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.trackStatus = res.data.list;
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
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'second') {
          this.$router.push({path: '/proSche'});
        } else if (order === 'third') {
          this.$router.push({path: '/prodPrice'});
        }
      },
      selectCallBack (selectTion, row) { // 手动选中checkBox回调
//        if (selectTion.length >= 2) {
//          selectTion.splice(0, selectTion.length - 1);
//        }
        checkedArr = selectTion;
      },
      selectAllBack (selectTion, row) {
        checkedArr = selectTion;
      },
      resetForm: function () { // 修改对话框打开回调
        this.$refs.prodInfoAddForm.resetFields();
        this.alertTitle = '';
        this.leadsbtn = '';
      },
      // 获取全部表格数据
      viewAll () {
        var obj = {
          pageNum: 1,
          pageSize: this.pageSize,
          data: {
            prodCnName: '',
            prodId: '',
            prodTypeName: '',
            prodType: '',
            prodStateName: '',
            prodState: '',
            isPkgProd: ''
          }
        };
        api.post(this.apiPath.hrsc.findallpageprodinfo, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.tableData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        var obj = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          data: this.prodInfoForm
        };
        api.post(this.apiPath.hrsc.findallpageprodinfo, obj).then(res => {
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
      // 新增
      addFun: function () {
        this.prodInfoAdd = true;
        this.alertTitle = '新增产品基本信息';
        this.leadsbtn = '确 定';
      },
      // 启用
      startFun: function () {
        let _this = this;
        if (checkedArr === '' || checkedArr.length === 0) {
          _this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          _this.$confirm('确定启用？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.prodId);
            });
            var obj = {
              prodIds: _arr,
              prodState: 2
            };
            api.post(_this.apiPath.hrsc.updateprodinfostate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                checkedArr = [];
                _this.searchFun();
                _this.$message({message: '启用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      // 停用
      stopFun: function () {
        let _this = this;
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请至少选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
        } else {
          _this.$confirm('确定停用？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            let _arr = [];
            checkedArr.forEach(function (list) {
              _arr.push(list.prodId);
            });
            var obj = {
              prodIds: _arr,
              prodState: 3
            };
            api.post(_this.apiPath.hrsc.updateprodinfostate, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                checkedArr = [];
                _this.searchFun();
                _this.$message({message: '停用成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }).catch(() => {
            console.log('删除失败!');
          });
        }
      },
      // 查看
      seeFun: function (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.findbyidprodinfo, { prodId: data.prodId }).then(res => {
          if (res.code === 'CPYY-00001') {
            this.seeForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改
      modifyFun: function (data) {
        this.prodInfoAdd = true;
        this.alertTitle = '修改产品基本信息';
        this.leadsbtn = '修 改';
        api.post(this.apiPath.hrsc.findbyidprodinfo, {prodId: data.prodId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.prodInfoAddForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查看管理方案
      manProdFun: function (data) {
        this.$router.push({path: '/proSche', query: {prodId: data.prodId, prodCnName: data.prodCnName}});
      },
      // 查看更多产品操作记录
      moreProdOperFun: function () {
        this.moreProdOperFlag = true;
      },
      // 新增确定
      submitForm () {
        this.$refs.prodInfoAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增产品基本信息') {
              api.post(this.apiPath.hrsc.addprodinfo, this.prodInfoAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                  this.prodInfoAdd = false;
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(this.apiPath.hrsc.updateprodinfo, this.prodInfoAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
                  this.prodInfoAdd = false;
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
      }
    }
  };
</script>
