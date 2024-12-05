import { _decorator, Component, Node, systemEvent, SystemEvent, EventKeyboard, KeyCode, Vec3, Quat, misc, tween } from 'cc';
const { ccclass } = _decorator;

@ccclass('FlipCubeOnSurface')
export class FlipCubeOnSurface extends Component {
    private isAnimating = false;  // 用于防止动画重叠
    private startPosition: Vec3 = new Vec3(); // 初始位置
    private endPosition: Vec3 = new Vec3(); // 目标位置
    private startRotation: Quat = new Quat(); // 初始四元数
    private endRotation: Quat = new Quat(); // 目标四元数
    private currentLerpTime: number = 0;
    private totalLerpTime: number = 0.5; // 总的插值时间，这里设置为0.5秒
    private spacing: number = 1.1; // 立方体之间的间隔

    start() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        if (!this.isAnimating) {
            switch (event.keyCode) {
                case KeyCode.KEY_A:
                    this.rotateByAxis(new Vec3(-this.spacing, 0, 0), new Vec3(0, 0, 1), 90);
                    break;
                case KeyCode.KEY_D:
                    this.rotateByAxis(new Vec3(this.spacing, 0, 0), new Vec3(0, 0, 1), -90);
                    break;
                case KeyCode.KEY_W:
                    this.rotateByAxis(new Vec3(0, 0, -this.spacing), new Vec3(1, 0, 0), -90);
                    break;
                case KeyCode.KEY_S:
                    this.rotateByAxis(new Vec3(0, 0, this.spacing), new Vec3(1, 0, 0), 90);
                    break;
            }
        }
    }

    rotateByAxis(moveVector: Vec3, rotationAxis: Vec3, angle: number) {
        this.startPosition = this.node.position.clone(); // 保存初始位置

        // 计算目标位置
        Vec3.add(this.endPosition, this.startPosition, moveVector);

        // 检查目标位置是否在3x3的边界内
        if (Math.abs(this.endPosition.x) > this.spacing * 1.5 || Math.abs(this.endPosition.z) > this.spacing * 1.5) {
            return; // 超过边界，取消翻转
        }

        this.startRotation = this.node.rotation.clone(); // 保存初始旋转
        const rad = misc.degreesToRadians(angle);
        Quat.rotateAround(this.endRotation, this.startRotation, rotationAxis, rad); // 计算目标旋转四元数
        Quat.normalize(this.endRotation, this.endRotation);

        // 重置插值时间，并开始动画
        this.currentLerpTime = 0;
        this.isAnimating = true;
    }

    update(deltaTime: number) {
        if (this.isAnimating) {
            // 增加当前插值时间
            this.currentLerpTime += deltaTime;
            if (this.currentLerpTime > this.totalLerpTime) {
                this.currentLerpTime = this.totalLerpTime;
            }

            // 计算当前插值比例
            const lerpRatio = this.currentLerpTime / this.totalLerpTime;

            // 使用slerp进行四元数插值
            const currentRotation = Quat.slerp(new Quat(), this.startRotation, this.endRotation, lerpRatio);
            this.node.setRotation(currentRotation);

            // 使用lerp进行位置插值
            const currentPosition = Vec3.lerp(new Vec3(), this.startPosition, this.endPosition, lerpRatio);
            this.node.setPosition(currentPosition);

            // 如果插值完成，停止动画
            if (lerpRatio >= 1) {
                this.isAnimating = false;
            }
        }
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
}
