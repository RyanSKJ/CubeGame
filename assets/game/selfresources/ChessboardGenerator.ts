import { _decorator, Component, instantiate, tween, Node, Button, Prefab, Vec3, Vec2, Collider, ITriggerEvent, UITransform, Camera, director, Canvas, view, Layers } from 'cc';
import { LevelController } from './LevelController'; // 导入LevelController脚本
import { RotateAndMoveCubeOnKey } from './Cubeflip'; // 导入LevelController脚本
import { Global } from '../../catalogasset/Script/Global';
import { RequestManager } from '../../catalogasset/Scene/RequestManager';
const { ccclass, property } = _decorator;

@ccclass('ChessboardGenerator')
export class ChessboardGenerator extends Component {
    @property(Prefab)
    public tilePrefab: Prefab = null;

    @property(Prefab)
    public prefab2: Prefab = null;

    @property(Prefab)
    public animationPrefab: Prefab = null;

    @property(Prefab)
    public uiPrefab: Prefab = null; // 需要渲染的UI-2D预制体
    @property(Prefab)
    public houseprefab: Prefab = null; // 需要渲染的UI-2D预制体

    @property
    public tileSize: number = 1;
    @property(RotateAndMoveCubeOnKey)
    public rotateAndMoveCubeOnKey: RotateAndMoveCubeOnKey = null;

    private tiles: Node[][] = [];
    private totalPrefabs2 = 0;
    private triggeredPrefabs2 = 0;

    private currentLevel = 0;
    private blockedTiles: Set<string> = new Set();

    @property(Node)
    public targetNode: Node = null; // 目标节点，在编辑器中选择

    start() {
        const levelController = this.getComponent(LevelController);
        if (!levelController) {
            //console.error("LevelController component not found!");
            return;
        }
        const levelPositions = [
            [new Vec2(0, 0), new Vec2(1, 2), new Vec2(3, 3)], // 第一关的 prefab2 放置位置
            [new Vec2(2, 1), new Vec2(0, 3), new Vec2(1, 1)], // 第二关的 prefab2 放置位置
            [new Vec2(1, 0), new Vec2(2, 2), new Vec2(3, 1)], // 第三关的 prefab2 放置位置
            // 继续为其他关卡设置位置
        ];

        const rows = 5;
        const cols = 4;
        //console.log("yes" + levelController.positions)
        this.generateChessboard(rows, cols, levelController.positions);

    }

