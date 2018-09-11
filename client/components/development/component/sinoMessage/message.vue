<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">MessageBox 弹框</h2>
    <h3 class="sino-compon-h3">消息提示</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button @click="openMessage">成功提示弹层</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre style="background-color: rgb(255, 255, 255); font-family: Consolas; font-size: 12pt;">this.$message({message: &#39;修改成功！&#39;, type: &#39;success&#39;});</pre>
              <p>
                <br/>
              </p>
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

    <h3 class="sino-compon-h3">回调</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button @click="openMessage1">回调</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">_this.$message({message: &#39;修改成功！&#39;, type: &#39;success&#39;, onClose: function () {
  _this.$message({message: &#39;回调成功！&#39;, type: &#39;success&#39;});
}});</pre>
              <p>
                <br/>
              </p>
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

    <h3 class="sino-compon-h3">换行</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button @click="openMessage2">换行</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">this.$message({message: &#39;修改成功！&lt;br&gt;&lt;i&gt;下一个审核人：部门经理-王亮&lt;/i&gt;&#39;, type: &#39;success&#39;, customClass: &#39;el-message-width&#39;});</pre>
              <p>
                <br/>
              </p>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2 = !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    components: {},
    data () {
      return {
        show: false,
        show1: false,
        show2: false
      };
    },
    methods: {
      openMessage () {
        this.$message({message: '修改成功！', type: 'success'});
      },
      openMessage1 () {
        let _this = this;
        _this.$message({message: '修改成功！',
          type: 'success',
          onClose: function () {
            _this.$message({message: '回调成功！', type: 'success'});
          }
        });
      },
      openMessage2 () {
        this.$message({message: '操作成功<br><i>下一个审核人：部门经理-王亮</i>', type: 'success', customClass: 'el-message-width'});
      }
    }
  };
</script>

