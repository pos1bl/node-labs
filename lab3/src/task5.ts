type EventHandler = () => void;

class MyEventEmitter {
  private eventHandlers: Record<string, EventHandler[]> = {};

  public registerHandler(event: string, handler: EventHandler): void {
    this.eventHandlers[event] = this.eventHandlers[event] || [];
    this.eventHandlers[event].push(handler);
  }

  public emitEvent(event: string): void {
    const handlers = this.eventHandlers[event];

    if (handlers) {
      handlers.forEach(handler => handler());
    }
  }
}

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated');
