# BattleshipGrid

## Paths

1. Class:

```plaintext
 C:\atari-monk\code\battleship-ts\libs\battleship\grid\BattleshipGrid.ts
 ```

2. Tests: 

```plaintext
C:\atari-monk\code\battleship-ts\tests\BattleshipGrid.test.ts
 ```

 ## Tests

 1. constructor
   - should initialize a 10x10 grid by default
     * checks rows, cols size
     * size of grid array 
     * checks initial content of cells
   - should initialize a custom-sized grid
     * checks rows, cols size
     * size of grid array

2. hitCell
  - should mark the correct cell as hit and return expected result
    * checks if grid data, isHit flag, is set
    * info returned on cell hit - label, if it was alreadyHit, if ship is hit