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
