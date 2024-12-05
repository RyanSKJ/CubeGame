import { _decorator, Component, Node, Prefab, instantiate, Vec3, Quat, Material, Color, MeshRenderer, v3, quat, Layers } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabRotatorUI')
export class PrefabRotatorUI extends Component {

    @property(Prefab)
    public rotatingPrefab: Prefab = null;  // 需要旋转的预制体

    @property
    public speed: number = 30;  // 旋转速度，度/秒

    private _instance: Node = null;

    start () {
        if (this.rotatingPrefab) {
            // 创建一个用于展示3D物体的节点
            const displayNode = new Node('DisplayNode');

            // 实例化预制体并添加到 displayNode 中
            this._instance = instantiate(this.rotatingPrefab);
            this._instance.setScale(0.75,0.75,0.75);
            displayNode.addChild(this._instance);
            this.node.addChild(displayNode);

            // 设置预制体的初始位置（中心点）
            this._instance.setPosition(new Vec3(0, 0, -21));

            // 获取 MeshRenderer 组件并设置材质颜色为白色
            const meshRenderer = this._instance.getComponent(MeshRenderer);
            if (meshRenderer) {
                const material: Material = meshRenderer.material;
                material.setProperty('albedo', new Color(255, 255, 0, 255)); 
            }

            // 设置初始旋转角度为45度（倾斜）
            const initialRotation = new Quat();
            Quat.fromEuler(initialRotation, 35, 0, 35);  // X轴和Z轴各倾斜45度
            this._instance.setRotation(initialRotation);

            console.log('旋转立方体初始化:', this._instance.getWorldPosition());
        }
    }

    update (deltaTime: number) {
        if (this._instance) {
            // 使用四元数进行旋转
            const rotation = new Quat();
            Quat.fromEuler(rotation, 0, this.speed * deltaTime, 0);
            this._instance.rotate(rotation);
        }
    }
}