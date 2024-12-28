import { _decorator, Camera, Component, EventTarget, EventTouch, screen, Touch, Button, Color, Sprite, MeshRenderer, EventMouse, geometry, Input, input, Node, PhysicsSystem, profiler, toDegree, toRadian, UITransform, Vec3, view, color } from "cc";
import { Cubes } from "./Cubes";
import { Sample_Cursor } from "./Sample_Cursor";
import { Global } from "../../catalogasset/Script/Global"
export const EventSystem = new EventTarget();

const { ccclass, property } = _decorator;

@ccclass("UI")
export class UI extends Component {
  @property(Node)
  cameraNode: Node = null;

  @property(Node)
  uiNode: Node = null;

  @property(Node)
  selcetNode: Node = null;

  @property(Cubes)
  cubes: Cubes = null;

  @property(Sample_Cursor)
  sampleCursor: Sample_Cursor = null;

  private lastPushX:number = 0;
    private lastPushY:number = 0;

    private lastRecordedTime: number = 0; // 上次记录触摸点的时间戳
    private minPointDistance: number = 10; // 两点之间的最小距离（像素）

  private _touchStartPos: Vec3 = new Vec3(); // 记录触摸的开始位置
  private _touchEndPos: Vec3 = new Vec3();   // 记录触摸的结束位置
  private _touchThreshold: number = 10;     // 触摸的滑动阈值，单位像素

  private _dragPath: { x: number; y: number; time: string }[] = []; // 存储拖拽路径
  private _lastSamplePos: Vec3 = new Vec3(); // 上一次采样的点
  private _sampleThreshold: number = 10;    // 采样距离阈值

  private _totalDistance: number = 0;

  camera0: Camera = null;

  private _isDragging: boolean = false; // 是否正在单指拖动
  private _lastTouchPos: Vec3 = new Vec3();

  private isColorMode: boolean = false; // 默认处于选择立方体模式

  @property([Node])
  colorButtons: Node[] = []; // 颜料板中的颜色按钮 (每个按钮都是一个Sprite)

  private selectedColor: Color = new Color(255, 255, 255, 255); // 当前选中的颜色，默认白色







  onLoad() {
    // 监听 TOUCH_START, TOUCH_MOVE, TOUCH_END 事件
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    //this.fixCamera();
    this.camera0 = this.cameraNode.getChildByName("Camera0").getComponent(Camera);
  }

  start() {


    // 监听点击事件，用于检测点击到的 Cube
    this.node.on(Node.EventType.TOUCH_START, this.pickCube, this);
  }

  /**
   * 颜色按钮点击事件，点击后选中该颜色
   */
  private onClickColorButton(event: Event, customEventData: string) {
    // 预定义的颜色映射
    const colorMap = {
      green: new Color(0, 255, 0, 255), // 绿色
      yellow: new Color(121, 82, 0, 255), // 黄色
      red: new Color(255, 0, 0, 255), // 红色
    };

    // 根据 customEventData 获取颜色
    const selectedColor = colorMap[customEventData.toLowerCase()];
    this.isColorMode = true;
    if (!selectedColor) {
      console.error(`未定义的颜色: ${customEventData}`);
      return;
    }

    // 更新当前选中的颜色
    this.selectedColor = selectedColor;
    console.log(`当前选择的颜色为: ${this.selectedColor.toHEX()}`);
  }

  private onTouchStart(event: EventTouch) {
    const touch = event.getLocation();
    this._touchStartPos.set(touch.x, touch.y, 0); // 记录触摸的起始位置
    this._lastTouchPos.set(touch.x, touch.y, 0);  // 记录最后的触摸位置
    this._isDragging = false; // 每次触摸开始时，重置拖拽标志
    this._totalDistance = 0; // 重置总位移
    this.lastRecordedTime = Date.now();
    this.lastPushX = touch.x;
    this.lastPushY = touch.y;
  }

