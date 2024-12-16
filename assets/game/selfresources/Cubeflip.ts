import { _decorator, Component, Node, systemEvent, ITriggerEvent, RigidBody, Quat, misc, SystemEvent, EventKeyboard, KeyCode, Vec3, tween, Label, MeshRenderer, Material, Color, Input, input, EventTouch } from 'cc';
import { Global } from '../../catalogasset/Script/Global';
const { ccclass, property } = _decorator;

@ccclass('RotateAndMoveCubeOnKey')
export class RotateAndMoveCubeOnKey extends Component {

    @property(Label)
    public operationCountLabel: Label = null;
    @property(Label)
    public operationTimeLabel: Label = null;

    private isAnimating = false;  // 用于防止动画重叠
    private initialEulerAngles: Vec3; // 存储初始欧拉角的变量
    public operationCount: number = 0;  // To track the number of operations
    public operationTime: number = 0;   // To track the total time of operations
    public isTiming: boolean = true;   // 用于判断是否开始计时
    private touchStartPos: Vec3 = new Vec3(); // 触摸起始位置

    private startRotation: Quat = new Quat(); // 初始四元数
    private endRotation: Quat = new Quat(); // 目标四元数
    private startPosition: Vec3 = new Vec3(); // 初始位置
    private endPosition: Vec3 = new Vec3(); // 目标位置
    private currentLerpTime: number = 0;
    private totalLerpTime: number = 0.5; // 总的插值时间，这里设置为0.5秒

    private minSwipeDistance: number = 50; // 最小滑动距离阈值

    start() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.placeCubeAboveTile(3, 2);  // 假设您想要将立方体放在第一行第一列的格子正上方

        this.initialEulerAngles = this.node.eulerAngles.clone();

        this.isTiming = true;  // 开始计时
        this.operationTime = 0;  // 初始化操作时间

        // 获取 Cube 的 MeshRenderer 组件
        const meshRenderer = this.node.getComponent(MeshRenderer);
        if (meshRenderer) {
            // 获取材质并设置颜色为黄色
            const material = meshRenderer.material;
            material.setProperty('albedo', new Color(255, 255, 0, 255)); // 黄色
        } else {
            console.warn("Cube does not have a MeshRenderer component.");
        }

        // 监听触摸事件
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    async logPlayerAction(operation: string) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
    
        if (!username || !sessionToken) {
            console.error('No username or sessionToken found.');
            return;
        }
    
