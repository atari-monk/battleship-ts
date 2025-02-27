import { BattleshipGrid } from './../libs/battleship/BattleshipGrid'

describe('BattleshipGrid', () => {
  test('should initialize a 10x10 grid by default', () => {
    const grid = new BattleshipGrid()
    expect(grid.rows).toBe(10)
    expect(grid.cols).toBe(10)
    expect(grid.grid.length).toBe(10)
    expect(grid.grid[0].length).toBe(10)

    grid.grid.forEach((row) =>
      row.forEach((cell) => {
        expect(cell.isHit).toBe(false)
        expect(cell.shipId).toBeUndefined()
      })
    )
  })

  test('should initialize a custom-sized grid', () => {
    const grid = new BattleshipGrid(5, 5)
    expect(grid.rows).toBe(5)
    expect(grid.cols).toBe(5)
    expect(grid.grid.length).toBe(5)
    expect(grid.grid[0].length).toBe(5)
  })

  test('toString should return a string representation of the grid', () => {
    const grid = new BattleshipGrid(3, 3)
    const expectedOutput =
      '   A B C\n' + ' 1 - - -\n' + ' 2 - - -\n' + ' 3 - - -'

    const output = grid.toString()
    expect(output).toBe(expectedOutput)
  })

  test('modifying a cell should reflect in toString output', () => {
    const grid = new BattleshipGrid(3, 3)

    grid.grid[1][1].isHit = true
    let expectedOutput = '   A B C\n' + ' 1 - - -\n' + ' 2 - O -\n' + ' 3 - - -'
    expect(grid.toString()).toBe(expectedOutput)

    grid.grid[0][0].isHit = true
    grid.grid[0][0].shipId = 1
    expectedOutput = '   A B C\n' + ' 1 X - -\n' + ' 2 - O -\n' + ' 3 - - -'
    expect(grid.toString()).toBe(expectedOutput)
  })

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
})
