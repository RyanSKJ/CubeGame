import { _decorator, Component, EditBox, director, assetManager, AssetManager, Director, view, ResolutionPolicy } from 'cc';
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

    async login(username: string, password: string) {
        const apiUrl = 'http://124.71.181.62:3000/api/login'; // 替换为API服务器地址

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            //console.log(data)

            if (data.success) {
                console.log('Login successful!');
                
                // 记录session或token
                localStorage.setItem('sessionToken', data.token); // 假设服务器返回token作为session标识
                localStorage.setItem('currentUsername', username);

                // 登录成功后加载游戏场景
                this.loadGameScene();
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
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
}