<template lang="html">
  <div class="container">
    <el-row>
      <el-col :span="4">
        <el-button @click="choose" type="success">目录选择</el-button>
      </el-col>
      <el-col class="dir-container" :span="16">目录：{{directory}}</el-col>
      <el-col :span="4">
          <el-button type="primary" icon="el-icon-refresh" circle @click="readdir"></el-button>
      </el-col>
    </el-row>
   <el-input v-model="filter" placeholder="请输入内容进行筛选"></el-input>
   <ul class="file-list">
     <li class="item" v-for="(item,index) of fileList" @click="gotoItem(item)">{{item}}</li>
   </ul>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
const {dialog} = require('electron').remote
export default {
  name: 'csdHome',
  data () {
    return {
      filter: '',
      directory: '',
      list: []
    }
  },
  methods: {
    choose () {
      dialog.showOpenDialog({
        properties: ['openDirectory']
      },
      path => {
        if (!path || path.length === 0) {
          return
        }
        this.chooseDir(path[0])
      })
    },
    chooseDir (path) {
      this.directory = path
      this.readdir()
    },
    readdir () {
      fs.readdir(this.directory, (err, files) => {
        if (err) {
          this.alert('读取失败', {type: 'error'})
          return
        }
        this.list = files
      })
    },
    gotoItem (item) {
      this.$router.push({
        name: 'chenshidanItem',
        params: {
          dir: encodeURIComponent(path.join(this.directory, item))
        }
      })
    }
  },
  computed: {
    fileList () {
      if (!this.filter) {
        return this.list
      }
      let l = []
      let f = this.filter.toUpperCase()
      for (const t of this.list) {
        if (t.startsWith(f)) {
          l.push(t)
        }
      }
      return l
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    overflow-y: scroll;
  }
  .file-list{
    padding-left: 10%;
    .item{
      padding: 2px 0;
    }
  }
  .dir-container{
    height: 41px;
    line-height: 41px;
    text-align: center;
  }
</style>
