<template>
  <div>
    <sino-con class="usermanage positionR">
      <sino-title type="levelOne" title="新闻发布"></sino-title>
      <div class="levelOne-right">
        <h6 class="fl">发布时间：</h6>
        <span class="fl">{{addAndModForm.publishTime}}</span></div>
      <sino-form :model="addAndModForm" ref="addAndModForm" class="serch-form">
        <div>
          <ul class="search-inner-box invoice-ul journi-ul">
            <li class="invoice-li sino-form-item-width long-width">
              <span class="search-inner-name invoice-langth-width">新闻标题：</span>
              <sino-input class="fl sino-form-item-content" type="text"
                          :disabled="false" v-model="addAndModForm.newsTitle"></sino-input>
            </li>
            <li class="serch-li">
              <span class="search-inner-name">新闻类型：</span>
              <sino-select class="fl"
                           :filterable="true"
                           :multiselect="false"
                           :isshowTotol="false"
                           :totalNum="false"
                           :isPage="true"
                           :isGroup="false"
                           :url="getDictSelectBox"
                           :chooseName.sync="addAndModForm.newsTypeName"
                           :chooseId.sync="addAndModForm.newsType"
                           :data="{code: 'NEWS_TYPE'}"
                           :clear="true" >
              </sino-select>
            </li>
            <li class="serch-li fr">
              <sino-input type="text" class="fr" v-model="addAndModForm.newsSource"></sino-input>
              <span class="fr fontLine">内容来源：</span>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
        <div class="content-box">
        <quill-editor
                      ref="QuillEditor"
                      v-model="addAndModForm.newsContent"
                      @change="onEditorChange($event)"
                      @ready="onEditorReady($event)"
                      >
        </quill-editor>
        </div>
        <div class="conf-btn">
          <sino-button type="primary" @click="saveFun(1)">保 存</sino-button>
          <sino-button  @click="saveFun(2)">发 布</sino-button>
        </div>
      </sino-form>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../../api';
  import filter from '../../../filters/index';
  import Vue from 'vue';
  import Cookies from 'js-cookie';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  export default {
    data () {
      return {
        getDictSelectBox: this.apiPath.hrsc.getDictSelectBox,
        addAndModForm: {
          publishTime: new Date(),
          loginUserId: '',
          loginUserName: '',
          newsId: '',
          newsTitle: '',
          newsType: '',
          newsContent: '',
          newsSource: '',
          browseNum: '',
          isSwiper: '',
          swiperPicture: '',
          creId: '',
          creName: '',
          creTime: '',
          operId: '',
          operName: '',
          newsState: '',
          operTime: ''
        },
        state: ''
      };
    },
    computed: {
      editor () {
        return this.$refs.QuillEditor.quill;
      }
    },
    created () {
      this.addAndModForm.publishTime = Vue.filter('date')(this.addAndModForm.publishTime, 'yyyy-MM-dd hh:mm:ss');
      let obj = this.$route.query;
      this.state = obj.state;
      if (obj.state === 0) {
        // console.log(res.newsId); 对应的ID
        api.post(this.apiPath.lcPlat.selectPreviewByNewsId, obj).then(res => {
          if (res.code === 'CPYY-00001') {
            this.addAndModForm = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    methods: {
      onEditorChange ({editor, html, text}) {
        this.addAndModForm.newsContent = html;
      },
      onEditorFocus () {
      },
      onEditorReady (editor) {
      },
      onEditorBlur () {
      },
      saveFun (state) {
        /* state===0 是修改 */
        this.addAndModForm.loginUserId = Cookies.get('UserId');
        this.addAndModForm.loginUserName = Cookies.get('CPYY-INFO-NAME');
        this.addAndModForm.newsState = state;
        if (this.state === 0) {
          api.post(this.apiPath.lcPlat.updateByNewsId, this.addAndModForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '修改成功！', type: 'success'});
              this.$router.push({path: '/journadmin'});
            }
          }).catch(err => {
            console.log(err);
          });
        } else {
          api.post(this.apiPath.lcPlat.insertNewsInfo, this.addAndModForm).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$message({message: '新增成功！', type: 'success'});
              this.$router.push({path: '/journadmin'});
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
