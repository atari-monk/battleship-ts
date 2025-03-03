import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { RandomStrategy } from './RandomStrategy'
import { State } from './State'
import { TargetStrategy } from './TargetStrategy'

export class StateMachine {
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
