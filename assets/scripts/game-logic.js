'use strict'
const store = require('./store')
const gameApi = require('./game-api/game-api')
const ui = require('./auth/ui')

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
  gameApi.getGameCount()
  event.preventDefault()
  $('#count').text(gameCount)
  $('#count').removeClass('hidden')
}
const winner = function () {
  store.game.game.over = true
  $('#Game').text(turn + ' is the winner')
  gameApi.updateGame(store.game)
  gameCount += 1
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
    $('#Game').text('Draw!')
    store.game.game.over = true
    gameApi.updateGame(store.game)
    gameCount += 1
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
      changeTurn()
    }
  } else if (store.game.game.over === true) {
    $('#message').text('Game is over')
  } else {
    $('#message').text('Invalid move')
  }
}

module.exports = {
  fillSpace,
  newGame,
  showCount
}
