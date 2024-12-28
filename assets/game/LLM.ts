import { _decorator, Component, Label, Button, tween, Node, Vec3 } from 'cc';
import { TypewriterEffect } from './Tutorial/typer'; // 引入打字机效果
import {Global} from '../catalogasset/Script/Global'
import {RequestManager} from '../catalogasset/Scene/RequestManager'
const { ccclass, property } = _decorator;

@ccclass('DeepSeekAPI')
export class DeepSeekAPI extends Component {
    @property(Button)
    public suitableButton: Button | null = null; // "难度合适" 按钮

    @property(Button)
    public difficultButton: Button | null = null; // "感到困难" 按钮

    @property(Button)
    public moreStrategiesButton: Button | null = null; // "还有别的策略吗？" 按钮

    @property(Button)
    public iKnowButton: Button | null = null; // "我知道了" 按钮

    @property(Node)
    public npcNode: Node | null = null; // NPC 节点，用于上下跳动

    @property(TypewriterEffect)
    public typewriterEffect: TypewriterEffect | null = null; // 打字机效果组件

    private apiKey: string = "sk-8ed19ac079034f3596d147aec5f4f4d5"; // 替换为你的 API 密钥
    private baseUrl: string = "https://api.deepseek.com";

    // 保存所有对话记录
    private messages: { role: string; content: string }[] = [
        {
            role: "system",
            content: `你是一个游戏助手，设计用于帮助玩家在心理旋转能力测试类游戏中提高游戏体验和动机。你的任务是根据玩家的状态和反馈提供帮助，尤其在玩家遇到困难时提供策略和情感支持，同时根据关卡的不同阶段提供定制化建议。
              
              根据玩家的历史数据（如反馈、关卡进度和使用的策略），你选择不同的策略进行反馈。当玩家选择“遇到困难了”或“有点困难”时，你根据他们所处的关卡，提供策略支持。如果玩家选择“蛮简单的”或“难度刚刚好”，你应该更多地提供鼓励。
              
              ### 游戏机制策略：
              
              #### 游戏机制一（关卡 1-5）  
              **游戏内容**：玩家操作一个立方体在棋盘上滚动，目标是使将物体移动到目标格子上的同时初始位于立方体顶面上的按钮朝下。
              
              - **核心策略**：
                  - **按钮与面关系**：在操作过程中，格外注意**按钮所在的立方体面与立方体的滚动路径之间的关系**，确保旋转后按钮朝向正确，同时物体移动到目标格子。
                  - **重复模式识别**：通过识别关卡中的旋转模式，减少思考时间，例如如果某些位置的按钮已经成功朝下，可以快速重复相似的操作。
                  - **任务拆解**：将目标任务拆解成小步骤，比如首先确保按钮通过旋转移动到你想要的状态，再确保物体能精确地停在目标格子。
                  - **回顾总结**：每次完成关卡后，总结旋转步骤和按钮朝向的变化，反思哪些操作最有效。
                  - **反向思维**：如果卡住，可以从目标位置反推，思考如何通过当前状态的旋转来达成目标。
              
              #### 游戏机制二（关卡 6-10）  
              **游戏内容**：玩家操作一个由多个正方体组成的物体进行旋转，目标是通过旋转调整物体的视角，使得某个视图的孔洞对准目标。
              
              - **核心策略**：
                  - **多轴旋转预判**：每次旋转之前，预判多轴旋转后的物体姿态，确保从正确的视角来看，目标孔洞能对准正确的位置。
                  - **分步旋转**：将复杂的旋转动作分解为多个小步骤，避免一次性旋转过多，导致失控或错位。
                  - **反向推理**：从目标孔洞的位置出发，反推物体的旋转路径，找到最有效的旋转顺序。
                  - **每步评估与调整**：每旋转一次，立刻评估物体的新姿态，快速调整策略，确保每次旋转都朝着目标更近一步。
              
              #### 游戏机制三（关卡 11-15）  
              **游戏内容**：玩家可以旋转魔方，移动魔方表面上的一个立方体，使得立方体通过可移动的路径达到目标位置。
              
              - **核心策略**：
                  - **魔方块位置关系熟悉**：熟练掌握魔方各个块的位置关系和旋转规律，尤其是在解决更复杂的布局时，记住哪些面和块之间存在直接的依赖关系。
                  - **目标拆解**：将目标任务拆解成多个小目标，每次旋转时专注于调整一个小块的位置，逐步完成整个魔方的目标。
                  - **预判旋转后的状态**：分析当前魔方状态并预测每次旋转后，魔方各面之间的关系，确保每步都有效。
                  - **逆向推理**：从目标位置出发，逆向推理所需的每一步操作，逐渐还原到正确的状态。
                  - **物体记忆**：利用空间记忆帮助你跟踪不可见面的状态，避免在旋转过程中丢失信息，特别是在复杂的魔方操作时，记住每个面和块的相对位置。
                  - **反馈调整**：每次旋转后，根据新状态调整策略，避免错误积累，逐步修正布局。
              
              #### 游戏机制四（关卡 16-20）  
              **游戏内容**：场地上有3*3个立方体，玩家需要连续选择三个相同的立方体并最终消除所有立方体，立方体的配置是MRT测验中常见的形态。
              
              - **核心策略**：
                  - **场地与目标观察**：在每次操作前，仔细观察场地的整体布局和目标结构，选择易于上手的物体进行判断。
                  - **标记与颜色工具使用**：利用游戏中的标记和颜色工具，对每个立方体的面进行标记，帮助你快速识别和保持空间理解，避免操作混乱。
                  - **镜像效应注意**：特别留意立方体之间的镜像效应，避免因镜像干扰而导致错误匹配，确保每个旋转的方向与目标一致。
                  - **实时反馈与调整**：每次旋转后，迅速评估进展并及时调整，明确每个物体的初始位置与旋转角度。
                  - **预判与分解旋转步骤**：在每个复杂的旋转前，预判旋转后的效果，并将大的旋转任务分解成小步骤，避免一次性进行过多旋转，导致迷失。
              
              ### 交互与情感支持：
              1. **策略反馈**：每次提供一条策略，如果玩家问“还有更多吗？”你可以继续提供下一条策略。最多提供两条策略后，进行鼓励并建议玩家去实践这些策略。例如：“快去试试看吧，期待你成功！”
              
              2. **字数限制**：每条策略的反馈应清晰，先谈策略再谈请安支持，不应超过150字。避免使用*好，以及一次性呈现过多信息，确保回答简洁易懂。
              
              ### 综合分析：
              根据玩家提供的操作次数和游玩时间，进行综合分析，并在策略反馈时调整难度或提供情感支持。根据历史数据来优化每次的策略和反馈，避免重复策略，避免疲劳操作，提升玩家的体验。
              
              - **操作次数少，游玩时间短**：鼓励玩家继续，提示他们下一个关卡的挑战。
                - 例如：“你已经很快通过了这一关，保持这种状态，挑战下一个关卡吧！”
              
              - **操作次数适中，游玩时间适中**：提醒玩家保持专注，同时也可以建议回顾之前的步骤，调整策略。
                - 例如：“你已经花了不少时间，继续保持专注。如果卡住了，可以试试回顾之前的操作，看看能否找到更有效的策略。”
              
              - **操作次数多，游玩时间长**：分析玩家可能卡住了或疲劳，建议休息并回顾策略。
                - 例如：“看起来你已经花费了很多时间，并进行很多操作，也许是时候休息一下，清晰地思考下一步。休息一下后，你会有更清晰的头脑去解决问题。”`
        }
    ];


