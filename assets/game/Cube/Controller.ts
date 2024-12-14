import { _decorator, Component, EventTarget, physics, Node, RigidBody, find, Quat,ICollisionEvent, Collider, input, Input, EventMouse, EventTouch, Label, Vec3, instantiate, Prefab, Camera, EventKeyboard, KeyCode, Button,director,Canvas,UITransform,view,Layers } from 'cc';
import { RotateUtil } from './RotateUtil'; // 引入自定义的 RotateUtil
import { Global } from '../../catalogasset/Script/Global';
import { EndBox } from '../../catalogasset/Script/TopLoad/EndBox';


const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {

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


    public tutorchange = false;

    private hasCalledManageScene: boolean = false; // 确保 manageSceneNodes 只调用一次



    private instantiatedNode: Node = null; // 存储实例化后的节点
    private _isRotating: boolean = false;
    private _lastMousePos: Vec3 = new Vec3();
    private _rotationSpeed: number = 0.01; // 调整旋转速度

    private minSwipeDistance: number = 5; // 设置触摸滑动的最小距离阈值
    private currentAxis: 'X' | 'Y' | 'Z' | null = null; // 当前选定的旋转轴


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
    /*
    onCollisionEnter(event: ICollisionEvent) {
        console.log("Collision detected, restoring rotation and moving down...");
        
        // 停止上升和下降
        this._isMovingUp = false;
        this._isMovingDown = false;
    
        // 恢复上一次保存的旋转姿态
        this.instantiatedNode.setRotation(this.savedRotation);
        
        // 将物体位置向下移动
        let currentPosition = this.instantiatedNode.getPosition();
        const downShiftAmount = 2.3; // 调整下移的量
        currentPosition.y += downShiftAmount;
        this.instantiatedNode.setPosition(currentPosition);
        
        // 同步 Cylinder 的位置和缩放
        if (this.targetCylinder) {
            let cylinderScale = this.targetCylinder.getScale();
            let cylinderPosition = this.targetCylinder.getPosition();
        
            // 增加 Cylinder 的高度和下移位置以保持顶部固定
            cylinderScale.y += downShiftAmount / 2.3;
            cylinderPosition.y -= downShiftAmount / 2.3;
        
            // 应用更新
            this.targetCylinder.setScale(cylinderScale);
            this.targetCylinder.setPosition(cylinderPosition);
        }
    
        // 停止上升
        this._isMovingUp = false;
    }
        */
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
        const touch = event.getTouches()[0];
        this._lastMousePos.set(touch.getLocationX(), touch.getLocationY(), 0);
        this.currentAxis = null; // 重置旋转轴锁定
    }

    onTouchMove(event: EventTouch) {
        if (!this._isRotating || !this.instantiatedNode) return;
    
        const touch = event.getTouches()[0];
        let deltaX = touch.getLocationX() - this._lastMousePos.x;
        let deltaY = touch.getLocationY() - this._lastMousePos.y;
    
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
        }
    
        // 获取摄像机的世界矩阵以定义旋转轴
        let worldMatrix = this.camera.node.worldMatrix;
        let cameraRight = Vec3.RIGHT.clone(); // X轴方向
        let cameraUp = Vec3.UP.clone();      // Y轴方向
        let cameraForward = Vec3.FORWARD.clone(); // Z轴方向
    
        let rotationAmount = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * this._rotationSpeed;
    
        // 根据锁定的 currentAxis 执行旋转
        if (this.currentAxis === 'Z') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraForward, deltaX > 0 ? rotationAmount : -rotationAmount);
        } else if (this.currentAxis === 'X') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraRight, deltaX > 0 ? rotationAmount : -rotationAmount);
        } else if (this.currentAxis === 'Y') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraUp, deltaX > 0 ? rotationAmount : -rotationAmount);
        }
    
        this._lastMousePos.set(touch.getLocationX(), touch.getLocationY(), 0);
    }

    onTouchEnd(event: EventTouch) {
        this._isRotating = false;
        this.snapRotationToClosest90Degrees();
        this.currentAxis = null; // 重置轴锁定状态
        this.operationCount += 1;
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
                //console.log('所有子物体的Y位置都小于 -10，调用 manageSceneNodes');
                this.manageSceneNodes();
                this.hasCalledManageScene = true; // 确保 manageSceneNodes 只调用一次
            } else {
                //console.log('并非所有子物体的Y位置都小于 -10');
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

    private async logData(axis: string, angle: number, locationY: number, flag: number) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
        const level = Global.currentLevelIndex;
        const operation = "game";
        const timestamp = new Date().toISOString(); // 获取 ISO 时间戳

        if (!username || !sessionToken) {
            console.error('No username or sessionToken found.');
            return;
        }
    
        // 获取当前时间的北京时间
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').slice(0, 23); // 格式化为 "YYYY-MM-DD HH:mm:ss"
    
        const data = {
            tableName: 'game2',
            data:{
                Usr_ID: username,
                Timestep: beijingTime,
                Level: level,
                Operation: operation,
                Axis: axis,
                Angle: angle,
                Location_y: locationY,
                Flag: flag
            }
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${sessionToken}`
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                console.log("Data logged successfully:", data);
            } else {
                console.error("Failed to log data:", response.statusText);
            }
        } catch (error) {
            console.error("Error logging data:", error);
        }
    }

    }
