<template>
  <!--邮件管理-->
  <div class="usermanage">
    <sino-con>
      <sino-title type="levelOne" title="邮件管理"></sino-title>
      <sino-form :model="mailForm" ref="mailForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <sino-form-item label="标题：" class="search-inner-item" prop="conName">
                <sino-input class="fl" type="text"
                            v-model="mailForm.emailSub"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li class="search-inner-one">
              <sino-form-item label="业务类型：" class="search-inner-item" prop="busiTypesTrans">
                <div class="search-inner-radio fl">
                  <sino-select :filterable="false"
                               :multiselect="false"
                               :isshowTotol="false"
                               :disabled="false"
                               :totalNum="false"
                               :isPage="false"
                               :isGroup="false"
                               :url="conStateUrl"
                               :data="{code:'EMAIL_BUSI_TYPE'}"
                               :chooseName.sync="mailForm.busiTypesTrans"
                               :chooseId.sync="mailForm.emailBusiType"
                               :clear="true"></sino-select>
                </div>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="收件人：" class="search-inner-item" prop="receEmailAcct">
                <sino-input class="fl" type="text"
                            v-model="mailForm.receEmailAcct"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <sino-form-item label="发送邮件：" class="search-inner-item" prop="sendEmailAcct">
                <sino-input class="fl" type="text"
                            v-model="mailForm.sendEmailAcct"
                            :disabled="false"></sino-input>
              </sino-form-item>
            </li>
            <li>
              <span class="two-dater-span">发送时间：</span>
              <div class="two-dater">
                <sino-form-item class="search-inner-item" prop="startTime">
                  <sino-date-picker class="fl"
                                    v-model="mailForm.startTime"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
                <span class="fl">-</span>
                <sino-form-item class="search-inner-item" prop="endTime">
                  <sino-date-picker class="fl"
                                    v-model="mailForm.endTime"
                                    type="date"
                                    :editable="false"
                                    :readonly="false"
                                    :clearable="true">
                  </sino-date-picker>
                </sino-form-item>
              </div>
            </li>
            <li>
              <sino-form-item label="内容：" class="search-inner-item" prop="emailContent">
                <sino-input type="text" v-model="mailForm.emailContent"></sino-input>
              </sino-form-item>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun('mailForm')">重 置</sino-button>
          </div>
        </div>
        <div class="clear"></div>
      </sino-form>
    </sino-con>
    <!--表格-->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <sino-table max-height="416" class="mail-table" :data="mailData" stripe v-on:viewAll="viewAll" border>
          <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
          <sino-table-column prop="emailSub" label="标题"></sino-table-column>
          <sino-table-column prop="busiTypesTrans" label="业务类型"></sino-table-column>
          <sino-table-column prop="receEmailAcct" label="收件人"></sino-table-column>
          <sino-table-column prop="sendEmailAcct" label="发件邮箱" min-width="180"></sino-table-column>
          <sino-table-column prop="sendTimeString" label="发送时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="seeFun(scope.row)">查看</span>
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
    <!-- 查看 -->
    <sino-dialog :visible.sync="mailSeeFlag" size="small">
      <sino-title slot="title" type="levelOne" title="查看邮件" class="sino-dialog-title"></sino-title>
      <div class="usermanagement-list">
        <ul class="usermanagement-ul">
          <li>
            <h6>发送邮件</h6><input readonly v-model="mailSeeList.sendEmailAcct">
          </li>
          <li>
            <h6>业务类型</h6><input readonly v-model="mailSeeList.busiType.busiTypesTrans">
          </li>
          <li>
            <h6>收件人</h6><input readonly v-model="mailSeeList.receEmailAcct">
          </li>
          <li>
            <h6>发送时间</h6><input readonly v-model="mailSeeList.sendTimeString">
          </li>
          <li>
            <h6>标题</h6><input readonly v-model="mailSeeList.emailSub">
          </li>
          <li>
            <h6>内容</h6><input readonly v-model="mailSeeList.emailContent">
          </li>
          <li class="li-last">
            <h6>附件</h6>
            <input class="fl input-enc" readonly v-for="enc in mailSeeList.emailEnc" v-model="enc.subName" @click="encDownload(enc)">
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
         <sino-button type="primary" @click="mailSeeFlag=false">确 定</sino-button>
      </span>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../../api';

  export default {
    data () {
      return {
        conStateUrl: this.apiPath.hrsc.getDictSelectBox,
        value1: '',
        mailForm: {
          emailSub: '',
          emailBusiType: '',
          busiTypesTrans: '',
          sendEmailAcct: '',
          receEmailAcct: '',
          emailContent: '',
          startTime: '',
          endTime: ''
        },
        mailData: null,
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
        mailSeeList: {
          sendEmailAcct: '',
          busiType: {
            busiTypes: '',
            busiTypesTrans: ''
          },
          receEmailAcct: '',
          sendTimeString: '',
          emailSub: '',
          emailContent: '',
          emailEnc: []
        },
        mailSeeFlag: false
      };
    },
    mounted () {
      this.validator.addEnterEvent(this.searchFun);
    },
    beforeDestroy () {
      this.validator.removeEnterEvent();
    },
    methods: {
      searchFun () {
        this.pageNum = 1;
        this.viewAll(this.pageNum, this.pageSize);
      },
      //  重置
      resetFun (formName) {
        this.$refs[formName].resetFields();
      },
      //  查看
      seeFun (data) {
        api.postsign(this.apiPath.mail.getHistoryByHisId, data.hisId).then(res => {
          this.mailSeeFlag = true;
          this.mailSeeList = res.data;
          this.mailSeeList.emailEnc = JSON.parse(res.data.emailEnc);
        }).catch(err => {
          console.log(err);
        });
      },
      viewAll (pageNum, pageSize) {
        delete  this.mailForm.busiTypesTrans;
        let data = {
          data: this.mailForm,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.mail.getAllHistoryByPage, data).then(res => {
          this.mailData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      encDownload (enc) {
        api.get(this.apiPath.hrsc.downloadFile, {fileUniqueNo: enc.subUniqueNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(1, pageSize);
      }
    }
  };
</script>
