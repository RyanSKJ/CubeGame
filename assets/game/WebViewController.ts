import { _decorator, Component, Node, WebView, UITransform, log, view, ResolutionPolicy } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WebViewController')
export class WebViewController extends Component {
    @property(WebView)
    webView: WebView | null = null;

    private targetUrl: string = 'https://www.w3schools.com'; // 替换为目标网页 URL

    start() {
        if (!this.webView) {
            console.error('WebView is not assigned!');
            return;
        }
    
        const uiTransform = this.webView.node.getComponent(UITransform);
        if (!uiTransform) {
            console.error('UITransform is missing on WebView node!');
            return;
        }
    
        console.log('WebView Node Status:');
        console.log(`Active: ${this.webView.node.active}`);
        console.log(`Size: ${uiTransform.contentSize.width} x ${uiTransform.contentSize.height}`);
    
        this.setupCanvasResolution();
        this.openWebView(this.targetUrl);
        this.addWebViewEvents();
    }

    setupCanvasResolution() {
        view.setDesignResolutionSize(720, 1280, ResolutionPolicy.FIXED_WIDTH);

        if (this.webView) {
            const uiTransform = this.webView.node.getComponent(UITransform);
            if (uiTransform) {
                const screenSize = view.getVisibleSize();
                uiTransform.width = screenSize.width;
                uiTransform.height = screenSize.height;
            }
        }
    }

    openWebView(url: string) {
        if (this.webView) {
            this.webView.url = url;
            this.webView.node.active = true;
        }
    }

    closeWebView() {
        if (this.webView) {
            this.webView.node.active = false;
        }
    }

    addWebViewEvents() {
        if (this.webView) {
            this.webView.node.on('loading', (sender: WebView) => {
                log(`WebView is loading: ${sender.url}`);
            }, this);

            this.webView.node.on('loaded', (sender: WebView) => {
                log(`WebView loaded successfully: ${sender.url}`);
            }, this);

            this.webView.node.on('error', (sender: WebView) => {
                log(`WebView failed to load: ${sender.url}`);
            }, this);
        }
    }
}