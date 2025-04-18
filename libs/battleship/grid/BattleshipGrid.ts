import {GridCell} from './type/GridCell'
import {Ship} from './type/Ship'
import {HitResult} from './type/HitResult'
import {DIRECTION} from './type/DIRECTION'
import {labelToIndex} from './grid_util'

export class BattleshipGrid {
  private _grid: GridCell[][]
  private _ships: Ship[]

  get grid(): GridCell[][] {
    return this._grid
  }

  get ships(): Ship[] {
    return this._ships
  }

  constructor(
    public rows: number = 10,
    public cols: number = 10,
    initialGrid?: GridCell[][],
    ships: Ship[] = [
      {id: 1, size: 5, type: 'C'},
      {id: 2, size: 4, type: 'B'},
      {id: 3, size: 3, type: 'D'},
      {id: 4, size: 3, type: 'S'},
      {id: 5, size: 2, type: 'P'},
    ]
  ) {
    this._grid = initialGrid ?? this.generateGrid()
    this._ships = ships
  }

  private generateGrid(): GridCell[][] {
    const grid: GridCell[][] = []
    for (let i = 0; i < this.rows; i++) {
      const row: GridCell[] = []
      for (let j = 0; j < this.cols; j++) {
        row.push({isHit: false})
      }
      grid.push(row)
    }
    return grid
  }

  private isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
  }

  public getShipType(shipId: number): string {
    const ship = this._ships.find(s => s.id === shipId)
    return ship ? ship.type : '?'
  }

  public isGameOver(): boolean {
    for (let row of this._grid) {
      for (let cell of row) {
        if (cell.shipId !== undefined && !cell.isHit) {
          return false
        }
      }
    }
    return true
  }

  public hitCell(label: string): HitResult {
    const position = labelToIndex(label, this.rows, this.cols)
    if (!position || !this.isValidPosition(position.row, position.col)) {
      throw new Error('Invalid label provided')
    }

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
    if (!position || !this.isValidPosition(position.row, position.col))
      return false

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

    if (!this.isValidPosition(row, col)) return false

    const cell = this._grid[row][col]
    return cell.isHit && !cell.shipId
  }
}
