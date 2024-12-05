import { instantiate, _decorator, Component, Node, geometry, Vec3, Vec2, EventTouch, PhysicsSystem, Camera, Quat, tween, easing, Tween, } from 'cc';
import { RoundRect } from './RoundRect';
const { ccclass, property } = _decorator;

const _v2 = new Vec2();
const _ray = new geometry.Ray();

/** [示例] 点选框
 * * 在屏幕上点击3D物体, 就会出现点选框
 * * 一共演示了2种风格的点选框
 */
@ccclass('RoundRect.Sample_Cursor')
export class Sample_Cursor extends Component {

    protected onLoad(): void {
        window['sample'] = this;
        this._cursorSelect = new CursorSelect(this.rectSelect);
        this._cursorTarget = new CursorTarget(this.rectTarget);
       //this.roleRoot.children.forEach(this._randomMove);
        //this._listenTouch(true);
    }

    //#region [touch]

    //@property(Camera) public rayCamera: Camera = null;
    //@property(Node) public touchTarget: Node = null;

    
    /*
    private _listenTouch(isOn: boolean) {
        const target = this.touchTarget;
        const fn = isOn ? target.on : target.off;
        fn.call(target, Node.EventType.TOUCH_START, this._onTS, this);
        fn.call(target, Node.EventType.TOUCH_END, this._onTE, this);
        fn.call(target, Node.EventType.TOUCH_CANCEL, this._onTE, this);
        fn.call(target, Node.EventType.TOUCH_MOVE, this._onTM, this);
    }

    private _onTS(e: EventTouch) { this._onTouch('ts', e); }
    private _onTE(e: EventTouch) { this._onTouch('te', e); }
    private _onTM(e: EventTouch) { this._onTouch('tm', e); }
    

    private _e2hit(e: EventTouch) {
        // 检查 rayCamera 是否已经被正确赋值
        if (!this.rayCamera) {
            console.warn("rayCamera is not assigned.");
            return null;
        }
    
        const v2 = e.getLocation(_v2);
        
        // 将屏幕坐标转换为世界坐标的射线
        const ray = this.rayCamera.screenPointToRay(v2.x, v2.y, _ray);
    
        // 使用 PhysicsSystem 的 raycastClosest 进行检测
        if (PhysicsSystem.instance.raycastClosest(ray)) {
            const result = PhysicsSystem.instance.raycastClosestResult;
            if (result && result.collider) {
                console.log("Hit object:", result.collider.node.name);
                return result; // 返回检测结果
            }
        }
        return null;
    }
        */
    

    //#endregion [touch]

    //#region [RoundRect]

    @property(RoundRect) public rectSelect: RoundRect = null;
    @property(RoundRect) public rectTarget: RoundRect = null;
    @property(Node) public roleRoot: Node = null;

    public _cursorSelect: ICursor;
    public _cursorTarget: ICursor;
    /*
    private _onTouch(type: string, e: EventTouch) {
        const rsl = this._e2hit(e);
        if (!rsl) {
            this._cursorSelect.hide();
            this._cursorTarget.hide();
            return;
        }

        switch (type) {
            case 'ts': break;
            case 'tm': break;
            case 'te':
                const root = rsl.collider.node.parent;
                const isTarget = root.name.includes('Enemy');
                (isTarget ? this._cursorTarget : this._cursorSelect).showWith(root);
                break;
        }
    }
        */
        

    //#endregion [RoundRect]

    private _randomMove(node: Node) {
        const dur = Math.random() * 0.5 + 0.5;
        const arc = Math.random() * 2 * Math.PI;
        const p1 = new Vec3(Math.sin(arc), 0, Math.cos(arc));
        const p2 = p1.clone().multiplyScalar(-1);
        [p1, p2, p2, p1].reduce((rsl, v) => rsl.by(dur, { position: v }), tween(node))
            .union().repeatForever().start();
    }
}

interface ICursor { showWith(root: Node); hide(); }

class CursorTarget implements ICursor {
    public readonly node: Node;
    constructor(public readonly rect: RoundRect) {
        this.node = rect.node;
        this.lineWidth = rect.lineWidth;
        this.node.active = false;
    }
    public lineWidth: number;
    public dur = 0.5;

    private _ppt1: Partial<RoundRect> = { anchor: 0 };
    private _ppt2: Partial<RoundRect> = { anchor: 1 };
    private _tw: Tween<RoundRect>;


    public showWith(root: Node) {
        this.node.active = true;
        this.node.parent = root;
        this.node.position = Vec3.ZERO;

        this.rect.lineWidth = this.lineWidth * 4;
        tween(this.rect)
            .to(this.dur, { lineWidth: this.lineWidth }, { easing: easing.backOut })
            .start();

        this.rect.anchor = 1;
        this._tw?.stop();
        this._tw = tween(this.rect)
            .to(this.dur, this._ppt1, { easing: easing.sineInOut })
            .to(this.dur, this._ppt2, { easing: easing.sineInOut })
            .union()
            .repeatForever()
            .start();
    }
    public hide() {
        this.node.active = false;
        this._tw?.stop();
        this._tw = null;
    }
}

class CursorSelect implements ICursor {
    public readonly node: Node;
    constructor(public readonly rect: RoundRect) {
        this.node = rect.node;
        this.lineWidth = rect.lineWidth;
        this.node.active = false;
    }
    public lineWidth: number;
    public dur = 0.5;

    private _pptMove1: Partial<Node> = { position: Vec3.UP.clone().multiplyScalar(0.1) };
    private _pptMove2: Partial<Node> = { position: Vec3.ZERO };
    private _pptRot: Partial<Node> = { eulerAngles: Vec3.UP.clone().multiplyScalar(360) };
    private _tw1: Tween<Node>;
    private _tw2: Tween<Node>;

    public showWith(root: Node) {
        // 克隆一个新的节点
        const clonedNode = instantiate(this.node);
    
        // 激活并设置克隆节点的属性
        clonedNode.active = true;
        clonedNode.parent = root; // 挂载到传入的 root 节点上
        clonedNode.position = Vec3.ZERO;
        clonedNode.rotation = Quat.IDENTITY;
    
        // 设置克隆节点的 lineWidth 属性
        const clonedRect = clonedNode.getComponent(RoundRect);
        if (clonedRect) {
            clonedRect.lineWidth = this.lineWidth * 4;
    
            // 创建一个线宽动画
            tween(clonedRect)
                .to(this.dur, { lineWidth: this.lineWidth }, { easing: easing.backOut })
                .start();
        }
    
        // 停止并重新启动移动动画
        const moveTween = tween(clonedNode)
            .to(this.dur, this._pptMove1, { easing: easing.sineInOut })
            .to(this.dur, this._pptMove2, { easing: easing.sineInOut })
            .union()
            .repeatForever()
            .start();
    
        // 停止并重新启动旋转动画
        const rotateTween = tween(clonedNode)
            .by(this.dur * 4, this._pptRot)
            .repeatForever()
            .start();
    
        // 将克隆的节点存储或返回，方便后续管理
        return clonedNode;
    }
    public hide() {
        this.node.active = false;
        this._tw1?.stop();
        this._tw2?.stop();
        this._tw1 = null;
        this._tw2 = null;
    }
}
