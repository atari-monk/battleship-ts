# Sink Strategy

```plaintext
battleship-ts/
└── libs/
    └── battleship/
        └── ai/
            └── strategy/
                └── SinkStrategy.ts
```

The `SinkStrategy` class is responsible for targeting and sinking a ship after it has been hit two times. Ship orientation is known. Focusing on finding the remaining part of the ship and ensuring it is completely sunk.

Implements `IStrategy` interface.

## **Dependencies**
- **`BattleshipAI`**: Uses the `getShipToSink()` method to identify the target ship that is to be sunk.
- **`DIRECTION`**: Enum values representing the possible directions of attack (left or right).
- **`ShipOrientation`**: Enum representing the orientation of the ship (horizontal or vertical).
- **`coinToss()`**: Utility function to randomly decide the attack direction.
- **`indexToLabel()`, `labelToIndex()`**: Utility functions for converting between grid indices and labels.

## **Attack Method Behavior**
1. Identifies the ship that needs to be sunk based on the current state.
2. If the ship’s orientation is horizontal:
   - It randomly selects a direction (left or right) to attack.
   - Identifies the next potential shot based on the previous hits on the ship.
   - If the edge of the ship is reached, the attack direction is reversed to ensure coverage.
3. Returns the shot and a log message indicating whether it was a hit or miss.

## **Update State Method**
- In this strategy, `updateState` does not change the internal state of the AI after an attack.

## **Private Methods**
- **`getLabelsFromSet()`**: Given a set of hit labels, it returns the first or last label based on the attack direction.
- **`getAdjacentLabel()`**: Finds the adjacent label to the current one based on the attack direction.
- **`getRandomDirection()`**: Chooses a random attack direction (left or right).
- **`getOppositeDirection()`**: Reverses the current attack direction.

## **Test Case**
- **Scenario:** After successfully hitting a ship two times and knowing its orientation, the strategy should continue attacking in the correct direction to sink the ship completely.
- **Objective:** Verify that `SinkStrategy` correctly targets and sinks a ship by choosing the appropriate direction and returning the correct shot coordinates.

---
