import { _decorator, Component, Vec3, UIOpacity, Node, Quat, find, tween, Tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Finger')
export class Finger extends Component {

    private elapsedTime: number = 0; // 动画累计时间
    private initialPosition: Vec3 = new Vec3(90, -270, 0); // 动画的起始位置
    private finalPosition: Vec3 = new Vec3(515, -270, 0); // 动画的结束位置
    private newPosition: Vec3 = new Vec3(645, -837, 0); // 旋转变化后的目标位置
    private initialScale: Vec3 = new Vec3(0.5, 0.5, 0.5);
    private smallScale: Vec3 = new Vec3(0.3, 0.3, 0.3);
    private largeScale: Vec3 = new Vec3(0.5, 0.5, 0.5);
    private opacityComponent: UIOpacity | null = null;
    private isOperationActive: boolean = false; // 记录是否已经激活
    private previousRotation: Quat = new Quat(); // 记录目标节点的上一次旋转
    private cube4Node: Node | null = null; // 记录 cube4 的节点
    private previousCube4Rotation: Quat = new Quat(); // 记录 cube4 节点的上一次旋转
    private scaleTween: Tween<Node> | null = null; // 用于缩放动画

    start() {
        // 记录当前节点的初始位置和初始缩放
        this.node.setPosition(this.initialPosition.clone()); 
        this.node.setScale(this.initialScale.clone());
        this.opacityComponent = this.node.getComponent(UIOpacity) || this.node.addComponent(UIOpacity);
        
        this.bringToFront();

        // 1. 通过 find() 获取 cube4 节点（假设路径为 'Node/Cube4'，根据实际路径调整）
        this.cube4Node = find('Node/Cube4-mini');
        if (this.cube4Node) {
            // 记录 cube4 的初始旋转
            this.previousCube4Rotation.set(this.cube4Node.rotation);
            console.log('成功找到 cube4 节点并记录初始旋转:', this.previousCube4Rotation);
        } else {
            console.error('未找到名为 cube4 的节点，请确认路径是否正确');
        }
    }

    bringToFront() {
        if (!this.node.parent) {
            console.warn('当前节点没有父节点，无法调整层级！');
            return;
        }

        // 获取父节点的子节点数量，并将当前节点的索引设置为最大
        const maxIndex = this.node.parent.children.length - 1;
        this.node.setSiblingIndex(maxIndex);
        console.log('当前节点已被置于最前面！');
    }

    update(dt: number) {
        // 1. 监控 cube4 节点的旋转变化
        this.monitorCube4Rotation();

        // 如果操作被激活，则不播放原始动画
        if (this.isOperationActive) return;

        // 控制原始动画的执行
        this.playAnimation(dt, this.animationModule1.bind(this));
    }

    /**
     * 监控 cube4 节点的旋转变化
     */
    monitorCube4Rotation() {
        if (!this.cube4Node) return; // 确保 cube4 节点存在

        // 获取 cube4 当前的旋转
        const currentRotation = this.cube4Node.rotation;

        // 对比当前旋转与上一次的旋转是否发生变化
        if (!this.previousCube4Rotation.equals(currentRotation)) {
            console.log('检测到 cube4 旋转发生变化，触发新动画！');
            this.isOperationActive = true; // 标记旋转变化，停止原始动画
            this.startNewAnimation();
        }

        // 更新前一帧的旋转，确保下次更新时进行对比
        this.previousCube4Rotation.set(currentRotation);
    }

    onDestroy() {
        console.log('Cleaning up Finger component...');
    
        // 停止所有正在进行的动画
        if (this.scaleTween) {
            this.scaleTween.stop();
            this.scaleTween = null;
        }
    
        // 清理与 cube4 节点的引用，避免内存泄漏
        if (this.cube4Node) {
            this.cube4Node = null;
        }
    
        // 确保没有未清理的调度或状态
        this.isOperationActive = false;
        this.elapsedTime = 0;
    
        console.log('Finger component cleanup complete.');
    }

    /**
     * 控制原始动画的执行（从左到右的移动动画）
     */
    playAnimation(dt: number, animationCallback: (dt: number) => void) {
        animationCallback(dt);
    }

    /**
     * 原始动画模块 1 
     */
    animationModule1(dt: number) {
        const totalTime = 3.5; 
        this.elapsedTime += dt; 

        if (this.elapsedTime > totalTime) {
            this.resetState(); 
            return; 
        }

        if (this.elapsedTime < 0.8) {
            const progress = this.elapsedTime / 0.8;
            const scale = Vec3.lerp(new Vec3(), this.initialScale, this.smallScale, progress);
            this.node.setScale(scale);
        } else if (this.elapsedTime < 2.1) {
            const progress = (this.elapsedTime - 0.8) / 1.3; 
            const position = Vec3.lerp(new Vec3(), this.initialPosition, this.finalPosition, progress);
            this.node.setPosition(position);
        } else if (this.elapsedTime < 2.9) {
            const progress = (this.elapsedTime - 2.1) / 0.8; 
            const scale = Vec3.lerp(new Vec3(), this.smallScale, this.initialScale, 1 - progress);
            this.node.setScale(scale);
        }
    }

    /**
     * 开始新动画 (645, -817) 位置，0.5 和 0.3 之间的缩放动画
     */
    startNewAnimation() {
        this.node.setPosition(this.newPosition.clone());
        this.scaleTween = tween(this.node)
            .repeatForever(
                tween()
                    .to(0.6, { scale: this.smallScale }, { easing: 'smooth' })
                    .to(0.6, { scale: this.largeScale }, { easing: 'smooth' })
            )
            .start();
        console.log('新动画已开始，节点移动到 (645, -817)');
    }

    /**
     * 重置节点的状态
     */
    resetState() {
        this.node.setPosition(this.initialPosition.clone());
        this.node.setScale(this.initialScale.clone());
        if (this.opacityComponent) {
            this.opacityComponent.opacity = 255;
        }
        this.elapsedTime = 0; 
    }
}