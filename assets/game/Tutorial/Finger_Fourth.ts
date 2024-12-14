import { _decorator, Component, Vec3, UIOpacity, Node, find, tween, Tween } from 'cc';
import { EventSystem } from '../../game/Cube/UI';
const { ccclass, property } = _decorator;

@ccclass('Finger')
export class Finger extends Component {


    private respawnPosition: Vec3 = new Vec3(550, -694, 0); // 重新出现的位置
    private initialScale: Vec3 = new Vec3(0.5, 0.5, 0.5);
    private smallScale: Vec3 = new Vec3(0.3, 0.3, 0.3);
    private largeScale: Vec3 = new Vec3(0.5, 0.5, 0.5);
    private opacityComponent: UIOpacity | null = null;
    private monitoredNode: Node | null = null; // 需要监控的节点
    private previousNodePosition: Vec3 = new Vec3(); // 记录目标节点的上一次位置
    private scaleTween: Tween<Node> | null = null; // 用于缩放动画
    private flag = true;
    private flag2 = true;

    start() {
        EventSystem.on('drag', this.onSwipeHandled, this);

        this.respawnAtNewPosition();
    }

    /**
     * 将当前节点置于父节点的最前面
     */
    bringToFront() {
        if (!this.node.parent) {
            console.warn('当前节点没有父节点，无法调整层级！');
            return;
        }

        const maxIndex = this.node.parent.children.length - 1;
        this.node.setSiblingIndex(maxIndex);
        console.log('当前节点已被置于最前面！');
    }

    /**
     * 每帧监控被监控的节点的移动
     */
    update(dt: number) {
        if (!this.monitoredNode) return;

        const currentPosition = this.monitoredNode.getPosition();

        if (this.flag2) {
            this.respawnAtNewPosition(); // 在 (412, -277) 重新开始动画
        } else {
            this.node.active = false;
        }

        //this.previousNodePosition.set(currentPosition);
    }

    /*
    startScaleAnimation() {
        if (this.scaleTween) return;

        this.scaleTween = tween(this.node)
            .repeatForever(
                tween()
                    .to(0.6, { scale: this.smallScale }, { easing: 'smooth' })
                    .to(0.6, { scale: this.largeScale }, { easing: 'smooth' })
            )
            .start();
        
        console.log('缩放动画已开始，节点在 (396, -252) 位置持续缩放');
    }
        */
    onSwipeHandled() {
        this.flag2 = false
        //this.node.active = false;
    }

    /**
     * 停止缩放动画，并隐藏当前节点
     */
    stopScaleAnimation() {
        if (this.scaleTween) {
            this.scaleTween.stop();
            this.scaleTween = null;
        }

        this.node.active = false; 
        console.log('缩放动画已停止，当前节点已被隐藏');
    }


    respawnAtNewPosition() {
        this.node.active = true; // 重新显示节点
        this.node.setPosition(this.respawnPosition.clone()); 
        this.node.setScale(this.largeScale.clone()); // 设置初始缩放为 0.5

        const moveTarget = new Vec3(550, -400, 0); // 目标位置
        this.opacityComponent = this.node.getComponent(UIOpacity) || this.node.addComponent(UIOpacity);
        this.opacityComponent.opacity = 255; // 确保不透明

        // 动画步骤
        tween(this.node)
            .to(0.4, { scale: this.smallScale }, { easing: 'smooth' }) // 缩小到 0.3
            .to(1.0, { position: moveTarget }, { easing: 'smooth' }) // Y 从 -277 移动到 -550
            .to(0.5, { scale: this.largeScale }, { easing: 'smooth' }) // 放大到 0.5
            .call(() => {
                // 淡出隐藏
                if (this.opacityComponent) {
                    tween(this.opacityComponent)
                        .to(0.5, { opacity: 0 }) // 淡出
                        .call(() => this.resetToInitialState()) // 恢复到初始状态，重新开始
                        .start();
                }
            })
            .start();
    }

    /**
     * 重置为初始状态并重新播放
     */
    resetToInitialState() {
        if (this.flag2) {
        this.node.active = true; 
        this.node.setPosition(this.respawnPosition.clone()); 
        this.node.setScale(this.initialScale.clone());
        this.opacityComponent.opacity = 255; // 确保不透明
        this.respawnAtNewPosition(); // 重新启动缩放动画
        } else {
            this.node.active=false
        }
    }
}