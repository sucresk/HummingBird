module Egret3D {
    
    /**
    * @class Egret3D.FreeCameraControl
    * @classdesc
    * 自由摄相机控制器
    */
    export class FreeCameraControl extends CameraControllerBase {
        private _moveSpeed: number = 3;
        private _moveDetail: Vector3D = new Vector3D();
        private _screenMoveStartDetail: Point = new Point();
        private _screenMoveDelay: Point = new Point();
        private _mouseDown: boolean = false;
        /**
        * @language zh_CN
        * constructor
        */
        constructor(view3d: View3D) {
            super(view3d);
            this.initView();
        }
        private initView() {
        }
        /**
        * @language zh_CN
        * 初始化
        * @param angle 角度
        * @param distance 相机距离
        * @param wide 
        * @param locked 是否锁定
        * @param lockRect 
        */
        public start(angle: number, distance: number, wide: number, locked: boolean) {

            super.start(angle, distance, wide, locked);
            Input.instance.addListenerKeyDown((key: number) => this.onKeyDown(key));
            Input.instance.addListenerKeyUp((key: number) => this.onKeyUp(key));
            Input.instance.addListenerMouseMove(() => this.mouseMove());
            Input.instance.addListenerMouseWheel(() => this.mouseWheel());
        }
        /**
        * @language zh_CN
        * 停止控制
        */
        public stop() {
          
        }

        protected onKeyDown(key: number) {

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

        protected onKeyUp(key: number) {

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

        protected mouseMove() {
            if (this._mouseDown) {
                this._view3d.camera3D.rotationY -= Input.instance.mouseOffsetX * 0.1;
                this._view3d.camera3D.rotationX -= Input.instance.mouseOffsetY * 0.1;
            }
        }

        protected mouseWheel() {

            this._view3d.camera3D.rotationY += (Input.instance.wheelDelta * 0.0001) ;
            ///this._view3d.camera3D.z += e.wheelDelta;
        }
        /**
        * @language zh_CN
        * 数据更新
        * @param timer 当前时间
        * @param elapsed 时间间隔
        */
        public update(timer: number, elapsed: number): void {

            ///this._view3d.camera3D.moveLeft(-this._moveDetail.x);
            ///this._view3d.camera3D.moveForward(this._moveDetail.z);
        }
    }
} 