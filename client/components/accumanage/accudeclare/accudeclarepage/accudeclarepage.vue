<template>
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="tabChange('first')">全部</div>
          <div class="sino-tabs-item is-active" >申报</div>
          <div class="sino-tabs-item" @click="tabChange('third')">申报反馈</div>
          <div class="sino-tabs-item" @click="tabChange('four')">回单</div>
        </div>
      </div>
    </div>
    <div class="local-info single-empass single-empass-width marbom single-empass-width1">
      <sino-title type="levelTwo" title="本次申报数据范围" style="margin-top:17px;margin-bottom:17px;"></sino-title>
      <sino-form :model="dataForm" ref="dataForm" :rules="empInfoRules" class="serch-form order-details">
        <ul class="local-info-ul local-info-underline">
          <li>
            <sino-form-item prop="areaName" label="执行地区：">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="findAreaListByBusiAreaType"
                             :data="{data: {busiAreaTypes:[1]}}"
                             :chooseName.sync="dataForm.areaName"
                             :chooseId.sync="dataForm.areaId"
                             @change="searchFun(dataForm.areaId)"
                             :clear="true"></sino-select>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="tableTypes" label="表格类型：">
              <sino-checkbox-group v-model="dataForm.tableTypes" class="mt5" @change="perNoFn">
                <sino-checkbox :label="list.id" v-for="(list, index) in tableStateList" :key="index">{{list.title}}</sino-checkbox>
              </sino-checkbox-group>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="payWayName" label="缴费方式：">
              <sino-select :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :disabled="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :data="{code: 'PAY_FEE_WAY'}"
                           :chooseName.sync="dataForm.payWayName"
                           :chooseId.sync="dataForm.payWay"
                           @change="perNoFn"
                           :clear="true"></sino-select>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="prodServeTempName" label="单位账号：">
              <sino-input class="fl" type="text"
                          v-model="dataForm.unitRegiNo" @change="perNoFn"></sino-input>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="uniqNo" label="账户名称：">
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="findAccuAcctSelect"
                           :chooseName.sync="dataForm.accuAcctName"
                           :chooseId.sync="dataForm.accuAcctId"
                           @change="perNoFn"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
          </li>
          <li>
            <sino-form-item prop="empName" label="申报状态：">
              <sino-select class="fl"
                           :filterable="false"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="false"
                           :isGroup="false"
                           :disabled="true"
                           :url="getDictSelectBox"
                           :data="{code: 'APPLY_STATE'}"
                           :chooseName.sync="dataForm.appStateName"
                           :chooseId.sync="dataForm.appState"
                           :clear="true" >
              </sino-select>
            </sino-form-item>
          </li>

          <div class="clear"></div>
        </ul>
      </sino-form>
      <div class="conf-btn conf-btn-box">
        <span class="fl download-num"><i class="iconfont sino-tip" ></i>下载数据范围人数：<span class="person-number">{{perNo ? perNo : 0}}</span> 人</span>
        <sino-button type="primary" @click="downFn">下 载</sino-button>
      </div>
    </div>
    <div class="sino-queryList clear">
      <div class="sino-table-total single-empass-width1">
        <sino-title type="levelTwo" title="历史下载数据" style="margin-top:17px;"></sino-title>
        <sino-table :data="tableData"  max-height="416" stripe v-on:viewAll="searchFun" border class="mail-table">
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="areaName" label="执行地区" min-width="105"></sino-table-column>
          <sino-table-column prop="tempType" label="表格类型" min-width="140"></sino-table-column>
          <sino-table-column prop="payWayName" label="缴费方式" min-width="120"></sino-table-column>
          <sino-table-column prop="unitRegiNo" label="单位账号" min-width="120"></sino-table-column>
          <sino-table-column prop="accuAcctName" label="账户名称" min-width="95"></sino-table-column>
          <sino-table-column prop="oprTime" label="下载时间" width="180" align="center"></sino-table-column>
          <sino-table-column prop="uploadNum" label="下载数量" min-width="95"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" width="90" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="downLoadFun(scope.row)">下载</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum"
                   v-bind:page-size="pageSize"
                   v-on:pagehandler="pageHandler"
                   :pageArray="pageArray"
                   v-on:choosePageFun="choooseNum"
                   v-bind:object="object"
                   :total="total"></sino-page>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../../api/index';
  export default {
    components: {},
    data () {
      return {
        prodNameSelUrl: this.apiPath.hrsc.findprodinfoselectbox,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        findAreaListByBusiAreaType: this.apiPath.hrsc.findAreaListByBusiAreaType,
        findAccuAcctSelect: this.apiPath.accu.findAccuAcctSelect,
        searchFlag: true,
        batchLeadFlag: true,
        perNo: '',
        dataForm: {
          areaName: '',
          areaId: '',
          payWayName: '',
          payWay: '',
          unitRegiNo: '',
          accuAcctId: '',
          accuAcctName: '',
          appStateName: '待申报',
          appState: 2,
          uploadNum: '',
          tableTypes: []
        },
        batchLeadForm: {},
        trackStatus: [],
        checkedArr: [],
        tableStateList: [],
        activeNameTab: 'one',
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
        empInfoRules: {
          areaName: [
            {required: true, message: '请选择执行地区', trigger: 'change'}
          ],
          tableTypes: [
            {type: 'array', required: true, message: '请选择表格类型', trigger: 'change'}
          ],
          payWayName: [
            {required: true, message: '请选择缴费方式', trigger: 'change'}
          ]
        }
      };
    },
    created () {
      this.searchFun();
    },
    methods: {
      contResultFun (id) {
        this.dataForm.tableTypes = [];
        api.post(this.apiPath.accu.findTempTypeByArea, {areaId: id}).then(res => {
          if (res.code === 'CPYY-00001') {
            let arr = res.data.list;
            this.tableStateList = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // tab 选项卡点击回调事件
      tabChange (order) {
        if (order === 'first') {
          this.$router.push({path: '/accuDeclareAll'});
        } else if (order === 'third') {
          this.$router.push({path: '/accuDeclareFeed'});
        } else {
          this.$router.push({path: '/accuDeclareReceipt'});
        }
      },
      handleClick (name) {
      },
      resetForm: function () { // 修改对话框打开回调
        this.$refs.prodInfoAddForm.resetFields();
        this.alertTitle = '';
        this.leadsbtn = '';
      },
      searchDetailFun () {},
      searchTotalFun () {},
      searchFun (id) {
        if (!id) {
          this.tableData = [];
          return;
        }
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
        this.contResultFun(id);
      },
      // 获取全部表格数据
      viewAll (pageNum, pageSize) {
        this.perNoFn();
        var obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            areaId: this.dataForm.areaId
          }
        };
        api.post(this.apiPath.accu.findApplyByAcct, obj).then(res => {
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
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      declareFun (num) {},
      downLoadFun (item) {
        api.postsign(this.apiPath.accu.downloadRecDeclFile, item.fileId).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      perNoFn () {
        api.post(this.apiPath.accu.findPerNum, this.dataForm).then(res => {
          if (res.code === 'CPYY-00001') {
            this.perNo = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      downFn () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.dataForm.uploadNum = this.perNo;
            api.post(this.apiPath.accu.downloadDeclExcel, this.dataForm).then(res => {
              if (res.code === 'CPYY-00001') {
                api.download(res.data);
                this.viewAll();
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
    }
  };
</script>
