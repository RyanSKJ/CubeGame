System.register("chunks:///_virtual/resources", ['./RoundRect.ts', './Sample_Cursor.ts'], function () {
  return {
    setters: [null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/RoundRect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
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
      cclegacy._RF.push({}, "c007aDbxvBI8a+R0xM++FHn", "RoundRect", undefined);
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

System.register("chunks:///_virtual/Sample_Cursor.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RoundRect.ts'], function (exports) {
  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Vec2, geometry, Camera, Node, _decorator, Component, PhysicsSystem, Vec3, tween, easing, Quat, RoundRect;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      geometry = module.geometry;
      Camera = module.Camera;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      PhysicsSystem = module.PhysicsSystem;
      Vec3 = module.Vec3;
      tween = module.tween;
      easing = module.easing;
      Quat = module.Quat;
    }, function (module) {
      RoundRect = module.RoundRect;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "02fecsj+llGPazbt62MeeDv", "Sample_Cursor", undefined);
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
      let Sample_Cursor = exports('Sample_Cursor', (_dec = ccclass('RoundRect.Sample_Cursor'), _dec2 = property(Camera), _dec3 = property(Node), _dec4 = property(RoundRect), _dec5 = property(RoundRect), _dec6 = property(Node), _dec(_class = (_class2 = class Sample_Cursor extends Component {
        constructor(...args) {
          super(...args);
          //#region [touch]
          _initializerDefineProperty(this, "rayCamera", _descriptor, this);
          _initializerDefineProperty(this, "touchTarget", _descriptor2, this);
          //#endregion [touch]
          //#region [RoundRect]
          _initializerDefineProperty(this, "rectSelect", _descriptor3, this);
          _initializerDefineProperty(this, "rectTarget", _descriptor4, this);
          _initializerDefineProperty(this, "roleRoot", _descriptor5, this);
          this._cursorSelect = void 0;
          this._cursorTarget = void 0;
        }
        onLoad() {
          window['sample'] = this;
          this._cursorSelect = new CursorSelect(this.rectSelect);
          this._cursorTarget = new CursorTarget(this.rectTarget);
          this.roleRoot.children.forEach(this._randomMove);
          this._listenTouch(true);
        }
        _listenTouch(isOn) {
          const target = this.touchTarget;
          const fn = isOn ? target.on : target.off;
          fn.call(target, Node.EventType.TOUCH_START, this._onTS, this);
          fn.call(target, Node.EventType.TOUCH_END, this._onTE, this);
          fn.call(target, Node.EventType.TOUCH_CANCEL, this._onTE, this);
          fn.call(target, Node.EventType.TOUCH_MOVE, this._onTM, this);
        }
        _onTS(e) {
          this._onTouch('ts', e);
        }
        _onTE(e) {
          this._onTouch('te', e);
        }
        _onTM(e) {
          this._onTouch('tm', e);
        }
        _e2hit(e) {
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
        _onTouch(type, e) {
          const rsl = this._e2hit(e);
          if (!rsl) {
            this._cursorSelect.hide();
            this._cursorTarget.hide();
            return;
          }
          switch (type) {
            case 'ts':
              break;
            case 'tm':
              break;
            case 'te':
              const root = rsl.collider.node.parent;
              const isTarget = root.name.includes('Enemy');
              (isTarget ? this._cursorTarget : this._cursorSelect).showWith(root);
              break;
          }
        }

        //#endregion [RoundRect]

        _randomMove(node) {
          const dur = Math.random() * 0.5 + 0.5;
          const arc = Math.random() * 2 * Math.PI;
          const p1 = new Vec3(Math.sin(arc), 0, Math.cos(arc));
          const p2 = p1.clone().multiplyScalar(-1);
          [p1, p2, p2, p1].reduce((rsl, v) => rsl.by(dur, {
            position: v
          }), tween(node)).union().repeatForever().start();
        }
      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rayCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "touchTarget", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rectSelect", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rectTarget", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "roleRoot", [_dec6], {
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
          this.node.active = true;
          this.node.parent = root;
          this.node.position = Vec3.ZERO;
          this.node.rotation = Quat.IDENTITY;
          this.rect.lineWidth = this.lineWidth * 4;
          tween(this.rect).to(this.dur, {
            lineWidth: this.lineWidth
          }, {
            easing: easing.backOut
          }).start();
          this._tw1?.stop();
          this._tw1 = tween(this.node).to(this.dur, this._pptMove1, {
            easing: easing.sineInOut
          }).to(this.dur, this._pptMove2, {
            easing: easing.sineInOut
          }).union().repeatForever().start();
          this._tw2?.stop();
          this._tw2 = tween(this.node).by(this.dur * 4, this._pptRot).repeatForever().start();
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

(function(r) {
  r('virtual:///prerequisite-imports/resources', 'chunks:///_virtual/resources'); 
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