import {
  BattleshipAI,
  BattleshipGrid,
  ShipOrientationStrategy,
} from './../libs/battleship'
import {ShipOrientation} from '../libs/battleship/ai/type/Orientation'
import {AttackResult} from '../libs/battleship/ai/type/AttackResult'
import {Range} from '../libs/battleship/grid/type/Range'
import {EventEmitter} from '@atari-monk/event-emitter'

jest.mock('../libs/battleship/ai/BattleshipAI')
jest.mock('@atari-monk/event-emitter', () => {
  return {
    EventEmitter: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      emit: jest.fn(),
    })),
  }
})

describe('ShipOrientationStrategy', () => {
  let mockAI: jest.Mocked<BattleshipAI>
  let strategy: ShipOrientationStrategy

  beforeEach(() => {
    mockAI = new BattleshipAI(
      new BattleshipGrid(),
      new EventEmitter()
    ) as jest.Mocked<BattleshipAI>
    mockAI.getHitShip = jest.fn().mockReturnValue({
      hits: new Set(['B2']),
      orientation: ShipOrientation.Unknown,
    })
    mockAI.shotsTaken = new Set()

    strategy = new ShipOrientationStrategy(mockAI)
  })

  test('should initialize with default values', () => {
    expect(strategy).toBeDefined()
  })

  test('attack() should return a valid AttackResult', () => {
    const range: Range = {
      minLetter: 'A',
      maxLetter: 'J',
      minNumber: 1,
      maxNumber: 10,
    }

    const result: AttackResult = strategy.attack(range)

    expect(result).toHaveProperty('shot')
    expect(result).toHaveProperty('log')
    expect(mockAI.shotsTaken.has(result.shot)).toBeTruthy()
  })

  test('updateState() should update ship orientation', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['B2', 'B3']),
      orientation: ShipOrientation.Unknown,
      isSunk: false,
    })

    strategy.updateState()

    expect(mockAI.getHitShip()!.orientation).toBe(ShipOrientation.Vertical)
  })

  test('updateState() should set horizontal orientation when hits are aligned horizontally', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['C4', 'D4']),
      orientation: ShipOrientation.Unknown,
      isSunk: false,
    })

    strategy.updateState()

    expect(mockAI.getHitShip()!.orientation).toBe(ShipOrientation.Horizontal)
  })

  test('updateState() should not update orientation if there are less than two hits', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['D5']),
      orientation: ShipOrientation.Unknown,
      isSunk: false,
    })

    strategy.updateState()

    expect(mockAI.getHitShip()!.orientation).toBe(ShipOrientation.Unknown)
  })

  test('attack should not go outside grid when ship is near left edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['A5', 'B5']),
      orientation: ShipOrientation.Horizontal,
      isSunk: false,
    })

    const result1 = strategy.attack({} as Range)
    const result2 = strategy.attack({} as Range)
    const result3 = strategy.attack({} as Range)
    const result4 = strategy.attack({} as Range)

    expect(result1.shot).toBe('A4')
    expect(result2.shot).toBe('B5')
    expect(result3.shot).toBe('A6')
    expect(result4.shot).toBe('A4')
  })

  test('attack should not go outside grid when ship is near right edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['J5', 'I5']),
      orientation: ShipOrientation.Horizontal,
      isSunk: false,
    })

    const result1 = strategy.attack({} as Range)
    const result2 = strategy.attack({} as Range)
    const result3 = strategy.attack({} as Range)
    const result4 = strategy.attack({} as Range)

    expect(result1.shot).toBe('I5')
    expect(result2.shot).toBe('J4')
    expect(result3.shot).toBe('J6')
    expect(result4.shot).toBe('I5')
  })

  test('attack should not go outside grid when ship is near top edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['E1', 'E2']),
      orientation: ShipOrientation.Vertical,
      isSunk: false,
    })

    const result1 = strategy.attack({} as Range)
    const result2 = strategy.attack({} as Range)
    const result3 = strategy.attack({} as Range)
    const result4 = strategy.attack({} as Range)

    expect(result1.shot).toBe('D1')
    expect(result2.shot).toBe('F1')
    expect(result3.shot).toBe('E2')
    expect(result4.shot).toBe('D1')
  })

  test('attack should not go outside grid when ship is near bottom edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['E10', 'E9']),
      orientation: ShipOrientation.Vertical,
      isSunk: false,
    })

    const result1 = strategy.attack({} as Range)
    const result2 = strategy.attack({} as Range)
    const result3 = strategy.attack({} as Range)
    const result4 = strategy.attack({} as Range)

    expect(result1.shot).toBe('D10')
    expect(result2.shot).toBe('E9')
    expect(result3.shot).toBe('F10')
    expect(result4.shot).toBe('D10')
  })

  test('attack should not go outside grid when ship is near left top corner', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['A1', 'A2']),
      orientation: ShipOrientation.Vertical,
      isSunk: false,
    })

    const result1 = strategy.attack({} as Range)
    const result2 = strategy.attack({} as Range)
    const result3 = strategy.attack({} as Range)

    expect(result1.shot).toBe('B1')
    expect(result2.shot).toBe('A2')
    expect(result3.shot).toBe('B1')
  })
})
