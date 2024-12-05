import { _decorator, Component, Node, AudioSourceComponent, AudioSource } from 'cc';
import { ResMgr } from './ResMgr';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('AudioMgr')
/**
 * 音效管理
 */
export class AudioMgr {
    //
    private static _instance: AudioMgr = null;
    //
    public static get instance() {
        if (!this._instance) {
            this._instance = new AudioMgr();
        }
        return this._instance;
    }

    //背景音乐管理
    private BgSound: AudioSourceComponent = null;

    private EffectSound = {};

    //是否是静音状态
    public IsMute: boolean = false;

    /**
     * 初始化
     */
    public Init() {
        this.BgSound = new AudioSourceComponent();;
    }

    /**
     * 播放背景音效
     * @param 背景音效名称
     * @param 背景音效声量
     */
    public PlayBgSound(_bgsoundname: string, _volume: number = 0.6) {
        this.IsMute = false;
        this.BgSound.clip = ResMgr.instance.Audio[_bgsoundname];
        this.BgSound.play();
        this.BgSound.volume = _volume;
        this.BgSound.loop = true;
    }

    /**
     * 暂停背景音效
     */
    public StopBgSound() {
        this.IsMute = true;
        this.BgSound.stop();

        for (let effect in this.EffectSound) {
            this.EffectSound[effect].stop();
        }

    }

    /**
     * 播放音效
     * @param 音效名称
     * @param 播放索引
     */
    public PlayEffect(_sound: string, _name: string) {
        if (!this.IsMute) {
            if (this.EffectSound[_name]) {
                this.EffectSound[_name].clip = ResMgr.instance.Audio[_sound];
                this.EffectSound[_name].loop = false;
            } else {
                let effectsound: AudioSourceComponent = new AudioSourceComponent();
                effectsound.clip = ResMgr.instance.Audio[_sound];
                effectsound.loop = false;
                this.EffectSound[_name] = effectsound;
            }
            this.EffectSound[_name].play();
            // this.EffectSound.node.on(AudioSource.EventType.STARTED,);
        }
    }

    /**
     * 点击按钮
     */
    public PlayButton() {
        this.PlayEffect("click", "click")
    }

    /**
     * 
     */
    public PlayCoin() {
        this.PlayEffect("coinload", "click")
    }

    /**
     * 炸弹
     */
    public PlayBomb() {
        this.PlayEffect("boom", "click")
    }
}

