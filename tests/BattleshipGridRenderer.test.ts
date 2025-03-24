import {BattleshipGrid} from '../libs/battleship'
import {BattleshipGridRenderer} from '../libs/battleship'

describe('BattleshipGridRenderer', () => {
  test('render should return a string representation of the grid', () => {
    const grid = new BattleshipGrid(3, 3)
    const renderer = new BattleshipGridRenderer(grid) // Use the renderer to generate the output
    const expectedOutput =
      '   A B C\n' + ' 1 - - -\n' + ' 2 - - -\n' + ' 3 - - -'

    const output = renderer.render() // Rendering now uses the renderer
    expect(output).toBe(expectedOutput)
  })

  test('modifying a cell should reflect in render output', () => {
    const grid = new BattleshipGrid(3, 3)
    const renderer = new BattleshipGridRenderer(grid) // Use the renderer to generate the output

    grid.grid[1][1].isHit = true
    let expectedOutput = '   A B C\n' + ' 1 - - -\n' + ' 2 - O -\n' + ' 3 - - -'
    expect(renderer.render()).toBe(expectedOutput) // Rendering now uses the renderer

    grid.grid[0][0].isHit = true
    grid.grid[0][0].shipId = 1
    expectedOutput = '   A B C\n' + ' 1 X - -\n' + ' 2 - O -\n' + ' 3 - - -'
    expect(renderer.render()).toBe(expectedOutput) // Rendering now uses the renderer
  })
})
