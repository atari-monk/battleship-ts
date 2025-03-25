import {GridCell} from '../libs/battleship/grid/type/GridCell'
import {DIRECTION} from '../libs/battleship/grid/type/DIRECTION'
import {BattleshipGrid} from '../libs/battleship/index'

describe('BattleshipGrid', () => {
  describe('constructor', () => {
    test('should initialize a 10x10 grid by default', () => {
      const grid = new BattleshipGrid()
      expect(grid.rows).toBe(10)
      expect(grid.cols).toBe(10)
      expect(grid.grid.length).toBe(10)
      expect(grid.grid[0].length).toBe(10)

      grid.grid.forEach(row =>
        row.forEach(cell => {
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

  describe('hitCell', () => {
    let grid: BattleshipGrid

    beforeEach(() => {
      grid = new BattleshipGrid()
      grid.grid[0][0] = {isHit: false, shipId: 1} as GridCell
      grid.grid[0][1] = {isHit: false, shipId: undefined} as GridCell
      grid.grid[0][2] = {isHit: false, shipId: 2} as GridCell
    })

    test('should mark the correct cell as hit and return expected result', () => {
      let result = grid.hitCell('A1')
      expect(grid.grid[0][0].isHit).toBe(true)
      expect(result).toEqual({
        label: 'A1',
        alreadyHit: false,
        shipHit: true,
      })

      result = grid.hitCell('C3')
      expect(grid.grid[2][2].isHit).toBe(true)
      expect(result).toEqual({
        label: 'C3',
        alreadyHit: false,
        shipHit: false,
      })

      result = grid.hitCell('J10')
      expect(grid.grid[9][9].isHit).toBe(true)
      expect(result).toEqual({
        label: 'J10',
        alreadyHit: false,
        shipHit: false,
      })
    })

    test('should correctly register a ship hit', () => {
      const result = grid.hitCell('A1')
      expect(result).toEqual({
        label: 'A1',
        alreadyHit: false,
        shipHit: true,
      })
      expect(grid.grid[0][0].isHit).toBe(true)
    })

    test('should correctly register a miss', () => {
      const result = grid.hitCell('A2')
      expect(result).toEqual({
        label: 'A2',
        alreadyHit: false,
        shipHit: false,
      })
      expect(grid.grid[1][0].isHit).toBe(true)
    })

    test('should correctly register multiple hits on different ships', () => {
      grid.hitCell('A1')
      grid.hitCell('A3')

      expect(grid.grid[0][0].isHit).toBe(true)
      expect(grid.grid[2][0].isHit).toBe(true)
      expect(grid.grid[0][1].isHit).toBe(false)
    })
  })

  describe('isMissNextTo', () => {
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

  describe('getShipType', () => {
    let grid: BattleshipGrid

    beforeEach(() => {
      grid = new BattleshipGrid()
    })

    it('should return the correct ship type for a given shipId', () => {
      expect(grid.getShipType(1)).toBe('C')
      expect(grid.getShipType(2)).toBe('B')
      expect(grid.getShipType(3)).toBe('D')
      expect(grid.getShipType(4)).toBe('S')
      expect(grid.getShipType(5)).toBe('P')
    })

    it('should return "?" if no ship is found for the given shipId', () => {
      expect(grid.getShipType(999)).toBe('?')
    })
  })

  describe('isGameOver', () => {
    test('should return true when the game is over (all cells are hit)', () => {
      const mockGrid: GridCell[][] = Array.from({length: 10}, () =>
        Array.from({length: 10}, () => ({isHit: true}))
      )

      const grid = new BattleshipGrid(10, 10, mockGrid)

      expect(grid.isGameOver()).toBe(true)
    })

    test('should return false when the game is not over (some cells are not hit)', () => {
      const mockGrid: GridCell[][] = Array.from({length: 10}, () =>
        Array.from({length: 10}, () => ({
          isHit: false,
          shipId: undefined,
        }))
      )
      mockGrid[0][0] = {isHit: true, shipId: 1}
      mockGrid[0][1] = {isHit: false, shipId: 1}

      const grid = new BattleshipGrid(10, 10, mockGrid)

      expect(grid.isGameOver()).toBe(false)
    })

    test('should return true when all ships are sunk (every ship has been hit)', () => {
      const mockGrid: GridCell[][] = Array.from({length: 10}, () =>
        Array.from({length: 10}, () => ({isHit: true, shipId: 1}))
      )

      const grid = new BattleshipGrid(10, 10, mockGrid)

      expect(grid.isGameOver()).toBe(true)
    })

    test('should return false when only some ships are hit', () => {
      const mockGrid: GridCell[][] = Array.from({length: 10}, () =>
        Array.from({length: 10}, () => ({
          isHit: false,
          shipId: undefined,
        }))
      )
      mockGrid[0][0] = {isHit: true, shipId: 1}
      mockGrid[0][1] = {isHit: true, shipId: 1}
      mockGrid[1][0] = {isHit: false, shipId: 2}
      mockGrid[1][1] = {isHit: false, shipId: 2}

      const grid = new BattleshipGrid(10, 10, mockGrid)

      expect(grid.isGameOver()).toBe(false)
    })

    test('should return false when all non-ship cells are hit, but a ship cell remains', () => {
      const mockGrid: GridCell[][] = Array.from({length: 10}, () =>
        Array.from({length: 10}, () => ({isHit: true}))
      )
      mockGrid[2][2] = {isHit: false, shipId: 1}

      const grid = new BattleshipGrid(10, 10, mockGrid)

      expect(grid.isGameOver()).toBe(false)
    })

    test('should return true when the last remaining ship cell is hit', () => {
      const mockGrid: GridCell[][] = Array.from({length: 10}, () =>
        Array.from({length: 10}, () => ({isHit: true}))
      )
      mockGrid[2][2] = {isHit: false, shipId: 1}

      const grid = new BattleshipGrid(10, 10, mockGrid)

      grid.hitCell('C3')

      expect(grid.isGameOver()).toBe(true)
    })
  })
})
