System.register("chunks:///_virtual/AdBox.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './AdMgr.ts', './TopLoad.ts', './TweenTools.ts', './Main.ts', './AudioMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Global, AssetList, AdMgr, TopLoad, TweenTool, Main, AudioMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
      AssetList = module.AssetList;
    }, function (module) {
      AdMgr = module.AdMgr;
    }, function (module) {
      TopLoad = module.TopLoad;
    }, function (module) {
      TweenTool = module.TweenTool;
    }, function (module) {
      Main = module.Main;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "f38d7Q6eWhH1rmoH8N5j1jH", "AdBox", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let AdBox = exports('AdBox', (_dec = ccclass('AdBox'), _dec2 = property(Node), _dec(_class = (_class2 = class AdBox extends Component {
        constructor(...args) {
          super(...args);
          //回调函数
          this.Cb = void 0;
          //
          _initializerDefineProperty(this, "Box", _descriptor, this);
        }
        start() {
          TweenTool.Pop(this.Box);
        }

        /**
         * 点击复活按钮
         */
        SaveButtonClick() {
          Global.IsDebug && console.log("点击复活按钮");
          AudioMgr.instance.PlayButton();
          AdMgr.Instance.ShowVideoAd(_isended => {
            if (_isended) {
              TopLoad.instance.HidePop(AssetList.Pop.AdBox);
              this.Cb();
            }
          });
        }

        /**
         * 点击不用了
         */
        NoThanksButtonClick() {
          Global.IsDebug && console.log("点击不用了");
          AudioMgr.instance.PlayButton();
          Main.instance.UpdateScene(AssetList.Scene.LoginScene);
          TopLoad.instance.HidePop(AssetList.Pop.AdBox);
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "Box", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdMgr.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './WxAdMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, CCString, _decorator, Component, Global, WxAdMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      CCString = module.CCString;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      WxAdMgr = module.WxAdMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3;
      cclegacy._RF.push({}, "36107tyFPdINbLKG01OyLza", "AdMgr", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let AdMgr = exports('AdMgr', (_dec = ccclass('AdMgr'), _dec2 = property({
        type: CCString,
        displayName: "视频广告id"
      }), _dec3 = property({
        type: CCString,
        displayName: "banner广告"
      }), _dec4 = property({
        type: CCString,
        displayName: "格子广告"
      }), _dec(_class = (_class2 = (_class3 = class AdMgr extends Component {
        constructor(...args) {
          super(...args);
          //视频广告id
          _initializerDefineProperty(this, "VideoId", _descriptor, this);
          //banner广告
          _initializerDefineProperty(this, "BannerId", _descriptor2, this);
          //格子广告
          _initializerDefineProperty(this, "GridId", _descriptor3, this);
          //回调函数
          this.Cb = void 0;
        }
        //
        onLoad() {
          AdMgr.Instance = this;
        }
        /**
         * 广告初始化
         */
        Init() {
          if (Global.IsWx) WxAdMgr.Instance.Init(this.VideoId, this.BannerId, this.GridId);
        }

        /**
         * 显示视频广告
         * @param 回调方法
         */
        ShowVideoAd(_cb) {
          if (Global.IsWx) {
            WxAdMgr.Instance.ShowRewardVideoAd(_cb);
            return;
          }
          _cb(true);
        }

        /**
         * 显示banner广告
         * @param 是否显示
         */
        ShowBannerAd(_isshow) {
          if (Global.IsWx) WxAdMgr.Instance.ShowBannerAd(_isshow);
        }

        /**
         * 显示格子广告
         * @param 是否显示
         */
        ShowGridAd(_isshow) {
          if (Global.IsWx) WxAdMgr.Instance.ShowGridAd(_isshow);
        }
      }, _class3.Instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "VideoId", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "BannerId", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "GridId", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioMgr.ts", ['cc', './ResMgr.ts'], function (exports) {
  var cclegacy, _decorator, AudioSourceComponent, ResMgr;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioSourceComponent = module.AudioSourceComponent;
    }, function (module) {
      ResMgr = module.ResMgr;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "a7d8bxsoM1G/aqXNfx4QovA", "AudioMgr", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let AudioMgr = exports('AudioMgr', (_dec = ccclass('AudioMgr'), _dec(_class = (_class2 = class AudioMgr {
        constructor() {
          //背景音乐管理
          this.BgSound = null;
          this.EffectSound = {};
          //是否是静音状态
          this.IsMute = false;
        }
        //
        static get instance() {
          if (!this._instance) {
            this._instance = new AudioMgr();
          }
          return this._instance;
        }
        /**
         * 初始化
         */
        Init() {
          this.BgSound = new AudioSourceComponent();
        }

        /**
         * 播放背景音效
         * @param 背景音效名称
         * @param 背景音效声量
         */
        PlayBgSound(_bgsoundname, _volume = 0.6) {
          this.IsMute = false;
          this.BgSound.clip = ResMgr.instance.Audio[_bgsoundname];
          this.BgSound.play();
          this.BgSound.volume = _volume;
          this.BgSound.loop = true;
        }

        /**
         * 暂停背景音效
         */
        StopBgSound() {
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
        PlayEffect(_sound, _name) {
          if (!this.IsMute) {
            if (this.EffectSound[_name]) {
              this.EffectSound[_name].clip = ResMgr.instance.Audio[_sound];
              this.EffectSound[_name].loop = false;
            } else {
              let effectsound = new AudioSourceComponent();
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
        PlayButton() {
          this.PlayEffect("click", "click");
        }

        /**
         * 
         */
        PlayCoin() {
          this.PlayEffect("coinload", "click");
        }

        /**
         * 炸弹
         */
        PlayBomb() {
          this.PlayEffect("boom", "click");
        }
      }, _class2._instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ballmove.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RubiksCube.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, EventTarget, Button, _decorator, Component, Vec3, tween, EventSystem;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
      Button = module.Button;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      EventSystem = module.EventSystem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "a4eaapSXlJCwJO4AhrzSibW", "ballmove", undefined);
      const EventSysteml = exports('EventSysteml', new EventTarget());
      const {
        ccclass,
        property
      } = _decorator;
      let CubeController = exports('CubeController', (_dec = ccclass('CubeController'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec(_class = (_class2 = class CubeController extends Component {
        constructor(...args) {
          super(...args);
          this.isInteracting = false;
          _initializerDefineProperty(this, "buttonW", _descriptor, this);
          _initializerDefineProperty(this, "buttonA", _descriptor2, this);
          _initializerDefineProperty(this, "buttonS", _descriptor3, this);
          _initializerDefineProperty(this, "buttonD", _descriptor4, this);
          this.epsilon = 0.0001;
          // 设置一个很小的容差值
          this.moveDuration = 0.2;
          // 移动动画的持续时间
          this.cooldown = false;
          // 冷却状态
          this.cooldownDuration = 0.5;
        }
        // 冷却时间（秒）

        onLoad() {
          // 监听移动事件
          EventSystem.on('moveBall', this.handleMovement, this);
        }
        onDestroy() {
          // 移除事件监听
          EventSystem.off('moveBall', this.handleMovement, this);
        }
        start() {
          // 移除键盘输入事件监听
          // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this); // 不再需要

          // 监听按钮点击事件
          //this.buttonW.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_W), this);
          //this.buttonA.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_A), this);
          //this.buttonS.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_S), this);
          //this.buttonD.node.on(Button.EventType.CLICK, () => this.handleMovement(KeyCode.KEY_D), this);
        }
        startCooldown() {
          this.cooldown = true;
          this.scheduleOnce(() => {
            this.cooldown = false;
            console.log("Cooldown finished.");
          }, this.cooldownDuration);
        }
        handleMovement({
          relation,
          plane
        }) {
          if (this.cooldown) {
            console.log("Movement cooldown in progress, ignoring this request.");
            return;
          }
          // 如果正在移动，直接返回，防止动画重叠
          if (this.isInteracting) {
            console.log("Movement in progress, ignoring this request.");
            return;
          }
          this.isInteracting = true; // 设置锁，防止其他逻辑干扰
          this.startCooldown(); // 开始冷却

          let movement = new Vec3();
          let MoveFlag = false; // 默认移动标志为 false

          // 使用 Node 的当前位置
          const currentPosition = this.node.getPosition();

          // 根据球体所在的平面和点击的面判断移动方向
          if (this.isApproximatelyEqual(currentPosition.y, 2.2) && plane === 'XOZ') {
            switch (relation) {
              case 'forward':
                movement.set(0, 0, 1.1);
                break;
              case 'backward':
                movement.set(0, 0, -1.1);
                break;
              case 'left':
                movement.set(-1.1, 0, 0);
                break;
              case 'right':
                movement.set(1.1, 0, 0);
                break;
            }
          } else if (this.isApproximatelyEqual(currentPosition.z, 2.2) && plane === 'XOY') {
            switch (relation) {
              case 'up':
                movement.set(0, 1.1, 0);
                break;
              case 'down':
                movement.set(0, -1.1, 0);
                break;
              case 'left':
                movement.set(-1.1, 0, 0);
                break;
              case 'right':
                movement.set(1.1, 0, 0);
                break;
            }
          } else if (this.isApproximatelyEqual(currentPosition.x, -2.2) && plane === 'YOZ') {
            switch (relation) {
              case 'up':
                movement.set(0, 1.1, 0);
                break;
              case 'down':
                movement.set(0, -1.1, 0);
                break;
              case 'forward':
                movement.set(0, 0, 1.1);
                break;
              case 'backward':
                movement.set(0, 0, -1.1);
                break;
            }
          } else {
            console.log("Invalid plane or position for movement.");
            this.isInteracting = false; // 释放锁
            EventSysteml.emit('changeBox', MoveFlag);
            return;
          }

          // 计算新的位置
          let newPosition = currentPosition.clone().add(movement);

          // 检查新位置是否合法并未被占用
          if (this.isPositionValid(newPosition) && !this.isPositionOccupied(newPosition)) {
            console.log(`Moving to new position: ${newPosition.toString()}`);
            tween(this.node).to(this.moveDuration, {
              position: newPosition
            }, {
              easing: 'quadInOut'
            }).call(() => {
              this.isInteracting = false; // 动画完成后释放锁
              MoveFlag = true; // 移动成功，设置标志
              EventSysteml.emit('changeBox', MoveFlag); // 通知其他组件
            }).start();
          } else {
            console.log("Invalid or occupied position, shaking node.");
            this.shakeNode(); // 如果目标位置不合法或已被占用，执行震动效果
            EventSysteml.emit('changeBox', MoveFlag); // 通知其他组件移动失败
          }
        }

        isPositionValid(position) {
          // 对不同的平面进行合法性检查
          if (this.isApproximatelyEqual(position.y, 2.2) || this.isApproximatelyEqual(position.y, -2.2)) {
            return position.x >= -1.1 - this.epsilon && position.x <= 1.1 + this.epsilon && position.z >= -1.1 - this.epsilon && position.z <= 1.1 + this.epsilon;
          } else if (this.isApproximatelyEqual(position.z, 2.2) || this.isApproximatelyEqual(position.z, -2.2)) {
            return position.x >= -1.1 - this.epsilon && position.x <= 1.1 + this.epsilon && position.y >= -1.1 - this.epsilon && position.y <= 1.1 + this.epsilon;
          } else if (this.isApproximatelyEqual(position.x, 2.2) || this.isApproximatelyEqual(position.x, -2.2)) {
            return position.y >= -1.1 - this.epsilon && position.y <= 1.1 + this.epsilon && position.z >= -1.1 - this.epsilon && position.z <= 1.1 + this.epsilon;
          }
          return false;
        }
        isApproximatelyEqual(a, b) {
          return Math.abs(a - b) < this.epsilon;
        }
        isPositionOccupied(position) {
          const parent = this.node.parent;
          if (parent) {
            for (let i = 0; i < parent.children.length; i++) {
              const child = parent.children[i];

              // 过滤掉 name 为 "lumbermill" 的节点
              if (child.name === "lumbermill") {
                continue; // 跳过该节点
              }

              // 检查位置是否近似相等
              if (child !== this.node && this.isApproximatelyEqualVec3(child.getPosition(), position)) {
                return true; // 目标位置被占用
              }
            }
          }

          return false; // 目标位置未被占用
        }

        isApproximatelyEqualVec3(v1, v2) {
          return this.isApproximatelyEqual(v1.x, v2.x) && this.isApproximatelyEqual(v1.y, v2.y) && this.isApproximatelyEqual(v1.z, v2.z);
        }
        shakeNode() {
          const originalPosition = this.node.getPosition();
          const shakeOffset = 0.1; // 震动的幅度
          const shakeDuration = 0.05; // 每次震动的时间

          // 在动画完成后释放锁
          tween(this.node).by(shakeDuration, {
            position: new Vec3(shakeOffset, 0, 0)
          }).by(shakeDuration, {
            position: new Vec3(-shakeOffset * 2, 0, 0)
          }).by(shakeDuration, {
            position: new Vec3(shakeOffset * 2, 0, 0)
          }).by(shakeDuration, {
            position: new Vec3(-shakeOffset, 0, 0)
          }).to(shakeDuration, {
            position: originalPosition
          }).call(() => {
            this.isInteracting = false; // 动画完成后释放锁
            console.log("Shake animation complete, lock released.");
          }).start();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "buttonW", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buttonA", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "buttonS", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "buttonD", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BgLoad.ts", ['cc'], function (exports) {
  var cclegacy, _decorator, Component, Vec3;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "a1874wl9XRCEbK5t0PXsFrU", "BgLoad", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let BgLoad = exports('BgLoad', (_dec = ccclass('BgLoad'), _dec(_class = (_class2 = class BgLoad extends Component {
        constructor(...args) {
          super(...args);
          //背景数组
          this.BgArray = [];
          //背景高度
          this.BgHeight = 1624;
        }
        onLoad() {
          BgLoad.instance = this;
        }
        start() {
          this.BgArray = [this.node.getChildByName("bg0"), this.node.getChildByName("bg1"), this.node.getChildByName("bg2")];
          for (let i = 1; i < this.BgArray.length; i++) {
            this.BgArray[i].setPosition(this.BgArray[i - 1].getPosition().add(new Vec3(0, -this.BgHeight)));
          }
        }

        /**
         * 背景移动
         */
        BgMove(_vy) {
          for (let i = 0; i < this.BgArray.length; i++) {
            let now_pos = this.BgArray[i].getPosition();
            let new_pos = now_pos.add(new Vec3(0, _vy));
            this.BgArray[i].setPosition(new_pos);
          }
          for (let i = 0; i < this.BgArray.length; i++) {
            if (this.BgArray[i].getPosition().y <= -this.BgHeight) {
              if (i == 0) {
                this.BgArray[0].setPosition(this.BgArray[this.BgArray.length - 1].getPosition().add(new Vec3(0, this.BgHeight)));
              } else {
                this.BgArray[i].setPosition(this.BgArray[i - 1].getPosition().add(new Vec3(0, this.BgHeight)));
              }
            }
          }
        }
      }, _class2.instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/boxmovecontroller.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, Collider, director, instantiate;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      Collider = module.Collider;
      director = module.director;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "567e1KbFABNE7fijsx51bnO", "boxmovecontroller", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let CollisionHandler = exports('CollisionHandler', (_dec = ccclass('CollisionHandler'), _dec2 = property(Prefab), _dec(_class = (_class2 = class CollisionHandler extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "uiPrefab", _descriptor, this);
        }
        // 需要渲染的UI-2D预制体

        onLoad() {
          // 获取当前节点的 Collider 组件
          const collider = this.getComponent(Collider);
          if (collider) {
            // 监听碰撞开始事件
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            // 监听碰撞持续事件（可选）
          }
        }

        onDestroy() {
          this.unscheduleAllCallbacks();
        }
        onTriggerEnter(event) {
          // 发生碰撞时触发
          console.log('Collision detected with: ', event.otherCollider.node.name);
          if (event.otherCollider.node.name === 'lumbermill') {
            // 暂停整个游戏逻辑
            //director.pause();

            const scene = director.getScene();
            if (scene) {
              console.log("当前场景获取成功");

              // 关闭主相机
              const mainCameraNode = scene.getChildByName('Main Camera');
              if (mainCameraNode) {
                mainCameraNode.active = false; // 停止主相机渲染
                console.log("主相机已关闭");
              } else {
                console.warn("未找到主相机节点");
              }

              // 获取当前场景中的 Canvas 节点
              const canvasNode = scene.getChildByName('Canvas');
              if (canvasNode) {
                // 检查 UI Prefab 是否存在
                if (!this.uiPrefab) {
                  console.error("UI 预制体未初始化");
                  return;
                }

                // 实例化并渲染 UI-2D 预制体
                const uiInstance = instantiate(this.uiPrefab);

                // 将 UI 预制体设为 Canvas 的子节点，并放在最顶层
                uiInstance.setParent(canvasNode);
                uiInstance.setPosition(0, 0, 0); // 设置位置

                // 确保 UI 预制体在 Canvas 的最顶层
                uiInstance.setSiblingIndex(canvasNode.children.length - 1);
                console.log("UI 预制体已加载并显示");
              } else {
                console.error("Canvas not found in the current scene!");
              }
            } else {
              console.error("无法获取当前场景");
            }
          }
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChangeCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Camera, _decorator, Component, input, Input, KeyCode;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Camera = module.Camera;
      _decorator = module._decorator;
      Component = module.Component;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "ea2ee4nN9dHSLnMiN9JSDfz", "ChangeCamera", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ChangeCamera = exports('ChangeCamera', (_dec = ccclass('ChangeCamera'), _dec2 = property({
        type: Camera
      }), _dec3 = property({
        type: Camera
      }), _dec(_class = (_class2 = class ChangeCamera extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "mainCamera", _descriptor, this);
          // 主摄像机
          _initializerDefineProperty(this, "topCamera", _descriptor2, this);
          // 顶视摄像机
          this._isMainCameraActive = true;
        }
        // 当前是否为主摄像机激活

        start() {
          // 初始化摄像机状态
          if (this.mainCamera && this.topCamera) {
            this.activateMainCamera();
          } else {
            console.error("Cameras are not assigned!");
          }

          // 监听键盘事件
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }
        onKeyDown(event) {
          if (event.keyCode === KeyCode.KEY_Q) {
            this.toggleCamera();
          }
        }
        toggleCamera() {
          if (this._isMainCameraActive) {
            this.activateTopCamera();
          } else {
            this.activateMainCamera();
          }
        }
        activateMainCamera() {
          if (this.mainCamera && this.topCamera) {
            this.mainCamera.node.active = true;
            this.topCamera.node.active = false;
            this._isMainCameraActive = true;
          }
        }
        activateTopCamera() {
          if (this.mainCamera && this.topCamera) {
            this.mainCamera.node.active = false;
            this.topCamera.node.active = true;
            this._isMainCameraActive = false;
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "topCamera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChessboardGenerator.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LevelController.ts', './Cubeflip.ts', './Global2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, Vec2, instantiate, Vec3, Collider, director, Node, LevelController, RotateAndMoveCubeOnKey, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      Vec2 = module.Vec2;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Collider = module.Collider;
      director = module.director;
      Node = module.Node;
    }, function (module) {
      LevelController = module.LevelController;
    }, function (module) {
      RotateAndMoveCubeOnKey = module.RotateAndMoveCubeOnKey;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "dff2aSjLOdEOKLk0l6rpGys", "ChessboardGenerator", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ChessboardGenerator = exports('ChessboardGenerator', (_dec = ccclass('ChessboardGenerator'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec6 = property(RotateAndMoveCubeOnKey), _dec(_class = (_class2 = class ChessboardGenerator extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "tilePrefab", _descriptor, this);
          _initializerDefineProperty(this, "prefab2", _descriptor2, this);
          _initializerDefineProperty(this, "animationPrefab", _descriptor3, this);
          _initializerDefineProperty(this, "uiPrefab", _descriptor4, this);
          // 需要渲染的UI-2D预制体
          _initializerDefineProperty(this, "tileSize", _descriptor5, this);
          _initializerDefineProperty(this, "rotateAndMoveCubeOnKey", _descriptor6, this);
          this.tiles = [];
          this.totalPrefabs2 = 0;
          this.triggeredPrefabs2 = 0;
          this.currentLevel = 0;
        }
        start() {
          const levelController = this.getComponent(LevelController);
          if (!levelController) {
            console.error("LevelController component not found!");
            return;
          }
          const levelPositions = [[new Vec2(0, 0), new Vec2(1, 2), new Vec2(3, 3)],
          // 第一关的 prefab2 放置位置
          [new Vec2(2, 1), new Vec2(0, 3), new Vec2(1, 1)],
          // 第二关的 prefab2 放置位置
          [new Vec2(1, 0), new Vec2(2, 2), new Vec2(3, 1)] // 第三关的 prefab2 放置位置
          // 继续为其他关卡设置位置
          ];

          const rows = 5;
          const cols = 4;
          console.log("yes" + levelController.positions);
          this.generateChessboard(rows, cols, levelController.positions);
        }
        generateChessboard(rows, cols, positions) {
          for (let i = 0; i < rows; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < cols; j++) {
              const tile = instantiate(this.tilePrefab);
              tile.setParent(this.node);
              const x = j * this.tileSize - cols * this.tileSize / 2 + this.tileSize / 2;
              const z = i * this.tileSize - rows * this.tileSize / 2 + this.tileSize / 2;
              tile.setPosition(new Vec3(x, 0, z));
              this.tiles[i][j] = tile;
              console.log(x, z);
              const positionMatch = positions.some(pos => pos.x === x && pos.y === z);
              if (positionMatch) {
                console.log('yes');
                this.placePrefab2AtPosition(new Vec2(j, i));
              }
            }
          }
        }
        placePrefab2AtPosition(gridPosition) {
          const row = gridPosition.y;
          const col = gridPosition.x;
          if (row >= this.tiles.length || col >= this.tiles[0].length || row < 0 || col < 0) {
            console.error("Position out of bounds");
            return;
          }
          const tile = this.tiles[row][col];
          const prefab2Instance = instantiate(this.prefab2);
          prefab2Instance.setParent(tile);
          prefab2Instance.setPosition(new Vec3(0, this.tileSize, 0));
          const collider = prefab2Instance.getComponent(Collider);
          if (collider) {
            collider.on('onTriggerEnter', this.onPrefab2CollisionEnter, this);
          }
          this.totalPrefabs2++;
          console.log(prefab2Instance.position);
        }
        async logUserAction() {
          const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
          const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
          const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token
          const level = Global.currentLevelIndex;
          if (!username || !sessionToken) {
            console.error('No username or sessionToken found.');
            return;
          }

          // 获取当前时间的北京时间
          const now = new Date();
          const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
          const beijingTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').slice(0, 19); // 格式化为 "YYYY-MM-DD HH:mm:ss"

          // 准备发送的数据
          const data = {
            tableName: 'user_pass',
            // 表名
            data: {
              Usr_ID: username,
              Level: level,
              Timestep: beijingTime // 使用北京时间
            }
          };

          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
              },
              body: JSON.stringify(data)
            });
            if (!response.ok) {
              throw new Error('Failed to log user action');
            }
            const result = await response.json();
            console.log('User action logged successfully:', result);
          } catch (error) {
            console.error('Error logging user action:', error);
          }
        }
        onPrefab2CollisionEnter(event) {
          console.log(`${event.otherCollider.node.name} collided with prefab2`);
          const prefab2Node = event.selfCollider.node;
          const animationInstance = instantiate(this.animationPrefab);
          animationInstance.setParent(this.node);
          animationInstance.setPosition(prefab2Node.worldPosition);
          prefab2Node.active = false;
          this.triggeredPrefabs2++;
          if (this.triggeredPrefabs2 >= this.totalPrefabs2) {
            this.logUserAction();
            //animationInstance.destroy();
            //director.loadScene("result");
            //this.onAllPrefabs2Triggered();

            // 获取当前场景中的 Canvas 节点
            const canvasNode = director.getScene().getChildByName('Canvas');

            // 检查 Canvas 是否存在
            if (canvasNode) {
              // 实例化并渲染 UI-2D 预制体
              const uiInstance = instantiate(this.uiPrefab);

              // 将 UI 预制体设为 Canvas 的子节点，并放在最顶层
              uiInstance.setParent(canvasNode);
              uiInstance.setScale(2, 2, 2);
              uiInstance.setPosition(0, 0, 0); // 设置位置

              // 确保 UI 预制体在 Canvas 的最顶层
              uiInstance.setSiblingIndex(canvasNode.children.length - 1);
            } else {
              console.error("Canvas not found in the current scene!");
            }

            // 获取 Main Camera 并设置其 active 为 false
            const mainCameraNode = director.getScene().getChildByName('Main Camera');
            if (mainCameraNode) {
              mainCameraNode.active = false;
            } else {
              console.error("Main Camera not found in the current scene!");
            }
          }
        }
        onAllPrefabs2Triggered() {
          console.log("All prefab2 instances have been triggered! Game Over!");
          const scene = director.getScene();
          if (scene) {
            scene.children.forEach(rootNode => {
              console.log(`Processing root node: ${rootNode.name}`);
              rootNode.children.forEach(child => {
                console.log(`Destroying child node: ${child.name}`);
                if (child.name && child.isValid) {
                  // 停止所有调度的更新函数
                  //director.getScheduler().unscheduleAllForTarget(child);
                  // 销毁子节点
                  child.active = false;
                }
              });
            });

            // 销毁所有根节点的子节点后，创建新的根节点来容纳新的 Canvas
            const newRootNode = new Node('NewRoot');
            scene.addChild(newRootNode);

            // 创建一个新的 Canvas 并添加到新的根节点
            //const canvasNode = new Node('Canvas');
            //const canvas = canvasNode.addComponent(Canvas);
            //newRootNode.addChild(canvasNode);

            // 设置 Canvas 尺寸适应屏幕
            /*
            const uiTransform = canvasNode.addComponent(UITransform);
            uiTransform.setContentSize(view.getVisibleSize());
                  // 创建并配置一个新的摄像机来渲染 Canvas
            const cameraNode = new Node('UICamera');
            const camera = cameraNode.addComponent(Camera);
            camera.priority = 2;  // 确保UI的渲染优先级更高
            camera.clearFlags = Camera.ClearFlag.DEPTH_ONLY; // 只清理深度
            camera.projection = Camera.ProjectionType.ORTHO;  // 使用正交投影
            camera.visibility = Layers.Enum.UI_2D;  // 仅渲染UI层
            cameraNode.setParent(canvasNode);
                  // 设置摄像机的区域和视口
            camera.orthoHeight = view.getVisibleSize().height / 2;
            cameraNode.setPosition(0, 0, 1000); // 将摄像机放置在前方
                  // 实例化并渲染UI-2D预制体
            const uiInstance = instantiate(this.uiPrefab);
            uiInstance.setParent(canvasNode); // 将UI预制体设为Canvas的子节点
            uiInstance.setPosition(0, 0, 0); // 设置位置
            */
            // 获取当前场景中的 Canvas 节点
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tilePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefab2", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animationPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "uiPrefab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tileSize", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rotateAndMoveCubeOnKey", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClickCount.ts", ['cc'], function (exports) {
  var cclegacy, Component, systemEvent, SystemEvent, EventMouse, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      EventMouse = module.EventMouse;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8a170ET6JZAMbTqJLQAX0vx", "ClickCount", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ClickablePrefab = exports('ClickablePrefab', (_dec = ccclass('ClickablePrefab'), _dec(_class = class ClickablePrefab extends Component {
        constructor(...args) {
          super(...args);
          this.clickCount = 0;
        }
        start() {
          systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        }
        onMouseUp(event) {
          if (event.getButton() === EventMouse.BUTTON_LEFT) {
            this.clickCount++;
            console.log(`Prefab clicked ${this.clickCount} times.`);
          }
        }
        onDestroy() {
          systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
        }
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Controller.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RotateUtil.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, Prefab, Camera, Node, Button, _decorator, Component, Vec3, Quat, physics, instantiate, RigidBody, Collider, input, Input, KeyCode, director, Canvas, UITransform, view, Layers, RotateUtil;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Prefab = module.Prefab;
      Camera = module.Camera;
      Node = module.Node;
      Button = module.Button;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      physics = module.physics;
      instantiate = module.instantiate;
      RigidBody = module.RigidBody;
      Collider = module.Collider;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      director = module.director;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      view = module.view;
      Layers = module.Layers;
    }, function (module) {
      RotateUtil = module.RotateUtil;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "a5450KlIRZMf4X+QJKQ+hHk", "Controller", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let Controller = exports('Controller', (_dec = ccclass('Controller'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Camera
      }), _dec6 = property(Prefab), _dec7 = property({
        type: Node
      }), _dec8 = property(Button), _dec9 = property(Button), _dec(_class = (_class2 = class Controller extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "operationCountLabel", _descriptor, this);
          _initializerDefineProperty(this, "operationTimeLabel", _descriptor2, this);
          _initializerDefineProperty(this, "prefab", _descriptor3, this);
          // 要实例化和旋转的预制体
          _initializerDefineProperty(this, "camera", _descriptor4, this);
          // 摄像机对象
          _initializerDefineProperty(this, "uiPrefab", _descriptor5, this);
          // 需要渲染的UI-2D预制体
          _initializerDefineProperty(this, "targetCylinder", _descriptor6, this);
          // 另一个需要拉长的圆柱体
          _initializerDefineProperty(this, "moveDownButton", _descriptor7, this);
          // 控制下降的按钮  
          _initializerDefineProperty(this, "moveUpButton", _descriptor8, this);
          // 控制上升的按钮
          this.instantiatedNode = null;
          // 存储实例化后的节点
          this._isRotating = false;
          this._lastMousePos = new Vec3();
          this._rotationSpeed = 0.01;
          // 调整旋转速度
          this.minSwipeDistance = 5;
          // 设置触摸滑动的最小距离阈值
          this.currentAxis = null;
          // 当前选定的旋转轴
          this._isMovingUp = false;
          // 判断是否按下空格键或触发按钮
          this._isMovingDown = false;
          // 判断是否按下空格键或触发按钮
          this._moveSpeed = 0.08;
          // 上升速度
          this.operationCount = 0;
          // To track the number of operations
          this.operationTime = 0;
          // To track the total time of operations
          this.stop_update = true;
          this.savedRotation = new Quat();
        }
        // 用于保存旋转姿态

        start() {
          // 实例化预制体并添加到场景中
          if (this.prefab) {
            physics.PhysicsSystem.instance.fixedTimeStep = 1 / 120;
            this.instantiatedNode = instantiate(this.prefab);
            this.node.addChild(this.instantiatedNode); // 将实例化的预制体添加到当前节点
            this.instantiatedNode.setPosition(0, 0, 0); // 设置实例化节点的位置
          }

          const rigidBody = this.instantiatedNode.getComponent(RigidBody);
          if (rigidBody) {
            rigidBody.useCCD = true; // 开启 CCD
          }

          const colliders = this.instantiatedNode.getComponents(Collider);
          colliders.forEach((collider, index) => {
            console.log(`Collider ${index}:`, collider);
            collider.on('onCollisionEnter', this.onCollisionEnter, this); // 监听碰撞事件
          });

          // 监听鼠标和触摸事件
          //input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
          //input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          //input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

          // 监听键盘按下和抬起事件
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

          // 设置按钮点击事件
          if (this.moveUpButton) {
            this.moveUpButton.node.on(Input.EventType.TOUCH_START, this.onMoveUpButtonPress, this);
            this.moveUpButton.node.on(Input.EventType.TOUCH_END, this.onMoveUpButtonRelease, this);
            this.moveUpButton.node.on(Input.EventType.TOUCH_CANCEL, this.onMoveUpButtonRelease, this); // 处理取消事件
          }

          if (this.moveDownButton) {
            this.moveDownButton.node.on(Input.EventType.TOUCH_START, this.onMoveDownButtonPress, this);
            this.moveDownButton.node.on(Input.EventType.TOUCH_END, this.onMoveDownButtonRelease, this);
            this.moveDownButton.node.on(Input.EventType.TOUCH_CANCEL, this.onMoveDownButtonRelease, this); // 处理取消事件
          }
        }

        onCollisionEnter(event) {
          console.log("Collision detected, restoring rotation and moving down...");

          // 停止上升和下降
          this._isMovingUp = false;
          this._isMovingDown = false;

          // 恢复上一次保存的旋转姿态
          this.instantiatedNode.setRotation(this.savedRotation);

          // 将物体位置向下移动
          let currentPosition = this.instantiatedNode.getPosition();
          const downShiftAmount = 1.0; // 调整下移的量
          currentPosition.y -= downShiftAmount;
          this.instantiatedNode.setPosition(currentPosition);

          // 同步 Cylinder 的位置和缩放
          if (this.targetCylinder) {
            let cylinderScale = this.targetCylinder.getScale();
            let cylinderPosition = this.targetCylinder.getPosition();

            // 增加 Cylinder 的高度和下移位置以保持顶部固定
            cylinderScale.y += downShiftAmount / 2.3;
            cylinderPosition.y -= downShiftAmount / 2.3;

            // 应用更新
            this.targetCylinder.setScale(cylinderScale);
            this.targetCylinder.setPosition(cylinderPosition);
          }

          // 停止上升
          this._isMovingUp = false;
        }
        onMoveDownButtonPress() {
          this._isMovingDown = true;
        }
        onMoveDownButtonRelease() {
          this._isMovingDown = false;
        }
        onMouseDown(event) {
          this._isRotating = true;
          this._lastMousePos.set(event.getLocationX(), event.getLocationY(), 0);
        }
        onMouseMove(event) {
          if (!this._isRotating || !this.instantiatedNode) return;
          let deltaX = event.getLocationX() - this._lastMousePos.x;
          let deltaY = event.getLocationY() - this._lastMousePos.y;
          this._lastMousePos.set(event.getLocationX(), event.getLocationY(), 0);
          let worldMatrix = this.camera.node.worldMatrix;
          let cameraRight = new Vec3(worldMatrix.m00, worldMatrix.m01, worldMatrix.m02); // X轴方向（右向量）
          let cameraUp = new Vec3(worldMatrix.m04, worldMatrix.m05, worldMatrix.m06); // Y轴方向（上向量）

          RotateUtil.rotateAround(this.instantiatedNode, cameraUp, deltaX * this._rotationSpeed);
          RotateUtil.rotateAround(this.instantiatedNode, cameraRight, -deltaY * this._rotationSpeed);
        }
        onMouseUp(event) {
          this._isRotating = false;
          this.snapRotationToClosest90Degrees();
        }
        onTouchStart(event) {
          this._isRotating = true;
          const touch = event.getTouches()[0];
          this._lastMousePos.set(touch.getLocationX(), touch.getLocationY(), 0);
          this.currentAxis = null; // 重置旋转轴锁定
        }

        onTouchMove(event) {
          if (!this._isRotating || !this.instantiatedNode) return;
          const touch = event.getTouches()[0];
          let deltaX = touch.getLocationX() - this._lastMousePos.x;
          let deltaY = touch.getLocationY() - this._lastMousePos.y;

          // 检查滑动距离是否达到设定阈值
          if (!this.currentAxis && Math.sqrt(deltaX * deltaX + deltaY * deltaY) >= this.minSwipeDistance) {
            // 如果达到最小滑动距离，根据方向锁定旋转轴
            if (deltaX > 0 && deltaY > 0) {
              this.currentAxis = 'Z'; // 左下到右上，Z轴正方向旋转
            } else if (deltaX < 0 && deltaY < 0) {
              this.currentAxis = 'Z'; // 右上到左下，Z轴负方向旋转
            } else if (deltaX > 0 && deltaY < 0) {
              this.currentAxis = 'X'; // 右下到左上，X轴正方向旋转
            } else if (deltaX < 0 && deltaY > 0) {
              this.currentAxis = 'X'; // 左上到右下，X轴负方向旋转
            } else if (deltaX > 0 && deltaY === 0) {
              this.currentAxis = 'Y'; // 水平左往右，Y轴正方向旋转
            } else if (deltaX < 0 && deltaY === 0) {
              this.currentAxis = 'Y'; // 水平右往左，Y轴负方向旋转
            }
          }

          // 获取摄像机的世界矩阵以定义旋转轴
          let worldMatrix = this.camera.node.worldMatrix;
          let cameraRight = Vec3.RIGHT.clone(); // X轴方向
          let cameraUp = Vec3.UP.clone(); // Y轴方向
          let cameraForward = Vec3.FORWARD.clone(); // Z轴方向

          let rotationAmount = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * this._rotationSpeed;

          // 根据锁定的 currentAxis 执行旋转
          if (this.currentAxis === 'Z') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraForward, deltaX > 0 ? rotationAmount : -rotationAmount);
          } else if (this.currentAxis === 'X') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraRight, deltaX > 0 ? rotationAmount : -rotationAmount);
          } else if (this.currentAxis === 'Y') {
            RotateUtil.rotateAround(this.instantiatedNode, cameraUp, deltaX > 0 ? rotationAmount : -rotationAmount);
          }
          this._lastMousePos.set(touch.getLocationX(), touch.getLocationY(), 0);
        }
        onTouchEnd(event) {
          this._isRotating = false;
          this.snapRotationToClosest90Degrees();
          this.currentAxis = null; // 重置轴锁定状态
          this.operationCount += 1;
        }
        snapRotationToClosest90Degrees() {
          if (this.instantiatedNode) {
            let euler = new Vec3();
            this.instantiatedNode.getRotation().getEulerAngles(euler);
            euler.x = Math.round(euler.x / 90) * 90;
            euler.y = Math.round(euler.y / 90) * 90;
            euler.z = Math.round(euler.z / 90) * 90;
            this.instantiatedNode.setRotationFromEuler(euler.x, euler.y, euler.z);
            // 保存旋转姿态
            this.instantiatedNode.getRotation(this.savedRotation);
          }
        }
        onKeyDown(event) {
          // 检测空格键
          if (event.keyCode === KeyCode.SPACE) {
            this._isMovingUp = true;
          }
        }
        onKeyUp(event) {
          // 释放空格键
          if (event.keyCode === KeyCode.SPACE) {
            this._isMovingUp = false;
          }
        }
        onMoveUpButtonPress() {
          this._isMovingUp = true;
        }
        onMoveUpButtonRelease() {
          this._isMovingUp = false;
        }
        update(deltaTime) {
          this.operationTime += deltaTime;
          //this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
          //this.operationCountLabel.string = `翻滚次数: ${this.operationCount}`;
          // 如果按下空格键或点击按钮，并且 instantiatedNode 的名字为 "Node"
          if (this._isMovingUp && this.instantiatedNode && this.node.name === "Node") {
            // 上升时，instantiatedNode 向上移动
            let currentPosition = this.instantiatedNode.getPosition();
            currentPosition.y += this._moveSpeed;
            this.instantiatedNode.setPosition(currentPosition);
            if (this.targetCylinder) {
              // 获取当前的缩放和位置
              let currentScale = this.targetCylinder.getScale();
              let targetPosition = this.targetCylinder.getPosition();

              // 平滑减少 Cylinder 的高度
              let heightChange = this._moveSpeed;

              // 调整 Cylinder 的 scale 和 position，使顶部保持固定
              currentScale.y -= heightChange / 2.3;
              targetPosition.y += heightChange / 2.3; // 上移以保持顶部位置不变

              // 应用更新后的缩放和位置
              this.targetCylinder.setScale(currentScale);
              this.targetCylinder.setPosition(targetPosition);
            }
          }
          if (this._isMovingDown && this.instantiatedNode && this.node.name === "Node") {
            // 下降时，instantiatedNode 向下移动
            let currentPosition = this.instantiatedNode.getPosition();
            currentPosition.y -= this._moveSpeed;
            this.instantiatedNode.setPosition(currentPosition);
            if (this.targetCylinder) {
              // 获取当前的缩放和位置
              let currentScale = this.targetCylinder.getScale();
              let targetPosition = this.targetCylinder.getPosition();

              // 平滑增加 Cylinder 的高度
              let heightChange = this._moveSpeed;

              // 调整 Cylinder 的 scale 和 position，使顶部保持固定
              currentScale.y += heightChange / 2.3;
              targetPosition.y -= heightChange / 2.3; // 下移以保持顶部位置不变

              // 应用更新后的缩放和位置
              this.targetCylinder.setScale(currentScale);
              this.targetCylinder.setPosition(targetPosition);
            }
          }
          if (this.instantiatedNode && this.instantiatedNode.getPosition().y > 26 && this.stop_update) {
            const scene = director.getScene();
            if (scene) {
              scene.children.forEach(rootNode => {
                console.log(`Processing root node: ${rootNode.name}`);
                rootNode.children.forEach(child => {
                  console.log(`Destroying child node: ${child.name}`);
                  if (child.name && child.isValid) {
                    // 停止所有调度的更新函数
                    //director.getScheduler().unscheduleAllForTarget(child);
                    // 销毁子节点
                    child.active = false;
                  }
                });
              });
            }
            // 销毁所有根节点的子节点后，创建新的根节点来容纳新的 Canvas
            const newRootNode = new Node('NewRoot');
            scene.addChild(newRootNode);

            // 创建一个新的 Canvas 并添加到新的根节点
            const canvasNode = new Node('Canvas');
            const canvas = canvasNode.addComponent(Canvas);
            newRootNode.addChild(canvasNode);

            // 设置 Canvas 尺寸适应屏幕
            const uiTransform = canvasNode.addComponent(UITransform);
            uiTransform.setContentSize(view.getVisibleSize());

            // 创建并配置一个新的摄像机来渲染 Canvas
            const cameraNode = new Node('UICamera');
            const camera = cameraNode.addComponent(Camera);
            camera.priority = 2; // 确保UI的渲染优先级更高
            camera.clearFlags = Camera.ClearFlag.DEPTH_ONLY; // 只清理深度
            camera.projection = Camera.ProjectionType.ORTHO; // 使用正交投影
            camera.visibility = Layers.Enum.UI_2D; // 仅渲染UI层
            cameraNode.setParent(canvasNode);

            // 设置摄像机的区域和视口
            camera.orthoHeight = view.getVisibleSize().height / 2;
            cameraNode.setPosition(0, 0, 1000); // 将摄像机放置在前方

            // 实例化并渲染UI-2D预制体
            const uiInstance = instantiate(this.uiPrefab);
            uiInstance.setParent(canvasNode); // 将UI预制体设为Canvas的子节点
            uiInstance.setPosition(0, 0, 0); // 设置位置
            this.stop_update = false;
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "operationCountLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "operationTimeLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "uiPrefab", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "targetCylinder", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "moveDownButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "moveUpButton", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Cubeflip.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, _decorator, Component, Vec3, Quat, systemEvent, SystemEvent, MeshRenderer, Color, input, Input, KeyCode, misc, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      MeshRenderer = module.MeshRenderer;
      Color = module.Color;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
      misc = module.misc;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "ce0c5A6DP1ENoBlbbZJIsvN", "Cubeflip", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let RotateAndMoveCubeOnKey = exports('RotateAndMoveCubeOnKey', (_dec = ccclass('RotateAndMoveCubeOnKey'), _dec2 = property(Label), _dec3 = property(Label), _dec(_class = (_class2 = class RotateAndMoveCubeOnKey extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "operationCountLabel", _descriptor, this);
          _initializerDefineProperty(this, "operationTimeLabel", _descriptor2, this);
          this.isAnimating = false;
          // 用于防止动画重叠
          this.initialEulerAngles = void 0;
          // 存储初始欧拉角的变量
          this.operationCount = 0;
          // To track the number of operations
          this.operationTime = 0;
          // To track the total time of operations
          this.isTiming = true;
          // 用于判断是否开始计时
          this.touchStartPos = new Vec3();
          // 触摸起始位置
          this.startRotation = new Quat();
          // 初始四元数
          this.endRotation = new Quat();
          // 目标四元数
          this.startPosition = new Vec3();
          // 初始位置
          this.endPosition = new Vec3();
          // 目标位置
          this.currentLerpTime = 0;
          this.totalLerpTime = 0.5;
          // 总的插值时间，这里设置为0.5秒
          this.minSwipeDistance = 50;
        }
        // 最小滑动距离阈值

        start() {
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          this.placeCubeAboveTile(3, 2); // 假设您想要将立方体放在第一行第一列的格子正上方

          this.initialEulerAngles = this.node.eulerAngles.clone();
          this.isTiming = true; // 开始计时
          this.operationTime = 0; // 初始化操作时间

          // 获取 Cube 的 MeshRenderer 组件
          const meshRenderer = this.node.getComponent(MeshRenderer);
          if (meshRenderer) {
            // 获取材质并设置颜色为黄色
            const material = meshRenderer.material;
            material.setProperty('albedo', new Color(255, 255, 0, 255)); // 黄色
          } else {
            console.warn("Cube does not have a MeshRenderer component.");
          }

          // 监听触摸事件
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }
        async logPlayerAction(operation) {
          const apiUrl = 'http://124.71.181.62:3000/api/insertData'; // 替换为你的API地址
          const username = localStorage.getItem('currentUsername'); // 从localStorage中获取用户名
          const sessionToken = localStorage.getItem('sessionToken'); // 从localStorage中获取token

          if (!username || !sessionToken) {
            console.error('No username or sessionToken found.');
            return;
          }

          // 获取当前时间
          // 获取当前时间的北京时间
          const now = new Date();
          const offset = 8 * 60 * 60 * 1000; // UTC+8 的时间偏移（毫秒）
          const beijingTime = new Date(now.getTime() + offset).toISOString().replace('T', ' ').slice(0, 19); // 格式化为 "YYYY-MM-DD HH:mm:ss"

          // 获取当前关卡（假设从 Global.currentindex 中获取）
          const level = Global.currentLevelIndex;

          // 准备发送的数据
          // 准备发送的数据
          const data = {
            tableName: 'game1',
            // 表名
            data: {
              Usr_ID: username,
              Timestep: beijingTime,
              // 使用北京时间
              Level: level,
              Operation: operation
            }
          };
          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionToken}`
              },
              body: JSON.stringify(data)
            });
            if (!response.ok) {
              throw new Error('Failed to log player action');
            }
            const result = await response.json();
            console.log('Player action logged successfully:', result);
          } catch (error) {
            console.error('Error logging player action:', error);
          }
        }
        onTouchStart(event) {
          // 获取触摸起点
          const touch = event.getTouches()[0];
          this.touchStartPos.set(touch.getLocationX(), touch.getLocationY(), 0);
        }
        onTouchEnd(event) {
          // 获取触摸终点
          const touch = event.getTouches()[0];
          const touchEndPos = new Vec3(touch.getLocationX(), touch.getLocationY(), 0);

          // 计算滑动的方向和距离
          const deltaX = touchEndPos.x - this.touchStartPos.x;
          const deltaY = touchEndPos.y - this.touchStartPos.y;
          const swipeDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          if (swipeDistance < this.minSwipeDistance) {
            console.log("滑动距离不足，忽略事件");
            return; // 如果距离不足，直接返回
          }

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // 左右滑动
            if (deltaX > 0) {
              this.onKeyDown({
                keyCode: KeyCode.KEY_D
              });
            } else {
              this.onKeyDown({
                keyCode: KeyCode.KEY_A
              });
            }
          } else {
            // 上下滑动
            if (deltaY > 0) {
              this.onKeyDown({
                keyCode: KeyCode.KEY_W
              });
            } else {
              this.onKeyDown({
                keyCode: KeyCode.KEY_S
              });
            }
          }
        }
        onKeyDown(event) {
          if (!this.isAnimating) {
            //this.operationCount++;
            this.operationTime = 0; // Reset the operation time for each new operation
          }

          // 定义棋盘范围
          const boardWidth = 4; // 棋盘宽度（列数）
          const boardHeight = 5; // 棋盘高度（行数）
          const tileSize = 1; // 格子大小
          const minX = -(boardWidth * tileSize) / 2;
          const maxX = boardWidth * tileSize / 2;
          const minZ = -(boardHeight * tileSize) / 2;
          const maxZ = boardHeight * tileSize / 2;

          // 计算目标位置
          const currentPosition = this.node.position.clone();
          let targetPosition;
          switch (event.keyCode) {
            case KeyCode.KEY_A:
              targetPosition = currentPosition.clone().add(new Vec3(-tileSize, 0, 0));
              break;
            case KeyCode.KEY_D:
              targetPosition = currentPosition.clone().add(new Vec3(tileSize, 0, 0));
              break;
            case KeyCode.KEY_W:
              targetPosition = currentPosition.clone().add(new Vec3(0, 0, -tileSize));
              break;
            case KeyCode.KEY_S:
              targetPosition = currentPosition.clone().add(new Vec3(0, 0, tileSize));
              break;
            default:
              return;
            // 如果按键无效，直接返回
          }

          // 检查目标位置是否在棋盘范围内
          if (targetPosition.x < minX || targetPosition.x > maxX || targetPosition.z < minZ || targetPosition.z > maxZ) {
            console.log("目标位置超出棋盘范围，操作被取消！");
            return;
          }

          // 执行翻滚动作
          if (!this.isAnimating) {
            let operation = '';
            switch (event.keyCode) {
              case KeyCode.KEY_A:
                operation = 'A';
                this.rotateByAxis(new Vec3(-1, 0, 0), new Vec3(0, 0, 1), 90);
                break;
              case KeyCode.KEY_D:
                operation = 'D';
                this.rotateByAxis(new Vec3(1, 0, 0), new Vec3(0, 0, 1), -90);
                break;
              case KeyCode.KEY_W:
                operation = 'W';
                this.rotateByAxis(new Vec3(0, 0, -1), new Vec3(1, 0, 0), -90);
                break;
              case KeyCode.KEY_S:
                operation = 'S';
                this.rotateByAxis(new Vec3(0, 0, 1), new Vec3(1, 0, 0), 90);
                break;
            }
            this.logPlayerAction(operation);
          }
        }
        rotateByAxis(startPos, axis, angle) {
          this.startPosition = this.node.position.clone(); // 保存初始位置
          Vec3.add(this.endPosition, this.startPosition, startPos); // 结束位置是相对移动

          this.startRotation = this.node.rotation.clone(); // 保存初始旋转
          let rad = misc.degreesToRadians(angle);
          this.endRotation = Quat.rotateAround(new Quat(), this.startRotation, axis, rad); // 计算并保存目标旋转四元数
          Quat.normalize(this.endRotation, this.endRotation);
          this.currentLerpTime = 0;
          this.isAnimating = true;
        }
        update(deltaTime) {
          if (this.isAnimating) {
            this.currentLerpTime += deltaTime;
            if (this.currentLerpTime > this.totalLerpTime) {
              this.currentLerpTime = this.totalLerpTime;
            }
            let lerpRatio = this.currentLerpTime / this.totalLerpTime;
            let currentRotation = Quat.slerp(new Quat(), this.startRotation, this.endRotation, lerpRatio);
            this.node.setRotation(currentRotation);
            let currentPosition = Vec3.lerp(new Vec3(), this.startPosition, this.endPosition, lerpRatio);
            this.node.setPosition(currentPosition);
            if (lerpRatio >= 1) {
              this.isAnimating = false;
            }
          }
          if (this.isTiming) {
            this.operationTime += deltaTime;
            //this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
            //this.operationCountLabel.string = `翻滚次数: ${this.operationCount}`;
          }
        }

        placeCubeAboveTile(row, col) {
          // 确保与 ChessboardGenerator 中的格子位置计算方式一致
          const cols = 4; // 假设棋盘的列数
          const rows = 5; // 假设棋盘的行数
          const tileSize = 1; // 假设棋盘格子的大小为 1

          const posX = col * tileSize - cols * tileSize / 2 + tileSize / 2;
          const posZ = row * tileSize - rows * tileSize / 2 + tileSize / 2;
          this.node.setPosition(new Vec3(posX, 0, posZ));
        }
        onDestroy() {
          systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "operationCountLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "operationTimeLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Cubes.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Levels.ts', './Global2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Camera, Node, Prefab, _decorator, Component, NodePool, Tween, RigidBody, instantiate, geometry, PhysicsSystem, Vec3, clamp, Layers, Quat, UIOpacity, tween, director, Collider, Levels, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Camera = module.Camera;
      Node = module.Node;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      NodePool = module.NodePool;
      Tween = module.Tween;
      RigidBody = module.RigidBody;
      instantiate = module.instantiate;
      geometry = module.geometry;
      PhysicsSystem = module.PhysicsSystem;
      Vec3 = module.Vec3;
      clamp = module.clamp;
      Layers = module.Layers;
      Quat = module.Quat;
      UIOpacity = module.UIOpacity;
      tween = module.tween;
      director = module.director;
      Collider = module.Collider;
    }, function (module) {
      Levels = module.Levels;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "81d4eLB8j5NELnDioXtJ6pn", "Cubes", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let Cubes = exports('Cubes', (_dec = ccclass('Cubes'), _dec2 = property(Camera), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec8 = property(Prefab), _dec9 = property(Prefab), _dec10 = property(Prefab), _dec11 = property(Prefab), _dec(_class = (_class2 = class Cubes extends Component {
        constructor(...args) {
          super(...args);
          //@property(SpriteAtlas)
          //sprAtlas:SpriteAtlas = null; //精灵图集
          _initializerDefineProperty(this, "camera0", _descriptor, this);
          _initializerDefineProperty(this, "effectNode", _descriptor2, this);
          _initializerDefineProperty(this, "selcetNode", _descriptor3, this);
          _initializerDefineProperty(this, "prefab1", _descriptor4, this);
          // 预制体1
          _initializerDefineProperty(this, "prefab2", _descriptor5, this);
          // 预制体2
          _initializerDefineProperty(this, "prefab3", _descriptor6, this);
          // 预制体3
          _initializerDefineProperty(this, "prefab4", _descriptor7, this);
          // 预制体4
          _initializerDefineProperty(this, "prefab5", _descriptor8, this);
          // 预制体5
          _initializerDefineProperty(this, "prefab6", _descriptor9, this);
          // 预制体6
          this.operationTimeLabel = null;
          _initializerDefineProperty(this, "uiPrefab", _descriptor10, this);
          // 用于显示通关后的UI预制体  
          this._level = 0;
          this._config = null;
          this._locked = false;
          //避免同时多个操作
          this._matching = 0;
          //匹配计数
          this._baseNode = null;
          this._nodePool = new NodePool();
          this._localBuffer = new Float32Array(4);
          this._effectInc = 0;
          this._matchCount = 0;
          this._paiSelectCount = 0;
          //已选择总数
          this._paiRands = new Array();
          //新随机队列
          this._paiSelets = new Array();
          //已选立方体
          this._paiInWorld = new Map();
          //未选立方体
          this._threeErase = new Array();
          //新随机队列
          this.operationTime = 0;
          // To track the total time of operations
          this.true_level = Global.currentLevelIndex;
        }
        start() {
          const levelMapping = {
            15: 0,
            // true_level = 15 对应 Levels[0]
            16: 1,
            // true_level = 16 对应 Levels[1]
            17: 2,
            // true_level = 17 对应 Levels[2]
            18: 3,
            // true_level = 18 对应 Levels[3]
            19: 4 // true_level = 19 对应 Levels[4]
          };

          this._level = levelMapping[this.true_level];
          //测试代码
          this.resetLevel();
          this.faPai();
        }
        onDestroy() {
          Tween.stopAll(); //停止所有正在进行的补间动画
          this.unscheduleAllCallbacks();
          if (this._baseNode) {
            this._baseNode.destroy();
          }
          this._nodePool.clear(); //清空节点池里所有节点
        }

        nextLevel() {
          this._level++;
          this.resetLevel();

          // 解除所有节点的 sleep 状态
          this.node.children.forEach(node => {
            this.enablePhysics(node, true);
            let rigidBody = node.getComponent(RigidBody);
            if (rigidBody) {
              rigidBody.wakeUp();
            }
          });
        }
        resetLevel() {
          this.resetWorld();
          this.loadLevel(this._level);
        }
        putNode(node) {
          this._nodePool.put(node);
        }
        getNode(type) {
          let node = this._nodePool.get();
          if (!node) {
            node = instantiate(this.prefabNode(type)); //节点池没有对应类型的节点，则实例化一个新的节点
          }

          return node;
        }
        prefabNode(type) {
          let prefab = null;
          switch (type) {
            case 0:
              prefab = this.prefab1;
              break;
            case 1:
              prefab = this.prefab2;
              break;
            case 2:
              prefab = this.prefab3;
              break;
            case 3:
              prefab = this.prefab4;
              break;
            case 4:
              prefab = this.prefab5;
              break;
            case 5:
              prefab = this.prefab6;
              break;
          }
          let node = instantiate(prefab);
          return node;
        }
        enablePhysics(node, enable) {
          // 递归函数，用于遍历节点及其子节点
          const togglePhysics = currentNode => {
            // 获取当前节点的 RigidBody 组件
            let body = currentNode.getComponent(RigidBody);
            if (body) {
              body.enabled = enable; // 启用或禁用 RigidBody 组件
            }

            // 获取当前节点的 Collider 组件
            let collider = currentNode.getComponent(Collider);
            if (collider) {
              collider.enabled = enable; // 启用或禁用 Collider 组件
            }

            // 遍历当前节点的所有子节点，递归调用
            currentNode.children.forEach(child => {
              togglePhysics(child);
            });
          };

          // 开始递归遍历从指定节点开始的整个节点树
          togglePhysics(node);
        }
        removeFromWorld(node) {
          let nodes = this._paiInWorld.get(node.name);
          let idx = nodes.indexOf(node);
          if (idx >= 0) {
            nodes.splice(idx, 1);
          }
          console.log(`正在移除节点: ${node.name}`);
          node.destroy(); // 确保节点已销毁
        }

        wakeUpOthers(node) {
          //唤醒周围物体

          let pos = node.position;
          let ray = new geometry.Ray(pos.x, pos.y, pos.z, 0, 1, 0); //创建一条从节点位置发射向上的射线
          if (PhysicsSystem.instance.sweepBox(ray, new Vec3(1.5, 1, 2), node.rotation, 0x2, 20, false)) {
            let results = PhysicsSystem.instance.sweepCastResults;
            for (let i = 0; i < results.length; i++) {
              results[i].collider.attachedRigidBody.wakeUp();
            }
            //唤醒所有检测到的物体的刚体
          }
        }

        resetWorld() {
          Tween.stopAll();
          this.unscheduleAllCallbacks();
          let effects = this.effectNode; //关闭特效节点的所有子节点
          effects.children[0].active = false;
          effects.children[1].active = false;
          effects.children[2].active = false;
          this._paiSelets.forEach(nodes => {
            for (let i = nodes.length - 1; i >= 0; i--) {
              this.putNode(nodes[i]);
            }
            //将已选中的物体放回节点池
          });

          //将游戏世界中的所有子节点放回节点池
          let nodes = this.node.children;
          for (let i = nodes.length - 1; i >= 0; i--) {
            this.putNode(nodes[i]);
          }
          this._paiSelets.length = 0;
          this._paiSelectCount = 0;
          this._paiInWorld.clear();
          this._matching = 0;
          this._matchCount = 0;
          this._locked = false;
          //重置所有的状态和计数器
        }

        loadLevel(lv) {
          lv = clamp(0, Levels.length - 1, lv); //将关卡限制在有效范围内
          let config = Levels[lv]; //获取制定关卡的配置
          let times = config.Count; //获取配置中的方块数量

          this._config = config;
          this._level = lv;

          // 设置类型队列
          let paiRands = this._paiRands = [];
          if (config.CustomOrder && config.CustomOrder.length > 0) {
            // 使用自定义顺序
            paiRands.push(...config.CustomOrder.map(item => item.toString()));
          } else {
            // 随机生成队列
            for (let i = 0; i < config.Count; i++) {
              let j = i % config.Types.length;
              paiRands.push(j.toString(), j.toString(), j.toString()); // 每种类型重复
            }

            // 随机打乱
            for (let i = paiRands.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [paiRands[i], paiRands[j]] = [paiRands[j], paiRands[i]];
            }
          }
          console.log("生成的队列:", paiRands); // 检查最终队列
        }

        getPai(name = null) {
          if (!name) name = this._paiRands.pop();
          if (!name) return null;
          let type = parseInt(name); // 将名称转换为类型编号
          let node = this.getNode(type);
          this.node.addChild(node); //将节点添加到游戏世界中

          this.enablePhysics(node, true);
          node.getComponent(RigidBody).angularDamping = 0.4; //角阻尼
          node.scale = this._level > 0 ? Vec3.ONE : new Vec3(1.25, 1.25, 1.25); //节点的缩放比例
          node.layer = Layers.Enum.DEFAULT;
          node.rotation = Quat.IDENTITY;
          node.name = type.toString(); // 使用类型编号作为名称

          // 插入到 world
          let nodes = this._paiInWorld.get(node.name);
          if (!nodes) {
            nodes = [];
            this._paiInWorld.set(node.name, nodes);
          }
          //将节点插入到未选中的物体列表中
          nodes.push(node);
          return node;
        }
        combineEffect(position) {
          //在指定位置播放合成效果的方法

          let parent = this.effectNode;
          let out = this.camera0.convertToUINode(position, parent); //将世界坐标转换为UI坐标
          let node = parent.children[this._effectInc];
          node.position = out;
          node.active = true;
          //激活对应索引的特效节点，并设置其位置

          let n0 = node.children[0];
          let n1 = node.children[1];
          let n2 = node.children[2];
          let o1 = n1.getComponent(UIOpacity);
          let o2 = n2.getComponent(UIOpacity);
          //获取特效节点的子节点及其透明度组件

          n0.setScale(new Vec3(1.5, 1.5, 1.5));
          n1.setScale(new Vec3(0.5, 0.5, 0.5));
          n2.setScale(Vec3.ZERO);
          //设置各子节点的初识缩放
          o1.opacity = 255;
          o2.opacity = 255;
          //设置子节点的初识透明度
          tween().target(n0).to(0.2, {
            scale: Vec3.ZERO
          }, {
            easing: "quadOut"
          }).start();
          tween().target(n1).to(0.1, {
            scale: Vec3.ONE
          }, {
            easing: "quintOut"
          }).start();
          tween().target(o1).to(0.1, {
            opacity: 0
          }).start();
          tween().target(n2).to(0.2, {
            scale: Vec3.ONE
          }, {
            easing: "quintOut"
          }).start();
          tween().target(o2).delay(0.1).to(0.1, {
            opacity: 0
          }).start();
          this.scheduleOnce(() => {
            node.active = false;
          }, 0.25);
          this._effectInc = ++this._effectInc % parent.children.length;
        }
        fixPosition(idx, finish) {
          //修正方块位置的方法

          let count = 0;
          let selects = this._paiSelets;
          let pos = this.selcetNode.position;
          //获取当前已选中的方块和选择区域的位置
          for (let i = 0, k = 0; i < selects.length; i++) {
            let nodes = selects[i];
            for (let j = 0; j < nodes.length; j++, k++) {
              let node = nodes[j];
              if (k >= idx) {
                count++;
                let targetPosition = new Vec3((k - 3) * 3.5, 0, 23);
                tween().target(node).to(0.3, {
                  position: targetPosition
                }, {
                  easing: "quintOut"
                }).call(() => {
                  let rigidBody = node.getComponent(RigidBody);
                  if (rigidBody) {
                    //rigidBody.type = RigidBody.Type.KINEMATIC; // 切换到 Kinematic 刚体类型
                    rigidBody.setLinearVelocity(Vec3.ZERO); // 停止线性运动
                    rigidBody.setAngularVelocity(Vec3.ZERO); // 停止旋转
                    rigidBody.sleep(); // 让刚体休眠，避免不必要的物理交互
                  }

                  if (--count == 0) {
                    finish();
                  }
                }).start();
              }
            }
          }
          if (count == 0) {
            finish();
          }
        }
        fixSelectEnd() {
          //修正已选方块的方法

          let count = 0;
          let selects = this._paiSelets;
          for (let i = selects.length - 1; i >= 0; i--) {
            let nodes = selects[i];
            let length = nodes.length;
            if (length >= 3) {
              count += 3;
              let n0 = nodes.pop();
              let n1 = nodes.pop();
              let n2 = nodes.pop();
              this._paiSelectCount -= 3;
              if (nodes.length == 0) selects.splice(i, 1);
              //如果某种方块已选中超过三个，移除这三个方块

              const end = () => {
                this.combineEffect(n1.worldPosition);
                this.putNode(n0);
                this.putNode(n1);
                this.putNode(n2);
                count -= 3;
                if (count == 0) {
                  this.fixPosition(0, () => {});
                  this._matching--;
                }
                if (++this._matchCount == this._config.Count) {
                  //如果匹配完成计数等于关卡的方块总数，则进入下一关
                  //通关完成，游戏结束
                  this.nextLevel();
                  this.faPai();
                }
              };
              let pos = n1.position;
              tween().target(n0).to(0.1, {
                position: pos
              }, {
                easing: "quadOut"
              }).start();
              tween().target(n2).to(0.1, {
                position: pos
              }, {
                easing: "quadOut"
              }).call(end).start();

              // 重新启用物理效果并解除休眠
              [n0, n1, n2].forEach(node => {
                this.enablePhysics(node, true);
                let rigidBody = node.getComponent(RigidBody);
                if (rigidBody) {
                  rigidBody.wakeUp();
                }
              });
            }
          }
          if (count == 0) {
            //没有合成，底栏结束
            if (this._paiSelectCount == 7) ;
          }
        }
        flyToSelect(node) {
          //将方块飞入选择区域的位置
          if (this._locked) return false;
          if (this._paiSelectCount + 1 > 7) return false; //选择区域已满，则返回false
          this.enablePhysics(node, false);
          this.wakeUpOthers(node);
          this._paiSelectCount++;
          //禁用物理效果并唤醒周围物体，增加选择数量
          node.setParent(this.selcetNode.parent);
          node.scale = new Vec3(0.4, 0.4, 0.4);
          node.layer = Layers.Enum.UI_3D; //将该节点的图层设置为UI 3D层，以确保它在正确的渲染层中
          //node.rotation = Quat.IDENTITY; //重置节点的旋转角度，使其恢复为默认值（无旋转）

          let idx = 0;
          let isInsert = true;
          let selects = this._paiSelets;
          for (let i = 0, j = selects.length; i < j; i++) {
            let nodes = selects[i];
            let length = nodes.length;
            if (nodes[0].name == node.name) {
              if (length >= 2) this._matching++;
              isInsert = false;
              nodes.push(node);
              idx += length;
              break;
            }
            idx += length;
          }
          if (isInsert) selects.push([node]);
          //修正后面位置
          this.fixPosition(idx, () => {
            //调用fixPosition方法修正选择区域中所有方块的位置，从idx开始
            this.fixSelectEnd();
          });
          return true;
        }

        /*合牌，选取一对组合*/
        hePai() {
          if (this._locked || this._matching) return;
          //最大空位牌数
          let maxCount = 7 - this._paiSelectCount;
          if (maxCount <= 0) return false;
          let selects = this._paiSelets;
          for (let i = 0; i < selects.length; i++) {
            let nodes = selects[i];
            let length = 3 - nodes.length;
            if (length >= 0 && length <= maxCount) {
              let name = nodes[0].name;
              let wNodes = this._paiInWorld.get(name);
              if (wNodes && length <= wNodes.length) {
                for (let j = 0; j < length; j++) {
                  let node = wNodes.pop();
                  if (!this.flyToSelect(node)) {
                    wNodes.push(node);
                  }
                }
                break;
              }
            }
          }
          return true;
        }
        faPai() {
          if (this._locked) return;
          this._locked = true;

          // 禁用重力，确保物体不下落
          PhysicsSystem.instance.enable = true;
          PhysicsSystem.instance.gravity = new Vec3(0, 0, 0);
          const rotationConfigs = this._config.Rotations; // 从关卡配置中获取旋转规则

          // 记录每种类型的出现次数
          const typeAppearanceCount = new Map();
          for (let i = 0; true; i++) {
            let node = this.getPai();
            if (!node) break;

            // 设置固定的初始位置
            let x = (i % 3 - 1) * 8; // 每行3个
            let z = (Math.floor(i / 3) - 1) * 10; // 行间距
            node.position = new Vec3(x, 0, z);

            // 获取物体类型和旋转配置
            let type = parseInt(node.name);
            let rotationConfig = rotationConfigs[type % rotationConfigs.length];

            // 更新类型出现次数
            const appearanceCount = typeAppearanceCount.get(type) || 0;
            typeAppearanceCount.set(type, appearanceCount + 1);

            // 计算旋转角度（按出现次数选择角度）
            let angleIndex = appearanceCount % rotationConfig.angles.length; // 出现次数决定角度
            let angle = rotationConfig.angles[angleIndex]; // 当前角度

            // 应用旋转（对所有轴）
            let finalRotation = new Quat();
            rotationConfig.axes.forEach(axis => {
              let singleRotation = Quat.fromAxisAngle(new Quat(), axis, angle * Math.PI / 180);
              Quat.multiply(finalRotation, finalRotation, singleRotation);
            });
            node.rotation = finalRotation; // 应用最终旋转

            // 设置刚体静止
            let body = node.getComponent(RigidBody);
            if (body) {
              body.setLinearVelocity(Vec3.ZERO);
              body.setAngularVelocity(Vec3.ZERO);
              body.angularDamping = 1;
            }
          }
          this._locked = false;
        }
        update(deltaTime) {
          this.operationTime += deltaTime;
          this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
        }
        selectCube(node) {
          if (this._locked) return false; // 避免重复选择
          console.log(node.name);
          if (this._threeErase.some(selectedNode => selectedNode === node)) return false; // 避免重复选择同一个立方体

          this._threeErase.push(node);

          // 使用 `tween` 逐步放大节点至 2
          tween(node).to(0.2, {
            scale: new Vec3(1.5, 1.5, 1.5)
          }) // 放大动画，持续 0.2 秒
          .call(() => {
            // 放大完成后检查是否已选择 3 个节点
            if (this._threeErase.length === 3) {
              this._locked = true; // 临时锁定以进行检查
              this.checkSelection(this._threeErase); // 检查是否满足消除条件

              // 清空 `threeErase` 数组
              this._threeErase = [];
            }
          }).start();
          return true;
        }
        checkSelection(selectedGroup) {
          if (selectedGroup.length !== 3) return;

          // 检查三个节点的来源预制体是否一致
          const firstPrefab = selectedGroup[0].name;
          const allMatch = selectedGroup.every(node => node.name === firstPrefab);
          if (allMatch) {
            // 三者一致，执行消除效果
            selectedGroup.forEach(node => {
              // 打印当前节点的名称
              this.combineEffect(node.getWorldPosition());
              this.removeFromWorld(node);
              node.destroy();
            });
            this.checkWinCondition(); // 检查是否通关
          } else {
            // 三者不一致，将每个节点逐渐缩小回原始大小
            selectedGroup.forEach(node => {
              const rectSelectNode = node.getChildByName("RectSelect");

              // 如果找到了该子节点，销毁它
              if (rectSelectNode) {
                console.log(`Destroying RectSelect node in ${node.name}`);
                rectSelectNode.destroy();
              }
              tween(node).to(0.2, {
                scale: new Vec3(1.25, 1.25, 1.25)
              }) // 缩小到原始大小
              .start();
            });
          }

          // 清空 `threeErase` 数组并解锁
          this._threeErase = [];
          this._locked = false;
        }
        checkWinCondition() {
          this.scheduleOnce(() => {
            if (this.node.children.length === 0) {
              console.log("游戏胜利：已消除所有立方体！");
              const canvasNode = director.getScene().getChildByName('UI');
              if (canvasNode) {
                const uiInstance = instantiate(this.uiPrefab);
                uiInstance.setParent(canvasNode);
                uiInstance.setPosition(0, 0, 0);
                uiInstance.setSiblingIndex(canvasNode.children.length - 1);
              } else {
                console.error("Canvas not found in the current scene!");
              }
            } else {
              console.log("当前剩余子节点数量:", this.node.children.length);
              this.node.children.forEach((child, index) => {
                console.log(`子节点[${index}]: ${child.name}, active: ${child.active}`);
              });
            }
          }, 0.1); // 延迟 0.1 秒再检查
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera0", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "effectNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selcetNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "prefab1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "prefab2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prefab3", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "prefab4", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "prefab5", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "prefab6", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "uiPrefab", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class DebugViewRuntimeControl extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "compositeModeToggle", _descriptor, this);
          _initializerDefineProperty(this, "singleModeToggle", _descriptor2, this);
          _initializerDefineProperty(this, "EnableAllCompositeModeButton", _descriptor3, this);
          this._single = 0;
          this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          this.compositeModeToggleList = [];
          this.singleModeToggleList = [];
          this.miscModeToggleList = [];
          this.textComponentList = [];
          this.labelComponentList = [];
          this.textContentList = [];
          this.hideButtonLabel = void 0;
          this._currentColorIndex = 0;
          this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
        }
        start() {
          // get canvas resolution
          const canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          const uiTransform = this.node.parent.getComponent(UITransform);
          const halfScreenWidth = uiTransform.width * 0.5;
          const halfScreenHeight = uiTransform.height * 0.5;
          let x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          const width = 200,
            height = 20;

          // new nodes
          const miscNode = this.node.getChildByName('MiscMode');
          const buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          const titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (let i = 0; i < 2; i++) {
            const newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            const labelComponent = newLabel.getComponent(Label);
            labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            labelComponent.color = Color.WHITE;
            labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = labelComponent;
          }
          y -= height;
          // single
          let currentRow = 0;
          for (let i = 0; i < this.strSingle.length; i++, currentRow++) {
            if (i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            const newNode = i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            const textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          let labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          const changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          const HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (let i = 0; i < this.strMisc.length; i++) {
            const newNode = instantiate(this.compositeModeToggle);
            newNode.setPosition(x, y - height * i, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = miscNode;
            const textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strMisc[i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            const toggleComponent = newNode.getComponent(Toggle);
            toggleComponent.isChecked = i ? true : false;
            newNode.on(Toggle.EventType.TOGGLE, i ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[i] = newNode;
          }

          // composite
          y -= 150;
          for (let i = 0; i < this.strComposite.length; i++) {
            const newNode = i ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            newNode.setPosition(x, y - height * i, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.compositeModeToggle.parent;
            const textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strComposite[i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[i] = newNode;
          }
        }
        isTextMatched(textUI, textDescription) {
          let tempText = new String(textUI);
          const findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        }
        toggleSingleMode(toggle) {
          const debugView = director.root.debugView;
          const textComponent = toggle.getComponentInChildren(RichText);
          for (let i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        }
        toggleCompositeMode(toggle) {
          const debugView = director.root.debugView;
          const textComponent = toggle.getComponentInChildren(RichText);
          for (let i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        }
        toggleLightingWithAlbedo(toggle) {
          const debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        }
        toggleCSMColoration(toggle) {
          const debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        }
        enableAllCompositeMode(button) {
          const debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (let i = 0; i < this.compositeModeToggleList.length; i++) {
            const toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            toggleComponent.isChecked = true;
          }
          let toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        }
        hideUI(button) {
          const titleNode = this.node.getChildByName('Titles');
          const activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        }
        changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (let i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (let i = 0; i < this.labelComponentList.length; i++) {
            this.labelComponentList[i].color = this.color[this._currentColorIndex];
          }
        }
        onLoad() {}
        update(deltaTime) {}
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ElementLoad.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Mimi.ts', './GameScene.ts', './Global2.ts', './AudioMgr.ts', './TweenTools.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, ProgressBar, Label, Node, _decorator, Component, Animation, Mimi, GameScene, Global, AudioMgr, TweenTool;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      ProgressBar = module.ProgressBar;
      Label = module.Label;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Animation = module.Animation;
    }, function (module) {
      Mimi = module.Mimi;
    }, function (module) {
      GameScene = module.GameScene;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      TweenTool = module.TweenTool;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "04c6cIfkj1FWb9K94tl4+MV", "ElementLoad", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ElementLoad = exports('ElementLoad', (_dec = ccclass('ElementLoad'), _dec2 = property(ProgressBar), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec(_class = (_class2 = class ElementLoad extends Component {
        constructor(...args) {
          super(...args);
          //收集进度
          _initializerDefineProperty(this, "CollectProgress", _descriptor, this);
          //当前进度
          this.CurrentProgress = 0;
          //起飞进度
          this.TakeOffProgress = 100;
          //起飞速度
          this.TakeOffSpeed = 50;
          //跳高分数
          _initializerDefineProperty(this, "ScoreText", _descriptor2, this);
          //小眯眯
          _initializerDefineProperty(this, "Mimi", _descriptor3, this);
          //血量
          _initializerDefineProperty(this, "Bleed", _descriptor4, this);
          //血量
          this.BleedNum = 3;
          //金币
          _initializerDefineProperty(this, "Coin", _descriptor5, this);
          //游戏场景
          _initializerDefineProperty(this, "GameScene", _descriptor6, this);
          //是否在加速
          this.IsSpeed = false;
          //剪掉的数量
          this.CutNum = 10;
          //道具按钮
          _initializerDefineProperty(this, "PropButton", _descriptor7, this);
          //
          _initializerDefineProperty(this, "Sou", _descriptor8, this);
          //道具时间
          this.PropTime = 60 * 1;
        }
        start() {
          this.CollectProgress.progress = 0;
          this.CurrentProgress = 0;
          Global.ScoreNum = 0;
          this.ScoreText.string = Math.floor(Global.ScoreNum).toString();
          Global.CoinNum = 0;
          this.Coin.string = Global.CoinNum.toString();
          this.BleedNum = 3;
          this.Bleed.string = this.BleedNum.toString();
          this.PropButton.active = false;
          this.Sou.active = false;
        }

        /**
         * 复活
         */
        IamSave() {
          this.BleedNum = 3;
          this.Bleed.string = this.BleedNum.toString();
        }

        /**
         * 更新分数
         */
        UpdateScore(_vy) {
          _vy *= 0.1;
          Global.ScoreNum += Math.abs(_vy);
          this.ScoreText.string = Math.floor(Global.ScoreNum).toString();
          if (!this.IsSpeed) {
            this.CurrentProgress += Math.abs(_vy);
            if (this.CurrentProgress >= this.TakeOffProgress) {
              this.CurrentProgress = this.TakeOffProgress;
              this.ShowProp();
            }
            this.CollectProgress.progress = this.CurrentProgress / this.TakeOffProgress;
          }
        }
        update(dt) {
          if (this.IsSpeed) {
            this.Mimi.getComponent(Mimi).Vy = this.TakeOffSpeed;
            this.PropTime--;
            if (this.PropTime <= 0) {
              this.IsSpeed = false;
              // this.Sou.active = false;
            }
          }
        }

        /**
         * 血量减少
         */
        BleedReduce() {
          AudioMgr.instance.PlayBomb();
          this.BleedNum -= 3;
          this.Bleed.string = this.BleedNum.toString();
          if (this.BleedNum == 0) {
            //游戏结束
            this.GameScene.getComponent(GameScene).GameOver();
          }
        }

        /**
         * 增加金币
         */
        AddCoin(_num) {
          Global.CoinNum += _num;
          this.Coin.string = Global.CoinNum.toString();
        }

        /**
         * 点击道具
         */
        ClickProp() {
          Global.IsDebug && console.log("点击道具");
          AudioMgr.instance.PlayEffect("sou", "click");
          this.IsSpeed = true;
          this.PropButton.active = false;
          this.CurrentProgress = 0;
          this.CollectProgress.progress = 0;
          this.Sou.active = true;
          this.Sou.getComponent(Animation).play();
        }

        /**
         * 显示道具按钮
         */
        ShowProp() {
          if (this.PropButton.active) return;
          this.PropButton.active = true;
          TweenTool.Pop(this.PropButton);
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "CollectProgress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ScoreText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Mimi", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "Bleed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "Coin", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "GameScene", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "PropButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "Sou", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EndBox.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './TweenTools.ts', './AudioMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, Node, _decorator, Component, director, Global, TweenTool, AudioMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      TweenTool = module.TweenTool;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "186b3RDvuxFGrbPBsHk1o9+", "EndBox", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let EndBox = exports('EndBox', (_dec = ccclass('EndBox'), _dec2 = property(Label), _dec3 = property(Node), _dec(_class = (_class2 = class EndBox extends Component {
        constructor(...args) {
          super(...args);
          //分数
          _initializerDefineProperty(this, "ScoreText", _descriptor, this);
          //
          _initializerDefineProperty(this, "Box", _descriptor2, this);
        }
        start() {
          this.ScoreText.string = Math.floor(Global.ScoreNum).toString();
          TweenTool.Pop(this.Box);
        }

        /**
         * 点击返回首页
         */
        ClickBackHome() {
          Global.IsDebug && console.log('点击返回首页');
          AudioMgr.instance.PlayButton();
          //director.getAnimationManager().removeAllActions();
          //Main.instance.UpdateScene(AssetList.Scene.LoginScene);

          director.loadScene("Scene");

          //TopLoad.instance.HidePop(AssetList.Pop.EndBox);
        }

        ClickNextLevel() {
          AudioMgr.instance.PlayButton();

          // 设置当前关卡索引到下一关
          Global.currentLevelIndex = Global.currentLevelIndex + 1;
          console.log(Global.currentLevelIndex);

          // 根据 NowIndex 的值判断进入哪个场景
          if (Global.currentLevelIndex >= 0 && Global.currentLevelIndex <= 4) {
            director.loadScene("flip");
          } else if (Global.currentLevelIndex >= 5 && Global.currentLevelIndex <= 9) {
            director.loadScene("adjust");
          } else if (Global.currentLevelIndex >= 10 && Global.currentLevelIndex <= 14) {
            director.loadScene("second");
          } else if (Global.currentLevelIndex >= 15 && Global.currentLevelIndex <= 19) {
            director.loadScene("choose");
          } else {
            console.error("Invalid NowIndex value:", Global.currentLevelIndex);
          }
        }
        ClickRestart() {
          Global.IsDebug && console.log('点击重新开始关卡');
          AudioMgr.instance.PlayButton();
          if (Global.currentLevelIndex >= 0 && Global.currentLevelIndex <= 4) {
            director.loadScene("flip");
          } else if (Global.currentLevelIndex >= 5 && Global.currentLevelIndex <= 9) {
            director.loadScene("adjust");
          } else if (Global.currentLevelIndex >= 10 && Global.currentLevelIndex <= 14) {
            director.loadScene("second");
          } else if (Global.currentLevelIndex >= 15 && Global.currentLevelIndex <= 19) {
            director.loadScene("choose");
          } else {
            console.error("Invalid NowIndex value:", Global.currentLevelIndex);
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ScoreText", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Box", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EstablishFloor.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Vec3, Prefab, _decorator, Component, instantiate, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "c30b3ldNHtMp7QKHi5vOgHl", "EstablishFloor", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let GenerateGround = exports('GenerateGround', (_dec = ccclass('GenerateGround'), _dec2 = property(Vec3), _dec3 = property(Vec3), _dec4 = property(Prefab), _dec(_class = (_class2 = class GenerateGround extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "gridSize", _descriptor, this);
          // 地面由 12x12 个大Cube组成
          _initializerDefineProperty(this, "cubeSize", _descriptor2, this);
          // 每个大Cube的大小
          _initializerDefineProperty(this, "groundStartPosition", _descriptor3, this);
          // 地面的起始位置
          _initializerDefineProperty(this, "cubePrefab", _descriptor4, this);
          // 引用内置的Cube预制体
          // 定义不同关卡的挖空位置数组
          // 定义不同关卡的挖空位置数组
          // 定义不同关卡的挖空位置数组
          this.levels = [
          // 第一关挖空位置
          [{
            iOffset: 0,
            jOffset: 0
          },
          // 中心方块
          {
            iOffset: -1,
            jOffset: 0
          },
          // 中心X负方向相邻的一个方块
          {
            iOffset: 1,
            jOffset: 0
          },
          // 中心X正方向相邻的一个方块
          {
            iOffset: 1,
            jOffset: 1
          } // 中心右上方相邻的一个方块
          ],
          // 第二关挖空位置
          [{
            iOffset: -1,
            jOffset: 0
          },
          // 中心方块
          {
            iOffset: 0,
            jOffset: 0
          },
          // 中心X正方向相邻的一个方块
          {
            iOffset: 0,
            jOffset: 1
          } // 中心右上方相邻的一个方块
          ],
          // 第三关挖空位置
          [{
            iOffset: 0,
            jOffset: 0
          },
          // 第一个：中心上方一个方块
          {
            iOffset: 0,
            jOffset: -1
          },
          // 第二个：左上方方块
          {
            iOffset: -1,
            jOffset: -1
          },
          // 第三个：左上上方方块
          {
            iOffset: 0,
            jOffset: 1
          } // 第四个：右上方方块
          ],
          // 第四关挖空位置
          [{
            iOffset: 0,
            jOffset: 0
          },
          // 中心方块
          {
            iOffset: -1,
            jOffset: 0
          },
          // 上方方块
          {
            iOffset: 1,
            jOffset: 0
          },
          // 下方方块
          {
            iOffset: -1,
            jOffset: 1
          } // 右上方方块
          ],
          // 第五关挖空位置
          [{
            iOffset: 0,
            jOffset: 0
          },
          // 中心方块
          {
            iOffset: -1,
            jOffset: 0
          },
          // 上方方块
          {
            iOffset: 1,
            jOffset: 0
          },
          // 下方方块
          {
            iOffset: 1,
            jOffset: -1
          } // 左方方块
          ]];
        }

        start() {
          if (this.cubePrefab) {
            this.generateGround();
          } else {
            console.error("Cube prefab is not assigned!");
          }
        }
        generateGround() {
          const startX = Math.floor(this.groundStartPosition.x - this.gridSize / 2 * this.cubeSize.x);
          const startZ = Math.floor(this.groundStartPosition.z - this.gridSize / 2 * this.cubeSize.z);
          const centerIndex = Math.floor(this.gridSize / 2); // 中心索引

          // 获取当前关卡的挖空配置
          const levelIndex = Global.currentLevelIndex; // 从Global中获取当前关卡索引
          const emptyPositions = this.levels[levelIndex - 5] || []; // 根据关卡索引获取对应的挖空位置，确保索引有效

          for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
              // 检查是否需要挖空当前格子
              const isEmpty = emptyPositions.some(pos => i === centerIndex + pos.iOffset && j === centerIndex + pos.jOffset);
              if (isEmpty) {
                continue; // 如果需要挖空则跳过
              }

              const cube = instantiate(this.cubePrefab);
              cube.setScale(this.cubeSize);
              cube.setPosition(new Vec3(startX + i * this.cubeSize.x, this.groundStartPosition.y, startZ + j * this.cubeSize.z));
              //const collider = cube.addComponent(BoxCollider);
              //collider.size = this.cubeSize;  // 设置大小
              //collider.center = new Vec3(0, 0, 0);

              // 添加 RigidBody 并设置为静态类型
              //const rigidBody = cube.addComponent(RigidBody);
              //rigidBody.type = ERigidBodyType.STATIC;

              this.node.addChild(cube);

              // 输出调试信息
              // console.log(`Created cube at position: ${cube.position.toString()} with collider size: ${collider.size.toString()}`);
            }
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gridSize", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 12;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cubeSize", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(2, 0.7, 2);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "groundStartPosition", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(0, 0, 0);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cubePrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FlipCubeOnSurface.ts", ['cc'], function (exports) {
  var cclegacy, Component, Vec3, Quat, systemEvent, SystemEvent, KeyCode, misc, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      KeyCode = module.KeyCode;
      misc = module.misc;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "7b22826PBBLU4+ClatC0c2c", "FlipCubeOnSurface", undefined);
      const {
        ccclass
      } = _decorator;
      let FlipCubeOnSurface = exports('FlipCubeOnSurface', (_dec = ccclass('FlipCubeOnSurface'), _dec(_class = class FlipCubeOnSurface extends Component {
        constructor(...args) {
          super(...args);
          this.isAnimating = false;
          // 用于防止动画重叠
          this.startPosition = new Vec3();
          // 初始位置
          this.endPosition = new Vec3();
          // 目标位置
          this.startRotation = new Quat();
          // 初始四元数
          this.endRotation = new Quat();
          // 目标四元数
          this.currentLerpTime = 0;
          this.totalLerpTime = 0.5;
          // 总的插值时间，这里设置为0.5秒
          this.spacing = 1.1;
        }
        // 立方体之间的间隔

        start() {
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
        onKeyDown(event) {
          if (!this.isAnimating) {
            switch (event.keyCode) {
              case KeyCode.KEY_A:
                this.rotateByAxis(new Vec3(-this.spacing, 0, 0), new Vec3(0, 0, 1), 90);
                break;
              case KeyCode.KEY_D:
                this.rotateByAxis(new Vec3(this.spacing, 0, 0), new Vec3(0, 0, 1), -90);
                break;
              case KeyCode.KEY_W:
                this.rotateByAxis(new Vec3(0, 0, -this.spacing), new Vec3(1, 0, 0), -90);
                break;
              case KeyCode.KEY_S:
                this.rotateByAxis(new Vec3(0, 0, this.spacing), new Vec3(1, 0, 0), 90);
                break;
            }
          }
        }
        rotateByAxis(moveVector, rotationAxis, angle) {
          this.startPosition = this.node.position.clone(); // 保存初始位置

          // 计算目标位置
          Vec3.add(this.endPosition, this.startPosition, moveVector);

          // 检查目标位置是否在3x3的边界内
          if (Math.abs(this.endPosition.x) > this.spacing * 1.5 || Math.abs(this.endPosition.z) > this.spacing * 1.5) {
            return; // 超过边界，取消翻转
          }

          this.startRotation = this.node.rotation.clone(); // 保存初始旋转
          const rad = misc.degreesToRadians(angle);
          Quat.rotateAround(this.endRotation, this.startRotation, rotationAxis, rad); // 计算目标旋转四元数
          Quat.normalize(this.endRotation, this.endRotation);

          // 重置插值时间，并开始动画
          this.currentLerpTime = 0;
          this.isAnimating = true;
        }
        update(deltaTime) {
          if (this.isAnimating) {
            // 增加当前插值时间
            this.currentLerpTime += deltaTime;
            if (this.currentLerpTime > this.totalLerpTime) {
              this.currentLerpTime = this.totalLerpTime;
            }

            // 计算当前插值比例
            const lerpRatio = this.currentLerpTime / this.totalLerpTime;

            // 使用slerp进行四元数插值
            const currentRotation = Quat.slerp(new Quat(), this.startRotation, this.endRotation, lerpRatio);
            this.node.setRotation(currentRotation);

            // 使用lerp进行位置插值
            const currentPosition = Vec3.lerp(new Vec3(), this.startPosition, this.endPosition, lerpRatio);
            this.node.setPosition(currentPosition);

            // 如果插值完成，停止动画
            if (lerpRatio >= 1) {
              this.isAnimating = false;
            }
          }
        }
        onDestroy() {
          systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Mimi.ts', './Global2.ts', './TopLoad.ts', './AdBox.ts', './ElementLoad.ts', './LocalMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Input, Mimi, Global, AssetList, TopLoad, AdBox, ElementLoad, LocalMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Input = module.Input;
    }, function (module) {
      Mimi = module.Mimi;
    }, function (module) {
      Global = module.Global;
      AssetList = module.AssetList;
    }, function (module) {
      TopLoad = module.TopLoad;
    }, function (module) {
      AdBox = module.AdBox;
    }, function (module) {
      ElementLoad = module.ElementLoad;
    }, function (module) {
      LocalMgr = module.LocalMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "0d3bc8AtvZGt4wtPZo+3D9T", "GameScene", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let GameScene = exports('GameScene', (_dec = ccclass('GameScene'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class GameScene extends Component {
        constructor(...args) {
          super(...args);
          //操作层
          _initializerDefineProperty(this, "TouchBg", _descriptor, this);
          //猫咪
          _initializerDefineProperty(this, "Mimi", _descriptor2, this);
          //元素层
          _initializerDefineProperty(this, "ElementLoad", _descriptor3, this);
        }
        start() {
          Global.IsGameOver = false;
          Global.IsAd = true;
          this.TouchBg.on(Input.EventType.TOUCH_MOVE, this.TouchCb, this);
          this.TouchBg.on(Input.EventType.TOUCH_END, this.TouchCb, this);
          this.TouchBg.on(Input.EventType.TOUCH_CANCEL, this.TouchCb, this);
        }

        /**
         * 用户操控屏幕
         */
        TouchCb(_e) {
          if (_e.type == Input.EventType.TOUCH_MOVE) {
            this.Mimi.getComponent(Mimi).ImaMove(_e.getDeltaX());
          } else {
            this.Mimi.getComponent(Mimi).ImaMove(0);
          }
        }

        /**
         * 游戏结束
         */
        GameOver() {
          Global.IsDebug && console.log("游戏结束");
          Global.IsGameOver = true;
          LocalMgr.instance.GameOver();
          if (Global.IsAd) {
            let adbox = TopLoad.instance.AddPop(AssetList.Pop.AdBox);
            adbox.getComponent(AdBox).Cb = this.IamSave.bind(this);
          } else {
            TopLoad.instance.AddPop(AssetList.Pop.EndBox);
          }
        }

        /**
         * 复活
         */
        IamSave() {
          Global.IsDebug && console.log("复活");
          Global.IsAd = false;
          Global.IsGameOver = false;
          this.Mimi.getComponent(Mimi).IamSave();
          this.ElementLoad.getComponent(ElementLoad).IamSave();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "TouchBg", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Mimi", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ElementLoad", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Global.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Camera, _decorator, Component, Layers;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Camera = module.Camera;
      _decorator = module._decorator;
      Component = module.Component;
      Layers = module.Layers;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "43dff+UVQBIHJv/B68vNxTe", "Global", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let SceneRenderer = exports('SceneRenderer', (_dec = ccclass('SceneRenderer'), _dec2 = property(Camera), _dec3 = property(Camera), _dec(_class = (_class2 = class SceneRenderer extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "camera3D", _descriptor, this);
          _initializerDefineProperty(this, "cameraUI", _descriptor2, this);
        }
        start() {
          // 设置 cameraUI 的渲染顺序和可见性层级
          this.cameraUI.priority = 0; // 先渲染UI
          this.cameraUI.visibility = Layers.Enum.UI_2D; // 渲染UI（UI_2D层）
          this.cameraUI.clearFlags = Camera.ClearFlag.SOLID_COLOR; // 清除背景并渲染UI

          // 设置 camera3D 的渲染顺序和可见性层级
          this.camera3D.priority = 1; // 后渲染3D物体
          this.camera3D.visibility = Layers.Enum.DEFAULT; // 渲染3D物体（DEFAULT层）
          this.camera3D.clearFlags = Camera.ClearFlag.DEPTH_ONLY; // 不清除颜色，只影响深度缓冲
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera3D", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cameraUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Global2.ts", ['cc'], function (exports) {
  var cclegacy, Prefab, AudioClip, SpriteFrame, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      AudioClip = module.AudioClip;
      SpriteFrame = module.SpriteFrame;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "b1188EhiwlHA7jF4mHKFzLF", "Global", undefined);
      const {
        ccclass,
        property
      } = _decorator;

      /**
       * 资源路径
       */
      const AssetList = exports('AssetList', {
        BundleName: "GameRes",
        Scene: {
          LoginScene: "LoginScene",
          GameScene: "GameScene"
        },
        Pop: {
          AdBox: "AdBox",
          EndBox: "EndBox",
          ShopBox: "ShopBox"
        },
        Asset: {
          Prefabs: {
            path: "Prefab",
            type: Prefab
          },
          Sounds: {
            path: "Sound",
            type: AudioClip
          },
          SpriteFrames: {
            path: "SpriteFrame",
            type: SpriteFrame
          }
        }
      });

      /**
       * 道具
       */
      const PropList = exports('PropList', {
        Coin: "coin",
        Boom: "bomb",
        Speed: "arrowbullte"
      });
      let Global = exports('Global', (_dec = ccclass('Global'), _dec(_class = (_class2 = class Global {}, _class2.IsWx = false, _class2.IsDebug = true, _class2.LoadProgress = 0, _class2.GameBottom = -600, _class2.IsGameOver = false, _class2.ScoreNum = 0, _class2.CoinNum = 0, _class2.IsAd = true, _class2.currentLevelIndex = 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Vec2, _decorator, Component, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "d6ef3xoDsBOAZDF9/Bp+l5A", "LevelController", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let LevelController = exports('LevelController', (_dec = ccclass('LevelController'), _dec2 = property({
        type: [Vec2]
      }), _dec(_class = (_class2 = class LevelController extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "positions", _descriptor, this);
          // 用于指定当前关卡的物体摆放位置
          this.levels = [[new Vec2(0.5, -1)],
          // 第一关的物体位置
          [new Vec2(-0.5, -1)],
          // 第二关的物体位置
          [new Vec2(1.5, 1)],
          // 第三关的物体位置
          [new Vec2(-0.5, 1)],
          // 第四关的物体位置
          [new Vec2(-0.5, 0)] // 第五关的物体位置
          ];
        }

        onLoad() {
          const levelIndex = Global.currentLevelIndex; // 转换为数组索引
          this.positions = this.levels[levelIndex];
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "positions", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Levels.ts", ['cc'], function (exports) {
  var cclegacy, Vec3;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6321c5rmwZPBbrNrrCII4Gd", "Levels", undefined);
      const Levels = exports('Levels', [{
        Level: 1,
        // 第1关
        Count: 3,
        // 总物体数量：3组×3个相同
        Time: 300,
        // 通关时间限制（秒）
        DampTime: 2,
        // 动画锁定时间
        TypeRands: 3,
        // 类型数量（3种类型）
        Types: ['Prefab1', 'Prefab2', 'Prefab3'],
        // 指定预制体类型
        CustomOrder: [0, 1, 2, 1, 2, 0, 2, 0, 1],
        // 关卡 13 的特定顺序
        Rotations: [{
          axes: [Vec3.UNIT_X],
          angles: [0, 0, 0]
        },
        // 物体0绕X轴旋转
        {
          axes: [Vec3.UNIT_Y],
          angles: [0, 0, 0]
        },
        // 物体1绕Y轴旋转
        {
          axes: [Vec3.UNIT_Z],
          angles: [0, 0, 0]
        } // 物体2绕Z轴旋转
        ]
      }, {
        Level: 2,
        // 第2关
        Count: 3,
        // 3组×3个相同
        Time: 300,
        DampTime: 2,
        TypeRands: 3,
        // 类型数量：3种类型
        Types: ['Prefab1', 'Prefab2', 'Prefab3'],
        CustomOrder: [0, 1, 2, 1, 2, 0, 2, 0, 1],
        // 关卡 13 的特定顺序
        Rotations: [{
          axes: [Vec3.UNIT_X],
          angles: [0, 45, 90]
        },
        // 物体0绕X轴旋转
        {
          axes: [Vec3.UNIT_Y],
          angles: [0, 45, 90]
        },
        // 物体1绕Y轴旋转
        {
          axes: [Vec3.UNIT_Z],
          angles: [0, 45, 90]
        } // 物体2绕Z轴旋转
        ]
      }, {
        Level: 3,
        // 第3关
        Count: 4,
        // 4组×3个相同
        Time: 400,
        DampTime: 2,
        TypeRands: 4,
        // 类型数量：4种类型
        Types: ['Prefab1', 'Prefab2', 'Prefab3', 'Prefab4'],
        CustomOrder: [0, 1, 2, 3, 2, 1, 0, 3, 0, 2, 1, 3],
        Rotations: [{
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y],
          angles: [0, 45, 90]
        },
        // 物体0绕X、Y轴旋转
        {
          axes: [Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        },
        // 物体1绕Y、Z轴旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        },
        // 物体2绕X、Z轴旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        } // 物体3绕X、Y、Z轴旋转
        ]
      }, {
        Level: 4,
        // 第4关
        Count: 4,
        // 4组×3个相同
        Time: 400,
        DampTime: 2,
        TypeRands: 4,
        Types: ['Prefab1', 'Prefab2', 'Prefab3', 'Prefab4'],
        CustomOrder: [1, 3, 2, 4, 2, 1, 4, 3, 3, 4, 1, 2],
        Rotations: [{
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [0, 45, 90]
        } // 所有物体都绕XYZ旋转
        ]
      }, {
        Level: 5,
        // 第5关
        Count: 5,
        // 5组×3个相同
        Time: 500,
        DampTime: 2,
        TypeRands: 5,
        // 类型数量：5种类型
        Types: ['Prefab1', 'Prefab2', 'Prefab3', 'Prefab4', 'Prefab5'],
        CustomOrder: [1, 3, 2, 4, 5, 2, 1, 5, 4, 3, 3, 5, 4, 1, 2],
        Rotations: [{
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [-90, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [-90, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [-90, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [-90, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [-90, 45, 90]
        },
        // 所有物体都绕XYZ旋转
        {
          axes: [Vec3.UNIT_X, Vec3.UNIT_Y, Vec3.UNIT_Z],
          angles: [-90, 45, 90]
        } // 所有物体都绕XYZ旋转
        ]
      }]);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LLM.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, Button, _decorator, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Button = module.Button;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "679bafC88VLmJK64w3TBKoE", "LLM", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let DeepSeekAPI = exports('DeepSeekAPI', (_dec = ccclass('DeepSeekAPI'), _dec2 = property(Label), _dec3 = property(Button), _dec(_class = (_class2 = class DeepSeekAPI extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "responseLabel", _descriptor, this);
          _initializerDefineProperty(this, "sendButton", _descriptor2, this);
          this.apiKey = "sk-8ed19ac079034f3596d147aec5f4f4d5";
          // 替换为你的 DeepSeek API 密钥
          this.baseUrl = "https://api.deepseek.com";
        }
        onLoad() {
          if (this.sendButton) {
            this.sendButton.node.on('click', this.onSendButtonClicked, this);
          }
        }
        async onSendButtonClicked() {
          if (!this.responseLabel) return;
          const messages = [{
            role: "system",
            content: "你是一个心理旋转学习助手，旨在通过情感支持和个性化建议，帮助学习者提高心理旋转能力。你需要根据学习者的学习进度、情绪状态和个性偏好，提供适时的鼓励和指导。"
          }, {
            role: "user",
            content: "这个游戏我玩不明白"
          }];
          this.responseLabel.string = "等待回复"; // 显示加载状态

          try {
            const response = await this.callDeepSeekAPI(messages);
            this.responseLabel.string = response;
          } catch (error) {
            this.responseLabel.string = "Error: Unable to fetch data.";
            console.error('Error:', error);
          }
        }
        async callDeepSeekAPI(messages) {
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
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "responseLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sendButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Loading.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResMgr.ts', './Global2.ts', './AudioMgr.ts', './Main.ts', './LocalMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, ProgressBar, Label, _decorator, Component, ResMgr, AssetList, Global, AudioMgr, Main, LocalMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      ProgressBar = module.ProgressBar;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      AssetList = module.AssetList;
      Global = module.Global;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      Main = module.Main;
    }, function (module) {
      LocalMgr = module.LocalMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "38f71Kt7lVIsKrX7I2z7ubu", "Loading", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let Loading = exports('Loading', (_dec = ccclass('Loading'), _dec2 = property(ProgressBar), _dec3 = property(Label), _dec(_class = (_class2 = class Loading extends Component {
        constructor(...args) {
          super(...args);
          //进度条
          _initializerDefineProperty(this, "ProgressBar", _descriptor, this);
          //进度文字
          _initializerDefineProperty(this, "ProgressText", _descriptor2, this);
        }
        start() {
          //资源数据初始化
          ResMgr.instance.LoadInit();
          this.LoadRes();

          //更新本地信息
          LocalMgr.instance.LocalInfo = LocalMgr.instance.GetInfo();
          if (!LocalMgr.instance.LocalInfo) {
            LocalMgr.instance.LocalInfo = LocalMgr.instance.TestInfo;
            LocalMgr.instance.UpdateInfo();
          }
        }

        /**
         * 加载资源
         */
        async LoadRes() {
          await ResMgr.instance.LoadBundle(AssetList.BundleName, 0.1);
          await ResMgr.instance.LoadRes(AssetList.BundleName, AssetList.Asset.Prefabs, 0.6);
          await ResMgr.instance.LoadRes(AssetList.BundleName, AssetList.Asset.Sounds, 0.2);
          await ResMgr.instance.LoadRes(AssetList.BundleName, AssetList.Asset.SpriteFrames, 0.1);
          AudioMgr.instance.Init();
          AudioMgr.instance.PlayBgSound("bgsound");
          Main.instance.UpdateScene(AssetList.Scene.LoginScene);
        }
        update(deltaTime) {
          this.ProgressText.string = "LOADING..." + Math.floor(Global.LoadProgress * 100).toString() + "%";
          this.ProgressBar.progress = Global.LoadProgress;
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ProgressBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ProgressText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalMgr.ts", ['cc', './Global2.ts', './WxTools.ts'], function (exports) {
  var cclegacy, _decorator, Component, Global, WxTools;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      WxTools = module.WxTools;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "edecchFVTRPhLnYMdTDrPT3", "LocalMgr", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let LocalMgr = exports('LocalMgr', (_dec = ccclass('LocalMgr'), _dec(_class = (_class2 = class LocalMgr extends Component {
        constructor(...args) {
          super(...args);
          //本地缓存key
          this.LocalKey = 'mimijump0';
          //本地信息
          this.LocalInfo = {
            score: 0,
            coin: 0,
            catinfo: {
              cat0: 1,
              cat1: 2,
              cat2: 3,
              cat3: 4,
              cat4: 5,
              cat5: 6,
              cat6: 7,
              cat7: 8,
              cat8: 9,
              cat9: 10,
              cat10: 11,
              cat11: 12,
              cat12: 13,
              cat13: 14,
              cat14: 15,
              cat15: 16,
              cat16: 17,
              cat17: 18,
              cat18: 19,
              cat19: 20
            },
            lastchoose: 0
          };
          //测试信息
          this.TestInfo = {
            score: 0,
            coin: 0,
            catinfo: {
              cat0: 1,
              cat1: 2,
              cat2: 3,
              cat3: 4,
              cat4: 5,
              cat6: 6,
              cat7: 7,
              cat8: 8,
              cat9: 9,
              cat10: 10
            },
            lastchoose: 0
          };
        }
        //
        static get instance() {
          if (!this._instance) {
            this._instance = new LocalMgr();
          }
          return this._instance;
        }
        /**
         * 更新信息
         */
        UpdateInfo() {
          if (Global.IsWx) {
            WxTools.SetStorage(this.LocalKey, JSON.stringify(this.LocalInfo));
            return;
          }
          localStorage.setItem(this.LocalKey, JSON.stringify(this.LocalInfo));
        }

        /**
         * 获取信息
         */
        GetInfo() {
          //if (Global.IsWx) {
          //    return WxTools.GetStorage(this.LocalKey)
          //};
          //return JSON.parse(localStorage.getItem(this.LocalKey));
          return this.LocalInfo;
        }

        /**
         * 使用金币
         */
        UseCoin(_cat) {
          this.LocalInfo.coin -= this.LocalInfo.catinfo[_cat];
          this.LocalInfo.catinfo[_cat] = 0;
          this.UpdateInfo();
        }

        /**
         * 更换猫咪
         */
        UpdateCat(_chooseindex) {
          this.LocalInfo.lastchoose = _chooseindex;
          this.UpdateInfo();
        }

        /**
         * 游戏结束
         */
        GameOver() {
          this.LocalInfo.coin += Global.CoinNum;
          this.LocalInfo.score = Math.max(this.LocalInfo.score, Math.floor(Global.ScoreNum));
          this.UpdateInfo();
        }
      }, _class2._instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoginScene.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './AudioMgr.ts', './Main.ts', './LocalMgr.ts', './TopLoad.ts', './ShopBox.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, Node, _decorator, Component, Camera, Global, AssetList, AudioMgr, Main, LocalMgr, TopLoad, ShopBox;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Camera = module.Camera;
    }, function (module) {
      Global = module.Global;
      AssetList = module.AssetList;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      Main = module.Main;
    }, function (module) {
      LocalMgr = module.LocalMgr;
    }, function (module) {
      TopLoad = module.TopLoad;
    }, function (module) {
      ShopBox = module.ShopBox;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "ecbc0otaEtEE6E1rjVDpR2k", "LoginScene", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let LoginScene = exports('LoginScene', (_dec = ccclass('LoginScene'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = (_class2 = class LoginScene extends Component {
        constructor(...args) {
          super(...args);
          //分数
          _initializerDefineProperty(this, "ScoreText", _descriptor, this);
          //金币数量
          _initializerDefineProperty(this, "CoinText", _descriptor2, this);
          //音效按钮
          _initializerDefineProperty(this, "SoundButton", _descriptor3, this);
        }
        start() {
          this.UpdateBest();
        }

        /**
         * 开始游戏
         */
        StartClick() {
          Global.IsDebug && console.log("开始游戏");
          AudioMgr.instance.PlayButton();
          Main.instance.UpdateScene(AssetList.Scene.GameScene);
        }

        /**
         * 更新最好数据
         */
        UpdateBest() {
          Global.IsDebug && console.log("本地信息", LocalMgr.instance.GetInfo());
          this.ScoreText.string = LocalMgr.instance.GetInfo().score.toString();
          this.CoinText.string = LocalMgr.instance.GetInfo().coin.toString();
        }

        /**
         * 点击选择按钮
         */
        ChooseClick() {
          AudioMgr.instance.PlayButton();
          this.checkAllCameras;
          let shopbox = TopLoad.instance.AddPop(AssetList.Pop.ShopBox);
          shopbox.getComponent(ShopBox).Cb = this.UpdateBest.bind(this);
          this.checkAllCameras();
        }
        checkAllCameras() {
          // 获取当前场景中的根节点
          const rootNode = this.node.scene;

          // 递归查找所有节点中的Camera组件
          this.findCamerasInNode(rootNode);
        }
        findCamerasInNode(node) {
          // 检查当前节点是否有Camera组件
          const cameraComponent = node.getComponent(Camera);
          if (cameraComponent && node.name === 'MainCamera') {
            // 找到MainCamera并将其关闭
            node.active = false;
            console.log(`MainCamera has been deactivated.`);
            return; // 找到并关闭后可以直接返回，不再继续查找
          }

          // 递归检查子节点
          node.children.forEach(child => {
            this.findCamerasInNode(child);
          });
        }

        /**
         * 点击音效
         */
        SoundClick() {
          Global.IsDebug && console.log("点击播放音效");
          AudioMgr.instance.PlayButton();
          if (AudioMgr.instance.IsMute) {
            AudioMgr.instance.PlayBgSound("bgsound");
          } else {
            AudioMgr.instance.StopBgSound();
          }
          this.SoundButton.getChildByName("MuteButton").active = AudioMgr.instance.IsMute;
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ScoreText", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "CoinText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "SoundButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/logo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, Node, instantiate, Vec3, MeshRenderer, Color, Quat;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      Node = module.Node;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      MeshRenderer = module.MeshRenderer;
      Color = module.Color;
      Quat = module.Quat;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "02f30WUBtVCHYqomk+zY7Sy", "logo", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let PrefabRotatorUI = exports('PrefabRotatorUI', (_dec = ccclass('PrefabRotatorUI'), _dec2 = property(Prefab), _dec(_class = (_class2 = class PrefabRotatorUI extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "rotatingPrefab", _descriptor, this);
          // 需要旋转的预制体
          _initializerDefineProperty(this, "speed", _descriptor2, this);
          // 旋转速度，度/秒
          this._instance = null;
        }
        start() {
          if (this.rotatingPrefab) {
            // 创建一个用于展示3D物体的节点
            const displayNode = new Node('DisplayNode');

            // 实例化预制体并添加到 displayNode 中
            this._instance = instantiate(this.rotatingPrefab);
            this._instance.setScale(0.75, 0.75, 0.75);
            displayNode.addChild(this._instance);
            this.node.addChild(displayNode);

            // 设置预制体的初始位置（中心点）
            this._instance.setPosition(new Vec3(0, 0, -21));

            // 获取 MeshRenderer 组件并设置材质颜色为白色
            const meshRenderer = this._instance.getComponent(MeshRenderer);
            if (meshRenderer) {
              const material = meshRenderer.material;
              material.setProperty('albedo', new Color(255, 255, 0, 255));
            }

            // 设置初始旋转角度为45度（倾斜）
            const initialRotation = new Quat();
            Quat.fromEuler(initialRotation, 35, 0, 35); // X轴和Z轴各倾斜45度
            this._instance.setRotation(initialRotation);
            console.log('旋转立方体初始化:', this._instance.getWorldPosition());
          }
        }
        update(deltaTime) {
          if (this._instance) {
            // 使用四元数进行旋转
            const rotation = new Quat();
            Quat.fromEuler(rotation, 0, this.speed * deltaTime, 0);
            this._instance.rotate(rotation);
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rotatingPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 30;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LshapeController.ts", ['cc'], function (exports) {
  var cclegacy, Component, Quat, Vec3, systemEvent, SystemEvent, Collider, RigidBody, Material, Color, Node, MeshRenderer, primitives, utils, BoxCollider, KeyCode, misc, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      Collider = module.Collider;
      RigidBody = module.RigidBody;
      Material = module.Material;
      Color = module.Color;
      Node = module.Node;
      MeshRenderer = module.MeshRenderer;
      primitives = module.primitives;
      utils = module.utils;
      BoxCollider = module.BoxCollider;
      KeyCode = module.KeyCode;
      misc = module.misc;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "916319fT3tECK94KDHZmHRU", "LshapeController", undefined);
      const {
        ccclass
      } = _decorator;
      let RotateAndMoveLShapeOnKey = exports('RotateAndMoveLShapeOnKey', (_dec = ccclass('RotateAndMoveLShapeOnKey'), _dec(_class = class RotateAndMoveLShapeOnKey extends Component {
        constructor(...args) {
          super(...args);
          this.isAnimating = false;
          // 用于防止动画重叠
          this.initialEulerAngles = void 0;
          // 存储初始欧拉角的变量
          this._lShapeNodes = [];
          // L字形的组成块
          this.combinedBoxCollider = null;
          this.startRotation = new Quat();
          // 初始四元数
          this.endRotation = new Quat();
          // 目标四元数
          this.startPosition = new Vec3();
          // 初始位置
          this.endPosition = new Vec3();
          // 目标位置
          this.currentLerpTime = 0;
          this.totalLerpTime = 0.5;
        }
        start() {
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          let collider = this.getComponent(Collider);
          if (collider) {
            collider.on('onTriggerEnter', this.onTriggerEnter, this);
            collider.on('onTriggerExit', this.onTriggerExit, this);
          }
          this.createLShape(); // 创建L形
          this.placeCubeAboveTile(0, 0); // 假设您想要将立方体放在第一行第一列的格子正上方
          this.initialEulerAngles = this.node.eulerAngles.clone();
        }
        createLShape() {
          // 添加一个刚体到整体节点
          const rigidBody = this.node.addComponent(RigidBody);
          rigidBody.type = RigidBody.Type.DYNAMIC;
          rigidBody.mass = 1;
          rigidBody.linearDamping = 0.1;
          rigidBody.angularDamping = 0.1;
          rigidBody.useGravity = true;
          rigidBody.allowSleep = false; // 防止刚体睡眠
          rigidBody.linearFactor = new Vec3(0, 1, 0); // 只允许在y方向上受力
          rigidBody.angularFactor = new Vec3(0, 0, 0); // 禁止角度上的任何变化
          const positions = [new Vec3(0, 0, 0), new Vec3(1, 0, 0), new Vec3(2, 0, 0), new Vec3(0, 1, 0)];
          const material = new Material();
          material.initialize({
            effectName: 'builtin-standard'
          });
          material.setProperty('mainColor', new Color(255, 255, 255, 255));
          positions.forEach((pos, index) => {
            const cubeNode = new Node(`Cube${index + 1}`);
            cubeNode.setPosition(pos);
            const meshRenderer = cubeNode.addComponent(MeshRenderer);
            const box = primitives.box(); // 创建一个box的几何体
            const mesh = utils.createMesh(box); // 创建网格
            meshRenderer.mesh = mesh;
            meshRenderer.material = material;
            this.node.addChild(cubeNode);
            this._lShapeNodes.push(cubeNode);

            // 调试信息
            console.log(`Created ${cubeNode.name} at position ${pos.toString()}`);
          });

          // 创建一个覆盖整个L形状的BoxCollider
          this.combinedBoxCollider = this.node.addComponent(BoxCollider);
          this.updateCombinedBoxCollider();
          this.combinedBoxCollider.enabled = true; // 确保BoxCollider在初始化时是启用的
        }

        updateCombinedBoxCollider() {
          if (!this.combinedBoxCollider) return;

          // 计算L形状边界
          let minX = Infinity,
            minY = Infinity,
            minZ = Infinity;
          let maxX = -Infinity,
            maxY = -Infinity,
            maxZ = -Infinity;
          this._lShapeNodes.forEach(node => {
            const pos = node.position;
            if (pos.x < minX) minX = pos.x;
            if (pos.y < minY) minY = pos.y;
            if (pos.z < minZ) minZ = pos.z;
            if (pos.x > maxX) maxX = pos.x;
            if (pos.y > maxY) maxY = pos.y;
            if (pos.z > maxZ) maxZ = pos.z;
          });
          const sizeX = maxX - minX + 1;
          const sizeZ = maxZ - minZ + 1;
          this.combinedBoxCollider.size = new Vec3(sizeX, 1, sizeZ);
          this.combinedBoxCollider.center = new Vec3((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
          console.log(`Updated BoxCollider size to: ${this.combinedBoxCollider.size.toString()}, center to: ${this.combinedBoxCollider.center.toString()}`);
        }
        onKeyDown(event) {
          if (!this.isAnimating) {
            switch (event.keyCode) {
              case KeyCode.KEY_A:
                this.rotateLShape(new Vec3(0, 0, 1), new Vec3(-1, 0, 0));
                break;
              case KeyCode.KEY_D:
                this.rotateLShape(new Vec3(0, 0, -1), new Vec3(1, 0, 0));
                break;
              case KeyCode.KEY_W:
                this.rotateLShape(new Vec3(-1, 0, 0), new Vec3(0, 0, -1));
                break;
              case KeyCode.KEY_S:
                this.rotateLShape(new Vec3(1, 0, 0), new Vec3(0, 0, 1));
                break;
            }
          }
        }
        // 总的插值时间，这里设置为0.5秒

        rotateLShape(axis, direction) {
          // 获取刚体组件并禁用动力学
          const rigidBody = this.node.getComponent(RigidBody);
          if (rigidBody) {
            rigidBody.type = RigidBody.Type.STATIC;
          }

          // 禁用 BoxCollider
          if (this.combinedBoxCollider) {
            this.combinedBoxCollider.enabled = false;
          }

          // 保存当前节点的初始位置和旋转
          this.startPosition.set(this.node.position);
          this.startRotation.set(this.node.rotation);

          // 计算结束位置和旋转
          Vec3.add(this.endPosition, this.startPosition, direction); // 结束位置是相对移动
          let rad = misc.degreesToRadians(90);
          Quat.rotateAround(this.endRotation, this.startRotation, axis, rad); // 计算并保存目标旋转四元数
          Quat.normalize(this.endRotation, this.endRotation);
          if (this.checkIfValidRotation(this.endPosition, this.endRotation)) {
            // 重置插值时间，并开始动画
            this.currentLerpTime = 0;
            this.isAnimating = true;
          } else {
            console.log('Invalid rotation detected');
            // 重新启用刚体动力学
            if (rigidBody) {
              rigidBody.type = RigidBody.Type.DYNAMIC;
            }
            // 重新启用 BoxCollider
            if (this.combinedBoxCollider) {
              this.combinedBoxCollider.enabled = true;
            }
          }
        }
        update(deltaTime) {
          if (this.isAnimating) {
            // 增加当前插值时间
            this.currentLerpTime += deltaTime;
            if (this.currentLerpTime > this.totalLerpTime) {
              this.currentLerpTime = this.totalLerpTime;
            }

            // 计算当前插值比例
            let lerpRatio = this.currentLerpTime / this.totalLerpTime;

            // 使用slerp进行四元数插值
            let currentRotation = Quat.slerp(new Quat(), this.startRotation, this.endRotation, lerpRatio);
            this.node.setRotation(currentRotation);

            // 使用lerp进行位置插值
            let currentPosition = Vec3.lerp(new Vec3(), this.startPosition, this.endPosition, lerpRatio);
            this.node.setPosition(currentPosition);

            // 如果插值完成，停止动画并启用刚体动力学
            if (lerpRatio >= 1) {
              const rigidBody = this.node.getComponent(RigidBody);
              if (rigidBody) {
                rigidBody.type = RigidBody.Type.DYNAMIC;
              }
              // 重新启用 BoxCollider
              if (this.combinedBoxCollider) {
                this.combinedBoxCollider.enabled = true;
              }
              this.isAnimating = false;
            }
          }
        }
        onTriggerEnter(event) {
          // 当物体进入触发器时调用
          console.log(`${event.otherCollider.node.name} entered the trigger`);
        }
        onTriggerExit(event) {
          // 当物体离开触发器时调用
          console.log(`${event.otherCollider.node.name} exited the trigger`);
        }
        placeCubeAboveTile(row, col) {
          // 放置L形状
          this.node.setPosition(new Vec3(row, 10, col)); // 将L形状放在支撑物上
        }

        onDestroy() {
          let collider = this.getComponent(Collider);
          if (collider) {
            collider.off('onTriggerEnter', this.onTriggerEnter, this);
            collider.off('onTriggerExit', this.onTriggerExit, this);
          }
          systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
        checkIfValidRotation(newPosition, newRotation) {
          const tolerance = 0.0001; // 定义一个小的容差值
          for (let node of this._lShapeNodes) {
            let localPosition = node.position.clone();
            let rotatedPosition = new Vec3();
            Vec3.transformQuat(rotatedPosition, localPosition, newRotation);
            rotatedPosition.add(newPosition);
            console.log(`Node ${node.name} rotated position: ${rotatedPosition.toString()}`);

            // 使用绝对值和容差值进行校验
            if (rotatedPosition.y < -tolerance) {
              console.log(`Invalid position detected for node ${node.name}: ${rotatedPosition.toString()}`);
              return false;
            }
          }
          return true;
        }
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './Loading.ts', './BgLoad.ts', './Global2.ts', './Main.ts', './ElementLoad.ts', './GameScene.ts', './Mimi.ts', './Step.ts', './StepLoad.ts', './LoginScene.ts', './AdMgr.ts', './AudioMgr.ts', './LocalMgr.ts', './ResMgr.ts', './WxAdMgr.ts', './Stop.ts', './TweenTools.ts', './WxTools.ts', './AdBox.ts', './EndBox.ts', './ShopBox.ts', './SingleInfo.ts', './TopLoad.ts', './ChangeCamera.ts', './Controller.ts', './Cubes.ts', './EstablishFloor.ts', './Levels.ts', './MathUtil.ts', './Mesh.ts', './RotateUtil.ts', './RoundRect2.ts', './Sample_Cursor2.ts', './UI.ts', './Vec3Util.ts', './LLM.ts', './Global.ts', './SurfacePlace.ts', './boxmovecontroller.ts', './ChessboardGenerator.ts', './ClickCount.ts', './Cubeflip.ts', './FlipCubeOnSurface.ts', './LevelController.ts', './LshapeController.ts', './PlaneWithHole.ts', './RubiksCube.ts', './TorusHit.ts', './ballmove.ts', './logo.ts', './unfoldplay.ts', './one.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['cc', './ResMgr.ts', './Global2.ts'], function (exports) {
  var cclegacy, _decorator, Component, instantiate, ResMgr, Global;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "2c2ad1mV2ZBgZq5Uc8JXvtC", "Main", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let Main = exports('Main', (_dec = ccclass('Main'), _dec(_class = (_class2 = class Main extends Component {
        onLoad() {
          Main.instance = this;
        }

        /**
         * 更新场景
         * @param 场景名称
         */
        UpdateScene(_scenename) {
          Global.IsDebug && console.log("更新游戏场景", _scenename);
          console.log(this.node.name);
          //销毁场景内得所有内容
          if (this.node.children.length > 0) {
            for (let i = 0; i < this.node.children.length; i++) {
              this.node.children[i].destroy();
            }
          }
          this.node.addChild(instantiate(ResMgr.instance.Prefabs[_scenename]));
        }
      }, _class2.instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MathUtil.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9775dMVM9lHQoUCBA1lLy2Y", "MathUtil", undefined);
      /** 数学工具 */
      class MathUtil {
        /**
         * 获得随机方向
         * @param x -1为左，1为右
         * @returns 
         */
        static sign(x) {
          if (x > 0) {
            return 1;
          }
          if (x < 0) {
            return -1;
          }
          return 0;
        }

        /**
         * 随时间变化进度值
         * @param start 初始值
         * @param end   结束值
         * @param t     时间
         */
        static progress(start, end, t) {
          return start + (end - start) * t;
        }

        /**
         * 插值
         * @param numStart 开始数值
         * @param numEnd   结束数值
         * @param t        时间
         */
        static lerp(numStart, numEnd, t) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          return numStart * (1 - t) + numEnd * t;
        }

        /**
         * 角度插值
         * @param angle1 角度1
         * @param angle2 角度2
         * @param t      时间
         */
        static lerpAngle(current, target, t) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;
          if (dAngle > 180) {
            target = current - (360 - dAngle);
          } else if (dAngle < -180) {
            target = current + (360 + dAngle);
          }
          return (MathUtil.lerp(current, target, t) % 360 + 360) % 360;
        }

        /**
         * 按一定的速度从一个角度转向令一个角度
         * @param current 当前角度
         * @param target  目标角度
         * @param speed   速度
         */
        static angleTowards(current, target, speed) {
          current %= 360;
          target %= 360;
          var dAngle = target - current;
          if (dAngle > 180) {
            target = current - (360 - dAngle);
          } else if (dAngle < -180) {
            target = current + (360 + dAngle);
          }
          var dir = target - current;
          if (speed > Math.abs(dir)) {
            return target;
          }
          return ((current + speed * Math.sign(dir)) % 360 + 360) % 360;
        }

        /**
         * 获取方位内值，超过时获取对应边界值
         * @param value     值
         * @param minLimit  最小值
         * @param maxLimit  最大值
         */
        static clamp(value, minLimit, maxLimit) {
          if (value < minLimit) {
            return minLimit;
          }
          if (value > maxLimit) {
            return maxLimit;
          }
          return value;
        }

        /**
         * 获得一个值的概率
         * @param value 值
         */
        static probability(value) {
          return Math.random() < value;
        }
      }
      exports('MathUtil', MathUtil);
      /**
       * 角度转弧度
       */
      MathUtil.deg2Rad = Math.PI / 180;
      /**
       * 弧度转角度
       */
      MathUtil.rad2Deg = 180 / Math.PI;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Mesh.ts", ['cc'], function (exports) {
  var cclegacy, Vec3, utils;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      utils = module.utils;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16023dwO0tLWIxCSsPaKVyM", "Mesh", undefined);
      let positions = [1.5, 0.7, 1.7, 1.4121320343559642, 0.7, 1.9121320343559642, 1.2, 0.7, 2, 1.4121320343559642, 0.9121320343559642, 1.7, 1.35, 0.9121320343559642, 1.8499999999999999, 1.2, 0.9121320343559642, 1.9121320343559642, 1.2, 1, 1.7, 1.5, 0.7, -1.7, 1.4121320343559642, 0.7, -1.9121320343559642, 1.2, 0.7, -2, 1.4121320343559642, 0.9121320343559642, -1.7, 1.35, 0.9121320343559642, -1.8499999999999999, 1.2, 0.9121320343559642, -1.9121320343559642, 1.2, 1, -1.7, -1.5, 0.7, -1.7, -1.4121320343559642, 0.7, -1.9121320343559642, -1.2, 0.7, -2, -1.4121320343559642, 0.9121320343559642, -1.7, -1.35, 0.9121320343559642, -1.8499999999999999, -1.2, 0.9121320343559642, -1.9121320343559642, -1.2, 1, -1.7, -1.5, 0.7, 1.7, -1.4121320343559642, 0.7, 1.9121320343559642, -1.2, 0.7, 2, -1.4121320343559642, 0.9121320343559642, 1.7, -1.35, 0.9121320343559642, 1.8499999999999999, -1.2, 0.9121320343559642, 1.9121320343559642, -1.2, 1, 1.7, 1.5, -0.7, 1.7, 1.4121320343559642, -0.7, 1.9121320343559642, 1.2, -0.7, 2, 1.4121320343559642, -0.9121320343559642, 1.7, 1.35, -0.9121320343559642, 1.8499999999999999, 1.2, -0.9121320343559642, 1.9121320343559642, 1.2, -1, 1.7, 1.5, -0.7, -1.7, 1.4121320343559642, -0.7, -1.9121320343559642, 1.2, -0.7, -2, 1.4121320343559642, -0.9121320343559642, -1.7, 1.35, -0.9121320343559642, -1.8499999999999999, 1.2, -0.9121320343559642, -1.9121320343559642, 1.2, -1, -1.7, -1.5, -0.7, -1.7, -1.4121320343559642, -0.7, -1.9121320343559642, -1.2, -0.7, -2, -1.4121320343559642, -0.9121320343559642, -1.7, -1.35, -0.9121320343559642, -1.8499999999999999, -1.2, -0.9121320343559642, -1.9121320343559642, -1.2, -1, -1.7, -1.5, -0.7, 1.7, -1.4121320343559642, -0.7, 1.9121320343559642, -1.2, -0.7, 2, -1.4121320343559642, -0.9121320343559642, 1.7, -1.35, -0.9121320343559642, 1.8499999999999999, -1.2, -0.9121320343559642, 1.9121320343559642, -1.2, -1, 1.7, -1.2, 1, -1.7, -1.2, 1, 1.7, 1.2, 1, 1.7, 1.2, 1, -1.7, 1.2, -1, 1.7, 1.2, -1, -1.7, -1.2, -1, -1.7, -1.2, -1, 1.7, 1.5, 0.7, 1.7, 1.5, 0.7, -1.7, 1.5, -0.7, 1.7, 1.5, -0.7, -1.7, -1.5, 0.7, -1.7, -1.5, 0.7, 1.7, -1.5, -0.7, -1.7, -1.5, -0.7, 1.7, 1.2, 0.7, 2, -1.2, 0.7, 2, 1.2, -0.7, 2, -1.2, -0.7, 2, 1.2, 0.7, -2, -1.2, 0.7, -2, 1.2, -0.7, -2, -1.2, -0.7, -2];
      let normals = [1, 0, 0, 0.7071067811865476, 0, 0.7071067811865475, 0, 0, 1, 0.7071067811865476, 0.7071067811865475, 0, 0.5000000000000001, 0.7071067811865475, 0.5, 4.329780281177467e-17, 0.7071067811865475, 0.7071067811865476, 0, 1, 0, 1, 0, 0, 0.7071067811865476, 0, -0.7071067811865475, 0, 0, -1, 0.7071067811865476, 0.7071067811865475, 0, 0.5000000000000001, 0.7071067811865475, -0.5, 4.329780281177467e-17, 0.7071067811865475, -0.7071067811865476, 0, 1, 0, -1, 0, 0, -0.7071067811865476, 0, -0.7071067811865475, -0, 0, -1, -0.7071067811865476, 0.7071067811865475, 0, -0.5000000000000001, 0.7071067811865475, -0.5, -4.329780281177467e-17, 0.7071067811865475, -0.7071067811865476, 0, 1, 0, -1, 0, 0, -0.7071067811865476, 0, 0.7071067811865475, -0, 0, 1, -0.7071067811865476, 0.7071067811865475, 0, -0.5000000000000001, 0.7071067811865475, 0.5, -4.329780281177467e-17, 0.7071067811865475, 0.7071067811865476, 0, 1, 0, 1, 0, 0, 0.7071067811865476, 0, 0.7071067811865475, 0, 0, 1, 0.7071067811865476, -0.7071067811865475, 0, 0.5000000000000001, -0.7071067811865475, 0.5, 4.329780281177467e-17, -0.7071067811865475, 0.7071067811865476, 0, -1, 0, 1, 0, 0, 0.7071067811865476, 0, -0.7071067811865475, 0, 0, -1, 0.7071067811865476, -0.7071067811865475, 0, 0.5000000000000001, -0.7071067811865475, -0.5, 4.329780281177467e-17, -0.7071067811865475, -0.7071067811865476, 0, -1, 0, -1, 0, 0, -0.7071067811865476, 0, -0.7071067811865475, -0, 0, -1, -0.7071067811865476, -0.7071067811865475, 0, -0.5000000000000001, -0.7071067811865475, -0.5, -4.329780281177467e-17, -0.7071067811865475, -0.7071067811865476, 0, -1, 0, -1, 0, 0, -0.7071067811865476, 0, 0.7071067811865475, -0, 0, 1, -0.7071067811865476, -0.7071067811865475, 0, -0.5000000000000001, -0.7071067811865475, 0.5, -4.329780281177467e-17, -0.7071067811865475, 0.7071067811865476, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 0, 0, 1, -0, 0, 1, 0, 0, 1, -0, 0, 1, 0, 0, -1, -0, 0, -1, 0, 0, -1, -0, 0, -1];
      let uvs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let indices = [56, 57, 58, 56, 58, 59, 60, 62, 61, 60, 63, 62, 64, 66, 65, 65, 66, 67, 68, 70, 69, 69, 70, 71, 72, 73, 74, 73, 75, 74, 76, 78, 77, 77, 78, 79, 0, 3, 1, 1, 3, 4, 1, 4, 2, 2, 4, 5, 3, 6, 4, 4, 6, 5, 7, 8, 10, 8, 11, 10, 8, 9, 11, 9, 12, 11, 10, 11, 13, 11, 12, 13, 14, 17, 15, 15, 17, 18, 15, 18, 16, 16, 18, 19, 17, 20, 18, 18, 20, 19, 21, 22, 24, 22, 25, 24, 22, 23, 25, 23, 26, 25, 24, 25, 27, 25, 26, 27, 28, 29, 31, 29, 32, 31, 29, 30, 32, 30, 33, 32, 31, 32, 34, 32, 33, 34, 35, 38, 36, 36, 38, 39, 36, 39, 37, 37, 39, 40, 38, 41, 39, 39, 41, 40, 42, 43, 45, 43, 46, 45, 43, 44, 46, 44, 47, 46, 45, 46, 48, 46, 47, 48, 49, 52, 50, 50, 52, 53, 50, 53, 51, 51, 53, 54, 52, 55, 53, 53, 55, 54, 0, 1, 28, 1, 29, 28, 1, 2, 29, 2, 30, 29, 7, 35, 8, 8, 35, 36, 8, 36, 9, 9, 36, 37, 14, 15, 42, 15, 43, 42, 15, 16, 43, 16, 44, 43, 21, 49, 22, 22, 49, 50, 22, 50, 23, 23, 50, 51, 2, 5, 23, 5, 26, 23, 5, 6, 26, 6, 27, 26, 9, 16, 12, 12, 16, 19, 12, 19, 13, 13, 19, 20, 30, 51, 33, 33, 51, 54, 33, 54, 34, 34, 54, 55, 37, 40, 44, 40, 47, 44, 40, 41, 47, 41, 48, 47, 0, 7, 3, 3, 7, 10, 3, 10, 6, 6, 10, 13, 14, 21, 17, 17, 21, 24, 17, 24, 20, 20, 24, 27, 28, 31, 35, 31, 38, 35, 31, 34, 38, 34, 41, 38, 42, 45, 49, 45, 52, 49, 45, 48, 52, 48, 55, 52];
      const size = new Vec3(3, 2, 4).multiplyScalar(0.5);
      const minPos = new Vec3(-size.x, -size.y, -size.z);
      const maxPos = new Vec3(size.x, size.y, size.z);
      const boundingRadius = Math.sqrt(size.x * size.x + size.y * size.y + size.z * size.z);
      const CubeMesh = exports('CubeMesh', utils.MeshUtils.createMesh({
        positions,
        normals,
        uvs,
        indices,
        minPos,
        maxPos,
        boundingRadius
      }));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Mimi.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './StepLoad.ts', './Step.ts', './Global2.ts', './GameScene.ts', './ElementLoad.ts', './AudioMgr.ts', './ResMgr.ts', './LocalMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Sprite, UITransform, Vec3, Animation, StepLoad, Step, Global, PropList, GameScene, ElementLoad, AudioMgr, ResMgr, LocalMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Animation = module.Animation;
    }, function (module) {
      StepLoad = module.StepLoad;
    }, function (module) {
      Step = module.Step;
    }, function (module) {
      Global = module.Global;
      PropList = module.PropList;
    }, function (module) {
      GameScene = module.GameScene;
    }, function (module) {
      ElementLoad = module.ElementLoad;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      ResMgr = module.ResMgr;
    }, function (module) {
      LocalMgr = module.LocalMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "b5421EUygJMn4SMEcqHaZT+", "Mimi", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let Mimi = exports('Mimi', (_dec = ccclass('Mimi'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec(_class = (_class2 = class Mimi extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "Cat", _descriptor, this);
          //下降速度
          this.Vy = 40;
          this.AddVy = -0.5;
          //跳跃速度
          this.JumpVy = 20;
          //横向移动
          this.Vx = 0;
          //我的宽高
          this.MyWidth = 0;
          this.MyHeight = 0;
          //台阶层
          _initializerDefineProperty(this, "StepLoad", _descriptor2, this);
          //游戏场景
          _initializerDefineProperty(this, "GameScene", _descriptor3, this);
          //元素层
          _initializerDefineProperty(this, "ElementLaod", _descriptor4, this);
        }
        start() {
          this.Cat.getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["cathead" + LocalMgr.instance.LocalInfo.lastchoose.toString()];
          this.MyWidth = this.Cat.getComponent(UITransform).width;
          this.MyHeight = this.Cat.getComponent(UITransform).height;
        }

        /**
         * 我复活了
         */
        IamSave() {
          this.node.setPosition(new Vec3(0, 0));
          this.Vy = 40;
        }

        /**
         * 起跳
         */
        ImaMove(_vx) {
          this.Vx = _vx;
        }
        update(dt) {
          if (Global.IsGameOver) return;
          let now_pos = this.node.getPosition();
          let new_pos = now_pos.add(new Vec3(this.Vx, this.Vy));
          this.Vy += this.AddVy;
          let max_width = 375 - this.MyWidth / 2;
          if (new_pos.x < -max_width) new_pos.x = -max_width;else if (new_pos.x > max_width) new_pos.x = max_width;
          if (new_pos.y > 0) {
            new_pos.y = 0;
            //台阶向下移动
            this.StepLoad.getComponent(StepLoad).StepMove(-this.Vy);
          }
          this.node.setPosition(new_pos);
          this.CheckStep();

          //游戏结束判断
          if (this.node.getPosition().y < Global.GameBottom) {
            AudioMgr.instance.PlayEffect("ao", "click");
            this.GameScene.getComponent(GameScene).GameOver();
          }
        }

        /**
         * 台阶检测
         */
        CheckStep() {
          let my_pos = this.node.getPosition();
          let my_world = this.node.getWorldPosition();
          for (let step of this.StepLoad.getComponent(StepLoad).StepArray) {
            //台阶判断
            if (Math.abs(my_pos.x - step.getPosition().x) <= step.getComponent(Step).MyWidth / 2 && Math.abs(my_pos.y - step.getPosition().y) <= (this.MyHeight + step.getComponent(Step).MyHeight) / 2 && step.position.y < my_pos.y && step.active && this.Vy < 0) {
              this.node.getChildByName("Cat").getComponent(Animation).play();
              this.Vy = this.JumpVy;
              step.getComponent(Step).PlayAnimation();
              AudioMgr.instance.PlayEffect("dagn", "click");
            }
            //道具判断
            let prop = step.getChildByName("Step").getChildByName("Prop");
            if (Math.abs(my_world.x - prop.getWorldPosition().x) <= (this.MyHeight + step.getComponent(Step).PropWidth) / 2 && Math.abs(my_world.y - prop.getWorldPosition().y) <= (this.MyHeight + step.getComponent(Step).PropWidth) / 2 && prop.active) {
              prop.active = false;
              switch (step.getComponent(Step).PropType) {
                case PropList.Coin:
                  //碰到金币
                  this.ElementLaod.getComponent(ElementLoad).AddCoin(1);
                  AudioMgr.instance.PlayCoin();
                  break;
                case PropList.Boom:
                  //碰到爆炸物
                  if (this.Vy < 0) this.ElementLaod.getComponent(ElementLoad).BleedReduce();else prop.active = true;
                  break;
                case PropList.Speed:
                  //碰到加速度
                  this.Vy = this.JumpVy * 2;
                  break;
              }
            }
          }
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Cat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "StepLoad", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "GameScene", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ElementLaod", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/one.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, EditBox, _decorator, Component, assetManager, director, Director, view, ResolutionPolicy;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      EditBox = module.EditBox;
      _decorator = module._decorator;
      Component = module.Component;
      assetManager = module.assetManager;
      director = module.director;
      Director = module.Director;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "7283329ftRNsY80Jx4MYFBY", "one", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let LoginController = exports('LoginController', (_dec = ccclass('LoginController'), _dec2 = property(EditBox), _dec3 = property(EditBox), _dec(_class = (_class2 = class LoginController extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "usernameInput", _descriptor, this);
          _initializerDefineProperty(this, "passwordInput", _descriptor2, this);
        }
        // 登录按钮点击事件
        onLoginButtonClicked() {
          const username = this.usernameInput.string;
          const password = this.passwordInput.string;
          if (!username || !password) {
            console.error("Username or password cannot be empty!");
            return;
          }

          // 调用登录函数，进行账号校验
          this.login(username, password);
        }
        async login(username, password) {
          const apiUrl = 'http://124.71.181.62:3000/api/login'; // 替换为API服务器地址

          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username,
                password
              })
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            //console.log(data)

            if (data.success) {
              console.log('Login successful!');

              // 记录session或token
              localStorage.setItem('sessionToken', data.token); // 假设服务器返回token作为session标识
              localStorage.setItem('currentUsername', username);

              // 登录成功后加载游戏场景
              this.loadGameScene();
            } else {
              console.error('Login failed:', data.message);
            }
          } catch (error) {
            console.error('Error during login:', error);
          }
        }
        loadGameScene() {
          // 加载 "game" 资源包中的 Scene 场景
          assetManager.loadBundle("resources", (err, bundle) => {
            if (err) {
              console.error('Failed to load bundle:', err);
              return;
            }
            director.loadScene("Scene");
          });

          // 使用 Director 类的静态成员访问事件常量
          director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.adjustCanvasResolution, this);

          // 对初始场景进行适配
          //this.adjustCanvasResolution();
        }

        adjustCanvasResolution() {
          // 设置设计分辨率和适配策略
          view.setDesignResolutionSize(720, 1280, ResolutionPolicy.FIXED_WIDTH);
        }
        start() {
          // 其他初始化代码
        }
        update(deltaTime) {
          // 每帧更新逻辑
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "usernameInput", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "passwordInput", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlaneWithHole.ts", ['cc'], function (exports) {
  var cclegacy, Component, PhysicsSystem, Vec3, Material, Color, Node, MeshRenderer, primitives, utils, BoxCollider, RigidBody, ERigidBodyType, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      PhysicsSystem = module.PhysicsSystem;
      Vec3 = module.Vec3;
      Material = module.Material;
      Color = module.Color;
      Node = module.Node;
      MeshRenderer = module.MeshRenderer;
      primitives = module.primitives;
      utils = module.utils;
      BoxCollider = module.BoxCollider;
      RigidBody = module.RigidBody;
      ERigidBodyType = module.ERigidBodyType;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "8ed7bMqnXpHL5y7B6m6yxYl", "PlaneWithHole", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let PlaneWithHole = exports('PlaneWithHole', (_dec = ccclass('PlaneWithHole'), _dec(_class = class PlaneWithHole extends Component {
        start() {
          this.createPlaneWithHole();
          PhysicsSystem.instance.enable = true; // 启用物理系统
        }

        createPlaneWithHole() {
          const rows = 7; // 每层的行数
          const cols = 7; // 每层的列数
          const holePositions = [new Vec3(0, -3, 1), new Vec3(0, -2, 1), new Vec3(0, -1, 1), new Vec3(1, -3, 1), new Vec3(1, -2, 1), new Vec3(1, -1, 1)]; // L字形空的坐标

          const material = new Material();
          material.initialize({
            effectName: 'builtin-standard'
          });
          material.setProperty('mainColor', new Color(100, 100, 100, 255));
          for (let y = -3; y < 0; y++) {
            for (let i = -5; i < rows; i++) {
              for (let j = -5; j < cols; j++) {
                const pos = new Vec3(j, y, i);
                if (!holePositions.some(holePos => holePos.equals(pos))) {
                  const cubeNode = new Node(`Cube_${y}_${i}_${j}`);
                  cubeNode.setPosition(pos);
                  const meshRenderer = cubeNode.addComponent(MeshRenderer);
                  const box = primitives.box();
                  const mesh = utils.createMesh(box);
                  meshRenderer.mesh = mesh;
                  meshRenderer.material = material;
                  const boxCollider = cubeNode.addComponent(BoxCollider);
                  boxCollider.isTrigger = false; // 确保不是触发器

                  const rigidBody = cubeNode.addComponent(RigidBody);
                  rigidBody.type = ERigidBodyType.STATIC; // 设置刚体类型为静态

                  this.node.addChild(cubeNode);
                }
              }
            }
          }
        }
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResMgr.ts", ['cc', './Global2.ts'], function (exports) {
  var cclegacy, _decorator, assetManager, Prefab, SpriteFrame, JsonAsset, AudioClip, Global;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      JsonAsset = module.JsonAsset;
      AudioClip = module.AudioClip;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "16426TgbThJY4iTCSR4tiSX", "ResMgr", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ResMgr = exports('ResMgr', (_dec = ccclass('ResMgr'), _dec(_class = (_class2 = class ResMgr {
        constructor() {
          //包体
          this.Bundles = {};
          //预设体数组
          this.Prefabs = {};
          //纹理数组
          this.SpriteFrames = {};
          //音乐数组
          this.Audio = {};
          //当前加载进度
          this.NowProgress = 0;
        }
        //
        static get instance() {
          if (!this._instance) {
            this._instance = new ResMgr();
          }
          return this._instance;
        }
        /**
         * 加载包体
         * @param 包体名称
         * @oaran 完成进度
         */
        async LoadBundle(_bundlename, _completeprogress = 0) {
          return new Promise((_resolve, _reject) => {
            assetManager.loadBundle(_bundlename, (err, bundle) => {
              Global.IsDebug && console.log(_bundlename + "包加载包完成", err, bundle);
              this.Bundles[_bundlename] = bundle;
              Global.LoadProgress += _completeprogress;
              this.NowProgress = Global.LoadProgress;
              _resolve && _resolve();
            });
          });
        }

        /**
         * 加载资源
         * @param 包体名称
         * @param 加载类型
         * @oaran 完成进度
         */
        async LoadRes(_bundlename, _type, _completeprogress = 0) {
          return new Promise((_resolve, _reject) => {
            // 先加载 game bundle
            assetManager.loadBundle("resources", (err, bundle) => {
              if (err) {
                console.error("加载game包失败:", err);
                _reject && _reject(err);
                return;
              }

              // 加载指定bundle的资源
              this.Bundles[_bundlename].loadDir(_type.path, _type.type, (_fish, _total) => {
                Global.LoadProgress = _completeprogress * (_fish / _total) + this.NowProgress;
                // Global.IsDebug && console.log("加载" + _bundlename + "包体进度", _type, _fish, _total, Global.LoadProgress);
              }, (_err, _assets) => {
                if (_err) {
                  console.error("加载资源时出错:", _err);
                  _reject && _reject(_err);
                  return;
                }
                Global.IsDebug && console.log("加载完成", _assets, _bundlename);
                this.NowProgress = Global.LoadProgress;
                console.warn("当前包资源", this.NowProgress, _type);

                // 处理资源
                let asset;
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
        LoadInit() {
          this.NowProgress = 0;
          Global.LoadProgress = 0;
        }
      }, _class2._instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RotateUtil.ts", ['cc', './Vec3Util.ts'], function (exports) {
  var cclegacy, Quat, Vec3, toRadian, Vec3Util;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      toRadian = module.toRadian;
    }, function (module) {
      Vec3Util = module.Vec3Util;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f3d53nsR7NPVabCNI1umvxz", "RotateUtil", undefined);

      /** 旋转工具 */
      class RotateUtil {
        /**
         * 自由旋转
         * @param target     旋转目标
         * @param axis       围绕旋转的轴
         * @param rad        旋转弧度
         */
        static rotateAround(target, axis, rad) {
          var quat = new Quat();
          Quat.rotateAround(quat, target.getRotation(), axis.normalize(), rad);
          target.setRotation(quat);
        }

        /**
         * 参考瞄准目标,使当前物体围绕瞄准目标旋转
         * 1、先通过弧度计算旋转四元数
         * 2、通过旋转中心点或当前目标点向量相减计算出移动方向
         * 3、计算起始向量旋转后的向量
         * 4、计算旋转后的坐标点
         * @param lookAt        瞄准目标
         * @param target        旋转目标
         * @param axis          围绕旋转的轴(例：Vec3.UP为Y轴)
         * @param rad           旋转弧度(例：delta.x * 1e-2)
         */
        static rotateAroundTarget(lookAt, target, axis, rad) {
          // 计算坐标
          var point_lookAt = lookAt.worldPosition; // 锚点坐标
          var point_target = target.worldPosition; // 目标坐标
          var quat = new Quat();
          var vec3 = new Vec3();

          // 算出坐标点的旋转四元数
          Quat.fromAxisAngle(quat, axis, rad);
          // 计算旋转点和现有点的向量
          Vec3.subtract(vec3, point_target, point_lookAt);
          // 计算将向量做旋转操作后的向量
          Vec3.transformQuat(vec3, vec3, quat);
          // 计算目标旋转后的点
          Vec3.add(vec3, point_lookAt, vec3);
          target.setWorldPosition(vec3);

          // 计算目标朝向瞄准点
          Quat.rotateAround(quat, target.worldRotation, axis, rad);
          Quat.normalize(quat, quat);
          target.setWorldRotation(quat);
        }

        /**
         * 获取心半径边上的位置
         * @param center    圆心
         * @param radius    半径
         * @param angle     角度
         */
        static circularEdgePosition(center, radius, angle) {
          let edge = Vec3Util.z.multiplyScalar(radius); // 距离圆心Z抽的距离
          let dir = Vec3Util.sub(edge, center); // 初始圆心与目标位置的方向
          let vec3 = new Vec3();
          var quat = new Quat();

          // 算出坐标点的旋转四元数
          Quat.fromAxisAngle(quat, Vec3.UP, toRadian(angle));
          // 计算将向量做旋转操作后的向量
          Vec3.transformQuat(vec3, dir, quat);
          // 计算目标旋转后的点
          Vec3.add(vec3, center, vec3);
          return vec3;
        }
      }
      exports('RotateUtil', RotateUtil);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RoundRect2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, CCInteger, CCFloat, _decorator, Component, Node, MeshRenderer, Mesh, Material, utils, Vec3, math, Color;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      CCInteger = module.CCInteger;
      CCFloat = module.CCFloat;
      _decorator = module._decorator;
      Component = module.Component;
      Node = module.Node;
      MeshRenderer = module.MeshRenderer;
      Mesh = module.Mesh;
      Material = module.Material;
      utils = module.utils;
      Vec3 = module.Vec3;
      math = module.math;
      Color = module.Color;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _class3;
      cclegacy._RF.push({}, "807e2ylBIJDSoIIfZC5LfbL", "RoundRect", undefined);
      const {
        ccclass,
        property,
        executeInEditMode
      } = _decorator;

      /** [圆角矩形] 通过调整公开参数, 动态绘制一个圆角矩形的Mesh;
       * * 基于引擎API: *utils.MeshUtils.createDynamicMesh* 绘制;
       * * 内部包含优化策略, 各公开参数均可暴力调整;
       * * 主要为3D场合使用, 顺带做了UI模式;
       * * 暂时不支持合批, 大量使用时谨慎谨慎;
       * @version 1.0.0
       */
      let RoundRect = exports('RoundRect', (_dec = ccclass('RoundRect'), _dec2 = executeInEditMode(true), _dec3 = property({
        displayName: '手动初始化',
        tooltip: '在编辑器中, 如果没有生成网格, 则手动点一下',
        visible: function () {
          return !this._mr;
        }
      }), _dec4 = property({
        displayName: '[只读]多边形数量',
        tooltip: '显示创建网格的三角面的数量',
        visible: function () {
          return !!this._geometry?.indices16;
        }
      }), _dec5 = property(), _dec6 = property({
        displayName: '调试模式',
        tooltip: '在编辑器面板显示内部数据'
      }), _dec7 = property(), _dec8 = property({
        displayName: 'UI模式',
        tooltip: '设置为UI模式之后, 网格将会竖放, 同时矩形宽高由UITransfrom的Size调整\n* 编辑器时, 组件会自动判断节点是否UI, 此选项仅供必要时手动设置'
      }), _dec9 = property(), _dec10 = property({
        displayName: '颜色'
      }), _dec11 = property(), _dec12 = property({
        displayName: '是否显示线段',
        tooltip: '不选中的话, 则仅显示4个角'
      }), _dec13 = property(), _dec14 = property({
        displayName: '是否圆角',
        tooltip: '切换圆角和直角\n* 切换成直角时, `圆角半径`和`圆角步长`将会失效'
      }), _dec15 = property(CCInteger), _dec16 = property({
        type: CCInteger,
        displayName: '圆角步长',
        tooltip: '步长越大, 圆角越圆滑, 网格面数越多\n* 此数值必须大于0\n* 此数值必须小于40',
        slide: true,
        step: 1,
        range: [1, 40],
        visible: function () {
          return this._hasRound;
        }
      }), _dec17 = property({
        type: CCFloat,
        displayName: '[只读]实际半径',
        readonly: true,
        serializable: false,
        visible: function () {
          return RoundRect._showEditor;
        }
      }), _dec18 = property(CCFloat), _dec19 = property({
        type: CCFloat,
        displayName: '圆角半径',
        tooltip: '圆角半径越大, 圆角占用的面积越大\n* 此数值必须大于0\n* 矩形尺寸过小时, 圆角半径会自适应',
        visible: function () {
          return this._hasRound;
        }
      }), _dec20 = property({
        type: CCFloat,
        displayName: '[只读]外部线宽',
        readonly: true,
        serializable: false,
        visible: function () {
          return RoundRect._showEditor;
        }
      }), _dec21 = property({
        type: CCFloat,
        displayName: '[只读]内部线宽',
        readonly: true,
        serializable: false,
        visible: function () {
          return RoundRect._showEditor;
        }
      }), _dec22 = property(CCFloat), _dec23 = property({
        type: CCFloat,
        displayName: '线宽',
        tooltip: '线宽越大, 矩形线框的宽度越大\n* 此数值必须大于0'
      }), _dec24 = property(CCFloat), _dec25 = property({
        type: CCFloat,
        displayName: '内外偏移',
        tooltip: '调整线宽时的方向和比例\n0: 内侧, 0.5: 居中, 1: 外侧',
        slide: true,
        step: 0.01,
        range: [0, 1]
      }), _dec26 = property(CCFloat), _dec27 = property({
        type: CCFloat,
        displayName: '矩形宽度',
        tooltip: '矩形在X轴向的长度\n* 此数值必须大于0',
        visible: function () {
          return !this._isUI;
        }
      }), _dec28 = property(CCFloat), _dec29 = property({
        type: CCFloat,
        displayName: '矩形深度',
        tooltip: '矩形在Z轴向的长度\n* 此数值必须大于0',
        visible: function () {
          return !this._isUI;
        }
      }), _dec30 = property(CCFloat), _dec31 = property({
        type: CCFloat,
        displayName: '整体高度',
        tooltip: '矩形在Y轴向的位置',
        visible: function () {
          return !this._isUI;
        }
      }), _dec(_class = _dec2(_class = (_class2 = (_class3 = class RoundRect extends Component {
        constructor(...args) {
          super(...args);
          /** [hasPresetInEditor] 用于记录从编辑器添加时, 自动判断当前节点是否UI */
          _initializerDefineProperty(this, "_", _descriptor, this);
          _initializerDefineProperty(this, "_isUI", _descriptor2, this);
          _initializerDefineProperty(this, "_color", _descriptor3, this);
          _initializerDefineProperty(this, "_showLine", _descriptor4, this);
          _initializerDefineProperty(this, "_hasRound", _descriptor5, this);
          _initializerDefineProperty(this, "_roundStep", _descriptor6, this);
          _initializerDefineProperty(this, "_realRound", _descriptor7, this);
          _initializerDefineProperty(this, "_round", _descriptor8, this);
          _initializerDefineProperty(this, "_outerLineWidth", _descriptor9, this);
          _initializerDefineProperty(this, "_innerLineWidth", _descriptor10, this);
          _initializerDefineProperty(this, "_lineWidth", _descriptor11, this);
          _initializerDefineProperty(this, "_anchor", _descriptor12, this);
          _initializerDefineProperty(this, "_width", _descriptor13, this);
          _initializerDefineProperty(this, "_height", _descriptor14, this);
          _initializerDefineProperty(this, "_y", _descriptor15, this);
          //#endregion [UI]
          //#region [update]
          this.dirty = DirtyType.none;
          //#endregion [update]
          //#region [mesh]
          this._mr = void 0;
          this._mesh = void 0;
          this._geometry = void 0;
          this._options = void 0;
          //#endregion [mesh]
          //#region [virtual]
          this._tools = void 0;
          this._conners = void 0;
          this._lines = void 0;
          this._pPool = void 0;
          this._mats = void 0;
        }
        __checkPreset_inEditor() {
          return;
        }
        __setPreset_inEditor() {
          const preset = RoundRect.uipreset;
          for (const key in preset) this[key] = preset[key];
        }

        //#endregion [Editor]

        //#region [propertys]

        get draw() {
          return true;
        }
        set draw(v) {
          this.init();
        }
        get triCount() {
          return this._geometry?.indices16?.length / 3;
        }
        get showEditor() {
          return RoundRect._showEditor;
        }
        set showEditor(v) {
          RoundRect._showEditor = v;
        }
        get isUI() {
          return this._isUI;
        }
        set isUI(v) {
          if (this._isUI === v) return;
          this._isUI = v;
          this._listenWH(v);
          this.dirty |= DirtyType.gmyPos;
        }
        get color() {
          return this._color;
        }
        set color(v) {
          this._color.set(v);
          this._mr.sharedMaterial.setProperty('mainColor', v, 0);
        }
        get showLine() {
          return this._showLine;
        }
        set showLine(v) {
          if (this._showLine === v) return;
          this._showLine = v;
          this.dirty |= DirtyType.count;
        }
        /** [是否圆角] 切换圆角和直角
         * * 切换成直角时, `圆角半径`和`圆角步长`将会失效 */
        get hasRound() {
          return this._hasRound;
        }
        set hasRound(v) {
          if (this._hasRound === v) return;
          this._hasRound = v;
          this.dirty |= DirtyType.count;
        }
        /** [圆角步长] 步长越大, 圆角越圆滑, 网格面数越多
         * * 此数值必须大于0, 会自行判断并处理
         * * 此数值必须小于40, 会自行判断并处理
         * * 显示直角时, 此数值不相应 */
        get roundStep() {
          return this._roundStep;
        }
        set roundStep(v) {
          if (v < 0) v = 0;
          if (v > 40) v = 40;
          if (this._roundStep === v) return;
          this._roundStep = v;
          this.dirty |= DirtyType.count;
        }
        /** [圆角半径] 圆角半径越大, 圆角占用的面积越大
         * * 此数值必须大于0, 会自行判断并处理
         * * 矩形尺寸过小时, 圆角半径会自适应
         * * 显示直角时, 此数值不相应 */
        get round() {
          return this._round;
        }
        set round(v) {
          if (v < 0) v = 0;
          if (this._round === v) return;
          this._round = v;
          this.dirty |= DirtyType.sharp;
        }
        /** [线宽] 线宽越大, 矩形线框的宽度越大
         * * 此数值必须大于0, 会自行判断并处理 */
        get lineWidth() {
          return this._lineWidth;
        }
        set lineWidth(v) {
          if (v < 0) v = 0;
          if (this._lineWidth === v) return;
          this._lineWidth = v;
          this.dirty |= DirtyType.sharp;
        }
        /** [内外偏移] 调整线宽时的方向和比例
         * * 0: 内侧, 0.5: 居中, 1: 外侧 */
        get anchor() {
          return this._anchor;
        }
        set anchor(v) {
          if (v < 0) v = 0;
          if (v > 1) v = 1;
          if (this._anchor === v) return;
          this._anchor = v;
          this.dirty |= DirtyType.sharp;
        }
        /** [矩形宽度] 矩形在X轴向的长度
         * * 此数值必须大于0, 会自行判断并处理
         * * UI模式下, 修改`UITransform`的`contentSize` */
        get width() {
          return this._width;
        }
        set width(v) {
          if (v < 0) v = 0;
          if (this._width === v) return;
          this._width = v;
          this.dirty |= DirtyType.wh;
        }
        /** [矩形宽度] 矩形在Z轴向的长度
         * * 此数值必须大于0, 会自行判断并处理
         * * UI模式下, 修改`UITransform`的`contentSize` */
        get height() {
          return this._height;
        }
        set height(v) {
          if (v < 0) v = 0;
          if (this._height === v) return;
          this._height = v;
          this.dirty |= DirtyType.wh;
        }
        /** [整体高度] 矩形在Y轴向的位置
         * * UI模式下, 此数值不相应 */
        get y() {
          return this._y;
        }
        set y(v) {
          this._y = v;
          this.dirty |= DirtyType.gmyPos;
        }

        //#endregion [propertys]

        init() {
          if (this._mr) return;
          this.__checkPreset_inEditor();
          this.initMesh();
          this.initV();
          if (this._isUI) this._listenWH(true);
          this._onRAL_VC();
          this.updateCount();
          this.dirty = DirtyType.none;
        }

        //#region [Component]

        onLoad() {
          this.init();
        }
        lateUpdate() {
          this.updateDirty();
        }

        //#endregion [Component]

        //#region [public]

        /** [立即更新] 适用于修改参数后需要立即更新网格的场合 */
        updateImmediate() {
          this.updateDirty();
        }

        //#endregion [public]

        //#region [UI]

        _listenWH(isOn) {
          const cb = isOn ? this.node.on : this.node.off;
          cb.call(this.node, Node.EventType.SIZE_CHANGED, this._onSizeVC, this);
          if (isOn) this._onSizeVC();
        }
        _onSizeVC() {
          const tsf = this.node._uiProps.uiTransformComp;
          if (!tsf) return;
          const size = tsf.contentSize;
          this.width = size.width;
          this.height = size.height;
        }
        updateDirty() {
          if (!this.dirty) return;
          let dirty = this.dirty;
          this.dirty = DirtyType.none;
          if (dirty & DirtyType.sharp) this._onRAL_VC();else if (dirty & DirtyType.wh) this._onWH_VC() || (dirty |= DirtyType.sharp);
          if (dirty & DirtyType.count) this.updateCount();else if (dirty & DirtyType.sharp) this.updateSharp();else if (dirty & DirtyType.wh) this.updatePos();else if (dirty & DirtyType.gmy) this.updateGmyPoss();else if (dirty & DirtyType.gmyPos) this.updateGmyPoss();else if (dirty & DirtyType.mesh) this.updateMesh();
        }
        updateCount() {
          this._updateCount();
          this.updateSharp();
        }
        updateSharp() {
          this._updateSharp();
          this.updatePos();
        }
        updatePos() {
          this._updatePos();
          this.updateGmy();
        }
        updateGmy() {
          this._updateGmy();
          this.updateMesh();
        }
        updateGmyPoss() {
          this._updateGmyPoss();
          this.updateMesh();
        }
        initMesh() {
          this._mr = this.getComponent(MeshRenderer) || this.addComponent(MeshRenderer);
          this._mr.mesh = this._mesh = new Mesh();
          this._mesh.name = 'create by RoundRect';
          if (!this._mr.sharedMaterial) {
            const mtl = new Material();
            mtl.name = 'create by RoundRect';
            mtl.initialize({
              effectName: 'builtin-unlit'
            });
            mtl.setProperty('mainColor', this._color, 0);
            this._mr.sharedMaterials = [mtl];
          }
        }
        updateMesh() {
          this._mr.mesh = utils.MeshUtils.createDynamicMesh(0, this._geometry, this._mesh, this._options);
        }
        initV() {
          const vpPool = this._pPool = new Pool(() => ({
            v3: new Vec3(),
            rp: {
              v3: new Vec3(),
              i: -1
            }
          }));
          this._tools = {
            getVPoint() {
              return vpPool.pop();
            }
          };
          this._conners = [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(v => new Conner(v[0], v[1]));
          this._mats = [90, 180, -90].map(v => math.Mat4.fromRotation(new math.Mat4(), v * anelgToArc, Vec3.UP));
          this._geometry = {
            positions: null,
            indices16: null
          };
        }
        _onRAL_VC() {
          const minHarfExtend = (this._width < this._height ? this._width : this._height) * 0.5;
          this._realRound = this._round < minHarfExtend ? this._round : minHarfExtend;
          this._outerLineWidth = this._anchor * this._lineWidth;
          const innerWidth = (1 - this._anchor) * this._lineWidth;
          this._innerLineWidth = innerWidth < minHarfExtend ? innerWidth : minHarfExtend;
        }
        _onWH_VC() {
          const orr = this._realRound;
          const oil = this._innerLineWidth;
          const ool = this._outerLineWidth;
          this._onRAL_VC();
          return this._realRound === orr && this._innerLineWidth === oil && this._outerLineWidth === ool;
        }
        _updateCount() {
          this._pPool.recyleAll();
          const step = this._hasRound ? this._roundStep : 2;
          const conners = this._conners;
          conners.forEach(v => v.setStep(step, this._tools));
          if (this._showLine) this._lines = conners.map((v, i) => {
            const fl = v.faces[v.faces.length - 1].ps;
            const ff = conners[(i + 1) % conners.length].faces[0].ps;
            return {
              ps: [fl[2], fl[3], ff[0], ff[1]]
            };
          });
          this._geometry.positions = new Float32Array(this._pPool.using.length * 3);
          // this.geometry.normals = new Float32Array(this.vpPool.using.reduce(rsl => (rsl.push(0, 1, 0), rsl), [] as number[]));
          this._geometry.indices16 = new Uint16Array(4 * (step + +this._showLine) * 2 * 3);
        }
        _updateSharp() {
          const c0 = this._conners[0];
          if (this._hasRound) c0.setRAL(this._realRound, this._innerLineWidth, this._outerLineWidth, !this._showLine);else c0.setAL(this._realRound, this._innerLineWidth, this._outerLineWidth, !this._showLine);
          this._mats.forEach((v, i) => this._conners[i + 1].matWith(c0, v));
        }
        _updatePos() {
          const w = this._width * 0.5 - this._realRound;
          const h = this._height * 0.5 - this._realRound;
          this._conners.forEach(v => v.setPos(w, h));
        }
        _updateGmy() {
          this._updateGmyPoss();
          let i = 0;
          const idxs = this._geometry.indices16;
          this._conners.forEach(v => v.faces.forEach(v => i = this._drawFace4Idx(idxs, i, v)));
          if (this._showLine) this._lines.forEach(v => i = this._drawFace4Idx(idxs, i, v));
        }
        _updateGmyPoss() {
          const y = this._y;
          const poss = this._geometry.positions;
          this._pPool.using.forEach(this._isUI ? (v, i) => {
            v.rp.i = i;
            const v3 = v.rp.v3;
            poss[i * 3 + 0] = v3.x;
            poss[i * 3 + 1] = -v3.z;
            poss[i * 3 + 2] = 0;
          } : (v, i) => {
            v.rp.i = i;
            const v3 = v.rp.v3;
            poss[i * 3 + 0] = v3.x;
            poss[i * 3 + 1] = y;
            poss[i * 3 + 2] = v3.z;
          });
        }
        _drawFace4Idx(idxs, i, face) {
          const ps = face.ps;
          idxs[i++] = ps[0].rp.i;
          idxs[i++] = ps[1].rp.i;
          idxs[i++] = ps[3].rp.i;
          idxs[i++] = ps[0].rp.i;
          idxs[i++] = ps[3].rp.i;
          idxs[i++] = ps[2].rp.i;
          return i;
        }

        //#endregion [virtual]

        //#region [test]

        // private drawTestQuad_poss_idx() {
        //     this._geometry.positions = new Float32Array([
        //         -1, 0, -1,
        //         -1, 0, 1,
        //         1, 0, -1,
        //         1, 0, 1,
        //     ]);
        //     this._geometry.indices16 = new Uint16Array([
        //         0, 1, 3,
        //         0, 3, 2,
        //     ]);
        //     console.log(this._geometry.positions);
        //     this.updateMesh();
        // }
        // private drawTestQuad_poss() {
        //     const ps = [
        //         [-1, 0, -1,],
        //         [-1, 0, 1,],
        //         [1, 0, -1,],
        //         [1, 0, 1,],
        //     ]
        //     this._geometry.positions = new Float32Array([
        //         ...ps[0],
        //         ...ps[1],
        //         ...ps[3],

        //         ...ps[0],
        //         ...ps[3],
        //         ...ps[2],

        //     ]);
        //     console.log(this._geometry.positions);
        //     this.updateMesh();
        // }

        //#endregion [test]
      }, _class3.uipreset = {
        isUI: true,
        anchor: 0,
        round: 20,
        lineWidth: 10
      }, _class3._showEditor = false, _class3), (_applyDecoratedDescriptor(_class2.prototype, "draw", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "draw"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "triCount", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "triCount"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "showEditor", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "showEditor"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_isUI", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "isUI", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "isUI"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return Color.WHITE.clone();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "color", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "color"), _class2.prototype), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_showLine", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "showLine", [_dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "showLine"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_hasRound", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "hasRound", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "hasRound"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_roundStep", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "roundStep", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "roundStep"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_realRound", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "_round", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "round", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "round"), _class2.prototype), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "_outerLineWidth", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "_innerLineWidth", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "_lineWidth", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "lineWidth", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "lineWidth"), _class2.prototype), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "_anchor", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "anchor", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "anchor"), _class2.prototype), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_width", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "width", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "width"), _class2.prototype), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_height", [_dec28], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "height", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "height"), _class2.prototype), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_y", [_dec30], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "y", [_dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "y"), _class2.prototype)), _class2)) || _class) || _class));

      //#region [Tools]
      const DirtyType = {
        none: 0,
        count: 1,
        sharp: 2,
        wh: 4,
        gmy: 8,
        gmyPos: 16,
        mesh: 32
      };
      const anelgToArc = Math.PI / 180;
      class Conner {
        constructor(ofsX, ofsZ) {
          this.faces = [];
          this.ofsX = ofsX;
          this.ofsZ = ofsZ;
        }
        setStep(step, tools) {
          this.faces.length = step;
          let pO = tools.getVPoint();
          let pI = tools.getVPoint();
          for (let i = 0; i < step; i++) {
            let opO = pO;
            let opI = pI;
            pO = tools.getVPoint();
            pI = tools.getVPoint();
            this.faces[i] = {
              ps: [opO, opI, pO, pI]
            };
          }
        }
        setAL(radis, lineI, lineO, isClame) {
          const vIp = isClame && radis - lineI < 0 ? 0 : radis - lineI;
          const vOp = isClame && radis - lineI < 0 ? 0 : radis + lineO;
          this.faces[0].ps[0].v3.z = this.faces[1].ps[2].v3.x = vIp;
          this.faces[0].ps[1].v3.z = this.faces[1].ps[3].v3.x = vOp;
          const pI = this.faces[0].ps[2].v3;
          const pO = this.faces[0].ps[3].v3;
          pI.x = pI.z = vIp;
          pO.x = pO.z = vOp;
        }
        setRAL(radis, lineI, lineO, isClame) {
          const preArc = 1 / this.faces.length * 90 * anelgToArc;
          const f0pI = this.faces[0].ps[0].v3;
          const f0pO = this.faces[0].ps[1].v3;
          f0pI.x = f0pO.x = 0;
          const vIp = isClame && radis - lineI < 0 ? 0 : radis - lineI;
          const vOp = isClame && radis + lineO < 0 ? 0 : radis + lineO;
          const vI = f0pI.z = vIp; // > 0 ? vIp : 0;
          const vO = f0pO.z = vOp; // > 0 ? vOp : 0;
          this.faces.forEach((v, i) => {
            const arc = (i + 1) * preArc;
            const sin = Math.sin(arc);
            const cos = Math.cos(arc);
            const pI = v.ps[2];
            const pO = v.ps[3];
            pI.v3.x = sin * vI;
            pI.v3.z = cos * vI;
            pO.v3.x = sin * vO;
            pO.v3.z = cos * vO;
          });
        }
        matWith(other, mat) {
          this._matPoint(other.faces[0].ps[0], this.faces[0].ps[0], mat);
          this._matPoint(other.faces[0].ps[1], this.faces[0].ps[1], mat);
          this.faces.forEach((v, i) => {
            this._matPoint(other.faces[i].ps[2], v.ps[2], mat);
            this._matPoint(other.faces[i].ps[3], v.ps[3], mat);
          });
        }
        _matPoint(f, t, mat) {
          t.v3.set(f.v3).transformMat4(mat);
        }
        setPos(x, z) {
          x *= this.ofsX;
          z *= this.ofsZ;
          this.updateP(this.faces[0].ps[0], x, z);
          this.updateP(this.faces[0].ps[1], x, z);
          this.faces.forEach(v => {
            this.updateP(v.ps[2], x, z);
            this.updateP(v.ps[3], x, z);
          });
        }
        updateP(v, x, z) {
          const s = v.v3;
          const t = v.rp.v3;
          t.x = s.x + x;
          t.z = s.z + z;
        }
      }
      class Pool {
        constructor(ctor) {
          this.cached = [];
          this.using = [];
          this.ctor = ctor;
        }
        pop() {
          const t = this.cached.length > 0 ? this.cached.pop() : this.ctor();
          this.using.push(t);
          return t;
        }
        push(t) {
          this.cached.push(t);
          const i = this.using.indexOf(t);
          if (i !== -1) this.using.splice(i, 1);
        }
        recyleAll() {
          this.cached.push(...this.using);
          this.using.length = 0;
        }
      }

      //#endregion [Tools]
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RubiksCube.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './ballmove.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, EventTarget, Prefab, Camera, Label, _decorator, Component, Vec3, Color, input, Input, RigidBodyComponent, Quat, instantiate, MeshRenderer, PhysicsSystem, Node, tween, Global, EventSysteml;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      EventTarget = module.EventTarget;
      Prefab = module.Prefab;
      Camera = module.Camera;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Color = module.Color;
      input = module.input;
      Input = module.Input;
      RigidBodyComponent = module.RigidBodyComponent;
      Quat = module.Quat;
      instantiate = module.instantiate;
      MeshRenderer = module.MeshRenderer;
      PhysicsSystem = module.PhysicsSystem;
      Node = module.Node;
      tween = module.tween;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      EventSysteml = module.EventSysteml;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "84a22OOgkFE57BFct8ji+px", "RubiksCube", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      const EventSystem = exports('EventSystem', new EventTarget());
      let RubiksCube = exports('RubiksCube', (_dec = ccclass('RubiksCube'), _dec2 = property(Prefab), _dec3 = property(Camera), _dec4 = property([Prefab]), _dec5 = property(Label), _dec6 = property(Label), _dec(_class = (_class2 = class RubiksCube extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "cubePrefab", _descriptor, this);
          _initializerDefineProperty(this, "camera", _descriptor2, this);
          _initializerDefineProperty(this, "surfacePrefabs", _descriptor3, this);
          _initializerDefineProperty(this, "operationTimeLabel", _descriptor4, this);
          _initializerDefineProperty(this, "rotationCountLabel", _descriptor5, this);
          this.newl = '';
          // 固定的坐标值
          this.fixedCoordinate = 2.2;
          this.variableCoordinates = [-1.1, 0, 1.1];
          this.selectedLayer = [];
          this.currentAxis = 'x';
          this.currentLayerIndex = 0;
          this.isLayerSelected = false;
          this.rotationDirection = new Vec3();
          this.rotating = false;
          this.rotationRoot = null;
          this.startMousePosition = new Vec3();
          this.endMousePosition = new Vec3();
          this.selectedCube = null;
          this.originalColor = new Color();
          // 存储原始颜色
          this.clickedPlane = null;
          // 存储点击的平面
          this.extraCubes = [];
          this.rotatingCamera = false;
          this.lastMousePosition = new Vec3();
          this.rotationSpeed = 0.2;
          this.operationCount = 0;
          // To track the number of operations
          this.operationTime = 0;
          // To track the total time of operations
          this.rotationCount = 0;
          // To track the number of operations
          this.boxinwhere = 'Cube_1_2_1';
          this.forbiddenPositions = [];
          this.trueLumber = '';
        }
        onLoad() {
          // 监听移动事件
          EventSysteml.on('changeBox', this.boxchange, this);
        }
        onDestroy() {
          // 移除事件监听
          EventSysteml.off('changeBox', this.boxchange, this);
        }
        boxchange(MoveFlag) {
          console.log(MoveFlag);
          if (MoveFlag) {
            this.boxinwhere = this.newl;
            console.log(this.boxinwhere, this.newl);
          }
          this.rotating = false;
        }
        start() {
          this.createRubiksCube();
          this.placePrefabsOnSurfaces();
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }
        placePrefabsOnSurfaces() {
          const LevelConfigs = [{
            forbiddenPositions: [new Vec3(0, 2.2, 0), new Vec3(0, 2.2, 1.1), new Vec3(-2.2, 0, 0)],
            lumbermillPosition: new Vec3(-1.75, 0, 0),
            lumberPosition: 'Cube_0_1_1' // 直接赋值字符串
          }, {
            forbiddenPositions: [new Vec3(-1.1, 2.2, 0), new Vec3(1.1, 0, 2.2), new Vec3(-2.2, 1.1, 1.1), new Vec3(0, 2.2, 0)],
            lumbermillPosition: new Vec3(-1.75, 1.1, 1.1),
            lumberPosition: 'Cube_0_2_2' // 另一个关卡的值
          }, {
            forbiddenPositions: [new Vec3(0, 2.2, 0), new Vec3(0, 1.1, 2.2), new Vec3(-2.2, 0, 0)
            //new Vec3(1.1, 2.2, 0)
            ],

            lumbermillPosition: new Vec3(-1.75, 0, 0),
            lumberPosition: 'Cube_0_1_1' // 另一个关卡的值
          }, {
            forbiddenPositions: [new Vec3(0, 2.2, 0), new Vec3(0, 1.1, 2.2), new Vec3(-2.2, 1.1, 1.1)],
            lumbermillPosition: new Vec3(-1.75, 1.1, 1.1),
            lumberPosition: 'Cube_0_2_2' // 另一个关卡的值
          }, {
            forbiddenPositions: [new Vec3(-1.1, 2.2, 1.1), new Vec3(0, -1.1, 2.2), new Vec3(-2.2, 1.1, 1.1), new Vec3(0, 0, 2.2), new Vec3(-2.2, 0, 1.1)],
            lumbermillPosition: new Vec3(-1.75, 1.1, 1.1),
            lumberPosition: 'Cube_0_2_2' // 另一个关卡的值
          }];

          // 根据 Global.currentIndex 获取当前关卡配置
          const currentConfig = LevelConfigs[Global.currentLevelIndex - 10];
          // 更新禁止放置 prefab 的位置
          this.forbiddenPositions = currentConfig.forbiddenPositions;
          console.log(Global.currentLevelIndex);
          console.log(currentConfig);
          this.trueLumber = currentConfig.lumberPosition;
          if (Global.currentLevelIndex == 14) {
            const box = this.node.getChildByName('box');
            box.setPosition(new Vec3(new Vec3(-1.1, 2.2, 1.1)));
            this.boxinwhere = "Cube_0_2_2";
          }

          // 更新 lumbermill 的位置
          const lumbermillNode = this.node.getChildByName('lumbermill');
          if (lumbermillNode) {
            const rigidBody = lumbermillNode.getComponent(RigidBodyComponent);
            if (rigidBody) {
              rigidBody.type = RigidBodyComponent.Type.STATIC; // 将刚体类型设置为静态
              rigidBody.useGravity = false; // 禁用重力
            }

            lumbermillNode.setPosition(currentConfig.lumbermillPosition);
            console.log(`lumbermill 位置已更新为: ${currentConfig.lumbermillPosition}`);
          }

          // 遍历六个面，并在每个面上放置预制体
          // 面1：y = 2.2，变化的是 x 和 z
          this.placePrefabsOnFace('y', this.fixedCoordinate);

          // 面2：y = -2.2，变化的是 x 和 z，旋转180度
          this.placePrefabsOnFace('y', -this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), Math.PI));

          // 面3：x = 2.2，变化的是 y 和 z，绕z轴旋转-90度
          this.placePrefabsOnFace('x', this.fixedCoordinate, Quat.rotateZ(new Quat(), new Quat(), -Math.PI / 2));

          // 面4：x = -2.2，变化的是 y 和 z，绕z轴旋转90度
          this.placePrefabsOnFace('x', -this.fixedCoordinate, Quat.rotateZ(new Quat(), new Quat(), Math.PI / 2));

          // 面5：z = 2.2，变化的是 x 和 y，绕x轴旋转90度
          this.placePrefabsOnFace('z', this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), Math.PI / 2));

          // 面6：z = -2.2，变化的是 x 和 y，绕x轴旋转-90度
          this.placePrefabsOnFace('z', -this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), -Math.PI / 2));
        }
        placePrefabsOnFace(fixedAxis, fixedValue, rotation = new Quat()) {
          for (let v1 of this.variableCoordinates) {
            for (let v2 of this.variableCoordinates) {
              let position = new Vec3();
              switch (fixedAxis) {
                case 'x':
                  position.set(fixedValue, v1, v2);
                  break;
                case 'y':
                  position.set(v1, fixedValue, v2);
                  break;
                case 'z':
                  position.set(v1, v2, fixedValue);
                  break;
              }

              // 检查是否为不需要放置预制体的位置
              if (this.shouldInstantiatePrefab(position)) {
                this.instantiatePrefab(position, rotation);
              }
            }
          }
        }
        instantiatePrefab(position, rotation) {
          const randomIndex = Math.floor(Math.random() * this.surfacePrefabs.length);
          const selectedPrefab = this.surfacePrefabs[randomIndex];
          const prefabInstance = instantiate(selectedPrefab);
          prefabInstance.setParent(this.node);
          prefabInstance.setPosition(position);
          prefabInstance.setRotation(rotation);
          this.extraCubes.push(prefabInstance);
        }
        /*
        shouldInstantiatePrefab(position: Vec3): boolean {
            // 检查特定坐标是否匹配
            const forbiddenPositions = [
                new Vec3(0, 2.2, 0),
                new Vec3(0, 2.2, 1.1),
                new Vec3(-2.2, 0, 0)
            ];
        
            // 如果位置在禁止列表中，返回 false，否则返回 true
            return !forbiddenPositions.some(p => p.equals(position));
        }
            */

        shouldInstantiatePrefab(position) {
          // 检查当前关卡的禁止位置
          return !this.forbiddenPositions.some(p => p.equals(position));
        }
        createRubiksCube() {
          const size = 3;
          const spacing = 1.2;
          this.extraCubes = []; // 初始化存储额外立方体的数组

          for (let x = 0; x < size; x++) {
            for (let y = 0; y < size; y++) {
              for (let z = 0; z < size; z++) {
                const cube = instantiate(this.cubePrefab);
                cube.setParent(this.node);
                cube.setPosition(new Vec3((x - 1) * spacing, (y - 1) * spacing, (z - 1) * spacing));
                cube.name = `Cube_${x}_${y}_${z}`;

                // 设置立方体的颜色为#175A37
                const renderer = cube.getComponent(MeshRenderer);
                if (renderer) {
                  renderer.material.setProperty('albedo', new Color(0x17, 0x5A, 0x37, 255));
                }
              }
            }
          }
          /*
          // Helper function to get a random element from an array
          const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
                // Function to generate a new cube on a random face of a given cube
          const generateCubeOnFace = (baseCube) => {
              const faces = [];
              const position = baseCube.getPosition();
                    // Add faces based on the cube's position
              if (position.x === -(size - 1) * spacing / 2) faces.push(new Vec3(-spacing, 0, 0)); // Left
              if (position.x === (size - 1) * spacing / 2) faces.push(new Vec3(spacing, 0, 0));  // Right
              if (position.y === -(size - 1) * spacing / 2) faces.push(new Vec3(0, -spacing, 0)); // Bottom
              if (position.y === (size - 1) * spacing / 2) faces.push(new Vec3(0, spacing, 0));  // Top
              if (position.z === -(size - 1) * spacing / 2) faces.push(new Vec3(0, 0, -spacing)); // Back
              if (position.z === (size - 1) * spacing / 2) faces.push(new Vec3(0, 0, spacing));  // Front
                    const randomFaceOffset = getRandomElement(faces);
              const newCube = instantiate(this.cubePrefab);
              newCube.setParent(this.node);
              const baseCubePosition = baseCube.getPosition();
              newCube.setPosition(baseCubePosition.add(randomFaceOffset));
              newCube.name = `ExtraCube_${baseCubePosition.x}_${baseCubePosition.y}_${baseCubePosition.z}`;
              this.extraCubes.push(newCube); // 将新立方体添加到 extraCubes 数组中
              
              // 给其中一个新生成的立方体添加翻转脚本
              if (flag == 0) {
                  flag = 1;
                  newCube.addComponent(FlipCubeOnSurface);
              }
          };
          */

          // Select two random edge cubes and generate new cubes on random faces
          //const randomEdgeCubes = [getRandomElement(edgeCubes), getRandomElement(edgeCubes)];
          //randomEdgeCubes.forEach(generateCubeOnFace);
        }

        onTouchStart(event) {
          if (this.rotating) return;
          const screenPosition = event.getLocation();
          this.startMousePosition.set(screenPosition.x, screenPosition.y, 0);
          const ray = this.camera.screenPointToRay(screenPosition.x, screenPosition.y);
          const result = this.raycast(ray);
          if (result && result.collider) {
            const detectedNode = result.collider.node;
            console.log(`检测到的节点: ${detectedNode.name}`);
            const positionl = detectedNode.getPosition();
            console.log(positionl);
            if (detectedNode.name === 'lumbermill') {
              // 特殊处理 lumbermill 节点
              this.selectedCube = this.node.getChildByName(this.trueLumber);
              const position = detectedNode.getPosition();
              const epsilon = 0.01; // 容差值

              // 判断 clickedPlane
              if (Math.abs(position.x - -1.75) < epsilon) {
                this.clickedPlane = 'YOZ';
              } else if (Math.abs(position.z - 1.75) < epsilon) {
                this.clickedPlane = 'XOY';
                console.log('yes');
              } else {
                this.clickedPlane = 'XOZ';
              }
              this.isLayerSelected = true;
            } else if (!detectedNode.name.startsWith("Cube")) {
              // 如果节点名称不是以 "Cube" 开头
              console.log("检测到的物体不是 Cube，忽略操作");
              return;
            } else {
              // 处理其他以 "Cube" 开头的节点
              this.selectedCube = detectedNode;

              // 修改颜色
              const renderer = this.selectedCube.getComponent(MeshRenderer);
              if (renderer) {
                renderer.material.setProperty('color', new Color(255, 0, 0, 255)); // 设置为红色
              }

              // 通过碰撞法线判断 clickedPlane
              const normal = result.hitNormal;
              if (Math.abs(normal.x) > Math.abs(normal.y) && Math.abs(normal.x) > Math.abs(normal.z)) {
                this.clickedPlane = 'YOZ';
              } else if (Math.abs(normal.y) > Math.abs(normal.x) && Math.abs(normal.y) > Math.abs(normal.z)) {
                this.clickedPlane = 'XOZ';
              } else {
                this.clickedPlane = 'XOY';
              }
              this.isLayerSelected = true;
              console.log(`Clicked Cube: ${this.selectedCube.name}, Plane: ${this.clickedPlane}`);
            }
          } else {
            console.log("没有检测到物体");
          }
        }
        onTouchMove(event) {
          if (!this.isLayerSelected || this.rotating) return;
          const screenPosition = event.getLocation();
          this.endMousePosition.set(screenPosition.x, screenPosition.y, 0);
        }
        onTouchEnd(event) {
          if (!this.isLayerSelected || this.rotating) return;
          const screenPosition = event.getLocation();
          this.endMousePosition.set(screenPosition.x, screenPosition.y, 0);
          const deltaX = this.endMousePosition.x - this.startMousePosition.x;
          const deltaY = this.endMousePosition.y - this.startMousePosition.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          const rotationThreshold = 50; // 滑动距离阈值，单位为像素

          if (distance < rotationThreshold) {
            // 触发点击操作
            this.handleClick();
          } else {
            // 执行滑动操作
            this.handleSwipe(deltaX, deltaY);
          }
          this.isLayerSelected = false;
          this.clickedPlane = null;
        }
        handleClick() {
          if (!this.selectedCube) return;
          console.log('nnnnnn');
          const ballCube = this.node.getChildByName(this.boxinwhere); // 获取当前盒子所在的立方体节点
          const tempClickedCube = this.selectedCube;
          this.newl = this.selectedCube.name;
          if (tempClickedCube && ballCube) {
            this.rotating = true; // 锁定输入
            const relation = this.getRelativePosition(ballCube, tempClickedCube);
            console.log(relation);
            if (relation != null) {
              // 触发事件，通知移动逻辑
              console.log(this.clickedPlane);
              EventSystem.emit('moveBall', {
                relation: relation,
                plane: this.clickedPlane
              });
              console.log(`点击关系: ${relation}`);
            } else {
              console.log('no');
              this.rotating = false;
            }
          } else {
            console.log('无法识别立方体位置');
          }
        }
        handleSwipe(deltaX, deltaY) {
          if (!this.selectedCube) return;
          if (this.clickedPlane === 'XOY') {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              this.currentAxis = 'y';
              this.rotationDirection.set(0, deltaX > 0 ? -1 : 1, 0); // 左右滑动
            } else {
              this.currentAxis = 'x';
              this.rotationDirection.set(deltaY > 0 ? 1 : -1, 0, 0); // 上下滑动
            }
          } else if (this.clickedPlane === 'XOZ') {
            if (deltaX * deltaY > 0) {
              this.currentAxis = 'z';
              this.rotationDirection.set(0, 0, deltaX > 0 ? 1 : -1); // 左上或右下
            } else {
              this.currentAxis = 'x';
              this.rotationDirection.set(deltaY > 0 ? 1 : -1, 0, 0); // 左下或右上
            }
          } else if (this.clickedPlane === 'YOZ') {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              this.currentAxis = 'y';
              this.rotationDirection.set(0, deltaX > 0 ? -1 : 1, 0); // 左右滑动
            } else {
              this.currentAxis = 'z';
              this.rotationDirection.set(0, 0, deltaY > 0 ? 1 : -1); // 上下滑动
            }
          }

          this.selectLayer(this.selectedCube, this.currentAxis);
          this.rotateLayer();
        }

        // 判断两个立方体之间的位置关系
        getRelativePosition(cube1, cube2) {
          const pos1 = cube1.getPosition();
          const pos2 = cube2.getPosition();
          console.log(pos1, pos2);

          // 计算位置差异
          const deltaX = Math.round((pos2.x - pos1.x) / 1.1); // 假设立方体间距为1.1
          const deltaY = Math.round((pos2.y - pos1.y) / 1.1);
          const deltaZ = Math.round((pos2.z - pos1.z) / 1.1);
          console.log(deltaX, deltaY, deltaZ);

          // 判断相对位置
          if (deltaX === 1 && deltaY === 0 && deltaZ === 0) return 'right';
          if (deltaX === -1 && deltaY === 0 && deltaZ === 0) return 'left';
          if (deltaX === 0 && deltaY === 1 && deltaZ === 0) return 'up';
          if (deltaX === 0 && deltaY === -1 && deltaZ === 0) return 'down';
          if (deltaX === 0 && deltaY === 0 && deltaZ === 1) return 'forward';
          if (deltaX === 0 && deltaY === 0 && deltaZ === -1) return 'backward';
          return null; // 不相邻或无法判断
        }

        raycast(ray) {
          if (PhysicsSystem.instance.raycastClosest(ray)) {
            return PhysicsSystem.instance.raycastClosestResult;
          }
          return null;
        }
        selectLayer(cube, axis) {
          const position = cube.position;
          this.currentAxis = axis;
          this.currentLayerIndex = Math.round(position[this.currentAxis]);

          // 选择当前层的立方体
          this.selectedLayer = this.node.children.filter(child => Math.round(child.position[this.currentAxis]) === this.currentLayerIndex);

          // 获取并添加名为 lumbermill 的节点到 extraCubes
          const lumbermillNode = this.node.getChildByName('lumbermill');
          const boxNode = this.node.getChildByName('box');
          this.extraCubes.push(lumbermillNode);
          this.extraCubes.push(boxNode);
          const contactThreshold = 1.08; // 定义接触阈值
          const extraCubesToAdd = []; // 临时存储需要添加的额外立方体

          // 检查额外立方体是否与当前选择的层接触
          this.extraCubes.forEach(extraCube => {
            const extraPos = extraCube.getPosition();
            const isTouching = this.selectedLayer.some(selectedCube => {
              const selectedPos = selectedCube.getPosition();
              return Vec3.distance(extraPos, selectedPos) < contactThreshold;
            });
            if (isTouching) {
              extraCubesToAdd.push(extraCube);
            }
          });

          // 添加额外立方体到 selectedLayer 中
          extraCubesToAdd.forEach(extraCube => {
            this.selectedLayer.push(extraCube);
          });

          // 创建旋转根节点，并将 selectedLayer 中的立方体添加为子节点
          this.rotationRoot = new Node();
          this.rotationRoot.setParent(this.node);
          this.selectedLayer.forEach(cube => {
            cube.setParent(this.rotationRoot);
          });
        }
        clearLayerSelection() {
          this.selectedLayer.forEach(cube => {
            cube.setParent(this.node);
          });
          if (this.rotationRoot) {
            this.rotationRoot.destroy();
            this.rotationRoot = null;
          }
          this.selectedLayer = [];
        }
        rotateLayer() {
          this.rotationCount += 1;
          this.rotating = true;
          const rotation = new Quat();
          const axis = new Vec3();
          if (this.currentAxis === 'x') {
            axis.set(1, 0, 0);
            Quat.fromAxisAngle(rotation, axis, Math.PI / 2 * (this.rotationDirection.equals(new Vec3(1, 0, 0)) ? -1 : 1));
          } else if (this.currentAxis === 'y') {
            axis.set(0, 1, 0);
            Quat.fromAxisAngle(rotation, axis, Math.PI / 2 * (this.rotationDirection.equals(new Vec3(0, 1, 0)) ? -1 : 1));
          } else if (this.currentAxis === 'z') {
            axis.set(0, 0, 1);
            Quat.fromAxisAngle(rotation, axis, Math.PI / 2 * (this.rotationDirection.equals(new Vec3(0, 0, 1)) ? -1 : 1));
          }
          const duration = 0.5;
          tween(this.rotationRoot).to(duration, {
            rotation: rotation
          }).call(() => {
            this.rotating = false;
            this.selectedLayer.forEach(cube => {
              // 保留世界变换矩阵
              const worldPosition = new Vec3();
              const worldRotation = new Quat();
              cube.getWorldPosition(worldPosition);
              cube.getWorldRotation(worldRotation);
              cube.setParent(this.node, false);
              cube.setWorldPosition(worldPosition);
              cube.setWorldRotation(worldRotation);
            });
            this.rotationRoot.destroy();
            this.rotationRoot = null;
            this.isLayerSelected = false;

            // 在旋转完成后更新球体的位置
            this.updateBallPositionAfterRotation();
            console.log('HI');
          }).start();
        }
        updateBallPositionAfterRotation() {
          // 获取球体节点，确保它的名字是 "Ball"
          const ballNode = this.node.getChildByName('Ball');
          if (ballNode) {
            // 获取球体的世界位置
            const worldPosition = ballNode.getWorldPosition();

            // 将世界位置转换为魔方的局部坐标
            const newLocalPosition = new Vec3();
            this.node.inverseTransformPoint(newLocalPosition, worldPosition);

            // 更新球体的位置
            ballNode.setPosition(newLocalPosition);
            console.log(ballNode.position);
          } else {
            console.log('Ball node not found');
          }
        }
        update(deltaTime) {
          this.operationTime += deltaTime;
          this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
          this.rotationCountLabel.string = `旋转次数: ${this.rotationCount}`;
          //this.operationCountLabel.string = `移动次数: ${this.operationCount}s`;
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "surfacePrefabs", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "operationTimeLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rotationCountLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Sample_Cursor2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RoundRect2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Vec2, geometry, Node, _decorator, Component, Vec3, tween, easing, instantiate, Quat, RoundRect;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      geometry = module.geometry;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      tween = module.tween;
      easing = module.easing;
      instantiate = module.instantiate;
      Quat = module.Quat;
    }, function (module) {
      RoundRect = module.RoundRect;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "f4bc0hKbkdE7I3fFb6dtsuu", "Sample_Cursor", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      const _v2 = new Vec2();
      const _ray = new geometry.Ray();

      /** [示例] 点选框
       * * 在屏幕上点击3D物体, 就会出现点选框
       * * 一共演示了2种风格的点选框
       */
      let Sample_Cursor = exports('Sample_Cursor', (_dec = ccclass('RoundRect.Sample_Cursor'), _dec2 = property(RoundRect), _dec3 = property(RoundRect), _dec4 = property(Node), _dec(_class = (_class2 = class Sample_Cursor extends Component {
        constructor(...args) {
          super(...args);
          //#region [touch]
          //@property(Camera) public rayCamera: Camera = null;
          //@property(Node) public touchTarget: Node = null;
          /*
          private _listenTouch(isOn: boolean) {
              const target = this.touchTarget;
              const fn = isOn ? target.on : target.off;
              fn.call(target, Node.EventType.TOUCH_START, this._onTS, this);
              fn.call(target, Node.EventType.TOUCH_END, this._onTE, this);
              fn.call(target, Node.EventType.TOUCH_CANCEL, this._onTE, this);
              fn.call(target, Node.EventType.TOUCH_MOVE, this._onTM, this);
          }
            private _onTS(e: EventTouch) { this._onTouch('ts', e); }
          private _onTE(e: EventTouch) { this._onTouch('te', e); }
          private _onTM(e: EventTouch) { this._onTouch('tm', e); }
          
            private _e2hit(e: EventTouch) {
              // 检查 rayCamera 是否已经被正确赋值
              if (!this.rayCamera) {
                  console.warn("rayCamera is not assigned.");
                  return null;
              }
          
              const v2 = e.getLocation(_v2);
              
              // 将屏幕坐标转换为世界坐标的射线
              const ray = this.rayCamera.screenPointToRay(v2.x, v2.y, _ray);
          
              // 使用 PhysicsSystem 的 raycastClosest 进行检测
              if (PhysicsSystem.instance.raycastClosest(ray)) {
                  const result = PhysicsSystem.instance.raycastClosestResult;
                  if (result && result.collider) {
                      console.log("Hit object:", result.collider.node.name);
                      return result; // 返回检测结果
                  }
              }
              return null;
          }
              */
          //#endregion [touch]
          //#region [RoundRect]
          _initializerDefineProperty(this, "rectSelect", _descriptor, this);
          _initializerDefineProperty(this, "rectTarget", _descriptor2, this);
          _initializerDefineProperty(this, "roleRoot", _descriptor3, this);
          this._cursorSelect = void 0;
          this._cursorTarget = void 0;
        }
        onLoad() {
          window['sample'] = this;
          this._cursorSelect = new CursorSelect(this.rectSelect);
          this._cursorTarget = new CursorTarget(this.rectTarget);
          //this.roleRoot.children.forEach(this._randomMove);
          //this._listenTouch(true);
        }

        /*
        private _onTouch(type: string, e: EventTouch) {
            const rsl = this._e2hit(e);
            if (!rsl) {
                this._cursorSelect.hide();
                this._cursorTarget.hide();
                return;
            }
              switch (type) {
                case 'ts': break;
                case 'tm': break;
                case 'te':
                    const root = rsl.collider.node.parent;
                    const isTarget = root.name.includes('Enemy');
                    (isTarget ? this._cursorTarget : this._cursorSelect).showWith(root);
                    break;
            }
        }
            */ //#endregion [RoundRect]
        _randomMove(node) {
          const dur = Math.random() * 0.5 + 0.5;
          const arc = Math.random() * 2 * Math.PI;
          const p1 = new Vec3(Math.sin(arc), 0, Math.cos(arc));
          const p2 = p1.clone().multiplyScalar(-1);
          [p1, p2, p2, p1].reduce((rsl, v) => rsl.by(dur, {
            position: v
          }), tween(node)).union().repeatForever().start();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rectSelect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rectTarget", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "roleRoot", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      class CursorTarget {
        constructor(rect) {
          this.node = void 0;
          this.lineWidth = void 0;
          this.dur = 0.5;
          this._ppt1 = {
            anchor: 0
          };
          this._ppt2 = {
            anchor: 1
          };
          this._tw = void 0;
          this.rect = rect;
          this.node = rect.node;
          this.lineWidth = rect.lineWidth;
          this.node.active = false;
        }
        showWith(root) {
          this.node.active = true;
          this.node.parent = root;
          this.node.position = Vec3.ZERO;
          this.rect.lineWidth = this.lineWidth * 4;
          tween(this.rect).to(this.dur, {
            lineWidth: this.lineWidth
          }, {
            easing: easing.backOut
          }).start();
          this.rect.anchor = 1;
          this._tw?.stop();
          this._tw = tween(this.rect).to(this.dur, this._ppt1, {
            easing: easing.sineInOut
          }).to(this.dur, this._ppt2, {
            easing: easing.sineInOut
          }).union().repeatForever().start();
        }
        hide() {
          this.node.active = false;
          this._tw?.stop();
          this._tw = null;
        }
      }
      class CursorSelect {
        constructor(rect) {
          this.node = void 0;
          this.lineWidth = void 0;
          this.dur = 0.5;
          this._pptMove1 = {
            position: Vec3.UP.clone().multiplyScalar(0.1)
          };
          this._pptMove2 = {
            position: Vec3.ZERO
          };
          this._pptRot = {
            eulerAngles: Vec3.UP.clone().multiplyScalar(360)
          };
          this._tw1 = void 0;
          this._tw2 = void 0;
          this.rect = rect;
          this.node = rect.node;
          this.lineWidth = rect.lineWidth;
          this.node.active = false;
        }
        showWith(root) {
          // 克隆一个新的节点
          const clonedNode = instantiate(this.node);

          // 激活并设置克隆节点的属性
          clonedNode.active = true;
          clonedNode.parent = root; // 挂载到传入的 root 节点上
          clonedNode.position = Vec3.ZERO;
          clonedNode.rotation = Quat.IDENTITY;

          // 设置克隆节点的 lineWidth 属性
          const clonedRect = clonedNode.getComponent(RoundRect);
          if (clonedRect) {
            clonedRect.lineWidth = this.lineWidth * 4;

            // 创建一个线宽动画
            tween(clonedRect).to(this.dur, {
              lineWidth: this.lineWidth
            }, {
              easing: easing.backOut
            }).start();
          }

          // 停止并重新启动移动动画
          const moveTween = tween(clonedNode).to(this.dur, this._pptMove1, {
            easing: easing.sineInOut
          }).to(this.dur, this._pptMove2, {
            easing: easing.sineInOut
          }).union().repeatForever().start();

          // 停止并重新启动旋转动画
          const rotateTween = tween(clonedNode).by(this.dur * 4, this._pptRot).repeatForever().start();

          // 将克隆的节点存储或返回，方便后续管理
          return clonedNode;
        }
        hide() {
          this.node.active = false;
          this._tw1?.stop();
          this._tw2?.stop();
          this._tw1 = null;
          this._tw2 = null;
        }
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopBox.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioMgr.ts', './TopLoad.ts', './Global2.ts', './SingleInfo.ts', './TweenTools.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, _decorator, Component, instantiate, director, AudioMgr, TopLoad, AssetList, SingleInfo, TweenTool;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      director = module.director;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      TopLoad = module.TopLoad;
    }, function (module) {
      AssetList = module.AssetList;
    }, function (module) {
      SingleInfo = module.SingleInfo;
    }, function (module) {
      TweenTool = module.TweenTool;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "56f5fp3sXhO/6NLiIqZ1cer", "ShopBox", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let ShopBox = exports('ShopBox', (_dec = ccclass('ShopBox'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class ShopBox extends Component {
        constructor(...args) {
          super(...args);
          //单个猫咪信息预设体
          _initializerDefineProperty(this, "SingleInfo", _descriptor, this);
          //
          _initializerDefineProperty(this, "MainLoad", _descriptor2, this);
          //
          _initializerDefineProperty(this, "Box", _descriptor3, this);
          //回调函数
          this.Cb = void 0;
        }
        start() {
          TweenTool.Pop(this.Box);
          for (let i = 0; i < 20; i++) {
            let si = instantiate(this.SingleInfo);
            this.MainLoad.addChild(si);
            si.setPosition(0, 0, 0);
            si.getComponent(SingleInfo).UpdateStyle(i);
          }
        }

        /**
         * 点击关闭
         */
        CloseClick() {
          AudioMgr.instance.PlayButton();
          TopLoad.instance.HidePop(AssetList.Pop.ShopBox);
          this.Cb && this.Cb();
          this.checkAllCameras();
        }
        checkAllCameras() {
          // 获取当前场景中的根节点
          const scene = director.getScene();
          scene.children.forEach(rootNode => {
            console.log(rootNode.name);
            if (rootNode.name === 'MainCamera') {
              rootNode.active = true;
            }
          });
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "SingleInfo", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "MainLoad", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "Box", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SingleInfo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioMgr.ts', './LocalMgr.ts', './Global2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, _decorator, Component, director, AudioMgr, LocalMgr, Global;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
    }, function (module) {
      AudioMgr = module.AudioMgr;
    }, function (module) {
      LocalMgr = module.LocalMgr;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "78216u/Qh1B96tNA5WMPDau", "SingleInfo", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let SingleInfo = exports('SingleInfo', (_dec = ccclass('SingleInfo'), _dec2 = property(Label), _dec(_class = (_class2 = class SingleInfo extends Component {
        constructor(...args) {
          super(...args);
          //当前索引
          this.NowIndex = 0;
          //猫咪
          //@property(Sprite)
          //private Cat: Sprite;
          //金币数
          _initializerDefineProperty(this, "Coin", _descriptor, this);
        }
        /**
         * 更新样式
         */
        UpdateStyle(_index) {
          this.NowIndex = _index;

          //this.Cat.spriteFrame = ResMgr.instance.SpriteFrames["cathead" + this.NowIndex.toString()];
          this.Coin.string = LocalMgr.instance.LocalInfo.catinfo["cat" + this.NowIndex.toString()];
        }

        /**
         * 使用猫咪
         */
        CatClick() {
          AudioMgr.instance.PlayButton();

          // 设置当前关卡索引
          Global.currentLevelIndex = this.NowIndex;

          // 根据 NowIndex 的值判断要进入的场景
          if (this.NowIndex >= 0 && this.NowIndex <= 4) {
            director.loadScene("flip");
          } else if (this.NowIndex >= 5 && this.NowIndex <= 9) {
            director.loadScene("adjust");
          } else if (this.NowIndex >= 10 && this.NowIndex <= 14) {
            director.loadScene("second");
          } else if (this.NowIndex >= 15 && this.NowIndex <= 19) {
            director.loadScene("choose");
          } else {
            console.error("Invalid NowIndex value:", this.NowIndex);
          }
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "Coin", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Step.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ResMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Animation, Sprite, UIOpacity, Vec3, ResMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Animation = module.Animation;
      Sprite = module.Sprite;
      UIOpacity = module.UIOpacity;
      Vec3 = module.Vec3;
    }, function (module) {
      ResMgr = module.ResMgr;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "2d2b3SZG6FDQ6L4hRTT84lj", "Step", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let Step = exports('Step', (_dec = ccclass('Step'), _dec2 = property(Node), _dec(_class = (_class2 = class Step extends Component {
        constructor(...args) {
          super(...args);
          //我的宽高
          this.MyWidth = 166;
          this.MyHeight = 30;
          //移动速度
          this.Vx = 0;
          this.MoveSpeed = 0;
          //道具
          _initializerDefineProperty(this, "Prop", _descriptor, this);
          //道具名称
          this.PropType = "";
          //是否消失
          this.IsDisappear = false;
          //消失时间
          this.DisappearTime = 0;
          //道具得宽高
          this.PropWidth = 56;
          this.PropHeight = 56;
        }
        /**
         * 播放动画
         */
        PlayAnimation() {
          this.node.getChildByName("Step").getComponent(Animation).play();
        }

        /**
         * 更新样式
         * @param 是否移动
         * @param 是否消失
         */
        UpdateStyle(_ismove, _isdisappear, _prop) {
          this.MoveSpeed = 0;
          this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step0"];
          this.IsDisappear = false;
          this.node.getComponent(Animation).stop();
          this.node.getComponent(UIOpacity).opacity = 255;
          this.Prop.active = false;
          if (_ismove) {
            //移动台阶
            let ran_num = Math.random();
            if (ran_num < 0.2) {
              this.MoveSpeed = -3;
              this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step1"];
            } else if (ran_num > 0.7) {
              this.MoveSpeed = 3;
              this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step1"];
            }
          }
          if (_isdisappear) {
            //消失台阶
            this.node.getChildByName("Step").getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames["step2"];
            this.IsDisappear = true;
            this.DisappearTime = 3 * 60;
            this.node.getComponent(Animation).play();
          }
          if (_prop) {
            this.Prop.active = true;
            this.PropType = _prop;
            this.Prop.getComponent(Sprite).spriteFrame = ResMgr.instance.SpriteFrames[this.PropType];
          }
          this.Vx = this.MoveSpeed;
        }

        /**
         * 更新位置
         */
        UpdatePosition() {
          if (this.Vx == 0 || !this.node.active) return;
          let new_pos = this.node.getPosition();
          let now_pos = new_pos.add(new Vec3(this.Vx, 0, 0));
          if (now_pos.x < -(375 - this.MyWidth / 2) || now_pos.x > 375 - this.MyWidth / 2) {
            this.Vx *= -1;
          }
          this.node.setPosition(now_pos);
        }

        /**
         * 检测消失
         */
        CheckDisappear() {
          if (!this.IsDisappear || !this.node.active) return;
          this.DisappearTime--;
          if (this.DisappearTime <= 0) {
            this.IsDisappear = false;
            this.node.setPosition(new Vec3(0, -800, 0));
          }
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "Prop", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StepLoad.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './BgLoad.ts', './ElementLoad.ts', './Step.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, _decorator, Component, Vec3, instantiate, Global, PropList, BgLoad, ElementLoad, Step;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
    }, function (module) {
      Global = module.Global;
      PropList = module.PropList;
    }, function (module) {
      BgLoad = module.BgLoad;
    }, function (module) {
      ElementLoad = module.ElementLoad;
    }, function (module) {
      Step = module.Step;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "ba6b7/ccK1ES5P6KS5NxWv9", "StepLoad", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let StepLoad = exports('StepLoad', (_dec = ccclass('StepLoad'), _dec2 = property(Prefab), _dec3 = property(Node), _dec(_class = (_class2 = class StepLoad extends Component {
        constructor(...args) {
          super(...args);
          //单个台阶预设体
          _initializerDefineProperty(this, "Step", _descriptor, this);
          //台阶数组
          this.StepArray = [];
          //元素层
          _initializerDefineProperty(this, "ElementLoad", _descriptor2, this);
          //起始位置
          this.StarPos = new Vec3(0, -50);
          //台阶数量
          this.StepCount = 10;
          //移动距离
          this.MoveDistance = 0;
          //台阶间距
          this.StepDistance = 100;
          //创建台阶数量
          this.CreateStepNum = 0;
          //移动索引
          this.MoveDis = 10;
          //消失索引
          this.DisappearDis = 7;
          //创建金币间隔
          this.CoinDis = 2;
          this.BoomDis = 15;
          this.SpeedDis = 10;
        }
        start() {}

        /**
         * 台阶移动
         */
        StepMove(_vy) {
          for (let step of this.StepArray) step.setPosition(step.getPosition().add(new Vec3(0, _vy)));
          BgLoad.instance.BgMove(_vy);
          //加分
          this.ElementLoad.getComponent(ElementLoad).UpdateScore(_vy / 10);
          this.MoveDistance += Math.abs(_vy);
          if (this.MoveDistance >= this.StepDistance) {
            this.MoveDistance = 0;
            //边界宽度
            let box_width = 750 - 166;
            let step_pos = new Vec3(-box_width / 2 + Math.random() * box_width, 667);
            this.GetStep(step_pos, 0, "");
          }
          //台阶消失
          for (let step of this.StepArray) {
            if (step.getPosition().y < Global.GameBottom) step.active = false;
          }
        }

        /**
         * 获取台阶
         */
        GetStep(_pos, _vx, _prop) {
          this.CreateStepNum++;
          if (this.CreateStepNum % this.CoinDis == 0) _prop = PropList.Coin;
          if (this.CreateStepNum % this.BoomDis == 0) {
            _prop = PropList.Boom;
          }
          // if (this.CreateStepNum % this.SpeedDis == 0) _prop = PropList.Speed;

          if (this.StepArray.length == 0) this.CreateStep(_pos, _vx, _prop);else {
            let use_num = -1;
            for (let i = 0; i < this.StepArray.length; i++) if (!this.StepArray[i].active) use_num = i;
            if (use_num == -1) this.CreateStep(_pos, _vx, _prop);else {
              this.StepArray[use_num].active = true;
              this.StepArray[use_num].setPosition(_pos);
              this.StepArray[use_num].getComponent(Step).UpdateStyle(this.CreateStepNum % this.MoveDis == 0, this.CreateStepNum % this.DisappearDis == 0, _prop);
            }
          }
          Global.IsDebug && console.log("台阶数组", this.StepArray.length);
        }
        update(dt) {
          for (let step of this.StepArray) {
            step.getComponent(Step).UpdatePosition();
            step.getComponent(Step).CheckDisappear();
          }
        }

        /**
         * 创建台阶
         */
        CreateStep(_pos, _vx, _prop) {
          let step = instantiate(this.Step);
          this.node.addChild(step);
          step.setPosition(_pos);
          step.getComponent(Step).UpdateStyle(this.CreateStepNum % this.MoveDis == 0, this.CreateStepNum % this.DisappearDis == 0, _prop);
          this.StepArray.push(step);
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "Step", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ElementLoad", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Stop.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Cubeflip.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, director, systemEvent, SystemEvent, RotateAndMoveCubeOnKey;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
    }, function (module) {
      RotateAndMoveCubeOnKey = module.RotateAndMoveCubeOnKey;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "8fe86nuRB1HMYYqGEcOQTRg", "Stop", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let PauseHandler = exports('PauseHandler', (_dec = ccclass('PauseHandler'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class PauseHandler extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "pauseMenu", _descriptor, this);
          _initializerDefineProperty(this, "mainCamera", _descriptor2, this);
          _initializerDefineProperty(this, "cubeNode", _descriptor3, this);
          // 将控制计时的 Cube 节点拖到此处
          this.isPaused = false;
        }
        onPauseGame() {
          // 暂停游戏
          director.getScheduler().setTimeScale(0);
          this.isPaused = true;
          console.log("Game paused");
          if (this.pauseMenu) {
            this.pauseMenu.active = true;
          }
          if (this.mainCamera) {
            this.mainCamera.active = false;
          }

          // 暂停计时
          if (this.cubeNode) {
            const cubeController = this.cubeNode.getComponent(RotateAndMoveCubeOnKey);
            if (cubeController) {
              cubeController.isTiming = false; // 停止计时
            }
          }

          // 暂停全局点击事件监听
          systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.globalClickHandler, this);
        }
        onResumeGame() {
          // 恢复游戏
          director.getScheduler().setTimeScale(1);
          this.isPaused = false;
          console.log("Game resumed");
          if (this.pauseMenu) {
            this.pauseMenu.active = false;
          }
          if (this.mainCamera) {
            this.mainCamera.active = true;
          }

          // 恢复计时
          if (this.cubeNode) {
            const cubeController = this.cubeNode.getComponent(RotateAndMoveCubeOnKey);
            if (cubeController) {
              cubeController.isTiming = true; // 恢复计时
            }
          }

          // 恢复全局点击事件监听
          systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.globalClickHandler, this);
        }
        globalClickHandler(event) {
          if (this.isPaused) {
            console.log("Game is paused, ignoring global clicks.");
            return;
          }
          // 处理全局点击事件逻辑...
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pauseMenu", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cubeNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SurfacePlace.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, Quat, Vec3, instantiate;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "f58a6NEXM5BW56RDfVlE5qF", "SurfacePlace", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let RubiksCubeSurfacePlacer = exports('RubiksCubeSurfacePlacer', (_dec = ccclass('RubiksCubeSurfacePlacer'), _dec2 = property(Prefab), _dec(_class = (_class2 = class RubiksCubeSurfacePlacer extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "surfacePrefab", _descriptor, this);
          // 需要放置的预制体
          // 固定的坐标值
          this.fixedCoordinate = 2.2;
          this.variableCoordinates = [-1.1, 0, 1.1];
        }
        start() {
          this.placePrefabsOnSurfaces();
        }
        placePrefabsOnSurfaces() {
          // 遍历六个面，并在每个面上放置预制体
          // 面1：y = 2.2，变化的是 x 和 z
          this.placePrefabsOnFace('y', this.fixedCoordinate);

          // 面2：y = -2.2，变化的是 x 和 z，旋转180度
          this.placePrefabsOnFace('y', -this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), Math.PI));

          // 面3：x = 2.2，变化的是 y 和 z，绕z轴旋转-90度
          this.placePrefabsOnFace('x', this.fixedCoordinate, Quat.rotateZ(new Quat(), new Quat(), -Math.PI / 2));

          // 面4：x = -2.2，变化的是 y 和 z，绕z轴旋转90度
          this.placePrefabsOnFace('x', -this.fixedCoordinate, Quat.rotateZ(new Quat(), new Quat(), Math.PI / 2));

          // 面5：z = 2.2，变化的是 x 和 y，绕x轴旋转90度
          this.placePrefabsOnFace('z', this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), Math.PI / 2));

          // 面6：z = -2.2，变化的是 x 和 y，绕x轴旋转-90度
          this.placePrefabsOnFace('z', -this.fixedCoordinate, Quat.rotateX(new Quat(), new Quat(), -Math.PI / 2));
        }
        placePrefabsOnFace(fixedAxis, fixedValue, rotation = new Quat()) {
          for (let v1 of this.variableCoordinates) {
            for (let v2 of this.variableCoordinates) {
              let position = new Vec3();
              switch (fixedAxis) {
                case 'x':
                  position.set(fixedValue, v1, v2);
                  break;
                case 'y':
                  position.set(v1, fixedValue, v2);
                  break;
                case 'z':
                  position.set(v1, v2, fixedValue);
                  break;
              }
              this.instantiatePrefab(position, rotation);
            }
          }
        }
        instantiatePrefab(position, rotation) {
          const prefabInstance = instantiate(this.surfacePrefab);
          prefabInstance.setParent(this.node);
          prefabInstance.setPosition(position);
          prefabInstance.setRotation(rotation);
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "surfacePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TopLoad.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Global2.ts', './ResMgr.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, Label, _decorator, Component, instantiate, UIOpacity, Tween, tween, Global, ResMgr;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      UIOpacity = module.UIOpacity;
      Tween = module.Tween;
      tween = module.tween;
    }, function (module) {
      Global = module.Global;
    }, function (module) {
      ResMgr = module.ResMgr;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3;
      cclegacy._RF.push({}, "478c0wYuWRNT6LwhMu7GK1a", "TopLoad", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let TopLoad = exports('TopLoad', (_dec = ccclass('TopLoad'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Label), _dec(_class = (_class2 = (_class3 = class TopLoad extends Component {
        constructor(...args) {
          super(...args);
          //弹窗层
          _initializerDefineProperty(this, "PopLoad", _descriptor, this);
          //提示框
          _initializerDefineProperty(this, "PromptBox", _descriptor2, this);
          //提示内容
          _initializerDefineProperty(this, "PromptContent", _descriptor3, this);
          //弹窗
          this.Pops = {};
        }
        onLoad() {
          TopLoad.instance = this;
        }
        /**
         * 添加弹窗
         */
        AddPop(_popname) {
          Global.IsDebug && console.log("显示弹窗", _popname);
          let pop = instantiate(ResMgr.instance.Prefabs[_popname]);
          this.PopLoad.addChild(pop);
          this.Pops[_popname] = pop;
          Global.IsDebug && console.log("弹窗信息", this.Pops);
          return pop;
        }

        /**
         * 隐藏弹窗
         */
        HidePop(_popname) {
          Global.IsDebug && console.log("隐藏弹窗", _popname);
          this.Pops[_popname].destroy();
          delete this.Pops[_popname];
          Global.IsDebug && console.log("弹窗信息", this.Pops);
        }

        /**
        * 显示提示框
        */
        ShowPrompt(_content) {
          this.PromptBox.active = true;
          this.PromptContent.string = _content;
          let prompt_opacity = this.PromptBox.getComponent(UIOpacity);
          prompt_opacity.opacity = 0;
          Tween.stopAllByTarget(prompt_opacity);
          tween(prompt_opacity).to(0.3, {
            opacity: 255
          }).delay(1).to(0.3, {
            opacity: 0
          }).call(() => {
            this.PromptBox.active = false;
          }).start();
        }
      }, _class3.instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "PopLoad", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "PromptBox", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "PromptContent", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TorusHit.ts", ['cc'], function (exports) {
  var cclegacy, Component, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "19f16JN4ihCtKDQuSmn41jA", "TorusHit", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let TorusScript = exports('TorusScript', (_dec = ccclass('TorusScript'), _dec(_class = class TorusScript extends Component {
        start() {
          console.log("TorusScript has been loaded");
        }
        onTriggerEnter(event) {
          console.log("Torus has collided with Cube2!");
          if (event.otherCollider.node.name === "Cube2") {
            console.log("Torus has collided with Cube2!");
          }
        }

        // ... onTriggerStay 和 onTriggerExit 如果需要也可以实现
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenTools.ts", ['cc'], function (exports) {
  var cclegacy, Component, tween, Vec3, easing, UIOpacity, _decorator;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      tween = module.tween;
      Vec3 = module.Vec3;
      easing = module.easing;
      UIOpacity = module.UIOpacity;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "f6108I+yfZMKKrX0a4fOGCy", "TweenTools", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let TweenTool = exports('TweenTool', (_dec = ccclass('TweenTool'), _dec(_class = class TweenTool extends Component {
        /**
         * 屏幕爆炸特效
         * @param 场景
         * @param 回调函数
         */
        static ScreenBoom(_node, _cb) {
          let tween_time = 0.1;
          let angle_num = 10;
          let scale_num = 1.2;
          tween(_node).to(tween_time, {
            scale: new Vec3(scale_num, scale_num, scale_num),
            angle: angle_num
          }).to(tween_time, {
            scale: new Vec3(1, 1, 1),
            angle: 0
          }).to(tween_time, {
            scale: new Vec3(scale_num, scale_num, scale_num),
            angle: -angle_num
          }).to(tween_time, {
            scale: new Vec3(1, 1, 1),
            angle: 0
          }).call(() => {
            _cb && _cb();
          }).start();
        }

        /**
         * 弹窗缓动
         * @param 场景
         * @param 回调函数
         */
        static Pop(_node, _cb = null) {
          let tween_time = 0.3;
          let scale_num = 1;
          tween(_node).tag(1).set({
            scale: new Vec3(0, 0, 0)
          }).to(tween_time, {
            scale: new Vec3(scale_num, scale_num, scale_num)
          }, {
            easing: easing.backOut
          }).call(() => {
            _cb && _cb();
          }).start();
        }

        /**
         * 场景移动
         * @param 场景
         * @param 回调函数
         */
        static SceneMove(_node, _startpos, _endpos, _cb = null) {
          let tween_time = 0.3;
          tween(_node).set({
            position: _startpos
          }).to(tween_time, {
            position: _endpos
          }, {
            easing: easing.backOut
          }).call(() => {
            _cb && _cb();
          }).start();
        }

        /**
         * 场景移动
         * @param 场景
         * @param 回调函数
         */
        static SceneMove1(_node, _startpos, _endpos, _cb = null) {
          let tween_time = 0.3;
          tween(_node).set({
            position: _startpos
          }).to(tween_time, {
            position: _endpos
          }, {
            easing: easing.backIn
          }).call(() => {
            _cb && _cb();
          }).start();
        }

        /**
         * 猫咪出现
         * @param 猫咪
         * @param 回调函数
         */
        static CatAppear(_cat, _cb = null) {
          let tween_time = 0.3;
          let start_pos = _cat.getPosition().add(new Vec3(0, -150, 0));
          let end_pos = _cat.getPosition();
          tween(_cat).set({
            position: start_pos
          }).to(tween_time, {
            position: end_pos
          }, {
            easing: easing.backOut
          }).call(() => {
            _cb && _cb();
          }).start();
        }

        /**
        * 猫咪隐藏
        * @param 猫咪
        * @param 回调函数
        */
        static CatDisplay(_cat, _cb = null) {
          let tween_time = 0.3;
          let start_pos = _cat.getPosition().add(new Vec3(0, -150, 0));
          let end_pos = _cat.getPosition();
          tween(_cat).set({
            position: end_pos
          }).to(tween_time, {
            position: start_pos
          }, {
            easing: easing.backIn
          }).call(() => {
            _cb && _cb();
          }).start();
        }

        /**
         * 金币出现提示(金币是透明度的)
         * @param 金币
         */
        static CoinAppear(_coin, _cb) {
          let tween_time = 1;
          let coin_pos = _coin.getPosition();
          let move_pos = coin_pos.add(new Vec3(0, 50, 0));
          _coin.getComponent(UIOpacity).opacity = 255;
          tween(_coin).to(tween_time, {
            position: move_pos
          }, {
            easing: easing.backOut,
            onUpdate: (_target, _ratio) => {
              _coin.getComponent(UIOpacity).opacity = 225 - _ratio * 225;
            },
            onComplete: _target => {
              _target.active = false;
              _cb && _cb();
            }
          }).start();
        }
      }) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Cubes.ts', './Sample_Cursor2.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Vec3, input, Input, Camera, geometry, PhysicsSystem, view, toRadian, toDegree, Cubes, Sample_Cursor;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      input = module.input;
      Input = module.Input;
      Camera = module.Camera;
      geometry = module.geometry;
      PhysicsSystem = module.PhysicsSystem;
      view = module.view;
      toRadian = module.toRadian;
      toDegree = module.toDegree;
    }, function (module) {
      Cubes = module.Cubes;
    }, function (module) {
      Sample_Cursor = module.Sample_Cursor;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "58c51RL9/xIhYqAgUBJ/SLW", "UI", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let UI = exports('UI', (_dec = ccclass("UI"), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Cubes), _dec6 = property(Sample_Cursor), _dec(_class = (_class2 = class UI extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "cameraNode", _descriptor, this);
          _initializerDefineProperty(this, "uiNode", _descriptor2, this);
          _initializerDefineProperty(this, "selcetNode", _descriptor3, this);
          _initializerDefineProperty(this, "cubes", _descriptor4, this);
          _initializerDefineProperty(this, "sampleCursor", _descriptor5, this);
          this.cameraDistance = 10;
          // 摄像机初始距离
          this.zoomSpeed = 0.1;
          // 缩放速度
          this.minDistance = 5;
          // 缩放最小距离
          this.maxDistance = 20;
          // 缩放最大距离
          this._initialTouchDistance = 0;
          // 初始两指间距离
          this.minFOV = 20;
          // 最小视场角
          this.maxFOV = 80;
          // 最大视场角
          this.camera0 = null;
          this._isDragging = false;
          // 是否正在单指拖动
          this._isPinching = false;
          // 是否正在双指缩放
          this._lastTouchPos = new Vec3();
        }
        onLoad() {
          this.fixCamera();
          //profiler.showStats();

          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.on(Input.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        }
        onDestroy() {
          input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
          input.off(Input.EventType.MOUSE_WHEEL, this.onMouseWheel);
        }
        onTouchStart(event) {
          const touches = event.getTouches();
          if (touches.length === 2) {
            console.log('a');
            // 双指操作，初始化缩放距离
            this._isPinching = true;
            this._initialTouchDistance = this.calculateTouchDistance(touches[0], touches[1]);
            this._isDragging = false; // 禁用单指拖动
          } else if (touches.length === 1) {
            // 单指操作
            this._isDragging = true;
            this._isPinching = false;
            const touch = touches[0].getLocation();
            this._lastTouchPos.set(touch.x, touch.y, 0);
          }
        }
        onTouchMove(event) {
          const touches = event.getTouches();
          if (this._isPinching && touches.length === 2) {
            // 双指缩放逻辑
            const currentDistance = this.calculateTouchDistance(touches[0], touches[1]);
            const deltaDistance = currentDistance - this._initialTouchDistance;
            this.onPinchZoom(deltaDistance * 0.01); // 缩放操作
            this._initialTouchDistance = currentDistance; // 更新初始距离
          } else if (this._isDragging && touches.length === 1) {
            // 单指拖动逻辑
            const touch = touches[0].getLocation();
            const deltaX = touch.x - this._lastTouchPos.x;
            const deltaY = touch.y - this._lastTouchPos.y;
            const rotationSpeed = 0.1;
            this.cameraNode.eulerAngles = new Vec3(this.cameraNode.eulerAngles.x + deltaY * rotationSpeed, this.cameraNode.eulerAngles.y - deltaX * rotationSpeed, this.cameraNode.eulerAngles.z);
            this._lastTouchPos.set(touch.x, touch.y, 0);
          }
        }
        onTouchEnd(event) {
          const touches = event.getTouches();
          if (touches.length < 2) {
            // 如果少于两指，结束双指操作
            this._isPinching = false;
          }
          if (touches.length < 1) {
            // 如果没有触点，结束单指拖动
            this._isDragging = false;
          }
        }
        onMouseWheel(event) {
          // 触控板滚动事件模拟缩放
          const delta = event.getScrollY();

          // 缩放逻辑
          const camera = this.cameraNode.getComponent(Camera);
          if (!camera) {
            console.error("Camera component not found on cameraNode!");
            return;
          }
          camera.fov -= delta * this.zoomSpeed * 0.05; // 缩放速度调低
          camera.fov = Math.max(this.minFOV, Math.min(this.maxFOV, camera.fov));
          camera.camera.update(true);
          console.log(`Mouse wheel delta: ${delta}, new FOV: ${camera.fov}`);
        }
        pickCube(event) {
          const ray = new geometry.Ray();
          if (!this.camera0) {
            console.error("Camera0 未初始化");
            return false;
          }
          this.camera0.screenPointToRay(event.getLocationX(), event.getLocationY(), ray);
          if (PhysicsSystem.instance.raycastClosest(ray)) {
            const raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let node = raycastResult.collider.node;
            if (!/^\d$/.test(node.name) && node.parent) {
              node = node.parent;
            }
            this.cubes.selectCube(node);
            this.sampleCursor._cursorSelect.showWith(node);
            return true;
          }
          return false;
        }
        calculateTouchDistance(touch1, touch2) {
          const dx = touch1.getLocationX() - touch2.getLocationX();
          const dy = touch1.getLocationY() - touch2.getLocationY();
          return Math.sqrt(dx * dx + dy * dy);
        }
        onPinchZoom(deltaDistance) {
          const camera = this.cameraNode.getComponent(Camera);
          if (!camera) return;
          camera.fov -= deltaDistance * this.zoomSpeed;
          camera.fov = Math.max(this.minFOV, Math.min(this.maxFOV, camera.fov));
          camera.camera.update(true);
        }
        onWheelZoom(delta) {
          const camera = this.cameraNode.getComponent(Camera);
          if (!camera) return;
          camera.fov -= delta * this.zoomSpeed * 0.1;
          camera.fov = Math.max(this.minFOV, Math.min(this.maxFOV, camera.fov));
          camera.camera.update(true);
        }

        ///////////////////////////////////////////////////////////////////////////
        btnStart() {
          this.cubes.resetLevel();
          this.cubes.faPai();
        }
        btnHePai() {
          this.cubes.hePai();
        }
        fixCamera() {
          const size = view.getVisibleSize();
          const aspect = size.width / size.height;
          this.camera0 = this.cameraNode.getChildByName("Camera0").getComponent(Camera);
          if (aspect > 0.5) {
            const horFOV = this.verticalFOVToHorizontal(45, aspect);
            this.camera0.fov = horFOV;
          } else {
            this.camera0.fov = this.horizontalFOVToVertical(45, aspect);
          }
          this.camera0.camera.update(true);
        }
        verticalFOVToHorizontal(verFOV, aspect) {
          const verFovRadian = toRadian(verFOV);
          const camHalfHeight = Math.tan(verFovRadian / 2);
          const horFOVRadian = Math.atan(camHalfHeight * aspect) * 2;
          return toDegree(horFOVRadian);
        }
        horizontalFOVToVertical(horFOV, aspect) {
          const horFOVRadian = toRadian(horFOV);
          const camHalfWidth = Math.tan(horFOVRadian / 2);
          const verFOVRadian = Math.atan(camHalfWidth / aspect) * 2;
          return toDegree(verFOVRadian);
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cameraNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uiNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "selcetNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cubes", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sampleCursor", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/unfoldplay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Animation, _decorator, Component, input, Input, KeyCode;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Animation = module.Animation;
      _decorator = module._decorator;
      Component = module.Component;
      input = module.input;
      Input = module.Input;
      KeyCode = module.KeyCode;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "19c42nWy9FG7JEwR0n/OIsQ", "unfoldplay", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let PlayerController = exports('PlayerController', (_dec = ccclass('unfoldplay'), _dec2 = property(Animation), _dec(_class = (_class2 = class PlayerController extends Component {
        constructor(...args) {
          super(...args);
          _initializerDefineProperty(this, "anim", _descriptor, this);
        }
        start() {
          // 开始监听键盘事件
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }
        onKeyDown(event) {
          if (event.keyCode === KeyCode.SPACE) {
            this.playAnim();
          }
        }
        playAnim() {
          if (this.anim) {
            this.anim.play('CubeUnfolding'); // 确保动画剪辑名与实际名相符
          }
        }

        onDestroy() {
          // 停止监听键盘事件，以避免内存泄露
          input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }
      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "anim", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Vec3Util.ts", ['cc', './MathUtil.ts'], function (exports) {
  var cclegacy, Vec3, Mat4, MathUtil;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Mat4 = module.Mat4;
    }, function (module) {
      MathUtil = module.MathUtil;
    }],
    execute: function () {
      cclegacy._RF.push({}, "71a90/ZCz5OooNKftKEIq7/", "Vec3Util", undefined);

      /** 向量工具 */
      class Vec3Util {
        /**
         * X轴
         */
        static get x() {
          return new Vec3(1, 0, 0);
        }

        /**
         * Y轴
         */
        static get y() {
          return new Vec3(0, 1, 0);
        }

        /**
         * Z轴
         */
        static get z() {
          return new Vec3(0, 0, 1);
        }

        /**
         * 左向量
         */
        static get left() {
          return new Vec3(-1, 0, 0);
        }

        /**
         * 右向量
         */
        static get right() {
          return new Vec3(1, 0, 0);
        }

        /**
         * 上向量
         */
        static get up() {
          return new Vec3(0, 1, 0);
        }

        /**
         * 下向量
         */
        static get down() {
          return new Vec3(0, -1, 0);
        }

        /**
         * 前向量
         */
        static get forward() {
          return new Vec3(0, 0, 1);
        }

        /**
         * 后向量
         */
        static get back() {
          return new Vec3(0, 0, -1);
        }

        /**
         * 1向量
         */
        static get one() {
          return new Vec3(1, 1, 1);
        }

        /**
         * 0向量
         */
        static get zero() {
          return new Vec3(0, 0, 0);
        }

        /**
         * 随时间变化进度值
         * @param start  起始位置
         * @param end    结束位置
         * @param t      进度[0，1]
         */
        static progress(start, end, t) {
          var current = new Vec3();
          current.x = MathUtil.progress(start.x, end.x, t);
          current.y = MathUtil.progress(start.y, end.y, t);
          current.z = MathUtil.progress(start.z, end.z, t);
          return current;
        }

        /**
         * 求两个三维向量的和
         * @param pos1  向量1
         * @param pos2  向量2
         */
        static add(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.add(outPos, pos1, pos2);
          return outPos;
        }

        /**
         * 求两个三维向量的差
         * @param pos1  向量1
         * @param pos2  向量2
         */
        static sub(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.subtract(outPos, pos1, pos2);
          return outPos;
        }

        /**
         * 三维向量乘以常量
         * @param pos     向量
         * @param scalar  常量
         */
        static mul(pos, scalar) {
          var outPos = new Vec3();
          Vec3.multiplyScalar(outPos, pos, scalar);
          return outPos;
        }

        /**
         * 三维向量除常量
         * @param pos     向量
         * @param scalar  常量
         */
        static div(pos, scalar) {
          var outPos = new Vec3();
          outPos.x = pos.x / scalar;
          outPos.y = pos.y / scalar;
          outPos.z = pos.z / scalar;
          return outPos;
        }

        /**
         * 判断两个三维向量的值是否相等
         * @param pos1  向量1
         * @param pos2  向量2
         */
        static equals(pos1, pos2) {
          if (pos1.x == pos2.x && pos1.y == pos2.y && pos1.z == pos2.z) {
            return true;
          }
          return false;
        }

        /**
         * 三维向量的模
         * @param pos  向量
         */
        static magnitude(pos) {
          return pos.length();
        }

        /**
         * 三维向量归一化
         * @param pos  向量
         */
        static normalize(pos) {
          var outPos = new Vec3(pos.x, pos.y, pos.z);
          return outPos.normalize();
        }

        /**
         * 获得位置1，到位置2的方向
         * @param pos1  向量1
         * @param pos2  向量2
         */
        static direction(pos1, pos2) {
          var outPos = new Vec3();
          Vec3.subtract(outPos, pos2, pos1);
          return outPos.normalize();
        }

        /**
         * 获得两点间的距离
         * @param pos1  向量1
         * @param pos2  向量2
         */
        static distance(pos1, pos2) {
          return Vec3.distance(pos1, pos2);
        }

        /**
         * 插值运算
         * @param posStart  开始俏步
         * @param posEnd    结束位置
         * @param t         时间
         */
        static lerp(posStart, posEnd, t) {
          return this.bezierOne(t, posStart, posEnd);
        }

        /**
         * 球面插值
         * @param from  起点
         * @param to    终点
         * @param t     时间
         */
        static slerp(from, to, t) {
          if (t <= 0) {
            return from;
          } else if (t >= 1) {
            return to;
          }
          var dir = this.rotateTo(from, to, Vec3.angle(from, to) / Math.PI * 180 * t);
          var lenght = to.length() * t + from.length() * (1 - t);
          return dir.normalize().multiplyScalar(lenght);
        }

        /**
         * 向量旋转一个角度
         * @param from  起点
         * @param to    终点
         * @param angle 角并
         */
        static rotateTo(from, to, angle) {
          //如果两个方向角度为0，则返回目标
          if (Vec3.angle(from, to) == 0) {
            return to;
          }
          var axis = new Vec3(); // 获得旋转轴
          Vec3.cross(axis, from, to);
          axis.normalize();
          var radian = angle * Math.PI / 180; // 获得弧度
          var rotateMatrix = new Mat4();
          rotateMatrix.rotate(radian, axis);
          return new Vec3(from.x * rotateMatrix.m00 + from.y * rotateMatrix.m04 + from.z * rotateMatrix.m08, from.x * rotateMatrix.m01 + from.y * rotateMatrix.m05 + from.z * rotateMatrix.m09, from.x * rotateMatrix.m02 + from.y * rotateMatrix.m06 + from.z * rotateMatrix.m10);
        }

        /**
         * 一次贝塞尔即为线性插值函数
         * @param t 
         * @param posStart 
         * @param posEnd 
         * @returns 
         */
        static bezierOne(t, posStart, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          var pStart = posStart.clone();
          var pEnd = posEnd.clone();
          return pStart.multiplyScalar(1 - t).add(pEnd.multiplyScalar(t));
        }

        /**
         * 二次贝塞尔曲线
         * @param t 
         * @param posStart 
         * @param posCon 
         * @param posEnd 
         * @returns 
         */
        static bezierTwo(t, posStart, posCon, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          var n = 1 - t;
          var tt = t * t;
          var pStart = posStart.clone();
          var pos = new Vec3();
          var pCon = posCon.clone();
          var pEnd = posEnd.clone();
          pos.add(pStart.multiplyScalar(n * n));
          pos.add(pCon.multiplyScalar(2 * n * t));
          pos.add(pEnd.multiplyScalar(tt));
          return pos;
        }

        /**
         * 三次贝塞尔
         * @param t 
         * @param posStart 
         * @param posCon1 
         * @param posCon2 
         * @param posEnd 
         * @returns 
         */
        static bezierThree(t, posStart, posCon1, posCon2, posEnd) {
          if (t > 1) {
            t = 1;
          } else if (t < 0) {
            t = 0;
          }
          var n = 1 - t;
          var nn = n * n;
          var nnn = nn * n;
          var tt = t * t;
          var ttt = tt * t;
          var pStart = posStart.clone();
          var pos = posStart.clone();
          var pCon1 = posCon1.clone();
          var pCon2 = posCon2.clone();
          var pEnd = posEnd.clone();
          pos.add(pStart.multiplyScalar(nnn));
          pos.add(pCon1.multiplyScalar(3 * nn * t));
          pos.add(pCon2.multiplyScalar(3 * n * tt));
          pos.add(pEnd.multiplyScalar(ttt));
          return pos;
        }

        /**
         * 点乘
         * @param dir1 方向量1
         * @param dir2 方向量2
         */
        static dot(dir1, dir2) {
          var tempDir1 = dir1;
          var tempDir2 = dir2;
          return tempDir1.x * tempDir2.x + tempDir1.y * tempDir2.y + tempDir1.z * tempDir2.z;
        }

        /**
         * 叉乘
         * @param dir1 方向量1
         * @param dir2 方向量2
         */
        static cross(dir1, dir2) {
          var i = new Vec3(1, 0, 0);
          var j = new Vec3(0, 1, 0);
          var k = new Vec3(0, 0, 1);
          var tempDir1 = new Vec3(dir1.x, dir1.y, dir1.z);
          var tempDir2 = new Vec3(dir2.x, dir2.y, dir2.z);
          var iv = i.multiplyScalar(tempDir1.y * tempDir2.z - tempDir2.y * tempDir1.z);
          var jv = j.multiplyScalar(tempDir2.x * tempDir1.z - tempDir1.x * tempDir2.z);
          var kv = k.multiplyScalar(tempDir1.x * tempDir2.y - tempDir2.x * tempDir1.y);
          return iv.add(jv).add(kv);
        }

        /**
         * 获得两个方向向量的角度
         * @param dir1 方向量1
         * @param dir2 方向量2
         */
        static angle(dir1, dir2) {
          var dotValue = this.dot(dir1.clone().normalize(), dir2.clone().normalize());
          return Math.acos(dotValue) / Math.PI * 180 * Math.sign(dotValue);
        }

        /**
         * 获得方向a到方向b的角度（带有方向的角度）
         * @param a 角度a
         * @param b 角度b
         */
        static dirAngle(a, b) {
          var c = Vec3Util.cross(a, b);
          var angle = Vec3Util.angle(a, b);
          // a 到 b 的夹角
          var sign = Math.sign(Vec3Util.dot(c.normalize(), Vec3Util.cross(b.normalize(), a.normalize())));
          return angle * sign;
        }
      }
      exports('Vec3Util', Vec3Util);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WxAdMgr.ts", ['cc', './Global2.ts'], function (exports) {
  var cclegacy, _decorator, Component, Global;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "104976WrbdFDrDfvttwjUXT", "WxAdMgr", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let WxAdMgr = exports('WxAdMgr', (_dec = ccclass('WxAdMgr'), _dec(_class = (_class2 = class WxAdMgr extends Component {
        constructor(...args) {
          super(...args);
          //视频广告
          this.VideoAd = null;
          //banner广告
          this.BannerAd = null;
          //格子广告
          this.GridAd = null;
          //回调函数
          this.Cb = null;
        }
        static get Instance() {
          if (!this._instance) {
            this._instance = new WxAdMgr();
          }
          return this._instance;
        }
        /**
         * 初始化
         * @param 激励视频广告id
         * @param 下方banner广告id
         * @param 格子广告id
         * @param 激励广告回调
         */
        Init(_video, _banner, _grid) {
          //激励广告
          this.VideoAd = wx.createRewardedVideoAd({
            adUnitId: _video
          });
          this.VideoAd.onLoad(() => {
            Global.IsDebug && console.log("微信广告加载成功");
          });
          this.VideoAd.onError(err => {
            Global.IsDebug && console.log("激励视频广告加载失败", err);
          });
          this.VideoAd.onClose(res => {
            this.VideoClose(res.isEnded);
          });

          //banner广告
          if (_banner) {
            this.BannerAd = wx.createBannerAd({
              adUnitId: _banner,
              adIntervals: 30,
              style: {
                left: 0,
                top: 0,
                width: screen.width
              }
            });
            this.BannerAd.onResize(res => {
              //banner广告适配
              this.BannerAd.top = screen.height - res.height;
            });
          }

          //格子广告
          if (_grid) {
            this.GridAd = wx.createGridAd({
              adUnitId: _grid,
              adIntervals: 30,
              style: {
                left: 0,
                top: screen.height / 2 - 200
              }
            });
          }
        }

        /**
         * 显示激励广告
         */
        ShowRewardVideoAd(_cb) {
          //显示失败了重新加载
          this.VideoAd.load().then(() => {
            this.VideoAd.show().catch(err => {
              //显示失败了重新加载
              Global.IsDebug && console.log('视频广告加载失败', err);
              this.VideoClose(false);
            });
          });
        }

        /**
         * 显示banner广告
         * @param 是否显示
         */
        ShowBannerAd(_isshow) {
          if (_isshow) {
            this.BannerAd.show();
            this.BannerAd.style.top = screen.height - this.BannerAd.style.realHeight;
          } else this.BannerAd.hide();
        }

        /**
         * 显示格子广告
         * @param 是否显示
         */
        ShowGridAd(_isshow) {
          if (_isshow) {
            this.GridAd.ad.show();
          } else this.GridAd.ad.hide();
        }

        /**
         * 关闭视频
         * @param 是否播放完成
         */
        VideoClose(_isended) {
          Global.IsDebug && console.log("用户是否看完了广告", _isended);
          this.Cb && this.Cb(_isended);
        }
      }, _class2._instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WxTools.ts", ['cc', './Global2.ts'], function (exports) {
  var cclegacy, _decorator, Component, Global;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Global = module.Global;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "0ac59WDei9E1IdNqEgZwdt0", "WxTools", undefined);
      const {
        ccclass,
        property
      } = _decorator;
      let WxTools = exports('WxTools', (_dec = ccclass('WxTools'), _dec(_class = (_class2 = class WxTools extends Component {
        /**
         * 设置本地缓存
         * @param key值
         * @param value值
         */
        static SetStorage(_key, _value) {
          wx.setStorageSync(_key, _value);
        }

        /**
         * 获取本地缓存
         * @param key值
         */
        static GetStorage(_key) {
          return wx.getStorageSync(_key) == "" ? null : JSON.parse(wx.getStorageSync(_key));
        }

        //

        /**
         * 主动分享（直接分享弹窗）
         * @param 分享标题
         * @param 图片索引
         */
        static Share(_title, _picindex) {
          if (!Global.IsWx) return;
          wx.shareAppMessage({
            title: _title,
            imageUrlId: this.PicId[_picindex],
            imageUrl: this.PicUrl[_picindex]
          });
        }

        /**
          * 更新被动分享信息（点击主菜单分享）
          */
        static SetShare() {
          if (!Global.IsWx) return;
          let pic_index = Math.floor(this.PicUrl.length * Math.random());
          wx.onShareAppMessage(function () {
            return {
              title: "快来帮小笨鸟加加速"
              // imageUrlId: this.PicId[pic_index],
              // imageUrl: this.PicUrl[pic_index]
            };
          }.bind(this));
        }

        /**
         * 
         */
        static ShareMenu() {
          if (!Global.IsWx) return;
          wx.showShareMenu({
            menus: ['shareAppMessage', 'shareTimeline']
          });
        }

        /**
         * 微信小程序交互提示
         * @param 提示文字
         * @param 提示图标 success error loading none
         * @param 提示延迟时间 毫秒为单位
         */
        static ShowToast(_title, _icon, _duration = 2000) {
          wx.showToast({
            title: _title,
            icon: _icon,
            duration: _duration
          });
        }

        /**
         * 隐藏弹窗
         */
        static HideToast() {
          wx.hideToast();
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
        static ShowModal(_title, _content, _successcb, _failcb, _completecb) {
          wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            showCancel: false,
            editable: true,
            success(res) {
              if (res.confirm) {
                Global.IsDebug && console.log('用户点击确定');
              } else if (res.cancel) {
                Global.IsDebug && console.log('用户点击取消');
              }
            }
          });
        }

        /**
         * 显示loading提示框
         * @param 提示文字
         * @param 是否防止触摸
         * @param 成功回调
         * @param 失败回调
         * @param 接口调用结束
         */
        static ShowLoading(_title, _mask = true, _successcb = null, _failcb = null, _completecb = null) {
          wx.showLoading({
            title: _title,
            mask: _mask,
            success: _successcb,
            fail: _failcb,
            complete: _completecb
          });
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
        static ShowActionSheet(_alerttext, _itemlist, _itemcolor = "#000000", _successcb = null, _failcb = null, _completecb = null) {
          wx.showActionSheet({
            alertText: _alerttext,
            itemList: _itemlist,
            itemColor: _itemcolor,
            success: _successcb,
            fail: _failcb,
            complete: _completecb
          });
        }

        /**
         * 短震动
         * @param 震动类型 heavy、medium、light
         */
        static VibrateShort(_type = "medium") {
          if (!Global.IsWx) return;
          wx.vibrateShort({
            type: _type
          });
        }

        /**
         * 长震动
         */
        static VibrateLong() {
          wx.vibrateLong();
        }

        /**
         * 获取用户信息
         * @param 成功回调
         */
        static GetUserInfor(_successcb) {
          //需要判断是否授权
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    Global.IsDebug && console.log(res.userInfo);
                    _successcb(res.userInfo);
                  }
                });
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
                });
                button.onTap(res => {
                  // 用户同意授权后回调，通过回调可获取用户头像昵称信息
                  Global.IsDebug && console.log(res);
                  _successcb(res.userInfo);
                  button.destroy();
                });
              }
            }
          });
        }
      }, _class2.PicUrl = ["https://mmocgame.qpic.cn/wechatgame/7oibW3uRtGFOhYIpRRBfBXgmpc0lKbhSOTkcc0MkLf2icHKCVicGcyeh8YD3mjRV07h/0"], _class2.PicId = ["TUyoQsD9Qg+D10vm3YXIOw=="], _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});