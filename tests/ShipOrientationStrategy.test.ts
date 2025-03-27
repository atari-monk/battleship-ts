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

    let result: AttackResult

    do {
      result = strategy.attack({} as Range)
    } while (
      result.shot === 'A5' ||
      result.shot === 'B5' ||
      result.shot === 'A4' ||
      result.shot === 'A6'
    )

    expect(result.shot).not.toBe(null)
  })

  test('attack should not go outside grid when ship is near right edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['J5', 'I5']),
      orientation: ShipOrientation.Horizontal,
      isSunk: false,
    })

    let result: AttackResult

    do {
      result = strategy.attack({} as Range)
    } while (
      result.shot === 'J5' ||
      result.shot === 'I5' ||
      result.shot === 'J4' ||
      result.shot === 'J6'
    )

    expect(result.shot).not.toBe(null)
  })

  test('attack should not go outside grid when ship is near top edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['E1', 'E2']),
      orientation: ShipOrientation.Vertical,
      isSunk: false,
    })

    let result: AttackResult

    do {
      result = strategy.attack({} as Range)
    } while (
      result.shot === 'E1' ||
      result.shot === 'E2' ||
      result.shot === 'D1' ||
      result.shot === 'F1'
    )

    expect(result.shot).not.toBe(null)
  })

  test('attack should not go outside grid when ship is near bottom edge', () => {
    mockAI.getHitShip.mockReturnValue({
      hits: new Set(['E10', 'E9']),
      orientation: ShipOrientation.Vertical,
      isSunk: false,
    })

    let result: AttackResult

    do {
      result = strategy.attack({} as Range)
    } while (
      result.shot === 'E10' ||
      result.shot === 'E9' ||
      result.shot === 'D10' ||
      result.shot === 'F10'
    )

    expect(result.shot).not.toBe(null)
  })
})
