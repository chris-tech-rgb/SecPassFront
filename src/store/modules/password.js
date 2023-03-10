import { submit, edit } from '@/api/form'

function assess(password) {
  let safety = '🔴'
  if (password.length >= 10 && /[^a-zA-Z0-9]/.test(password)) {
    if (password.length >= 16 && /[a-z]/.test(password) && /[A-Z]/.test(password)) {
      safety = '🟢'
    } else {
      safety = '🟡'
    }
  }
  return safety
}

// noinspection JSUnresolvedVariable
const actions = {
  // submit password
  submit(_, passwordInfo) {
    const { user, website, username, password, pin } = passwordInfo
    const CryptoJS = require('crypto-js')
    // noinspection JSUnresolvedVariable
    const encrypted_website = CryptoJS.AES.encrypt(website.trim(), pin).toString()
    // noinspection JSUnresolvedVariable
    const encrypted_username = CryptoJS.AES.encrypt(username.trim(), pin).toString()
    // noinspection JSUnresolvedVariable
    const encrypted_password = CryptoJS.AES.encrypt(password.trim(), pin).toString()
    const safety = assess(password)
    return new Promise((resolve, reject) => {
      submit({ user: user.trim(), website: encrypted_website, username: encrypted_username, password: encrypted_password, safety: safety }).then(() => {
      }).catch(error => {
        reject(error)
      })
    })
  },
  // update password
  update(_, passwordInfo) {
    const { uuid, website, username, password, pin } = passwordInfo
    const CryptoJS = require('crypto-js')
    // noinspection JSUnresolvedVariable
    const encrypted_website = CryptoJS.AES.encrypt(website.trim(), pin).toString()
    // noinspection JSUnresolvedVariable
    const encrypted_username = CryptoJS.AES.encrypt(username.trim(), pin).toString()
    // noinspection JSUnresolvedVariable
    const encrypted_password = CryptoJS.AES.encrypt(password.trim(), pin).toString()
    const safety = assess(password)
    return new Promise((resolve, reject) => {
      edit({ uuid: uuid, website: encrypted_website, username: encrypted_username, password: encrypted_password, safety: safety }).then(() => {
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

