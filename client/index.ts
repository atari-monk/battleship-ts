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
}

enum GAME_MODE {
  TWO_PLAYER,
  PLAYER_VS_AI,
}

interface GameConfig {
  mode: GAME_MODE
  players: Map<PLAYER, PlayerConfig>
  clearConsole: boolean
  gridId: string
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
  clearConsole: false,
  mode: GAME_MODE.PLAYER_VS_AI,
  gridId: 'grid',
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
      },
    ],
  ]),
}

const ai = new BattleshipAI(player1Grid)

function printGameState(player: PLAYER, gameConfig: GameConfig) {
  if (config.clearConsole) console.clear()
  printPlayer(player, gameConfig)
}

function printPlayer(
  player: PLAYER,
  gameConfig: GameConfig,
  inConsole = false
) {
  const { gridId } = gameConfig
  const playerConfig = gameConfig.players.get(player)!
  renderGrid(gridId, playerConfig)
  if (!inConsole) return
  const { name, style, grid, hideShips } = playerConfig
  console.log(`%c${name}`, style)
  console.log(`%c${grid.toString(hideShips)}\n`, style)
}

async function attack(attacker: PlayerConfig, defender: PlayerConfig) {
  const { name: attackerName } = attacker
  const { grid } = defender

  let validMove = false
  let hitResult = { alreadyHit: false, shipHit: false }

  while (!validMove) {
    let input: string = ''

    if (attacker.type === PLAYER_TYPE.HUMAN) {
      //input = await getInputFromConsole(attackerName)
      input = await handlePlayerInput(attackerName)
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
    printGameState(defender.role, config)
    await attack(attacker, defender)
    isGameOver = defender.grid.isGameOver()
    printGameState(defender.role, config)
    if (isGameOver) {
      console.log('Game over! All ships have been sunk.')
      break
    }
    ;[attacker, defender] = tooglePlayers(attacker, defender)
  }
}

function renderGrid(gridId: string, playerConfig: PlayerConfig) {
  const element = document.getElementById(gridId)!
  element.textContent = ''
  element.textContent = playerConfig.grid.toString(playerConfig.hideShips)
}

async function getInputFromPage(playerName: string): Promise<string> {
  return new Promise((resolve) => {
    const inputField = document.getElementById(
      'playerInput'
    ) as HTMLInputElement
    const submitButton = document.getElementById(
      'submitInput'
    ) as HTMLButtonElement
    const resultDisplay = document.getElementById(
      'inputResult'
    ) as HTMLParagraphElement

    submitButton.onclick = () => {
      const input = inputField.value.trim()
      if (input !== '') {
        resultDisplay.textContent = `${playerName}: ${input}`
        resolve(input)
        inputField.value = ''
      }
    }
  })
}

async function handlePlayerInput(playerName: string) {
  const move = await getInputFromPage(playerName)
  console.log('Move:', move)
  return move
}

await startGame()