    onLoad() {
        const currentLevel = Global.currentLevelIndex
        if (this.suitableButton) {
            this.suitableButton.node.on('click', () => this.onUserFeedback( `已通过${currentLevel + 1} 关卡` + "难度合适"), this);
        }

        if (this.difficultButton) {
            this.difficultButton.node.on('click', () => this.onUserFeedback(`已通过${currentLevel + 1} 关卡` + "感到困难"), this);
        }

        if (this.moreStrategiesButton) {
            this.moreStrategiesButton.node.on('click', () => this.onMoreStrategies(), this);
            this.moreStrategiesButton.node.active = false; // 初始隐藏 "还有别的策略吗？" 按钮
        }

        if (this.iKnowButton) {
            this.iKnowButton.node.active = false; // 初始隐藏 "我知道了" 按钮
            if (localStorage.getItem('isAI') === '1') {
                this.iKnowButton.node.on('click', () => this.logUserAction(JSON.stringify(this.messages.slice(1))), this);
            }
            
        }

        // 开始 NPC 上下跳动的动画
        if (this.npcNode) {
            this._startNPCJumpAnimation();
        }
    }

    private async onUserFeedback(feedback: string) {
        if (!this.typewriterEffect) return;

        if (localStorage.getItem('isAI') === '1') {

        // 添加用户反馈到消息记录
        const userMessage = { role: "user", content: feedback };
        this.messages.push(userMessage); // 保存用户反馈

        // 隐藏当前两个按钮
        this._hideButtonsWithAnimation([this.suitableButton!.node, this.difficultButton!.node]);

        // 调用 API 处理反馈
        try {
            await this.callLLMAPI(); // 调用 LLM API

            if (feedback.indexOf("感到困难") !== -1) {
                // 显示 "更多策略" 和 "我知道了" 按钮
                this._showButtonWithAnimation(this.moreStrategiesButton!.node);
                this._showButtonWithAnimation(this.iKnowButton!.node);
            } else if (feedback.indexOf("难度合适") !== -1) {
                // 只显示 "我知道了" 按钮
                this._showButtonWithAnimation(this.iKnowButton!.node);
            }
        } catch (error) {
            //console.error('Error:', error);
        }
    } else {
        this._hideButtonsWithAnimation([this.suitableButton!.node, this.difficultButton!.node]);
        if (feedback.indexOf("感到困难") !== -1) {
            this.logUserAction('感到困难');
            this._showButtonWithAnimation(this.iKnowButton!.node);
        } else if (feedback.indexOf("难度合适") !== -1) {
            this.logUserAction('难度合适');
            this._showButtonWithAnimation(this.iKnowButton!.node);
        }
    }
    }

