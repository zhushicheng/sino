<template>
  <div class="pc-record-main">
    <canvas style="display: none" id='canvas' width='400' height='300'></canvas>
    <!-- 左侧结果 -->
    <!--<button @click="bcbc" type="button" style="width: 100px;height: 100px">关闭</button>-->
    <!-- 采集区域 -->
    <div class="page-record">
      <div class="page-record-main"
           v-if="noresult">
        <div class="page-record-container" v-if="canUse">
          <!--<div class="page-record-code">-->
            <!--<div class="page-record-code-title">请对准摄像区域<br>当您确定好位置后点击完成并提交-->
            <!--</div>-->
          <!--</div>-->
          <div class="page-record-video">
            <video ref="cameraVideo" class="page-record-video-obj" autoplay muted></video>
            <img-corner></img-corner>
            <div class="page-record-video-focus">
              <img class="page-record-video-focus-img"
                   :src="startScan ? focusImg : focusReady"
                   :style="{'height': imgHeight}"
                   alt=""/>
            </div>
            <record-tips :seconds="countDown"
                         v-if="recordTipsShow"></record-tips>
            <div class="page-record-checking" v-if="isChecking">
              <img class="page-record-checking-icon" src="../../../assets/img/loading.png" alt=""/>
              <span class="page-record-checking-text">校验中...</span>
            </div>
          </div>
          <div class="page-record-progress" v-if="showProgress">
            <div class="page-record-progress-bar"
                 :style="{'width': progressWidth}"
                 :class="{'progress-warn' : progressWarn}"></div>
          </div>
          <div class="page-record-action">
            <button class="page-record-action-button page-record-action-submit" v-show="!isComplete" :class="{'page-record-action-retry': isComplete}"
                    @click="stopVideo">完成并提交
            </button>
            <button class="page-record-action-button page-record-action-retry" :class="{'page-record-action-submit1': isComplete}"
                    @click="retry">重试
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <!--<face-popup v-if="popupShow"-->
    <!--:popupOption="popupOption"-->
    <!--@pcFaceFinish="onFaceFinish"-->
    <!--@pcFaceCancel="onFaceCancel"></face-popup>-->
  </div>
</template>

