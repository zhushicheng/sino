<template>
  <div class="index">
    <div class="index-top">
      <div class="index-top-left fl">
        <sino-title type="levelOne" title="待办事项"></sino-title>
        <div class="top-content-left fl">
          <div class="empass-middle-right fl" id="empass-chart" style="height:176px;width:100%"></div>
          <span class="reset"><i class="iconfont sino-shuaxin1"></i></span>
          <ul class="top-content-left-bottom">
            <li>
              <i class="day1"></i>
              <span>今　日</span>
            </li>
            <li>
              <i class="day2"></i>
              <span>一周内</span>
            </li>
            <li>
              <i class="day3"></i>
              <span>一月内</span>
            </li>
            <li>
              <i class="day4"></i>
              <span>更　早</span>
            </li>
          </ul>
        </div>
        <div class="top-content-right fl">
          <div class="nodealt" v-if="agendList.length === 0">
            <img src="../../assets/img/nodealt.jpg"/>
            <span>暂无待办信息</span>
          </div>
          <ul class="commission-ul addPaddLeft" v-if="noDataFalg">
            <li v-for="(item, index) in agendList" :key="index">
              <i class="iconfont sino-markIcon"></i>
              <span>{{item.name}}</span>
              <i class="small-button">{{item.num}}</i>
              <a href="javascript:;" class="goTo" @click="transaction(item.id, item.name)">办理></a>
            </li>
          </ul>
          <div class="mian-nodata" v-if="!noDataFalg"></div>
        </div>
      </div>
      <div class="index-top-right fl">
        <div class="right-top-content">
          <div class=""></div>
          <sino-title type="levelOne" title="快捷入口"></sino-title>
          <div class="sino-table-icon-left1 fr sino-table-icon-spec1">
            <sino-button type="icon-text" @click="addFun2"><i class="iconfont sino-setting"></i>配置
            </sino-button>
          </div>
          <div class="noshowbox" v-if="shortList.length === 0">
            <img src="../../assets/img/short.png"/>
            <div class="noshowbox-btn"></div>
          </div>
          <ul class="showBox" v-if="shortList.length > 0">
            <li v-for="(list, index) in shortList" :key="index" :class="{'nolist': !list.funId}">
              <div class="right-top-content-module" @click="shortPush(list.url, list.funId)">
                <i class="iconfont sino-icon-technology-rocket"></i>
                <img src="../../assets/img/tip-air.png"/>
                <!--<router-link :to="list.url">{{list.funName}}</router-link>-->
                <span>{{list.funName}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="index-bottom">
      <div class="index-bottom-left fl">
        <sino-title type="levelOne" title="提醒事项"></sino-title>
        <div class="sino-table-icon-left1 fr sino-table-icon-spec2">
          <div class="switch-tab">
            <p class="switch-tab-active">新通知：<span>6</span> 条</p>
          </div>
        </div>
        <div class="scroll-hiden-box">
          <div class="index-bottom-info-box">
            <ul class="index-bottom-info">
              <li>
                <div class="guide-box">
                  <div class="guide-box-center">
                    <div class="guide-box-center-inner"></div>
                  </div>
                </div>
                <p class="index-first-info">劳动能力鉴定通知书</p>
                <p class="index-third-info">10分钟前</p>
                <p class="index-four-info"><span>忽略</span></p>
              </li>
              <li>
                <div class="guide-box">
                  <div class="guide-box-center">
                    <div class="guide-box-center-inner"></div>
                  </div>
                </div>
                <p class="index-first-info">劳动能力鉴定通知书</p>
                <p class="index-third-info">10分钟前</p>
                <p class="index-four-info"><span>忽略</span></p>
              </li>
              <li>
                <div class="guide-box">
                  <div class="guide-box-center">
                    <div class="guide-box-center-inner"></div>
                  </div>
                </div>
                <p class="index-first-info">劳动能力鉴定通知书</p>
                <p class="index-third-info">10分钟前</p>
                <p class="index-four-info"><span>忽略</span></p>
              </li>
              <li>
                <div class="guide-box">
                  <div class="guide-box-center">
                    <div class="guide-box-center-inner"></div>
                  </div>
                </div>
                <p class="index-first-info">劳动能力鉴定通知书</p>
                <p class="index-third-info">10分钟前</p>
                <p class="index-four-info"><span>忽略</span></p>
              </li>
              <li>
                <div class="guide-box">
                  <div class="guide-box-center">
                    <div class="guide-box-center-inner"></div>
                  </div>
                </div>
                <p class="index-first-info">劳动能力鉴定通知书</p>
                <p class="index-third-info">10分钟前</p>
                <p class="index-four-info"><span>忽略</span></p>
              </li>
              <li>
                <div class="guide-box">
                  <div class="guide-box-center">
                    <div class="guide-box-center-inner"></div>
                  </div>
                </div>
                <p class="index-first-info">劳动能力鉴定通知书</p>
                <p class="index-third-info">10分钟前</p>
                <p class="index-four-info"><span>忽略</span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="index-bottom-right fl">
        <div class="right-bottom-content">
          <div class="index-bottom-right-tab">
            <div class="" :class="{'index-bottom-active-tab': activeTab === 1}" @click="activeTabFun(1, noReadMessNum)">
              <sino-badge :value="noReadMessNum? noReadMessNum : '0'" class="adStyle">
                <span>系统消息</span>
              </sino-badge>
            </div>
            <div :class="{'index-bottom-active-tab': activeTab === 2}" @click="activeTabFun(2, noReadNoticeNum)">
              <sino-badge :value="noReadNoticeNum ? noReadNoticeNum : '0'" class="adStyle" >
                <span>系统公告</span>
              </sino-badge>
            </div>
          </div>
          <div class="scroll-hiden-box" style="height:160px;">
            <div class="index-bottom-info-box" style="height:160px;">
              <ul class="index-bottom-info" v-if="activeTab === 1">
                <li v-for="item in messageList" :key="item" @click="getMessageDetail(item)">
                  <div class="guide-box iconfont" :class="item.state !== 1 ? 'sino-message-open' : 'sino-message-close'">
                  </div>
                  <p class="index-only-info">{{item.messTitle}}</p>
                </li>
              </ul>
              <ul class="index-bottom-info" v-if="activeTab === 2">
                <li v-for="item in noticeList" :key="item" @click="getNoticeDetail(item)">
                  <div class="guide-box iconfont sino-laba" :class="item.noticeIsRead ? 'grand-color' : 'yellow-color'">
                  </div>
                  <p class="index-only-info">{{item.noticeTitle}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="bottom-content-message-other" @click="jumpNotice">共 <span>{{value || 0}}</span> 条未读消息></div>
          <!--<div class="bottom-content-message-other" @click="jumpNotice">查看全部>></div>-->
        </div>
      </div>
    </div>
    <!--快捷入口-->
    <sino-dialog :visible.sync="dialogAdjustLelve" :show-close="true" :lock-scroll="true" class="shortcuts">
      <sino-title slot="title" type="levelOne" title="快捷功能" class="sino-dialog-title"></sino-title>
      <sino-tree :data="treeLevData" show-checkbox :showTreeHover="false"
                 node-key="id"
                 :isRadio="false"
                 :props="defaultProps"
                 ref="shortcutsTree"
                 :default-checked-keys="defaultCheckKeys"
                 class="adjust-company-dialog-button-cancel"
      >
      </sino-tree>
      <span slot="footer" class="dialog-footer">
        <sino-button type="primary" @click="shortcutsSure">确 定</sino-button>
      </span>
    </sino-dialog>
    <!--菜单角色选择-->
    <sino-dialog :visible.sync="dialogChooseFlag" :show-close="true" :lock-scroll="true" class="shortcuts">
      <sino-title slot="title" type="levelOne" title="选择角色" class="sino-dialog-title"></sino-title>
      <div class="fl sino-dialog-sino">
        <i class="iconfont sino-gantanhao"></i>
      </div>
      <div class="fl choose-div-menu">
        <h6>该功能菜单有以下角色可操作，<br>请选择：</h6>
        <sino-radio v-for="(item, index) in dialogChooseList" :key="index" v-model.number="dialogChooseInfo.userRoleId"
                    :label="item.userRoleId">{{item.roleName}}-{{item.orgName}}
        </sino-radio>
        <sino-button type="primary" class="clear" @click="submitChooseFun">确 定</sino-button>
      </div>
    </sino-dialog>
    <!--系统公告详细内容-->
    <sino-dialog :visible.sync ="noticeFlag" :show-close="true"  class="notice-layer" @close="noticeLyaerClose">
      <sino-title slot="title" type="levelOne" :title="noticeDetail.noticeTitle" class="sino-dialog-title"></sino-title>
      <ul class="title-box">
        <li>
          <span>发布人：</span>{{noticeDetail.publishPerName}}
        </li>
        <li>
          <span>发布时间：</span>{{noticeDetail.publishTime}}
        </li>
      </ul>
      <div class="detail-box" v-text="noticeDetail.noticeContent">
      </div>
    </sino-dialog>
  </div>
</template>
<script>
  import api from '../../api/index';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  import echarts from 'echarts';

  let echarsTitle = '今日待办';
  let _url;
  export default {
    data () {
      return {
        defaultCheckKeys: [],
        dialogAdjustLelve: false,
        dialogChooseFlag: false,
        funId: null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeLevData: [],
        shortList: [],
        dialogChooseList: [],
        noDataFalg: false,
        dialogChooseInfo: {
          userRoleId: ''
        },
        timeInterval: null,
        echarsTitle: '',
        echarsNumber: null,
        todoItemsData: {
          day: null,
          month: null,
          years: null,
          week: null
        },
        agendList: [],
        activeTab: 1,
        noReadNoticeNum: 0,
        noReadMessNum: 0,
        noticeList: [],
        messageList: [],
        noticeFlag: false,
        noticeDetail: {},
        value: ''
      };
    },
    watch: {
      defaultCheckKeys (newValue) {
        if (this.$refs.shortcutsTree) {
          this.$refs.shortcutsTree.setCheckedKeys(newValue);
        }
      },
      $route: {
        handler: function (val) {
          if (val.path === "/main") {
            this.getInfo();
          }
        },
        deep: true
      }
    },
    mounted () {
      this.getInfo();
      this.echarsData();
      this.todoItems();
      this.findAllQuick();
      this.findMessageTotal();
    },
    methods: {
      // 获取待办事项echars数据
      echarsData () {
        api.post(this.apiPath.hrsc.todoCountByTime).then(res => {
          if (res.code === 'CPYY-00001') {
            this.todoItemsData.day = res.data.dayCount;
            this.todoItemsData.week = res.data.weekCount;
            this.todoItemsData.month = res.data.monthCount;
            this.todoItemsData.years = res.data.olderCount;
            this.drawPie(res.data.dayCount, res.data.weekCount, res.data.monthCount, res.data.olderCount);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 获取待办事项数据
      todoItems () {
        this.noDataFalg = false;
        api.post(this.apiPath.hrsc.countMain, {timeInterval: this.timeInterval}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.agendList = res.data;
            for (let item of res.data) {
              if (item.num) {
                this.noDataFalg = true;
              }
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      findMessageNum () {
        let that = this;
        const promise = new Promise(function (resolve) {
          api.post(that.apiPath.hrsc.showMess).then(res => {
            if (res.code === 'CPYY-00001') {
              if (res.data.totalMess) {
                that.noReadMessNum = res.data.unReadMess;
                that.value = res.data.unReadMess;
                resolve();
              } else {
                that.noReadMessNum = 0;
              }
            }
          }).catch(err => {
            console.log(err);
          });
        });
        return promise;
      },
      findMessageTotal () {
        this.findMessageNum().then(() => {
          api.post(this.apiPath.hrsc.findSysMessList, {pageNum: 1, pageSize: 4, data: { homePage: 1 }}).then(res => {
            if (res.code === 'CPYY-00001') {
              this.messageList = res.data.list;
            }
          }).catch(err => {
            console.log(err);
          });
        });
      },
      findAllQuick () {
        api.post(this.apiPath.hrsc.findAllQuick).then(res => {
          if (res.code === 'CPYY-00001') {
            this.noReadNoticeNum = res.data.noReadNum;
            this.noticeList = res.data.sysNoticeList;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      shortPush (url, id) {
        if (this.$route.path === url) {
          return;
        }
        let _data = {
          userId: Cookies.get('UserId'),
          funId: id
        };
        this.funId = id;
        api.post(this.apiPath.author.findRoleByFunAndUser, _data).then(res => {
          if (res.data instanceof Array) {
            this.dialogChooseFlag = true;
            this.dialogChooseInfo.roleId = res.data[0].roleId;
            this.dialogChooseList = res.data;
            this.dialogChooseInfo.userRoleId = this.dialogChooseList[0].userRoleId;
            _url = url;
          } else {
            if (res.data !== '' && res.data !== null) {
              Cookies.set('userRoleId', res.data.userRole.userRoleId);
              Cookies.set('roleType', res.data.role.roleType);
            }
            this.$router.push({path: url});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      activeTabFun (num, _value) {
        this.activeTab = num;
        this.value = _value;
      },
      getNoticeDetail (item) {
        api.post(this.apiPath.hrsc.sysFind, {noticeId: item.noticeId}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.noticeFlag = true;
            this.noticeDetail = res.data;
            api.post(this.apiPath.hrsc.sysSaveRead, {noticeId: item.noticeId}).then(res => {
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      noticeLyaerClose () {
        this.findAllQuick();
      },
      getMessageDetail (item) {
        api.postsign(this.apiPath.hrsc.findSysMessById, item.messId).then(res => {
          if (res.code === 'CPYY-00001') {
            if (item.state === 1) {
              api.post(this.apiPath.hrsc.updateMessState, {messId: item.messId, state: 2}).then(res => {
              }).catch(err => {
                console.log(err);
              });
            }
            this.$alert(res.data.messContent, res.data.messTitle, {
              dragFlag: true,
              customClass: 'index-message',
              lockScroll: true,
              callback: action => {
                this.findMessageTotal();
              }
            });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      jumpNotice () {
        if (this.activeTab === 2) {
          this.$router.push({path: '/indexNotice'});
        } else {
          this.$router.push({path: '/indexMessage'});
        }
      },
      getInfo () {
        api.post(this.apiPath.author.findQuickFunByUserRoleId).then(res => {
          if (res.code === 'CPYY-00001') {
            let _copy = JSON.parse(JSON.stringify(res.data));
            let _cc = [];
            let isRepeated;
            for (var i = 0; i < _copy.length; i++) {
              isRepeated = false;
              for (var j = 0; j < _cc.length; j++) {
                if (_copy[i].funId === _cc[j].funId) {
                  isRepeated = true;
                  break;
                }
              }
              if (!isRepeated) {
                _cc.push(_copy[i]);
              }
            }
            this.shortList = _cc.slice(0, 6);
            if (this.shortList.length < 6) {
              let  needPush = [];
              while (6 - this.shortList.length - needPush.length > 0) {
                needPush.push({});
              }
              this.shortList = this.shortList.concat(needPush);
            }
          }
        }).catch(err => {
          console.log(err);
        });
        // api.post(this.apiPath.hrsc.countMain).then(res => {
        //   if (res.code === 'CPYY-00001') {
        //     console.log(res.data);
        //     this.agendList = res.data;
        //   }
        // }).catch(err => {
        //   console.log(err);
        // });
      },
      transaction (id, name) {
        if (name === '待办审批') {
          this.$router.push({path: '/agendaApp'});
          return;
        }
        this.$router.push({path: '/agendaApp', query: {id: id, name: name}});
      },
      shortFun (id, url) {
        let _data = {
          userId: Cookies.get('UserId'),
          funId: id
        };
        this.funId = id;
        api.post(this.apiPath.author.findRoleByFunAndUser, _data).then(res => {
          if (res.data instanceof Array) {
            this.dialogChooseFlag = true;
            this.dialogChooseInfo.roleId = res.data[0].roleId;
            this.dialogChooseList = res.data;
            this.dialogChooseInfo.userRoleId = this.dialogChooseList[0].userRoleId;
            _url = url;
          } else {
            if (res.data !== '' && res.data !== null) {
              Cookies.set('userRoleId', res.data.userRole.userRoleId);
              Cookies.set('roleType', res.data.role.roleType);
            }
            this.$router.push({path: url});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      submitChooseFun (id) {
        api.post(this.apiPath.author.changeUserRoleToTokenByRole, {userRoleId: this.dialogChooseInfo.userRoleId, funId: id}).then(res => {
          if (res.code === "CPYY-00001") {
            Cookies.set('Token', res.data.token);
            Cookies.set('userRoleId', res.data.loginUser.userRole.userRoleId);
            Cookies.set('roleType', res.data.loginUser.role.roleType);
            this.dialogChooseFlag = false;
            this.$router.push({path: _url});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      drawPie (day, week, month, years) {
        let _this = this;
        if (month === 0 && years === 0) {
          this.chart = echarts.init(document.getElementById('empass-chart'));
          this.chart.setOption({
            title: {
              text: '暂无数据',
              subtext: 0,
              x: 'center',
              y: 'center',
              itemGap: 14,
              textStyle: {
                color: 'rgba(0,0,0,0.6)',
                fontFamily: '微软雅黑',
                fontSize: 14
              },
              subtextStyle: {
                color: '#f7b828',
                fontSize: 14,
                fontWeight: 'bolder'

              }
            },
            color: ['#E4e4e4'],
            calculable: false,
            series: [
              {
                name: '导入数据',
                type: 'pie',
                radius: ['50%', '65%'],
                avoidLabelOverlap: true,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    /* 鼠标悬浮的样式 */
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },

                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                data: [
                  {value: 400}
                ]
              }
            ]
          });
          this.chart.on('click', function (param) {
            switch (param.name) {
              case "一周内":
                _this.timeInterval = 'WEEK';
                echarsTitle = '一周内待办';
                _this.echarsNumber = _this.todoItemsData.week;
                _this.todoItems();
                break;
              case "今日":
                _this.timeInterval = 'DAY';
                echarsTitle = '今日待办';
                _this.echarsNumber = _this.todoItemsData.day;
                _this.todoItems();
                break;
              case "一月内":
                _this.timeInterval = 'MONTH';
                echarsTitle = '一月内待办';
                _this.echarsNumber = _this.todoItemsData.month;
                _this.todoItems();
                break;
              case "更早":
                _this.timeInterval = 'YEAR';
                echarsTitle = '更早待办';
                _this.echarsNumber = _this.todoItemsData.years;
                _this.todoItems();
                break;
            }
          });
        } else {
          this.chart = echarts.init(document.getElementById('empass-chart'));
          let radius1 = ['50%', '80%'];
          let total = day + week + month + years;
          this.chart.setOption({
            title: {
              text: day || 0,
              subtext: echarsTitle,
              x: 'center',
              y: 'center',
              itemGap: 14,
              textStyle: {
                color: '#f7b828',
                fontSize: 18,
                fontWeight: 'bolder'
              },
              subtextStyle: {
                color: 'rgba(0,0,0,0.6)',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            color: ['#8fb3ef', '#15d6ba', '#74beef', '#82daee'],
            tooltip: {
              trigger: 'item',
              formatter: "{b}: {c} ({d}%)"
            },
            // legend: {
            //   show: true,
            //   x: 'center',
            //   y: 'bottom',
            //   data: ['更早', '今日', '一月内', '一周内']
            // },
            calculable: false,
            series: [
              {
                name: '导入数据',
                type: 'pie',
                radius: radius1,
                selectedOffset: 3,
                avoidLabelOverlap: true,

                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    /* 鼠标悬浮的样式 */
                    show: false
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  label: {
                    show: true,
                    position: 'center',
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                data: [
                  {value: years, name: '更早'},
                  {value: day, name: '今日'},
                  {value: month, name: '一月内'},
                  {value: week, name: '一周内', selected: true}
                ]
              }
            ]
          });
          this.chart.on('click', function (param) {
            switch (param.name) {
              case "一周内":
                _this.timeInterval = 'WEEK';
                echarsTitle = '一周内待办';
                _this.echarsNumber = _this.todoItemsData.week;
                _this.todoItems();
                break;
              case "今日":
                _this.timeInterval = 'DAY';
                echarsTitle = '今日待办';
                _this.echarsNumber = _this.todoItemsData.day;
                _this.todoItems();
                break;
              case "一月内":
                _this.timeInterval = 'MONTH';
                echarsTitle = '一月内待办';
                _this.echarsNumber = _this.todoItemsData.month;
                _this.todoItems();
                break;
              case "更早":
                _this.timeInterval = 'YEAR';
                echarsTitle = '更早待办';
                _this.echarsNumber = _this.todoItemsData.years;
                _this.todoItems();
                break;
              default:
                console.log("无数据！");
            }
          });
        }
      },
      viewAll (pageNum, pageSize) {
        if (!this.tableName) {
          this.$alert('请先上传文件', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
              return;
            }
          });
          return;
        }
        let _data = {
          pageNum: pageNum,
          pageSize: pageSize,
          data: {
            fileName: this.tableName,
            succOrFailed: this.activeName === 'success' ? 0 : 1
          }
        };
        api.post(this.apiPath.hrsc.pageSuccOrderWageDetExcel, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            let arr = [];
            JSON.parse(JSON.stringify(res.data.list)).forEach(function (items) {
              let obj = {};
              items.forEach(function (item) {
                obj[item.c1] = item.c2;
              });
              arr.push(JSON.parse(JSON.stringify(obj)));
            });
            this[this.activeName === 'success' ? 'successTableData' : 'errorTableData'] = arr;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      shortcutsSure () {
        let _this = this;
        let dataRecieve = this.$refs.shortcutsTree.getCheckedNodes();
        let _aa = [];
        dataRecieve.forEach(function (list) {
          if (!(list.children)) {
            _aa.push(list);
          }
        });
        if (_aa.length >= 7) {
          this.$alert('最多只能选择6条', '温馨提示', {
            confirmButtonText: '确 定',
            type: 'warning', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
        let _data = {
          funIds: _this.$refs.shortcutsTree.getCheckedKeys()
        };
        api.post(_this.apiPath.author.addOrUpdateQuickFunByUserRoleId, _data).then(res => {
          if (res.code === 'CPYY-00001') {
            _this.dialogAdjustLelve = false;
            this.getInfo();
            this.$message({message: '新增成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      addFun2 () {
        let _this = this;
        _this.dialogAdjustLelve = true;
        _this.defaultCheckKeys = [];
        api.post(_this.apiPath.author.findRoleFunByUserRoleId).then(res => {
          _this.treeLevData = JSON.parse(res.data);
          api.post(_this.apiPath.author.findQuickFunIdsByUserRoleId).then(res => {
            _this.defaultCheckKeys = res.data;
            _this.$refs.shortcutsTree.setCheckedNodes(_this.defaultCheckKeys);
          }).catch(err => {
            console.log(err);
          });
        }).catch(err => {
          console.log(err);
        });
      },
      importFun () {
        this.batchLeadFlag = true;
      },
      getFileName (file, filelist) {
        if (filelist.length > 1) {
          filelist = filelist.splice(0, 1);
        }
        this.batchLeadForm.fileName = file.name;
      },
      fileSuccess (res) {
        if (res.code === 'CPYY-00001') {
          this.currentBatchNo = res.data;
          api.post(this.apiPath.hrsc.saveOrderDetWageExcel, {
            fileNo: res.data,
            token: this.selectToken,
            custId: this.batchLeadForm.custId
          }).then(res => {
            if (res.code === 'CPYY-00001') {
              this.batchLeadSeeList = res.data;
              this.empassform = res.data;
              this.batchLeadSeeList.fileName = this.batchLeadForm.fileName;
              this.batchLeadFlag = false;
              this.batchLeadSeeFlag = true;
              this.tableTitle = res.data.testVOS;
              this.tableName = res.data.tableName;
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          this.$alert(res.message, '温馨提示', {
            confirmButtonText: '确 定',
            type: 'error', // icon图标类型
            dragFlag: true,
            customClass: '', // 添加class
            lockScroll: true,
            callback: action => {
            }
          });
          return;
        }
      },
      fileError (res) {
        this.$alert(res.data, '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
            return;
          }
        });
      },
      delConFile () {
        this.$refs.batchUpload.clearFiles();
        this.batchLeadForm.fileName = '';
        this.batchLeadForm.uploadListFlag = false;
        this.batchLeadForm.uploadList = [];
      },
// 导入确认
      submitUpload () {
        this.$refs.batchLeadForm.validate((valid) => {
          if (valid) {
            this.$refs.batchUpload.submit();
          }
        });
      },
      batchAllDownload (batchNo) {
        api.postsign(this.apiPath.hrsc.getOrgData, this.currentBatchNo).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchSuccDownload (path) {
        api.download(path);
      },
      batchFailDownload (path) {
        api.download(path);
      },
// 确认派出
      sendFun (_data) {
        api.post(this.apiPath.hrsc.addBatchOrder, {batchNo: _data.batchNo}).then(res => {
          if (res.code === 'CPYY-00001') {
            this.$message({message: '确认派出成功！', type: 'success'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      batchInport () {
        this.batchLeadSeeFlag = false;
        this.empassform = this.batchLeadSeeList;
      },
      echartDraw () {
        this.drawPie(this.empassform.sumCount, this.empassform.succCount, this.empassform.failedCount);
        this.viewAll(this.pageNum, this.pageSize);
      },
// 模板下载
      downloadFun () {
        this.downloadFlag = true;
      },
      downSubmitFun () {
        this.$refs.downloadForm.validate((valid) => {
          if (valid) {
            api.post(this.apiPath.salary.downloadWageTemplate, {custId: this.downloadForm.custId}).then(res => {
              if (res.code === 'CPYY-00001') {
                api.download(res.data);
                this.downloadFlag = false;
              }
            }).catch(err => {
              console.log(err);
            });
          }
        });
        this.downloadForm.impFileId = '2017-12-26@6d374c20402b43288f4613b735e9c1fa';
      },
// 查询历史导入数据
      hisFun () {
        this.routerView = true;
        this.$router.push({path: '/salaryBatchMainten/hisImportSearch'});
      },
      orderhisFun () {
        this.routerView = true;
        this.$router.push({path: '/salaryBatchMainten/orderDetSearch'});
      },
      pageHandler: function (pageNum) {
        this.pageNum = pageNum;
        this.viewAll(this.pageNum, this.pageSize);
      },
      choooseNum: function (pageSize) {
        this.pageSize = pageSize;
        this.viewAll(this.pageNum, this.pageSize);
      },
      resetFun (formName) {
        this.$refs[formName].resetFields();
        if (formName !== 'downloadForm') {
          this.$refs.batchUpload.uploadFiles = [];
          this.batchLeadForm.fileName = '';
          this.batchLeadForm.uploadList = [];
        }
      }
    }
  };
</script>
