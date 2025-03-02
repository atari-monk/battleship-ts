import { BattleshipGrid } from '../libs/battleship'

enum PLAYER_TYPE {
  HUMAN,
  AI,
}

enum PLAYER {
  PLAYER1,
  PLAYER2,
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

function generateGrid() {
  const grid = new BattleshipGrid()
  grid.placeFleet()
  return grid
}

const config: GameConfig = {
  clearConsole: true,
  mode: GAME_MODE.PLAYER_VS_AI,
  players: new Map<PLAYER, PlayerConfig>([
    [
      PLAYER.PLAYER2,
      {
        role: PLAYER.PLAYER2,
        type: PLAYER_TYPE.HUMAN,
        name: 'Player 2',
        style: style('red'),
        grid: generateGrid(),
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
        grid: generateGrid(),
        hideShips: true,
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
    } else if (attacker.type === PLAYER_TYPE.AI) {
      input = defender.grid.aiRandomNotTriedCell()!
      console.log(`AI move: ${input}`)
    }
    validMove = grid.hitCell(input)
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
  if (config.mode === GAME_MODE.PLAYER_VS_AI) {
    config.players.get(PLAYER.PLAYER2)!.type = PLAYER_TYPE.AI
  }
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
