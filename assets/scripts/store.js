'use strict'
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]]

const gameState = ['', '', '', '', '', '', '', '', '']

const gameOver = false

const store = {
}

module.exports = {
  winCondition,
  gameState,
  gameOver,
  store

}