  private onTouchMove(event: EventTouch) {
    const touch = event.getLocation();
    const deltaX = touch.x - this._lastTouchPos.x;
    const deltaY = touch.y - this._lastTouchPos.y;

    const currentTime = Date.now(); // 使用绝对时间戳
    const distanceFromLastPoint = Math.sqrt(Math.pow(touch.x-this.lastPushX, 2) + Math.pow(touch.y-this.lastPushY, 2)); // 当前与上一次记录点的距离
    const timeDelta = currentTime - this.lastRecordedTime; // 使用绝对时间计算间隔

    // 计算这次移动的距离
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    this._totalDistance += distance; // 记录总的移动距离

    // 判断是否进入拖拽模式
    if (!this._isDragging && this._totalDistance > this._touchThreshold) {
      this._isDragging = true; // 一旦总的距离超过了阈值，标记为拖拽
      EventSystem.emit('drag');
    }

    if (this._isDragging) {
      // 处理拖拽中的相机旋转逻辑
      const rotationSpeed = 0.1; // 旋转的速度
      this.cameraNode.eulerAngles = new Vec3(
        this.cameraNode.eulerAngles.x + deltaY * rotationSpeed,
        this.cameraNode.eulerAngles.y - deltaX * rotationSpeed,
        this.cameraNode.eulerAngles.z
      );
    }


    // 获取当前时间
    const screenWidth = screen.windowSize.width;  // 获取屏幕宽度
    const screenHeight = screen.windowSize.height; // 获取屏幕高度
    const aspectRatio = screenWidth / screenHeight;
    this.minPointDistance = screenWidth / 10;



    // 记录触摸路径：时间间隔和距离间隔
    if (timeDelta >= 50 && distanceFromLastPoint >= this.minPointDistance) {
      this._dragPath.push({ x:touch.x, y:touch.y, time: currentTime.toString() });
      this.lastRecordedTime = currentTime; // 更新上次记录的时间
      this.lastPushX = touch.x;
      this.lastPushY = touch.y;
  }

    this._lastTouchPos.set(touch.x, touch.y, 0); // 更新最后触摸点

  }

  private onTouchEnd(event: EventTouch) {
    const touch = event.getLocation();
    this._touchEndPos.set(touch.x, touch.y, 0); // 记录触摸结束位置

    // 如果拖拽模式未开启，且总位移小于阈值，认为是点击
    if (!this._isDragging && this._totalDistance < this._touchThreshold) {
      console.log('点击操作');
      //this.pickCube(event); // 点击操作
    } else {
      console.log('拖拽结束');
      // 打包拖拽路径数据
      const dragData = {
        dragPath: this._dragPath,
        totalDistance: this._totalDistance,
      };

      // 上传数据
      this.logPlayerAction("Drag", undefined, undefined, undefined, undefined, JSON.stringify(dragData));

    }

    // 重置标志位
    this._isDragging = false;
    this._totalDistance = 0;
    this._touchStartPos.set(0, 0, 0);
    this._touchEndPos.set(0, 0, 0);
  }



  private pickCube(event: EventTouch): boolean {
    const ray = new geometry.Ray();

    if (!this.camera0) {
      console.error("Camera0 未初始化");
      return false;
    }

    // 1. 将触摸位置转换为射线
    this.camera0.screenPointToRay(event.getLocationX(), event.getLocationY(), ray);

    // 2. 使用物理系统检测最近的射线碰撞
    if (PhysicsSystem.instance.raycastClosest(ray)) {
      const raycastResult = PhysicsSystem.instance.raycastClosestResult;

      if (!raycastResult) return false;

      let node = raycastResult.collider.node;

      if (this.isColorMode) {
        const parentName = node.parent ? node.parent.name : "无父节点";

        // 打印当前节点和父节点的名称
        console.log("已改变颜色的节点为:", node.name);
        console.log("该节点的父节点名称为:", parentName);
        // 使用正则表达式判断父节点名称是否符合规则
        const namePattern = /^\d+_\d+$/; // 正则：匹配类似 "0_0", "1_1" 的格式
        if (namePattern.test(parentName)) {
          this._changeChildrenColor(node, this.selectedColor);
          console.log("颜色已改变，符合规则的父节点为:", parentName);
          this.logPlayerAction('ChangeColor', undefined, node.name, parentName, this.selectedColor.toHEX())
          return true;
        }
      } else {
        // 选择立方体模式
        node = this._findRootNode(node, /^\d+_\d+$/); // 修改正则，匹配类型_索引格式
        if (!node) {
          console.warn("未能找到 Cube 节点");
          return false;
        }
        //this.logPlayerAction('SelectNode',node.name,undefined,undefined,undefined)
        //console.log("最终选中的节点是：", node.name);
        this.cubes.selectCube(node);
        EventSystem.emit('Select');
        return true;
      }
    }
    return false;
  }

  async logPlayerAction(
    Operation: string,
    Object?: string,
    Object_Color?: string,
    Color_Father?: string,
    Color?: string,
    Drag?: string,

  ) {
    const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址

    // 1️⃣ 获取 localStorage 数据
    const username = localStorage.getItem('currentUsername');
    const sessionToken = localStorage.getItem('sessionToken');

    // 2️⃣ 确保 localStorage 中的用户名和 token 存在
    if (!username) {
      console.error('❌ 错误：用户名未找到。请确保玩家已正确登录。');
      return;
    }
    if (!sessionToken) {
      console.error('❌ 错误：Session token 未找到。请确保玩家已正确认证。');
      return;
    }

    // 3️⃣ 获取当前时间（北京时间，精确到毫秒）
    function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
      const str = String(value);
      return str.length >= targetLength ? str : padChar.repeat(targetLength - str.length) + str;
    }

