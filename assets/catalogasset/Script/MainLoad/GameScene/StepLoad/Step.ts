import { __private, _decorator, Animation, Component, Node, Sprite, UIOpacity, Vec3 } from 'cc';
import { ResMgr } from '../../../Mgr/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('Step')
export class Step extends Component {

    //我的宽高
    public MyWidth: number = 166;
    public MyHeight: number = 30;

    //移动速度
    public Vx: number = 0;
    public MoveSpeed: number = 0;

    //道具
    @property(Node)
    private Prop: Node;
    //道具名称
    public PropType: string = "";

    //是否消失
    private IsDisappear: boolean = false;
    //消失时间
    private DisappearTime: number = 0;

    //道具得宽高
    public PropWidth: number = 56;
    public PropHeight: number = 56;

    /**
     * 播放动画
     */
    public PlayAnimation() {
        this.node.getChildByName("Step").getComponent(Animation).play();
    }

    /**
     * 更新样式
     * @param 是否移动
     * @param 是否消失
     */
    public UpdateStyle(_ismove: boolean, _isdisappear: boolean, _prop: string) {
        this.MoveSpeed = 0;
        this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step0"];
        this.IsDisappear = false;
        this.node.getComponent(Animation).stop();
        this.node.getComponent(UIOpacity).opacity = 255;
        this.Prop.active = false;

        if (_ismove) {//移动台阶
            let ran_num: number = Math.random();
            if (ran_num < 0.2) {
                this.MoveSpeed = -3;
                this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step1"];
            } else if (ran_num > 0.7) {
                this.MoveSpeed = 3;
                this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step1"];
            }
        }

        if (_isdisappear) {//消失台阶
            this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step2"];
            this.IsDisappear = true;
            this.DisappearTime = 3 * 60;
            this.node.getComponent(Animation).play();
        }

        if (_prop) {
            this.Prop.active = true;
            this.PropType = _prop;
            this.Prop.getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames[this.PropType];
        }

        this.Vx = this.MoveSpeed;
    }

    /**
     * 更新位置
     */
    public UpdatePosition() {
        if (this.Vx == 0 || !this.node.active) return;

        let new_pos: Vec3 = this.node.getPosition();
        let now_pos: Vec3 = new_pos.add(new Vec3(this.Vx, 0, 0));

        if (now_pos.x < - (375 - this.MyWidth / 2) || now_pos.x > 375 - this.MyWidth / 2) {
            this.Vx *= -1;
        }

        this.node.setPosition(now_pos);
    }

    /**
     * 检测消失
     */
    public CheckDisappear() {
        if (!this.IsDisappear || !this.node.active) return;
        this.DisappearTime--;
        if (this.DisappearTime <= 0) {
            this.IsDisappear = false;
            this.node.setPosition(new Vec3(0, -800, 0))
        }
    }
}


