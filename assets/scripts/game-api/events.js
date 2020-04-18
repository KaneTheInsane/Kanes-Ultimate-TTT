'use strict'

const gameApi = require('./game-api')
const ui = require('../auth/ui')

const showCount = function (event) {
  event.preventDefault()
  console.log('showCount')
  gameApi.getGameCount()
    .then(ui.getGameCountSuccess)
    .catch(ui.getGameCountFailure)
}

module.exports = {
  showCount
}
