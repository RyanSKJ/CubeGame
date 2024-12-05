import { _decorator, Camera, clamp, Collider, Color, director, Label, Component, geometry, instantiate, Layers, MeshRenderer, Node, NodePool, PhysicsSystem, Prefab, Quat, randomRangeInt, RigidBody, SpriteAtlas, Tween, tween, UIOpacity, Vec3 } from 'cc';
import { Levels } from './Levels';
import { Global } from '../../catalogasset/Script/Global';

const { ccclass, property } = _decorator;

@ccclass('Cubes')
export class Cubes extends Component {

  //@property(SpriteAtlas)
  //sprAtlas:SpriteAtlas = null; //精灵图集
  @property(Camera)
  camera0: Camera = null;
  @property(Node)
  effectNode: Node = null;
  @property(Node)
  selcetNode: Node = null;
  @property(Prefab)
  prefab1: Prefab = null; // 预制体1
  @property(Prefab)
  prefab2: Prefab = null; // 预制体2
  @property(Prefab)
  prefab3: Prefab = null; // 预制体3
  @property(Prefab)
  prefab4: Prefab = null; // 预制体4
  @property(Prefab)
  prefab5: Prefab = null; // 预制体5
  @property(Prefab)
  prefab6: Prefab = null; // 预制体6
  public operationTimeLabel: Label = null;
  @property(Prefab)
  uiPrefab: Prefab = null; // 用于显示通关后的UI预制体  

  private _level:number = 0;
  private _config:any = null;
  private _locked:boolean = false; //避免同时多个操作
  private _matching:number = 0; //匹配计数

  private _baseNode:Node = null;
  private _nodePool:NodePool = new NodePool();
  private _localBuffer:Float32Array = new Float32Array(4);

  private _effectInc:number = 0;
  private _matchCount:number = 0;
  private _paiSelectCount:number = 0; //已选择总数
  private _paiRands:Array<string> = new Array(); //新随机队列
  private _paiSelets:Array<Array<Node>> = new Array();  //已选立方体
  private _paiInWorld:Map<string,Array<Node>> = new Map(); //未选立方体
  private _threeErase:Array<Node> = new Array(); //新随机队列

  private operationTime: number = 0;   // To track the total time of operations

  private true_level = Global.currentLevelIndex;

  
  

 
   start(): void {
    const levelMapping = {
      15: 0, // true_level = 15 对应 Levels[0]
      16: 1, // true_level = 16 对应 Levels[1]
      17: 2, // true_level = 17 对应 Levels[2]
      18: 3, // true_level = 18 对应 Levels[3]
      19: 4, // true_level = 19 对应 Levels[4]
  };
  this._level = levelMapping[this.true_level];
    //测试代码
    this.resetLevel();
    this.faPai();
  }
  

  protected onDestroy () {

    Tween.stopAll(); //停止所有正在进行的补间动画
    this.unscheduleAllCallbacks();
    if(this._baseNode){
      this._baseNode.destroy();
    }
    this._nodePool.clear(); //清空节点池里所有节点

  }

