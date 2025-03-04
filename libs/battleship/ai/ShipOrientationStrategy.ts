import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { Range } from '../grid/Range'
import {
  getRandomOrientation,
  Orientation,
  ShipOrientation,
} from './Orientation'
import { coinToss, randomSign } from './random'
import { GridUtils } from '../grid/GridUtils'

enum DIRECTION {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export class ShipOrientationStrategy implements IStrategy {
  private _ai
  private orientation: Orientation = Orientation.Horizontal
  private counter: Set<DIRECTION> = new Set()

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    const target = this._ai.getHit()!
    const hit = GridUtils.labelToIndex([...target.hits][0])!
    const next = this.getNextMove(hit)
    const shot = GridUtils.indexToLabel(next.row, next.col)!
    console.log(`Target: ${shot}`)
    return shot
  }

  updateState(): void {
    const target = this._ai.getHit()!
    if (target.hits.size !== 2) return
    const [firstHit, secondHit] = [...target.hits]
    const hitPos1 = GridUtils.labelToIndex(firstHit)!
    const hitPos2 = GridUtils.labelToIndex(secondHit)!

    if (hitPos1.row === hitPos2.row) {
      target.orientation = ShipOrientation.Horizontal
    } else if (hitPos1.col === hitPos2.col) {
      target.orientation = ShipOrientation.Vertical
    }
  }

  private getNextMove(hit: { row: number; col: number }) {
    this.orientation = getRandomOrientation()

    if (this.counter.has(DIRECTION.LEFT) && this.counter.has(DIRECTION.RIGHT)) {
      this.orientation = Orientation.Vertical
    }
    if (this.counter.has(DIRECTION.UP) && this.counter.has(DIRECTION.DOWN)) {
      this.orientation = Orientation.Horizontal
    }

    if (this.orientation === Orientation.Horizontal) {
      if (!this.counter.has(DIRECTION.LEFT) && coinToss()) {
        this.counter.add(DIRECTION.LEFT)
        return { row: hit.row - 1, col: hit.col }
      } else if (!this.counter.has(DIRECTION.RIGHT)) {
        this.counter.add(DIRECTION.RIGHT)
        return { row: hit.row + 1, col: hit.col }
      }
    } else {
      if (!this.counter.has(DIRECTION.DOWN) && coinToss()) {
        this.counter.add(DIRECTION.DOWN)
        return { row: hit.row, col: hit.col - 1 }
      } else if (!this.counter.has(DIRECTION.UP)) {
        this.counter.add(DIRECTION.UP)
        return { row: hit.row, col: hit.col + 1 }
      }
    }
    return { row: hit.row + randomSign(), col: hit.col + randomSign() }
  }
}
