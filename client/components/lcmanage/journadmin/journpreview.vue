<template>
  <div class="journ">
    <sino-con class="sino-con-more bill_box usermanage" >
    <sino-title type="levelOne" title="新闻预览"></sino-title>
      <div class="newTitle">
        <h6>{{viewForm.newsTitle}}</h6>
      </div>
      <div class="time">
        <span class="marginRight">发布时间：<i>{{viewForm.publishTime}}</i></span>
        <span class="">内容来源：<i>{{viewForm.newsSource}}</i></span>
      </div>
      <div class="journ-content" v-html="viewForm.newsContent">
      </div>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api';
  import Cookies from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        viewForm: {
          newsTitle: '',
          newsType: '',
          newsContent: '',
          newsSource: '',
          publishTime: '',
          browseNum: '',
          isSwiper: '',
          swiperPicture: '',
          newsState: '',
          creId: '',
          creName: '',
          creTime: '',
          operId: '',
          operName: '',
          operTime: ''
        }
      };
    },
    created () {
      api.post(this.apiPath.lcPlat.selectPreviewByNewsId, this.$route.query).then(res => {
        if (res.code === 'CPYY-00001') {
          console.log(res.data);
          this.viewForm = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {}
  };
</script>
