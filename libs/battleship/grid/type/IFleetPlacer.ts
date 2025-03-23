import {GridCell} from '../type/GridCell'
import {Ship} from '../type/Ship'

export interface IFleetPlacer {
  placeFleet(
    ships: Ship[],
    grid: GridCell[][],
    rows: number,
    cols: number,
    enforceSpacing: boolean
  ): boolean
}
