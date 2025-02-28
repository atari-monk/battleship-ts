import { BattleshipGrid } from '../libs/battleship'

enum PLAYER {
  PLAYER1,
  PLAYER2,
}

interface PlayerConfig {
  role: string
  style: string
  grid: BattleshipGrid
  hideShips: boolean
}

interface GameConfig {
  players: Map<PLAYER, PlayerConfig>
}

function style(color: string) {
  return `color: ${color}; background-color: black; font-size: 20px; font-weight: bold')`
}

function generateGrid() {
  const grid = new BattleshipGrid()
  grid.placeFleet()
  return grid
}

const config: GameConfig = { players: new Map<PLAYER, PlayerConfig>() }

config.players.set(PLAYER.PLAYER1, {
  role: 'Player1',
  style: style('lightblue'),
  grid: generateGrid(),
  hideShips: false,
})

config.players.set(PLAYER.PLAYER2, {
  role: 'Player2',
  style: style('red'),
  grid: generateGrid(),
  hideShips: true,
})

function printGameState() {
  config.players.forEach((player) => {
    printPlayer(player)
  })
}

function printPlayer(config: PlayerConfig) {
  const { role, style, grid, hideShips } = config
  console.log(`%c${role}`, style)
  console.log(`%c${grid.toString(hideShips)}\n`, style)
}

function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { role } = attacker
  const { grid } = defender
  const input = prompt(`${role}: Enter label (eg. A2):`)!
  grid.hitCell(input)
}

printGameState()

const player1 = config.players.get(PLAYER.PLAYER1)
const player2 = config.players.get(PLAYER.PLAYER2)
if (!player1 || !player2) throw new Error('Missing Player')

attack(player1, player2)

console.clear()

printGameState()
