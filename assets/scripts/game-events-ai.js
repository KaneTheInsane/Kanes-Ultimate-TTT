'use strict'
const store = require('./store')
const gameApi = require('./game-api/game-api')
const ui = require('./auth/ui')

const changeTurn = function () {
  $('#invalid-move-message').html('&nbsp;')
  if (store.pveTurn === 'Player') {
    store.pveTurn = 'AI'
    if (store.aiLevel === 'Randometric') {
      easyAiFillSpace()
    } else if (store.aiLevel === 'Mechanico') {
      medAiFillSpace()
    } else {
      hardAiFillSpace()
    }
  } else {
    store.pveTurn = 'Player'
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
  if (store.pveTurn === 'Player') {
    store.winningPlayer = store.user.email
  } else {
    store.winningPlayer = store.aiLevel
  }
  $('#game-state-message').text(store.winningPlayer + ' wins!')
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

const newHardGame = function (event) {
  event.preventDefault()
  store.gameType = 'ai'
  store.aiLevel = 'Minimaximus'
  $('#player-2-label').text(store.aiLevel)
  $('#game-state-message').html(store.user.email + ' vs ' + store.aiLevel)
  $('#right-box').removeClass('player-box easy-ai-box medium-ai-box minimaximus-box')
  $('#left-box').removeClass('player-box easy-ai-box medium-ai-box minimaximus-box')
  $('#right-box').addClass('minimaximus-box')
  $('#left-box').addClass('player-box')
  store.pveTurn = 'Player'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const newMedGame = function (event) {
  event.preventDefault()
  store.gameType = 'ai'
  store.aiLevel = 'Mechanico'
  $('#player-2-label').text(store.aiLevel)
  $('#game-state-message').html(store.user.email + ' vs ' + store.aiLevel)
  $('#right-box').removeClass('player-box easy-ai-box medium-ai-box minimaximus-box')
  $('#left-box').removeClass('player-box easy-ai-box medium-ai-box minimaximus-box')
  $('#right-box').addClass('medium-ai-box')
  $('#left-box').addClass('player-box')
  store.pveTurn = 'Player'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const newEasyGame = function (event) {
  event.preventDefault()
  store.gameType = 'ai'
  store.aiLevel = 'Randometric'
  $('#player-2-label').text(store.aiLevel)
  $('#game-state-message').html(store.user.email + ' vs ' + store.aiLevel)
  $('#right-box').removeClass('player-box easy-ai-box medium-ai-box minimaximus-box')
  $('#left-box').removeClass('player-box easy-ai-box medium-ai-box minimaximus-box')
  $('#right-box').addClass('easy-ai-box')
  $('#left-box').addClass('player-box')
  store.pveTurn = 'Player'
  gameApi.createGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const easyAiFillSpace = function () {
  const random = getRandomInt(9)
  console.log(random)
  if (store.game.game.cells[random] === '') {
    $(`.box[id=${random}]`).text('O')
    $(`.box[id=${random}]`).addClass('o')
    store.game.game.cells.splice(random, 1, 'O')
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
    easyAiFillSpace()
  }
}

const medAiFillSpace = function () {
  const random = getRandomInt(4)
  if ((store.game.game.over === false) && (store.game.game.cells[4] === '')) {
    $('#4').text('O')
    $('#4').addClass('o')
    store.game.game.cells.splice(4, 1, 'O')
    if (checkWin() === true) {
      winner()
    } else {
      checkDraw()
      if (store.game.game.over === false) {
        changeTurn()
      }
    }
  } else if (store.game.game.over === false && $(`#${store.corners[random]}`).text() === '') {
    $(`#${store.corners[random]}`).text('O')
    $(`#${store.corners[random]}`).addClass('o')
    store.game.game.cells.splice(store.corners[random], 1, 'O')
    if (checkWin() === true) {
      winner()
    } else {
      checkDraw()
      if (store.game.game.over === false) {
        changeTurn()
      }
    }
  } else if (store.game.game.over === false && $(`#${store.sides[random]}`).text() === '') {
    $(`#${store.sides[random]}`).text('O')
    $(`#${store.sides[random]}`).addClass('o')
    store.game.game.cells.splice(store.sides[random], 1, 'O')
    changeTurn()
  } else {
    medAiFillSpace()
  }
}

const hardAiFillSpace = function () {
  console.log('To be built')
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
      turnPiece = 'X'
      $(event.target).addClass('x')
    } else {
      turnPiece = 'O'
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
  newEasyGame,
  newMedGame,
  newHardGame,
  showCount
}
