module Egret3D {

    export class MouseManager {

        public mouseX: number; 
        public mouseY: number; 

        private view3D: View3D ; 
        private ray: Ray; 

        private i: number;
        private len: number;
        private inPos: Vector3D;
        private pickerList: Array<Object3D> = new Array<Object3D>();

        constructor(view3D: View3D) {
            this.view3D = view3D;
            this.ray = this.ray || new Ray();

            Input.instance.addListenerKeyDown((e) => this.mouseDownStateChange(e));
            Input.instance.addListenerKeyUp((e) => this.mouseUpStateChange(e));
            Input.instance.addListenerMouseMove((e) => this.mouseMoveStateChange(e));
        }

        private mouseDownStateChange(keyCode: number) {
            switch (keyCode) {
                case KeyCode.Key_Mouse_Left:
                    this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.left_mouse_down));
                    break;
                case KeyCode.Key_Mouse_Right:
                    this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.right_mouse_down));
                    break;
                case KeyCode.Key_Mouse_Mid:
                    this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.middle_mouse_down));
                    break;
            }
        }

        private mouseUpStateChange(keyCode: number) {
            switch (keyCode) {
                case KeyCode.Key_Mouse_Left:
                    this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.left_mouse_up));
                    break;
                case KeyCode.Key_Mouse_Right:
                    this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.right_mouse_up));
                    break;
                case KeyCode.Key_Mouse_Mid:
                    this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.middle_mouse_up));
                    break;
            }
        }

        private mouseMoveStateChange(keyCode: number) {
            if (this.pickerList.length>0){
                this.pickerList[0].dispatchEvent(new Event3D(Mouse3DEvent.mouse_move));
            }
        }
    
        public update(list: Array<Object3D>) {
            this.pickerList.length = 0;

            this.mouseX = Input.instance.mouseX;
            this.mouseY = Input.instance.mouseY;

            this.ray.CalculateAndTransformRay(this.view3D.width, this.view3D.height, this.view3D.camera3D.modelMatrix, this.view3D.camera3D.projectMatrix , this.mouseX , this.mouseY );
            for (this.i = 0; this.i < list.length; this.i++){
                if (list[this.i].mouseEnable) {

                    ///picker box
                    if (list[this.i].box != null) {
                        if (this.ray.IntersectMesh(list[this.i].box.vexData, list[this.i].box.indexData, 3, list[this.i].box.indexData.length / 3, this.inPos, list[this.i].modelMatrix)) {

                            list[this.i].pickerData.object3DPosition.x = list[this.i].position.x;
                            list[this.i].pickerData.object3DPosition.y = list[this.i].position.y;
                            list[this.i].pickerData.object3DPosition.z = list[this.i].position.z;
                            list[this.i].pickerData.globalPosition.x = this.inPos.x;
                            list[this.i].pickerData.globalPosition.y = this.inPos.y;
                            list[this.i].pickerData.globalPosition.z = this.inPos.z;
                            this.pickerList[this.i].pickerData.near = Vector3D.distance(this.pickerList[this.i].position, this.ray.origin);
                            this.pickerList.push(list[this.i] );
                        }
                    }

                }
            }

            ///sort
            this.pickerList.sort(this.sortNear);
        }

        private sortNear(a: Object3D, b: Object3D): number {
            return a.pickerData.near - b.pickerData.near;
        }
    }
} 