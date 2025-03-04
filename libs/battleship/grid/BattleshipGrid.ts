import { GridCell } from './GridCell'
import { GridUtils } from './GridUtils'
import { HitResult } from './HitResult'

export class BattleshipGrid {
  private _grid: GridCell[][]

  private shipTypes: { [key: number]: string } = {
    1: 'C',
    2: 'B',
    3: 'D',
    4: 'S',
    5: 'P',
  }

  get grid(): GridCell[][] {
    return this._grid
  }

  constructor(public rows: number = 10, public cols: number = 10) {
    this._grid = this.generateGrid()
  }

  public toString(hideShips = false): string {
    const columnLabels =
      '   ' +
      Array.from({ length: this.cols }, (_, i) =>
        String.fromCharCode(65 + i)
      ).join(' ')

    const gridRows = this._grid
      .map(
        (row, rowIndex) =>
          (rowIndex + 1).toString().padStart(2, ' ') +
          ' ' +
          row
            .map((cell) =>
              cell.isHit
                ? cell.shipId !== undefined
                  ? 'X'
                  : 'O'
                : cell.shipId !== undefined
                ? hideShips
                  ? '-'
                  : this.shipTypes[cell.shipId] || '?'
                : '-'
            )
            .join(' ')
      )
      .join('\n')

    return columnLabels + '\n' + gridRows
  }

  public isGameOver(): boolean {
    return this._grid.every((row) =>
      row.every((cell) => cell.shipId === undefined || cell.isHit)
    )
  }

  public hitCell(label: string): HitResult {
    const position = GridUtils.labelToIndex(label, this.rows, this.cols)
    if (!position) throw new Error('labelToIndex fail')

    const { row, col } = position

    if (this._grid[row][col].isHit) {
      return { alreadyHit: true, shipHit: false }
    }

    this._grid[row][col].isHit = true

    return {
      alreadyHit: false,
      shipHit: this._grid[row][col].shipId !== undefined,
    }
  }

  private generateGrid(): GridCell[][] {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({
        isHit: false,
      }))
    )
  }

  public placeFleet(enforceSpacing: boolean = true): boolean {
    const ships = [5, 4, 3, 3, 2]
    let shipId = 1

    for (const shipSize of ships) {
      let placed = false
      let attempts = 0

      while (!placed && attempts < 100) {
        const orientation = Math.random() < 0.5 ? 'H' : 'V'
        const maxRow = orientation === 'V' ? this.rows - shipSize : this.rows
        const maxCol = orientation === 'H' ? this.cols - shipSize : this.cols
        const row = Math.floor(Math.random() * maxRow)
        const col = Math.floor(Math.random() * maxCol)

        if (
          this.canPlaceShip(
            row,
            col,
            orientation as 'H' | 'V',
            shipSize,
            enforceSpacing
          )
        ) {
          this.placeShip(row, col, orientation as 'H' | 'V', shipSize, shipId)
          placed = true
        }
        attempts++
      }

      if (!placed) {
        console.error(
          `Failed to place ship of size ${shipSize} after 100 attempts.`
        )
        return false
      }
      shipId++
    }
    return true
  }

  private canPlaceShip(
    row: number,
    col: number,
    orientation: 'H' | 'V',
    size: number,
    enforceSpacing: boolean
  ): boolean {
    const coords: { row: number; col: number }[] = []

    if (orientation === 'H') {
      if (col + size > this.cols) return false
      for (let i = 0; i < size; i++) {
        coords.push({ row, col: col + i })
      }
    } else {
      if (row + size > this.rows) return false
      for (let i = 0; i < size; i++) {
        coords.push({ row: row + i, col })
      }
    }

    for (const { row, col } of coords) {
      if (this._grid[row][col].shipId !== undefined) {
        return false
      }
    }

    if (enforceSpacing) {
      for (const { row: r, col: c } of coords) {
        for (let i = r - 1; i <= r + 1; i++) {
          for (let j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
              if (this._grid[i][j].shipId !== undefined) {
                return false
              }
            }
          }
        }
      }
    }

    return true
  }

  private placeShip(
    row: number,
    col: number,
    orientation: 'H' | 'V',
    size: number,
    shipId: number
  ): void {
    if (orientation === 'H') {
      for (let i = 0; i < size; i++) {
        this._grid[row][col + i].shipId = shipId
      }
    } else {
      for (let i = 0; i < size; i++) {
        this._grid[row + i][col].shipId = shipId
      }
    }
  }

  public placeShipsFromArray(): boolean {
    const shipGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

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
