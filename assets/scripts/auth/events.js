'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields($('#sign-up')[0])
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  // console.log('Signing in')
  const data = getFormFields($('#sign-in')[0])
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  // console.log('Change password')
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  // console.log('Sign out')
  if (store.guestAccount === false) {
    api.signOut()
      .then(ui.signOutSuccess)
      .catch(ui.signOutFailure)
  } else {
    ui.signInSuccess()
  }
}

const onGuestSignIn = function (event) {
  event.preventDefault()
  // console.log('Signing in')
  const data = { credentials: {
    email: 'guest',
    password: 'guest'
  }
  }
  api.signIn(data)
    .then(ui.signInGuestSuccess)
    .catch(ui.signInFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onGuestSignIn
}
