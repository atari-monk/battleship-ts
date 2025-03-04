export enum Orientation {
  Horizontal,
  Vertical,
}

export function getRandomOrientation(): Orientation {
  const orientations: Orientation[] = [
    Orientation.Horizontal,
    Orientation.Vertical,
  ]
  return orientations[Math.floor(Math.random() * orientations.length)]
}

export enum ShipOrientation {
  Unknown,
  Horizontal,
  Vertical,
}
