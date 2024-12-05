import { _decorator, Component, Node, systemEvent, SystemEvent, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClickablePrefab')
export class ClickablePrefab extends Component {
    private clickCount: number = 0;

    start() {
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    onMouseUp(event: EventMouse) {
        if (event.getButton() === EventMouse.BUTTON_LEFT) {
            this.clickCount++;
            console.log(`Prefab clicked ${this.clickCount} times.`);
        }
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
    }
}
