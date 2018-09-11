<template>
  <!--<div>社保卡发放</div>-->
  <div class="usermanage">
    <sino-con class="sino-con-more">
      <sino-title type="levelOne" title="社保卡查询"></sino-title>
      <sino-form :model="sinsCardForm" ref="sinsCardForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="雇员姓名：" class="search-inner-item" prop="empName">
                <sino-input class="fl" type="text"
                            v-model="sinsCardForm.empName"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="证件号码：" class="search-inner-item" prop="certNo">
                <sino-input class="fl" type="text"
                            v-model="sinsCardForm.certNo"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-name">
              <sino-form-item label="执行地区：" class="search-inner-item" prop="areaName">
                <sino-select :filterable="true"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="true"
                             :isGroup="false"
                             :url="areaUrl"
                             :chooseName.sync="sinsCardForm.areaName"
                             :chooseId.sync="sinsCardForm.areaId"
                             :data="{data: {areaTypes:[4,5]}}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
            <li class="search-inner-name">
              <sino-form-item label="社保卡状态：" class="search-inner-item" prop="sscStateName">
                <sino-select :filterable="false"
                             :multiselect="false"
                             :isshowTotol="false"
                             :disabled="false"
                             :totalNum="false"
                             :isPage="false"
                             :isGroup="false"
                             :url="dictSelUrl"
                             :chooseName.sync="sinsCardForm.sscStateName"
                             :chooseId.sync="sinsCardForm.sscState"
                             :data="{code: 'SSC_STATE'}"
                             :clear="true"></sino-select>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button spe-search-button-box">
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
        <div class="sino-table-icon">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="contactFun"><i class="iconfont sino-guyuan"></i>联系雇员</sino-button>
            <sino-button type="icon-text" @click="cardGrantFun"><i class="iconfont sino-card"></i>社保卡发放</sino-button>
          </div>
        </div>
        <sino-table :data="sinsDeclData" border max-height="416" stripe v-on:selection-change="selectCallBack" v-on:viewAll="viewAll">
          <sino-table-column type="selection" min-width="40"></sino-table-column>
          <sino-table-column type="index" label="序号" width="60"></sino-table-column>
          <sino-table-column prop="sinsPerNo" label="社保个人编号" min-width="120"></sino-table-column>
          <sino-table-column prop="empName" label="雇员姓名" min-width="120"></sino-table-column>
          <sino-table-column prop="certNo" label="证件号码" min-width="170"></sino-table-column>
          <sino-table-column prop="sscIcNo" label="社保IC卡号" min-width="130"></sino-table-column>
          <sino-table-column prop="sscStateName" label="社保卡状态" min-width="120"></sino-table-column>
          <sino-table-column prop="makeCardResultName" label="制卡结果" min-width="80"></sino-table-column>
          <sino-table-column prop="noticeEmpReceCardName" label="是否联系员工" min-width="120"></sino-table-column>
          <sino-table-column prop="receCardContTime" label="联系时间" min-width="120"></sino-table-column>
          <sino-table-column prop="issueTime" label="发卡时间" min-width="120"></sino-table-column>
          <sino-table-column prop="recePerSignName" label="领取人" min-width="100"></sino-table-column>
          <sino-table-column prop="suppName" label="签约供应商" min-width="120"></sino-table-column>
          <sino-table-column prop="custName" label="客户名称" min-width="120"></sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--社保卡发放-->
    <sino-dialog :visible.sync="cardGrantFlag"  size="large" v-on:close="resetForm('cardGrantForm')">
      <sino-title slot="title" type="levelOne" title="社保卡发放" class="sino-dialog-title "></sino-title>
      <div class="leadsAdd-form">
        <sino-form :model="cardGrantForm" :rules="rules" ref="cardGrantForm" class="leadsAdd-Form">
          <sino-form-item label="雇员姓名：" prop="empName">
            <sino-input v-model="cardGrantForm.empName" :disabled="true"></sino-input>
          </sino-form-item>
          <sino-form-item label="证件号码：" prop="certNo">
            <sino-input v-model="cardGrantForm.certNo" :disabled="true"></sino-input>
          </sino-form-item>
          <sino-form-item label="领取人 ：" prop="recePerTypeName">
            <sino-select :filterable="true"
                         :multiselect="false"
                         :isshowTotol="false"
                         :disabled="false"
                         :totalNum="false"
                         :isPage="true"
                         :isGroup="false"
                         :data="{code: 'RECE_PER_TYPE'}"
                         :url="dictSelUrl"
                         :chooseName.sync="cardGrantForm.recePerTypeName"
                         :chooseId.sync="cardGrantForm.recePerType" :clear="true"
            ></sino-select>
          </sino-form-item>
          <sino-form-item label="领取人签名：" class="sino-form-item-width"  prop="recePerSignName">
            <sino-input type="textarea" v-model="cardGrantForm.recePerSignName" :disabled="false"></sino-input>
          </sino-form-item>
        </sino-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <sino-button type="primary" @click="submitForm">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import Cookie from 'js-cookie';
  export default {
    data () {
      return {
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        areaUrl: this.apiPath.hrsc.findAreaList,
        declareTypeArr: [],
        checkedArr: [],
        sinsCardForm: {
          empName: '',
          certNo: '',
          areaName: '',
          areaId: '',
          sscStateName: '已领卡',
          sscState: 4
        },
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
        sinsDeclData: null,
        cardGrantFlag: false,
        cardGrantForm: {
          sscId: '',
          empName: '',
          certNo: '',
          sscState: '',
          recePerTypeName: '',
          recePerType: '',
          recePerSignName: ''
        },
        rules: {
          recePerTypeName: [
            {required: true, message: '领取人为必填项', trigger: 'change'}
          ],
          recePerSignName: [
            {required: true, message: '领取人签名为必填项', trigger: 'change'}
          ]
        }
      };
    },
    created () {},
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      selectCallBack (selectTion) {
        this.checkedArr = selectTion;
        if ((this.checkedArr.length > 0)) {
          for (var i = 0; i < this.checkedArr.length; i++) {
            if (this.checkedArr[i].flag === 1) {
              this.checkedArr.splice(i);
              return;
            }
          }
        }
      },
      // 判断table是否有选择
      haveSelected () {
        if (!(this.checkedArr && this.checkedArr.length > 0)) {
          this.$alert('请选择至少一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
          return false;
        } else {
          return true;
        }
      },
      viewAll (pageNum, pageSize) {
        let obj = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: this.sinsCardForm
        };
        api.post(this.apiPath.sins.findSscIngoBusiAll, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.sinsDeclData = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      // 分页
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      contactFun () {
        if (this.haveSelected()) {
          let arr = this.checkedArr.map(function (item) {
            return {sscId: item.sscId, sscState: item.sscState};
          });
          api.post(this.apiPath.sins.exportReciveCardEmp, {sscInfoStates: arr}).then(res => {
            if (res.code === 'CPYY-00001') {
              api.download(res.data);
              this.searchFun();
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      cardGrantFun () {
        if (this.checkedArr && this.checkedArr.length === 1) {
          let obj = {
            sscId: this.checkedArr[0].sscId,
            empName: this.checkedArr[0].empName,
            certNo: this.checkedArr[0].certNo,
            sscState: this.checkedArr[0].sscState
          };
          api.post(this.apiPath.sins.findIssueSsc, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.cardGrantFlag = true;
              this.cardGrantForm.empName = res.data.empName;
              this.cardGrantForm.certNo = res.data.certNo;
              this.cardGrantForm.sscId = res.data.sscId;
              this.cardGrantForm.sscState = res.data.sscState;
            }
          });
        } else {
          this.$alert('选择一条信息进行操作', '提示信息', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            lockScroll: true
          });
        }
      },
      submitForm () {
        this.$refs.cardGrantForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.sins.saveIssueSsc, this.cardGrantForm).then(res => {
              if (res.code === 'CPYY-00001') {
                this.cardGrantFlag = false;
                this.$message({message: '修改成功！', type: 'success'});
                this.searchFun();
              }
            });
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
