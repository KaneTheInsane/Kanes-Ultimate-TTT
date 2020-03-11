'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  const gameState = ['', '', '', '', '', '', '', '', '']
  let turn = 'x'
  let gameOver = false
  const winCondition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [0, 4, 8], [2, 5, 8], [0, 4, 7], [2, 4, 6]]

  const fillSpace = function (event) {
    console.log('working')
    event.preventDefault()
    // get the position in the aray that they moved to
    const position = event.target.id
    console.log('clicked ' + position)
    // get the curent text of the space the y chose
    const space = $(event.target).text()
    console.log(space)
    // if space is open
    if (space !== 'x' && space !== 'o' && gameOver === false) {
      console.log('valid space ' + '(' + space + ')')
      // add them to the boad
      $(event.target).text(turn)
      gameState.splice(position, 1, turn)
      // check for winner
      if ((gameState[0] === 'x' && gameState[1] === 'x' && gameState[2] === 'x') ||
(gameState[3] === 'x' && gameState[4] === 'x' && gameState[5] === 'x') ||
(gameState[6] === 'x' && gameState[7] === 'x' && gameState[8] === 'x') ||
(gameState[0] === 'x' && gameState[3] === 'x' && gameState[6] === 'x') ||
(gameState[0] === 'x' && gameState[4] === 'x' && gameState[8] === 'x') ||
(gameState[2] === 'x' && gameState[5] === 'x' && gameState[8] === 'x') ||
(gameState[0] === 'x' && gameState[4] === 'x' && gameState[7] === 'x') ||
(gameState[2] === 'x' && gameState[4] === 'x' && gameState[6] === 'x')) {
        console.log('game over')
        gameOver = true
        $('#Game').text('X is the Winner!')
      } else if
      ((gameState[0] === 'o' && gameState[1] === 'o' && gameState[2] === 'o') ||
(gameState[3] === 'o' && gameState[4] === 'o' && gameState[5] === 'o') ||
(gameState[6] === 'o' && gameState[7] === 'o' && gameState[8] === 'o') ||
(gameState[0] === 'o' && gameState[3] === 'o' && gameState[6] === 'o') ||
(gameState[0] === 'o' && gameState[4] === 'o' && gameState[8] === 'o') ||
(gameState[2] === 'o' && gameState[5] === 'o' && gameState[8] === 'o') ||
(gameState[0] === 'o' && gameState[4] === 'o' && gameState[7] === 'o') ||
(gameState[2] === 'o' && gameState[4] === 'o' && gameState[6] === 'o')) {
        console.log('game over')
        gameOver = true
        $('#Game').text('O is the Winner!')
      }
      // winStates.forEach()
      // change the turn
      console.log(gameState)
      if (turn === 'x') {
        turn = 'o'
      } else {
        turn = 'x'
      }
    } else if (gameOver === true) {
      $('#message').text('Game is over')
    } else {
      $('#message').text('invalid move')
    }
  }

  $('.box').on('click', fillSpace)
})
