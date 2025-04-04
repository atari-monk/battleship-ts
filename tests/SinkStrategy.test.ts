import {DIRECTION} from '../libs/battleship/grid/type/DIRECTION'
import {ShipOrientation} from '../libs/battleship/ai/type/Orientation'
import {SinkStrategy} from '../libs/battleship/ai/strategy/SinkStrategy'

jest.mock('../libs/battleship', () => ({
  labelToIndex: jest.fn((label: string) => {
    const mapping: Record<string, {row: number; col: number}> = {
      C5: {row: 2, col: 5},
      D5: {row: 3, col: 5},
      E5: {row: 4, col: 5},
      F5: {row: 5, col: 5},
    }
    return mapping[label] || null
  }),
}))

describe('SinkStrategy test_getLabelsFromSet', () => {
  let strategy: SinkStrategy

  beforeEach(() => {
    strategy = new SinkStrategy({} as any)
  })

  it('should return the leftmost label when direction is LEFT and orientation is Horizontal', () => {
    const labels = new Set(['D5', 'F5', 'E5', 'C5'])
    const result = strategy.test_getLabelsFromSet(
      labels,
      DIRECTION.LEFT,
      ShipOrientation.Horizontal
    )
    expect(result).toBe('C5')
  })

  it('should return the rightmost label when direction is RIGHT and orientation is Horizontal', () => {
    const labels = new Set(['D5', 'F5', 'E5', 'C5'])
    const result = strategy.test_getLabelsFromSet(
      labels,
      DIRECTION.RIGHT,
      ShipOrientation.Horizontal
    )
    expect(result).toBe('F5')
  })
})
