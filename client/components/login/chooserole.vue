<template>
  <!--选择角色-->
  <div class="login">
    <div class="choose-box">
      <div class="choose-header">
        <h5><i></i><span>请选择角色</span><i></i></h5>
      </div>
      <div class="choose-con">
        <sino-scrollbar class="sino-login-scrollbar" noresize>
          <div class="choose-scroll">
            <ul class="choose-ul">
              <li class="li-all">
                <sino-radio v-model="radio" label="1">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">全部角色</span>
                  </div>
                </sino-radio>
              </li>
              <li>
                <sino-radio v-model="radio" label="2">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">系统管理员</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>
              <li>
                <sino-radio v-model="radio" label="3">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">销售顾问</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>
              <li>
                <sino-radio v-model="radio" label="3">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">销售顾问</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>
              <li>
                <sino-radio v-model="radio" label="3">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">销售顾问</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>
              <li>
                <sino-radio v-model="radio" label="3">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">销售顾问</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>
              <li>
                <sino-radio v-model="radio" label="3">
                  <div class="fl">
                    <i class="li-i"></i><span class="li-span">销售顾问</span>
                    <div class="choose-more">
                      <i class="iconfont sino-floor"></i><span>全国平台</span>
                      <i class="iconfont sino-org"></i><span>贵阳外企资源服务有限公司</span>
                    </div>
                  </div>
                </sino-radio>
              </li>
            </ul>
          </div>
        </sino-scrollbar>
        <div class="choose-div">
          <sino-checkbox>记住当前选择，下次登录不再提示。</sino-checkbox>
        </div>
        <input type="button" class="choose-btn" value="进入系统">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        radio: '1' // 默认选择全部角色
      };
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/style/base.css";
  @import "../../assets/scss/theme";

  html, body, #app {
    width: 100%;
    height: 100%;
  }

  .login {
    width: 100%;
    height: 100%;
    background: url("../../assets/img/login_bg.jpg") no-repeat;
    background-size: cover;
  }
  .choose-box{width: 780px;position: fixed;top:50%;left:50%;margin-top: -227px;margin-left: -390px;background: #fff;}
  .choose-header{width: 100%;height: 50px;background: #338cf3 url("../../assets/img/choose-header.png") no-repeat left bottom;}
  .choose-header h5{width: 120px;height: 100px;margin: 0 auto;}
  .choose-header h5 i{float:left;width:5px;height:5px;background: #92cef7;border-radius: 50%;display: inline-block;line-height: 50px;margin-top: 23px;}
  .choose-header h5 span{line-height: 50px;font-size: 18px;font-weight: bold;float: left;margin: 0 10px;color: #fff;}
  .choose-con{width: 620px;overflow: hidden;margin: 0 auto}
  .choose-ul{width: 100%;margin: 0 auto;overflow: hidden}
  .choose-ul li{width: 100%;height: 68px;border:1px solid #e4e4e4;
    border-radius: 10px;margin-top: 20px;box-sizing: border-box;
    background: #fff url("../../assets/img/choose-bl.png") no-repeat left bottom;position: relative;}
  .choose-ul li .li-i{width: 3px;height: 14px;background: $fontColor;float: left;margin: 15px 10px 0 21px;}
  .choose-ul li .li-span{float: left;font-size: 16px;color: #666;margin-top: 14px;}
  .choose-ul li.li-all{background: #fff url("../../assets/img/choose-ye.png") no-repeat left bottom;}
  .choose-ul li.li-all .li-i{margin:27px 10px 27px 21px; }
  .choose-ul li.li-all .li-span{line-height: 68px;margin-top: 0;}
  .choose-more{clear: both;margin-top: 40px;margin-left: 21px;width: 100%;}
  .choose-more i{margin-right: 5px;color: #999}
  .choose-more span{color: #999;margin-right: 20px;}
  .choose-ul li .sino-radio{margin-top: 0;width: 100%;}
  .choose-ul li .sino-radio > div.fl{display: none;}
  .choose-ul li .sino-radio-span:first-child{float: right}
  .choose-ul li .sino-radio-span:last-child{display: none}
  .choose-ul li .sino-radio-span .sino-radio-inner{width: 33px;height: 33px;border: 0;
    background: url("../../assets/img/choose-radio-gray.png") no-repeat;
    margin-top: 18px;margin-right: 24px;}
  .choose-ul li .sino-radio-span.is-checked .sino-radio-inner{background: url("../../assets/img/choose-radio-active.png") no-repeat;}
  .choose-ul li .sino-radio-span.is-checked .sino-radio-inner:after{background: none;border: 0;}
  .choose-div{width: 100%;margin-top: 20px;}
  .choose-div .sino-checked-label{margin-left: 22px;}
  .choose-btn{clear:both;width: 260px;height: 40px;border-radius: 20px;
    background: $mainColor;color: #fff;font-size: 18px;line-height: 40px;text-align: center;
    display:block;margin: 28px auto 30px auto;}
  /**/
  .choose-scroll{height: 270px;}
  .sino-login-scrollbar{width:100%;height:270px;}
</style>
