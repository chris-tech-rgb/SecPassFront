<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="网站">
        <el-input v-model="form.website" class="item" clearable />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" class="item" clearable />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" class="item" type="password" show-password clearable />
      </el-form-item>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="PIN为6位及以下自设字符"
        placement="bottom-start"
      >
        <el-form-item label="PIN">
          <el-input v-model="form.pin" class="item" maxlength="6" type="password" show-password clearable />
        </el-form-item>
      </el-tooltip>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>

    <div v-if="authentication" class="popup">
      <div>
        <div class="title-container">
          <h3 class="title">身份验证</h3>
        </div>
        <el-form ref="form" :model="loginForm">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="authenticate"
            />
          </el-form-item>
          <div class="confirm">
            <el-button @click="authenticate">确认</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authentication: true,
      loginForm: {
        username: '',
        password: ''
      },
      form: {
        website: '',
        username: '',
        password: '',
        pin: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('user/login', this.form)
      this.$message('已提交')
    },
    onCancel() {
      this.form.website = ''
      this.form.username = ''
      this.form.password = ''
      this.form.pin = ''
      this.$message({
        message: '已取消',
        type: 'warning'
      })
    },
    authenticate() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$message('验证成功')
        this.authentication = false
      }).catch(() => {
      })
    }
  }
}
</script>

<style>

.item {
  width: 400px;
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
  margin: 0 auto 20px auto;
  text-align: center;
  font-weight: bold;
}

.confirm {
  margin: 10px auto 0 auto;
  text-align: center;
}

</style>
