import { BattleshipGrid } from '../libs/battleship'

const grid = new BattleshipGrid()

grid.placeFleet()

grid.hitCell('B3')
grid.hitCell('A2')
grid.hitCell('J10')

console.log(grid.toString())
