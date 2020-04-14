'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
// const gameEvents = require('./game-events')
const gameEventsNoAI = require('./game-events')
const gameEventsAI = require('./game-events-ai')
const ui = require('./auth/ui')
const store = require('./store.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#pvp-game').on('click', gameEventsNoAI.newGame)
  $('#ai-game').on('click', gameEventsAI.newGame)

  // Move on game board
  $('.box').on('click', function (event) {
    if (store.gameType === 'pvp') {
      console.log('pvp click')
      gameEventsNoAI.fillSpace(event)
    } else {
      gameEventsAI.fillSpace(event)
    }
  })

  // Create new game
  // $('#new-game').on('submit', gameEventsNoAI.newGame)

  // Show stats
  $('#stats-btn').on('click', gameEventsNoAI.showCount)

  // guest login
  $('#guest').on('click', authEvents.onGuestSignIn)
  // Account actions
  $('#sign-up-btn').on('click', authEvents.onSignUp)
  $('#sign-in-btn').on('click', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)
  $('#guest').on('submit', ui.guestLogin)

  // restart Button
  $('.message-box').on('click', '.restart', function (event) {
    if (store.gameType === 'pvp') {
      gameEventsNoAI.newGame(event)
    } else {
      gameEventsAI.newGame(event)
    }
  })
})
