import {DIRECTION} from '../ai/type/DIRECTION'
import {labelToIndex} from '../util/grid'
import {GridCell} from './type/GridCell'
import {HitResult} from './type/HitResult'
import {IFleetPlacer} from './type/IFleetPlacer'
import {FleetPlacer} from './FleetPlacer'
import {Ship} from './type/Ship'

export class BattleshipGrid {
  private _grid: GridCell[][]
  private ships: Ship[]

  get grid(): GridCell[][] {
    return this._grid
  }

  constructor(
    public rows: number = 10,
    public cols: number = 10,
    private fleetPlacer: IFleetPlacer = new FleetPlacer()
  ) {
    this._grid = this.generateGrid()
    this.ships = [
      {id: 1, size: 5, type: 'C'},
      {id: 2, size: 4, type: 'B'},
      {id: 3, size: 3, type: 'D'},
      {id: 4, size: 3, type: 'S'},
      {id: 5, size: 2, type: 'P'},
    ]
  }

  public getShipType(shipId: number): string {
    const ship = this.ships.find(s => s.id === shipId)
    return ship ? ship.type : '?'
  }

  public isGameOver(): boolean {
    return this._grid.every(row =>
      row.every(cell => cell.shipId === undefined || cell.isHit)
    )
  }

  public hitCell(label: string): HitResult {
    const position = labelToIndex(label, this.rows, this.cols)
    if (!position) throw new Error('Invalid label provided')

    const {row, col} = position
    const cell = this._grid[row][col]

    if (cell.isHit) {
      return {
        label,
        alreadyHit: true,
        shipHit: false,
      }
    }

    cell.isHit = true

    return {
      label,
      alreadyHit: false,
      shipHit: !!cell.shipId,
    }
  }

  public isMissNextTo(label: string, direction: DIRECTION): boolean {
    const position = labelToIndex(label, this.rows, this.cols)
    if (!position) return false

    let {row, col} = position

    switch (direction) {
      case DIRECTION.LEFT:
        col--
        break
      case DIRECTION.RIGHT:
        col++
        break
      case DIRECTION.UP:
        row--
        break
      case DIRECTION.DOWN:
        row++
        break
    }

    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false

    const cell = this._grid[row][col]
    return cell.isHit && !cell.shipId
  }

  public placeFleet(enforceSpacing: boolean = true): boolean {
    return this.fleetPlacer.placeFleet(
      this.ships,
      this._grid,
      this.rows,
      this.cols,
      enforceSpacing
    )
  }

  private generateGrid(): GridCell[][] {
    return Array.from({length: this.rows}, () =>
      Array.from({length: this.cols}, () => ({isHit: false}))
    )
  }
}
