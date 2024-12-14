System.register("chunks:///_virtual/resources",["./RoundRect.ts"],(function(){return{setters:[null],execute:function(){}}}));

System.register("chunks:///_virtual/RoundRect.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var i,e,s,o,r,n,h,p,a,u,c,d,l,_,y;return{setters:[function(t){i=t.applyDecoratedDescriptor,e=t.initializerDefineProperty},function(t){s=t.cclegacy,o=t.CCInteger,r=t.CCFloat,n=t._decorator,h=t.Component,p=t.Node,a=t.MeshRenderer,u=t.Mesh,c=t.Material,d=t.utils,l=t.Vec3,_=t.math,y=t.Color}],execute:function(){var m,f,g,w,b,P,v,R,L,z,W,C,I,O,E,S,D,M,U,x,N,V,j,A,G,H,F,T,Z,k,X,B,Y,q,J,K,Q,$,tt,it,et,st,ot,rt,nt,ht,pt,at,ut;s._RF.push({},"c007aDbxvBI8a+R0xM++FHn","RoundRect",void 0);const{ccclass:ct,property:dt,executeInEditMode:lt}=n;let _t=t("RoundRect",(m=ct("RoundRect"),f=lt(!0),g=dt({displayName:"手动初始化",tooltip:"在编辑器中, 如果没有生成网格, 则手动点一下",visible:function(){return!this._mr}}),w=dt({displayName:"[只读]多边形数量",tooltip:"显示创建网格的三角面的数量",visible:function(){return!!this._geometry?.indices16}}),b=dt(),P=dt({displayName:"调试模式",tooltip:"在编辑器面板显示内部数据"}),v=dt(),R=dt({displayName:"UI模式",tooltip:"设置为UI模式之后, 网格将会竖放, 同时矩形宽高由UITransfrom的Size调整\n* 编辑器时, 组件会自动判断节点是否UI, 此选项仅供必要时手动设置"}),L=dt(),z=dt({displayName:"颜色"}),W=dt(),C=dt({displayName:"是否显示线段",tooltip:"不选中的话, 则仅显示4个角"}),I=dt(),O=dt({displayName:"是否圆角",tooltip:"切换圆角和直角\n* 切换成直角时, `圆角半径`和`圆角步长`将会失效"}),E=dt(o),S=dt({type:o,displayName:"圆角步长",tooltip:"步长越大, 圆角越圆滑, 网格面数越多\n* 此数值必须大于0\n* 此数值必须小于40",slide:!0,step:1,range:[1,40],visible:function(){return this._hasRound}}),D=dt({type:r,displayName:"[只读]实际半径",readonly:!0,serializable:!1,visible:function(){return _t._showEditor}}),M=dt(r),U=dt({type:r,displayName:"圆角半径",tooltip:"圆角半径越大, 圆角占用的面积越大\n* 此数值必须大于0\n* 矩形尺寸过小时, 圆角半径会自适应",visible:function(){return this._hasRound}}),x=dt({type:r,displayName:"[只读]外部线宽",readonly:!0,serializable:!1,visible:function(){return _t._showEditor}}),N=dt({type:r,displayName:"[只读]内部线宽",readonly:!0,serializable:!1,visible:function(){return _t._showEditor}}),V=dt(r),j=dt({type:r,displayName:"线宽",tooltip:"线宽越大, 矩形线框的宽度越大\n* 此数值必须大于0"}),A=dt(r),G=dt({type:r,displayName:"内外偏移",tooltip:"调整线宽时的方向和比例\n0: 内侧, 0.5: 居中, 1: 外侧",slide:!0,step:.01,range:[0,1]}),H=dt(r),F=dt({type:r,displayName:"矩形宽度",tooltip:"矩形在X轴向的长度\n* 此数值必须大于0",visible:function(){return!this._isUI}}),T=dt(r),Z=dt({type:r,displayName:"矩形深度",tooltip:"矩形在Z轴向的长度\n* 此数值必须大于0",visible:function(){return!this._isUI}}),k=dt(r),X=dt({type:r,displayName:"整体高度",tooltip:"矩形在Y轴向的位置",visible:function(){return!this._isUI}}),m(B=f(((ut=class t extends h{constructor(...t){super(...t),e(this,"_",q,this),e(this,"_isUI",J,this),e(this,"_color",K,this),e(this,"_showLine",Q,this),e(this,"_hasRound",$,this),e(this,"_roundStep",tt,this),e(this,"_realRound",it,this),e(this,"_round",et,this),e(this,"_outerLineWidth",st,this),e(this,"_innerLineWidth",ot,this),e(this,"_lineWidth",rt,this),e(this,"_anchor",nt,this),e(this,"_width",ht,this),e(this,"_height",pt,this),e(this,"_y",at,this),this.dirty=yt.none,this._mr=void 0,this._mesh=void 0,this._geometry=void 0,this._options=void 0,this._tools=void 0,this._conners=void 0,this._lines=void 0,this._pPool=void 0,this._mats=void 0}__checkPreset_inEditor(){}__setPreset_inEditor(){const i=t.uipreset;for(const t in i)this[t]=i[t]}get draw(){return!0}set draw(t){this.init()}get triCount(){return this._geometry?.indices16?.length/3}get showEditor(){return t._showEditor}set showEditor(i){t._showEditor=i}get isUI(){return this._isUI}set isUI(t){this._isUI!==t&&(this._isUI=t,this._listenWH(t),this.dirty|=yt.gmyPos)}get color(){return this._color}set color(t){this._color.set(t),this._mr.sharedMaterial.setProperty("mainColor",t,0)}get showLine(){return this._showLine}set showLine(t){this._showLine!==t&&(this._showLine=t,this.dirty|=yt.count)}get hasRound(){return this._hasRound}set hasRound(t){this._hasRound!==t&&(this._hasRound=t,this.dirty|=yt.count)}get roundStep(){return this._roundStep}set roundStep(t){t<0&&(t=0),t>40&&(t=40),this._roundStep!==t&&(this._roundStep=t,this.dirty|=yt.count)}get round(){return this._round}set round(t){t<0&&(t=0),this._round!==t&&(this._round=t,this.dirty|=yt.sharp)}get lineWidth(){return this._lineWidth}set lineWidth(t){t<0&&(t=0),this._lineWidth!==t&&(this._lineWidth=t,this.dirty|=yt.sharp)}get anchor(){return this._anchor}set anchor(t){t<0&&(t=0),t>1&&(t=1),this._anchor!==t&&(this._anchor=t,this.dirty|=yt.sharp)}get width(){return this._width}set width(t){t<0&&(t=0),this._width!==t&&(this._width=t,this.dirty|=yt.wh)}get height(){return this._height}set height(t){t<0&&(t=0),this._height!==t&&(this._height=t,this.dirty|=yt.wh)}get y(){return this._y}set y(t){this._y=t,this.dirty|=yt.gmyPos}init(){this._mr||(this.__checkPreset_inEditor(),this.initMesh(),this.initV(),this._isUI&&this._listenWH(!0),this._onRAL_VC(),this.updateCount(),this.dirty=yt.none)}onLoad(){this.init()}lateUpdate(){this.updateDirty()}updateImmediate(){this.updateDirty()}_listenWH(t){(t?this.node.on:this.node.off).call(this.node,p.EventType.SIZE_CHANGED,this._onSizeVC,this),t&&this._onSizeVC()}_onSizeVC(){const t=this.node._uiProps.uiTransformComp;if(!t)return;const i=t.contentSize;this.width=i.width,this.height=i.height}updateDirty(){if(!this.dirty)return;let t=this.dirty;this.dirty=yt.none,t&yt.sharp?this._onRAL_VC():t&yt.wh&&(this._onWH_VC()||(t|=yt.sharp)),t&yt.count?this.updateCount():t&yt.sharp?this.updateSharp():t&yt.wh?this.updatePos():t&yt.gmy||t&yt.gmyPos?this.updateGmyPoss():t&yt.mesh&&this.updateMesh()}updateCount(){this._updateCount(),this.updateSharp()}updateSharp(){this._updateSharp(),this.updatePos()}updatePos(){this._updatePos(),this.updateGmy()}updateGmy(){this._updateGmy(),this.updateMesh()}updateGmyPoss(){this._updateGmyPoss(),this.updateMesh()}initMesh(){if(this._mr=this.getComponent(a)||this.addComponent(a),this._mr.mesh=this._mesh=new u,this._mesh.name="create by RoundRect",!this._mr.sharedMaterial){const t=new c;t.name="create by RoundRect",t.initialize({effectName:"builtin-unlit"}),t.setProperty("mainColor",this._color,0),this._mr.sharedMaterials=[t]}}updateMesh(){this._mr.mesh=d.MeshUtils.createDynamicMesh(0,this._geometry,this._mesh,this._options)}initV(){const t=this._pPool=new gt((()=>({v3:new l,rp:{v3:new l,i:-1}})));this._tools={getVPoint:()=>t.pop()},this._conners=[[1,1],[1,-1],[-1,-1],[-1,1]].map((t=>new ft(t[0],t[1]))),this._mats=[90,180,-90].map((t=>_.Mat4.fromRotation(new _.Mat4,t*mt,l.UP))),this._geometry={positions:null,indices16:null}}_onRAL_VC(){const t=.5*(this._width<this._height?this._width:this._height);this._realRound=this._round<t?this._round:t,this._outerLineWidth=this._anchor*this._lineWidth;const i=(1-this._anchor)*this._lineWidth;this._innerLineWidth=i<t?i:t}_onWH_VC(){const t=this._realRound,i=this._innerLineWidth,e=this._outerLineWidth;return this._onRAL_VC(),this._realRound===t&&this._innerLineWidth===i&&this._outerLineWidth===e}_updateCount(){this._pPool.recyleAll();const t=this._hasRound?this._roundStep:2,i=this._conners;i.forEach((i=>i.setStep(t,this._tools))),this._showLine&&(this._lines=i.map(((t,e)=>{const s=t.faces[t.faces.length-1].ps,o=i[(e+1)%i.length].faces[0].ps;return{ps:[s[2],s[3],o[0],o[1]]}}))),this._geometry.positions=new Float32Array(3*this._pPool.using.length),this._geometry.indices16=new Uint16Array(4*(t+ +this._showLine)*2*3)}_updateSharp(){const t=this._conners[0];this._hasRound?t.setRAL(this._realRound,this._innerLineWidth,this._outerLineWidth,!this._showLine):t.setAL(this._realRound,this._innerLineWidth,this._outerLineWidth,!this._showLine),this._mats.forEach(((i,e)=>this._conners[e+1].matWith(t,i)))}_updatePos(){const t=.5*this._width-this._realRound,i=.5*this._height-this._realRound;this._conners.forEach((e=>e.setPos(t,i)))}_updateGmy(){this._updateGmyPoss();let t=0;const i=this._geometry.indices16;this._conners.forEach((e=>e.faces.forEach((e=>t=this._drawFace4Idx(i,t,e))))),this._showLine&&this._lines.forEach((e=>t=this._drawFace4Idx(i,t,e)))}_updateGmyPoss(){const t=this._y,i=this._geometry.positions;this._pPool.using.forEach(this._isUI?(t,e)=>{t.rp.i=e;const s=t.rp.v3;i[3*e+0]=s.x,i[3*e+1]=-s.z,i[3*e+2]=0}:(e,s)=>{e.rp.i=s;const o=e.rp.v3;i[3*s+0]=o.x,i[3*s+1]=t,i[3*s+2]=o.z})}_drawFace4Idx(t,i,e){const s=e.ps;return t[i++]=s[0].rp.i,t[i++]=s[1].rp.i,t[i++]=s[3].rp.i,t[i++]=s[0].rp.i,t[i++]=s[3].rp.i,t[i++]=s[2].rp.i,i}}).uipreset={isUI:!0,anchor:0,round:20,lineWidth:10},ut._showEditor=!1,i((Y=ut).prototype,"draw",[g],Object.getOwnPropertyDescriptor(Y.prototype,"draw"),Y.prototype),i(Y.prototype,"triCount",[w],Object.getOwnPropertyDescriptor(Y.prototype,"triCount"),Y.prototype),q=i(Y.prototype,"_",[b],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),i(Y.prototype,"showEditor",[P],Object.getOwnPropertyDescriptor(Y.prototype,"showEditor"),Y.prototype),J=i(Y.prototype,"_isUI",[v],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),i(Y.prototype,"isUI",[R],Object.getOwnPropertyDescriptor(Y.prototype,"isUI"),Y.prototype),K=i(Y.prototype,"_color",[L],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return y.WHITE.clone()}}),i(Y.prototype,"color",[z],Object.getOwnPropertyDescriptor(Y.prototype,"color"),Y.prototype),Q=i(Y.prototype,"_showLine",[W],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),i(Y.prototype,"showLine",[C],Object.getOwnPropertyDescriptor(Y.prototype,"showLine"),Y.prototype),$=i(Y.prototype,"_hasRound",[I],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!0}}),i(Y.prototype,"hasRound",[O],Object.getOwnPropertyDescriptor(Y.prototype,"hasRound"),Y.prototype),tt=i(Y.prototype,"_roundStep",[E],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 10}}),i(Y.prototype,"roundStep",[S],Object.getOwnPropertyDescriptor(Y.prototype,"roundStep"),Y.prototype),it=i(Y.prototype,"_realRound",[D],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),et=i(Y.prototype,"_round",[M],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),i(Y.prototype,"round",[U],Object.getOwnPropertyDescriptor(Y.prototype,"round"),Y.prototype),st=i(Y.prototype,"_outerLineWidth",[x],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),ot=i(Y.prototype,"_innerLineWidth",[N],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),rt=i(Y.prototype,"_lineWidth",[V],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),i(Y.prototype,"lineWidth",[j],Object.getOwnPropertyDescriptor(Y.prototype,"lineWidth"),Y.prototype),nt=i(Y.prototype,"_anchor",[A],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),i(Y.prototype,"anchor",[G],Object.getOwnPropertyDescriptor(Y.prototype,"anchor"),Y.prototype),ht=i(Y.prototype,"_width",[H],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 10}}),i(Y.prototype,"width",[F],Object.getOwnPropertyDescriptor(Y.prototype,"width"),Y.prototype),pt=i(Y.prototype,"_height",[T],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 10}}),i(Y.prototype,"height",[Z],Object.getOwnPropertyDescriptor(Y.prototype,"height"),Y.prototype),at=i(Y.prototype,"_y",[k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.5}}),i(Y.prototype,"y",[X],Object.getOwnPropertyDescriptor(Y.prototype,"y"),Y.prototype),B=Y))||B)||B));const yt={none:0,count:1,sharp:2,wh:4,gmy:8,gmyPos:16,mesh:32},mt=Math.PI/180;class ft{constructor(t,i){this.faces=[],this.ofsX=t,this.ofsZ=i}setStep(t,i){this.faces.length=t;let e=i.getVPoint(),s=i.getVPoint();for(let o=0;o<t;o++){let t=e,r=s;e=i.getVPoint(),s=i.getVPoint(),this.faces[o]={ps:[t,r,e,s]}}}setAL(t,i,e,s){const o=s&&t-i<0?0:t-i,r=s&&t-i<0?0:t+e;this.faces[0].ps[0].v3.z=this.faces[1].ps[2].v3.x=o,this.faces[0].ps[1].v3.z=this.faces[1].ps[3].v3.x=r;const n=this.faces[0].ps[2].v3,h=this.faces[0].ps[3].v3;n.x=n.z=o,h.x=h.z=r}setRAL(t,i,e,s){const o=1/this.faces.length*90*mt,r=this.faces[0].ps[0].v3,n=this.faces[0].ps[1].v3;r.x=n.x=0;const h=s&&t-i<0?0:t-i,p=s&&t+e<0?0:t+e,a=r.z=h,u=n.z=p;this.faces.forEach(((t,i)=>{const e=(i+1)*o,s=Math.sin(e),r=Math.cos(e),n=t.ps[2],h=t.ps[3];n.v3.x=s*a,n.v3.z=r*a,h.v3.x=s*u,h.v3.z=r*u}))}matWith(t,i){this._matPoint(t.faces[0].ps[0],this.faces[0].ps[0],i),this._matPoint(t.faces[0].ps[1],this.faces[0].ps[1],i),this.faces.forEach(((e,s)=>{this._matPoint(t.faces[s].ps[2],e.ps[2],i),this._matPoint(t.faces[s].ps[3],e.ps[3],i)}))}_matPoint(t,i,e){i.v3.set(t.v3).transformMat4(e)}setPos(t,i){t*=this.ofsX,i*=this.ofsZ,this.updateP(this.faces[0].ps[0],t,i),this.updateP(this.faces[0].ps[1],t,i),this.faces.forEach((e=>{this.updateP(e.ps[2],t,i),this.updateP(e.ps[3],t,i)}))}updateP(t,i,e){const s=t.v3,o=t.rp.v3;o.x=s.x+i,o.z=s.z+e}}class gt{constructor(t){this.cached=[],this.using=[],this.ctor=t}pop(){const t=this.cached.length>0?this.cached.pop():this.ctor();return this.using.push(t),t}push(t){this.cached.push(t);const i=this.using.indexOf(t);-1!==i&&this.using.splice(i,1)}recyleAll(){this.cached.push(...this.using),this.using.length=0}}s._RF.pop()}}}));

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