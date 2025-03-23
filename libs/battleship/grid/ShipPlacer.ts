import {GridCell} from './type/GridCell'

export class ShipPlacer {
  static placeShipsFromArray(
    shipGrid: number[][],
    grid: GridCell[][],
    rows: number,
    cols: number
  ): boolean {
    if (shipGrid.length !== rows || shipGrid[0].length !== cols) {
      console.error('The grid must be 10x10.')
      return false
    }

    let shipId = 1
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (shipGrid[row][col] === 1 && grid[row][col].shipId === undefined) {
          grid[row][col].shipId = shipId
        }
      }
    }

    return true
  }
}
