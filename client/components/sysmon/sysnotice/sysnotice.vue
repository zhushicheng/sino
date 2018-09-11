<template>
  <div class="procreg">
    <sino-con>
      <sino-title type="levelOne" title="系统公告查询"></sino-title>
      <sino-form :model="searchForm" ref="ruleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">标题：</span>
              <sino-input class="fl" type="text" v-model="searchForm.noticeTitle"
                          :disabled="false"></sino-input>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">内容：</span>
              <sino-input type="text" class="fl" v-model="searchForm.noticeContent"
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
    <!-- 表格 -->
    <div>
      <div class="sino-table-total mt15">
        <div class="sino-table-icon" :class="{'sino-table-icon':isA,'sino-table-icon-auto':!isA}">
          <div class="sino-table-icon-left">
            <sino-button type="icon-text" @click="addFun"><i class="iconfont sino-add"></i>新增
            </sino-button>
          </div>
        </div>
        <sino-table :data="publishData" stripe border max-height="416" v-on:viewAll="viewAll">
          <sino-table-column label="序号" type="index" width="60" align="center"></sino-table-column>
          <sino-table-column prop="noticeTitle" label="标题" ></sino-table-column>
          <sino-table-column prop="publishPerName" label="发布人"></sino-table-column>
          <sino-table-column prop="noticeStateName" label="状态" ></sino-table-column>
          <sino-table-column prop="readNum" label="已读人数" ></sino-table-column>
          <sino-table-column prop="noReadNum" label="未读人数"></sino-table-column>
          <sino-table-column label="操作" align="center" width="140" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span><i class="table-i" v-if="scope.row.noticeState !==1">|</i>
                <span class="table-span" @click="publishFun(scope.row)" v-if="scope.row.noticeState !==1">发布</span><i class="table-i" v-if="scope.row.noticeState !==1">|</i>
                <span class="table-span" @click="modifyFun(scope.row)" v-if="scope.row.noticeState !==1">修改</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page  v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!-- 新增-->
    <sino-dialog :visible.sync="sendAddrFormAdd" size="large" :top="'10%'" class="dialog-height usermanage" @close ="cleanContent('sendAddrAddForm')">
      <sino-title slot="title" type="levelOne" :title="alertTitle" class="sino-dialog-title"></sino-title>
      <sino-form :model="sendAddrAddForm" :rules="sendAddrAddFormRules" ref="sendAddrAddForm" class="demo-sendAddrAddForm">
        <sino-form-item prop="noticeTitle" label="标题：" class="sino-form-item-width">
          <sino-input type="text" v-model="sendAddrAddForm.noticeTitle"></sino-input>
        </sino-form-item>
        <sino-form-item prop="noticeContent" label="内容：" class="sino-form-item-width">
          <sino-input type="textarea" v-model="sendAddrAddForm.noticeContent"></sino-input>
        </sino-form-item>
        <sino-form-item label="发布人：" prop="publishPerName">
          <sino-input v-model="sendAddrAddForm.publishPerName"></sino-input>
        </sino-form-item>
        <sino-form-item label="发布时间：" class="sup-form-item fr ml-15" prop="publishTime">
          <sino-date-picker
            v-model="sendAddrAddForm.publishTime"
            type="datetime"
            :editable="false"
            :readonly="false"
            :clearable="true"
          >
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="有效期：" class="sup-form-item fr ml-15" prop="begDate">
          <sino-date-picker
            v-model="sendAddrAddForm.begDate"
            :picker-options="pickerOptionsBeg"
            type="date"
            :editable="false"
            :readonly="false"
            :clearable="true"
          >
          </sino-date-picker>
        </sino-form-item>
        <span class="fl special-span">至</span>
        <sino-form-item class="sup-form-item fr ml-15 near-sino-form-item" prop="endDate">
          <sino-date-picker
            v-model="sendAddrAddForm.endDate"
            :picker-options="pickerOptionsEnd"
            type="date"
            :editable="false"
            :readonly="false"
            :clearable="true"
          >
          </sino-date-picker>
        </sino-form-item>
        <sino-form-item label="直接发布：" prop="isDirectPublish" v-if="alertTitle !== '修改系统公告'">
          <span class="usermanage-radio">
            <sino-radio v-for="(item, index) in YESNO" :key="index" v-model.number="sendAddrAddForm.isDirectPublish" :label="item.id">{{item.title}}</sino-radio>
          </span>
        </sino-form-item>
      </sino-form>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="submitForm">{{alertButton}}</sino-button>
      </span>
    </sino-dialog>
    <sino-dialog :visible.sync="seeItem" size="small"   class="see-dirc">
      <sino-title slot="title" type="levelOne" title="查看系统公告" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li  class="li-last">
            <h6>标题</h6><span v-text="seeForm.noticeTitle"></span>
          </li>
          <li class="li-last li-text" >
            <h6>内容</h6><span v-text="seeForm.noticeContent"></span>
          </li>
          <li>
            <h6>发布人</h6><span v-text="seeForm.publishPerName"></span>
          </li>
          <li>
            <h6>创建人</h6><span v-text="seeForm.creName"></span>
          </li>
          <li>
            <h6>发布时间</h6><span v-text="seeForm.publishTime"></span>
          </li>
          <li>
            <h6>创建时间</h6><span> {{seeForm.creTime | date}}</span>
          </li>
          <li>
            <h6>有效期</h6><span>{{seeForm.begDate}} 至 {{seeForm.endDate}}</span>
          </li>
          <li>
            <h6>是否直接发布</h6><span>{{seeForm.isDirectPublishName}}</span>
          </li>
          <li>
            <h6>已读人数</h6><span v-text="seeForm.readNum"></span>
          </li>
          <li>
            <h6>未读人数</h6><span v-text="seeForm.noReadNum" :class="{'click-tip-color': seeForm.noReadNum && seeForm.noReadNum > 0}" @click="noticeReTip"></span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="seeItem=false">确 定</sino-button>
      </span>
    </sino-dialog>

  </div>
