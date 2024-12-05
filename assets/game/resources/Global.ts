import { _decorator, Component, Camera, Layers } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneRenderer')
export class SceneRenderer extends Component {

    @property(Camera)
    camera3D: Camera = null;

    @property(Camera)
    cameraUI: Camera = null;

    start() {
        // 设置 cameraUI 的渲染顺序和可见性层级
        this.cameraUI.priority = 0;  // 先渲染UI
        this.cameraUI.visibility = Layers.Enum.UI_2D;  // 渲染UI（UI_2D层）
        this.cameraUI.clearFlags = Camera.ClearFlag.SOLID_COLOR;  // 清除背景并渲染UI

        // 设置 camera3D 的渲染顺序和可见性层级
        this.camera3D.priority = 1;  // 后渲染3D物体
        this.camera3D.visibility = Layers.Enum.DEFAULT;  // 渲染3D物体（DEFAULT层）
        this.camera3D.clearFlags = Camera.ClearFlag.DEPTH_ONLY;  // 不清除颜色，只影响深度缓冲
    }
}