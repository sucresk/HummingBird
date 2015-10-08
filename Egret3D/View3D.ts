module BlackSwan {
    export class View3D {

        private _root: Object3D = new Object3D();
        private _context3D: Context3D;
        private _camera: Camera3D;
        private _render: RenderBase;
        private _collect: CollectBase;
  
        private _width: number = 0;
        private _height: number = 0;
        private _x: number = 0;
        private _y: number = 0;

        private _localPos: Point = new Point();
        private _globalPos: Point = new Point();
        private _globalPosDirty: Boolean;

        protected _aspectRatio: number = 1;
        protected _scissorRect: Rectangle;
        protected _viewPort: Rectangle;
        private _scissorRectDirty: Boolean = true;
        private _viewportDirty: Boolean = true;

        private _viewPortMatrix: Matrix4_4 = new Matrix4_4(); 
        constructor(viewPort: Rectangle) {

            this._context3D = Egret3D.context3D;
            this._camera = new Camera3D();
            this._scissorRect = new Rectangle();
            this._viewPort = viewPort;

            this._collect = new EntityCollect();
            this._render = new DefaultRender();

            this.x = viewPort.x;
            this.y = viewPort.y;
            this.width = viewPort.width;
            this.height = viewPort.height;

        }

        public get collect(): CollectBase {
            return this._collect;
        }

        public get camera3D(): Camera3D {
            return this._camera;
        }

        /**
        * The width of the viewport. When software rendering is used, this is limited by the
        * platform to 2048 pixels.
        */
        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.width = value;
            this._scissorRectDirty = true;
        }
		
        /**
         * The height of the viewport. When software rendering is used, this is limited by the
         * platform to 2048 pixels.
         */
        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.height = value;
            this._scissorRectDirty = true;
        }

        public set x(value: number) {
            if (this._x == value)
                return;

            this._localPos.x = this._x = value;

            this._globalPos.x = value;
            this._globalPosDirty = true;
        }

        public set y(value: number) {
            if (this._y == value)
                return;

            this._localPos.y = value;

            this._globalPos.y = value;
            this._globalPosDirty = true;
        }

        /**
        * 初始化 GPU 交换程序
        **/
        private setContext3D() {

            this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

        }

        public addChild3D(child3D: Object3D) {
            this._collect.addObject3D(child3D);
            //child3D.parent = this._root;
        }

        public renden() {

            this.updateViewSizeData();

            this._context3D.clear(0.4, 0.4, 0.6, 1);

            this._context3D.clearDepth(1);

            this._context3D.clearStencil(1);

            this._collect.update(this._camera);

            this._render.renden(this._context3D , this._collect , this._camera );

            this._context3D.flush();

        }

        private updateViewSizeData() {

            this._camera.aspectRatio = this._aspectRatio;

            if (this._scissorRectDirty) {
                this._scissorRectDirty = false;
                this._camera.updateScissorRect(this._scissorRect.x, this._scissorRect.y, this._scissorRect.width, this._scissorRect.height);
            }

            if (this._viewportDirty) {
                this._viewportDirty = false;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            }

        }

        public onMouseEvent(e: MouseEventType) {
            //var ray: Ray = new Ray();
            //ray.CalculateAndTransformRay(Egret3D.canvasRectangle.width, Egret3D.canvasRectangle.height, this._camera.transform, this._camera.cameraMatrix.matrix, Egret3D.mouseX, Egret3D.mouseY);
            //for (var i: number = 0; i < this._collect.renderList.length; ++i) {
            //    var mesh: BlackSwan.Mesh = <BlackSwan.Mesh>this._collect.renderList[i];
            //    var inPos: Vector3D = new Vector3D();
            //    if (mesh.isCheckBox) {
            //        if (mesh.isMouseEvent(e)) {
            //            if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.transform)) {
            //                mesh.onMouseEvent(e);
            //            }
            //        }
            //    }
            //}
        }
    }
}