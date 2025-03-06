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
    const target = this._ai.getShipToSink()!

    let shot = ''
    let direction = this.getRandomDirection(target.orientation)
    let cell = this.getLabelsFromSet(
      target.hits,
      direction,
      target.orientation
    )!

    const isEnd = this._ai.enemyGrid.isMissNextTo(cell, direction)

    if (isEnd) {
      direction = this.getOppositeDirection(direction)
      cell = this.getLabelsFromSet(target.hits, direction, target.orientation)!
    }

    const cellIndex = labelToIndex(cell)!
    let shotIndex = { row: cellIndex.row, col: cellIndex.col }

    if (target.orientation === ShipOrientation.Horizontal) {
      if (direction === DIRECTION.LEFT) shotIndex.col--
      if (direction === DIRECTION.RIGHT) shotIndex.col++
    } else {
      if (direction === DIRECTION.UP) shotIndex.row--
      if (direction === DIRECTION.DOWN) shotIndex.row++
    }

    shot = indexToLabel(shotIndex.row, shotIndex.col)!

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
    direction: DIRECTION,
    orientation: ShipOrientation
  ): string | null {
    if (labels.size === 0) return null

    const labelArray = Array.from(labels)
    labelArray.sort((a, b) => {
      const { row: xA, col: yA } = labelToIndex(a)!
      const { row: xB, col: yB } = labelToIndex(b)!
      return orientation === ShipOrientation.Horizontal ? yA - yB : xA - xB
    })

    return direction === DIRECTION.LEFT || direction === DIRECTION.UP
      ? labelArray[0]
      : labelArray[labelArray.length - 1]
  }

  private getRandomDirection(orientation: ShipOrientation): DIRECTION {
    if (orientation === ShipOrientation.Horizontal) {
      return coinToss() ? DIRECTION.LEFT : DIRECTION.RIGHT
    } else {
      return coinToss() ? DIRECTION.UP : DIRECTION.DOWN
    }
  }

  private getOppositeDirection(direction: DIRECTION): DIRECTION {
    switch (direction) {
      case DIRECTION.LEFT:
        return DIRECTION.RIGHT
      case DIRECTION.RIGHT:
        return DIRECTION.LEFT
      case DIRECTION.UP:
        return DIRECTION.DOWN
      case DIRECTION.DOWN:
        return DIRECTION.UP
    }
  }
}
