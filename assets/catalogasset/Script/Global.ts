import { _decorator, AudioClip, Component, Node, Prefab, SpriteFrame } from 'cc';

const { ccclass, property } = _decorator;

/**
 * 资源路径
 */
export const AssetList = {
    BundleName: "GameRes",
    Scene: {
        LoginScene: "LoginScene",
        GameScene: "GameScene"
    },
    Pop: {
        AdBox: "AdBox",
        EndBox: "EndBox",
        ShopBox: "ShopBox",
        Nobox: "Noboard"
    },
    Asset: {
        Prefabs: { path: "Prefab", type: Prefab },
        Sounds: { path: "Sound", type: AudioClip },
        SpriteFrames: { path: "SpriteFrame", type: SpriteFrame },
    }
}

/**
 * 道具
 */
export const PropList = {
    Coin: "coin",
    Boom: "bomb",
    Speed: "arrowbullte"
}



@ccclass('Global')
export class Global {

    public static LoadProgress: number = 0; // 全局加载进度


    //是否在微信环境中
    static IsWx: boolean = false;

    //是否是debug模式
    static IsDebug: boolean = true;



    //游戏最底部
    static GameBottom: number = -600;

    //游戏是否结束
    static IsGameOver: boolean = false;

    //游戏分数
    static ScoreNum: number = 0;
    //金币数量
    static CoinNum: number = 0;

    //是否弹窗广告
    static IsAd: boolean = true;

    //目前第几关
    static currentLevelIndex: number = 0;

    static isAI: number = 0;

}


