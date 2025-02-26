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
    expect(grid.toString()).toBe('- - -\n- - -\n- - -')
  })

  test('modifying a cell should reflect in toString output', () => {
    const grid = new BattleshipGrid(3, 3)
    grid.grid[1][1].isHit = true
    expect(grid.toString()).toBe('- - -\n- O -\n- - -')

    grid.grid[0][0].isHit = true
    grid.grid[0][0].shipId = 1
    expect(grid.toString()).toBe('X - -\n- O -\n- - -')
  })
})
