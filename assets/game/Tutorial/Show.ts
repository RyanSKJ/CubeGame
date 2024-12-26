import { _decorator, Component, Label, Button, tween, Node, Vec3 } from 'cc';
import { TypewriterEffect } from './typer';
import { Global } from '../../catalogasset/Script/Global'; // 引入 Global 文件
const { ccclass, property } = _decorator;

@ccclass('SceneController')
export class SceneController extends Component {
    @property(Button)
    public iKnowButton: Button | null = null; // "我知道了" 按钮

    @property(Node)
    public targetNode: Node | null = null; // 对话或引导的父节点

    @property(TypewriterEffect)
    public typewriterEffect: TypewriterEffect | null = null; // 打字机组件

    @property
    public dialogueText: string[] = []; // 动态控制对话文本

    private dialogues: { [key: number]: string[] } = {
        0: ["你好，勇者！\n欢迎来到这个世界！\n在这类关卡中\n你需要滑动屏幕翻滚方块\n使得立方体上的按钮与棋盘上的按钮重合\n救出小房子吧！"],
        5: ["我们又见面啦！\n这是全新的挑战！\n旋转并释放立方体\n使得所有立方体穿越下面的孔洞吧！"],
        10: ["恭喜你突破了重重关卡！\n在这个世界里\n你需要移动箱子，旋转魔方\n使其顺利回到家中！"],
        15: ["你真厉害！\n这是最后的挑战了\n点击三个相同的立方体消除它们吧！\n如果感到困难\n可以利用旁边的工具给立方体上色哦！"],
    };

    onLoad() {
        //this.node.active = false;
        // 确保 "我知道了" 按钮初始隐藏
        if (this.iKnowButton) {
            this.iKnowButton.node.active = false;
        }
        this.targetNode.active = false;

    }



    start() {
        const currentIndex = Global.currentLevelIndex; // 假设当前关卡索引从 Global 获取
        if (this.dialogues[currentIndex]) {
            this.targetNode.active = true;
            this.dialogueText = this.dialogues[currentIndex];
            // 展示对话框并启动打字机效果
            if (this.targetNode) {
                this._showNodeWithAnimation(this.targetNode, () => {
                    if (this.typewriterEffect) {
                        // 启动打字机效果
                        this.typewriterEffect.startTypingQueue(this.dialogueText);

                        // 在打字机完成后显示按钮
                        this.typewriterEffect.node.once('dialogue-finished', this._showIKnowButton, this);
                    }
                });
            }
        } else {
        }


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

    /**
     * 显示 "我知道了" 按钮并绑定事件
     */
    private _showIKnowButton() {
        if (!this.iKnowButton) {
            console.error('iKnowButton 未绑定！');
            return;
        }

        // 显示按钮
        this.iKnowButton.node.active = true;
        this.iKnowButton.node.setScale(new Vec3(0, 0, 0)); // 初始缩放为 0
        tween(this.iKnowButton.node)
            .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();

        // 绑定按钮点击事件
        this.iKnowButton.node.on('click', this._onIKnowButtonClicked, this);
    }

    /**
     * "我知道了" 按钮点击事件
     */
    private _onIKnowButtonClicked() {
        console.log("用户点击了 '我知道了' 按钮，隐藏引导节点。");

        // 隐藏整个对话节点
        if (this.targetNode) {
            this._hideNodeWithAnimation(this.targetNode, () => {
                console.log("引导结束！");
            });
        }

        // 隐藏按钮本身
        if (this.iKnowButton) {
            this._hideNodeWithAnimation(this.iKnowButton.node);
        }
    }

    /**
     * 隐藏节点并添加缩小动画
     */
    private _hideNodeWithAnimation(node: Node, onComplete?: Function) {
        tween(node)
            .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' })
            .call(() => {
                node.active = false; // 动画完成后隐藏节点
                if (onComplete) onComplete();
            })
            .start();
    }
}