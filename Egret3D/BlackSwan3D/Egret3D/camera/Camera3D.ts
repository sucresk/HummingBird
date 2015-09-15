module BlackSwan {
    export class Camera3D extends Entity{
       

        private _viewProjection: Matrix4_4;
        private _scissorRect: Rectangle = new Rectangle();
        private _viewPort: Rectangle = new Rectangle();
        private _inverseSceneTransform: Matrix4_4 = new Matrix4_4();


        private _viewProjectionDirty: Boolean = true
        private _inverseSceneTransformDirty: Boolean = true
        
        public cameraMatrix: PerspectiveMatrix;

        constructor() {

            super();

            this._viewProjection = new Matrix4_4();
            this.cameraMatrix = new PerspectiveMatrix(45);

        }

        public set fieldOfView(value: number) {
            if (this.cameraMatrix.fieldOfView != value) {
                this.cameraMatrix.fieldOfView = value;
                this._viewProjectionDirty = true;
            }
        }

        public get fieldOfView(): number {
            return this.cameraMatrix.fieldOfView;
        }

        public set focalLength(value: number) {
            if (this.cameraMatrix.focalLength != value) {
                this.cameraMatrix.focalLength = value;
                this._viewProjectionDirty = true;
            }
        }

        public get focalLength(): number {
            return this.cameraMatrix.focalLength;
        }

        /**
        * The aspect ratio (width/height) of the view
        */
        public get aspectRatio(): number {
            return this.cameraMatrix.aspectRatio;
        }

        /**
       * The aspect ratio (width/height) of the view
       */
        public set aspectRatio(value: number) {
            if (this.cameraMatrix.aspectRatio != value)  {
                this.cameraMatrix.aspectRatio = value;
                //this._viewProjectionDirty = true;
            }
        }

        /**
         * The inverse scene transform object that transforms from world to model space.
         */
        public get inverseSceneTransform(): Matrix4_4 {
            if (this._inverseSceneTransformDirty) {
                this._inverseSceneTransform.copyFrom(this.sceneTransform);
                this._inverseSceneTransform.invert();
                //this._inverseSceneTransformDirty = false;
            }

            return this._inverseSceneTransform;
        }

        /**
       * The view projection matrix of the camera.
       */
        public get viewProjection(): Matrix4_4 {
            if (this._viewProjectionDirty || this._mIsMatrixDirty) {
                this._viewProjection.copyFrom(this.inverseSceneTransform);
                this._viewProjection.append( this.cameraMatrix.matrix );
                //this._viewProjectionDirty = false;
            }
            return this._viewProjection;
        }  

        protected invalidateMatrix() {
            this._viewProjectionDirty = true;
        }

        public updateScissorRect(x: number, y: number, width: number, height: number) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
            this.invalidateMatrix();
        }

        public updateViewport(x: number, y: number, width: number, height: number) {
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
            this.invalidateMatrix();
        }

    }
} 