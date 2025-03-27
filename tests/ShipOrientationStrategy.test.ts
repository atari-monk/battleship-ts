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
})
