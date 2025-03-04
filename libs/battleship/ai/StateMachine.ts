import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { RandomStrategy } from './RandomStrategy'
import { State } from './State'
import { ShipOrientationStrategy } from './ShipOrientationStrategy'

export class StateMachine {
  private state: State
  private randomStrategy: IStrategy
  private shipOrientationStrategy: IStrategy

  constructor(ai: BattleshipAI) {
    this.state = State.Random
    this.randomStrategy = new RandomStrategy(ai)
    this.shipOrientationStrategy = new ShipOrientationStrategy(ai)
  }

  public setState(state: State): void {
    this.state = state
  }

  public getStrategy(): IStrategy {
    switch (this.state) {
      case State.ShipOrientation:
        return this.shipOrientationStrategy
      case State.Random:
      default:
        return this.randomStrategy
    }
  }

  public transition(ai: BattleshipAI): void {
    if (ai.isHit()) {
      this.setState(State.ShipOrientation)
    } else {
      this.setState(State.Random)
    }
  }
}
