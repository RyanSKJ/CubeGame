import { _decorator, Component, physics, Node, RigidBody, Quat,ICollisionEvent, Collider, input, Input, EventMouse, EventTouch, Label, Vec3, instantiate, Prefab, Camera, EventKeyboard, KeyCode, Button,director,Canvas,UITransform,view,Layers } from 'cc';
import { RotateUtil } from './RotateUtil'; // 引入自定义的 RotateUtil


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

    start() {
        
        // 实例化预制体并添加到场景中
        if (this.prefab) {
            physics.PhysicsSystem.instance.fixedTimeStep = 1 / 120;
            this.instantiatedNode = instantiate(this.prefab);
            this.node.addChild(this.instantiatedNode); // 将实例化的预制体添加到当前节点
            this.instantiatedNode.setPosition(0, 0, 0); // 设置实例化节点的位置
        }

        const rigidBody = this.instantiatedNode.getComponent(RigidBody);
        if (rigidBody) {
            rigidBody.useCCD = true;  // 开启 CCD
        }

        const colliders = this.instantiatedNode.getComponents(Collider);
        colliders.forEach((collider, index) => {
            console.log(`Collider ${index}:`, collider);
            collider.on('onCollisionEnter', this.onCollisionEnter, this); // 监听碰撞事件
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
        console.log("Collision detected, restoring rotation and moving down...");
        
        // 停止上升和下降
        this._isMovingUp = false;
        this._isMovingDown = false;
    
        // 恢复上一次保存的旋转姿态
        this.instantiatedNode.setRotation(this.savedRotation);
        
        // 将物体位置向下移动
        let currentPosition = this.instantiatedNode.getPosition();
        const downShiftAmount = 1.0; // 调整下移的量
        currentPosition.y -= downShiftAmount;
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

    onMoveDownButtonPress() {
        this._isMovingDown = true;
    }
    
    onMoveDownButtonRelease() {
        this._isMovingDown = false;
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
            // 如果达到最小滑动距离，根据方向锁定旋转轴
            if (deltaX > 0 && deltaY > 0) {
                this.currentAxis = 'Z'; // 左下到右上，Z轴正方向旋转
            } else if (deltaX < 0 && deltaY < 0) {
                this.currentAxis = 'Z'; // 右上到左下，Z轴负方向旋转
            } else if (deltaX > 0 && deltaY < 0) {
                this.currentAxis = 'X'; // 右下到左上，X轴正方向旋转
            } else if (deltaX < 0 && deltaY > 0) {
                this.currentAxis = 'X'; // 左上到右下，X轴负方向旋转
            } else if (deltaX > 0 && deltaY === 0) {
                this.currentAxis = 'Y'; // 水平左往右，Y轴正方向旋转
            } else if (deltaX < 0 && deltaY === 0) {
                this.currentAxis = 'Y'; // 水平右往左，Y轴负方向旋转
            }
        }

        // 获取摄像机的世界矩阵以定义旋转轴
        let worldMatrix = this.camera.node.worldMatrix;
        let cameraRight = Vec3.RIGHT.clone(); // X轴方向
        let cameraUp = Vec3.UP.clone();    // Y轴方向
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
        this.operationTime += deltaTime;
        //this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
        //this.operationCountLabel.string = `翻滚次数: ${this.operationCount}`;
        // 如果按下空格键或点击按钮，并且 instantiatedNode 的名字为 "Node"
        if (this._isMovingUp && this.instantiatedNode && this.node.name === "Node") {
            // 上升时，instantiatedNode 向上移动
            let currentPosition = this.instantiatedNode.getPosition();
            currentPosition.y += this._moveSpeed;
            this.instantiatedNode.setPosition(currentPosition);
        
            if (this.targetCylinder) {
                // 获取当前的缩放和位置
                let currentScale = this.targetCylinder.getScale();
                let targetPosition = this.targetCylinder.getPosition();
        
                // 平滑减少 Cylinder 的高度
                let heightChange = this._moveSpeed;
        
                // 调整 Cylinder 的 scale 和 position，使顶部保持固定
                currentScale.y -= heightChange/2.3;
                targetPosition.y += heightChange / 2.3;  // 上移以保持顶部位置不变
        
                // 应用更新后的缩放和位置
                this.targetCylinder.setScale(currentScale);
                this.targetCylinder.setPosition(targetPosition);
            }
        }
        
        if (this._isMovingDown && this.instantiatedNode && this.node.name === "Node") {
            // 下降时，instantiatedNode 向下移动
            let currentPosition = this.instantiatedNode.getPosition();
            currentPosition.y -= this._moveSpeed;
            this.instantiatedNode.setPosition(currentPosition);
        
            if (this.targetCylinder) {
                // 获取当前的缩放和位置
                let currentScale = this.targetCylinder.getScale();
                let targetPosition = this.targetCylinder.getPosition();
        
                // 平滑增加 Cylinder 的高度
                let heightChange = this._moveSpeed;
        
                // 调整 Cylinder 的 scale 和 position，使顶部保持固定
                currentScale.y += heightChange/2.3;
                targetPosition.y -= heightChange / 2.3;  // 下移以保持顶部位置不变
        
                // 应用更新后的缩放和位置
                this.targetCylinder.setScale(currentScale);
                this.targetCylinder.setPosition(targetPosition);
            }
        }
        if (this.instantiatedNode && this.instantiatedNode.getPosition().y > 26 && this.stop_update) {
            const scene = director.getScene();
            if (scene) {
                    scene.children.forEach(rootNode => {
                        console.log(`Processing root node: ${rootNode.name}`);
                        rootNode.children.forEach(child => {
                            console.log(`Destroying child node: ${child.name}`);
                            if (child.name && child.isValid) {
                                // 停止所有调度的更新函数
                                //director.getScheduler().unscheduleAllForTarget(child);
                                // 销毁子节点
                                child.active = false;
                            }
                        });
                    });
                }
            // 销毁所有根节点的子节点后，创建新的根节点来容纳新的 Canvas
                const newRootNode = new Node('NewRoot');
                scene.addChild(newRootNode);

                // 创建一个新的 Canvas 并添加到新的根节点
                const canvasNode = new Node('Canvas');
                const canvas = canvasNode.addComponent(Canvas);
                newRootNode.addChild(canvasNode);

                // 设置 Canvas 尺寸适应屏幕
                const uiTransform = canvasNode.addComponent(UITransform);
                uiTransform.setContentSize(view.getVisibleSize());

                // 创建并配置一个新的摄像机来渲染 Canvas
                const cameraNode = new Node('UICamera');
                const camera = cameraNode.addComponent(Camera);
                camera.priority = 2;  // 确保UI的渲染优先级更高
                camera.clearFlags = Camera.ClearFlag.DEPTH_ONLY; // 只清理深度
                camera.projection = Camera.ProjectionType.ORTHO;  // 使用正交投影
                camera.visibility = Layers.Enum.UI_2D;  // 仅渲染UI层
                cameraNode.setParent(canvasNode);

                // 设置摄像机的区域和视口
                camera.orthoHeight = view.getVisibleSize().height / 2;
                cameraNode.setPosition(0, 0, 1000); // 将摄像机放置在前方

                // 实例化并渲染UI-2D预制体
                const uiInstance = instantiate(this.uiPrefab);
                uiInstance.setParent(canvasNode); // 将UI预制体设为Canvas的子节点
                uiInstance.setPosition(0, 0, 0); // 设置位置
                this.stop_update = false;
        
    }
    }
}