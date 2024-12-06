import { _decorator, Component, Node, Vec3, input, Input, EventTarget, KeyCode, tween,Button } from 'cc';
import { EventSystem } from './RubiksCube';
export const EventSysteml = new EventTarget();
const { ccclass,property } = _decorator;


@ccclass('CubeController')
export class CubeController extends Component {
    private isInteracting: boolean = false;

    @property(Button)
    buttonW: Button = null;

    @property(Button)
    buttonA: Button = null;

    @property(Button)
    buttonS: Button = null;

    @property(Button)
    buttonD: Button = null;

    private epsilon: number = 0.0001; // 设置一个很小的容差值
    private moveDuration: number = 0.2; // 移动动画的持续时间

    private cooldown: boolean = false; // 冷却状态
private cooldownDuration: number = 0.5; // 冷却时间（秒）

    onLoad() {
        // 监听移动事件
        EventSystem.on('moveBall', this.handleMovement, this);
    }

    onDestroy() {
        // 移除事件监听
        EventSystem.off('moveBall', this.handleMovement, this);
    }

    start() {
        // 移除键盘输入事件监听
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this); // 不再需要

        // 监听按钮点击事件
        //this.buttonW.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_W), this);
        //this.buttonA.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_A), this);
        //this.buttonS.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_S), this);
        //this.buttonD.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_D), this);
    }
    startCooldown() {
        this.cooldown = true;
        this.scheduleOnce(() => {
            this.cooldown = false;
            console.log("Cooldown finished.");
        }, this.cooldownDuration);
    }

    handleMovement({ relation, plane }: { relation: string, plane: string }) {
        // 如果正在移动，直接返回，防止动画重叠
        if (this.isInteracting) {
            console.log("Movement in progress, ignoring this request.");
            return;
        }
    
        this.isInteracting = true; // 设置锁，防止其他逻辑干扰
       // this.startCooldown(); // 开始冷却
    
        let movement = new Vec3();
        let MoveFlag = false; // 默认移动标志为 false
    
        // 使用 Node 的当前位置
        const currentPosition = this.node.getPosition();
    
        // 根据球体所在的平面和点击的面判断移动方向
        if (this.isApproximatelyEqual(currentPosition.y, 2.2) && plane === 'XOZ') {
            switch (relation) {
                case 'forward':
                    movement.set(0, 0, 1.1);
                    break;
                case 'backward':
                    movement.set(0, 0, -1.1);
                    break;
                case 'left':
                    movement.set(-1.1, 0, 0);
                    break;
                case 'right':
                    movement.set(1.1, 0, 0);
                    break;
            }
        } else if (this.isApproximatelyEqual(currentPosition.z, 2.2) && plane === 'XOY') {
            switch (relation) {
                case 'up':
                    movement.set(0, 1.1, 0);
                    break;
                case 'down':
                    movement.set(0, -1.1, 0);
                    break;
                case 'left':
                    movement.set(-1.1, 0, 0);
                    break;
                case 'right':
                    movement.set(1.1, 0, 0);
                    break;
            }
        } else if (this.isApproximatelyEqual(currentPosition.x, -2.2) && plane === 'YOZ') {
            switch (relation) {
                case 'up':
                    movement.set(0, 1.1, 0);
                    break;
                case 'down':
                    movement.set(0, -1.1, 0);
                    break;
                case 'forward':
                    movement.set(0, 0, 1.1);
                    break;
                case 'backward':
                    movement.set(0, 0, -1.1);
                    break;
            }
        } else {
            console.log("Invalid plane or position for movement.");
            this.isInteracting = false; // 释放锁
            EventSysteml.emit('changeBox', MoveFlag);
            return;
        }
    
        // 计算新的位置
        let newPosition = currentPosition.clone().add(movement);
    
        // 检查新位置是否合法并未被占用
        if (this.isPositionValid(newPosition) && !this.isPositionOccupied(newPosition)) {
            console.log(`Moving to new position: ${newPosition.toString()}`);
            tween(this.node)
                .to(this.moveDuration, { position: newPosition }, { easing: 'quadInOut' })
                .call(() => {
                    this.isInteracting = false; // 动画完成后释放锁
                    MoveFlag = true; // 移动成功，设置标志
                    EventSysteml.emit('changeBox', MoveFlag); // 通知其他组件
                })
                .start();
        } else {
            console.log("Invalid or occupied position, shaking node.");
            this.shakeNode(); // 如果目标位置不合法或已被占用，执行震动效果
            EventSysteml.emit('changeBox', MoveFlag); // 通知其他组件移动失败
        }
    }

    isPositionValid(position: Vec3): boolean {
        // 对不同的平面进行合法性检查
        if (this.isApproximatelyEqual(position.y, 2.2) || this.isApproximatelyEqual(position.y, -2.2)) {
            return position.x >= -1.1 - this.epsilon && position.x <= 1.1 + this.epsilon && 
                   position.z >= -1.1 - this.epsilon && position.z <= 1.1 + this.epsilon;
        } else if (this.isApproximatelyEqual(position.z, 2.2) || this.isApproximatelyEqual(position.z, -2.2)) {
            return position.x >= -1.1 - this.epsilon && position.x <= 1.1 + this.epsilon && 
                   position.y >= -1.1 - this.epsilon && position.y <= 1.1 + this.epsilon;
        } else if (this.isApproximatelyEqual(position.x, 2.2) || this.isApproximatelyEqual(position.x, -2.2)) {
            return position.y >= -1.1 - this.epsilon && position.y <= 1.1 + this.epsilon && 
                   position.z >= -1.1 - this.epsilon && position.z <= 1.1 + this.epsilon;
        }
        return false;
    }

    isApproximatelyEqual(a: number, b: number): boolean {
        return Math.abs(a - b) < this.epsilon;
    }

    isPositionOccupied(position: Vec3): boolean {
        const parent = this.node.parent;
        if (parent) {
            for (let i = 0; i < parent.children.length; i++) {
                const child = parent.children[i];
    
                // 过滤掉 name 为 "lumbermill" 的节点
                if (child.name === "lumbermill") {
                    continue; // 跳过该节点
                }
    
                // 检查位置是否近似相等
                if (child !== this.node && this.isApproximatelyEqualVec3(child.getPosition(), position)) {
                    return true; // 目标位置被占用
                }
            }
        }
        return false; // 目标位置未被占用
    }
    
    isApproximatelyEqualVec3(v1: Vec3, v2: Vec3): boolean {
        return this.isApproximatelyEqual(v1.x, v2.x) &&
               this.isApproximatelyEqual(v1.y, v2.y) &&
               this.isApproximatelyEqual(v1.z, v2.z);
    }

    shakeNode() {
        const originalPosition = this.node.getPosition();
        const shakeOffset = 0.2; // 震动的幅度
        const shakeDuration = 0.01; // 每次震动的时间
        
    
        // 在动画完成后释放锁
        tween(this.node)
            .by(shakeDuration, { position: new Vec3(shakeOffset, 0, 0) })
            .by(shakeDuration, { position: new Vec3(-shakeOffset * 2, 0, 0) })
            .by(shakeDuration, { position: new Vec3(shakeOffset * 2, 0, 0) })
            .by(shakeDuration, { position: new Vec3(-shakeOffset, 0, 0) })
            .to(shakeDuration, { position: originalPosition })
            .call(() => {
                this.isInteracting = false; // 动画完成后释放锁
                console.log("Shake animation complete, lock released.");
            })
            .start();
    }
}