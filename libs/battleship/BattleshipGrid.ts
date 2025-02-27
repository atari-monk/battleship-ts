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
    const columnLabels =
      '   ' +
      Array.from({ length: this.cols }, (_, i) =>
        String.fromCharCode(65 + i)
      ).join(' ')

    const gridRows = this.grid
      .map(
        (row, rowIndex) =>
          (rowIndex + 1).toString().padStart(2, ' ') +
          ' ' +
          row
            .map((cell) =>
              cell.isHit ? (cell.shipId !== undefined ? 'X' : 'O') : '-'
            )
            .join(' ')
      )
      .join('\n')

    return columnLabels + '\n' + gridRows
  }

  labelToIndex(label: string): { row: number; col: number } | null {
    const match = label.match(/^([A-J])(\d{1,2})$/i)
    if (!match) return null

    const col = match[1].toUpperCase().charCodeAt(0) - 65
    const row = parseInt(match[2], 10) - 1

    return row >= 0 && row < this.rows && col >= 0 && col < this.cols
      ? { row, col }
      : null
  }

  hitCell(label: string): boolean {
    const position = this.labelToIndex(label)
    if (!position) return false

    const { row, col } = position
    this.grid[row][col].isHit = true
    return true
  }
}
