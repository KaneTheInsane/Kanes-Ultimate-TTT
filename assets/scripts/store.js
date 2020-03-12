'use strict'
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 5, 8],
  [0, 4, 7],
  [2, 4, 6]]

const gameState = ['', '', '', '', '', '', '', '', '']

const gameOver = false

module.exports = {
  winCondition,
  gameState,
  gameOver

}
