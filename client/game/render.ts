import {config} from './config'
import {GameConfig} from './type/GameConfig'
import {PLAYER} from './type/PLAYER'
import {PlayerConfig} from './type/PlayerConfig'

export function renderGrid(gridId: string, playerConfig: PlayerConfig) {
  const element = document.getElementById(gridId)!
  element.textContent = ''
  element.textContent = playerConfig.grid.render(playerConfig.hideShips)
}

export function printPlayer(
  player: PLAYER,
  gameConfig: GameConfig,
  inConsole = false
) {
  const {gridId} = gameConfig
  const playerConfig = gameConfig.players.get(player)!
  renderGrid(gridId, playerConfig)
  if (!inConsole) return
  const {name, style, grid, hideShips} = playerConfig
  console.log(`%c${name}`, style)
  console.log(`%c${grid.render(hideShips)}\n`, style)
}

export function printGameState(player: PLAYER, gameConfig: GameConfig) {
  if (config.clearConsole) console.clear()
  printPlayer(player, gameConfig)
}

export function bigStyle(color: string) {
  return `color: ${color}; background-color: black; font-size: 20px; font-weight: bold;`
}

export function colorStyle(color: string) {
  return `color: ${color};`
}
