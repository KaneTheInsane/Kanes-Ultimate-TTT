'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#message-2').text('Signed up successfully')
  $('#message-2').removeClass()
  $('#message-2').addClass('success')
  // future auto sign in
  // setTimeout((signInSuccess(data)), 2000)
  // console.log('signUpSuccess data is: ', data)
}

const signUpFailure = function () {
  $('#message-2').text('Error on sign up')
  $('#message-2').removeClass()
  $('#message-2').addClass('failure')
  // console.log('signUpFailure error is: ', error)
}

const signInSuccess = function (data) {
  $('#message-2').text('You are signed it!')
  $('#message-2').removeClass()
  $('#message-2').addClass('success')
  $('#game-count').removeClass('hidden')
  $('#new-game').removeClass('hidden')
  $('#change-password').removeClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#sign-in').addClass('hidden')
  $('#sign-up').addClass('hidden')
  $('#guest').addClass('hidden')
  // console.log('signInSuccess data is: ', data)
  store.user = data.user
}

const signInFailure = function () {
  $('#message-2').text('Error on sign in')
  $('#message-2').removeClass()
  $('#message-2').addClass('failure')
  // console.log('signInFailure error is: ', error)
}

const changePasswordSuccess = function (data) {
  $('#message-2').text('Password changed successfully')
  $('#message-2').removeClass()
  $('#message-2').addClass('success')
  // console.log('changePasswordSuccess data is: ', data)
}

const changePasswordFailure = function () {
  $('#message-2').text('Error on change password')
  $('#message-2').removeClass()
  $('#message-2').addClass('failure')
  // console.log('changePasswordFailure error is: ', error)
}

const signOutSuccess = function (data) {
  $('#message-2').text('Signed out successfully')
  $('#message-2').removeClass()
  $('#message-2').addClass('success')
  $('#sign-in').removeClass('hidden')
  $('#sign-up').removeClass('hidden')
  $('.container').addClass('hidden')
  $('#change-password').addClass('hidden')
  $('#new-game').addClass('hidden')
  $('#game-count').addClass('hidden')
  $('#sign-out').addClass('hidden')
  $('.box').text('')
  $('#Game').text('')
  $('#message').text('')
  $('#count').addClass('hidden')
  // console.log('signOutSuccess data is: ', data)
}

const signOutFailure = function () {
  $('#message-2').text('Error on sign out')
  $('#message-2').removeClass()
  $('#message-2').addClass('failure')
//   console.log('signOutFailure error is: ', error)
}

const newGameSuccess = function (gameData) {
  // console.log(gameData)
  $('.container').removeClass('hidden')
  $('.box').text('')
  $('.box').removeClass('x')
  $('.box').removeClass('o')
  $('#Game').text('')
  $('#message').text('')
  store.game = gameData
  // console.log(gameData.game.id)
  store.currentID = gameData.game.id
}

const newGameFailure = function () {
  $('#message').text('')
}

const guestLogin = function (event) {
  event.preventDefault()
  store.guestAccount = true
  $('#message-2').text('Welcome Guest')
  $('#message-2').removeClass()
  $('#message-2').addClass('success')
  $('#game-count').removeClass('hidden')
  $('#new-game').removeClass('hidden')
  $('#sign-out').removeClass('hidden')
  $('#sign-in').addClass('hidden')
  $('#sign-up').addClass('hidden')
  $('#guest').addClass('hidden')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  newGameSuccess,
  newGameFailure,
  guestLogin
}
