# EventEmitter

## Example

From this example, the `EventEmitter` is used to notify listeners when the state changes. Here’s how it's used:

### **1. Importing and Initializing EventEmitter**
```typescript
import { EventEmitter } from '@atari-monk/event-emitter'
```
- The `EventEmitter` is imported from the `@atari-monk/event-emitter` package.

### **2. Declaring an EventEmitter Instance**
```typescript
private eventEmitter: EventEmitter<StateEvents>
```
- The `StateMachine` class has a private property `eventEmitter`, which is typed as `EventEmitter<StateEvents>`.

### **3. Injecting the EventEmitter through Constructor**
```typescript
constructor(ai: BattleshipAI, eventEmitter: EventEmitter<StateEvents>) {
  this.eventEmitter = eventEmitter
}
```
- The `EventEmitter` instance is passed into the `StateMachine` constructor and assigned to the `eventEmitter` property.

### **4. Emitting an Event**
```typescript
public setState(state: State): void {
  if (this.state !== state) this.eventEmitter.emit(EVENT_STATE_CHANGED, state)
  this.state = state
}
```
- When the state changes, `this.eventEmitter.emit(EVENT_STATE_CHANGED, state)` is called.
- This triggers all listeners that are subscribed to `EVENT_STATE_CHANGED`.

### **Key Takeaways on Using EventEmitter**
1. **Import EventEmitter** from the library.
2. **Create an instance** of `EventEmitter` and pass it where needed.
3. **Use `emit(event, data)`** to notify listeners when something changes.

Let me know if you need a breakdown on event subscription (i.e., listening to events). 🚀