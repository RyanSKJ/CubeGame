import { _decorator, Component, Prefab, EventTarget, instantiate, Vec3, RigidBodyComponent, Label, Node, input, Input, EventTouch, Quat, geometry, PhysicsSystem, Camera, tween, Tween, Color, MeshRenderer,Material } from 'cc';
import { FlipCubeOnSurface } from './FlipCubeOnSurface';
import {Global} from '../../catalogasset/Script/Global'
import { EventSysteml } from './ballmove';
const { ccclass, property } = _decorator;

export const EventSystem = new EventTarget();

@ccclass('RubiksCube')
export class RubiksCube extends Component {
    @property(Prefab)
    cubePrefab: Prefab = null;

    @property(Camera)
    camera: Camera = null;

    @property([Prefab])
    surfacePrefabs: Prefab[] = [];

    @property(Label)
    public operationTimeLabel: Label = null;
    @property(Label)
    public rotationCountLabel: Label = null;


    public newl = '';    

    // 固定的坐标值
    private fixedCoordinate = 2.2;
    private variableCoordinates = [-1.1, 0, 1.1];

    private selectedLayer: Node[] = [];
    private currentAxis: 'x' | 'y' | 'z' = 'x';
    private currentLayerIndex: number = 0;
    private isLayerSelected: boolean = false;
    private rotationDirection: Vec3 = new Vec3();
    private rotating: boolean = false;
    private rotationRoot: Node = null;
    private startMousePosition: Vec3 = new Vec3();
    private endMousePosition: Vec3 = new Vec3();
    private selectedCube: Node = null;
    private originalColor: Color = new Color(); // 存储原始颜色
    private clickedPlane: 'XOY' | 'XOZ' | 'YOZ' | null = null; // 存储点击的平面
    private extraCubes: Node[] = [];

    private rotatingCamera: boolean = false;
    private lastMousePosition: Vec3 = new Vec3();
    private rotationSpeed: number = 0.2;

    private operationCount: number = 0;  // To track the number of operations
    private operationTime: number = 0;   // To track the total time of operations
    private rotationCount: number = 0;  // To track the number of operations
    public boxinwhere:string = 'Cube_1_2_1';

    private forbiddenPositions: Vec3[] = [];
    private trueLumber: string = '';
    
    onLoad() {
        // 监听移动事件
        EventSysteml.on('changeBox', this.boxchange, this);
    }
    onDestroy() {
        // 移除事件监听
        EventSysteml.off('changeBox', this.boxchange, this);
    }
    boxchange(MoveFlag:boolean){
        console.log(MoveFlag);
        if (MoveFlag){
            this.boxinwhere = this.newl;
            console.log(this.boxinwhere,this.newl)
        }
        this.rotating = false;
    }

