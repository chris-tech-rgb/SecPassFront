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
        <el-input v-model="password_form.output" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.password">
        <el-button type="primary" @click="create">生成</el-button>
        <el-button @click="copy(password_form.output)">复制</el-button>
      </el-form-item>
      <!-- type: rsa -->
      <el-form-item v-if="key_type_selected.rsa" label="功能">
        <el-radio-group v-model="rsa_form.func" @change="rsaFunc">
          <el-radio label="密钥对生成" />
          <el-radio label="加密" />
          <el-radio label="解密" />
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.key_pair" label="密钥长度">
        <el-select v-model="rsa_form.length">
          <el-option label="512" value="512" />
          <el-option label="1024" value="1024" />
          <el-option label="2048" value="2048" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.key_pair" label="公钥">
        <el-input v-model="rsa_form.key_pair.public_key" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.key_pair" label="私钥">
        <el-input v-model="rsa_form.key_pair.private_key" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.key_pair">
        <el-button type="primary" @click="rsaKeyPair">生成</el-button>
        <el-button @click="copy(rsa_form.key_pair.public_key)">复制公钥</el-button>
        <el-button @click="copy(rsa_form.key_pair.private_key)">复制私钥</el-button>
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.encrypt" label="明文">
        <el-input v-model="rsa_form.message.plain" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.encrypt" label="公钥">
        <el-input v-model="rsa_form.key_pair.public_key" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.encrypt" label="结果">
        <el-input v-model="rsa_form.message.output" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.encrypt">
        <el-button type="primary" @click="encrypt">生成</el-button>
        <el-button @click="copy(rsa_form.message.output)">复制</el-button>
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.decrypt" label="密文">
        <el-input v-model="rsa_form.message.encrypted" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.decrypt" label="私钥">
        <el-input v-model="rsa_form.key_pair.private_key" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.decrypt" label="结果">
        <el-input v-model="rsa_form.message.output" type="textarea" autosize />
      </el-form-item>
      <el-form-item v-if="key_type_selected.rsa && rsa_form.func_selected.decrypt">
        <el-button type="primary" @click="decrypt">生成</el-button>
        <el-button @click="copy(rsa_form.message.output)">复制</el-button>
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
      },
      rsa_form: {
        length: '1024',
        func: '密钥对生成',
        func_selected: {
          key_pair: true,
          encrypt: false,
          decrypt: false
        },
        key_pair: {
          public_key: '',
          private_key: ''
        },
        message: {
          plain: '',
          encrypted: '',
          output: ''
        }
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
    rsaFunc() {
      this.rsa_form.key_pair.public_key = ''
      this.rsa_form.key_pair.private_key = ''
      this.rsa_form.message.plain = ''
      this.rsa_form.message.encrypted = ''
      this.rsa_form.message.output = ''
      switch (this.rsa_form.func) {
        case '密钥对生成':
          this.rsa_form.func_selected.key_pair = true
          this.rsa_form.func_selected.encrypt = false
          this.rsa_form.func_selected.decrypt = false
          break
        case '加密':
          this.rsa_form.func_selected.key_pair = false
          this.rsa_form.func_selected.encrypt = true
          this.rsa_form.func_selected.decrypt = false
          break
        case '解密':
          this.rsa_form.func_selected.key_pair = false
          this.rsa_form.func_selected.encrypt = false
          this.rsa_form.func_selected.decrypt = true
          break
      }
    },
    rsaKeyPair() {
      const NodeRSA = require('node-rsa')
      const key = new NodeRSA({ b: parseInt(this.rsa_form.length) })
      this.rsa_form.key_pair.public_key = key.exportKey('public')
      this.rsa_form.key_pair.private_key = key.exportKey('pkcs8')
    },
    encrypt() {
      if (this.rsa_form.message.plain.length > 0 && this.rsa_form.key_pair.public_key.length > 0) {
        const NodeRSA = require('node-rsa')
        const key = new NodeRSA(this.rsa_form.key_pair.public_key)
        this.rsa_form.message.output = key.encrypt(this.rsa_form.message.plain, 'base64', 'utf8')
      }
    },
    decrypt() {
      if (this.rsa_form.message.encrypted.length > 0 && this.rsa_form.key_pair.private_key.length > 0) {
        const NodeRSA = require('node-rsa')
        const key = new NodeRSA(this.rsa_form.key_pair.private_key)
        this.rsa_form.message.output = key.decrypt(this.rsa_form.message.encrypted, 'buffer')
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
