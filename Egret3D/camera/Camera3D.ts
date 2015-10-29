module BlackSwan {
    export enum CameraType { perspective, orthogonal, VR  };
    export enum VRType { left , right };
    export class Camera3D extends Entity{
       
        public _viewPort: Rectangle = new Rectangle();
        public _scissorRect: Rectangle = new Rectangle();
        private _aspectRatio: number = 1.0 ;
        private _fovY: number = 45.0;
        private _near: number = 20.0;
        private _far: number = 10000.0;

        private temp: Matrix4_4 = new Matrix4_4();
        public projectMatrix: Matrix4_4 = new Matrix4_4();
        public eyeMatrix: EyesMatrix;
        public cameraMatrix: Matrix4_4 ;
        
        private _lookAtPosition: Vector3D = new Vector3D();
        private _up: Vector3D = new Vector3D(0, 1, 0);
        public _ortho: boolean = false;
        public _frustum: Frustum = new Frustum();

        private _cameraType: number = 0; 
        private _cameraMatrixChange: boolean = false;

        constructor(cameraType: CameraType = CameraType.perspective ) {
            super();

            this._pos.setTo(0, 0, -10);
            this._lookAtPosition.setTo(0, 0, 0);
            this._modeMatrix3D.lookAt(this._pos, this._lookAtPosition, this._up);
            this.cameraType = cameraType;
        }


        public set cameraType(cameraType: CameraType) {
            this._cameraType = cameraType;
            switch (cameraType) {
                case CameraType.orthogonal:
                    this.cameraMatrix = this.modelMatrix;
                    this.projectMatrix.ortho(this._viewPort.width, this._viewPort.height, this._near, this._far);
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

        public set aspectRatio(value: number) {
            if (this._aspectRatio != value) {
                this._aspectRatio = value;
                this.cameraType = this._cameraType; 
            }
        }

        public get aspectRatio(): number {
            return this._aspectRatio;
        }

        public set fieldOfView(value: number) {
            if (this._fovY != value) {
                this._fovY = value;
                this.cameraType = this._cameraType;
            }
        }

        public get fieldOfView(): number {
            return this._fovY ;
        }

        public set near(value: number) {
            if (this._near != value) {
                this._near = value;
                this.cameraType = this._cameraType;
            }
        }

        public get near(): number {
            return this._near;
        }

        public set far(value: number) {
            if (this._far != value) {
                this._far = value;
                this.cameraType = this._cameraType;
            }
        }

        public get far(): number {
            return this._far;
        }
      
        public get viewProjectionMatrix(): Matrix4_4 {
          //  if (this._cameraMatrixChange ){
                this.temp.copyFrom(this.cameraMatrix);
                this.temp.append(this.projectMatrix);
          //  }
            return this.temp;
        }

        public updateScissorRect(x: number, y: number, width: number, height: number) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
        }

        public updateViewport(x: number, y: number, width: number, height: number) {
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
        }

        public lookAt(pos: Vector3D, target: Vector3D, up: Vector3D = Vector3D.Y_AXIS) {
            this._pos.copyFrom(pos);
            this._lookAtPosition.copyFrom(target);
            this._up.copyFrom(up);

            this._modeMatrix3D.lookAt(this._pos, this._lookAtPosition, this._up);
        }

        public get lookAtPosition(): Vector3D {
            return this._lookAtPosition;
        }

        public updataOrth() {
            var _projectionHeight: number = 1;
            var raw: Float32Array = new Float32Array(16);
            var _yMax:number = _projectionHeight * .5;
            var _xMax:number = _yMax * this._aspectRatio ;

            var left: number, right: number, top: number, bottom: number;

            //raw[0] = 2 / this._viewPort.width ;
            //raw[5] = 2 / this._viewPort.height ;
            //raw[10] = -(2 / (this._far-this._near));
            //raw[11] = -((this._far - this._near) / (this._far - this._near));
            //raw[15] = 1;
            //
            //return 
            if (this._scissorRect.x == 0 && this._scissorRect.y == 0 && this._scissorRect.width == this._viewPort.width && this._scissorRect.height == this._viewPort.height) {
                // assume symmetric frustum
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

            this._modeMatrix3D.copyRawDataFrom(raw)
        }

        public isVisible(obj: Object3D): boolean {
            var box: CubeBoxBound = obj.worldBox;
            if (this._frustum.inSphere(box.center, box.radius)) {
                return true;
            }
            return false;
        }
    }
} 