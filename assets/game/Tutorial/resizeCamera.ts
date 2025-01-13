import { _decorator, Component, Camera, view } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('CameraAdjuster')
export class CameraAdjuster extends Component {
    @property(Camera)
    camera: Camera = null!;

    start() {
        this.adjustCamera();
        // 监听 canvas 尺寸变化
        
    }

    adjustCamera() {
        const canvasWidth = view.getFrameSize().width;
        const canvasHeight = view.getFrameSize().height;
        const aspectRatio = canvasWidth / canvasHeight;

        // 透视相机的 FOV 动态调整
        const newFOV = this.calculateFOV(aspectRatio);
        this.camera.fov = newFOV;  // 调整视野角度

        // 可选：根据需要调整近远裁剪面
        this.camera.near = 0.1;  // 设置近裁剪面
        this.camera.far = 2000;  // 设置远裁剪面
    }

    calculateFOV(aspectRatio: number): number {
        // 根据宽高比调整 FOV，例如更宽的屏幕上可以稍微增加 FOV
        const baseFOV = 30; // 基础 FOV，可以调整
        return baseFOV * aspectRatio;  // 更改 FOV 以适应屏幕宽高比
    }
}