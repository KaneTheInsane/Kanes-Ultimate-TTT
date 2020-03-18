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

const checkCorners = function () {
  for (let i = 0; i < 4; i++) {
    if (store.corners[i].some(v => store.game.game.cells[v] === '')) {
      return true
    } else {
      return false
    }
  }
}

const checkSides = function () {
  for (let i = 0; i < 4; i++) {
    if (store.sides[i].some(v => store.game.game.cells[v] === '')) {
      return true
    } else {
      return false
    }
  }
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
  store.turn = 'Player'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const aiFillSpace = function () {
  if ((store.game.game.over === false) && (store.game.game.cells[4] === '')) {
    $('#4').text('O')
    store.game.game.cells.splice(4, 1, store.pveTurn)
    // console.log(store.pveTurn)
  } else if (store.game.game.over === false && checkCorners() === true) {
    const space = getRandomInt(3)
    if ((space === 0) && (store.game.game.cells[0] === '')) {
      $('#0').text('O')
    } else if ((space === 1) && (store.game.game.cells[2] === '')) {
      $('#2').text('O')
    } else if ((space === 2) && (store.game.game.cells[6] === '')) {
      $('#6').text('O')
    } else if ((space === 3) && (store.game.game.cells[8] === '')) {
      $('#8').text('O')
    }
  } else if (store.game.game.over === false && checkSides() === true) {
    const space = getRandomInt(3)
    if ((space === 0) && (store.game.game.cells[1] === '')) {
      $('#1').text('O')
    } else if ((space === 0) && (store.game.game.cells[3] === '')) {
      $('#3').text('O')
    } else if ((space === 0) && (store.game.game.cells[5] === '')) {
      $('#5').text('O')
    } else if ((space === 0) && (store.game.game.cells[7] === '')) {
      $('#7').text('O')
    }
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

const fillSpace = function (event) {
  event.preventDefault()
  // get the position in the aray that they moved to
  const position = event.target.id
  // get the curent text of the space the y chose
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
          'value': store.turn
        },
        'over': store.game.game.over
      }
    })

    if (store.pveTurn === 'Player') {
      $(event.target).addClass('x')
    } else {
      $(event.target).addClass('o')
    }
    store.game.game.cells.splice(position, 1, store.pveTurn)
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
  aiFillSpace,
  newGame,
  showCount
}
