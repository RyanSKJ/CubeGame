import { _decorator, Component, Label, Node, Button,tween, Vec3 } from 'cc';
import { TypewriterEffect } from './typer';
import { Global } from '../../catalogasset/Script/Global'; // 引入 Global 文件

const { ccclass, property } = _decorator;

@ccclass('SceneController')
export class SceneController extends Component {

    @property(Node)
    public targetNode: Node = null!;
    @property(Button)
        public Easy: Button | null = null; // "我知道了" 按钮
    @property(Button)
        public Difficult: Button | null = null; // "我知道了" 按钮
        @property(Button)
        public noAI: Button | null = null; // "我知道了" 按钮

    @property(TypewriterEffect)
    public typewriterEffect: TypewriterEffect = null!;


    onLoad() {
        // 初始化时隐藏节点
        this.targetNode.active = false;
        this.targetNode.setScale(new Vec3(0, 0, 0)); // 初始缩放为 0，隐藏状态
    }

    start() {
        // 动态生成对话内容并显示缩放动画
        this._showNodeWithScaleAnimation(this.targetNode, () => {
            this._startTypewriterEffect();
        });
    }

    
    

    /**
     * 使用缩放动画显示节点
     */
    private _showNodeWithScaleAnimation(node: Node, onComplete?: Function) {
        
        node.setScale(new Vec3(1, 1, 1)); // 设置初始缩放为 0

        // 使用 tween 动画将节点从 0 缩放到正常大小
        tween(node)
            .to(0.5, { scale: new Vec3(2, 2, 2) }, { easing: 'backOut' }) // 缩放动画，时长 0.5 秒
            .call(() => {
                if (onComplete) onComplete(); // 动画完成后执行回调
            })
            .start();
    }

    /**
     * 开始显示动态生成的对话内容
     */
    private _startTypewriterEffect() {
        if (!this.typewriterEffect) {
            console.error('TypewriterEffect 组件未绑定！');
            return;
        }

        // 动态生成对话内容
        const currentLevel = Global.currentLevelIndex;
        if(localStorage.getItem('isAI')) {
            const dialogueText = `恭喜你通过了第 ${currentLevel + 1} 关卡，你觉得通过这个关卡还算轻松吗？`;


        // 如果需要使用打字机效果，传递对话
        this.typewriterEffect.startTypingQueue([dialogueText]);
        this.typewriterEffect.node.once('dialogue-finished', this._showIKnowButton, this);
        } else{
            const dialogueText = `恭喜你通过了第 ${currentLevel + 1} 关卡！`;


        // 如果需要使用打字机效果，传递对话
        this.typewriterEffect.startTypingQueue([dialogueText]);
        this.typewriterEffect.node.once('dialogue-finished', this._showIKnowButton2, this);
        }
        
    }
    private _showIKnowButton() {

        // 显示按钮
        this.Easy.node.active = true;
        this.Easy.node.setScale(new Vec3(0, 0, 0)); // 初始缩放为 0
        tween(this.Easy.node)
            .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();
        this.Difficult.node.active = true;
        this.Difficult.node.setScale(new Vec3(0, 0, 0)); // 初始缩放为 0
            tween(this.Difficult.node)
                .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
                .start();

    }
    private _showIKnowButton2() {

        // 显示按钮
        this.noAI.node.active = true;
        this.noAI.node.setScale(new Vec3(0, 0, 0)); // 初始缩放为 0
        tween(this.noAI.node)
            .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();

    }

    /**
     * 对话结束后的逻辑
     */
    private _onDialogueFinished() {
        console.log('对话完成，开始执行其他逻辑！');
    }

    
}