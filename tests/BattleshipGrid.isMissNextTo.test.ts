import {BattleshipGrid} from '../libs/battleship/index'
import {DIRECTION} from '../libs/battleship/ai/type/DIRECTION'
import {GridCell} from '../libs/battleship/grid/type/GridCell'

describe('BattleshipGrid - isMissNextTo', () => {
  let grid: BattleshipGrid

  beforeEach(() => {
    grid = new BattleshipGrid(5, 5)
  })

  test('should return false when checking next to an unhit cell', () => {
    expect(grid.isMissNextTo('B2', DIRECTION.RIGHT)).toBe(false)
  })

  test('should return false when checking next to a hit ship cell', () => {
    grid.grid[1][2] = {isHit: true, shipId: 1} as GridCell
    expect(grid.isMissNextTo('B2', DIRECTION.RIGHT)).toBe(false)
  })

  test('should return true when checking next to a hit miss cell', () => {
    grid.grid[1][2] = {isHit: true, shipId: undefined} as GridCell
    expect(grid.isMissNextTo('B2', DIRECTION.RIGHT)).toBe(true)
  })

  test('should return false when checking out-of-bounds (left edge)', () => {
    expect(grid.isMissNextTo('A3', DIRECTION.LEFT)).toBe(false)
  })

  test('should return false when checking out-of-bounds (top edge)', () => {
    expect(grid.isMissNextTo('C1', DIRECTION.UP)).toBe(false)
  })

  test('should return false when checking out-of-bounds (bottom edge)', () => {
    expect(grid.isMissNextTo('C5', DIRECTION.DOWN)).toBe(false)
  })

  test('should return false when checking out-of-bounds (right edge)', () => {
    expect(grid.isMissNextTo('E3', DIRECTION.RIGHT)).toBe(false)
  })

  test('should return false when there is a diagonal miss (should not count as adjacent)', () => {
    grid.grid[0][0] = {isHit: true, shipId: undefined} as GridCell
    expect(grid.isMissNextTo('B2', DIRECTION.LEFT)).toBe(false)
  })

  test('should return true when a corner cell has a miss next to it', () => {
    grid.grid[0][1] = {isHit: true, shipId: undefined} as GridCell
    expect(grid.isMissNextTo('A1', DIRECTION.RIGHT)).toBe(true)
  })

  test('should return false when the entire grid is unhit', () => {
    expect(grid.isMissNextTo('C3', DIRECTION.UP)).toBe(false)
  })
})
