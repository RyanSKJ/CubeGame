import { _decorator, Camera, Component, EventTouch, Touch, EventMouse, geometry, Input, input, Node, PhysicsSystem, profiler, toDegree, toRadian, UITransform, Vec3, view } from "cc";
import { Cubes } from "./Cubes";
import { Sample_Cursor } from "./Sample_Cursor";

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

  private cameraDistance: number = 10; // 摄像机初始距离
  private zoomSpeed: number = 0.1; // 缩放速度
  private minDistance: number = 5; // 缩放最小距离
  private maxDistance: number = 20; // 缩放最大距离
  private _initialTouchDistance: number = 0; // 初始两指间距离

  private minFOV: number = 20; // 最小视场角
  private maxFOV: number = 80; // 最大视场角

  camera0: Camera = null;

  private _isDragging: boolean = false; // 是否正在单指拖动
  private _isPinching: boolean = false; // 是否正在双指缩放
  private _lastTouchPos: Vec3 = new Vec3();

  protected onLoad() {
    this.fixCamera();
    //profiler.showStats();

    input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
  }

  protected onDestroy() {
    input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    input.off(Input.EventType.MOUSE_WHEEL, this.onMouseWheel);
  }

  private onTouchStart(event: EventTouch) {
    const touches = event.getTouches();

    if (touches.length === 2) {
      console.log('a')
      // 双指操作，初始化缩放距离
      this._isPinching = true;
      this._initialTouchDistance = this.calculateTouchDistance(touches[0], touches[1]);
      this._isDragging = false; // 禁用单指拖动
    } else if (touches.length === 1) {
      // 单指操作
      this._isDragging = true;
      this._isPinching = false;
      const touch = touches[0].getLocation();
      this._lastTouchPos.set(touch.x, touch.y, 0);
    }
  }

  private onTouchMove(event: EventTouch) {
    const touches = event.getTouches();

    if (this._isPinching && touches.length === 2) {
      // 双指缩放逻辑
      const currentDistance = this.calculateTouchDistance(touches[0], touches[1]);
      const deltaDistance = currentDistance - this._initialTouchDistance;

      this.onPinchZoom(deltaDistance * 0.01); // 缩放操作
      this._initialTouchDistance = currentDistance; // 更新初始距离
    } else if (this._isDragging && touches.length === 1) {
      // 单指拖动逻辑
      const touch = touches[0].getLocation();
      const deltaX = touch.x - this._lastTouchPos.x;
      const deltaY = touch.y - this._lastTouchPos.y;

      const rotationSpeed = 0.1;
      this.cameraNode.eulerAngles = new Vec3(
        this.cameraNode.eulerAngles.x + deltaY * rotationSpeed,
        this.cameraNode.eulerAngles.y - deltaX * rotationSpeed,
        this.cameraNode.eulerAngles.z
      );

      this._lastTouchPos.set(touch.x, touch.y, 0);
    }
  }

  private onTouchEnd(event: EventTouch) {
    const touches = event.getTouches();
    if (touches.length < 2) {
      // 如果少于两指，结束双指操作
      this._isPinching = false;
    }
    if (touches.length < 1) {
      // 如果没有触点，结束单指拖动
      this._isDragging = false;
    }
  }

  private onMouseWheel(event: EventMouse) {
    // 触控板滚动事件模拟缩放
    const delta = event.getScrollY();

    // 缩放逻辑
    const camera = this.cameraNode.getComponent(Camera);
    if (!camera) {
        console.error("Camera component not found on cameraNode!");
        return;
    }

    camera.fov -= delta * this.zoomSpeed * 0.05; // 缩放速度调低
    camera.fov = Math.max(this.minFOV, Math.min(this.maxFOV, camera.fov));
    camera.camera.update(true);

    console.log(`Mouse wheel delta: ${delta}, new FOV: ${camera.fov}`);
}

  private pickCube(event: EventTouch): boolean {
    const ray = new geometry.Ray();

    if (!this.camera0) {
      console.error("Camera0 未初始化");
      return false;
    }

    this.camera0.screenPointToRay(event.getLocationX(), event.getLocationY(), ray);

    if (PhysicsSystem.instance.raycastClosest(ray)) {
      const raycastResult = PhysicsSystem.instance.raycastClosestResult;
      let node = raycastResult.collider.node;

      if (!/^\d$/.test(node.name) && node.parent) {
        node = node.parent;
      }

      this.cubes.selectCube(node);
      this.sampleCursor._cursorSelect.showWith(node);
      return true;
    }
    return false;
  }

  private calculateTouchDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.getLocationX() - touch2.getLocationX();
    const dy = touch1.getLocationY() - touch2.getLocationY();
    return Math.sqrt(dx * dx + dy * dy);
  }

  private onPinchZoom(deltaDistance: number) {
    const camera = this.cameraNode.getComponent(Camera);
    if (!camera) return;

    camera.fov -= deltaDistance * this.zoomSpeed;
    camera.fov = Math.max(this.minFOV, Math.min(this.maxFOV, camera.fov));
    camera.camera.update(true);
  }

  private onWheelZoom(delta: number) {
    const camera = this.cameraNode.getComponent(Camera);
    if (!camera) return;

    camera.fov -= delta * this.zoomSpeed * 0.1;
    camera.fov = Math.max(this.minFOV, Math.min(this.maxFOV, camera.fov));
    camera.camera.update(true);
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
}