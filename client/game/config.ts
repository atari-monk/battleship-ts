import {
  BattleshipGrid,
  BattleshipAI,
  ShipPlacer,
  FleetPlacer,
} from '../../libs/battleship'
import {FLEET_TYPE} from './type/FLEET_TYPE'
import {GAME_MODE} from './type/GAME_MODE'
import {PLAYER} from './type/PLAYER'
import {PLAYER_TYPE} from './type/PLAYER_TYPE'
import {bigStyle} from './render'
import {GameConfig} from './type/GameConfig'
import {PlayerConfig} from './type/PlayerConfig'
import {test} from './tests'
import {EventEmitter} from '@atari-monk/event-emitter'
import {
  EVENT_STATE_CHANGED,
  StateEvents,
} from '../../libs/battleship/events/events'
import {State} from '../../libs/battleship/ai/type/State'
import {IFleetPlacer} from '../../libs/battleship/grid/type/IFleetPlacer'

export function generateGrid(fleetType: FLEET_TYPE) {
  const grid = new BattleshipGrid()
  const fleetPlacer: IFleetPlacer = new FleetPlacer()
  switch (fleetType) {
    case FLEET_TYPE.RANDOM:
      fleetPlacer.placeFleet(grid.ships, grid.grid, grid.rows, grid.cols, true)
      break
    case FLEET_TYPE.STATIC:
      ShipPlacer.placeShipsFromArray(test.grid, grid.grid, grid.rows, grid.cols)
      break
    default:
      fleetPlacer.placeFleet(grid.ships, grid.grid, grid.rows, grid.cols, true)
      break
  }
  return grid
}

const mode: GAME_MODE = GAME_MODE.AI_TEST

export const player1Grid = generateGrid(
  (mode as GAME_MODE) === GAME_MODE.AI_TEST
    ? FLEET_TYPE.STATIC
    : FLEET_TYPE.RANDOM
)
export const player2Grid = generateGrid(FLEET_TYPE.RANDOM)

export const config: GameConfig = {
  clearConsole: false,
  printGridInConsole: false,
  mode,
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
