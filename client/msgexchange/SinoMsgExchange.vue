<template>
  <div>
    <!--新增弹层部分wxy-->
    <sino-dialog  size="large"  class="dialog-height jurisdiction" :visible.sync="wxyFlag">
      <sino-title slot="title" type="levelOne" :title="noticeTitle" class=" sino-dialog-title sino-dialog-title2"></sino-title>

      <ul class="userList">
        <li >
          <h4 class="fl">发布人：</h4>
          <span v-text="publishPerName"></span>
        </li>
        <li>
          <h4 class="fl">发布时间：</h4>
          <span v-text="publishTime"></span>
        </li>
      </ul>
      <div class="jurisdictionContent">
        <p v-text="noticeContent"></p>
      </div>
    </sino-dialog>
  </div>
</template>

<script>
  import api from '../api/index';
  export default {
    data () {
      return {
        websock: this.msg, // eslint-disable-line
        wxyFlag: false,
        noticeTitle: '',
        publishPerName: '',
        publishTime: '',
        noticeContent: ''
      };
    },
    methods: {
      // 检查进程(30s为周期),检测socket状态,防止使用的用户未进行注册
      checkMsg: function () {
        let checkDate = new Date();
        // console.log("在线状态检查进程,当前检测时间:" +
        //   checkDate.getFullYear() + "年" +
        //   checkDate.getMonth() + "月" +
        //   checkDate.getDay() + "日 " +
        //   checkDate.getHours() + "时:" +
        //   checkDate.getMinutes() + "分:" +
        //   checkDate.getSeconds() + "秒");
        setTimeout(this.checkMsg, 10000);// eslint-disable-line
        // 如果尚未建立连接则，进行连接建立
        if (typeof (this.msg.readyState) === "undefined" || this.msg.readyState === 0 || this.msg.readyState === 3) {
          // console.log("当前尚未建立连接,尝试建立连接");
          this.init();
          return;
        }
        // 如果已经在线则返回
        if (this.msg.readyState === 1) {
          // console.log("已经建立连接,检测是否注册");
          if (this.$store.state.registryStatus) {
            // console.log("当前连接已注册,退出本次检测");
            return;
          }
          console.log("用户尚未注册,尝试注册当前用户");
          this.registry();
        }
      },
      handleSystemUpdate: function (messageBody) {
        const h = this.$createElement;
        this.$notify({
          title: '标题名称',
          message: h('i', {style: 'color: teal'}, messageBody),
          duration: 0
        });
      },
      handleSystemNote: function (messageBody) {
        var result2 = JSON.parse(messageBody); // 一个Object对象
        let that = this;
        this.$notify({
          title: '系统公告',
          titleType: 'level',
          dangerouslyUseHTMLString: true,
          // message: h('span', result2.noticeTitle),
          message: '<span class="bodyContent">' + result2.noticeTitle + '</span><i class="href">详情>></i>',
          duration: 0,
          onClick: function () {
            console.log(result2);
            let obj = {
              noticeId: result2.noticeId
            };
            that.wxyFlag = true;
            that.noticeTitle = result2.noticeTitle;
            that.publishPerName = result2.publishPerName;
            that.publishTime = result2.publishTime;
            that.noticeContent = result2.noticeContent;
            api.post(that.apiPath.hrsc.sysSaveRead, obj).then(res => {}).catch(err => {
              console.log(err);
            });
          }
        });
      }
    },
    mounted () {
      // this.init();
      // 5S后开启检查进程
      // setTimeout(this.checkMsg, 5000);
    },
    computed: {
      getMsg () {
        return this.$store.state.msg;
      }
    },
    watch: {
      getMsg: function (newMsg, oldMsg) {
        if (newMsg === 'undefined' || newMsg === null || newMsg === "") {
          return;
        }
        switch (newMsg.msgType) {
          case "REGISTRY_SUCCESS":
            this.$store.commit("setRegistry", true);
            break;
          case "SYSTEM_UPDATE":
            this.handleSystemUpdate(newMsg.msgBody);
            break;
          case "NOTICE":
            this.handleSystemNote(newMsg.msgBody);
            break;
          default:
            console.log("未能识别的消息", JSON.stringify(newMsg));
        }
      }
    }
  };
</script>
