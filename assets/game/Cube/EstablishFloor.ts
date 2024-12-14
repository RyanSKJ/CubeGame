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
        { iOffset: 1, jOffset: 1 }   // 中心右上方相邻的一个方块
    ],
    // 第二关挖空位置
    [
        { iOffset: -1, jOffset: 0 },  // 中心方块
        { iOffset: 0, jOffset: 0 },  // 中心X正方向相邻的一个方块
        { iOffset: 0, jOffset: 1 }   // 中心右上方相邻的一个方块
    ],
    // 第三关挖空位置
    [
        { iOffset: 0, jOffset: 0 },  // 第一个：中心上方一个方块
        { iOffset: 0, jOffset: -1 }, // 第二个：左上方方块
        { iOffset: -1, jOffset: -1 }, // 第三个：左上上方方块
        { iOffset: 0, jOffset: 1 }   // 第四个：右上方方块
    ],
    // 第四关挖空位置
    [
        { iOffset: 0, jOffset: 0 },   // 中心方块
        { iOffset: -1, jOffset: 0 },  // 上方方块
        { iOffset: 1, jOffset: 0 },   // 下方方块
        { iOffset: -1, jOffset: 1 }   // 右上方方块
    ],
    // 第五关挖空位置
    [
        { iOffset: 0, jOffset: 0 },   // 中心方块
        { iOffset: -1, jOffset: 0 },  // 上方方块
        { iOffset: 1, jOffset: 0 },   // 下方方块
        { iOffset: 1, jOffset: -1 }   // 左方方块
    ]
];

    start() {
        if (this.cubePrefab) {
            this.generateGround();
        } else {
            console.error("Cube prefab is not assigned!");
        }
    }

    generateGround() {
        const startX = Math.floor(this.groundStartPosition.x - (this.gridSize / 2) * this.cubeSize.x);
        const startZ = Math.floor(this.groundStartPosition.z - (this.gridSize / 2) * this.cubeSize.z); 
    
        const centerIndex = Math.floor(this.gridSize / 2); // 中心索引

        // 获取当前关卡的挖空配置
        const levelIndex = Global.currentLevelIndex; // 从Global中获取当前关卡索引
        const emptyPositions = this.levels[levelIndex - 5] || []; // 根据关卡索引获取对应的挖空位置，确保索引有效

    
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                // 检查是否需要挖空当前格子
                const isEmpty = emptyPositions.some(pos => i === centerIndex + pos.iOffset && j === centerIndex + pos.jOffset);
                if (isEmpty) {
                    continue;  // 如果需要挖空则跳过
                }
        
                // 生成地面立方体
                const cube = instantiate(this.cubePrefab!);
                cube.setScale(this.cubeSize);
                cube.setPosition(new Vec3(
                    startX + i * this.cubeSize.x,
                    this.groundStartPosition.y,
                    startZ + j * this.cubeSize.z
                ));
                this.node.addChild(cube);
                /*
                // 检查是否靠近挖空的位置（x 和 y 方向±2范围内）
                const isNearHole = emptyPositions.some(pos => 
                    Math.abs(i - (centerIndex + pos.iOffset)) <= 2 && Math.abs(j - (centerIndex + pos.jOffset)) <= 2
                );
                if (isNearHole) {
                    continue; // 如果x、y坐标在挖空位置的±2范围内，则不放预制体
                }
        
                // 以 40% 概率生成一个随机预制体
                if (Math.random() > 0.6) {
                    const randomPrefab = this.prefabs[Math.floor(Math.random() * this.prefabs.length)];
                    const randomObject = instantiate(randomPrefab);
                    randomObject.setPosition(new Vec3(
                        startX + i * this.cubeSize.x,
                        this.groundStartPosition.y + this.cubeSize.y,
                        startZ + j * this.cubeSize.z
                    ));
                    this.node.addChild(randomObject);
                }
                    */
            }
        }
    }
}