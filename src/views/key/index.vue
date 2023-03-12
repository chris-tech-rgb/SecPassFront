<template>
  <div class="app-container">
    <el-form ref="form" label-width="120px">
      <el-form-item label="密钥类型">
        <el-select v-model="key_type" @change="onChange">
          <el-option label="密码" value="password" />
          <el-option label="RSA" value="rsa" />
          <el-option label="AES" value="aes" />
        </el-select>
      </el-form-item>
      <!-- type: password -->
      <el-form-item v-if="key_type_selected.password" label="密码长度">
        <el-input-number v-model="password_form.length" />
      </el-form-item>
      <el-form-item v-if="key_type_selected.password" label="密码组成">
        <el-checkbox-group v-model="password_form.type">
          <el-checkbox label="数字" />
          <el-checkbox label="小写字母" />
          <el-checkbox label="大写字母" />
          <el-checkbox label="特殊符号" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="key_type_selected.password" label="排除易混淆字符">
        <el-switch v-model="password_form.exclude" />
      </el-form-item>
      <el-form-item v-if="key_type_selected.password" label="结果">
        <el-input v-model="password_form.output" type="textarea" />
      </el-form-item>
      <el-form-item v-if="key_type_selected.password">
        <el-button type="primary" @click="create">生成</el-button>
        <el-button @click="copy(password_form.output)">复制</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<!--suppress JSValidateTypes, JSDeprecatedSymbols -->
<script>
export default {
  data() {
    return {
      key_type: 'password',
      key_type_selected: {
        password: true,
        rsa: false,
        aes: false
      },
      password_form: {
        length: 16,
        type: ['数字', '小写字母', '大写字母', '特殊符号'],
        exclude: false,
        output: ''
      }
    }
  },
  methods: {
    onChange() {
      this.password_form.output = ''
      switch (this.key_type) {
        case 'password':
          this.key_type_selected.password = true
          this.key_type_selected.rsa = false
          this.key_type_selected.aes = false
          break
        case 'rsa':
          this.key_type_selected.password = false
          this.key_type_selected.rsa = true
          this.key_type_selected.aes = false
          break
        case 'aes':
          this.key_type_selected.password = false
          this.key_type_selected.rsa = false
          this.key_type_selected.aes = true
          break
      }
    },
    create() {
      let result = ''
      const numbers = '23456789'
      const lowercase = 'abcdefghjkmnpqrstuvwxyz'
      const uppercase = 'ABCDEFGHJKMNPQRSTUVWXYZ'
      const special = '!@#$%^&*_+=?'
      const similar_numbers = '10'
      const similar_lowercase = 'ilo'
      const similar_uppercase = 'ILO'
      const similar_special = '(){}[]/\\\'\"`~,;:.<>|-'
      let characters = ''
      if (this.password_form.type.length > 0 && this.password_form.length > 0) {
        if (this.password_form.exclude) {
          if (this.password_form.type.includes('数字')) {
            characters += numbers
          }
          if (this.password_form.type.includes('小写字母')) {
            characters += lowercase
          }
          if (this.password_form.type.includes('大写字母')) {
            characters += uppercase
          }
          if (this.password_form.type.includes('特殊符号')) {
            characters += special
          }
        } else {
          if (this.password_form.type.includes('数字')) {
            characters += numbers + similar_numbers
          }
          if (this.password_form.type.includes('小写字母')) {
            characters += lowercase + similar_lowercase
          }
          if (this.password_form.type.includes('大写字母')) {
            characters += uppercase + similar_uppercase
          }
          if (this.password_form.type.includes('特殊符号')) {
            characters += special + similar_special
          }
        }
        let counter = 0
        while (counter < this.password_form.length) {
          result += characters.charAt(Math.floor(Math.random() * characters.length))
          counter += 1
        }
        this.password_form.output = result
      }
    },
    copy(key) {
      if (key.length > 0) {
        // Create new element
        const el = document.createElement('textarea')
        // Set value (string to be copied)
        el.value = key
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
        this.$message('已复制')
      }
    }
  }
}
</script>

<style scoped>
</style>
