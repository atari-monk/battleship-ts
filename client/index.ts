import { BattleshipGrid } from '../libs/battleship'

enum PLAYER {
  PLAYER1,
  PLAYER2,
}

interface PlayerConfig {
  role: PLAYER
  name: string
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
  role: PLAYER.PLAYER1,
  name: 'Player 1',
  style: style('lightblue'),
  grid: generateGrid(),
  hideShips: true,
})

config.players.set(PLAYER.PLAYER2, {
  role: PLAYER.PLAYER2,
  name: 'Player 2',
  style: style('red'),
  grid: generateGrid(),
  hideShips: true,
})

function printGameState() {
  console.clear()
  config.players.forEach((player) => {
    printPlayer(player)
  })
}

function printPlayer(config: PlayerConfig) {
  const { name, style, grid, hideShips } = config
  console.log(`%c${name}`, style)
  console.log(`%c${grid.toString(hideShips)}\n`, style)
}

function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { name: attackerName } = attacker
  const { grid, name: defenderName } = defender
  const input = prompt(
    `${attackerName} attacks ${defenderName}. Enter label (eg. A2):`
  )!
  grid.hitCell(input)
  printGameState()
  return grid.isGameOver()
}

printGameState()

const player1 = config.players.get(PLAYER.PLAYER1)!
const player2 = config.players.get(PLAYER.PLAYER2)!
if (!player1 || !player2) throw new Error('Missing Player')
let isGameOver = false

let attacker = player1
let defender = player2

function tooglePlayers() {
  const temp = defender
  defender = attacker
  attacker = temp
}

while (!isGameOver) {
  isGameOver = attack(attacker, defender)
  if (isGameOver) {
    console.log('Game over! All ships have been sunk.')
    break
  }
  tooglePlayers()
}
