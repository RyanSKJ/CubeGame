import { _decorator, Component, easing, ModelRenderer, Node, tween, UIOpacity, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TweenTool')
/**
 * 缓动工具
 */
export class TweenTool extends Component {

    /**
     * 屏幕爆炸特效
     * @param 场景
     * @param 回调函数
     */
    static ScreenBoom(_node: Node, _cb: Function) {
        let tween_time: number = 0.1;
        let angle_num: number = 10;
        let scale_num: number = 1.2;

        tween(_node).
            to(tween_time, {
                scale: new Vec3(scale_num, scale_num, scale_num),
                angle: angle_num,
            }).
            to(tween_time, {
                scale: new Vec3(1, 1, 1),
                angle: 0,
            }).
            to(tween_time, {
                scale: new Vec3(scale_num, scale_num, scale_num),
                angle: -angle_num,
            }).
            to(tween_time, {
                scale: new Vec3(1, 1, 1),
                angle: 0,
            }).call(() => {
                _cb && _cb();
            }).start()
    }

    /**
     * 弹窗缓动
     * @param 场景
     * @param 回调函数
     */
    static Pop(_node: Node, _cb: Function = null) {
        let tween_time: number = 0.3;
        let scale_num: number = 1;

        tween(_node).
            tag(1).
            set({ scale: new Vec3(0, 0, 0) }).
            to(tween_time, {
                scale: new Vec3(scale_num, scale_num, scale_num),
            }, {
                easing: easing.backOut
            }).call(() => {
                _cb && _cb();
            }).start()
    }

    /**
     * 场景移动
     * @param 场景
     * @param 回调函数
     */
    static SceneMove(_node: Node, _startpos: Vec3, _endpos: Vec3, _cb: Function = null) {
        let tween_time: number = 0.3;

        tween(_node).
            set({ position: _startpos }).
            to(tween_time, {
                position: _endpos
            }, {
                easing: easing.backOut
            }).call(() => {
                _cb && _cb();
            }).start()
    }

    /**
     * 场景移动
     * @param 场景
     * @param 回调函数
     */
    static SceneMove1(_node: Node, _startpos: Vec3, _endpos: Vec3, _cb: Function = null) {
        let tween_time: number = 0.3;

        tween(_node).
            set({ position: _startpos }).
            to(tween_time, {
                position: _endpos
            }, {
                easing: easing.backIn
            }).call(() => {
                _cb && _cb();
            }).start()
    }


    /**
     * 猫咪出现
     * @param 猫咪
     * @param 回调函数
     */
    static CatAppear(_cat: Node, _cb: Function = null) {
        let tween_time: number = 0.3;

        let start_pos: Vec3 = _cat.getPosition().add(new Vec3(0, -150, 0));
        let end_pos: Vec3 = _cat.getPosition();

        tween(_cat).
            set({ position: start_pos }).
            to(tween_time, {
                position: end_pos
            }, {
                easing: easing.backOut
            }).call(() => {
                _cb && _cb();
            }).start()
    }

    /**
    * 猫咪隐藏
    * @param 猫咪
    * @param 回调函数
    */
    static CatDisplay(_cat: Node, _cb: Function = null) {
        let tween_time: number = 0.3;

        let start_pos: Vec3 = _cat.getPosition().add(new Vec3(0, -150, 0));
        let end_pos: Vec3 = _cat.getPosition();

        tween(_cat).
            set({ position: end_pos }).
            to(tween_time, {
                position: start_pos
            }, {
                easing: easing.backIn
            }).call(() => {
                _cb && _cb();
            }).start()
    }

    /**
     * 金币出现提示(金币是透明度的)
     * @param 金币
     */
    static CoinAppear(_coin: Node, _cb: Function) {
        let tween_time: number = 1;

        let coin_pos: Vec3 = _coin.getPosition();
        let move_pos: Vec3 = coin_pos.add(new Vec3(0, 50, 0));

        _coin.getComponent(UIOpacity).opacity = 255;

        tween(_coin).to(
            tween_time,
            {
                position: move_pos,
            },
            {
                easing: easing.backOut,
                onUpdate: (_target: Node, _ratio: number) => {
                    _coin.getComponent(UIOpacity).opacity = 225 - _ratio * 225;
                },
                onComplete: (_target: Node) => {
                    _target.active = false;
                    _cb && _cb();
                }
            }
        ).start();

    }



}


