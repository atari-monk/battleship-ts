import { BattleshipGrid } from '../libs/battleship/BattleshipGrid'

describe('BattleshipGrid hitCell', () => {
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
