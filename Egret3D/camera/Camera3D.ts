module Egret3D {
    export enum CameraType { perspective, orthogonal, VR  };
    export enum VRType { left, right };
    /**
    * @class Egret3D.Camera3D
    * @classdesc
    * 相机数据处理，生成3D摄相机
    */
    export class Camera3D extends Entity{

        /**
          * @language en_US
          */
        /**
         * @language zh_CN
         * 相机投影矩阵
         */
        public projectMatrix: Matrix4_4 = new Matrix4_4();

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 眼睛矩阵(左，右眼)
         */
        public eyeMatrix: EyesMatrix;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 当前相机使用的世界变换矩阵
         */
        public cameraMatrix: Matrix4_4;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * @相机的视椎体
         */
        public frustum: Frustum = new Frustum();

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 
         */
        private _viewPort: Rectangle = new Rectangle();
        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _scissorRect: Rectangle = new Rectangle();

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _aspectRatio: number = 1.0 ;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _fovY: number = 45.0;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _near: number = 1 ;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _far: number = 10000.0;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private temp: Matrix4_4 = new Matrix4_4();        

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _lookAtPosition: Vector3D = new Vector3D();

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _up: Vector3D = new Vector3D(0, 1, 0);

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _cameraType: number = 0; 

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _cameraMatrixChange: boolean = false;

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _viewMatrix: Matrix4_4 = new Matrix4_4();

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         */
        private _tempQuat: Quaternion = new Quaternion();


        /**
         * @language en_US
         * @param cameraType CameraType
         */
        /**
         * @language zh_CN
         * constructor
         * @param cameraType 相机类型
         */
        constructor(cameraType: CameraType = CameraType.perspective ) {
            super();
            this.cameraType = cameraType;
        }

        /**
         * @language zh_CN
         * 设置相机类型
         * @param cameraType 相机类型
         */
        public set cameraType(cameraType: CameraType) {
            this._cameraType = cameraType;
            switch (cameraType) {
                case CameraType.orthogonal:
                    this.cameraMatrix = this.modelMatrix;
                    ///this.projectMatrix.ortho(this._viewPort.width, this._viewPort.height, this._near, this._far);
                    this.updataOrth();
                    break;
                case CameraType.perspective:
                    this.cameraMatrix = this.modelMatrix;
                    this.projectMatrix.perspective(this._fovY, this._aspectRatio, this._near, this._far);
                    break;
                case CameraType.VR:
                    this.cameraMatrix = this.modelMatrix;
                    this.projectMatrix.perspective(this._fovY, 1.0 , this._near, this._far);
                    this.eyeMatrix = this.eyeMatrix || new EyesMatrix();
                    break;
            }
        }

        /**
         * @language en_US
         * @param cameraType CameraType
         * @param vrType VRType
         */
        /**
         * @language zh_CN
         * 打开VR相机
         * @param cameraType 相机类型
         * @param vrType VR类型
         */
        public tap(cameraType: CameraType, vrType: VRType = null ) {
            if (cameraType == CameraType.VR) {
                this.eyeMatrix.updte( this.modelMatrix );
                if (vrType == VRType.left) {
                    this.cameraMatrix = this.eyeMatrix.leftEyeMatrix;
                } else if (vrType == VRType.right) {
                    this.cameraMatrix = this.eyeMatrix.rightEyeMatrix;
                }
            }
            else {
                this.cameraMatrix = this.modelMatrix ;
            }
        }
                                              
        /**
        * @language zh_CN
        * 设置相机横纵比
        * @writeOnly
        * @param value 横纵比
        */
        public set aspectRatio(value: number) {
            if (this._aspectRatio != value) {
                this._aspectRatio = value;
                this.cameraType = this._cameraType; 
            }
        }
                              
        /**
        * @language zh_CN
        * 返回相机横纵比
        * @readOnly
        * @returns 横纵比
        */
        public get aspectRatio(): number {
            return this._aspectRatio;
        }
                                      
        /**
        * @language zh_CN
        * 设置相机fovY
        * @writeOnly
        * @param value fovY
        */
        public set fieldOfView(value: number) {
            if (this._fovY != value) {
                this._fovY = value;
                this.cameraType = this._cameraType;
            }
        }
                      
        /**
        * @language zh_CN
        * 返回相机fovY
        * @readOnly
        * @returns fovY
        */
        public get fieldOfView(): number {
            return this._fovY ;
        }
                              
        /**
        * @language zh_CN
        * 设置相机近截面
        * @writeOnly
        * @param value 近截面
        */
        public set near(value: number) {
            if (this._near != value) {
                this._near = value;
                this.cameraType = this._cameraType;
            }
        }
              
        /**
        * @language zh_CN
        * 返回相机近截面
        * @readOnly
        * @returns 近截面
        */
        public get near(): number {
            return this._near;
        }
                      
        /**
        * @language zh_CN
        * 设置相机远截面
        * @writeOnly
        * @param value 远截面
        */
        public set far(value: number) {
            if (this._far != value) {
                this._far = value;
                this.cameraType = this._cameraType;
            }
        }
              
        /**
        * @language zh_CN
        * 返回相机远截面
        * @readOnly
        * @returns 远截面
        */
        public get far(): number {
            return this._far;
        }
      
        /**
        * @language zh_CN
        * 返回相机视图投影矩阵
        * @readOnly
        * @returns 视图投影矩阵
        */
        public get viewProjectionMatrix(): Matrix4_4 {
            this.cameraMatrix = this.modelMatrix
            this.temp.copyFrom(this.cameraMatrix);
            this.temp.invert();
            this.temp.append(this.projectMatrix);
            return this.temp;
        }

        /**
         * @language en_US
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         */
        /**
         * @language zh_CN
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         */
        public updateScissorRect(x: number, y: number, width: number, height: number) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
        }

        /**
         * @language en_US
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         */
        /**
         * @language zh_CN
         * 更新视口
         * @param x number
         * @param y number
         * @param width number
         * @param height number
         */
        public updateViewport(x: number, y: number, width: number, height: number) {
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
        }

        /**
         * @language en_US
         * @param pos Vector3D
         * @param target Vector3D
         * @param up V3ctor3D
         */
        /**
         * @language zh_CN
         * 当前对象对视位置
         * @param pos 对象的位置
         * @param target 目标的位置
         * @param up 向上的方向
         */
        public lookAt(pos: Vector3D, target: Vector3D, up: Vector3D = Vector3D.Y_AXIS) {
            this.position = pos;

            this._lookAtPosition.copyFrom(target);
            this._up.copyFrom(up);
            this._viewMatrix.lookAt(this._pos, this._lookAtPosition, this._up);
            this._viewMatrix.invert();

            this._tempQuat.fromMatrix(this._viewMatrix);
            var r:Vector3D = this._tempQuat.toEulerAngles();
            this.rotation = r;
        }

        protected onUpdateTransform() {
            this._viewMatrix.copyFrom(this._modeMatrix3D);
            this._viewMatrix.invert();
        }

        /**
         * @language zh_CN
         * @readOnly
         * 相机视图矩阵
         */
        public get viewMatrix(): Matrix4_4 {
            return this._viewMatrix;
        }
        
        /**
         * @language zh_CN
         * @readOnly
         * 相机目标点
         */
        public get lookAtPosition(): Vector3D {
            return this._lookAtPosition;
        }

        /**
         * @language en_US
         */
        /**
         * @language zh_CN
         * 更新正交矩阵
         */
        public updataOrth() {
            var _projectionHeight: number = 800;
            var raw: Float32Array = new Float32Array(16);
            var _yMax:number = _projectionHeight * .5;
            var _xMax:number = _yMax * this._aspectRatio ;

            var left: number, right: number, top: number, bottom: number;
            ///return 
            if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height) {
                /// assume symmetric frustum
                left = -_xMax;
                right = _xMax;
                top = -_yMax;
                bottom = _yMax;

                raw[0] = 2 / (_projectionHeight * this._aspectRatio);
                raw[5] = 2 / _projectionHeight;
                raw[10] = 1 / (this._far - this._near);
                raw[14] = this._near / (this._near - this._far);
                raw[1] = raw[2] = raw[3] = raw[4] =
                raw[6] = raw[7] = raw[8] = raw[9] =
                raw[11] = raw[12] = raw[13] = 0;
                raw[15] = 1;

            } else {

                var xWidth: number = _xMax * (this._viewPort.width / this._scissorRect.width);
                var yHgt: number = _yMax * (this._viewPort.height / this._scissorRect.height);
                var center: number = _xMax * (this._scissorRect.x * 2 - this._viewPort.width) / this._scissorRect.width + _xMax;
                var middle: number = -_yMax * (this._scissorRect.y * 2 - this._viewPort.height) / this._scissorRect.height - _yMax;

                left = center - xWidth;
                right = center + xWidth;
                top = middle - yHgt;
                bottom = middle + yHgt;

                raw[0] = 2 * 1 / (right - left);
                raw[5] = -2 * 1 / (top - bottom);
                raw[10] = 1 / (this._far - this._near);

                raw[12] = (right + left) / (right - left);
                raw[13] = (bottom + top) / (bottom - top);
                raw[14] = this._near / (this.near - this.far);

                raw[1] = raw[2] = raw[3] = raw[4] =
                raw[6] = raw[7] = raw[8] = raw[9] = raw[11] = 0;
                raw[15] = 1;
            }

            this.projectMatrix.copyRawDataFrom(raw)
        }

        /**
         * @language en_US
         * @param object Object3D
         * @returns boolean
         */
        /**
         * @language zh_CN
         * 检测对象是否在相机视椎体内
         * @param object 需要体测的对象
         * @returns 成功返回true
         */
        public isVisibleToCamera(object: Object3D): boolean {
            var box: CubeBoxBound = object.worldBox;
            if (this.frustum.inSphere(box.center, box.radius)) {
                return true;
            }
            return false;
        }
    }
} 