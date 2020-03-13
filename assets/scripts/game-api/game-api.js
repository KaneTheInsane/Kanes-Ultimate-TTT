const config = require('../config')
const store = require('../store')

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
