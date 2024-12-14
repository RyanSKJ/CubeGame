import { _decorator, Camera, Component, EventTarget, EventTouch, Touch, Button, Color, Sprite, MeshRenderer, EventMouse, geometry, Input, input, Node, PhysicsSystem, profiler, toDegree, toRadian, UITransform, Vec3, view } from "cc";
import { Cubes } from "./Cubes";
import { Sample_Cursor } from "./Sample_Cursor";
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

  private _touchStartPos: Vec3 = new Vec3(); // 记录触摸的开始位置
private _touchEndPos: Vec3 = new Vec3();   // 记录触摸的结束位置
private _touchThreshold: number = 10;     // 触摸的滑动阈值，单位像素


  private _totalDistance: number = 0;

  camera0: Camera = null;

  private _isDragging: boolean = false; // 是否正在单指拖动
  private _lastTouchPos: Vec3 = new Vec3();

  private isColorMode: boolean = false; // 默认处于选择立方体模式

  @property([Node])
    colorButtons: Node[] = []; // 颜料板中的颜色按钮 (每个按钮都是一个Sprite)

    private selectedColor: Color = new Color(255, 255, 255, 255); // 当前选中的颜色，默认白色



  protected onDestroy() {
    this.node.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    //input.off(Input.EventType.MOUSE_WHEEL, this.onMouseWheel);
  }

  

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
  }
  
  private onTouchMove(event: EventTouch) {
    const touch = event.getLocation();
    const deltaX = touch.x - this._lastTouchPos.x;
    const deltaY = touch.y - this._lastTouchPos.y;
    
    // 计算这次移动的距离
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    this._totalDistance += distance; // 记录总的移动距离
  
    // 判断是否进入拖拽模式
    if (!this._isDragging && this._totalDistance > this._touchThreshold) {
      this._isDragging = true; // 一旦总的距离超过了阈值，标记为拖拽
      console.log('拖拽开始');
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
  
    // 更新最后的触摸位置
    this._lastTouchPos.set(touch.x, touch.y, 0);
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
          // 改变颜色模式
          this._changeChildrenColor(node, this.selectedColor);
          console.log("已改变颜色为:", this.selectedColor.toHEX());
          return true;
      } else {
          // 选择立方体模式
          node = this._findRootNode(node, /^\d$/); // 查找 Cube 父节点
          if (!node) {
              console.warn("未能找到 Cube 节点");
              return false;
          }

          console.log("最终选中的节点是：", node.name);
          this.cubes.selectCube(node);
          return true;
      }
    }
    return false;
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
        // 2. 向上查找父节点
        console.log(node.name)
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
    const aspect = size.width / size.height;

    this.camera0 = this.cameraNode.getChildByName("Camera0").getComponent(Camera);

    if (aspect > 0.5) {
      const horFOV = this.verticalFOVToHorizontal(45, aspect);
      this.camera0.fov = horFOV;
    } else {
      this.camera0.fov = this.horizontalFOVToVertical(45, aspect);
    }

    this.camera0.camera.update(true);
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