    generateChessboard(rows: number, cols: number, positions: Vec2[]) {
        for (let i = 0; i < rows; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < cols; j++) {
                const tile = instantiate(this.tilePrefab);
                tile.setParent(this.node);
                const x = j * this.tileSize - (cols * this.tileSize) / 2 + this.tileSize / 2;
                const z = i * this.tileSize - (rows * this.tileSize) / 2 + this.tileSize / 2;
                if (i === 0 && j === 0) {
                    const obstaclePrefab = instantiate(this.houseprefab); // 替换为你的目标 prefab
                    obstaclePrefab.setParent(tile);
                    obstaclePrefab.setPosition(new Vec3(0, this.tileSize, 0));
                    this.blockedTiles.add(`${i},${j}`);
                    tile.setPosition(new Vec3(x, -1, z));
                }
                else {
                    tile.setPosition(new Vec3(x, 0, z));
                }
                this.tiles[i][j] = tile;

                const positionMatch = positions.some(pos => pos.x === x && pos.y === z);
                if (positionMatch) {
                    //console.log('yes')
                    this.placePrefab2AtPosition(new Vec2(j, i));
                }

            }
        }
    }

    placePrefab2AtPosition(gridPosition: Vec2) {
        const row = gridPosition.y;
        const col = gridPosition.x;

        if (row >= this.tiles.length || col >= this.tiles[0].length || row < 0 || col < 0) {
            //console.error("Position out of bounds");
            return;
        }

        const tile = this.tiles[row][col];
        const prefab2Instance = instantiate(this.prefab2);
        prefab2Instance.setParent(tile);
        prefab2Instance.setPosition(new Vec3(0, this.tileSize, 0));

        const collider = prefab2Instance.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onPrefab2CollisionEnter, this);
        }

        this.totalPrefabs2++;
        //console.log(prefab2Instance.position);
    }

    async logUserAction() {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不为 undefined
    
        if (!username || !sessionToken) {
            console.warn('❌ 错误：用户名或 Session token 未找到。');
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
                Usr_ID: username, // 用户名
                Level: level, // 当前关卡
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
    
        console.log('✅ 用户操作记录请求已加入队列:', data);
    }

    async updateMaxLevel(newMaxLevel) {
        const apiUrl = 'http://124.71.181.62:3000/api/updateMaxLevel'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从 localStorage 中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从 localStorage 中获取 token
    
        if (!username || !sessionToken) {
            console.warn('❌ 错误：用户名或 Session token 未找到。');
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

    onPrefab2CollisionEnter(event: ITriggerEvent) {
        //console.log(`${event.otherCollider.node.name} collided with prefab2`);

        const prefab2Node = event.selfCollider.node;
        const animationInstance = instantiate(this.animationPrefab);
        animationInstance.setParent(this.node);
        animationInstance.setPosition(prefab2Node.worldPosition);

        prefab2Node.active = false;
        this.triggeredPrefabs2++;

        if (this.triggeredPrefabs2 >= this.totalPrefabs2) {
            this.logUserAction();

            if (parseInt(localStorage.getItem('maxLevel'), 10) < Global.currentLevelIndex + 1) {
                localStorage.setItem('maxLevel', (Global.currentLevelIndex + 1).toString())
            }
            this.updateMaxLevel(Global.currentLevelIndex + 1);

            // 找到 i === 0 && j === 0 的 tile
            const targetTile = this.tiles[0][0];
            if (targetTile) {
                const targetPosition = targetTile.position.clone(); // 当前 tile 位置
                targetPosition.y = 0; // 修改目标位置的 Y 坐标为 0

                // 先执行 tile 动画
                tween(targetTile)
                    .to(1.0, { position: targetPosition }, { easing: 'quadInOut' }) // 动画持续时间 1 秒
                    .call(() => {
                        //console.log("Tile animation completed, now activating the target node");

                        // 确保目标 Node 激活，并设置为顶层
                        if (this.targetNode) {
                            this.targetNode.active = true;
                            this.targetNode.setSiblingIndex(this.targetNode.parent.children.length - 1); // 设置为顶层
                            //console.log(`Node "${this.targetNode.name}" has been activated and moved to the top layer.`);

                            // 等待用户点击“我知道了”按钮
                            this._setupIKnowButtonListener();
                        } else {
                            //console.error("Target node is not set!");
                        }
                    })
                    .start();
            } else {
                //console.error("Target tile not found!");
            }
        }
    }

    /**
     * 设置“我知道了”按钮的点击监听
     */
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

    /**
     * 渲染最终的 Prefab
     */
    private _renderFinalPrefab() {
        //console.log("Rendering final Prefab...");
        // 执行渲染 Prefab 的逻辑
        this.finishLevel();
    }

    finishLevel() {


        const canvasNode = director.getScene().getChildByName('Canvas');
        if (canvasNode) {
            const uiInstance = instantiate(this.uiPrefab);
            uiInstance.setParent(canvasNode);
            uiInstance.setScale(2, 2, 2);
            uiInstance.setPosition(0, 0, 0);
            uiInstance.setSiblingIndex(canvasNode.children.length - 1);
        } else {
            //console.error("Canvas not found in the current scene!");
        }

        const mainCameraNode = director.getScene().getChildByName('Main Camera');
        if (mainCameraNode) {
            mainCameraNode.active = false;
        } else {
            //console.error("Main Camera not found in the current scene!");
        }
    }



    onAllPrefabs2Triggered() {
        //console.log("All prefab2 instances have been triggered! Game Over!");


        const scene = director.getScene();
        if (scene) {
            scene.children.forEach(rootNode => {
                //console.log(`Processing root node: ${rootNode.name}`);
                rootNode.children.forEach(child => {
                    //console.log(`Destroying child node: ${child.name}`);
                    if (child.name && child.isValid) {
                        // 停止所有调度的更新函数
                        //director.getScheduler().unscheduleAllForTarget(child);
                        // 销毁子节点
                        child.active = false;
                    }
                });
            });




            // 销毁所有根节点的子节点后，创建新的根节点来容纳新的 Canvas
            const newRootNode = new Node('NewRoot');
            scene.addChild(newRootNode);

            // 创建一个新的 Canvas 并添加到新的根节点
            //const canvasNode = new Node('Canvas');
            //const canvas = canvasNode.addComponent(Canvas);
            //newRootNode.addChild(canvasNode);

            // 设置 Canvas 尺寸适应屏幕
            /*
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
            */
            // 获取当前场景中的 Canvas 节点

        }
    }

}