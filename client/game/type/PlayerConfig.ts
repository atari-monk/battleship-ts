import { BattleshipGrid } from '../../../libs/battleship'
import { PLAYER } from './PLAYER'
import { PLAYER_TYPE } from './PLAYER_TYPE'

export interface PlayerConfig {
  role: PLAYER
  type: PLAYER_TYPE
  name: string
  style: string
  grid: BattleshipGrid
  hideShips: boolean
}
