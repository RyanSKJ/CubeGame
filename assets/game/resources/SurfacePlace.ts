import { _decorator, Component, Node, Prefab, instantiate, Vec3, Quat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RubiksCubeSurfacePlacer')
export class RubiksCubeSurfacePlacer extends Component {
    @property(Prefab)
    surfacePrefab: Prefab = null; // 需要放置的预制体

    // 固定的坐标值
    private fixedCoordinate = 2.2;
    private variableCoordinates = [-1.1, 0, 1.1];

    start() {
        this.placePrefabsOnSurfaces();
    }

    placePrefabsOnSurfaces() {
        // 遍历六个面，并在每个面上放置预制体
        // 面1：y = 2.2，变化的是 x 和 z
        this.placePrefabsOnFace('y', this.fixedCoordinate);

        // 面2：y = -2.2，变化的是 x 和 z，旋转180度
        this.placePrefabsOnFace('y', -this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), Math.PI));

        // 面3：x = 2.2，变化的是 y 和 z，绕z轴旋转-90度
        this.placePrefabsOnFace('x', this.fixedCoordinate, Quat.rotateZ(new Quat(), new Quat(), -Math.PI / 2));

        // 面4：x = -2.2，变化的是 y 和 z，绕z轴旋转90度
        this.placePrefabsOnFace('x', -this.fixedCoordinate, Quat.rotateZ(new Quat(), new Quat(), Math.PI / 2));

        // 面5：z = 2.2，变化的是 x 和 y，绕x轴旋转90度
        this.placePrefabsOnFace('z', this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), Math.PI / 2));

        // 面6：z = -2.2，变化的是 x 和 y，绕x轴旋转-90度
        this.placePrefabsOnFace('z', -this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), -Math.PI / 2));
    }

    placePrefabsOnFace(fixedAxis: 'x' | 'y' | 'z', fixedValue: number, rotation: Quat = new Quat()) {
        for (let v1 of this.variableCoordinates) {
            for (let v2 of this.variableCoordinates) {
                let position = new Vec3();

                switch (fixedAxis) {
                    case 'x':
                        position.set(fixedValue, v1, v2);
                        break;
                    case 'y':
                        position.set(v1, fixedValue, v2);
                        break;
                    case 'z':
                        position.set(v1, v2, fixedValue);
                        break;
                }

                this.instantiatePrefab(position, rotation);
            }
        }
    }

    instantiatePrefab(position: Vec3, rotation: Quat) {
        const prefabInstance = instantiate(this.surfacePrefab);
        prefabInstance.setParent(this.node);
        prefabInstance.setPosition(position);
        prefabInstance.setRotation(rotation);
    }
}