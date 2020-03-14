'use strict'
const store = require('./store')
const gameApi = require('./game-api/game-api')
const ui = require('./auth/ui')

let turn = 'X'

const changeTurn = function () {
  $('#invalid-move-message').text('')
  if (turn === 'X') {
    turn = 'O'
    $('#game-state-message').text('Turn: O')
  } else {
    turn = 'X'
    $('#game-state-message').text('Turn: X')
  }
}
const showCount = function (event) {
  event.preventDefault()
  gameApi.getGameCount()
    .then(ui.getGameCountSuccess)
    .catch(ui.getGameCountFailure)
}

const winner = function () {
  store.game.game.over = true
  $('#game-state-message').text(turn + ' is the winner')
  gameApi.updateGame(store.game)
}

const checkWin = function () {
  for (let i = 0; i < 8; i++) {
    if (store.winCondition[i].every(v => store.game.game.cells[v] === 'X') || store.winCondition[i].every(v => store.game.game.cells[v] === 'O')) {
      winner()
    }
  }
}
const checkDraw = function () {
  if ((store.game.game.cells.every(v => v !== '')) && (store.game.game.over === false)) {
    $('#game-state-message').text('Draw!')
    store.game.game.over = true
    gameApi.updateGame(store.game)
  }
}

const newGame = function (event) {
  event.preventDefault()
  turn = 'X'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const fillSpace = function (event) {
  event.preventDefault()
  // get the position in the aray that they moved to
  const position = event.target.id
  // get the curent text of the space the y chose
  const space = $(event.target).text()
  // if space is open
  if (space !== 'X' && space !== 'O' && store.game.game.over === false) {
    // add them to the boad
    $(event.target).text(turn)
    gameApi.updateGame(store.game)
    if (turn === 'X') {
      $(event.target).addClass('x')
    } else {
      $(event.target).addClass('o')
    }
    store.game.game.cells.splice(position, 1, turn)
    // console.log(store.game.game.cells)
    // check for winner
    if (checkWin() === true) {
      winner()
    } else {
      checkDraw()
      if (store.game.game.over === false) {
        changeTurn()
      }
    }
  } else if (store.game.game.over === true) {
    $('#invalid-move-message').text('Game is over')
  } else {
    $('#invalid-move-message').text('Invalid move')
  }
}

module.exports = {
  fillSpace,
  newGame,
  showCount
}
