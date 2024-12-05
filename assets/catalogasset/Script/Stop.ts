import { _decorator, Component, Node, director, systemEvent, SystemEvent, EventMouse } from 'cc';
import { RotateAndMoveCubeOnKey } from '../../game/selfresources/Cubeflip'; // 引入 RotateAndMoveCubeOnKey 的脚本
const { ccclass, property } = _decorator;

@ccclass('PauseHandler')
export class PauseHandler extends Component {

    @property(Node)
    pauseMenu: Node = null;

    @property(Node)
    mainCamera: Node = null;

    @property(Node)
    cubeNode: Node = null; // 将控制计时的 Cube 节点拖到此处

    private isPaused: boolean = false;

    onPauseGame() {
        // 暂停游戏
        director.getScheduler().setTimeScale(0);
        this.isPaused = true;

        console.log("Game paused");

        if (this.pauseMenu) {
            this.pauseMenu.active = true;
        }

        if (this.mainCamera) {
            this.mainCamera.active = false;
        }

        // 暂停计时
        if (this.cubeNode) {
            const cubeController = this.cubeNode.getComponent(RotateAndMoveCubeOnKey) as RotateAndMoveCubeOnKey;
            if (cubeController) {
                cubeController.isTiming = false; // 停止计时
            }
        }

        // 暂停全局点击事件监听
        systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.globalClickHandler, this);
    }

    onResumeGame() {
        // 恢复游戏
        director.getScheduler().setTimeScale(1);
        this.isPaused = false;

        console.log("Game resumed");

        if (this.pauseMenu) {
            this.pauseMenu.active = false;
        }

        if (this.mainCamera) {
            this.mainCamera.active = true;
        }

        // 恢复计时
        if (this.cubeNode) {
            const cubeController = this.cubeNode.getComponent(RotateAndMoveCubeOnKey) as RotateAndMoveCubeOnKey;
            if (cubeController) {
                cubeController.isTiming = true; // 恢复计时
            }
        }

        // 恢复全局点击事件监听
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.globalClickHandler, this);
    }

    globalClickHandler(event: EventMouse) {
        if (this.isPaused) {
            console.log("Game is paused, ignoring global clicks.");
            return;
        }
        // 处理全局点击事件逻辑...
    }
}