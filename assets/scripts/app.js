'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
let turn = 'x'

  const fillSpace = function (turn, space) {
    if (space !== 'x' || 'o') {
      if (turn === 'x') {
        $(space).text('x')
        let turn = 'o'
      } else {
        $(space).text('o')
        let turn = 'x'
      }
    }
  }

  $('#index-1').on('click', fillSpace(turn, '#index-1'))
  $('#index-2').on('click', function () { console.log('clicked box 2') })
  $('#index-3').on('click', function () { console.log('clicked box 3') })
  $('#index-4').on('click', function () { console.log('clicked box 4') })
  $('#index-5').on('click', function () { console.log('clicked box 5') })
  $('#index-6').on('click', function () { console.log('clicked box 6') })
  $('#index-7').on('click', function () { console.log('clicked box 7') })
  $('#index-8').on('click', function () { console.log('clicked box 8') })
  $('#index-9').on('click', function () { console.log('clicked box 9') })
})
