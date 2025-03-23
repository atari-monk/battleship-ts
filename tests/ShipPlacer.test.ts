import {GridCell} from './../libs/battleship/grid/type/GridCell'
import {ShipPlacer} from './../libs/battleship'

describe('ShipPlacer', () => {
  let grid: GridCell[][]

  beforeEach(() => {
    grid = Array(10)
      .fill(null)
      .map(() =>
        Array(10)
          .fill(null)
          .map(() => ({
            isHit: false,
          }))
      )
  })

  test('should correctly place ships from a valid ship grid', () => {
    const shipGrid = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    const result = ShipPlacer.placeShipsFromArray(shipGrid, grid, 10, 10)

    expect(result).toBe(true)
    expect(grid[0][0].shipId).toBe(1)
    expect(grid[0][1].shipId).toBeUndefined()
  })

  test('should return false for an invalid ship grid size', () => {
    const shipGrid = [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]

    const result = ShipPlacer.placeShipsFromArray(shipGrid, grid, 10, 10)

    expect(result).toBe(false)
  })

  test('should not overwrite ships during multiple writes', () => {
    const shipGrid = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    ShipPlacer.placeShipsFromArray(shipGrid, grid, 10, 10)

    const secondShipGrid = [
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]

    ShipPlacer.placeShipsFromArray(secondShipGrid, grid, 10, 10)

    expect(grid[0][0].shipId).toBe(1)
    expect(grid[1][0].shipId).toBe(1)

    expect(grid[0][1].shipId).toBe(1)
    expect(grid[1][1].shipId).toBe(1)

    expect(grid[2][0].shipId).toBeUndefined()
    expect(grid[9][9].shipId).toBeUndefined()
  })
})

