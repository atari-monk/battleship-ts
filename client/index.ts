import { BattleshipGrid } from '../libs/battleship'

enum PLAYER_TYPE {
  HUMAN,
  AI,
}

enum PLAYER {
  PLAYER1,
  PLAYER2,
}

enum FLEET_TYPE {
  STATIC,
  RANDOM,
}

interface PlayerConfig {
  role: PLAYER
  type: PLAYER_TYPE
  name: string
  style: string
  grid: BattleshipGrid
  hideShips: boolean
}

enum GAME_MODE {
  TWO_PLAYER,
  PLAYER_VS_AI,
}

interface GameConfig {
  mode: GAME_MODE
  players: Map<PLAYER, PlayerConfig>
  clearConsole: boolean
}

function style(color: string) {
  return `color: ${color}; background-color: black; font-size: 20px; font-weight: bold;`
}

function generateGrid(fleetType: FLEET_TYPE) {
  const grid = new BattleshipGrid()
  switch (fleetType) {
    case FLEET_TYPE.RANDOM:
      grid.placeFleet()
      break
    case FLEET_TYPE.STATIC:
      grid.placeShipsFromArray()
      break
    default:
      grid.placeFleet()
      break
  }
  return grid
}

const config: GameConfig = {
  clearConsole: false,
  mode: GAME_MODE.PLAYER_VS_AI,
  players: new Map<PLAYER, PlayerConfig>([
    [
      PLAYER.PLAYER2,
      {
        role: PLAYER.PLAYER2,
        type: PLAYER_TYPE.AI,
        name: 'Player 2',
        style: style('red'),
        grid: generateGrid(FLEET_TYPE.RANDOM),
        hideShips: true,
      },
    ],
    [
      PLAYER.PLAYER1,
      {
        role: PLAYER.PLAYER1,
        type: PLAYER_TYPE.HUMAN,
        name: 'Player 1',
        style: style('lightblue'),
        grid: generateGrid(FLEET_TYPE.STATIC),
        hideShips: false,
      },
    ],
  ]),
}

function printGameState() {
  if (config.clearConsole) console.clear()
  config.players.forEach((player) => {
    printPlayer(player)
  })
}

function printPlayer(config: PlayerConfig) {
  const { name, style, grid, hideShips } = config
  console.log(`%c${name}`, style)
  console.log(`%c${grid.toString(hideShips)}\n`, style)
}

async function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { name: attackerName } = attacker
  const { grid } = defender

  let validMove = false
  while (!validMove) {
    let input: string = ''
    if (attacker.type === PLAYER_TYPE.HUMAN) {
      input = await getInputFromConsole(attackerName)
      validMove = grid.hitCell(input)
    } else if (attacker.type === PLAYER_TYPE.AI) {
      input = grid.aiMove({
        minLetter: 'C',
        maxLetter: 'H',
        minNumber: 5,
        maxNumber: 5,
      })
      validMove = grid.hitCell(input, true)
    }
    if (!validMove) console.log(`%cThis cell is already hit. Try again.`, style)
  }

  printGameState()
  return grid.isGameOver()
}

function getInputFromConsole(playerName: string): Promise<string> {
  return new Promise((resolve) => {
    const input = prompt(playerName)
    if (input !== null && input.trim() !== '') {
      resolve(input)
    }
  })
}

function tooglePlayers(attacker: PlayerConfig, defender: PlayerConfig) {
  return [defender, attacker]
}

async function startGame() {
  const player1 = config.players.get(PLAYER.PLAYER1)!
  const player2 = config.players.get(PLAYER.PLAYER2)!
  if (!player1 || !player2) throw new Error('Missing Player')
  let isGameOver = false

  let attacker = player1
  let defender = player2

  while (!isGameOver) {
    isGameOver = await attack(attacker, defender)
    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }
    ;[attacker, defender] = tooglePlayers(attacker, defender)
  }
}

printGameState()
await startGame()
