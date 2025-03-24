import {BattleshipGrid} from '../libs/battleship'

describe('FleetPlacer', () => {
  test('Fleet should be placed with correct ship count', () => {
    const grid = new BattleshipGrid()
    const success = grid.placeFleet(true)

    expect(success).toBe(true)

    const shipCells = countShipCells(grid)
    const expectedShipCells = 5 + 4 + 3 + 3 + 2

    expect(shipCells).toBe(expectedShipCells)
  })

  test('Ships should not overlap', () => {
    const grid = new BattleshipGrid()
    grid.placeFleet(true)

    const shipCells: Set<string> = new Set()

    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        if (grid.grid[row][col].shipId !== undefined) {
          const key = `${row},${col}`
          expect(shipCells.has(key)).toBe(false)
          shipCells.add(key)
        }
      }
    }
  })

  test('Ships should have at least one empty cell between them if spacing is enforced', () => {
    const grid = new BattleshipGrid()
    grid.placeFleet(true)

    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const currentShipId = grid.grid[row][col].shipId

        if (currentShipId !== undefined) {
          for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
              if (
                i >= 0 &&
                i < grid.rows &&
                j >= 0 &&
                j < grid.cols &&
                (i !== row || j !== col)
              ) {
                const adjacentShipId = grid.grid[i][j].shipId
                if (
                  adjacentShipId !== undefined &&
                  adjacentShipId !== currentShipId
                ) {
                  throw new Error(
                    `❌ Ships ${currentShipId} and ${adjacentShipId} are adjacent at (${row},${col})!`
                  )
                }
              }
            }
          }
        }
      }
    }

    console.log('✅ All ships have at least one cell of spacing!')
  })
})

function countShipCells(grid: BattleshipGrid): number {
  let count = 0
  for (let row = 0; row < grid.rows; row++) {
    for (let col = 0; col < grid.cols; col++) {
      if (grid.grid[row][col].shipId !== undefined) {
        count++
      }
    }
  }
  return count
}
