import { _decorator, Component, EventTarget, physics, Node, RigidBody, find, screen, PhysicsSystem, tween, Quat, ICollisionEvent, Collider, input, Input, EventMouse, EventTouch, Label, Vec3, instantiate, Prefab, Camera, EventKeyboard, KeyCode, Button, director, Canvas, UITransform, view, Layers } from 'cc';
import { RotateUtil } from './RotateUtil'; // 引入自定义的 RotateUtil
import { Global } from '../../catalogasset/Script/Global';
import {RequestManager} from '../../catalogasset/Scene/RequestManager'
const manager = RequestManager.getInstance();


const { ccclass, property } = _decorator;
interface RotationChange {
    x: number;
    y: number;
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
    private lastRecordedTime: number = 0; // 上次记录触摸点的时间戳
    private minPointDistance: number = 10; // 两点之间的最小距离（像素）

    private maxAngle: number | null = null; // 当前旋转方向的最大角度
    private minAngle: number | null = null; // 当前旋转方向的最小角度
    private currentDirection: "clockwise" | "counterclockwise" | null = null; // 当前旋转方向
    private lastAngle: number = 0; // 上一帧的角度
    private totalRotation: number = 0; // 总旋转角度

    private lastPushX:number = 0;
    private lastPushY:number = 0;

    private segments: Array<{
        direction: "clockwise" | "counterclockwise";
        startAngle: number;
        endAngle: number;
        angleChange: number;
        duration: number;
    }> = []; // 记录旋转分段
    private directionThreshold: number = 5; // 方向切换的角度阈值

    private flag = true;


    @property(Label)
    public operationCountLabel: Label = null;
    @property(Label)
    public operationTimeLabel: Label = null;

    @property({ type: Prefab })
    prefab: Prefab = null;  // 要实例化和旋转的预制体
    @property({ type: Prefab })
    prefab_large: Prefab = null;  // 要实例化和旋转的预制体

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

    @property(Node)
    public targetNode: Node = null;


    private rotationChanges: RotationChange[] = []; // 记录每一段旋转变化

    private lastDirection: number = 0; // 记录上一次的旋转方向 (+1 表示顺时针，-1 表示逆时针)




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

    @property(Node)
    public targetColliderNode: Node | null = null; // 用于检测碰撞的目标节点

    private collisionStates: boolean[] = []; // 用于记录每个子物体是否发生碰撞



