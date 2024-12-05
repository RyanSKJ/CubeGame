import { _decorator, Component, Node, AssetManager, assetManager, Prefab, Texture2D, SpriteAtlas, SpriteFrame, JsonAsset, AudioClip } from 'cc';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('ResMgr')
/**
 * 资源加载管理
 */
export class ResMgr {
    //
    private static _instance: ResMgr = null;
    //
    public static get instance() {
        if (!this._instance) {
            this._instance = new ResMgr();
        }
        return this._instance;
    }

    //包体
    private Bundles = {};

    //预设体数组
    public Prefabs = {}

    //纹理数组
    public SpriteFrames = {};

    //音乐数组
    public Audio = {};

    //当前加载进度
    public NowProgress: number = 0;

    /**
     * 加载包体
     * @param 包体名称
     * @oaran 完成进度
     */
    public async LoadBundle(_bundlename: string, _completeprogress: number = 0) {
        return new Promise<void>((_resolve, _reject) => {
            assetManager.loadBundle(_bundlename, (err, bundle) => {
                Global.IsDebug && console.log(_bundlename + "包加载包完成", err, bundle);
                this.Bundles[_bundlename] = bundle;
                Global.LoadProgress += _completeprogress;
                this.NowProgress = Global.LoadProgress;
                _resolve && _resolve();
            })
        })
    }

    /**
     * 加载资源
     * @param 包体名称
     * @param 加载类型
     * @oaran 完成进度
     */
    public async LoadRes(_bundlename: string, _type: any, _completeprogress: number = 0) {
        return new Promise<void>((_resolve, _reject) => {
            // 先加载 game bundle
            assetManager.loadBundle("resources", (err, bundle: AssetManager.Bundle) => {
                if (err) {
                    console.error("加载game包失败:", err);
                    _reject && _reject(err);
                    return;
                }
    
                // 加载指定bundle的资源
                this.Bundles[_bundlename].loadDir(_type.path, _type.type, (_fish: number, _total: number) => {
                    Global.LoadProgress = _completeprogress * (_fish / _total) + this.NowProgress;
                    // Global.IsDebug && console.log("加载" + _bundlename + "包体进度", _type, _fish, _total, Global.LoadProgress);
                }, (_err: any, _assets: any[]) => {
                    if (_err) {
                        console.error("加载资源时出错:", _err);
                        _reject && _reject(_err);
                        return;
                    }
    
                    Global.IsDebug && console.log("加载完成", _assets, _bundlename);
                    this.NowProgress = Global.LoadProgress;
                    console.warn("当前包资源", this.NowProgress, _type);
                    
                    // 处理资源
                    let asset: any;
                    if (_type.type == Prefab) {
                        for (let i = 0; i < _assets.length; i++) {
                            asset = _assets[i];
                            this.Prefabs[asset.data.name] = asset;
                            Global.IsDebug && console.log("prefab name==", asset.data.name);
                        }
                    } else if (_type.type == SpriteFrame) {
                        for (let i = 0; i < _assets.length; i++) {
                            asset = _assets[i];
                            this.SpriteFrames[asset.name] = asset;
                            Global.IsDebug && console.log("spriteframe name==", asset.name);
                        }
                    } else if (_type.type == JsonAsset) {
                        Global.IsDebug && console.log(_assets, "Json", _assets[0].json);
                    } else if (_type.type == AudioClip) {
                        for (let i = 0; i < _assets.length; i++) {
                            asset = _assets[i];
                            this.Audio[asset.name] = asset;
                            Global.IsDebug && console.log("audioclip name==", asset.name);
                        }
                    }
    
                    // 资源加载完成后切换场景
                    //director.loadScene("Scene");
    
                    _resolve && _resolve();
                });
            });
        });
    }

    /**
     * 加载进度初始化
     */
    public LoadInit() {
        this.NowProgress = 0;
        Global.LoadProgress = 0;
    }
}

