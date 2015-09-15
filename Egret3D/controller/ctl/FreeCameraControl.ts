module BlackSwan {
    export class FreeCameraControl extends CameraControllerBase {

        private _moveSpeed: number = 3;
        private _moveDetail: Vector3D = new Vector3D();

        private _screenMoveStartDetail: Point = new Point();
        private _screenMoveDelay: Point = new Point();

        private _mouseDown: boolean = false;
        constructor(view3d: View3D) {
            super(view3d);
            this.initView();
        }

        private initView() {
        }

        public start(angle: number, distance: number, wide: number, locked: boolean, lockRect: Rectangle) {
            super.start(angle, distance, wide, locked, lockRect);

            window.onmousewheel = (e: MouseWheelEvent) => this.mouseWheel(e);

            window.onkeydown = (e: KeyboardEvent) => this.keyDown(e);
            window.onkeyup = (e: KeyboardEvent) => this.keyUp(e);

            window.onmousedown = (e: MouseEvent) => this.mouseStart(e);
            window.onmouseup = (e: MouseEvent) => this.mouseEnd(e);
            window.onmousemove = (e: MouseEvent) => this.mouseMove(e);
        }

        public stop() {
          
        }

        public mouseEnd(e: MouseEvent) {
            this._mouseDown = false;

            if (e.button == 0) {
                this._view3d.onMouseEvent(MouseEventType.mouse_LEnd);
            }
            else {
                this._view3d.onMouseEvent(MouseEventType.mouse_REnd);
            }
        }

        public mouseStart(e: MouseEvent) {
            this._mouseDown = true;
            this._screenMoveStartDetail.x = e.screenX;
            this._screenMoveStartDetail.y = e.screenY;

            if (e.button == 0) {
                this._view3d.onMouseEvent(MouseEventType.mouse_LStart);
            }
            else {
                this._view3d.onMouseEvent(MouseEventType.mouse_RStart);
            }
        }

        public mouseMove(e: MouseEvent) {
            BlackSwan.Egret3D.mouseX = e.clientX - BlackSwan.Egret3D.clientRect.left;
            BlackSwan.Egret3D.mouseY = e.clientY - BlackSwan.Egret3D.clientRect.top;
            this._view3d.onMouseEvent(MouseEventType.mouse_Move);
            if (this._mouseDown) {
                this._screenMoveDelay.x = e.screenX - this._screenMoveStartDetail.x;
                this._screenMoveDelay.y = e.screenY - this._screenMoveStartDetail.y;

                this._view3d.camera3D.rotationY += this._screenMoveDelay.x * 0.005
                this._view3d.camera3D.rotationX += this._screenMoveDelay.y * 0.005;

                this._screenMoveStartDetail.x = e.screenX;
                this._screenMoveStartDetail.y = e.screenY;
            }
        }

        public keyDown(e: KeyboardEvent) {
            switch (e.keyCode){
                case 87://w
                    this._moveDetail.z = this._moveSpeed;
                    break;
                case 65://a
                    this._moveDetail.x = this._moveSpeed;
                    break;
                case 83://s
                    this._moveDetail.z = -this._moveSpeed;
                    break;
                case 68://d
                    this._moveDetail.x = -this._moveSpeed;
                    break;
            }
        }

        public keyUp(e: KeyboardEvent) {
            switch (e.keyCode) {
                case 87://w
                    this._moveDetail.z =  0 ;
                    break;              
                case 65://a               
                    this._moveDetail.x =  0 ;
                    break;                
                case 83://s              
                    this._moveDetail.z =  0 ;
                    break;                
                case 68://d              
                    this._moveDetail.x = 0;
                    break;
            }
        }

        public mouseWheel(e: MouseWheelEvent) {
            this._view3d.camera3D.rotationY += e.wheelDelta * 0.0001 ;
            //this._view3d.camera3D.z += e.wheelDelta;
        }

        public update(timer: number, elapsed: number): void {
            this._view3d.camera3D.moveLeft(this._moveDetail.x);
            this._view3d.camera3D.moveForward(this._moveDetail.z);
        }
    }
} 