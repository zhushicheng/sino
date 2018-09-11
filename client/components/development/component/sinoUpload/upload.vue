<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Upload 上传</h2>
    <h3 class="sino-compon-h3">手动上传</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="getFileName"
          :on-success="fileSuccess"
          :on-error="fileError"
        >
          <div slot="trigger">
            <input class="uploadFileBox" type="text" v-model="fileName" readonly="true" placeholder="请选择上传的文件"/>
            <button class="chooseFileButton">浏览</button>
          </div>
          <button class="submitButton" @click="submitUpload">上传</button>
        </sino-upload>

      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-upload
      class=&quot;upload-demo&quot;
      ref=&quot;upload&quot;
      action=&quot;https://jsonplaceholder.typicode.com/posts/&quot;
      :show-file-list=&quot;false&quot;
      :on-preview=&quot;handlePreview&quot;
      :on-remove=&quot;handleRemove&quot;
      :auto-upload=&quot;false&quot;
      :on-change=&quot;getFileName&quot;
      :on-success=&quot;fileSuccess&quot;
      :on-error=&quot;fileError&quot;
    &gt;
      &lt;div slot=&quot;trigger&quot;&gt;
        &lt;input class=&quot;uploadFileBox&quot; type=&quot;text&quot; v-model=&quot;fileName&quot; readonly=&quot;true&quot; placeholder=&quot;请选择上传的文件&quot;/&gt;
        &lt;button class=&quot;chooseFileButton&quot;&gt;浏览&lt;/button&gt;
      &lt;/div&gt;
      &lt;button class=&quot;submitButton&quot; @click=&quot;submitUpload&quot;&gt;上传&lt;/button&gt;
    &lt;/sino-upload&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        fileName: &#39;&#39;
      };
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName (file) {
        this.fileName = file.name;
      },
      fileSuccess () {
        this.$alert(&#39;上传成功！&#39;, &#39;温馨提示&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;info&#39;, // icon图标类型
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {
          }
        });
      },
      fileError () {
        this.$alert(&#39;上传失败！&#39;, &#39;温馨提示&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;info&#39;, // icon图标类型
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {
          }
        });
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">自动上传</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="true"
          :auto-upload="true"
          :on-change="getFileName1"
          :on-success="fileSuccess1"
          :on-error="fileError1"
        >
          <div slot="trigger">
            <input class="uploadFileBox" type="text" v-model="fileName1" readonly="true" placeholder="请选择上传的文件"/>
            <button class="chooseFileButton">上传</button>
          </div>
        </sino-upload>

      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-upload
  class=&quot;upload-demo&quot;
  action=&quot;https://jsonplaceholder.typicode.com/posts/&quot;
  :show-file-list=&quot;true&quot;
  :auto-upload=&quot;true&quot;
  :on-change=&quot;getFileName1&quot;
  :on-success=&quot;fileSuccess1&quot;
  :on-error=&quot;fileError1&quot;
&gt;
  &lt;div slot=&quot;trigger&quot;&gt;
    &lt;input class=&quot;uploadFileBox&quot; type=&quot;text&quot; v-model=&quot;fileName1&quot; readonly=&quot;true&quot; placeholder=&quot;请选择上传的文件&quot;/&gt;
    &lt;button class=&quot;chooseFileButton&quot;&gt;上传&lt;/button&gt;
  &lt;/div&gt;
&lt;/sino-upload&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        fileName1: &#39;&#39;
      };
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName1 (file) {
        this.fileName = file.name;
      },
      fileSuccess1 () {
        this.$alert(&#39;上传成功！&#39;, &#39;温馨提示&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;info&#39;, // icon图标类型
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {
          }
        });
      },
      fileError1 () {
        this.$alert(&#39;上传失败！&#39;, &#39;温馨提示&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;info&#39;, // icon图标类型
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {
          }
        });
      }
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1 = !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        fileName: '',
        fileName1: '',
        show: false,
        show1: false
      };
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit();
      },
      handleRemove (file, fileList) {
        console.log(file, fileList);
      },
      handlePreview (file) {
        console.log(file);
      },
      getFileName (file) {
        this.fileName = file.name;
      },
      getFileName1 (file) {
        this.fileName1 = file.name;
      },
      fileSuccess () {
        this.$alert('上传成功！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'success', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      fileError () {
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      fileSuccess1 () {
        this.$alert('上传成功！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'success', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      },
      fileError1 () {
        this.$alert('上传失败！', '温馨提示', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {
          }
        });
      }
    }
  };
</script>
