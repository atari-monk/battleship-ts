import {BattleshipAI} from '../BattleshipAI'
import {IStrategy} from '../type/IStrategy'
import {Range} from '../../grid/type/Range'
import {ShipOrientation} from '../type/Orientation'
import {AttackResult} from '../type/AttackResult'
import {indexToLabel, labelToIndex} from '../../grid/grid_util'
import {DIRECTION} from '../../grid/type/DIRECTION'

type Coord = {row: number; col: number}

export class ShipOrientationStrategy implements IStrategy {
  private _ai
  private MOVE_MAP: Record<DIRECTION, Coord>
  private directions: DIRECTION[]
  private directionIndex: number
  private directionChecks: ((hit: Coord) => boolean)[]

  constructor(ai: BattleshipAI) {
    this._ai = ai
    this.MOVE_MAP = this.getMoveMap()
    this.directions = [
      DIRECTION.LEFT,
      DIRECTION.UP,
      DIRECTION.RIGHT,
      DIRECTION.DOWN,
    ]
    this.directionIndex = 0
    this.directionChecks = [
      (hit: Coord) =>
        this.directions[this.directionIndex] === DIRECTION.LEFT &&
        hit.col === 0,
      (hit: Coord) =>
        this.directions[this.directionIndex] === DIRECTION.UP && hit.row === 0,
      (hit: Coord) =>
        this.directions[this.directionIndex] === DIRECTION.RIGHT &&
        hit.col === 9,
      (hit: Coord) =>
        this.directions[this.directionIndex] === DIRECTION.DOWN &&
        hit.row === 9,
    ]
  }

  private getMoveMap(): Record<DIRECTION, Coord> {
    return {
      [DIRECTION.LEFT]: {row: 0, col: -1},
      [DIRECTION.UP]: {row: -1, col: 0},
      [DIRECTION.RIGHT]: {row: 0, col: 1},
      [DIRECTION.DOWN]: {row: 1, col: 0},
    }
  }

  attack(_: Range): AttackResult {
    const target = this._ai.getHitShip()!
    const hit = labelToIndex([...target.hits][0])!
    const next = this.getNextMove(hit)
    const shot = indexToLabel(next.row, next.col)!

    this._ai.shotsTaken.add(shot)

    return {
      shot,
      log: (isShipHit: boolean) =>
        `Player 2: ${shot} ${
          isShipHit ? 'hit' : 'miss'
        } AI: Ship Orientation orientation: ${
          ShipOrientation[target.orientation]
        }`,
    }
  }

  updateState(): void {
    const target = this._ai.getHitShip()!
    if (target.hits.size !== 2) return
    const [firstHit, secondHit] = [...target.hits]
    const hitPos1 = labelToIndex(firstHit)!
    const hitPos2 = labelToIndex(secondHit)!

    if (hitPos1.row === hitPos2.row) {
      target.orientation = ShipOrientation.Horizontal
    } else if (hitPos1.col === hitPos2.col) {
      target.orientation = ShipOrientation.Vertical
    }

    this.reset()
  }

  private getNextMove(hit: Coord) {
    let next = {row: hit.row, col: hit.col}

    let validMoveFound = false
    while (!validMoveFound) {
      if (!this.directionChecks[this.directionIndex](hit)) {
        validMoveFound = true
      } else {
        this.directionIndex = (this.directionIndex + 1) % this.directions.length
      }
    }

    const move = this.MOVE_MAP[this.directions[this.directionIndex]]
    next.row += move.row
    next.col += move.col

    this.directionIndex = (this.directionIndex + 1) % this.directions.length

    return next
  }

  private reset() {
    this.directionIndex = 0
  }
}
