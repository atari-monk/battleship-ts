import {config} from './config'
import {GameConfig} from './type/GameConfig'
import {PLAYER} from './type/PLAYER'
import {PlayerConfig} from './type/PlayerConfig'
import {BattleshipGridRenderer} from './../../libs/battleship'

export function renderGrid(
  gridId: string,
  playerConfig: PlayerConfig,
  renderer: BattleshipGridRenderer
) {
  const element = document.getElementById(gridId)!
  element.textContent = ''
  element.textContent = renderer.render(playerConfig.hideShips)
}

export function printPlayer(
  player: PLAYER,
  gameConfig: GameConfig,
  renderer: BattleshipGridRenderer,
  inConsole = config.printGridInConsole
) {
  const {gridId} = gameConfig
  const playerConfig = gameConfig.players.get(player)!
  renderGrid(gridId, playerConfig, renderer)

  if (!inConsole) return

  const {name, style, hideShips} = playerConfig
  console.log(`%c${name}`, style)
  console.log(`%c${renderer.render(hideShips)}\n`, style)
}

export function printGameState(
  player: PLAYER,
  gameConfig: GameConfig,
  renderer: BattleshipGridRenderer
) {
  if (config.clearConsole) console.clear()
  printPlayer(player, gameConfig, renderer)
}

export function bigStyle(color: string) {
  return `color: ${color}; background-color: black; font-size: 20px; font-weight: bold;`
}

export function colorStyle(color: string) {
  return `color: ${color};`
}