        // 辅助函数，确保padStart兼容性
        function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
            const str = String(value);
            if (str.length >= targetLength) {
                return str;
            }
            return padChar.repeat(targetLength - str.length) + str;
        }
    
        // 获取当前时间的北京时间，精确到毫秒
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset);
        const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(beijingTime.getDate(), 2)} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(beijingTime.getSeconds(), 2)}.${padStart(beijingTime.getMilliseconds(), 3)}`;
    
        // 获取当前关卡（假设从 Global.currentindex 中获取）
        const level = Global.currentLevelIndex;
    
        // 准备发送的数据
        const data = {
            tableName: 'game1', // 表名
            data: {
                Usr_ID: username,
                Timestep: formattedTime, // 使用精确到毫秒的北京时间
                Level: level,
                Operation: operation,
            },
        };
    
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
                throw new Error('Failed to log player action');
            }
    
            const result = await response.json();
            console.log('Player action logged successfully:', result);
        } catch (error) {
            console.error('Error logging player action:', error);
        }
    }

    onTouchStart(event: EventTouch) {
        // 获取触摸起点
        const touch = event.getTouches()[0];
        this.touchStartPos.set(touch.getLocationX(), touch.getLocationY(), 0);
    }

    onTouchEnd(event: EventTouch) {
        // 获取触摸终点
        const touch = event.getTouches()[0];
        const touchEndPos = new Vec3(touch.getLocationX(), touch.getLocationY(), 0);

        // 计算滑动的方向和距离
        const deltaX = touchEndPos.x - this.touchStartPos.x;
        const deltaY = touchEndPos.y - this.touchStartPos.y;

        const swipeDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (swipeDistance < this.minSwipeDistance) {
            console.log("滑动距离不足，忽略事件");
            return; // 如果距离不足，直接返回
        }

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 左右滑动
            if (deltaX > 0) {
                this.onKeyDown({ keyCode: KeyCode.KEY_D } as EventKeyboard);
            } else {
                this.onKeyDown({ keyCode: KeyCode.KEY_A } as EventKeyboard);
            }
        } else {
            // 上下滑动
            if (deltaY > 0) {
                this.onKeyDown({ keyCode: KeyCode.KEY_W } as EventKeyboard);
            } else {
                this.onKeyDown({ keyCode: KeyCode.KEY_S } as EventKeyboard);
            }
        }
    }

    onKeyDown(event: EventKeyboard) {
        if (!this.isAnimating) {
            //this.operationCount++;
            this.operationTime = 0;  // Reset the operation time for each new operation
        }

        // 定义棋盘范围
        const boardWidth = 4; // 棋盘宽度（列数）
        const boardHeight = 5; // 棋盘高度（行数）
        const tileSize = 1; // 格子大小
        const minX = -(boardWidth * tileSize) / 2;
        const maxX = (boardWidth * tileSize) / 2;
        const minZ = -(boardHeight * tileSize) / 2;
        const maxZ = (boardHeight * tileSize) / 2;

        // 计算目标位置
        const currentPosition = this.node.position.clone();
        let targetPosition: Vec3;

        switch (event.keyCode) {
            case KeyCode.KEY_A:
                targetPosition = currentPosition.clone().add(new Vec3(-tileSize, 0, 0));
                break;
            case KeyCode.KEY_D:
                targetPosition = currentPosition.clone().add(new Vec3(tileSize, 0, 0));
                break;
            case KeyCode.KEY_W:
                targetPosition = currentPosition.clone().add(new Vec3(0, 0, -tileSize));
                break;
            case KeyCode.KEY_S:
                targetPosition = currentPosition.clone().add(new Vec3(0, 0, tileSize));
                break;
            default:
                return; // 如果按键无效，直接返回
        }
        if (targetPosition.x == -1.5 && targetPosition.z == -2) {
            return;
        }

        // 检查目标位置是否在棋盘范围内
        if (targetPosition.x < minX || targetPosition.x > maxX || targetPosition.z < minZ || targetPosition.z > maxZ) {

            console.log("目标位置超出棋盘范围，操作被取消！");
            return;
        }

        // 执行翻滚动作
        if (!this.isAnimating) {
            let operation = '';
            switch (event.keyCode) {
                case KeyCode.KEY_A:
                    operation = 'A';
                    this.rotateByAxis(new Vec3(-1, 0, 0), new Vec3(0, 0, 1), 90);
                    break;
                case KeyCode.KEY_D:
                    operation = 'D';
                    this.rotateByAxis(new Vec3(1, 0, 0), new Vec3(0, 0, 1), -90);
                    break;
                case KeyCode.KEY_W:
                    operation = 'W';
                    this.rotateByAxis(new Vec3(0, 0, -1), new Vec3(1, 0, 0), -90);
                    break;
                case KeyCode.KEY_S:
                    operation = 'S';
                    this.rotateByAxis(new Vec3(0, 0, 1), new Vec3(1, 0, 0), 90);
                    break;
            }
            this.logPlayerAction(operation);
        }
    }

    rotateByAxis(startPos: Vec3, axis: Vec3, angle: number) {
        this.startPosition = this.node.position.clone(); // 保存初始位置
        Vec3.add(this.endPosition, this.startPosition, startPos); // 结束位置是相对移动

        this.startRotation = this.node.rotation.clone(); // 保存初始旋转
        let rad = misc.degreesToRadians(angle);
        this.endRotation = Quat.rotateAround(new Quat(), this.startRotation, axis, rad); // 计算并保存目标旋转四元数
        Quat.normalize(this.endRotation, this.endRotation);

        this.currentLerpTime = 0;
        this.isAnimating = true;
    }

    update(deltaTime: number) {
        if (this.isAnimating) {
            this.currentLerpTime += deltaTime;
            if (this.currentLerpTime > this.totalLerpTime) {
                this.currentLerpTime = this.totalLerpTime;
            }

            let lerpRatio = this.currentLerpTime / this.totalLerpTime;

            let currentRotation = Quat.slerp(new Quat(), this.startRotation, this.endRotation, lerpRatio);
            this.node.setRotation(currentRotation);

            let currentPosition = Vec3.lerp(new Vec3(), this.startPosition, this.endPosition, lerpRatio);
            this.node.setPosition(currentPosition);

            if (lerpRatio >= 1) {
                this.isAnimating = false;
            }
        }
        if (this.isTiming) {
            this.operationTime += deltaTime;
            //this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
            //this.operationCountLabel.string = `翻滚次数: ${this.operationCount}`;
        }
    }

    placeCubeAboveTile(row: number, col: number) {
        // 确保与 ChessboardGenerator 中的格子位置计算方式一致
        const cols = 4; // 假设棋盘的列数
        const rows = 5; // 假设棋盘的行数
        const tileSize = 1; // 假设棋盘格子的大小为 1

        const posX = col * tileSize - (cols * tileSize) / 2 + tileSize / 2;
        const posY = tileSize / 2;  // 立方体位于格子的正上方
        const posZ = row * tileSize - (rows * tileSize) / 2 + tileSize / 2;

        this.node.setPosition(new Vec3(posX, 0, posZ));
    }

    onDestroy() {
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}