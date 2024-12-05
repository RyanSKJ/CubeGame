import { _decorator, Animation, Component, Node, PrivateNode, Sprite, UITransform, Vec3 } from 'cc';
import { StepLoad } from './StepLoad/StepLoad';
import { Step } from './StepLoad/Step';
import { Global, PropList } from '../../Global';
import { GameScene } from './GameScene';
import { ElementLoad } from './ElementLoad';
import { AudioMgr } from '../../Mgr/AudioMgr';
import { ResMgr } from '../../Mgr/ResMgr';
import { LocalMgr } from '../../Mgr/LocalMgr';
const { ccclass, property } = _decorator;

@ccclass('Mimi')
/**
 * 控制得猫咪
 */
export class Mimi extends Component {

    @property(Node)
    private Cat: Node;

    //下降速度
    public Vy: number = 40;
    private AddVy: number = -0.5;
    //跳跃速度
    private JumpVy: number = 20;

    //横向移动
    private Vx: number = 0

    //我的宽高
    private MyWidth: number = 0;
    private MyHeight: number = 0;

    //台阶层
    @property(Node)
    private StepLoad: Node;

    //游戏场景
    @property(Node)
    private GameScene: Node;

    //元素层
    @property(Node)
    private ElementLaod: Node;

    protected start(): void {

        this.Cat.getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["cathead" + LocalMgr.instance.LocalInfo.lastchoose.toString()];

        this.MyWidth = this.Cat.getComponent(UITransform).width;
        this.MyHeight = this.Cat.getComponent(UITransform).height;
    }

    /**
     * 我复活了
     */
    public IamSave() {
        this.node.setPosition(new Vec3(0, 0,));
        this.Vy = 40;
    }

    /**
     * 起跳
     */
    public ImaMove(_vx: number) {
        this.Vx = _vx;
    }

    protected update(dt: number): void {
        if (Global.IsGameOver) return;
        let now_pos: Vec3 = this.node.getPosition();
        let new_pos: Vec3 = now_pos.add(new Vec3(this.Vx, this.Vy));

        this.Vy += this.AddVy;

        let max_width: number = 375 - this.MyWidth / 2;
        if (new_pos.x < -max_width) new_pos.x = -max_width;
        else if (new_pos.x > max_width) new_pos.x = max_width;

        if (new_pos.y > 0) {
            new_pos.y = 0;
            //台阶向下移动
            this.StepLoad.getComponent(StepLoad).StepMove(-this.Vy);
        }

        this.node.setPosition(new_pos)

        this.CheckStep();

        //游戏结束判断
        if (this.node.getPosition().y < Global.GameBottom) {
            AudioMgr.instance.PlayEffect("ao", "click");
            this.GameScene.getComponent(GameScene).GameOver();
        }
    }

    /**
     * 台阶检测
     */
    public CheckStep() {
        let my_pos: Vec3 = this.node.getPosition();
        let my_world: Vec3 = this.node.getWorldPosition();
        for (let step of this.StepLoad.getComponent(StepLoad).StepArray) {
            //台阶判断
            if (Math.abs(my_pos.x - step.getPosition().x) <= step.getComponent(Step).MyWidth / 2 &&
                Math.abs(my_pos.y - step.getPosition().y) <= (this.MyHeight + step.getComponent(Step).MyHeight) / 2 &&
                step.position.y < my_pos.y &&
                step.active &&
                this.Vy < 0) {
                this.node.getChildByName("Cat").getComponent(Animation).play();
                this.Vy = this.JumpVy;
                step.getComponent(Step).PlayAnimation();
                AudioMgr.instance.PlayEffect("dagn", "click");
            }
            //道具判断
            let prop: Node = step.getChildByName("Step").getChildByName("Prop");

            if (Math.abs(my_world.x - prop.getWorldPosition().x) <= (this.MyHeight + step.getComponent(Step).PropWidth) / 2 &&
                Math.abs(my_world.y - prop.getWorldPosition().y) <= (this.MyHeight + step.getComponent(Step).PropWidth) / 2 &&
                prop.active) {
                prop.active = false;
                switch (step.getComponent(Step).PropType) {
                    case PropList.Coin://碰到金币
                        this.ElementLaod.getComponent(ElementLoad).AddCoin(1);
                        AudioMgr.instance.PlayCoin();
                        break;
                    case PropList.Boom://碰到爆炸物
                        if (this.Vy < 0) this.ElementLaod.getComponent(ElementLoad).BleedReduce();
                        else prop.active = true;
                        break;
                    case PropList.Speed://碰到加速度
                        this.Vy = this.JumpVy * 2;
                        break;
                }
            }

        }
    }

}


