<template>
  <!--查看手续办理历史-->
  <sino-con>
    <sino-title type="levelOne" title="手续办理历史"></sino-title>
    <sino-table :data="seeOrderData" max-height="416" stripe v-on:viewAll="viewAll" border class="seeorderhis">
      <sino-table-column type="index" label="序号" width="60" align="center"></sino-table-column>
      <sino-table-column prop="handleRemark" label="办理描述"></sino-table-column>
      <sino-table-column prop="formalStateName" label="办理状态"></sino-table-column>
      <sino-table-column prop="handleResultName" label="办理结果"></sino-table-column>
      <sino-table-column prop="handleDate" label="办理日期"></sino-table-column>
    </sino-table>
    <sino-page v-bind:page="pageNum"
               v-bind:page-size="pageSize"
               v-on:pagehandler="pageHandler"
               :pageArray="pageArray"
               v-on:choosePageFun="choooseNum"
               v-bind:object="object"
               :total="total"></sino-page>
    <div class="conf-btn">
      <sino-button type="primary" @click="backFun">返 回</sino-button>
    </div>
  </sino-con>
</template>
<script>
  import api from '../../../api/index';

  export default {
    data () {
      return {
        seeOrderData: null,
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
        }
      };
    },
    mounted () {
      this.pageNum = 1;
      this.viewAll(this.pageNum, this.pageSize);
    },
    methods: {
      viewAll (pageNum, pageSize) {
        let _data = {
          data: {
            orderId: this.$route.params.orderId
          },
          pageNum: pageNum,
          pageSize: pageSize
        };
        api.post(this.apiPath.hrsc.findHandleByOrderId, _data).then(res => {
          this.seeOrderData = res.data.list;
          this.total = res.data.total;
        }).catch(() => {
          console.log('失败!');
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
      backFun () {
        this.$router.push({path: '/orderhandle'});
      }
    }
  };
</script>