    const now = new Date();
    const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
    const beijingTime = new Date(now.getTime() + offset);
    const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(beijingTime.getDate(), 2)} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(beijingTime.getSeconds(), 2)}.${padStart(beijingTime.getMilliseconds(), 3)}`;

    // 4️⃣ 获取当前的关卡
    const level = Global.currentLevelIndex ?? 0; // 确保 Level 不会是 undefined

    // 5️⃣ 参数校验：判断提供哪组参数
    const hasCubeParams = Object !== undefined;
    const hasObjectParams = Object_Color !== undefined && Color_Father !== undefined && Color !== undefined;
    const hasDrag = Drag !== undefined;
    if (!hasCubeParams && !hasObjectParams && !hasDrag) {
      console.error('❌ 错误：未提供完整的参数。');
      return;
    }

    // 6️⃣ 组织请求数据
    const data: any = {
      tableName: 'game4',
      data: {
        Usr_ID: username,          // 玩家ID
        Timestep: formattedTime,   // 时间戳（北京时间，精确到毫秒）
        Level: level,              // 当前关卡
        Operation: Operation,      // 操作类型
        Drag: Drag
      },
    };

    // 根据提供的参数进行数据填充
    if (hasCubeParams) {
      data.data.Object = Object;
    } else if (hasObjectParams) {
      data.data.Object_Color = Object_Color;
      data.data.Color_Father = Color_Father;
      data.data.Color = Color;
    } else if (hasDrag) {
      data.drag = Drag;
    }

    // 7️⃣ 发送请求
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('❌ 错误：无法记录玩家操作');
      }

      const result = await response.json();
      console.log('✅ 玩家操作记录成功：', result);
    } catch (error) {
      console.error('❌ 记录玩家操作时发生错误：', error);
    }
  }


  public enterSelectMode() {
    this.isColorMode = false;
    console.log("已进入选择立方体模式");
  }

  /**
   * 递归向上查找特定名称的父节点
   * @param node 当前的起始节点
   * @param namePattern 匹配父节点名称的正则表达式
   * @returns 返回匹配的根节点，如果没有匹配则返回 null
   */
  private _findRootNode(node: Node, namePattern: RegExp): Node | null {
    while (node) {
      // 1. 判断当前节点是否符合条件
      if (namePattern.test(node.name)) {
        return node; // 如果名字符合条件，返回这个节点
      }
      node = node.parent;
    }
    return null; // 如果找不到，返回 null
  }


  ///////////////////////////////////////////////////////////////////////////
  btnStart() {
    this.cubes.resetLevel();
    this.cubes.faPai();
  }

  btnHePai() {
    this.cubes.hePai();
  }

  fixCamera() {
    const size = view.getVisibleSize();
    console.log("屏幕宽度：", size.width, "屏幕高度：", size.height);

    if (size.width === 0 || size.height === 0) {
      console.error("视图尺寸为 0，可能是资源加载问题");
      return;
    }

    const aspect = size.width / size.height;
    console.log("宽高比：", aspect);

    this.camera0 = this.cameraNode.getChildByName("Camera0").getComponent(Camera);

    if (!this.camera0) {
      console.error("Camera0 未找到或未正确初始化");
      return;
    }

    if (aspect > 0.5) {
      const horFOV = this.verticalFOVToHorizontal(45, aspect);
      this.camera0.fov = horFOV;
      console.log("设置为水平 FOV：", horFOV);
    } else {
      this.camera0.fov = this.horizontalFOVToVertical(45, aspect);
      console.log("设置为垂直 FOV：", this.camera0.fov);
    }

    this.camera0.camera.update(true);
    console.log("摄像机 FOV 更新完成");
  }


  verticalFOVToHorizontal(verFOV: number, aspect: number): number {
    const verFovRadian = toRadian(verFOV);
    const camHalfHeight = Math.tan(verFovRadian / 2);
    const horFOVRadian = Math.atan(camHalfHeight * aspect) * 2;
    return toDegree(horFOVRadian);
  }

  horizontalFOVToVertical(horFOV: number, aspect: number): number {
    const horFOVRadian = toRadian(horFOV);
    const camHalfWidth = Math.tan(horFOVRadian / 2);
    const verFOVRadian = Math.atan(camHalfWidth / aspect) * 2;
    return toDegree(verFOVRadian);
  }




  /**
   * 递归遍历所有子节点，并将子节点的颜色修改为指定的颜色
   * @param parentNode 父节点
   * @param color 新的颜色 (Color)
   */
  private _changeChildrenColor(parentNode: Node, color: Color) {
    // 1. 尝试改变当前节点的 MeshRenderer 颜色
    const meshRenderer = parentNode.getComponent(MeshRenderer);
    if (meshRenderer) {
      meshRenderer.material.setProperty('albedo', color);
    }

    /*
    parentNode.children.forEach(childNode => {
        this._changeChildrenColor(childNode, color);
    });
    */
  }

}