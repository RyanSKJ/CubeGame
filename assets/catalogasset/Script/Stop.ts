import { _decorator, Component, Node, director, systemEvent, SystemEvent, EventMouse } from 'cc';
import { RotateAndMoveCubeOnKey } from '../../game/selfresources/Cubeflip'; // 引入 RotateAndMoveCubeOnKey 的脚本
import { Global } from '../../catalogasset/Script/Global'
const { ccclass, property } = _decorator;

@ccclass('PauseHandler')
export class PauseHandler extends Component {

    @property(Node)
    pauseMenu: Node = null;

    @property(Node)
    mainCamera: Node = null;

    //@property(Node)
    //cubeNode: Node = null; // 将控制计时的 Cube 节点拖到此处

    private isPaused: boolean = false;

    start(){
        this.logPlayerAction('StartGame');
    }

    onPauseGame() {
        // 暂停游戏
        director.getScheduler().setTimeScale(0);
        this.logPlayerAction('PauseGame');
        this.isPaused = true;

        console.log("Game paused");

        if (this.pauseMenu) {
            this.pauseMenu.active = true;
        }

        if (this.mainCamera) {
            this.mainCamera.active = false;
        }



        // 暂停全局点击事件监听
        systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.globalClickHandler, this);
    }

    onResumeGame() {
        // 恢复游戏
        director.getScheduler().setTimeScale(1);
        this.isPaused = false;
        this.logPlayerAction('ResumeGame');

        console.log("Game resumed");

        if (this.pauseMenu) {
            this.pauseMenu.active = false;
        }

        if (this.mainCamera) {
            this.mainCamera.active = true;
        }



        // 恢复全局点击事件监听
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.globalClickHandler, this);
    }

    globalClickHandler(event: EventMouse) {
        if (this.isPaused) {
            console.log("Game is paused, ignoring global clicks.");
            return;
        }
        // 处理全局点击事件逻辑...
    }
    async logPlayerAction(
        Operation: string,
    ) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
    
        // 1️⃣ 获取 localStorage 数据
        const username = localStorage.getItem('currentUsername');
        const sessionToken = localStorage.getItem('sessionToken');
    
    
        // 3️⃣ 获取当前时间（北京时间，精确到毫秒）
        function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
            const str = String(value);
            return str.length >= targetLength ? str : padChar.repeat(targetLength - str.length) + str;
        }
    
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset);
        const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(beijingTime.getDate(), 2)} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(beijingTime.getSeconds(), 2)}.${padStart(beijingTime.getMilliseconds(), 3)}`;
    
        // 4️⃣ 获取当前的关卡
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不会是 undefined
    
    
        // 6️⃣ 组织请求数据
        const data: any = {
            tableName: 'user_operate',
            data: {
                Usr_ID: username,          // 玩家ID
                Operation: Operation,      // 操作类型
                Timestep: formattedTime,   // 时间戳（北京时间，精确到毫秒）
                Level: level,              // 当前关卡
            },
        };
    
        // 7️⃣ 发送请求
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionToken}`,
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error('❌ 错误：无法记录玩家操作');
            }
    
            const result = await response.json();
            console.log('✅ 玩家操作记录成功：', result);
        } catch (error) {
            console.error('❌ 记录玩家操作时发生错误：', error);
        }
    }
}