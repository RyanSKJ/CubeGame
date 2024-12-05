import { _decorator, Component, Collider, ICollisionEvent,director,Canvas,Camera,Prefab,Node,UITransform,view,instantiate,Layers } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollisionHandler')
export class CollisionHandler extends Component {
    @property(Prefab)
    public uiPrefab: Prefab = null; // 需要渲染的UI-2D预制体

    onLoad() {
        // 获取当前节点的 Collider 组件
        const collider = this.getComponent(Collider);
        if (collider) {
            // 监听碰撞开始事件
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            // 监听碰撞持续事件（可选）

        }
    }

    onDestroy() {
        this.unscheduleAllCallbacks();
    }
    
    onTriggerEnter(event: ICollisionEvent) {
        // 发生碰撞时触发
        console.log('Collision detected with: ', event.otherCollider.node.name);
    
        if (event.otherCollider.node.name === 'lumbermill') {
            // 暂停整个游戏逻辑
            //director.pause();
    
            const scene = director.getScene();
            if (scene) {
                console.log("当前场景获取成功");
    
                // 关闭主相机
                const mainCameraNode = scene.getChildByName('Main Camera');
                if (mainCameraNode) {
                    mainCameraNode.active = false; // 停止主相机渲染
                    console.log("主相机已关闭");
                } else {
                    console.warn("未找到主相机节点");
                }
    
                // 获取当前场景中的 Canvas 节点
                const canvasNode = scene.getChildByName('Canvas');
                if (canvasNode) {
                    // 检查 UI Prefab 是否存在
                    if (!this.uiPrefab) {
                        console.error("UI 预制体未初始化");
                        return;
                    }
    
                    // 实例化并渲染 UI-2D 预制体
                    const uiInstance = instantiate(this.uiPrefab);
    
                    // 将 UI 预制体设为 Canvas 的子节点，并放在最顶层
                    uiInstance.setParent(canvasNode);
                    uiInstance.setPosition(0, 0, 0); // 设置位置
    
                    // 确保 UI 预制体在 Canvas 的最顶层
                    uiInstance.setSiblingIndex(canvasNode.children.length - 1);
    
                    console.log("UI 预制体已加载并显示");
                } else {
                    console.error("Canvas not found in the current scene!");
                }
            } else {
                console.error("无法获取当前场景");
            }
        }
    }

}