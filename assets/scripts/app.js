'use strict'

const authEvents = require('./auth/events.js')
const statEvents = require('./game-api/events.js')
const gameEventsNoAI = require('./game-events')
const gameEventsAI = require('./game-events-ai')
const store = require('./store.js')

$(() => {
  // Guest login
  $('#guest').on('click', authEvents.onGuestSignIn)

  // Account actions
  $('#sign-up-btn').on('click', authEvents.onSignUp)
  $('#sign-in-btn').on('click', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out-btn').on('submit', authEvents.onSignOut)

  // Create new game
  $('#pvp-game').on('click', gameEventsNoAI.newGame)
  $('#easy-ai-game').on('click', gameEventsAI.setAiEasy)
  $('#medium-ai-game').on('click', gameEventsAI.setAiMed)
  $('#hard-ai-game').on('click', gameEventsAI.setAiHard)

  // Show stats
  $('#stats-btn').on('click', statEvents.showCount)

  // Move on game board
  $('.box').on('click', function (event) {
    if (store.gameType === 'pvp') {
      console.log('pvp click')
      gameEventsNoAI.fillSpace(event)
    } else {
      gameEventsAI.huMove(event)
    }
  })

  // Restart Button
  $('.message-box').on('click', '.restart', function (event) {
    if (store.gameType === 'pvp') {
      gameEventsNoAI.newGame(event)
    } else {
      gameEventsAI.newGame(event)
    }
  })
})
