'use strict'
const store = require('./store')
const gameApi = require('./game-api/game-api')
const ui = require('./auth/ui')

const changeTurn = function () {
  $('#invalid-move-message').text('')
  if (store.pveTurn === 'Player') {
    store.pveTurn = 'AI'
    aiFillSpace()
    $('#game-state-span').text(store.pveTurn)
    $('#game-state-span').removeClass()
    $('#game-state-span').addClass('o')
  } else {
    store.pveTurn = 'Player'
    $('#game-state-span').text(store.pveTurn)
    $('#game-state-span').removeClass()
    $('#game-state-span').addClass('x')
  }
}

const showCount = function (event) {
  event.preventDefault()
  gameApi.getGameCount()
    .then(ui.getGameCountSuccess)
    .catch(ui.getGameCountFailure)
}

function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const winner = function () {
  store.game.game.over = true
  $('#game-state-message').text(store.pveTurn + ' is the winner')
  gameApi.updateGame(store.game)
}

const checkWin = function () {
  for (let i = 0; i < 8; i++) {
    if (store.winCondition[i].every(v => store.game.game.cells[v] === 'x') || store.winCondition[i].every(v => store.game.game.cells[v] === 'o')) {
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
  store.gameType = 'ai'
  console.log(store.gameType)
  store.pveTurn = 'Player'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const aiFillSpace = function () {
  const random = getRandomInt(9)
  console.log(random)
  if (store.game.game.cells[random] === '') {
    $(`.box[id=${random}]`).text('O')
    $(`.box[id=${random}]`).addClass('o')
    store.game.game.cells.splice(random, 1, 'o')
    console.log(store.game.game.cells)
    if (checkWin() === true) {
      winner()
    } else {
      checkDraw()
      if (store.game.game.over === false) {
        changeTurn()
      }
    }
  } else {
    console.log('space filled')
    aiFillSpace()
  }
}

const fillSpace = function (event) {
  event.preventDefault()
  // get the position in the aray that they moved to
  const position = event.target.id
  // get the curent text of the space the player chose
  const space = $(event.target).text()
  // if space is open
  if (space !== 'X' && space !== 'O' && store.game.game.over === false) {
    // add them to the boad
    $(event.target).text('X')
    // console.log(store.game)

    gameApi.updateGame({
      'game': {
        'cell': {
          'index': position,
          'value': store.pveTurn
        },
        'over': store.game.game.over
      }
    })
    let turnPiece = ''
    if (store.pveTurn === 'Player') {
      turnPiece = 'x'
      $(event.target).addClass('x')
    } else {
      turnPiece = 'o'
      $(event.target).addClass('o')
    }
    store.game.game.cells.splice(position, 1, turnPiece)
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

//
// const fillSpace = function (event) {
//   console.log('AI game move')
//   event.preventDefault()
//   const position = event.target.id
//   const space = $(event.target).text()
//   if (space !== 'X' && space !== 'O' && store.game.game.over === false) {
//     $(event.target).text('X')
//     gameApi.updateGame({
//       'game': {
//         'cell': {
//           'index': position,
//           'value': store.turn
//         },
//         'over': store.game.game.over
//       }
//     })
//
//     if (store.pveTurn === 'Player') {
//       $(event.target).addClass('x')
//     } else {
//       $(event.target).addClass('o')
//     }
//     store.game.game.cells.splice(position, 1, store.pveTurn)
//     if (checkWin() === true) {
//       winner()
//     } else {
//       checkDraw()
//       if (store.game.game.over === false) {
//         changeTurn()
//       }
//     }
//   } else if (store.game.game.over === true) {
//     $('#invalid-move-message').text('Game is over')
//   } else {
//     $('#invalid-move-message').text('Invalid move')
//   }
// }

module.exports = {
  fillSpace,
  newGame,
  showCount
}
