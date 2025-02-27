import { BattleshipGrid } from '../libs/battleship'

const grid = new BattleshipGrid()

console.log(grid.toString())

grid.hitCell('B3')
grid.hitCell('A1')
grid.hitCell('J10')

console.log(grid.toString())
