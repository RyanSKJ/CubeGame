import { _decorator, Component, Node, systemEvent, Collider, ITriggerEvent, RigidBody, BoxCollider, Quat, misc, SystemEvent, EventKeyboard, KeyCode, Vec3, MeshRenderer, Material, Color, primitives, utils } from 'cc';
const { ccclass } = _decorator;

@ccclass('RotateAndMoveLShapeOnKey')
export class RotateAndMoveLShapeOnKey extends Component {
    private isAnimating = false;  // 用于防止动画重叠
    private initialEulerAngles: Vec3; // 存储初始欧拉角的变量
    private _lShapeNodes: Node[] = []; // L字形的组成块
    private combinedBoxCollider: BoxCollider | null = null;

    start() {
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        let collider = this.getComponent(Collider);
        if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            collider.on('onTriggerExit', this.onTriggerExit, this);
        }
        this.createLShape();  // 创建L形
        this.placeCubeAboveTile(0, 0);  // 假设您想要将立方体放在第一行第一列的格子正上方
        this.initialEulerAngles = this.node.eulerAngles.clone();
    }

    createLShape() {
        // 添加一个刚体到整体节点
        const rigidBody = this.node.addComponent(RigidBody);
        rigidBody.type = RigidBody.Type.DYNAMIC;
        rigidBody.mass = 1;
        rigidBody.linearDamping = 0.1;
        rigidBody.angularDamping = 0.1;
        rigidBody.useGravity = true;
        rigidBody.allowSleep = false; // 防止刚体睡眠
        rigidBody.linearFactor = new Vec3(0, 1, 0); // 只允许在y方向上受力
        rigidBody.angularFactor = new Vec3(0, 0, 0); // 禁止角度上的任何变化
        const positions = [
            new Vec3(0, 0, 0),
            new Vec3(1, 0, 0),
            new Vec3(2, 0, 0),
            new Vec3(0, 1, 0),
        ];
    
        const material = new Material();
        material.initialize({ effectName: 'builtin-standard' });
        material.setProperty('mainColor', new Color(255, 255, 255, 255));
    
        positions.forEach((pos, index) => {
            const cubeNode = new Node(`Cube${index + 1}`);
            cubeNode.setPosition(pos);
    
            const meshRenderer = cubeNode.addComponent(MeshRenderer);
            const box = primitives.box(); // 创建一个box的几何体
            const mesh = utils.createMesh(box); // 创建网格
            meshRenderer.mesh = mesh;
            meshRenderer.material = material;
    
            this.node.addChild(cubeNode);
            this._lShapeNodes.push(cubeNode);
    
            // 调试信息
            console.log(`Created ${cubeNode.name} at position ${pos.toString()}`);
        });

        // 创建一个覆盖整个L形状的BoxCollider
        this.combinedBoxCollider = this.node.addComponent(BoxCollider);
        this.updateCombinedBoxCollider();
        this.combinedBoxCollider.enabled = true;  // 确保BoxCollider在初始化时是启用的
    }

    updateCombinedBoxCollider() {
        if (!this.combinedBoxCollider) return;

        // 计算L形状边界
        let minX = Infinity, minY = Infinity, minZ = Infinity;
        let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

        this._lShapeNodes.forEach(node => {
            const pos = node.position;
            if (pos.x < minX) minX = pos.x;
            if (pos.y < minY) minY = pos.y;
            if (pos.z < minZ) minZ = pos.z;
            if (pos.x > maxX) maxX = pos.x;
            if (pos.y > maxY) maxY = pos.y;
            if (pos.z > maxZ) maxZ = pos.z;
        });

        const sizeX = maxX - minX + 1;
        const sizeY = maxY - minY + 1;
        const sizeZ = maxZ - minZ + 1;

        this.combinedBoxCollider.size = new Vec3(sizeX, 1, sizeZ);
        this.combinedBoxCollider.center = new Vec3((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
        console.log(`Updated BoxCollider size to: ${this.combinedBoxCollider.size.toString()}, center to: ${this.combinedBoxCollider.center.toString()}`);
    }
    
    onKeyDown(event: EventKeyboard) {
        if (!this.isAnimating) {
            switch (event.keyCode) {
                case KeyCode.KEY_A:
                    this.rotateLShape(new Vec3(0, 0, 1), new Vec3(-1, 0, 0));
                    break;
                case KeyCode.KEY_D:
                    this.rotateLShape(new Vec3(0, 0, -1), new Vec3(1, 0, 0));
                    break;
                case KeyCode.KEY_W:
                    this.rotateLShape(new Vec3(-1, 0, 0), new Vec3(0, 0, -1));
                    break;
                case KeyCode.KEY_S:
                    this.rotateLShape(new Vec3(1, 0, 0), new Vec3(0, 0, 1));
                    break;
            }
        }
    }

    startRotation: Quat = new Quat(); // 初始四元数
    endRotation: Quat = new Quat(); // 目标四元数
    startPosition: Vec3 = new Vec3(); // 初始位置
    endPosition: Vec3 = new Vec3(); // 目标位置
    currentLerpTime: number = 0;
    totalLerpTime: number = 0.5; // 总的插值时间，这里设置为0.5秒

    rotateLShape(axis: Vec3, direction: Vec3) {
        // 获取刚体组件并禁用动力学
        const rigidBody = this.node.getComponent(RigidBody);
        if (rigidBody) {
            rigidBody.type = RigidBody.Type.STATIC;
        }

        // 禁用 BoxCollider
        if (this.combinedBoxCollider) {
            this.combinedBoxCollider.enabled = false;
        }

        // 保存当前节点的初始位置和旋转
        this.startPosition.set(this.node.position);
        this.startRotation.set(this.node.rotation);

        // 计算结束位置和旋转
        Vec3.add(this.endPosition, this.startPosition, direction); // 结束位置是相对移动
        let rad = misc.degreesToRadians(90);
        Quat.rotateAround(this.endRotation, this.startRotation, axis, rad); // 计算并保存目标旋转四元数
        Quat.normalize(this.endRotation, this.endRotation);

        if (this.checkIfValidRotation(this.endPosition, this.endRotation)) {
            // 重置插值时间，并开始动画
            this.currentLerpTime = 0;
            this.isAnimating = true;
        } else {
            console.log('Invalid rotation detected');
            // 重新启用刚体动力学
            if (rigidBody) {
                rigidBody.type = RigidBody.Type.DYNAMIC;
            }
            // 重新启用 BoxCollider
            if (this.combinedBoxCollider) {
                this.combinedBoxCollider.enabled = true;
            }
        }
    }

    update(deltaTime: number) {
        if (this.isAnimating) {
            // 增加当前插值时间
            this.currentLerpTime += deltaTime;
            if (this.currentLerpTime > this.totalLerpTime) {
                this.currentLerpTime = this.totalLerpTime;
            }

            // 计算当前插值比例
            let lerpRatio = this.currentLerpTime / this.totalLerpTime;

            // 使用slerp进行四元数插值
            let currentRotation = Quat.slerp(new Quat(), this.startRotation, this.endRotation, lerpRatio);
            this.node.setRotation(currentRotation);

            // 使用lerp进行位置插值
            let currentPosition = Vec3.lerp(new Vec3(), this.startPosition, this.endPosition, lerpRatio);
            this.node.setPosition(currentPosition);

            // 如果插值完成，停止动画并启用刚体动力学
            if (lerpRatio >= 1) {
                const rigidBody = this.node.getComponent(RigidBody);
                if (rigidBody) {
                    rigidBody.type = RigidBody.Type.DYNAMIC;
                }
                // 重新启用 BoxCollider
                if (this.combinedBoxCollider) {
                    this.combinedBoxCollider.enabled = true;
                }
                this.isAnimating = false;
            }
        }
    }

    onTriggerEnter(event: ITriggerEvent) {
        // 当物体进入触发器时调用
        console.log(`${event.otherCollider.node.name} entered the trigger`);
    }

    onTriggerExit(event: ITriggerEvent) {
        // 当物体离开触发器时调用
        console.log(`${event.otherCollider.node.name} exited the trigger`);
    }

    placeCubeAboveTile(row: number, col: number) {
        // 放置L形状
        this.node.setPosition(new Vec3(row, 10, col)); // 将L形状放在支撑物上
    }

    onDestroy() {
        let collider = this.getComponent(Collider);
        if (collider) {
            collider.off('onTriggerEnter', this.onTriggerEnter, this);
            collider.off('onTriggerExit', this.onTriggerExit, this);
        }
        systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    checkIfValidRotation(newPosition: Vec3, newRotation: Quat): boolean {
        const tolerance = 0.0001; // 定义一个小的容差值
        for (let node of this._lShapeNodes) {
            let localPosition = node.position.clone();
            let rotatedPosition = new Vec3();
            Vec3.transformQuat(rotatedPosition, localPosition, newRotation);
            rotatedPosition.add(newPosition);

            console.log(`Node ${node.name} rotated position: ${rotatedPosition.toString()}`);

            // 使用绝对值和容差值进行校验
            if (rotatedPosition.y < -tolerance) { 
                console.log(`Invalid position detected for node ${node.name}: ${rotatedPosition.toString()}`);
                return false;
            }
        }
        return true;
    }
}
