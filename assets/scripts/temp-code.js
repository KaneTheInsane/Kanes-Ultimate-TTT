// const checkCorners = function () {
//   for (let i = 0; i < 4; i++) {
//     if (store.corners[i].some(v => store.game.game.cells[v] === '')) {
//       return true
//     } else {
//       return false
//     }
//   }
// }
//
// const checkSides = function () {
//   for (let i = 0; i < 4; i++) {
//     if (store.sides[i].some(v => store.game.game.cells[v] === '')) {
//       return true
//     } else {
//       return false
//     }
//   }
// }
// const aiFillSpace = function () {
//   if ((store.game.game.over === false) && (store.game.game.cells[4] === '')) {
//     $('#4').text('O')
//     store.game.game.cells.splice(4, 1, store.pveTurn)
//     // console.log(store.pveTurn)
//   } else if (store.game.game.over === false && checkCorners() === true) {
//     const space = getRandomInt(3)
//     if ((space === 0) && (store.game.game.cells[0] === '')) {
//       $('#0').text('O')
//     } else if ((space === 1) && (store.game.game.cells[2] === '')) {
//       $('#2').text('O')
//     } else if ((space === 2) && (store.game.game.cells[6] === '')) {
//       $('#6').text('O')
//     } else if ((space === 3) && (store.game.game.cells[8] === '')) {
//       $('#8').text('O')
//     }
//   } else if (store.game.game.over === false && checkSides() === true) {
//     const space = getRandomInt(3)
//     if ((space === 0) && (store.game.game.cells[1] === '')) {
//       $('#1').text('O')
//     } else if ((space === 0) && (store.game.game.cells[3] === '')) {
//       $('#3').text('O')
//     } else if ((space === 0) && (store.game.game.cells[5] === '')) {
//       $('#5').text('O')
//     } else if ((space === 0) && (store.game.game.cells[7] === '')) {
//       $('#7').text('O')
//     }
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
