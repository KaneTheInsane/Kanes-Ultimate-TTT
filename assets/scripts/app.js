'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const gameEvents = require('./game-events')
const ui = require('./auth/ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.box').on('click', gameEvents.fillSpace)
  $('#new-game').on('submit', gameEvents.newGame)
  $('#stats-btn').on('click', gameEvents.showCount)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)
  $('#guest').on('submit', ui.guestLogin)
  $('#sign-in-drop').on('submit', function () {
    $('#sign-in-btn').dropdown('toggle')
  })
  $('#new-game-drop').on('submit', function () {
    $('#new-game-btn').dropdown('toggle')
  })
  $('#sign-up-drop').on('submit', function () {
    $('#sign-up-btn').dropdown('toggle')
  })
  $('#change-password-drop').on('submit', function () {
    $('#change-password-btn').dropdown('toggle')
  })
})