<script>
  /* global Blob FileReader */
  // import request from 'superagent'
  import api from '../../../api';
  import RecordVideo from './RecordVideo';

  import imgCorner from './img-corner';
  import recordTips from './record-tips';
  import apiPath from "../../../api/path";
  // import facePopup from '../components/face-popup'

  const focusReady = require('../../../assets/img/focus-ready.png');
  const focusImg = require('../../../assets/img/focus.png');
  const READY_SIZE = '311px';
  const DEFAULT_SIZE = '278px';
  const defaultImg = require('../../../assets/img/check-fail.png');
  const noticeNum = 6;
  const proBarNum = 21;
  const tipsShowNum = -1;

  export default {
    data () {
      return {
        value3: '',
        value4: '',
        // 视频录制对象
        videoObj: null,
        // video转base64
        video_base64: '',
        // 摄像头、麦克风是否可用
        canUse: true,
        // 3秒倒计时
        countDown: 3,
        // 录制视频倒计时
        videoCountDown: 21,
        countDownId: null,
        videoCountDownId: null,
        // 是否显示进度条
        showProgress: false,
        // 是否开始检测视频
        startScan: false,
        // 3秒倒计时默认图片
        focusReady: focusReady,
        // 视频录制时焦点图片
        focusImg: focusImg,
        // 是否显示录制提示
        recordTipsShow: false,
        // 视频是否在验证中
        isChecking: false,
        // 是否显示检测结果
        showResult: false,
        // 存在检测结果，摄像头部分代码隐藏
        noresult: true,
        // 展示弹窗
        popupShow: false,
        // 弹窗的参数opt
        popupOption: {},
        // 结果页数据
        videoResult: {
          result: {
            expression: '',
            face_shape: '',
            beauty: '',
            gender: '',
            race: '',
            quality: '',
            glasses: '',
            landmark72: '',
            angle: '',
            landmark: '',
            age: ''
          },
          errcode: -2
        },
        // 展示'请用普通话复述'
        isShowText: false,
        isComplete: false
      };
    },
    props: {
      isEnter: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      getErrorText (text) {
        switch (text) {
          case 216501:
            return '没有找到人脸';
          case 216434:
            return '人脸检测失败';
          case 216507:
            return '视频中有多张脸';
          default:
            return '样本数据较少';
        }
      }
    },
    mounted () {
      if (this.noresult) {
        this.getVideo();
      }
    },
    watch: {
      isEnter (value) {
        if (value) {
          this.reset();
          this.$nextTick(this.getVideo);
        } else {
          this.videoObj.mediaStreamTrack && this.videoObj.mediaStreamTrack.stop();
        }
      }
    },
    methods: {
      contactUs () {
        this.$alert('<strong>姓名:<i>杨晔云</i></strong><br><strong>邮箱:<i>yangyeyun@sinosoft.com.cn</i></strong>', '联系我们', {
          dangerouslyUseHTMLString: true
        });
      },
      /**
       * 开始录制
       */
      startVideo () {
        this.videoObj.startRecord();
      },

      /**
       * 停止录录制
       */
      stopVideo () {
        this.videoObj.stopRecord();
      },
      checkVideo () {
        if (!this.isEnter) return;
        let _this = this;
        const canvas = document.getElementById('canvas');
        canvas.getContext('2d').drawImage(this.videoObj.video, 0, 0, 400, 300);
        // 把canvas图像转为img图片
        const imgBase64 = canvas.toDataURL("image/png");

        const blob = new Blob(this.videoObj.chunks, {
          type: 'video/webm'
        });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.addEventListener('loadend', () => {
          _this.video_base64 = imgBase64.split(',')[1];
          clearTimeout(_this.videoCountDownId);
          _this.videoCountDownId = null;
          _this.verifyVideo();
        });
      },

      /**
       * 验证视频
       */
      verifyVideo () {
        this.isChecking = true;
        api.postsign(apiPath.hrsc.faceValid, {'base64': this.video_base64}).then(res => {
          this.isChecking = false;
          this.showProgress = false;
          this.isComplete = true;
          if (res.code === 'CPYY-00001') {
            this.$emit('closeVedio', JSON.parse(res.faceSearch));
          } else {}
        }).catch(err => {
          this.isChecking = false;
          this.showProgress = false;
          this.isComplete = true;
          console.log(err);
        });
        // let formdata = {
        //   video_base64: this.video_base64
        // };
        // request
        //   .post('/sinofotDemo')
        //   .type('form')
        //   .send(formdata)
        //   .then(({body}) => {
        //     console.log(body);
        //     this.videoResult = body;
        //     this.isChecking = false;
        //     this.noresult = false;
        //     this.drawPoint(body.result.landmark, "#78F650");
        //     this.drawPoint(body.result.landmark72, "#f62619");
        //   })
        //   .catch(err => {
        //     // todo 异常处理
        //     this.isChecking = false;
        //   });
      },
      drawPoint (point, color) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        point.forEach((item, index) => {
          ctx.fillRect(item.x, item.y, 2, 2);
        });
      },

      /**
       * 三秒倒计时显示
       */
      showCameraTip () {
        this.recordTipsShow = true;
        this.countDownId = setTimeout(() => {
          if (--this.countDown === tipsShowNum) {
            // todo 超过20秒弹窗处理
            this.startScan = true;

            this.countDownId = null;
            this.startVideo();  // 如果视频没开始播放this.checkVideo事件走不了
            this.showVideoTip();
            this.recordTipsShow = false;
            this.showProgress = true;
            return;
          }

          this.showCameraTip();
        }, 1000);
      },

      /**
       * 二十秒录制倒计时
       */
      showVideoTip () {
        this.videoCountDownId = setTimeout(() => {
          if (--this.videoCountDown === 0) {
            this.videoCountDownId = null;
            this.popupShow = true;
            this.popupOption = {
              title: '视频长度已达到最长限制',
              detail: '是否使用该视频?',
              btnFinish: '使用',
              btnCancel: '重拍',
              type: 'video'
            };
            return;
          }

          this.showVideoTip();
        }, 1000);
      },

      /**
       * 重置页面参数
       */
      reset () {
        this.countDown = 3;
        this.videoCountDown = 21;
        this.startScan = false;
        this.showProgress = false;
        this.isChecking = false;
        this.isComplete = false;
        this.clearTimer();
      },

      /**
       * 重新录制
       */
      retry () {
        this.reset();
        // 重新设置重置按钮
        this.showCameraTip();
      },

      /**
       * 清空页面所有的setTimeout和setInterval
       */
      clearTimer () {
        clearTimeout(this.countDownId);
        this.countDownId = null;
        clearTimeout(this.videoCountDownId);
        this.videoCountDownId = null;
      },

      /**
       * 弹窗完成时候点击操作，分为验证码(code),验证视频(video)
       */
      onFaceFinish () {
        if (this.popupOption.type === 'code') {
          this.popupShow = false;
          this.retry();
        } else if (this.popupOption.type === 'video') {
          this.stopVideo();
          this.popupShow = false;
        }
      },

      /**
       * 弹窗取消时候点击操作，分为验证码(code),验证视频(video)
       */
      onFaceCancel () {
        if (this.popupOption.type === 'code') {
          this.resultFinish();
        } else if (this.popupOption.type === 'video') {
          this.retry();
          this.popupShow = false;
        }
      },

      /**
       * 结果页完成按钮
       */
      resultFinish () {
        if (window.location.hash !== '') {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      },

      /**
       * 结果页重拍按钮
       */
      resultRestart () {
        this.noresult = true;
        this.reset();
        this.$nextTick(this.getVideo);
      },

      /**
       * 获取摄像头操作
       */
      getVideo () {
        this.videoObj = new RecordVideo(this.$refs.cameraVideo);
        const videoPromise = this.videoObj.init();
        videoPromise
          .then(() => {
            this.videoObj.mediaRecorder.addEventListener('stop', this.checkVideo, false);
            this.showCameraTip();
          })
          .catch(err => {
            this.canUse = false;
          });
      }

      /**
       * 添加用户信息
       */
      // addUserInfo () {
      //   this.$prompt('请输入姓名', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消'
      //   }).then(({value}) => {
      //     let formdata = {
      //       video_base64: this.video_base64,
      //       user_name: value
      //     };
      //     request
      //       .post('/addUser')
      //       .type('form')
      //       .send(formdata)
      //       .then(({body}) => {
      //         this.$message({
      //           type: 'success',
      //           message: '已添加: ' + body
      //         });
      //       })
      //       .catch(err => {
      //         this.isChecking = false;
      //       });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消输入'
      //     });
      //   });
      // }
    },
    computed: {
      imgHeight () {
        return this.startScan ? DEFAULT_SIZE : READY_SIZE;
      },
      progressWidth () {
        if ((proBarNum - this.videoCountDown) * 5 > 100) {
          return '100%';
        }
        return `${(proBarNum - this.videoCountDown) * 5}%`;
      },
      progressWarn () {
        return this.videoCountDown < noticeNum;
      },
      imgsrc () {
        return this.videoResult.errcode === 0
          ? 'data:image/jpeg;base64,' + this.video_base64
          : defaultImg;
      },
      imgWidth () {
        return (this.videoResult.err_no === 0 && this.video_base64) ? '100%' : '40%';
      }
    },
    components: {
      imgCorner,
      recordTips
    },
    beforeDestroy () {
      this.clearTimer();
    }
  };
