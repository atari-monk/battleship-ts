import { BattleshipGrid } from '../grid/BattleshipGrid'
import { Range } from '../grid/type/Range'
import { ShipTarget } from './type/ShipTarget'
import { ShipTracker } from './ShipTracker'
import { StateMachine } from './StateMachine'

export class BattleshipAI {
  public enemyGrid: BattleshipGrid
  public shotsTaken: Set<string>
  private stateMachine: StateMachine
  private shipTracker: ShipTracker

  constructor(enemyGrid: BattleshipGrid) {
    this.enemyGrid = enemyGrid
    this.shipTracker = new ShipTracker()
    this.shotsTaken = new Set()
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
    const { shot, log } = strategy.attack(range)
    const result = this.enemyGrid.hitCell(shot)
    if (result.shipHit) this.shipTracker.handleShot(shot)
    strategy.updateState()
    result.log = log
    return result
  }

  public isShipHit(): boolean {
    return this.shipTracker.getFirstActiveHit() !== undefined
  }

  public getHitShip(): ShipTarget | undefined {
    return this.shipTracker.getFirstActiveHit()
  }

  public isShipToSink() {
    return this.shipTracker.getShipToSink() !== undefined
  }

  public getShipToSink(): ShipTarget | undefined {
    return this.shipTracker.getShipToSink()
  }
}
