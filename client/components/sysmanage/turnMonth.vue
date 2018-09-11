<template>
  <div class="usermanage">
    <sino-con class="sino-con-more clearfix">
          <sino-button class="fl" @click="updateMonthFn">更新财务年月>></sino-button><sino-input type="text" class="fl" v-model="maxMonth"></sino-input>

          <sino-button class="fl" @click="climbFn(maxMonth)">翻 月>></sino-button>
    </sino-con>
  </div>
</template>
<script>
  import api from '../../api';
  import Cookie from 'js-cookie';
  import Vue from 'vue';
  export default {
    data () {
      return {
        maxMonth: ''
      };
    },
    mounted () {
      api.post(this.apiPath.hrsc.queryMaxFnncMonth).then(res => {
        if (res.code === 'CPYY-00001') {
          this.maxMonth = res.data;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      updateMonthFn () {
        api.post(this.apiPath.hrsc.saveFnncMonthToNext).then(res => {
          if (res.code === 'CPYY-00001') {
            this.maxMonth = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      climbFn (item) {
        console.log(item);
        if (item) {
          let obj = {
            executeMon: item
          };
          api.post(this.apiPath.sins.sinsTurnOverMonthDealWith, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$alert('社保翻月成功', '提示信息', {
                confirmButtonText: '确 定',
                type: 'info', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  return;
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
          api.post(this.apiPath.accu.accuChangeMonth, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$alert('公积金翻月成功', '提示信息', {
                confirmButtonText: '确 定',
                type: 'info', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  return;
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
          api.post(this.apiPath.hrsc.turnOverMonth, obj).then(res => {
            if (res.code === 'CPYY-00001') {
              this.$alert('账单翻月成功', '提示信息', {
                confirmButtonText: '确 定',
                type: 'info', // icon图标类型
                dragFlag: true,
                customClass: '', // 添加class
                lockScroll: true,
                callback: action => {
                  return;
                }
              });
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
