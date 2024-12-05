import { _decorator, Component, Camera, input, Input, KeyCode, EventKeyboard } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeCamera')
export class ChangeCamera extends Component {

    @property({ type: Camera })
    mainCamera: Camera = null;  // 主摄像机

    @property({ type: Camera })
    topCamera: Camera = null;  // 顶视摄像机

    private _isMainCameraActive: boolean = true;  // 当前是否为主摄像机激活

    start() {
        // 初始化摄像机状态
        if (this.mainCamera && this.topCamera) {
            this.activateMainCamera();
        } else {
            console.error("Cameras are not assigned!");
        }

        // 监听键盘事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (event.keyCode === KeyCode.KEY_Q) {
            this.toggleCamera();
        }
    }

    toggleCamera() {
        if (this._isMainCameraActive) {
            this.activateTopCamera();
        } else {
            this.activateMainCamera();
        }
    }

    activateMainCamera() {
        if (this.mainCamera && this.topCamera) {
            this.mainCamera.node.active = true;
            this.topCamera.node.active = false;
            this._isMainCameraActive = true;
        }
    }

    activateTopCamera() {
        if (this.mainCamera && this.topCamera) {
            this.mainCamera.node.active = false;
            this.topCamera.node.active = true;
            this._isMainCameraActive = false;
        }
    }
}