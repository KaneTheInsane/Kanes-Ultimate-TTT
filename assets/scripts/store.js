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

const game = {
  game: {
    cells: ['', '', '', '', '', '', '', '', ''],
    over: false
  }
}

const store = {
}

const guestAccount = false

module.exports = {
  winCondition,
  store,
  game,
  guestAccount

}
