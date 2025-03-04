import { GridUtils } from '../grid/GridUtils'
import { ShipOrientation } from './Orientation'
import { ShipTarget } from './ShipTarget'

export class ShipTracker {
  private ships: Set<ShipTarget> = new Set()

  handleShot(shot: string): void {
    const existingShip = this.findAdjacentShip(shot)

    if (existingShip) {
      existingShip.hits.add(shot)
    } else {
      this.ships.add({
        hits: new Set<string>([shot]),
        orientation: ShipOrientation.Unknown,
        isSunk: false,
      })
    }
  }

  getFirstActiveHit(): ShipTarget | undefined {
    for (const hit of this.ships) {
      if (hit.orientation === ShipOrientation.Unknown && !hit.isSunk) return hit
    }
  }

  private findAdjacentShip(shot: string): ShipTarget | undefined {
    for (const ship of this.ships) {
      for (const existingHit of ship.hits) {
        if (this.isAdjacent(existingHit, shot, ship.orientation)) {
          return ship
        }
      }
    }
    return undefined
  }

  private isAdjacent(
    existingHit: string,
    shot: string,
    orientation: ShipOrientation
  ): boolean {
    const { row: existingX, col: existingY } =
      GridUtils.labelToIndex(existingHit)!
    const { row: shotX, col: shotY } = GridUtils.labelToIndex(shot)!

    if (orientation === ShipOrientation.Unknown) {
      return (
        (Math.abs(existingX - shotX) === 1 && existingY === shotY) ||
        (Math.abs(existingY - shotY) === 1 && existingX === shotX)
      )
    }

    if (orientation === ShipOrientation.Horizontal) {
      return existingY === shotY && Math.abs(existingX - shotX) === 1
    }

    if (orientation === ShipOrientation.Vertical) {
      return existingX === shotX && Math.abs(existingY - shotY) === 1
    }

    return false
  }
}
