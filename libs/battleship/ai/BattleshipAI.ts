import { BattleshipGrid } from '../grid/BattleshipGrid'
import { Range } from '../grid/Range'
import { StateMachine } from './StateMachine'

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
    const shot = strategy.attack(range)
    const result = this.enemyGrid.hitCell(shot)
    if (result.shipHit) this.hits.add(shot)
    return result
  }

  public isTarget() {
    return this.hits.size > 0
  }

  public getTarget(): string {
    return this.hits.values().next().value || ''
  }
}