</script>

<style lang="scss">
  button.page-record-action-submit1{background-color: #3b85f5; color: #fff;}
  .pc-record-left {
    float: left;
    width: calc((100% - 540px) / 2);
    height: 100%;
    margin-right: 20px;
    text-align: right;
  }

  .pc-record-right {
    float: right;
    width: calc((100% - 540px) / 2);
    height: 100%;
    margin-left: 20px;
  }

  $prefix: page-record;
  @keyframes loadImg {
    0% {
      transform: rotate(0);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .#{$prefix} {
    position: relative;
    height: 100%;
    width: 100%;
    /*margin: 0 auto;*/
  }

  .#{$prefix}-code {
    text-align: center;
    padding: 22px 0;
    height: 130px;

    &-title {
      margin: 0 auto 20px;
      font-size: 24px;
      line-height: 24px;
      color: #333;
    }
    &-text {
      margin: 0 auto;
      &-item {
        display: inline-block;
        margin: 0 4px;
        width: 60px;
        box-sizing: border-box;
        border: 1px solid #e1e1e1;
        font-size: 50px;
        line-height: 80px;
        -moz-line-height: 80px;
      }
    }
  }

  .#{$prefix}-video {
    position: relative;
    overflow: hidden;
    width: 100%;
    /*margin: 0 auto;*/

    &-obj {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
    &-focus {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: transparent;
      &-img {
        display: block;
      }
    }
  }

  .#{$prefix}-progress {
    height: 3px;
    width: 500px;
    overflow: hidden;
    margin: 0 auto;

    &-bar {
      height: 3px;
      transition: width 1s linear;
      background: #30ac69;
      &.progress-warn {
        background: #ee6723;
      }
    }
  }

  .#{$prefix}-action {
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
    overflow: hidden;
    &-button {
      width: 200px;
      font-size: 20px;
      line-height: 50px;
      border: 1px solid #0073eb;
      outline: none;
      cursor: pointer;
    }
    &-submit {
      color: #fff;
      background: #0073eb;
      margin-right: 30px;

      &:hover {
        background-color: #3b85f5;
      }

    }
    &-retry {
      color: #0073eb;
      background: #fff;

      &:hover {
        background-color: #3b85f5;
        color: #fff;
      }
    }
  }

  .#{$prefix}-checking {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 330px;
    height: 212px;
    color: #fff;
    border-radius: 6px;
    background: rgba(0, 0, 0, .7);
    transform: translate(-50%, -50%);
    &-icon {
      display: block;
      margin: 67px auto 20px;
      height: 41px;
      animation: loadImg 1.5s linear infinite;
    }
    &-text {
      display: block;
      text-align: center;
    }
  }

  .#{$prefix}-not-permission {
    margin-top: 50px;

    .not-permission-pic {
      width: 498px;
      height: 398px;
      background: rgba(215, 226, 232, .15);
      border: 1px solid #e1e1e1;
      text-align: center;
      margin-bottom: 50px;
    }

    .not-permission-pic-img {
      width: 30%;
      margin: 80px 0 60px 0;
    }

    .not-permission-pic-text {
      font-size: 18px;
      color: #666;
    }

    .not-permission-explain {
      text-align: center;
    }

    .not-permission-explain-text {
      font-size: 20px;
      color: #333;
      margin-bottom: 20px;
    }

    .not-permission-explain-restart {
      font-size: 18px;
      color: #999;

      .restart-link {
        color: #0073eb;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .#{$prefix}-result {

    &-pic {
      height: 400px;
      text-align: center;
      background-color: #f9fbfc;
      border: 1px solid #e1e1e1;
      line-height: 570px;
      margin-bottom: 30px;
      margin-top: 20px;
    }

    &-content {

      .con-title {
        height: 24px;
        font-size: 24px;
        line-height: 24px;
        color: #333;
        text-align: center;
      }

      .con-title-color-green {
        color: #30ac69;
      }

      .con-title-color-red {
        color: #ff3030;
      }

      .con-fail-text {
        height: 18px;
        line-height: 18px;
        font-size: 18px;
        margin-top: 20px;
        color: #999;
        text-align: center;
      }

      .con-result {
        margin-top: 30px;

        .con-result-text {
          display: inline-block;
          overflow: hidden;
          height: 18px;
          line-height: 18px;
          font-size: 16px;
          color: #666;
        }

        .con-result-text1, .con-result-text2 {
          width: 140px;
        }

      }

      .con-btn {
        margin-top: 30px;
        display: flex;

        .con-btn-finish {
          flex: 1;
          height: 60px;
          text-align: center;
          line-height: 60px;
          background-color: #0073eb;
          font-size: 22px;
          color: #fff;
          border: 1px solid #0073eb;
          margin-right: 40px;
        }

        .con-btn-restart {
          flex: 1;
          height: 60px;
          text-align: center;
          line-height: 60px;
          background-color: #fff;
          font-size: 22px;
          color: #0073eb;
          border: 1px solid #0073eb;
        }
      }
    }
  }
</style>
