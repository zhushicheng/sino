<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">MessageBox 弹框</h2>
    <h3 class="sino-compon-h3">消息提示</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="error" @click="openMessage">错误弹层</sino-button>
        <sino-button type="success" @click="openMessage1">成功弹层</sino-button>
        <sino-button type="warning" @click="openMessage2">警告弹层</sino-button>
        <sino-button type="" @click="openMessage3">提示弹层</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;error&quot; @click=&quot;openMessage&quot;&gt;错误弹层&lt;/sino-button&gt;
  &lt;sino-button type=&quot;success&quot; @click=&quot;openMessage1&quot;&gt;成功弹层&lt;/sino-button&gt;
  &lt;sino-button type=&quot;warning&quot; @click=&quot;openMessage2&quot;&gt;警告弹层&lt;/sino-button&gt;
  &lt;sino-button type=&quot;&quot; @click=&quot;openMessage3&quot;&gt;提示弹层&lt;/sino-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    methods: {
      openMessage () {
        this.$alert(&#39;查询订单信息失败&#39;, &#39;提示信息&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;error&#39;, // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {}
        });
      },
      openMessage1 () {
        this.$alert(&#39;查询订单信息失败查询订单信息失败查询查询订单信息失败查询订单信息失败&#39;, &#39;提示信息&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;success&#39;, // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {}
        });
      },
      openMessage2 () {
        this.$alert(&#39;查询订单信息不允许失败&#39;, &#39;提示信息&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;warning&#39;, // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {}
        });
      },
      openMessage3 () {
        this.$alert(&#39;查询订单信息&#39;, &#39;提示信息&#39;, {
          confirmButtonText: &#39;确 定&#39;,
          type: &#39;info&#39;, // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: &#39;&#39;, // 添加class
          lockScroll: true,
          callback: action =&gt; {}
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


    <h3 class="sino-compon-h3">确认消息</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="primary" @click="comfirmMessage">点击弹层</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;primary&quot; @click=&quot;comfirmMessage&quot;&gt;点击弹层&lt;/sino-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    methods: {
      comfirmMessage () {
          this.$confirm(&#39;此操作将永久删除该文件, 是否继续?&#39;, &#39;提示&#39;, {
            confirmButtonText: &#39;确 定&#39;,
            cancelButtonText: &#39; &#39;,
            type: &#39;warning&#39;
          }).then(() =&gt; {
            console.log(&#39;删除成功!&#39;);
          }).catch(() =&gt; {
            console.log(&#39;删除失败!&#39;);
          });
        },
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

    <h3 class="sino-compon-h3">提交信息</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-button type="primary" @click="open3">点击提交弹层</sino-button>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-button type=&quot;primary&quot; @click=&quot;open3&quot;&gt;点击提交弹层&lt;/sino-button&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    methods: {
     open3 () {
      this.$prompt(&#39;请输入邮箱：&#39;, &#39;提示&#39;, {
        confirmButtonText: &#39;确 定&#39;,
        cancelButtonText: &#39; &#39;,
        inputPattern: /[\w!#$%&amp;&#39;*+/=?^_`{|}~-]+(?:\.[\w!#$%&amp;&#39;*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,     // 正则校验
        inputErrorMessage: &#39;邮箱格式不正确&#39;  // 错误提示信息
      }).then(({ value }) =&gt; {
        console.log(&#39;你的邮箱是: &#39; + value);
      }).catch(() =&gt; {
        console.log(&#39;取消输入&#39;);
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
        this.$alert('查询订单信息失败', '提示信息', {
          confirmButtonText: '确 定',
          type: 'error', // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      openMessage1 () {
        this.$alert('查询订单信息失败查询订单信息失败查询查询订单信息失败查询订单信息失败', '提示信息', {
          confirmButtonText: '确 定',
          type: 'success', // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      openMessage2 () {
        this.$alert('查询订单信息不允许失败', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      openMessage3 () {
        this.$alert('查询订单信息', '提示信息', {
          confirmButtonText: '确 定',
          type: 'warning', // icon图标类型info\success\warning\error
          dragFlag: true,
          customClass: '', // 添加class
          lockScroll: true,
          callback: action => {}
        });
      },
      comfirmMessage () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          type: 'warning'
        }).then(() => {
          console.log('删除成功!');
        }).catch(() => {
          console.log('删除失败!');
        });
      },
      open3 () {
        this.$prompt('请输入邮箱：', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: ' ',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,     // 正则校验
          inputErrorMessage: '邮箱格式不正确'  // 错误提示信息
        }).then(({ value }) => {
          console.log('你的邮箱是: ' + value);
        }).catch(() => {
          console.log('取消输入');
        });
      }
    }
  };
</script>

