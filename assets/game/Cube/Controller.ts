import { _decorator, Component, EventTarget, physics, Node, RigidBody, find, tween, Quat, ICollisionEvent, Collider, input, Input, EventMouse, EventTouch, Label, Vec3, instantiate, Prefab, Camera, EventKeyboard, KeyCode, Button, director, Canvas, UITransform, view, Layers } from 'cc';
import { RotateUtil } from './RotateUtil'; // 引入自定义的 RotateUtil
import { Global } from '../../catalogasset/Script/Global';
import { EndBox } from '../../catalogasset/Script/TopLoad/EndBox';


const { ccclass, property } = _decorator;
interface RotationChange {
    x:number;
    y:number;
    time: number; // 当前段的旋转角度变化
}

interface AngleData {
    Axis: 'X' | 'Y' | 'Z';       // 旋转的轴
    Changes: RotationChange[];   // 记录所有方向变化的数组
}


@ccclass('Controller')
export class Controller extends Component {

    private touchPath: Array<{ x: number, y: number, time: number }> = [];
    private startTime: number = 0;
    private lastDirectionX: number = 0;
private lastDirectionY: number = 0;

    @property(Label)
    public operationCountLabel: Label = null;
    @property(Label)
    public operationTimeLabel: Label = null;

    @property({ type: Prefab })
    prefab: Prefab = null;  // 要实例化和旋转的预制体

    @property({ type: Camera })
    camera: Camera = null;  // 摄像机对象

    @property(Prefab)
    public uiPrefab: Prefab = null; // 需要渲染的UI-2D预制体

    @property({ type: Node })
    targetCylinder: Node = null;  // 另一个需要拉长的圆柱体

    @property(Button)
    moveDownButton: Button = null;  // 控制下降的按钮  

    @property(Button)
    moveUpButton: Button = null;  // 控制上升的按钮

    @property({ type: Prefab })
    coinPrefab: Prefab = null;  // 金币的预制体

    private totalRotation: number = 0; // 总的旋转角度
    private rotationChanges: RotationChange[] = []; // 记录每一段旋转变化
    private lastAngle: number = 0; // 上一帧的角度
    private lastDirection: number = 0; // 记录上一次的旋转方向 (+1 表示顺时针，-1 表示逆时针)

    private maxAngle: number = 0;


    public tutorchange = false;

    private hasCalledManageScene: boolean = false; // 确保 manageSceneNodes 只调用一次

    private finalRotation: number = 0;


    private instantiatedNode: Node = null; // 存储实例化后的节点
    private _isRotating: boolean = false;
    private _lastMousePos: Vec3 = new Vec3();
    private _rotationSpeed: number = 0.01; // 调整旋转速度

    private minSwipeDistance: number = 5; // 设置触摸滑动的最小距离阈值
    private currentAxis: 'X' | 'Y' | 'Z' | null = null; // 当前选定的旋转轴
    // 记录 X、Y、Z 轴的起始角度
    private startAngleX: number = 0;
    private startAngleY: number = 0;
    private startAngleZ: number = 0;


    private _isMovingUp: boolean = false; // 判断是否按下空格键或触发按钮
    private _isMovingDown: boolean = false; // 判断是否按下空格键或触发按钮
    private _moveSpeed: number = 0.08; // 上升速度

    private operationCount: number = 0;  // To track the number of operations
    private operationTime: number = 0;   // To track the total time of operations

    private stop_update = true;

    private savedRotation: Quat = new Quat(); // 用于保存旋转姿态

    private hasCollided = false; // ⚠️ 记录是否发生过碰撞

    // 声明 childColliders 和 previousChildYPositions 属性
    private childColliders: Collider[] = []; // 存储所有子物体的碰撞器组件
    private previousChildYPositions: number[] = []; // 存储子物体的前一帧的Y坐标