    start() {

        PhysicsSystem.instance.gravity = new Vec3(0, -9.8, 0);
        this.instantiatedNode = instantiate(this.prefab_large);
        this.node.addChild(this.instantiatedNode); // 将实例化的预制体添加到当前节点
        this.instantiatedNode.setPosition(0, 0, 0); // 设置实例化节点的位置


        // 缓存子物体的 Collider 组件（提高性能，避免每帧调用 getComponentsInChildren）
        if (this.instantiatedNode) {
            this.childColliders = this.instantiatedNode.getComponentsInChildren(Collider);
            this.previousChildYPositions = this.childColliders.map(collider => collider.node.getPosition().y);
        }

        /*
        const colliders = this.instantiatedNode.getComponents(Collider);
        colliders.forEach((collider, index) => {
            //console.log(`Collider ${index}:`, collider);
            collider.on('onCollisionEnter', this.onCollisionEnter, this); // 监听碰撞事件
        });
        */

        // 2. 获取父节点下的所有子节点的 Collider，并为每个 Collider 添加碰撞监听器
        const childColliders = this.instantiatedNode.getComponentsInChildren(Collider);
        childColliders.forEach((collider, index) => {
            //console.log(`子节点 Collider ${index}:`, collider);
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




        // 添加 moveDownButton 的事件监听器
        if (this.moveDownButton) {
            this.moveDownButton.node.on(Input.EventType.TOUCH_START, this.onMoveDownButtonPress, this);
            this.moveDownButton.node.on(Input.EventType.TOUCH_END, this.onMoveDownButtonRelease, this);
            this.moveDownButton.node.on(Input.EventType.TOUCH_CANCEL, this.onMoveDownButtonRelease, this);
        }

        if (this.moveUpButton) {
            this.moveUpButton.node.on(Input.EventType.TOUCH_START, this.onMoveUpButtonPress, this);
            this.moveUpButton.node.on(Input.EventType.TOUCH_END, this.onMoveUpButtonRelease, this);
            this.moveUpButton.node.on(Input.EventType.TOUCH_CANCEL, this.onMoveUpButtonRelease, this);
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

        //console.log('Collision detected, schedule scene change after 1 second');
        setTimeout(() => {
            try {
                //console.log('Changing scene to adjust');
                this.ClickRestart();
            } catch (error) {
                //console.error('Error in ClickRestart:', error);
            }
        }, 1000); // 1000ms = 1秒
    }

    ClickRestart() {
        //console.log('ClickRestart called, loading adjust scene');
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
                //console.log(rigidBody.type)
                if (rigidBody) {
                    rigidBody.type = RigidBody.Type.DYNAMIC; // 将子节点的刚体设置为 KINEMATIC（运动型刚体）
                    rigidBody.useGravity = true; // 初始状态不受重力影响

                }
            });
            this.logPlayerAction(
                "Release",

                undefined,
                undefined,
                1, undefined
            );
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




    resetState() {
        this._isRotating = false;
        this.currentAxis = null;
        this.lastAngle = 0;
        this.totalRotation = 0;
        this.currentDirection = null;
        this.segments = [];
        this.maxAngle = null;
        this.minAngle = null;
    }

    calculateDelta(currentAngle: number, lastAngle: number): number {
        let delta = currentAngle - lastAngle;
        if (delta > 180) {
            delta -= 360; // 顺时针跨越 360°
        } else if (delta < -180) {
            delta += 360; // 逆时针跨越 0°
        }
        return Math.abs(delta) > 0.1 ? delta : 0; // 忽略浮点误差
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

    onTouchStart(event: EventTouch) {
        this._isRotating = true;
        this.currentAxis = null;
        this.startTime = Date.now();
        this.touchPath = []; // 记录触摸路径

        const touch = event.getTouches()[0];
        const x = touch.getLocationX();
        const y = touch.getLocationY();

        // 初始化触摸路径
        this.touchPath.push({
            x,
            y,
            time: 0 // 相对时间从 0 开始
        });

        this._lastMousePos.set(x, y, 0);

        // 重置状态变量
        this.lastAngle = 0;
        this.totalRotation = 0;
        this.segments = [];
        this.currentDirection = null;
        this.lastRecordedTime = Date.now();
        this.lastPushX = x;
        this.lastPushY = y;
    }

    onTouchMove(event: EventTouch) {
        if (!this._isRotating || !this.instantiatedNode) return;
    
        const touch = event.getTouches()[0];
        const x = touch.getLocationX();
        const y = touch.getLocationY();
        const currentTime = Date.now(); // 使用绝对时间戳
    
        // 计算滑动距离和方向
        // 计算滑动距离和方向
const referencePoint = this.currentAxis == null 
? { x: this.lastPushX, y: this.lastPushY } 
: { x: this._lastMousePos.x, y: this._lastMousePos.y };

// 统一计算 deltaX, deltaY, 和距离
const deltaX = x - referencePoint.x;
const deltaY = y - referencePoint.y;
const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    

        const distanceFromLastPoint = Math.sqrt(Math.pow(x-this.lastPushX, 2) + Math.pow(y-this.lastPushY, 2)); // 当前与上一次记录点的距离
        const timeDelta = currentTime - this.lastRecordedTime; // 使用绝对时间计算间隔

        
    
        // 动态调整阈值
        const screenWidth = screen.windowSize.width;  // 获取屏幕宽度
        const screenHeight = screen.windowSize.height; // 获取屏幕高度
        const aspectRatio = screenWidth / screenHeight;
        const horizontalThreshold = Math.max(5, aspectRatio * 2);
        this.minPointDistance = screenWidth / 10;
    
        // 确定旋转轴
        if (!this.currentAxis && distance >= this.minSwipeDistance) {
            if (Math.abs(deltaY) < horizontalThreshold) {
                this.currentAxis = 'Y'; // 绕 Y 轴旋转
            } else if (deltaX > 0 && deltaY > 0) {
                this.currentAxis = 'Z';
            } else if (deltaX < 0 && deltaY < 0) {
                this.currentAxis = 'Z';
            } else if (deltaX > 0 && deltaY < 0) {
                this.currentAxis = 'X';
            } else if (deltaX < 0 && deltaY > 0) {
                this.currentAxis = 'X';
            }
    
            if (this.currentAxis) {
                const eulerAngles = this.instantiatedNode.eulerAngles;
                this.lastAngle = this.getAxisAngle(eulerAngles, this.currentAxis);
            }
        }
    
        // 执行旋转
        const rotationAmount = distance * this._rotationSpeed;
        if (this.currentAxis === 'Z') {
            RotateUtil.rotateAround(this.instantiatedNode, Vec3.FORWARD.clone(), deltaY > 0 ? rotationAmount : -rotationAmount);
        } else if (this.currentAxis === 'X') {
            RotateUtil.rotateAround(this.instantiatedNode, Vec3.RIGHT.clone(), deltaY > 0 ? -rotationAmount : rotationAmount);
        } else if (this.currentAxis === 'Y') {
            RotateUtil.rotateAround(this.instantiatedNode, Vec3.UP.clone(), deltaX > 0 ? rotationAmount : -rotationAmount);
        }
    
        // 记录触摸路径：时间间隔和距离间隔
        if (this.currentAxis!= null && timeDelta >= 50 && distanceFromLastPoint >= this.minPointDistance) {
            this.touchPath.push({ x, y, time: currentTime });
            this.lastRecordedTime = currentTime; // 更新上次记录的时间
            this.lastPushX = x;
            this.lastPushY = y;
        }
    
        // 更新鼠标位置
        this._lastMousePos.set(x, y, 0);
    }

    onTouchEnd(event: EventTouch) {
        if (!this._isRotating) return;

        const touch = event.getTouches()[0];
        const x = touch.getLocationX();
        const y = touch.getLocationY();
        const currentTime = Date.now() - this.startTime;

        // 记录触摸路径的最后点
        this.touchPath.push({
            x,
            y,
            time: currentTime
        });

        // 记录最后的旋转信息
        const eulerAngles = this.instantiatedNode.eulerAngles;
        const currentAngle = this.getAxisAngle(eulerAngles, this.currentAxis!);

        this.recordSegment(this.lastAngle, currentAngle, Date.now() - this.startTime);

        // 上传数据
        if (this.currentAxis != null) {
            this.logPlayerAction(
                "Rotate",
                this.currentAxis,
                // 直接传递数组
                JSON.stringify({
                    axis: this.currentAxis,
                    //totalRotation: this.totalRotation,
                    segments: this.segments,
                }, null, 2), // 这里的 JSON.stringify 仍然有效
                1, this.touchPath
            );
        }
        

        // 重置状态
        this.resetState();
        this.snapRotationToClosest90Degrees();
    }

    recordSegment(startAngle: number, endAngle: number, duration: number) {
        const angleChange = this.calculateDelta(endAngle, startAngle);
        const segment: { direction: "clockwise" | "counterclockwise"; startAngle: number; endAngle: number; angleChange: number; duration: number } = {
            direction: angleChange > 0 ? "clockwise" : "counterclockwise", // 明确指定方向类型
            startAngle: this.normalizeAngle(startAngle),
            endAngle: this.normalizeAngle(endAngle),
            angleChange: Math.abs(angleChange),
            duration
        };

        this.segments.push(segment);
        //console.log("记录旋转段：", segment);

        this.startTime = Date.now(); // 更新起始时间
    }


    async logPlayerAction(
        Operation: string,
        axis: string,
        segment: string,
        flag: number,
        angle?: RotationChange[]
    ) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData';
    
        // 1️⃣ 获取 localStorage 数据
        const username = localStorage.getItem('currentUsername');
        const sessionToken = localStorage.getItem('sessionToken');
    
        // 2️⃣ 确保 localStorage 中的用户名和 token 存在
        if (!username) {
            console.warn('❌ 错误：用户名未找到。请确保玩家已正确登录。');
            return;
        }
        if (!sessionToken) {
            console.warn('❌ 错误：Session token 未找到。请确保玩家已正确认证。');
            return;
        }
    
        // 3️⃣ 确保 flag 是一个数字
        if (typeof flag !== 'number') {
            console.warn(`❌ 错误：Flag 必须是数字，但得到了: `, flag);
            return;
        }
    
        // 4️⃣ 获取当前时间（北京时间，精确到毫秒）
        function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
            const str = String(value);
            return str.length >= targetLength ? str : padChar.repeat(targetLength - str.length) + str;
        }
    
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset);
        const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(
            beijingTime.getDate(),
            2
        )} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(
            beijingTime.getSeconds(),
            2
        )}.${padStart(beijingTime.getMilliseconds(), 3)}`;
    
        // 5️⃣ 获取当前的关卡
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不会是 undefined
    
        // 6️⃣ 组织请求数据
        const data = {
            tableName: 'game2',
            data: {
                Usr_ID: username, // 玩家ID
                Timestep: formattedTime, // 时间戳（北京时间，精确到毫秒）
                Level: level, // 当前关卡
                Operation: Operation, // 操作类型（固定为 rotate）
                Axis: axis, // 旋转轴（X, Y, Z）
                Angle: angle ?? null, // 旋转角度变化的 JSON 数组
                Segment: segment,
                Flag: flag, // 其他标志位，通常为 0 或 1
            },
        };
    
        // 7️⃣ 使用 RequestManager 提交请求
        const manager = RequestManager.getInstance();
        manager.addRequest(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
    
        console.log('✅ 请求已加入队列:', data);
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

    async updateMaxLevel(newMaxLevel: number) {
        const apiUrl = 'http://124.71.181.62:3000/api/updateMaxLevel'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从 localStorage 中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从 localStorage 中获取 token
    
        if (!username || !sessionToken) {
            console.warn('No username or sessionToken found.');
            return;
        }
    
        // 准备发送的数据
        const data = {
            username,
            maxLevel: newMaxLevel, // 新的 maxLevel
        };
    
        // 使用 RequestManager 提交请求
        const manager = RequestManager.getInstance();
        manager.addRequest(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
    
        console.log('✅ MaxLevel update request has been added to the queue:', data);
    }

    update(deltaTime: number) {
        // 累加操作时间
        //this.operationTime += deltaTime;

        if (this.instantiatedNode && this.stop_update) {
            const childYPositions = this.childColliders.map((collider, index) => {
                const currentY = collider.node.worldPosition.y;
                const previousY = this.previousChildYPositions[index];
                this.previousChildYPositions[index] = currentY; // 更新前一帧的 Y 值
                ////console.log(`子物体 ${collider.node.name} 当前世界 Y：${currentY}，前一帧 Y：${previousY}`);
                return currentY;
            });

            // 判断所有子物体的 Y 是否都小于等于 -10
            const allBelowThreshold = childYPositions.every(y => y <= -10);

            if (allBelowThreshold && !this.hasCalledManageScene && this.flag) {
                if (parseInt(localStorage.getItem('maxLevel'), 10) < Global.currentLevelIndex + 1) {
                    localStorage.setItem('maxLevel', (Global.currentLevelIndex + 1).toString())
                }
                this.flag = false;
                this.updateMaxLevel(Global.currentLevelIndex + 1);
                this.logUserAction();
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
                    //console.error("金币预制体未指定，请在编辑器中为 coinPrefab 指定一个预制体。");
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

    private manageSceneNodes() {
        if (this.targetNode) {
            this.targetNode.active = true;
            this.targetNode.setSiblingIndex(this.targetNode.parent.children.length - 1); // 设置为顶层
            //console.log(`Node "${this.targetNode.name}" has been activated and moved to the top layer.`);

            // 等待用户点击“我知道了”按钮
            this._setupIKnowButtonListener();
        } else {
            //console.error("Target node is not set!");
        }
    }
    private _setupIKnowButtonListener() {
        const iKnowButtonNode = this.targetNode.getChildByName("Finish"); // 假设按钮名称是 "IKnowButton"
        if (!iKnowButtonNode) {
            //console.error("IKnowButton node not found!");
            return;
        }

        const iKnowButton = iKnowButtonNode.getComponent(Button);
        if (!iKnowButton) {
            //console.error("Button component not found on IKnowButton node!");
            return;
        }

        // 添加点击事件监听
        iKnowButton.node.on('click', () => {
            //console.log("User clicked '我知道了', continuing to render prefabs");

            // 隐藏目标 Node
            this.targetNode.active = false;

            // 渲染 Prefab
            this._renderFinalPrefab();
        }, this);
    }
    private _renderFinalPrefab() {
        const scene = director.getScene();
        if (!scene) {
            //console.error("Scene not found!");
            return;
        }

        // 获取 Node 节点
        const rootNode = scene.getChildByName('Node');
        if (!rootNode) {
            //console.error("Node not found!");
            return;
        }

        // 获取 Canvas 节点
        const canvasNode = rootNode.getChildByName('Canvas');
        if (!canvasNode) {
            //console.error("Canvas not found under Node!");
            return;
        }

        // 实例化 UI 预制体并添加到 Canvas
        if (this.uiPrefab) {
            const uiInstance = instantiate(this.uiPrefab);
            uiInstance.setParent(canvasNode);
            uiInstance.setScale(2, 2, 2); // 正常比例
            uiInstance.setPosition(0, 0, 0); // 居中
            uiInstance.setSiblingIndex(canvasNode.children.length - 1); // 放到最顶层
            //console.log('UI Prefab instantiated and added to Canvas.');
        } else {
            //console.error("UI Prefab is not assigned!");
        }

        // 禁用 Main Camera
        const mainCameraNode = scene.getChildByName('Main Camera');
        if (mainCameraNode) {
            mainCameraNode.active = false;
            //console.log('Main Camera disabled.');
        } else {
            //console.error("Main Camera not found in the scene!");
        }
    }




    async logUserAction() {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不为 undefined
    
        if (!username || !sessionToken) {
            console.warn('No username or sessionToken found.');
            return;
        }
    
        // 获取当前时间的北京时间
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').slice(0, 23); // 格式化为 "YYYY-MM-DD HH:mm:ss"
    
        // 准备发送的数据
        const data = {
            tableName: 'user_pass', // 表名
            data: {
                Usr_ID: username,
                Level: level,
                Timestep: beijingTime, // 使用北京时间
            },
        };
    
        // 使用 RequestManager 提交请求
        const manager = RequestManager.getInstance();
        manager.addRequest(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
    
        console.log('✅ User action has been added to the queue:', data);
    }

    

}



