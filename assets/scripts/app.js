'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const store = require('./store')
const authEvents = require('./auth/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  let gameCount = 0
  let turn = 'X'

  const changeTurn = function () {
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }
  const showCount = function (event) {
    event.preventDefault()
    $('#count').text(gameCount)
    $('#count').removeClass('hidden')
  }
  const winner = function () {
    store.gameOver = true
    $('#Game').text(turn + ' is the winner')
    gameCount += 1
  }

  const checkWin = function () {
    for (let i = 0; i < 8; i++) {
      if (store.winCondition[i].every(v => store.gameState[v] === 'X') || store.winCondition[i].every(v => store.gameState[v] === 'O')) {
        winner()
      }
    }
  }
  const checkDraw = function () {
    if ((store.gameState.every(v => v !== '')) && (store.gameOver === false)) {
      $('#Game').text('Draw!')
      store.gameOver = true
      gameCount += 1
    }
  }

  const newGame = function (event) {
    event.preventDefault()
    $('.container').removeClass('hidden')
    $('.box').text('')
    $('.box').removeClass('x')
    $('.box').removeClass('o')
    $('#Game').text('')
    $('#message').text('')
    store.gameState = ['', '', '', '', '', '', '', '', '']
    store.gameOver = false
  }

  const fillSpace = function (event) {
    event.preventDefault()
    // get the position in the aray that they moved to
    const position = event.target.id
    // get the curent text of the space the y chose
    const space = $(event.target).text()
    // if space is open
    if (space !== 'X' && space !== 'O' && store.gameOver === false) {
      // add them to the boad
      $(event.target).text(turn)
      if (turn === 'X') {
        $(event.target).addClass('x')
      } else {
        $(event.target).addClass('o')
      }
      store.gameState.splice(position, 1, turn)
      console.log(store.gameState)
      // check for winner
      if (checkWin() === true) {
        winner()
      } else {
        checkDraw()
        changeTurn()
      }
    } else if (store.gameOver === true) {
      $('#message').text('Game is over')
    } else {
      $('#message').text('invalid move')
    }
  }

  $('.box').on('click', fillSpace)
  $('#new-game').on('submit', newGame)
  $('#game-count').on('submit', showCount)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)
})
