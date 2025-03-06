# Ship Orientation Strategy

```plaintext
battleship-ts/
└── libs/
    └── battleship/
        └── ai/
            └── strategy/
                └── ShipOrientationStrategy.ts
```

The `ShipOrientationStrategy` class is responsible for attacking based on the orientation of a previously hit ship, adapting its strategy based on whether the ship is aligned horizontally or vertically.

Implements `IStrategy` interface.

## **Dependencies**
- **`BattleshipAI`**: Uses the `getHitShip()` method to get the currently targeted ship.
- **`getRandomOrientation()`**: Utility function to randomly determine ship orientation (horizontal or vertical).
- **`coinToss()`**: Utility function to make random decisions for direction.
- **`Orientation`, `ShipOrientation`, `DIRECTION`**: Enum values representing orientation and direction of attack.
- **`indexToLabel()`, `labelToIndex()`**: Utility functions for converting between coordinate indices and labels.

## **Attack Method Behavior**
1. Identifies the currently targeted ship based on previous hits.
2. Determines the next shot based on the ship’s current hit and its orientation.
3. Randomly adjusts the shot direction using orientation, ensuring not to shoot in already-visited directions.
4. Returns the shot along with a log message indicating whether it was a hit or miss, and the ship’s orientation.

## **Update State Method**
1. After the second hit on a ship, determines its orientation (horizontal or vertical).
2. If two hits are in the same row, the ship is considered horizontal; if in the same column, vertical.
3. Resets direction counters to allow for further attacks in the identified orientation.

## **Test Case**
- **Scenario:** A ship with multiple hits (at least two) and its orientation not yet determined.
- **Objective:** Verify that `ShipOrientationStrategy` correctly identifies the ship’s orientation and attacks in the correct direction (horizontal or vertical) based on the hit positions.

---