  nextLevel(){
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

  resetLevel(){
    this.resetWorld();
    this.loadLevel(this._level);
  }

  putNode(node:Node){
    this._nodePool.put(node);
  }
  

  getNode(type: number): Node {
    let node = this._nodePool.get();
    if (!node) {
        node = instantiate(this.prefabNode(type)); //节点池没有对应类型的节点，则实例化一个新的节点
    }
    return node;
}


  prefabNode(type: number): Node { 
    let prefab: Prefab = null;
    switch(type) {
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

  

enablePhysics(node: Node, enable: boolean) {
  // 递归函数，用于遍历节点及其子节点
  const togglePhysics = (currentNode: Node) => {
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

removeFromWorld(node: Node) {
  let nodes = this._paiInWorld.get(node.name); 
  let idx = nodes.indexOf(node);
  if (idx >= 0) {
      nodes.splice(idx, 1);
  }
  console.log(`正在移除节点: ${node.name}`);
  node.destroy(); // 确保节点已销毁
}

  wakeUpOthers(node:Node){ //唤醒周围物体

    let pos = node.position;
    let ray = new geometry.Ray(pos.x,pos.y,pos.z, 0,1,0); //创建一条从节点位置发射向上的射线
    if(PhysicsSystem.instance.sweepBox(ray,new Vec3(1.5,1,2),node.rotation,0x2,20,false)){
       let results =  PhysicsSystem.instance.sweepCastResults;
       for(let i = 0;i<results.length;i++){
          results[i].collider.attachedRigidBody.wakeUp();
       }
       //唤醒所有检测到的物体的刚体
    }
  }

  resetWorld(){

    Tween.stopAll();
    this.unscheduleAllCallbacks();

    let effects = this.effectNode; //关闭特效节点的所有子节点
    effects.children[0].active = false;
    effects.children[1].active = false;
    effects.children[2].active = false;

    this._paiSelets.forEach((nodes:Array<Node>)=>{
      for(let i = nodes.length-1;i>=0;i--){
        this.putNode(nodes[i]);
      }
      //将已选中的物体放回节点池
    })

    //将游戏世界中的所有子节点放回节点池
    let nodes = this.node.children;
    for(let i = nodes.length-1;i>=0;i--){
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

  loadLevel(lv: number) {
    lv = clamp(0, Levels.length - 1, lv); //将关卡限制在有效范围内
    let config = Levels[lv]; //获取制定关卡的配置

    let types = 3; // 总共三种预制体类型
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



getPai(name: string | null = null) {
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



  combineEffect(position:Vec3){ //在指定位置播放合成效果的方法
  
    let parent = this.effectNode;
    let out = this.camera0.convertToUINode(position,parent); //将世界坐标转换为UI坐标
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

    n0.setScale(new Vec3(1.5,1.5,1.5));
    n1.setScale(new Vec3(0.5,0.5,0.5));
    n2.setScale(Vec3.ZERO);
    //设置各子节点的初识缩放
    o1.opacity = 255;
    o2.opacity = 255;
    //设置子节点的初识透明度
    tween().target(n0).to(0.2,{ scale: Vec3.ZERO},{easing:"quadOut"}).start();
  
    tween().target(n1).to(0.1,{ scale: Vec3.ONE},{easing:"quintOut"}).start();
    tween().target(o1).to(0.1,{ opacity: 0}).start();

    tween().target(n2).to(0.2,{ scale: Vec3.ONE},{easing:"quintOut"}).start();
    tween().target(o2).delay(0.1).to(0.1,{ opacity: 0}).start();

    this.scheduleOnce(()=>{ node.active = false; } , 0.25);

    this._effectInc = (++this._effectInc)%parent.children.length;
  
  }


  fixPosition(idx:number , finish:Function){ //修正方块位置的方法

    let count = 0;
    let selects = this._paiSelets;
    let pos = this.selcetNode.position;
    //获取当前已选中的方块和选择区域的位置
    for(let i = 0, k = 0;i < selects.length ;i++){
      let nodes = selects[i];
      for(let j = 0;j < nodes.length;j++,k++){
        let node = nodes[j];
        if(k >= idx){
          count++;
          let targetPosition = new Vec3((k - 3) * 3.5, 0, 23);
          tween().target(node).to(0.3,{ position: targetPosition},{easing:"quintOut"})
          .call(()=>{
            let rigidBody = node.getComponent(RigidBody);
            if (rigidBody) {
                //rigidBody.type = RigidBody.Type.KINEMATIC; // 切换到 Kinematic 刚体类型
                rigidBody.setLinearVelocity(Vec3.ZERO); // 停止线性运动
                rigidBody.setAngularVelocity(Vec3.ZERO); // 停止旋转
                rigidBody.sleep(); // 让刚体休眠，避免不必要的物理交互
            }  
            if(--count == 0){
              finish();
            }
          }).start();
        }
      }
    }

    if(count == 0){
      finish();
    }
  }

  fixSelectEnd(){ //修正已选方块的方法
    
    let count = 0;
    let selects = this._paiSelets;
    for(let i = selects.length - 1; i>= 0; i--){
      let nodes = selects[i];
      let length = nodes.length;
      if( length >= 3){
        count+=3;
        let n0 = nodes.pop();
        let n1 = nodes.pop();
        let n2 = nodes.pop();
        this._paiSelectCount-=3;
        if(nodes.length == 0) selects.splice(i,1);
        //如果某种方块已选中超过三个，移除这三个方块
  
        const end = ()=>{
          this.combineEffect(n1.worldPosition);
          this.putNode(n0);
          this.putNode(n1);
          this.putNode(n2);
          count-=3;

          if( count == 0 ){
            this.fixPosition( 0,()=>{});
            this._matching--;
          }
          
          if(++this._matchCount == this._config.Count){ //如果匹配完成计数等于关卡的方块总数，则进入下一关
            //通关完成，游戏结束
            this.nextLevel();
            this.faPai();
          }
        };
        let pos = n1.position;
        tween().target(n0).to(0.1,{ position: pos},{easing:"quadOut"}).start();
        tween().target(n2).to(0.1,{ position: pos},{easing:"quadOut"}).call(end).start();

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

    if(count == 0){
      //没有合成，底栏结束
      if(this._paiSelectCount == 7){
        //卡位已满，游戏结束
      }
    }

  }

  flyToSelect(node:Node){
    //将方块飞入选择区域的位置
    if(this._locked) return false;
    
    if(this._paiSelectCount + 1 > 7 ) return false; //选择区域已满，则返回false
    this.enablePhysics(node,false);
    this.wakeUpOthers(node);
    this._paiSelectCount++;
    //禁用物理效果并唤醒周围物体，增加选择数量
    node.setParent(this.selcetNode.parent);
    node.scale = new Vec3(0.4,0.4,0.4);
    node.layer = Layers.Enum.UI_3D; //将该节点的图层设置为UI 3D层，以确保它在正确的渲染层中
    //node.rotation = Quat.IDENTITY; //重置节点的旋转角度，使其恢复为默认值（无旋转）
   
    let idx = 0;
    let isInsert = true;
    let selects = this._paiSelets;
    for(let i = 0,j = selects.length; i<j; i++){
      let nodes = selects[i];
      let length = nodes.length;
      if(nodes[0].name == node.name){
        if(length >= 2) this._matching++;
        isInsert = false;
        nodes.push(node);
        idx+=length;
        break;
      }
      idx+=length;
    }

    if( isInsert ) selects.push([node]);
    //修正后面位置
    this.fixPosition(idx,()=>{
      //调用fixPosition方法修正选择区域中所有方块的位置，从idx开始
       this.fixSelectEnd();
    });

    return true;
  }

  /*合牌，选取一对组合*/
  hePai(){

    if(this._locked || this._matching) return;
    //最大空位牌数
    let maxCount = 7 - this._paiSelectCount;
    if( maxCount <= 0) return false;
    

    let selects = this._paiSelets;
    for(let i = 0;i < selects.length; i++){
      let nodes = selects[i];
      let length = 3 - nodes.length;
      if(length >= 0 && length <= maxCount){
        let name = nodes[0].name;
        let wNodes = this._paiInWorld.get(name);
        if( wNodes && length <= wNodes.length){
          for(let j = 0;j < length;j++){
            let node = wNodes.pop();
            if(!this.flyToSelect(node)){
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
    const typeAppearanceCount = new Map<number, number>();

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

  update(deltaTime: number) {
    this.operationTime += deltaTime;
    this.operationTimeLabel.string = `已用时: ${this.operationTime.toFixed(2)}s`;
  }

  selectCube(node: Node) {
    if (this._locked) return false; // 避免重复选择
    console.log(node.name)
    if (this._threeErase.some(selectedNode => selectedNode === node)) return false; // 避免重复选择同一个立方体

    this._threeErase.push(node);

    // 使用 `tween` 逐步放大节点至 2
    tween(node)
        .to(0.2, { scale: new Vec3(1.5, 1.5, 1.5) }) // 放大动画，持续 0.2 秒
        .call(() => {
            // 放大完成后检查是否已选择 3 个节点
            if (this._threeErase.length === 3) {
                this._locked = true; // 临时锁定以进行检查
                this.checkSelection(this._threeErase); // 检查是否满足消除条件

                // 清空 `threeErase` 数组
                this._threeErase = [];
            }
        })
        .start();

    return true;
}

checkSelection(selectedGroup: Node[]) {
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
          tween(node)
              .to(0.2, { scale: new Vec3(1.25, 1.25, 1.25) }) // 缩小到原始大小
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
}


