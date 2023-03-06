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

<style>

.item {
  width: 400px;
}

</style>
