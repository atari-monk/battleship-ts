import {GridCell} from './type/GridCell'
import {Ship} from './type/Ship'
import {IFleetPlacer} from './type/IFleetPlacer'

export class FleetPlacer implements IFleetPlacer {
  public placeFleet(
    ships: Ship[],
    grid: GridCell[][],
    rows: number,
    cols: number,
    enforceSpacing: boolean = true
  ): boolean {
    for (const ship of ships) {
      let placed = false
      let attempts = 0

      while (!placed && attempts < 100) {
        const orientation = Math.random() < 0.5 ? 'H' : 'V'
        const maxRow = orientation === 'V' ? rows - ship.size : rows
        const maxCol = orientation === 'H' ? cols - ship.size : cols
        const row = Math.floor(Math.random() * maxRow)
        const col = Math.floor(Math.random() * maxCol)

        if (
          this.canPlaceShip(
            row,
            col,
            orientation,
            ship.size,
            grid,
            rows,
            cols,
            enforceSpacing
          )
        ) {
          this.placeShip(row, col, orientation, ship, grid)
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
    grid: GridCell[][],
    rows: number,
    cols: number,
    enforceSpacing: boolean
  ): boolean {
    const coords: {row: number; col: number}[] = []

    if (orientation === 'H') {
      if (col + size > cols) return false
      for (let i = 0; i < size; i++) {
        coords.push({row, col: col + i})
      }
    } else {
      if (row + size > rows) return false
      for (let i = 0; i < size; i++) {
        coords.push({row: row + i, col})
      }
    }

    return this.isValidPlacement(coords, grid, rows, cols, enforceSpacing)
  }

  private isValidPlacement(
    coords: {row: number; col: number}[],
    grid: GridCell[][],
    rows: number,
    cols: number,
    enforceSpacing: boolean
  ): boolean {
    // Check if cells are already occupied.
    for (const {row, col} of coords) {
      if (grid[row][col].shipId !== undefined) return false
    }

    // Optionally enforce spacing around the ship.
    if (enforceSpacing) {
      for (const {row, col} of coords) {
        for (let i = row - 1; i <= row + 1; i++) {
          for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols) {
              if (grid[i][j].shipId !== undefined) return false
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
    ship: Ship,
    grid: GridCell[][]
  ): void {
    if (orientation === 'H') {
      for (let i = 0; i < ship.size; i++) {
        grid[row][col + i].shipId = ship.id
      }
    } else {
      for (let i = 0; i < ship.size; i++) {
        grid[row + i][col].shipId = ship.id
      }
    }
  }
}

