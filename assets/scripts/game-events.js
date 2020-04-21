'use strict'
const store = require('./store')
const gameApi = require('./game-api/game-api')
const ui = require('./auth/ui')

const changeTurn = function () {
  $('#invalid-move-message').html('&nbsp;')
  if (store.turn === 'X') {
    store.turn = 'O'
    $('#game-state-message').text('Turn: ' + store.turn)
    $('#game-state-span').removeClass()
    $('#game-state-span').addClass('o')
  } else {
    store.turn = 'X'
    $('#game-state-message').text('Turn: ' + store.turn)
    $('#game-state-span').removeClass()
    $('#game-state-span').addClass('x')
  }
}

const winner = function () {
  store.game.game.over = true
  $('#game-state-message').text(store.turn + ' is the winner')
  gameApi.updateGame(store.game)
  $('.easter-egg').removeClass('hidden')
  $('#invalid-move-message').html('Game is over <button class="btn btn-outline-light restart">restart?</button>')
}

const checkWin = function () {
  for (let i = 0; i < 8; i++) {
    if (store.winCondition[i].every(v => store.game.game.cells[v] === 'X') || store.winCondition[i].every(v => store.game.game.cells[v] === 'O')) {
      winner()
    }
  }
}
const checkDraw = function () {
  if ((store.game.game.cells.every(v => typeof v !== 'number')) && (store.game.game.over === false)) {
    $('#game-state-message').text('Draw!')
    $('#invalid-move-message').html('Game is over <button class="btn btn-outline-light restart">restart?</button>')
    store.game.game.over = true
    gameApi.updateGame(store.game)
  }
}

const newGame = function (event) {
  event.preventDefault()
  store.gameType = 'pvp'
  $('#player-2-label').text('Player 2: O')
  $('#player-1-label').text('Player 1: X')
  $('#right-box').addClass('player-box Randometric-box Mechanico-box Minimaximus-box')
  $('#left-box').addClass('player-box Randometric-box Mechanico-box Minimaximus-box')
  $('#right-box').removeClass('player-box Randometric-box Mechanico-box Minimaximus-box')
  $('#left-box').removeClass('player-box Randometric-box Mechanico-box Minimaximus-box')
  $('#right-box').addClass('player-box')
  $('#left-box').addClass('player-box')
  console.log(store.gameType)
  store.turn = 'X'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const fillSpace = function (event) {
  console.log(store.game.game.cells)
  event.preventDefault()
  // get the position in the aray that they moved to
  const position = event.target.id
  // get the curent text of the space the y chose
  const space = $(event.target).text()
  // if space is open
  if (space !== 'X' && space !== 'O' && store.game.game.over === false) {
    // add them to the boad
    $(event.target).text(store.turn)
    // console.log(store.game)

    gameApi.updateGame({
      'game': {
        'cell': {
          'index': position,
          'value': store.turn
        },
        'over': store.game.game.over
      }
    })

    if (store.turn === 'X') {
      $(event.target).addClass('x')
    } else {
      $(event.target).addClass('o')
    }
    store.game.game.cells.splice(position, 1, store.turn)
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
    $('#invalid-move-message').html('Game is over <button class="btn btn-outline-light restart">restart?</button>')
  } else {
    $('#invalid-move-message').text('Invalid move')
  }
}

module.exports = {
  fillSpace,
  newGame
}
