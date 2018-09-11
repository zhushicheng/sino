<template>
  <!--账单表头维护-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="账单表头维护"></sino-title>
      <sino-form :model="billMeterForm" ref="billMeterForm" class="serch-form leads-serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">中文名称：</span>
              <sino-input class="fl" type="text" v-model="billMeterForm.chName"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">外文名称：</span>
              <sino-input class="fl" type="text" v-model="billMeterForm.enName"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">表头类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'BILL_HEAD_TYPE'}"
                           :chooseName.sync="billMeterForm.billHeadTypeName"
                           :chooseId.sync="billMeterForm.billHeadType" :clear="true"
              ></sino-select>
            </li>
            <li>
              <span class="search-inner-name">是否默认项：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :url="dictSelUrl"
                           :data="{code: 'YES_NO'}"
                           :chooseName.sync="billMeterForm.isDefaultName"
                           :chooseId.sync="billMeterForm.isDefault" :clear="true"
              ></sino-select>
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
            <sino-button type="icon-text" @click="addFun()"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="billMeterData" max-height="416" border v-on:viewAll="viewAll" stripe>
          <sino-table-column type="index" label="序号" align="center" width="50"></sino-table-column>
          <sino-table-column prop="chName" label="中文名称"></sino-table-column>
          <sino-table-column prop="enName" label="外文名称" min-width="130"></sino-table-column>
          <sino-table-column prop="showSort" label="显示顺序" align="center"></sino-table-column>
          <sino-table-column prop="billHeadTypeName" label="表头类型" align="center"></sino-table-column>
          <sino-table-column prop="colName" label="映射值" min-width="130"></sino-table-column>
          <sino-table-column prop="isDefaultName" label="是否默认项" align="center" min-width="95"></sino-table-column>
          <sino-table-column prop="groupCodtName" label="分组条件" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="modifyFun(scope.row)">修改</span><i class="table-i">|</i>
                <span class="table-span" @click="delFun(scope.row)">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="billMeterFlag" :top="'10%'" v-on:close ="closeDialog('billMeterAddForm')" >
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="billMeterAddForm" :rules="billMeterAddRules" ref="billMeterAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="中文名称：" prop="chName">
          <sino-input v-model="billMeterAddForm.chName"></sino-input>
        </sino-form-item>
        <sino-form-item label="外文名称：" prop="enName">
          <sino-input v-model="billMeterAddForm.enName"></sino-input>
        </sino-form-item>
        <sino-form-item label="显示顺序：" prop="showSort">
          <sino-input v-model="billMeterAddForm.showSort"></sino-input>
        </sino-form-item>
        <sino-form-item prop="billHeadTypeName" label="表头类型：">
          <sino-select :filterable="false"
                       :token="token"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="billMeterAddForm.billHeadTypeName"
                       :chooseId.sync="billMeterAddForm.billHeadType"
                       :clear="true"
                       :data="{code: 'BILL_HEAD_TYPE '}"
                       :url="dictSelUrl"></sino-select>
        </sino-form-item>
        <sino-form-item prop="colName" label="映射值：">
          <sino-input v-model="billMeterAddForm.colName"></sino-input>
        </sino-form-item>
        <sino-form-item label="是否默认项：" prop="isDefault">
          <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in isDefaultlist" :key="index" v-model="billMeterAddForm.isDefault" :label="item.id">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
        <sino-form-item prop="groupCodtName" label="分组条件：">
          <sino-select :filterable="false"
                       :token="token"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="false"
                       :totalNum="false"
                       :isPage="false"
                       :isGroup="false"
                       :chooseName.sync="billMeterAddForm.groupCodtName"
                       :chooseId.sync="billMeterAddForm.groupCodt"
                       :clear="true"
                       :data="{code: 'GROUP_CODT '}"
                       :url="dictSelUrl"></sino-select>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{btnText}}</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../api';
  import Cookies from 'js-cookie';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        token: Cookies.get('Token'),
        billMeterForm: {
          chName: '',
          enName: '',
          billHeadType: '',
          billHeadTypeName: '',
          isDefaultName: '',
          isDefault: ''
        },
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
        billMeterData: null,
        billMeterFlag: false,
        alertTitle: '',
        btnText: '',
        billMeterAddForm: {
          chName: '',
          enName: '',
          showSort: '',
          billHeadType: '',
          billHeadTypeName: '',
          colName: '',
          isDefault: '',
          groupCodt: '',
          groupCodtName: ''
        },
        isDefaultlist: [],
        billMeterAddRules: {
          chName: [
            {required: true, message: '请输入中文名称', trigger: 'change'}
          ],
          showSort: [
            {required: true, message: '请输入显示顺序', trigger: 'change'}
          ],
          billHeadTypeName: [
            {required: true, message: '请输入选择表头类型', trigger: 'change'}
          ],
          colName: [
            {required: true, message: '请输入映射值', trigger: 'change'}
          ],
          isDefault: [
            {required: true, message: '请选择是否默认项', trigger: 'change', type: 'number'}
          ]
        }
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.isDefaultlist = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let _data = {
          data: this.billMeterForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findList, _data).then(res => {
          this.billMeterData = res.data.list;
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
        this.alertTitle = '新增账单表头信息';
        this.btnText = '确 定';
        this.billMeterFlag = true;
      },
      modifyFun (_data) {
        this.alertTitle = '修改账单表头信息';
        this.btnText = '修 改';
        this.billMeterFlag = true;
        let _this = this;
        api.post(_this.apiPath.hrsc.findBillMeter, {headId: _data.headId}).then(res => {
          _this.billMeterAddForm = res.data;
          _this.billMeterAddForm.showSort = String(_this.billMeterAddForm.showSort);
        }).catch(err => {
          console.log(err);
        });
      },
      submitForm () {
        const _this = this;
        _this.$refs.billMeterAddForm.validate((valid) => {
          if (valid) {
            if (_this.alertTitle === '新增账单表头信息') {
              api.post(_this.apiPath.hrsc.saveBillMeter, _this.billMeterAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.billMeterFlag = false;
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              api.post(_this.apiPath.hrsc.updateBillMeter, _this.billMeterAddForm).then(res => {
                if (res.code === 'CPYY-00001') {
                  _this.billMeterFlag = false;
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
      delFun (data) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          let _data = {
            headId: data.headId
          };
          api.post(this.apiPath.hrsc.deleteBillMeter, _data).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '删除成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.pageNum = 1;
        this.viewAll(this.pageNum, pageSize);
      },
      closeDialog (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
