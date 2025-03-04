import { ShipOrientation } from './Orientation'

export interface ShipTarget {
  hits: Set<string>
  orientation: ShipOrientation
  isSunk: boolean
}
