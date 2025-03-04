import { BattleshipAI } from './BattleshipAI'
import { IStrategy } from './IStrategy'
import { Range } from '../grid/Range'
import { RandomUtil } from './RandomUtil'
import { AttackResult } from './AttackResult'

export class RandomStrategy implements IStrategy {
  private _ai

  constructor(ai: BattleshipAI) {
    this._ai = ai
  }

  attack(range: Range): AttackResult {
    let shot = RandomUtil.getRandomCell(range)
    while (this._ai.shotsTaken.has(shot)) {
      shot = RandomUtil.getRandomCell(range)
    }
    this._ai.shotsTaken.add(shot)
    return {
      shot,
      log: (isShipHit: boolean) =>
        `Player 2: ${shot} ${isShipHit ? 'hit' : 'miss'} (Strategy: Random)`,
    }
  }

  updateState(): void {}
}
