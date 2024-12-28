import { _decorator, Component, Collider, ICollisionEvent,Button, director,Canvas,Camera,Prefab,Node,UITransform,view,instantiate,Layers, renderer } from 'cc';
import {Global} from '../../catalogasset/Script/Global'
import {RequestManager} from '../../catalogasset/Scene/RequestManager'
const { ccclass, property } = _decorator;

@ccclass('CollisionHandler')
export class CollisionHandler extends Component {
    @property(Prefab)
    public uiPrefab: Prefab = null; // 需要渲染的UI-2D预制体

    @property(Node)
    public targetNode: Node = null; // 目标节点，在编辑器中选择

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
    private _setupIKnowButtonListener() {
            const iKnowButtonNode = this.targetNode.getChildByName("Finish"); // 假设按钮名称是 "IKnowButton"
            if (!iKnowButtonNode) {
                ////console.error("IKnowButton node not found!");
                return;
            }
        
            const iKnowButton = iKnowButtonNode.getComponent(Button);
            if (!iKnowButton) {
                ////console.error("Button component not found on IKnowButton node!");
                return;
            }
        
            // 添加点击事件监听
            iKnowButton.node.on('click', () => {
                ////console.log("User clicked '我知道了', continuing to render prefabs");
        
                // 隐藏目标 Node
                this.targetNode.active = false;
        
                // 渲染 Prefab
                this._renderFinalPrefab();
            }, this);
        }

        private _renderFinalPrefab() {
            const scene = director.getScene();
            if (scene) {
                ////console.log("当前场景获取成功");
    
                // 关闭主相机
                const mainCameraNode = scene.getChildByName('Main Camera');
                if (mainCameraNode) {
                    mainCameraNode.active = false; // 停止主相机渲染
                    ////console.log("主相机已关闭");
                } else {
                    ////console.warn("未找到主相机节点");
                }
    
                // 获取当前场景中的 Canvas 节点
                const canvasNode = scene.getChildByName('Canvas');
                if (canvasNode) {
                    // 检查 UI Prefab 是否存在
                    if (!this.uiPrefab) {
                        ////console.error("UI 预制体未初始化");
                        return;
                    }
    
                    // 实例化并渲染 UI-2D 预制体
                    const uiInstance = instantiate(this.uiPrefab);
    
                    // 将 UI 预制体设为 Canvas 的子节点，并放在最顶层
                    uiInstance.setParent(canvasNode);
                    uiInstance.setPosition(0, 0, 0); // 设置位置
                    uiInstance.setScale(2,2,2);
    
                    // 确保 UI 预制体在 Canvas 的最顶层
                    uiInstance.setSiblingIndex(canvasNode.children.length - 1);
    
                    ////console.log("UI 预制体已加载并显示");
                } else {
                    ////console.error("Canvas not found in the current scene!");
                }
            } else {
                ////console.error("无法获取当前场景");
            }
        
    }

    async updateMaxLevel(newMaxLevel) {
        const apiUrl = 'http://124.71.181.62:3000/api/updateMaxLevel'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从 localStorage 中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从 localStorage 中获取 token
    
        if (!username || !sessionToken) {
            console.warn('No username or sessionToken found.');
            return;
        }
    
        // 准备发送的数据
        const data = {
            username,
            maxLevel: newMaxLevel, // 新的 maxLevel
        };
    
        // 使用 RequestManager 提交请求
        const manager = RequestManager.getInstance();
        manager.addRequest(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
    
        console.log('✅ MaxLevel update request has been added to the queue:', data);
    }
    
    onTriggerEnter(event: ICollisionEvent) {
        // 发生碰撞时触发

        ////console.log('Collision detected with: ', event.otherCollider.node.name);
    
        if (event.otherCollider.node.name === 'lumbermill') {
            if (parseInt(localStorage.getItem('maxLevel'), 10) < Global.currentLevelIndex + 1) {
                  localStorage.setItem('maxLevel',(Global.currentLevelIndex + 1).toString())
                }
                this.updateMaxLevel(Global.currentLevelIndex + 1);
            // 暂停整个游戏逻辑
            //director.pause();
            this.logUserAction();
            // 确保目标 Node 激活，并设置为顶层
            if (this.targetNode) {
                this.targetNode.active = true;
                this.targetNode.setSiblingIndex(this.targetNode.parent.children.length - 1); // 设置为顶层
                ////console.log(`Node "${this.targetNode.name}" has been activated and moved to the top layer.`);

                // 等待用户点击“我知道了”按钮
                this._setupIKnowButtonListener();
            } else {
                ////console.error("Target node is not set!");
            }
    
        }
    }
    async logUserAction() {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不为 undefined
    
        if (!username || !sessionToken) {
            console.warn('No username or sessionToken found.');
            return;
        }
    
        // 获取当前时间的北京时间
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').slice(0, 23); // 格式化为 "YYYY-MM-DD HH:mm:ss"
    
        // 准备发送的数据
        const data = {
            tableName: 'user_pass', // 表名
            data: {
                Usr_ID: username,
                Level: level,
                Timestep: beijingTime, // 使用北京时间
            },
        };
    
        // 使用 RequestManager 提交请求
        const manager = RequestManager.getInstance();
        manager.addRequest(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
    
        console.log('✅ User action request has been added to the queue:', data);
    }

}