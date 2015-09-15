var BlackSwan;
(function (BlackSwan) {
    var View3D = (function () {
        function View3D(viewPort) {
            this._root = new BlackSwan.Object3D();
            this._width = 0;
            this._height = 0;
            this._x = 0;
            this._y = 0;
            this._localPos = new BlackSwan.Point();
            this._globalPos = new BlackSwan.Point();
            this._aspectRatio = 1;
            this._scissorRectDirty = true;
            this._viewportDirty = true;
            BlackSwan.Egret3D.requstContext3D(DeviceUtil.getGPUMode, viewPort);
            this._context3D = BlackSwan.Egret3D.context3D;
            this._camera = new BlackSwan.Camera3D();
            this._scissorRect = new BlackSwan.Rectangle();
            this._viewPort = viewPort;
            this._collect = new BlackSwan.EntityCollect();
            this._render = new BlackSwan.DefaultRender();
            this.x = viewPort.x;
            this.y = viewPort.y;
            this.width = viewPort.width;
            this.height = viewPort.height;
        }
        Object.defineProperty(View3D.prototype, "collect", {
            get: function () {
                return this._collect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "camera3D", {
            get: function () {
                return this._camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "width", {
            /**
            * The width of the viewport. When software rendering is used, this is limited by the
            * platform to 2048 pixels.
            */
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                this._aspectRatio = this._width / this._height;
                this._camera.aspectRatio = this._aspectRatio;
                this._scissorRect.width = value;
                this._scissorRectDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "height", {
            /**
             * The height of the viewport. When software rendering is used, this is limited by the
             * platform to 2048 pixels.
             */
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                this._aspectRatio = this._width / this._height;
                this._camera.aspectRatio = this._aspectRatio;
                this._scissorRect.height = value;
                this._scissorRectDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "x", {
            set: function (value) {
                if (this._x == value)
                    return;
                this._localPos.x = this._x = value;
                this._globalPos.x = value;
                this._globalPosDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View3D.prototype, "y", {
            set: function (value) {
                if (this._y == value)
                    return;
                this._localPos.y = value;
                this._globalPos.y = value;
                this._globalPosDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 初始化 GPU 交换程序
        **/
        View3D.prototype.setContext3D = function () {
            this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
        };
        View3D.prototype.addChild3D = function (child3D) {
            this._collect.addObject3D(child3D);
            //child3D.parent = this._root;
            child3D.context3D = this._context3D;
        };
        View3D.prototype.renden = function () {
            this.updateViewSizeData();
            this._context3D.clear(0.4, 0.4, 0.6, 1);
            this._context3D.clearDepth(1);
            this._context3D.clearStencil(1);
            this._collect.update(this._camera);
            this._render.renden(this._context3D, this._collect, this._camera);
            this._context3D.flush();
        };
        View3D.prototype.updateViewSizeData = function () {
            this._camera.aspectRatio = this._aspectRatio;
            if (this._scissorRectDirty) {
                this._scissorRectDirty = false;
                this._camera.updateScissorRect(this._scissorRect.x, this._scissorRect.y, this._scissorRect.width, this._scissorRect.height);
            }
            if (this._viewportDirty) {
                this._viewportDirty = false;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            }
        };
        View3D.prototype.onMouseEvent = function (e) {
            var ray = new BlackSwan.Ray();
            ray.CalculateAndTransformRay(BlackSwan.Egret3D.canvasRectangle.width, BlackSwan.Egret3D.canvasRectangle.height, this._camera.transform, this._camera.cameraMatrix.matrix, BlackSwan.Egret3D.mouseX, BlackSwan.Egret3D.mouseY);
            for (var i = 0; i < this._collect.renderList.length; ++i) {
                var mesh = this._collect.renderList[i];
                var inPos = new BlackSwan.Vector3D();
                if (mesh.isCheckBox) {
                    if (mesh.isMouseEvent(e)) {
                        if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.geomtry.indexData.length / 3, inPos, mesh.transform)) {
                            mesh.onMouseEvent(e);
                        }
                    }
                }
            }
        };
        return View3D;
    })();
    BlackSwan.View3D = View3D;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=View3D.js.map