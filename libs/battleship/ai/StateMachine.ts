import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './type/IStrategy'
import { State } from './type/State'
import { RandomStrategy } from './strategy/RandomStrategy'
import { ShipOrientationStrategy } from './strategy/ShipOrientationStrategy'
import { SinkStrategy } from './strategy/SinkStrategy'

export class StateMachine {
  private state: State
  private randomStrategy: IStrategy
  private shipOrientationStrategy: IStrategy
  private sinkStrategy: IStrategy

  constructor(ai: BattleshipAI) {
    this.state = State.Random
    this.randomStrategy = new RandomStrategy(ai)
    this.shipOrientationStrategy = new ShipOrientationStrategy(ai)
    this.sinkStrategy = new SinkStrategy(ai)
  }

  public setState(state: State): void {
    this.state = state
  }

  public getStrategy(): IStrategy {
    switch (this.state) {
      case State.ShipOrientation:
        return this.shipOrientationStrategy
      case State.Sink:
        return this.sinkStrategy
      case State.Random:
      default:
        return this.randomStrategy
    }
  }

  public transition(ai: BattleshipAI): void {
    if (ai.isShipHit()) {
      this.setState(State.ShipOrientation)
    } else if (ai.isShipToSink()) {
      this.setState(State.Sink)
    } else {
      this.setState(State.Random)
    }
  }
}
