import { _decorator, Component, Node, Vec3, input, Input, EventTarget, KeyCode, tween,Button } from 'cc';
import { EventSystem } from './RubiksCube';
import {Global} from '../../catalogasset/Script/Global'
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
        console.log(`🚀 目标位置: ${newPosition.toString()}`);

        const valid = this.isPositionValid(newPosition);
    const occupied = this.isPositionOccupied(newPosition);


    this.logPlayerAction('baxmove',undefined,undefined,undefined,
        currentPosition,occupied,newPosition,relation,plane
    )
    
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

    async logPlayerAction(
        Operation: string,
        Cube_Axis?: string,
        Cube_Dimention?: number, 
        Cube_Direction?: Vec3, 
        Object_xyz?: Vec3, 
        Object_judge?: boolean, 
        Flag_xyz?: Vec3,
        Object_direction?: string,
        Object_panel?: string
    ) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
    
        // 1️⃣ 获取 localStorage 数据
        const username = localStorage.getItem('currentUsername');
        const sessionToken = localStorage.getItem('sessionToken');
    
        // 2️⃣ 确保 localStorage 中的用户名和 token 存在
        if (!username) {
            console.error('❌ 错误：用户名未找到。请确保玩家已正确登录。');
            return;
        }
        if (!sessionToken) {
            console.error('❌ 错误：Session token 未找到。请确保玩家已正确认证。');
            return;
        }
    
        // 3️⃣ 获取当前时间（北京时间，精确到毫秒）
        function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
            const str = String(value);
            return str.length >= targetLength ? str : padChar.repeat(targetLength - str.length) + str;
        }
    
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset);
        const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(beijingTime.getDate(), 2)} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(beijingTime.getSeconds(), 2)}.${padStart(beijingTime.getMilliseconds(), 3)}`;
    
        // 4️⃣ 获取当前的关卡
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不会是 undefined
    
        // 5️⃣ 参数校验：判断提供哪组参数
        const hasCubeParams = Cube_Dimention !== undefined && Cube_Direction !== undefined;
        const hasObjectParams = Object_xyz !== undefined && Object_judge !== undefined && Flag_xyz !== undefined && Object_direction !== undefined && Object_panel !== undefined;
    
        if (!hasCubeParams && !hasObjectParams) {
            console.error('❌ 错误：未提供完整的参数。请提供 Cube_Dimention 和 Cube_Direction，或者 Object_xyz, Object_judge 和 Flag_xyz。');
            return;
        }
    
        // 6️⃣ 组织请求数据
        const data: any = {
            tableName: 'game3',
            data: {
                Usr_ID: username,          // 玩家ID
                Timestep: formattedTime,   // 时间戳（北京时间，精确到毫秒）
                Level: level,              // 当前关卡
                Operation: Operation,      // 操作类型
            },
        };
    
        // 根据提供的参数进行数据填充
        if (hasCubeParams) {
            data.data.Cube_Axis = Cube_Axis;
            data.data.Cube_Dimention = Cube_Dimention;
            data.data.Cube_Direction = Cube_Direction ? Cube_Direction.toString() : null;
        } else if (hasObjectParams) {
            data.data.Object_xyz = Object_xyz ? Object_xyz.toString() : null;
            data.data.Object_judge = Object_judge;
            data.data.Flag_xyz = Flag_xyz ? Flag_xyz.toString() : null;
            data.data.Object_direction = Object_direction;
            data.data.object_panel = Object_panel;
        }
    
        // 7️⃣ 发送请求
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`,
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('❌ 错误：无法记录玩家操作');
            }
    
            const result = await response.json();
            console.log('✅ 玩家操作记录成功：', result);
        } catch (error) {
            console.error('❌ 记录玩家操作时发生错误：', error);
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