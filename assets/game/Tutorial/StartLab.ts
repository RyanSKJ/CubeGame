import { _decorator, Component, Sprite, tween, director, Node, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Startup')
export class Startup extends Component {
    @property({ type: Node })
    fullScreenMask: Node | null = null; // 全屏遮罩节点

    @property({ type: Node })
    logo: Node | null = null; // Logo 节点

    protected start(): void {
        if (!this.fullScreenMask || !this.logo) {
            console.error("请绑定 fullScreenMask 和 logo 节点");
            return;
        }

        // 获取或添加透明度组件
        const logoOpacity = this.logo.getComponent(UIOpacity) || this.logo.addComponent(UIOpacity);
        const maskOpacity = this.fullScreenMask.getComponent(UIOpacity) || this.fullScreenMask.addComponent(UIOpacity);

        // 初始化透明度
        logoOpacity.opacity = 0; // Logo 初始透明
        maskOpacity.opacity = 255; // 遮罩初始不透明

        // 同时淡入 Logo 和背景
        tween(logoOpacity)
            .to(1, { opacity: 255 }) // Logo 从透明到完全显示
            .start();

        tween(maskOpacity)
            .to(1, { opacity: 0 }) // 背景从不透明到透明
            .call(() => {
                console.log("淡入完成，开始淡出...");
                // 同时淡出 Logo 和背景
                this.fadeOut(logoOpacity, maskOpacity);
            })
            .start();
    }

    private fadeOut(logoOpacity: UIOpacity, maskOpacity: UIOpacity) {
        // 同时淡出 Logo 和背景
        tween(logoOpacity)
            .to(1.5, { opacity: 0 }) // Logo 从完全显示到透明
            .start();

        tween(maskOpacity)
            .to(1.5, { opacity: 255 }) // 背景从透明到不透明
            .call(() => {
                console.log("淡出完成，切换到新场景...");
                director.loadScene('loginscene'); // 切换到目标场景
            })
            .start();
    }
}