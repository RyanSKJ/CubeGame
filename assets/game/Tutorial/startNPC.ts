import { _decorator, Component, Label, Button, tween, Node, Vec3 } from 'cc';
import { TypewriterEffect } from './typer';
import { Global } from '../../catalogasset/Script/Global'; // 引入 Global 文件
const { ccclass, property } = _decorator;

@ccclass('SceneController')
export class SceneController extends Component {

    @property(Node)
    public targetNode: Node | null = null; // 对话或引导的父节点

    @property(TypewriterEffect)
    public typewriterEffect: TypewriterEffect | null = null; // 打字机组件

    @property
    public dialogueText: string[] = ['欢迎来到立方体的世界\n我是你的小伙伴Cube\n我会陪伴你闯过重重关卡\n你准备好了吗！']; // 动态控制对话文本


    onLoad() {

    }

    start() {

                this._showNodeWithAnimation(this.targetNode, () => {
                    this._startNPCJumpAnimation();
                    if (this.typewriterEffect) {
                        // 启动打字机效果
                        this.typewriterEffect.startTypingQueue(this.dialogueText);
                    }
                })


    }



    /**
     * 显示目标节点并添加放大动画
     */
    private _showNodeWithAnimation(node: Node, onComplete?: Function) {
        node.active = true;
        node.setScale(new Vec3(1, 1, 1)); // 初始缩放为 0
        tween(node)
            .to(0.5, { scale: new Vec3(2, 2, 2) }, { easing: 'backOut' })
            .call(() => {
                if (onComplete) onComplete();
            })
            .start();
    }
    private _startNPCJumpAnimation() {
        if (!this.targetNode) return;

        tween(this.targetNode)
            .repeatForever(
                tween()
                    .by(0.5, { position: new Vec3(0, 20, 0) }, { easing: 'sineInOut' })
                    .by(0.5, { position: new Vec3(0, -20, 0) }, { easing: 'sineInOut' })
            )
            .start();
    }
    
}