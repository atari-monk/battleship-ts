import { BattleshipAI, BattleshipGrid } from '../libs/battleship'

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
  gridId: string
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

const player1Grid = generateGrid(FLEET_TYPE.STATIC)
const player2Grid = generateGrid(FLEET_TYPE.RANDOM)

const config: GameConfig = {
  clearConsole: true,
  mode: GAME_MODE.PLAYER_VS_AI,
  players: new Map<PLAYER, PlayerConfig>([
    [
      PLAYER.PLAYER2,
      {
        role: PLAYER.PLAYER2,
        type: PLAYER_TYPE.AI,
        name: 'Player 2',
        style: style('red'),
        grid: player2Grid,
        hideShips: true,
        gridId: 'player2Grid',
      },
    ],
    [
      PLAYER.PLAYER1,
      {
        role: PLAYER.PLAYER1,
        type: PLAYER_TYPE.HUMAN,
        name: 'Player 1',
        style: style('lightblue'),
        grid: player1Grid,
        hideShips: false,
        gridId: 'player1Grid',
      },
    ],
  ]),
}

const ai = new BattleshipAI(player1Grid)

function printGameState() {
  if (config.clearConsole) console.clear()
  config.players.forEach((player) => {
    printPlayer(player)
  })
}

function printPlayer(config: PlayerConfig) {
  const { name, style, grid, gridId, hideShips } = config
  console.log(`%c${name}`, style)
  console.log(`%c${grid.toString(hideShips)}\n`, style)
  renderGrid(gridId, grid)
}

async function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { name: attackerName } = attacker
  const { grid } = defender

  let validMove = false
  let hitResult = { alreadyHit: false, shipHit: false }

  while (!validMove) {
    let input: string = ''

    if (attacker.type === PLAYER_TYPE.HUMAN) {
      input = await getInputFromConsole(attackerName)
      hitResult = grid.hitCell(input)
    } else if (attacker.type === PLAYER_TYPE.AI) {
      hitResult = ai.aiMove({
        minLetter: 'C',
        maxLetter: 'H',
        minNumber: 5,
        maxNumber: 5,
      })
    }

    const { alreadyHit } = hitResult
    if (alreadyHit) {
      console.log(`%cThis cell was already hit. Try again.`, style)
    } else {
      validMove = true
    }
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

function renderGrid(gridId: string, grid: BattleshipGrid) {
  document.getElementById(gridId)!.textContent = grid.toString()
}

printGameState()
await startGame()
