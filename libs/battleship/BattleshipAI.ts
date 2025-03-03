import { BattleshipGrid } from './BattleshipGrid'
import { Range } from './Range'

enum State {
  Random,
  Target,
}

interface IStrategy {
  attack(range: Range): string
}

class RandomStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    const move = this.attackNewRandomCell(range)
    console.log(`Random: ${move}`)
    return move
  }

  private attackNewRandomCell(range: Range): string {
    let hit = this.getRandomCell(range)
    while (this._ai.shotsTaken.has(hit)) {
      hit = this.getRandomCell(range)
    }
    this._ai.shotsTaken.add(hit)
    return hit
  }

  private getRandomCell(range: Range): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const minLetterIndex = letters.indexOf(range.minLetter.toUpperCase())
    const maxLetterIndex = letters.indexOf(range.maxLetter.toUpperCase())

    const letter =
      letters[
        Math.floor(Math.random() * (maxLetterIndex - minLetterIndex + 1)) +
          minLetterIndex
      ]
    const number =
      Math.floor(Math.random() * (range.maxNumber - range.minNumber + 1)) +
      range.minNumber

    return letter + number
  }
}

class TargetStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): string {
    const move = this.attackShip()
    console.log(`Target: ${move}`)
    return move
  }

  private attackShip(): string {
    const target = this._ai.getTarget()
    const cell = this._ai.enemyGrid.labelToIndex(target)!

    const directionsX = { left: -1, right: 1 }
    const directionX = Math.random() < 0.5 ? 'left' : 'right'

    const directionsY = { up: -1, down: 1 }
    const directionY = Math.random() < 0.5 ? 'up' : 'down'

    const direction = Math.random() < 0.5 ? 'X' : 'Y'

    let hitRow = cell.row
    let hitCol = cell.col

    if (direction === 'X') {
      hitRow += directionsX[directionX]
    } else {
      hitCol += directionsY[directionY]
    }

    return this._ai.enemyGrid.indexToLabel(hitRow, hitCol)!
  }
}

class StateMachine {
  private state: State
  private randomStrategy: IStrategy
  private targetStrategy: IStrategy

  constructor(ai: BattleshipAI) {
    this.state = State.Random
    this.randomStrategy = new RandomStrategy(ai)
    this.targetStrategy = new TargetStrategy(ai)
  }

  public setState(state: State): void {
    this.state = state
  }

  public getStrategy(): IStrategy {
    switch (this.state) {
      case State.Target:
        return this.targetStrategy
      case State.Random:
      default:
        return this.randomStrategy
    }
  }

  public transition(ai: BattleshipAI): void {
    if (ai.isTarget()) {
      this.setState(State.Target)
    } else {
      this.setState(State.Random)
    }
  }
}

export class BattleshipAI {
  public enemyGrid: BattleshipGrid
  public shotsTaken: Set<string>
  private hits: Set<string>
  private stateMachine: StateMachine

  constructor(enemyGrid: BattleshipGrid) {
    this.enemyGrid = enemyGrid
    this.shotsTaken = new Set()
    this.hits = new Set()
    this.stateMachine = new StateMachine(this)
  }

  public aiMove(
    range: Range = {
      minLetter: 'A',
      maxLetter: 'J',
      minNumber: 1,
      maxNumber: 10,
    }
  ) {
    this.stateMachine.transition(this)
    const strategy = this.stateMachine.getStrategy()
    const move = strategy.attack(range)
    const result = this.enemyGrid.hitCell(move)
    if (result.shipHit) this.hits.add(move)
    return result
  }

  public isTarget() {
    return false
  }

  public getTarget(): string {
    return ''
  }
}
