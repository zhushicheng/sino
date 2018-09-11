<template>
  <!--客户邮寄地址-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="客户邮寄地址查询"></sino-title>
      <sino-form :model="sendAddrForm" ref="sendAddrForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one search-inner-width">
              <!-------------->
              <span class="search-inner-name">客户名称：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :chooseName.sync="sendAddrForm.custName"
                           :chooseId.sync="sendAddrForm.custId"
                           :token="token"
                           :clear="true" :url="costCenterUrl"></sino-select>
              <!---------------->
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
    <div>
      <div class="sino-table-total mt15">
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="clickFun('','add')"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="sendAddrData"  max-height="416" stripe border v-on:viewAll="viewAll">
          <sino-table-column label="序号" type="index"  width="60" align="center" ></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="180"></sino-table-column>
          <sino-table-column prop="contName" label="收件人" min-width="95"></sino-table-column>
          <sino-table-column prop="contTel" label="联系电话" min-width="120"></sino-table-column>
          <sino-table-column prop="postAddr" label="邮寄地址" min-width="180"></sino-table-column>
          <sino-table-column prop="isDefaultName" label="是否默认" min-width="80"></sino-table-column>
          <sino-table-column prop="creName" label="创建人" min-width="95"></sino-table-column>
          <sino-table-column prop="creTime" label="创建时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right" width="100">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="clickFun(scope.row,'modify')">修改</span><i class="table-i" v-if="!scope.row.isDefault">|</i>
                <span class="table-span" @click="clickFun(scope.row,'del')" v-if="!scope.row.isDefault">删除</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-if="sendAddrData !== null"
                   v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
    <!--新增-->
    <sino-dialog :visible.sync="sendAddrFormAdd" size="large"  class="dialog-height" @close ="cleanContent('sendAddrAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="sendAddrAddForm" :rules="sendAddrRules" ref="sendAddrAddForm" class="demo-sendAddrAddForm">
        <sino-form-item label="客户名称：" class="sino-form-item-width" prop="custName">
          <sino-select :filterable="true"
                       :multiselect="false"
                       :isshowTotol="false"
                       :disabled="alertTitle === '修改客户邮寄地址' ? true : false"
                       :clear="alertTitle !== '修改客户邮寄地址' ? true : false"
                       :totalNum="false"
                       :isPage="true"
                       :isGroup="false"
                       :chooseName.sync="sendAddrAddForm.custName"
                       :chooseId.sync="sendAddrAddForm.custId"
                       :token="token"
                       :url="costCenterUrl"></sino-select>
        </sino-form-item>
        <sino-form-item label="联系人姓名："  prop="contName">
          <sino-input v-model="sendAddrAddForm.contName"></sino-input>
        </sino-form-item>
        <sino-form-item label="联系人电话："  prop="contTel">
          <sino-input v-model="sendAddrAddForm.contTel"></sino-input>
        </sino-form-item>
        <sino-form-item label="邮寄地址：" class="sino-from-address is-required">
        <!--<span>邮寄地址</span>-->
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
                         :chooseName.sync="sendAddrAddForm.provName"
                         :chooseId.sync="sendAddrAddForm.provId" :clear="true"
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
                         :chooseName.sync="sendAddrAddForm.cityName"
                         :linkage="true" :chooseId.sync="sendAddrAddForm.cityId"
                         :clear="true"
                         @change="changeCity"
            ></sino-select>
          </sino-form-item>
          <sino-form-item prop="distName" class="sino-select-last">
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
                         :chooseName.sync="sendAddrAddForm.distName"
                         :chooseId.sync="sendAddrAddForm.distId"
                         :clear="true"
                         @finish="cityFinish"
            ></sino-select>
          </sino-form-item>
        </sino-form-item>
        <sino-form-item prop="addrDet" label="详细地址：" class="sino-form-item-width">
          <sino-input v-model="sendAddrAddForm.addrDet"></sino-input>
        </sino-form-item>
        <sino-form-item label="是否默认：" prop="isDefault" class="sino-form-item1">
          <sino-radio v-for="(item, index) in isDefaultList" :key="index"
                      v-model.number="sendAddrAddForm.isDefault"
                      :label="item.id">{{item.title}}</sino-radio>
        </sino-form-item>
        <sino-form-item prop="remark" label="备注：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="sendAddrAddForm.remark"></sino-input>
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
    _this.getTableList();
    _this.sendAddrFormAdd = false;
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
  let linkSelectData = {
    cityId: '',
    cityName: '',
    distId: '',
    distName: ''
  };
  export default {
//    components: { sinoSelect },
    data () {
      return {
        token: Cookie.get("Token"),
        costCenterUrl: this.apiPath.hrsc.custInfoSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        apiPath: this.apiPath,
        sendAddrForm: {
          custName: '',
          custId: ''
        },
        sendAddrData: null,
        pageNum: 1,
        pageSize: 10,
        pageArray: [10, 20, 30, 50],
        object: {
          maxPage: 2,
          issmallPage: true,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        total: 100,
        alertTitle: '新增客户邮寄地址',
        sendAddrFormAdd: false,
        sendAddrAddForm: {
          contName: '',
          contTel: '',
          remark: '',
          custId: '',
          custName: '',
          provId: '',
          provName: '',
          cityId: '',
          cityName: '',
          distId: '',
          distName: '',
          isDefault: 1
        },
        sendAddrRules: {
          custName: [
            {required: true, message: '请选择客户名称', trigger: 'change'}
          ],
          contName: [
            {required: true, message: '请输入联系人姓名', trigger: 'change'}
          ],
          contTel: [
            {required: true, message: '请输入正确的联系人电话', trigger: 'change'},
            {validator: this.validator.checkTelAndphone, trigger: 'change'}
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
            {required: true, message: '请输入详细地址', trigger: 'change'}
          ]
        },
//        userList: [],
        provData: {data: {areaTypes: [3, 7]}}, // 请求省下拉参数
        cityData: {data: {parentId: ''}}, // 请求市下拉参数
        distData: {data: {parentId: ''}}, // 请求区下拉参数
        isDefaultList: []
      };
    },
    created () {
      api.post(this.apiPath.hrsc.getDictSelectBox, {code: 'YES_NO'}).then(res => {
        this.isDefaultList = res.data.list;
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
      cityFinish () {
        this.sendAddrAddForm.distId = linkSelectData.distId;
        this.sendAddrAddForm.distName = linkSelectData.distName;
        linkSelectData = {};
      },
      changeProv () {
        this.cityData.data.parentId = this.sendAddrAddForm.provId;
      },
      changeCity () {
        this.distData.data.parentId = this.sendAddrAddForm.cityId;
      },
      pageHandler (pageNum) {
        this.pageNum = pageNum;
        this.getTableList(pageNum, this.pageSize);
      },
      choooseNum (pageSize) {
        this.pageSize = pageSize;
        this.getTableList(this.pageNum, pageSize);
      },
      //  分页
      getTableList (pageNum, pageSize, all) {
        pageNum ?  '' : pageNum = this.pageNum;
        let obj = {
          data: this.sendAddrForm,
          pageNum: pageNum,
          pageSize: this.pageSize
        };
        if (all) {
          obj.data = {};
        }
        api.post(this.apiPath.hrsc.findCustAddrPageInfo, obj).then(res => {
          this.sendAddrData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.getTableList(this.pageNum, this.pageSize);
      },
      viewAll () {
        this.pageNum = 1;
        this.getTableList(this.pageNum, this.pageSize, 'all');
      },
      clickFun (obj, type) {
        let _this = this;
        if (type === 'add') { // 新增
          _this.alertTitle = '新增客户邮寄地址';
          _this.sendAddrFormAdd = true;
        }
        if (type === 'modify') { // 修改
          _this.alertTitle = '修改客户邮寄地址';
          _this.sendAddrFormAdd = true;
          var timer2 = setTimeout(function () {
            let copyData = JSON.parse(JSON.stringify(obj));
            linkSelectData.cityName = copyData.cityName;
            linkSelectData.cityId = copyData.cityId;
            linkSelectData.distId = copyData.distId;
            linkSelectData.distName = copyData.distName;
            copyData.distId = '';
            copyData.distName = '';
            copyData.cityId = '';
            copyData.cityName = '';
            _this.sendAddrAddForm = copyData;
            var timer1 = setTimeout(function () {
              _this.sendAddrAddForm.cityName = linkSelectData.cityName;
              _this.sendAddrAddForm.cityId = linkSelectData.cityId;
              timer1 = null;
              timer2 = null;
            });
          }, 50);
        }
        if (type === 'del') { // 删除
          _this.$confirm('您确定要删除吗？', '提示', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            api.post(this.apiPath.hrsc.deleteCustAddr, obj).then(res => {
              if (res.code === 'CPYY-00001') {
                _this.searchFun();
                _this.$message({message: '删除成功！', type: 'success'});
              }
            }).catch(() => {
            });
          }).catch(() => {
            console.log('删除失败!');
          });
        }
      },
      // 新增客户邮寄地址
      addFun () {
        this.$refs.sendAddrAddForm.validate((valid) => {
          if (valid) {
            console.log(this.sendAddrAddForm);
            api.post(this.apiPath.hrsc.saveCustAddr, this.sendAddrAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.sendAddrFormAdd = false;
                this.$message({message: '新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      updateFun () {
        this.$refs.sendAddrAddForm.validate((valid) => { //  修改
          if (valid) {
            api.post(this.apiPath.hrsc.updateCustAddr, this.sendAddrAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.searchFun();
                this.sendAddrFormAdd = false;
                this.$message({message: '修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
      },
      submitForm () {
        if (this.alertTitle === '新增客户邮寄地址') {
          this.addFun();
        } else {
          this.updateFun();
        }
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
        this.cityData.data.parentId = '';
        this.distData.data.parentId = '';
      }
    }
  };
</script>
