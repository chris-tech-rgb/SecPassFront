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
    return new Promise((resolve, reject) => {
      submit({ user: user.trim(), website: encrypted_website, username: encrypted_username, password: encrypted_password }).then(() => {
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

