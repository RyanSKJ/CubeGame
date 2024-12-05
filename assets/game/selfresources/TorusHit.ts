import { _decorator, Component, ITriggerEvent, director, Node, Collider } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TorusScript')
export class TorusScript extends Component {
  
    start() {
        console.log("TorusScript has been loaded");
    }
  
    onTriggerEnter(event: ITriggerEvent) {
        console.log("Torus has collided with Cube2!");
        if (event.otherCollider.node.name === "Cube2") {
            console.log("Torus has collided with Cube2!");
        }
    }
  
    // ... onTriggerStay 和 onTriggerExit 如果需要也可以实现
}