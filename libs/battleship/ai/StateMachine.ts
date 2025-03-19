import {BattleshipAI} from './BattleshipAI'
import {IStrategy} from './type/IStrategy'
import {State} from './type/State'
import {RandomStrategy} from './strategy/RandomStrategy'
import {ShipOrientationStrategy} from './strategy/ShipOrientationStrategy'
import {SinkStrategy} from './strategy/SinkStrategy'
import {EventEmitter} from '@atari-monk/event-emitter'
import {EVENT_STATE_CHANGED, StateEvents} from '../events/events'

export class StateMachine {
  private state: State
  private randomStrategy: IStrategy
  private shipOrientationStrategy: IStrategy
  private sinkStrategy: IStrategy
  private eventEmitter: EventEmitter<StateEvents>

  constructor(ai: BattleshipAI, eventEmitter: EventEmitter<StateEvents>) {
    this.state = State.Idle
    this.randomStrategy = new RandomStrategy(ai)
    this.shipOrientationStrategy = new ShipOrientationStrategy(ai)
    this.sinkStrategy = new SinkStrategy(ai)
    this.eventEmitter = eventEmitter
  }

  public setState(state: State): void {
    if (this.state !== state) this.eventEmitter.emit(EVENT_STATE_CHANGED, state)
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
    if (ai.isShipToSink()) {
      this.setState(State.Sink)
    } else if (ai.isShipHit()) {
      this.setState(State.ShipOrientation)
    } else {
      this.setState(State.Random)
    }
  }
}
