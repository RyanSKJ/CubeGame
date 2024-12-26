import { _decorator, Component, Node, Prefab, instantiate, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LeaderboardManager')
export class LeaderboardManager extends Component {
    @property(Prefab)
    public leaderboardPrefab: Prefab = null; // 排行榜预制体

    @property(Node)
    public canvas: Node = null; // Canvas 节点，用于将排行榜实例化并添加到场景中

    private leaderboardNode: Node | null = null; // 保存排行榜实例

    // 点击按钮显示排行榜
    public async showLeaderboard() {
        if (this.leaderboardNode) {
            console.log("排行榜已显示");
            return; // 如果已经显示，则不重复加载
        }

        if (this.leaderboardPrefab) {
            // 实例化排行榜预制体
            this.leaderboardNode = instantiate(this.leaderboardPrefab);
            this.canvas.addChild(this.leaderboardNode); // 添加到 Canvas 中

            // 查找子节点
            const nameNodes = this.leaderboardNode.getChildByName('Name');
            const numNodes = this.leaderboardNode.getChildByName('Num');
            const timeNodes = this.leaderboardNode.getChildByName('Time');

            if (!nameNodes || !numNodes || !timeNodes) {
                console.error('❌ 无法找到排行榜子节点，请检查预制体结构');
                return;
            }

            // 加载排行榜数据
            const leaderboardData = await this.fetchLeaderboardData();

            if (leaderboardData) {
                this.updateLeaderboardUI(leaderboardData, nameNodes, numNodes, timeNodes);
            }
        } else {
            console.error("未绑定排行榜预制体");
        }
    }

    // 隐藏排行榜
    public hideLeaderboard() {
        if (this.leaderboardNode) {
            this.leaderboardNode.destroy(); // 销毁排行榜节点
            this.leaderboardNode = null;
        }
    }

    // 请求排行榜数据
    private async fetchLeaderboardData(): Promise<Array<{ Usr_ID: string; maxLevel: number; timestep: string }> | null> {
        const apiUrl = 'http://124.71.181.62:3000/api/getTopPlayers'; // 替换为你的API地址
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

    // 更新排行榜内容
    private updateLeaderboardUI(
        data: Array<{ Usr_ID: string; maxLevel: number; timestep: string }>,
        nameNodes: Node,
        numNodes: Node,
        timeNodes: Node
    ) {
        // 分别获取 Name、Num 和 Time 节点下的子节点
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
                    if (numLabel) numLabel.string = player.maxLevel.toString(); // 更新关卡数
                    if (timeLabel) timeLabel.string = player.timestep; // 更新时间
                }
            }
        });
    }
}