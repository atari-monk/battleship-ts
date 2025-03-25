export enum Display {
  NONE = 'none',
  BLOCK = 'block',
  INLINE = 'inline',
  FLEX = 'flex',
  GRID = 'grid',
}

export function toggleDisplay(
  elementId: string,
  displayValue: Display = Display.BLOCK
): void {
  const element = document.getElementById(elementId)
  if (element) {
    element.style.display =
      element.style.display === Display.NONE ? displayValue : Display.NONE
  }
}
