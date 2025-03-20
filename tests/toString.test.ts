import {BattleshipGrid} from '../libs/battleship'

describe('BattleshipGrid toString', () => {
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
})
