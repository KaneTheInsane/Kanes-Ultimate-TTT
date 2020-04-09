'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const gameEvents = require('./game-events')
// const gameEventsNoAI = require('./game-events')
// const gameEventsAI = require('./game-events-ai')
const ui = require('./auth/ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // const newPvPGame = function (event) {
  //   event.preventDefault()
  //   console.log('PVP game')
  //   gameEvents = gameEventsNoAI
  //   gameEvents.newGame()
  // }
  // $('#pvp-game').on('submit', newPvPGame())
  // $('#ai-game').on('submit', function (event) {
  //   event.preventDefault()
  //   console.log('AI game')
  //   gameEvents = gameEventsAI
  //   gameEvents.newGame()
  // })

  // Move on game board
  $('.box').on('click', gameEvents.fillSpace)

  // Create new game
  $('#new-game').on('submit', gameEvents.newGame)

  // Show stats
  $('#stats-btn').on('click', gameEvents.showCount)

  // Account actions
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)
  $('#guest').on('submit', ui.guestLogin)

  // Dropdown menu close
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
