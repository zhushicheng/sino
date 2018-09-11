<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Radio 单选框</h2>
    <h3 class="sino-compon-h3">基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-radio v-model="radio" label="1">单选1</sino-radio>
        <sino-radio v-model="radio" label="2">单选2</sino-radio>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-radio v-model=&quot;radio&quot; label=&quot;1&quot;&gt;单选1&lt;/sino-radio&gt;
  &lt;sino-radio v-model=&quot;radio&quot; label=&quot;2&quot;&gt;单选2&lt;/sino-radio&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        radio: &#39;1&#39;,
        data: {
            &quot;code&quot;: &quot;CPYY-00001&quot;,
            &quot;message&quot;: &quot;调用成功&quot;,
            &quot;data&quot;: {
                &quot;list&quot;: [
                    {
                        &quot;title&quot;: &quot;否&quot;,
                        &quot;isDefault&quot;: null,
                        &quot;code&quot;: &quot;YES_NO&quot;,
                        &quot;id&quot;: 1
                    },
                    {
                        &quot;title&quot;: &quot;是&quot;,
                        &quot;isDefault&quot;: null,
                        &quot;code&quot;: &quot;YES_NO&quot;,
                        &quot;id&quot;: 2
                    }
                ]
            }
        }
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            要使用 Radio 组件，只需要设置<code>v-model</code>绑定变量，选中意味着变量的值为相应 Radio <code>label</code>属性的值，<code>label</code>可以是<code>String</code>或者<code>Number</code>。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show = !show">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show,'sino-angle-double-up':show}"></i>
        <span v-if="!show">显示代码</span>
        <span v-if="show">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">禁用状态</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-radio v-model="radio1" label="3" disabled>单选3</sino-radio>
        <sino-radio v-model="radio1" label="4" disabled>单选4</sino-radio>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-radio v-model=&quot;radio1&quot; label=&quot;3&quot; disabled&gt;单选3&lt;/sino-radio&gt;
  &lt;sino-radio v-model=&quot;radio1&quot; label=&quot;4&quot; disabled&gt;单选4&lt;/sino-radio&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    components: {},
    data () {
      return {
        radio1: &#39;4&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            注意：请牢记，选中的条件是绑定的变量值等于<code>label</code>中的值。只要在<code>sino-radio</code>元素中设置<code>disabled</code>属性即可，它接受一个<code>Boolean</code>，<code>true</code>为禁用。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show1= !show1">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show1,'sino-angle-double-up':show1}"></i>
        <span v-if="!show1">显示代码</span>
        <span v-if="show1">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">单选按钮组</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-radio-group v-model="radio2">
          <sino-radio :label="33">单选33</sino-radio>
          <sino-radio :label="44">单选44</sino-radio>
          <sino-radio :label="55">单选55</sino-radio>
        </sino-radio-group>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code><pre class="brush:js;toolbar:false">&lt;template&gt;
    &lt;sino-radio-group v-model=&quot;radio2&quot;&gt;
      &lt;sino-radio :label=&quot;33&quot;&gt;单选33&lt;/sino-radio&gt;
      &lt;sino-radio :label=&quot;44&quot;&gt;单选44&lt;/sino-radio&gt;
      &lt;sino-radio :label=&quot;55&quot;&gt;单选55&lt;/sino-radio&gt;
    &lt;/sino-radio-group&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        radio2: 33
      };
    }
  };
&lt;/script&gt;</pre></code>
          </div>
          <div class="description">
            要使用单选按钮组，需要引用
            <code>sino-radio-group</code>,只需要设置
            <code>v-model</code>绑定变量，选中意味着变量的值为相应 Radio
            <code>label</code>属性的值，<code>label</code>可以是
            <code>String</code>或者<code>Number</code>。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show2= !show2">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show2,'sino-angle-double-up':show2}"></i>
        <span v-if="!show2">显示代码</span>
        <span v-if="show2">收起代码</span>
      </div>
    </div>
    <h3 class="sino-compon-h3">复选框单选</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-radio v-model="radio4" type="checkbox" label="3">单选3</sino-radio>
        <sino-radio v-model="radio4" type="checkbox" label="4">单选4</sino-radio>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
   &lt;sino-radio v-model=&quot;radio4&quot; type=&quot;checkbox&quot; label=&quot;3&quot;&gt;单选3&lt;/sino-radio&gt;
   &lt;sino-radio v-model=&quot;radio4&quot; type=&quot;checkbox&quot; label=&quot;4&quot;&gt;单选4&lt;/sino-radio&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        radio4: &#39;3&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description">
            只要在<code>sino-radio</code>元素中设置<code>type</code>属性即可，它接受一个<code>String</code>为<code>checkbox</code>。
          </div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show3= !show3">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show3,'sino-angle-double-up':show3}"></i>
        <span v-if="!show3">显示代码</span>
        <span v-if="show3">收起代码</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        radio: '1',
        radio1: '4',
        radio2: 33,
        radio4: '3',
        show: false,
        show1: false,
        show2: false,
        show3: false
      };
    }
  };
</script>
