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
    
                const cube = instantiate(this.cubePrefab!);
                cube.setScale(this.cubeSize);

                cube.setPosition(new Vec3(
                    startX + i * this.cubeSize.x,
                    this.groundStartPosition.y,
                    startZ + j * this.cubeSize.z
                ));
                //const collider = cube.addComponent(BoxCollider);
                //collider.size = this.cubeSize;  // 设置大小
                //collider.center = new Vec3(0, 0, 0);

                 // 添加 RigidBody 并设置为静态类型
                 //const rigidBody = cube.addComponent(RigidBody);
                 //rigidBody.type = ERigidBodyType.STATIC;
    
                this.node.addChild(cube);
    
                // 输出调试信息
                // console.log(`Created cube at position: ${cube.position.toString()} with collider size: ${collider.size.toString()}`);
            }
        }
    }
}