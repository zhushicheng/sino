<template>
  <div class=" invinfo suppinfo">
    <sino-con>
      <sino-title type="levelOne" title="供应商信息查询"></sino-title>
      <sino-form :model="searchForm" ref="searchForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <!--<li class="search-inner-one">-->
              <!--<span class="search-inner-name">供应商编号：</span>-->
              <!--<sino-input class="fl" type="text" v-model="searchForm.suppNo"-->
                          <!--:disabled="false"></sino-input>-->
            <!--</li>-->
            <li class="mt0">
              <span class="search-inner-name">供应商名称：</span>
              <sino-input class="fl" type="text" v-model="searchForm.chName"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">供应商类型：</span>
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :data="suppTypeData"
                           :url="getDictSelectBox"
                           :chooseName.sync="searchForm.suppTypeName"
                           :chooseId.sync="searchForm.suppType"
                           :clear="true" >
              </sino-select>
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
    <div class=" sino-table-total sino-table-total mt15">
      <div class="sino-table-icon bs-none">
        <div class="sino-table-icon-left">
          <sino-button type="icon-text" @click="addRole()"><i class="iconfont sino-add"></i>新增
          </sino-button>
          <sino-button type="icon-text" @click="addConfig()"><i class="iconfont sino-setting"></i>配置可执行地区
          </sino-button>
        </div>
      </div>
      <sino-table :data="tableData" max-height="416" v-on:viewAll="viewAll" stripe v-on:select="selectCallBack" border stripe>
        <sino-table-column type="selection" width="40"></sino-table-column>
        <sino-table-column type="index" label="序号"  width="60" align="center" ></sino-table-column>
        <!--<sino-table-column prop="suppNo" label="供应商编号" min-width="140"></sino-table-column>-->
        <sino-table-column prop="chName" label="供应商名称" min-width="180"></sino-table-column>
        <sino-table-column prop="suppTypeName" label="供应商类型" min-width="100"></sino-table-column>
        <sino-table-column prop="respPer" label="负责人"></sino-table-column>
        <sino-table-column prop="cityName" label="城市" min-width="180"></sino-table-column>
        <!--<sino-table-column prop="payEndTime" label="付费截止日"></sino-table-column>-->
        <sino-table-column label="操作" align="center" fixed="right" width="140">
          <template scope="scope">
            <template v-if="scope.row.oper == true">
              <span class="table-span" @click="see(scope.row)">查看</span><i class="table-i">|</i>
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
    <!-- 查看 -->
    <sino-dialog :visible.sync="seeItem" size="small" class="see-dirc suppinfo-dialog-box">
      <sino-title slot="title" type="levelOne" title="供应商基本信息" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>供应商名称</h6><input v-model="seeDto.chName">
          </li>
          <li>
            <h6>供应商简称</h6><input v-model="seeDto.enName">
          </li>
          <li>
            <h6>城市</h6><input v-model="seeDto.cityName">
          </li>
          <li>
            <h6>供应商类型</h6><input v-model="seeDto.suppTypeName">
          </li>
          <li>
            <h6>负责人</h6><input v-model="seeDto.respPer">
          </li>
          <li>
            <h6>手机号码</h6><input v-model="seeDto.phone">
          </li>
          <li>
            <h6>邮箱地址</h6><input v-model="seeDto.officeEmail">
          </li>
          <li>
            <h6>固定电话</h6><input v-model="seeDto.tel">
          </li>
          <li class="li-last">
            <h6>办公地址</h6><input v-model="seeDto.officeAddr">
          </li>
          <li class="li-last">
            <h6>备注</h6><input v-model="seeDto.remark">
          </li>
        </ul>
      </div>
      <sino-title type="levelTwo" title="其他信息" :style="{'overflow':'hidden'}"></sino-title>
      <div class="usermanagement-list mt10">
        <ul class="usermanagement-ul">
          <li>
            <h6 class="sino-form-item-content">
              <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" style="width:35%;" trigger="hover" content="与客户或者签约供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月收费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月收费账单。"></sino-popover>
              <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover2 style="left:10px;top: 8px;"></i>收费截止日
            </h6><input :value=" seeDto.chargeEndDate | dateFilter ">
          </li>
          <li>
            <h6 class="sino-form-item-content">
              <sino-popover ref="popover3" :popper-class="'questionTip'"placement="bottom-start" style="width:35%;" trigger="hover" content="与受托供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月付费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月付费账单。"></sino-popover>
              <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover3 style="left:10px;top: 8px;"></i>付费截止日
            </h6><input :value=" seeDto.payEndDate |  dateFilter">
          </li>
          <li>
            <h6>是否使用自助端</h6><input v-model="seeDto.isUseSystemName">
          </li>
          <li>
            <h6>创建人</h6><input v-model="seeDto.creName">
          </li>
          <li class="li-last">
            <h6>创建时间</h6><input v-model="seeDto.creTime">
          </li>
        </ul>
      </div>
    </sino-dialog>
    <!--修改-->
    <sino-dialog :visible.sync="modifyAndAdd" top="5%" size="samll" @close="modifyOpen"  class="usermanage dialog-com-tree-look-box">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1 clearfix">
        <sino-form :model="modifyAndAddForm" :rules="modifyAndAddFormRules" ref="modifyAndAddForm" class="demo-sendAddrAddForm clearfix">
          <sino-form-item label="供应商名称：" prop="chName">
            <sino-input v-model="modifyAndAddForm.chName" @input="changeName"></sino-input>
          </sino-form-item>
          <sino-form-item label="供应商简称：" prop="enName">
            <sino-input v-model="modifyAndAddForm.enName" ></sino-input>
          </sino-form-item>
          <!--<sino-form-item label="供应商编号：" prop="suppNo">-->
            <!--<sino-input v-model="modifyAndAddForm.suppNo" ></sino-input>-->
          <!--</sino-form-item>-->
          <sino-form-item label="城市："  prop="cityName" class="h25">
            <sino-select :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :url="findAreaList" :chooseName.sync="modifyAndAddForm.cityName" :chooseId.sync="modifyAndAddForm.cityId" :data="cityData" :clear="true"></sino-select>
          </sino-form-item>
          <sino-form-item label="供应商类型："  prop="suppTypeName" class="h25">
            <sino-select class="fl"
                         :filterable="false"
                         :multiselect="false"
                         :isshowTotol="false"
                         :totalNum="false"
                         :isPage="false"
                         :isGroup="false"
                         :data="suppTypeData"
                         :url="getDictSelectBox"
                         :chooseName.sync="modifyAndAddForm.suppTypeName"
                         :chooseId.sync="modifyAndAddForm.suppType"
                         :clear="true" >
            </sino-select>
          </sino-form-item>
          <sino-form-item label="负责人："  prop="respPer" class="h25">
            <sino-input v-model="modifyAndAddForm.respPer" ></sino-input>
          </sino-form-item>
          <sino-form-item label="手机号码：" prop="phone">
            <sino-input v-model="modifyAndAddForm.phone" ></sino-input>
          </sino-form-item>
          <sino-form-item label="邮箱地址：" prop="officeEmail">
            <sino-input v-model="modifyAndAddForm.officeEmail" ></sino-input>
          </sino-form-item>
          <sino-form-item label="固定电话：" prop="tel">
            <sino-input v-model="modifyAndAddForm.tel" ></sino-input>
          </sino-form-item>
          <sino-form-item label="办公地址："  prop="officeAddr" class="sino-form-item-width">
            <sino-input v-model="modifyAndAddForm.officeAddr" ></sino-input>
          </sino-form-item>
          <sino-form-item class="sino-form-item-width" prop="remark" label="备注：">
            <sino-input type="textarea" v-model="modifyAndAddForm.remark"  :disabled="false" ></sino-input>
          </sino-form-item>
          <!-- 其它信息 -->
          <sino-title type="levelTwo" title="其他信息" :style="{'overflow':'hidden'}"></sino-title>
          <sino-form-item label="收费截止日："  prop="chargeEndDate" class="h25" :style="{'margin-top':'20px'}">
            <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" style="width:45%;" trigger="hover" content="与客户或者签约供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月收费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月收费账单。"></sino-popover>
            <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover2 style="left:-130px;"></i>
            <sino-input v-model.number="modifyAndAddForm.chargeEndDate" ></sino-input>
          </sino-form-item>
          <sino-form-item label="付费截止日：" prop="payEndDate" :style="{'margin-top':'20px'}">
            <sino-popover ref="popover3" :popper-class="'questionTip'"placement="bottom-start" style="width:45%;" trigger="hover" content="与受托供应商约定的每月费用核算的截止日，超出该日期所产生的费用将进入下月付费账单。例如：截止日为15日，16号对订单进行修改，所产生的费用将计入下月付费账单。"></sino-popover>
            <i class="iconfont sino-fangxingwenhao chargeTipbox ml20" v-popover:popover3 style="left:-130px;"></i>
            <sino-input v-model.number="modifyAndAddForm.payEndDate" ></sino-input>
          </sino-form-item>
          <sino-form-item label="是否使用自助端：" prop="isUseSystem" class="last-item2">
            <span class="usermanage-radio">
              <sino-radio class="radio" v-model.number="modifyAndAddForm.isUseSystem" :label="1">使用</sino-radio>
              <sino-radio class="radio" v-model.number="modifyAndAddForm.isUseSystem" :label="0">不使用</sino-radio>
            </span>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="suppinfo-footer">
        <div class="order-new">
          <i class="iconfont sino-tip"></i><span>手机号码、固定电话和邮箱地址至少任选其一填写。</span>
        </div>
        <sino-button type="primary" @click="submitForm('modifyAndAddForm')">确 定</sino-button>
      </span>
    </sino-dialog>
     <!--配置业务可执行地区-->
    <sino-dialog :visible.sync="configAdd"  size="samll" @close="configOpen"  class="usermanage dialog-com-tree-look-box">
      <sino-title slot="title" type="levelOne" title="配置业务可执行地区" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-modify1 clearfix">
        <sino-form :model="configForm" ref="configForm" :rules="configFormRules" class="demo-ruleForm clearfix">
          <sino-form-item label="供应商名称："  prop="chName" class="sino-form-item-width">

            <sino-input v-model="configForm.chName" disabled></sino-input>
          </sino-form-item>
          <sino-form-item label="地区："class="configitem-city">
            <sino-form-item prop="provName" class="address-tanhao">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :data='provData'
                           :isPage="true"
                           :isGroup="false"
                           :url="findAreaList"
                           :chooseName.sync="configForm.provName"
                           :chooseId.sync="configForm.provId" :clear="true"
                           @change="changeProv"
              ></sino-select>
            </sino-form-item>
            <sino-form-item prop="cityName" class="address-tanhao">
              <sino-select :filterable="true"
                           :multiselect="true"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url='findAreaList1'
                           :data="cityaData"
                           :chooseName.sync="configForm.cityName"
                           :chooseId.sync="configForm.cityId"
                           :linkage="true"
                           :clear="true"
                           :autoFetch="true"
                           @finish="cityFinish"
                           @contentChange = "addCityName"
              ></sino-select>
            </sino-form-item>
          </sino-form-item>
          <!-- 其它信息 -->
          <sino-title type="levelTwo" title="已配置可执行地区" :style="{'overflow':'hidden'}"></sino-title>
          <div class="local-info">
            <ul class="local-info-ul exclusive-line configbox-ul configbox-ul pl0">
              <li class="emp-address product-template configbtn-small">
                <sino-button class="mb15" v-for="(item,index) in areaList" :key="index">{{item.findAreaName}}<i class="iconfont sino-cuowu" @click="configDel(index)"></i></sino-button>
                <!--<sino-button class="mb15" v-for="(itema,index) in configForm.cityName">{{itema.cityName}}<i class="iconfont sino-cuowu" @click=""></i></sino-button>-->
              </li>
            </ul>
          </div>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitConfigForm('configForm')">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';
  let checkedArr = '';
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
    filters: {
      dateFilter: function (value) {
        if (!value) return '';
        return '每月' + value + '号';
      }
    },
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaList: this.apiPath.hrsc.findAreaList,
        findAreaList1: this.apiPath.hrsc.saveSelectboxBusiArea,
        areaList: [],
        areaLength: 0,
        searchForm: { // 搜索条件
          suppNo: '',
          suppType: '',
          chName: '',
          suppTypeName: ''
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
        seeDto: {}, // 查看弹层的数据
        modifyAndAdd: false, // 修改，添加控制弹层显示
        configAdd: false, // 配置业务可执行地区
        alertTitle: '',
        configForm: { // 配置业务弹层
          chName: '',
          cityName: [],
          cityId: [],
          provName: '',
          provId: ''
        },
        configFormRules: {
          provName: [
            {required: true, message: '请选择省', trigger: 'change'}
          ],
          cityName: [
            {required: true, type: 'array', message: '请选择市', trigger: 'change'}
          ]
        },
        provData: {data: {level: 3}}, // 请求省下拉参数
        cityaData: {data: {areaId: '', creSuppId: ''}}, // 请求市下拉参数
        linkSelectData: {
          cityId: '',
          cityName: ''
        },
        modifyAndAddForm: {
          suppType: '',
          suppTypeName: '',
          cityId: '',
          cityName: '',
          chName: '',
          enName: '',
          isUseSystem: 0,
//          suppNo: '',
          phone: '',
          respPer: '',
          tel: '',
          officeEmail: '',
          officeAddr: '',
          remark: '',
          chargeEndDate: '',
          payEndDate: ''
        }, // 修改新增 弹框 表单数据

        modifyAndAddFormRules: {
          chName: [
            {required: true, message: '请输入供应商名称', trigger: 'blur'}
          ],
          isUseSystem: [
            { required: true, type: 'number', message: '请选是否使用自助端', trigger: 'blur' }
          ],
          suppTypeName: [
            {required: true, message: '请输入供应商类型', trigger: 'blur'}
          ],
          cityIdName: [
            {required: true, message: '请输入城市类型', trigger: 'blur'}
          ],
          cityName: [
            {required: true, message: '请选择城市', trigger: 'blur'}
          ],
          respPer: [
            {required: true, message: '请输入负责人', trigger: 'blur'}
          ],
          officeEmail: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          chargeEndDate: [
            {validator: this.validator.checkDateNum, trigger: 'blur'}
          ],
          payEndDate: [
            {validator: this.validator.checkDateNum, trigger: 'blur'}
          ]
        },
        suppTypeData: {code: 'SUPP_TYPE'},
        cityData: {'data': {'level': 4}},
        areaCopyList: []
      };
    },
    mounted () {
      checkedArr = '';
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      changeName (value) {
        this.modifyAndAddForm.enName = value;
      },
      clickSeach () {
//        console.log(111);
      },
      selectCallBack (selection, row) { // 手动选中checkBox回调
        if (selection.length >= 2) {
          selection.splice(0, selection.length - 1);
        }
        checkedArr = selection;
      },
      changeProv () {
        this.cityaData.data.areaId = this.configForm.provId;
        // this.cityaData.data.creSuppId = checkedArr[0].suppId;
      },
      cityFinish () {
        this.configForm.cityId = this.linkSelectData.cityId;
        this.configForm.cityName = this.linkSelectData.cityName;
        this.linkSelectData = {
          cityId: '',
          cityName: ''
        };
      },
      viewAll: function (pageNum, pageSize) {
        let obj = {
          data: this.searchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.suppinfoAll, obj).then(res => {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      searchFun () {
        this.page.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      // 配置可执行地区确认按钮
      submitConfigForm () {
        if (this.areaList.length !== this.areaLength) {
          this.configFun();
        } else {
          this.$alert('请配置业务可执行地区！', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return;
        }
        if (this.areaList.length === this.areaLength) {
          this.$refs.configForm.validate((valid) => {
            if (valid) {
              this.configFun();
            }
          });
        }
      },
      configFun () {
        for (var j = 0; j <= this.areaList.length; j++) {
          var obj = {
            suppId: checkedArr[0].suppId,
            areaId: this.areaList.map(function (item) {
              return item.findAreaId;
            })
          };
        }
        api.post(this.apiPath.hrsc.updateSuppBusiArea, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.configAdd = false;
//           this.getList();
            this.$message({message: '恭喜您，配置成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      addCityName () {
        let len =  this.configForm.cityName.length;
        for (let i = 0; i < len; i++) {
          let cityId = this.configForm.cityId[i];
          let existInArealist = this.areaList.filter(function (item) {
            return cityId === item.findAreaId;
          });
          if (existInArealist.length === 0) {
            this.areaList.push({
              findAreaName: this.configForm.cityName[i],
              findAreaId: this.configForm.cityId[i]
            });
          }
        }
//        this.changeProv();
//        this.cityFinish();
//        this.configForm.cityName = '';
      },

      // 新增供应商信息
      addFun () {
        this.$refs.modifyAndAddForm.validate((valid) => {
          if (valid) {
            if (this.modifyAndAddForm.phone === '' && this.modifyAndAddForm.officeEmail === ''  && this.modifyAndAddForm.tel === '') {
              this.$alert('手机号码、固定电话和邮箱地址至少任选其一填写。', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                lockScroll: true
              });
              return;
            }
            api.post(this.apiPath.hrsc.suppinfoAdd, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAdd = false;
                this.searchFun();
                this.$message({message: '恭喜您，新增成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      // 修改供应商信息
      updateFun () {
        this.$refs.modifyAndAddForm.validate((valid) => {
          //  修改词根
          if (valid) {
            api.post(this.apiPath.hrsc.suppinfoUpdate, this.modifyAndAddForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.modifyAndAdd = false;
                this.searchFun();
                this.$message({message: '恭喜您，修改成功！', type: 'success'});
              }
            }).catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit');
          }
        });
      },
      submitForm () {
        if (this.alertTitle === '新增供应商信息') {
          this.addFun();
        } else {
          this.updateFun();
        }
      },
      pageHandler: function (page) {
        this.page.pageNum = page;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      choooseNum: function (pageSize) {
        this.page.pageSize = pageSize;
        this.page.pageNum = 1;
        this.viewAll(this.page.pageNum, this.page.pageSize);
      },
      addRole: function () {
        this.modifyAndAdd = true;
        this.alertTitle = '新增供应商信息';
      },
      // 地区管理
      addConfig () {
        this.areaList = [];
        if (checkedArr === '' || checkedArr.length === 0) {
          this.$alert('请选择一条操作项', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        } else {
          let obj = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            data: {suppId: checkedArr[0].suppId}
          };
          api.post(this.apiPath.hrsc.areaFindBySuppid, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.configAdd = true;
              this.configForm.chName = checkedArr[0].chName;
              if (res.data) {
                this.areaList = res.data.list;
                this.areaCopyList = JSON.parse(JSON.stringify(res.data.list));
              } else {
                this.areaList = [];
                this.areaCopyList = [];
              }
              this.areaLength = this.areaList.length;
              let  that = this;
              // 点开配置可执行地区获取市的数据
              setTimeout(function () {
                if (!that.cityaData.data.areaId) {
                  that.cityaData.data.creSuppId = checkedArr[0].suppId;
                }
              }, 100);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      modify: function (data) {
        this.alertTitle = '修改供应商信息';// 信息两字放不开，应该修改dialog，title宽度
        this.modifyAndAdd = true;
        api.post(this.apiPath.hrsc.suppinfoFind, data).then(res => {
          this.modifyAndAddForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      see: function (data) {
//        this.seeItem = true;
        let _this = this;
        api.post(this.apiPath.hrsc.suppinfoFind, data).then(res => {
          _this.seeDto = res.data;
          _this.seeItem = true;
        }).catch(err => {
          console.log(err);
        });
      },
      del: function (data) {
        let obj = {};
        obj.suppId = data.suppId;
        api.post(this.apiPath.hrsc.suppinfoQueryExistOtherInfo, {suppId: data.suppId}).then(res => {
          if (res.code === 'CPYY-00001') {
            if (res.dats) {
              this.$alert('该供应商已存在合同，无法删除！', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true
              });
            } else {
              this.$alert('是否同步删除该供应商下所有基础信息？', '提示信息', {
                confirmButtonText: '确 定',
                type: 'warning', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class添加class
                lockScroll: true,
                callback: action => {
                  if (action === 'cancel') { return; }
                  api.post(this.apiPath.hrsc.suppinfoDelete, data).then(res => {
                    if (res.code === 'CPYY-00001') {
                      this.searchFun();
                      this.$message({message: '恭喜您，删除成功！', type: 'success'});
                    }
                  }).catch(err => {
                    console.log(err);
                  });
                }
              });
            };
          };
        }).catch(err => {
          console.log(err);
        });
      },
      configDel (index) {
        this.areaList.splice(index, 1);
        this.areaCopyList.splice(index, 1);
      },
      modifyOpen: function () { // 修改对话框打开回调
        this.$refs.modifyAndAddForm.resetFields();
      },
      configOpen: function () { // 修改对话框打开回调
        this.$refs.configForm.resetFields();
      },
      getFileName (file) {
        this.companyForm.upLoadFileName = file.name;
      }
    }
  };
</script>
