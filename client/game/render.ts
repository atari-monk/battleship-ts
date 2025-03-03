import { config } from './config'
import { GameConfig } from './type/GameConfig'
import { PLAYER } from './type/PLAYER'
import { PlayerConfig } from './type/PlayerConfig'

export function renderGrid(gridId: string, playerConfig: PlayerConfig) {
  const element = document.getElementById(gridId)!
  element.textContent = ''
  element.textContent = playerConfig.grid.toString(playerConfig.hideShips)
}

export function printPlayer(
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

export function printGameState(player: PLAYER, gameConfig: GameConfig) {
  if (config.clearConsole) console.clear()
  printPlayer(player, gameConfig)
}

export function style(color: string) {
  return `color: ${color}; background-color: black; font-size: 20px; font-weight: bold;`
}
