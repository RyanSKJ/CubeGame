import { _decorator, Component, VideoPlayer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('VideoController')
export class VideoController extends Component {

    @property(VideoPlayer)
    videoPlayer: VideoPlayer = null;

    start () {
        // 播放视频
        this.videoPlayer.play();
    }

    pauseVideo() {
        // 暂停视频
        this.videoPlayer.pause();
    }

    stopVideo() {
        // 停止视频
        this.videoPlayer.stop();
    }

    seekTo(seconds: number) {
        // 跳转到视频的某个时间位置
        this.videoPlayer.currentTime = seconds;
    }
}