    private async onMoreStrategies() {
        if (!this.typewriterEffect) return;

        // 添加 "还有别的策略吗？" 到消息记录
        const currentLevel = Global.currentLevelIndex
        const userMessage = { role: "user", content: `已通过${currentLevel + 1} 关卡`+ "已请求过策略，询问还有别的策略吗？" };
        this.messages.push(userMessage);

        // 隐藏 "更多策略" 按钮
        this._hideButtonsWithAnimation([this.moreStrategiesButton!.node]);

        // 调用 API 处理反馈
        try {
            await this.callLLMAPI(); // 调用 LLM API

            // 输出结束后，保留 "我知道了" 按钮
        } catch (error) {
            //console.error('Error:', error);
        }
    }

    private async callLLMAPI(): Promise<void> {
        const apiUrl = `${this.baseUrl}/v1/chat/completions`;
    
        const payload = {
            model: "deepseek-chat",
            messages: this.messages,
            stream: true // 启用流式返回
        };
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error("Failed to get reader from response.");
            }
    
            const decoder = new TextDecoder('utf-8');
            let fullText = ""; // 存储完整的返回内容
    
            while (true) {
                const { done, value } = await reader.read();
    
                if (done) {
                    break;
                }
    
                // 解码流式数据
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');
    
                for (const line of lines) {
                    if (line.trim() === '') continue;
    
                    try {
                        // 解析 JSON 数据
                        const json = JSON.parse(line.replace(/^data: /, ''));
                        const content = json.choices[0].delta.content || ""; // 获取增量内容
    
                        // 拼接返回文本
                        fullText += content;
    
                        // 实时将内容传递给打字机组件
                        if (this.typewriterEffect) {
                            this.typewriterEffect.appendText(content);
                        }
                    } catch (e) {
                        //console.warn("Failed to parse line:", line, e);
                    }
                }
            }
    
            // 将返回内容保存到消息记录中
            const assistantMessage = { role: "assistant", content: fullText };
            this.messages.push(assistantMessage); // 保存返回内容
        } catch (error) {
            //console.error('Error calling API:', error);
    
            // 自定义返回逻辑
            const fallbackMessage = {
                role: "assistant",
                content: "抱歉，目前无法获取建议。以下是一个推荐策略：尝试将目标任务分解为更小的步骤，并逐步完成每个子任务。继续加油！"
            };
    
            this.messages.push(fallbackMessage);
    
            // 将自定义返回内容传递给打字机组件
            if (this.typewriterEffect) {
                this.typewriterEffect.appendText(fallbackMessage.content);
            }
        }
    }

    /**
     * 使用动画隐藏按钮
     * @param nodes 要隐藏的按钮节点
     */
    private _hideButtonsWithAnimation(nodes: Node[]) {
        nodes.forEach(node => {
            tween(node)
                .to(0.3, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' })
                .call(() => {
                    node.active = false; // 动画完成后隐藏节点
                })
                .start();
        });
    }

    /**
     * 使用动画显示按钮
     * @param node 要显示的按钮节点
     */
    private _showButtonWithAnimation(node: Node) {
        node.scale = new Vec3(0, 0, 0); // 设置初始缩放为 0
        node.active = true; // 激活节点
        tween(node)
            .to(0.3, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();
    }

    /**
     * 开始 NPC 上下跳动动画
     */
    private _startNPCJumpAnimation() {
        if (!this.npcNode) return;

        tween(this.npcNode)
            .repeatForever(
                tween()
                    .by(0.5, { position: new Vec3(0, 20, 0) }, { easing: 'sineInOut' })
                    .by(0.5, { position: new Vec3(0, -20, 0) }, { easing: 'sineInOut' })
            )
            .start();
    }

    async logUserAction(interactionContent: string) {
        const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
        const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
        const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
        const level = Global.currentLevelIndex ?? 0; // 确保 Level 不为 undefined
    
        if (!username || !sessionToken) {
            console.warn('❌ 错误：用户名或 Session token 未找到。');
            return;
        }
    
        // 获取当前时间的北京时间
        const now = new Date();
        const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
        const beijingTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').slice(0, 23); // 格式化为 "YYYY-MM-DD HH:mm:ss"
    
        // 准备发送的数据
        const data = {
            tableName: 'interactai', // 表名
            data: {
                Usr_ID: username, // 用户ID
                Level: level, // 当前关卡
                interaction: interactionContent, // 动态传入的 interaction
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
    
        console.log('✅ 用户交互记录请求已加入队列:', data);
    }
}