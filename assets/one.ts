import { _decorator, Component, EditBox, director, assetManager, AssetManager, Director, view, ResolutionPolicy } from 'cc';
import {Global} from './catalogasset/Script/Global'
const { ccclass, property } = _decorator;

@ccclass('LoginController')
export class LoginController extends Component {
    @property(EditBox)
    usernameInput: EditBox | null = null;

    @property(EditBox)
    passwordInput: EditBox | null = null;

    // 登录按钮点击事件
    onLoginButtonClicked() {
        const username = this.usernameInput.string;
        const password = this.passwordInput.string;

        if (!username || !password) {
            console.error("Username or password cannot be empty!");
            return;
        }

        // 调用登录函数，进行账号校验
        this.login(username, password);
    }

    onDestroy() {
        // 取消事件监听
        director.off(Director.EVENT_AFTER_SCENE_LAUNCH, this.adjustCanvasResolution, this);
    
        console.log("LoginController 已销毁，所有资源已清理。");
    }

    async login(username: string, password: string) {
        const apiUrl = 'http://124.71.181.62:3000/api/login'; // 使用环境变量配置 API 地址
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }
    
            const data = await response.json();
    
            if (data.success) {
                console.log('Login successful!');
    
                // 记录 session 或 token
                localStorage.setItem('sessionToken', data.token);
                localStorage.setItem('currentUsername', username);
                localStorage.setItem('maxLevel', String(data.maxLevel)); // 确保存储为字符串
                localStorage.setItem('isAI', String(data.AI));          // 确保存储为字符串
                localStorage.setItem('name', data.name);
    
                // 加载游戏场景
                this.loadGameScene();
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    }

    loadGameScene() {
        // 加载 "game" 资源包中的 Scene 场景
        assetManager.loadBundle("resources", (err, bundle: AssetManager.Bundle) => {
            if (err) {
                console.error('Failed to load bundle:', err);
                return;
            }
            director.loadScene("Scene");
        });

        // 使用 Director 类的静态成员访问事件常量
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.adjustCanvasResolution, this);

        // 对初始场景进行适配
        //this.adjustCanvasResolution();
    }

    adjustCanvasResolution() {
        // 设置设计分辨率和适配策略
        view.setDesignResolutionSize(720, 1280, ResolutionPolicy.FIXED_WIDTH);
    }

    start() {
        // 其他初始化代码
    }

    update(deltaTime: number) {
        // 每帧更新逻辑
    }
    private async fetchMaxLevel(): Promise<number> {
        // 假设你已经实现了获取最大等级的接口，获取 maxLevel
        try {
            const usrId = localStorage.getItem('currentUsername'); 
            const sessionToken = localStorage.getItem('sessionToken');
            const response = await fetch(`http://124.71.181.62:3000/api/getMaxLevel?Usr_ID=${usrId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`,
                }
            });
            const result = await response.json();
            if (response.ok && result.success) {
                return result.maxLevel || 0;  // 返回最大关卡级别
            } else {
                console.error('Failed to fetch maxLevel:', result.message);
                return 0;  // 如果请求失败，返回 0
            }
        } catch (err) {
            console.error('Error fetching maxLevel:', err);
            return 0;  // 如果发生错误，返回 0
        }
    }
}