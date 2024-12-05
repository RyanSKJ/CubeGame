import { _decorator, Component, instantiate, Node, Prefab, Vec3, VerticalTextAlignment } from 'cc';
import { Global, PropList } from '../../../Global';
import { BgLoad } from '../../../BgLoad/BgLoad';
import { ElementLoad } from '../ElementLoad';
import { Step } from './Step';
const { ccclass, property } = _decorator;

@ccclass('StepLoad')
/**
 * 台阶层
 */
export class StepLoad extends Component {

    //单个台阶预设体
    @property(Prefab)
    private Step: Prefab;

    //台阶数组
    public StepArray: Node[] = [];

    //元素层
    @property(Node)
    private ElementLoad: Node;

    //起始位置
    private StarPos: Vec3 = new Vec3(0, -50);

    //台阶数量
    private StepCount: number = 10;

    //移动距离
    private MoveDistance: number = 0;
    //台阶间距
    private StepDistance: number = 100;

    //创建台阶数量
    private CreateStepNum: number = 0;
    //移动索引
    private MoveDis: number = 10;
    //消失索引
    private DisappearDis: number = 7;

    //创建金币间隔
    private CoinDis: number = 2;
    private BoomDis: number = 15;
    private SpeedDis: number = 10;

    protected start(): void {

    }

    /**
     * 台阶移动
     */
    public StepMove(_vy: number) {
        for (let step of this.StepArray) step.setPosition(step.getPosition().add(new Vec3(0, _vy)))
        BgLoad.instance.BgMove(_vy);
        //加分
        this.ElementLoad.getComponent(ElementLoad).UpdateScore(_vy / 10);

        this.MoveDistance += Math.abs(_vy);
        if (this.MoveDistance >= this.StepDistance) {
            this.MoveDistance = 0;
            //边界宽度
            let box_width: number = 750 - 166;
            let step_pos: Vec3 = new Vec3(-box_width / 2 + Math.random() * box_width, 667);
            this.GetStep(step_pos, 0, "")
        }
        //台阶消失
        for (let step of this.StepArray) {
            if (step.getPosition().y < Global.GameBottom) step.active = false;
        }
    }


    /**
     * 获取台阶
     */
    private GetStep(_pos: Vec3, _vx: number, _prop: string) {
        this.CreateStepNum++;

        if (this.CreateStepNum % this.CoinDis == 0) _prop = PropList.Coin;
        if (this.CreateStepNum % this.BoomDis == 0) { _prop = PropList.Boom; }
        // if (this.CreateStepNum % this.SpeedDis == 0) _prop = PropList.Speed;

        if (this.StepArray.length == 0) this.CreateStep(_pos, _vx, _prop);
        else {
            let use_num: number = -1;
            for (let i = 0; i < this.StepArray.length; i++)if (!this.StepArray[i].active) use_num = i;
            if (use_num == -1) this.CreateStep(_pos, _vx, _prop)
            else {
                this.StepArray[use_num].active = true;
                this.StepArray[use_num].setPosition(_pos);
                this.StepArray[use_num].getComponent(Step).UpdateStyle(this.CreateStepNum % this.MoveDis == 0, this.CreateStepNum % this.DisappearDis == 0, _prop);
            }
        }
        Global.IsDebug && console.log("台阶数组", this.StepArray.length);
    }

    protected update(dt: number): void {
        for (let step of this.StepArray) {
            step.getComponent(Step).UpdatePosition();
            step.getComponent(Step).CheckDisappear();
        }
    }

    /**
     * 创建台阶
     */
    private CreateStep(_pos: Vec3, _vx: number, _prop: string) {
        let step: Node = instantiate(this.Step);
        this.node.addChild(step);
        step.setPosition(_pos);
        step.getComponent(Step).UpdateStyle(this.CreateStepNum % this.MoveDis == 0, this.CreateStepNum % this.DisappearDis == 0, _prop);
        this.StepArray.push(step);
    }

}


