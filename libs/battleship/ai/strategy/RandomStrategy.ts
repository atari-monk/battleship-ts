import { BattleshipAI } from '../BattleshipAI'
import { IStrategy } from '../type/IStrategy'
import { Range } from '../../grid/type/Range'
import { AttackResult } from '../type/AttackResult'
import { getRandomCell } from '../../util/grid'

export class RandomStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): AttackResult {
    let shot: string = getRandomCell(range)

    while (this._ai.shotsTaken.has(shot)) {
      shot = getRandomCell(range)
    }
    
    this._ai.shotsTaken.add(shot)

    return {
      shot,
      log: (isShipHit: boolean) =>
        `Player 2: ${shot} ${isShipHit ? 'hit' : 'miss'} AI: Random`,
    }
  }

  updateState(): void {}
}
