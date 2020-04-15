'use strict'

const store = require('../store')

const signUpSuccess = function (data) {
  $('#api-message').text('Signed up successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  store.user = data.user
  // future auto sign in
  // setTimeout((signInSuccess(data)), 2000)
  // console.log('signUpSuccess data is: ', data)
}

const signUpFailure = function () {
  $('#api-message').text('Error on sign up')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signUpFailure error is: ', error)
}

const signInSuccess = function (data) {
  // console.log(data)
  $('#api-message').text('Welcome ' + data.user.email + '!')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#stats-btn').removeClass('hidden')
  $('#new-game-btn').removeClass('hidden')
  $('#change-password-btn').removeClass('hidden')
  $('#sign-out-btn').removeClass('hidden')
  $('#about-menu').removeClass('hidden')
  $('#sign-in-menu').addClass('hidden')
  $('#sign-up-menu').addClass('hidden')
  $('#guest').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signInSuccess data is: ', data)
  store.user = data.user
}

const signInGuestSuccess = function (data) {
  // console.log(data)
  $('#api-message').text('Welcome Guest!')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#new-game-btn').removeClass('hidden')
  $('#sign-out-btn').removeClass('hidden')
  $('#about-menu').removeClass('hidden')
  $('#sign-in-menu').addClass('hidden')
  $('#sign-up-menu').addClass('hidden')
  $('#guest').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signInSuccess data is: ', data)
  store.user = data.user
}

const signInFailure = function () {
  $('#api-message').text('Error on sign in')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('signInFailure error is: ', error)
}

const changePasswordSuccess = function (data) {
  $('#api-message').text('Password changed successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('changePasswordSuccess data is: ', data)
}

const changePasswordFailure = function () {
  $('#api-message').text('Error on change password')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  // console.log('changePasswordFailure error is: ', error)
}

const signOutSuccess = function (data) {
  $('#api-message').text('Signed out successfully')
  $('#api-message').removeClass()
  $('#api-message').addClass('success')
  $('#sign-in-menu').removeClass('hidden')
  $('#sign-up-menu').removeClass('hidden')
  $('.container').addClass('hidden')
  $('#change-password-btn').addClass('hidden')
  $('#new-game-btn').addClass('hidden')
  $('#stats-btn').addClass('hidden')
  $('#sign-out-btn').addClass('hidden')
  $('#guest').removeClass('hidden')
  $('.box').text('')
  $('#game-state-message').text('')
  $('#invalid-move-message').text('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('#about-menu').addClass('hidden')
  // console.log('signOutSuccess data is: ', data)
}

const signOutFailure = function () {
  $('#api-message').text('Error on sign out')
  $('#api-message').removeClass()
  $('#api-message').addClass('failure')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
//   console.log('signOutFailure error is: ', error)
}

const newGameSuccess = function (gameData) {
  // console.log(gameData)
  $('.container').removeClass('hidden')
  $('#game-state-message').removeClass('hidden')
  $('.easter-egg').addClass('hidden')
  // $('#game-state-span').addClass('x')
  // $('#game-state-span').text('X')
  $('.box').text('')
  $('.box').removeClass('x')
  $('.box').removeClass('o')
  $('#invalid-move-message').removeClass()
  if (store.gameType === 'pvp') {
    $('#game-state-message').text('Turn: X')
  }
  // $('#game-state-message').append(store.span)
  // $('#game-state-span').text('X')
  $('#invalid-move-message').html('&nbsp;')
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
  // console.log(store)
  console.log(data)
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
  getGameCountFailure,
  signInGuestSuccess
}
