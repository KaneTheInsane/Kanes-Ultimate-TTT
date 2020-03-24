const config = require('../config')
const store = require('../store')


// Api call for creating a new game
const createGame = function (gameData) {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: gameData
  })
}

// Api call for updating the game state
const updateGame = function (gameData) {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.currentID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: gameData
  })
}

// Api call for finding a specific game based on ID
const getSingleGame = function (id, data) {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// Api call for finding game stats
const getGameCount = function (data) {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createGame,
  updateGame,
  getGameCount,
  getSingleGame
}
