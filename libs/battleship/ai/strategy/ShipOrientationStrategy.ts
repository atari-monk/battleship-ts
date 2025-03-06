import { BattleshipAI } from '../BattleshipAI'
import { IStrategy } from '../type/IStrategy'
import { Range } from '../../grid/type/Range'
import {
  getRandomOrientation,
  Orientation,
  ShipOrientation,
} from '../type/Orientation'
import { coinToss } from '../../util/random'
import { AttackResult } from '../type/AttackResult'
import { DIRECTION } from '../type/DIRECTION'
import { indexToLabel, labelToIndex } from '../../util/grid'

export class ShipOrientationStrategy implements IStrategy {
  private _ai
  private orientation: Orientation = Orientation.Horizontal
  private counter: Set<DIRECTION> = new Set()

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): AttackResult {
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

  private getNextMove(hit: { row: number; col: number }) {
    this.orientation = getRandomOrientation()

    if (this.counter.has(DIRECTION.LEFT) && this.counter.has(DIRECTION.RIGHT)) {
      this.orientation = Orientation.Vertical
    }
    if (this.counter.has(DIRECTION.UP) && this.counter.has(DIRECTION.DOWN)) {
      this.orientation = Orientation.Horizontal
    }

    let next = { row: hit.row, col: hit.col }

    if (this.orientation === Orientation.Horizontal) {
      if (!this.counter.has(DIRECTION.LEFT) && coinToss()) {
        this.counter.add(DIRECTION.LEFT)
        next.row--
      } else if (!this.counter.has(DIRECTION.RIGHT)) {
        this.counter.add(DIRECTION.RIGHT)
        next.row++
      }
    } else {
      if (!this.counter.has(DIRECTION.DOWN) && coinToss()) {
        this.counter.add(DIRECTION.DOWN)
        next.col--
      } else if (!this.counter.has(DIRECTION.UP)) {
        this.counter.add(DIRECTION.UP)
        next.col++
      }
    }
    return next
  }

  private reset() {
    this.counter.clear()
  }
}
