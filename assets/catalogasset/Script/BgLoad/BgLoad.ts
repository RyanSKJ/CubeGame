import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgLoad')
export class BgLoad extends Component {
    //单例
    static instance: BgLoad = null;
    protected onLoad(): void {
        BgLoad.instance = this;
    }

    //背景数组
    private BgArray: Node[] = [];

    //背景高度
    private BgHeight: number = 1624;

    protected start(): void {
        this.BgArray = [
            this.node.getChildByName("bg0"),
            this.node.getChildByName("bg1"),
            this.node.getChildByName("bg2"),
        ]


        for (let i = 1; i < this.BgArray.length; i++) {
            this.BgArray[i].setPosition(this.BgArray[i - 1].getPosition().add(new Vec3(0, -this.BgHeight)))
        }
    }

    /**
     * 背景移动
     */
    public BgMove(_vy: number) {
        for (let i = 0; i < this.BgArray.length; i++) {
            let now_pos: Vec3 = this.BgArray[i].getPosition();
            let new_pos: Vec3 = now_pos.add(new Vec3(0, _vy));
            this.BgArray[i].setPosition(new_pos);
        }

        for (let i = 0; i < this.BgArray.length; i++) {
            if (this.BgArray[i].getPosition().y <= -this.BgHeight) {
                if (i == 0) {
                    this.BgArray[0].setPosition(this.BgArray[this.BgArray.length - 1].getPosition().add(new Vec3(0, this.BgHeight)));
                } else {
                    this.BgArray[i].setPosition(this.BgArray[i - 1].getPosition().add(new Vec3(0, this.BgHeight)))
                }
            }
        }
    }

}


