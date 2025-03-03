import { Range } from './../grid/Range'

export interface IStrategy {
  attack(range: Range): string
}
