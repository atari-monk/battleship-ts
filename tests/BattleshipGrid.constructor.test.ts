import { BattleshipGrid } from '../libs/battleship'

describe('BattleshipGrid constructor', () => {
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
})
