import { _decorator, Component, Label, Node, tween, Vec3 } from 'cc';
import { TypewriterEffect } from './typer';
import { Global } from '../../catalogasset/Script/Global'; // 引入 Global 文件

const { ccclass, property } = _decorator;

@ccclass('SceneController')
export class SceneController extends Component {

    @property(Node)
    public targetNode: Node = null!;

    @property(TypewriterEffect)
    public typewriterEffect: TypewriterEffect = null!;

    @property
    public dialogueText: string[] = []; // 动态控制 dialogueText

    // 预定义多个对话文本
    private dialogues: { [key: number]: string[] } = {
        0: [
            "你好，勇者！\n欢迎来到这个世界！",
            "滑动屏幕移动立方体\n使得按钮重叠\n救出小房子吧！"
        ],
        5: [
            "我们又见面啦！\n这是全新的挑战！",
            "滑动屏幕旋转立方体\n点击下降释放立方体！",
            "让方块都穿过洞口\n获得小金币吧！"
        ],
        10: [
            "恭喜你来到新世界！\n本关你需要移动箱子",
            "结合魔方的旋转\n使得箱子回到家中！"
        ],
        15: ["又见面了！\n你可以移动视角\n连续点击三个相同的立方体\n消除它们吧！",
        ]
    };

    onLoad() {
        this.targetNode.active = false;
        this.targetNode.setScale(new Vec3(0, 0, 0)); 
    }

    start() {
        // 根据 Global.index 获取对应的 dialogueText
        this._setDialogueTextBasedOnIndex();

        this.scheduleOnce(() => {
            this._showNodeWithFadeIn(this.targetNode, () => {
                this._startTypewriterEffect();
            });
        }, 1);
    }

    /**
     * 动态设置 dialogueText
     */
    private _setDialogueTextBasedOnIndex() {
        const currentIndex = Global.currentLevelIndex;
        if (this.dialogues[currentIndex]) {
            this.dialogueText = this.dialogues[currentIndex]; // 根据 index 动态设置 dialogueText
            console.log(`当前对话内容为:`, this.dialogueText);
        } else {
            console.warn(`未找到与 index = ${currentIndex} 对应的对话内容！`);
        }
    }

    private _showNodeWithFadeIn(node: Node, onComplete?: Function) {
        node.active = true;
        node.setScale(new Vec3(1, 1, 1));
        tween(node)
            .to(0.5, { scale: new Vec3(2, 2, 2) }, { easing: 'backOut' })
            .call(() => {
                if (onComplete) onComplete();
            })
            .start();
    }

    private _startTypewriterEffect() {
        if (!this.typewriterEffect) {
            console.error('TypewriterEffect 组件未绑定！');
            return;
        }
        this.typewriterEffect.node.on('dialogue-finished', this._onDialogueFinished, this);
        this.typewriterEffect.startTypingQueue(this.dialogueText);
    }

    private _onDialogueFinished() {
        console.log('对话完成，开始执行其他逻辑！');
    }

    onDestroy() {
        // 取消事件监听，防止内存泄露
        if (this.typewriterEffect && this.typewriterEffect.node) {
            this.typewriterEffect.node.off('dialogue-finished', this._onDialogueFinished, this);
        }
    }
}