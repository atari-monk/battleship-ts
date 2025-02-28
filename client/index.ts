import { BattleshipGrid } from '../libs/battleship'

const grid1 = new BattleshipGrid()
const grid2 = new BattleshipGrid()

grid1.placeFleet()
grid2.placeFleet()

console.log(
  `%cPlayer1`,
  'color: lightblue; background-color: black; font-size: 20px; font-weight: bold'
)
console.log(
  `%c${grid1.toString()}\n`,
  'color: lightblue; background-color: black; font-size: 20px; font-weight: bold'
)

console.log(
  `%cPlayer2`,
  'color: red; background-color: black; font-size: 20px; font-weight: bold'
)
console.log(
  `%c${grid2.toString()}\n`,
  'color: red; background-color: black; font-size: 20px; font-weight: bold'
)

// grid1.hitCell('B3')
// grid2.hitCell('A2')
// grid1.hitCell('J10')
// grid2.hitCell('A5')

// console.log(grid1.toString())