    start() {
        this.createRubiksCube();
        this.placePrefabsOnSurfaces();
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    

    placePrefabsOnSurfaces() {
        const LevelConfigs = [
            {
                forbiddenPositions: [
                    new Vec3(0, 2.2, 0),
                    new Vec3(0, 2.2, 1.1),
                    new Vec3(-2.2, 0, 0)
                ],
                lumbermillPosition: new Vec3(-1.75, 0, 0),
                lumberPosition: 'Cube_0_1_1' // 直接赋值字符串
            },
            {
                forbiddenPositions: [
                    new Vec3(-1.1, 2.2, 0),
                    new Vec3(1.1, 0, 2.2),
                    new Vec3(-2.2, 1.1, 1.1),
                    new Vec3(0, 2.2, 0)
                ],
                lumbermillPosition: new Vec3(-1.75, 1.1, 1.1),
                lumberPosition: 'Cube_0_2_2' // 另一个关卡的值
            },
            {
                forbiddenPositions: [
                    new Vec3(0, 2.2, 0),
                    new Vec3(0, 1.1, 2.2),
                    new Vec3(-2.2, 0, 0),
                    //new Vec3(1.1, 2.2, 0)
                ],
                lumbermillPosition: new Vec3(-1.75, 0, 0),
                lumberPosition: 'Cube_0_1_1' // 另一个关卡的值
            },
            {
                forbiddenPositions: [
                    new Vec3(0, 2.2, 0),
                    new Vec3(0, 1.1, 2.2),
                    new Vec3(-2.2, 1.1, 1.1),
                ],
                lumbermillPosition: new Vec3(-1.75, 1.1, 1.1),
                lumberPosition: 'Cube_0_2_2' // 另一个关卡的值
            },
            {
                forbiddenPositions: [
                    new Vec3(-1.1, 2.2, 1.1),
                    new Vec3(0, -1.1, 2.2),
                    new Vec3(-2.2, 1.1, 1.1),
                    new Vec3(0, 0, 2.2),
                    new Vec3(-2.2, 0, 1.1),
                ],
                lumbermillPosition: new Vec3(-1.75, 1.1, 1.1),
                lumberPosition: 'Cube_0_2_2' // 另一个关卡的值
            },
            
        ];

        // 根据 Global.currentIndex 获取当前关卡配置
        const currentConfig = LevelConfigs[Global.currentLevelIndex-10];
        // 更新禁止放置 prefab 的位置
        this.forbiddenPositions = currentConfig.forbiddenPositions;
        console.log(Global.currentLevelIndex)
        console.log(currentConfig)
        this.trueLumber = currentConfig.lumberPosition

        if (Global.currentLevelIndex == 14){
            const box = this.node.getChildByName('box');
            box.setPosition(new Vec3(new Vec3(-1.1, 2.2, 1.1)));
            this.boxinwhere = "Cube_0_2_2"
        }

        // 更新 lumbermill 的位置
        const lumbermillNode = this.node.getChildByName('lumbermill');

        if (lumbermillNode) {
            const rigidBody = lumbermillNode.getComponent(RigidBodyComponent);
            if (rigidBody) {
                rigidBody.type = RigidBodyComponent.Type.STATIC; // 将刚体类型设置为静态
                rigidBody.useGravity = false; // 禁用重力
            }
            lumbermillNode.setPosition(currentConfig.lumbermillPosition);
            console.log(`lumbermill 位置已更新为: ${currentConfig.lumbermillPosition}`);
            
        }

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
    
                // 检查是否为不需要放置预制体的位置
                if (this.shouldInstantiatePrefab(position)) {
                    this.instantiatePrefab(position, rotation);
                }
            }
        }
    }
    
    instantiatePrefab(position: Vec3, rotation: Quat) {
        const randomIndex = Math.floor(Math.random() * this.surfacePrefabs.length);
        const selectedPrefab = this.surfacePrefabs[randomIndex];
        const prefabInstance = instantiate(selectedPrefab);
        prefabInstance.setParent(this.node);
        prefabInstance.setPosition(position);
        prefabInstance.setRotation(rotation);
        this.extraCubes.push(prefabInstance);
    }
    /*
    shouldInstantiatePrefab(position: Vec3): boolean {
        // 检查特定坐标是否匹配
        const forbiddenPositions = [
            new Vec3(0, 2.2, 0),
            new Vec3(0, 2.2, 1.1),
            new Vec3(-2.2, 0, 0)
        ];
    
        // 如果位置在禁止列表中，返回 false，否则返回 true
        return !forbiddenPositions.some(p => p.equals(position));
    }
        */

    shouldInstantiatePrefab(position: Vec3): boolean {
        // 检查当前关卡的禁止位置
        return !this.forbiddenPositions.some(p => p.equals(position));
    }

    createRubiksCube() {
        const size = 3;
        const spacing = 1.2;
        const allCubes = [];
        const edgeCubes = [];
        this.extraCubes = []; // 初始化存储额外立方体的数组
    
        for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
                for (let z = 0; z < size; z++) {
                    const cube = instantiate(this.cubePrefab);
                    cube.setParent(this.node);
                    cube.setPosition(new Vec3(
                        (x - 1) * spacing,
                        (y - 1) * spacing,
                        (z - 1) * spacing
                    ));
                    cube.name = `Cube_${x}_${y}_${z}`;
                    allCubes.push(cube);
    
                    // 设置立方体的颜色为#175A37
                    const renderer = cube.getComponent(MeshRenderer);
                    if (renderer) {
                        renderer.material.setProperty('albedo', new Color(0x17, 0x5A, 0x37, 255));
                    }
    
                    // 检查是否是边缘的立方体
                    if (x === 0 || x === size - 1 || y === 0 || y === size - 1 || z === 0 || z === size - 1) {
                        edgeCubes.push(cube);
                    }
                }
            }
        }
        /*
        // Helper function to get a random element from an array
        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
        // Function to generate a new cube on a random face of a given cube
        const generateCubeOnFace = (baseCube) => {
            const faces = [];
            const position = baseCube.getPosition();
    
            // Add faces based on the cube's position
            if (position.x === -(size - 1) * spacing / 2) faces.push(new Vec3(-spacing, 0, 0)); // Left
            if (position.x === (size - 1) * spacing / 2) faces.push(new Vec3(spacing, 0, 0));  // Right
            if (position.y === -(size - 1) * spacing / 2) faces.push(new Vec3(0, -spacing, 0)); // Bottom
            if (position.y === (size - 1) * spacing / 2) faces.push(new Vec3(0, spacing, 0));  // Top
            if (position.z === -(size - 1) * spacing / 2) faces.push(new Vec3(0, 0, -spacing)); // Back
            if (position.z === (size - 1) * spacing / 2) faces.push(new Vec3(0, 0, spacing));  // Front
    
            const randomFaceOffset = getRandomElement(faces);
            const newCube = instantiate(this.cubePrefab);
            newCube.setParent(this.node);
            const baseCubePosition = baseCube.getPosition();
            newCube.setPosition(baseCubePosition.add(randomFaceOffset));
            newCube.name = `ExtraCube_${baseCubePosition.x}_${baseCubePosition.y}_${baseCubePosition.z}`;
            this.extraCubes.push(newCube); // 将新立方体添加到 extraCubes 数组中
            
            // 给其中一个新生成的立方体添加翻转脚本
            if (flag == 0) {
                flag = 1;
                newCube.addComponent(FlipCubeOnSurface);
            }
        };
        */
    
        // Select two random edge cubes and generate new cubes on random faces
        //const randomEdgeCubes = [getRandomElement(edgeCubes), getRandomElement(edgeCubes)];
        //randomEdgeCubes.forEach(generateCubeOnFace);
    }

    onTouchStart(event: EventTouch) {
        if (this.rotating) return;
    
        const screenPosition = event.getLocation();
        this.startMousePosition.set(screenPosition.x, screenPosition.y, 0);
    
        const ray = this.camera.screenPointToRay(screenPosition.x, screenPosition.y);
        const result = this.raycast(ray);
    
        if (result && result.collider) {
            const detectedNode = result.collider.node;
            console.log(`检测到的节点: ${detectedNode.name}`);
            const positionl = detectedNode.getPosition();
            console.log(positionl)
    
            if (detectedNode.name === 'lumbermill') {
                // 特殊处理 lumbermill 节点
                this.selectedCube = this.node.getChildByName(this.trueLumber);
                const position = detectedNode.getPosition();
                const epsilon = 0.01; // 容差值
    
                // 判断 clickedPlane
                if (Math.abs(position.x - (-1.75)) < epsilon) {
                    this.clickedPlane = 'YOZ';
                } else if (Math.abs(position.z - 1.75) < epsilon) {
                    this.clickedPlane = 'XOY';
                    console.log('yes');
                } else {
                    this.clickedPlane = 'XOZ';
                }
                this.isLayerSelected = true;
            } else if (!detectedNode.name.startsWith("Cube")) {
                // 如果节点名称不是以 "Cube" 开头
                console.log("检测到的物体不是 Cube，忽略操作");
                return;
            } else {
                // 处理其他以 "Cube" 开头的节点
                this.selectedCube = detectedNode;
    
                // 修改颜色
                const renderer = this.selectedCube.getComponent(MeshRenderer);
                if (renderer) {
                    renderer.material.setProperty('color', new Color(255, 0, 0, 255)); // 设置为红色
                }
    
                // 通过碰撞法线判断 clickedPlane
                const normal = result.hitNormal;
                if (Math.abs(normal.x) > Math.abs(normal.y) && Math.abs(normal.x) > Math.abs(normal.z)) {
                    this.clickedPlane = 'YOZ';
                } else if (Math.abs(normal.y) > Math.abs(normal.x) && Math.abs(normal.y) > Math.abs(normal.z)) {
                    this.clickedPlane = 'XOZ';
                } else {
                    this.clickedPlane = 'XOY';
                }
    
                this.isLayerSelected = true;
                console.log(`Clicked Cube: ${this.selectedCube.name}, Plane: ${this.clickedPlane}`);
            }
        } else {
            console.log("没有检测到物体");
        }
    }
    
    onTouchMove(event: EventTouch) {
        if (!this.isLayerSelected || this.rotating) return;
    
        const screenPosition = event.getLocation();
        this.endMousePosition.set(screenPosition.x, screenPosition.y, 0);
    }
    
    onTouchEnd(event: EventTouch) {
        if (!this.isLayerSelected || this.rotating) return;
    
        const screenPosition = event.getLocation();
        this.endMousePosition.set(screenPosition.x, screenPosition.y, 0);
    
        const deltaX = this.endMousePosition.x - this.startMousePosition.x;
        const deltaY = this.endMousePosition.y - this.startMousePosition.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
        const rotationThreshold = 50; // 滑动距离阈值，单位为像素
    
        if (distance < rotationThreshold) {
            // 触发点击操作
            this.handleClick();
        } else {
            // 执行滑动操作
            this.handleSwipe(deltaX, deltaY);
        }
    
        this.isLayerSelected = false;
        this.clickedPlane = null;
    }
    
    handleClick() {
        if (!this.selectedCube) return;
        console.log('nnnnnn')
    
        const ballCube = this.node.getChildByName(this.boxinwhere); // 获取当前盒子所在的立方体节点
        const tempClickedCube = this.selectedCube;
        this.newl = this.selectedCube.name;
    
        if (tempClickedCube && ballCube) {
            this.rotating = true; // 锁定输入
            const relation = this.getRelativePosition(ballCube, tempClickedCube);
            console.log(relation)
            if(relation != null){
                // 触发事件，通知移动逻辑
                console.log(this.clickedPlane)
            EventSystem.emit('moveBall', {relation:relation,plane:this.clickedPlane});
            console.log(`点击关系: ${relation}`);   
            }
            else{
                console.log('no')
                this.rotating = false;
            }
    
        } else {
            console.log('无法识别立方体位置');
        }
    }
    
    handleSwipe(deltaX: number, deltaY: number) {
        if (!this.selectedCube) return;
    
        if (this.clickedPlane === 'XOY') {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.currentAxis = 'y';
                this.rotationDirection.set(0, deltaX > 0 ? -1 : 1, 0); // 左右滑动
            } else {
                this.currentAxis = 'x';
                this.rotationDirection.set(deltaY > 0 ? 1 : -1, 0, 0); // 上下滑动
            }
        } else if (this.clickedPlane === 'XOZ') {
            if (deltaX * deltaY > 0) {
                this.currentAxis = 'z';
                this.rotationDirection.set(0, 0, deltaX > 0 ? 1 : -1); // 左上或右下
            } else {
                this.currentAxis = 'x';
                this.rotationDirection.set(deltaY > 0 ? 1 : -1, 0, 0); // 左下或右上
            }
        } else if (this.clickedPlane === 'YOZ') {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                this.currentAxis = 'y';
                this.rotationDirection.set(0, deltaX > 0 ? -1 : 1, 0); // 左右滑动
            } else {
                this.currentAxis = 'z';
                this.rotationDirection.set(0, 0, deltaY > 0 ? 1 : -1); // 上下滑动
            }
        }
    
        this.selectLayer(this.selectedCube, this.currentAxis);
        this.rotateLayer();
    }

    // 判断两个立方体之间的位置关系
    getRelativePosition(cube1: Node, cube2: Node): string | null {
        const pos1 = cube1.getPosition();
        const pos2 = cube2.getPosition();
        console.log(pos1,pos2)

        // 计算位置差异
        const deltaX = Math.round((pos2.x - pos1.x) / 1.1); // 假设立方体间距为1.1
        const deltaY = Math.round((pos2.y - pos1.y) / 1.1);
        const deltaZ = Math.round((pos2.z - pos1.z) / 1.1);

        console.log(deltaX,deltaY,deltaZ)

        // 判断相对位置
        if (deltaX === 1 && deltaY === 0 && deltaZ === 0) return 'right';
        if (deltaX === -1 && deltaY === 0 && deltaZ === 0) return 'left';
        if (deltaX === 0 && deltaY === 1 && deltaZ === 0) return 'up';
        if (deltaX === 0 && deltaY === -1 && deltaZ === 0) return 'down';
        if (deltaX === 0 && deltaY === 0 && deltaZ === 1) return 'forward';
        if (deltaX === 0 && deltaY === 0 && deltaZ === -1) return 'backward';

        return null; // 不相邻或无法判断
    }

    raycast(ray: geometry.Ray) {
        if (PhysicsSystem.instance.raycastClosest(ray)) {
            return PhysicsSystem.instance.raycastClosestResult;
        }
        return null;
    }

    selectLayer(cube: Node, axis: 'x' | 'y' | 'z') {
        const position = cube.position;
        this.currentAxis = axis;
        this.currentLayerIndex = Math.round(position[this.currentAxis]);
    
        // 选择当前层的立方体
        this.selectedLayer = this.node.children.filter(child =>
            Math.round(child.position[this.currentAxis]) === this.currentLayerIndex
        );
    
        // 获取并添加名为 lumbermill 的节点到 extraCubes
        const lumbermillNode = this.node.getChildByName('lumbermill');
        const boxNode = this.node.getChildByName('box');
    
        this.extraCubes.push(lumbermillNode);
        this.extraCubes.push(boxNode);
        
    
        const contactThreshold = 1.08;  // 定义接触阈值
        const extraCubesToAdd = [];    // 临时存储需要添加的额外立方体
    
        // 检查额外立方体是否与当前选择的层接触
        this.extraCubes.forEach(extraCube => {
            const extraPos = extraCube.getPosition();
            const isTouching = this.selectedLayer.some(selectedCube => {
                const selectedPos = selectedCube.getPosition();
                return Vec3.distance(extraPos, selectedPos) < contactThreshold;
            });
            if (isTouching) {
                extraCubesToAdd.push(extraCube);
            }
        });
    
        // 添加额外立方体到 selectedLayer 中
        extraCubesToAdd.forEach(extraCube => {
            this.selectedLayer.push(extraCube);
        });
    
        // 创建旋转根节点，并将 selectedLayer 中的立方体添加为子节点
        this.rotationRoot = new Node();
        this.rotationRoot.setParent(this.node);
        this.selectedLayer.forEach(cube => {
            cube.setParent(this.rotationRoot);
        });
    }

    clearLayerSelection() {
        this.selectedLayer.forEach(cube => {
            cube.setParent(this.node);
        });
        if (this.rotationRoot) {
            this.rotationRoot.destroy();
            this.rotationRoot = null;
        }
        this.selectedLayer = [];
    }

    rotateLayer() {
        this.rotationCount += 1;
        this.rotating = true;
        const rotation = new Quat();
        const axis = new Vec3();
        if (this.currentAxis === 'x') {
            axis.set(1, 0, 0);
            Quat.fromAxisAngle(rotation, axis, Math.PI / 2 * (this.rotationDirection.equals(new Vec3(1, 0, 0)) ? -1 : 1));
        } else if (this.currentAxis === 'y') {
            axis.set(0, 1, 0);
            Quat.fromAxisAngle(rotation, axis, Math.PI / 2 * (this.rotationDirection.equals(new Vec3(0, 1, 0)) ? -1 : 1));
        } else if (this.currentAxis === 'z') {
            axis.set(0, 0, 1);
            Quat.fromAxisAngle(rotation, axis, Math.PI / 2 * (this.rotationDirection.equals(new Vec3(0, 0, 1)) ? -1 : 1));
        }
    
        const duration = 0.5;
        tween(this.rotationRoot)
            .to(duration, { rotation: rotation })
            .call(() => {
                this.rotating = false;
                this.selectedLayer.forEach(cube => {
                    // 保留世界变换矩阵
                    const worldPosition = new Vec3();
                    const worldRotation = new Quat();
                    cube.getWorldPosition(worldPosition);
                    cube.getWorldRotation(worldRotation);
                    cube.setParent(this.node, false);
                    cube.setWorldPosition(worldPosition);
                    cube.setWorldRotation(worldRotation);
                });
                this.rotationRoot.destroy();
                this.rotationRoot = null;
                this.isLayerSelected = false;

                // 在旋转完成后更新球体的位置
                this.updateBallPositionAfterRotation();
                console.log('HI')
            })
            .start();
    }
    updateBallPositionAfterRotation() {
        // 获取球体节点，确保它的名字是 "Ball"
        const ballNode = this.node.getChildByName('Ball'); 
        
        if (ballNode) {
            // 获取球体的世界位置
            const worldPosition = ballNode.getWorldPosition();
        
            // 将世界位置转换为魔方的局部坐标
            const newLocalPosition = new Vec3();
            this.node.inverseTransformPoint(newLocalPosition, worldPosition);
        
            // 更新球体的位置
            ballNode.setPosition(newLocalPosition);
            console.log(ballNode.position);
        } else {
            console.log('Ball node not found');
        }
    }

    update(deltaTime: number) {
        this.operationTime += deltaTime;
        this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
        this.rotationCountLabel.string = `旋转次数: ${this.rotationCount}`;
        //this.operationCountLabel.string = `移动次数: ${this.operationCount}s`;
    }
}
