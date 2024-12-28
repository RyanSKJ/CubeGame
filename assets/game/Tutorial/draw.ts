import { _decorator, Component, Node, Vec2, Graphics, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TouchTrackBezier')
export class TouchTrackBezier extends Component {
    @property(Graphics)
    public graphics: Graphics = null!; // 用于绘制轨迹的 Graphics 组件

    private touchPoints: Vec2[] = []; // 原始采样点
    private smoothedPoints: Vec2[] = []; // 插值平滑后的点
    private recordInterval: number = 50; // 采样间隔（毫秒）
    private lastSampleTime: number = 0; // 上次采样时间

    start() {
        // 注册触摸事件
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart() {
        this.touchPoints = []; // 清空之前的点
        this.smoothedPoints = [];
        this.graphics.clear(); // 清空画布
    }

    onTouchMove(event: any) {
        const now = Date.now();
        if (now - this.lastSampleTime >= this.recordInterval) {
            const touchLocation = event.getUILocation();
            const newPoint = new Vec2(touchLocation.x, touchLocation.y);
            this.touchPoints.push(newPoint);
            this.lastSampleTime = now;

            // 动态显示实时轨迹（采样点）
            this.updateGraphics(this.touchPoints, new Color(0, 0, 255, 255)); // 蓝色
        }
    }

    onTouchEnd() {
        // 计算平滑点
        this.smoothedPoints = this.generateBezierCurve(this.touchPoints, 0.5); // 平滑系数为 0.5
        this.updateGraphics(this.smoothedPoints, new Color(255, 0, 0, 255)); // 红色
    }

    // 使用贝塞尔曲线插值生成平滑点
    generateBezierCurve(points: Vec2[], t: number): Vec2[] {
        const result: Vec2[] = [];
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const mid = p0.lerp(p1, t); // 计算中点
            result.push(p0, mid); // 添加原始点和中点
        }
        result.push(points[points.length - 1]); // 添加最后一个点
        return result;
    }

    // 更新绘制轨迹
    updateGraphics(points: Vec2[], color: Color) {
        this.graphics.clear();
        this.graphics.lineWidth = 5; // 设置线条宽度
        this.graphics.strokeColor = color; // 设置轨迹颜色

        if (points.length > 0) {
            this.graphics.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                this.graphics.lineTo(points[i].x, points[i].y);
            }
        }
        this.graphics.stroke();
    }
}