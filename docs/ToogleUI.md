# ToogleUI

Unused code, but ok.

dom_utils.ts  

```typescript
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
```

toogling example  

```typescript
const ids = ['playerInput', 'submitInput', 'inputResult', 'continueButton']

function toogleInputDisplay(ids: string[], displayValue = Display.BLOCK) {
  ids.forEach(id => toggleDisplay(id, displayValue))
}

function toogleUIOnGameMode(ids: string[], gameMode: GAME_MODE) {
  switch (gameMode) {
    case GAME_MODE.TWO_PLAYER:
      toogleInputDisplay(ids)
      break
    case GAME_MODE.PLAYER_VS_AI:
      toogleInputDisplay(ids)
      break
    case GAME_MODE.AI_TEST:
      toogleInputDisplay(ids, Display.NONE)
      break
    default:
      toogleInputDisplay(ids)
      break
  }
}

toogleUIOnGameMode(ids, config.mode)
```
