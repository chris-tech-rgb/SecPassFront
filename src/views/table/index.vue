<template>
  <div class="app-container">
    <el-input v-model="key_word" class="search" placeholder="๐๏ธ ๆ็ดข็ฝๅใ็จๆทๅๆๅฏ็ " clearable @keyup.native="search" />
    <!--suppress VueUnrecognizedDirective, HtmlUnknownBooleanAttribute -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="no-border"
    >
      <el-table-column align="center" label="็ฝ็ซ">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <span>{{ scope.row.website }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="็จๆทๅ" width="200">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ๅฏ็ " width="250">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <el-input v-model="scope.row.password" type="password" show-password onfocus="this.blur()" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="ๆๅๆดๆฐๆฅๆ" width="150">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.last_update }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ๅฎๅจๆง" width="100">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <!--suppress JSUnresolvedVariable -->
          <span>{{ scope.row.safety }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="editable" align="center" width="60">
        <!--suppress HtmlDeprecatedAttribute -->
        <template slot-scope="scope">
          <el-dropdown class="dropdown-container" trigger="click">
            <div class="image-wrapper">
              <img src="https://www.svgrepo.com/show/507793/more-vertical.svg" class="image" alt="">
            </div>
            <el-dropdown-menu>
              <el-dropdown-item divided class="no-border" @click.native="copy(scope.row.password)">
                <span style="display:block;">ๅคๅถๅฏ็ </span>
              </el-dropdown-item>
              <el-dropdown-item divided class="no-border" @click.native="edit(scope.row.website, scope.row.username, scope.row.uuid)">
                <span style="display:block;">็ผ่พๅฏ็ </span>
              </el-dropdown-item>
              <el-dropdown-item divided class="no-border" @click.native="remove(scope.row.uuid)">
                <span style="display:block;">็งป้ค</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="verify" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">่บซไปฝ้ช่ฏ</h3>
        </div>
        <el-input v-model="pin" maxlength="6" placeholder="PIN" type="password" show-password clearable @keyup.enter.native="submitPIN" />
        <div class="confirm">
          <el-button @click="submitPIN">็กฎ่ฎค</el-button>
        </div>
      </div>
    </div>

    <div v-if="edition" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">็ผ่พๅฏ็ </h3>
        </div>
        <el-form ref="form" :model="editForm">
          <el-form-item>
            <el-input
              v-model="editForm.website"
              placeholder="็ฝ็ซ"
              type="text"
              auto-complete="on"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="editForm.username"
              type="text"
              placeholder="็จๆทๅ"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="editForm.password"
              type="password"
              show-password
              placeholder="ๆฐๅฏ็ "
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="editForm.pin"
              type="password"
              show-password
              placeholder="PIN"
              clearable
              @keyup.enter.native="editCommit"
            />
          </el-form-item>
          <div class="confirm">
            <el-button type="primary" @click="editCommit">ๆไบค</el-button>
            <el-button @click="onCancel">ๅๆถ</el-button>
          </div>
        </el-form></div>
    </div>

    <div v-if="authentication" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">่บซไปฝ้ช่ฏ</h3>
        </div>
        <el-form ref="form" :model="loginForm">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="็จๆทๅ"
              type="text"
              auto-complete="on"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="ๅฏ็ "
              clearable
              @keyup.enter.native="authenticate"
            />
          </el-form-item>
          <div class="confirm">
            <el-button @click="authenticate">็กฎ่ฎค</el-button>
          </div>
        </el-form>
      </div>
    </div>

    <div v-if="removing" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">็งป้คๅฏ็ </h3>
        </div>
        <div class="confirm">
          <el-button type="primary" @click="removeCommit">็กฎ่ฎค</el-button>
          <el-button @click="cancelRemoving">ๅๆถ</el-button>
        </div>
      </div>
    </div>

    <div v-if="removing_authentication" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">่บซไปฝ้ช่ฏ</h3>
        </div>
        <el-form ref="form" :model="loginForm">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="็จๆทๅ"
              type="text"
              auto-complete="on"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="ๅฏ็ "
              clearable
              @keyup.enter.native="removingAuthenticate"
            />
          </el-form-item>
          <div class="confirm">
            <el-button @click="removingAuthenticate">็กฎ่ฎค</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<!--suppress JSUnresolvedFunction, JSUnresolvedVariable, JSUnusedLocalSymbols, JSValidateTypes, JSDeprecatedSymbols -->
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
      verify: true,
      edition: false,
      editable: true,
      removing: false,
      pin: '',
      key_word: '',
      original_list: null,
      editForm: {
        uuid: '',
        website: '',
        username: '',
        password: '',
        pin: ''
      },
      authentication: false,
      loginForm: {
        username: '',
        password: ''
      },
      removeForm: {
        uuid: ''
      },
      removing_authentication: false
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
          if (row.website === '' || row.username === '' || row.password === '') {
            this.editable = false
            this.$message({
              message: 'ไธๆญฃ็กฎ็PIN',
              type: 'warning'
            })
          }
        } catch (error) {
          row.website = null
          row.username = null
          row.password = null
          this.editable = false
          this.$message({
            message: 'ไธๆญฃ็กฎ็PIN',
            type: 'warning'
          })
        }
      }
      this.verify = false
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
    },
    copy(password) {
      // Create new element
      const el = document.createElement('textarea')
      // Set value (string to be copied)
      el.value = password
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute('readonly', '')
      el.style = { position: 'absolute', left: '-9999px' }
      document.body.appendChild(el)
      // Select text inside element
      el.select()
      // Copy text to clipboard
      document.execCommand('copy')
      // Remove temporary element
      document.body.removeChild(el)
    },
    edit(website, username, uuid) {
      this.editForm.uuid = uuid
      this.editForm.website = website
      this.editForm.username = username
      this.editForm.password = ''
      this.editForm.pin = ''
      this.authentication = true
    },
    editCommit() {
      this.$store.dispatch('password/update', this.editForm).then(() => {
      }).catch(() => {
      })
      this.edition = false
      this.$message('ๅทฒ็ผ่พ๏ผ่ฏทๅทๆฐๅๆฅ็')
      this.editable = false
    },
    onCancel() {
      this.edition = false
    },
    authenticate() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$message('้ช่ฏๆๅ')
        this.loginForm.username = ''
        this.loginForm.password = ''
        this.authentication = false
        this.edition = true
      }).catch(() => {
      })
    },
    remove(uuid) {
      this.removeForm.uuid = uuid
      this.removing_authentication = true
    },
    removeCommit() {
      this.$store.dispatch('password/delete', this.removeForm).then(() => {
      }).catch(() => {
      })
      this.removing = false
      this.$message('ๅทฒ็งป้ค๏ผ่ฏทๅทๆฐๅๆฅ็')
      this.editable = false
    },
    cancelRemoving() {
      this.removing = false
    },
    removingAuthenticate() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$message('้ช่ฏๆๅ')
        this.loginForm.username = ''
        this.loginForm.password = ''
        this.removing_authentication = false
        this.removing = true
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.no-border {
  border: none;
}

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
  margin: 0 auto 15px auto;
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

.dropdown-container {
  margin-right: 30px;

  .image-wrapper {
    margin-top: 5px;
    position: relative;

    .image{
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
