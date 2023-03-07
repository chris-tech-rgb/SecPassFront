// noinspection JSUnresolvedVariable

import { submit } from '@/api/form'

const actions = {
  // submit password
  submit(_, passwordInfo) {
    const { user, website, username, password, pin } = passwordInfo
    const CryptoJS = require('crypto-js')
    const encrypted_website = CryptoJS.AES.encrypt(website.trim(), pin).toString()
    const encrypted_username = CryptoJS.AES.encrypt(username.trim(), pin).toString()
    const encrypted_password = CryptoJS.AES.encrypt(password.trim(), pin).toString()
    let safety = '🔴'
    if (password.length >= 10 && /[^a-zA-Z0-9]/.test(password)) {
      if (password.length >= 16 && /[a-z]/.test(password) && /[A-Z]/.test(password)) {
        safety = '🟢'
      } else {
        safety = '🟡'
      }
    }
    return new Promise((resolve, reject) => {
      submit({ user: user.trim(), website: encrypted_website, username: encrypted_username, password: encrypted_password, safety: safety }).then(() => {
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

