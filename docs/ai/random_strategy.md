# Random Strategy

```plaintext
battleship-ts/
└── libs/
    └── battleship/
        └── ai/
            └── strategy/
                └── RandomStrategy.ts
```

The `RandomStrategy` class is responsible for selecting random attack positions while ensuring no duplicate shots are taken.  
Implements IStrategy interface.  

## **Dependencies**
- **`BattleshipAI`**: Uses `shotsTaken` from `BattleshipAI` to track and avoid repeated shots.
- **`getRandomCell(range: Range)`**: Utility function to pick a random cell within a given range.

## **Attack Method Behavior**
1. Selects a random shot within the specified range.  
2. Repeats selection until it finds a cell that hasn’t been used.  
3. Stores the selected shot in `shotsTaken` to prevent reuse.  
4. Returns the shot along with a log message indicating whether it was a hit or miss.

## **Test Case**
- **Scenario:** A `Range` of 6 cells, with a 4-cell horizontal ship.  
- **Objective:** Verify that `RandomStrategy` does not repeat shots and correctly logs attack results.
