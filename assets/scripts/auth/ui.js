'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#api-message').text('Signed up successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  store.user = data.user
  // future auto sign in
  // setTimeout((signInSuccess(data)), 2000)
  // console.log('signUpSuccess data is: ', data)
}

const signUpFailure = function () {
  $('#api-message').text('Error on sign up')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  // console.log('signUpFailure error is: ', error)
}

const signInSuccess = function (data) {
  $('#api-message').text('You are signed in!')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#stats-btn').removeClass('hidden')
  $('#new-game-btn').removeClass('hidden')
  $('#change-password-btn').removeClass('hidden')
  $('#sign-out-btn').removeClass('hidden')
  $('#sign-in-btn').addClass('hidden')
  $('#sign-up-btn').addClass('hidden')
  $('#guest').addClass('hidden')
  // console.log('signInSuccess data is: ', data)
  store.user = data.user
}

const signInFailure = function () {
  $('#api-message').text('Error on sign in')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  // console.log('signInFailure error is: ', error)
}

const changePasswordSuccess = function (data) {
  $('#api-message').text('Password changed successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  // console.log('changePasswordSuccess data is: ', data)
}

const changePasswordFailure = function () {
  $('#api-message').text('Error on change password')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  // console.log('changePasswordFailure error is: ', error)
}

const signOutSuccess = function (data) {
  $('#api-message').text('Signed out successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#sign-in-btn').removeClass('hidden')
  $('#sign-up-btn').removeClass('hidden')
  $('.container').addClass('hidden')
  $('#change-password-btn').addClass('hidden')
  $('#new-game-btn').addClass('hidden')
  $('#stats-btn').addClass('hidden')
  $('#sign-out-btn').addClass('hidden')
  $('.box').text('')
  $('#game-state-message').text('')
  $('#invalid-move-message').text('')
  // console.log('signOutSuccess data is: ', data)
}

const signOutFailure = function () {
  $('#api-message').text('Error on sign out')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
//   console.log('signOutFailure error is: ', error)
}

const newGameSuccess = function (gameData) {
  // console.log(gameData)
  $('.container').removeClass('hidden')
  $('.box').text('')
  $('.box').removeClass('x')
  $('.box').removeClass('o')
  $('#invalid-move-message').removeClass()
  $('#game-state-message').text('Turn: X')
  $('#invalid-move-message').text('')
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

const getGameCountSuccess = function (data) {
  // console.log(data)
  store.gameCount = data.games.length
  // console.log(store.gameCount)
  $('#count').text('You have played ' + store.gameCount + ' games!')
}

const getGameCountFailure = function () {

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
  guestLogin,
  getGameCountSuccess,
  getGameCountFailure
}
