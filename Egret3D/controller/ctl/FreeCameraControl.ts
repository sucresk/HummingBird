module Egret3D {
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

            Input.instance.addListenerKeyDown((key: number) => this.onKeyDown(key));
            Input.instance.addListenerKeyUp((key: number) => this.onKeyUp(key));
            Input.instance.addListenerMouseMove(() => this.mouseMove());
            Input.instance.addListenerMouseWheel(() => this.mouseWheel());
        }

        public stop() {
          
        }

        public onKeyDown(key: number) {
            switch (key) {
                case KeyCode.Key_Mouse_Left:
                    this._mouseDown = true;
                    break;
                case KeyCode.Key_W:
                    this._moveDetail.z = this._moveSpeed;
                    break;
                case KeyCode.Key_A:
                    this._moveDetail.x = this._moveSpeed;

                    break;
                case KeyCode.Key_S:
                    this._moveDetail.z = -this._moveSpeed;
                    break;
                case KeyCode.Key_D:
                    this._moveDetail.x = -this._moveSpeed;
                    break;
            }
        }

        public onKeyUp(key: number) {
            switch (key) {
                case KeyCode.Key_Mouse_Left:
                    this._mouseDown = false;
                    break;
                case KeyCode.Key_W:///w
                    this._moveDetail.z = 0;
                    break;
                case KeyCode.Key_A:///a               
                    this._moveDetail.x = 0;
                    break;
                case KeyCode.Key_S:///s              
                    this._moveDetail.z = 0;
                    break;
                case KeyCode.Key_D:///d              
                    this._moveDetail.x = 0;
                    break;
            }
        }


        public mouseMove() {

            ///this._view3d.onMouseEvent(MouseEventType.mouse_Move);
            if (this._mouseDown) {

                this._view3d.camera3D.rotationY -= Input.instance.mouseOffsetX * 0.1;
                this._view3d.camera3D.rotationX -= Input.instance.mouseOffsetY * 0.1;
            }
        }

        public mouseWheel() {
            this._view3d.camera3D.rotationY += (Input.instance.wheelDelta * 0.0001) ;
            ///this._view3d.camera3D.z += e.wheelDelta;
        }

        public update(timer: number, elapsed: number): void {
            ///this._view3d.camera3D.moveLeft(-this._moveDetail.x);
            ///this._view3d.camera3D.moveForward(this._moveDetail.z);
        }
    }
} 