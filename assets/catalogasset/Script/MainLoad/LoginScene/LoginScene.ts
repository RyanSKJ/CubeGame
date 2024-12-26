import { _decorator, Component, Label, Node, Camera, director } from 'cc';
import { AssetList, Global } from '../../Global';
import { AudioMgr } from '../../Mgr/AudioMgr';
import { Main } from '../../Main';
import { LocalMgr } from '../../Mgr/LocalMgr';
import { TopLoad } from '../../TopLoad/TopLoad';
import { ShopBox } from '../../TopLoad/ShopBox/ShopBox';
const { ccclass, property } = _decorator;

@ccclass('LoginScene')
/**
 * 游戏首页
 */
export class LoginScene extends Component {

    //分数
    @property(Label)
    private ScoreText: Label;

    //金币数量
    @property(Label)
    private CoinText: Label;
    //音效按钮
    @property(Node)
    private SoundButton: Node | null = null;


    protected start(): void {
        this.UpdateBest();
    }

    /**
     * 开始游戏
     */
    private StartClick() {
        Global.IsDebug && console.log("开始游戏");
        //AudioMgr.instance.PlayButton();
        Main.instance.UpdateScene(AssetList.Scene.GameScene);
    }

    

    /**
     * 更新最好数据
     */
    private UpdateBest() {
        Global.IsDebug && console.log("本地信息", LocalMgr.instance.GetInfo())
        this.ScoreText.string = `${parseInt(localStorage.getItem('maxLevel'), 10) -1}`;
        this.CoinText.string = LocalMgr.instance.GetInfo().coin.toString();
    }

    /**
     * 点击选择按钮
     */
    private ChooseClick() {
        //AudioMgr.instance.PlayButton();

        let shopbox: Node = TopLoad.instance.AddPop(AssetList.Pop.ShopBox);
        shopbox.getComponent(ShopBox).Cb = this.UpdateBest.bind(this);
        //this.checkAllCameras();

    }
    private async NoClick() {
        //AudioMgr.instance.PlayButton();
        //this.checkAllCameras();
        let Nobox: Node = TopLoad.instance.AddPop(AssetList.Pop.Nobox);
        //Nobox.getComponent(ShopBox).Cb = this.UpdateBest.bind(this);
        const leaderboardData = await this.fetchLeaderboardData();
        if (leaderboardData) {
            this.updateLeaderboardUI(Nobox, leaderboardData);
        }

    }
    private checkAllCameras() {
        // 获取当前场景中的根节点
        const rootNode = this.node.scene;

        // 递归查找所有节点中的Camera组件
        this.findCamerasInNode(rootNode);
    }

    private findCamerasInNode(node: Node) {
        // 检查当前节点是否有Camera组件
        const cameraComponent = node.getComponent(Camera);
        if (cameraComponent && node.name === 'MainCamera') {
            // 找到MainCamera并将其关闭
            node.active = false;
            console.log(`MainCamera has been deactivated.`);
            return;  // 找到并关闭后可以直接返回，不再继续查找
        }

        // 递归检查子节点
        node.children.forEach(child => {
            this.findCamerasInNode(child);
        });
    }

    /**
     * 点击音效
     */
    private SoundClick() {
        Global.IsDebug && console.log("点击播放音效");
        AudioMgr.instance.PlayButton();
        if (AudioMgr.instance.IsMute) {
            AudioMgr.instance.PlayBgSound("bgsound");
        } else {
            AudioMgr.instance.StopBgSound();
        }

        this.SoundButton.getChildByName("MuteButton").active = AudioMgr.instance.IsMute;
    }

    private async fetchLeaderboardData(): Promise<Array<{ Usr_ID: string; maxLevel: number; timestep: string }> | null> {
        const apiUrl = 'http://124.71.181.62:3000/api/getTopPlayers?limit=3'; // 替换为你的API地址
        const sessionToken = localStorage.getItem('sessionToken');

        if (!sessionToken) {
            console.error('❌ Session token 未找到。请确保玩家已正确认证。');
            return null;
        }

        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('❌ 错误：无法获取排行榜数据');
            }

            const result = await response.json();

            if (result.success) {
                console.log('✅ 排行榜数据加载成功：', result.topPlayers);
                return result.topPlayers;
            } else {
                console.error('❌ 无法加载排行榜数据：', result.message);
                return null;
            }
        } catch (error) {
            console.error('❌ 获取排行榜数据时发生错误：', error);
            return null;
        }
    }

    private updateLeaderboardUI(leaderboardNode: Node, data: Array<{ Usr_ID: string; maxLevel: number; timestep: string }>) {
        // 首先找到 Box 节点
        const boxNode = leaderboardNode.getChildByName('Box');
        if (!boxNode) {
            console.error('❌ 无法找到 Box 节点，请检查预制体结构');
            return;
        }
    
        // 然后从 Box 节点中找到 Name、Num 和 Time
        const nameNodes = boxNode.getChildByName('Name');
        const numNodes = boxNode.getChildByName('Num');
        const timeNodes = boxNode.getChildByName('Time');
    
        if (!nameNodes || !numNodes || !timeNodes) {
            console.error('❌ 无法找到排行榜的子节点 Name、Num 或 Time，请检查 Box 的子节点结构');
            return;
        }
    
        // 之后可以像之前一样操作这些子节点
        const nameChildren = nameNodes.children;
        const numChildren = numNodes.children;
        const timeChildren = timeNodes.children;
    
        // 遍历排行榜数据并更新到对应的子节点
        data.forEach((player, index) => {
            if (index < 3) { // 只更新前三名
                const nameNode = nameChildren.find((child) => child.name === `Name-00${index + 1}`);
                const numNode = numChildren.find((child) => child.name === `Num-00${index + 1}`);
                const timeNode = timeChildren.find((child) => child.name === `Time-00${index + 1}`);
    
                if (nameNode && numNode && timeNode) {
                    const nameLabel = nameNode.getComponent(Label);
                    const numLabel = numNode.getComponent(Label);
                    const timeLabel = timeNode.getComponent(Label);
    
                    if (nameLabel) nameLabel.string = player.Usr_ID; // 更新昵称
                    if (numLabel) numLabel.string = (player.maxLevel + 1).toString(); // 更新关卡数 // 更新关卡数
                    if (timeLabel) {
                        // 从时间戳中提取日期和时间部分
                        const formattedTime = player.timestep.toString().replace('T', ' ').split('.')[0].slice(5); // 截取 "12-15 08:56:11"
                        timeLabel.string = formattedTime; // 更新时间
                    }
                }
            }
        });
    }
    
    /**
 * 格式化时间，只保留小时和分钟
 * @param timestep 原始时间字符串 (ISO 8601 格式)
 * @returns 格式化后的时间字符串
 */
private formatTime(timestep: string): string {
    try {
        // 将 ISO 8601 时间格式转换为 Date 对象
        const date = new Date(timestep);

        // 获取本地时间的小时和分钟
        const hours = date.getHours(); // 本地小时
        const minutes = date.getMinutes(); // 本地分钟

        // 格式化为 "HH:mm"，如果小时或分钟小于10，则补零
        const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

        return `${formattedHours}:${formattedMinutes}`; // 返回 "HH:mm" 格式
    } catch (error) {
        console.error('❌ 时间格式化失败:', error, timestep);
        return ''; // 如果转换失败，则返回空字符串
    }
}

}


