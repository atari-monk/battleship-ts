import {BattleshipGrid} from '../libs/battleship'

describe('BattleshipGrid hitCell', () => {
  test('hitCell should mark the correct cell as hit and return expected result', () => {
    const grid = new BattleshipGrid()

    let result = grid.hitCell('A1')
    expect(result).toEqual({
      label: 'A1',
      alreadyHit: false,
      shipHit: expect.any(Boolean),
    })
    expect(grid.grid[0][0].isHit).toBe(true)

    result = grid.hitCell('C3')
    expect(result).toEqual({
      label: 'C3',
      alreadyHit: false,
      shipHit: expect.any(Boolean),
    })
    expect(grid.grid[2][2].isHit).toBe(true)

    result = grid.hitCell('J10')
    expect(result).toEqual({
      label: 'J10',
      alreadyHit: false,
      shipHit: expect.any(Boolean),
    })
    expect(grid.grid[9][9].isHit).toBe(true)
  })

  test('hitCell should throw an error for invalid inputs', () => {
    const grid = new BattleshipGrid()

    expect(() => grid.hitCell('K1')).toThrow(Error)
    expect(() => grid.hitCell('A11')).toThrow(Error)
    expect(() => grid.hitCell('Z5')).toThrow(Error)
    expect(() => grid.hitCell('5B')).toThrow(Error)
    expect(() => grid.hitCell('')).toThrow(Error)
  })

  test('hitCell should return alreadyHit: true if the same cell is hit twice', () => {
    const grid = new BattleshipGrid()

    let result = grid.hitCell('B2')
    expect(result).toEqual({
      label: 'B2',
      alreadyHit: false,
      shipHit: expect.any(Boolean),
    })

    result = grid.hitCell('B2')
    expect(result).toEqual({
      label: 'B2',
      alreadyHit: true,
      shipHit: expect.any(Boolean),
    })

    result = grid.hitCell('E5')
    expect(result).toEqual({
      label: 'E5',
      alreadyHit: false,
      shipHit: expect.any(Boolean),
    })

    result = grid.hitCell('E5')
    expect(result).toEqual({
      label: 'E5',
      alreadyHit: true,
      shipHit: expect.any(Boolean),
    })

    result = grid.hitCell('H7')
    expect(result).toEqual({
      label: 'H7',
      alreadyHit: false,
      shipHit: expect.any(Boolean),
    })

    result = grid.hitCell('H7')
    expect(result).toEqual({
      label: 'H7',
      alreadyHit: true,
      shipHit: expect.any(Boolean),
    })
  })
})
