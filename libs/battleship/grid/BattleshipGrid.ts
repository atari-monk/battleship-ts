import {DIRECTION} from '../ai/type/DIRECTION'
import {labelToIndex} from '../util/grid'
import {GridCell} from './type/GridCell'
import {HitResult} from './type/HitResult'
import {FleetPlacer} from './FleetPlacer'
import {Ship} from './type/Ship'

export class BattleshipGrid {
  private _grid: GridCell[][]
  private fleetPlacer: FleetPlacer

  private ships: Ship[] = [
    {id: 1, size: 5, type: 'C'},
    {id: 2, size: 4, type: 'B'},
    {id: 3, size: 3, type: 'D'},
    {id: 4, size: 3, type: 'S'},
    {id: 5, size: 2, type: 'P'},
  ]

  constructor(public rows: number = 10, public cols: number = 10) {
    this._grid = this.generateGrid()
    this.fleetPlacer = new FleetPlacer(this._grid, this.rows, this.cols)
  }

  get grid(): GridCell[][] {
    return this._grid
  }

  public toString(hideShips = false): string {
    const columnLabels =
      '   ' +
      Array.from({length: this.cols}, (_, i) =>
        String.fromCharCode(65 + i)
      ).join(' ')

    const gridRows = this._grid
      .map(
        (row, rowIndex) =>
          (rowIndex + 1).toString().padStart(2, ' ') +
          ' ' +
          row
            .map(cell =>
              cell.isHit
                ? cell.shipId !== undefined
                  ? 'X'
                  : 'O'
                : cell.shipId !== undefined
                ? hideShips
                  ? '-'
                  : this.getShipType(cell.shipId) || '?'
                : '-'
            )
            .join(' ')
      )
      .join('\n')

    return columnLabels + '\n' + gridRows
  }

  private getShipType(shipId: number): string {
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
    if (!position) throw new Error('labelToIndex fail')

    const {row, col} = position

    if (this._grid[row][col].isHit) {
      return {
        label: label,
        alreadyHit: true,
        shipHit: false,
      }
    }

    this._grid[row][col].isHit = true

    return {
      label: label,
      alreadyHit: false,
      shipHit: this._grid[row][col].shipId !== undefined,
    }
  }

  public isMissNextTo(label: string, direction: DIRECTION): boolean {
    const position = labelToIndex(label, this.rows, this.cols)
    if (!position) return false

    let {row, col} = position

    if (direction === DIRECTION.LEFT) col -= 1
    if (direction === DIRECTION.RIGHT) col += 1
    if (direction === DIRECTION.UP) row -= 1
    if (direction === DIRECTION.DOWN) row += 1

    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false

    return (
      this._grid[row][col].isHit && this._grid[row][col].shipId === undefined
    )
  }

  public placeFleet(enforceSpacing: boolean = true): boolean {
    return this.fleetPlacer.placeFleet(this.ships, enforceSpacing)
  }

  private generateGrid(): GridCell[][] {
    return Array.from({length: this.rows}, () =>
      Array.from({length: this.cols}, () => ({
        isHit: false,
      }))
    )
  }

  public placeShipsFromArray(shipGrid: number[][]): boolean {
    if (shipGrid.length !== this.rows || shipGrid[0].length !== this.cols) {
      console.error('The grid must be 10x10.')
      return false
    }

    let shipId = 1
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (shipGrid[row][col] === 1) {
          if (this._grid[row][col].shipId === undefined) {
            this._grid[row][col].shipId = shipId
          }
        }
      }
    }

    return true
  }
}
