import { BattleshipAI } from '../BattleshipAI'
import { IStrategy } from '../type/IStrategy'
import { Range } from '../../grid/type/Range'
import { AttackResult } from '../type/AttackResult'
import { DIRECTION } from '../type/DIRECTION'
import { ShipOrientation } from '../type/Orientation'
import { coinToss } from '../../util/random'
import { indexToLabel, labelToIndex } from '../../util/grid'

export class SinkStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): AttackResult {
    const target = this._ai.getShipToSink()

    let shot = ''
    if (target?.orientation === ShipOrientation.Horizontal) {
      let direction = this.getRandomDirection()

      let cell = this.getLabelsFromSet(target!.hits, direction)!
      
      const isEnd = this._ai.enemyGrid.isMissNextTo(cell, direction)

      if (isEnd) {
        direction = this.getOppositeDirection(direction)
        cell = this.getLabelsFromSet(target!.hits, direction)!
      }

      const cellIndex = labelToIndex(cell)!

      let shotIndex: { row: number; col: number } = {
        row: cellIndex!.row,
        col: cellIndex!.col,
      }
      if (direction === DIRECTION.LEFT) shotIndex.col = cellIndex!.col - 1
      if (direction === DIRECTION.RIGHT) shotIndex.col = cellIndex!.col + 1
      shot = indexToLabel(shotIndex.row, shotIndex.col)!
    }

    this._ai.shotsTaken.add(shot)
    return {
      shot,
      log: (isShipHit: boolean) =>
        `Player 2: ${shot} ${isShipHit ? 'hit' : 'miss'} AI: Sink`,
    }
  }

  updateState(): void {}

  private getLabelsFromSet(
    labels: Set<string>,
    direction: DIRECTION
  ): string | null {
    const labelArray = Array.from(labels).sort()

    if (labelArray.length < 2) {
      throw new Error('Not enough labels in the set.')
    }

    const label1 = labelArray[0]
    const label2 = labelArray[1]

    return this.getAdjacentLabel(label1, label2, direction)
  }

  private getAdjacentLabel(
    label1: string,
    label2: string,
    direction: DIRECTION
  ): string {
    if (direction === DIRECTION.LEFT) {
      return label1 < label2 ? label1 : label2
    } else if (direction === DIRECTION.RIGHT) {
      return label1 > label2 ? label1 : label2
    } else {
      throw new Error("Direction must be 'left' or 'right'")
    }
  }

  private getRandomDirection(): DIRECTION {
    return coinToss() ? DIRECTION.LEFT : DIRECTION.RIGHT
  }

  private getOppositeDirection(direction: DIRECTION): DIRECTION {
    return direction === DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT
  }
}
