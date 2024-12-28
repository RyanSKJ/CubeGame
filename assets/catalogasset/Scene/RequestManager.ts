import { _decorator, Component, EventTarget } from 'cc';
const { ccclass } = _decorator;

@ccclass('RequestManager')
export class RequestManager extends Component {
    static instance = null;
    requestQueue: Array<{ id: number; apiUrl: string; options: any; delay: number }> = [];
    isProcessing = false;

    // 添加事件目标用于广播队列变化
    static eventTarget = new EventTarget();

    static getInstance() {
        if (!RequestManager.instance) {
            RequestManager.instance = new RequestManager();
        }
        return RequestManager.instance;
    }

    // 初始化 IndexedDB
    async initDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('RequestManagerDB', 1);
            request.onupgradeneeded = function () {
                const db = request.result;
                if (!db.objectStoreNames.contains('requestQueue')) {
                    db.createObjectStore('requestQueue', { keyPath: 'id', autoIncrement: true });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = (err) => reject(err);
        });
    }

    // 加载未完成的请求队列
    async loadQueueFromIndexedDB() {
        const db = await this.initDB();
        return new Promise<void>((resolve, reject) => {
            const tx = db.transaction('requestQueue', 'readonly');
            const store = tx.objectStore('requestQueue');
            const request = store.getAll();
            request.onsuccess = () => {
                this.requestQueue = request.result || [];
                this.notifyQueueUpdate();
                resolve();
            };
            request.onerror = (err) => reject(err);
        });
    }

    // 保存队列到 IndexedDB
    async saveQueueToIndexedDB() {
        const db = await this.initDB();
        return new Promise<void>((resolve, reject) => {
            const tx = db.transaction('requestQueue', 'readwrite');
            const store = tx.objectStore('requestQueue');
            store.clear(); // 清空旧的队列
            for (const request of this.requestQueue) {
                store.add(request);
            }
            tx.oncomplete = () => resolve();
            tx.onerror = (err) => reject(err);
        });
    }

    // 添加请求到队列
    addRequest(apiUrl: string, options: any, delay = 500) {
        const request = { id: Date.now(), apiUrl, options, delay };
        this.requestQueue.push(request);
        this.saveQueueToIndexedDB(); // 保存队列到 IndexedDB
        this.notifyQueueUpdate(); // 通知队列更新
        this.processQueue(); // 开始处理队列
    }

    // 处理请求队列
    async processQueue() {
        if (this.isProcessing || this.requestQueue.length === 0) return;
        this.isProcessing = true;

        while (this.requestQueue.length > 0) {
            const { id, apiUrl, options, delay } = this.requestQueue[0];
            try {
                await this.fetchUntilSuccess(apiUrl, options, delay);
                console.log('Request succeeded:', apiUrl);
                this.requestQueue.shift(); // 成功后移除请求
                await this.saveQueueToIndexedDB(); // 更新持久化队列
                this.notifyQueueUpdate(); // 通知队列更新
            } catch (error) {
                console.error('Unexpected error:', error.message);
                break; // 暂停处理，等待下一次触发
            }
        }

        this.isProcessing = false;
    }

    // 不断尝试请求直到成功
    async fetchUntilSuccess(apiUrl: string, options: any, delay = 500) {
        while (true) {
            try {
                const response = await fetch(apiUrl, options);
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
                return await response.json(); // 请求成功返回结果
            } catch (error) {
                console.warn(`Request failed, retrying... Error: ${error.message}`);
                await new Promise((resolve) => setTimeout(resolve, delay)); // 等待后重试
            }
        }
    }

    // 通知队列更新
    notifyQueueUpdate() {
        RequestManager.eventTarget.emit('queueUpdate', this.requestQueue.length);
    }

    // 页面加载时调用，恢复队列并开始处理
    async start() {
        console.log('RequestManager initialized');
        await this.loadQueueFromIndexedDB(); // 恢复未完成的请求
        this.processQueue(); // 继续处理队列
    }
}