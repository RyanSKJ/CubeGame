import { _decorator, Component, Node, Vec3, Material, Color, primitives, MeshRenderer, utils, BoxCollider, PhysicsSystem, RigidBody, ERigidBodyType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlaneWithHole')
export class PlaneWithHole extends Component {
    start() {
        this.createPlaneWithHole();
        PhysicsSystem.instance.enable = true; // 启用物理系统
    }

    createPlaneWithHole() {
        const layers = 3; // 平面的层数
        const rows = 7; // 每层的行数
        const cols = 7; // 每层的列数
        const holePositions = [
            new Vec3(0, -3, 1),
            new Vec3(0, -2, 1),
            new Vec3(0, -1, 1),
            new Vec3(1, -3, 1),
            new Vec3(1, -2, 1),
            new Vec3(1, -1, 1),
        ]; // L字形空的坐标

        const material = new Material();
        material.initialize({ effectName: 'builtin-standard' });
        material.setProperty('mainColor', new Color(100, 100, 100, 255));

        for (let y = -3; y < 0; y++) {
            for (let i = -5; i < rows; i++) {
                for (let j = -5; j < cols; j++) {
                    const pos = new Vec3(j, y, i);
                    if (!holePositions.some(holePos => holePos.equals(pos))) {
                        const cubeNode = new Node(`Cube_${y}_${i}_${j}`);
                        cubeNode.setPosition(pos);

                        const meshRenderer = cubeNode.addComponent(MeshRenderer);
                        const box = primitives.box();
                        const mesh = utils.createMesh(box);
                        meshRenderer.mesh = mesh;
                        meshRenderer.material = material;

                        const boxCollider = cubeNode.addComponent(BoxCollider);
                        boxCollider.isTrigger = false; // 确保不是触发器

                        const rigidBody = cubeNode.addComponent(RigidBody);
                        rigidBody.type = ERigidBodyType.STATIC; // 设置刚体类型为静态

                        this.node.addChild(cubeNode);
                    }
                }
            }
        }
    }
}
