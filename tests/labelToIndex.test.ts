import { BattleshipGrid } from '../libs/battleship/BattleshipGrid'

describe('BattleshipGrid labelToIndex', () => {
  test('labelToIndex should convert labels to correct row and column indices', () => {
    const grid = new BattleshipGrid()

    expect(grid.labelToIndex('A1')).toEqual({ row: 0, col: 0 })
    expect(grid.labelToIndex('C5')).toEqual({ row: 4, col: 2 })
    expect(grid.labelToIndex('J10')).toEqual({ row: 9, col: 9 })

    expect(grid.labelToIndex('A0')).toBeNull()
    expect(grid.labelToIndex('K1')).toBeNull()
    expect(grid.labelToIndex('J11')).toBeNull()
    expect(grid.labelToIndex('')).toBeNull()
    expect(grid.labelToIndex('B-2')).toBeNull()
    expect(grid.labelToIndex('5C')).toBeNull()
  })

  test('hitCell should mark the correct cell as hit and return true', () => {
    const grid = new BattleshipGrid()

    expect(grid.hitCell('A1')).toBe(true)
    expect(grid.grid[0][0].isHit).toBe(true)

    expect(grid.hitCell('C3')).toBe(true)
    expect(grid.grid[2][2].isHit).toBe(true)

    expect(grid.hitCell('J10')).toBe(true)
    expect(grid.grid[9][9].isHit).toBe(true)
  })

  test('hitCell should return false for invalid inputs', () => {
    const grid = new BattleshipGrid()

    expect(grid.hitCell('K1')).toBe(false)
    expect(grid.hitCell('A11')).toBe(false)
    expect(grid.hitCell('Z5')).toBe(false)
    expect(grid.hitCell('5B')).toBe(false)
    expect(grid.hitCell('')).toBe(false)
  })

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
