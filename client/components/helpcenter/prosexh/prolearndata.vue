<template>
  <!--学习资料-->
  <div class="leads usermanage">
    <div class="prod-tab sino-tabs sino-tabs-card tab-group">
      <div class="sino-tabs-header">
        <div class="sino-tabs-nav">
          <div class="sino-tabs-item" @click="prodScheFun('first')">常见问题</div>
          <div class="sino-tabs-item is-active">学习资料</div>
          <div class="sino-tabs-item" @click="prodScheFun('third')">联系管理员</div>
        </div>
      </div>
    </div>
    <sino-con>
      <sino-tabs v-model="activeName2" type="tick" @tab-click="handleClick">
        <sino-tab-pane name="first">
          <span slot="label"><i class="iconfont sino-wenjian2"></i> 术语表</span>
          <ul class="learn-suyu">
            <li v-for="list in onymList">
              <div class="learn-suyu-div">
                <div class="learn-suyu-line"><img src="../../../assets/img/learn-suyu-line.png"/></div>
                <div class="learn-suyu-msg">{{list.fileName}}</div>
                <div class="learn-suyu-bottom">
                  <span class="fl" v-text="list.operTime"></span>
                  <span class="fr" @click="onymDow(list)"><i class="iconfont sino-download-copy"></i>下载</span>
                </div>
              </div>
            </li>
          </ul>
        </sino-tab-pane>
        <sino-tab-pane name="second">
          <span slot="label"><i class="iconfont sino-shipin"></i> 公积金视频</span>
          <div class="learn-video">
            <my-video :sources="video.sources" :options="video.options" id="learnVideo" class="fl" v-if="videoList && videoList.length !== 0"></my-video>
            <ul class="learn-video-ul">
              <li v-for="list in videoList" @click="videoFun(list)">
                <div class="fl learn-video-img">
                  <img :src="list.framePath"/>
                </div>
                <div class="fl learn-video-msg">
                  <h6>{{list.studyName}}</h6>
                </div>
              </li>
            </ul>
          </div>
        </sino-tab-pane>
        <sino-tab-pane name="third">
          <span slot="label"><i class="iconfont sino-shu"></i> 社保教学资料</span>
          <ul class="learn-suyu">
            <li v-for="list in socList">
              <div class="learn-suyu-div">
                <div class="learn-suyu-line"><img src="../../../assets/img/learn-suyu-line.png"/></div>
                <div class="learn-suyu-msg">{{list.fileName}}</div>
                <div class="learn-suyu-bottom">
                  <span class="fl" v-text="list.operTime"></span>
                  <span class="fr" @click="onymDow(list)"><i class="iconfont sino-download-copy"></i>下载</span>
                </div>
              </div>
            </li>
          </ul>
        </sino-tab-pane>
      </sino-tabs>
    </sino-con>
  </div>
</template>
<script>
  import myVideo from './video.vue';
  import api from '../../../api';
  export default {
    components: {
      myVideo
    },
    data () {
      return {
        activeName2: 'first',
        video: {
          sources: [],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: ''
          }
        },
        onymList: null,
        videoList: null,
        object: {
          maxPage: 2,
          isSmallpage: false,
          isPage: true,
          isTotal: true,
          isSelect: true,
          isjumper: false,
          isSelectPage: false
        },
        pageNum: 1,
        total: null,
        pageSize: 10,
        pageArray: [10, 20, 30, 40],
        socList: null
      };
    },
    mounted () {
      let _data = {
        data: {
          studyDataType: 1
        }
      };
      api.post(this.apiPath.hrsc.findallhelpstudydata, _data).then(res => {
        this.onymList = res.data.list;
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      handleClick (tab, event) {
        if (tab.name === 'first') {
          let _data = {
            data: {
              studyDataType: 1
            }
          };
          api.post(this.apiPath.hrsc.findallhelpstudydata, _data).then(res => {
            this.onymList = res.data.list;
          }).catch(err => {
            console.log(err);
          });
        }
        if (tab.name === 'second') {
          let _data = {
            data: {
              studyDataType: 2
            }
          };
//          api.post(this.apiPath.hrsc.pictureVideo, _data).then(res => {
          api.post(this.apiPath.hrsc.findallhelpstudydata, _data).then(res => {
            this.videoList = res.data.list;
            if (this.videoList.length > 0) {
              this.video.sources.src = res.data.list[0].videoPath;
              this.video.options.poster = res.data.list[0].framePath;
            }
          }).catch(err => {
            console.log(err);
          });
        }
        if (tab.name === 'third') {
          let _data = {
            data: {
              studyDataType: 3
            }
          };
          api.post(this.apiPath.hrsc.findallhelpstudydata, _data).then(res => {
            this.socList = res.data.list;
          }).catch(err => {
            console.log(err);
          });
        }
      },
      videoFun (list) {
        this.video.sources.push({src: list.videoPath, type: 'video/mp4'});
        this.video.options.poster = list.framePath;
      },
      onymDow (list) {
        api.get(this.apiPath.hrsc.downloadFile, {fileUniqueNo: list.fileId}).then(res => {
          if (res.code === 'CPYY-00001') {
            api.download(res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // tab 选项卡点击回调事件
      prodScheFun (order) {
        if (order === 'first') {
          this.$router.push({path: '/proAskQues'});
        } else if (order === 'third') {
          this.$router.push({path: '/proContAdmin'});
        }
      }
    }
  };
</script>
