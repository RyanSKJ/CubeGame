import { _decorator, Component, Node, ERigidBodyType, RigidBody, Vec3, instantiate, Prefab, BoxCollider, PhysicsSystem, EPhysics2DDrawFlags} from 'cc';
import { Global } from '../../catalogasset/Script/Global';


const { ccclass, property } = _decorator;

@ccclass('GenerateGround')
export class GenerateGround extends Component {
    
    @property
    gridSize: number = 12;  // 地面由 12x12 个大Cube组成

    @property(Vec3)
    cubeSize: Vec3 = new Vec3(2, 0.7, 2);  // 每个大Cube的大小

    @property(Vec3)
    groundStartPosition: Vec3 = new Vec3(0, 0, 0);  // 地面的起始位置

    @property(Prefab)
    cubePrefab: Prefab | null = null;  // 引用内置的Cube预制体

    @property([Prefab])
prefabs: Prefab[] = [];  // 存放 8 个不同的随机放置的预制体

    // 定义不同关卡的挖空位置数组
// 定义不同关卡的挖空位置数组
// 定义不同关卡的挖空位置数组
private levels = [
    // 第一关挖空位置
    [
        { iOffset: 0, jOffset: 0 },  // 中心方块
        { iOffset: -1, jOffset: 0 }, // 中心X负方向相邻的一个方块
        { iOffset: 1, jOffset: 0 },  // 中心X正方向相邻的一个方块
        { iOffset: 1, jOffset: 1 },   // 中心右上方相邻的一个方块
        //{ iOffset: 2, jOffset: 1 }   // 中心右上方相邻的一个方块
    ],
    // 第二关挖空位置
    [
        { iOffset: -1, jOffset: 0 },  // 中心方块
        { iOffset: 0, jOffset: 0 },  // 中心X正方向相邻的一个方块
        { iOffset: 0, jOffset: 1 },   // 中心右上方相邻的一个方块
        //{ iOffset: 1, jOffset: 1 },
    ],
    // 第三关挖空位置
    [
        { iOffset: 0, jOffset: 0 },  // 第一个：中心上方一个方块
        { iOffset: 0, jOffset: -1 }, // 第二个：左上方方块
        { iOffset: -1, jOffset: -1 }, // 第三个：左上上方方块
        { iOffset: 0, jOffset: 1 },   // 第四个：右上方方块
        //{ iOffset: 0, jOffset: 2 },   // 第四个：右上方方块
        //{ iOffset: 1, jOffset: 2 },   // 第四个：右上方方块
    ],
    // 第四关挖空位置
    [
        { iOffset: 0, jOffset: 0 },   // 中心方块
        { iOffset: -1, jOffset: 0 },  // 上方方块
        { iOffset: 1, jOffset: 0 },   // 下方方块
        { iOffset: -1, jOffset: 1 },   // 右上方方块
        { iOffset: 2, jOffset: 0 },   // 下方方块
        { iOffset: 2, jOffset: -1 },   // 下方方块
    ],
    // 第五关挖空位置
    [
        { iOffset: 0, jOffset: 0 },   // 中心方块
        { iOffset: -1, jOffset: 0 },  // 上方方块
        { iOffset: 1, jOffset: 0 },   // 下方方块
        { iOffset: 1, jOffset: -1 },   // 左方方块
        { iOffset: -2, jOffset: 0 },   // 左方方块
        { iOffset: -2, jOffset: 1 }   // 左方方块
    ]
];
    // 新增的 onDestroy 方法
    onDestroy() {
        // 清除所有子节点
        this.node.removeAllChildren();

        // 如果对象池或动态资源存在，可以在这里进一步清理
        console.log("GenerateGround destroyed and all child nodes removed.");
    }
    start() {
        if (this.cubePrefab) {
            this.generateGround();
        } else {
            console.error("Cube prefab is not assigned!");
        }
    }

    generateGround() {
        // 每个 Prefab 的间隔：格子大小 + 空隙（实际大小）
        const prefabSpacing = (1 + 0.1) * 2; // (1是格子大小，0.1是间隙，2是scale)
    
        // 棋盘的起始位置，确保以中心为基准
        const startX = this.groundStartPosition.x - (this.gridSize / 2) * prefabSpacing;
        const startZ = this.groundStartPosition.z - (this.gridSize / 2) * prefabSpacing;
    
        const centerIndex = Math.floor(this.gridSize / 2); // 棋盘中心索引
    
        // 获取当前关卡的挖空配置
        const levelIndex = Global.currentLevelIndex; // 从 Global 中获取当前关卡索引
        const emptyPositions = this.levels[levelIndex - 5] || []; // 根据关卡索引获取挖空位置
    
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                // 检查是否需要挖空当前格子
                const isEmpty = emptyPositions.some(pos => 
                    i === centerIndex + pos.iOffset && j === centerIndex + pos.jOffset
                );
                if (isEmpty) {
                    continue; // 如果需要挖空则跳过
                }
    
                // 生成地面 Prefab
                const prefab = instantiate(this.cubePrefab!);
                prefab.setScale(new Vec3(2, 0.7, 2)); // 设置整体缩放为 2
                prefab.setPosition(new Vec3(
                    startX + i * prefabSpacing, // 每个 Prefab 的 X 坐标
                    this.groundStartPosition.y, // Y 坐标保持不变
                    startZ + j * prefabSpacing  // 每个 Prefab 的 Z 坐标
                ));
                this.node.addChild(prefab);
            }
        }
    }
}