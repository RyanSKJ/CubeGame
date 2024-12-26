import { _decorator, Component, Label, ScrollView, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

enum DialogueState {
    Typing, // 正在打字
    WaitingForClick, // 等待点击
    Finished // 完成对话
}

@ccclass('TypewriterEffect')
export class TypewriterEffect extends Component {
    @property(Label)
    public label: Label = null!; // 显示文字的 Label 组件

    @property(ScrollView)
    public scrollView: ScrollView = null!; // 关联的 ScrollView 组件

    @property
    public defaultTypingSpeed: number = 0.05; // 每个字符的显示时间 (秒)

    private _dialogueQueue: string[] = []; // 对话队列
    private _currentText: string = ''; // 当前显示的完整对话文本
    private _currentIndex: number = 0; // 当前显示的字符索引
    private _state: DialogueState = DialogueState.Finished; // 当前对话的状态

    private _displayedCharacters: string = ''; // 当前显示的部分字符
    private _timeElapsed: number = 0; // 累计时间，用于控制字符显示的间隔

    public startTypingQueue(dialogueQueue: string[]) {
        this._resetState(); // 重置打字机状态
        this._dialogueQueue = dialogueQueue.slice(); // 复制对话队列
        this._playNextDialogue(); // 开始播放第一个对话
    }

    private _resetState() {
        this._currentText = '';
        this._currentIndex = 0;
        this._displayedCharacters = '';
        this.label.string = ''; // 清空显示的 Label
        this._state = DialogueState.Finished; // 重置为初始状态
        this._timeElapsed = 0; // 重置时间
    }

    private _playNextDialogue() {
        if (this._dialogueQueue.length > 0) {
            this._currentText = this._dialogueQueue.shift()!;
            this._currentIndex = 0;
            this._displayedCharacters = ''; // 清空当前显示的字符
            this.label.string = ''; // 清空 Label
            this._state = DialogueState.Typing;
        } else {
            this._state = DialogueState.Finished;
            this.node.emit('dialogue-finished'); // 触发对话结束事件
        }
    }

    update(dt: number) {
        // 只有在打字状态下才进行字符显示
        if (this._state === DialogueState.Typing) {
            // 累计时间
            this._timeElapsed += dt;

            // 如果累计时间超过每个字符的显示时间，则显示下一个字符
            if (this._timeElapsed >= this.defaultTypingSpeed) {
                this._timeElapsed = 0; // 重置时间

                if (this._currentIndex < this._currentText.length) {
                    // 显示下一个字符
                    this._displayedCharacters += this._currentText[this._currentIndex];
                    this.label.string = this._displayedCharacters;
                    this._currentIndex++;
                    this._updateScrollPosition();
                }

                // 如果所有字符显示完，改变状态为等待点击
                if (this._currentIndex >= this._currentText.length) {
                    this._state = DialogueState.WaitingForClick; // 等待点击
                    this.node.emit('dialogue-finished'); // 触发对话完成事件
                }
            }
        }
    }

    private _updateScrollPosition() {
        const contentNode = this.scrollView.content!;
        const uiTransformContent = contentNode.getComponent(UITransform)!;
        const scrollViewHeight = this.scrollView.node.getComponent(UITransform)!.height;

        const labelHeight = this.label.node.getComponent(UITransform)!.height;
        uiTransformContent.height = Math.max(labelHeight, scrollViewHeight);

        this.scrollView.scrollToBottom(0.1); // 滚动到底部
    }

    public appendText(newText: string) {
        console.log("追加文本: ", newText);

        if (!newText) return;

        if (this._state === DialogueState.Typing) {
            this._finishCurrentText();
        }

        this._currentText += newText;
        this._state = DialogueState.Typing;
    }

    private _finishCurrentText() {
        this._displayedCharacters += this._currentText.slice(this._currentIndex);
        this.label.string = this._displayedCharacters;
        this._currentIndex = this._currentText.length;
        this._updateScrollPosition();
        this._state = DialogueState.WaitingForClick; // 等待点击
    }

    
    
    onDestroy() {
        // 清理所有调度的回调函数
        this.unscheduleAllCallbacks();
    

    }
}