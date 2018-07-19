<template>
  <div class="valid-container">
    <el-row v-if="err.show">
      <p class="valid-title error-text">{{err.msg}}</p>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="6">
        <el-input v-model="code" @keyup.enter.native="doValid"></el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button @click="doValid">激活</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data () {
    return {
      code: '',
      err: {
        show: false,
        msg: ''
      },
      validList: [
        {
          code: '535-178-368',
          period: -1
        }
      ]
    }
  },
  methods: {
    doValid () {
      if (!this.code) {
        this.alert('请输入激活码', {type: 'error'})
        return
      }
      let v = this.validList.find(v => v.code === this.code)
      if (!v) {
        this.alert('激活码不正确,请联系邮箱: 535178368@qq.com ,获取', {type: 'error', period: -1})
        return
      }
      if (Number(v.period) === -1) {
        v.period = 300000
      }
      this.alert(`激活成功,本次激活可使用${v.period}天`, {
        type: 'success',
        callback: () => {
          CK.setCookie('valid_time', Date.now(), v.period)
          this.$router.replace({name: 'csdHome'})
        }
      })
    }
  },
  created () {
    request('https://lazyneo.github.io/electron-filereader/static/valid.json').then(res => {
      this.validList.push(...res)
    })
  }
}
</script>

<style lang="scss" scoped>
.valid-container{
  margin-top: 40vh;
}
.valid-title{
  text-align: center;
  width: 100vw;
}
</style>
