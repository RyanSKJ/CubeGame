import { _decorator, Component, Label } from 'cc';
import { RequestManager } from './RequestManager';
const { ccclass, property } = _decorator;

@ccclass('RequestQueueDisplay')
export class RequestQueueDisplay extends Component {
    @property(Label)
    requestCountLabel = null; // 用于显示剩余请求数的 Label

    start() {
        // 监听队列更新事件
        RequestManager.eventTarget.on('queueUpdate', this.updateRequestCount, this);

        // 初始化显示当前的请求数量
        const currentCount = RequestManager.getInstance().requestQueue.length;
        this.updateRequestCount(currentCount);
    }

    // 更新请求数量显示
    updateRequestCount(count) {
        if (this.requestCountLabel) {
            this.requestCountLabel.string = `数据待上传：${count}`;
        }
    }

    onDestroy() {
        // 移除事件监听器
        RequestManager.eventTarget.off('queueUpdate', this.updateRequestCount, this);
    }
}