<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="网站">
        <el-input v-model="form.website" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" show-password="false" />
      </el-form-item>
      <el-form-item label="PIN">
        <el-input v-model="form.pin" maxlength="6" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  }
}
</script>
