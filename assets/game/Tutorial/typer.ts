import { _decorator, Component, Label, Input, input, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

enum DialogueState {
    Typing,             // 正在打字
    WaitingForClick,    // 等待点击
    Finished            // 完成对话
}

@ccclass('TypewriterEffect')
export class TypewriterEffect extends Component {

    @property(Label)
    public label: Label = null!; // 对话显示的 Label 组件

    @property
    public defaultTypingSpeed: number = 0.05; // 每个字符的显示时间 (秒)

    private _dialogueQueue: string[] = []; // 对话队列
    private _currentIndex: number = 0; // 当前显示的字符索引
    private _state: DialogueState = DialogueState.Finished; // 当前对话的状态
    private _currentText: string = ''; // 当前显示的完整对话文本
    private _typingSpeed: number = this.defaultTypingSpeed; // 动态的打字速度

    onLoad() {
        input.on(Input.EventType.TOUCH_START, this._onScreenClick, this);
    }

    /**
     * 启动对话队列
     * @param dialogueQueue 对话队列
     */
    public startTypingQueue(dialogueQueue: string[]) {
        this._dialogueQueue = dialogueQueue.slice(); // 复制对话队列
        this._playNextDialogue();
    }

    private _typeText() {
        this.schedule(() => {
            if (this._currentIndex < this._currentText.length) {
                this.label.string += this._currentText[this._currentIndex]; // 逐字追加
                this._currentIndex++;
            } else {
                this.unschedule(this._typeText);
                this._state = DialogueState.WaitingForClick; // 进入等待点击状态
            }
        }, this._typingSpeed);
    }

    private _onScreenClick(event: EventTouch) {
        switch (this._state) {
            case DialogueState.Typing:
                this._finishCurrentDialogue();
                break;
            case DialogueState.WaitingForClick:
                this._playNextDialogue();
                break;
            case DialogueState.Finished:
                break;
        }
    }

    private _finishCurrentDialogue() {
        this.unschedule(this._typeText);
        this.label.string = this._currentText;
        this._state = DialogueState.WaitingForClick;
    }

    private _playNextDialogue() {
        if (this._dialogueQueue.length > 0) {
            const nextText = this._dialogueQueue.shift()!;
            this.startTyping(nextText);
        } else {
            this._state = DialogueState.Finished;
            this.node.emit('dialogue-finished'); // 触发对话结束事件
        }
    }

    public startTyping(text: string, speed: number = this.defaultTypingSpeed) {
        if (this._state === DialogueState.Typing) {
            return; 
        }

        this._state = DialogueState.Typing; 
        this._currentText = text; 
        this.label.string = ''; 
        this._currentIndex = 0; 
        this._typingSpeed = speed; 
        this.unscheduleAllCallbacks(); 
        this._typeText(); 
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this._onScreenClick, this);
    }
}