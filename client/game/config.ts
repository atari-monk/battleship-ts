import {BattleshipGrid, BattleshipAI} from '../../libs/battleship'
import {FLEET_TYPE} from './type/FLEET_TYPE'
import {GAME_MODE} from './type/GAME_MODE'
import {PLAYER} from './type/PLAYER'
import {PLAYER_TYPE} from './type/PLAYER_TYPE'
import {bigStyle} from './render'
import {GameConfig} from './type/GameConfig'
import {PlayerConfig} from './type/PlayerConfig'
import {tests} from './tests'
import {EventEmitter} from '@atari-monk/event-emitter'
import {
  EVENT_STATE_CHANGED,
  StateEvents,
} from '../../libs/battleship/events/events'
import {State} from '../../libs/battleship/ai/type/State'

export function generateGrid(fleetType: FLEET_TYPE) {
  const grid = new BattleshipGrid()
  switch (fleetType) {
    case FLEET_TYPE.RANDOM:
      grid.placeFleet()
      break
    case FLEET_TYPE.STATIC:
      grid.placeShipsFromArray(tests.test4.grid)
      break
    default:
      grid.placeFleet()
      break
  }
  return grid
}

export const player1Grid = generateGrid(FLEET_TYPE.STATIC)
export const player2Grid = generateGrid(FLEET_TYPE.RANDOM)

export const config: GameConfig = {
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
        style: bigStyle('red'),
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
        style: bigStyle('lightblue'),
        grid: player1Grid,
        hideShips: false,
      },
    ],
  ]),
}

const eventEmitter = new EventEmitter<StateEvents>()
eventEmitter.on(EVENT_STATE_CHANGED, newState => {
  console.log('State changed to', State[newState])
})
export const ai = new BattleshipAI(player1Grid, eventEmitter)