    start() {

        // 实例化预制体并添加到场景中
        if (this.prefab) {
            //physics.PhysicsSystem.instance.fixedTimeStep = 1 / 120;
            this.instantiatedNode = instantiate(this.prefab);
            this.node.addChild(this.instantiatedNode); // 将实例化的预制体添加到当前节点
            this.instantiatedNode.setPosition(0, 0, 0); // 设置实例化节点的位置
        }

        // 缓存子物体的 Collider 组件（提高性能，避免每帧调用 getComponentsInChildren）
        if (this.instantiatedNode) {
            this.childColliders = this.instantiatedNode.getComponentsInChildren(Collider);
            this.previousChildYPositions = this.childColliders.map(collider => collider.node.getPosition().y);
        }

        /*
        const colliders = this.instantiatedNode.getComponents(Collider);
        colliders.forEach((collider, index) => {
            console.log(`Collider ${index}:`, collider);
            collider.on('onCollisionEnter', this.onCollisionEnter, this); // 监听碰撞事件
        });
        */

        // 2. 获取父节点下的所有子节点的 Collider，并为每个 Collider 添加碰撞监听器
        const childColliders = this.instantiatedNode.getComponentsInChildren(Collider);
        childColliders.forEach((collider, index) => {
            console.log(`子节点 Collider ${index}:`, collider);
            collider.on('onCollisionEnter', this.onCollisionEnter, this);

            // 获取子节点的刚体组件
            const rigidBody = collider.node.getComponent(RigidBody);
            if (rigidBody) {
                rigidBody.type = RigidBody.Type.KINEMATIC; // 将子节点的刚体设置为 KINEMATIC（运动型刚体）
                rigidBody.useGravity = false; // 初始状态不受重力影响
            }
        });


        // 监听鼠标和触摸事件
        //input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
        //input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        //input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        // 监听键盘按下和抬起事件
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

        // 设置按钮点击事件
        if (this.moveUpButton) {
            this.moveUpButton.node.on(Input.EventType.TOUCH_START, this.onMoveUpButtonPress, this);
            this.moveUpButton.node.on(Input.EventType.TOUCH_END, this.onMoveUpButtonRelease, this);
            this.moveUpButton.node.on(Input.EventType.TOUCH_CANCEL, this.onMoveUpButtonRelease, this); // 处理取消事件
        }
        if (this.moveDownButton) {
            this.moveDownButton.node.on(Input.EventType.TOUCH_START, this.onMoveDownButtonPress, this);
            this.moveDownButton.node.on(Input.EventType.TOUCH_END, this.onMoveDownButtonRelease, this);
            this.moveDownButton.node.on(Input.EventType.TOUCH_CANCEL, this.onMoveDownButtonRelease, this); // 处理取消事件
        }
    }

    onCollisionEnter(event: ICollisionEvent) {
        if (this.hasCollided) return;

        this.hasCollided = true;

        // 正确解绑所有子节点的碰撞监听
        const childColliders = this.instantiatedNode.getComponentsInChildren(Collider);
        childColliders.forEach(collider => {
            collider.off('onCollisionEnter', this.onCollisionEnter, this);
        });

        console.log('Collision detected, schedule scene change after 1 second');
        setTimeout(() => {
            try {
                console.log('Changing scene to adjust');
                this.ClickRestart();
            } catch (error) {
                console.error('Error in ClickRestart:', error);
            }
        }, 1000); // 1000ms = 1秒
    }

    ClickRestart() {
        console.log('ClickRestart called, loading adjust scene');
        director.loadScene('adjust');
    }


    onMoveDownButtonPress() {
        this._isMovingDown = true;
    }

    onMoveDownButtonRelease() {
        if (this.instantiatedNode) {
            const childColliders = this.instantiatedNode.getComponentsInChildren(Collider);
            childColliders.forEach((collider, index) => {

                // 获取子节点的刚体组件
                const rigidBody = collider.node.getComponent(RigidBody);
                if (rigidBody) {
                    rigidBody.type = RigidBody.Type.DYNAMIC; // 将子节点的刚体设置为 KINEMATIC（运动型刚体）
                    rigidBody.useGravity = true; // 初始状态不受重力影响
                }
            });
        }
    }

