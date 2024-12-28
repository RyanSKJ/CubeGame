import { _decorator, Component, Label, Node,director,assetManager} from 'cc';
import { AssetList, Global } from '../Global';
import { Main } from '../Main';
import { TopLoad } from './TopLoad';
import { TweenTool } from '../Tools/TweenTools';
import { AudioMgr } from '../Mgr/AudioMgr';
import { RequestManager } from '../../Scene/RequestManager';
const { ccclass, property } = _decorator;

@ccclass('EndBox')
/**
 * 结束弹窗
 */
export class EndBox extends Component {

    //分数
    @property(Label)
    private ScoreText: Label;
    //
    @property(Node)
    private Box: Node;
    
    protected start(): void {
        this.ScoreText.string = Math.floor(Global.ScoreNum).toString();
        TweenTool.Pop(this.Box);
    }

    
    /**
     * 点击返回首页
     */
    private ClickBackHome() {
        this.logPlayerAction('BacktoMenu');
        //Global.IsDebug && console.log('点击返回首页');
        //console.log(Global.currentLevelIndex)
        AudioMgr.instance.DestroyBgSound();
        //director.getAnimationManager().removeAllActions();
        //Main.instance.UpdateScene(AssetList.Scene.LoginScene);
        
        this.loadSceneWithCleanup("Scene");
        
        //TopLoad.instance.HidePop(AssetList.Pop.EndBox);
    }

    

    private ClickNextLevel() {
        //AudioMgr.instance.PlayButton();
        
        // 设置当前关卡索引到下一关
        Global.currentLevelIndex = Global.currentLevelIndex + 1;
        console.log(Global.currentLevelIndex)

        // 根据 NowIndex 的值判断进入哪个场景
        if (Global.currentLevelIndex >= 0 && Global.currentLevelIndex <= 4) {
            this.loadSceneWithCleanup("flip");
        } else if (Global.currentLevelIndex >= 5 && Global.currentLevelIndex <= 9) {
            this.loadSceneWithCleanup("adjust");
        } else if (Global.currentLevelIndex >= 10 && Global.currentLevelIndex <= 14) {
            this.loadSceneWithCleanup("second");
        } else if (Global.currentLevelIndex >= 15 && Global.currentLevelIndex <= 19) {
            this.loadSceneWithCleanup("choose");
        } else {
            console.error("Invalid NowIndex value:", Global.currentLevelIndex);
        }
    }
    private loadSceneWithCleanup(sceneName: string) {
        assetManager.assets.forEach((asset) => {
            if (!asset.refCount) {
                assetManager.releaseAsset(asset);
            }
        });
        director.loadScene(sceneName);        // 加载新场景
    }

    public ClickRestart() {
        Global.IsDebug && console.log('点击重新开始关卡');
        
        //AudioMgr.instance.PlayButton();
        if (Global.currentLevelIndex >= 0 && Global.currentLevelIndex <= 4) {
            this.loadSceneWithCleanup("flip");
        } else if (Global.currentLevelIndex >= 5 && Global.currentLevelIndex <= 9) {
            this.loadSceneWithCleanup("adjust");
        } else if (Global.currentLevelIndex >= 10 && Global.currentLevelIndex <= 14) {
            this.loadSceneWithCleanup("second");
        } else if (Global.currentLevelIndex >= 15 && Global.currentLevelIndex <= 19) {
            this.loadSceneWithCleanup("choose");
        } else {
            console.error("Invalid NowIndex value:", Global.currentLevelIndex);
        }
    }

    async logPlayerAction(Operation: string) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
    
        // 1️⃣ 获取 localStorage 数据
        const username = localStorage.getItem('currentUsername');
        const sessionToken = localStorage.getItem('sessionToken');
    
        if (!username || !sessionToken) {
            console.warn('❌ 错误：用户名或 Session token 未找到。');
            return;
        }
    
        // 3️⃣ 获取当前时间（北京时间，精确到毫秒）
        function padStart(value: string | number, targetLength: number, padChar: string = '0'): string {
            const str = String(value);
            return str.length >= targetLength ? str : padChar.repeat(targetLength - str.length) + str;
        }
    
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset);
        const formattedTime = `${beijingTime.getFullYear()}-${padStart(beijingTime.getMonth() + 1, 2)}-${padStart(
            beijingTime.getDate(),
            2
        )} ${padStart(beijingTime.getHours(), 2)}:${padStart(beijingTime.getMinutes(), 2)}:${padStart(
            beijingTime.getSeconds(),
            2
        )}.${padStart(beijingTime.getMilliseconds(), 3)}`;
    
        // 4️⃣ 获取当前的关卡
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不会是 undefined
    
        // 6️⃣ 组织请求数据
        const data: any = {
            tableName: 'user_operate',
            data: {
                Usr_ID: username, // 玩家ID
                Operation: Operation, // 操作类型
                Timestep: formattedTime, // 时间戳（北京时间，精确到毫秒）
                Level: level, // 当前关卡
            },
        };
    
        // 7️⃣ 使用 RequestManager 提交请求
        const manager = RequestManager.getInstance();
        manager.addRequest(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify(data),
        });
    
        console.log('✅ 玩家操作记录请求已加入队列:', data);
    }

}


