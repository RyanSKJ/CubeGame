declare var wx;
import { _decorator, Component, Node, SubContextView } from 'cc';
import { Global } from '../Global';
const { ccclass, property } = _decorator;

@ccclass('WxTools')
/**
 * 微信小游戏工具
 */
export class WxTools extends Component {

    /**
     * 设置本地缓存
     * @param key值
     * @param value值
     */
    static SetStorage(_key: string, _value: string) {
        wx.setStorageSync(_key, _value)
    }

    /**
     * 获取本地缓存
     * @param key值
     */
    static GetStorage(_key: string) {
        return wx.getStorageSync(_key) == "" ? null : JSON.parse(wx.getStorageSync(_key))
    }

    //
    static PicUrl: string[] = [
        "https://mmocgame.qpic.cn/wechatgame/7oibW3uRtGFOhYIpRRBfBXgmpc0lKbhSOTkcc0MkLf2icHKCVicGcyeh8YD3mjRV07h/0",
    ]

    //
    static PicId: string[] = [
        "TUyoQsD9Qg+D10vm3YXIOw==",
    ]

    /**
     * 主动分享（直接分享弹窗）
     * @param 分享标题
     * @param 图片索引
     */
    static Share(_title: string, _picindex: number) {
        if (!Global.IsWx) return;

        wx.shareAppMessage({
            title: _title,
            imageUrlId: this.PicId[_picindex],
            imageUrl: this.PicUrl[_picindex]
        })
    }

    /**
      * 更新被动分享信息（点击主菜单分享）
      */
    static SetShare() {
        if (!Global.IsWx) return;
        let pic_index: number = Math.floor(this.PicUrl.length * Math.random())
        wx.onShareAppMessage(function () {
            return {
                title: "快来帮小笨鸟加加速",
                // imageUrlId: this.PicId[pic_index],
                // imageUrl: this.PicUrl[pic_index]
            }
        }.bind(this))
    }

    /**
     * 
     */
    static ShareMenu() {
        if (!Global.IsWx) return;
        wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
        })
    }



    /**
     * 微信小程序交互提示
     * @param 提示文字
     * @param 提示图标 success error loading none
     * @param 提示延迟时间 毫秒为单位
     */
    static ShowToast(_title: string, _icon: string, _duration: number = 2000) {
        wx.showToast({
            title: _title,
            icon: _icon,
            duration: _duration
        })
    }

    /**
     * 隐藏弹窗
     */
    static HideToast() {
        wx.hideToast()
    }


    /**
     * 显示确认取消对话框
     * @param 提示标题
     * @param 提示内容
     * @param 成功回调 content:editable为true时候的文本 confirm 为true时用户点击了确定按钮 cancel为true时用户点击了返回按钮
     * @param 失败回调
     * @param 接口调用完成回调
     * @param 是否显示取消按钮
     * @param 取消按钮文字 最多4个字符
     * @param 取消字体颜色
     * @param 同意文字内容
     * @param 同意文字颜色
     * @param 是否显示输入框
     * @param 显示输入框时得提示文字
     */
    static ShowModal(_title: string, _content: string, _successcb: Function, _failcb: Function, _completecb: Function,) {
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            showCancel: false,
            editable: true,
            success(res) {
                if (res.confirm) {
                    Global.IsDebug && console.log('用户点击确定')
                } else if (res.cancel) {
                    Global.IsDebug && console.log('用户点击取消')
                }
            }
        })
    }

    /**
     * 显示loading提示框
     * @param 提示文字
     * @param 是否防止触摸
     * @param 成功回调
     * @param 失败回调
     * @param 接口调用结束
     */
    static ShowLoading(_title: string, _mask: boolean = true, _successcb: Function = null, _failcb: Function = null, _completecb: Function = null) {
        wx.showLoading({
            title: _title,
            mask: _mask,
            success: _successcb,
            fail: _failcb,
            complete: _completecb
        })
    }

    /**
     * 隐藏loading提示框
     */
    static HideLoading() {
        wx.hideLoading();
    }

    /**
     * 显示选项操作菜单
     * @param 提示文案
     * @param 按钮文字数组 最大长度为6
     * @param 文字颜色
     * @param 成功回调 tapIndex点击索引
     * @param 失败回调  点击返回按钮
     * @param 调用结束回调
     */
    static ShowActionSheet(_alerttext: string, _itemlist: string[], _itemcolor: string = "#000000", _successcb: Function = null, _failcb: Function = null, _completecb: Function = null) {
        wx.showActionSheet({
            alertText: _alerttext,
            itemList: _itemlist,
            itemColor: _itemcolor,
            success: _successcb,
            fail: _failcb,
            complete: _completecb
        })
    }

    /**
     * 短震动
     * @param 震动类型 heavy、medium、light
     */
    static VibrateShort(_type: string = "medium") {
        if (!Global.IsWx) return;
        wx.vibrateShort({
            type: _type
        })
    }

    /**
     * 长震动
     */
    static VibrateLong() {
        wx.vibrateLong()
    }

    /**
     * 获取用户信息
     * @param 成功回调
     */
    static GetUserInfor(_successcb: Function) {
        //需要判断是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            Global.IsDebug && console.log(res.userInfo)
                            _successcb(res.userInfo)
                        }
                    })
                } else {

                    //创建一个透明背景
                    let sysInfo = wx.getSystemInfoSync();
                    let screenW = sysInfo.screenWidth;
                    let screenH = sysInfo.screenHeight;

                    // 否则，先通过 wx.createUserInfoButton 接口发起授权
                    let button = wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: screenW,
                            height: screenH,
                            lineHeight: 0,
                            backgroundColor: '',
                            color: '#ffffff',
                            textAlign: 'center',
                            fontSize: 16
                        }
                    })
                    button.onTap((res) => {
                        // 用户同意授权后回调，通过回调可获取用户头像昵称信息
                        Global.IsDebug && console.log(res)
                        _successcb(res.userInfo)
                        button.destroy()
                    })
                }
            }
        })
    }


}


