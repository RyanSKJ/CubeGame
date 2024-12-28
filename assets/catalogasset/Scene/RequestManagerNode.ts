import { _decorator, Component, director } from 'cc';
import { RequestManager } from './RequestManager';
const { ccclass } = _decorator;

@ccclass('RequestManagerNode')
export class RequestManagerNode extends Component {
    onLoad() {
        // 确保节点在场景切换时不会被销毁
        if (!director.isPersistRootNode(this.node)) {
            director.addPersistRootNode(this.node);
            console.log('RequestManagerNode has been set as a persistent root node.');
        } else {
            console.warn('RequestManagerNode is already set as a persistent root node.');
        }

        // 初始化并启动 RequestManager 单例
        const requestManager = RequestManager.getInstance();
        if (requestManager) {
            console.log('RequestManager initialized. Starting queued requests...');
            requestManager.start(); // 恢复并处理未完成的请求
        } else {
            console.error('Failed to initialize RequestManager.');
        }
    }

    onDestroy() {
        console.log('RequestManagerNode is being destroyed.');
    }
}