    onMouseDown(event: EventMouse) {
        this._isRotating = true;
        this._lastMousePos.set(event.getLocationX(), event.getLocationY(), 0);
    }

    onMouseMove(event: EventMouse) {
        if (!this._isRotating || !this.instantiatedNode) return;

        let deltaX = event.getLocationX() - this._lastMousePos.x;
        let deltaY = event.getLocationY() - this._lastMousePos.y;

        this._lastMousePos.set(event.getLocationX(), event.getLocationY(), 0);

        let worldMatrix = this.camera.node.worldMatrix;

        let cameraRight = new Vec3(worldMatrix.m00, worldMatrix.m01, worldMatrix.m02); // X轴方向（右向量）
        let cameraUp = new Vec3(worldMatrix.m04, worldMatrix.m05, worldMatrix.m06);    // Y轴方向（上向量）

        RotateUtil.rotateAround(this.instantiatedNode, cameraUp, deltaX * this._rotationSpeed);
        RotateUtil.rotateAround(this.instantiatedNode, cameraRight, -deltaY * this._rotationSpeed);
    }

    onMouseUp(event: EventMouse) {
        this._isRotating = false;
        this.snapRotationToClosest90Degrees();
    }

    onTouchStart(event: EventTouch) {
        this._isRotating = true;

        /*
        this.rotationChanges = [];
        this.totalRotation = 0;
        this.lastAngle = 0;
        this.lastDirection = 0;
        this.currentAxis = null;
        this.finalRotation = 0; // 新增变量，记录最终的旋转角度
        */
        this.currentAxis = null;

        this.startTime = Date.now(); // 记录触摸的起始时间
        this.touchPath = []; // 📌 触摸路径 (x, y, time) 的数组

        const touch = event.getTouches()[0];
        const x = touch.getLocationX();
        const y = touch.getLocationY();

        /*const eulerAngles = this.instantiatedNode.eulerAngles;
        this.startAngleX = this.normalizeAngle(eulerAngles.x);
        this.startAngleY = this.normalizeAngle(eulerAngles.y);
        this.startAngleZ = this.normalizeAngle(eulerAngles.z);
        */


        // 记录触摸路径的第一个点
        this.touchPath.push({
            x,
            y,
            time: 0 // 相对时间为 0
        });

        this._lastMousePos.set(x, y, 0);
        this._lastMousePos.set(touch.getLocationX(), touch.getLocationY(), 0);
    }

