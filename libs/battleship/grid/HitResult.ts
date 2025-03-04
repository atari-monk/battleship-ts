export interface HitResult {
  label: string
  alreadyHit: boolean
  shipHit: boolean
  log: (isShipHit: boolean) => string
}
