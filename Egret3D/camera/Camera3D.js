var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BlackSwan;
(function (BlackSwan) {
    var Camera3D = (function (_super) {
        __extends(Camera3D, _super);
        function Camera3D() {
            _super.call(this);
            this._scissorRect = new BlackSwan.Rectangle();
            this._viewPort = new BlackSwan.Rectangle();
            this._inverseSceneTransform = new BlackSwan.Matrix4_4();
            this._viewProjectionDirty = true;
            this._inverseSceneTransformDirty = true;
            this._viewProjection = new BlackSwan.Matrix4_4();
            this.cameraMatrix = new BlackSwan.PerspectiveMatrix(45);
        }
        Object.defineProperty(Camera3D.prototype, "fieldOfView", {
            get: function () {
                return this.cameraMatrix.fieldOfView;
            },
            set: function (value) {
                if (this.cameraMatrix.fieldOfView != value) {
                    this.cameraMatrix.fieldOfView = value;
                    this._viewProjectionDirty = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "focalLength", {
            get: function () {
                return this.cameraMatrix.focalLength;
            },
            set: function (value) {
                if (this.cameraMatrix.focalLength != value) {
                    this.cameraMatrix.focalLength = value;
                    this._viewProjectionDirty = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "aspectRatio", {
            /**
            * The aspect ratio (width/height) of the view
            */
            get: function () {
                return this.cameraMatrix.aspectRatio;
            },
            /**
           * The aspect ratio (width/height) of the view
           */
            set: function (value) {
                if (this.cameraMatrix.aspectRatio != value) {
                    this.cameraMatrix.aspectRatio = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "inverseSceneTransform", {
            /**
             * The inverse scene transform object that transforms from world to model space.
             */
            get: function () {
                if (this._inverseSceneTransformDirty) {
                    this._inverseSceneTransform.copyFrom(this.sceneTransform);
                    this._inverseSceneTransform.invert();
                }
                return this._inverseSceneTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera3D.prototype, "viewProjection", {
            /**
           * The view projection matrix of the camera.
           */
            get: function () {
                if (this._viewProjectionDirty || this._mIsMatrixDirty) {
                    this._viewProjection.copyFrom(this.inverseSceneTransform);
                    this._viewProjection.append(this.cameraMatrix.matrix);
                }
                return this._viewProjection;
            },
            enumerable: true,
            configurable: true
        });
        Camera3D.prototype.invalidateMatrix = function () {
            this._viewProjectionDirty = true;
        };
        Camera3D.prototype.updateScissorRect = function (x, y, width, height) {
            this._scissorRect.x = x;
            this._scissorRect.y = y;
            this._scissorRect.width = width;
            this._scissorRect.height = height;
            this.invalidateMatrix();
        };
        Camera3D.prototype.updateViewport = function (x, y, width, height) {
            this._viewPort.x = x;
            this._viewPort.y = y;
            this._viewPort.width = width;
            this._viewPort.height = height;
            this.invalidateMatrix();
        };
        return Camera3D;
    })(BlackSwan.Entity);
    BlackSwan.Camera3D = Camera3D;
})(BlackSwan || (BlackSwan = {}));
//# sourceMappingURL=Camera3D.js.map