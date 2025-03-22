import {GridCell} from './type/GridCell'
import {Ship} from './type/Ship'

export class FleetPlacer {
  constructor(
    private grid: GridCell[][],
    private rows: number,
    private cols: number
  ) {}

  public placeFleet(ships: Ship[], enforceSpacing: boolean = true): boolean {
    for (const ship of ships) {
      let placed = false
      let attempts = 0

      while (!placed && attempts < 100) {
        const orientation = Math.random() < 0.5 ? 'H' : 'V'
        const maxRow = orientation === 'V' ? this.rows - ship.size : this.rows
        const maxCol = orientation === 'H' ? this.cols - ship.size : this.cols
        const row = Math.floor(Math.random() * maxRow)
        const col = Math.floor(Math.random() * maxCol)

        if (
          this.canPlaceShip(row, col, orientation, ship.size, enforceSpacing)
        ) {
          this.placeShip(row, col, orientation, ship)
          placed = true
        }
        attempts++
      }

      if (!placed) {
        console.error(
          `Failed to place ship of size ${ship.size} after 100 attempts.`
        )
        return false
      }
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

    return this.isValidPlacement(coords, enforceSpacing)
  }

  private isValidPlacement(
    coords: {row: number; col: number}[],
    enforceSpacing: boolean
  ): boolean {
    for (const {row, col} of coords) {
      if (this.grid[row][col].shipId !== undefined) return false
    }

    if (enforceSpacing) {
      for (const {row: r, col: c} of coords) {
        for (let i = r - 1; i <= r + 1; i++) {
          for (let j = c - 1; j <= c + 1; j++) {
            if (i >= 0 && i < this.rows && j >= 0 && j < this.cols) {
              if (this.grid[i][j].shipId !== undefined) return false
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
    ship: Ship
  ): void {
    if (orientation === 'H') {
      for (let i = 0; i < ship.size; i++) {
        this.grid[row][col + i].shipId = ship.id
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        this.grid[row + i][col].shipId = ship.id
      }
    }
  }
}

