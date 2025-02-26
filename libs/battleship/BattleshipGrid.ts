import { GridCell } from './GridCell'

export class BattleshipGrid {
  grid: GridCell[][]

  constructor(public rows: number = 10, public cols: number = 10) {
    this.grid = this.generateGrid()
  }

  private generateGrid(): GridCell[][] {
    return Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({
        isHit: false,
      }))
    )
  }

  toString(): string {
    return this.grid
      .map((row) =>
        row
          .map((cell) =>
            cell.isHit ? (cell.shipId !== undefined ? 'X' : 'O') : '-'
          )
          .join(' ')
      )
      .join('\n')
  }
}
