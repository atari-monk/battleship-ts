import {GAME_MODE} from './GAME_MODE'
import {PLAYER} from './PLAYER'
import {PlayerConfig} from './PlayerConfig'

export interface GameConfig {
  mode: GAME_MODE
  players: Map<PLAYER, PlayerConfig>
  clearConsole: boolean
  printGridInConsole: boolean
  gridId: string
}
