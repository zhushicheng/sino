<template>
  <div class="sino-over">
    <h2 class="sino-compon-h2">Input 输入框</h2>
    <h3 class="sino-compon-h3">远程搜索</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-autocomplete
          v-model="state4"
          placeholder="请输入内容"
          :url="this.apiPath.hrsc.findCustSelectInfo"
          :token="token"
          @select="handleSelect"
        ></sino-autocomplete>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;&lt;sino-autocomplete
          v-model=&quot;state4&quot;
          placeholder=&quot;请输入内容&quot;
          :url=&quot;this.apiPath.hrsc.findCustSelectInfo&quot;
          :token=&quot;token&quot;
          @select=&quot;handleSelect&quot;
        &gt;&lt;/sino-autocomplete&gt;
&lt;/template&gt;

&lt;script&gt;
  import api from &#39;../../../../api&#39;;
  import Cookies from &#39;js-cookie&#39;;
  export default{
    components: { },
    // data传参：&lt;title: model绑定值&gt;
    data () {
      return {
        state4: &#39;&#39;,
        token: Cookies.get(&#39;Token&#39;)
      };
    },
    methods: {
      handleSelect (item) {
        console.log(item);
      }
    }
  };
&lt;/script&gt;</pre>
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

    <h3 class="sino-compon-h3">输入框基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="text" v-model="input1"  placeholder="请输入内容" :disabled="false"></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;text&quot; v-model=&quot;input1&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;false&quot;&gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input1: &#39;&#39;
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

    <h3 class="sino-compon-h3">输入密码</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="password" v-model="inputPwd"  placeholder="请输入内容" :disabled="false"></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show1">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;password&quot; v-model=&quot;inputPwd&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;false&quot;&gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input1: &#39;&#39;
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

    <h3 class="sino-compon-h3">输入框警告</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="text" warn="提示信息提示信息" v-model="input2"  placeholder="请输入内容" :disabled="false" ></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show2">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;text&quot; warn=&quot;提示信息提示信息&quot; v-model=&quot;input2&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;false&quot; &gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input2: &#39;&#39;
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

    <h3 class="sino-compon-h3">输入框禁用</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="text" v-model="input3"  placeholder="请输入内容" :disabled="true" ></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show3">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;text&quot; v-model=&quot;input3&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;true&quot; &gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input3: &#39;&#39;
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

    <h3 class="sino-compon-h3">文本域基础用法</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="textarea" v-model="input4"  placeholder="请输入内容" :disabled="false" tipMessage="提示信息提示信息" ></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show4">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
                &lt;sino-input type=&quot;textarea&quot;
                v-model=&quot;input4&quot;
                placeholder=&quot;请输入内容&quot;
                :disabled=&quot;false&quot;
                tipMessage=&quot;提示信息提示信息&quot; &gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input4: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show4 = !show4">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show4,'sino-angle-double-up':show4}"></i>
        <span v-if="!show4">显示代码</span>
        <span v-if="show4">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">文本框自适应高度</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="textarea" v-model="input5"  placeholder="请输入内容" :disabled="false" :autosize="true"></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show5">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;textarea&quot; v-model=&quot;input5&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;false&quot; :autosize=&quot;true&quot;&gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input5: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show5 = !show5">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show5,'sino-angle-double-up':show5}"></i>
        <span v-if="!show5">显示代码</span>
        <span v-if="show5">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">文本域禁用</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="textarea" v-model="input6"  placeholder="请输入内容" :disabled="true" ></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show6">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;textarea&quot; v-model=&quot;input6&quot;  placeholder=&quot;请输入内容&quot; :disabled=&quot;true&quot; &gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input6: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show6 = !show6">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show6,'sino-angle-double-up':show6}"></i>
        <span v-if="!show6">显示代码</span>
        <span v-if="show6">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">文本域可拖拽放大缩小</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-input type="textarea" v-model="input7"  placeholder="请输入内容" resize="both"></sino-input>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show7">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-input type=&quot;textarea&quot; v-model=&quot;input7&quot;  placeholder=&quot;请输入内容&quot; resize=&quot;both&quot;&gt;&lt;/sino-input&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
        input7: &#39;&#39;
      };
    }
  };
&lt;/script&gt;</pre>
            </code>
          </div>
          <div class="description"></div>
        </div>
      </sino-collapse-transition>
      <div class="demo-block-control" @click="show7 = !show7">
        <i class="iconfont " :class="{'sino-shuangjiantou-copy':!show7,'sino-angle-double-up':show7}"></i>
        <span v-if="!show7">显示代码</span>
        <span v-if="show7">收起代码</span>
      </div>
    </div>

    <h3 class="sino-compon-h3">提示信息</h3>
    <div class="demo-block">
      <div class="demo-source">
        <sino-popover ref="popover2" :popper-class="'questionTip'"placement="bottom-start" trigger="hover" content="是否外籍人计税注解是否外籍人计税注解外籍人注解是否外籍人计税"></sino-popover>
        <i class="iconfont sino-fangxingwenhao" style="display:inline-block;margin-top:10px;color:#399ff2" v-popover:popover2></i>
      </div>
      <sino-collapse-transition>
        <div class="demo-meta" v-show="show8">
          <div class="demo-highlight">
            <code>
              <pre class="brush:js;toolbar:false">&lt;template&gt;
  &lt;sino-popover ref=&quot;popover2&quot;
                :popper-class=&quot;&#39;questionTip&#39;&quot;placement=&quot;bottom-start&quot;
                trigger=&quot;hover&quot; content=&quot;是否外籍人计税注解是否外籍人计税注解外籍人注解是否外籍人计税&quot;&gt;&lt;/sino-popover&gt;
  &lt;
                i class=&quot;iconfont sino-fangxingwenhao&quot;
                style=&quot;display:inline-block;margin-top:10px;color:#399ff2&quot;
                v-popover:popover2&gt;&lt;/i&gt;
&lt;/template&gt;

&lt;script&gt;
  export default{
    components: {},
    data () {
      return {
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

  </div>
</template>

<script>
  import api from '../../../../api';
  import Cookies from 'js-cookie';
  export default{
    components: { },
    data () {
      return {
        show: false,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        inputPwd: '',
        restaurants: [],
        state4: '',
        timeout: null,
        token: Cookies.get('Token')
      };
    },
    methods: {
      empty () {
        this.input2 = '';
      },
      loadAll () {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect (item) {
        console.log(item);
      }
    }
  };
</script>
