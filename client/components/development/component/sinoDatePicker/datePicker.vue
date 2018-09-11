<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">DateTimePicker 日期时间选择器</h2>
    <h3 class="sino-compon-h3">常用日期控件</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-date-picker
          v-model="value1"
          type="date"
          placeholder="请选择时间"
          :editable="false"
          :readonly="false"
          :clearable="true">
        </sino-date-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-date-picker
     v-model=&quot;value1&quot;
     type=&quot;date&quot;
     placeholder=&quot;请选择时间&quot;
     :editable=&quot;false&quot;
     :readonly=&quot;false&quot;
     :clearable=&quot;true&quot;&gt;
  &lt;/sino-date-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value1: &#39;&#39;
      };
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

    <h3 class="sino-compon-h3">不显示清除按钮日期控件</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-date-picker
          v-model="value2"
          type="date"
          placeholder="请选择时间"
          :editable="false"
          :readonly="false"
          :clearable="false">
        </sino-date-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-date-picker
  v-model=&quot;value2&quot;
  type=&quot;date&quot;
  placeholder=&quot;请选择时间&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;
  :clearable=&quot;false&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value2: &#39;2017-08-08&#39;
      };
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


    <h3 class="sino-compon-h3">限定日期选择范围控件</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-date-picker
          v-model="value3"
          type="date"
          placeholder="请选择时间"
          :picker-options="pickerOptions"
          :editable="false"
          :readonly="false"
          :clearable="false">
        </sino-date-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-date-picker
  v-model=&quot;value3&quot;
  type=&quot;date&quot;
  placeholder=&quot;请选择时间&quot;
  :picker-options=&quot;pickerOptions&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;
  :clearable=&quot;false&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() &lt; (Date.now() - 8.64e7) || time.getTime() &gt; (Date.now() + 6 * 8.64e7);
          }
        }，
        value3: &#39;&#39;
      };
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

    <h3 class="sino-compon-h3">只读禁用日期控件</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-date-picker
          v-model="value5"
          type="date"
          placeholder="请选择时间"
          :editable="false"
          :readonly="false"
          :disabled="true">
        </sino-date-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-date-picker
  v-model=&quot;value5&quot;
  type=&quot;date&quot;
  placeholder=&quot;请选择时间&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;
  :disabled=&quot;true&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value5: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show3 = !show3">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show3,'sino-angle-double-up':show3}"></i>
        <span v-if="!show3">显示代码</span>
        <span v-if="show3">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">其他日期单位(年/月/周)</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-date-picker
          v-model="value6"
          type="year"
          placeholder="请选择年"
          :editable="false"
          :readonly="false">
        </sino-date-picker>
        <sino-date-picker
          v-model="value7"
          type="month"
          placeholder="请选择月"
          :editable="false"
          :readonly="false">
        </sino-date-picker>
        <sino-date-picker
          v-model="value8"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="请选择周"
          :editable="false"
          :readonly="false">
        </sino-date-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show8">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-date-picker
  v-model=&quot;value6&quot;
  type=&quot;year&quot;
  placeholder=&quot;请选择年&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;sino-date-picker
  v-model=&quot;value7&quot;
  type=&quot;month&quot;
  placeholder=&quot;请选择月&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;sino-date-picker
  v-model=&quot;value8&quot;
  type=&quot;week&quot;
  format=&quot;yyyy 第 WW 周&quot;
  placeholder=&quot;请选择周&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value6: &#39;&#39;,
        value7: &#39;&#39;,
        value8: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show8 = !show8">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show8,'sino-angle-double-up':show8}"></i>
        <span v-if="!show8">显示代码</span>
        <span v-if="show8">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">时间和日期选择</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-date-picker
          :editable="false"
          :readonly="false"
          v-model="value9"
          type="datetime"
          placeholder="选择日期时间">
        </sino-date-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show9">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-date-picker
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;
  v-model=&quot;value9&quot;
  type=&quot;datetime&quot;
  placeholder=&quot;选择日期时间&quot;&gt;
&lt;/sino-date-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value9: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show9 = !show9">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show9,'sino-angle-double-up':show9}"></i>
        <span v-if="!show9">显示代码</span>
        <span v-if="show9">收起代码</span>
      </div>
    </div>


    <h3 class="sino-compon-h3">固定时间点选择</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-time-select
          v-model="value10"
          :editable="false"
          :readonly="false"
          :picker-options="{
        start: '08:30',
        step: '00:15',
        end: '18:30'
      }"
          placeholder="选择时间">
        </sino-time-select>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show10">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-time-select
  v-model=&quot;value10&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;
  :picker-options=&quot;{
    start: &#39;08:30&#39;,
    step: &#39;00:15&#39;,
    end: &#39;18:30&#39;
  }&quot;
  placeholder=&quot;选择时间&quot;&gt;
&lt;/sino-time-select&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value10: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show10 = !show10">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show10,'sino-angle-double-up':show10}"></i>
        <span v-if="!show10">显示代码</span>
        <span v-if="show10">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">任意时间点选择</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-time-picker
          v-model="value11"
          :editable="false"
          :readonly="false"
          placeholder="任意时间点">
        </sino-time-picker>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show11">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
 &lt;sino-time-picker
  v-model=&quot;value11&quot;
  :editable=&quot;false&quot;
  :readonly=&quot;false&quot;
  placeholder=&quot;任意时间点&quot;&gt;
&lt;/sino-time-picker&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        value11: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show11 = !show11">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show11,'sino-angle-double-up':show11}"></i>
        <span v-if="!show11">显示代码</span>
        <span v-if="show11">收起代码</span>
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
        show2: false,
        show3: false,
        show8: false,
        show9: false,
        show10: false,
        show11: false,
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < (Date.now() - 8.64e7) || time.getTime() > (Date.now() + 6 * 8.64e7);
          }
        },
        value1: '',
        value2: '2017-08-08',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        value8: '',
        value9: '',
        value10: '',
        value11: ''
      };
    }
  };
</script>
