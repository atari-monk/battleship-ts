import { BattleshipGrid } from '../libs/battleship'

const grid1 = new BattleshipGrid()
grid1.placeFleet()

const grid2 = new BattleshipGrid()
grid2.placeFleet()

const player1Config = {
  role: 'Player1',
  style: style('lightblue'),
  grid: grid1,
  hideShips: false,
}

const player2Config = {
  role: 'Player2',
  style: style('red'),
  grid: grid2,
  hideShips: true,
}

printGameState()
// console.log(
//   `%cPlayer2`,
//   'color: red; background-color: black; font-size: 20px; font-weight: bold'
// )
// console.log(
//   `%c${grid2.toString(true)}\n`,
//   'color: red; background-color: black; font-size: 20px; font-weight: bold'
// )

//const userInput = prompt('Player1: Enter label (eg. A2):') ?? 'Default Value'

//grid2.hitCell(userInput)

//console.clear()

// grid2.hitCell('A2')
// grid1.hitCell('J10')
// grid2.hitCell('A5')

// console.log(grid1.toString())

function attack(playerConfig) {
  const { role, style, grid } = playerConfig
  const userInput = prompt(`${role}: Enter label (eg. A2):`)
}

function style(color: string) {
  return `color: ${color}; background-color: black; font-size: 20px; font-weight: bold')`
}

function printGameState() {
  printPlayer(player1Config)
  printPlayer(player2Config)
}

function printPlayer(playerConfig) {
  const { role, style, grid, hideShips } = playerConfig
  console.log(`%c${role}`, style)
  console.log(`%c${grid.toString(hideShips)}\n`, style)
}