</template>
<script>
  import api from '../../../api';
  import Vue from 'vue';
  import vald from '../../../validator/index.js';
  export default {
    data () {
      return {
        wxyFlag: true,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        YESNO: [],
        seeForm: {},
        sendAddrFormAdd: false,
        publishData: null,
        searchForm: {
          noticeTitle: '',
          noticeContent: ''
        },
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
        alertTitle: '',
        alertButton: '',
        seeItem: false, // 查看弹层控制显示
        sendAddrAddForm: {
          noticeTitle: '',
          noticeContent: '',
          publishPerName: '',
          publishTime: '',
          begDate: '',
          endDate: '',
          isDirectPublish: ''
        },
        sendAddrAddFormRules: {
          noticeTitle: [
            {required: true, message: '标题为必填项', trigger: 'blur'}
          ],
          noticeContent: [
            {required: true, message: '内容为必填项', trigger: 'blur'}
          ],
          publishPerName: [
            {required: true, message: '发布人为必填项', trigger: 'change'}
          ],
          publishTime: [
            {required: true, type: 'date', message: '发布日期为必填项', trigger: 'change'}
          ],
          begDate: [
            {required: true,  type: 'date', message: '有效期开始日期为必填项', trigger: 'change'}
          ],
          endDate: [
            {required: true, type: 'date', message: '有效期结束日期为必填项', trigger: 'change'}
          ],
          isDirectPublish: [
            {required: true, type: 'number', message: '是否直接发布为必填项', trigger: 'blur'}
          ]
        },
        pickerOptionsBeg: {
          disabledDate: (time) => {
            return  time.getTime() > new Date(this.sendAddrAddForm.endDate);
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            return time.getTime() < new Date(this.sendAddrAddForm.begDate);
          }
        }
      };
    },
    mounted () {
      api.post(this.dictSelUrl, {code: 'YES_NO'}).then(res => {
        this.YESNO = res.data.list;
      }).catch(err => {
        console.log(err);
      });
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      moreIcon () {
        this.isA = !this.isA;
      },
      noticeReTip () {
        if (this.seeForm.noReadNum > 0) {
          this.$confirm('向未读人数重新发送公告？', '提示信息', {
            confirmButtonText: '确 定',
            cancelButtonText: ' ',
            type: 'warning'
          }).then(() => {
            api.post(this.apiPath.hrsc.sysPublishByTokenList, {noticeId: this.seeForm.noticeId}).then(res => {
            }).catch(err => {
              console.log(err);
            });
          });
        }
      },
      viewAll () {
        let data = {
          data: {
            noticeTitle: '',
            noticeContent: ''
          },
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        api.post(this.apiPath.hrsc.findAllSysNotice, data).then(res => {
          this.publishData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      searchList (pageNum, pageSize) {
        let data = {
          data: this.searchForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findAllSysNotice, data).then(res => {
          this.publishData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.searchList(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.searchList(this.pageNum, pageSize);
      },
      // 查询
      searchFun () {
        this.pageNum = 1;
        this.pageSize = 10;
        this.searchList(this.pageNum, this.pageSize);
      },
      addFun () {
        this.sendAddrFormAdd = true;
        this.alertTitle = '新增系统公告';
        this.alertButton = '确 定';
      },
      seeFun (data) {
        this.seeItem = true;
        api.post(this.apiPath.hrsc.sysFind, {noticeId: data.noticeId}).then(res => {
          this.seeForm = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      publishFun (data) {
        this.$confirm('您确定要发布该条系统公告吗？, 是否继续?', '提示信息', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          api.post(this.apiPath.hrsc.sysPublish, {noticeId: data.noticeId}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.searchFun();
              this.$message({message: '发布成功！', type: 'success'});
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      modifyFun (data) {
        this.sendAddrFormAdd = true;
        this.alertTitle = '修改系统公告';
        this.alertButton = '修 改';
        api.post(this.apiPath.hrsc.sysFind, {noticeId: data.noticeId}).then(res => {
          this.sendAddrAddForm = res.data;
          this.sendAddrAddForm.publishTime = new Date(this.sendAddrAddForm.publishTime);
          this.sendAddrAddForm.endDate = new Date(this.sendAddrAddForm.endDate);
          this.sendAddrAddForm.begDate = new Date(this.sendAddrAddForm.begDate);
        }).catch(err => {
          console.log(err);
        });
      },
      submitForm () {
        this.$refs.sendAddrAddForm.validate((valid) => {
          if (valid) {
            if (this.alertTitle === '新增系统公告') {
              this.sendAddrAddForm.begDate = Vue.filter('date')(this.sendAddrAddForm.begDate, 'yyyy-MM-dd');
              this.sendAddrAddForm.endDate = Vue.filter('date')(this.sendAddrAddForm.endDate, 'yyyy-MM-dd');
              this.sendAddrAddForm.publishTime = Vue.filter('date')(this.sendAddrAddForm.publishTime);
              api.post(this.apiPath.hrsc.sysSave, this.sendAddrAddForm).then(res => {
                this.sendAddrFormAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '新增成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            } else {
              this.sendAddrAddForm.begDate = Vue.filter('date')(this.sendAddrAddForm.begDate, 'yyyy-MM-dd');
              this.sendAddrAddForm.endDate = Vue.filter('date')(this.sendAddrAddForm.endDate, 'yyyy-MM-dd');
              this.sendAddrAddForm.publishTime = Vue.filter('date')(this.sendAddrAddForm.publishTime);
              api.post(this.apiPath.hrsc.sysUpdate, this.sendAddrAddForm).then(res => {
                this.sendAddrFormAdd = false;
                if (res.code === 'CPYY-00001') {
                  this.searchFun();
                  this.$message({message: '修改成功！', type: 'success'});
                }
              }).catch(err => {
                console.log(err);
              });
            }
          }
        });
      },
      cleanContent (formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
