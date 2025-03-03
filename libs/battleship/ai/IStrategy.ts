import { Range } from './Range'

export interface IStrategy {
  attack(range: Range): string
}
