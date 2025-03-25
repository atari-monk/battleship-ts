import {labelToIndex} from '../grid/grid_util'
import {ShipOrientation} from './type/Orientation'
import {ShipTarget} from './type/ShipTarget'

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
    for (const ship of this.ships) {
      if (ship.orientation === ShipOrientation.Unknown && !ship.isSunk)
        return ship
    }
  }

  getShipToSink(): ShipTarget | undefined {
    for (const ship of this.ships) {
      if (
        ship.orientation !== ShipOrientation.Unknown &&
        !ship.isSunk &&
        ship.hits.size >= 2
      )
        return ship
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
    const {row: existingX, col: existingY} = labelToIndex(existingHit)!
    const {row: shotX, col: shotY} = labelToIndex(shot)!

    if (orientation === ShipOrientation.Unknown) {
      return (
        (Math.abs(existingX - shotX) === 1 && existingY === shotY) ||
        (Math.abs(existingY - shotY) === 1 && existingX === shotX)
      )
    }

    if (orientation === ShipOrientation.Horizontal) {
      return existingX === shotX && Math.abs(existingY - shotY) === 1
    }

    if (orientation === ShipOrientation.Vertical) {
      return existingY === shotY && Math.abs(existingX - shotX) === 1
    }

    return false
  }
}
