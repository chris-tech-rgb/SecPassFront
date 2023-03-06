<template>
  <div class="app-container">
    <el-input v-model="key_word" class="search" placeholder="🔎︎ 搜索网址、用户名或密码" clearable @keyup.native="search" />
    <!--suppress VueUnrecognizedDirective, HtmlUnknownBooleanAttribute -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="网站">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <span>{{ scope.row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" width="200">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="密码" width="250">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <el-input v-model="scope.row.password" type="password" show-password onfocus="this.blur()" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="最后更新日期" width="100">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.last_update }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="安全性" width="100">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <!--suppress JSUnresolvedVariable -->
          <span>{{ scope.row.safety }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="usePIN" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">身份验证</h3>
        </div>
        <el-input v-model="pin" maxlength="6" placeholder="PIN" type="password" show-password clearable @keyup.enter.native="submitPIN" />
        <div class="confirm">
          <el-button @click="submitPIN">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--suppress JSUnresolvedFunction, JSUnresolvedVariable -->
<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      usePIN: true,
      pin: '',
      key_word: '',
      original_list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    submitPIN() {
      const CryptoJS = require('crypto-js')
      for (const row of this.list) {
        try {
          row.website = CryptoJS.AES.decrypt(row.website, this.pin).toString(CryptoJS.enc.Utf8)
          row.username = CryptoJS.AES.decrypt(row.username, this.pin).toString(CryptoJS.enc.Utf8)
          row.password = CryptoJS.AES.decrypt(row.password, this.pin).toString(CryptoJS.enc.Utf8)
        } catch (error) {
          row.website = null
          row.username = null
          row.password = null
        }
      }
      this.usePIN = false
      this.original_list = this.list
    },
    search() {
      if (this.key_word === '') {
        this.list = this.original_list
      } else {
        const new_list = []
        for (const row of this.original_list) {
          if (row.password.includes(this.key_word) || row.username.includes(this.key_word) || row.website.includes(this.key_word)) {
            new_list.push(row)
          }
        }
        this.list = new_list
      }
    }
  }
}
</script>

<style>
.popup {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup > div {
  background-color: #fff;
  padding: 100px;
  border-radius: 10px;
}

.title-container {
  position: relative;
}

.title {
  font-size: 18px;
  color: gray;
  margin: 0 auto 10px auto;
  text-align: center;
  font-weight: bold;
}

.confirm {
  margin: 10px auto 0 auto;
  text-align: center;
}

.search {
  width: 570px;
  margin-bottom: 20px;
}
</style>
