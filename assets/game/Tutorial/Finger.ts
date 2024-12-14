import { _decorator, Component, Vec3, UIOpacity, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Finger')
export class Finger extends Component {

    @property(Node)
    targetNode: Node | null = null; // 要监控的目标节点

    private elapsedTime: number = 0; // 动画累计时间
    private initialPosition: Vec3 = new Vec3();
    private initialScale: Vec3 = new Vec3();
    private opacityComponent: UIOpacity | null = null;
    private isOperationActive: boolean = false; // 记录玩家是否完成了操作
    private previousTargetPos: Vec3 = new Vec3(); // 记录目标节点的上一次位置

    start() {
        // 记录当前节点的初始位置和初始缩放
        this.initialPosition = this.node.position.clone(); 
        this.initialScale = this.node.scale.clone();
        this.opacityComponent = this.node.getComponent(UIOpacity) || this.node.addComponent(UIOpacity);
        
        // 记录目标节点的初始位置（如果目标节点不为空）
        if (this.targetNode) {
            this.previousTargetPos.set(this.targetNode.position.x, this.targetNode.position.y, this.targetNode.position.z);
        }
    }

    update(dt: number) {
        // 监控目标节点的位置
        this.monitorTargetPosition();

        // 如果操作被激活，则不播放动画
        if (this.isOperationActive){
            this.node.active = false;
            return;
        } 

        // 控制动画的执行
        this.playAnimation(dt, this.animationModule1.bind(this));
    }

    /**
     * 监控目标节点的位置变化
     */
    monitorTargetPosition() {
        if (!this.targetNode) return; // 如果没有设置目标节点，则直接返回

        // 获取目标节点的当前位置
        const currentTargetPos = this.targetNode.position;

        // 如果目标节点的位置与上一次的位置不一致，则停止动画
        if (!this.previousTargetPos.equals(currentTargetPos)) {
            console.log('目标节点位置发生了变化，停止动画！');
            this.isOperationActive = true; // 标记为已激活操作，停止动画
        }

        // 更新上一次的位置
        this.previousTargetPos.set(currentTargetPos.x, currentTargetPos.y, currentTargetPos.z);
    }

    /**
     * 控制动画的执行（方便扩展多个动画模块）
     */
    playAnimation(dt: number, animationCallback: (dt: number) => void) {
        animationCallback(dt);
    }

    /**
     * 动画模块 1 
     * 控制节点的缩放和移动动画
     */
    animationModule1(dt: number) {
        if (this.isOperationActive) return; // 如果操作被激活，则停止该动画

        const totalTime = 3.5;
        this.elapsedTime += dt; // 记录本轮动画的时间

        if (this.elapsedTime > totalTime) {
            this.resetState(); // 当时间超出动画时长，重置状态
            return; 
        }

        if (this.elapsedTime < 0.8) {
            const progress = this.elapsedTime / 0.8;
            const scale = Vec3.lerp(new Vec3(), this.initialScale, new Vec3(0.3, 0.3, 0.3), progress);
            this.node.setScale(scale);
        } else if (this.elapsedTime < 2.1) {
            const progress = (this.elapsedTime - 0.8) / 1.3;
            const yPosition = -600 + (progress * 400);
            this.node.setPosition(new Vec3(this.initialPosition.x, yPosition, this.initialPosition.z));
        }
    }

    /**
     * 重置节点的状态
     * 位置、缩放、透明度、计时器都重置
     */
    resetState() {
        this.node.setPosition(new Vec3(600, -600, 0));
        this.node.setScale(this.initialScale);
        if (this.opacityComponent) {
            this.opacityComponent.opacity = 255;
        }
        this.elapsedTime = 0; // 确保重置时间
    }
}