    onTouchMove(event: EventTouch) {
        if (!this._isRotating || !this.instantiatedNode) return;

        const touch = event.getTouches()[0];
    const x = touch.getLocationX();
    const y = touch.getLocationY();
    const currentTime = Date.now() - this.startTime; // 计算相对时间（从 touchstart 起的时间）



    // 1️⃣ **计算 deltaX 和 deltaY**
    let deltaX = x - this._lastMousePos.x;
    let deltaY = y - this._lastMousePos.y;

    // 2️⃣ **计算当前的方向**
    const currentDirectionX = deltaX > 5 ? 1 : deltaX < -5 ? -1 : 0;
    const currentDirectionY = deltaY > 5 ? 1 : deltaY < -5 ? -1 : 0;

    // 3️⃣ **路径记录逻辑**
    if (!this.currentAxis) {
        // 🌐 未锁定的状态，记录所有路径点
        const lastPoint = this.touchPath[this.touchPath.length - 1];
        if (!lastPoint || lastPoint.x !== x || lastPoint.y !== y) {
            this.touchPath.push({ 
                x, 
                y, 
                time: currentTime 
            });
        }
    } else {
        if (
            this.currentAxis === 'X' && 
            currentDirectionY !== 0 && 
            currentDirectionY !== this.lastDirectionY
        ) {
            this.touchPath.push({ 
                x, 
                y, 
                time: currentTime 
            });
        } 
        else if (
            this.currentAxis === 'Y' && 
            currentDirectionX !== 0 && 
            currentDirectionX !== this.lastDirectionX
        ) {
            this.touchPath.push({ 
                x, 
                y, 
                time: currentTime 
            });
        } 
        else if (
            this.currentAxis === 'Z' && 
            currentDirectionY !== 0 && 
            currentDirectionY !== this.lastDirectionY
        ) {
            this.touchPath.push({ 
                x, 
                y, 
                time: currentTime 
            });
            console.log(`📌 Z轴旋转，记录路径点: x=${x}, y=${y}, time=${currentTime}`);
        }
    }

    // 4️⃣ **更新方向状态**
    this.lastDirectionX = currentDirectionX;
    this.lastDirectionY = currentDirectionY;
    


        // 检查滑动距离是否达到设定阈值
        if (!this.currentAxis && Math.sqrt(deltaX * deltaX + deltaY * deltaY) >= this.minSwipeDistance) {
            const horizontalThreshold = 2; // 水平滑动的容忍范围

            if (Math.abs(deltaY) < horizontalThreshold) {
                // 水平滑动，绕 Y 轴旋转
                this.currentAxis = 'Y';
            } else if (deltaX > 0 && deltaY > 0) {
                this.currentAxis = 'Z'; // 左下到右上，Z轴正方向旋转
            } else if (deltaX < 0 && deltaY < 0) {
                this.currentAxis = 'Z'; // 右上到左下，Z轴负方向旋转
            } else if (deltaX > 0 && deltaY < 0) {
                this.currentAxis = 'X'; // 右下到左上，X轴正方向旋转
            } else if (deltaX < 0 && deltaY > 0) {
                this.currentAxis = 'X'; // 左上到右下，X轴负方向旋转
            }
            // ✅ 确定当前轴后，记录该轴的起始角度
            if (!this.currentAxis) {
                const eulerAngles = this.instantiatedNode.eulerAngles;
                this.lastAngle = this.getAxisAngle(eulerAngles, this.currentAxis);
            }
        }

        // 获取摄像机的世界矩阵以定义旋转轴
        let worldMatrix = this.camera.node.worldMatrix;
        let cameraRight = Vec3.RIGHT.clone(); // X轴方向
        let cameraUp = Vec3.UP.clone();      // Y轴方向
        let cameraForward = Vec3.FORWARD.clone(); // Z轴方向

        let rotationAmount = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * this._rotationSpeed;

        // 根据锁定的 currentAxis 执行旋转
        if (this.currentAxis === 'Z') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraForward, deltaY > 0 ? rotationAmount : -rotationAmount);
        } else if (this.currentAxis === 'X') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraRight, deltaY > 0 ? -rotationAmount : rotationAmount);
        } else if (this.currentAxis === 'Y') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraUp, deltaX > 0 ? rotationAmount : -rotationAmount);
        }

        /*
        const eulerAngles = this.instantiatedNode.eulerAngles;
        let currentAngle = this.getAxisAngle(eulerAngles, this.currentAxis);

        // 3️⃣ **计算旋转的变化量**
        let delta = ((currentAngle - this.lastAngle + 540) % 360) - 180;
        const currentDirection = delta > 0 ? 1 : -1;

        // 6️⃣ **累加旋转的变化量**
        this.totalRotation += Math.abs(delta);
        this.lastAngle += delta;

        this.maxAngle = Math.max(this.maxAngle, currentAngle);

        // 记录旋转方向的变化
        if (Math.abs(currentAngle - this.maxAngle) > 20) {
            this.rotationChanges.push({
                direction: this.lastDirection > 0 ? 'clockwise' : 'counterclockwise',
                angle: Math.abs(this.lastAngle)
            });
            console.log('📌 记录了当前段的旋转:', this.rotationChanges);
            this.lastAngle = 0; // ⚠️ 方向变化，重置当前段的累计角度
            this.maxAngle = currentAngle; // ⚠️ 方向变化，重置最大旋转角
        }


        this.lastDirection = currentDirection;
        */
        this._lastMousePos.set(touch.getLocationX(), touch.getLocationY(), 0);

    }

    onTouchEnd(event: EventTouch) {
        this._isRotating = false;

        const touch = event.getTouches()[0];
        const x = touch.getLocationX();
        const y = touch.getLocationY();
        const currentTime = Date.now() - this.startTime; // 计算相对时间（从 touchstart 起的时间）

        // 记录触摸路径的最后一个点
        this.touchPath.push({
            x,
            y,
            time: currentTime
        });

        //console.log('📡 触摸路径 (x, y, time):', this.touchPath);

        /*
        if (Math.abs(this.lastAngle) > 20) {
            this.rotationChanges.push({
                direction: this.lastDirection > 0 ? 'clockwise' : 'counterclockwise',
                angle: Math.abs(this.lastAngle)
            });
        }

        // 计算最终的净旋转角度
        const eulerAngles = this.instantiatedNode.eulerAngles;
        const currentAngle = this.getAxisAngle(eulerAngles, this.currentAxis);
        let startAngle = this[`startAngle${this.currentAxis}`];
        this.finalRotation = this.normalizeAngle(currentAngle - startAngle);


        console.log(`✅ 总旋转角度: ${this.totalRotation}°`);
        console.log(`✅ 最终的净旋转角度: ${this.finalRotation}°`);
        console.log(`📡 发送旋转数据: 轴 = ${this.currentAxis}, 变化 =`, this.rotationChanges);

        this.currentAxis = null;
        this.totalRotation = 0;
        this.rotationChanges = [];
        this.lastAngle = 0;
        this.lastDirection = 0;
        */
        this.snapRotationToClosest90Degrees();
        this.logPlayerAction(this.currentAxis,this.touchPath,1)

    }

    normalizeAngle(angle: number): number {
        return (angle + 360) % 360;
    }

    getAxisAngle(eulerAngles: Vec3, axis: string): number {
        if (axis === 'X') return this.normalizeAngle(eulerAngles.x);
        if (axis === 'Y') return this.normalizeAngle(eulerAngles.y);
        if (axis === 'Z') return this.normalizeAngle(eulerAngles.z);
        return 0;
    }

    async logPlayerAction(axis: string, angle: RotationChange[], flag: number) {
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

        // 4️⃣ 确保 angle 是一个 JSON 数组
        if (!Array.isArray(angle)) {
            console.error(`❌ 错误：Angle 必须是 JSON 数组，但得到了: `, angle);
            return;
        }

        // 5️⃣ 确保 flag 是一个数字
        if (typeof flag !== 'number') {
            console.error(`❌ 错误：Flag 必须是数字，但得到了: `, flag);
            return;
        }

        // 6️⃣ 获取当前时间（北京时间，精确到毫秒）
        function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
            const str = String(value);
            return str.length >= targetLength ? str : padChar.repeat(targetLength - str.length) + str;
        }

        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset);
        const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(beijingTime.getDate(), 2)} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(beijingTime.getSeconds(), 2)}.${padStart(beijingTime.getMilliseconds(), 3)}`;

        // 7️⃣ 获取当前的关卡
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不会是 undefined

        // 8️⃣ 组织请求数据
        const data = {
            tableName: 'game2',
            data: {
                Usr_ID: username,          // 玩家ID
                Timestep: formattedTime,   // 时间戳（北京时间，精确到毫秒）
                Level: level,              // 当前关卡
                Operation: 'rotate',       // 操作类型（固定为 rotate）
                Axis: axis,                // 旋转轴（X, Y, Z）
                Angle: angle,              // 旋转角度变化的 JSON 数组
                Flag: flag                 // 其他标志位，通常为 0 或 1
            },
        };

        // 9️⃣ 发送请求
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

    snapRotationToClosest90Degrees() {
        if (this.instantiatedNode) {
            let euler = new Vec3();
            this.instantiatedNode.getRotation().getEulerAngles(euler);

            euler.x = Math.round(euler.x / 90) * 90;
            euler.y = Math.round(euler.y / 90) * 90;
            euler.z = Math.round(euler.z / 90) * 90;

            this.instantiatedNode.setRotationFromEuler(euler.x, euler.y, euler.z);
            // 保存旋转姿态
            this.instantiatedNode.getRotation(this.savedRotation);
            this.tutorchange = true;
            this.node.emit('turtorchange', this.tutorchange);

        }
    }

    onKeyDown(event: EventKeyboard) {
        // 检测空格键
        if (event.keyCode === KeyCode.SPACE) {
            this._isMovingUp = true;
        }
    }

    onKeyUp(event: EventKeyboard) {
        // 释放空格键
        if (event.keyCode === KeyCode.SPACE) {
            this._isMovingUp = false;
        }
    }

    onMoveUpButtonPress() {
        this._isMovingUp = true;
    }

    onMoveUpButtonRelease() {
        this._isMovingUp = false;
    }
    startRotation(coinNode: Node) {
        tween(coinNode)
            .repeatForever(
                tween()
                    .by(1, { eulerAngles: new Vec3(0, 360, 0) }) // 每 1 秒绕 Y 轴旋转 360 度
            )
            .start();
    }

    update(deltaTime: number) {
        // 累加操作时间
        //this.operationTime += deltaTime;

        if (this.instantiatedNode && this.stop_update) {
            const childYPositions = this.childColliders.map((collider, index) => {
                const currentY = collider.node.worldPosition.y;
                const previousY = this.previousChildYPositions[index];
                this.previousChildYPositions[index] = currentY; // 更新前一帧的 Y 值
                //console.log(`子物体 ${collider.node.name} 当前世界 Y：${currentY}，前一帧 Y：${previousY}`);
                return currentY;
            });

            // 判断所有子物体的 Y 是否都小于等于 -10
            const allBelowThreshold = childYPositions.every(y => y <= -10);

            if (allBelowThreshold && !this.hasCalledManageScene) {
                // 1. 生成金币并设置位置
                if (this.coinPrefab) {
                    const coinNode = instantiate(this.coinPrefab);
                    this.node.addChild(coinNode); // 将金币节点添加到当前节点
                    coinNode.getComponent(UITransform)?.setAnchorPoint(0.5, 0.5); // 确保锚点在 (0.5, 0.5)

                    // 2. 动画效果 - 使金币从地下冒出
                    const targetPosition = new Vec3(0, -10, 0); // 目标位置
                    const duration = 0.3; // 动画持续时间
                    coinNode.setPosition(0, -20, 0); // 先将金币放在 Y=-20 位置

                    // 3. 控制位置和旋转的 tween 动画
                    tween(coinNode)
                        .to(duration, { position: targetPosition })
                        .call(() => {
                            // 4. 持续旋转的动画
                            this.startRotation(coinNode);
                        })
                        .start();

                } else {
                    console.error("金币预制体未指定，请在编辑器中为 coinPrefab 指定一个预制体。");
                }

                // 3. 延迟 1 秒后调用 this.manageSceneNodes()
                setTimeout(() => {
                    this.manageSceneNodes();
                }, 1000); // 1000ms = 1秒

                this.hasCalledManageScene = true; // 确保 manageSceneNodes 只调用一次
            }

        }


        /*
        if (this._isMovingUp && this.instantiatedNode && this.node.name === "Node") {
            this.moveUp();
            const locationY = this.instantiatedNode.getPosition().y;
            //this.logData('up', 0, locationY, 0);
        }
    
        // 控制下降逻辑
        if (this._isMovingDown && this.instantiatedNode && this.node.name === "Node") {
            this.moveDown();
            const locationY = this.instantiatedNode.getPosition().y;
            //this.logData('down', 0, locationY, 0);
        }
            

        if (this.instantiatedNode && this.currentAxis != null) {
            const locationY = this.instantiatedNode.getPosition().y;
    
            // 获取旋转角度
            const eulerAngles = new Vec3();
            this.instantiatedNode.getRotation().getEulerAngles(eulerAngles);
    
            // 根据 currentAxis 记录数据
            switch (this.currentAxis) {
                case 'X':
                    //this.logData('X', eulerAngles.x, locationY, 0); 
                    break;
                case 'Y':
                    //this.logData('Y', eulerAngles.y, locationY, 0); 
                    break;
                case 'Z':
                    //this.logData('Z', eulerAngles.z, locationY, 0); 
                    break;
            }
        }
            */

        /*
        if (this.instantiatedNode && this.instantiatedNode.getPosition().y > 26 && this.stop_update) {
            this.manageSceneNodes();
            this.stop_update = false; // 确保只执行一次
        }
    }
    
    // 上升逻辑
    private moveUp() {
        let currentPosition = this.instantiatedNode.getPosition();
        currentPosition.y += this._moveSpeed;
        this.instantiatedNode.setPosition(currentPosition);
    
        if (this.targetCylinder) {
            let currentScale = this.targetCylinder.getScale();
            let targetPosition = this.targetCylinder.getPosition();
            let heightChange = this._moveSpeed;
    
            // 更新目标圆柱体的高度和位置
            currentScale.y -= heightChange / 2.3;
            targetPosition.y += heightChange / 2.3;
    
            this.targetCylinder.setScale(currentScale);
            this.targetCylinder.setPosition(targetPosition);
        }
    }
    
    // 下降逻辑
    private moveDown() {
        let currentPosition = this.instantiatedNode.getPosition();
        currentPosition.y -= this._moveSpeed;
        this.instantiatedNode.setPosition(currentPosition);
    
        if (this.targetCylinder) {
            let currentScale = this.targetCylinder.getScale();
            let targetPosition = this.targetCylinder.getPosition();
            let heightChange = this._moveSpeed;
    
            // 更新目标圆柱体的高度和位置
            currentScale.y += heightChange / 2.3;
            targetPosition.y -= heightChange / 2.3;
    
            this.targetCylinder.setScale(currentScale);
            this.targetCylinder.setPosition(targetPosition);
        }
            */
    }


    // 管理场景节点逻辑
    private manageSceneNodes() {
        const scene = director.getScene();
        if (!scene) {
            console.error("Scene not found!");
            return;
        }

        // 获取 Node 节点
        const rootNode = scene.getChildByName('Node');
        if (!rootNode) {
            console.error("Node not found!");
            return;
        }

        // 获取 Canvas 节点
        const canvasNode = rootNode.getChildByName('Canvas');
        if (!canvasNode) {
            console.error("Canvas not found under Node!");
            return;
        }

        // 实例化 UI 预制体并添加到 Canvas
        if (this.uiPrefab) {
            const uiInstance = instantiate(this.uiPrefab);
            uiInstance.setParent(canvasNode);
            uiInstance.setScale(2, 2, 2); // 正常比例
            uiInstance.setPosition(0, 0, 0); // 居中
            uiInstance.setSiblingIndex(canvasNode.children.length - 1); // 放到最顶层
            console.log('UI Prefab instantiated and added to Canvas.');
        } else {
            console.error("UI Prefab is not assigned!");
        }

        // 禁用 Main Camera
        const mainCameraNode = scene.getChildByName('Main Camera');
        if (mainCameraNode) {
            mainCameraNode.active = false;
            console.log('Main Camera disabled.');
        } else {
            console.error("Main Camera not found in the scene!");
        }
    }


}
