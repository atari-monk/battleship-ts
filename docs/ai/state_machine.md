# **StateMachine**

```plaintext
battleship-ts/
└── libs/
    └── battleship/
        └── ai/
            └── state/
                └── StateMachine.ts
```

The `StateMachine` class manages the AI's decision-making process by transitioning between different states based on the game situation. It determines the appropriate strategy to use at any given moment.

Implements state-based strategy selection.

## **Dependencies**
- **`BattleshipAI`**: The AI logic that informs the state machine about hits and sinks.
- **`State`**: Enum defining different AI states (`Random`, `ShipOrientation`, `Sink`).
- **`IStrategy`**: Interface defining the strategy pattern for AI decision-making.
- **`RandomStrategy`**: Implements random targeting when no ship has been hit.
- **`ShipOrientationStrategy`**: Determines the orientation of a ship after a hit.
- **`SinkStrategy`**: Focuses on targeting and sinking a ship after orientation is determined.

## **State Management Behavior**
1. **Initial State:**
   - The AI starts in `Random` state, using `RandomStrategy` to search for ships.
2. **Transition Logic:**
   - If a ship has been hit but not yet sunk, the AI transitions to `ShipOrientation` to determine its alignment.
   - If the ship's orientation is known and further hits confirm the ship's presence, the AI transitions to `Sink` to ensure it is completely destroyed.
   - If no ships are actively targeted, the AI remains in `Random` state.
3. **Strategy Selection:**
   - Based on the current state, the appropriate strategy (`RandomStrategy`, `ShipOrientationStrategy`, or `SinkStrategy`) is returned.

## **Methods**
- **`setState(state: State): void`**
  - Updates the internal state of the AI.
- **`getStrategy(): IStrategy`**
  - Returns the strategy corresponding to the current state.
- **`transition(ai: BattleshipAI): void`**
  - Determines the next state based on AI conditions (`isShipToSink()`, `isShipHit()`).

## **State Transitions**
| Current State       | Condition                     | Next State          |
|--------------------|-----------------------------|--------------------|
| Random            | Ship is hit                  | ShipOrientation    |
| ShipOrientation   | Ship to sink identified      | Sink               |
| Sink             | Ship is completely sunk      | Random             |

## **Test Case**
- **Scenario:** The AI initially uses `RandomStrategy` to search for ships. Once a hit is confirmed, it should switch to `ShipOrientationStrategy`, and finally `SinkStrategy` upon confirmation of ship alignment.
- **Objective:** Ensure that the AI correctly transitions between states and selects the appropriate strategy in response to game events.
