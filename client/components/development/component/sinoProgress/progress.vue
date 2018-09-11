<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Progress 进度条</h2>
    <h3 class="sino-compon-h3">线性进度条用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-progress :percentage="0" :stroke-width="15"></sino-progress>
        <br/>
        <sino-progress :percentage="70" :stroke-width="15"></sino-progress>
        <br/>
        <sino-progress :percentage="100" :stroke-width="15" status="success"></sino-progress>
        <br/>
        <sino-progress :percentage="50" :stroke-width="15" status="exception"></sino-progress>
        <br/>
        <sino-progress :percentage="70" :stroke-width="15" :text-inside="true"></sino-progress>
        <br/>
        <sino-progress :percentage="50" :stroke-width="15" :text-inside="true" status="exception"></sino-progress>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code><pre class="brush:js;toolbar:false">&lt;template&gt;
    &lt;sino-progress :percentage=&quot;0&quot; :stroke-width=&quot;15&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;sino-progress :percentage=&quot;70&quot; :stroke-width=&quot;15&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;sino-progress :percentage=&quot;100&quot; :stroke-width=&quot;15&quot; status=&quot;success&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;sino-progress :percentage=&quot;50&quot; :stroke-width=&quot;15&quot; status=&quot;exception&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;sino-progress :percentage=&quot;70&quot; :stroke-width=&quot;15&quot; :text-inside=&quot;true&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;sino-progress :percentage=&quot;50&quot; :stroke-width=&quot;15&quot; :text-inside=&quot;true&quot; status=&quot;exception&quot;&gt;&lt;/sino-progress&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {}
  };
&lt;/script&gt;</pre></code>
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


    <h3 class="sino-compon-h3">环形进度条用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-progress type="circle" :percentage="0"></sino-progress>
        <sino-progress type="circle" :percentage="25"></sino-progress>
        <sino-progress type="circle" :percentage="100" status="success"></sino-progress>
        <sino-progress type="circle" :percentage="50" status="exception"></sino-progress>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
    &lt;sino-progress type=&quot;circle&quot; :percentage=&quot;0&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;br/&gt;
    &lt;sino-progress type=&quot;circle&quot; :percentage=&quot;25&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;br/&gt;
    &lt;sino-progress type=&quot;circle&quot; :percentage=&quot;100&quot; status=&quot;success&quot;&gt;&lt;/sino-progress&gt;
    &lt;br/&gt;
    &lt;br/&gt;
    &lt;sino-progress type=&quot;circle&quot; :percentage=&quot;50&quot; status=&quot;exception&quot;&gt;&lt;/sino-progress&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {}
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
  export default{
    components: {},
    data () {
      return {
        show: false,
        show1: false
      };
    }
  };
</script>
