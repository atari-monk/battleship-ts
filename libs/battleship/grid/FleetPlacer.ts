import {GridCell} from './type/GridCell'

export class FleetPlacer {
  constructor(
    private grid: GridCell[][],
    private rows: number,
    private cols: number
  ) {}

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
    const coords: {row: number; col: number}[] = []

    if (orientation === 'H') {
      if (col + size > this.cols) return false
      for (let i = 0; i < size; i++) {
        coords.push({row, col: col + i})
      }
    } else {
      if (row + size > this.rows) return false
      for (let i = 0; i < size; i++) {
        coords.push({row: row + i, col})
      }
    }

    for (const {row, col} of coords) {
      if (this.grid[row][col].shipId !== undefined) {
        return false
      }
    }

    if (enforceSpacing) {
      for (const {row: r, col: c} of coords) {
        for (let i = r - 1; i <= r + 1; i++) {
          for (let j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
              if (this.grid[i][j].shipId !== undefined) {
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
        this.grid[row][col + i].shipId = shipId
      }
    } else {
      for (let i = 0; i < size; i++) {
        this.grid[row + i][col].shipId = shipId
      }
    }
  }
}
