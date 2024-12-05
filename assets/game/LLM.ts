import { _decorator, Component, Label, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeepSeekAPI')
export class DeepSeekAPI extends Component {
    @property(Label)
    public responseLabel: Label | null = null;

    @property(Button)
    public sendButton: Button | null = null;

    private apiKey: string = "sk-8ed19ac079034f3596d147aec5f4f4d5"; // 替换为你的 DeepSeek API 密钥
    private baseUrl: string = "https://api.deepseek.com";

    onLoad() {
        if (this.sendButton) {
            this.sendButton.node.on('click', this.onSendButtonClicked, this);
        }
    }

    private async onSendButtonClicked() {
        if (!this.responseLabel) return;

        const messages = [
            { role: "system", content: "你是一个心理旋转学习助手，旨在通过情感支持和个性化建议，帮助学习者提高心理旋转能力。你需要根据学习者的学习进度、情绪状态和个性偏好，提供适时的鼓励和指导。" },
            { role: "user", content: "这个游戏我玩不明白" }
        ];

        this.responseLabel.string = "等待回复"; // 显示加载状态

        try {
            const response = await this.callDeepSeekAPI(messages);
            this.responseLabel.string = response;
        } catch (error) {
            this.responseLabel.string = "Error: Unable to fetch data.";
            console.error('Error:', error);
        }
    }

    private async callDeepSeekAPI(messages: { role: string; content: string }[]): Promise<string> {
        const apiUrl = `${this.baseUrl}/v1/chat/completions`;

        const payload = {
            model: "deepseek-chat",
            messages: messages,
            stream: false
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }
}