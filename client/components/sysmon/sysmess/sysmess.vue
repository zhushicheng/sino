<template>
  <div class="procreg">
    <div class="index-remind">
      <ul class="index-quick-ul">
        <li @click="approvalFun('total')" :class="{ 'active': currentApproval === 'total'}">
          <div class="left-icon-box">
            <i class="total-info"></i>
          </div>
          <div class="right-text">
            <p>消息总数</p>
            <p class="info-num" v-text="messageList.totalMess"></p>
          </div>
        </li>
        <li @click="approvalFun('read')" :class="{ 'active': currentApproval === 'read'}">
          <div class="left-icon-box">
            <i class="read-info"></i>
          </div>
          <div class="right-text">
            <p>已读消息</p>
            <p class="info-num" v-text="messageList.readMess"></p>
          </div>
        </li>
        <li @click="approvalFun('unread')" :class="{ 'active': currentApproval === 'unread'}">
          <div class="left-icon-box">
            <i class="unread-info"></i>
          </div>
          <div class="right-text">
            <p>未读消息</p>
            <p class="info-num" v-text="messageList.unReadMess"></p>
          </div>
        </li>
        <li class="fr" @click="approvalFun('del')" :class="{ 'active': currentApproval === 'del'}">
          <div class="left-icon-box">
            <i class="del-info"></i>
          </div>
          <div class="right-text">
            <p>删除消息</p>
            <p class="info-num" v-text="messageList.delMess"></p>
          </div>
        </li>
      </ul>
    </div>
    <sino-con>
      <sino-title type="levelOne" title="系统信息查询"></sino-title>
      <sino-form :model="searchMessInfo" ref="ruleForm" class="serch-form">
        <div class="search-box">
          <ul class="search-inner-box">
            <li class="search-inner-one">
              <span class="search-inner-name">消息类型：</span>
              <sino-select :tipText="''" class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="searchMessInfo.messTypeName" :chooseId.sync="searchMessInfo.messType" :clear="true" :url="dictSelUrl" :data="{code: 'MESS_TYPE'}"></sino-select>
            </li>
            <li class="search-inner-one">
              <span class="search-inner-name">发件人：</span>
              <sino-select :tipText="''" class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchMessInfo.sendPerName" :chooseId.sync="searchMessInfo.sendPerId" :clear="true" :token="token" :url="userSelUrl" :data="{code:'USER_TYPE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">收件人：</span>
              <sino-select :tipText="''" class="fl" :filterable="true" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="true" :isGroup="false" :chooseName.sync="searchMessInfo.recePerName" :chooseId.sync="searchMessInfo.recePerId" :clear="true" :token="token" :url="userSelUrl" :data="{code:'USER_TYPE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">状态：</span>
              <sino-select :tipText="''" class="fl" :filterable="false" :multiselect="false" :isshowTotol="false" :disabled="false" :totalNum="false" :isPage="false" :isGroup="false" :chooseName.sync="searchMessInfo.stateName" :chooseId.sync="searchMessInfo.state" :clear="true" :url="dictSelUrl" :data="{code: 'MESS_RECE_STATE'}"></sino-select>
            </li>
            <li>
              <span class="search-inner-name">消息标题：</span>
              <sino-input type="text" class="fl" v-model="searchMessInfo.messTitle"
                          :disabled="false"></sino-input>
            </li>
            <li>
              <span class="search-inner-name">消息内容：</span>
              <sino-input type="text" class="fl" v-model="searchMessInfo.messContent"
                          :disabled="false"></sino-input>
            </li>
          </ul>
        </div>
        <div class="search-button">
          <div class="search-button-box">
            <sino-button type="primary" @click="searchFun">查 询</sino-button>
            <sino-button class="ressetButton" @click="resetFun">重 置</sino-button>
          </div>
        </div>
        <div class="clearfix"></div>
      </sino-form>
    </sino-con>
    <!-- 表格 -->
    <div class="sino-queryList">
      <div class="sino-table-total">
        <sino-table :data="tableData" stripe border max-height="416" v-on:viewAll="viewAll" class="procreg-table">
          <sino-table-column type="index" label="序号"></sino-table-column>
          <sino-table-column prop="messTitle" label="标题"></sino-table-column>
          <sino-table-column prop="messTypeName" label="类型"></sino-table-column>
          <sino-table-column prop="sendPerName" label="发件人"></sino-table-column>
          <sino-table-column prop="recePerName" label="收件人"></sino-table-column>
          <sino-table-column prop="messContent" label="消息内容"></sino-table-column>
          <sino-table-column prop="stateName" label="状态"></sino-table-column>
          <sino-table-column prop="sendTime" label="发起时间" min-width="160"></sino-table-column>
          <sino-table-column label="操作" align="center" class="user-btns" fixed="right">
            <template scope="scope">
              <template v-if="scope.row.oper == true">
                <span class="table-span" @click="clickFun(scope.row)">查看</span>
              </template>
            </template>
          </sino-table-column>
        </sino-table>
        <sino-page v-bind:page="pageNum" v-bind:page-size="pageSize" v-on:pagehandler="pageHandler" :pageArray="pageArray" v-on:choosePageFun="choooseNum" v-bind:object="object" :total="total"></sino-page>
      </div>
    </div>
    <!--弹层 --查看-->
    <sino-dialog :visible.sync="seeItem" class="dialog-width dialog-see-sysmess">
      <sino-title slot="title" type="levelOne" title="查看系统消息" class="sino-dialog-title"></sino-title>
      <div class="roleMange-list">
        <ul class="roleMange-list-last">
          <li>标题</li>
          <li v-text="seeForm.messTitle"></li>
        </ul>
        <ul class="roleMange-list-last dialog-see-high-ul">
          <li>内容</li>
          <li v-text="seeForm.messContent"></li>
        </ul>
        <ul class="roleMange-list-last">
          <li>附件</li>
          <li class="download-li">
            <div>
              <i class="iconfont sino-qubiezhen" v-if="seeForm.encName"></i>
              <span class="first-child-span"  v-text="seeForm.encName"></span>
              <span @click="downloadFile" v-if="seeForm.encName">下载</span>
            </div>
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
  import api from '../../../api/index';
  import Cookies from 'js-cookie';
  export default {
    components: {
    },
    data () {
      return {
        userSelUrl: this.apiPath.author.findUserSelectBoxInfo,
        dictSelUrl: this.apiPath.hrsc.getDictSelectBox,
        messageList: {
          totalMess: '',
          readMess: '',
          unReadMess: '',
          delMess: ''
        },
        token: Cookies.get("Token"),
        currentApproval: '',
        searchMessInfo: { // 搜索条件
          messTypeName: '',
          messType: '',
          sendPerName: '',
          sendPerId: '',
          recePerName: '',
          recePerId: '',
          stateName: '',
          state: '',
          messTitle: '',
          messContent: ''
        },
        isA: true,
        tableData: null,
        total: null,
        name: '',
        id: '',
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
        seeItem: false, // 查看弹层控制显示
        seeForm: {}
      };
    },
    created () {
      api.post(this.apiPath.hrsc.showMess).then(res => {
        this.messageList = res.data;
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
      viewAll (pageNum, pageSize) {
        let data = {
          data: this.searchMessInfo,
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findSysMessList, data).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        });
      },
      // 查询
      searchFun () {
        this.viewAll(1, this.pageSize);
      },
      resetFun () {
        for (var i in this.searchMessInfo) {
          this.searchMessInfo[i] = '';
        }
      },
      // 下载
      downloadFile () {
        api.postsign(this.apiPath.hrsc.downEnc, this.seeForm.encId).then(res => {
          if (res.code === 'CPYY-00001') {
//            window.open(res.data);
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      approvalFun (type) {
        for (var i in this.searchMessInfo) {
          this.searchMessInfo[i] = '';
        }
        if (type === 'total') {
          this.currentApproval = 'total';
          this.searchFun();
        } else if (type === 'read') {
          this.currentApproval = 'read';
          this.searchMessInfo.state = 2;
          this.searchMessInfo.stateName = '已读取';
          this.searchFun();
        } else if (type === 'unread') {
          this.currentApproval = 'unread';
          this.searchMessInfo.state = 1;
          this.searchMessInfo.stateName = '未读取';
          this.searchFun();
        } else {
          this.currentApproval = 'del';
          this.searchMessInfo.state = 3;
          this.searchMessInfo.stateName = '已删除';
          this.searchFun();
        }
      },
      moreIcon () {
        this.isA = !this.isA;
      },
      pageHandler: function (page) {
        this.pageNum = page;
        this.viewAll(page, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, pageSize);
      },
      clickFun: function (data) {
        api.postsign(this.apiPath.hrsc.findSysMessById, data.messId).then(res => {
          this.seeForm = res.data;
          this.seeItem = true;
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>
