import { _decorator, Component, Animation, EventKeyboard, KeyCode, input,Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('unfoldplay')
export class PlayerController extends Component {
    @property(Animation)
    public anim: Animation | null = null;

    start() {
        // 开始监听键盘事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === KeyCode.SPACE) {
            this.playAnim();
        }
    }

    playAnim() {
        if (this.anim) {
            this.anim.play('CubeUnfolding'); // 确保动画剪辑名与实际名相符
        }
    }

    onDestroy() {
        // 停止监听键盘事件，以避免内存泄露
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
}
