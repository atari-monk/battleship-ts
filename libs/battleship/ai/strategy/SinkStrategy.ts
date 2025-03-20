import {BattleshipAI} from '../BattleshipAI'
import {IStrategy} from '../type/IStrategy'
import {Range} from '../../grid/type/Range'
import {AttackResult} from '../type/AttackResult'
import {DIRECTION} from '../type/DIRECTION'
import {ShipOrientation} from '../type/Orientation'
import {coinToss} from '../../util/random'
import {indexToLabel, labelToIndex, sortLabels} from '../../util/grid'
import {ShipTarget} from '../type/ShipTarget'

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
    let shotIndex = {row: cellIndex.row, col: cellIndex.col}

    if (target.orientation === ShipOrientation.Horizontal) {
      if (direction === DIRECTION.LEFT) shotIndex.col--
      if (direction === DIRECTION.RIGHT) shotIndex.col++
    } else {
      if (direction === DIRECTION.UP) shotIndex.row--
      if (direction === DIRECTION.DOWN) shotIndex.row++
    }

    shot = indexToLabel(shotIndex.row, shotIndex.col)!

    if (this.isShipSunk(target)) {
      target.isSunk = true
    }

    this._ai.shotsTaken.add(shot)
    return {
      shot,
      log: (isShipHit: boolean) =>
        `Player 2: ${shot} ${isShipHit ? 'hit' : 'miss'} AI: Sink`,
    }
  }

  updateState(): void {}

  public test_getLabelsFromSet(
    labels: Set<string>,
    direction: DIRECTION,
    orientation: ShipOrientation
  ): string | null {
    return this.getLabelsFromSet(labels, direction, orientation)
  }

  private getLabelsFromSet(
    labels: Set<string>,
    direction: DIRECTION,
    orientation: ShipOrientation
  ): string | null {
    if (labels.size === 0) return null

    const sortedLabels = sortLabels(labels, orientation)
    return direction === DIRECTION.LEFT || direction === DIRECTION.UP
      ? sortedLabels[0]
      : sortedLabels[sortedLabels.length - 1]
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

  private isShipSunk(ship: ShipTarget): boolean {
    const sortedHits = sortLabels(ship.hits, ship.orientation)

    if (ship.orientation === ShipOrientation.Horizontal) {
      const leftCell = sortedHits[0]
      const rightCell = sortedHits[sortedHits.length - 1]
      const leftMiss = this._ai.enemyGrid.isMissNextTo(leftCell, DIRECTION.LEFT)
      const rightMiss = this._ai.enemyGrid.isMissNextTo(
        rightCell,
        DIRECTION.RIGHT
      )

      if (leftMiss && rightMiss) {
        return true
      }
    } else if (ship.orientation === ShipOrientation.Vertical) {
      const topCell = sortedHits[0]
      const bottomCell = sortedHits[sortedHits.length - 1]
      const topMiss = this._ai.enemyGrid.isMissNextTo(topCell, DIRECTION.UP)
      const bottomMiss = this._ai.enemyGrid.isMissNextTo(
        bottomCell,
        DIRECTION.DOWN
      )

      if (topMiss && bottomMiss) {
        return true
      }
    }

    return false
  }
}
