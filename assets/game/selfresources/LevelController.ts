import { _decorator, Component, Vec2 } from 'cc';
import { Global } from '../../catalogasset/Script/Global';
const { ccclass, property } = _decorator;

@ccclass('LevelController')
export class LevelController extends Component {
    @property({type: [Vec2]})
    public positions: Vec2[] = []; // 用于指定当前关卡的物体摆放位置
    private levels: Vec2[][] = [
        [new Vec2(0.5, -1)],  // 第一关的物体位置
        [new Vec2(-0.5, -1)], // 第二关的物体位置
        [new Vec2(1.5, 1)],  // 第三关的物体位置
        [new Vec2(-0.5, 1)], // 第四关的物体位置
        [new Vec2(-0.5, 0)]  // 第五关的物体位置
    ];

    onLoad() {
        const levelIndex = Global.currentLevelIndex; // 转换为数组索引
        this.positions = this.levels[levelIndex];
    }
}